/* ===== UTILITIES ===== */
const fmt = n => '₹' + Number(n).toLocaleString('en-IN');
const byId = id => COURSES.find(c => c.id === id);
const stars = r => { let h = ''; for (let i = 1; i <= 5; i++)h += `<i class="ti ${r >= i ? 'ti-star-filled' : (r >= i - .5 ? 'ti-star-half-filled' : 'ti-star')}"></i>`; return h; };

/* ===== DATA ===== */
const DOMAINS = [
  { key: 'finance', label: 'Finance' }, { key: 'consulting', label: 'Consulting' }, { key: 'hr', label: 'HR' },
  { key: 'product', label: 'Product Management' }, { key: 'marketing', label: 'Marketing' }, { key: 'operations', label: 'Operations' }
];
const CATS = [
  { key: 'combo', label: 'Combos' }, { key: 'bootcamp', label: 'Placement bootcamp' },
  { key: 'live', label: 'Live projects' }, { key: 'case', label: 'Case competitions' }, { key: 'cert', label: 'Certifications' }
];
const IMG = (id, w) => (id.startsWith('http') || id.startsWith('images/')) ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w || 800}&q=70`;
const COURSES = [
  { id: 'flagship-bundle', cat: 'combo', type: 'Flagship bundle', img: 'images/complete-placement-bundle.png', badge: 'Best value', rating: 4.9, students: 4120, level: 'All levels', hours: '40+ hrs', instr: 'Top B-School mentors · Prodmark', title: 'The Complete Placement Bundle', sub: 'Placement Bootcamp + a 2-month Live Project (Prodmark) + Case Competition prep — everything in one track.', tagline: 'From a recruiter-ready CV to live consulting experience and case-comp wins.', desc: 'Your complete placement track in one bundle. It combines our Placement Bootcamp (CV building, mock PIs & GDs and 20+ hours of domain prep), a 2-month Live Project under Prodmark Business Consultants Pvt Ltd, and Case Competition prep led by Unstop national toppers. You also get AI-platform access for profile assessment, CV preparation and mock PIs. This is not a typical course — you work under a real consulting company and finish with ATS-friendly CV points, a certificate, and case-competition firepower.', price: 13999, mrp: 14500, off: 'Save ₹501', feats: ['1:1 mentorship from Top B-School alumni', 'CV building + 7 mock PIs + 7 mock GDs', '20+ hours end-to-end domain prep', '2-month Live Project under Prodmark (5 ATS-friendly keywords + certificate)', '30+ national finalist & winning case PPTs', 'Canva Pro access (1 year)', 'AI platform — profile assessment, CV prep & mock PIs', '100+ HR contacts from Top B-Schools', 'Latest company- & profile-wise interview transcripts', 'Lifetime access to all materials'], curriculum: [{ t: 'Module 1: Profile & CV', s: 'CV building, ATS optimisation, psychometric & JD prep' }, { t: 'Module 2: Interview Mastery', s: 'Mock PIs, mock GDs and 20+ hrs of domain sessions' }, { t: 'Module 3: Live Project (Prodmark)', s: '8 hours of domain sessions + a real client project' }, { t: 'Module 4: Case Competitions', s: 'Frameworks from Unstop toppers (AIR 1, 6, 10, 15) + 30+ winning PPTs' }, { t: 'Module 5: Placement Finish', s: 'Interview transcripts, HR contacts, final prep' }], optionGroups: [{ id: 'domain', label: 'Choose your live project domain', type: 'single', required: true, options: DOMAINS }], compInfo: { cvSlots: '5 reviews', mockPIs: '7 PIs + 7 GDs', liveProject: '2 Months (Prodmark)', casePrep: '✓ (Unstop Toppers)', canva: '✓ (1 year)', certificate: '✓ (Prodmark & Case)' } },
  { id: 'placement-bootcamp', cat: 'bootcamp', type: 'Solo', img: 'images/placement-bootcamp.png', badge: 'Bestseller', rating: 4.8, students: 6240, level: 'All levels', hours: '20+ hrs', instr: 'Top B-School mentors', title: 'Placement Bootcamp', sub: 'Mentorship from Top B-School alumni — CV building, mock PIs & GDs and 20+ hours of domain prep.', tagline: 'Mentor-led prep to make you Day-1 ready.', desc: 'The cornerstone of placement success. Get 1:1 mentorship from Top B-School alumni with 24x7 availability, structured CV building, and mock PIs & GDs you can top up later. Includes 20+ hours of end-to-end domain preparation, the latest company-wise and profile-wise interview transcripts, full JD preparation and psychometric-assessment support, plus AI-platform access for profile assessment, CV prep and mock PIs. It delivers record-breaking results when combined with a Live Project, and unlocks contacts of 100+ HRs working in top companies who passed out of Top B-Schools.', price: 7499, mrp: 7999, off: null, feats: ['1:1 mentorship from Top B-School alumni (24x7)', 'Master: CV + 7 mock PIs + 7 mock GDs · Mini: CV + 5 + 5 (top-up available)', '20+ hours end-to-end domain prep', 'Latest company-wise & profile-wise interview transcripts', 'Full JD prep + psychometric-assessment support', 'AI platform — profile assessment, CV prep & mock PIs', '100+ HR contacts from Top B-Schools', 'Group of 2 → 20% off · 3+ → 30% off'], curriculum: [{ t: 'Module 1: CV Building', s: 'ATS-ready CV with mentor reviews' }, { t: 'Module 2: Mock PIs', s: 'Master: 7 · Mini: 5 — real panels with feedback' }, { t: 'Module 3: Mock GDs', s: 'Master: 7 · Mini: 5 — frameworks + current affairs' }, { t: 'Module 4: Domain Prep', s: '20+ hours end-to-end on your target domain' }, { t: 'Module 5: Interview Intel', s: 'Company/profile transcripts, JD & psychometric prep' }, { t: 'Module 6: HR Network', s: 'Contacts of 100+ HRs from Top B-Schools' }], optionGroups: [{ id: 'tier', label: 'Choose your plan', type: 'single', required: true, options: [{ key: 'master', label: 'Master', default: true, price: 7499, mrp: 7999, feats: ['1:1 mentorship by Top B-School mentors (24x7)', 'CV building + 7 mock PIs + 7 mock GDs (top-up available)', '20+ hours end-to-end domain prep', 'Interview transcripts + JD & psychometric prep', 'AI platform access + all materials'] }, { key: 'mini', label: 'Mini', price: 5499, mrp: 5999, feats: ['1:1 mentorship by Top B-School mentors (24x7)', 'CV building + 5 mock PIs + 5 mock GDs (top-up available)', '20+ hours end-to-end domain prep', 'Interview transcripts + JD & psychometric prep', 'AI platform access'] }] }], compInfo: { cvSlots: '5 slots (Master)<br>3 slots (Mini)', mockPIs: '7 PIs + 7 GDs (Master)<br>5 PIs + 5 GDs (Mini)', liveProject: '—', casePrep: '—', canva: '—', certificate: '✓' } },
  { id: 'bootcamp-case', cat: 'bootcamp', type: 'Combo', img: 'images/bootcamp-case.png', badge: null, rating: 4.7, students: 2110, level: 'Intermediate', hours: '12+ hrs', instr: 'Top B-School mentors · Unstop toppers', title: 'Bootcamp + Case Competitions', sub: 'Placement training plus case-comp mastery from Unstop toppers.', tagline: 'Land placements and win case competitions.', desc: 'Perfect for consulting-track students. This combo pairs our Placement Bootcamp (1:1 mentorship, CV building, mock PIs & GDs, 20+ hours of domain prep) with case-competition training from Unstop toppers (AIR 1, 6, 10, 15). Get 8 hours of detailed case sessions, 30+ national finalist and winning PPTs, Canva Pro for a year, AI-platform access, and 1:1 mentorship the moment you clear the Executive Summary round of any corporate competition.', price: 9499, mrp: 9999, off: '5% off', feats: ['1:1 mentorship from Top B-School alumni', 'CV building + 7 mock PIs + 7 mock GDs', '20+ hours domain prep', 'Sessions by Unstop toppers (AIR 1, 6, 10, 15)', '8 hours of detailed case-cracking sessions', '30+ national finalist & winning PPTs', 'Canva Pro (1 year)', 'AI platform — profile assessment, CV prep & mock PIs', '1:1 mentorship on clearing any Executive Summary round', 'Group of 2 → 30% off'], curriculum: [{ t: 'Phase 1: Bootcamp', s: 'CV, mock PIs & GDs, 20+ hrs domain prep' }, { t: 'Phase 2: Case Foundations', s: 'Market research to financial models — 8 hrs' }, { t: 'Phase 3: Winning Decks', s: '30+ national finalist & winning PPTs' }, { t: 'Phase 4: Mentorship', s: '1:1 on clearing Executive Summary rounds' }, { t: 'Phase 5: Compete & Convert', s: 'MSME competition CV point + placement prep' }], compInfo: { cvSlots: '5 slots', mockPIs: '7 PIs + 7 GDs', liveProject: '—', casePrep: '✓ (Unstop Toppers)', canva: '✓ (1 year)', certificate: '✓' } },
  { id: 'bootcamp-live', cat: 'bootcamp', type: 'Combo', img: 'images/bootcamp-live.png', badge: null, rating: 4.8, students: 1890, level: 'All levels', hours: '16+ hrs', instr: 'Top B-School mentors · Prodmark', title: 'Bootcamp + Live Project', sub: 'Real consulting experience paired with full placement training.', tagline: 'Work a real 2-month live project while preparing for placements.', desc: 'Combine rigorous placement preparation with hands-on consulting experience. Get 1:1 mentorship, CV building and mock PIs & GDs through our bootcamp, while working a 2-month Live Project under Prodmark Business Consultants Pvt Ltd — 8 hours of domain sessions plus a real client project. You finish with 5 ATS-friendly keywords and a Certificate of Completion, AI-platform access throughout, and the record-breaking results this combination is known for.', price: 11499, mrp: 11999, off: '4% off', feats: ['1:1 mentorship from Top B-School alumni', 'CV building + 7 mock PIs + 7 mock GDs', '20+ hours domain prep', '2-month Live Project under Prodmark', '8 hours of domain sessions + a real client project', '5 ATS-friendly keywords + Certificate of Completion', 'AI platform — profile assessment, CV prep & mock PIs', '100+ HR contacts from Top B-Schools', 'Record-breaking results (bootcamp + live project)', 'Lifetime materials access'], curriculum: [{ t: 'Module 1: Bootcamp Foundation', s: 'CV building, mock PIs & GDs, domain prep' }, { t: 'Module 2: Live Project Kickoff', s: '8 hours of domain sessions + client brief' }, { t: 'Module 3: Consulting Sprints', s: 'Research, analysis, recommendations (~2 hrs/day)' }, { t: 'Module 4: Deliverables', s: 'Presentations, reports and decks' }, { t: 'Module 5: Placement Finish', s: '5 ATS-friendly keywords + interview prep' }], optionGroups: [{ id: 'domain', label: 'Choose your live project domain', type: 'single', required: true, options: DOMAINS }], compInfo: { cvSlots: '5 slots', mockPIs: '7 PIs + 7 GDs', liveProject: '2 Months (Prodmark)', casePrep: '—', canva: '—', certificate: '✓ (Prodmark)' } },
  { id: 'live-1', cat: 'live', type: 'Internship', img: 'images/live-project-1-month.png', badge: null, rating: 4.6, students: 3320, level: 'Beginner', hours: '4+ hrs', instr: 'Prodmark Business Consultants', title: 'Live Project — 1 Month', sub: 'A 1-month real project under Prodmark — 4 hours of domain sessions and 2 ATS-friendly CV points.', tagline: 'Work under a real consulting company — this is not a course.', desc: 'Launch real consulting experience in a single month, under Prodmark Business Consultants Pvt Ltd. You get 4 hours of sessions on the ins and outs of your chosen domain, followed by a project assignment covering the top 4 focus areas of that domain. On completion you earn 2 ATS-friendly CV points and a Certificate of Completion, plus AI-platform access for profile assessment, CV preparation and mock PIs. It is fully online — about 2 hours a day — and dates are flexible: the certificate is not withheld even if every area is not finished, provided you submit within 3 months.', price: 4000, mrp: 4500, off: '11% off', feats: ['Under Prodmark Business Consultants Pvt Ltd', '4 hours of domain sessions + a real project', 'Top 4 focus areas of your chosen domain', '2 ATS-friendly CV points + Certificate of Completion', 'AI platform — profile assessment, CV prep & mock PIs', 'Online — about 2 hours/day, finish in 1 month', 'Flexible dates (submit within 3 months)', 'Group of 2 → 30% off'], curriculum: [{ t: 'Step 1: Domain Sessions', s: '4 hours on the ins & outs of your domain' }, { t: 'Step 2: Project Assignment', s: 'Top 4 focus areas (e.g., Finance: COGS, EBITDA, Balance Sheet, Financial Analysis)' }, { t: 'Step 3: Execution', s: 'About 2 hrs/day under Prodmark mentors' }, { t: 'Step 4: Submission & Certificate', s: '2 ATS-friendly CV points + Certificate of Completion' }], optionGroups: [{ id: 'domain', label: 'Choose your domain', type: 'single', required: true, options: DOMAINS }], compInfo: { cvSlots: '—', mockPIs: '—', liveProject: '1 Month (Prodmark)', casePrep: '—', canva: '—', certificate: '✓ (Prodmark)' } },
  { id: 'live-2', cat: 'live', type: 'Internship', img: 'images/live-project-2-months.png', badge: null, rating: 4.7, students: 2480, level: 'Intermediate', hours: '8+ hrs', instr: 'Prodmark Business Consultants', title: 'Live Project — 2 Months', sub: 'A 2-month real project under Prodmark — 8 hours of domain sessions, 5 ATS-friendly keywords and a special industry session.', tagline: 'Deeper consulting experience under a real consulting company.', desc: 'Go deeper with a 2-month Live Project under Prodmark Business Consultants Pvt Ltd. You get 8 hours of sessions on the ins and outs of your domain, followed by a full project covering the complete area set — including advanced topics like Valuation, M&A and Financial Modelling (Finance), or M&A/PMI and MBA-level case solutions (Consulting), plus a special session from an industry expert (for example a JP Morgan investment banker, an IIM Ahmedabad consultant, or a Nestle Asia Talent Manager). On completion you earn 5 ATS-friendly keywords and a Certificate of Completion, with AI-platform access throughout. Fully online at about 2 hours a day; dates are flexible with submission within 3 months.', price: 7500, mrp: 7999, off: '6% off', feats: ['Under Prodmark Business Consultants Pvt Ltd', '8 hours of domain sessions + a full real project', 'Complete area set incl. advanced topics & a special industry session', '5 ATS-friendly keywords + Certificate of Completion', 'AI platform — profile assessment, CV prep & mock PIs', 'Online — about 2 hours/day, finish in 2 months', 'Flexible dates (submit within 3 months)', 'Group of 2 → 30% off'], curriculum: [{ t: 'Step 1: Domain Sessions', s: '8 hours on the ins & outs of your domain' }, { t: 'Step 2: Core Project', s: 'Full area set for your chosen domain' }, { t: 'Step 3: Advanced Module', s: 'e.g., Valuation, M&A, Financial Modelling / MBA-level case' }, { t: 'Step 4: Special Session', s: 'Industry expert (JP Morgan / IIM-A / Nestle / IIM-B, etc.)' }, { t: 'Step 5: Submission & Certificate', s: '5 ATS-friendly keywords + Certificate of Completion' }], optionGroups: [{ id: 'domain', label: 'Choose your domain', type: 'single', required: true, options: DOMAINS }], compInfo: { cvSlots: '—', mockPIs: '—', liveProject: '2 Months (Prodmark)', casePrep: '—', canva: '—', certificate: '✓ (Prodmark)' } },
  { id: 'case-dominate', cat: 'case', type: 'Standalone', img: 'images/case-competitions.png', badge: 'Bestseller', rating: 4.9, students: 5010, level: 'All levels', hours: '8+ hrs', instr: 'Unstop toppers (AIR 1, 6, 10, 15)', title: 'Dominating Case Competitions', sub: 'Sessions by Unstop toppers (AIR 1, 6, 10, 15) — 8 hours, 30+ winning PPTs and 1:1 mentorship.', tagline: 'Learn to win from Unstop national toppers.', desc: 'Master case competitions with sessions from Unstop toppers — AIR 1, 6, 10 and 15. Over 8 hours of detailed sessions take you from market research all the way to financial models for future roadmaps. You get 30+ national finals and winning PPTs you will not find on other platforms, Canva Pro access for a year, and 1:1 mentorship the moment you clear the Executive Summary round of any corporate competition. With 20+ past national winners, you also earn a CV point for the annual MSME competition we conduct on Unstop, plus AI-platform access for profile assessment, CV preparation and mock PIs.', price: 3499, mrp: 3999, off: '13% off', feats: ['Sessions by Unstop toppers (AIR 1, 6, 10, 15)', '8 hours: market research to financial models', '30+ national finals & winning PPTs', 'Canva Pro access (1 year)', '1:1 mentorship on clearing any Executive Summary round', '20+ past national winners', 'CV point for the annual MSME competition (Unstop)', 'AI platform — profile assessment, CV prep & mock PIs', 'Group of 2 → 30% off · 3+ → 40% off'], curriculum: [{ t: 'Module 1: Cracking Case Comps', s: '8 hours — market research to financial models' }, { t: 'Module 2: Winning Decks', s: '30+ national finals & winning PPTs' }, { t: 'Module 3: Tools', s: 'Canva Pro (1 year) for standout presentations' }, { t: 'Module 4: 1:1 Mentorship', s: 'Unlocked when you clear an Executive Summary round' }, { t: 'Module 5: Compete', s: 'MSME competition on Unstop — earn a CV point' }], compInfo: { cvSlots: '—', mockPIs: '—', liveProject: '—', casePrep: '✓ (Unstop Toppers)', canva: '✓ (1 year)', certificate: '✓' } },
  { id: 'case-live', cat: 'case', type: 'Combo', img: 'images/case-live.png', badge: null, rating: 4.7, students: 1450, level: 'Intermediate', hours: '14+ hrs', instr: 'Unstop toppers · Prodmark', title: 'Case Competitions + Live Project', sub: 'Case-comp mastery plus a real 2-month consulting project.', tagline: 'Double your CV impact.', desc: 'Get the best of both consulting worlds. Win case competitions with sessions from Unstop toppers (AIR 1, 6, 10, 15) — 8 hours, 30+ winning PPTs, Canva Pro and 1:1 mentorship on clearing an Executive Summary round — while building a 2-month Live Project under Prodmark Business Consultants Pvt Ltd that earns 5 ATS-friendly keywords and a certificate. AI-platform access is included throughout.', price: 8499, mrp: 8999, off: '6% off', feats: ['Sessions by Unstop toppers (AIR 1, 6, 10, 15)', '8 hours: market research to financial models', '30+ national finalist & winning PPTs', 'Canva Pro (1 year)', '2-month Live Project under Prodmark', '5 ATS-friendly keywords + Certificate of Completion', '1:1 mentorship on clearing any Executive Summary round', 'AI platform — profile assessment, CV prep & mock PIs', 'Group of 2 → 30% off'], curriculum: [{ t: 'Phase 1: Case Foundations', s: 'Market research to financial models — 8 hrs' }, { t: 'Phase 2: Live Project Launch', s: '8 hours of domain sessions + client brief' }, { t: 'Phase 3: Parallel Execution', s: 'Cases & real project work together' }, { t: 'Phase 4: Winning Decks', s: '30+ national finalist & winning PPTs' }, { t: 'Phase 5: Deliverables & Certificate', s: '5 ATS-friendly keywords + Certificate' }], optionGroups: [{ id: 'domain', label: 'Choose your live project domain', type: 'single', required: true, options: DOMAINS }], compInfo: { cvSlots: '—', mockPIs: '—', liveProject: '2 Months (Prodmark)', casePrep: '✓ (Unstop Toppers)', canva: '✓ (1 year)', certificate: '✓ (Prodmark)' } },
  { id: 'adv-excel', cat: 'cert', type: 'Certification', img: 'images/advanced-excel.png', badge: null, rating: 4.6, students: 7820, level: 'Beginner', hours: '8+ hrs', instr: 'Industry trainers', title: 'Advanced Excel (incl. Power Query)', sub: 'X-LookUp, Index-Match & Power Query plus financial modelling in Excel.', tagline: 'Master Excel skills that show up on your CV immediately.', desc: 'Turn raw data into decisions with advanced Excel. This certification covers X-LookUp, Index-Match and Power Query alongside 20+ other core Excel functions, plus a dedicated session on financial modelling in Excel. Practical and recruiter-valued for Finance, Consulting and Operations aspirants.', price: 1199, mrp: 1499, off: null, feats: ['X-LookUp, Index-Match & Power Query', '20+ core Excel functions', 'Session on financial modelling in Excel', 'Hands-on, recruiter-valued skills', 'Completion certificate', 'Group of 2 → 30% off · 3+ → 40% off'], curriculum: [{ t: 'Module 1: Core Functions', s: '20+ essential Excel functions' }, { t: 'Module 2: Lookups', s: 'X-LookUp and Index-Match' }, { t: 'Module 3: Power Query', s: 'Clean and transform data at scale' }, { t: 'Module 4: Financial Modelling', s: 'Build financial models in Excel' }], compInfo: { cvSlots: '—', mockPIs: '—', liveProject: '—', casePrep: '—', canva: '—', certificate: '✓' } },
  { id: 'power-bi', cat: 'cert', type: 'Certification', img: 'images/power-bi.png', badge: null, rating: 4.7, students: 5630, level: 'Beginner', hours: '10+ hrs', instr: 'Industry trainers', title: 'Power BI Certification', sub: 'Model queries and build interactive, dynamic dashboards.', tagline: 'Flexible learning that fits your MBA schedule.', desc: 'Build the real-time, interactive dashboards employers love. This certification covers modelling queries in Power BI and creating interactive dashboards, including dynamic dashboarding from 5+ data sources — web sources included. Ideal for MBA students who want a standout analytics skill.', price: 1499, mrp: null, off: null, feats: ['Modelling queries in Power BI', 'Interactive dashboard building', 'Dynamic dashboarding from 5+ data sources (incl. web)', 'Career-focused, hands-on projects', 'Completion certificate', 'Group of 2 → 30% off · 3+ → 40% off'], curriculum: [{ t: 'Module 1: Data & Queries', s: 'Connect, model and shape queries' }, { t: 'Module 2: Interactive Dashboards', s: 'Build dashboards users can explore' }, { t: 'Module 3: Multi-source', s: 'Dynamic dashboards from 5+ sources incl. web' }, { t: 'Module 4: Publish & Share', s: 'Deliver reports stakeholders can use' }], compInfo: { cvSlots: '—', mockPIs: '—', liveProject: '—', casePrep: '—', canva: '—', certificate: '✓' } }
];

const COMPARE_ROWS = [
  { label: 'Price', fn: c => fmt(c.price) },
  { label: 'CV review slots', fn: c => c.compInfo?.cvSlots || '—' },
  { label: 'Mock PI / GD sessions', fn: c => c.compInfo?.mockPIs || '—' },
  { label: 'Live project', fn: c => c.compInfo?.liveProject || '—' },
  { label: 'Case competition prep', fn: c => c.compInfo?.casePrep || '—' },
  { label: 'Combo savings', fn: c => { const cs = (typeof comboSavings === 'function') ? comboSavings(c) : null; return (cs && cs.save > 0) ? ('Save ' + fmt(cs.save)) : '—'; } },
  { label: 'Canva Pro', fn: c => c.compInfo?.canva || '—' },
  { label: 'Completion certificate', fn: c => c.compInfo?.certificate || '—' },
  { label: 'Level', fn: c => c.level },
  { label: 'Duration', fn: c => c.hours },
];

const MENTORS = [
  { initials: 'YG', name: 'Yash Gohil', school: 'IIM Ahmedabad', cred: 'Consulting · Accenture' },
  { initials: 'AR', name: 'Ananyo Roy', school: 'XLRI Jamshedpur', cred: 'HR · TAS' },
  { initials: 'SS', name: 'Shen Shaji', school: 'IIM Bangalore', cred: 'Product · Media.Net' },
  { initials: 'VB', name: 'Vidhi Barolia', school: 'IIM Lucknow', cred: 'Finance · PwC US' }
];
const FAQS = [
  { q: 'How is this delivered — live or recorded?', a: 'Sessions run live online with mentors, and recordings are shared afterward for anyone who misses a slot.' },
  { q: 'When does the next batch start?', a: 'New batches open on a rolling basis. Call +91 70427 32092 or email bharat.kapoor@prodmarkconsulting.in for the next cohort date.' },
  { q: 'What happens if I\'m not satisfied?', a: 'Reach out to our team at +91 70427 32092 and we will make it right — full enrolment terms are shared at sign-up.' },
  { q: 'How long do I have access to materials?', a: 'You keep access to your program materials through your cohort. Contact us for the exact window on your plan.' },
  { q: 'Will I get a certificate at the end?', a: 'Yes — every program includes a completion certificate plus CV-ready points you can list on your resume.' },
  { q: 'How do I reach my mentor if I have doubts?', a: 'Through the MBA Partner community on WhatsApp/Telegram, plus dedicated doubt-clearing slots during the program.' }
];
const TESTIMONIALS = [
  { name: 'Nishant Khandelwal', school: 'IIM Ahmedabad', outcome: 'Converted IIM ABC', quote: 'MBA Partner made all the difference. Their mentors helped me frame a beautiful profile story and navigate GDPI from a 10% convert chance to actually getting in.' },
  { name: 'Shen Shaji', school: 'IIM Bangalore', outcome: 'Product Management · Media.Net', quote: 'The mentors and their support were immense. My CV was boosted through Live Projects and the Placements Bootcamp shaped my SIP prep — I landed my dream PM role at Media.Net.' },
  { name: 'Rutuja Thorat', school: 'IIM Calcutta', outcome: 'Strategy · Accenture', quote: 'MBA Partner cleared the information asymmetry for me. Guidance from mentors who were alumni of my college helped me land Accenture Strategy for my Summer Internship.' },
  { name: 'Aayushi Gupta', school: 'FMS Delhi', outcome: 'Amazon', quote: 'Being a fresher is haunting in MBA as your CV does not look strong. The live projects and placement prep from great mentors really made the difference. True savior!' },
  { name: 'Shruti Satdeve', school: 'IIM Udaipur', outcome: 'Accenture Strategy', quote: 'Live projects at MBA Partner really helped me boost my CV and my SIP interview was totally based on the project. Preparation from the Placements Bootcamp made it a cakewalk.' },
  { name: 'Shikhar Kapoor', school: 'IIM Kozhikode', outcome: 'Pine Labs', quote: 'The live projects provided high-stakes experience my CV was missing, making my SIP interview incredibly smooth. ATS keywords really helped in getting the desired shortlists.' },
  { name: 'Hemang Agarwal', school: 'MDI Gurgaon', outcome: 'Reliance Group', quote: 'My journey with MBA Partner began with Case Comp sessions and their Live Project further elevated my CV, leading to an amazing SIP experience at Reliance Group.' },
  { name: 'Akula Vamsi', school: 'SPJIMR', outcome: 'Finance · JM Financials', quote: 'As an engineer aiming for Finance roles, it looked difficult. The Finance classes of Placements Bootcamp coupled with a live project helped me land my SIP in Finance domain.' },
  { name: 'Tanisha Sen', school: 'IIM Ranchi', outcome: 'Times of India', quote: 'I began with the GDPI course, then live projects, case comps, placements prep — and I got into Times of India! An incredible full-circle journey with MBA Partner.' },
  { name: 'Utsav Jain', school: 'NMIMS Mumbai', outcome: 'Big 4', quote: 'Despite having workex with KPMG, I could not make my CV finance-oriented. MBA Partner helped me with the right projects and I got through even in this sluggish market.' },
  { name: 'Megha Bhattacharya', school: 'IIM Mumbai', outcome: 'Kearney', quote: 'As a fresher I was afraid of SIPs, but the hands-on experience from live projects was a definitive turning point in my interview. Thanks to the MBA Partner Community!' }
];

const HOF = [
  { name: 'Nishant Khandelwal', school: 'IIM Ahmedabad', company: 'IIM ABC Convert', quote: 'Mentors helped me craft my story for GDPI — went from 10% convert chance to actually getting in.' },
  { name: 'Shen Shaji', school: 'IIM Bangalore', company: 'Media.Net — Product Mgmt', quote: 'Live Projects boosted my CV and the Bootcamp shaped my SIP prep. Landed my dream PM role!' },
  { name: 'Rutuja Thorat', school: 'IIM Calcutta', company: 'Accenture Strategy', quote: 'MBA Partner cleared the information asymmetry for me. Got into Strategy at Accenture for my SIP.' },
  { name: 'Aayushi Gupta', school: 'FMS Delhi', company: 'Amazon', quote: 'As a fresher, live projects and great mentors made the real difference. True savior for my placements!' },
  { name: 'Megha Bhattacharya', school: 'IIM Mumbai', company: 'Kearney', quote: 'Hands-on project experience was a definitive turning point in my SIP interview at Kearney.' },
  { name: 'Hemang Agarwal', school: 'MDI Gurgaon', company: 'Reliance Group', quote: 'Case Comp sessions + Live Project elevated my CV and led to an amazing SIP at Reliance Group.' },
  { name: 'Akula Vamsi', school: 'SPJIMR', company: 'JM Financials — Finance', quote: 'Finance Bootcamp + live project helped an engineer like me land a finance SIP. Could not believe it!' },
  { name: 'Shikhar Kapoor', school: 'IIM Kozhikode', company: 'Pine Labs', quote: 'Live projects gave my CV the high-stakes experience it needed. SIP interview felt incredibly smooth.' },
  { name: 'Tanisha Sen', school: 'IIM Ranchi', company: 'Times of India', quote: 'From GDPI course to live projects to placements — MBA Partner was with me at every step of the journey.' },
  { name: 'Utsav Jain', school: 'NMIMS Mumbai', company: 'Big 4', quote: 'MBA Partner helped me make my CV finance-ready with projects and I got through in a sluggish market.' },
  { name: 'Shruti Satdeve', school: 'IIM Udaipur', company: 'Accenture Strategy', quote: 'My SIP interview was entirely based on my live project. Placements Bootcamp made it a total cakewalk.' }
];

let cart = [], activeCat = 'all', query = '', sort = 'popular', appliedCoupon = null;
let detailState = { courseId: null, selected: {} };
let compareSlots = [null, null, null, null]; // up to 4 slots
let cpickerSlotIdx = null;
const SORTS = [{ key: 'popular', label: 'Most popular' }, { key: 'rating', label: 'Highest rated' }, { key: 'priceLow', label: 'Price: low to high' }, { key: 'priceHigh', label: 'Price: high to low' }, { key: 'discount', label: 'Biggest discount' }];

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
function observeReveals(scope) { (scope || document).querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el)); }

function syncCart() {
  const n = cart.length;
  document.getElementById('cartCount').textContent = n;
  document.getElementById('cartCountMobile').textContent = n;
  document.getElementById('cartBtn').setAttribute('aria-label', 'Cart, ' + n + ' items');
}
function removeFromCart(i) { cart.splice(i, 1); syncCart(); renderCheckout(); }
function showToast(msg) { const w = document.getElementById('toastWrap'); const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = '<i class="ti ti-circle-check"></i>' + msg; w.appendChild(t); requestAnimationFrame(() => t.classList.add('show')); setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2400); }

function sortList(list) {
  const a = list.slice();
  if (sort === 'popular') a.sort((x, y) => y.students - x.students);
  if (sort === 'rating') a.sort((x, y) => y.rating - x.rating);
  if (sort === 'priceLow') a.sort((x, y) => x.price - y.price);
  if (sort === 'priceHigh') a.sort((x, y) => y.price - x.price);
  if (sort === 'discount') a.sort((x, y) => (y.mrp ? y.mrp - y.price : 0) - (x.mrp ? x.mrp - x.price : 0));
  return a;
}

/* ===== TICKER ===== */
function initTicker() {
  const items = ['9.6/10 Avg. Rating', '5,000+ Students', '98.7% Placed in Desired Domain', 'IIM · XLRI · FMS Mentors', 'Live Consulting Projects', 'AIR 1 Case Mentor', '30+ Winning Case PPTs', 'Canva Pro Included'];
  const inner = document.getElementById('tickerInner');
  const html = items.map(t => `<span class="ticker-item">${t}<span class="ticker-dot"></span></span>`).join('');
  inner.innerHTML = html + html;
}

/* ===== MOBILE NAV ===== */
document.getElementById('mobileMenuBtn').onclick = () => {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('open');
};
function closeMobileNav() { document.getElementById('mobileNav').classList.remove('open'); }

/* ===== INTERACTIVE COMPARATOR ===== */
function renderComparator() {
  const picker = document.getElementById('comparatorPicker');
  picker.style.gridTemplateColumns = `repeat(${compareSlots.length},1fr)`;
  picker.innerHTML = compareSlots.map((id, i) => {
    if (id) {
      const c = byId(id);
      return `<button class="comp-pick-btn filled" data-slot="${i}" type="button">
        <span class="comp-pick-name">${c.title}</span>
        <span class="comp-pick-price">${fmt(c.price)}</span>
        <span class="comp-pick-remove">× Remove</span>
      </button>`;
    }
    return `<button class="comp-pick-btn" data-slot="${i}" type="button">
      <i class="ti ti-plus comp-pick-icon"></i>
      <span class="comp-pick-empty">Add a course</span>
    </button>`;
  }).join('');
  picker.querySelectorAll('[data-slot]').forEach(btn => {
    btn.onclick = () => {
      const i = Number(btn.dataset.slot);
      if (compareSlots[i]) {
        // remove
        compareSlots[i] = null;
        renderComparator();
      } else {
        openCpicker(i);
      }
    };
  });
  renderCompareTable();
}
function renderCompareTable() {
  const filled = compareSlots.filter(Boolean);
  const el = document.getElementById('comparatorTable');
  if (!filled.length) {
    el.innerHTML = '';
    return;
  }
  const cols = filled.map(id => byId(id));
  const colCnt = cols.length + 1;
  const colTpl = `140px ${cols.map(() => '1fr').join(' ')}`;
  let html = `<div class="cmp-table-inner">`;
  // header
  html += `<div class="cmp-row cmp-head" style="grid-template-columns:${colTpl}"><div class="cmp-cell cmp-label"></div>`;
  cols.forEach(c => {
    html += `<div class="cmp-cell cmp-col-head">
      <div class="cmp-name">${c.title}</div>
      <div class="cmp-price">${fmt(c.price)}</div>
      <button class="cmp-cta" data-go="${c.id}">View course</button>
    </div>`;
  });
  html += '</div>';
  // rows
  COMPARE_ROWS.forEach(row => {
    html += `<div class="cmp-row" style="grid-template-columns:${colTpl}"><div class="cmp-cell cmp-label">${row.label}</div>`;
    cols.forEach(c => { html += `<div class="cmp-cell">${row.fn(c)}</div>`; });
    html += '</div>';
  });
  html += '</div>';
  el.innerHTML = html;
  el.querySelectorAll('[data-go]').forEach(b => b.onclick = () => location.hash = '#/course/' + b.dataset.go);
}
function openCpicker(slotIdx) {
  cpickerSlotIdx = slotIdx;
  const already = compareSlots.filter(Boolean);
  const list = document.getElementById('cpickerList');
  list.innerHTML = COURSES.map(c => {
    const taken = already.includes(c.id) && compareSlots[slotIdx] !== c.id;
    return `<div class="cpicker-item ${taken ? 'disabled' : ''}" data-cid="${c.id}">
      <div class="cpicker-item-info">
        <div class="cpicker-item-name">${c.title}</div>
        <div class="cpicker-item-sub">${c.type} · ${c.level}</div>
      </div>
      <div class="cpicker-item-price">${fmt(c.price)}</div>
    </div>`;
  }).join('');
  list.querySelectorAll('.cpicker-item:not(.disabled)').forEach(el => {
    el.onclick = () => {
      compareSlots[cpickerSlotIdx] = el.dataset.cid;
      closeCpicker();
      renderComparator();
    };
  });
  document.getElementById('cpickerModal').classList.add('open');
}
function closeCpicker() { document.getElementById('cpickerModal').classList.remove('open'); }
document.getElementById('cpickerClose').onclick = closeCpicker;
document.getElementById('cpickerModal').addEventListener('click', e => { if (e.target === document.getElementById('cpickerModal')) closeCpicker(); });

function renderTabs() {
  const tabs = [{ key: 'all', label: 'All' }].concat(CATS);
  let tabsHtml = tabs.map(t => {
    const isActive = !query && t.key === activeCat;
    return `<button class="tab ${isActive ? 'active' : ''}" data-c="${t.key}">${t.label}</button>`;
  }).join('');

  const searchActive = query ? ' active' : '';
  const searchHtml = `<div class="tab-search-wrapper${searchActive}">
    <i class="ti ti-search"></i>
    <input id="searchInputTabs" placeholder="Search..." value="${query}" aria-label="Search courses" />
  </div>`;

  document.getElementById('tabs').innerHTML = tabsHtml + searchHtml;

  document.querySelectorAll('.tabs .tab').forEach(b => b.onclick = () => {
    activeCat = b.dataset.c;
    query = '';
    renderTabs();
    renderCatalog();
  });

  const tabsSearchInput = document.getElementById('searchInputTabs');
  if (tabsSearchInput) {
    tabsSearchInput.addEventListener('input', e => applySearch(e.target.value));
  }
}
function renderSortMenu() {
  const lbl = document.getElementById('sortLabel');
  if (lbl) lbl.textContent = (SORTS.find(s => s.key === sort) || SORTS[0]).label;
  const menu = document.getElementById('sortMenu');
  if (menu) menu.innerHTML = SORTS.map(s => `<div class="sort-opt ${s.key === sort ? 'sel' : ''}" data-sort="${s.key}">${s.label}<i class="ti ti-check"></i></div>`).join('');
  document.querySelectorAll('#sortMenu .sort-opt').forEach(o => o.onclick = () => {
    sort = o.dataset.sort;
    const wrap = document.getElementById('sortWrap');
    if (wrap) wrap.classList.remove('open');
    renderSortMenu();
    renderCatalog();
  });
}
document.addEventListener('click', e => { if (!e.target.closest('#sortWrap')) { const w = document.getElementById('sortWrap'); if (w) w.classList.remove('open'); } });

const staticSortBtn = document.getElementById('sortBtn');
if (staticSortBtn) {
  staticSortBtn.onclick = e => {
    e.stopPropagation();
    const wrap = document.getElementById('sortWrap');
    if (wrap) wrap.classList.toggle('open');
  };
}

/* ===== CARDS ===== */
const CAT_ICON = { combo: 'ti-stack-2', bootcamp: 'ti-rocket', live: 'ti-briefcase', case: 'ti-trophy', cert: 'ti-certificate' };
const CAT_LABEL = { combo: 'Combo Program', bootcamp: 'Placement Bootcamp', live: 'Live Project', case: 'Case Competition', cert: 'Certification' };
function cardHtml(c) {
  const revealClass = query ? 'card reveal in' : 'card reveal';
  const hasLocalImg = c.img && c.img.indexOf('images/') === 0;
  return `<div class="${revealClass}" data-open="${c.id}" tabindex="0" role="button" aria-label="View ${c.title}">
    <div class="card-vis">
      ${c.badge && !hasLocalImg ? `<span class="badge">${c.badge}</span>` : ''}
      <img data-src="${c.img}" alt="${c.title}" loading="lazy"/>
      ${!hasLocalImg ? `<div class="vtype">${c.variantLabel || c.type}</div>` : ''}
    </div>
    <div class="card-body">
      <div class="card-title">${c.title}</div>
      <div class="card-instr">${c.instr}</div>
      <div class="card-rating"><span class="card-rate-num">${c.rating.toFixed(1)}</span><span class="stars">${stars(c.rating)}</span><span class="card-rate-cnt">(${c.students.toLocaleString('en-IN')})</span></div>
      <div class="card-price-row"><span class="card-price">${fmt(c.price)}</span>${c.mrp ? `<span class="card-mrp">${fmt(c.mrp)}</span>` : ''}${c.off ? `<span class="card-off">${c.off}</span>` : ''}</div>
      ${typeof comboBadge === 'function' ? comboBadge(c) : ''}
      <div class="card-cta-row">
        <button class="btn-card-enroll" data-id="${c.id}"><i class="ti ti-bolt"></i> Enroll Now</button>
        <button class="btn-card-details" data-id="${c.id}"><i class="ti ti-info-circle"></i> More Details</button>
      </div>
    </div>
  </div>`;
}
function loadImg(img) { img.onload = () => img.classList.add('loaded'); img.src = img.dataset.src; if (img.complete && img.naturalWidth) img.classList.add('loaded'); }
function wireCards(scope) {
  scope.querySelectorAll('.card[data-open]').forEach(el => {
    el.onclick = () => location.hash = '#/course/' + el.dataset.open;
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); location.hash = '#/course/' + el.dataset.open; } });
  });
  scope.querySelectorAll('.btn-card-enroll').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.dataset.id;
      location.hash = '#/course/' + id;
      setTimeout(() => { const enrollBtn = document.getElementById('dEnroll'); if (enrollBtn) enrollBtn.click(); }, 300);
    });
  });
  scope.querySelectorAll('.btn-card-details').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      location.hash = '#/course/' + btn.dataset.id;
    });
  });
  scope.querySelectorAll('.card-vis img[data-src]').forEach(loadImg);
}
function renderCatalog() {
  const body = document.getElementById('catalogBody');
  const q = query.trim().toLowerCase();
  const match = c => !q || (c.title + ' ' + c.sub + ' ' + c.type + ' ' + c.instr + ' ' + (c.tagline || '') + ' ' + (c.desc || '') + ' ' + (c.feats || []).join(' ')).toLowerCase().includes(q);

  // Toggle the static wrap container of the group banner
  const promoWrap = document.getElementById('groupPromoBannerWrap');
  if (promoWrap) {
    promoWrap.style.display = q ? 'none' : 'block';
  }

  let html = '';
  if (activeCat === 'all' && sort !== 'popular') {
    const items = sortList(COURSES.filter(match));
    if (items.length) {
      const h2Class = q ? 'reveal in' : 'reveal';
      html += `<div class="cat-sec"><h2 class="${h2Class}">All Courses</h2><div class="grid">${items.map(cardHtml).join('')}</div></div>`;
    }
  } else {
    const cats = activeCat === 'all' ? CATS : CATS.filter(c => c.key === activeCat);
    cats.forEach(cat => {
      const items = sortList(COURSES.filter(c => c.cat === cat.key && match(c)));
      if (!items.length) return;
      const h2Class = q ? 'reveal in' : 'reveal';
      html += `<div class="cat-sec"><h2 class="${h2Class}">${cat.label}</h2><div class="grid">${items.map(cardHtml).join('')}</div></div>`;
    });
  }
  body.innerHTML = html || `<div class="co-empty"><i class="ti ti-search-off"></i><p>No offerings match your search.</p></div>`;
  body.querySelectorAll('.card[data-open]').forEach((el, i) => { el.style.transitionDelay = (Math.min(i, 8) * 55) + 'ms'; });
  wireCards(body); observeReveals(body);
}

function applySearch(v) {
  query = v;
  const desktopSearch = document.getElementById('searchInput');
  if (desktopSearch && desktopSearch.value !== v) desktopSearch.value = v;

  const heroSearch = document.getElementById('searchInputHero');
  if (heroSearch && heroSearch.value !== v) heroSearch.value = v;

  const mobileSearch = document.getElementById('searchInputMobile');
  if (mobileSearch && mobileSearch.value !== v) mobileSearch.value = v;

  const tabsSearch = document.getElementById('searchInputTabs');
  if (tabsSearch && tabsSearch.value !== v) tabsSearch.value = v;

  const tabsSearchWrap = document.querySelector('.tab-search-wrapper');
  if (tabsSearchWrap) {
    if (v) {
      tabsSearchWrap.classList.add('active');
      document.querySelectorAll('.tabs .tab').forEach(btn => btn.classList.remove('active'));
    } else {
      tabsSearchWrap.classList.remove('active');
      document.querySelectorAll('.tabs .tab').forEach(btn => {
        if (btn.dataset.c === activeCat) btn.classList.add('active');
      });
    }
  }

  if (!document.getElementById('view-catalog').classList.contains('active')) location.hash = '#/';
  renderCatalog();
}
const desktopSearchEl = document.getElementById('searchInput');
if (desktopSearchEl) desktopSearchEl.addEventListener('input', e => applySearch(e.target.value));

const heroSearchEl = document.getElementById('searchInputHero');
if (heroSearchEl) heroSearchEl.addEventListener('input', e => applySearch(e.target.value));

const mobileSearchEl = document.getElementById('searchInputMobile');
if (mobileSearchEl) mobileSearchEl.addEventListener('input', e => applySearch(e.target.value));


/* ===== DETAIL ===== */
function variantGroupHtml(g) {
  const sel = detailState.selected[g.id]; const isMulti = g.type === 'multi';
  return `<div class="variant-group" data-gid="${g.id}">
    <div class="variant-label">${g.label}${g.exact ? ' (pick ' + g.exact + ')' : ''}</div>
    <div class="variant-pills">${g.options.map(o => {
    const active = isMulti ? (sel || []).includes(o.key) : sel === o.key;
    const priceTag = o.price != null ? ` · ${fmt(o.price)}` : '';
    return `<button type="button" class="variant-pill ${active ? 'sel' : ''}" data-gid="${g.id}" data-key="${o.key}">${o.label}${priceTag}</button>`;
  }).join('')}</div>
  </div>`;
}
function resolveVariant(c) {
  let price = c.price, mrp = c.mrp, feats = c.feats, labels = [];
  (c.optionGroups || []).forEach(g => {
    const sel = detailState.selected[g.id];
    if (g.type === 'single') { const opt = g.options.find(o => o.key === sel); if (opt) { if (opt.price != null) { price = opt.price; mrp = opt.mrp; feats = opt.feats || feats; } else { labels.push(opt.label + ' domain'); } } }
    else if (g.type === 'multi') { const keys = sel || []; const chosen = g.options.filter(o => keys.includes(o.key)); if (chosen.length) labels.push(chosen.map(o => o.label).join(' + ') + ' domains'); }
  });
  return { price, mrp, feats, label: labels.join(' · ') };
}
function groupsSatisfied(c) { return (c.optionGroups || []).every(g => { if (g.required === false) return true; const sel = detailState.selected[g.id]; if (g.type === 'multi') return sel && sel.length === (g.exact || 1); return !!sel; }); }
function selectVariant(c, g, key) {
  if (g.type === 'multi') { const arr = detailState.selected[g.id] ? detailState.selected[g.id].slice() : []; const idx = arr.indexOf(key); if (idx > -1) { arr.splice(idx, 1); } else { if (g.exact && arr.length >= g.exact) { showToast('You can pick up to ' + g.exact + ' — remove one first'); return; } arr.push(key); } detailState.selected[g.id] = arr; }
  else { detailState.selected[g.id] = key; }
  renderVariantUI(c);
}
function renderVariantUI(c) {
  const wrap = document.getElementById('dVariants');
  if (c.optionGroups && c.optionGroups.length) { wrap.innerHTML = c.optionGroups.map(variantGroupHtml).join(''); wrap.querySelectorAll('.variant-pill').forEach(btn => { const g = c.optionGroups.find(g => g.id === btn.dataset.gid); btn.onclick = () => selectVariant(c, g, btn.dataset.key); }); }
  else { wrap.innerHTML = ''; }
  updateBuyBoxPricing(c);
}
function updateBuyBoxPricing(c) {
  const v = resolveVariant(c);
  let p = `<span class="buy-price">${fmt(v.price)}</span>`;
  if (v.mrp) p += `<span class="buy-mrp">${fmt(v.mrp)}</span><span class="buy-off">${Math.round((v.mrp - v.price) / v.mrp * 100)}% off</span>`;
  document.getElementById('dPriceRow').innerHTML = p;
  document.getElementById('dNote').textContent = v.mrp ? `You save ${fmt(v.mrp - v.price)} · one-time payment` : 'One-time payment · lifetime access';
  document.getElementById('dFeats').innerHTML = (v.feats || c.feats).map(f => `<div class="feat-item"><i class="ti ti-circle-check"></i><span>${f}</span></div>`).join('');
}
function addToCart(c) {
  // Login is required before adding to cart (prototype: browser session).
  if (window.MBAauth && !MBAauth.isLoggedIn()) {
    MBAauth.setReturn(location.href);
    showToast('Please log in to add courses to your cart');
    setTimeout(function () { location.href = 'login.html'; }, 800);
    return false;
  }
  if (!groupsSatisfied(c)) { showToast('Please make a selection above before continuing'); return false; }
  const v = resolveVariant(c); cart.push({ ...c, price: v.price, mrp: v.mrp, variantLabel: v.label }); syncCart(); showToast(c.title + ' added to cart' + (v.label ? ' · ' + v.label : '')); return true;
}
function renderMentors() { document.getElementById('dMentors').innerHTML = MENTORS.map(m => `<div class="mentor-card"><div class="mentor-avatar">${m.initials}</div><div class="mentor-name">${m.name}</div><div class="mentor-school">${m.school}</div><div class="mentor-cred">${m.cred}</div></div>`).join(''); }
function renderFaq() {
  document.getElementById('dFaq').innerHTML = FAQS.map((f, i) => `<div class="faq-item" data-i="${i}"><button class="faq-q" aria-expanded="false"><span>${f.q}</span><i class="ti ti-chevron-down"></i></button><div class="faq-a">${f.a}</div></div>`).join('');
  document.querySelectorAll('.faq-q').forEach(btn => btn.onclick = () => { const item = btn.closest('.faq-item'); const open = item.classList.toggle('open'); btn.setAttribute('aria-expanded', open); });
}
const LP_DOMAINS_DATA = {
  finance: {
    label: 'Finance',
    m1_title: 'MONTH 1 · FOUNDATION',
    m1_items: [
      'Annual Reports: COGS Analysis & Operating Cycle',
      'EBITDA Drivers + Secondary Market Research',
      'Balance Sheet Analysis',
      'Project Financial Analysis'
    ],
    m1_bonus: 'Bonus: Special session by an Investment Banker from JP Morgan',
    m1_footer: 'Presentation & roll-out of certificates at 1-month enrollment',
    m2_title: 'MONTH 2 · VALUATION',
    m2_items: [
      'M&A Synergy Analysis',
      'Financial Modeling'
    ],
    m2_footer: 'Presentation & closure of internship with certificates roll-out'
  },
  consulting: {
    label: 'Consulting',
    m1_title: 'MONTH 1 · FOUNDATION',
    m1_items: [
      'Market Entry Frameworks & Market Sizing',
      'Guesstimates & Value Chain Analysis',
      'MECE Structuring & Issue Trees',
      'Project Pitch Decks'
    ],
    m1_bonus: 'Bonus: Special session by a Consultant from McKinsey & Company',
    m1_footer: 'Presentation & roll-out of certificates at 1-month enrollment',
    m2_title: 'MONTH 2 · CASE STUDIES',
    m2_items: [
      'Due Diligence & M&A PMI',
      'Business Strategy & Operating Models'
    ],
    m2_footer: 'Presentation & closure of internship with certificates roll-out'
  },
  hr: {
    label: 'HR',
    m1_title: 'MONTH 1 · FOUNDATION',
    m1_items: [
      'Competency Mapping & Job Description Design',
      'Talent Acquisition & Sourcing Strategies',
      'Performance Appraisal Frameworks',
      'Employee Engagement Initiatives'
    ],
    m1_bonus: 'Bonus: Special session by a CHRO from a top Tech Unicorn',
    m1_footer: 'Presentation & roll-out of certificates at 1-month enrollment',
    m2_title: 'MONTH 2 · ANALYTICS',
    m2_items: [
      'HR Analytics & Dashboarding (Excel/Power BI)',
      'Compensation & Benefits Structuring'
    ],
    m2_footer: 'Presentation & closure of internship with certificates roll-out'
  },
  product: {
    label: 'Product Management',
    m1_title: 'MONTH 1 · FOUNDATION',
    m1_items: [
      'Product Teardowns & User Persona Mapping',
      'Wireframing & Prototyping (Figma)',
      'PRD Writing & User Stories',
      'Product Metric Frameworks (AARRR)'
    ],
    m1_bonus: 'Bonus: Special session by a Senior Product Manager from Google',
    m1_footer: 'Presentation & roll-out of certificates at 1-month enrollment',
    m2_title: 'MONTH 2 · PRIORITIZATION',
    m2_items: [
      'Roadmap Prioritization (RICE/Kano)',
      'Product Launch (GTM) Strategy'
    ],
    m2_footer: 'Presentation & closure of internship with certificates roll-out'
  },
  marketing: {
    label: 'Marketing',
    m1_title: 'MONTH 1 · FOUNDATION',
    m1_items: [
      'Brand Positioning & Target Persona Mapping',
      'Content Strategy & Social Media Planning',
      'Google Ads & Search Engine Marketing (SEM)',
      'Competitor Campaign Analysis'
    ],
    m1_bonus: 'Bonus: Special session by a Brand Manager from Nestlé',
    m1_footer: 'Presentation & roll-out of certificates at 1-month enrollment',
    m2_title: 'MONTH 2 · GROWTH',
    m2_items: [
      'Growth Hacking & Customer Acquisition',
      'Marketing Mix Modeling & ROI'
    ],
    m2_footer: 'Presentation & closure of internship with certificates roll-out'
  },
  operations: {
    label: 'Operations',
    m1_title: 'MONTH 1 · FOUNDATION',
    m1_items: [
      'Process Mapping & Value Stream Analysis',
      'Inventory Management (EOQ, Just-in-Time)',
      'Quality Control & Six Sigma Principles',
      'Demand Forecasting Models'
    ],
    m1_bonus: 'Bonus: Special session by an Operations Director from Amazon',
    m1_footer: 'Presentation & roll-out of certificates at 1-month enrollment',
    m2_title: 'MONTH 2 · SUPPLY CHAIN',
    m2_items: [
      'Supply Chain Network Design',
      'Logistics & Warehouse Optimization'
    ],
    m2_footer: 'Presentation & closure of internship with certificates roll-out'
  }
};

let activeLpDomain = 'finance';

function renderLiveProjectDomainCoverage(c) {
  const container = document.getElementById('liveProjectDomainCoverageBlock');
  if (!container) return;

  const hasLiveProject = c.cat === 'live' || c.id === 'flagship-bundle' || c.id === 'bootcamp-live' || c.id === 'case-live';
  if (!hasLiveProject) {
    container.style.display = 'none';
    return;
  }
  
  container.style.display = 'block';
  
  const drawContent = () => {
    const data = LP_DOMAINS_DATA[activeLpDomain];
    if (!data) return;

    container.innerHTML = `
      <h3>What's covered in every Live Project domain</h3>
      <p style="font-size: 13.5px; color: var(--ink2); margin-top: 6px; margin-bottom: 20px; font-family: 'Inter', sans-serif;">
        Two months of deliverables, mapped out below — pick a domain to see exactly what you'll build
      </p>
      
      <div class="lp-callout-grid">
        <div class="lp-callout">
          <h4>🎓 Need the certificate but couldn't finish every area?</h4>
          <p>That's fine — we still roll out your Certificate of Completion for your CV, as long as the project is submitted within 3 months of enrollment.</p>
        </div>
        <div class="lp-callout">
          <h4>🗓️ Flexible certificate dates</h4>
          <p>The date printed on your certificate is flexible too — it can show a slightly earlier date if that works better for your CV timeline.</p>
        </div>
      </div>

      <div class="lp-pills-row">
        ${Object.keys(LP_DOMAINS_DATA).map(key => `
          <button class="lp-pill ${key === activeLpDomain ? 'active' : ''}" onclick="selectLpDomain('${key}')">
            ${LP_DOMAINS_DATA[key].label}
          </button>
        `).join('')}
      </div>

      <div class="lp-cards-row">
        <!-- Month 1 Card -->
        <div class="lp-card">
          <div>
            <div class="lp-card-hdr">${data.m1_title}</div>
            <div class="lp-card-list">
              ${data.m1_items.map(item => `
                <div class="lp-card-item">
                  <i class="ti ti-arrow-right"></i>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>
            ${data.m1_bonus ? `
              <div class="lp-bonus-box">
                <i class="ti ti-school" style="font-size: 14px;"></i>
                <span>${data.m1_bonus}</span>
              </div>
            ` : ''}
          </div>
          <div class="lp-card-ftr">
            <i class="ti ti-calendar-time"></i>
            <span>${data.m1_footer}</span>
          </div>
        </div>

        <!-- Month 2 Card -->
        <div class="lp-card">
          <div>
            <div class="lp-card-hdr">${data.m2_title}</div>
            <div class="lp-card-list">
              ${data.m2_items.map(item => `
                <div class="lp-card-item">
                  <i class="ti ti-arrow-right"></i>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="lp-card-ftr">
            <i class="ti ti-calendar-time"></i>
            <span>${data.m2_footer}</span>
          </div>
        </div>
      </div>
    `;
  };

  window.selectLpDomain = (key) => {
    activeLpDomain = key;
    drawContent();
  };

  drawContent();
}

function renderDetail(id) {
  const c = byId(id); if (!c) { location.hash = '#/'; return; }
  detailState = { courseId: c.id, selected: {} };
  (c.optionGroups || []).forEach(g => { if (g.type === 'single') { const d = g.options.find(o => o.default); if (d) detailState.selected[g.id] = d.key; } });
  document.getElementById('bcTitle').textContent = c.title;
  document.getElementById('dType').textContent = c.type;
  document.getElementById('dTitle').textContent = c.title;
  document.getElementById('dTagline').textContent = c.tagline;
  const dbEl = document.getElementById('dBanner');
  if (dbEl) {
    dbEl.className = '';
    dbEl.src = c.img;
  }
  const biEl = document.getElementById('buyImg');
  if (biEl) {
    biEl.className = '';
    biEl.src = c.img;
  }
  document.getElementById('dDesc').textContent = c.desc;
  
  // Live Project certificate info callout
  (function () {
    const desc = document.getElementById('dDesc');
    let box = document.getElementById('lpCertCalloutBox');
    const hasLiveProject = c.cat === 'live' || c.id === 'flagship-bundle' || c.id === 'bootcamp-live' || c.id === 'case-live';
    if (hasLiveProject) {
      const html = `
        <div class="lp-callout" id="lpCertCalloutBox" style="margin-top: 20px; border: 1.5px dashed #1A7F4B; background: rgba(26,127,75,0.02); border-radius: 12px; padding: 16px 20px; text-align: left;">
          <h4 style="font-size: 13.5px; font-weight: 700; color: var(--ink); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">🎓 Need the certificate but couldn't finish every area?</h4>
          <p style="font-size: 12.0px; color: var(--ink2); line-height: 1.5; margin: 0;">That's fine — we still roll out your Certificate of Completion for your CV, as long as the project is submitted within 3 months of enrollment.</p>
        </div>
      `;
      if (!box) {
        box = document.createElement('div');
        box.id = 'lpCertCalloutBox';
        desc.insertAdjacentElement('afterend', box);
      }
      box.outerHTML = html;
    } else if (box) {
      box.remove();
    }
  })();

  // combo savings callout (injected after the description)
  (function () {
    const desc = document.getElementById('dDesc');
    let box = document.getElementById('comboSaveBox');
    const html = (typeof comboDetailHtml === 'function') ? comboDetailHtml(c) : '';
    if (html) {
      if (!box) { box = document.createElement('div'); box.id = 'comboSaveBox'; desc.insertAdjacentElement('afterend', box); }
      box.outerHTML = html.replace('<div class="combo-save-box">', '<div class="combo-save-box" id="comboSaveBox">');
    } else if (box) { box.remove(); }
  })();
  document.getElementById('dCurriculum').innerHTML = (c.curriculum && c.curriculum.length) ? c.curriculum.map((m, i) => `<div class="curr-item"><div class="curr-num">${i + 1}</div><div><div class="curr-t">${m.t}</div><div class="curr-s">${m.s}</div></div></div>`).join('') : `<div class="skeleton">Detailed curriculum will be added once official content is provided.</div>`;
  renderMentors(); renderFaq(); renderVariantUI(c);
  document.getElementById('dCart').onclick = () => addToCart(c);
  document.getElementById('dEnroll').onclick = () => { if (addToCart(c)) location.hash = '#/checkout'; };
  
  // Call to render Live Project domain details
  renderLiveProjectDomainCoverage(c);
  
  renderRelated(c); window.scrollTo(0, 0); observeReveals(document.getElementById('view-detail'));
}

function renderRelated(c) {
  const pool = COURSES.filter(x => x.id !== c.id);
  let picks = pool.filter(x => x.cat !== c.cat).sort((a, b) => b.rating - a.rating).slice(0, 3);
  if (picks.length < 3) { const more = pool.filter(x => !picks.includes(x)).sort((a, b) => b.rating - a.rating); picks = picks.concat(more).slice(0, 3); }
  const el = document.getElementById('dRelated'); el.innerHTML = picks.map(cardHtml).join(''); wireCards(el);
}

/* ===== CHECKOUT ===== */
function renderCheckout() {
  const body = document.getElementById('checkoutBody');
  if (!cart.length) { body.innerHTML = `<div class="co-empty"><i class="ti ti-shopping-cart-off"></i><p>Your cart is empty.</p><button class="buy-enroll" style="max-width:220px;margin:0 auto" onclick="location.hash='#/'">Browse courses</button></div>`; return; }
  const total = cart.reduce((s, c) => s + c.price, 0), mrpTotal = cart.reduce((s, c) => s + (c.mrp || c.price), 0), saved = mrpTotal - total;
  const couponDiscount = appliedCoupon ? Math.round(total * appliedCoupon.pct / 100) : 0;
  const grandTotal = total - couponDiscount;
  body.innerHTML = `<div class="co-title">Checkout</div><div class="co-sub">${cart.length} item${cart.length > 1 ? 's' : ''} in your cart</div>
  <div class="co-grid"><div>
    <div class="co-panel"><h3>Your details</h3>
      <div class="field"><label>Full name</label><input placeholder="Ananya Sharma"/></div>
      <div class="field-row"><div class="field"><label>Email</label><input type="email" placeholder="you@email.com"/></div><div class="field"><label>Phone</label><input placeholder="+91 …"/></div></div>
      <div class="field"><label>College / B-School</label><input placeholder="IIM …"/></div>
    </div>
    <div class="co-panel"><h3>Payment method</h3>
      <div class="pay-opt sel" data-pay="upi"><i class="ti ti-qrcode"></i><div class="pay-opt-t">UPI / QR</div></div>
      <div class="pay-opt" data-pay="card"><i class="ti ti-credit-card"></i><div class="pay-opt-t">Credit / Debit card</div></div>
      <div class="pay-opt" data-pay="netbanking"><i class="ti ti-building-bank"></i><div class="pay-opt-t">Net banking</div></div>
      <div class="pay-note">Payments are simulated — production routes through Wix Payments / Razorpay.</div>
    </div>
    <div class="co-panel group-panel"><h3><i class="ti ti-users"></i> Enroll with a friend — 30% off</h3>
      <p class="group-note">When 2 students join together, you <b>both</b> get 30% off. Add your friend's details to apply.</p>
      <div class="field-row"><div class="field"><label>Friend's name</label><input id="grpName" placeholder="Friend's name"/></div><div class="field"><label>Friend's email</label><input id="grpEmail" type="email" placeholder="friend@email.com"/></div></div>
      <button class="group-apply-btn ${appliedCoupon && appliedCoupon.code === 'GROUP30' ? 'applied' : ''}" id="grpApply" type="button">${appliedCoupon && appliedCoupon.code === 'GROUP30' ? '✓ Group offer applied — 30% off' : 'Apply group offer — 30% off'}</button>
    </div>
  </div>
  <div class="summary"><div class="co-panel"><h3>Order summary</h3>
    ${cart.map((c, i) => `<div class="sum-item"><div><div class="sum-item-t">${c.title}</div><div class="sum-item-ty">${c.variantLabel || c.type}</div><span class="sum-remove" data-rm="${i}">Remove</span></div><div class="sum-item-p">${fmt(c.price)}</div></div>`).join('')}
    <div class="sum-row"><span>Subtotal</span><span>${fmt(mrpTotal)}</span></div>
    ${saved > 0 ? `<div class="sum-row" style="color:var(--green);font-weight:600"><span>Savings</span><span>− ${fmt(saved)}</span></div>` : ''}
    ${appliedCoupon ? `<div class="sum-row" style="color:var(--green);font-weight:600"><span>Coupon (${appliedCoupon.code})</span><span>− ${fmt(couponDiscount)}</span></div>` : ''}
    <div class="coupon-row"><input id="couponInput" placeholder="Coupon code"/><button id="couponApply" type="button">Apply</button></div>
    <div class="sum-total"><span>Total</span><span>${fmt(grandTotal)}</span></div>
    <button class="co-pay-btn" id="payNow">Pay ${fmt(grandTotal)}</button>
  </div></div></div>`;
  body.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => removeFromCart(Number(b.dataset.rm)));
  body.querySelectorAll('.pay-opt').forEach(o => o.onclick = () => { body.querySelectorAll('.pay-opt').forEach(x => x.classList.remove('sel')); o.classList.add('sel'); });
  document.getElementById('couponApply').onclick = () => { const code = (document.getElementById('couponInput').value || '').trim().toUpperCase(); if (code === 'MBA10') { appliedCoupon = { code, pct: 10 }; showToast('Coupon applied — 10% off'); renderCheckout(); } else if (code === 'GROUP30') { appliedCoupon = { code, pct: 30 }; showToast('Group offer applied — 30% off'); renderCheckout(); } else { showToast('Invalid coupon code'); } };
  const grpBtn = document.getElementById('grpApply');
  if (grpBtn) grpBtn.onclick = () => {
    const gn = (document.getElementById('grpName').value || '').trim();
    const ge = (document.getElementById('grpEmail').value || '').trim();
    if (!gn || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ge)) { showToast("Add your friend's name and a valid email to apply"); return; }
    appliedCoupon = { code: 'GROUP30', pct: 30, group: { name: gn, email: ge } };
    showToast('Group offer applied — you both get 30% off');
    renderCheckout();
  };
  document.getElementById('payNow').onclick = () => { const n = (body.querySelector('input[placeholder="Ananya Sharma"]').value || '').trim(), e = (body.querySelector('input[type="email"]').value || '').trim(); if (!n || !e) { showToast('Please enter your name and email'); return; } openModal('paid', { total: grandTotal }); };
}

/* ===== ROUTING ===== */
function show(v) { document.querySelectorAll('.view').forEach(x => x.classList.remove('active')); document.getElementById('view-' + v).classList.add('active'); }
function router() { const h = location.hash || '#/'; const m = h.match(/^#\/course\/(.+)$/); if (m) { show('detail'); renderDetail(decodeURIComponent(m[1])); } else if (h === '#/checkout') { show('checkout'); renderCheckout(); window.scrollTo(0, 0); } else { show('catalog'); window.scrollTo(0, 0); } }
window.addEventListener('hashchange', router);

/* ===== DRAWER & MODALS ===== */
function openCartDrawer() { renderCartDrawer(); document.getElementById('cartDrawer').classList.add('open'); document.getElementById('drawerOverlay').classList.add('open'); }
function closeCartDrawer() { document.getElementById('cartDrawer').classList.remove('open'); document.getElementById('drawerOverlay').classList.remove('open'); }
function renderCartDrawer() {
  const body = document.getElementById('cartDrawerBody'), foot = document.getElementById('cartDrawerFoot');
  if (!cart.length) { body.innerHTML = '<div class="cd-empty">Your cart is empty.</div>'; foot.innerHTML = ''; return; }
  body.innerHTML = cart.map((c, i) => `<div class="cd-item"><div><div class="cd-item-t">${c.title}</div><div class="cd-item-v">${c.variantLabel || c.type}</div><span class="cd-remove" data-rmd="${i}">Remove</span></div><div class="cd-item-p">${fmt(c.price)}</div></div>`).join('');
  body.querySelectorAll('[data-rmd]').forEach(b => b.onclick = () => { cart.splice(Number(b.dataset.rmd), 1); syncCart(); renderCartDrawer(); });
  const total = cart.reduce((s, c) => s + c.price, 0);
  foot.innerHTML = `<div class="sum-total" style="border-top:none;padding-top:0;margin-top:0;font-size:18px"><span>Total</span><span>${fmt(total)}</span></div><button class="co-pay-btn" id="drawerCheckout">Go to checkout</button>`;
  document.getElementById('drawerCheckout').onclick = () => { closeCartDrawer(); location.hash = '#/checkout'; };
}
document.getElementById('cartBtn').onclick = openCartDrawer;
document.getElementById('cartBtnMobile').onclick = openCartDrawer;
document.getElementById('drawerClose').onclick = closeCartDrawer;
document.getElementById('drawerOverlay').onclick = closeCartDrawer;

document.getElementById('mobileSearchBtn').onclick = () => { document.getElementById('mobileSearchBar').classList.add('open'); document.getElementById('searchInputMobile').focus(); };
document.getElementById('mobileSearchClose').onclick = () => document.getElementById('mobileSearchBar').classList.remove('open');

/* TESTIMONIALS MODAL */
function openTestiModal() {
  document.getElementById('modalTestiGrid').innerHTML = TESTIMONIALS.map(t => `<div class="testi-card" style="background:var(--surface);border:1px solid var(--line)"><div class="testi-avatar" style="background:var(--orange-light);color:var(--orange-dark)">${t.name.charAt(0)}</div><div class="testi-quote" style="color:var(--ink2)">"${t.quote}"</div><div class="testi-name" style="color:var(--navy)">${t.name}</div><div class="testi-meta">${t.school} · ${t.outcome}</div></div>`).join('');
  document.getElementById('hofModalGrid').innerHTML = HOF.map(h => `<div class="testi-card" style="background:var(--surface);border:1px solid var(--line)"><div class="testi-avatar" style="background:var(--orange-light);color:var(--orange-dark)">${h.name.charAt(0)}</div><div class="testi-quote" style="color:var(--ink2)">"${h.quote}"</div><div class="testi-name" style="color:var(--navy)">${h.name}</div><div class="testi-meta">${h.school} · ${h.company}</div></div>`).join('');
  document.getElementById('testiModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeTestiModal() {
  document.getElementById('testiModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('testiModalClose').onclick = closeTestiModal;
document.getElementById('testiModal').addEventListener('click', e => { if (e.target.id === 'testiModal') closeTestiModal(); });

/* STANDARD MODAL */
const modalData = {
  login: () => ({ ico: 'ti-user-circle', title: 'Member login', text: 'This connects to your existing Wix Members Area once integrated.', action: 'Got it', run: null }),
  paid: c => ({ ico: 'ti-circle-check', title: 'Enrollment confirmed', text: 'Payment of ' + fmt(c.total) + ' successful (demo). On the live site this connects to Wix Payments / Razorpay.', action: 'Go to dashboard', run: () => { if (window.MBAauth) { MBAauth.addPurchasedCourses(cart.map(it => ({ id: it.id, title: it.title, type: it.type, emoji: it.emoji }))); } cart = []; appliedCoupon = null; syncCart(); location.href = 'login.html'; } })
};
let modalCtx = null;
function openModal(k, ctx) { const d = modalData[k](ctx); modalCtx = d; document.getElementById('modalIco').innerHTML = '<i class="ti ' + d.ico + '"></i>'; document.getElementById('modalTitle').textContent = d.title; document.getElementById('modalText').textContent = d.text; document.getElementById('modalAction').textContent = d.action; document.getElementById('modal').classList.add('open'); }
function closeModal() { document.getElementById('modal').classList.remove('open'); }
document.getElementById('modalClose').onclick = closeModal;
document.getElementById('modalAction').onclick = () => { if (modalCtx && modalCtx.run) modalCtx.run(); closeModal(); };
document.getElementById('modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
document.querySelectorAll('[data-modal]').forEach(b => b.onclick = e => {
  e.stopPropagation();
  if (b.dataset.modal === 'testimonials') openTestiModal();
  else openModal(b.dataset.modal);
});
document.getElementById('loginBtn').onclick = () => openModal('login');
document.querySelectorAll('#loginBtnMobile').forEach(b => b.onclick = () => openModal('login'));

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeTestiModal(); closeCartDrawer(); closeCpicker(); document.getElementById('mobileSearchBar').classList.remove('open'); } });

/* MOBILE CART ICON VISIBILITY */
function updateMobileCart() {
  const w = window.innerWidth;
  const mob = document.getElementById('cartBtnMobile');
  const des = document.getElementById('cartBtn');
  if (w <= 960) { mob.style.display = 'flex'; des.style.display = 'none'; }
  else { mob.style.display = 'none'; des.style.display = 'flex'; }
}
window.addEventListener('resize', updateMobileCart);
updateMobileCart();

/* ===== INIT ===== */
initTicker();
renderTabs(); renderSortMenu(); renderCatalog(); renderComparator(); router(); observeReveals(document);
// pull live prices from the Google Sheet (if configured) then re-render
if (typeof initCoursesDynamic === 'function') initCoursesDynamic(() => { renderCatalog(); renderComparator(); router(); observeReveals(document); });
document.getElementById('loginBtn').onclick = () => openModal('login');
document.querySelectorAll('#loginBtnMobile').forEach(b => b.onclick = () => openModal('login'));

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeTestiModal(); closeCartDrawer(); closeCpicker(); document.getElementById('mobileSearchBar').classList.remove('open'); } });

/* MOBILE CART ICON VISIBILITY */
function updateMobileCart() {
  const w = window.innerWidth;
  const mob = document.getElementById('cartBtnMobile');
  const des = document.getElementById('cartBtn');
  if (w <= 960) { mob.style.display = 'flex'; des.style.display = 'none'; }
  else { mob.style.display = 'none'; des.style.display = 'flex'; }
}
window.addEventListener('resize', updateMobileCart);
updateMobileCart();

/* ===== INIT ===== */
initTicker();
renderTabs(); renderSortMenu(); renderCatalog(); renderComparator(); router(); observeReveals(document);
// pull live prices from the Google Sheet (if configured) then re-render
if (typeof initCoursesDynamic === 'function') initCoursesDynamic(() => { renderCatalog(); renderComparator(); router(); observeReveals(document); });
