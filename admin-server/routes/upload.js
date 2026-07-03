/* ============================================================
   File upload — used by the admin dashboard to upload PYQ PDFs
   (and any other reference file). Files are saved to
   admin-server/uploads/ and served publicly at /uploads/<filename>
   so students can open/download them from the live site.
============================================================ */
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { requireAuth } = require('../lib/auth');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, Date.now() + '-' + safe);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    const ok = ['application/pdf'].includes(file.mimetype) || /\.pdf$/i.test(file.originalname);
    cb(ok ? null : new Error('Only PDF files are allowed'), ok);
  }
});

const router = express.Router();

router.post('/', requireAuth, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: '/uploads/' + req.file.filename, name: req.file.originalname });
  });
});

module.exports = { router, UPLOAD_DIR };
