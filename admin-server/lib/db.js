/* ============================================================
   Tiny JSON-file datastore. No native dependencies, runs anywhere
   Node runs. Writes are synchronous + atomic (write to temp file,
   then rename) so a crash mid-write can't corrupt the store.

   PERFORMANCE: the whole store is kept in an in-memory cache after
   the first read, so busy traffic (lots of public GET calls) never
   has to hit disk — only an actual admin write re-touches the file
   (and immediately refreshes the cache, so it's always in sync).
   This keeps read speed roughly constant no matter how much traffic
   the site gets, without needing a real database.
============================================================ */
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
let cache = null;

function ensureFile() {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify({}, null, 2));
  }
}

function readAll() {
  if (cache) return cache;
  ensureFile();
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  try {
    cache = JSON.parse(raw || '{}');
    return cache;
  } catch (e) {
    console.error('db.json is corrupted — refusing to overwrite. Fix or delete it manually.', e);
    throw e;
  }
}

function writeAll(data) {
  ensureFile();
  const tmp = DB_PATH + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, DB_PATH);
  cache = data; // keep the in-memory cache in sync so the next read is instant
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
  arr.forEach(r => { const n = Number(String(r._id || '').replace(/\D/g, '')) || 0; if (n > max) max = n; });
  return 'id' + (max + 1);
}

module.exports = { DB_PATH, readAll, writeAll, getCollection, setCollection, getSingleton, setSingleton, nextId };
