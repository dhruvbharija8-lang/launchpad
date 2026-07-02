const express = require('express');
const auth = require('../lib/auth');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const result = auth.login(username, password);
  if (!result) return res.status(401).json({ error: 'Wrong username or password' });
  res.json(result);
});

router.post('/change-password', auth.requireAuth, (req, res) => {
  const { oldPassword, newPassword } = req.body || {};
  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }
  try {
    auth.changePassword(req.admin.uid, oldPassword, newPassword);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/me', auth.requireAuth, (req, res) => {
  res.json({ username: req.admin.username });
});

module.exports = router;
