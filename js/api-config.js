/* ============================================================
   MBA PARTNER — ADMIN API CONFIG
   ------------------------------------------------------------
   Points the site at the admin-server backend (see /admin-server
   and ADMIN-GUIDE.md).

   RECOMMENDED SETUP (single host, no Netlify): admin-server/server.js
   now serves the WHOLE website itself (index.html, courses.html, css/,
   js/, images/, etc.) as well as the admin dashboard and the API — all
   from one Node app, one URL, one deploy. In this setup:
     - Locally: open http://localhost:4000/index.html (not file://
       and not a separate Live Server), run `node server.js` in
       admin-server/.
     - Deployed: deploy admin-server/ to a Node host (Render/Railway/
       Fly.io/a VPS). That single URL serves everything.
   Either way, leave MBA_API_BASE as '' — same-origin, no config needed.

   ALTERNATIVE (site on Netlify, backend elsewhere): only needed if you
   specifically want the static site on Netlify while admin-server runs
   on a separate host. Then set this to that host's URL, e.g.:
     const MBA_API_BASE = 'https://mba-partner-admin.onrender.com';
   and redeploy the site to Netlify after changing it.
============================================================ */
const MBA_API_BASE = 'https://launchpad-07.onrender.com';
