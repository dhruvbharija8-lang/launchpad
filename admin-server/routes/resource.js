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

/* Auto-provisioning: when a real order/enrollment comes in, make sure the
   student's dashboard (Students + Enrollments + Programs, matched by
   email — see js/dashboard-data.js's buildStudentView) has something to
   show immediately, instead of a "no student record found" dead end the
   next time they log in via Clerk. Never overwrites existing progress —
   only fills in what's missing. */
function autoProvisionStudent(email, name) {
  if (!email) return;
  const students = db.getCollection('students');
  const existing = students.find(s => (s.Email || '').toLowerCase() === email.toLowerCase());
  if (existing) return existing;
  const rec = {
    _id: db.nextId(students),
    Email: email, Password: '', Name: name || email.split('@')[0], Role: 'Student',
    Avatar: ((name || email)[0] || '?').toUpperCase(),
    CV_Done: 0, CV_Total: 5, PI_Done: 0, PI_Total: 7, GD_Done: 0, GD_Total: 7
  };
  students.push(rec);
  db.setCollection('students', students);
  return rec;
}
function autoProvisionProgram(courseId, courseTitle) {
  if (!courseId) return;
  const programs = db.getCollection('programs');
  if (programs.some(p => p.ProgramCode === courseId)) return;
  const rec = { _id: db.nextId(programs), ProgramCode: courseId, Type: 'Program', Title: courseTitle || courseId, Emoji: '📘' };
  programs.push(rec);
  db.setCollection('programs', programs);
}
function autoProvisionEnrollment(email, courseId) {
  if (!email || !courseId) return;
  const enrollments = db.getCollection('enrollments');
  const already = enrollments.some(e => (e.Email || '').toLowerCase() === email.toLowerCase() && e.ProgramCode === courseId);
  if (already) return;
  const rec = { _id: db.nextId(enrollments), Email: email, ProgramCode: courseId, Progress: 0, NextSession: 'Onboarding', NextDate: 'Soon' };
  enrollments.push(rec);
  db.setCollection('enrollments', enrollments);
}
function autoProvisionFromSubmission(name, record) {
  try {
    if (name === 'orders' && record.Email) {
      autoProvisionStudent(record.Email, record.Name);
      const ids = String(record.ItemIds || '').split(',').map(s => s.trim()).filter(Boolean);
      const titles = String(record.Items || '').split(',').map(s => s.trim());
      ids.forEach((id, i) => {
        autoProvisionProgram(id, titles[i]);
        autoProvisionEnrollment(record.Email, id);
      });
    } else if (name === 'enrollmentRequests' && record.Email) {
      autoProvisionStudent(record.Email, record.Name);
      if (record.CourseId) {
        autoProvisionProgram(record.CourseId, record.Course);
        autoProvisionEnrollment(record.Email, record.CourseId);
      }
      if (record.Type === 'group' && record.Email2) {
        autoProvisionStudent(record.Email2, record.Name2);
        if (record.CourseId) autoProvisionEnrollment(record.Email2, record.CourseId);
      }
    }
  } catch (e) { /* auto-provisioning is a nice-to-have — never let it break the actual save */ }
}

function makePublicWriteRouter(name) {
  const router = express.Router();
  router.post('/', (req, res) => {
    const rows = db.getCollection(name);
    const record = { _id: db.nextId(rows), ...req.body, submittedAt: new Date().toISOString() };
    rows.push(record);
    db.setCollection(name, rows);
    autoProvisionFromSubmission(name, record);
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
  'collabTestimonials', 'collabColleges',
  // Real visitor submissions — write-only from the public side (see
  // PUBLIC_WRITE_ONLY above), fully readable/editable from the admin
  // dashboard like every other collection.
  'leads', 'mentorApplications', 'collegeCollabLeads', 'orders', 'enrollmentRequests',
  // CAT / OMETs prep portal (kept separate from the collections above so
  // names don't clash — e.g. catMentors vs the homepage's mentors).
  'catMaterials', 'catMocks', 'catQuestions', 'catPyq', 'catPyqQuestions',
  'catLeaderboard', 'catGdpi', 'catDomainQA', 'catMentors', 'catPricing'
];

module.exports = { makePublicRouter, makePublicWriteRouter, makeAdminRouter, COLLECTIONS, ADMIN_ONLY, PUBLIC_WRITE_ONLY, autoProvisionFromSubmission };
