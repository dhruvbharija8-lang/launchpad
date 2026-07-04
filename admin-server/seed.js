/* One-time seed script. Populates data/db.json with the site's own sample
   data so nothing changes visually until the admin actually edits something.
   Run again with --force to reset back to these defaults. */
const db = require('./lib/db');

const withIds = arr => arr.map((r, i) => ({ _id: 'id' + (i + 1), ...r }));

const COURSES = [
  { id: 'flagship-bundle-master', Track: 'mba', cat: 'combo', type: 'Flagship bundle', img: 'images/complete-placement-bundle.png', badge: 'Best value', rating: 4.9, students: 4620, level: 'All levels', hours: '40+ hrs', instr: 'Top B-School mentors · Prodmark', title: 'The Complete Placement Bundle - Master', sub: 'Master-tier Placement Bootcamp + a 2-month Live Project (Prodmark) + Case Competition prep — the complete track, upgraded.', tagline: 'Every CV slot, every mock round, every edge — the top-tier version of our flagship track.', desc: 'The Master edition of our flagship bundle, built for students who want the highest level of prep across every track. You get the Master-tier Placement Bootcamp (5 CV review slots, 7 Mock PIs and 7 Mock GDs, plus 2 complementary Group Domain Sessions — recorded if already conducted), a 2-month Live Project under Prodmark Business Consultants Pvt Ltd in any 1 domain of your choice (8 weekly sessions in total — this batch began on 15th April, and recordings are provided for any classes already conducted), and Case Competition prep with access to 30+ national finalist and winning PPTs plus 1:1 mentorship on your case-solution approach (also recorded if already conducted). AI-platform access, Canva Pro and lifetime materials access are included throughout.', price: 15999, mrp: 16500, off: 'Save ₹501', featsText: '1:1 mentorship from Top B-School alumni\nMaster Placements: 5 CV slots, 7 Mock PIs and 7 Mock GDs (Mini: 3 CV slots, 5 Mock PIs, 5 Mock GDs)\n2 complementary Group Domain Sessions (recorded if already conducted)\nLive Project: any 1 domain, 2 months — 8 weekly sessions total\nBatch running since 15th April — recordings given for classes already conducted\nCase Comp: 30+ winning case PPTs + mentorship on your case-solution approach\nCanva Pro access (1 year)\nAI platform — profile assessment, CV prep & mock PIs\n100+ HR contacts from Top B-Schools\nLifetime access to all materials', curriculumText: 'Module 1: Profile & CV | 5 CV review slots — ATS optimisation, psychometric & JD prep\nModule 2: Interview Mastery | 7 Mock PIs + 7 Mock GDs, plus 2 complementary Group Domain Sessions\nModule 3: Live Project (Prodmark) | Any 1 domain, 2 months — 8 weekly sessions (running batch; recordings for classes already conducted)\nModule 4: Case Competitions | 30+ winning PPTs + 1:1 mentorship on your case-solution approach\nModule 5: Placement Finish | Interview transcripts, HR contacts, final prep', compCvSlots: '5 reviews', compMockPIs: '7 PIs + 7 GDs + 2 bonus domain sessions', compLiveProject: '2 Months (Prodmark)', compCasePrep: '✓ (30+ winning PPTs)', compCanva: '✓ (1 year)', compCertificate: '✓ (Prodmark & Case)' },
  { id: 'flagship-bundle', Track: 'mba', cat: 'combo', type: 'Flagship bundle', img: 'images/complete-placement-bundle.png', badge: null, rating: 4.9, students: 4120, level: 'All levels', hours: '40+ hrs', instr: 'Top B-School mentors · Prodmark', title: 'The Complete Placement Bundle - Mini', sub: 'Placement Bootcamp + a 2-month Live Project (Prodmark) + Case Competition prep — everything in one track.', tagline: 'From a recruiter-ready CV to live consulting experience and case-comp wins.', desc: 'Your complete placement track in one bundle. It combines our Placement Bootcamp (CV building, mock PIs & GDs and 20+ hours of domain prep), a 2-month Live Project under Prodmark Business Consultants Pvt Ltd, and Case Competition prep led by Unstop national toppers. You also get AI-platform access for profile assessment, CV preparation and mock PIs. This is not a typical course — you work under a real consulting company and finish with ATS-friendly CV points, a certificate, and case-competition firepower.', price: 13999, mrp: 14500, off: 'Save ₹501', featsText: '1:1 mentorship from Top B-School alumni\nCV building + 7 mock PIs + 7 mock GDs\n20+ hours end-to-end domain prep\n2-month Live Project under Prodmark (5 ATS-friendly keywords + certificate)\n30+ national finalist & winning case PPTs\nCanva Pro access (1 year)\nAI platform — profile assessment, CV prep & mock PIs\n100+ HR contacts from Top B-Schools\nLatest company- & profile-wise interview transcripts\nLifetime access to all materials', curriculumText: 'Module 1: Profile & CV | CV building, ATS optimisation, psychometric & JD prep\nModule 2: Interview Mastery | Mock PIs, mock GDs and 20+ hrs of domain sessions\nModule 3: Live Project (Prodmark) | 8 hours of domain sessions + a real client project\nModule 4: Case Competitions | Frameworks from Unstop toppers (AIR 1, 6, 10, 15) + 30+ winning PPTs\nModule 5: Placement Finish | Interview transcripts, HR contacts, final prep', compCvSlots: '5 reviews', compMockPIs: '7 PIs + 7 GDs', compLiveProject: '2 Months (Prodmark)', compCasePrep: '✓ (Unstop Toppers)', compCanva: '✓ (1 year)', compCertificate: '✓ (Prodmark & Case)' },
  { id: 'placement-bootcamp', Track: 'mba', cat: 'bootcamp', type: 'Solo', img: 'images/placement-bootcamp.png', badge: 'Bestseller', rating: 4.8, students: 6240, level: 'All levels', hours: '20+ hrs', instr: 'Top B-School mentors', title: 'Placement Bootcamp - Master', sub: 'Mentorship from Top B-School alumni — 5 CV slots, 7 mock PIs & 7 mock GDs and 20+ hours of domain prep.', tagline: 'Mentor-led prep to make you Day-1 ready — the full Master track.', desc: 'The cornerstone of placement success, Master edition. Get 1:1 mentorship from Top B-School alumni with 24x7 availability, 5 CV review slots, 7 mock PIs plus 7 mock GDs (top-up available), and 2 complementary Group Domain Sessions per domain (recorded if already conducted). Includes 20+ hours of end-to-end domain preparation, the latest company-wise and profile-wise interview transcripts, full JD preparation and psychometric-assessment support, plus AI-platform access for profile assessment, CV prep and mock PIs. It delivers record-breaking results when combined with a Live Project, and unlocks contacts of 100+ HRs working in top companies who passed out of Top B-Schools.', price: 9499, mrp: 9999, off: '5% off', featsText: '1:1 mentorship by Top B-School mentors (24x7)\n5 CV review slots\n7 mock PIs + 7 mock GDs (top-up available)\n2 complementary Group Domain Sessions per domain (recorded if already conducted)\n20+ hours end-to-end domain prep\nLatest company-wise & profile-wise interview transcripts\nFull JD prep + psychometric-assessment support\nAI platform — profile assessment, CV prep & mock PIs\n100+ HR contacts from Top B-Schools\nGroup of 2 → 20% off · 3+ → 30% off', curriculumText: 'Module 1: CV Building | 5 review slots — ATS-ready CV with mentor feedback\nModule 2: Mock PIs | 7 real panels with feedback\nModule 3: Mock GDs | 7 sessions — frameworks + current affairs\nModule 4: Domain Prep | 20+ hours end-to-end on your target domain, plus 2 complementary Group Domain Sessions per domain\nModule 5: Interview Intel | Company/profile transcripts, JD & psychometric prep\nModule 6: HR Network | Contacts of 100+ HRs from Top B-Schools', compCvSlots: '5 slots', compMockPIs: '7 PIs + 7 GDs + 2 bonus domain sessions', compLiveProject: '—', compCasePrep: '—', compCanva: '—', compCertificate: '✓' },
  { id: 'placement-bootcamp-mini', Track: 'mba', cat: 'bootcamp', type: 'Solo', img: 'images/placement-bootcamp.png', badge: null, rating: 4.8, students: 3180, level: 'All levels', hours: '20+ hrs', instr: 'Top B-School mentors', title: 'Placement Bootcamp - Mini', sub: 'Mentorship from Top B-School alumni — 3 CV slots, 5 mock PIs & 5 mock GDs and 20+ hours of domain prep.', tagline: 'Mentor-led prep to make you Day-1 ready — the lighter Mini track.', desc: 'A lighter version of our flagship placement track. Get 1:1 mentorship from Top B-School alumni with 24x7 availability, 3 CV review slots, and 5 mock PIs plus 5 mock GDs (top-up available). Includes 20+ hours of end-to-end domain preparation, the latest company-wise and profile-wise interview transcripts, full JD preparation and psychometric-assessment support, plus AI-platform access for profile assessment, CV prep and mock PIs.', price: 7499, mrp: 7999, off: '6% off', featsText: '1:1 mentorship by Top B-School mentors (24x7)\n3 CV review slots\n5 mock PIs + 5 mock GDs (top-up available)\n20+ hours end-to-end domain prep\nLatest company-wise & profile-wise interview transcripts\nFull JD prep + psychometric-assessment support\nAI platform — profile assessment, CV prep & mock PIs\nGroup of 2 → 20% off · 3+ → 30% off', curriculumText: 'Module 1: CV Building | 3 review slots — ATS-ready CV with mentor feedback\nModule 2: Mock PIs | 5 real panels with feedback\nModule 3: Mock GDs | 5 sessions — frameworks + current affairs\nModule 4: Domain Prep | 20+ hours end-to-end on your target domain\nModule 5: Interview Intel | Company/profile transcripts, JD & psychometric prep', compCvSlots: '3 slots', compMockPIs: '5 PIs + 5 GDs', compLiveProject: '—', compCasePrep: '—', compCanva: '—', compCertificate: '✓' },
  { id: 'bootcamp-case-master', Track: 'mba', cat: 'bootcamp', type: 'Combo', img: 'images/bootcamp-case.png', badge: 'Best value', rating: 4.8, students: 2650, level: 'Intermediate', hours: '12+ hrs', instr: 'Top B-School mentors · AIR 1 mentor', title: 'Bootcamp + Case Competitions - Master', sub: 'Master-tier placement training plus case-comp mastery from an AIR 1 mentor.', tagline: 'Land placements and win case competitions — the full Master track.', desc: 'Perfect for consulting-track students. This combo pairs our Master-tier Placement Bootcamp (5 CV review slots, 7 Mock PIs and 7 Mock GDs, plus 2 complementary Group Domain Sessions for each domain — recorded if already conducted) with case-competition training led by an AIR 1 mentor — 4 sessions of 2 hours each, 30+ winning PPTs, and Canva Premium access for 1 year. AI-platform access is included throughout, along with 1:1 mentorship the moment you clear the Executive Summary round of any corporate competition.', price: 11499, mrp: 11999, off: '4% off', featsText: '1:1 mentorship from Top B-School alumni\nMaster Placements: 5 CV slots, 7 Mock PIs, 7 Mock GDs (Mini: 3 CV slots, 5 Mock PIs, 5 Mock GDs)\n2 complementary Group Domain Sessions for each domain (recorded if already conducted)\n20+ hours domain prep\nCase Comps: 4 sessions of 2 hours each by an AIR 1 mentor\n30+ winning PPTs\nCanva Premium access (1 year)\nAI platform — profile assessment, CV prep & mock PIs\n1:1 mentorship on clearing any Executive Summary round\nGroup of 2 → 30% off', curriculumText: 'Phase 1: Bootcamp | 5 CV slots, 7 Mock PIs + 7 Mock GDs, plus 2 bonus domain sessions each\nPhase 2: Case Foundations | 4 sessions of 2 hours each by an AIR 1 mentor\nPhase 3: Winning Decks | 30+ winning PPTs + Canva Premium (1 year)\nPhase 4: Mentorship | 1:1 on clearing Executive Summary rounds\nPhase 5: Compete & Convert | MSME competition CV point + placement prep', compCvSlots: '5 slots', compMockPIs: '7 PIs + 7 GDs + 2 bonus domain sessions', compLiveProject: '—', compCasePrep: '✓ (AIR 1 mentor)', compCanva: '✓ (1 year)', compCertificate: '✓' },
  { id: 'bootcamp-case', Track: 'mba', cat: 'bootcamp', type: 'Combo', img: 'images/bootcamp-case.png', badge: null, rating: 4.7, students: 2300, level: 'Intermediate', hours: '12+ hrs', instr: 'Top B-School mentors · AIR 1 mentor', title: 'Bootcamp + Case Competitions - Mini', sub: 'Master-tier placement training plus case-comp mastery from an AIR 1 mentor.', tagline: 'Land placements and win case competitions.', desc: 'Perfect for consulting-track students. This combo pairs our Master-tier Placement Bootcamp (5 CV review slots, 7 Mock PIs and 7 Mock GDs) with case-competition training led by an AIR 1 mentor — 4 sessions of 2 hours each, 30+ winning PPTs, and Canva Premium access for 1 year. AI-platform access is included throughout, along with 1:1 mentorship the moment you clear the Executive Summary round of any corporate competition.', price: 9499, mrp: 9999, off: '5% off', featsText: '1:1 mentorship from Top B-School alumni\nMaster Placements: 5 CV slots, 7 Mock PIs, 7 Mock GDs (Mini: 3 CV slots, 5 Mock PIs, 5 Mock GDs)\n20+ hours domain prep\nCase Comps: 4 sessions of 2 hours each by an AIR 1 mentor\n30+ winning PPTs\nCanva Premium access (1 year)\nAI platform — profile assessment, CV prep & mock PIs\n1:1 mentorship on clearing any Executive Summary round\nGroup of 2 → 30% off', curriculumText: 'Phase 1: Bootcamp | 5 CV slots, 7 Mock PIs + 7 Mock GDs, 20+ hrs domain prep\nPhase 2: Case Foundations | 4 sessions of 2 hours each by an AIR 1 mentor\nPhase 3: Winning Decks | 30+ winning PPTs + Canva Premium (1 year)\nPhase 4: Mentorship | 1:1 on clearing Executive Summary rounds\nPhase 5: Compete & Convert | MSME competition CV point + placement prep', compCvSlots: '5 slots', compMockPIs: '7 PIs + 7 GDs', compLiveProject: '—', compCasePrep: '✓ (AIR 1 mentor)', compCanva: '✓ (1 year)', compCertificate: '✓' },
  { id: 'bootcamp-live-master', Track: 'mba', cat: 'bootcamp', type: 'Combo', img: 'images/bootcamp-live.png', badge: 'Best value', rating: 4.8, students: 2190, level: 'All levels', hours: '16+ hrs', instr: 'Top B-School mentors · Prodmark', title: 'Bootcamp + Live Project - Master', sub: 'Master-tier placement training plus a 2-month Live Project under Prodmark.', tagline: 'Work a real 2-month live project while preparing for placements — the full Master track.', desc: 'Combine rigorous Master-tier placement preparation with hands-on consulting experience. Get the Master-tier Placement Bootcamp (5 CV review slots, 7 Mock PIs and 7 Mock GDs, plus 2 complementary Group Domain Sessions — recorded if already conducted), while working a 2-month Live Project under Prodmark Business Consultants Pvt Ltd in any 1 domain of your choice. AI-platform access is included throughout, along with the record-breaking results this combination is known for.', price: 13499, mrp: 13999, off: '4% off', featsText: '1:1 mentorship from Top B-School alumni\nMaster Placements: 5 CV slots, 7 Mock PIs and 7 Mock GDs (Mini: 3 CV slots, 5 Mock PIs, 5 Mock GDs)\n2 complementary Group Domain Sessions (recorded if already conducted)\n20+ hours domain prep\nLive Project: any 1 domain, 2 months, under Prodmark\n5 ATS-friendly keywords + Certificate of Completion\nAI platform — profile assessment, CV prep & mock PIs\n100+ HR contacts from Top B-Schools\nLifetime materials access', curriculumText: 'Module 1: Bootcamp Foundation | 5 CV slots, 7 Mock PIs + 7 Mock GDs, plus 2 complementary Group Domain Sessions\nModule 2: Live Project Kickoff | Any 1 domain — 8 hours of domain sessions + client brief\nModule 3: Consulting Sprints | Research, analysis, recommendations (~2 hrs/day)\nModule 4: Deliverables | Presentations, reports and decks\nModule 5: Placement Finish | 5 ATS-friendly keywords + interview prep', compCvSlots: '5 slots', compMockPIs: '7 PIs + 7 GDs + 2 bonus domain sessions', compLiveProject: '2 Months (Prodmark)', compCasePrep: '—', compCanva: '—', compCertificate: '✓ (Prodmark)' },
  { id: 'bootcamp-live', Track: 'mba', cat: 'bootcamp', type: 'Combo', img: 'images/bootcamp-live.png', badge: null, rating: 4.8, students: 1890, level: 'All levels', hours: '16+ hrs', instr: 'Top B-School mentors · Prodmark', title: 'Bootcamp + Live Project - Mini', sub: 'Real consulting experience paired with full placement training.', tagline: 'Work a real 2-month live project while preparing for placements.', desc: 'Combine rigorous placement preparation with hands-on consulting experience. Get 1:1 mentorship, CV building and mock PIs & GDs through our bootcamp, while working a 2-month Live Project under Prodmark Business Consultants Pvt Ltd — 8 hours of domain sessions plus a real client project. You finish with 5 ATS-friendly keywords and a Certificate of Completion, AI-platform access throughout, and the record-breaking results this combination is known for.', price: 11499, mrp: 11999, off: '4% off', featsText: '1:1 mentorship from Top B-School alumni\nCV building + 7 mock PIs + 7 mock GDs\n20+ hours domain prep\n2-month Live Project under Prodmark\n8 hours of domain sessions + a real client project\n5 ATS-friendly keywords + Certificate of Completion\nAI platform — profile assessment, CV prep & mock PIs\n100+ HR contacts from Top B-Schools\nRecord-breaking results (bootcamp + live project)\nLifetime materials access', curriculumText: 'Module 1: Bootcamp Foundation | CV building, mock PIs & GDs, domain prep\nModule 2: Live Project Kickoff | 8 hours of domain sessions + client brief\nModule 3: Consulting Sprints | Research, analysis, recommendations (~2 hrs/day)\nModule 4: Deliverables | Presentations, reports and decks\nModule 5: Placement Finish | 5 ATS-friendly keywords + interview prep', compCvSlots: '5 slots', compMockPIs: '7 PIs + 7 GDs', compLiveProject: '2 Months (Prodmark)', compCasePrep: '—', compCanva: '—', compCertificate: '✓ (Prodmark)' },
  { id: 'live-1', Track: 'mba', cat: 'live', type: 'Internship', img: 'images/live-project-1-month.png', badge: null, rating: 4.6, students: 3320, level: 'Beginner', hours: '4+ hrs', instr: 'Prodmark Business Consultants', title: 'Live Project — 1 Domain, 1 Month', sub: 'A 1-month real project under Prodmark, 1 domain — 4 hours of domain sessions and 2 ATS-friendly CV points.', tagline: 'Work under a real consulting company — this is not a course.', desc: 'Launch real consulting experience in a single month, under Prodmark Business Consultants Pvt Ltd. You get 4 hours of sessions on the ins and outs of your chosen domain, followed by a project assignment covering the top 4 focus areas of that domain. On completion you earn 2 ATS-friendly CV points and a Certificate of Completion, plus AI-platform access for profile assessment, CV preparation and mock PIs. It is fully online — about 2 hours a day — and dates are flexible: the certificate is not withheld even if every area is not finished, provided you submit within 3 months.', price: 4000, mrp: 4500, off: '11% off', featsText: 'Under Prodmark Business Consultants Pvt Ltd\n4 hours of domain sessions + a real project\nTop 4 focus areas of your chosen domain\n2 ATS-friendly CV points + Certificate of Completion\nAI platform — profile assessment, CV prep & mock PIs\nOnline — about 2 hours/day, finish in 1 month\nFlexible dates (submit within 3 months)\nGroup of 2 → 30% off', curriculumText: 'Step 1: Domain Sessions | 4 hours on the ins & outs of your domain\nStep 2: Project Assignment | Top 4 focus areas (e.g., Finance: COGS, EBITDA, Balance Sheet, Financial Analysis)\nStep 3: Execution | About 2 hrs/day under Prodmark mentors\nStep 4: Submission & Certificate | 2 ATS-friendly CV points + Certificate of Completion', compCvSlots: '—', compMockPIs: '—', compLiveProject: '1 Month (Prodmark)', compCasePrep: '—', compCanva: '—', compCertificate: '✓ (Prodmark)' },
  { id: 'live-1-2mo', Track: 'mba', cat: 'live', type: 'Internship', img: 'images/live-project-2-months.png', badge: null, rating: 4.7, students: 2890, level: 'Intermediate', hours: '8+ hrs', instr: 'Prodmark Business Consultants', title: 'Live Project — 1 Domain, 2 Months', sub: 'A 2-month real project under Prodmark, 1 domain — 8 hours of domain sessions and 5 ATS-friendly CV points.', tagline: 'Go deeper into one domain over 2 months.', desc: 'The 2-month version of our single-domain Live Project under Prodmark Business Consultants Pvt Ltd. You get 8 hours of sessions on the ins and outs of your chosen domain, followed by a fuller project covering the complete area set for that domain. On completion you earn 5 ATS-friendly CV points and a Certificate of Completion, plus AI-platform access for profile assessment, CV preparation and mock PIs. Fully online — about 2 hours a day — with flexible submission within 3 months.', price: 6500, mrp: 7000, off: '7% off', featsText: 'Under Prodmark Business Consultants Pvt Ltd\n1 domain — 8 hours of domain sessions + a real project\nComplete area set for your chosen domain\n5 ATS-friendly CV points + Certificate of Completion\nAI platform — profile assessment, CV prep & mock PIs\nOnline — about 2 hours/day, finish in 2 months\nFlexible dates (submit within 3 months)\nGroup of 2 → 30% off', curriculumText: 'Step 1: Domain Sessions | 8 hours on the ins & outs of your domain\nStep 2: Core Project | Full area set for your chosen domain\nStep 3: Execution | About 2 hrs/day under Prodmark mentors\nStep 4: Submission & Certificate | 5 ATS-friendly CV points + Certificate of Completion', compCvSlots: '—', compMockPIs: '—', compLiveProject: '2 Months, 1 Domain (Prodmark)', compCasePrep: '—', compCanva: '—', compCertificate: '✓ (Prodmark)' },
  { id: 'live-2', Track: 'mba', cat: 'live', type: 'Internship', img: 'images/live-project-2-months.png', badge: null, rating: 4.7, students: 2480, level: 'Intermediate', hours: '8+ hrs', instr: 'Prodmark Business Consultants', title: 'Live Project — 2 Domains, 1 Month', sub: 'A 1-month real project under Prodmark, any 2 domains — 4 hours of sessions and 2 ATS-friendly CV points per domain.', tagline: 'Cover two domains at once in a single month.', desc: 'Pick any 2 domains and get a focused 1-month Live Project under Prodmark Business Consultants Pvt Ltd for each — 4 hours of domain sessions and a project assignment per domain. On completion you earn 2 ATS-friendly CV points per domain (4 total) and a Certificate of Completion, plus AI-platform access for profile assessment, CV preparation and mock PIs. Fully online — about 2 hours a day per domain — with flexible submission within 3 months.', price: 7500, mrp: 7999, off: '6% off', featsText: 'Under Prodmark Business Consultants Pvt Ltd\nAny 2 domains of your choice\n4 hours of domain sessions + a real project, per domain\n2 ATS-friendly CV points per domain (4 total) + Certificate of Completion\nAI platform — profile assessment, CV prep & mock PIs\nOnline — about 2 hours/day per domain, finish in 1 month\nFlexible dates (submit within 3 months)\nGroup of 2 → 30% off', curriculumText: 'Step 1: Domain Sessions | 4 hours per domain on the ins & outs of each\nStep 2: Project Assignment | Top focus areas for each of your 2 domains\nStep 3: Execution | About 2 hrs/day per domain under Prodmark mentors\nStep 4: Submission & Certificate | 2 ATS-friendly CV points per domain + Certificate of Completion', compCvSlots: '—', compMockPIs: '—', compLiveProject: '1 Month, 2 Domains (Prodmark)', compCasePrep: '—', compCanva: '—', compCertificate: '✓ (Prodmark)' },
  { id: 'live-2-2mo', Track: 'mba', cat: 'live', type: 'Internship', img: 'images/live-project-2-months.png', badge: null, rating: 4.8, students: 1340, level: 'Advanced', hours: '16+ hrs', instr: 'Prodmark Business Consultants', title: 'Live Project — 2 Domains, 2 Months', sub: 'A 2-month real project under Prodmark, any 2 domains — 8 hours of sessions and 5 ATS-friendly CV points per domain.', tagline: 'The deepest dual-domain consulting experience we offer.', desc: 'Pick any 2 domains and get a full 2-month Live Project under Prodmark Business Consultants Pvt Ltd for each — 8 hours of domain sessions and a complete project covering the full area set, per domain. On completion you earn 5 ATS-friendly CV points per domain (10 total) and a Certificate of Completion, plus AI-platform access for profile assessment, CV preparation and mock PIs. Fully online — about 2 hours a day per domain — with flexible submission within 3 months.', price: 11500, mrp: 11999, off: '4% off', featsText: 'Under Prodmark Business Consultants Pvt Ltd\nAny 2 domains of your choice\n8 hours of domain sessions + a full real project, per domain\n5 ATS-friendly CV points per domain (10 total) + Certificate of Completion\nAI platform — profile assessment, CV prep & mock PIs\nOnline — about 2 hours/day per domain, finish in 2 months\nFlexible dates (submit within 3 months)\nGroup of 2 → 30% off', curriculumText: 'Step 1: Domain Sessions | 8 hours per domain on the ins & outs of each\nStep 2: Core Project | Full area set for each of your 2 domains\nStep 3: Execution | About 2 hrs/day per domain under Prodmark mentors\nStep 4: Submission & Certificate | 5 ATS-friendly CV points per domain + Certificate of Completion', compCvSlots: '—', compMockPIs: '—', compLiveProject: '2 Months, 2 Domains (Prodmark)', compCasePrep: '—', compCanva: '—', compCertificate: '✓ (Prodmark)' },
  { id: 'case-dominate', Track: 'mba', cat: 'case', type: 'Standalone', img: 'images/case-competitions.png', badge: 'Bestseller', rating: 4.9, students: 5010, level: 'All levels', hours: '8+ hrs', instr: 'Unstop toppers (AIR 1, 6, 10, 15)', title: 'Dominating Case Competitions', sub: 'Sessions by Unstop toppers (AIR 1, 6, 10, 15) — 8 hours, 30+ winning PPTs and 1:1 mentorship.', tagline: 'Learn to win from Unstop national toppers.', desc: 'Master case competitions with sessions from Unstop toppers — AIR 1, 6, 10 and 15. Over 8 hours of detailed sessions take you from market research all the way to financial models for future roadmaps. You get 30+ national finals and winning PPTs you will not find on other platforms, Canva Pro access for a year, and 1:1 mentorship the moment you clear the Executive Summary round of any corporate competition. With 20+ past national winners, you also earn a CV point for the annual MSME competition we conduct on Unstop, plus AI-platform access for profile assessment, CV preparation and mock PIs.', price: 3499, mrp: 3999, off: '13% off', featsText: 'Sessions by Unstop toppers (AIR 1, 6, 10, 15)\n8 hours: market research to financial models\n30+ national finals & winning PPTs\nCanva Pro access (1 year)\n1:1 mentorship on clearing any Executive Summary round\n20+ past national winners\nCV point for the annual MSME competition (Unstop)\nAI platform — profile assessment, CV prep & mock PIs\nGroup of 2 → 30% off · 3+ → 40% off', curriculumText: 'Module 1: Cracking Case Comps | 8 hours — market research to financial models\nModule 2: Winning Decks | 30+ national finals & winning PPTs\nModule 3: Tools | Canva Pro (1 year) for standout presentations\nModule 4: 1:1 Mentorship | Unlocked when you clear an Executive Summary round\nModule 5: Compete | MSME competition on Unstop — earn a CV point', compCvSlots: '—', compMockPIs: '—', compLiveProject: '—', compCasePrep: '✓ (Unstop Toppers)', compCanva: '✓ (1 year)', compCertificate: '✓' },
  { id: 'case-live', Track: 'mba', cat: 'case', type: 'Combo', img: 'images/case-live.png', badge: null, rating: 4.7, students: 1450, level: 'Intermediate', hours: '14+ hrs', instr: 'Unstop toppers · Prodmark', title: 'Case Competitions + Live Project', sub: 'Case-comp mastery plus a real 2-month consulting project.', tagline: 'Double your CV impact.', desc: 'Get the best of both consulting worlds. Win case competitions with sessions from Unstop toppers (AIR 1, 6, 10, 15) — 8 hours, 30+ winning PPTs, Canva Pro and 1:1 mentorship on clearing an Executive Summary round — while building a 2-month Live Project under Prodmark Business Consultants Pvt Ltd that earns 5 ATS-friendly keywords and a certificate. AI-platform access is included throughout.', price: 8499, mrp: 8999, off: '6% off', featsText: 'Sessions by Unstop toppers (AIR 1, 6, 10, 15)\n8 hours: market research to financial models\n30+ national finalist & winning PPTs\nCanva Pro (1 year)\n2-month Live Project under Prodmark\n5 ATS-friendly keywords + Certificate of Completion\n1:1 mentorship on clearing any Executive Summary round\nAI platform — profile assessment, CV prep & mock PIs\nGroup of 2 → 30% off', curriculumText: 'Phase 1: Case Foundations | Market research to financial models — 8 hrs\nPhase 2: Live Project Launch | 8 hours of domain sessions + client brief\nPhase 3: Parallel Execution | Cases & real project work together\nPhase 4: Winning Decks | 30+ national finalist & winning PPTs\nPhase 5: Deliverables & Certificate | 5 ATS-friendly keywords + Certificate', compCvSlots: '—', compMockPIs: '—', compLiveProject: '2 Months (Prodmark)', compCasePrep: '✓ (Unstop Toppers)', compCanva: '✓ (1 year)', compCertificate: '✓ (Prodmark)' },
  { id: 'adv-excel', Track: 'mba', cat: 'cert', type: 'Certification', img: 'images/advanced-excel.png', badge: null, rating: 4.6, students: 7820, level: 'Beginner', hours: '8+ hrs', instr: 'Industry trainers', title: 'Advanced Excel (incl. Power Query)', sub: 'X-LookUp, Index-Match & Power Query plus financial modelling in Excel.', tagline: 'Master Excel skills that show up on your CV immediately.', desc: 'Turn raw data into decisions with advanced Excel. This certification covers X-LookUp, Index-Match and Power Query alongside 20+ other core Excel functions, plus a dedicated session on financial modelling in Excel. Practical and recruiter-valued for Finance, Consulting and Operations aspirants.', price: 1199, mrp: 1499, off: null, featsText: 'X-LookUp, Index-Match & Power Query\n20+ core Excel functions\nSession on financial modelling in Excel\nHands-on, recruiter-valued skills\nCompletion certificate\nGroup of 2 → 30% off · 3+ → 40% off', curriculumText: 'Module 1: Core Functions | 20+ essential Excel functions\nModule 2: Lookups | X-LookUp and Index-Match\nModule 3: Power Query | Clean and transform data at scale\nModule 4: Financial Modelling | Build financial models in Excel', compCvSlots: '—', compMockPIs: '—', compLiveProject: '—', compCasePrep: '—', compCanva: '—', compCertificate: '✓' },
  { id: 'power-bi', Track: 'mba', cat: 'cert', type: 'Certification', img: 'images/power-bi.png', badge: null, rating: 4.7, students: 5630, level: 'Beginner', hours: '10+ hrs', instr: 'Industry trainers', title: 'Power BI Certification', sub: 'Model queries and build interactive, dynamic dashboards.', tagline: 'Flexible learning that fits your MBA schedule.', desc: 'Build the real-time, interactive dashboards employers love. This certification covers modelling queries in Power BI and creating interactive dashboards, including dynamic dashboarding from 5+ data sources — web sources included. Ideal for MBA students who want a standout analytics skill.', price: 1499, mrp: null, off: null, featsText: 'Modelling queries in Power BI\nInteractive dashboard building\nDynamic dashboarding from 5+ data sources (incl. web)\nCareer-focused, hands-on projects\nCompletion certificate\nGroup of 2 → 30% off · 3+ → 40% off', curriculumText: 'Module 1: Data & Queries | Connect, model and shape queries\nModule 2: Interactive Dashboards | Build dashboards users can explore\nModule 3: Multi-source | Dynamic dashboards from 5+ sources incl. web\nModule 4: Publish & Share | Deliver reports stakeholders can use', compCvSlots: '—', compMockPIs: '—', compLiveProject: '—', compCasePrep: '—', compCanva: '—', compCertificate: '✓' }
];

const COMBOS = [
  { comboId: 'flagship-bundle-master', includes: ['placement-bootcamp', 'live-2', 'case-dominate'] },
  { comboId: 'flagship-bundle', includes: ['placement-bootcamp', 'live-1', 'case-dominate'] },
  { comboId: 'bootcamp-case-master', includes: ['placement-bootcamp', 'case-dominate'] },
  { comboId: 'bootcamp-case', includes: ['placement-bootcamp', 'case-dominate'] },
  { comboId: 'bootcamp-live-master', includes: ['placement-bootcamp', 'live-2'] },
  { comboId: 'bootcamp-live', includes: ['placement-bootcamp', 'live-1'] },
  { comboId: 'case-live', includes: ['case-dominate', 'live-2'] }
];

const COUPONS = [
  { code: 'MBA10', type: 'percent', value: 10, active: true, appliesTo: 'all', usageLimit: null, usedCount: 0, note: 'General 10% off code' },
  { code: 'GROUP30', type: 'percent', value: 30, active: true, appliesTo: 'all', usageLimit: null, usedCount: 0, note: '2-students-enroll-together offer' }
];

const SETTINGS = {
  heroRating: '9.6',
  heroRatingScale: '/10',
  studentsMentored: '5,000+',
  placementRate: '98.7%',
  campusesReached: '40+',
  reviewsCount: '700+',
  iimCallsSecured: '500+',
  // ----- Site-wide link destinations (edit here to update every button
  // across the whole site that points to it — no code changes needed). -----
  whatsappCommunity: 'https://chat.whatsapp.com/EdyvGJbQoV9Jj6eC0slSx9',
  telegramCommunity: 'https://t.me/+IrnzgXdUKqsyOTZl',
  freeResourcesHub: 'https://documents1.netlify.app/',
  instagramUrl: 'https://documents1.netlify.app/?open=instagram',
  linkedinUrl: 'https://documents1.netlify.app/?open=linkedin',
  youtubeUrl: 'https://documents1.netlify.app/?open=youtube',
  testimonialsExternalUrl: 'https://www.mbapartner.in/testimonials',
  phone: '+91 70427 32092',
  email: 'bharat.kapoor@prodmarkconsulting.in',
  catWhatsappCommunity: '',
  catTelegramCommunity: ''
};

const PLACEMENTS = [
    // ----- Final placements (2024-26) -----
    { Name:'Divyanshi Jaiswal',      College:'NMIMS Mumbai',         Company:'Nomura',              Batch:'final' },
    { Name:'Ananyo Sharma Roy',      College:'XLRI Jamshedpur',      Company:'TAS',                 Batch:'final' },
    { Name:'Sai Santosh',            College:'XLRI Delhi',           Company:'Kotak',               Batch:'final' },
    { Name:'Siba Prasad',            College:'IIM Kozhikode',        Company:'Aditya Birla Group',  Batch:'final' },
    { Name:'Divanshu Gaur',          College:'MDI Gurgaon',          Company:'Kluber',              Batch:'final' },
    { Name:'Priyanka Ganapathi',     College:'IIM Trichy',           Company:'Lagrange Point',      Batch:'final' },
    { Name:'Dheeraj D Acharya',      College:'IIM Bangalore',        Company:'Lodha',               Batch:'final' },
    { Name:'Sovan Bera',             College:'MDI Gurgaon',          Company:'Infosys',             Batch:'final' },
    { Name:'Shrutika Ruia',          College:'IIM Kozhikode',        Company:'Nova',                Batch:'final' },
    { Name:'Sri Akhil Yasarapu',     College:'IIM Raipur',           Company:'HSBC',                Batch:'final' },
    { Name:'Nikhil Gandhi',          College:'NMIMS Mumbai',         Company:'AB InBev',            Batch:'final' },
    { Name:'Aparna Sudhir',          College:'SIBM Bangalore',       Company:'Deloitte',            Batch:'final' },
    { Name:'Gauri Sanjay Janrao',    College:'IIM Jammu',            Company:'SourceIt',            Batch:'final' },
    { Name:'Anjana S E',             College:'IIM Trichy',           Company:'SIDBI',               Batch:'final' },
    { Name:'Yusuf Hasan',            College:'XLRI Jamshedpur',      Company:'Deloitte',            Batch:'final' },
    { Name:'Esha Shivdas',           College:'IIM Ranchi',           Company:'Star Union',          Batch:'final' },
    { Name:'Bolagani Premchand',     College:'IIM Lucknow',          Company:'Amazon',              Batch:'final' },
    { Name:'Anurag Jain',            College:'NMIMS Mumbai',         Company:'Bikaji',              Batch:'final' },
    { Name:'Akshita Satwal',         College:'MDI Gurgaon',          Company:'Titan',               Batch:'final' },
    { Name:'Kartik Shrivastava',     College:'MDI Gurgaon',          Company:'Rockstar Social',     Batch:'final' },
    { Name:'Aritra Datta',           College:'IIM Raipur',           Company:'Infosys',             Batch:'final' },
    { Name:'Vighnesh S',             College:'IIM Kozhikode',        Company:'Black Brix',          Batch:'final' },
    { Name:'Sowmya Priyadarshini',   College:'IIM Udaipur',          Company:'Siemens',             Batch:'final' },
    { Name:'Shinjini Roy',           College:'IIT Madras',           Company:'Agilisium Consulting',Batch:'final' },
    { Name:'Bhaskarananda Boro',     College:'IIM Bangalore',        Company:'ICICI Bank',          Batch:'final' },
    { Name:'Venkata Sai Krishna D',  College:'MDI Gurgaon',          Company:'Aditya Birla Group',  Batch:'final' },
    { Name:'Aditya Vikraman',        College:'MDI Gurgaon',          Company:'Amazon',              Batch:'final' },
    { Name:'Kunal Gusain',           College:'IIM Bodhgaya',         Company:'Oxyzo',               Batch:'final' },
    { Name:'Soumava Basu',           College:'MDI Gurgaon',          Company:'LDC',                 Batch:'final' },
    { Name:'Shweta Gaikwad',         College:'IIM Sambalpur',        Company:'Jio',                 Batch:'final' },
    { Name:'Megha Atri',             College:'MDI Gurgaon',          Company:'Korn Ferry',          Batch:'final' },
    { Name:'Varun Kamble',           College:'IIM Lucknow',          Company:'American Express',    Batch:'final' },
    { Name:'Anik Jana',              College:'SIBM Pune',            Company:'Sterlite',            Batch:'final' },
    { Name:'Arpita Padhi',           College:'SIBM Pune',            Company:'Axis Bank',           Batch:'final' },
    { Name:'Vedika Daley',           College:'XLRI Delhi',           Company:'Accenture',           Batch:'final' },
    { Name:'Shubhendu Das',          College:'IIM Indore',           Company:'ICICI Bank',          Batch:'final' },
    { Name:'Namrata Arora',          College:'IIM Lucknow',          Company:'Sutra',               Batch:'final' },
    { Name:'Shwet Sharma',           College:'IIM Indore',           Company:'Bank of America',     Batch:'final' },
    { Name:'Rohit Sattigeri',        College:'XLRI Delhi',           Company:'Policy Bazaar',       Batch:'final' },
    { Name:'Suhani Mehrotra',        College:'MDI Gurgaon',          Company:'Axis Bank',           Batch:'final' },
    { Name:'Rahul Tanwar',           College:'IIM Shillong',         Company:'MBDA',                Batch:'final' },
    { Name:'Vibhor Gupta',           College:'IMT Ghaziabad',        Company:'Swiggy',              Batch:'final' },
    { Name:'Anchal Maurya',          College:'IIM Jammu',            Company:'Datamatics',          Batch:'final' },
    { Name:'Sahil Kushwaha',         College:'IIM Kozhikode',        Company:'Dezerv',              Batch:'final' },
    { Name:'Paluk Shukla',           College:'IIM Bangalore',        Company:'Accenture',           Batch:'final' },
    { Name:'Aditi Mittal',           College:'XLRI Jamshedpur',      Company:'Accenture',           Batch:'final' },
    { Name:'Mandeep Singh Panwar',   College:'IMT Ghaziabad',        Company:'Wells Fargo',         Batch:'final' },
    { Name:'Priyanshi Sharma',       College:'MDI Gurgaon',          Company:'KPMG',                Batch:'final' },
    { Name:'Sonali Singh',           College:'MDI Gurgaon',          Company:'Michael Page',        Batch:'final' },
    { Name:'Himanshu Jain',          College:'SCMHRD',               Company:'IVP',                 Batch:'final' },
    { Name:'Hardik Ruhela',          College:'IIFT Kolkata',         Company:'Indian Oil',          Batch:'final' },
    // ----- Summer internships (2025-27) -----
    { Name:'Apeksha',                College:'IIM Kozhikode',        Company:'Axis Bank',           Batch:'summer', Domain:'Finance' },
    { Name:'Sanjay',                 College:'IMI Delhi',            Company:'Arvind Fashion',      Batch:'summer', Domain:'Finance' },
    { Name:'Duvarakesh',             College:'IIM Trichy',           Company:'TAFE',                Batch:'summer' },
    { Name:'Kanishk',                College:'NMIMS Hyderabad',      Company:'Everest Industries',  Batch:'summer', Domain:'Marketing' },
    { Name:'Devesh',                 College:'JBIMS',                Company:'IndusInd',            Batch:'summer', Domain:'Finance' },
    { Name:'Aastha',                 College:'IIM Ranchi',           Company:'Niswarth',            Batch:'summer', Domain:'Marketing' },
    { Name:'Pavan Pawar',            College:'SIBM Bangalore',       Company:'Ediglobe',            Batch:'summer', Domain:'Marketing' },
    { Name:'Tanisha Sen',            College:'IIM Ranchi',           Company:'Times of India',      Batch:'summer', Domain:'Marketing' },
    { Name:'Suhani',                 College:'MDI Gurgaon',          Company:'Axis Bank',           Batch:'summer', Domain:'HR' },
    { Name:'Amartya',                College:'GLIM Chennai',         Company:'Morris Garrage',      Batch:'summer', Domain:'Finance' },
    { Name:'Mathi',                  College:'IIT Madras',           Company:'Vayu Capital',        Batch:'summer', Domain:'Finance' },
    { Name:'Atharv',                 College:'IFMR',                 Company:'',                    Batch:'summer', Domain:'Finance' },
    { Name:'Vamsi',                  College:'SPJIMR',               Company:'',                    Batch:'summer', Domain:'Finance' },
    { Name:'Pranil',                 College:'IMT Ghaziabad',        Company:'India Shelter Finance',Batch:'summer', Domain:'Finance' },
    { Name:'Prathmesh',              College:'IIM Mumbai',           Company:'Aditya Birla Fashion', Batch:'summer', Domain:'Marketing' },
    { Name:'Aayushi',                College:'FMS Delhi',            Company:'Amazon',              Batch:'summer', Domain:'Finance' },
    { Name:'Pradipto',               College:'IIM Mumbai',           Company:'AAICLAS',             Batch:'summer', Domain:'Consulting' },
    { Name:'Kartik',                 College:'MDI Gurgaon',          Company:'Rockstar Social',     Batch:'summer', Domain:'Consulting' },
    { Name:'Pranay',                 College:'IIM Kozhikode',        Company:'Axis Bank',           Batch:'summer', Domain:'Prodman' },
    { Name:'Swarnil',                College:'SIBM Bangalore',       Company:'Leap India',          Batch:'summer', Domain:'Marketing' },
    { Name:'Madhumitha',             College:'IIM Bangalore',        Company:'Accenture',           Batch:'summer', Domain:'Consulting' },
    { Name:'Hansika',                College:'NMIMS Mumbai',         Company:'Taj Hotels',          Batch:'summer', Domain:'Operations' },
    { Name:'Jigar',                  College:'IIM Amritsar',         Company:'Neesh Perfumes',      Batch:'summer', Domain:'Marketing' },
    { Name:'Tamana',                 College:'GLIM Chennai',         Company:'Wells Fargo',         Batch:'summer', Domain:'Finance' },
    { Name:'Dev Shah',               College:'NMIMS Mumbai',         Company:'True North Marketers',Batch:'summer', Domain:'Marketing' },
    { Name:'Shivani',                College:'IIM Rohtak',           Company:'ProBox Media',        Batch:'summer', Domain:'Marketing' },
    { Name:'Akasam Jayadeep',        College:'IIM Bangalore',        Company:'',                    Batch:'summer', Domain:'Consulting' },
    { Name:'Shruti',                 College:'IIM Udaipur',          Company:'Accenture',           Batch:'summer', Domain:'Consulting' },
    { Name:'Yash',                   College:'NMIMS Mumbai',         Company:'',                    Batch:'summer', Domain:'Consulting' },
    { Name:'Ananya Chahal',          College:'NMIMS Mumbai',         Company:'Alphazegus',          Batch:'summer', Domain:'Prodman' },
    { Name:'Riya Khanna',            College:'IIM Shillong',         Company:'Giva',                Batch:'summer', Domain:'Marketing' },
    { Name:'Ritam',                  College:'NIA Pune',             Company:'Upsure Insurance',    Batch:'summer', Domain:'Marketing' },
    { Name:'Gayathri',               College:'IIM Kozhikode',        Company:'',                    Batch:'summer', Domain:'Finance' },
    { Name:'Megha',                  College:'IIM Mumbai',           Company:'Kearney',             Batch:'summer', Domain:'Marketing' },
    { Name:'Jahanvi Jain',           College:'IMI Delhi',            Company:'Tech Mahindra',       Batch:'summer', Domain:'Marketing' },
    { Name:'Yashvi Patel',           College:'NMIMS Mumbai',         Company:'Grupo Bimbo',         Batch:'summer', Domain:'Finance' },
    { Name:'Vivek Anand',            College:'IIM Trichy',           Company:'',                    Batch:'summer', Domain:'Prodman' },
    { Name:'Shreya Sharma',          College:'MDI Gurgaon',          Company:'',                    Batch:'summer', Domain:'Consulting' },
    { Name:'Anwesha Sarkar',         College:'IIM Trichy',           Company:'',                    Batch:'summer', Domain:'Marketing' },
    { Name:'Satyam',                 College:'MDI Gurgaon',          Company:'Pharmeasy',           Batch:'summer', Domain:'Finance' },
    { Name:'Ananya Goyal',           College:'IMT Ghaziabad',        Company:'LT Foods',            Batch:'summer', Domain:'HR' },
    { Name:'Shraddha',               College:'GLIM Chennai',         Company:'',                    Batch:'summer', Domain:'Consulting' },
    { Name:'Kanwal',                 College:'IIM Mumbai',           Company:'Tata Play',           Batch:'summer', Domain:'Consulting' },
    { Name:'Shikhar',                College:'IIM Kozhikode',        Company:'Pine Labs',           Batch:'summer' },
    { Name:'Vedanshi',               College:'XLRI Jamshedpur',      Company:'Amazon',              Batch:'summer', Domain:'Consulting' },
    { Name:'Rishit',                 College:'IRMA',                 Company:'Amul',                Batch:'summer', Domain:'Finance' },
    { Name:'Manasi',                 College:'IIM Kashipur',         Company:'',                    Batch:'summer', Domain:'Consulting' },
    { Name:'Tushar Arora',           College:'GLIM Chennai',         Company:'Caratlane',           Batch:'summer' },
    { Name:'Ritesh Singh',           College:'GLIM Chennai',         Company:'EPAM Systems',        Batch:'summer', Domain:'Consulting' },
    { Name:'Dhiraj Singhal',         College:'MICA',                 Company:'',                    Batch:'summer', Domain:'Marketing' },
    { Name:'Yugam',                  College:'IMT Nagpur',           Company:'Delhivery',           Batch:'summer', Domain:'Consulting' },
    { Name:'Shreya Lotiya',          College:'AMSOM',                Company:'Motilal Oswal',       Batch:'summer', Domain:'Finance' },
    { Name:'Harsh',                  College:'FMS Delhi',            Company:'',                    Batch:'summer', Domain:'Operations' },
    { Name:'Lokesh Samriya',         College:'FMS Delhi',            Company:'',                    Batch:'summer', Domain:'Consulting' },
    { Name:'Ayush Agrawal',          College:'IIT Delhi',            Company:'Accenture',           Batch:'summer', Domain:'Consulting' },
    { Name:'Hemang',                 College:'MDI Gurgaon',          Company:'Reliance',            Batch:'summer', Domain:'Finance' },
    { Name:'Pritam Banerjee',        College:'SCMHRD',               Company:'Mercer',              Batch:'summer', Domain:'HR' },
    { Name:'Tirth',                  College:'MDI Gurgaon',          Company:'Reliance',            Batch:'summer' },
    { Name:'Rishaab',                College:'MDI Gurgaon',          Company:'PhonePe',             Batch:'summer' },
    { Name:'Sai Nikhil',             College:'IIM Ranchi',           Company:'Sony Pictures',       Batch:'summer', Domain:'Marketing' },
    { Name:'Anshul Chauhan',         College:'VGSOM',                Company:'GSK',                 Batch:'summer' },
    { Name:'Abhinav Pal',            College:'IIM Lucknow',          Company:'Pidilite',            Batch:'summer', Domain:'Consulting' },
    { Name:'Sahana',                 College:'IIM Ranchi',           Company:'',                    Batch:'summer', Domain:'Marketing' },
    { Name:'Roopshree',              College:'IIM Indore',           Company:'TVS',                 Batch:'summer', Domain:'HR' },
    { Name:'Gaurav',                 College:'IIM Jammu',            Company:'Aditya Birla Fashion', Batch:'summer' },
    { Name:'Kshitij',                College:'IIM Jammu',            Company:'Haldiram',            Batch:'summer' },
    { Name:'Bhumika',                College:'IIM Indore',           Company:'Engineers Horizon',   Batch:'summer' },
    { Name:'Harshita Agarwal',       College:'IIM Kashipur',         Company:'',                    Batch:'summer', Domain:'Marketing' },
    { Name:'Sachin Kansal',          College:'IMT Ghaziabad',        Company:'Ralson',              Batch:'summer' },
    { Name:'Anshul Pokharna',        College:'BITSOM',               Company:'Intellecap',          Batch:'summer', Domain:'Finance' },
    { Name:'Hrishikesh Shinde',      College:'IFMR',                 Company:'',                    Batch:'summer', Domain:'Finance' },
    { Name:'Yash Grover',            College:'BITSOM',               Company:'Vodafone Idea',       Batch:'summer', Domain:'Consulting' },
    { Name:'Harshit Raghuvanshi',    College:'IIM Kashipur',         Company:'Arihant Markets',     Batch:'summer', Domain:'Finance' },
    { Name:'Karan Puar',             College:'IIM Shillong',         Company:'Hinduja',             Batch:'summer', Domain:'Consulting' },
    { Name:'Dhruv Lohia',            College:'IIM Amritsar',         Company:'Beanley',             Batch:'summer', Domain:'Marketing' },
    { Name:'Mekala Suhas',           College:'IIM Amritsar',         Company:'Dvio',                Batch:'summer', Domain:'Consulting' },
    { Name:'Anshit Shukla',          College:'GIM',                  Company:'',                    Batch:'summer', Domain:'Marketing' },
    { Name:'Sajat',                  College:'IIM Udaipur',          Company:'Cognizant',           Batch:'summer' },
    { Name:'Vaishnavi',              College:'BITSOM',               Company:'ABG',                 Batch:'summer', Domain:'Prodman' },
    { Name:'Utsav Jain',             College:'NMIMS Mumbai',         Company:'EY',                  Batch:'summer', Domain:'Finance' },
    { Name:'Aanya Rawat',            College:'IIM Udaipur',          Company:'Ofbusiness',          Batch:'summer', Domain:'Marketing' },
    { Name:'Tanushree Thube',        College:'SCMHRD',               Company:'Philips',             Batch:'summer', Domain:'HR' },
    { Name:'Rehan Mollah',           College:'IIM Kozhikode',        Company:'',                    Batch:'summer', Domain:'Finance' },
    { Name:'Raghav Bansal',          College:'SCMHRD',               Company:'Philips',             Batch:'summer', Domain:'Marketing' },
    { Name:'Abhinav Jangra',         College:'IIM Udaipur',          Company:'Tie Global',          Batch:'summer', Domain:'Consulting' },
    { Name:'Aditya Singh',           College:'Welingkar',            Company:'Bling Square Events', Batch:'summer', Domain:'Finance' },
    { Name:'Farhaz',                 College:'IIM Udaipur',          Company:'Solarium',            Batch:'summer', Domain:'Consulting' },
    { Name:'Shubham Khairnar',       College:'IIM Udaipur',          Company:'Orane Consulting',    Batch:'summer' },
    { Name:'Eishita Mehta',          College:'MICA',                 Company:'CKA Birla',           Batch:'summer' },
    { Name:'Aditya Singh Bhadouria', College:'IIFT',                 Company:'Godrej Consumer',     Batch:'summer', Domain:'Finance' },
    { Name:'Aanchal Bansal',         College:'IIM Udaipur',          Company:'Micron Technology',   Batch:'summer' },
    { Name:'Harshita Gaur',          College:'IIM Udaipur',          Company:'',                    Batch:'summer', Domain:'Operations' },
    { Name:'Abdullah',               College:'DSE',                  Company:'',                    Batch:'summer', Domain:'Marketing' },
    { Name:'Nikhil Pandey',          College:'DSE',                  Company:'',                    Batch:'summer', Domain:'Marketing' },
    { Name:'Razeen',                 College:'DSE',                  Company:'Kairali TMT',         Batch:'summer', Domain:'Marketing' },
    { Name:'Animesh Gulhane',        College:'JBIMS',                Company:'RS Software',         Batch:'summer' },
    { Name:'Vasil Ansari',           College:'IIT Delhi',            Company:'Accenture',           Batch:'summer', Domain:'Finance' },
    { Name:'Bhargava',               College:'IIT Delhi',            Company:'',                    Batch:'summer', Domain:'Finance' },
    { Name:'Suhas Patil',            College:'JBIMS',                Company:'ICICI Bank',          Batch:'summer', Domain:'Finance' },
    { Name:'Ajay Mote',              College:'JBIMS',                Company:'SavePlus',            Batch:'summer' },
    { Name:'Dipak Patil',            College:'JBIMS',                Company:'',                    Batch:'summer', Domain:'Finance' },
    { Name:'Siddhesh',               College:'JBIMS',                Company:'Lubrizol',            Batch:'summer' },
    { Name:'Tanishtha',              College:'',                     Company:'',                    Batch:'summer' },
    { Name:'Abhriam',                College:'IIM Trichy',           Company:'Ultra Tech',          Batch:'summer' },
    { Name:'Yogesh',                 College:'IIM Ranchi',           Company:'',                    Batch:'summer' },
    { Name:'Ritesh Dungdung',        College:'IIM Ranchi',           Company:'',                    Batch:'summer' },
    { Name:'Rubesh',                 College:'IIM Ranchi',           Company:'',                    Batch:'summer' },
    { Name:'Ajay Kumar',             College:'IIM Ranchi',           Company:'',                    Batch:'summer' },
    { Name:'Amarnath',               College:'IIM Ranchi',           Company:'',                    Batch:'summer' },
    { Name:'Sarat',                  College:'IIM Indore',           Company:'',                    Batch:'summer' },
    { Name:'Ritika',                 College:'NMIMS Mumbai',         Company:'',                    Batch:'summer' },
    { Name:'Adarsh Pandey',          College:'TAPMI',                Company:'',                    Batch:'summer' },
    { Name:'Rahul Tanwar',           College:'IIM Shillong',         Company:'',                    Batch:'summer', Domain:'Operations' },
    { Name:'Yash Garg',              College:'IIM Trichy',           Company:'Kiwi General Insurance',Batch:'summer' },
    { Name:'Shraman',                College:'IIT Delhi',            Company:'Myntra',              Batch:'summer' },
    { Name:'Arijit Mondal',          College:'MDI Gurgaon',          Company:'Tata Consumer',       Batch:'summer' },
    { Name:'Srishti',                College:'IIM Kozhikode',        Company:'Ola Electric',        Batch:'summer' },
    { Name:'Rapolu Shiva Prasad',    College:'IIM Ahmedabad',        Company:'',                    Batch:'summer' },
    { Name:'Kanchi',                 College:'MDI Gurgaon',          Company:'',                    Batch:'summer' },
    { Name:'Aman Behera',            College:'IMT Nagpur',           Company:'',                    Batch:'summer' },
    { Name:'Shuvam',                 College:'IIM Shillong',         Company:'',                    Batch:'summer', Domain:'Consulting' },
    { Name:'Anish Kapoor',           College:'GLIM Chennai',         Company:'Marquee',             Batch:'summer' },
    { Name:'Sambhav',                College:'GLIM Chennai',         Company:'',                    Batch:'summer' }
];

const MENTORS = [
  { Name: 'Yash Gohil', School: 'IIM Ahmedabad', Company: 'Accenture Consulting', Domain: 'Consulting', LinkedIn: 'https://www.linkedin.com/in/yashgohil14/' },
  { Name: 'Shen Shaji', School: 'IIM Bangalore', Company: 'Media.Net', Domain: 'Product Management', LinkedIn: 'https://www.linkedin.com/in/shenshaji/' },
  { Name: 'Vidhi Barolia', School: 'IIM Lucknow', Company: 'PwC US', Domain: 'Finance', LinkedIn: 'https://www.linkedin.com/in/vidhi-barolia-a555a9271/' }
];

const COLLAB_TESTIMONIALS = [
  { Name: 'Siddharth R.', Role: 'IIM Raipur · Placed in Consulting', Rating: 5, Avatar: 'S',
    Quote: 'The live consulting project gave me something none of my batchmates had — a real deliverable I could walk an interviewer through. It turned my PI at a top consulting firm into a 15-minute case discussion on my own work.' },
  { Name: 'Nisha A.', Role: 'Placement Coordinator · IIM Kashipur', Rating: 5, Avatar: 'N',
    Quote: 'As placement coordinator, bringing MBA Partner to IIM Kashipur was a strategic call. The mock PI quality and domain-specific prep was miles ahead of what we\'d arranged in previous years — results spoke for themselves.' },
  { Name: 'Tanvi M.', Role: 'IIM Udaipur · Strategy & Consulting Track', Rating: 5, Avatar: 'T',
    Quote: 'The case competition prep from an AIR 1 mentor changed how I structured my thinking. We reached the finals of a national competition — that would not have happened without the frameworks and mock rounds MBA Partner put us through.' },
  { Name: 'Karan P.', Role: 'JBIMS Mumbai · Finance & Banking Track', Rating: 5, Avatar: 'K',
    Quote: 'JBIMS students are sharp, but placement prep has always been self-driven. MBA Partner filled that gap — structured GD practice, ATS-optimised CV help, and mentors who actually came from top firms. Very different from what\'s usually available.' },
  { Name: 'Aisha V.', Role: 'Delhi School of Economics · Placed in Finance', Rating: 5, Avatar: 'A',
    Quote: 'At DSE the competition for finance and consulting roles is intense. The CV audit alone made a visible difference — my profile went from generic to shortlist-worthy. The mock PIs gave me the confidence to walk into any room.' }
];

const COLLEGES = ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Indore', 'IIM Kozhikode',
  'IIM Mumbai', 'XLRI Jamshedpur', 'FMS Delhi', 'MDI Gurgaon'].map(Name => ({ Name }));

const VIDEOS = [
  { Name: 'Mridul', College: 'IIM Calcutta', Company: '', Domain: '', VideoURL: 'https://drive.google.com/file/d/1O8GULMw1TSJq-BJgk1F8i7u3ywEITHeD/view', Duration: '' }
];

const GDPI = [
  { Name: 'Sabeen', College: 'IIM Lucknow', Quote: 'Mock PIs made my final answers sharper and more confident.' },
  { Name: 'Aryan Vivian', College: 'NMIMS Mumbai', Quote: 'The GDPI prep gave me structure when I needed it most.' },
  { Name: 'Abhishek Rohilla', College: 'IIM Kozhikode', Quote: 'Personal feedback helped me turn every mock into progress.' },
  { Name: 'Divija Bansod', College: 'IIM Lucknow', Quote: 'Mentors helped me present my story with clarity.' },
  { Name: 'Rupali Priyadarshini', College: 'IIM Indore', Quote: 'The practice panels made the real interview feel familiar.' },
  { Name: 'Varun Gangurde', College: 'BITSOM', Quote: 'Focused prep and honest feedback improved my interview presence.' },
  { Name: 'Prathamesh Mulay', College: 'NMIMS Mumbai', Quote: 'The structured mocks helped me walk in with real confidence.' },
  { Name: 'Nikhil Jaiswal', College: 'JBIMS', Quote: 'The transcripts and mocks helped me prepare with direction.' },
  { Name: 'Tamoghna Haldar', College: 'IIM Sambalpur', Quote: 'GD practice helped me speak with clarity and confidence.' },
  { Name: 'Mrittika Mukhopadhyay', College: 'XIMB', Quote: 'The feedback sessions helped me find the right words.' },
  { Name: 'Satakshi Singh', College: 'SSBF', Quote: 'I could feel the difference after every mock interview.' },
  { Name: 'Shivadhwaj SR', College: 'IIM Shillong', Quote: 'MBA Partner helped me refine answers without sounding rehearsed.' },
  { Name: 'Aastha Jain', College: 'IIM Shillong', Quote: 'The personalized feedback made my PI prep far more effective.' },
  { Name: 'Romit Banerjee', College: 'GLIM Chennai', Quote: 'The mentor feedback made my interview prep much sharper.' },
  { Name: 'Kushagra Barai', College: 'IIM Mumbai', Quote: 'I learnt how to connect my profile to every answer.' },
  { Name: 'Soumojit Mondal', College: 'SCMHRD', Quote: 'Consistent mock practice helped me handle pressure with ease.' },
  { Name: 'Nivedha', College: 'IIM Indore', Quote: 'The GDPI prep helped me convert my calls with confidence.' },
  { Name: 'Dhamo Dharan', College: 'IIT Madras', Quote: 'Structured mocks helped me stay calm under pressure.' },
  { Name: 'Sandeep', College: 'IIM Bangalore', Quote: 'Their GDPI guidance helped me bring out my best points.' },
  { Name: 'Srishti Mittal', College: 'NMIMS Mumbai', Quote: 'The mock panels felt so real, the actual interview was easy.' },
  { Name: 'Nishtha Arora', College: 'MICA', Quote: 'I gained clarity on how to structure my PI answers effectively.' },
  { Name: 'Anmisha N', College: 'IIM Lucknow', Quote: 'The GDPI course helped me tell my story with confidence.' },
  { Name: 'Pranav', College: 'FMS Delhi', Quote: 'Short, focused prep sessions made a big difference.' },
  { Name: 'Priya Yadav', College: 'FMS Delhi', Quote: 'Mock GDs gave me the practice I needed to stand out.' },
  { Name: 'Viresh Sawant', College: 'GLIM Chennai', Quote: 'The practice and feedback loop made all the difference.' },
  { Name: 'Nishita Sihag', College: 'ISME', Quote: 'Every mock session helped me get sharper and more confident.' },
  { Name: 'Gaurav Sarkar', College: 'IIM Kozhikode', Quote: 'The mock feedback helped me fix gaps before the final PI.' },
  { Name: 'Rudra', College: 'IIM Trichy', Quote: 'I became more confident with every mock and review.' },
  { Name: 'Dev Chauhan', College: 'IIM Ahmedabad', Quote: 'Mentors helped me build a crisp, convincing interview story.' },
  { Name: 'Sanjana Rai', College: 'MDI Gurgaon', Quote: 'The GDPI course gave me clarity on what panels expect.' },
  { Name: 'Ayan Murmu', College: 'IIM Calcutta', Quote: 'The answer frameworks helped me communicate with impact.' },
  { Name: 'Medha Rajhans', College: 'IIM Nagpur', Quote: 'Mock interviews helped me identify and improve weak areas.' },
  { Name: 'Yusuf Hasan', College: 'XLRI Jamshedpur', Quote: 'The practice made my PI answers more natural and precise.' },
  { Name: 'Aastha Maurya', College: 'XLRI Jamshedpur', Quote: 'Mentor feedback helped me polish my WAT and PI approach.' },
  { Name: 'Sankalp Annavarpu', College: 'FMS Delhi', Quote: 'The mocks gave me confidence to handle tough follow-ups.' },
  { Name: 'Piyush Kumar Jha', College: 'IIM Mumbai', Quote: 'GDPI prep helped me convert preparation into confidence.' }
];

// The "Free Session" YouTube cards — Persona picks which toggle (mba/cat)
// a video shows up on. Seeded with the same 3 videos on both toggles.
const FREE_SESSIONS = [
  { Persona: 'mba', Title: 'B-School Comparison & CV Skeleton', YouTubeURL: 'https://www.youtube.com/watch?v=zZXBRobYRCE&t=34s' },
  { Persona: 'mba', Title: 'MBA Game Plan', YouTubeURL: 'https://www.youtube.com/watch?v=eIgTrOVCyRw' },
  { Persona: 'mba', Title: 'HR Contacts (Demo)', YouTubeURL: 'https://www.youtube.com/watch?v=OhVg0Wf9JzU' },
  { Persona: 'cat', Title: 'B-School Comparison & CV Skeleton', YouTubeURL: 'https://www.youtube.com/watch?v=zZXBRobYRCE&t=34s' },
  { Persona: 'cat', Title: 'MBA Game Plan', YouTubeURL: 'https://www.youtube.com/watch?v=eIgTrOVCyRw' },
  { Persona: 'cat', Title: 'HR Contacts (Demo)', YouTubeURL: 'https://www.youtube.com/watch?v=OhVg0Wf9JzU' }
];

// The 3-story photo+quote spotlight at the top of the homepage's "Hall of Fame" section.
const HALL_OF_FAME = [
  { Name: 'Nishant Khandelwal', School: 'IIM Ahmedabad', Company: 'IIM ABC Convert', Quote: 'Mentors helped me craft my story for GDPI — went from 10% convert chance to actually getting in.', Photo: 'https://static.wixstatic.com/media/67e5e0_9adcddd217334ce5818c5156afc9b22a~mv2.jpg/v1/crop/x_0,y_54,w_400,h_239/fill/w_550,h_329,fp_0.50_0.50,lg_1,q_80,enc_avif,quality_auto/1743480492229.jpg' },
  { Name: 'Shen Shaji', School: 'IIM Bangalore', Company: 'Media.Net — Product Mgmt', Quote: 'Live Projects boosted my CV and the Bootcamp shaped my SIP prep. Landed my dream PM role!', Photo: 'https://static.wixstatic.com/media/67e5e0_44e10e2b5f034b028e21f1a59d58f4f9~mv2.jpg/v1/fill/w_550,h_329,fp_0.57_0.17,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1742217638011.jpg' },
  { Name: 'Rutuja Thorat', School: 'IIM Calcutta', Company: 'Accenture Strategy', Quote: 'MBA Partner cleared the information asymmetry for me. Got into Accenture Strategy for my SIP.', Photo: 'https://static.wixstatic.com/media/67e5e0_cd37e4ff87d54ce2bef947d27e341bbd~mv2.jpg/v1/crop/x_0,y_507,w_1571,h_938/fill/w_550,h_329,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG-20241218-WA0007_edited.jpg' }
];

const PROGRAMS = [
  { ProgramCode: 'PB-MASTER', Type: 'Placement Bootcamp', Title: 'Placement Bootcamp — Master Plan', Emoji: '🎯' },
  { ProgramCode: 'BUNDLE', Type: 'Flagship Bundle', Title: 'Complete Placement Bundle', Emoji: '🚀' }
];

const SESSIONS = [
  { ProgramCode: 'PB-MASTER', Day: '01', Month: 'JUL', Title: 'Mock PI #5 — Marketing Deep Dive', Time: '6:00 PM IST', Mentor: 'IIM Bangalore Mentor', Type: 'PI Session', Soon: 'yes' }
];

const MATERIALS = [
  { ProgramCode: 'PB-MASTER', Category: 'CV & Resume', Type: 'pdf', Name: 'ATS CV Template Pack', Meta: '12 templates', Link: '#' }
];

const STUDENTS = [
  { Email: 'ananya@iimb.ac.in', Password: 'Placement2025', Name: 'Ananya Sharma', Role: 'Placement Bootcamp · Master', Avatar: 'A', CV_Done: 2, CV_Total: 5, PI_Done: 4, PI_Total: 7, GD_Done: 5, GD_Total: 7 }
];

const ENROLLMENTS = [
  { Email: 'ananya@iimb.ac.in', ProgramCode: 'PB-MASTER', Progress: 55, NextSession: 'Mock PI #5', NextDate: 'Jul 1' }
];

/* ---------------- CAT / OMETs prep portal ---------------- */
const CAT_MATERIALS = [
  { Section: 'VARC', Title: 'Aristotle RC — Tricks & Tips', Meta: 'Free RC technique guide', Type: 'pdf', Link: '#' },
  { Section: 'QA', Title: 'Quant Formula Booklet', Meta: 'Every formula in one PDF', Type: 'pdf', Link: '#' },
  { Section: 'LRDI', Title: 'LRDI Set Bank', Meta: '200+ practice sets', Type: 'pdf', Link: '#' }
];

// Deadline: 'yyyy-mm-dd' or blank = no deadline (always available).
const CAT_MOCKS = [
  { MockID: 'varc-1', Exam: 'CAT', Title: 'VARC Mock 1', Section: 'VARC', Duration: 40, Status: 'live', Attempts: 1240, Note: '', Deadline: '' },
  { MockID: 'qa-1', Exam: 'CAT', Title: 'QA Mock 1', Section: 'QA', Duration: 40, Status: 'coming', Attempts: 0, Note: 'Coming soon', Deadline: '' },
  { MockID: 'lrdi-1', Exam: 'CAT', Title: 'LRDI Mock 1', Section: 'LRDI', Duration: 40, Status: 'coming', Attempts: 0, Note: 'Coming soon', Deadline: '' },
  { MockID: 'xat-1', Exam: 'XAT', Title: 'XAT Verbal + Decision Making', Section: 'VARC+DM', Duration: 65, Status: 'coming', Attempts: 0, Note: 'Coming soon', Deadline: '' },
  { MockID: 'snap-1', Exam: 'SNAP', Title: 'SNAP QA + DI Mock 1', Section: 'QA+DI', Duration: 60, Status: 'coming', Attempts: 0, Note: 'Coming soon', Deadline: '' },
  { MockID: 'nmat-1', Exam: 'NMAT', Title: 'NMAT Language Skills Mock 1', Section: 'Language', Duration: 28, Status: 'coming', Attempts: 0, Note: 'Coming soon', Deadline: '' },
  { MockID: 'mahcet-1', Exam: 'MAH-CET', Title: 'MAH-CET Verbal Ability Mock 1', Section: 'Verbal', Duration: 36, Status: 'coming', Attempts: 0, Note: 'Coming soon', Deadline: '' },
  { MockID: 'iift-1', Exam: 'IIFT', Title: 'IIFT General Awareness Mock 1', Section: 'GK', Duration: 40, Status: 'coming', Attempts: 0, Note: 'Coming soon', Deadline: '' },
  { MockID: 'cmat-1', Exam: 'CMAT', Title: 'CMAT Quant Aptitude Mock 1', Section: 'QA', Duration: 45, Status: 'coming', Attempts: 0, Note: 'Coming soon', Deadline: '' },
  { MockID: 'tissnet-1', Exam: 'TISSNET', Title: 'TISSNET English Proficiency Mock 1', Section: 'English', Duration: 40, Status: 'coming', Attempts: 0, Note: 'Coming soon', Deadline: '' },
  { MockID: 'varc-2', Exam: 'CAT', Title: 'VARC Sectional 2', Section: 'VARC', Duration: 40, Status: 'coming', Attempts: 0, Note: 'Coming soon', Deadline: '' },
  { MockID: 'full-1', Exam: 'CAT', Title: 'Full-Length Mock 1', Section: 'Full', Duration: 120, Status: 'coming', Attempts: 0, Note: 'Coming soon', Deadline: '' }
];

// One row per question. Options A-D + which one is correct + a solution.
// Passage is optional (leave blank for standalone questions).
const CAT_QUESTIONS = [
  { MockID: 'varc-1', Passage: 'Ubiquity in language refers to the pervasive presence of certain words or structures that appear across diverse contexts and cultures.', Q: 'What does "ubiquitous" most nearly mean in the passage?', OptionA: 'Rare and scarce', OptionB: 'Universally present', OptionC: 'Culturally specific', OptionD: 'Historically ancient', Correct: 'B', Solution: 'The passage describes ubiquity as "pervasive presence" — this aligns with universally present.' },
  { MockID: 'varc-1', Passage: '', Q: 'The word "circumspect" most nearly means:', OptionA: 'Impulsive and rash', OptionB: 'Wary and cautious', OptionC: 'Talkative and expressive', OptionD: 'Ignorant and uninformed', Correct: 'B', Solution: 'Circumspect means being wary, careful, and considering all circumstances before acting.' }
];

const CAT_PYQ = [
  { Exam: 'CAT', Year: '2024', Section: 'VARC', Title: 'CAT 2024 VARC — Slot 1', Meta: '24 Qs · Full solutions', MockID: 'pyq-cat24-varc-s1', PdfUrl: '', Deadline: '' },
  { Exam: 'CAT', Year: '2023', Section: 'QA', Title: 'CAT 2023 Quant — Slot 1', Meta: '22 Qs · Full solutions', MockID: 'pyq-cat23-qa-s1', PdfUrl: '', Deadline: '' },
  { Exam: 'XAT', Year: '2024', Section: 'VARC', Title: 'XAT 2024 Verbal Ability', Meta: '26 Qs · PDF paper', MockID: '', PdfUrl: '', Deadline: '' }
];

// Same shape as CAT_QUESTIONS, but keyed by the PYQ's MockID.
const CAT_PYQ_QUESTIONS = [
  { MockID: 'pyq-cat24-varc-s1', Passage: 'The rise of algorithmic decision-making in hiring has sparked debate about fairness and bias.', Q: 'According to the passage, why might algorithmic bias be considered more dangerous than human bias?', OptionA: 'Algorithms are always less accurate than humans', OptionB: 'It operates at scale and speed while being hard to detect', OptionC: 'Algorithms are illegal in most countries', OptionD: 'Human recruiters are never biased', Correct: 'B', Solution: 'The passage states algorithms automate bias at scale and speed, hidden inside a "black box."' }
];

const CAT_LEADERBOARD = [
  { Rank: 1, Name: 'Aarav S.', College: 'IIM Lucknow', Score: '48/50', Mock: 'VARC Mock 1' },
  { Rank: 2, Name: 'Diya M.', College: 'NMIMS Mumbai', Score: '47/50', Mock: 'VARC Mock 1' }
];

const CAT_GDPI = [
  { Type: 'PI', Title: 'Mock PI — Consulting Track', Meta: 'IIM alumni panel', Link: '#' },
  { Type: 'GD', Title: 'GD — ESG & Sustainability', Meta: 'Live group discussion', Link: '#' }
];

const CAT_DOMAINQA = [
  { Domain: 'Finance', Title: 'Finance Q&A Bank', Meta: '200+ interview questions', Link: '#' },
  { Domain: 'Consulting', Title: 'Consulting Q&A Bank', Meta: 'Case + guesstimate Qs', Link: '#' }
];

const CAT_MENTORS = [
  { Name: 'Ananya K.', School: 'IIM Ahmedabad', Converted: 'CAT 99.8%ile', Domain: 'Consulting', LinkedIn: '#' },
  { Name: 'Rohan M.', School: 'XLRI Jamshedpur', Converted: 'XAT 99.4%ile', Domain: 'Finance', LinkedIn: '#' }
];

const CAT_PRICING = [
  { Plan: 'Free Material', Price: '0', Period: 'free', Features: 'Aristotle RC tricks|50 free sectionals|Quant formula booklet', Badge: '' },
  { Plan: 'Mock Test Series', Price: '1999', Period: 'one-time', Features: 'VARC + QA + LRDI mocks|Detailed solutions|Leaderboard access', Badge: '' },
  { Plan: 'GDPI Flagship', Price: '4999', Period: 'one-time', Features: '10 mock PIs|10 mock GDs|100+ past transcripts|Domain Q&A prep', Badge: 'Bestseller' }
];

function run(force) {
  const existing = db.readAll();
  if (existing && Object.keys(existing).length && !force) {
    console.log('db.json already has data — skipping seed. Run with --force to overwrite.');
    backfillMissingCollections();
    return;
  }
  const data = {
    settings: SETTINGS,
    courses: withIds(COURSES),
    combos: withIds(COMBOS),
    coupons: withIds(COUPONS),
    placements: withIds(PLACEMENTS),
    mentors: withIds(MENTORS),
    colleges: withIds(COLLEGES),
    videos: withIds(VIDEOS),
    gdpi: withIds(GDPI),
    hallOfFame: withIds(HALL_OF_FAME),
    freeSessions: withIds(FREE_SESSIONS),
    programs: withIds(PROGRAMS),
    sessions: withIds(SESSIONS),
    materials: withIds(MATERIALS),
    students: withIds(STUDENTS),
    enrollments: withIds(ENROLLMENTS),
    collabTestimonials: withIds(COLLAB_TESTIMONIALS),
    catMaterials: withIds(CAT_MATERIALS),
    catMocks: withIds(CAT_MOCKS),
    catQuestions: withIds(CAT_QUESTIONS),
    catPyq: withIds(CAT_PYQ),
    catPyqQuestions: withIds(CAT_PYQ_QUESTIONS),
    catLeaderboard: withIds(CAT_LEADERBOARD),
    catGdpi: withIds(CAT_GDPI),
    catDomainQA: withIds(CAT_DOMAINQA),
    catMentors: withIds(CAT_MENTORS),
    catPricing: withIds(CAT_PRICING),
    leads: [], mentorApplications: [], collegeCollabLeads: [], orders: [], enrollmentRequests: [],
    adminUsers: existing.adminUsers || []
  };
  db.writeAll(data);
  console.log('Seeded admin-server/data/db.json');
}

/* Self-healing backfill: if this db.json was created before the CAT/OMETs
   portal collections existed, the keys are simply missing entirely (not
   just empty) — this fills in the sample defaults for any collection key
   that's completely absent. It never touches a collection that already
   exists, even if it's an empty array (that could be the admin's own
   intentional edit), so it's always safe to run. Runs automatically on
   every server start. */
function backfillMissingCollections() {
  const data = db.readAll();
  const DEFAULTS = {
    catMaterials: CAT_MATERIALS, catMocks: CAT_MOCKS, catQuestions: CAT_QUESTIONS,
    catPyq: CAT_PYQ, catPyqQuestions: CAT_PYQ_QUESTIONS, catLeaderboard: CAT_LEADERBOARD,
    catGdpi: CAT_GDPI, catDomainQA: CAT_DOMAINQA, catMentors: CAT_MENTORS, catPricing: CAT_PRICING,
    hallOfFame: HALL_OF_FAME, freeSessions: FREE_SESSIONS,
    collabTestimonials: COLLAB_TESTIMONIALS,
    // Visitor-submitted collections start empty — nothing to seed, they
    // just need to exist so the admin dashboard section doesn't error out
    // before anyone has submitted anything yet.
    leads: [], mentorApplications: [], collegeCollabLeads: [], orders: [], enrollmentRequests: []
  };
  let changed = false;
  Object.keys(DEFAULTS).forEach(key => {
    if (!(key in data)) {
      data[key] = withIds(DEFAULTS[key]);
      changed = true;
      console.log('Backfilled missing collection:', key);
    }
  });
  // One-time upgrade: earlier deploys were seeded with only a single
  // placeholder GDPI quote ("Sabeen"). If that's still all that's there
  // (i.e. nobody has customised it via the admin dashboard yet), replace
  // it with the full 35-student set. Never touches it if the admin has
  // already added/edited entries themselves.
  if (Array.isArray(data.gdpi) && data.gdpi.length === 1 && data.gdpi[0].Name === 'Sabeen') {
    data.gdpi = withIds(GDPI);
    changed = true;
    console.log('Upgraded gdpi collection from placeholder to full sample set');
  }
  // The 'settings' singleton already existed on older installs, but the new
  // site-wide link fields (whatsappCommunity, phone, email, etc.) were added
  // later — merge in any of those that are missing without touching values
  // the admin has already customised.
  if (data.settings && typeof data.settings === 'object' && !Array.isArray(data.settings)) {
    Object.keys(SETTINGS).forEach(key => {
      if (!(key in data.settings)) {
        data.settings[key] = SETTINGS[key];
        changed = true;
      }
    });
  }
  // One-time upgrade: the 'courses' collection was seeded before several new
  // course/combo cards existed on the site (Master/Mini splits, the 2x2 Live
  // Project matrix, etc.), so this admin dashboard couldn't edit them at all
  // — they simply weren't rows in the DB yet. Add any course id from the
  // current catalog that's completely missing from the existing collection,
  // without touching rows the admin has already added or edited.
  if (Array.isArray(data.courses)) {
    const existingIds = new Set(data.courses.map(c => c.id));
    COURSES.forEach(c => {
      if (!existingIds.has(c.id)) {
        data.courses.push({ _id: db.nextId(data.courses), ...c });
        changed = true;
        console.log('Backfilled missing course:', c.id);
      }
    });
  }
  // One-time upgrade: the 'combos' collection was seeded with only 4 of the
  // 7 combo cards (missing the 3 new Master-tier combos entirely), and the
  // 'case-live' row pointed at the 1-month Live Project instead of the
  // 2-month one it actually describes on the site (a stale default we
  // shipped by mistake). Add any missing combo id, and only correct
  // 'case-live' if it still holds that exact stale default — never touches
  // a combo row the admin has customised.
  if (Array.isArray(data.combos)) {
    const existingComboIds = new Set(data.combos.map(c => c.comboId));
    COMBOS.forEach(c => {
      if (!existingComboIds.has(c.comboId)) {
        data.combos.push({ _id: db.nextId(data.combos), ...c });
        changed = true;
        console.log('Backfilled missing combo:', c.comboId);
      }
    });
    const caseLiveRow = data.combos.find(c => c.comboId === 'case-live');
    if (caseLiveRow && JSON.stringify(caseLiveRow.includes) === JSON.stringify(['case-dominate', 'live-1'])) {
      caseLiveRow.includes = ['case-dominate', 'live-2'];
      changed = true;
      console.log('Upgraded stale case-live combo includes');
    }
  }
  if (changed) db.writeAll(data);
}

if (require.main === module) {
  run(process.argv.includes('--force'));
}

module.exports = { run, backfillMissingCollections };
