const express = require('express');
const db = require('../lib/db');
const { requireAuth } = require('../lib/auth');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.getSingleton('settings'));
});

router.put('/', requireAuth, (req, res) => {
  const current = db.getSingleton('settings');
  const updated = { ...current, ...req.body };
  db.setSingleton('settings', updated);
  res.json(updated);
});

module.exports = router;
