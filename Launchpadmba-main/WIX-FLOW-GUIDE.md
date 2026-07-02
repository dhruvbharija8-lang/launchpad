# MBA Partner — Enrolment & Login Flow on Wix (Members + Velo + Razorpay)

This is the build plan for the flow you described:

> New student: browse → pick course(s) (solo or with a friend) → cart → checkout
> (name, email, password) → **pay** → account created with that course → lands on the
> dashboard.
> Returning student: opens the site / logs in → **goes straight to the dashboard, not
> the home page.**

Because you chose **real auth + real payments**, this lives on **Wix** (your production
platform), using **Wix Members** (accounts), **Wix Pricing Plans** (a "course" = a plan
the student buys to unlock access), **Razorpay in test mode** (payment), and **Velo**
(the code). The dashboard is a **Members-only page**.

> What I can do: write all the Velo code + the exact setup steps.
> What you do: paste the code in Wix, create the plans, and connect **your** Razorpay
> **test** keys (I never handle keys or run live payments).

---

## 1. Architecture — how the pieces map

| Your flow step | Wix building block |
|---|---|
| Account (name/email/password) | **Wix Members** (`wix-members-backend` register/login) |
| A course you buy to get access | **Wix Pricing Plan** (one plan per course) |
| Combo (bundle) | A single "bundle" Pricing Plan, or a multi-plan order |
| 2-students-30%-off | A **Pricing Plans coupon** applied at checkout |
| Payment | **Razorpay (test)** via Wix Accept Payments + `wix-pay` |
| Dashboard | A **Members-only page** (`/dashboard`) |
| "Logged in → skip home" | Velo redirect on the Home page |

Why Pricing Plans (not Stores): a plan ties **ongoing access** to a purchase, which is
exactly "bought the course → can see the dashboard content." Stores is better for
one-off physical/digital products.

---

## 2. One-time setup in the Wix dashboard (no code)

1. **Turn on Members:** Add the **Members Area** app (this enables signup/login and the
   `wix-members` APIs). Add a Login/Signup button to the header.
2. **Connect Razorpay (test):** Wix dashboard → **Accept Payments** → *See more options*
   → **Razorpay → Connect** → enter your Razorpay **test** Key Id + Key Secret + Site
   URL. (Needs a Wix Premium plan that supports payments. Set Razorpay to **Test Mode**.)
   Add Razorpay's webhook as per their Wix guide so payment status syncs.
3. **Create one Pricing Plan per course** (Pricing Plans app): Placement Bootcamp
   (Master / Mini as two plans or one plan with options), Live Project, Case
   Competitions, the combos, certifications, etc. Set each plan's price to match the
   sheet. Note each **planId** (you'll paste these into the code).
4. **Create a coupon** `GROUP30` = 30% off (for the 2-student offer).
5. **Add a `Dashboard` page**, then set its **Permissions → "Members only"** (Page
   Settings → Permissions). This alone stops non-logged-in users from seeing it.
6. **Enable Dev Mode (Velo)** from the top bar so you can add the code below.

---

## 3. Velo code

> Paste backend files under **Backend** (`.jsw` = callable from the page). Paste page
> code in each page's **onReady**. Store the Razorpay Key **Secret** only in **Wix
> Secrets Manager**, never in code. Verify exact function signatures against the linked
> docs (Wix updates APIs) — see Sources at the end.

### 3a. Backend — accounts: `backend/accounts.jsw`
```js
import { authentication } from 'wix-members-backend';

// Register a new student (called from checkout). Returns a session token.
export async function registerStudent(email, password, fullName) {
  const result = await authentication.register(email, password, {
    contactInfo: { firstName: fullName }
  });
  // result.status is 'ACTIVE' (logged in) or 'PENDING' (needs approval/email confirm)
  return result; // contains sessionToken when ACTIVE
}

// Log an existing student in. Returns a session token.
export async function loginStudent(email, password) {
  return authentication.login(email, password); // -> sessionToken
}
```

### 3b. Backend — buy a course: `backend/enroll.jsw`
```js
import { checkout } from 'wix-pricing-plans-backend';

// Create an online order for a plan; returns { orderId, wixPayOrderId } to pay.
export async function createCourseOrder(planId, couponCode) {
  const order = await checkout.createOnlineOrder(planId, {
    couponCode: couponCode || undefined
  });
  return { orderId: order._id, wixPayOrderId: order.wixPayOrderId };
}
```

### 3c. Checkout page — signup → pay → dashboard
```js
import { authentication } from 'wix-members-frontend';
import wixPay from 'wix-pay-frontend';
import wixLocation from 'wix-location-frontend';
import { registerStudent } from 'backend/accounts';
import { createCourseOrder } from 'backend/enroll';

// Wire your form's "Pay & Enrol" button to this.
export async function payEnrol_click(event) {
  const name = $w('#nameInput').value.trim();
  const email = $w('#emailInput').value.trim();
  const password = $w('#passwordInput').value;
  const planId = $w('#planId').text;        // set from the course they picked
  const coupon = $w('#couponInput').value;  // 'GROUP30' if friend offer applied

  // 1) create the account and log them in
  const reg = await registerStudent(email, password, name);
  if (reg.sessionToken) await authentication.applySessionToken(reg.sessionToken);

  // 2) create the plan order, then open Razorpay (test) checkout
  const { wixPayOrderId } = await createCourseOrder(planId, coupon);
  const result = await wixPay.startPayment(wixPayOrderId);

  // 3) on success, drop them into the dashboard
  if (result.status === 'Successful') {
    wixLocation.to('/dashboard');
  } else {
    $w('#payError').text = 'Payment not completed. Please try again.';
    $w('#payError').show();
  }
}
```

### 3d. Home page — send logged-in students straight to the dashboard
```js
import { currentMember } from 'wix-members-frontend';
import wixLocation from 'wix-location-frontend';

$w.onReady(async () => {
  const member = await currentMember.getMember();
  if (member) wixLocation.to('/dashboard');   // skip home when logged in
});
```

### 3e. Login page (or login lightbox) — log in → dashboard
```js
import { authentication } from 'wix-members-frontend';
import wixLocation from 'wix-location-frontend';
import { loginStudent } from 'backend/accounts';

export async function loginBtn_click(event) {
  const email = $w('#loginEmail').value.trim();
  const password = $w('#loginPassword').value;
  try {
    const token = await loginStudent(email, password);
    await authentication.applySessionToken(token);
    wixLocation.to('/dashboard');
  } catch (e) {
    $w('#loginError').text = 'Wrong email or password.';
    $w('#loginError').show();
  }
}
```
*(Simpler alternative: use Wix's built-in login lightbox and set Members → "after
login, send members to" → the Dashboard page, no code needed.)*

### 3f. Dashboard page (Members-only) — show what they bought
```js
import { currentMember } from 'wix-members-frontend';
import { orders } from 'wix-pricing-plans-backend'; // call via a backend .jsw wrapper

$w.onReady(async () => {
  const member = await currentMember.getMember({ fieldsets: ['FULL'] });
  $w('#welcome').text = `Welcome, ${member.contactDetails.firstName || 'Student'}!`;
  // Load this member's plan orders (write a backend wrapper around orders.listOrders /
  // memberListOrders) and render their courses, sessions and materials.
});
```

---

## 4. Combos & the 2-student group offer

- **Combo:** make a dedicated "bundle" Pricing Plan priced like the combo, OR let the
  cart create multiple plan orders in one go. The "you save ₹X vs separately" line we
  already compute can show on the course page.
- **Group offer:** the friend enters their email at checkout; you pass `couponCode:
  'GROUP30'` into `createCourseOrder` for **both** students' orders. Wix applies the 30%.
  (Track the pairing by saving both emails to a Wix collection if you want to enforce
  "both must enrol".)

---

## 5. Test mode (for the finals) & go-live

- Keep Razorpay in **Test Mode** and use Razorpay **test cards/UPI** — real flow, no real
  money. Demo the full loop: enrol → pay (test) → land on dashboard → log out → log in →
  straight back to dashboard.
- **Go live later:** switch Razorpay to live keys, re-test one real ₹1 transaction, done.
- **Security:** Key **Secret** lives in **Wix Secrets Manager**, not code. Never commit
  keys. Confirm the Razorpay **webhook** is set so Wix marks orders paid reliably.

---

## 6. How this maps back to what we already built

The custom LaunchPad site already has the **UX** for this (cart, checkout fields, the
group-offer panel, the dashboard, and "remember me → dashboard"). On Wix you're
re-creating that UX with Wix Members/Pricing Plans doing the real auth + payment. The
content (courses, materials, testimonials, mentors) can keep coming from your Google
Sheet, or move into Wix Collections — either works.

---

## Sources
- [Wix Members – Frontend (auth, current member)](https://dev.wix.com/docs/velo/apis/wix-members-frontend/introduction)
- [Wix Members – Backend (register / login)](https://dev.wix.com/docs/velo/apis/wix-members-backend/authentication/login)
- [Building Your Own Members Area (Velo tutorial)](https://support.wix.com/en/article/velo-tutorial-building-your-own-members-area)
- [Redirecting members to a specific page upon signup/login](https://support.wix.com/en/article/site-members-request-redirecting-members-to-a-specific-page-upon-signuplogin)
- [Pricing Plans – Checkout (create online order)](https://dev.wix.com/docs/velo/api-reference/wix-pricing-plans-backend/checkout/create-online-order)
- [Pricing Plans ordering & payment (Velo tutorial)](https://support.wix.com/en/article/velo-tutorial-using-the-pricing-plans-api-for-pricing-plan-ordering-and-payment)
- [Connecting Razorpay as a payment provider on Wix](https://support.wix.com/en/article/connecting-razorpay-as-a-payment-provider)
- [Razorpay × Wix integration steps](https://razorpay.com/docs/payments/payment-gateway/ecommerce-plugins/wix/integration-steps/?preferred-country=IN)
