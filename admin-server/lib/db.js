/* ============================================================
   Persistent datastore -- backed by MongoDB when MONGODB_URI is set
   (recommended for production: Render's local disk is ephemeral and
   gets wiped on every redeploy unless you've attached a paid persistent
   disk, so anything saved only to admin-server/data/db.json can vanish).
   Falls back to that local JSON file when MONGODB_URI isn't set, so
   local development still works with zero setup.

   The whole store is still kept as ONE in-memory object (`cache`) for
   instant reads, exactly like before -- every existing route file keeps
   working completely unchanged (getCollection/setCollection/readAll/
   writeAll are still synchronous, same signatures as always). Only the
   underlying persistence changed:
     - connect() must be awaited ONCE at server boot (see admin-server/
       app.js) -- it loads the whole blob from Mongo (or the file) into
       `cache` before seed()/any request handlers run.
     - Every write updates `cache` immediately (synchronous, same as
       before) AND is pushed to Mongo (or the file) to persist it.
     - The FIRST time MongoDB is connected and found empty, connect()
       automatically copies over whatever was in the local db.json file
       (if any) so switching storage backends never silently drops
       existing data -- no manual migration step required.
============================================================ */
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'mba_partner';

let cache = null;
let mongoCollection = null;
let usingMongo = false;

function ensureFile() {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify({}, null, 2));
  }
}

function readFileSync_() {
  ensureFile();
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  try {
    return JSON.parse(raw || '{}');
  } catch (e) {
    console.error('db.json is corrupted -- refusing to overwrite. Fix or delete it manually.', e);
    throw e;
  }
}

function writeFileSync_(data) {
  ensureFile();
  const tmp = DB_PATH + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, DB_PATH);
}

// Must be awaited once at server boot, before seed()/any routes run.
async function connect() {
  if (!MONGODB_URI) {
    console.warn('[db] MONGODB_URI not set -- using local file storage (admin-server/data/db.json). This is NOT safe for production: data can be lost on redeploy. Set MONGODB_URI in your environment to use MongoDB instead.');
    cache = readFileSync_();
    return;
  }
  try {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    mongoCollection = client.db(MONGODB_DB_NAME).collection('store');
    const doc = await mongoCollection.findOne({ _id: 'main' });
    usingMongo = true;
    if (doc && doc.data && typeof doc.data === 'object') {
      cache = doc.data;
      console.log('[db] Connected to MongoDB (' + MONGODB_DB_NAME + ') -- using persistent storage.');
    } else {
      // Mongo is empty -- this is the first time connecting it. If there's
      // existing data in the local file (e.g. this server was previously
      // running on file storage), carry it over automatically instead of
      // silently starting from scratch. No manual migration step needed.
      const fileData = fs.existsSync(DB_PATH) ? readFileSync_() : {};
      cache = fileData;
      if (Object.keys(fileData).length) {
        await mongoCollection.insertOne({ _id: 'main', data: fileData });
        console.log('[db] MongoDB was empty -- automatically copied over existing local file data (' + Object.keys(fileData).length + ' collections) into MongoDB (' + MONGODB_DB_NAME + ').');
      } else {
        console.log('[db] Connected to MongoDB (' + MONGODB_DB_NAME + ') -- starting fresh (no existing local data found).');
      }
    }
  } catch (e) {
    console.error('[db] MongoDB connection failed -- falling back to local file storage.', e.message);
    usingMongo = false;
    cache = readFileSync_();
  }
}

function readAll() {
  if (!cache) {
    // Safety net: something read before connect() finished (shouldn't
    // happen if app.js awaits connect() first) -- fall back to the file
    // so we never crash, though this read won't reflect Mongo data.
    cache = readFileSync_();
  }
  return cache;
}

function writeAll(data) {
  cache = data; // keep the in-memory cache in sync so the next read is instant
  if (usingMongo && mongoCollection) {
    mongoCollection.replaceOne({ _id: 'main' }, { _id: 'main', data: data }, { upsert: true })
      .catch(function (e) { console.error('[db] Failed to persist to MongoDB (cache still updated, but this write may be lost on restart):', e.message); });
  } else {
    writeFileSync_(data);
  }
}

function getCollection(name) {
  const data = readAll();
  return Array.isArray(data[name]) ? data[name] : [];
}

function setCollection(name, arr) {
  const data = readAll();
  data[name] = arr;
  writeAll(data);
}

function getSingleton(name) {
  const data = readAll();
  return data[name] && typeof data[name] === 'object' && !Array.isArray(data[name]) ? data[name] : {};
}

function setSingleton(name, obj) {
  const data = readAll();
  data[name] = obj;
  writeAll(data);
}

function nextId(arr) {
  let max = 0;
  arr.forEach(function (r) { const n = Number(String(r._id || '').replace(/\D/g, '')) || 0; if (n > max) max = n; });
  return 'id' + (max + 1);
}

module.exports = { DB_PATH: DB_PATH, connect: connect, readAll: readAll, writeAll: writeAll, getCollection: getCollection, setCollection: setCollection, getSingleton: getSingleton, setSingleton: setSingleton, nextId: nextId };
