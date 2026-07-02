/* One-time seed script. Populates data/db.json with the site's own sample
   data so nothing changes visually until the admin actually edits something.
   Run again with --force to reset back to these defaults. */
const db = require('./lib/db');

const withIds = arr => arr.map((r, i) => ({ _id: 'id' + (i + 1), ...r }));

const COURSES = [
  { id: 'flagship-bundle', cat: 'combo', type: 'Flagship bundle', img: 'images/cards/complete-placement-bundle.svg', badge: 'Best value', rating: 4.9, students: 4120, level: 'All levels', hours: '40+ hrs', instr: 'Top B-School mentors · Prodmark', title: 'The Complete Placement Bundle', sub: 'Placement Bootcamp + a 2-month Live Project (Prodmark) + Case Competition prep — everything in one track.', tagline: 'From a recruiter-ready CV to live consulting experience and case-comp wins.', desc: 'Your complete placement track in one bundle.', price: 13999, mrp: 14500, off: 'Save ₹501' },
  { id: 'placement-bootcamp', cat: 'bootcamp', type: 'Solo', img: 'images/cards/placement-bootcamp.svg', badge: 'Bestseller', rating: 4.8, students: 6240, level: 'All levels', hours: '20+ hrs', instr: 'Top B-School mentors', title: 'Placement Bootcamp', sub: 'Mentorship from Top B-School alumni — CV building, mock PIs & GDs and 20+ hours of domain prep.', tagline: 'Mentor-led prep to make you Day-1 ready.', desc: 'The cornerstone of placement success.', price: 7499, mrp: 7999, off: null },
  { id: 'bootcamp-case', cat: 'bootcamp', type: 'Combo', img: 'images/cards/bootcamp-case.svg', badge: null, rating: 4.7, students: 2110, level: 'Intermediate', hours: '12+ hrs', instr: 'Top B-School mentors · Unstop toppers', title: 'Bootcamp + Case Competitions', sub: 'Placement training plus case-comp mastery from Unstop toppers.', tagline: 'Land placements and win case competitions.', desc: 'Perfect for consulting-track students.', price: 9499, mrp: 9999, off: '5% off' },
  { id: 'bootcamp-live', cat: 'bootcamp', type: 'Combo', img: 'images/cards/bootcamp-live.svg', badge: null, rating: 4.8, students: 1890, level: 'All levels', hours: '16+ hrs', instr: 'Top B-School mentors · Prodmark', title: 'Bootcamp + Live Project', sub: 'Real consulting experience paired with full placement training.', tagline: 'Work a real 2-month live project while preparing for placements.', desc: 'Combine rigorous placement preparation with hands-on consulting experience.', price: 11499, mrp: 11999, off: '4% off' },
  { id: 'live-1', cat: 'live', type: 'Internship', img: 'images/cards/live-project-1-month.svg', badge: null, rating: 4.6, students: 3320, level: 'Beginner', hours: '4+ hrs', instr: 'Prodmark Business Consultants', title: 'Live Project — 1 Month', sub: 'A 1-month real project under Prodmark.', tagline: 'Work under a real consulting company — this is not a course.', desc: 'Launch real consulting experience in a single month.', price: 4000, mrp: 4500, off: '11% off' },
  { id: 'live-2', cat: 'live', type: 'Internship', img: 'images/cards/live-project-2-months.svg', badge: null, rating: 4.7, students: 2480, level: 'Intermediate', hours: '8+ hrs', instr: 'Prodmark Business Consultants', title: 'Live Project — 2 Months', sub: 'A 2-month real project under Prodmark.', tagline: 'Deeper consulting experience under a real consulting company.', desc: 'Go deeper with a 2-month Live Project.', price: 7500, mrp: 7999, off: '6% off' },
  { id: 'case-dominate', cat: 'case', type: 'Standalone', img: 'images/cards/case-competitions.svg', badge: 'Bestseller', rating: 4.9, students: 5010, level: 'All levels', hours: '8+ hrs', instr: 'Unstop toppers (AIR 1, 6, 10, 15)', title: 'Dominating Case Competitions', sub: 'Sessions by Unstop toppers — 8 hours, 30+ winning PPTs and 1:1 mentorship.', tagline: 'Learn to win from Unstop national toppers.', desc: 'Master case competitions with sessions from Unstop toppers.', price: 3499, mrp: 3999, off: '13% off' },
  { id: 'case-live', cat: 'case', type: 'Combo', img: 'images/cards/case-live.svg', badge: null, rating: 4.7, students: 1450, level: 'Intermediate', hours: '14+ hrs', instr: 'Unstop toppers · Prodmark', title: 'Case Competitions + Live Project', sub: 'Case-comp mastery plus a real 2-month consulting project.', tagline: 'Double your CV impact.', desc: 'Get the best of both consulting worlds.', price: 8499, mrp: 8999, off: '6% off' },
  { id: 'adv-excel', cat: 'cert', type: 'Certification', img: 'images/cards/advanced-excel.svg', badge: null, rating: 4.6, students: 7820, level: 'Beginner', hours: '8+ hrs', instr: 'Industry trainers', title: 'Advanced Excel (incl. Power Query)', sub: 'X-LookUp, Index-Match & Power Query plus financial modelling in Excel.', tagline: 'Master Excel skills that show up on your CV immediately.', desc: 'Turn raw data into decisions with advanced Excel.', price: 1199, mrp: 1499, off: null },
  { id: 'power-bi', cat: 'cert', type: 'Certification', img: 'images/cards/power-bi.svg', badge: null, rating: 4.7, students: 5630, level: 'Beginner', hours: '10+ hrs', instr: 'Industry trainers', title: 'Power BI Certification', sub: 'Model queries and build interactive, dynamic dashboards.', tagline: 'Flexible learning that fits your MBA schedule.', desc: 'Build the real-time, interactive dashboards employers love.', price: 1499, mrp: null, off: null }
];

const COMBOS = [
  { comboId: 'flagship-bundle', includes: ['placement-bootcamp', 'live-1', 'case-dominate'] },
  { comboId: 'bootcamp-case', includes: ['placement-bootcamp', 'case-dominate'] },
  { comboId: 'bootcamp-live', includes: ['placement-bootcamp', 'live-1'] },
  { comboId: 'case-live', includes: ['case-dominate', 'live-1'] }
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
  iimCallsSecured: '500+'
};

const PLACEMENTS = [
  { Name: 'Divyanshi Jaiswal', College: 'NMIMS Mumbai', Company: 'Nomura', Batch: 'final' },
  { Name: 'Paluk Shukla', College: 'IIM Bangalore', Company: 'Accenture', Batch: 'final' },
  { Name: 'Jigar', College: 'IIM Amritsar', Company: 'Neesh Perfumes', Batch: 'summer', Domain: 'Marketing' }
];

const MENTORS = [
  { Name: 'Yash Gohil', School: 'IIM Ahmedabad', Company: 'Accenture Consulting', Domain: 'Consulting', LinkedIn: 'https://www.linkedin.com/in/yashgohil14/' },
  { Name: 'Shen Shaji', School: 'IIM Bangalore', Company: 'Media.Net', Domain: 'Product Management', LinkedIn: 'https://www.linkedin.com/in/shenshaji/' },
  { Name: 'Vidhi Barolia', School: 'IIM Lucknow', Company: 'PwC US', Domain: 'Finance', LinkedIn: 'https://www.linkedin.com/in/vidhi-barolia-a555a9271/' }
];

const COLLEGES = ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Indore', 'IIM Kozhikode',
  'IIM Mumbai', 'XLRI Jamshedpur', 'FMS Delhi', 'MDI Gurgaon'].map(Name => ({ Name }));

const VIDEOS = [
  { Name: 'Mridul', College: 'IIM Calcutta', Company: '', Domain: '', VideoURL: 'https://drive.google.com/file/d/1O8GULMw1TSJq-BJgk1F8i7u3ywEITHeD/view', Duration: '' }
];

const GDPI = [
  { Name: 'Sabeen', College: 'IIM Lucknow', Quote: 'Mock PIs made my final answers sharper and more confident.' }
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

function run(force) {
  const existing = db.readAll();
  if (existing && Object.keys(existing).length && !force) {
    console.log('db.json already has data — skipping seed. Run with --force to overwrite.');
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
    programs: withIds(PROGRAMS),
    sessions: withIds(SESSIONS),
    materials: withIds(MATERIALS),
    students: withIds(STUDENTS),
    enrollments: withIds(ENROLLMENTS),
    adminUsers: existing.adminUsers || []
  };
  db.writeAll(data);
  console.log('Seeded admin-server/data/db.json');
}

if (require.main === module) {
  run(process.argv.includes('--force'));
}

module.exports = { run };
