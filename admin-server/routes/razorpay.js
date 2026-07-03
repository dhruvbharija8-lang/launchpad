const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const db = require('../lib/db');
const { autoProvisionFromSubmission } = require('./resource');

const router = express.Router();

function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error('Razorpay API keys are not configured');
  }
  return new Razorpay({ key_id, key_secret });
}

router.post('/order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body || {};
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'A valid amount is required' });
    }
    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: receipt || `order_${Date.now()}`,
      payment_capture: 1,
      notes: notes || {}
    });
    res.json({ ok: true, key_id: process.env.RAZORPAY_KEY_ID, ...order });
  } catch (err) {
    console.error('Razorpay order creation failed:', err);
    res.status(500).json({ error: err.message || 'Unable to create Razorpay order' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, order } = req.body || {};
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing Razorpay payment details' });
    }
    if (!order || typeof order !== 'object') {
      return res.status(400).json({ error: 'Missing order payload' });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return res.status(500).json({ error: 'Razorpay secret not configured' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid Razorpay signature' });
    }

    const rows = db.getCollection('orders');
    const record = {
      _id: db.nextId(rows),
      ...order,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      PaymentMethod: 'Razorpay',
      submittedAt: new Date().toISOString()
    };
    rows.push(record);
    db.setCollection('orders', rows);
    try {
      autoProvisionFromSubmission('orders', record);
    } catch (err) {
      console.error('Auto-provisioning failed after Razorpay payment:', err);
    }
    res.json({ ok: true, order: record });
  } catch (err) {
    console.error('Razorpay verification failed:', err);
    res.status(500).json({ error: err.message || 'Unable to verify payment' });
  }
});

module.exports = router;
