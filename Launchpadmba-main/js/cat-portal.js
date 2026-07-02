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
    materials:'CAT_Materials', mocks:'CAT_Mocks', questions:'CAT_Questions',
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
  mocks: [
    { MockID:'varc-1',  Title:'VARC Mock 1',        Section:'VARC', Duration:40, Status:'live',   Attempts:1240, Note:'' },
    { MockID:'qa-1',    Title:'QA Mock 1',          Section:'QA',   Duration:40, Status:'coming', Attempts:0,    Note:'Coming live on 28th June' },
    { MockID:'lrdi-1',  Title:'LRDI Mock 1',        Section:'LRDI', Duration:40, Status:'coming', Attempts:0,    Note:'Coming soon' },
    { MockID:'varc-2',  Title:'VARC Sectional 2',   Section:'VARC', Duration:40, Status:'coming', Attempts:0,    Note:'Coming soon' },
    { MockID:'full-1',  Title:'Full-Length Mock 1', Section:'Full', Duration:120,Status:'coming', Attempts:0,    Note:'Coming soon' },
    { MockID:'omet-1',  Title:'SNAP / NMAT / XAT Mock 1', Section:'OMET', Duration:60, Status:'coming', Attempts:0, Note:'Coming soon' }
  ],
  // questions for the one live demo mock (varc-1). Correct = A/B/C/D.
  questions: [
    { MockID:'varc-1', Q:'Which word is closest in meaning to “ubiquitous”?', OptionA:'Rare', OptionB:'Everywhere', OptionC:'Hidden', OptionD:'Ancient', Correct:'B', Solution:'Ubiquitous means present everywhere.' },
    { MockID:'varc-1', Q:'Pick the correctly punctuated sentence.', OptionA:'Its raining today.', OptionB:'It’s raining, today', OptionC:'It’s raining today.', OptionD:'Its’ raining today.', Correct:'C', Solution:'“It’s” = it is; period ends the sentence.' },
    { MockID:'varc-1', Q:'Para-jumble: the opening sentence is usually…', OptionA:'A specific example', OptionB:'A general/independent statement', OptionC:'A pronoun reference', OptionD:'A conclusion', Correct:'B', Solution:'Openers are typically general, standalone statements.' },
    { MockID:'varc-1', Q:'Choose the antonym of “meticulous”.', OptionA:'Careless', OptionB:'Precise', OptionC:'Thorough', OptionD:'Diligent', Correct:'A', Solution:'Meticulous = careful; antonym is careless.' },
    { MockID:'varc-1', Q:'In an RC, the “tone” of the author refers to…', OptionA:'The length of the passage', OptionB:'The author’s attitude', OptionC:'The number of paragraphs', OptionD:'The vocabulary level', Correct:'B', Solution:'Tone = the author’s attitude toward the subject.' }
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

/* ---------------- LOADER (gviz) ---------------- */
async function _catTab(tab){
  const url = `https://docs.google.com/spreadsheets/d/${CAT_SHEET.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tab)}`;
  const res = await fetch(url); const text = await res.text();
  const json = JSON.parse(text.replace(/^[\s\S]*?\(/,'').replace(/\);?\s*$/,''));
  const cols = json.table.cols.map(c=>(c.label||c.id||'').trim());
  return json.table.rows.map(r=>{const o={};r.c.forEach((c,i)=>o[cols[i]]=c?c.v:'');return o;});
}
let _catCache=null;
async function loadCatData(){
  if(_catCache) return _catCache;
  if(!CAT_SHEET.SHEET_ID){ _catCache=CAT_SAMPLE; return _catCache; }
  try{
    const t=CAT_SHEET.TABS;
    const [materials,mocks,questions,leaderboard,gdpi,domainqa,mentors,pricing]=await Promise.all([
      _catTab(t.materials),_catTab(t.mocks),_catTab(t.questions),_catTab(t.leaderboard),
      _catTab(t.gdpi),_catTab(t.domainqa),_catTab(t.mentors),_catTab(t.pricing)
    ]);
    _catCache={materials,mocks,questions,leaderboard,gdpi,domainqa,mentors,pricing};
  }catch(e){ console.error('CAT sheet load failed — using sample data.',e); _catCache=CAT_SAMPLE; }
  return _catCache;
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
function renderMocks(d){
  const el=_h('catMocks'); if(!el)return;
  el.innerHTML=d.mocks.map(m=>{
    const live=String(m.Status).toLowerCase()==='live';
    return `<div class="cp-mock${live?'':' soon'}">
      <div class="cp-mock-top"><span class="cp-sec-tag">${m.Section}</span><span class="cp-mock-dur"><i class="ti ti-clock"></i> ${m.Duration} min</span></div>
      <div class="cp-mock-title">${m.Title}</div>
      <div class="cp-mock-meta">${live?`${(m.Attempts||0).toLocaleString('en-IN')} attempts`:(m.Note||'Coming soon')}</div>
      ${live?`<button class="cp-mock-btn" onclick="startMock('${m.MockID}')"><i class="ti ti-player-play"></i> Start mock</button>`
             :`<button class="cp-mock-btn ghost" disabled>${m.Note||'Coming soon'}</button>`}
    </div>`;}).join('');
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
  el.innerHTML=d.pricing.map(p=>{
    const free=String(p.Price)==='0';
    return `<div class="cp-price${p.Badge?' feat':''}">
      ${p.Badge?`<span class="cp-price-badge">${p.Badge}</span>`:''}
      <div class="cp-price-plan">${p.Plan}</div>
      <div class="cp-price-amt">${free?'Free':'₹'+Number(p.Price).toLocaleString('en-IN')}<span>${free?'':'/'+ (p.Period||'')}</span></div>
      <ul class="cp-price-feats">${String(p.Features||'').split('|').filter(Boolean).map(f=>`<li><i class="ti ti-check"></i> ${f}</li>`).join('')}</ul>
      <a class="cp-price-btn" href="tel:+917042732092">${free?'Start free':'Enroll now'}</a>
    </div>`;}).join('');
}

/* ---------------- MOCK PLAYER (demo; client-side scoring) ---------------- */
let MOCK={id:null,qs:[],timer:null,left:0};
function startMock(id){
  const qs=(CAT_DATA.questions||[]).filter(q=>q.MockID===id);
  const mock=(CAT_DATA.mocks||[]).find(m=>m.MockID===id)||{};
  if(!qs.length){ alert('This mock is coming soon.'); return; }
  MOCK={id,qs,timer:null,left:(Number(mock.Duration)||40)*60};
  const body=_h('mockBody');
  body.innerHTML=`<div class="mock-q-list">${qs.map((q,i)=>`
    <div class="mock-q">
      <div class="mock-q-head">Q${i+1}. ${q.Q}</div>
      ${['A','B','C','D'].map(opt=>`<label class="mock-opt"><input type="radio" name="q${i}" value="${opt}"> <b>${opt}.</b> ${q['Option'+opt]}</label>`).join('')}
    </div>`).join('')}</div>
    <button class="mock-submit" onclick="submitMock()">Submit mock</button>`;
  _h('mockTitle').textContent=mock.Title||'Mock';
  _h('mockModal').classList.add('open'); document.body.style.overflow='hidden';
  tickMock();
}
function tickMock(){
  const t=_h('mockTimer');
  function fmt(s){const m=Math.floor(s/60),x=s%60;return m+':'+String(x).padStart(2,'0');}
  if(t)t.textContent=fmt(MOCK.left);
  MOCK.timer=setInterval(()=>{ MOCK.left--; if(t)t.textContent=fmt(Math.max(MOCK.left,0)); if(MOCK.left<=0){clearInterval(MOCK.timer);submitMock();} },1000);
}
function submitMock(){
  if(MOCK.timer)clearInterval(MOCK.timer);
  let correct=0;
  const rev=MOCK.qs.map((q,i)=>{
    const sel=(document.querySelector(`input[name="q${i}"]:checked`)||{}).value||'—';
    const ok=sel===q.Correct; if(ok)correct++;
    return `<div class="mock-rev ${ok?'ok':'no'}"><div class="mock-q-head">Q${i+1}. ${q.Q}</div>
      <div class="mock-rev-line">Your answer: <b>${sel}</b> · Correct: <b>${q.Correct}</b></div>
      <div class="mock-rev-sol">${q.Solution||''}</div></div>`;
  }).join('');
  _h('mockBody').innerHTML=`<div class="mock-result">
      <div class="mock-score">${correct}<span>/${MOCK.qs.length}</span></div>
      <div class="mock-score-lbl">Your score</div>
    </div>${rev}
    <p class="mock-note">Demo scoring runs in the browser. On the live site, scoring &amp; the leaderboard run securely server-side (answers stay hidden until you submit).</p>`;
}
function closeMock(){ if(MOCK.timer)clearInterval(MOCK.timer); _h('mockModal').classList.remove('open'); document.body.style.overflow=''; }

/* ---------------- INIT ---------------- */
(async function(){
  CAT_DATA=await loadCatData();
  renderMaterials(CAT_DATA); renderMocks(CAT_DATA); renderLeaderboard(CAT_DATA);
  renderGdpi(CAT_DATA); renderDomainQA(CAT_DATA); renderMentors(CAT_DATA); renderPricing(CAT_DATA);
})();
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMock();});
