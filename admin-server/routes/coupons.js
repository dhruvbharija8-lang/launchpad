const express = require('express');
const db = require('../lib/db');
const router = express.Router();

router.post('/validate', (req, res) => {
  const { code, subtotal, courseIds, email } = req.body || {};
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
  // Offline-payment coupons: locked to one specific student's email so
  // nobody else can pick up and use the code.
  if (coupon.restrictedEmail) {
    const given = String(email || '').trim().toLowerCase();
    if (!given || given !== String(coupon.restrictedEmail).trim().toLowerCase()) {
      return res.json({ valid: false, message: 'This coupon is registered to a different email address.' });
    }
  }
  // If the admin restricted this coupon to specific course(s), the cart must
  // contain at least one of them for the code to be valid.
  if (Array.isArray(coupon.courseIds) && coupon.courseIds.length) {
    const cartCourseIds = Array.isArray(courseIds) ? courseIds : [];
    const overlaps = coupon.courseIds.some(id => cartCourseIds.includes(id));
    if (!overlaps) {
      return res.json({ valid: false, message: 'This coupon only applies to specific course(s) — add one of them to your cart to use it' });
    }
  }
  const base = Number(subtotal) || 0;
  let discount = 0;
  if (coupon.type === 'percent') discount = Math.round(base * Number(coupon.value) / 100);
  else if (coupon.type === 'flat') discount = Math.min(Number(coupon.value), base);
  res.json({ valid: true, code: coupon.code, type: coupon.type, value: coupon.value, discount, message: 'Coupon applied' });
});

module.exports = router;
