const express = require('express');
const db = require('../lib/db');
const { requireAuth } = require('../lib/auth');

const ADMIN_ONLY = new Set(['adminUsers']);

// Collections that real site visitors submit into (enquiry forms, mentor
// applications, checkout orders, etc.). The public side of these is
// WRITE-ONLY (POST to create a new entry) — nobody but the logged-in admin
// can read the list back, so one visitor's contact details can't be
// scraped by another visitor hitting the same public API.
const PUBLIC_WRITE_ONLY = new Set(['leads', 'mentorApplications', 'collegeCollabLeads', 'orders', 'enrollmentRequests']);

function makePublicRouter(name) {
  const router = express.Router();
  router.get('/', (req, res) => {
    res.json(db.getCollection(name));
  });
  return router;
}

function makePublicWriteRouter(name) {
  const router = express.Router();
  router.post('/', (req, res) => {
    const rows = db.getCollection(name);
    const record = { _id: db.nextId(rows), ...req.body, submittedAt: new Date().toISOString() };
    rows.push(record);
    db.setCollection(name, rows);
    res.status(201).json({ ok: true });
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
  // Real visitor submissions — write-only from the public side (see
  // PUBLIC_WRITE_ONLY above), fully readable/editable from the admin
  // dashboard like every other collection.
  'leads', 'mentorApplications', 'collegeCollabLeads', 'orders', 'enrollmentRequests',
  // CAT / OMETs prep portal (kept separate from the collections above so
  // names don't clash — e.g. catMentors vs the homepage's mentors).
  'catMaterials', 'catMocks', 'catQuestions', 'catPyq', 'catPyqQuestions',
  'catLeaderboard', 'catGdpi', 'catDomainQA', 'catMentors', 'catPricing'
];

module.exports = { makePublicRouter, makePublicWriteRouter, makeAdminRouter, COLLECTIONS, ADMIN_ONLY, PUBLIC_WRITE_ONLY };
