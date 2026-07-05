/* ============================================================
   MBA PARTNER — DASHBOARD DATA LAYER
   ------------------------------------------------------------
   The dashboard reads ALL of its content from a Google Sheet.
   The client edits the sheet → the website updates. No code.

   TO GO LIVE:
     1. Open your Google Sheet (built from the template in
        CONTENT-GUIDE.md) and publish it to the web.
     2. Copy the Sheet ID from its URL:
        docs.google.com/spreadsheets/d/  THIS_PART  /edit
     3. Paste it into SHEET_ID below and save.

   Until a SHEET_ID is set, the embedded SAMPLE_DATA is used,
   so the dashboard works offline and as a demo.

   Sheet tabs (one per data type):
     Students · Programs · Enrollments · Sessions · Materials
   Full column reference: see CONTENT-GUIDE.md
============================================================ */

const SHEET_CONFIG = {
  SHEET_ID: '',                 // <-- paste your Google Sheet ID here to go live
  TABS: {
    students:    'Students',
    programs:    'Programs',
    enrollments: 'Enrollments',
    sessions:    'Sessions',
    materials:   'Materials'
  }
};

/* ============================================================
   SAMPLE DATA  (used automatically when SHEET_ID is empty)
   Each array = one sheet tab. Each object = one row.
   The KEYS below must match the column headers in the sheet.
============================================================ */
const SAMPLE_DATA = {

  // --- Tab: Students (login + profile + progress counters) ---
  students: [
    { Email:'ananya@iimb.ac.in', Password:'Placement2025', Name:'Ananya Sharma', Role:'Placement Bootcamp · Master', Avatar:'A', CV_Done:2, CV_Total:5, PI_Done:4, PI_Total:7, GD_Done:5, GD_Total:7 },
    { Email:'rohan@iima.ac.in',  Password:'Bundle2025',    Name:'Rohan Mehta',   Role:'Complete Placement Bundle',    Avatar:'R', CV_Done:1, CV_Total:5, PI_Done:2, PI_Total:7, GD_Done:2, GD_Total:7 },
    { Email:'demo1@iima.ac.in',  Password:'12345678',      Name:'Priya Verma',   Role:'Finance Track · Intermediate', Avatar:'P', CV_Done:3, CV_Total:5, PI_Done:5, PI_Total:7, GD_Done:4, GD_Total:7 },
    { Email:'demo2@iimb.ac.in',  Password:'12345678',      Name:'Aditya Kumar',  Role:'Marketing Bootcamp · Advanced',Avatar:'A', CV_Done:2, CV_Total:5, PI_Done:3, PI_Total:7, GD_Done:3, GD_Total:7 },
    { Email:'demo3@iimx.ac.in',  Password:'12345678',      Name:'Nisha Desai',   Role:'Consulting Track · Intermediate',Avatar:'N', CV_Done:1, CV_Total:5, PI_Done:2, PI_Total:7, GD_Done:2, GD_Total:7 },
    { Email:'demo4@iim.ac.in',   Password:'12345678',      Name:'Arjun Singh',   Role:'Tech Roles Track · Beginner',  Avatar:'A', CV_Done:0, CV_Total:5, PI_Done:1, PI_Total:7, GD_Done:1, GD_Total:7 }
  ],

  // --- Tab: Programs (catalog of every program/course you offer) ---
  programs: [
    { ProgramCode:'PB-MASTER',    Type:'Placement Bootcamp', Title:'Placement Bootcamp — Master Plan', Emoji:'🎯' },
    { ProgramCode:'EXCEL',        Type:'Certification',      Title:'Advanced Excel for MBAs',          Emoji:'📊' },
    { ProgramCode:'BUNDLE',       Type:'Flagship Bundle',    Title:'Complete Placement Bundle',        Emoji:'🚀' },
    { ProgramCode:'CASE',         Type:'Case Competitions',  Title:'Dominating Case Competitions',     Emoji:'🏆' },
    { ProgramCode:'POWERBI',      Type:'Certification',      Title:'Power BI Certification',           Emoji:'📈' },
    { ProgramCode:'FIN-MODEL',    Type:'Finance Track',      Title:'Financial Modeling & Valuation',   Emoji:'💰' },
    { ProgramCode:'EXCEL-FIN',    Type:'Certification',      Title:'Advanced Excel Finance',           Emoji:'📊' },
    { ProgramCode:'MKT-BRAND',    Type:'Marketing Bootcamp', Title:'Brand Strategy & Positioning',     Emoji:'🎨' },
    { ProgramCode:'MKT-LIVE',     Type:'Live Project',       Title:'Digital Marketing Campaign',       Emoji:'📱' },
    { ProgramCode:'GA-PRO',       Type:'Certification',      Title:'Google Analytics Pro',             Emoji:'📈' },
    { ProgramCode:'CONSULT-CASE', Type:'Consulting Track',   Title:'Case Interview Mastery',           Emoji:'🎯' },
    { ProgramCode:'FRAMEWORKS',   Type:'Framework',          Title:'Problem-Solving Frameworks',       Emoji:'🔍' },
    { ProgramCode:'PM-ESS',       Type:'Tech Track',         Title:'Product Management Essentials',    Emoji:'⚙️' },
    { ProgramCode:'DATA-NT',      Type:'Technical',          Title:'Data Analysis for Non-Techies',    Emoji:'📊' }
  ],

  // --- Tab: Enrollments (which student is in which program + their progress) ---
  enrollments: [
    { Email:'ananya@iimb.ac.in', ProgramCode:'PB-MASTER',    Progress:55, NextSession:'Mock PI #5',          NextDate:'Jul 1' },
    { Email:'ananya@iimb.ac.in', ProgramCode:'EXCEL',        Progress:80, NextSession:'Pivot Tables Module',  NextDate:'Jul 3' },
    { Email:'rohan@iima.ac.in',  ProgramCode:'BUNDLE',       Progress:35, NextSession:'Live Project Kickoff', NextDate:'Jul 2' },
    { Email:'rohan@iima.ac.in',  ProgramCode:'CASE',         Progress:60, NextSession:'Framework Deep-Dive #3',NextDate:'Jul 4' },
    { Email:'rohan@iima.ac.in',  ProgramCode:'POWERBI',      Progress:20, NextSession:'Module 3: Dashboards',  NextDate:'Jul 6' },
    { Email:'demo1@iima.ac.in',  ProgramCode:'FIN-MODEL',    Progress:70, NextSession:'DCF Analysis',          NextDate:'Jul 2' },
    { Email:'demo1@iima.ac.in',  ProgramCode:'EXCEL-FIN',    Progress:45, NextSession:'VBA Automation',        NextDate:'Jul 4' },
    { Email:'demo2@iimb.ac.in',  ProgramCode:'MKT-BRAND',    Progress:85, NextSession:'Brand Audit Workshop',  NextDate:'Jul 1' },
    { Email:'demo2@iimb.ac.in',  ProgramCode:'MKT-LIVE',     Progress:60, NextSession:'Client Presentation',   NextDate:'Jul 5' },
    { Email:'demo2@iimb.ac.in',  ProgramCode:'GA-PRO',       Progress:30, NextSession:'Tracking Setup',        NextDate:'Jul 6' },
    { Email:'demo3@iimx.ac.in',  ProgramCode:'CONSULT-CASE', Progress:50, NextSession:'Market Sizing Cases',   NextDate:'Jul 3' },
    { Email:'demo3@iimx.ac.in',  ProgramCode:'FRAMEWORKS',   Progress:65, NextSession:'Advanced Estimation',   NextDate:'Jul 4' },
    { Email:'demo4@iim.ac.in',   ProgramCode:'PM-ESS',       Progress:40, NextSession:'Product Roadmaps',      NextDate:'Jul 2' },
    { Email:'demo4@iim.ac.in',   ProgramCode:'DATA-NT',      Progress:55, NextSession:'SQL Basics',            NextDate:'Jul 5' }
  ],

  // --- Tab: Sessions (live classes, per program) ---
  sessions: [
    { ProgramCode:'PB-MASTER',    Day:'01', Month:'JUL', Title:'Mock PI #5 — Marketing Deep Dive', Time:'6:00 PM IST', Mentor:'IIM Bangalore Mentor',   Type:'PI Session',   Soon:'yes' },
    { ProgramCode:'PB-MASTER',    Day:'03', Month:'JUL', Title:'GD Round #6 — ESG & Sustainability',Time:'7:30 PM IST', Mentor:'XLRI Alumna',           Type:'GD Round',     Soon:'no'  },
    { ProgramCode:'PB-MASTER',    Day:'05', Month:'JUL', Title:'CV Review Session #3',              Time:'5:00 PM IST', Mentor:'FMS Delhi Mentor',       Type:'CV Review',    Soon:'no'  },
    { ProgramCode:'BUNDLE',       Day:'02', Month:'JUL', Title:'Live Project Kickoff — Marketing',  Time:'5:30 PM IST', Mentor:'Prodmark Consultants',   Type:'Live Project', Soon:'yes' },
    { ProgramCode:'CASE',         Day:'04', Month:'JUL', Title:'Case Framework Deep-Dive #3',       Time:'7:00 PM IST', Mentor:'AIR 1 Mentor',           Type:'Case Session', Soon:'no'  },
    { ProgramCode:'BUNDLE',       Day:'06', Month:'JUL', Title:'GD Practice — Industry Analysis',   Time:'6:30 PM IST', Mentor:'IIM Calcutta Alumni',    Type:'GD Round',     Soon:'no'  },
    { ProgramCode:'FIN-MODEL',    Day:'02', Month:'JUL', Title:'Financial Modeling Workshop #2',    Time:'7:00 PM IST', Mentor:'Goldman Sachs Alumnus',  Type:'Workshop',     Soon:'yes' },
    { ProgramCode:'FIN-MODEL',    Day:'04', Month:'JUL', Title:'Real Case Study Analysis',          Time:'6:30 PM IST', Mentor:'Morgan Stanley Mentor',  Type:'Case Study',   Soon:'no'  },
    { ProgramCode:'FIN-MODEL',    Day:'07', Month:'JUL', Title:'Valuation Methods Deep-Dive',       Time:'7:30 PM IST', Mentor:'McKinsey Analyst',       Type:'Session',      Soon:'no'  },
    { ProgramCode:'MKT-BRAND',    Day:'01', Month:'JUL', Title:'Brand Positioning Workshop',        Time:'5:30 PM IST', Mentor:'Ogilvy & Mather Director',Type:'Workshop',    Soon:'yes' },
    { ProgramCode:'MKT-LIVE',     Day:'03', Month:'JUL', Title:'Live Client Project Kickoff',       Time:'6:00 PM IST', Mentor:'Accenture Marketing Lead',Type:'Live Project',Soon:'no'  },
    { ProgramCode:'MKT-LIVE',     Day:'05', Month:'JUL', Title:'Campaign Performance Review',       Time:'7:00 PM IST', Mentor:'BCG Consultant',         Type:'Review',       Soon:'no'  },
    { ProgramCode:'CONSULT-CASE', Day:'02', Month:'JUL', Title:'Case Interview Bootcamp #3',        Time:'6:30 PM IST', Mentor:'Bain & Company Expert',  Type:'Bootcamp',     Soon:'yes' },
    { ProgramCode:'CONSULT-CASE', Day:'04', Month:'JUL', Title:'Market Analysis Deep-Dive',         Time:'7:00 PM IST', Mentor:'McKinsey Senior Manager',Type:'Session',      Soon:'no'  },
    { ProgramCode:'FRAMEWORKS',   Day:'06', Month:'JUL', Title:'Mock Consulting Interview',         Time:'5:00 PM IST', Mentor:'PwC Strategy Lead',      Type:'Mock Interview',Soon:'no' },
    { ProgramCode:'PM-ESS',       Day:'02', Month:'JUL', Title:'Product Strategy Fundamentals',     Time:'6:00 PM IST', Mentor:'Google PM',              Type:'Masterclass',  Soon:'yes' },
    { ProgramCode:'DATA-NT',      Day:'04', Month:'JUL', Title:'SQL for PMs Workshop',              Time:'7:30 PM IST', Mentor:'Amazon Tech Lead',       Type:'Workshop',     Soon:'no'  },
    { ProgramCode:'PM-ESS',       Day:'06', Month:'JUL', Title:'Product Case Interviews',           Time:'6:30 PM IST', Mentor:'Meta Senior PM',         Type:'Case Study',   Soon:'no'  }
  ],

  // --- Tab: Materials (study material shown directly on the site, per program) ---
  // Type drives the colour: pdf | ppt | drive | zip | sheet | video
  materials: [
    { ProgramCode:'PB-MASTER', Category:'CV & Resume',   Type:'pdf',   Name:'ATS CV Template Pack',        Meta:'12 templates · Updated Jun 2025', Link:'#' },
    { ProgramCode:'PB-MASTER', Category:'Case Prep',     Type:'ppt',   Name:'Winning Case PPTs (30+)',     Meta:'AIR 1 Mentor Collection',         Link:'https://documents1.netlify.app/' },
    { ProgramCode:'PB-MASTER', Category:'CV & Resume',   Type:'pdf',   Name:'Sample CVs — Finance & Strategy',Meta:'IIM / XLRI / FMS Placements',  Link:'https://documents1.netlify.app/' },
    { ProgramCode:'PB-MASTER', Category:'Recordings',    Type:'video', Name:'Live Session Recordings',     Meta:'All past sessions · 14 videos',   Link:'#' },
    { ProgramCode:'PB-MASTER', Category:'Case Prep',     Type:'drive', Name:'Case Competition Compendiums',Meta:'Full framework library',          Link:'#' },
    { ProgramCode:'PB-MASTER', Category:'Interview Prep',Type:'zip',   Name:'Interview Prep Kit',          Meta:'PI tips + domain Q&A bank',       Link:'#' },
    { ProgramCode:'BUNDLE',    Category:'Case Prep',     Type:'ppt',   Name:'Winning Case PPTs (30+)',     Meta:'AIR 1 Mentor Collection',         Link:'https://documents1.netlify.app/' },
    { ProgramCode:'BUNDLE',    Category:'CV & Resume',   Type:'pdf',   Name:'ATS CV Templates + Samples',  Meta:'IIM Placements CV Library',       Link:'#' },
    { ProgramCode:'BUNDLE',    Category:'Live Project',  Type:'drive', Name:'Live Project Drive Materials',Meta:'Marketing domain · Module 1',     Link:'#' },
    { ProgramCode:'BUNDLE',    Category:'Case Prep',     Type:'drive', Name:'Case Competition Compendiums',Meta:'Full library · 30+ frameworks',   Link:'#' },
    { ProgramCode:'BUNDLE',    Category:'GD & Current Affairs',Type:'pdf',Name:'GD Topics & Current Affairs Kit',Meta:'Top 50 topics · Jun 2025',  Link:'#' },
    { ProgramCode:'BUNDLE',    Category:'Tools',         Type:'drive', Name:'Canva Pro Access',            Meta:'Included with your bundle',       Link:'#' },
    { ProgramCode:'FIN-MODEL', Category:'Models',        Type:'sheet', Name:'Financial Models Library',    Meta:'50+ templates · Real projects',   Link:'#' },
    { ProgramCode:'FIN-MODEL', Category:'Valuation',     Type:'ppt',   Name:'Valuation PPTs',              Meta:'DCF, Comps, Precedents',          Link:'#' },
    { ProgramCode:'FIN-MODEL', Category:'Interview Prep',Type:'pdf',   Name:'Case Interview Guide',        Meta:'Finance cases · Solutions',       Link:'#' },
    { ProgramCode:'FIN-MODEL', Category:'Recordings',    Type:'video', Name:'Session Recordings',          Meta:'All past sessions · 8 videos',    Link:'#' },
    { ProgramCode:'FIN-MODEL', Category:'Frameworks',    Type:'drive', Name:'Finance Frameworks',          Meta:'Ratio analysis · Metrics',        Link:'#' },
    { ProgramCode:'MKT-BRAND', Category:'Case Prep',     Type:'ppt',   Name:'Case Studies Collection',     Meta:'25+ global brands',               Link:'#' },
    { ProgramCode:'MKT-BRAND', Category:'Frameworks',    Type:'pdf',   Name:'Marketing Frameworks',        Meta:'4Ps, STP, SWOT & more',           Link:'#' },
    { ProgramCode:'MKT-BRAND', Category:'Tools',         Type:'drive', Name:'Brand Templates',             Meta:'Brand guidelines · Decks',        Link:'#' },
    { ProgramCode:'MKT-LIVE',  Category:'Live Project',  Type:'sheet', Name:'Campaign Excel',              Meta:'Budget planners · ROI sheets',    Link:'#' },
    { ProgramCode:'CONSULT-CASE',Category:'Case Prep',   Type:'drive', Name:'Case Interview Compendium',   Meta:'100+ cases · Solutions',          Link:'#' },
    { ProgramCode:'CONSULT-CASE',Category:'Frameworks',  Type:'ppt',   Name:'Frameworks PPTs',             Meta:'Complete deck collection',        Link:'#' },
    { ProgramCode:'CONSULT-CASE',Category:'Frameworks',  Type:'pdf',   Name:'Estimation Techniques',       Meta:'Detailed guide + examples',       Link:'#' },
    { ProgramCode:'FRAMEWORKS', Category:'Recordings',   Type:'video', Name:'Interview Videos',            Meta:'15+ mock interviews',             Link:'#' },
    { ProgramCode:'PM-ESS',    Category:'Frameworks',    Type:'ppt',   Name:'PM Frameworks',               Meta:'PRD, Feature specs & more',       Link:'#' },
    { ProgramCode:'PM-ESS',    Category:'Fundamentals',  Type:'pdf',   Name:'Tech Fundamentals',           Meta:'For non-engineering PMs',         Link:'#' },
    { ProgramCode:'PM-ESS',    Category:'Case Prep',     Type:'drive', Name:'Product Case Studies',        Meta:'20+ real examples',               Link:'#' },
    { ProgramCode:'DATA-NT',   Category:'Practice',      Type:'drive', Name:'SQL Query Bank',              Meta:'Practice queries & solutions',    Link:'#' }
  ],

  // --- Tab: Live Domain Links (Live Project Drive folder per domain) ---
  liveDomainLinks: [
    { DomainKey:'operations', DomainLabel:'Operations', DriveLink:'#' },
    { DomainKey:'marketing',  DomainLabel:'Marketing',  DriveLink:'#' },
    { DomainKey:'hr',         DomainLabel:'HR',         DriveLink:'#' },
    { DomainKey:'finance',    DomainLabel:'Finance',    DriveLink:'#' },
    { DomainKey:'consulting', DomainLabel:'Consulting', DriveLink:'#' }
  ]
};

/* ============================================================
   GOOGLE SHEETS LOADER
   Fetches each tab via the public gviz endpoint and converts
   rows into plain objects keyed by the column headers.
============================================================ */
async function fetchSheetTab(tabName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_CONFIG.SHEET_ID}` +
              `/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}`;
  const res = await fetch(url);
  const text = await res.text();
  // gviz wraps JSON like:  /*O_o*/\ngoogle.visualization.Query.setResponse({...});
  const json = JSON.parse(text.replace(/^[\s\S]*?\(/, '').replace(/\);?\s*$/, ''));
  const cols = json.table.cols.map(c => (c.label || c.id || '').trim());
  return json.table.rows.map(row => {
    const obj = {};
    row.c.forEach((cell, i) => { obj[cols[i]] = cell ? cell.v : ''; });
    return obj;
  });
}

/* Preferred: the admin-server API (edited from the admin dashboard). */
async function _fetchDashboardApi() {
  const base = (typeof MBA_API_BASE !== 'undefined') ? MBA_API_BASE : '';
  const names = ['students', 'programs', 'enrollments', 'sessions', 'materials', 'liveDomainLinks'];
  const results = await Promise.all(names.map(n => fetch(base + '/api/public/' + n).then(r => r.ok ? r.json() : null).catch(() => null)));
  const out = {};
  // A single newer/secondary collection (e.g. liveDomainLinks) briefly failing
  // to load shouldn't wipe out the ENTIRE real dashboard back to fake demo
  // data — default any non-array result to [] and keep going. Only fall back
  // to SAMPLE_DATA if the backend is genuinely unreachable (students itself
  // failed), since that's the one collection every other computation depends on.
  names.forEach((n, i) => { out[n] = Array.isArray(results[i]) ? results[i] : []; });
  if (Array.isArray(results[0])) return out;
  return null;
}

async function loadAllData() {
  const apiData = await _fetchDashboardApi();
  if (apiData) return apiData;

  if (!SHEET_CONFIG.SHEET_ID) return SAMPLE_DATA;      // demo / offline mode
  try {
    const t = SHEET_CONFIG.TABS;
    const [students, programs, enrollments, sessions, materials] = await Promise.all([
      fetchSheetTab(t.students), fetchSheetTab(t.programs), fetchSheetTab(t.enrollments),
      fetchSheetTab(t.sessions), fetchSheetTab(t.materials)
    ]);
    return { students, programs, enrollments, sessions, materials };
  } catch (err) {
    console.error('Could not load Google Sheet — falling back to sample data.', err);
    return SAMPLE_DATA;
  }
}

/* ============================================================
   HELPERS
============================================================ */
const _lc = v => String(v || '').trim().toLowerCase();
const _num = v => { const n = Number(v); return isNaN(n) ? 0 : n; };
const _yes = v => ['yes', 'true', '1', 'y'].includes(_lc(v));

/* Check login credentials against the Students tab. */
function checkCredentials(data, email, password) {
  const s = data.students.find(x => _lc(x.Email) === _lc(email));
  return !!(s && String(s.Password) === String(password));
}

/* Assemble one student's complete dashboard view by joining tabs. */
function buildStudentView(data, email) {
  const s = data.students.find(x => _lc(x.Email) === _lc(email));
  if (!s) return null;

  const myEnroll = data.enrollments.filter(e => _lc(e.Email) === _lc(email));
  const myCodes  = myEnroll.map(e => e.ProgramCode);

  const courses = myEnroll.map(e => {
    const p = data.programs.find(pr => pr.ProgramCode === e.ProgramCode) || {};
    return {
      code: e.ProgramCode, type: p.Type || 'Program', title: p.Title || e.ProgramCode,
      emoji: p.Emoji || '📘', progress: _num(e.Progress),
      nextSession: e.NextSession || 'TBA', nextDate: e.NextDate || '',
      // Which overview stat-cards are relevant for this specific program
      // (admin-set on the Dashboard Programs entry) — drives the
      // course-aware "Overview" stat row instead of one fixed set for everyone.
      statType: p.StatType || 'bootcamp',
      // Drive folders are private — the admin has to individually share them
      // with the student's email before the link is actually usable. This
      // flag (set on the Enrollments row) gates whether this course's
      // materials appear at all, and drives the "materials ready" notification.
      materialsGranted: _yes(e.AccessGranted)
    };
  });

  const sessions = data.sessions
    .filter(x => myCodes.includes(x.ProgramCode))
    .map(x => ({
      day: x.Day, mon: x.Month, title: x.Title, time: x.Time,
      mentor: x.Mentor, type: x.Type, soon: _yes(x.Soon)
    }));

  // Each Study Materials row belongs to one course (ProgramCode) and can hold
  // either the older single Name/Link fields (kept working for any existing
  // row), or the newer 'driveLinks' list — add as many links as you like to
  // one row instead of creating a separate row per link. Live-Project-
  // containing courses instead get one row PER domain (row.Domain set) — a
  // student only sees a domain-scoped row if they picked that exact domain
  // on that specific course enrollment (stored on the enrollment's own
  // Domains field, not shared across every student in the same course).
  const materials = [];
  data.materials
    .filter(x => myCodes.includes(x.ProgramCode))
    // Drive folders are private — only show this course's materials once the
    // admin has actually shared the folder with the student and flipped
    // "Drive access granted" to Yes on their Enrollments row. Otherwise the
    // student would see a link that just errors out for them.
    .filter(x => {
      const enrollment = myEnroll.find(e => e.ProgramCode === x.ProgramCode);
      return _yes(enrollment && enrollment.AccessGranted);
    })
    .filter(x => {
      if (!x.Domain) return true;
      const enrollment = myEnroll.find(e => e.ProgramCode === x.ProgramCode);
      const picked = String(enrollment && enrollment.Domains || '').split(',').map(k => _lc(k)).filter(Boolean);
      return picked.includes(_lc(x.Domain));
    })
    .forEach(x => {
      const p = data.programs.find(pr => pr.ProgramCode === x.ProgramCode) || {};
      if (Array.isArray(x.driveLinks) && x.driveLinks.length) {
        x.driveLinks.forEach(link => {
          if (!link || !link.Link) return;
          materials.push({
            category: x.Category || 'General', type: 'drive',
            name: link.Name || x.Category || p.Title || x.ProgramCode,
            meta: x.Meta || p.Title || x.ProgramCode,
            link: link.Link
          });
        });
      } else if (x.Name || x.Link) {
        materials.push({
          category: x.Category || 'General', type: _lc(x.Type) || 'drive',
          name: x.Name, meta: x.Meta, link: x.Link || '#'
        });
      }
    });

  // Live Project domain materials: resolved per-enrollment (not per-program),
  // since which Drive folder(s) a student sees depends on which domain(s)
  // *they specifically* picked at checkout — stored on their own Enrollments
  // row's Domains field, not on the shared Programs/Materials rows. This
  // deliberately does NOT add a new course/program card — just extra
  // material cards under the course they already see.
  const domainLinks = Array.isArray(data.liveDomainLinks) ? data.liveDomainLinks : [];
  // A domain-links row's own drive links — supports the new multi-link
  // 'driveLinks' list, and falls back to the older single 'DriveLink' string
  // field for any row that hasn't been migrated/re-saved yet.
  const linksOf = d => {
    if (Array.isArray(d.driveLinks) && d.driveLinks.length) return d.driveLinks;
    if (d.DriveLink) return [{ Name: d.DomainLabel || d.DomainKey, Link: d.DriveLink }];
    return [];
  };
  const findDomainRow = key => domainLinks.find(dl => _lc(dl.DomainKey) === key);
  // A combo row's key is the domains sorted + comma-joined (order-independent).
  const findComboRow = keys => {
    const wanted = keys.slice().sort().join(',');
    return domainLinks.find(dl => _lc(dl.DomainKey).split(',').map(k => k.trim()).sort().join(',') === wanted);
  };
  myEnroll.forEach(e => {
    if (!_yes(e.AccessGranted)) return; // same private-Drive gate as above
    const keys = String(e.Domains || '').split(',').map(k => _lc(k)).filter(Boolean);
    if (!keys.length) return;
    const p = data.programs.find(pr => pr.ProgramCode === e.ProgramCode) || {};

    // If this student picked more than one domain and there's a dedicated
    // combo row (e.g. "hr,marketing") with its own links set, prefer that —
    // it's a resource pack specific to that exact domain pairing. Otherwise
    // fall back to each individually-picked domain's own links.
    const combo = keys.length > 1 ? findComboRow(keys) : null;
    const comboLinks = combo ? linksOf(combo) : [];
    if (comboLinks.length) {
      comboLinks.forEach(link => {
        if (!link || !link.Link) return;
        materials.push({
          category: 'Live Project', type: 'drive',
          name: link.Name || ('Live Project — ' + (combo.DomainLabel || keys.join(' + '))),
          meta: p.Title || e.ProgramCode, link: link.Link
        });
      });
      return;
    }
    keys.forEach(key => {
      const d = findDomainRow(key);
      if (!d) return;
      linksOf(d).forEach(link => {
        if (!link || !link.Link) return;
        materials.push({
          category: 'Live Project', type: 'drive',
          name: link.Name || ('Live Project — ' + (d.DomainLabel || key)),
          meta: p.Title || e.ProgramCode, link: link.Link
        });
      });
    });
  });

  return {
    name: s.Name, email: s.Email, role: s.Role, avatar: s.Avatar || (s.Name || '?')[0],
    hasPurchased: courses.length > 0,
    courses, sessions, materials,
    cvDone: _num(s.CV_Done), cvTotal: _num(s.CV_Total) || 5,
    piDone: _num(s.PI_Done), piTotal: _num(s.PI_Total) || 7,
    gdDone: _num(s.GD_Done), gdTotal: _num(s.GD_Total) || 7,
    liveProgress: _num(s.Live_Project_Progress),
    caseDone: _num(s.Case_Done), caseTotal: _num(s.Case_Total) || 3,
    certProgress: _num(s.Cert_Progress)
  };
}

// Expose for Node-based tests; ignored in the browser.
if (typeof module !== 'undefined') {
  module.exports = { SHEET_CONFIG, SAMPLE_DATA, loadAllData, checkCredentials, buildStudentView };
}
