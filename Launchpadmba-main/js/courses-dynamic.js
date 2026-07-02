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

/* ---------- DYNAMIC PRICING (Google Sheet "Courses" tab) ---------- */
const COURSES_SHEET = {
  SHEET_ID: '',          // <-- paste your Google Sheet ID here to make pricing live
  TAB: 'Courses'
};

async function hydrateCourses() {
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

/* Fetch from sheet (if configured) and re-render if anything changed. */
async function initCoursesDynamic(reRender) {
  const changed = await hydrateCourses();
  if (changed && typeof reRender === 'function') reRender();
}

if (typeof module !== 'undefined') {
  module.exports = { COMBO_INCLUDES, comboSavings, comboBadge, comboDetailHtml, COURSES_SHEET };
}
