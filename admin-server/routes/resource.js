const express = require('express');
const db = require('../lib/db');
const { requireAuth } = require('../lib/auth');

const ADMIN_ONLY = new Set(['adminUsers']);

function makePublicRouter(name) {
  const router = express.Router();
  router.get('/', (req, res) => {
    res.json(db.getCollection(name));
  });
  return router;
}

function makeAdminRouter(name) {
  const router = express.Router();
  router.use(requireAuth);

  router.get('/', (req, res) => {
    res.json(db.getCollection(name));
  });

  router.post('/', (req, res) => {
    const rows = db.getCollection(name);
    const record = { _id: db.nextId(rows), ...req.body };
    rows.push(record);
    db.setCollection(name, rows);
    res.status(201).json(record);
  });

  router.put('/:id', (req, res) => {
    const rows = db.getCollection(name);
    const idx = rows.findIndex(r => r._id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    rows[idx] = { ...rows[idx], ...req.body, _id: rows[idx]._id };
    db.setCollection(name, rows);
    res.json(rows[idx]);
  });

  router.delete('/:id', (req, res) => {
    const rows = db.getCollection(name);
    const next = rows.filter(r => r._id !== req.params.id);
    if (next.length === rows.length) return res.status(404).json({ error: 'Not found' });
    db.setCollection(name, next);
    res.json({ ok: true });
  });

  return router;
}

const COLLECTIONS = [
  'courses', 'combos', 'coupons', 'placements', 'mentors', 'colleges',
  'videos', 'gdpi', 'hallOfFame', 'freeSessions', 'programs', 'sessions', 'materials', 'students', 'enrollments',
  // CAT / OMETs prep portal (kept separate from the collections above so
  // names don't clash — e.g. catMentors vs the homepage's mentors).
  'catMaterials', 'catMocks', 'catQuestions', 'catPyq', 'catPyqQuestions',
  'catLeaderboard', 'catGdpi', 'catDomainQA', 'catMentors', 'catPricing'
];

module.exports = { makePublicRouter, makeAdminRouter, COLLECTIONS, ADMIN_ONLY };
