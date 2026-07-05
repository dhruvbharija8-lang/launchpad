# MBA Partner — Website

> **Get Mentored. Get Placed.** — An initiative by alumni of old IIMs.
> Marketing site + student dashboard + CAT/OMETs prep portal for MBA Partner.

A fast, static (HTML / CSS / vanilla JS) website whose content is **driven by Google
Sheets** — the team edits a sheet, the site updates. No build step, no framework.
Built to deploy on **Netlify** and embed on the live **Wix** site.

---

## ✨ Highlights

- **Two audiences, one site** — an MBA-student track and a CAT/OMETs-aspirant track
  (persona toggle on the home page).
- **Sheet-driven everywhere** — courses, pricing, testimonials, placements, mentors,
  college tie-ups, video testimonials, dashboard content and the whole CAT portal read
  from Google Sheets, with built-in sample data so the site always works offline.
- **Student dashboard** — login → personalised dashboard with inline study materials,
  live sessions, and CV/PI/GD progress.
- **CAT/OMETs prep portal** — free material, on-site mock tests, leaderboard, GDPI
  resources, domain Q&A, mentors and pricing.
- **Tools** — Exam & College Predictor and a CAT College Predictor.
- **Conversion features** — course compare + combo-savings, 2-student group offer,
  apply-to-be-a-mentor, and a one-time "why choose us" popup.

---

## 📂 Project structure

```
LaunchPad/
├── index.html              # Home (MBA + CAT personas, mentors, college collab, free sessions, USP popup)
├── courses.html            # Course catalogue, compare, combo savings, cart & checkout
├── testimonials.html       # Quote testimonials, placements wall, video testimonials
├── login.html              # Student login + dashboard
├── brochure.html           # Program brochure
├── exam-predictor.html     # MBA Exam & College Predictor (8 exams, dropdown)
├── cat-predictor.html      # CAT College Predictor (percentile vs score)
├── cat-portal.html         # CAT / OMETs prep portal (mocks, leaderboard, GDPI, pricing)
│
├── css/                    # one stylesheet per page
│   ├── home.css  courses.css  style.css  login.css
│   └── brochure.css  exam-predictor.css  cat-predictor.css  cat-portal.css
│
├── js/
│   ├── main.js             # Home page logic
│   ├── search.js           # Courses page (catalogue, compare, cart, checkout)
│   ├── navbar.js           # Testimonials page (quotes, placements wall, video lightbox)
│   ├── form.js             # Student dashboard logic
│   ├── animations.js       # Brochure animations
│   ├── exam-predictor.js   cat-predictor.js   cat-portal.js
│   │
│   ├── site-data.js        # DATA LAYER: placements, mentors, colleges, videos, GDPI
│   ├── dashboard-data.js   # DATA LAYER: students, programs, enrollments, sessions, materials
│   └── courses-dynamic.js  # DATA LAYER: live course pricing + combo-savings logic
│                           #   (cat-portal.js embeds its own CAT data layer)
│
├── admin/                   # Admin dashboard (no-code editing UI)
│   ├── index.html           #   Login page
│   ├── dashboard.html       #   Main dashboard (all editable sections)
│   └── admin.js / admin-config.js / admin.css
│
├── admin-server/            # Serves the WHOLE project — website + admin + API
│   ├── app.js               #   Entry point — run with `node app.js`
│   ├── seed.js               #   Seeds data/db.json with the site's sample data
│   ├── lib/                 #   Datastore (JSON file) + auth (JWT + bcrypt)
│   └── routes/               #   REST endpoints — /api/public/* and /api/admin/*
│
├── js/api-config.js        # Points the site at the admin-server API (MBA_API_BASE)
├── js/site-settings.js     # Injects live homepage stats (data-stat="..." elements)
│
├── CONTENT-GUIDE.md        # How the (non-technical) team edits the Google Sheet (legacy path)
├── ADMIN-GUIDE.md          # How the owner uses the admin dashboard (current path)
├── ENROLLMENT-FLOW.md      # Enrol → account → dashboard flow (plan)
├── WIX-FLOW-GUIDE.md       # Real auth + payments on Wix (Members + Velo + Razorpay)
└── README.md               # You are here
```

---

## 🚀 Run it locally

It's a static site — no install needed.

- **Easiest:** open `index.html` in a browser, **or**
- **Recommended:** use a local server so relative paths and `fetch` behave (e.g. the
  VS Code **Live Server** extension → "Open with Live Server").

### Demo logins (student dashboard)
Open `login.html` and use the demo buttons, or sign in with:

| Email | Password |
|---|---|
| `ananya@iimb.ac.in` | `Placement2025` |
| `rohan@iima.ac.in` | `Bundle2025` |
| `demo1@iima.ac.in` … `demo4@…` | `12345678` |

---

## 🛠️ Admin Dashboard (edit the site without touching code)

The site now has a proper **admin dashboard** — a non-technical owner can log in and
edit courses & pricing, coupons, homepage trust stats (e.g. the "9.6/10" rating),
placements, mentors, colleges, video testimonials, and the whole student dashboard
(programs, sessions, materials, students, enrollments) — changes go live immediately,
no code or spreadsheet needed.

`admin-server/` serves the **whole project from one Node app** — the website itself,
the admin dashboard, and the API all come from one URL. This means:
- **Locally:** `cd admin-server && npm install && node app.js`, then open
  `http://localhost:4000` for the site and `http://localhost:4000/admin` for the
  dashboard. (Don't open `index.html` directly — go through that URL so the page can
  reach the API.)
- **Deployed:** put `admin-server/` on a Node host (Render/Railway/Fly.io — Netlify
  can't run this, it only serves static files). One deploy covers the whole site.
- **Full guide for the site owner:** see **ADMIN-GUIDE.md**.

If the admin API isn't reachable for any reason, every page falls back to the Google
Sheet (if configured) or built-in sample data below, so the site never breaks.

---

## 🔌 How the data works (Google Sheets)

Each data layer ships with **sample data** and a `SHEET_ID` that is empty by default —
so the site runs as a full demo out of the box. To make a section **live**, create the
matching tabs in a Google Sheet, publish it, and paste the Sheet ID into one line:

| File | Config line | Powers |
|---|---|---|
| `js/site-data.js` | `SITE_SHEET.SHEET_ID` | Placements, Mentors, Colleges, Videos, GDPI |
| `js/dashboard-data.js` | `SHEET_CONFIG.SHEET_ID` | Students, Programs, Enrollments, Sessions, Materials |
| `js/courses-dynamic.js` | `COURSES_SHEET.SHEET_ID` | Live course pricing |
| `js/cat-portal.js` | `CAT_SHEET.SHEET_ID` | CAT materials, mocks, questions, leaderboard, GDPI, domain Q&A, mentors, pricing |

If a sheet ever fails to load, the site automatically falls back to sample data, so it
never breaks. **Full tab/column reference for the team is in `CONTENT-GUIDE.md`.**

> 🔒 **Privacy:** only public-safe fields (name, college, company, domain) go on the
> public site — never student emails or phone numbers.

---

## 🌐 Deployment

1. Push this folder to a Git repo.
2. Connect it to **Netlify** (no build command; publish directory = project root).
3. Embed the Netlify URL on the live **Wix** site (iframe / HTML embed).

Real **accounts + payments** are planned on Wix (Wix Members + Velo + Razorpay) — see
`WIX-FLOW-GUIDE.md`. Use Razorpay **test mode** for demos.

---

## 🛠 Tech

- **Frontend:** HTML5, CSS3, vanilla JavaScript (ES6+) — no framework, no build step.
- **Data:** Google Sheets via the public `gviz` JSON endpoint, with sample-data fallback.
- **Icons:** Tabler Icons (CDN) · **Fonts:** Google Fonts (Poppins, Inter).
- **Sessions:** browser `localStorage` (key `mbaPartnerSession`).
- **Theme:** navy + orange, mobile-first responsive.

---

## ✅ Status

**Done:** Home (both personas) · Courses with compare + combo savings · Student
dashboard · Testimonials (quotes + placements wall + video testimonials) · Mentors +
apply-to-mentor · College Collab · 2-student group offer · Free sessions · USP popup ·
Exam & CAT predictors · **CAT/OMETs prep portal** · sheet-ready dynamic pricing ·
**admin dashboard** (courses/pricing/coupons/homepage stats/testimonials/mentors/
dashboard content, all no-code, single-app deploy).

**Pending:** real course fees (awaiting brochure content) · general FAQ + chatbot ·
real auth + payment backend (guide written) · move mock scoring/leaderboard
server-side · connect the live Google Sheets.

---

## 📝 Notes

- Prototype/hackathon build (Prodmark × TruScholar). Login and mock-test scoring
  currently run client-side (fine for demos); they move to a secure backend for
  production — the sheet structures stay the same.
- Related docs: **ADMIN-GUIDE.md** (using the admin dashboard — start here),
  **CONTENT-GUIDE.md** (the older Google-Sheets editing path), **ENROLLMENT-FLOW.md**
  (enrol flow), **WIX-FLOW-GUIDE.md** (auth + payments).

---

*Built for MBA Partner — Initiative by Alumni of Old IIMs ·#   M b a P a r t n e r  
 