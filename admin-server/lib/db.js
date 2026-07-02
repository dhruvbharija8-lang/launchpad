/* ============================================================
   Tiny JSON-file datastore. No native dependencies, runs anywhere
   Node runs. Writes are synchronous + atomic (write to temp file,
   then rename) so a crash mid-write can't corrupt the store.
============================================================ */
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

function ensureFile() {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify({}, null, 2));
  }
}

function readAll() {
  ensureFile();
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  try {
    return JSON.parse(raw || '{}');
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
