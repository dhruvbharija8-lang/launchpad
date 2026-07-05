/* ============================================================
   MBA PARTNER — SHARED SITE NAVBAR
   site-nav.js
   ------------------------------------------------------------
   Single source of truth for the public top navbar.
   Include on every public page BEFORE nav-auth.js:
     <script src="js/site-nav.js"></script>
     <script src="js/nav-auth.js"></script>
   It injects the navbar CSS + markup, removes the page's own
   old top <nav>, marks the active link, and wires the mobile
   menu + Free Resources dropdown. nav-auth.js then turns the
   Login button into a profile menu when the user is signed in.
   (Do NOT include on index.html / courses.html — those keep
   their cart-wired navs; or on login.html — dashboard layout.)
============================================================ */
(function () {
  if (window.__mbaSiteNavLoaded) return;
  window.__mbaSiteNavLoaded = true;

  var CSS = ''
  + '.nav{position:sticky;top:0;z-index:100;background:#1B2A6B;border-bottom:1px solid rgba(255,255,255,.08);box-shadow:0 2px 20px rgba(27,42,107,.25)}'
  + '.nav .wrap{max-width:1140px;margin:0 auto;padding:0 32px}'
  + '.nav-in{display:flex;align-items:center;gap:18px;height:68px}'
  + '.nav .brand{display:flex;align-items:center;gap:12px;flex-shrink:0;cursor:pointer}'
  + '.nav .brand-mark{width:42px;height:42px;background:#FF8B02;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:19px;box-shadow:0 4px 14px rgba(255,139,2,.4)}'
  + '.nav .brand-name{font-size:16px;font-weight:800;color:#fff;line-height:1.1}'
  + '.nav .brand-tag{font-size:9.5px;color:rgba(255,255,255,.5);font-weight:500;line-height:1.3}'
  + '.nav-links{display:flex;align-items:center;gap:2px;margin-left:auto}'
  + '.nav-a{font-size:13px;font-weight:500;color:rgba(255,255,255,.75);padding:8px 13px;border-radius:8px;border:none;background:transparent;cursor:pointer;transition:.2s;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center;font-family:inherit}'
  + '.nav-a:hover,.nav-a.active,.nav-a.active-link{color:#fff;background:rgba(255,255,255,.1)}'
  + '.nav-sep{width:1px;height:22px;background:rgba(255,255,255,.15);margin:0 6px}'
  + '.nav-login{font-size:13px;font-weight:700;background:transparent;color:#fff;padding:8px 18px;border-radius:30px;border:1.5px solid rgba(255,255,255,.3);cursor:pointer;transition:.2s;font-family:inherit}'
  + '.nav-login:hover{background:rgba(255,255,255,.1);border-color:#fff}'
  + '.nav-call{font-size:13px;font-weight:700;background:#FF8B02;color:#fff;padding:9px 20px;border-radius:30px;border:none;transition:.2s;white-space:nowrap;display:inline-flex;align-items:center;text-decoration:none}'
  + '.nav-call:hover{background:#D97400}'
  + '.nav-free-res{position:relative;display:inline-flex;align-items:center}'
  + '.nav-free-btn{display:inline-flex;align-items:center;gap:5px}'
  + '.nav-free-chev{font-size:11px;margin-left:2px;transition:transform .2s}'
  + '.nav-free-res:hover .nav-free-chev{transform:rotate(180deg)}'
  + '.nav-free-menu{position:absolute;top:calc(100% + 8px);left:0;min-width:190px;background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.16);padding:6px;opacity:0;visibility:hidden;transform:translateY(-6px) scale(.97);transition:opacity .2s ease,transform .2s ease,visibility .2s;z-index:200}'
  + '.nav-free-res:hover .nav-free-menu{opacity:1;visibility:visible;transform:translateY(0) scale(1)}'
  + '.nav-free-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;font-size:13px;font-weight:600;color:#1B2A6B;transition:.15s;text-decoration:none}'
  + '.nav-free-item:hover{background:#F0F2F8;color:#FF8B02}'
  + '.nav-free-item i{font-size:16px;color:#FF8B02}'
  + '.mobile-menu-btn{display:none;align-items:center;justify-content:center;padding:8px;background:transparent;border:none;color:rgba(255,255,255,.8);font-size:22px;cursor:pointer}'
  + '.mobile-nav{display:none;background:#223278;border-top:1px solid rgba(255,255,255,.1);padding:16px 18px 20px;flex-direction:column;gap:6px}'
  + '.mobile-nav.open{display:flex}'
  + '.mobile-nav-a{font-size:14px;font-weight:500;color:rgba(255,255,255,.8);padding:11px 14px;border-radius:10px;display:block;transition:.2s;border:none;background:transparent;cursor:pointer;text-align:left;width:100%;text-decoration:none;font-family:inherit}'
  + '.mobile-nav-a:hover{background:rgba(255,255,255,.08);color:#fff}'
  + '.mobile-free-sub{display:none;overflow:hidden;flex-direction:column;gap:2px}'
  + '.mobile-free-sub.open{display:flex}'
  + '.mobile-free-btn{display:flex;align-items:center;gap:8px}'
  + '.mobile-free-btn i:first-child{color:rgba(255,255,255,.8)}'
  + '.mobile-nav-btns{display:flex;gap:10px;margin-top:8px}'
  + '@media(max-width:900px){.nav-links{display:none}.mobile-menu-btn{display:flex}}';

  // Determine current page filename for active-link highlighting
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === '') page = 'index.html';
  function act(file) { return page === file ? ' active' : ''; }

  // Whichever persona (MBA / CAT-OMETs) the visitor last toggled to on the
  // homepage — read directly from localStorage (not via navbar.js/search.js,
  // which may not have loaded yet at this point) so this shared navbar can
  // swap its "Free Resources" dropdown to match, the same way cat-enroll.html
  // already does with its own hardcoded "Brochure" nav.
  function navPersona() { try { return localStorage.getItem('mbaPersona') || 'mba'; } catch (e) { return 'mba'; } }
  var isCat = navPersona() === 'cat';

  var freeResBtnLabel = isCat
    ? '<i class="ti ti-notebook" style="font-size:14px;margin-right:4px"></i>Brochure'
    : '<i class="ti ti-book-download" style="font-size:14px;margin-right:4px"></i>Free Resources';
  var freeResMenuItems = isCat
    ? '<a class="nav-free-item" href="cat-enroll.html"><i class="ti ti-briefcase"></i><span>Live Project</span></a>'
    + '<a class="nav-free-item" href="cat-enroll.html"><i class="ti ti-message-2"></i><span>GDPI</span></a>'
    : '<a class="nav-free-item" href="https://documents1.netlify.app/" target="_blank"><i class="ti ti-notebook"></i><span>Brochures</span></a>'
    + '<a class="nav-free-item" href="https://documents1.netlify.app/" target="_blank"><i class="ti ti-book-2"></i><span>Compendium</span></a>'
    + '<a class="nav-free-item" href="index.html#free-sessions"><i class="ti ti-player-play-filled"></i><span>Free Session</span></a>'
    + '<a class="nav-free-item" href="https://documents1.netlify.app/" target="_blank"><i class="ti ti-file-cv"></i><span>Sample CV</span></a>';
  var mobileFreeResBtnLabel = isCat
    ? '<i class="ti ti-notebook"></i> Brochure'
    : '<i class="ti ti-book-download"></i> Free Resources';
  var mobileFreeMenuItems = isCat
    ? '<a class="mobile-nav-a" href="cat-enroll.html" style="padding-left:28px"><i class="ti ti-briefcase"></i> Live Project</a>'
    + '<a class="mobile-nav-a" href="cat-enroll.html" style="padding-left:28px"><i class="ti ti-message-2"></i> GDPI</a>'
    : '<a class="mobile-nav-a" href="https://documents1.netlify.app/" target="_blank" style="padding-left:28px"><i class="ti ti-notebook"></i> Brochures</a>'
    + '<a class="mobile-nav-a" href="https://documents1.netlify.app/" target="_blank" style="padding-left:28px"><i class="ti ti-book-2"></i> Compendium</a>'
    + '<a class="mobile-nav-a" href="index.html#free-sessions" style="padding-left:28px"><i class="ti ti-player-play-filled"></i> Free Session</a>'
    + '<a class="mobile-nav-a" href="https://documents1.netlify.app/" target="_blank" style="padding-left:28px"><i class="ti ti-file-cv"></i> Sample CV</a>';

  var NAV = ''
  + '<nav class="nav" id="siteNav">'
  +   '<div class="wrap nav-in">'
  +     '<div class="brand" onclick="window.location.href=\'index.html\'">'
  +       '<div class="brand-mark">M</div>'
  +       '<div class="brand-text"><div class="brand-name">MBA Partner</div><div class="brand-tag">Initiative by Alumni of Old IIMs</div></div>'
  +     '</div>'
  +     '<div class="nav-links">'
  +       '<a class="nav-a' + act('index.html') + '" href="index.html">Home</a>'
  +       '<a class="nav-a' + act('courses.html') + '" href="courses.html">Courses</a>'
  +       '<a class="nav-a' + act('testimonials.html') + '" href="testimonials.html">Testimonials</a>'
  +       '<div class="nav-free-res">'
  +         '<button class="nav-a nav-free-btn">' + freeResBtnLabel + '<i class="ti ti-chevron-down nav-free-chev"></i></button>'
  +         '<div class="nav-free-menu">' + freeResMenuItems + '</div>'
  +       '</div>'
  +       '<a class="nav-a' + act('college-collab.html') + '" href="college-collab.html">College Collab</a>'
  +       '<a class="nav-a' + act('enroll.html') + '" href="enroll.html">Enroll &amp; Refer</a>'
  +       '<div class="nav-sep"></div>'
  +       '<button class="nav-login" id="loginBtn">Login</button>'
  +       '<a class="nav-call" href="tel:+917042732092">Call Us</a>'
  +     '</div>'
  +     '<button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu"><i class="ti ti-menu-2"></i></button>'
  +   '</div>'
  +   '<div class="mobile-nav" id="mobileNav">'
  +     '<a class="mobile-nav-a" href="index.html">Home</a>'
  +     '<a class="mobile-nav-a" href="courses.html">Courses</a>'
  +     '<a class="mobile-nav-a" href="testimonials.html">Testimonials</a>'
  +     '<button class="mobile-nav-a mobile-free-btn" id="mobileFreeResBtn">' + mobileFreeResBtnLabel + ' <i class="ti ti-chevron-down" id="mobileFreeIcon" style="font-size:12px;transition:.2s;margin-left:auto"></i></button>'
  +     '<div class="mobile-free-sub" id="mobileFreeMenu">' + mobileFreeMenuItems + '</div>'
  +     '<a class="mobile-nav-a" href="college-collab.html">College Collab</a>'
  +     '<a class="mobile-nav-a" href="enroll.html">Enroll &amp; Refer</a>'
  +     '<div class="mobile-nav-btns">'
  +       '<button class="nav-login" id="loginBtnMobile" style="flex:1">Login</button>'
  +       '<a class="nav-call" href="tel:+917042732092" style="flex:1;text-align:center">Call Us</a>'
  +     '</div>'
  +   '</div>'
  + '</nav>';

  function mount() {
    // 1) inject CSS once
    if (!document.getElementById('siteNavCss')) {
      var st = document.createElement('style');
      st.id = 'siteNavCss';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    // 2) remove the page's existing top nav (first <nav>) + its mobile menu, if any
    if (!document.getElementById('siteNav')) {
      var oldNav = document.querySelector('nav');
      if (oldNav) {
        // also drop an adjacent old mobile-nav that lived outside the nav
        var sib = oldNav.nextElementSibling;
        oldNav.parentNode.removeChild(oldNav);
        if (sib && sib.classList && sib.classList.contains('mobile-nav')) {
          sib.parentNode.removeChild(sib);
        }
      }
      // 3) insert canonical nav at top of body
      document.body.insertAdjacentHTML('afterbegin', NAV);
    }
    wire();
  }

  function wire() {
    var burger = document.getElementById('mobileMenuBtn');
    var mnav = document.getElementById('mobileNav');
    if (burger && mnav) burger.addEventListener('click', function () { mnav.classList.toggle('open'); });

    var mfBtn = document.getElementById('mobileFreeResBtn');
    var mfMenu = document.getElementById('mobileFreeMenu');
    var mfIcon = document.getElementById('mobileFreeIcon');
    if (mfBtn && mfMenu) mfBtn.addEventListener('click', function () {
      var open = mfMenu.classList.toggle('open');
      if (mfIcon) mfIcon.style.transform = open ? 'rotate(180deg)' : '';
    });

    // Fallback login wiring (nav-auth.js will override / show profile if present)
    ['loginBtn', 'loginBtnMobile'].forEach(function (id) {
      var b = document.getElementById(id);
      if (b && !b.dataset.navAuth) b.addEventListener('click', function () { window.location.href = 'login.html'; });
    });
  }

  // Run before nav-auth.js's DOMContentLoaded handler (this script is included first)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();

