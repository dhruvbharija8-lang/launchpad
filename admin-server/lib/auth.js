const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-.env';
const TOKEN_TTL = '12h';

function ensureAdminSeeded() {
  const data = db.readAll();
  if (!data.adminUsers || !data.adminUsers.length) {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
    const passwordHash = bcrypt.hashSync(password, 10);
    data.adminUsers = [{ _id: 'id1', username, passwordHash }];
    db.writeAll(data);
    console.log('----------------------------------------------------------');
    console.log('Created default admin login:');
    console.log('  username:', username);
    console.log('  password:', password, '(set ADMIN_USERNAME / ADMIN_PASSWORD in .env to change this)');
    console.log('----------------------------------------------------------');
  }
}

function login(username, password) {
  const users = db.getCollection('adminUsers');
  const user = users.find(u => u.username.toLowerCase() === String(username || '').toLowerCase());
  if (!user) return null;
  if (!bcrypt.compareSync(password || '', user.passwordHash)) return null;
  const token = jwt.sign({ uid: user._id, username: user.username }, JWT_SECRET, { expiresIn: TOKEN_TTL });
  return { token, username: user.username };
}

function changePassword(uid, oldPassword, newPassword) {
  const users = db.getCollection('adminUsers');
  const user = users.find(u => u._id === uid);
  if (!user) throw new Error('User not found');
  if (!bcrypt.compareSync(oldPassword || '', user.passwordHash)) throw new Error('Current password is incorrect');
  user.passwordHash = bcrypt.hashSync(newPassword, 10);
  db.setCollection('adminUsers', users);
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { ensureAdminSeeded, login, changePassword, requireAuth };
