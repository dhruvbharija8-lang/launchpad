/* ============================================================
   MBA PARTNER — CAT / OMETs PORTAL
   ------------------------------------------------------------
   Every section below is sheet-driven. The dummy data in
   CAT_SAMPLE is a placeholder; the moment you create the tabs
   in a Google Sheet and paste its ID into CAT_SHEET.SHEET_ID,
   the site reads the real content and replaces the dummy.

   Sheet tabs (column headers shown in CONTENT-GUIDE.md):
     CAT_Materials · CAT_Mocks · CAT_Questions · CAT_Leaderboard
     CAT_GDPI · CAT_DomainQA · CAT_Mentors · CAT_Pricing
   ============================================================ */

const CAT_SHEET = {
  SHEET_ID: '',     // <-- paste your Google Sheet ID here to go live
  TABS: {
    materials:'CAT_Materials', mocks:'CAT_Mocks', questions:'CAT_Questions', pyq:'CAT_PYQ',
    leaderboard:'CAT_Leaderboard', gdpi:'CAT_GDPI', domainqa:'CAT_DomainQA',
    mentors:'CAT_Mentors', pricing:'CAT_Pricing'
  }
};

/* ---------------- DUMMY FALLBACK (replace via the sheet) ---------------- */
const CAT_SAMPLE = {
  materials: [
    { Section:'VARC', Title:'Aristotle RC — Tricks & Tips', Meta:'Free RC technique guide', Type:'pdf',   Link:'#' },
    { Section:'VARC', Title:'Free Sectional Mocks (50)',     Meta:'50 timed sectionals',     Type:'mock',  Link:'#' },
    { Section:'VARC', Title:'Para-jumbles Masterclass',      Meta:'Video walkthrough',       Type:'video', Link:'#' },
    { Section:'QA',   Title:'Quant Formula Booklet',         Meta:'Every formula in one PDF',Type:'pdf',   Link:'#' },
    { Section:'LRDI', Title:'LRDI Set Bank',                 Meta:'200+ practice sets',      Type:'pdf',   Link:'#' },
    { Section:'VARC', Title:'Daily RC Practice',             Meta:'A fresh RC every day',    Type:'pdf',   Link:'#' }
  ],
  // 8 exams covered — used to power the exam dropdown on Mock Tests & PYQ.
  exams: ['CAT','XAT','SNAP','NMAT','MAH-CET','IIFT','CMAT','TISSNET'],
  mocks: [
    { MockID:'varc-1',   Exam:'CAT',     Title:'VARC Mock 1',            Section:'VARC', Duration:40, Status:'live',   Attempts:1240, Note:'' },
    { MockID:'qa-1',     Exam:'CAT',     Title:'QA Mock 1',              Section:'QA',   Duration:40, Status:'coming', Attempts:0,    Note:'Coming live on 28th June' },
    { MockID:'lrdi-1',   Exam:'CAT',     Title:'LRDI Mock 1',            Section:'LRDI', Duration:40, Status:'coming', Attempts:0,    Note:'Coming soon' },
    { MockID:'varc-2',   Exam:'CAT',     Title:'VARC Sectional 2',       Section:'VARC', Duration:40, Status:'coming', Attempts:0,    Note:'Coming soon' },
    { MockID:'full-1',   Exam:'CAT',     Title:'Full-Length Mock 1',     Section:'Full', Duration:120,Status:'coming', Attempts:0,    Note:'Coming soon' },
    { MockID:'xat-1',    Exam:'XAT',     Title:'XAT Verbal + Decision Making', Section:'VARC+DM', Duration:65, Status:'coming', Attempts:0, Note:'Coming soon' },
    { MockID:'snap-1',   Exam:'SNAP',    Title:'SNAP QA + DI Mock 1',    Section:'QA+DI',Duration:60, Status:'coming', Attempts:0,    Note:'Coming soon' },
    { MockID:'nmat-1',   Exam:'NMAT',    Title:'NMAT Language Skills Mock 1', Section:'Language', Duration:28, Status:'coming', Attempts:0, Note:'Coming soon' },
    { MockID:'mahcet-1', Exam:'MAH-CET', Title:'MAH-CET Verbal Ability Mock 1', Section:'Verbal', Duration:36, Status:'coming', Attempts:0, Note:'Coming soon' },
    { MockID:'iift-1',   Exam:'IIFT',    Title:'IIFT General Awareness Mock 1', Section:'GK', Duration:40, Status:'coming', Attempts:0, Note:'Coming soon' },
    { MockID:'cmat-1',   Exam:'CMAT',    Title:'CMAT Quant Aptitude Mock 1', Section:'QA', Duration:45, Status:'coming', Attempts:0, Note:'Coming soon' },
    { MockID:'tissnet-1',Exam:'TISSNET', Title:'TISSNET English Proficiency Mock 1', Section:'English', Duration:40, Status:'coming', Attempts:0, Note:'Coming soon' }
  ],
  // questions for the one live demo mock (varc-1). Correct = A/B/C/D.
  questions: [
    { MockID:'varc-1', Q:'Which word is closest in meaning to “ubiquitous”?', OptionA:'Rare', OptionB:'Everywhere', OptionC:'Hidden', OptionD:'Ancient', Correct:'B', Solution:'Ubiquitous means present everywhere.' },
    { MockID:'varc-1', Q:'Pick the correctly punctuated sentence.', OptionA:'Its raining today.', OptionB:'It’s raining, today', OptionC:'It’s raining today.', OptionD:'Its’ raining today.', Correct:'C', Solution:'“It’s” = it is; period ends the sentence.' },
    { MockID:'varc-1', Q:'Para-jumble: the opening sentence is usually…', OptionA:'A specific example', OptionB:'A general/independent statement', OptionC:'A pronoun reference', OptionD:'A conclusion', Correct:'B', Solution:'Openers are typically general, standalone statements.' },
    { MockID:'varc-1', Q:'Choose the antonym of “meticulous”.', OptionA:'Careless', OptionB:'Precise', OptionC:'Thorough', OptionD:'Diligent', Correct:'A', Solution:'Meticulous = careful; antonym is careless.' },
    { MockID:'varc-1', Q:'In an RC, the “tone” of the author refers to…', OptionA:'The length of the passage', OptionB:'The author’s attitude', OptionC:'The number of paragraphs', OptionD:'The vocabulary level', Correct:'B', Solution:'Tone = the author’s attitude toward the subject.' }
  ],
  // Previous Year Questions — real past-paper practice, grouped by exam/year/section.
  pyq: [
    { Exam:'CAT', Year:'2024', Section:'VARC', Title:'CAT 2024 VARC — Slot 1', Meta:'24 Qs · Full solutions', MockID:'pyq-cat24-varc-s1', Link:'' },
    { Exam:'CAT', Year:'2024', Section:'VARC', Title:'CAT 2024 VARC — Slot 2', Meta:'24 Qs · Full solutions', MockID:'pyq-cat24-varc-s2', Link:'' },
    { Exam:'CAT', Year:'2024', Section:'QA',   Title:'CAT 2024 Quant — Slot 1', Meta:'22 Qs · Full solutions', MockID:'pyq-cat24-qa-s1', Link:'' },
    { Exam:'CAT', Year:'2024', Section:'LRDI', Title:'CAT 2024 LRDI — Slot 1', Meta:'20 Qs · Full solutions', MockID:'pyq-cat24-lrdi-s1', Link:'' },
    { Exam:'CAT', Year:'2023', Section:'VARC', Title:'CAT 2023 VARC — Slot 1', Meta:'24 Qs · Full solutions', MockID:'pyq-cat23-varc-s1', Link:'' },
    { Exam:'CAT', Year:'2023', Section:'QA',   Title:'CAT 2023 Quant — Slot 1', Meta:'22 Qs · Full solutions', MockID:'pyq-cat23-qa-s1', Link:'' },
    { Exam:'CAT', Year:'2023', Section:'LRDI', Title:'CAT 2023 LRDI — Slot 1', Meta:'20 Qs · Full solutions', MockID:'pyq-cat23-lrdi-s1', Link:'' },
    { Exam:'CAT', Year:'2022', Section:'VARC', Title:'CAT 2022 VARC — Slot 1', Meta:'24 Qs · Full solutions', MockID:'pyq-cat22-varc-s1', Link:'' },
    { Exam:'XAT', Year:'2024', Section:'VARC', Title:'XAT 2024 Verbal Ability', Meta:'26 Qs · Full solutions', MockID:'', Link:'#' },
    { Exam:'SNAP',Year:'2024', Section:'QA',   Title:'SNAP 2024 Quant & DI', Meta:'30 Qs · Full solutions', MockID:'', Link:'#' }
  ],
  leaderboard: [
    { Rank:1, Name:'Aarav S.',   College:'IIM Lucknow',   Score:'48/50', Mock:'VARC Mock 1' },
    { Rank:2, Name:'Diya M.',    College:'NMIMS Mumbai',  Score:'47/50', Mock:'VARC Mock 1' },
    { Rank:3, Name:'Kabir N.',   College:'FMS Delhi',     Score:'46/50', Mock:'VARC Mock 1' },
    { Rank:4, Name:'Isha R.',    College:'IIM Indore',    Score:'45/50', Mock:'VARC Mock 1' },
    { Rank:5, Name:'Rohan T.',   College:'XLRI',          Score:'44/50', Mock:'VARC Mock 1' },
    { Rank:6, Name:'Sara K.',    College:'MDI Gurgaon',   Score:'43/50', Mock:'VARC Mock 1' },
    { Rank:7, Name:'Veer P.',    College:'SPJIMR',        Score:'42/50', Mock:'VARC Mock 1' },
    { Rank:8, Name:'Anya G.',    College:'IIM Kozhikode', Score:'41/50', Mock:'VARC Mock 1' }
  ],
  gdpi: [
    { Type:'PI',         Title:'Mock PI — Consulting Track',     Meta:'IIM alumni panel',          Link:'#' },
    { Type:'PI',         Title:'Mock PI — Finance Track',        Meta:'Ex-IB / Big 4 panel',       Link:'#' },
    { Type:'GD',         Title:'GD — ESG & Sustainability',      Meta:'Live group discussion',     Link:'#' },
    { Type:'GD',         Title:'GD — Indian Economy',            Meta:'Live group discussion',     Link:'#' },
    { Type:'Transcript', Title:'IIM A — PI Transcript 2024',     Meta:'Past-year transcript',      Link:'#' },
    { Type:'Transcript', Title:'XLRI — GD/PI Transcript 2024',   Meta:'Past-year transcript',      Link:'#' }
  ],
  domainqa: [
    { Domain:'Finance',    Title:'Finance Q&A Bank',    Meta:'200+ interview questions', Link:'#' },
    { Domain:'Marketing',  Title:'Marketing Q&A Bank',  Meta:'Frameworks + questions',   Link:'#' },
    { Domain:'Consulting', Title:'Consulting Q&A Bank', Meta:'Case + guesstimate Qs',    Link:'#' },
    { Domain:'Operations', Title:'Operations Q&A Bank', Meta:'Core concept questions',   Link:'#' },
    { Domain:'HR',         Title:'HR Q&A Bank',         Meta:'Behavioural + HR theory',  Link:'#' }
  ],
  mentors: [
    { Name:'Ananya K.',  School:'IIM Ahmedabad', Converted:'CAT 99.8%ile', Domain:'Consulting', LinkedIn:'#' },
    { Name:'Rohan M.',   School:'XLRI Jamshedpur',Converted:'XAT 99.4%ile', Domain:'Finance',    LinkedIn:'#' },
    { Name:'Sneha T.',   School:'FMS Delhi',      Converted:'CAT 99.6%ile', Domain:'Marketing',  LinkedIn:'#' },
    { Name:'Aditya P.',  School:'IIM Bangalore',  Converted:'CAT 99.5%ile', Domain:'Product',    LinkedIn:'#' }
  ],
  pricing: [
    { Plan:'Free Material',   Price:'0',    Period:'free',     Features:'Aristotle RC tricks|50 free sectionals|Quant formula booklet', Badge:'' },
    { Plan:'Mock Test Series',Price:'1999', Period:'one-time', Features:'VARC + QA + LRDI mocks|Detailed solutions|Leaderboard access',  Badge:'' },
    { Plan:'GDPI Flagship',   Price:'4999', Period:'one-time', Features:'10 mock PIs|10 mock GDs|100+ past transcripts|Domain Q&A prep', Badge:'Bestseller' }
  ]
};

/* ---------------- LOADER ----------------
   Primary source is this site's own admin dashboard (/api/public/cat*) —
   whatever the admin edits/creates there shows up here automatically.
   The Google Sheet path below still works if you ever set a SHEET_ID,
   and CAT_SAMPLE is the last-resort fallback if neither is reachable
   (e.g. viewing the site offline / API down). */
async function _catTab(tab){
  const url = `https://docs.google.com/spreadsheets/d/${CAT_SHEET.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tab)}`;
  const res = await fetch(url); const text = await res.text();
  const json = JSON.parse(text.replace(/^[\s\S]*?\(/,'').replace(/\);?\s*$/,''));
  const cols = json.table.cols.map(c=>(c.label||c.id||'').trim());
  return json.table.rows.map(r=>{const o={};r.c.forEach((c,i)=>o[cols[i]]=c?c.v:'');return o;});
}
const CAT_API = {
  materials:'catMaterials', mocks:'catMocks', pyq:'catPyq',
  leaderboard:'catLeaderboard', gdpi:'catGdpi', domainqa:'catDomainQA',
  mentors:'catMentors'
};
let _catCache=null;
async function loadCatData(){
  if(_catCache) return _catCache;

  if(CAT_SHEET.SHEET_ID){
    try{
      const t=CAT_SHEET.TABS;
      const [materials,mocks,questions,pyq,leaderboard,gdpi,domainqa,mentors,pricing]=await Promise.all([
        _catTab(t.materials),_catTab(t.mocks),_catTab(t.questions),_catTab(t.pyq),_catTab(t.leaderboard),
        _catTab(t.gdpi),_catTab(t.domainqa),_catTab(t.mentors),_catTab(t.pricing)
      ]);
      _catCache={materials,mocks,questions,pyq,leaderboard,gdpi,domainqa,mentors,pricing,exams:CAT_SAMPLE.exams};
      return _catCache;
    }catch(e){ console.error('CAT sheet load failed — trying the admin dashboard instead.',e); }
  }

  try{
    // The frontend (Vercel) and backend API (Render) live on different
    // domains — a bare relative fetch('/api/...') hits the frontend's own
    // domain and 404s silently, which is exactly why newly admin-added
    // papers never showed up here: this always fell back to CAT_SAMPLE.
    const base=(typeof MBA_API_BASE!=='undefined'&&MBA_API_BASE)||'';
    const keys=Object.keys(CAT_API);
    const results=await Promise.all(keys.map(k=>fetch(base+'/api/public/'+CAT_API[k]).then(r=>{
      if(!r.ok) throw new Error('bad response for '+CAT_API[k]);
      return r.json();
    })));
    const data={}; keys.forEach((k,i)=>data[k]=results[i]);

    // Pricing cards used to come from their own separate 'catPricing'
    // collection/admin-section — that's now merged into 'courses' (Track:cat,
    // ids free-material/mock-test-series/gdpi-flagship), same single source
    // the rest of the site (courses.html, cat-enroll.html) already reads
    // from. Any course tagged Track:cat + category bootcamp/gdpi shows up
    // here automatically, no separate section to keep in sync.
    const coursesRes=await fetch(base+'/api/public/courses');
    if(!coursesRes.ok) throw new Error('bad response for courses');
    const allCourses=await coursesRes.json();
    data.pricing=(Array.isArray(allCourses)?allCourses:[])
      .filter(c=>c.Track==='cat' && (c.cat==='bootcamp'||c.cat==='gdpi'))
      .map(c=>({
        _id:c.id, Plan:c.title, Price:c.price, Period:c.type||'', Badge:c.badge||'',
        Features:String(c.featsText||'').split('\n').map(s=>s.trim()).filter(Boolean).join('|')
      }));

    data.exams=CAT_SAMPLE.exams;
    _catCache=data;
  }catch(e){
    console.warn('CAT admin API not reachable — using built-in sample data.',e);
    _catCache=CAT_SAMPLE;
  }
  return _catCache;
}

/* A mock/PYQ with a Deadline in the past is treated as no longer available. */
function isCatExpired(entry){
  if(!entry || !entry.Deadline) return false;
  const d=new Date(entry.Deadline+'T23:59:59');
  return !isNaN(d.getTime()) && d.getTime() < Date.now();
}

/* ---------------- RENDER ---------------- */
const MAT_ICON={pdf:'ti-file-text',video:'ti-video',mock:'ti-clipboard-list',drive:'ti-brand-google-drive'};
function _h(id){return document.getElementById(id);}
let CAT_DATA=null;

function renderMaterials(d){
  const el=_h('catMaterials'); if(!el)return;
  el.innerHTML=d.materials.map(m=>{
    const has=m.Link&&m.Link!=='#';
    return `<div class="cp-card" ${has?`onclick="window.open('${m.Link}','_blank')"`:''}>
      <span class="cp-sec-tag">${m.Section}</span>
      <div class="cp-ico"><i class="ti ${MAT_ICON[(m.Type||'').toLowerCase()]||'ti-file-text'}"></i></div>
      <div class="cp-card-title">${m.Title}</div>
      <div class="cp-card-meta">${m.Meta||''}</div>
      <div class="cp-card-act">${has?'<i class="ti ti-external-link"></i> Open / Download':'<i class="ti ti-clock"></i> Coming soon'}</div>
    </div>`;}).join('');
}
let mockExamFilter='all';
function renderMocks(d){
  const el=_h('catMocks'); if(!el)return;
  const exams=['all',...(d.exams||[...new Set(d.mocks.map(m=>m.Exam).filter(Boolean))])];
  const selEl=_h('catMockExamSelect');
  if(selEl){
    selEl.innerHTML=exams.map(x=>`<option value="${x}" ${x===mockExamFilter?'selected':''}>${x==='all'?'All exams':x}</option>`).join('');
    selEl.onchange=()=>{ mockExamFilter=selEl.value; renderMocks(d); };
  }
  const list=mockExamFilter==='all'?d.mocks:d.mocks.filter(m=>m.Exam===mockExamFilter);
  el.innerHTML=list.map(m=>{
    const live=String(m.Status).toLowerCase()==='live';
    const expired=isCatExpired(m);
    const usable=live&&!expired;
    const metaText=expired?'Deadline passed':(live?`${(m.Attempts||0).toLocaleString('en-IN')} attempts`:(m.Note||'Coming soon'));
    return `<div class="cp-mock${usable?'':' soon'}">
      <div class="cp-mock-top"><span class="cp-sec-tag">${m.Exam?m.Exam+' · ':''}${m.Section}</span><span class="cp-mock-dur"><i class="ti ti-clock"></i> ${m.Duration} min</span></div>
      <div class="cp-mock-title">${m.Title}</div>
      <div class="cp-mock-meta">${metaText}</div>
      ${usable?`<button class="cp-mock-btn" onclick="startMock('${m.MockID}')"><i class="ti ti-player-play"></i> Start mock</button>`
             :`<button class="cp-mock-btn ghost" disabled>${expired?'Deadline passed':(m.Note||'Coming soon')}</button>`}
    </div>`;}).join('') || '<p style="color:var(--ink3);font-family:Inter,sans-serif;font-size:13px">No mocks for this exam yet.</p>';
}
/* ---------------- PYQ (Previous Year Questions) ---------------- */
let pyqFilter='all';
let pyqExamFilter='all';
function renderPyq(d){
  const el=_h('catPyq'); if(!el)return;
  const list=(d.pyq||[]);

  // Exam dropdown
  const exams=['all',...(d.exams||[...new Set(list.map(p=>p.Exam).filter(Boolean))])];
  const selEl=_h('catPyqExamSelect');
  if(selEl){
    selEl.innerHTML=exams.map(x=>`<option value="${x}" ${x===pyqExamFilter?'selected':''}>${x==='all'?'All exams':x}</option>`).join('');
    selEl.onchange=()=>{ pyqExamFilter=selEl.value; pyqFilter='all'; renderPyq(d); };
  }
  const byExam=pyqExamFilter==='all'?list:list.filter(p=>p.Exam===pyqExamFilter);

  // Year chips (scoped to the currently selected exam)
  const years=['all',...new Set(byExam.map(p=>p.Year))].sort().reverse();
  const chipsEl=_h('catPyqFilters');
  if(chipsEl){
    chipsEl.innerHTML=years.map(y=>`<button class="cp-pyq-chip ${y===pyqFilter?'on':''}" data-y="${y}">${y==='all'?'All years':y}</button>`).join('');
    chipsEl.querySelectorAll('.cp-pyq-chip').forEach(b=>b.onclick=()=>{ pyqFilter=b.dataset.y; renderPyq(d); });
  }
  const filtered=pyqFilter==='all'?byExam:byExam.filter(p=>p.Year===pyqFilter);
  el.innerHTML=filtered.map(p=>{
    const expired=isCatExpired(p);
    // PdfUrl (admin upload) also counts as an openable paper, alongside the legacy Link field.
    const pdf=p.PdfUrl&&p.PdfUrl!=='';
    const has=(p.Link&&p.Link!=='#'&&p.Link!=='')||pdf;
    const playable=!!p.MockID&&!expired;
    const openUrl=pdf?p.PdfUrl:p.Link;
    let action='';
    if(playable) action=`onclick="startMock('${p.MockID}')"`;
    else if(has&&!expired) action=`onclick="openPyqPdf('${openUrl}')"`;
    let actLabel='<i class="ti ti-clock"></i> Coming soon';
    if(expired) actLabel='<i class="ti ti-lock"></i> Deadline passed';
    else if(playable) actLabel='<i class="ti ti-player-play"></i> Attempt now';
    else if(has) actLabel='<i class="ti ti-external-link"></i> Open / Download';
    return `<div class="cp-card" ${action}>
      <span class="cp-sec-tag">${p.Exam} ${p.Year} · ${p.Section}</span>
      <div class="cp-ico"><i class="ti ${playable?'ti-player-play':'ti-file-text'}"></i></div>
      <div class="cp-card-title">${p.Title}</div>
      <div class="cp-card-meta">${p.Meta||''}</div>
      <div class="cp-card-act">${actLabel}</div>
    </div>`;
  }).join('') || '<p style="color:var(--ink3);font-family:Inter,sans-serif;font-size:13px">No past papers for this year yet.</p>';
}

function renderLeaderboard(d){
  const el=_h('catLeaderboard'); if(!el)return;
  el.innerHTML=`<table class="cp-lb"><thead><tr><th>#</th><th>Name</th><th>College</th><th>Mock</th><th>Score</th></tr></thead><tbody>${
    d.leaderboard.map(r=>`<tr><td><span class="cp-rank r${r.Rank<=3?r.Rank:''}">${r.Rank}</span></td><td>${r.Name}</td><td>${r.College}</td><td>${r.Mock}</td><td class="cp-score">${r.Score}</td></tr>`).join('')
  }</tbody></table>`;
}
function renderGdpi(d){
  const el=_h('catGdpi'); if(!el)return;
  el.innerHTML=d.gdpi.map(g=>{const has=g.Link&&g.Link!=='#';
    return `<div class="cp-card" ${has?`onclick="window.open('${g.Link}','_blank')"`:''}>
      <span class="cp-sec-tag">${g.Type}</span>
      <div class="cp-card-title">${g.Title}</div>
      <div class="cp-card-meta">${g.Meta||''}</div>
      <div class="cp-card-act">${has?'<i class="ti ti-external-link"></i> Open':'<i class="ti ti-clock"></i> Coming soon'}</div>
    </div>`;}).join('');
}
function renderDomainQA(d){
  const el=_h('catDomainQA'); if(!el)return;
  el.innerHTML=d.domainqa.map(q=>{const has=q.Link&&q.Link!=='#';
    return `<div class="cp-card" ${has?`onclick="window.open('${q.Link}','_blank')"`:''}>
      <span class="cp-sec-tag">${q.Domain}</span>
      <div class="cp-card-title">${q.Title}</div>
      <div class="cp-card-meta">${q.Meta||''}</div>
      <div class="cp-card-act">${has?'<i class="ti ti-external-link"></i> Open':'<i class="ti ti-clock"></i> Coming soon'}</div>
    </div>`;}).join('');
}
function renderMentors(d){
  const el=_h('catMentors'); if(!el)return;
  el.innerHTML=d.mentors.map(m=>`<div class="cp-mentor">
    <div class="cp-mentor-av">${(m.Name||'?').trim().charAt(0)}</div>
    <div class="cp-mentor-name">${m.Name}</div>
    <div class="cp-mentor-school">${m.School}</div>
    <div class="cp-mentor-conv"><i class="ti ti-rosette"></i> ${m.Converted||''}</div>
    <div class="cp-mentor-dom">${m.Domain||''}</div>
  </div>`).join('');
}
function renderPricing(d){
  const el=_h('catPricing'); if(!el)return;
  const slugify=s=>String(s||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  el.innerHTML=d.pricing.map(p=>{
    const free=String(p.Price)==='0';
    // Paid plans go to the dedicated CAT/OMETs Enroll & Refer page (pulls this
    // same plan list live, so any admin edit here shows up there too) —
    // the free plan has no checkout, so it just calls for details.
    const href=free?'tel:+917042732092':`cat-enroll.html?course=${encodeURIComponent(slugify(p.Plan))}`;
    return `<div class="cp-price${p.Badge?' feat':''}">
      ${p.Badge?`<span class="cp-price-badge">${p.Badge}</span>`:''}
      <div class="cp-price-plan">${p.Plan}</div>
      <div class="cp-price-amt">${free?'Free':'₹'+Number(p.Price).toLocaleString('en-IN')}<span>${free?'':'/'+ (p.Period||'')}</span></div>
      <ul class="cp-price-feats">${String(p.Features||'').split('|').filter(Boolean).map(f=>`<li><i class="ti ti-check"></i> ${f}</li>`).join('')}</ul>
      <a class="cp-price-btn" href="${href}">${free?'Start free':'Enroll now'}</a>
    </div>`;}).join('');
}

/* ---------------- LOGIN GATE ----------------
   Nothing here — no mock, no PYQ (interactive or plain PDF) — should be
   reachable without a logged-in session. Returns true and lets the caller
   proceed if logged in; otherwise sends the visitor to login.html and
   remembers where to send them back to afterwards. */
function requireCatLogin(afterUrl){
  let loggedIn=false;
  try { loggedIn=(window.MBAauth && MBAauth.isLoggedIn()) || !!localStorage.getItem('mbaPartnerSession'); } catch(e){}
  if(loggedIn) return true;
  alert('Please log in first to access mock tests and PYQs.');
  try { if(window.MBAauth) MBAauth.setReturn(afterUrl); } catch(e){}
  window.location.href='login.html';
  return false;
}

/* ---------------- MOCK PLAYER ----------------
   "Start mock" launches the full CAT-style exam engine (mock-exam.html)
   — sectional timer, question palette, and a detailed results/
   leaderboard screen — instead of the old plain-question popup. */
function startMock(id){
  // Mock tests carry a Status/Duration; PYQ papers are attemptable the moment
  // they have a MockID (no "coming soon" gate needed for those).
  const mock=(CAT_DATA.mocks||[]).find(m=>m.MockID===id);
  const pyq=(CAT_DATA.pyq||[]).find(p=>p.MockID===id);
  const entry=mock||pyq;
  if(mock && String(mock.Status||'').toLowerCase()!=='live'){ alert('This mock is coming soon.'); return; }
  if(!entry){ alert('This is coming soon.'); return; }
  if(isCatExpired(entry)){ alert('The deadline for this test has passed.'); return; }
  const dur=Number(entry.Duration)||40;
  const name=encodeURIComponent(entry.Title||'CAT Mock');
  const url=`mock-exam.html?mock=${encodeURIComponent(id)}&name=${name}&dur=${dur}`;
  if(!requireCatLogin(url)) return;
  window.location.href=url;
}

/* PYQ papers that are just a plain PDF (no MockID/interactive set) still
   need the same login gate before opening. */
function openPyqPdf(url){
  if(!requireCatLogin(location.href)) return;
  window.open(url,'_blank');
}

/* ---------------- INIT ---------------- */
(async function(){
  CAT_DATA=await loadCatData();
  renderMaterials(CAT_DATA); renderMocks(CAT_DATA); renderPyq(CAT_DATA); renderLeaderboard(CAT_DATA);
  renderGdpi(CAT_DATA); renderDomainQA(CAT_DATA); renderMentors(CAT_DATA); renderPricing(CAT_DATA);
})();
