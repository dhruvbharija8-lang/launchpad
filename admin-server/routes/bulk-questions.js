/* ============================================================
   BULK QUESTION IMPORT
   ------------------------------------------------------------
   Lets the admin upload one Excel (.xlsx) or CSV file containing every
   question for a Mock Test or PYQ paper, instead of typing each one into
   the "Add" form individually. Only two collections are allowed here —
   catQuestions (Mock Test questions) and catPyqQuestions (PYQ questions) —
   both share the exact same row shape: Passage, Q, OptionA-D, Correct,
   Solution, plus whichever paper (MockID) they belong to.
============================================================ */
const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const db = require('../lib/db');
const { requireAuth } = require('../lib/auth');

const ALLOWED_COLLECTIONS = new Set(['catQuestions', 'catPyqQuestions']);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB is plenty for a spreadsheet of questions
  fileFilter: (req, file, cb) => {
    const ok = /\.(xlsx|xls|csv)$/i.test(file.originalname);
    cb(ok ? null : new Error('Only .xlsx, .xls, or .csv files are allowed'), ok);
  }
});

const router = express.Router();

// Matches a spreadsheet column header to the field it represents, ignoring
// case/spacing/punctuation differences (e.g. "Option A", "OptionA", "option_a"
// all mean the same thing) — the admin is filling this in by hand in Excel,
// so it shouldn't have to match a header string byte-for-byte.
function normalizeHeader(h) {
  return String(h || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}
const HEADER_MAP = {
  passage: 'Passage',
  question: 'Q', q: 'Q',
  optiona: 'OptionA', a: 'OptionA',
  optionb: 'OptionB', b: 'OptionB',
  optionc: 'OptionC', c: 'OptionC',
  optiond: 'OptionD', d: 'OptionD',
  correct: 'Correct', correctanswer: 'Correct', correctoption: 'Correct',
  solution: 'Solution', explanation: 'Solution'
};

router.post('/:collection', requireAuth, (req, res) => {
  const collection = req.params.collection;
  if (!ALLOWED_COLLECTIONS.has(collection)) {
    return res.status(400).json({ error: 'Bulk import is not available for this section.' });
  }

  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

    const mockId = (req.body.mockId || '').trim();
    if (!mockId) return res.status(400).json({ error: 'Pick which Mock Test / PYQ paper these questions belong to.' });

    let workbook;
    try {
      workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    } catch (e) {
      return res.status(400).json({ error: 'Could not read that file — make sure it\'s a valid .xlsx or .csv file.' });
    }
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawRows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    if (!rawRows.length) {
      return res.status(400).json({ error: 'That file has no data rows — check it against the template.' });
    }

    // Re-key every row using HEADER_MAP so it doesn't matter exactly how the
    // admin labeled their columns, as long as they're recognizable.
    const rows = rawRows.map(r => {
      const out = {};
      Object.keys(r).forEach(k => {
        const mapped = HEADER_MAP[normalizeHeader(k)];
        if (mapped) out[mapped] = String(r[k]).trim();
      });
      return out;
    });

    const existing = db.getCollection(collection);
    const added = [];
    const skipped = [];

    rows.forEach((r, i) => {
      const rowNum = i + 2; // +1 for header row, +1 for 1-based row numbering
      // A completely blank row (e.g. trailing empty line in the sheet) is
      // silently ignored rather than reported as an error.
      const isBlank = !r.Q && !r.OptionA && !r.OptionB && !r.OptionC && !r.OptionD;
      if (isBlank) return;

      const missing = ['Q', 'OptionA', 'OptionB', 'OptionC', 'OptionD', 'Correct'].filter(f => !r[f]);
      if (missing.length) {
        skipped.push({ row: rowNum, reason: `Missing: ${missing.join(', ')}` });
        return;
      }
      const correct = String(r.Correct).trim().toUpperCase();
      if (!['A', 'B', 'C', 'D'].includes(correct)) {
        skipped.push({ row: rowNum, reason: `Correct answer must be A, B, C or D (got "${r.Correct}")` });
        return;
      }

      const rec = {
        _id: db.nextId(existing.concat(added)),
        MockID: mockId,
        Passage: r.Passage || '',
        Q: r.Q,
        OptionA: r.OptionA,
        OptionB: r.OptionB,
        OptionC: r.OptionC,
        OptionD: r.OptionD,
        Correct: correct,
        Solution: r.Solution || ''
      };
      added.push(rec);
    });

    if (added.length) {
      db.setCollection(collection, existing.concat(added));
    }

    res.json({ ok: true, added: added.length, skipped });
  });
});

module.exports = router;
