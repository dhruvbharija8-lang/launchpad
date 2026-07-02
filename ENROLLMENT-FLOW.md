# Enrollment Flow — How a student goes from "interested" to "inside the dashboard"

**Status: PROPOSAL — for approval before we build.**
This maps the journey when a student enrolls in a program. It connects three things
that already exist (the marketing site, the cart, and the student dashboard) into one
loop, and it plugs into the Google Sheet that now powers the dashboard
(see `CONTENT-GUIDE.md`).

---

## The flow at a glance

```
 1 DISCOVER         2 SELECT            3 CHECKOUT          4 PAY
 Home / Courses  →  Add to cart      →  Enter details   →  Payment
 (browse)           (group offer)       name/email/phone    (or simulate)
                                            │
                                            ▼
 8 DASHBOARD     ←  7 LOG IN          ←  6 GET ACCESS    ←  5 PROVISION ACCOUNT
 sees their         login.html           credentials         add rows to the
 programs &         (email + pass)       emailed/shown       Google Sheet
 materials                                                    (Students + Enrollments)
```

The dashboard then reads those new sheet rows and the student sees exactly the
programs they paid for — with all materials surfaced directly on the site.

---

## Step by step

**1. Discover** — Student lands on `index.html` or `courses.html`, compares programs,
sees pricing and the group offer.

**2. Select / Cart** — Student adds one or more programs to the cart. The existing
group-offer rule applies (e.g. *2 students enroll together → 30% off*).

**3. Checkout** — A checkout step collects what we need to create their account:
**Name, Email, Phone, College, and the chosen program(s)**. (Email becomes their login.)

**4. Payment** — Two options, see "Decisions" below. Either a real payment gateway, or
a simulated/manual confirmation for the prototype.

**5. Provision account** — On success, the student's details are written to the Google
Sheet:
- one row in **`Students`** (Email, Password, Name, Role, progress counters)
- one row per program in **`Enrollments`** (Email + ProgramCode)

**6. Get access** — The student is given their login (email + an auto-generated or
chosen password), shown on screen and/or emailed.

**7. Log in** — Student goes to `login.html` and signs in.

**8. Dashboard** — The dashboard reads the sheet, finds their enrollments, and shows
their programs, sessions, progress, and the full materials library for what they bought.

---

## Two ways to build it

### Option A — Prototype path (recommended now, no full backend)
Fits the current static site + Google Sheet setup.

- **Checkout form** collects details on the site.
- **Payment**: either a real gateway button (e.g. Razorpay/UPI) *or* "Pay via UPI /
  confirm manually" for the prototype.
- **Account creation**: a small **Google Apps Script** attached to the same Sheet
  receives the checkout form and auto-adds the `Students` + `Enrollments` rows. No
  server to host or maintain.
- **Credentials**: auto-emailed by the same script (or shown on the success screen).

*Pros:* cheap, fast, stays inside Google. *Cons:* passwords still checked in the
browser — fine for a prototype, not for scale.

### Option B — Production path (when going fully live with real money)
- Real payment gateway with server-side verification.
- A proper backend + database for accounts and **secure** login (hashed passwords,
  sessions). The Google Sheet can stay as the *content* source (programs, sessions,
  materials); only **student accounts/auth** move to the backend.
- Automated credential emails, password reset, receipts.

> The dashboard and sheet structure built now **carry over unchanged** to Option B —
> only *where login is verified* and *where payment is confirmed* change.

---

## Decisions I need from you

1. **Payment for the prototype** — real gateway now, or simulate/manual (UPI +
   confirmation) and add the gateway later?
2. **Account creation** — fully automatic via Apps Script (student logs in instantly),
   or admin manually adds them to the sheet after each enrollment?
3. **Password** — auto-generate and email it, or let the student choose one at checkout?
4. **Group offer mechanics** — how should "2 students together" be entered at checkout
   (referral code? both emails on one order?) so we can wire the 30% discount correctly.

Once you pick, I'll build the checkout → provisioning → login loop to match.
