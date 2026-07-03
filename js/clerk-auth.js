/* ============================================================
   CLERK AUTH — wires real sign-in/sign-up into the existing student
   dashboard. Reuses enterDashboard() / ensureData() / showDashboard() /
   restoreSession() from js/form.js as-is, so the dashboard itself looks
   and works exactly the same as before — the only thing that changed is
   WHO can get in (a real, verified email now, instead of any email typed
   into a form).

   (The old "try the demo" buttons have been removed from login.html now
   that real sign-in is live — restoreSession()/demoLogin() are kept in
   js/form.js only as a harmless fallback if Clerk fails to load.)
============================================================ */
(async function () {
  const loadingEl = document.getElementById('clerk-auth-loading');
  const mountEl = document.getElementById('clerk-auth');

  // The Clerk <script> tag loads with `async`, so it can genuinely still be
  // mid-download when this file runs — window.Clerk isn't defined the
  // instant the page starts executing scripts. Poll for a few seconds
  // before giving up, instead of failing immediately.
  async function waitForClerk(timeoutMs) {
    const start = Date.now();
    while (!window.Clerk) {
      if (Date.now() - start > timeoutMs) return false;
      await new Promise(r => setTimeout(r, 100));
    }
    return true;
  }

  const clerkArrived = await waitForClerk(8000);
  if (!clerkArrived) {
    // Script genuinely failed to load (offline, ad-blocker, slow network,
    // etc.) — fall back to the old local/demo session flow so the page
    // still works.
    if (loadingEl) loadingEl.style.display = 'none';
    if (mountEl) {
      mountEl.innerHTML = '<div style="text-align:center;padding:16px 12px;color:#DC2626;font-size:13px">Sign-in is temporarily unavailable — please refresh the page and try again.</div>';
    }
    if (typeof restoreSession === 'function') restoreSession();
    return;
  }

  try {
    await Clerk.load();
  } catch (e) {
    if (loadingEl) loadingEl.style.display = 'none';
    if (mountEl) mountEl.innerHTML = '<div style="text-align:center;padding:16px 12px;color:#DC2626;font-size:13px">Sign-in is temporarily unavailable — please refresh the page and try again.</div>';
    if (typeof restoreSession === 'function') restoreSession();
    return;
  }

  if (loadingEl) loadingEl.style.display = 'none';

  const emailOf = user => (user && user.primaryEmailAddress) ? user.primaryEmailAddress.emailAddress : null;

  if (Clerk.user) {
    // Already signed in (real Clerk session persists across visits) —
    // skip the form entirely and go straight to the dashboard.
    const email = emailOf(Clerk.user);
    if (email) {
      setLoading(true);
      await ensureData(true);
      setLoading(false);
      enterDashboardOrWelcome(email.trim().toLowerCase(), Clerk.user.fullName);
      return;
    }
  } else if (typeof restoreSession === 'function') {
    // Not signed in via Clerk — harmless no-op now that demo buttons are
    // gone, kept only so nothing breaks if an old localStorage session
    // happens to still be sitting in someone's browser.
    restoreSession();
  }

  if (mountEl) {
    Clerk.mountSignIn(mountEl, {
      afterSignInUrl: window.location.href,
      afterSignUpUrl: window.location.href,
      appearance: {
        variables: { colorPrimary: '#FF8B02', colorText: '#111114', borderRadius: '10px' }
      }
    });
  }

  Clerk.addListener(({ user }) => {
    if (!user || currentUser) return;
    const email = emailOf(user);
    if (!email) return;
    setLoading(true);
    ensureData(true).then(() => {
      setLoading(false);
      enterDashboardOrWelcome(email.trim().toLowerCase(), user.fullName);
    });
  });
})();
