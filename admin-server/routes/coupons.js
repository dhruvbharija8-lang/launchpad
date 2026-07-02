const express = require('express');
const db = require('../lib/db');
const router = express.Router();

router.post('/validate', (req, res) => {
  const { code, subtotal } = req.body || {};
  if (!code) return res.status(400).json({ valid: false, message: 'No code provided' });
  const coupons = db.getCollection('coupons');
  const coupon = coupons.find(c => (c.code || '').toUpperCase() === String(code).toUpperCase());
  if (!coupon || !coupon.active) {
    return res.json({ valid: false, message: 'Invalid coupon code' });
  }
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return res.json({ valid: false, message: 'This coupon has expired' });
  }
  if (coupon.usageLimit != null && Number(coupon.usedCount || 0) >= Number(coupon.usageLimit)) {
    return res.json({ valid: false, message: 'This coupon has reached its usage limit' });
  }
  const base = Number(subtotal) || 0;
  let discount = 0;
  if (coupon.type === 'percent') discount = Math.round(base * Number(coupon.value) / 100);
  else if (coupon.type === 'flat') discount = Math.min(Number(coupon.value), base);
  res.json({ valid: true, code: coupon.code, type: coupon.type, value: coupon.value, discount, message: 'Coupon applied' });
});

module.exports = router;
