/* ============================================================
   BULK IMPORT (Excel/CSV)
   ------------------------------------------------------------
   Two kinds of bulk import live here:

   1) QUESTION_COLLECTIONS (catQuestions, catPyqQuestions) — one row per
      question for a Mock Test/PYQ paper, tied to a MockID picked in the
      admin UI. Unchanged from the original version of this file.

   2) SIMPLE_LIST_CONFIGS — plain "one row per record" sections where the
      admin often adds many similar rows at once (Placements Wall, GDPI
      Quotes, Hall of Fame, Mentors, CAT Domain Q&A, Study Materials).
      Each entry describes its own column headers/aliases/validation so a
      single generic engine can handle all of them.
============================================================ */
const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const db = require('../lib/db');
const { requireAuth } = require('../lib/auth');

const QUESTION_COLLECTIONS = new Set(['catQuestions', 'catPyqQuestions']);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB is plenty for a spreadsheet of rows
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

/* ---------------- 1) QUESTION IMPORT (unchanged behaviour) ---------------- */
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

function handleQuestionImport(req, res, collection) {
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

  if (added.length) db.setCollection(collection, existing.concat(added));
  res.json({ ok: true, added: added.length, skipped });
}

/* ---------------- 2) SIMPLE LIST IMPORT (new, generic) ----------------
   Each config lists: the real field names, which are required, a map of
   normalized-header -> field name (so the admin's own column wording is
   flexible), and optional per-collection extras (custom validation, or a
   transform applied after mapping — e.g. splitting Study Materials'
   pipe-separated drive links into an array). */
const SIMPLE_LIST_CONFIGS = {
  placements: {
    fields: ['Track', 'Name', 'College', 'Company', 'Batch', 'Domain', 'Image'],
    required: ['Name'],
    aliases: {
      track: 'Track', showonwhichtoggle: 'Track',
      name: 'Name', studentname: 'Name',
      college: 'College',
      company: 'Company',
      batch: 'Batch',
      domain: 'Domain',
      image: 'Image', avatarimageurl: 'Image', avatar: 'Image'
    },
    validate: row => {
      if (row.Track && !['mba', 'cat'].includes(row.Track.toLowerCase())) return 'Track must be "mba" or "cat"';
      if (row.Batch && !['final', 'summer'].includes(row.Batch.toLowerCase())) return 'Batch must be "final" or "summer"';
      return null;
    },
    normalize: row => {
      if (row.Track) row.Track = row.Track.toLowerCase();
      if (row.Batch) row.Batch = row.Batch.toLowerCase();
    }
  },
  gdpi: {
    fields: ['Name', 'College', 'Quote'],
    required: ['Name'],
    aliases: { name: 'Name', studentname: 'Name', college: 'College', quote: 'Quote' }
  },
  hallOfFame: {
    fields: ['Name', 'School', 'Company', 'Quote', 'Photo', 'LinkedIn'],
    required: ['Name', 'Quote'],
    aliases: {
      name: 'Name', studentname: 'Name',
      school: 'School', bschool: 'School',
      company: 'Company', companyoutcome: 'Company',
      quote: 'Quote',
      photo: 'Photo', photourl: 'Photo',
      linkedin: 'LinkedIn', linkedinprofileurl: 'LinkedIn', linkedinurl: 'LinkedIn'
    }
  },
  mentors: {
    fields: ['Name', 'School', 'Company', 'Domain', 'LinkedIn'],
    required: ['Name'],
    aliases: {
      name: 'Name', mentorname: 'Name',
      school: 'School', bschool: 'School',
      company: 'Company', domain: 'Domain',
      linkedin: 'LinkedIn', linkedinurl: 'LinkedIn'
    }
  },
  catDomainQA: {
    fields: ['Domain', 'Title', 'Meta', 'Link'],
    required: ['Domain', 'Title'],
    aliases: {
      domain: 'Domain', title: 'Title',
      meta: 'Meta', smalldescription: 'Meta', description: 'Meta',
      link: 'Link'
    }
  },
  materials: {
    fields: ['ProgramCode', 'Domain', 'Category', 'driveLinks'],
    required: ['ProgramCode'],
    aliases: {
      programcode: 'ProgramCode', course: 'ProgramCode', courseid: 'ProgramCode',
      domain: 'Domain',
      category: 'Category',
      drivelinks: 'driveLinks', drivelink: 'driveLinks', links: 'driveLinks', link: 'driveLinks'
    },
    // Program row must actually exist as a real course id — this is checked
    // in handleSimpleListImport (needs a DB lookup, so it's not a pure
    // per-row validate() function).
    normalize: row => {
      if (row.driveLinks) {
        row.driveLinks = String(row.driveLinks).split('|').map(s => s.trim()).filter(Boolean);
      } else {
        row.driveLinks = [];
      }
    }
  }
};

function buildAliasMap(cfg) {
  // Every field also maps to itself (normalized), on top of any custom aliases.
  const map = { ...(cfg.aliases || {}) };
  cfg.fields.forEach(f => { map[normalizeHeader(f)] = f; });
  return map;
}

function handleSimpleListImport(req, res, collection, cfg) {
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

  const aliasMap = buildAliasMap(cfg);
  const rows = rawRows.map(r => {
    const out = {};
    Object.keys(r).forEach(k => {
      const mapped = aliasMap[normalizeHeader(k)];
      if (mapped) out[mapped] = typeof r[k] === 'string' ? r[k].trim() : r[k];
    });
    return out;
  });

  // For 'materials', ProgramCode must match a real course id.
  let validCourseIds = null;
  if (collection === 'materials') {
    validCourseIds = new Set(db.getCollection('courses').map(c => c.id));
  }

  const existing = db.getCollection(collection);
  const added = [];
  const skipped = [];

  rows.forEach((r, i) => {
    const rowNum = i + 2;
    const isBlank = cfg.fields.every(f => !r[f] || (Array.isArray(r[f]) && !r[f].length));
    if (isBlank) return;

    const missing = cfg.required.filter(f => !r[f]);
    if (missing.length) {
      skipped.push({ row: rowNum, reason: `Missing: ${missing.join(', ')}` });
      return;
    }
    if (cfg.normalize) cfg.normalize(r);
    if (cfg.validate) {
      const err = cfg.validate(r);
      if (err) { skipped.push({ row: rowNum, reason: err }); return; }
    }
    if (validCourseIds && r.ProgramCode && !validCourseIds.has(r.ProgramCode)) {
      skipped.push({ row: rowNum, reason: `No course with id "${r.ProgramCode}" — check the Courses & Pricing section for the exact id.` });
      return;
    }

    const rec = { _id: db.nextId(existing.concat(added)) };
    cfg.fields.forEach(f => { rec[f] = r[f] !== undefined ? r[f] : (f === 'driveLinks' ? [] : ''); });
    added.push(rec);
  });

  if (added.length) db.setCollection(collection, existing.concat(added));
  res.json({ ok: true, added: added.length, skipped });
}

router.post('/:collection', requireAuth, (req, res) => {
  const collection = req.params.collection;
  const isQuestionImport = QUESTION_COLLECTIONS.has(collection);
  const simpleCfg = SIMPLE_LIST_CONFIGS[collection];
  if (!isQuestionImport && !simpleCfg) {
    return res.status(400).json({ error: 'Bulk import is not available for this section.' });
  }

  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

    if (isQuestionImport) return handleQuestionImport(req, res, collection);
    return handleSimpleListImport(req, res, collection, simpleCfg);
  });
});

module.exports = router;
