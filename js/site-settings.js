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

  function init() {
    fetch(API_BASE + '/api/public/settings')
      .then(r => (r.ok ? r.json() : null))
      .then(s => { if (s) applyStats(s); })
      .catch(() => { /* keep the static fallback numbers already in the HTML */ });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
