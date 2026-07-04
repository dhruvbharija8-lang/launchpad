/* One-time helper: copies the existing admin-server/data/db.json into
   MongoDB. Run this ONCE after setting MONGODB_URI, if you have existing
   real data in the local JSON file (students, orders, enrollments, etc.)
   that you want to keep instead of starting fresh in Mongo.

   Usage (from the admin-server folder, e.g. via Render's Shell tab):
     node scripts/migrate-file-to-mongo.js
*/
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const FILE_PATH = path.join(__dirname, '..', 'data', 'db.json');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set. Add it to your environment first, then re-run this.');
    process.exit(1);
  }
  if (!fs.existsSync(FILE_PATH)) {
    console.error('No local file found at', FILE_PATH, '-- nothing to migrate.');
    process.exit(1);
  }

  const raw = fs.readFileSync(FILE_PATH, 'utf8');
  const data = JSON.parse(raw || '{}');

  const client = new MongoClient(uri);
  await client.connect();
  const dbName = process.env.MONGODB_DB_NAME || 'mba_partner';
  const col = client.db(dbName).collection('store');

  const existing = await col.findOne({ _id: 'main' });
  if (existing) {
    console.error('MongoDB already has data under _id "main" in database "' + dbName + '". Refusing to overwrite it.');
    console.error('If you really want to replace it, delete that document manually first (in MongoDB Atlas or via the mongo shell), then re-run this.');
    await client.close();
    process.exit(1);
  }

  await col.insertOne({ _id: 'main', data: data });
  console.log('Migrated', Object.keys(data).length, 'collections from', FILE_PATH, 'into MongoDB database "' + dbName + '".');
  await client.close();
}

main().catch(function (e) {
  console.error('Migration failed:', e);
  process.exit(1);
});
