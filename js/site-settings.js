/* ============================================================
   MBA PARTNER — LIVE HOMEPAGE STATS
   ------------------------------------------------------------
   Fills in every element marked data-stat="..." with the value
   the admin set in the dashboard's "Homepage Stats" section
   (avg. rating, students mentored, placement rate, etc).

   If the admin-server API isn't reachable (not deployed yet,
   offline, etc.) this fails silently and the static numbers
   already written into the HTML stay exactly as they are — the
   site never breaks because of this.
============================================================ */
(function () {
  const API_BASE = (typeof MBA_API_BASE !== 'undefined') ? MBA_API_BASE : '';

  function applyStats(s) {
    const map = {
      rating: s.heroRating,
      ratingScale: s.heroRatingScale,
      ratingFull: [s.heroRating, s.heroRatingScale].filter(Boolean).join(''),
      students: s.studentsMentored,
      placementRate: s.placementRate,
      reviews: s.reviewsCount,
      campuses: s.campusesReached,
      iimCalls: s.iimCallsSecured
    };
    document.querySelectorAll('[data-stat]').forEach(el => {
      const key = el.getAttribute('data-stat');
      const val = map[key];
      if (val != null && val !== '') el.textContent = val;
    });
  }

  /* ------------------------------------------------------------
     SITE-WIDE LINK REDIRECTS
     Every WhatsApp/Telegram/social/contact button across the site
     points to one of a handful of real destinations, repeated in
     many places. Instead of hardcoding each one, every <a> that
     currently has one of these exact hrefs gets rewritten to
     whatever the admin has set — so changing it once in the
     dashboard updates every button on every page.
     If the admin API is unreachable, the hrefs already written
     into the HTML stay exactly as they are (site never breaks).
  ------------------------------------------------------------ */
  function applyLinks(s) {
    const catWa = s.catWhatsappCommunity || s.whatsappCommunity;
    const catTg = s.catTelegramCommunity || s.telegramCommunity;
    // Ordered so more specific hrefs (e.g. ?open=instagram) are matched
    // before the generic hub URL they share a domain with.
    const rules = [
      { hrefs: ['https://documents1.netlify.app/?open=instagram'], value: s.instagramUrl },
      { hrefs: ['https://documents1.netlify.app/?open=linkedin'], value: s.linkedinUrl },
      { hrefs: ['https://documents1.netlify.app/?open=youtube'], value: s.youtubeUrl },
      { hrefs: ['https://documents1.netlify.app/'], value: s.freeResourcesHub },
      // CAT-only pages (e.g. cat-enroll.html's floating rail) hardcode the
      // CAT community link directly, not the generic one — match it here so
      // an admin edit to "CAT/OMETs WhatsApp Community URL" still updates it.
      { hrefs: ['https://chat.whatsapp.com/DnSsAPGR7FzJsvguk0LeX2?s=cl&p=a&ilr=2'], value: catWa },
      { hrefs: ['https://chat.whatsapp.com/EdyvGJbQoV9Jj6eC0slSx9'], value: s.whatsappCommunity },
      { hrefs: ['https://t.me/+IrnzgXdUKqsyOTZl'], value: s.telegramCommunity },
      { hrefs: ['https://www.mbapartner.in/testimonials'], value: s.testimonialsExternalUrl },
      { hrefs: ['tel:+917042732092'], value: s.phone ? 'tel:' + s.phone.replace(/[^\d+]/g, '') : null },
      { hrefs: ['mailto:bharat.kapoor@prodmarkconsulting.in'], value: s.email ? 'mailto:' + s.email : null }
    ];
    // The CAT/OMETs hero has its own (currently placeholder "#") community
    // links — only rewrite those specific ones, matched via their known
    // surrounding context class, not the generic "#" (which is used all
    // over the page for unrelated buttons).
    document.querySelectorAll('.persona-view#pview-cat a.btn-ghost[href="#"], .persona-view#pview-cat a.social-chip[href="#"]').forEach(a => {
      const isWa = a.innerHTML.indexOf('ti-brand-whatsapp') !== -1;
      const isTg = a.innerHTML.indexOf('ti-brand-telegram') !== -1;
      if (isWa && catWa) a.setAttribute('href', catWa);
      if (isTg && catTg) a.setAttribute('href', catTg);
    });
    // login.html's "Enrolled Students Group" sidebar button — used to have
    // its URL hardcoded in the page's onclick attribute with no admin
    // control at all. Overriding .onclick here (rather than trying to
    // rewrite the inline attribute string) is cleaner and avoids any
    // quoting issues with the URL.
    const waClosedBtn = document.getElementById('waClosedGroupBtn');
    if (waClosedBtn && s.enrolledWhatsappGroup) {
      waClosedBtn.onclick = () => window.open(s.enrolledWhatsappGroup, '_blank');
    }
    if (!rules.some(r => r.value)) return;
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      for (const rule of rules) {
        if (rule.value && rule.hrefs.indexOf(href) !== -1) { a.setAttribute('href', rule.value); break; }
      }
    });
  }

  function init() {
    fetch(API_BASE + '/api/public/settings')
      .then(r => (r.ok ? r.json() : null))
      .then(s => { if (s) { applyStats(s); applyLinks(s); } })
      .catch(() => { /* keep the static fallback numbers/links already in the HTML */ });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
