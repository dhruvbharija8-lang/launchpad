// Ticker
const items = ['9.6/10 Avg. Rating','5,000+ Students Mentored','98.7% Domain Placement Rate','IIM · XLRI · FMS Mentors','30+ Winning Case PPTs','Real Consulting Projects · Prodmark','Group Offer — 30% Off','Free Compendiums & Sample CVs'];
const inner = document.getElementById('brTicker');
const html = items.map(t => `<span class="br-ticker-item">${t}<span class="br-ticker-dot"></span></span>`).join('');
inner.innerHTML = html + html;

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Active nav highlight
const sections = ['programs','how','mentors','placements','testimonials','pricing','contact'];
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.br-nav-a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#fff' : '';
    a.style.background = a.getAttribute('href') === '#' + current ? 'rgba(255,255,255,.1)' : '';
  });
});
