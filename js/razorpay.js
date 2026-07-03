const RAZORPAY_CHECKOUT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

function getApiBase() {
  return (typeof MBA_API_BASE !== 'undefined') ? MBA_API_BASE : '';
}

function loadRazorpaySdk() {
  if (window.Razorpay) return Promise.resolve();
  if (window.__razorpaySdkLoading) return window.__razorpaySdkLoading;

  window.__razorpaySdkLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = RAZORPAY_CHECKOUT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay Checkout SDK'));
    document.head.appendChild(script);
  });

  return window.__razorpaySdkLoading;
}

async function createRazorpayOrder(amount, receipt, notes = {}) {
  const base = getApiBase();
  const res = await fetch(base + '/api/public/razorpay/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, receipt, notes })
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch (e) {
    throw new Error(`Razorpay order request failed (${res.status}): ${text}`);
  }
  if (!res.ok) throw new Error(json.error || `Unable to create payment order (${res.status})`);
  return json;
}

async function verifyRazorpayPayment(payload) {
  const base = getApiBase();
  const res = await fetch(base + '/api/public/razorpay/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch (e) {
    throw new Error(`Razorpay verify request failed (${res.status}): ${text}`);
  }
  if (!res.ok) throw new Error(json.error || `Unable to verify payment (${res.status})`);
  return json;
}

async function startRazorpayCheckout(orderData, checkoutData) {
  await loadRazorpaySdk();
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) return reject(new Error('Razorpay Checkout SDK is unavailable.'));

    const options = {
      key: orderData.key_id,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'MBA Partner',
      description: checkoutData.Items || checkoutData.ItemIds || 'MBA Partner Purchase',
      order_id: orderData.id,
      prefill: {
        name: checkoutData.Name || '',
        email: checkoutData.Email || '',
        contact: checkoutData.Phone || ''
      },
      notes: checkoutData.notes || {},
      theme: { color: '#1d4ed8' },
      handler: async function (response) {
        try {
          const verifyResult = await verifyRazorpayPayment({
            ...response,
            order: checkoutData
          });
          resolve(verifyResult);
        } catch (err) {
          reject(err);
        }
      },
      modal: {
        ondismiss: function () {
          reject(new Error('Payment was cancelled.'));
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });
}
