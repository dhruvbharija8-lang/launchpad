/* ============================================================
   MBA PARTNER — SHARED NAV AUTH
   nav-auth.js
   ------------------------------------------------------------
   Include this on every page that has a nav Login button.
   It does two things:
     1. If NOT logged in  → wire Login button to go to login.html
     2. If logged in      → replace Login button with a profile
                            avatar + dropdown (Dashboard / Sign out)
   Depends on: localStorage keys set by form.js on login
     mbaPartnerSession  — email string
     mbaPartnerName     — display name  e.g. "Ananya Sharma"
     mbaPartnerAvatar   — single letter e.g. "A"
============================================================ */

(function () {
  const SESSION_KEY = 'mbaPartnerSession';
  const NAME_KEY    = 'mbaPartnerName';
  const AVATAR_KEY  = 'mbaPartnerAvatar';

  /* ── Inject dropdown CSS once ── */
  const STYLE = `
    .nav-profile-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
    }
    .nav-avatar-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border: none;
      cursor: pointer;
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(102,126,234,.4);
      transition: transform .18s, box-shadow .18s;
      line-height: 1;
    }
    .nav-avatar-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 4px 14px rgba(102,126,234,.55);
    }
    .nav-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 8px 32px rgba(0,0,0,.14);
      min-width: 200px;
      z-index: 9000;
      overflow: hidden;
      opacity: 0;
      transform: translateY(-6px) scale(.97);
      pointer-events: none;
      transition: opacity .18s ease, transform .18s ease;
    }
    .nav-dropdown.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }
    .nav-dropdown-header {
      padding: 14px 16px 10px;
      border-bottom: 1px solid #f3f4f6;
    }
    .nav-dropdown-header .dd-name {
      font-size: 13px;
      font-weight: 700;
      color: #111827;
    }
    .nav-dropdown-header .dd-email {
      font-size: 11px;
      color: #9ca3af;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .nav-dd-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 11px 16px;
      font-size: 13px;
      color: #374151;
      font-weight: 500;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-family: inherit;
      transition: background .15s;
    }
    .nav-dd-item:hover { background: #f9fafb; }
    .nav-dd-item.danger { color: #ef4444; }
    .nav-dd-item.danger:hover { background: #fff5f5; }
    .nav-dd-item i { font-size: 15px; opacity: .7; }

    /* Mobile nav variant — a floating dropdown anchored to a tiny avatar
       circle doesn't work inside a narrow, stacked mobile menu (it can open
       off-screen or get clipped), so on mobile "My Dashboard" / "Sign Out"
       are shown as normal full-width rows in the menu instead, matching the
       existing "Free Resources" expandable submenu pattern. */
    .mobile-profile-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
    }
    .nav-avatar-btn-sm {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      line-height: 1;
    }
    .mobile-profile-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mobile-profile-sub {
      display: none;
      flex-direction: column;
      gap: 2px;
    }
    .mobile-profile-sub.open { display: flex; }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = STYLE;
  document.head.appendChild(styleEl);

  /* ── Read session ── */
  let email, name, avatar;
  try {
    email  = localStorage.getItem(SESSION_KEY) || '';
    name   = localStorage.getItem(NAME_KEY)    || '';
    avatar = localStorage.getItem(AVATAR_KEY)  || (name ? name[0].toUpperCase() : email ? email[0].toUpperCase() : '?');
  } catch(e) { email = ''; }

  /* ── Build profile widget ── */
  function buildProfileWidget() {
    const wrap = document.createElement('div');
    wrap.className = 'nav-profile-wrap';
    wrap.innerHTML = `
      <button class="nav-avatar-btn" id="navAvatarBtn" aria-label="Account menu">${avatar}</button>
      <div class="nav-dropdown" id="navDropdown">
        <div class="nav-dropdown-header">
          <div class="dd-name">${name || 'Student'}</div>
          <div class="dd-email">${email}</div>
        </div>
        <button class="nav-dd-item" onclick="window.location.href='login.html'">
          <i class="ti ti-layout-dashboard"></i> My Dashboard
        </button>
        <button class="nav-dd-item danger" id="navSignOutBtn">
          <i class="ti ti-logout"></i> Sign Out
        </button>
      </div>
    `;
    return wrap;
  }

  /* ── Mobile variant: full-width expandable rows instead of a dropdown ── */
  function buildMobileProfileWidget() {
    const wrap = document.createElement('div');
    wrap.className = 'nav-mobile-profile';
    wrap.innerHTML = `
      <button class="mobile-nav-a mobile-profile-btn" id="mobileProfileBtn" type="button">
        <span class="nav-avatar-btn-sm">${avatar}</span>
        <span class="mobile-profile-name">${name || 'Student'}</span>
        <i class="ti ti-chevron-down" id="mobileProfileChev" style="margin-left:auto;font-size:12px;transition:.2s"></i>
      </button>
      <div class="mobile-profile-sub" id="mobileProfileSub">
        <button class="mobile-nav-a" style="padding-left:28px" type="button" onclick="window.location.href='login.html'">
          <i class="ti ti-layout-dashboard"></i> My Dashboard
        </button>
        <button class="mobile-nav-a" style="padding-left:28px" type="button" id="mobileSignOutBtn">
          <i class="ti ti-logout"></i> Sign Out
        </button>
      </div>
    `;
    return wrap;
  }

  async function doSignOut() {
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(NAME_KEY);
      localStorage.removeItem(AVATAR_KEY);
    } catch(e) {}
    // Clearing the local display state alone isn't a real sign-out — the
    // actual Clerk session (used on login.html) stays active, so the
    // next visit to Login silently logs the same account back in. Sign
    // out of Clerk too, from wherever this button happens to be. Give
    // Clerk's async script a brief moment to finish loading if it hasn't
    // already (it usually has, by the time someone clicks Sign Out).
    let tries = 0;
    while (!window.Clerk && tries < 20) { await new Promise(r => setTimeout(r, 100)); tries++; }
    if (window.Clerk) {
      // Clerk.user is only populated AFTER Clerk.load() resolves — on
      // pages that never call it (this button can appear on any page),
      // Clerk.user looks empty even though the real session is still
      // active, so the sign-out below would silently get skipped.
      try { await Clerk.load(); } catch (e) {}
      if (Clerk.user) {
        try { await Clerk.signOut(); } catch (e) {}
      }
    }
    window.location.reload();
  }

  /* ── Replace a login button element with the profile widget ── */
  function replaceWithProfile(btn) {
    if (!btn) return;

    // The mobile menu's login button (#loginBtnMobile) is a full-width row
    // in a stacked list — a floating dropdown anchored to a small avatar
    // circle can open off-screen or get clipped there, which is why
    // "My Dashboard"/"Sign Out" were reported as invisible on mobile. Give
    // it its own expandable-row treatment instead of the desktop dropdown.
    if (btn.id === 'loginBtnMobile') {
      const widget = buildMobileProfileWidget();
      btn.replaceWith(widget);
      const toggleBtn = widget.querySelector('#mobileProfileBtn');
      const sub = widget.querySelector('#mobileProfileSub');
      const chev = widget.querySelector('#mobileProfileChev');
      toggleBtn.addEventListener('click', () => {
        sub.classList.toggle('open');
        if (chev) chev.style.transform = sub.classList.contains('open') ? 'rotate(180deg)' : '';
      });
      widget.querySelector('#mobileSignOutBtn').addEventListener('click', doSignOut);
      return;
    }

    const widget = buildProfileWidget();
    btn.replaceWith(widget);

    const avatarBtn = widget.querySelector('#navAvatarBtn');
    const dropdown  = widget.querySelector('#navDropdown');
    const signOutBtn = widget.querySelector('#navSignOutBtn');

    avatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => dropdown.classList.remove('open'));

    signOutBtn.addEventListener('click', doSignOut);
  }

  /* ── Wire a login button to go to login.html ── */
  function wireLoginBtn(btn) {
    if (!btn) return;
    btn.addEventListener('click', () => { window.location.href = 'login.html'; });
  }

  /* ── Run on DOM ready ── */
  function run() {
    // Collect all login buttons (desktop + mobile variants)
    const loginBtns   = Array.from(document.querySelectorAll('#loginBtn, #loginBtnMobile, .nav-login'));

    if (email) {
      // Logged in — swap each login button for a profile widget
      loginBtns.forEach(btn => replaceWithProfile(btn));
    } else {
      // Not logged in — wire each button to login.html
      loginBtns.forEach(btn => wireLoginBtn(btn));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
