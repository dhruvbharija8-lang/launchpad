/* ============================================================
   MBA PARTNER — STANDALONE CHATBOT LOGIC
   chatbot.js
============================================================ */

/* ── KNOWLEDGE BASE ─────────────────────────────────────── */
const KB = {
  about: {
    keywords: ['what is', 'about', 'who are you', 'tell me', 'mba partner', 'explain', 'overview', 'initiative'],
    answer: `MBA Partner is an initiative by alumni of old IIMs (IIM A, B, C and more). We help MBA students land placements at top companies through:\n\n• Live Projects Across Domains (real CV points)\n• Case Competition Mentorship (AIR 1 mentor)\n• Placements Bootcamp (mock PIs, GDs)\n• Domain coaching across Finance, Consulting, Marketing, HR & more\n\nWe've mentored 5,000+ students with a 9.6/10 rating and 98.7% placed in target domain.`
  },
  courses: {
    keywords: ['course', 'program', 'programme', 'offer', 'service', 'what do you', 'enroll', 'join', 'bootcamp', 'project', 'case', 'certification', 'excel', 'power bi'],
    answer: `Here are our programs:\n\n🏆 <b>Flagship Bundle</b> — ₹13,999 (Best value)\nBootcamp + Live Project + Case Competitions\n\n🎯 <b>Placement Bootcamp</b> — ₹7,499\nCV building, mock PIs, GDs & domain sessions\n\n💼 <b>Live Consulting Project</b> — from ₹4,000\n1–2 month real project with Prodmark Consultants\n\n🏅 <b>Case Competitions</b> — ₹3,499\n30+ winning PPTs, AIR 1 mentor, frameworks\n\n📊 <b>Certifications</b> — from ₹1,199\nAdvanced Excel, Power BI\n\nCombo packs: Bootcamp + Case (₹9,499), Bootcamp + Live Project (₹11,499) and more.`
  },
  pricing: {
    keywords: ['price', 'cost', 'fee', 'how much', 'paid', 'payment', 'cheap', 'afford', 'expensive', '₹', 'rupee', 'money'],
    answer: `Our program pricing:\n\n• Flagship Bundle (all-in-one): <b>₹13,999</b>\n• Placement Bootcamp Master: <b>₹7,499</b>\n• Placement Bootcamp Mini: <b>₹5,499</b>\n• Live Project (1 domain): <b>₹4,000</b>\n• Live Project (2 domains): <b>₹7,500</b>\n• Case Competitions: <b>₹3,499</b>\n• Bootcamp + Case combo: <b>₹9,499</b>\n• Bootcamp + Live Project: <b>₹11,499</b>\n• Advanced Excel Cert: <b>₹1,199</b>\n• Power BI Cert: <b>₹1,499</b>\n\nAll one-time payments, lifetime access. Call us at +91 70427 32092 for any queries.`
  },
  mentors: {
    keywords: ['mentor', 'who teach', 'instructor', 'faculty', 'iim', 'xlri', 'fms', 'alumni', 'trainer'],
    answer: `Our mentors are Top 1% alumni from India's best B-schools:\n\n🎓 IIM Ahmedabad, Bangalore, Calcutta, Lucknow, Indore, Mumbai\n🎓 XLRI Jamshedpur\n🎓 FMS Delhi\n\n90% of our mentors were once our own students — they know exactly what the journey feels like from both sides. 25+ mentors across Consulting, Finance, Marketing, HR and Operations.\n\nOur Case Competition mentor is an <b>AIR 1</b> winner with 30+ winning decks!`
  },
  results: {
    keywords: ['result', 'placement', 'placed', 'stat', 'success', 'rating', 'review', 'outcome', 'student', 'company', 'recruit', 'hired', 'offer', 'amazon', 'bcg', 'accenture', 'kearney'],
    answer: `Our students have landed offers at:\n\n🏢 MBB (McKinsey, BCG, Bain)\n🏢 Amazon, Accenture, Kearney\n🏢 Nomura, Bank of America, Kotak\n🏢 TAS, Deloitte, KPMG, American Express\n🏢 Pine Labs, PhonePe, Swiggy and many more!\n\n📊 By the numbers:\n• 5,000+ students mentored\n• 98.7% placed in target domain\n• 9.6/10 avg. rating (700+ reviews)\n• 40+ campuses reached\n• 500+ IIM calls secured`
  },
  cat: {
    keywords: ['cat', 'omet', 'xat', 'snap', 'gdpi', 'gd pi', 'wat', 'sop', 'percentile', 'aspirant', 'entrance', 'exam', 'preparation', 'prep'],
    answer: `For CAT & OMETs aspirants, we offer:\n\n📚 <b>Conceptual Clarity</b> — Quant, DILR & VARC by 99+ percentilers\n📝 <b>Mock Tests & Analysis</b> — CAT-condition mocks + 1-on-1 review\n🏛️ <b>Profile Building</b> — Certifications & projects for IIM applications\n🎤 <b>GDPI & WAT Bootcamp</b> — Mock PIs with IIM alumni panels, GD practice, SOP frameworks\n\nWe've helped 500+ students secure IIM calls!\n\nCheck out our <a href="cat-portal.html">CAT Prep Portal</a> and <a href="cat-predictor.html">College Predictor</a> — both free.`
  },
  free: {
    keywords: ['free', 'resource', 'compendium', 'sample cv', 'youtube', 'masterclass', 'download', 'material', 'watch'],
    answer: `We have plenty of free resources:\n\n📖 <b>Case Competition Compendiums</b>\n30+ winning PPTs and frameworks by AIR 1 mentors\n\n📄 <b>Sample CVs from Top B-Schools</b>\nReal CVs of students placed at Amazon, Accenture, Kearney & more\n\n🎥 <b>Free YouTube Masterclasses</b>\n• B-School Comparison & CV Skeleton\n• MBA Game Plan\n• HR Contacts (Demo)\n\n🌐 <b>Free Tools</b>\nCAT Prep Portal · College Predictor · Exam Predictor\n\nAll completely free — no sign-up needed!`
  },
  community: {
    keywords: ['community', 'whatsapp', 'telegram', 'group', 'network', 'peer', 'connect', 'social'],
    answer: `Join our 5,000+ student community:\n\n💬 <b>WhatsApp Community</b>\nLive placement intel, peer support & announcements\n→ <a href="https://chat.whatsapp.com/EdyvGJbQoV9Jj6eC0slSx9" target="_blank">Join WhatsApp Group</a>\n\n📢 <b>Telegram Channel</b>\nAnnouncements, resources & batch updates\n→ <a href="https://t.me/+IrnzgXdUKqsyOTZl" target="_blank">Join Telegram Channel</a>\n\nBoth are free to join and actively moderated by mentors.`
  },
  start: {
    keywords: ['start', 'begin', 'enroll', 'sign up', 'register', 'how to', 'get started', 'next step', 'join now', 'buy'],
    answer: `Getting started is simple:\n\n1️⃣ Browse our courses at <a href="courses.html">Courses page</a>\n2️⃣ Pick the program that fits your goals\n3️⃣ Enroll online — one-time payment, lifetime access\n4️⃣ Our team onboards you within 24 hours\n\nNot sure which to pick? Call <b>+91 70427 32092</b> (Mon–Sat, 9 AM–8 PM) and a mentor will guide you personally.`
  },
  contact: {
    keywords: ['contact', 'reach', 'call', 'email', 'phone', 'talk', 'human', 'support', 'help', 'bharat', 'number'],
    answer: null  // triggers the contact card UI
  },
  college: {
    keywords: ['college', 'campus', 'university', 'tie-up', 'collaboration', 'b-school', 'nmims', 'mdi', 'sibm', 'iift'],
    answer: `MBA Partner has active tie-ups with 40+ top B-schools:\n\nIIM A · IIM B · IIM C · IIM L · IIM I · XLRI · FMS · MDI · NMIMS · JBIMS · SPJIMR · IIFT · SIBM · IMT · BITSOM · GLIM and more.\n\nWant to bring MBA Partner to your campus? Call <b>+91 70427 32092</b> or email bharat.kapoor@prodmarkconsulting.in.`
  }
};

/* ── QUICK REPLIES ───────────────────────────────────────── */
const QUICK_REPLIES = [
  { label: '🎓 About MBA Partner', key: 'about'    },
  { label: '📚 Our Programs',      key: 'courses'  },
  { label: '💰 Pricing',           key: 'pricing'  },
  { label: '🏆 Mentors',           key: 'mentors'  },
  { label: '📊 Placement Results', key: 'results'  },
  { label: '🎯 CAT / GDPI Prep',   key: 'cat'      },
  { label: '🎁 Free Resources',    key: 'free'     },
  { label: '🚀 Get Started',       key: 'start'    },
  { label: '📞 Contact Us',        key: 'contact'  },
];

const WELCOME  = `Hi there! 👋 I'm the <b>MBA Partner AI assistant</b>.\n\nI can help you with programs, pricing, mentors, placement results, CAT prep and more. What would you like to know?`;
const FALLBACK = `I didn't quite catch that! Try one of the quick questions below, or reach out to us directly:\n\n📞 <b>+91 70427 32092</b>\n📧 bharat.kapoor@prodmarkconsulting.in`;

/* ── KEYWORD MATCHER ─────────────────────────────────────── */
function matchResponse(text) {
  const t = text.toLowerCase();
  let bestKey = null, bestScore = 0;
  for (const [key, entry] of Object.entries(KB)) {
    const score = entry.keywords.filter(kw => t.includes(kw)).length;
    if (score > bestScore) { bestScore = score; bestKey = key; }
  }
  return bestScore > 0 ? KB[bestKey] : null;
}

/* ── DOM REFS ────────────────────────────────────────────── */
const chatBody = document.getElementById('chatBody');
let quickRepliesEl = null;

/* ── HELPERS ─────────────────────────────────────────────── */
function scrollBottom() {
  setTimeout(() => { chatBody.scrollTop = chatBody.scrollHeight; }, 50);
}

function addBotMessage(html) {
  const msg = document.createElement('div');
  msg.className = 'msg bot';
  msg.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="bubble">${html.replace(/\n/g, '<br>')}</div>
  `;
  chatBody.appendChild(msg);
  scrollBottom();
}

function addUserMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'msg user';
  msg.innerHTML = `<div class="bubble">${text}</div>`;
  chatBody.appendChild(msg);
  scrollBottom();
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'typing';
  el.id = 'typing';
  el.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="typing-dots">
      <span></span><span></span><span></span>
    </div>
  `;
  chatBody.appendChild(el);
  scrollBottom();
}

function removeTyping() {
  const el = document.getElementById('typing');
  if (el) el.remove();
}

function showContactCard() {
  const card = document.createElement('div');
  card.className = 'contact-card';
  card.innerHTML = `
    <h3>We'd love to hear from you!</h3>
    <p>Drop us a message and a mentor will get back within 24 hours.</p>
    <button class="contact-btn" onclick="openModal()">📬 Send a Message</button>
    <div class="contact-details">
      <a href="tel:+917042732092">📞 +91 70427 32092 (Mon–Sat, 9–8 PM)</a>
      <a href="mailto:bharat.kapoor@prodmarkconsulting.in">📧 bharat.kapoor@prodmarkconsulting.in</a>
      <a href="https://chat.whatsapp.com/EdyvGJbQoV9Jj6eC0slSx9" target="_blank">💬 Join WhatsApp Community</a>
      <a href="https://t.me/+IrnzgXdUKqsyOTZl" target="_blank">📢 Join Telegram Channel</a>
    </div>
  `;
  chatBody.appendChild(card);
  scrollBottom();
}

function showQuickReplies() {
  if (quickRepliesEl) return;
  quickRepliesEl = document.createElement('div');
  quickRepliesEl.className = 'quick-replies';

  QUICK_REPLIES.forEach(qr => {
    const btn = document.createElement('button');
    btn.className = 'qr-btn';
    btn.textContent = qr.label;
    btn.onclick = () => handleQuickReply(qr);
    quickRepliesEl.appendChild(btn);
  });

  chatBody.appendChild(quickRepliesEl);
  scrollBottom();
}

function disableQuickReplies() {
  if (quickRepliesEl) {
    quickRepliesEl.querySelectorAll('button').forEach(b => b.disabled = true);
  }
}

function offerMoreHelp() {
  setTimeout(() => {
    addBotMessage('Anything else I can help with? 😊');
    quickRepliesEl = null;
    showQuickReplies();
  }, 600);
}

/* ── EVENT HANDLERS ──────────────────────────────────────── */
function handleQuickReply(qr) {
  disableQuickReplies();
  addUserMessage(qr.label);
  showTyping();

  setTimeout(() => {
    removeTyping();

    if (qr.key === 'contact' || KB[qr.key].answer === null) {
      addBotMessage("Of course! Here's how you can reach us 👇");
      setTimeout(() => {
        showContactCard();
        offerMoreHelp();
      }, 300);
    } else {
      addBotMessage(KB[qr.key].answer);
      offerMoreHelp();
    }
  }, 800 + Math.random() * 400);
}

function sendUserMessage() {
  const input = document.getElementById('chatInput');
  const text  = input.value.trim();
  if (!text) return;
  input.value = '';

  disableQuickReplies();
  addUserMessage(text);
  showTyping();

  setTimeout(() => {
    removeTyping();
    const match = matchResponse(text);

    if (match && match.answer === null) {
      // Contact intent detected
      addBotMessage("Of course! Here's how you can reach us 👇");
      setTimeout(() => { showContactCard(); offerMoreHelp(); }, 300);
    } else if (match) {
      addBotMessage(match.answer);
      offerMoreHelp();
    } else {
      addBotMessage(FALLBACK);
      offerMoreHelp();
    }
  }, 900 + Math.random() * 400);
}

/* ── MODAL ───────────────────────────────────────────────── */
function openModal() {
  document.getElementById('contactModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('contactModal').style.display = 'none';
}

function closeModalOutside(e) {
  if (e.target.id === 'contactModal') closeModal();
}

function submitContact() {
  const name  = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const phone = document.getElementById('phoneInput').value.trim();
  const msg   = document.getElementById('msgInput').value.trim();

  if (!name || !email) {
    alert('Please fill in your name and email.');
    return;
  }

  // ── Replace this block with a real fetch() to your backend or Formspree ──
  document.getElementById('modalContent').innerHTML = `
    <div class="success-msg">
      <div class="check">✅</div>
      <h3>Message Sent!</h3>
      <p>Thanks, <strong>${name}</strong>! A mentor will reach out at <strong>${email}</strong> within 24 hours.</p>
    </div>
  `;
  setTimeout(closeModal, 3000);
}

/* ── INIT ────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  showTyping();
  setTimeout(() => {
    removeTyping();
    addBotMessage(WELCOME);
    setTimeout(showQuickReplies, 400);
  }, 1000);
});
