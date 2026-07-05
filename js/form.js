/* ============================================================
   MBA PARTNER — STUDENT DASHBOARD
   All content comes from the data layer (js/dashboard-data.js),
   which reads from a Google Sheet (or sample data in demo mode).
============================================================ */

let DASH_DATA = null;        // raw data (all sheet tabs)
let currentUser = null;      // built view for the logged-in student
const SESSION_KEY = 'mbaPartnerSession';   // remembers the logged-in email

// Demo buttons -> student email in the data
const DEMO_MAP = {
  placement:  'ananya@iimb.ac.in',
  bundle:     'rohan@iima.ac.in',
  finance:    'demo1@iima.ac.in',
  marketing:  'demo2@iimb.ac.in',
  consulting: 'demo3@iimx.ac.in',
  tech:       'demo4@iim.ac.in'
};

// Material type -> icon + colour class
const MAT_STYLE = {
  pdf:   { icon: 'ti-file-text',          cls: 'pdf'   },
  ppt:   { icon: 'ti-presentation',       cls: 'ppt'   },
  drive: { icon: 'ti-brand-google-drive', cls: 'drive' },
  zip:   { icon: 'ti-file-zip',           cls: 'zip'   },
  sheet: { icon: 'ti-file-spreadsheet',   cls: 'sheet' },
  video: { icon: 'ti-video',              cls: 'video' }
};

/* ---------- DATA BOOTSTRAP ---------- */
async function ensureData(force = false) {
  if (!DASH_DATA || force) DASH_DATA = await loadAllData();
  return DASH_DATA;
}

function setLoading(on) {
  let el = document.getElementById('dashLoader');
  if (!el) {
    el = document.createElement('div');
    el.id = 'dashLoader';
    el.className = 'dash-loader';
    el.innerHTML = '<div class="dash-spinner"></div>';
    document.body.appendChild(el);
  }
  el.classList.toggle('show', !!on);
}

/* ---------- SESSION PERSISTENCE ---------- */
function saveSession(email) {
  if (email) localStorage.setItem(SESSION_KEY, email);
  else localStorage.removeItem(SESSION_KEY);
}

async function restoreSession() {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return;
  const acct = (window.MBAauth && MBAauth.findAccount) ? MBAauth.findAccount(email) : null;
  if (acct) { currentUser = buildLocalView(acct); showDashboard(); return; }
  setLoading(true);
  await ensureData();
  const view = buildStudentView(DASH_DATA, email);
  setLoading(false);
  if (!view) { saveSession(null); return; }
  currentUser = view;
  showDashboard();
}

function goToHomeFromDashboard() {
  // mark that the redirect already happened this session, so Home stays viewable
  try { sessionStorage.setItem('mbaHomeRedirected', '1'); } catch (e) {}
  window.location.href = 'index.html';
}

/* ---------- LOGIN ---------- */
let authMode = 'login';
async function handleLogin() {
  if (authMode === 'signup') { doSignup(); return; }
  const email = document.getElementById('emailInput').value.trim();
  const pass  = document.getElementById('passInput').value;
  const btn   = document.getElementById('loginBtn');
  const btnText = document.getElementById('loginBtnText');

  if (!email || !pass) { showError('Please enter your email and password.'); return; }

  btn.classList.add('loading');
  btnText.textContent = 'Signing in...';

  await ensureData();
  const acctLogin = window.MBAauth ? MBAauth.login(email, pass) : { ok: false };
  const ok = acctLogin.ok || checkCredentials(DASH_DATA, email, pass);

  setTimeout(() => {
    btn.classList.remove('loading');
    btnText.textContent = 'Sign in to Dashboard';
    if (!ok) { showError('No matching account. Check your details or create an account below.'); return; }
    if (window.MBAauth && !acctLogin.ok) MBAauth.setSession(email.trim().toLowerCase(), '');
    const ret = window.MBAauth ? MBAauth.takeReturn() : '';
    if (ret) { location.href = ret; return; }
    enterDashboard(email.trim().toLowerCase());
  }, 500);
}
function doSignup() {
  const nameEl = document.getElementById('nameInput');
  const name = nameEl ? nameEl.value : '';
  const email = document.getElementById('emailInput').value.trim();
  const pass = document.getElementById('passInput').value;
  const r = window.MBAauth ? MBAauth.signup(name, email, pass) : { ok: false, error: 'Auth unavailable.' };
  if (!r.ok) { showError(r.error); return; }
  const ret = MBAauth.takeReturn();
  if (ret) { location.href = ret; return; }
  enterDashboard(email.trim().toLowerCase());
}
function toggleAuthMode() {
  authMode = authMode === 'login' ? 'signup' : 'login';
  const nf = document.getElementById('nameField');
  const bt = document.getElementById('loginBtnText');
  const tg = document.getElementById('authToggle');
  const h  = document.getElementById('authHeading');
  const s  = document.getElementById('authSub');
  document.getElementById('loginError').classList.add('hidden');
  if (authMode === 'signup') {
    if (nf) nf.style.display = '';
    if (bt) bt.textContent = 'Create account';
    if (tg) tg.innerHTML = 'Already have an account? <a>Log in</a>';
    if (h) h.textContent = 'Create your account';
    if (s) s.textContent = 'Sign up to enroll and access your dashboard';
  } else {
    if (nf) nf.style.display = 'none';
    if (bt) bt.textContent = 'Sign in to Dashboard';
    if (tg) tg.innerHTML = 'New to MBA Partner? <a>Create an account</a>';
    if (h) h.textContent = 'Welcome back 👋';
    if (s) s.textContent = 'Log in to access your student dashboard';
  }
}

function showError(msg) {
  document.getElementById('loginErrorMsg').textContent = msg;
  document.getElementById('loginError').classList.remove('hidden');
}

async function demoLogin(type) {
  const email = DEMO_MAP[type] || type;   // accepts a key or a raw email
  setLoading(true);
  await ensureData();
  setLoading(false);
  enterDashboard(email);
}

function buildLocalView(a) {
  return {
    name: a.name || 'Student', email: a.email, role: 'Student',
    avatar: ((a.name || a.email || '?')[0] || '?').toUpperCase(),
    courses: (a.courses || []).map(c => ({ type: c.type || 'Course', title: c.title, emoji: '', icon: (typeof guessIcon === 'function' ? guessIcon(c.title, c.type) : 'ti-book-2'), progress: 0, nextSession: 'Onboarding', nextDate: 'Soon', statType: c.statType || 'bootcamp' })),
    sessions: [], materials: [],
    cvDone: 0, cvTotal: 5, piDone: 0, piTotal: 7, gdDone: 0, gdTotal: 7, liveProgress: 0,
    caseDone: 0, caseTotal: 3, certProgress: 0
  };
}
function enterDashboard(email) {
  const acct = (window.MBAauth && MBAauth.findAccount) ? MBAauth.findAccount(email) : null;
  const view = acct ? buildLocalView(acct) : buildStudentView(DASH_DATA, email);
  if (!view) { showError('No student record found for ' + email + '.'); return; }
  currentUser = view;
  saveSession(email);
  showDashboard();
}

// A brand-new visitor with a real (Clerk-verified) email but no purchase/
// enrollment yet — instead of a scary "no record found" error, give them a
// friendly empty dashboard (0 courses, "browse courses" prompts already
// built into renderCourseCards/renderSessions/renderMaterials) so signing
// up feels like it worked. As soon as they buy a course, the backend
// auto-provisions a real Students/Enrollments record and this welcome
// shell gets replaced by their actual progress on the next login.
function blankStudentView(email, displayName) {
  const name = (displayName || email.split('@')[0] || 'Student').trim() || 'Student';
  return {
    name, email, role: 'Student',
    avatar: (name[0] || '?').toUpperCase(),
    courses: [], sessions: [], materials: [],
    cvDone: 0, cvTotal: 5, piDone: 0, piTotal: 7, gdDone: 0, gdTotal: 7, liveProgress: 0,
    caseDone: 0, caseTotal: 3, certProgress: 0
  };
}
function enterDashboardOrWelcome(email, displayName) {
  // If the visitor was sent here mid-task (e.g. clicked "Enroll Now" on a
  // course while logged out), send them straight back to where they were
  // instead of always landing on the dashboard — so they can pick up the
  // purchase/enrollment they were trying to make.
  const ret = window.MBAauth ? MBAauth.takeReturn() : '';

  // Real (Clerk-verified) logins always read from the admin-managed data
  // (Students/Enrollments/Programs) — never from the old local/demo
  // MBAauth accounts, even if a stale one happens to exist in this
  // browser's localStorage from earlier testing (that data has no
  // connection to any real purchase and would otherwise silently shadow
  // it, always showing 0 courses regardless of what was actually bought).
  const view = buildStudentView(DASH_DATA, email);
  currentUser = view || blankStudentView(email, displayName);
  saveSession(email);

  if (ret) { location.href = ret; return; }
  showDashboard();
}

function showDashboard() {
  const loginPage = document.getElementById('loginPage');
  const dashPage  = document.getElementById('dashPage');
  loginPage.classList.add('hidden');
  loginPage.classList.remove('is-exiting');
  dashPage.classList.remove('hidden');
  dashPage.classList.add('showing');
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  setTimeout(initDashboard, 60);
}

function logout() {
  saveSession(null);
  if (window.MBAauth) MBAauth.logout();
  // Real sessions are owned by Clerk now — sign out there too so a page
  // refresh doesn't just log the student straight back in.
  if (window.Clerk && Clerk.user) { try { Clerk.signOut(); } catch (e) {} }
  document.getElementById('dashPage').classList.add('hidden');
  document.getElementById('dashPage').classList.remove('showing');
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('loginPage').classList.remove('is-exiting');
  const emailEl = document.getElementById('emailInput'); if (emailEl) emailEl.value = '';
  const passEl = document.getElementById('passInput'); if (passEl) passEl.value = '';
  document.getElementById('loginError').classList.add('hidden');
  currentUser = null;
}

// NOTE: session restoration on page load is now driven by js/clerk-auth.js
// (it checks Clerk's real signed-in session first, and only falls back to
// this legacy localStorage-based restoreSession() for the "try the demo"
// buttons, which never touch Clerk at all).

/* ---------- INIT DASHBOARD ---------- */
function initDashboard() {
  const u = currentUser;
  const first = (u.name || 'Student').split(' ')[0];
  const hr = new Date().getHours();
  const greet = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
  const initial = (u.avatar || first[0] || '?').toString().toUpperCase();

  document.getElementById('sidebarAvatar').textContent = initial;
  document.getElementById('topbarAvatar').textContent  = initial;
  document.getElementById('sidebarName').textContent   = u.name;
  document.getElementById('sidebarRole').textContent   = u.role;
  document.getElementById('welcomeMsg').textContent    = greet + ', ' + first + '! 👋';

  // dynamic welcome subtitle + session badge
  const sub = document.getElementById('welcomeSub');
  if (sub) {
    sub.textContent = u.sessions.length
      ? 'You have ' + u.sessions.length + ' upcoming session' + (u.sessions.length > 1 ? 's' : '') +
        '. Keep up the momentum — placements are closer than they feel.'
      : 'No sessions scheduled yet. Explore your materials and keep building your CV.';
  }
  const badge = document.getElementById('sessionsBadge');
  if (badge) {
    if (u.sessions.length) { badge.textContent = u.sessions.length; badge.style.display = ''; }
    else badge.style.display = 'none';
  }

  renderCourseCards('overviewCourses', u.courses.slice(0, 3));
  renderCourseCards('allCourseCards', u.courses);
  renderSessions('overviewSessions', u.sessions.slice(0, 2));
  renderSessions('allSessions', u.sessions);
  renderMaterials(u.materials);
  renderMaterialsNotification(u);
  renderProgress(u);
  // renderOverviewStats(u); -- Overview stat cards (CV/PI/GD counts) removed
  // from the dashboard per request; renderOverviewStats() kept below unused
  // in case it's wanted back later.

  // Closed/enrolled-students WhatsApp group — only shown once the student
  // has actually purchased at least one course (open community group above
  // stays visible for everyone regardless).
  const waClosedBtn = document.getElementById('waClosedGroupBtn');
  if (waClosedBtn) {
    const purchased = typeof u.hasPurchased === 'boolean' ? u.hasPurchased : !!(u.courses && u.courses.length);
    waClosedBtn.style.display = purchased ? '' : 'none';
  }
}

// Overview stat cards — these used to be 4 fixed, hardcoded dummy numbers
// ("2/5", "4/7", "5/7", "68%") that showed the same thing to every student
// regardless of what they'd actually bought. Now the set of cards shown is
// driven by the category (statType, set on the admin's Dashboard Programs
// entry) of whatever course(s) this specific student is enrolled in — e.g.
// a Live Project student only sees "Live project progress", a Bootcamp
// student sees CV/PI/GD, a student in a combo sees all of them.
const OVERVIEW_STAT_DEFS = {
  cv:   { ico: 'orange ti-file-cv',      label: 'CV Reviews done',       num: u => u.cvDone,       total: u => u.cvTotal },
  pi:   { ico: 'navy ti-microphone-2',   label: 'Mock PIs completed',    num: u => u.piDone,       total: u => u.piTotal },
  gd:   { ico: 'green ti-users',         label: 'GD rounds done',        num: u => u.gdDone,       total: u => u.gdTotal },
  live: { ico: 'purple ti-briefcase',    label: 'Live project progress', num: u => u.liveProgress, suffix: '%' },
  case: { ico: 'red ti-trophy',          label: 'Case rounds done',      num: u => u.caseDone,     total: u => u.caseTotal },
  cert: { ico: 'teal ti-certificate',    label: 'Certificate progress',  num: u => u.certProgress, suffix: '%' }
};
const STAT_TYPE_TO_CARDS = {
  bootcamp: ['cv', 'pi', 'gd'],
  gdpi:     ['pi', 'gd'],
  live:     ['live'],
  case:     ['case'],
  cert:     ['cert'],
  combo:    ['cv', 'pi', 'gd', 'live']
};
const OVERVIEW_CARD_ORDER = ['cv', 'pi', 'gd', 'live', 'case', 'cert'];

function renderOverviewStats(u) {
  const row = document.getElementById('overviewStatsRow');
  if (!row) return;

  // Union of every card key relevant to any course this student owns.
  // No courses yet (brand-new student) → fall back to the original
  // generic CV/PI/GD/Live set so the dashboard doesn't look empty.
  let keys;
  if (u.courses && u.courses.length) {
    const set = new Set();
    u.courses.forEach(c => (STAT_TYPE_TO_CARDS[c.statType] || STAT_TYPE_TO_CARDS.bootcamp).forEach(k => set.add(k)));
    keys = OVERVIEW_CARD_ORDER.filter(k => set.has(k));
  } else {
    keys = ['cv', 'pi', 'gd', 'live'];
  }

  row.innerHTML = keys.map(k => {
    const d = OVERVIEW_STAT_DEFS[k];
    const num = d.num(u) || 0;
    const totalTxt = d.total ? '/' + d.total(u) : (d.suffix || '');
    return `<div class="stat-card">
      <div class="stat-card-top"><div class="stat-card-ico ${d.ico.split(' ')[0]}"><i class="ti ${d.ico.split(' ')[1]}"></i></div></div>
      <div class="stat-num">${num}<span style="font-size:16px;color:var(--ink3)">${totalTxt}</span></div>
      <div class="stat-lbl">${d.label}</div>
    </div>`;
  }).join('');
}

/* ---------- RENDERERS ---------- */
function renderCourseCards(containerId, courses) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!courses.length) { el.innerHTML = emptyState('ti-book', 'No programs yet', 'Enrolled programs will appear here.'); return; }
  el.innerHTML = courses.map(c => `
    <div class="course-card">
      <div class="course-card-img">${c.emoji ? `<span style="font-size:36px">${c.emoji}</span>` : `<i class="ti ${c.icon || 'ti-book-2'}"></i>`}</div>
      <div class="course-card-body">
        <div class="course-card-type">${c.type}</div>
        <div class="course-card-title">${c.title}</div>
      </div>
      <div class="course-card-foot">
        <div class="course-next">Next: <strong>${c.nextSession}</strong>${c.nextDate ? ' · ' + c.nextDate : ''}</div>
        <button class="continue-btn" onclick="switchPage('materials',document.querySelector('[data-page=materials]'))">Continue →</button>
      </div>
    </div>`).join('');
}

function renderSessions(containerId, sessions) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!sessions.length) { el.innerHTML = emptyState('ti-calendar', 'No upcoming sessions', 'New live sessions will show up here.'); return; }
  el.innerHTML = sessions.map(s => `
    <div class="session-item">
      <div class="session-date"><div class="day">${s.day}</div><div class="mon">${s.mon}</div></div>
      <div class="session-info">
        <div class="session-title">${s.title}</div>
        <div class="session-meta">
          <span><i class="ti ti-clock"></i>${s.time}</span>
          <span><i class="ti ti-user"></i>${s.mentor}</span>
          <span class="session-tag">${s.type}</span>
        </div>
      </div>
      <button class="session-join ${s.soon ? 'soon' : ''}">${s.soon ? '🔴 Join Now' : 'Add to Cal'}</button>
    </div>`).join('');
}

/* Drive folders are private — the admin shares each one manually with the
   student's email, then flips "Drive access granted" on that Enrollments
   row. The student isn't watching the admin dashboard, so the first time
   they log back in after that happens, show a one-time banner pointing
   them at Materials. Tracked per student+course in localStorage so it only
   shows once (dismissing it, or just visiting once, marks it seen). */
function renderMaterialsNotification(u) {
  const box = document.getElementById('materialsNotifBanner');
  if (!box) return;
  const seenKey = code => `mbaMatNotifSeen_${u.email}_${code}`;
  const newlyGranted = (u.courses || []).filter(c => c.materialsGranted && !localStorage.getItem(seenKey(c.code)));

  if (!newlyGranted.length) { box.innerHTML = ''; return; }

  const names = newlyGranted.map(c => c.title).join(', ');
  box.innerHTML = `
    <div class="welcome-banner" style="background:linear-gradient(120deg,#1a7f4b,#22a35e);margin-bottom:16px">
      <div class="welcome-text">
        <h3 style="margin:0">🎉 Your materials are ready!</h3>
        <p style="margin:4px 0 0">Access has been granted for: <b>${names}</b>. Head to the Materials tab to view your Drive links.</p>
      </div>
      <button class="welcome-cta" id="matNotifDismiss">Got it</button>
    </div>`;
  document.getElementById('matNotifDismiss').onclick = () => {
    newlyGranted.forEach(c => localStorage.setItem(seenKey(c.code), '1'));
    box.innerHTML = '';
  };
}

/* Materials shown DIRECTLY on the site, grouped by category, with filter chips. */
function renderMaterials(materials) {
  const grid = document.getElementById('materialsGrid');
  if (!grid) return;

  if (!materials.length) {
    grid.innerHTML = emptyState('ti-folder-open', 'Materials on the way', 'You will get access within 24 hours. Our team adds the Drive folder/links for your course shortly after enrollment.');
    const fc = document.getElementById('materialFilters'); if (fc) fc.innerHTML = '';
    const count = document.getElementById('materialCount'); if (count) count.textContent = '';
    return;
  }

  const categories = [...new Set(materials.map(m => m.category))];

  // filter chips
  const fc = document.getElementById('materialFilters');
  if (fc) {
    fc.innerHTML =
      `<button class="mat-chip active" data-cat="__all" onclick="filterMaterials('__all',this)">All (${materials.length})</button>` +
      categories.map(cat => {
        const n = materials.filter(m => m.category === cat).length;
        const safe = cat.replace(/'/g, "\\'");
        return `<button class="mat-chip" data-cat="${cat}" onclick="filterMaterials('${safe}',this)">${cat} (${n})</button>`;
      }).join('');
  }

  const count = document.getElementById('materialCount');
  if (count) count.textContent = `${materials.length} resources across ${categories.length} categories`;

  grid.innerHTML = categories.map(cat => {
    const items = materials.filter(m => m.category === cat);
    return `<div class="mat-group" data-cat="${cat}">
      <div class="mat-group-head"><i class="ti ti-folder"></i> ${cat} <span>${items.length}</span></div>
      <div class="mat-group-grid">
        ${items.map(m => {
          const st = MAT_STYLE[m.type] || MAT_STYLE.drive;
          const hasLink = m.link && m.link !== '#';
          return `<div class="material-card" ${hasLink ? `onclick="window.open('${m.link}','_blank')"` : ''}>
            <div class="material-ico ${st.cls}"><i class="ti ${st.icon}"></i></div>
            <div class="material-name">${m.name}</div>
            <div class="material-meta">${m.meta || ''}</div>
            <div class="material-dl">${hasLink ? '<i class="ti ti-external-link"></i> Open / Download' : '<i class="ti ti-clock"></i> Coming soon'}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }).join('');
}

function filterMaterials(cat, btn) {
  document.querySelectorAll('#materialFilters .mat-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('#materialsGrid .mat-group').forEach(g => {
    g.style.display = (cat === '__all' || g.dataset.cat === cat) ? '' : 'none';
  });
}

function renderProgress(u) {
  // CV slots
  let cvHtml = `<h3>CV Review Tracker <span class="tracker-sub">${u.cvDone}/${u.cvTotal} completed</span></h3><div class="cv-slots">`;
  for (let i = 1; i <= u.cvTotal; i++) {
    const cls  = i <= u.cvDone ? 'done' : i === u.cvDone + 1 ? 'active' : '';
    const icon = i <= u.cvDone ? 'ti-circle-check' : i === u.cvDone + 1 ? 'ti-clock' : 'ti-circle';
    cvHtml += `<div class="cv-slot ${cls}"><div class="cv-slot-circle"><i class="ti ${icon}"></i></div><div class="cv-slot-lbl">CV #${i}</div></div>`;
  }
  cvHtml += '</div>';
  document.getElementById('cvTracker').innerHTML = cvHtml;

  // PI + GD grid
  let piHtml = '';
  for (let i = 1; i <= u.piTotal; i++) {
    const cls = i <= u.piDone ? 'done' : i === u.piDone + 1 ? 'scheduled' : '';
    piHtml += `<div class="pi-item ${cls}"><i class="ti ${cls === 'done' ? 'ti-check' : cls === 'scheduled' ? 'ti-clock' : 'ti-microphone-2'}" style="font-size:16px"></i>PI #${i}</div>`;
  }
  for (let i = 1; i <= u.gdTotal; i++) {
    const cls = i <= u.gdDone ? 'done' : i === u.gdDone + 1 ? 'scheduled' : '';
    piHtml += `<div class="pi-item ${cls}"><i class="ti ${cls === 'done' ? 'ti-check' : cls === 'scheduled' ? 'ti-clock' : 'ti-users'}" style="font-size:16px"></i>GD #${i}</div>`;
  }
  document.getElementById('piGrid').innerHTML = piHtml;
}

function emptyState(icon, title, sub) {
  return `<div class="dash-empty"><i class="ti ${icon}"></i><h4>${title}</h4><p>${sub}</p></div>`;
}

/* ---------- PAGE SWITCHING ---------- */
const pageTitles = { overview: 'Overview', courses: 'My Courses', sessions: 'Sessions', materials: 'Materials & Drive', progress: 'CV & PI Progress' };
function switchPage(page, btn) {
  document.querySelectorAll('.dash-page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById('topbarTitle').textContent = pageTitles[page] || page;
  const body = document.querySelector('.dash-body'); if (body) body.scrollTop = 0;
  closeSidebar();
}

/* ---------- MOBILE SIDEBAR ---------- */
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

/* ---------- KEYBOARD ---------- */
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('passInput') === document.activeElement) handleLogin();
});
