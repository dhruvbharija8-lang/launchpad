/* ============================================================
   MBA PARTNER — AI CHAT WIDGET  (JS only)
   chatbot-widget.js
   ------------------------------------------------------------
   Styles → css/chatbot-widget.css
   HTML   → injected dynamically below
   Needs  → <link rel="stylesheet" href="css/chatbot-widget.css">
             already in <head> before this script runs.
============================================================ */

(function () {
  'use strict';

  /* ── KNOWLEDGE BASE ──────────────────────────────────────── */
  const KB = {
    about: {
      keywords: ['what is', 'about', 'who are you', 'tell me', 'mba partner', 'explain', 'overview', 'initiative'],
      answer: `MBA Partner is an initiative by alumni of old IIMs (IIM A, B, C and more). We help MBA students land placements at top companies through:\n\n• Live Projects Across Domains (real CV points)\n• Case Competition Mentorship (AIR 1 mentor)\n• Placements Bootcamp (mock PIs, GDs)\n• Domain-specific coaching across Finance, Consulting, Marketing, HR & more\n\nWe've mentored 5,000+ students with a 9.6/10 average rating and 98.7% placement in target domain.`
    },
    courses: {
      keywords: ['course', 'program', 'programme', 'offer', 'service', 'what do you', 'enroll', 'join', 'bootcamp', 'project', 'case', 'certification', 'excel', 'power bi'],
      answer: `Here are our programs:\n\n🏆 <b>Flagship Bundle</b> — ₹13,999 (Best value)\nBootcamp + Live Project + Case Competitions\n\n🎯 <b>Placement Bootcamp</b> — ₹7,499\nCV building, mock PIs, GDs & domain sessions\n\n💼 <b>Live Consulting Project</b> — from ₹4,000\n1–2 month real project with Prodmark Consultants\n\n🏅 <b>Case Competitions</b> — ₹3,499\n30+ winning PPTs, AIR 1 mentor, frameworks\n\n📊 <b>Certifications</b> — from ₹1,199\nAdvanced Excel, Power BI\n\nCombo packs also available — Bootcamp + Case (₹9,499), Bootcamp + Live Project (₹11,499) and more.`
    },
    pricing: {
      keywords: ['price', 'cost', 'fee', 'how much', 'paid', 'payment', 'cheap', 'afford', 'expensive', '₹', 'rupee', 'money'],
      answer: `Our program pricing:\n\n• Flagship Bundle (all-in-one): <b>₹13,999</b>\n• Placement Bootcamp Master: <b>₹7,499</b>\n• Placement Bootcamp Mini: <b>₹5,499</b>\n• Live Project (1 domain): <b>₹4,000</b>\n• Live Project (2 domains): <b>₹7,500</b>\n• Case Competitions: <b>₹3,499</b>\n• Bootcamp + Case combo: <b>₹9,499</b>\n• Bootcamp + Live Project: <b>₹11,499</b>\n• Advanced Excel Cert: <b>₹1,199</b>\n• Power BI Cert: <b>₹1,499</b>\n\nAll one-time payments with lifetime access. Call us at +91 70427 32092 for any queries.`
    },
    mentors: {
      keywords: ['mentor', 'who teach', 'instructor', 'faculty', 'iim', 'xlri', 'fms', 'alumni', 'trainer'],
      answer: `Our mentors are Top 1% alumni from India's best B-schools:\n\n🎓 IIM Ahmedabad, Bangalore, Calcutta, Lucknow, Indore, Mumbai\n🎓 XLRI Jamshedpur\n🎓 FMS Delhi\n\n90% of our mentors were once our own students — they know exactly what the journey feels like from both sides. We have 25+ mentors across Consulting, Finance, Marketing, HR and Operations.\n\nFun fact: our Case Competition mentor is an <b>AIR 1</b> winner with 30+ winning decks!`
    },
    results: {
      keywords: ['result', 'placement', 'placed', 'stat', 'success', 'rating', 'review', 'outcome', 'student', 'company', 'recruit', 'hired', 'offer', 'amazon', 'mckinsey', 'bcg', 'accenture', 'kearney'],
      answer: `Our students have landed offers at:\n\n🏢 MBB (McKinsey, BCG, Bain)\n🏢 Amazon, Accenture, Kearney\n🏢 Nomura, Bank of America, Kotak\n🏢 TAS, Deloitte, KPMG, American Express\n🏢 Pine Labs, PhonePe, Swiggy and many more!\n\n📊 By the numbers:\n• 5,000+ students mentored\n• 98.7% placed in target domain\n• 9.6/10 average rating (700+ reviews)\n• 40+ campuses reached\n• 500+ IIM calls secured (CAT students)`
    },
    cat: {
      keywords: ['cat', 'omet', 'xat', 'snap', 'gdpi', 'gd pi', 'wat', 'sop', 'percentile', 'aspirant', 'entrance', 'exam', 'mba exam', 'preparation', 'prep'],
      answer: `For CAT & OMETs aspirants, we offer:\n\n📚 <b>Conceptual Clarity</b> — Quant, DILR & VARC by 99+ percentilers\n📝 <b>Mock Tests & Analysis</b> — CAT-condition mocks + 1-on-1 review\n🏛️ <b>Profile Building</b> — Certifications & projects for IIM applications\n🎤 <b>GDPI & WAT Bootcamp</b> — Mock PIs with IIM alumni panels, GD practice, SOP frameworks\n\nWe've helped 500+ students secure IIM calls. Mentors are 99+ percentilers and IIM alumni.\n\nCheck out our <a href="cat-portal.html">CAT Prep Portal</a> and <a href="cat-predictor.html">College Predictor</a> — both free!`
    },
    free: {
      keywords: ['free', 'resource', 'compendium', 'sample cv', 'youtube', 'masterclass', 'download', 'material', 'watch'],
      answer: `We have plenty of free resources:\n\n📖 <b>Case Competition Compendiums</b>\n30+ winning PPTs and frameworks by AIR 1 mentors — free download\n\n📄 <b>Sample CVs from Top B-Schools</b>\nReal CVs of students placed at Amazon, Accenture, Kearney & more\n\n🎥 <b>Free YouTube Masterclasses</b>\n• B-School Comparison & CV Skeleton\n• MBA Game Plan\n• HR Contacts (Demo)\n\n🌐 <b>CAT Portal & Predictors</b>\nFree tools: CAT Prep Portal, College Predictor, Exam Predictor\n\nAll completely free — no sign-up needed for most resources!`
    },
    community: {
      keywords: ['community', 'whatsapp', 'telegram', 'group', 'network', 'peer', 'connect', 'social'],
      answer: `Join our 5,000+ student community:\n\n💬 <b>WhatsApp Community</b>\nLive placement intel, peer support & announcements\n→ <a href="https://chat.whatsapp.com/EdyvGJbQoV9Jj6eC0slSx9" target="_blank">Join WhatsApp Group</a>\n\n📢 <b>Telegram Channel</b>\nAnnouncements, resources & batch updates\n→ <a href="https://t.me/+IrnzgXdUKqsyOTZl" target="_blank">Join Telegram Channel</a>\n\nBoth are free to join and actively moderated by mentors.`
    },
    start: {
      keywords: ['start', 'begin', 'enroll', 'sign up', 'register', 'how to', 'get started', 'next step', 'join now', 'buy'],
      answer: `Getting started is simple:\n\n1️⃣ Browse our courses at <a href="courses.html">Courses page</a>\n2️⃣ Pick the program that fits your goals\n3️⃣ Enroll online (one-time payment, lifetime access)\n4️⃣ Our team will onboard you within 24 hours\n\nNot sure which program to pick? Call us at <b>+91 70427 32092</b> (Mon–Sat, 9 AM–8 PM) and a mentor will guide you personally.`
    },
    contact: {
      keywords: ['contact', 'reach', 'call', 'email', 'phone', 'talk', 'human', 'support', 'help', 'bharat', 'number'],
      answer: `Here's how to reach us:\n\n📞 <b>Phone / WhatsApp</b>\n+91 70427 32092 (Mon–Sat, 9 AM–8 PM IST)\n\n📧 <b>Email</b>\nbharat.kapoor@prodmarkconsulting.in\n\n💬 <b>WhatsApp Community</b>\n<a href="https://chat.whatsapp.com/EdyvGJbQoV9Jj6eC0slSx9" target="_blank">Join here</a>\n\n📢 <b>Telegram</b>\n<a href="https://t.me/+IrnzgXdUKqsyOTZl" target="_blank">Join here</a>\n\nFor college tie-ups or B2B enquiries, email or call us directly.`
    },
    college: {
      keywords: ['college', 'campus', 'university', 'tie-up', 'collaboration', 'partnership', 'b-school', 'nmims', 'mdi', 'sibm', 'iift'],
      answer: `MBA Partner has active tie-ups with 40+ top B-schools across India, including:\n\nIIM Ahmedabad · IIM Bangalore · IIM Calcutta · IIM Lucknow · IIM Indore · XLRI Jamshedpur · FMS Delhi · MDI Gurgaon · NMIMS Mumbai · JBIMS · SPJIMR · IIFT · SIBM · IMT Ghaziabad · BITSOM · GLIM Chennai and more.\n\nWant to bring MBA Partner to your campus? Call <b>+91 70427 32092</b> or email bharat.kapoor@prodmarkconsulting.in.`
    }
  };

  /* ── QUICK-REPLY BUTTONS ─────────────────────────────────── */
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

  const WELCOME  = `Hi there! 👋 I'm the <b>MBA Partner AI assistant</b>.\n\nI can answer questions about our programs, pricing, mentors, placement results, CAT prep and more. What would you like to know?`;
  const FALLBACK = `I didn't quite catch that — but I'm here to help! Try one of the quick questions below, or reach out directly:\n\n📞 <b>+91 70427 32092</b>\n📧 bharat.kapoor@prodmarkconsulting.in`;

  /* ── KEYWORD MATCHER ─────────────────────────────────────── */
  function matchResponse(text) {
    const t = text.toLowerCase();
    let bestKey = null, bestScore = 0;
    for (const [key, entry] of Object.entries(KB)) {
      const score = entry.keywords.filter(kw => t.includes(kw)).length;
      if (score > bestScore) { bestScore = score; bestKey = key; }
    }
    return bestScore > 0 ? KB[bestKey].answer : null;
  }

  /* ── HTML TEMPLATE ───────────────────────────────────────── */
  const WIDGET_HTML = `
    <!-- Notification bubble -->
    <div id="mbap-notif">👋 Hi! Have a question? Ask me!</div>

    <!-- Floating action button -->
    <button id="mbap-fab" aria-label="Chat with MBA Partner">
      <svg class="fab-open" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
      <svg class="fab-close" viewBox="0 0 24 24" style="display:none">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>

    <!-- Chat window -->
    <div id="mbap-window" role="dialog" aria-label="MBA Partner Chat">
      <div class="mbap-head">
        <div class="mbap-av">🤖</div>
        <div class="mbap-head-info">
          <h3>MBA Partner Assistant</h3>
          <p><span class="mbap-dot"></span> Online · typically replies instantly</p>
        </div>
        <button class="mbap-x" id="mbap-close-btn" aria-label="Close chat">×</button>
      </div>

      <div class="mbap-body" id="mbap-body"></div>

      <div class="mbap-foot">
        <input
          class="mbap-input"
          id="mbap-input"
          type="text"
          placeholder="Ask me anything…"
          autocomplete="off"
        />
        <button class="mbap-send" id="mbap-send" aria-label="Send message">
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  /* ── INIT ────────────────────────────────────────────────── */
  function init() {
    // Mount widget HTML into page
    const container = document.createElement('div');
    container.id = 'mbap-root';
    container.innerHTML = WIDGET_HTML;
    document.body.appendChild(container);

    /* Element refs */
    const fab    = document.getElementById('mbap-fab');
    const win    = document.getElementById('mbap-window');
    const body   = document.getElementById('mbap-body');
    const input  = document.getElementById('mbap-input');
    const notif  = document.getElementById('mbap-notif');

    /* State */
    let isOpen  = false;
    let qrEl    = null;
    let greeted = false;

    /* ── Helpers ── */
    function scrollDown() {
      setTimeout(() => { body.scrollTop = body.scrollHeight; }, 40);
    }

    function addBot(html) {
      const m = document.createElement('div');
      m.className = 'mbap-msg bot';
      m.innerHTML = `
        <div class="mbap-msg-av">🤖</div>
        <div class="mbap-bubble">${html.replace(/\n/g, '<br>')}</div>
      `;
      body.appendChild(m);
      scrollDown();
    }

    function addUser(text) {
      const m = document.createElement('div');
      m.className = 'mbap-msg user';
      m.innerHTML = `<div class="mbap-bubble">${text}</div>`;
      body.appendChild(m);
      scrollDown();
    }

    function showTyping() {
      const t = document.createElement('div');
      t.className = 'mbap-typing';
      t.id = 'mbap-typing';
      t.innerHTML = `
        <div class="mbap-msg-av">🤖</div>
        <div class="mbap-typing-dots">
          <span></span><span></span><span></span>
        </div>
      `;
      body.appendChild(t);
      scrollDown();
    }

    function removeTyping() {
      const t = document.getElementById('mbap-typing');
      if (t) t.remove();
    }

    function showQuickReplies() {
      if (qrEl) return;
      qrEl = document.createElement('div');
      qrEl.className = 'mbap-qrs';
      QUICK_REPLIES.forEach(qr => {
        const b = document.createElement('button');
        b.className = 'mbap-qr';
        b.textContent = qr.label;
        b.onclick = () => handleQR(qr);
        qrEl.appendChild(b);
      });
      body.appendChild(qrEl);
      scrollDown();
    }

    function disableQRs() {
      if (qrEl) qrEl.querySelectorAll('button').forEach(b => b.disabled = true);
    }

    /* ── Event handlers ── */
    function handleQR(qr) {
      disableQRs();
      addUser(qr.label);
      showTyping();
      setTimeout(() => {
        removeTyping();
        addBot(KB[qr.key].answer);
        offerMore();
      }, 800 + Math.random() * 400);
    }

    function offerMore() {
      setTimeout(() => {
        addBot('Anything else I can help with? 😊');
        qrEl = null;
        showQuickReplies();
      }, 500);
    }

    function handleInput() {
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      disableQRs();
      addUser(text);
      showTyping();
      setTimeout(() => {
        removeTyping();
        addBot(matchResponse(text) || FALLBACK);
        offerMore();
      }, 900 + Math.random() * 400);
    }

    function greet() {
      if (greeted) return;
      greeted = true;
      showTyping();
      setTimeout(() => {
        removeTyping();
        addBot(WELCOME);
        setTimeout(showQuickReplies, 350);
      }, 900);
    }

    function openChat() {
      isOpen = true;
      win.classList.add('open');
      fab.querySelector('.fab-open').style.display = 'none';
      fab.querySelector('.fab-close').style.display = '';
      if (notif && notif.parentNode) notif.remove();
      greet();
      setTimeout(() => input.focus(), 300);
    }

    function closeChat() {
      isOpen = false;
      win.classList.remove('open');
      fab.querySelector('.fab-open').style.display = '';
      fab.querySelector('.fab-close').style.display = 'none';
    }

    /* ── Wire up events ── */
    fab.addEventListener('click', () => isOpen ? closeChat() : openChat());
    document.getElementById('mbap-close-btn').addEventListener('click', closeChat);
    document.getElementById('mbap-send').addEventListener('click', handleInput);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(); });

    // Dismiss notification after 5 s
    if (notif) setTimeout(() => { if (notif.parentNode) notif.remove(); }, 5000);

    // Auto-open on first visit after 12 s
    try {
      if (!localStorage.getItem('mbapChatSeen')) {
        setTimeout(() => { if (!isOpen) openChat(); }, 12000);
        localStorage.setItem('mbapChatSeen', '1');
      }
    } catch (e) { /* localStorage blocked */ }
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
