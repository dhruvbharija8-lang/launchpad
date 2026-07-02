# Admin Dashboard — Owner's Guide

This is for the site owner (no coding needed). It explains how to log in and edit courses, prices, coupons, homepage stats, testimonials, mentors and more — with the changes appearing on the live site right away.

---

## 1. What this is

Previously, changing a price or the "9.6/10" rating on the homepage meant editing code. Now there's a proper admin dashboard: log in, click Edit, save. The website reads your changes automatically.

It's made of two parts:

- **admin-server/** — a small program that stores your data and serves it to the website. This needs to run somewhere (see "Deploying" below).
- **admin/** — the dashboard pages themselves (`admin/index.html` to log in, `admin/dashboard.html` for everything else).

---

## 2. Running it the first time (on your own computer, to try it out)

You need [Node.js](https://nodejs.org/) installed (any recent version).

1. Open a terminal in the `admin-server` folder.
2. Run:

```
npm installnode server.js
```
3. The first time it starts, it prints a default login in the terminal:

```
username: adminpassword: ChangeMe123!
```
**Change this password immediately** (see step 5 below) — anyone with it can edit your entire site.
4. Open **http://localhost:4000/admin** in your browser and log in.
5. Go to **Account → Change password** in the sidebar and set a real password.

Leave that terminal window running while you use the dashboard. Closing it stops the site's live data from updating (the public pages just show their last-known values or built-in sample data instead — nothing breaks).

---

## 3. What you can edit

Every section below is a tab in the sidebar:

**Commerce**

- **Courses & Pricing** — every course's title, price, MRP, description, rating, etc.
- **Combo Bundles** — which courses make up a bundle (for the "why this combo saves you" callouts).
- **Coupons** — discount codes students can enter at checkout. Turn a code off instead of deleting it if you want to keep its history.

**Site content**

- **Homepage Stats** — the numbers used across the site: average rating (e.g. 9.6), students mentored, placement rate, campuses reached, review count. This is what drives the "9.6/10" you see in the hero section, the Courses page trust bar, the brochure, login page, and Testimonials page.
- **Placements Wall**, **Mentors**, **College Collaborations**, **Video Testimonials**, **GDPI Quotes** — the content shown on the public pages.

**Student dashboard**

- **Dashboard Programs**, **Live Sessions**, **Study Materials** — what enrolled students see once they log in.
- **Students** — login accounts (email + password). Add a student here, then give them one or more rows in **Enrollments** to unlock their programs.
- **Enrollments** — which student is in which program, and their progress %.

Each section has an **Add** button and, per row, **Edit**/**Delete** icons. Fill in the form, save — the change is live immediately (no publish step, no waiting).

---

## 4. Editing the homepage numbers (the "9.6" example)

1. Log in to the dashboard.
2. Click **Homepage Stats** in the sidebar.
3. Change "Average rating" from `9.6` to whatever you want.
4. Click **Save changes**.
5. Refresh the homepage (or any page with a trust bar/stat) — the new number shows up.

This one field updates the number everywhere it's used: the home hero, the "why students choose us" popup, the Courses page trust bar, the brochure, login page, and Testimonials hero. You only edit it once.

---

## 5. Coupons

Go to **Coupons** → **Add Coupon**:

- **Code** — what students type at checkout (e.g. `WELCOME15`).
- **Discount type** — percent off or a flat ₹ amount off.
- **Value** — the number (e.g. `15` for 15%, or `500` for ₹500 off).
- **Active** — untick to pause a code without deleting it.
- **Usage limit** — optional cap on how many times it can be used (leave blank for unlimited — note: usage isn't tracked automatically yet, this field is a manual reference for now).

Two demo codes ship built-in: `MBA10` (10% off) and `GROUP30` (30% off, the 2-student offer). Edit or turn these off the same way as any other coupon.

---

## 6. Deploying so it works on the live website (not just your computer)

Right now, if you only run `node server.js` on your laptop, the dashboard only works while your laptop is on and connected. To make it work all the time for your real website, you need to host `admin-server/` somewhere that stays running — options like **Render**, **Railway**, or **Fly.io** all offer free/cheap tiers that work well for this (search "deploy Node.js app" on any of their sites — the steps are: connect your GitHub repo, point it at the `admin-server` folder, set the `PORT`/`JWT_SECRET`/`ADMIN_USERNAME`/`ADMIN_PASSWORD` values from `.env.example`, deploy).

**Netlify** (where the rest of the site is hosted) does **not** run this — Netlify only serves static files, not a live Node program. Keep the main site on Netlify and host `admin-server/` separately; that's normal and doesn't cost more than a few dollars a month (or is free on the tiers above for this scale of traffic).

Once it's deployed, you'll have a URL like `https://your-app.onrender.com`. Open `js/api-config.js` in the website's code and change:

```
const MBA_API_BASE = '';
```

to:

```
const MBA_API_BASE = 'https://your-app.onrender.com';
```

Save, redeploy the website to Netlify, and the whole site now reads live from your hosted admin dashboard, from anywhere.

---

## 7. Good to know

- **If the admin server is ever down**, the website automatically falls back to its built-in sample content — visitors never see a broken page.
- **Passwords for student logins are stored in plain text** in this prototype (same as the old Google-Sheets setup) — fine for demos/testing, but before enrolling real paying students, move login to a real backend. See `ENROLLMENT-FLOW.md` and `WIX-FLOW-GUIDE.md` for that path.
- **Back up `admin-server/data/db.json`** occasionally (it's the single file holding everything you've edited). Copy it somewhere safe before big changes.
- **Forgot the admin password?** Whoever manages the server can edit `admin-server/data/db.json`, delete the `adminUsers` entry, restart the server — it recreates the default login from `.env` (`ADMIN_USERNAME`/`ADMIN_PASSWORD`).
