/* ============================================================
   MBA PARTNER — COMBO BENEFIT + DYNAMIC PRICING
   ------------------------------------------------------------
   Two jobs:
   1) "Why a combo saves you" — works out how much a combo costs
      vs buying its parts separately, and powers the savings
      callouts on the cards, the compare table and the detail page.
   2) Dynamic pricing — when a Google Sheet "Courses" tab is
      connected, prices/titles update from the sheet (no code).

   Loads BEFORE search.js / main.js. It reads the page's global
   COURSES array and fmt() helper at call-time, so it works on
   both the catalogue page and the home page.
============================================================ */

/* Which standalone programs make up each combo (by course id). */
const COMBO_INCLUDES = {
  'flagship-bundle': ['placement-bootcamp', 'live-1', 'case-dominate'],
  'bootcamp-case':   ['placement-bootcamp', 'case-dominate'],
  'bootcamp-live':   ['placement-bootcamp', 'live-1'],
  'case-live':       ['case-dominate', 'live-1']
};

/* Compute combo savings vs buying the parts separately. */
function comboSavings(c) {
  if (!c || typeof COURSES === 'undefined') return null;
  const inc = COMBO_INCLUDES[c.id];
  if (!inc || !inc.length) return null;
  const items = [];
  let sum = 0;
  for (const id of inc) {
    const x = COURSES.find(k => k.id === id);
    if (!x || typeof x.price !== 'number') return null;
    items.push({ title: x.title, price: x.price });
    sum += x.price;
  }
  const save = sum - c.price;
  return { sum, save, pct: sum ? Math.round((save / sum) * 100) : 0, items };
}

/* Small badge for course cards (returns '' when not a saving combo). */
function comboBadge(c) {
  const cs = comboSavings(c);
  if (!cs || cs.save <= 0) return '';
  const money = (typeof fmt === 'function') ? fmt(cs.save) : ('₹' + cs.save);
  return `<div class="combo-save"><i class="ti ti-discount-2"></i> Save ${money} vs buying separately</div>`;
}

/* Rich callout for the course detail page. */
function comboDetailHtml(c) {
  const cs = comboSavings(c);
  if (!cs || cs.save <= 0) return '';
  const m = v => (typeof fmt === 'function') ? fmt(v) : ('₹' + v);
  const parts = cs.items
    .map(it => `<span class="combo-part">${it.title} <b>${m(it.price)}</b></span>`)
    .join('<span class="combo-plus">+</span>');
  return `<div class="combo-save-box">
    <div class="combo-save-head"><i class="ti ti-discount-2"></i> Why this combo saves you money</div>
    <div class="combo-save-parts">${parts}</div>
    <div class="combo-save-math">
      Bought separately: <s>${m(cs.sum)}</s>
      &nbsp;·&nbsp; As a combo: <b>${m(c.price)}</b>
      <span class="combo-save-pill">You save ${m(cs.save)} (${cs.pct}%)</span>
    </div>
  </div>`;
}

/* ---------- DYNAMIC PRICING ----------
   Two possible live sources, tried in this order:
     1) The admin-server API (js/api-config.js) — what the admin
        dashboard edits. This is the recommended path.
     2) A Google Sheet "Courses" tab (legacy / no-backend option),
        kept for teams that would rather edit a spreadsheet.
   If neither is configured/reachable, the hardcoded COURSES array
   above is used as-is, so the site always works. */
const COURSES_SHEET = {
  SHEET_ID: '',          // <-- paste your Google Sheet ID here to make pricing live via Sheets
  TAB: 'Courses'
};

function _apiBase() { return (typeof MBA_API_BASE !== 'undefined') ? MBA_API_BASE : ''; }

/* Merge admin-server course rows into the local COURSES array by id — and
   add any brand-new course the admin created (e.g. a CAT/OMETs course) that
   doesn't exist in the hardcoded list yet, so it actually shows up on the
   site instead of silently being ignored. */
async function hydrateCoursesFromApi() {
  if (typeof COURSES === 'undefined') return false;
  try {
    const res = await fetch(_apiBase() + '/api/public/courses');
    if (!res.ok) return false;
    const rows = await res.json();
    if (!Array.isArray(rows) || !rows.length) return false;
    let changed = false;
    const EDITABLE = ['title', 'cat', 'type', 'price', 'mrp', 'off', 'badge', 'rating', 'students',
      'level', 'hours', 'instr', 'sub', 'tagline', 'desc', 'img', 'Track'];
    rows.forEach(r => {
      const c = COURSES.find(k => k.id === r.id);
      if (c) {
        EDITABLE.forEach(key => {
          if (r[key] !== undefined && r[key] !== null && r[key] !== '') { c[key] = r[key]; changed = true; }
        });
        return;
      }
      // Brand-new course from the admin dashboard — not in the hardcoded
      // list at all. Add it with sane fallbacks so cards/detail pages
      // don't break on a missing field.
      if (!r.id || !r.title) return;
      COURSES.push({
        id: r.id, Track: r.Track || 'mba', cat: r.cat || 'cert', type: r.type || 'Course',
        img: r.img || 'images/placement-bootcamp.png', badge: r.badge || null,
        rating: Number(r.rating) || 4.8, students: Number(r.students) || 0,
        level: r.level || 'All levels', hours: r.hours || '', instr: r.instr || 'MBA Partner mentors',
        title: r.title, sub: r.sub || '', tagline: r.tagline || '', desc: r.desc || r.sub || '',
        price: Number(r.price) || 0, mrp: r.mrp ? Number(r.mrp) : null, off: r.off || null,
        feats: [], curriculum: [], compInfo: {}
      });
      changed = true;
    });
    return changed;
  } catch (e) {
    console.error('Admin API course load failed — trying other sources.', e);
    return false;
  }
}

/* Merge admin-server combo definitions (COMBO_INCLUDES) so the admin
   can add/edit combos without touching code. */
async function hydrateCombosFromApi() {
  try {
    const res = await fetch(_apiBase() + '/api/public/combos');
    if (!res.ok) return false;
    const rows = await res.json();
    if (!Array.isArray(rows) || !rows.length) return false;
    rows.forEach(r => { if (r.comboId && Array.isArray(r.includes)) COMBO_INCLUDES[r.comboId] = r.includes; });
    return true;
  } catch (e) {
    return false;
  }
}

async function hydrateCoursesFromSheet() {
  if (!COURSES_SHEET.SHEET_ID || typeof COURSES === 'undefined') return false;
  try {
    const url = `https://docs.google.com/spreadsheets/d/${COURSES_SHEET.SHEET_ID}` +
                `/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(COURSES_SHEET.TAB)}`;
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.replace(/^[\s\S]*?\(/, '').replace(/\);?\s*$/, ''));
    const cols = json.table.cols.map(c => (c.label || c.id || '').trim());
    const rows = json.table.rows.map(r => {
      const o = {}; r.c.forEach((cell, i) => { o[cols[i]] = cell ? cell.v : ''; }); return o;
    });
    let changed = false;
    rows.forEach(r => {
      const id = r.ProgramCode || r.id || r.ID;
      if (!id) return;
      const c = COURSES.find(k => k.id === id);
      if (!c) return;
      if (r.Price !== '' && r.Price != null) { c.price = Number(r.Price) || c.price; changed = true; }
      if (r.MRP !== '' && r.MRP != null)      { c.mrp = Number(r.MRP) || c.mrp; }
      if (r.Offer)  c.off = r.Offer;
      if (r.Title)  c.title = r.Title;
      if (r.Rating !== '' && r.Rating != null) c.rating = Number(r.Rating) || c.rating;
    });
    return changed;
  } catch (e) {
    console.error('Courses sheet load failed — keeping built-in prices.', e);
    return false;
  }
}

/* Try the admin API first, then the Sheet, then just keep the built-in prices. */
async function hydrateCourses() {
  const apiChanged = await hydrateCoursesFromApi();
  await hydrateCombosFromApi();
  const sheetChanged = await hydrateCoursesFromSheet();
  return apiChanged || sheetChanged;
}

/* Fetch from the live source(s) (if configured/reachable) and re-render if anything changed. */
async function initCoursesDynamic(reRender) {
  const changed = await hydrateCourses();
  if (changed && typeof reRender === 'function') reRender();
}

if (typeof module !== 'undefined') {
  module.exports = { COMBO_INCLUDES, comboSavings, comboBadge, comboDetailHtml, COURSES_SHEET };
}
