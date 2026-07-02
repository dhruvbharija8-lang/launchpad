# Admin Dashboard — Owner's Guide

This is for the site owner (no coding needed). It explains how to log in and edit
courses, prices, coupons, homepage stats, testimonials, mentors and more — with the
changes appearing on the live site right away.

---

## 1. What this is

Previously, changing a price or the "9.6/10" rating on the homepage meant editing
code. Now there's a proper admin dashboard: log in, click Edit, save. The website
reads your changes automatically.

The whole project is served by **one Node app** (`admin-server/`):
- It serves the **website itself** (index.html, courses.html, css/, js/, images/...).
- It serves the **admin dashboard** (`/admin`).
- It serves the **API** everything reads/writes from.

One app, one URL, one deploy — no separate Netlify needed.

---

## 2. Running it (on your own computer, to try it out)

You need [Node.js](https://nodejs.org) installed (any recent version).

1. Open a terminal in the `admin-server` folder.
2. Run:
   ```
   npm install
   node app.js
   ```
3. The first time it starts, it prints a default login in the terminal:
   ```
   username: admin
   password: ChangeMe123!
   ```
   **Change this password immediately** (see step 5 below) — anyone with it can edit
   your entire site.
4. Open **http://localhost:4000** in your browser — that's the actual website now,
   served by this same app. (Don't open index.html directly by double-clicking it —
   open it through this URL so it can reach the API.)
5. Open **http://localhost:4000/admin** to log in to the dashboard.
6. Go to **Account → Change password** in the sidebar and set a real password.

Leave that terminal window running while you use the site/dashboard. Closing it stops
everything — the site, the dashboard and the API all live in that one process.

---

## 3. What you can edit

Every section below is a tab in the sidebar:

**Commerce**
- **Courses & Pricing** — every course's title, price, MRP, description, rating, etc.
- **Combo Bundles** — which courses make up a bundle (for the "why this combo saves
  you" callouts).
- **Coupons** — discount codes students can enter at checkout. Turn a code off
  instead of deleting it if you want to keep its history.

**Site content**
- **Homepage Stats** — the numbers used across the site: average rating (e.g. 9.6),
  students mentored, placement rate, campuses reached, review count. This is what
  drives the "9.6/10" you see in the hero section, the Courses page trust bar, the
  brochure, login page, and Testimonials page.
- **Placements Wall**, **Mentors**, **College Collaborations**, **Video
  Testimonials**, **GDPI Quotes** — the content shown on the public pages.

**Student dashboard**
- **Dashboard Programs**, **Live Sessions**, **Study Materials** — what enrolled
  students see once they log in.
- **Students** — login accounts (email + password). Add a student here, then give
  them one or more rows in **Enrollments** to unlock their programs.
- **Enrollments** — which student is in which program, and their progress %.

Each section has an **Add** button and, per row, **Edit**/**Delete** icons. Fill in
the form, save — the change is live immediately (no publish step, no waiting).

---

## 4. Editing the homepage numbers (the "9.6" example)

1. Log in to the dashboard.
2. Click **Homepage Stats** in the sidebar.
3. Change "Average rating" from `9.6` to whatever you want.
4. Click **Save changes**.
5. Refresh the homepage (or any page with a trust bar/stat) — the new number shows up.

This one field updates the number everywhere it's used: the home hero, the "why
students choose us" popup, the Courses page trust bar, the brochure, login page, and
Testimonials hero. You only edit it once.

---

## 5. Coupons

Go to **Coupons** → **Add Coupon**:
- **Code** — what students type at checkout (e.g. `WELCOME15`).
- **Discount type** — percent off or a flat ₹ amount off.
- **Value** — the number (e.g. `15` for 15%, or `500` for ₹500 off).
- **Active** — untick to pause a code without deleting it.
- **Usage limit** — optional cap on how many times it can be used (leave blank for
  unlimited — note: usage isn't tracked automatically yet, this field is a manual
  reference for now).

Two demo codes ship built-in: `MBA10` (10% off) and `GROUP30` (30% off, the 2-student
offer, on the courses.html cart). Edit or turn these off the same way as any other coupon.

---

## 6. Deploying so it works on the live website (not just your computer)

Since the whole site + dashboard + API is ONE Node app, deploying is one step: put
`admin-server/` on a Node host that stays running all the time. Good options:
**Render**, **Railway**, or **Fly.io** (all have free/cheap tiers). Steps for Render:

1. Push this project to a GitHub repo (if it isn't already).
2. On [render.com](https://render.com): **New +** → **Web Service** → connect your repo.
3. Set:
   - **Root Directory:** `admin-server`
   - **Build Command:** `npm install`
   - **Start Command:** `node app.js`
4. Add environment variables (from `admin-server/.env.example`, with your own real
   values — never commit real secrets):
   - `JWT_SECRET` — a long random string
   - `ADMIN_USERNAME` / `ADMIN_PASSWORD` — your real login
5. Deploy. You'll get a URL like `https://your-app.onrender.com` — that's now your
   whole website, admin dashboard, and API, all in one place.

**You do NOT need Netlify with this setup.** (If you specifically want the static
site on Netlify with the backend elsewhere instead, that's still possible — see the
note at the bottom of `js/api-config.js` — but it's an extra moving part you don't
need unless you have a reason to want it.)

---

## 7. Good to know

- **If the admin server is ever down**, and you're using the Netlify-split setup, the
  website automatically falls back to its built-in sample content — visitors never
  see a broken page. (With the single-app setup above, if the app is down, the whole
  site is down, same as any other Node-hosted site — so keep it on a host that
  restarts it automatically, which Render/Railway do by default.)
- **Passwords for student logins are stored in plain text** in this prototype (same
  as the old Google-Sheets setup) — fine for demos/testing, but before enrolling real
  paying students, move login to a real backend. See `ENROLLMENT-FLOW.md` and
  `WIX-FLOW-GUIDE.md` for that path.
- **Back up `admin-server/data/db.json`** occasionally (it's the single file holding
  everything you've edited). Copy it somewhere safe before big changes.
- **Forgot the admin password?** Whoever manages the server can edit
  `admin-server/data/db.json`, delete the `adminUsers` entry, restart the server —
  it recreates the default login from `.env` (`ADMIN_USERNAME`/`ADMIN_PASSWORD`).
