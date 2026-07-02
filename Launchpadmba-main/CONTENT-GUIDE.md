# MBA Partner — Dashboard Content Guide

This guide explains how to **change what students see in their dashboard** without
touching any code. All dashboard content lives in **one Google Sheet**. You edit the
sheet → the website updates.

---

## 1. How it works (the big picture)

```
   Google Sheet  ──►  Website dashboard
   (you edit)         (students see)
```

- The dashboard reads 5 tabs from your Google Sheet: **Students, Programs,
  Enrollments, Sessions, Materials**.
- Each **row** = one record. Each **column header** = a field the website looks for.
- **Column headers must be spelled exactly as shown below** (capitals included), or
  that column will be ignored.
- Until the sheet is connected, the website runs on built-in **sample data** so it
  always works as a demo.

---

## 2. The 5 tabs and their columns

### Tab: `Students` — who can log in
| Column | Meaning | Example |
|---|---|---|
| Email | Login email (must be unique) | `ananya@iimb.ac.in` |
| Password | Login password | `Placement2025` |
| Name | Full name shown in dashboard | `Ananya Sharma` |
| Role | Subtitle under their name | `Placement Bootcamp · Master` |
| Avatar | One letter for the avatar circle | `A` |
| CV_Done | CV reviews completed | `2` |
| CV_Total | CV reviews included | `5` |
| PI_Done | Mock PIs completed | `4` |
| PI_Total | Mock PIs included | `7` |
| GD_Done | GD rounds completed | `5` |
| GD_Total | GD rounds included | `7` |

### Tab: `Programs` — your catalogue of programs/courses
| Column | Meaning | Example |
|---|---|---|
| ProgramCode | Short unique code (no spaces) | `PB-MASTER` |
| Type | Category label on the card | `Placement Bootcamp` |
| Title | Program name | `Placement Bootcamp — Master Plan` |
| Emoji | Icon shown on the card | `🎯` |

### Tab: `Enrollments` — which student is in which program
| Column | Meaning | Example |
|---|---|---|
| Email | Must match a Students email | `ananya@iimb.ac.in` |
| ProgramCode | Must match a Programs code | `PB-MASTER` |
| Progress | Percent complete (0–100) | `55` |
| NextSession | Next thing up for them | `Mock PI #5` |
| NextDate | When | `Jul 1` |

> One row per student-per-program. A student with 3 programs has 3 rows here.

### Tab: `Sessions` — live classes (shown to everyone in that program)
| Column | Meaning | Example |
|---|---|---|
| ProgramCode | Which program this session belongs to | `PB-MASTER` |
| Day | Day number | `01` |
| Month | 3-letter month | `JUL` |
| Title | Session name | `Mock PI #5 — Marketing Deep Dive` |
| Time | When | `6:00 PM IST` |
| Mentor | Who runs it | `IIM Bangalore Mentor` |
| Type | Short tag | `PI Session` |
| Soon | `yes` = show a red "Join Now" button, else `no` | `yes` |

### Tab: `Materials` — study material shown **directly on the site**
| Column | Meaning | Example |
|---|---|---|
| ProgramCode | Which program this belongs to | `PB-MASTER` |
| Category | Group it appears under | `CV & Resume` |
| Type | Colour/icon: `pdf` `ppt` `drive` `zip` `sheet` `video` | `pdf` |
| Name | Title of the resource | `ATS CV Template Pack` |
| Meta | Small grey description | `12 templates · Updated Jun 2025` |
| Link | Where it opens (Drive link, file URL, etc.) | `https://drive.google.com/...` |

> Students no longer dig through Drive — these rows appear as neat, filterable cards
> inside the dashboard. Leave **Link** blank (or `#`) to show a "Coming soon" tag.

---

## 3. Common tasks (step by step)

**Add a new student**
1. `Students` tab → new row → fill Email, Password, Name, Role, Avatar, and the
   CV/PI/GD numbers.
2. `Enrollments` tab → one new row per program they bought (Email + ProgramCode +
   Progress + NextSession + NextDate).
3. Done — they can now log in and see those programs.

**Add a new program/course**
1. `Programs` tab → new row with a unique ProgramCode, Type, Title, Emoji.
2. Add its `Sessions` and `Materials` rows using that same ProgramCode.
3. Enroll students into it via the `Enrollments` tab.

**Add study material to a program**
- `Materials` tab → new row → set ProgramCode, Category, Type, Name, Meta, Link.
- Everyone enrolled in that ProgramCode sees it immediately.

**Update a student's progress**
- `Enrollments` tab → change their `Progress` number, or
- `Students` tab → change CV_Done / PI_Done / GD_Done.

---

## 4. Connecting your sheet to the website (one-time setup)

1. Build the sheet with the 5 tabs and exact column headers above.
2. In Google Sheets: **File → Share → Publish to web** (publish the whole document).
   Also set **Share → Anyone with the link → Viewer**.
3. Copy the **Sheet ID** from the address bar:
   `docs.google.com/spreadsheets/d/`**`THIS_LONG_ID`**`/edit`
4. Open `js/dashboard-data.js`, find the line near the top:
   ```js
   SHEET_ID: '',   // <-- paste your Google Sheet ID here to go live
   ```
   Paste the ID between the quotes and save.
5. Refresh the website. It now reads live from your sheet. (If anything fails to load,
   it automatically falls back to the sample data so the site never breaks.)

---

## 5. Rules to avoid breakage

- **Don't rename column headers.** Add columns freely; just don't change the names the
  website needs.
- **Keep ProgramCode and Email spellings consistent** across tabs — that's how rows
  are matched.
- `Soon` accepts `yes`/`no` (also `true`/`false`).
- Numbers (Progress, CV_Done, …) should be plain numbers, not text.

---

## 6. Important note on logins (for later)

Right now passwords sit in the sheet and are checked in the browser. That's fine for a
demo/prototype, but it is **not secure for real student accounts** — anyone technical
could read them. Before going fully live with real paying students, logins should move
to a proper backend (see `ENROLLMENT-FLOW.md`). This guide and the sheet structure
stay the same; only *where the password check happens* changes.

---

# Part B — Public website content (Placements & Mentors)

The **public pages** (the Testimonials placements wall and the home-page Mentors
section) are also Google-Sheet-driven, via `js/site-data.js`. Same idea: edit the
sheet → the site updates. Until a Sheet ID is set there, it shows the real sample
data already loaded from your Drive files.

### Tab: `Placements` — the placements wall (Testimonials page)
| Column | Meaning | Example |
|---|---|---|
| Name | Student name | `Paluk Shukla` |
| College | B-school | `IIM Bangalore` |
| Company | Where they were placed | `Accenture` |
| Batch | `final` (final placements) or `summer` (summer internships) | `final` |
| Domain | *(optional)* role domain, shown as a tag | `Consulting` |

### Tab: `Mentors` — the "Meet Your Mentors" section (home page)
| Column | Meaning | Example |
|---|---|---|
| Name | Mentor name | `Yash Gohil` |
| School | B-school | `IIM Ahmedabad` |
| Company | Current company | `Accenture Consulting` |
| Domain | Their domain | `Consulting` |
| LinkedIn | Profile URL (the LinkedIn icon links here) | `https://www.linkedin.com/in/...` |

### Tab: `Colleges` — the "College Collaborations" section (home page)
| Column | Meaning | Example |
|---|---|---|
| Name | College / campus name shown as a chip | `IIM Ahmedabad` |

> Add one row per college you have a tie-up with. The home page shows them as a row of
> chips under "Trusted Across India's Top B-Schools". (The contact details and result
> numbers in that section are set in the page itself.)

### Tab: `Videos` — the Video Testimonials section (Testimonials page)
| Column | Meaning | Example |
|---|---|---|
| Name | Student name | `Jigar` |
| College | B-school | `IIM Amritsar` |
| Company | *(optional)* where they were placed | `Neesh Perfumes` |
| Domain | *(optional)* role domain | `Marketing` |
| VideoURL | YouTube or Google Drive share link | `https://drive.google.com/file/d/…/view` |
| Duration | *(optional)* shown on the thumbnail | `2:34` |

> Leave `VideoURL` blank to show a tasteful "Video coming soon" card.
> ⚠️ **For Drive videos to play on the website, each video's sharing must be set to
> "Anyone with the link → Viewer"** — otherwise visitors can't watch it. (The same goes
> for YouTube links: keep them Public or Unlisted, not Private.)

**To connect:** publish the sheet (as in Part A), then paste its ID into the
`SITE_SHEET.SHEET_ID` line at the top of `js/site-data.js`.

> ⚠️ **Privacy:** never add student emails or phone numbers to the public
> `Placements`/`Mentors` tabs — only name, college, company and domain belong on the
> public site. (Contact details can stay in your private Drive sheets.)

---

# Part C — Dynamic pricing (built — just connect the sheet)

**Editing a price in the sheet now updates the website automatically.** This is wired
through `js/courses-dynamic.js`, which the Courses page and home page both use.

### Tab: `Courses` — live prices for each program
| Column | Meaning | Example |
|---|---|---|
| ProgramCode | Must match the course id in the catalogue | `placement-bootcamp` |
| Title | *(optional)* overrides the displayed title | `Placement Bootcamp` |
| Price | Selling price (number, no ₹) | `7499` |
| MRP | *(optional)* struck-through price | `7999` |
| Offer | *(optional)* small offer tag | `5% off` |
| Rating | *(optional)* star rating | `4.8` |

**Course ids** (use these in `ProgramCode`):
`flagship-bundle, placement-bootcamp, bootcamp-case, bootcamp-live, live-1, live-2,
case-dominate, case-live, adv-excel, power-bi`

**To connect:** publish the sheet, then paste its ID into the `COURSES_SHEET.SHEET_ID`
line near the top of `js/courses-dynamic.js`. Change a price in the sheet → the new
price shows on the next page load.

### Combo savings (automatic)
The site now shows **"why a combo saves you"** automatically. For each combo it adds up
its parts and shows the saving (e.g. *Placement Bootcamp + Live Project + Case
Competitions = ₹14,998; as a combo ₹13,999 — save ₹999*). This appears as a badge on
the course card, a row in the compare table, and a callout on the course detail page.
It only shows when the combo is genuinely cheaper than buying the parts separately, so
the math is always honest. The combo→parts mapping lives in `COMBO_INCLUDES` at the top
of `js/courses-dynamic.js` (edit there if you change what a combo includes).
