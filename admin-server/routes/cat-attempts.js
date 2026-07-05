/* Public API for CAT/OMETs mock-test attempts (mock-exam.html).
   Deliberately NOT one of the generic collections in resource.js's public
   loop -- a student's attempt list must only ever be readable by that same
   student (never the full collection, which would leak every other
   student's scores), and a submission needs a server-side duplicate check
   (one attempt per student per paper) that the generic write-only router
   doesn't do. Admin read/delete access still goes through the normal
   generic /api/admin/catAttempts route (see resource.js's COLLECTIONS). */
const express = require('express');
const db = require('../lib/db');
const router = express.Router();

router.post('/', (req, res) => {
  const { Email, MockID } = req.body || {};
  if (!Email || !MockID) return res.status(400).json({ error: 'Email and MockID are required' });
  const rows = db.getCollection('catAttempts');
  const already = rows.find(r =>
    (r.Email || '').toLowerCase() === String(Email).toLowerCase() && r.MockID === MockID
  );
  if (already) {
    // Not an error — the client (mock-exam.html) uses this to show the
    // student their already-submitted result instead of double-recording
    // a second attempt (e.g. two tabs open, or a race on submit).
    return res.status(200).json({ ok: true, alreadyAttempted: true, attempt: already });
  }
  const record = { _id: db.nextId(rows), ...req.body, submittedAt: new Date().toISOString() };
  rows.push(record);
  db.setCollection('catAttempts', rows);
  res.status(201).json({ ok: true, attempt: record });
});

// Scoped to one email (and optionally one paper) — safe to leave open
// without an admin token, unlike a plain GET of the whole collection.
router.get('/mine', (req, res) => {
  const email = String(req.query.email || '').trim().toLowerCase();
  if (!email) return res.json([]);
  const rows = db.getCollection('catAttempts');
  let mine = rows.filter(r => (r.Email || '').toLowerCase() === email);
  if (req.query.mockId) mine = mine.filter(r => r.MockID === req.query.mockId);
  res.json(mine);
});

// Real, live leaderboard for one specific paper — replaces the old demo/fake
// names shown on the results screen now that the site has real students.
// Deliberately strips Email/Phone/answers before responding (only Name,
// Score, MaxScore, Percentile go out) so this stays safe as a public,
// no-token route. excludeEmail lets the caller leave their own row out of
// the response and splice their own just-computed result back in locally,
// instead of racing the fire-and-forget POST that just saved it.
router.get('/leaderboard', (req, res) => {
  const mockId = req.query.mockId;
  if (!mockId) return res.json([]);
  const exclude = String(req.query.excludeEmail || '').trim().toLowerCase();
  const rows = db.getCollection('catAttempts').filter(r => r.MockID === mockId);
  const board = rows
    .filter(r => !exclude || (r.Email || '').toLowerCase() !== exclude)
    .map(r => ({ Name: r.Name || 'Student', Score: r.Score || 0, MaxScore: r.MaxScore || 0, Percentile: r.Percentile || 0 }))
    .sort((a, b) => b.Score - a.Score || b.Percentile - a.Percentile)
    .slice(0, 20);
  res.json(board);
});

module.exports = router;
