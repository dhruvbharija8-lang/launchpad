/* ========= EXAM DEFINITIONS ========= */
const EXAMS = {
  cat: {
    name:'CAT', full:'Common Admission Test',
    min:0, max:198, mid:99, unit:'Raw Score',
    info:'CAT is conducted by IIMs. Score is out of 198 (66×3 sections). Sectional percentiles are mandatory for IIM calls.',
    hasSectionals:true,
    sections:['VARC (Verbal & RC)','DILR (Data Interpretation & LR)','QA (Quantitative Ability)'],
    sectionalMax:66,
    toPercentile: scoreToPercentileCat,
    sectionToPercentile: sectionPctCat,
  },
  xat: {
    name:'XAT', full:'Xavier Aptitude Test',
    min:0, max:100, mid:50, unit:'Scaled Score',
    info:'XAT is conducted by XLRI. Score is on a 100-point scale. Unique section: Decision Making. Accepted by XLRI, XIMB, GIM, TAPMI, IMT, and 150+ colleges.',
    hasSectionals:true,
    sections:['Verbal & Logical Ability','Decision Making','Quantitative Ability & DI'],
    sectionalMax:33,
    toPercentile: scoreToPercentileXat,
    sectionToPercentile: sectionPctXat,
  },
  snap: {
    name:'SNAP', full:'Symbiosis National Aptitude Test',
    min:0, max:60, mid:30, unit:'Raw Score',
    info:'SNAP is conducted by Symbiosis International University for admission to all Symbiosis institutes (SIBM Pune, SCMHRD, SIIB, etc.). Score out of 60.',
    hasSectionals:false,
    toPercentile: scoreToPercentileSnap,
  },
  nmat: {
    name:'NMAT', full:'NMAT by GMAC',
    min:0, max:360, mid:180, unit:'Scaled Score',
    info:'NMAT is the gateway to NMIMS campuses (Mumbai, Bengaluru, Hyderabad, Navi Mumbai). Score range 0–360 across 3 sections. You can attempt up to 3 times.',
    hasSectionals:false,
    toPercentile: scoreToPercentileNmat,
  },
  mahcet: {
    name:'MAH-CET', full:'Maharashtra Common Entrance Test',
    min:0, max:200, mid:100, unit:'Raw Score',
    info:'MAH-CET is conducted by CET Cell Maharashtra for MBA admission to JBIMS, SIMSREE, KJ Somaiya, and 400+ Maharashtra institutes. Very affordable option.',
    hasSectionals:false,
    toPercentile: scoreToPercentileMahcet,
  },
  cmat: {
    name:'CMAT', full:'Common Management Admission Test',
    min:0, max:400, mid:200, unit:'Raw Score',
    info:'CMAT is conducted by NTA. Score range 0–400 (4 sections × 100). Accepted by GIM, PUMBA, SIMSREE (some seats), IFMR, K J Somaiya, and many others.',
    hasSectionals:false,
    toPercentile: scoreToPercentileCmat,
  },
  omet: {
    name:'OMET', full:'Other Management Entrance Tests',
    min:0, max:180, mid:90, unit:'Score',
    info:'OMET covers state-level exams like TANCET (TN), KMAT (Karnataka/Kerala), APICET (AP/Telangana), etc. Enter your raw score; results are region-specific.',
    hasSectionals:false,
    toPercentile: scoreToPercentileOmet,
  },
  gmat: {
    name:'GMAT', full:'Graduate Management Admission Test',
    min:205, max:805, mid:505, unit:'Total Score',
    info:'GMAT (Focus Edition) is scored 205–805. Widely accepted for ISB, IIM Executive programs, SPJIMR, Great Lakes, GLIM, and international MBA programs.',
    hasSectionals:false,
    toPercentile: scoreToPercentileGmat,
  },
};

/* ========= PERCENTILE FUNCTIONS ========= */
function scoreToPercentileCat(s){
  s=+s;
  if(s>=185)return 99.99;if(s>=170)return 99.9;if(s>=155)return 99.7;
  if(s>=145)return 99.4;if(s>=135)return 99.0;if(s>=125)return 98.5;
  if(s>=115)return 97.5;if(s>=105)return 96.0;if(s>=95)return 94.0;
  if(s>=85)return 91.5;if(s>=75)return 88.0;if(s>=65)return 83.0;
  if(s>=55)return 76.0;if(s>=45)return 68.0;if(s>=35)return 57.0;
  return Math.max(0,s*1.5);
}
function sectionPctCat(s){
  s=+s;
  if(s>=58)return 99;if(s>=50)return 97;if(s>=44)return 94;
  if(s>=38)return 90;if(s>=32)return 85;if(s>=26)return 75;
  if(s>=20)return 60;return Math.max(0,s*2);
}
function scoreToPercentileXat(s){
  s=+s;
  if(s>=95)return 99.9;if(s>=88)return 99.5;if(s>=82)return 99.0;
  if(s>=76)return 98.5;if(s>=70)return 97.5;if(s>=64)return 96;
  if(s>=58)return 94;if(s>=52)return 91;if(s>=46)return 87;
  if(s>=40)return 82;if(s>=34)return 75;if(s>=28)return 67;
  if(s>=22)return 56;if(s>=16)return 44;return Math.max(0,s*2.5);
}
function sectionPctXat(s){
  s=+s;if(s>=30)return 99;if(s>=26)return 97;if(s>=22)return 93;
  if(s>=18)return 87;if(s>=14)return 78;if(s>=10)return 65;return Math.max(0,s*5);
}
function scoreToPercentileSnap(s){
  s=+s;
  if(s>=52)return 99.5;if(s>=48)return 99;if(s>=44)return 97;
  if(s>=40)return 95;if(s>=36)return 92;if(s>=32)return 88;
  if(s>=28)return 83;if(s>=24)return 76;if(s>=20)return 67;
  if(s>=16)return 56;if(s>=12)return 43;return Math.max(0,s*3);
}
function scoreToPercentileNmat(s){
  s=+s;
  if(s>=320)return 99;if(s>=300)return 97;if(s>=280)return 95;
  if(s>=260)return 92;if(s>=240)return 88;if(s>=220)return 82;
  if(s>=200)return 75;if(s>=180)return 66;if(s>=160)return 55;
  if(s>=140)return 43;return Math.max(0,(s/360)*100*0.4);
}
function scoreToPercentileMahcet(s){
  s=+s;
  if(s>=170)return 99.5;if(s>=155)return 99;if(s>=140)return 97;
  if(s>=125)return 95;if(s>=110)return 91;if(s>=95)return 86;
  if(s>=80)return 79;if(s>=65)return 70;if(s>=50)return 58;
  if(s>=35)return 44;return Math.max(0,s*1.2);
}
function scoreToPercentileCmat(s){
  s=+s;
  if(s>=350)return 99.5;if(s>=320)return 99;if(s>=300)return 98;
  if(s>=280)return 97;if(s>=260)return 95;if(s>=240)return 92;
  if(s>=220)return 88;if(s>=200)return 83;if(s>=180)return 76;
  if(s>=160)return 68;if(s>=140)return 58;if(s>=120)return 46;
  return Math.max(0,(s/400)*100*0.4);
}
function scoreToPercentileOmet(s){
  s=+s;
  if(s>=155)return 98;if(s>=140)return 95;if(s>=125)return 91;
  if(s>=110)return 86;if(s>=95)return 80;if(s>=80)return 72;
  if(s>=65)return 62;if(s>=50)return 50;return Math.max(0,s*0.8);
}
function scoreToPercentileGmat(s){
  s=+s;
  if(s>=755)return 99;if(s>=715)return 96;if(s>=685)return 90;
  if(s>=655)return 82;if(s>=625)return 72;if(s>=595)return 60;
  if(s>=555)return 47;if(s>=515)return 34;if(s>=475)return 22;
  return Math.max(0,((s-205)/600)*100*0.18);
}

/* ========= COLLEGE DATABASE ========= */
// Each college: name, exams[], cutoffByExam{}, cutoffByCategory{gen,ncobc,sc,st}, fees, ctc, note, diversityBonus, workexBoost, femaleBonus
const COLLEGES = [
  // ---- CAT-primary IIMs ----
  {name:'IIM Ahmedabad',exams:['cat'],gen:{cat:99.5},ncobc:{cat:97},sc:{cat:90},st:{cat:80},fees:'₹24L',ctc:'₹35 LPA',note:'AR system — academics heavily weighted',tier:1,sectCat:85},
  {name:'IIM Bangalore',exams:['cat'],gen:{cat:99.0},ncobc:{cat:97},sc:{cat:89},st:{cat:79},fees:'₹23L',ctc:'₹34 LPA',note:'Profile-heavy; 50% weight on 10th/12th',tier:1,sectCat:80,diversityBonus:true},
  {name:'IIM Calcutta',exams:['cat'],gen:{cat:99.0},ncobc:{cat:95},sc:{cat:87},st:{cat:77},fees:'₹23L',ctc:'₹34 LPA',note:'High CAT weight; tough for GEM freshers',tier:1,sectCat:80},
  {name:'FMS Delhi',exams:['cat'],gen:{cat:99.0},ncobc:{cat:95},sc:{cat:85},st:{cat:75},fees:'₹2L',ctc:'₹32 LPA',note:'Near-zero fees; ultra-competitive',tier:1,sectCat:80},
  {name:'IIM Lucknow',exams:['cat'],gen:{cat:97.5},ncobc:{cat:90},sc:{cat:82},st:{cat:72},fees:'₹19L',ctc:'₹28 LPA',note:'Strong WAT-PI component',tier:1,sectCat:75},
  {name:'IIM Kozhikode',exams:['cat'],gen:{cat:97.0},ncobc:{cat:88},sc:{cat:80},st:{cat:70},fees:'₹20L',ctc:'₹26 LPA',note:'Diversity-friendly; non-engineer/female get bonus',tier:1,sectCat:70,diversityBonus:true},
  {name:'IIM Indore',exams:['cat'],gen:{cat:97.0},ncobc:{cat:89},sc:{cat:80},st:{cat:70},fees:'₹17L',ctc:'₹27 LPA',note:'School marks weighted heavily (76%)',tier:1,sectCat:72},
  {name:'MDI Gurgaon',exams:['cat'],gen:{cat:95.0},ncobc:{cat:87},sc:{cat:77},st:{cat:67},fees:'₹22L',ctc:'₹24 LPA',note:'Workex-friendly; drops 10/12 from 2026',tier:2,sectCat:65,workexBoost:true},
  {name:'IIM Shillong',exams:['cat'],gen:{cat:90.0},ncobc:{cat:83},sc:{cat:77},st:{cat:65},fees:'₹13L',ctc:'₹18 LPA',note:'Lowest cutoff among old IIMs',tier:2,sectCat:65},
  {name:'IIM Trichy',exams:['cat'],gen:{cat:94.0},ncobc:{cat:87},sc:{cat:78},st:{cat:68},fees:'₹13L',ctc:'₹18 LPA',note:'Part of CAP process',tier:2,sectCat:65},
  {name:'IIM Udaipur',exams:['cat'],gen:{cat:93.0},ncobc:{cat:86},sc:{cat:77},st:{cat:67},fees:'₹14L',ctc:'₹17 LPA',note:'Female diversity bonus',tier:2,sectCat:65,diversityBonus:true},
  {name:'IIM Rohtak',exams:['cat'],gen:{cat:94.0},ncobc:{cat:86},sc:{cat:76},st:{cat:66},fees:'₹14L',ctc:'₹16 LPA',note:'Female GEN called at 92–94 vs 98+ for males',tier:2,sectCat:65,femaleBonus:true},
  {name:'IIT Bombay SJMSOM',exams:['cat'],gen:{cat:96.0},ncobc:{cat:90},sc:{cat:80},st:{cat:70},fees:'₹8L',ctc:'₹26 LPA',note:'Near-IIM quality at IIT fees',tier:2,sectCat:70},
  {name:'IIT Delhi DMS',exams:['cat'],gen:{cat:95.0},ncobc:{cat:88},sc:{cat:78},st:{cat:68},fees:'₹4L',ctc:'₹22 LPA',note:'CAT + interview; engineer-friendly',tier:2,sectCat:68},
  {name:'IIFT Delhi',exams:['cat'],gen:{cat:96.0},ncobc:{cat:90},sc:{cat:80},st:{cat:70},fees:'₹17L',ctc:'₹20 LPA',note:'Specialises in International Trade; also IIFT exam',tier:2,sectCat:70},
  {name:'IMT Ghaziabad',exams:['cat','xat'],gen:{cat:88.0,xat:78.0},ncobc:{cat:80,xat:70},sc:{cat:70,xat:60},st:{cat:60,xat:50},fees:'₹18L',ctc:'₹15 LPA',note:'Good for 85–92 percentile range',tier:3,sectCat:55},
  {name:'GIM Goa',exams:['cat','xat','cmat'],gen:{cat:83.0,xat:72.0,cmat:90},ncobc:{cat:75,xat:65,cmat:82},sc:{cat:65,xat:55,cmat:72},st:{cat:55,xat:45,cmat:62},fees:'₹15L',ctc:'₹12 LPA',note:'Scenic campus; accepts CAT/XAT/CMAT',tier:3,sectCat:50},
  {name:'TAPMI Manipal',exams:['cat','xat'],gen:{cat:80.0,xat:70.0},ncobc:{cat:72,xat:62},sc:{cat:62,xat:52},st:{cat:52,xat:42},fees:'₹14L',ctc:'₹11 LPA',note:'Good profile focus; accepts CAT/XAT',tier:3,sectCat:50},
  {name:'FORE New Delhi',exams:['cat','xat'],gen:{cat:82.0,xat:72.0},ncobc:{cat:74,xat:64},sc:{cat:65,xat:55},st:{cat:55,xat:45},fees:'₹16L',ctc:'₹12 LPA',note:'Good for Delhi aspirants',tier:3,sectCat:50},
  {name:'XIMB Bhubaneswar',exams:['cat','xat'],gen:{cat:90.0,xat:80.0},ncobc:{cat:82,xat:72},sc:{cat:72,xat:62},st:{cat:62,xat:52},fees:'₹16L',ctc:'₹15 LPA',note:'Strong in Operations; prefers XAT',tier:3,sectCat:60},
  // ---- XAT-primary ----
  {name:'XLRI Jamshedpur (BM)',exams:['xat','cat'],gen:{xat:96.0,cat:98.5},ncobc:{xat:90,cat:95},sc:{xat:80,cat:85},st:{xat:70,cat:75},fees:'₹27L',ctc:'₹32 LPA',note:'Best XAT college; prefers XAT cutoff',tier:1,sectXat:70,diversityBonus:true},
  {name:'XLRI Jamshedpur (HRM)',exams:['xat','cat'],gen:{xat:93.0,cat:97.0},ncobc:{xat:87,cat:91},sc:{xat:77,cat:81},st:{xat:67,cat:71},fees:'₹26L',ctc:'₹26 LPA',note:'Best HR programme in India',tier:1,sectXat:65},
  {name:'IMI New Delhi',exams:['cat','xat'],gen:{cat:87.0,xat:75.0},ncobc:{cat:79,xat:67},sc:{cat:69,xat:57},st:{cat:59,xat:47},fees:'₹17L',ctc:'₹14 LPA',note:'Workex given good weight',tier:3,sectCat:55,workexBoost:true},
  // ---- SNAP-primary ----
  {name:'SIBM Pune',exams:['snap'],gen:{snap:99.0},ncobc:{snap:95},sc:{snap:88},st:{snap:78},fees:'₹22L',ctc:'₹20 LPA',note:'Top SNAP college; very competitive',tier:2},
  {name:'SCMHRD Pune',exams:['snap'],gen:{snap:98.0},ncobc:{snap:93},sc:{snap:85},st:{snap:75},fees:'₹20L',ctc:'₹18 LPA',note:'Strong HR & Strategy specialisations',tier:2},
  {name:'SIIB Pune',exams:['snap'],gen:{snap:94.0},ncobc:{snap:87},sc:{snap:78},st:{snap:68},fees:'₹14L',ctc:'₹12 LPA',note:'Good for International Business focus',tier:3},
  {name:'SIBM Bengaluru',exams:['snap'],gen:{snap:92.0},ncobc:{snap:84},sc:{snap:75},st:{snap:65},fees:'₹18L',ctc:'₹14 LPA',note:'Newer campus; growing placements',tier:3},
  {name:'SCIT Pune',exams:['snap'],gen:{snap:88.0},ncobc:{snap:80},sc:{snap:70},st:{snap:60},fees:'₹14L',ctc:'₹10 LPA',note:'IT Management focus',tier:3},
  // ---- NMAT-primary ----
  {name:'NMIMS Mumbai',exams:['nmat','cat'],gen:{nmat:99.0,cat:96.0},ncobc:{nmat:95,cat:90},sc:{nmat:87,cat:82},st:{nmat:77,cat:72},fees:'₹20L',ctc:'₹23 LPA',note:'Top NMAT college; Mumbai campus flagship',tier:2},
  {name:'NMIMS Bengaluru',exams:['nmat'],gen:{nmat:93.0},ncobc:{nmat:86},sc:{nmat:77},st:{nmat:67},fees:'₹17L',ctc:'₹16 LPA',note:'Good for 88–95 NMAT range',tier:3},
  {name:'NMIMS Hyderabad',exams:['nmat'],gen:{nmat:90.0},ncobc:{nmat:82},sc:{nmat:73},st:{nmat:63},fees:'₹15L',ctc:'₹13 LPA',note:'Growing campus with decent placements',tier:3},
  {name:'NMIMS Navi Mumbai',exams:['nmat'],gen:{nmat:88.0},ncobc:{nmat:80},sc:{nmat:71},st:{nmat:61},fees:'₹14L',ctc:'₹12 LPA',note:'Accessible for 83–91 NMAT range',tier:3},
  // ---- MAH-CET primary ----
  {name:'JBIMS Mumbai',exams:['mahcet','cat'],gen:{mahcet:99.5,cat:97.0},ncobc:{mahcet:98,cat:92},sc:{mahcet:92,cat:85},st:{mahcet:85,cat:78},fees:'₹3L',ctc:'₹22 LPA',note:'Lowest fees + highest ROI in Maharashtra',tier:1,diversityBonus:true},
  {name:'SIMSREE Mumbai',exams:['mahcet','cat'],gen:{mahcet:99.0,cat:95.0},ncobc:{mahcet:96,cat:88},sc:{mahcet:88,cat:80},st:{mahcet:80,cat:72},fees:'₹2L',ctc:'₹18 LPA',note:'Affordable; CAP counselling based',tier:2},
  {name:'KJ Somaiya Mumbai',exams:['mahcet','cat','cmat'],gen:{mahcet:95.0,cat:85.0,cmat:85},ncobc:{mahcet:88,cat:77,cmat:78},sc:{mahcet:78,cat:67,cmat:68},st:{mahcet:68,cat:57,cmat:58},fees:'₹10L',ctc:'₹14 LPA',note:'Accepts MAH-CET, CAT, and CMAT',tier:3},
  {name:'PUMBA Pune',exams:['mahcet'],gen:{mahcet:93.0},ncobc:{mahcet:85},sc:{mahcet:76},st:{mahcet:66},fees:'₹2L',ctc:'₹10 LPA',note:'Government college; very affordable',tier:3},
  {name:'VESIM Mumbai',exams:['mahcet','cmat'],gen:{mahcet:88.0,cmat:80},ncobc:{mahcet:80,cmat:72},sc:{mahcet:71,cmat:63},st:{mahcet:61,cmat:53},fees:'₹6L',ctc:'₹8 LPA',note:'Good for 85–92 MAH-CET range',tier:3},
  // ---- CMAT primary ----
  {name:'IFMR Chennai',exams:['cmat','cat'],gen:{cmat:95.0,cat:82.0},ncobc:{cmat:88,cat:74},sc:{cmat:79,cat:64},st:{cmat:69,cat:54},fees:'₹11L',ctc:'₹12 LPA',note:'Finance & Banking specialist school',tier:3},
  {name:'Great Lakes Chennai',exams:['cmat','cat','gmat'],gen:{cmat:90.0,cat:80.0,gmat:82},ncobc:{cmat:82,cat:72,gmat:74},sc:{cmat:73,cat:63,gmat:65},st:{cmat:63,cat:53,gmat:55},fees:'₹16L',ctc:'₹12 LPA',note:'1-yr PGPM + PGDM; workex mandatory',tier:3,workexBoost:true},
  {name:'XIME Bangalore',exams:['cat','cmat','xat'],gen:{cat:80.0,cmat:82.0,xat:68},ncobc:{cat:72,cmat:74,xat:60},sc:{cat:63,cmat:65,xat:52},st:{cat:53,cmat:55,xat:42},fees:'₹10L',ctc:'₹9 LPA',note:'Good for South India aspirants',tier:3},
  // ---- SPJIMR (accepts CAT + GMAT) ----
  {name:'SPJIMR Mumbai',exams:['cat','gmat'],gen:{cat:85.0,gmat:88},ncobc:{cat:78,gmat:80},sc:{cat:70,gmat:72},st:{cat:60,gmat:62},fees:'₹21L',ctc:'₹28 LPA',note:'Profile + essay based; workex critical',tier:2,diversityBonus:true,workexBoost:true},
  // ---- GMAT primary ----
  {name:'ISB Hyderabad',exams:['gmat','cat'],gen:{gmat:99.0,cat:99.0},ncobc:{gmat:97,cat:97},sc:{gmat:92,cat:92},st:{gmat:85,cat:85},fees:'₹40L',ctc:'₹34 LPA',note:'1-yr post-experience MBA; 5+ years WE needed',tier:1,workexBoost:true},
  {name:'IIM A PGPX',exams:['gmat','cat'],gen:{gmat:98.0,cat:99.0},ncobc:{gmat:95,cat:97},sc:{gmat:88,cat:90},st:{gmat:80,cat:80},fees:'₹32L',ctc:'₹40 LPA',note:'Executive MBA; min 5 years WE required',tier:1,workexBoost:true},
  {name:'GLIM Chennai',exams:['gmat','cmat','cat'],gen:{gmat:80.0,cmat:88.0,cat:78},ncobc:{gmat:72,cmat:80,cat:70},sc:{gmat:63,cmat:71,cat:61},st:{gmat:53,cmat:61,cat:51},fees:'₹16L',ctc:'₹11 LPA',note:'1-yr MBA option available; workex preferred',tier:3,workexBoost:true},
  // ---- OMET specific ----
  {name:'Anna University (TANCET)',exams:['omet'],gen:{omet:75.0},ncobc:{omet:65},sc:{omet:55},st:{omet:45},fees:'₹2L',ctc:'₹7 LPA',note:'TN state exam; good for Tamil Nadu aspirants',tier:3},
  {name:'KMAT Karnataka colleges',exams:['omet'],gen:{omet:70.0},ncobc:{omet:60},sc:{omet:50},st:{omet:40},fees:'₹4L',ctc:'₹7 LPA',note:'Karnataka state exam; 100+ MBA colleges',tier:3},
  {name:'ICFAI Business School',exams:['omet','cat','gmat'],gen:{omet:65.0,cat:75.0,gmat:72},ncobc:{omet:57,cat:67,gmat:64},sc:{omet:48,cat:58,gmat:55},st:{omet:38,cat:48,gmat:45},fees:'₹8L',ctc:'₹8 LPA',note:'Pan-India campuses; accepts multiple exams',tier:3},
];

/* ========= STATE ========= */
let currentExam = 'cat';
let currentScore = 120;

/* ========= EXAM SELECTION ========= */
/* ===== EXAM DROPDOWN ===== */
function toggleExamDrop() {
  const d = document.getElementById('examDropdown');
  const open = d.classList.toggle('open');
  document.getElementById('examDropToggle').setAttribute('aria-expanded', open ? 'true' : 'false');
}
function closeExamDrop() {
  const d = document.getElementById('examDropdown');
  if (d) { d.classList.remove('open'); const t = document.getElementById('examDropToggle'); if (t) t.setAttribute('aria-expanded', 'false'); }
}
function chooseExam(examId) { selectExam(examId); closeExamDrop(); }
document.addEventListener('click', e => {
  const d = document.getElementById('examDropdown');
  if (d && !d.contains(e.target)) closeExamDrop();
});

function selectExam(examId) {
  currentExam = examId;
  // update the dropdown: active option + the header display
  document.querySelectorAll('.exam-option').forEach(o => o.classList.remove('active'));
  const opt = document.querySelector('.exam-option[data-exam="' + examId + '"]');
  if (opt) {
    opt.classList.add('active');
    const ico = opt.querySelector('.exam-drop-ico').innerHTML;
    const name = opt.querySelector('.exam-opt-name').textContent;
    const range = opt.querySelector('.exam-opt-range').textContent;
    const cur = document.getElementById('examDropCurrent');
    if (cur) cur.innerHTML = '<span class="exam-drop-ico">' + ico + '</span>' +
      '<span class="exam-drop-text"><span class="exam-drop-name">' + name + '</span>' +
      '<span class="exam-drop-range">Score ' + range + '</span></span>';
  }
  const ex = EXAMS[examId];
  // Update score card
  document.getElementById('scoreCardTitle').textContent = ex.full + ' — Score Input';
  document.getElementById('scoreLabel').textContent = `${ex.unit} / ${ex.max}`;
  const slider = document.getElementById('scoreSlider');
  slider.min = ex.min; slider.max = ex.max;
  slider.value = ex.min + Math.round((ex.max-ex.min)*0.6);
  document.getElementById('sliderMin').textContent = ex.min;
  document.getElementById('sliderMid').textContent = ex.mid;
  document.getElementById('sliderMax').textContent = ex.max;
  document.getElementById('examInfoBanner').innerHTML = `<div class="exam-info-banner"><strong>${ex.name} — ${ex.full}:</strong> ${ex.info}</div>`;
  // Sectionals
  const sectWrap = document.getElementById('sectionalWrap');
  if(ex.hasSectionals){
    sectWrap.innerHTML = `
      <div style="font-size:12px;font-weight:700;color:var(--ink2);margin-bottom:10px;font-family:'Inter',sans-serif;text-transform:uppercase;letter-spacing:.06em">Sectional Scores (each out of ${ex.sectionalMax})</div>
      <div class="form-grid-3">
        ${ex.sections.map((s,i)=>`
          <div class="f-group">
            <label class="f-label">${s}</label>
            <input class="f-input" type="number" id="sect${i}" min="0" max="${ex.sectionalMax}" value="${Math.round(ex.sectionalMax*0.6)}" oninput="updateSectionals()"/>
            <span class="f-hint">≈ <span id="sectPct${i}">—</span>%ile</span>
          </div>`).join('')}
      </div>`;
    updateSectionals();
  } else {
    sectWrap.innerHTML = '';
  }
  onSlider(slider.value);
  document.getElementById('resultsSection').innerHTML = '';
}

function onSlider(val){
  val = parseFloat(val);
  currentScore = val;
  const ex = EXAMS[currentExam];
  document.getElementById('scoreDisplay').textContent = Math.round(val);
  const pct = ex.toPercentile(val);
  const pctLabel = currentExam==='gmat' ? `≈ ${pct.toFixed(0)}th Percentile` : `≈ ${pct.toFixed(1)} Percentile`;
  document.getElementById('equivPill').innerHTML = `<i class="ti ti-percentage"></i> ${pctLabel}`;
  if(currentExam==='cat') updateSectionals();
}

function updateSectionals(){
  const ex = EXAMS[currentExam];
  if(!ex.hasSectionals) return;
  let total = 0;
  ex.sections.forEach((_,i)=>{
    const inp = document.getElementById('sect'+i);
    if(!inp) return;
    const v = Math.min(Math.max(parseFloat(inp.value)||0, 0), ex.sectionalMax);
    inp.value = v;
    const pct = ex.sectionToPercentile(v);
    const el = document.getElementById('sectPct'+i);
    if(el) el.textContent = pct.toFixed(0);
    total += v;
  });
  if(total > 0 && total <= ex.max){
    document.getElementById('scoreSlider').value = total;
    document.getElementById('scoreDisplay').textContent = total;
    currentScore = total;
    const pct = ex.toPercentile(total);
    document.getElementById('equivPill').innerHTML = `<i class="ti ti-percentage"></i> ≈ ${pct.toFixed(1)} Percentile`;
  }
}

/* ========= PREDICTOR ENGINE ========= */
function runPredictor(){
  const ex = EXAMS[currentExam];
  const score = currentScore;
  const percentile = ex.toPercentile(score);
  const gender = document.getElementById('gender').value;
  const category = document.getElementById('category').value;
  const workex = parseInt(document.getElementById('workex').value);
  const background = document.getElementById('background').value;
  const tenth = parseFloat(document.getElementById('tenth').value)||0;
  const twelfth = parseFloat(document.getElementById('twelfth').value)||0;
  const grad = parseFloat(document.getElementById('grad').value)||0;
  const gaps = document.getElementById('gaps').value;

  const catKey = {general:'gen',ncobc:'ncobc',sc:'sc',st:'st',ews:'gen',pwd:'sc'}[category]||'gen';
  const profileScore = calcProfile(tenth,twelfth,grad,workex,background,gender,gaps);

  // Get sectional percentiles
  let minSectional = 100;
  let sectionalDetails = [];
  if(ex.hasSectionals){
    ex.sections.forEach((_,i)=>{
      const inp = document.getElementById('sect'+i);
      if(inp){
        const pct = ex.sectionToPercentile(parseFloat(inp.value)||0);
        sectionalDetails.push({name:ex.sections[i],pct});
        if(pct < minSectional) minSectional = pct;
      }
    });
  }

  // Filter colleges for this exam
  const relevant = COLLEGES.filter(c => c.exams.includes(currentExam));

  const dream=[], ambitious=[], safe=[];
  relevant.forEach(c=>{
    const cutoffMap = c[catKey] || c.gen;
    let cutoff = cutoffMap[currentExam];
    if(cutoff===undefined) return;

    if(gender==='female' && c.femaleBonus) cutoff -= 3;
    if(gender==='female' && c.diversityBonus) cutoff -= 1.5;
    if(background==='noneng' && c.diversityBonus) cutoff -= 1;
    if(workex>=24 && c.workexBoost) cutoff -= 2;

    const sectOk = ex.hasSectionals ? (minSectional >= (c.sectCat || c.sectXat || 60)) : true;
    const gap = percentile - cutoff;
    let chance = calcChance(gap, profileScore, sectOk, tenth, twelfth, grad);
    if(!sectOk) chance = Math.min(chance, 15);

    const entry = {...c, cutoff, chance, sectOk, gap, sectWarn: !sectOk};
    if(gap >= 1.5) safe.push(entry);
    else if(gap >= -1.5) ambitious.push(entry);
    else if(gap >= -4) dream.push(entry);
  });

  dream.sort((a,b)=>b.chance-a.chance);
  ambitious.sort((a,b)=>b.chance-a.chance);
  safe.sort((a,b)=>b.chance-a.chance);

  renderResults({ex,score,percentile,gender,category,workex,background,tenth,twelfth,grad,gaps,
    dream:dream.slice(0,4),ambitious:ambitious.slice(0,6),safe:safe.slice(0,6),
    profileScore,minSectional,sectionalDetails,catKey});

  fetchAITips({ex,percentile,gender,category,workex,background,tenth,twelfth,grad,gaps,
    dream,ambitious,safe,minSectional});
}

function calcProfile(tenth,twelfth,grad,workex,background,gender,gaps){
  let s=0;
  const avg = (tenth+twelfth+(grad>10?grad:grad*10))/3;
  if(avg>=90) s+=30; else if(avg>=85) s+=20; else if(avg>=80) s+=10; else if(avg>=75) s+=5;
  if(workex>=36) s+=20; else if(workex>=24) s+=15; else if(workex>=12) s+=10;
  if(gender==='female') s+=10;
  if(background==='noneng'||background==='doctor'||background==='law') s+=8;
  if(gaps==='none') s+=5;
  return Math.min(s,100);
}

function calcChance(gap,profile,sectOk,tenth,twelfth,grad){
  let base = gap>=3?90:gap>=2?78:gap>=1?65:gap>=0?50:gap>=-1?35:gap>=-2?22:gap>=-3?12:gap>=-4?6:2;
  const avg=(tenth+twelfth+(grad>10?grad:grad*10))/3;
  if(avg>=90) base+=8; else if(avg<75) base-=10;
  base += (profile/100)*10;
  if(!sectOk) base = Math.min(base,15);
  return Math.max(0,Math.min(95,Math.round(base)));
}

/* ========= RENDER ========= */
function renderResults(d){
  const {ex,score,percentile,gender,category,workex,background,dream,ambitious,safe,profileScore,minSectional,sectionalDetails} = d;
  const gMap={male:'Male',female:'Female',other:'Other'};
  const cMap={general:'General',ncobc:'NC-OBC',sc:'SC',st:'ST',ews:'EWS',pwd:'PwD'};
  const bMap={engineer:'Engineer',noneng:'Non-Engineer',doctor:'Doctor',law:'Law'};
  const wxLabel = workex>=48?'48+m WE':workex>=36?'37–48m WE':workex>=24?'25–36m WE':workex>=12?'12–24m WE':workex>=1?'6–12m WE':'Fresher';

  let sectAlert='';
  if(ex.hasSectionals && minSectional < 70){
    sectAlert=`<div class="alert alert-warn"><i class="ti ti-alert-triangle"></i><div><strong>Sectional Cutoff Warning!</strong> Your weakest section is at ${minSectional.toFixed(0)} percentile. Most IIMs/XLRI require 70–85+ in each section. A weak section can disqualify you even with a high overall score.</div></div>`;
  }

  const scoreUnit = currentExam==='gmat' ? score : `${score}/${ex.max}`;
  const pctDisplay = `${percentile.toFixed(currentExam==='gmat'?0:1)}%ile`;

  let sectTags = '';
  if(ex.hasSectionals && sectionalDetails.length){
    sectTags = sectionalDetails.map(s=>`<span class="profile-tag">${s.name.split(' ')[0]}: ${s.pct.toFixed(0)}%ile</span>`).join('');
  }

  const html = `
    <div class="results-wrap">
      ${sectAlert}
      <div class="profile-summary">
        <div class="profile-summary-left">
          <h4>${ex.name} — Your Profile</h4>
          <p>${gMap[gender]} · ${cMap[category]} · ${bMap[background]}</p>
          <div class="profile-tags" style="margin-top:10px">
            <span class="profile-tag">${wxLabel}</span>
            ${sectTags}
            <span class="profile-tag">Profile: ${profileScore}/100</span>
          </div>
        </div>
        <div class="profile-score-display">
          <div class="big">${pctDisplay}</div>
          <div class="lbl">${ex.name} Score ${scoreUnit}</div>
        </div>
      </div>

      ${renderSection('🌟 Dream Colleges',dream,'dream','rank-dream')}
      ${renderSection('🎯 Ambitious — Apply Now!',ambitious,'ambitious','rank-ambitious')}
      ${renderSection('✅ Safe Bets',safe,'safe','rank-safe')}

      ${(dream.length+ambitious.length+safe.length===0)?`<div class="alert alert-info"><i class="ti ti-info-circle"></i><div>No colleges found for your ${ex.name} score in our database. Try a different exam or check your score range. Some exams have limited college coverage.</div></div>`:''}

      <div class="ai-card">
        <h3><i class="ti ti-sparkles"></i> AI Strategy Analysis <span style="font-size:11px;font-weight:500;color:#7C3AED;margin-left:6px">Powered by Claude</span></h3>
        <div id="aiTipsContent">
          <div class="ai-loading">
            <div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div>
            <span style="margin-left:6px">Analysing your profile for ${ex.name}...</span>
          </div>
        </div>
      </div>
    </div>`;

  const sec = document.getElementById('resultsSection');
  sec.innerHTML = html;
  sec.scrollIntoView({behavior:'smooth',block:'start'});

  setTimeout(()=>{
    sec.querySelectorAll('.chance-bar').forEach(b=>{
      b.style.width = b.dataset.width+'%';
    });
  },200);
}

function renderSection(title, colleges, type, rankClass){
  if(!colleges.length) return '';
  return `
    <div class="colleges-section">
      <h3>${title} <span class="section-tag ${type}">${colleges.length}</span></h3>
      ${colleges.map((c,i)=>`
        <div class="college-card">
          <div class="college-rank ${rankClass}">#${i+1}</div>
          <div class="college-info">
            <div class="college-name">${c.name}</div>
            <div class="college-meta">
              <span><i class="ti ti-coin-rupee"></i>${c.fees}</span>
              <span><i class="ti ti-trending-up"></i>${c.ctc}</span>
              <span>Cutoff: ${c.cutoff.toFixed(1)}%ile</span>
            </div>
            ${c.note?`<div class="college-note">${c.note}</div>`:''}
            ${c.sectWarn?`<span class="note-pill note-warning">⚠ Sectional cutoff risk</span>`:''}
            ${(c.diversityBonus||c.femaleBonus)&&type!=='safe'?`<span class="note-pill note-diversity">✨ Diversity advantage applied</span>`:''}
          </div>
          <div class="college-right">
            <div class="college-chance">${c.chance}%</div>
            <div class="college-chance-lbl">call chance</div>
            <div class="chance-bar-wrap">
              <div class="chance-bar ${c.chance>=60?'high':c.chance>=35?'medium':'low'}" style="width:0%" data-width="${c.chance}"></div>
            </div>
          </div>
        </div>`).join('')}
    </div>`;
}

/* ========= AI TIPS ========= */
async function fetchAITips(d){
  const {ex,percentile,gender,category,workex,background,tenth,twelfth,grad,gaps,dream,ambitious,safe,minSectional} = d;
  const dreamNames = dream.slice(0,3).map(c=>c.name).join(', ')||'None in range';
  const ambNames = ambitious.slice(0,3).map(c=>c.name).join(', ')||'None in range';
  const safeNames = safe.slice(0,3).map(c=>c.name).join(', ')||'None in range';

  const prompt = `You are an MBA admissions expert at MBA Partner. A student took ${ex.name} (${ex.full}) and needs strategy advice.

Profile:
- Exam: ${ex.name}, Score Percentile: ${percentile.toFixed(1)}
- Gender: ${gender}, Category: ${category}
- Background: ${background}, Work Experience: ${workex} months
- Academics: 10th ${tenth}%, 12th ${twelfth}%, Grad ${grad}%
- Academic gaps: ${gaps}
${ex.hasSectionals ? `- Weakest sectional: ${minSectional.toFixed(0)} percentile` : ''}
- Dream colleges: ${dreamNames}
- Ambitious colleges: ${ambNames}
- Safe colleges: ${safeNames}

Give 4–5 sharp, personalised ${ex.name}-specific tips. Format each as: **[Topic]:** [advice]. Mention actual college names and percentiles. Keep each tip 1–2 sentences. No preamble.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-6',
        max_tokens:500,
        messages:[{role:'user',content:prompt}]
      })
    });
    const json = await res.json();
    const text = json.content?.[0]?.text || '';
    renderTips(text);
  } catch(e) {
    renderTips('', d);
  }
}

function renderTips(text, fallbackData){
  const el = document.getElementById('aiTipsContent');
  if(!el) return;
  let tips = [];
  if(text) {
    tips = text.split('\n').filter(t=>t.trim());
  } else if(fallbackData) {
    tips = buildFallback(fallbackData);
  }
  el.innerHTML = tips.length
    ? tips.map(t=>`<div class="ai-tip-item">${t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</div>`).join('')
    : '<div class="ai-tip-item">Unable to load AI tips. Please check your score and try again.</div>';
}

function buildFallback(d){
  const {ex,percentile,gender,background,workex,minSectional} = d;
  const tips = [];
  if(ex.hasSectionals && minSectional<75)
    tips.push(`<strong>Sectional Focus:</strong> Your weakest section is at ${minSectional.toFixed(0)} percentile — improve it before targeting top colleges, as sectional cutoffs are mandatory.`);
  if(gender==='female')
    tips.push(`<strong>Diversity Advantage:</strong> As a female candidate, you get relaxation at several colleges. Prioritise IIM Kozhikode, XLRI, SPJIMR, and JBIMS in your list.`);
  if(background==='noneng')
    tips.push(`<strong>Non-Engineer Bonus:</strong> Colleges like IIM B, XLRI, and SPJIMR actively diversify their batch — your profile stands out. Highlight this in your essays.`);
  if(workex>=24)
    tips.push(`<strong>Workex Edge:</strong> ${workex} months of experience is valuable at SPJIMR, MDI, Great Lakes, and ISB. Craft specific professional stories for your interviews.`);
  if(percentile>=95)
    tips.push(`<strong>Score Strategy:</strong> At ${percentile.toFixed(1)}%ile on ${ex.name}, apply to all dream and ambitious colleges — but invest equal effort in your PI prep, essays, and academic profile.`);
  tips.push(`<strong>Application Mix:</strong> Apply to 2 dream, 4 ambitious, and 4 safe colleges. Don't put all eggs in one basket — ${ex.name} results don't guarantee shortlists; composite scores matter.`);
  return tips.slice(0,5);
}

/* ========= INIT ========= */
selectExam('cat');
