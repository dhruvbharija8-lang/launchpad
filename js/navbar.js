/* ======= ALL REAL DATA FROM mbapartner.in/testimonials ======= */
const TESTIMONIALS = [
  {
    name:'Paluk',school:'IIM Bangalore \'26',outcome:'Accenture Strategy',
    tags:['iim','consulting','liveproject'],dark:true,
    img:'https://static.wixstatic.com/media/67e5e0_d8c87affc04248eeb2694c94fd8f81b6~mv2.jpg/v1/fill/w_147,h_123,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/IMG-20250110-WA0024_edited_edited.jpg',
    quote:'Getting into IIM B was overwhelming and the anxiety began right from the 1st day of college, that\'s when I came across the MBA Partner Community. The mentors and their support was immense, not only did they help me get my CV boosted through Live Projects but their Placements Bootcamp with mentors from all cross-functional domains really shaped my SIP preparation and ultimately I landed onto my dream consulting role at Accenture Strategy.'
  },
  {
    name:'Bhaskarananda Boro',school:'IIM Bangalore \'26',outcome:'IIFL Finance — Summer Internship',
    tags:['iim','finance'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_abf371df108d43bbb25a8bffd58875a6~mv2.jpg/v1/fill/w_100,h_100,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1716187063356.jpg',
    quote:'Getting mentored directly by the Admin of MBA Partner was a blessing. His enriching experience in Finance helped me understand the nitty-gritties of it. I remember the way my CV wasn\'t getting spike points and Admin just took 30 minutes to frame it so better. The complete group of mentors really helped me preparing for my interviews and that helped me cracking IIFL Finance for my Summer Internships. Forever grateful!'
  },
  {
    name:'Dheeraj Acharya',school:'IIM Bangalore \'26',outcome:'Samsung — Product Management',
    tags:['iim','liveproject'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_85506d73279b45e4bd6e0e0e7e4c4d86~mv2.jpg/v1/fill/w_144,h_144,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1715418186294.jpg',
    quote:'MBA Partner was really a guiding step in each and every phase of my MBA first year. They not only helped me getting into my dream Prodman role at Samsung but also helped me understand the valuable ins-and-outs of MBA curriculum. Their Placements Bootcamp was always the one that saved me from having FOMO and built confidence in myself. My interview day was similar to the mock PIs and it was so much of a fun!'
  },
  {
    name:'Rutuja Thorat',school:'IIM Calcutta \'26',outcome:'Accenture Strategy — Summer Internship',
    tags:['iim','consulting'],dark:true,
    img:'https://static.wixstatic.com/media/67e5e0_f865c43808ae46e38297cfd81f39fbd3~mv2.jpg/v1/fill/w_147,h_147,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/IMG-20241218-WA0007.jpg',
    quote:'MBA Partner was always the one that cleared the information asymmetry for me. The valuable guidance of mentors, some of whom were the alums of my college only, really helped me understanding and checking my preparation level. And that helped me get into the Strategy role at Accenture for my Summer Internship, it would not have been possible without this amazing platform!'
  },
  {
    name:'Prem',school:'IIM Lucknow \'26',outcome:'Amazon — AFBP Role',
    tags:['iim','fresher'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_2582d5be02ce4699944f3de6b84e5c9e~mv2.jpg/v1/fill/w_147,h_196,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/IMG-20250111-WA0012.jpg',
    quote:'I was always wanting to join companies in Finance roles but being an engineer it looked difficult, and that\'s where MBA Partner made it easy. Their 1-on-1 mentorship sessions and Group Discussions was an amazing preparation booster and that eventually helped me to be the best version of myself during real interviews and got me into Amazon (AFBP role). Thank you, MBA Partner!'
  },
  {
    name:'Shrutika Ruia',school:'IIM Kozhikode \'26',outcome:'Summer Internship — Top Company',
    tags:['iim','liveproject'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_496ffa422ef34e23a8c436d77d4c6c16~mv2.jpg/v1/fill/w_147,h_147,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1718660255500.jpg',
    quote:'I was a part of the Placements Bootcamp which has definitely given my CV a big boost. The mentors there from old IIMs and other top B-Schools really helped getting a better preparation of Summer Internship Placements. Not only this, their quick reverts on the basic of queries always kept me motivated to dig deeper in my preparation.'
  },
  {
    name:'Varun Kamble',school:'IIM Lucknow \'26',outcome:'IIFL Finance — Summer Internship',
    tags:['iim','finance','liveproject'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_0dcbd2463f9c4b6ca4148bd2d570c80c~mv2.jpg/v1/fill/w_100,h_100,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1744196937868.jpg',
    quote:'I was looking for a Finance Project that\'s where I came across MBA Partner in a WhatsApp group and the journey sky-rocketed from then onwards. Not only the Finance Project, but the valuable domain sessions and doubt solving of Finance made me get a hang of it! And despite being an engineer, I landed into one of the Financial institutions, IIFL Finance. It was a great cherished journey!'
  },
  {
    name:'Siba Prasad',school:'IIM Kozhikode \'26',outcome:'Aditya Birla Group — GenMan Programme',
    tags:['iim','marketing'],dark:true,
    img:'https://static.wixstatic.com/media/67e5e0_0425def165204e3f90f94f84b95c944a~mv2.jpg/v1/fill/w_144,h_144,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1724787513282.jpg',
    quote:'I was quite skeptical about Summer Internship Placements. However, after enrolling into the community of MBA Partner, they not only guided me on my prep but also told me in advance what roles should I target as per my profile, and the targeted prep worked out in the end with me getting into the GenMan Programme of Aditya Birla Group, and it was a sigh of relief, really thankful to all the mentors!'
  },
  {
    name:'Ananyo',school:'XLRI Jamshedpur \'26',outcome:'TAS — Summer Internship',
    tags:['xlri','consulting','liveproject','fresher'],dark:false,
    img:null,
    quote:'Being from a Geology background it was becoming quite difficult for me to shape an MBA level CV and that\'s where MBA Partner came to my rescue. I enrolled in their Live Projects and learnt the most. Having those learnings on my CV was a booster in getting a shortlist for TAS (the most coveted company that visits XL) and here I am going to join TAS for my summer internship. Won\'t have been possible without this amazing family of mentors!'
  },
  {
    name:'Anshuman',school:'IIM Indore \'26',outcome:'Deloitte — Day 1 SIP',
    tags:['iim','consulting','liveproject'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_dee693c3eb1c4ee59e919d80fe64ba10~mv2.jpg/v1/fill/w_144,h_144,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1741633217510.jpg',
    quote:'I got my GDPI Admissions prep by the Admin of MBA Partner. Following his amazing skillset, I enrolled into all Live Projects, Case Competitions and Placements Bootcamp, and there I got a plethora of repositories and mentors who guided me the best! The mock PIs really boosted my prep and confidence and got me into Deloitte on the very first day of my Summer Internship Process.'
  },
  {
    name:'Utkarsh Gupta',school:'IIM Indore \'26',outcome:'ABFRL — Summer Internship',
    tags:['iim','marketing','fresher'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_22d88b31c28b4ce4a8c844ae06dc7095~mv2.jpg/v1/fill/w_144,h_144,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1722797021578.jpg',
    quote:'Being a fresher with family business experience, I was not really confident if I will be able to get desired placements given the batch size and profiles. However, the on point preparation and guidance alongside relevant sessions and mock PIs helped me crack the interview for ABFRL. Thanks to MBA Partner for their amazing guidance throughout.'
  },
  {
    name:'Priyanka',school:'IIM Trichy \'26',outcome:'Investment Banking — Summer Internship',
    tags:['iim','finance','liveproject','fresher'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_e10a31778197489d8d238da7e0fa92db~mv2.jpg/v1/fill/w_100,h_100,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1716273677527.jpg',
    quote:'MBA Partner was always been a backbone in my MBA journey. The mentorship here was significant in shaping my CV, as a fresher getting those valuable Live Projects and keywords that boosted my ATS score was indeed the most important step towards Summer Internship shortlists. With the support of all mentors, I landed into an IB role.'
  },
  {
    name:'Nidhi Malik',school:'IIM Shillong \'26',outcome:'Clubs & Committees + SIP',
    tags:['iim','liveproject'],dark:true,
    img:'https://static.wixstatic.com/media/67e5e0_786aab4976e3435a99fedfeea0d8227a~mv2.jpg/v1/fill/w_147,h_196,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/IMG-20250116-WA0028.jpg',
    quote:'I was in touch with Admin for my GDPI Admissions Prep and that\'s where he highlighted me the importance of Pre-MBA preparation. Enrolling into the Live Project and Case Competition was an immense learning experience — this not only helped me understand my field but also helped me clear even my clubs & committees interview. Their Placements Bootcamp was a joy of learning alongside peers and mentors from so many B-Schools.'
  },
  {
    name:'Akhil',school:'IIM Raipur \'26',outcome:'VC Firm — Summer Internship',
    tags:['iim','finance','liveproject'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_9302ab5e06fa45369a5c296157c20d14~mv2.jpg/v1/fill/w_100,h_100,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1723120380988.jpg',
    quote:'Getting into a B-School was taxing, but it was not that tough with the help of MBA Partner to get into Summer Placements. I had experience with HSBC but was still falling short of a complete one pager CV, that\'s where I took their Projects and it was genuinely a game changing experience — it not only boosted my CV but boosted my preparation as well and ultimately got me into a VC firm for my summer internship!'
  },
  {
    name:'Megha',school:'MDI Gurgaon \'26',outcome:'MakeMyTrip — Summer Internship',
    tags:['fresher','marketing','liveproject'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_5a0772e2e4594ec2b6a19df1fef0c9f9~mv2.jpg/v1/fill/w_117,h_111,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1744918790790.jpg',
    quote:'I was from a Physics background with no work experience. The fear of getting into MBA was more than the happiness but that\'s where the personal guidance of Admin supported with the Live Projects learning was of immense help in getting almost all shortlists on campus. CVs are shortlisted through ATS and that\'s where I got benefitted and ultimately landed to MMT internship. The whole SIP process became a cakewalk!'
  },
  {
    name:'Sai Santosh',school:'XLRI Delhi \'26',outcome:'PepsiCo — Summer Internship',
    tags:['xlri','marketing','fmcg'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_f4dc5fceb71e4505b5b75d2239bade0a~mv2.jpg/v1/fill/w_147,h_219,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1744043234702_edited.jpg',
    quote:'After missing XLRI J by whiskers, I wanted to leave no stone unturned for my Summer Placements, and hence enrolled into MBA Partner and more than my expectations I was really fortunate to get those late night domain sessions and doubts resolution that helped me get into one of the finest FMCG companies for my internship, PepsiCo. It was indeed a great experience!'
  },
  {
    name:'Arpita Padhi',school:'SIBM Pune \'26',outcome:'Axis Mutual Fund — Summer Internship',
    tags:['finance','liveproject','fresher'],dark:false,
    img:null,
    quote:'I enrolled for the Live Project for developing an understanding in Finance being from the Chemical Engineering background. The project not only sharpened my Financial acumen but the CV points made me get almost all Finance shortlists and I ultimately got into Axis Mutual Fund for my Summer Internship.'
  },
  {
    name:'Anik Jana',school:'SIBM Pune \'26',outcome:'HPCL Case Competition Win',
    tags:['liveproject'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_bfe2f912eb914e9fa10973bd1e8a124a~mv2.jpg/v1/fill/w_100,h_100,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1722410412828.jpg',
    quote:'I was searching for some opportunity to develop a deeper understanding of Operations before the actual MBA journey begins. The project at MBA Partner not only sharpened this axe but also through their Case Competition course they really helped me cracking some case competitions like that of HPCL.'
  },
  {
    name:'Anurag Jain',school:'NMIMS Mumbai \'26',outcome:'Top Placement via CV + Mock PIs',
    tags:['liveproject'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_9d6cebc42a7048269ccf4d38a28e494b~mv2.jpg/v1/fill/w_100,h_100,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1721144724030.jpg',
    quote:'MBA Partner always helped me getting the most out of my MBA Journey in first year. Right from boosting CV through Live Projects to giving reality checks through Mock PIs and Mock GDs, the community they have created is something that is a blessing for any MBA student.'
  },
  {
    name:'Sanya',school:'NMIMS Mumbai \'26',outcome:'Goldman Sachs — Summer Internship',
    tags:['finance'],dark:true,
    img:'https://static.wixstatic.com/media/67e5e0_dc090d2eacbb4bb098d1378c8bcabdc6~mv2.jpg/v1/fill/w_147,h_122,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/IMG-20250112-WA0072_edited_edited.jpg',
    quote:'Getting into Goldman Sachs for Summer Internship was a dream come true moment and it would not have been possible without the support of MBA Partner. Their Domain Prep for Finance along with the regular mock PIs really boosted my confidence and helped me crack GS for my SIPs.'
  },
  {
    name:'Vedika Daley',school:'XLRI Jamshedpur BM \'26',outcome:'Accenture Strategy & Consulting',
    tags:['xlri','consulting'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_51d9a2416c51424aaf09dec6a99f41c6~mv2.jpg/v1/fill/w_100,h_100,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1720388060780.jpg',
    quote:'My senior recommended me to go for MBA Placements preparation from MBA Partner and that was a game changer. With a slight chance to get into Consulting, MBA Partner made it possible and eventually with the help of mock PIs, GDs and other preparation stuff I made it to Accenture Strategy & Consulting! Thanks to the community they have built!'
  },
  {
    name:'Priyanshi Sharma',school:'MDI Gurgaon \'26',outcome:'KPMG — Big 4',
    tags:['consulting','liveproject'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_235ae32d4ca1468db395b8c8e67674b5~mv2.jpg/v1/fill/w_100,h_100,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1738057377966.jpg',
    quote:'I enrolled for a Live Project with MBA Partner where I not only learnt what HR is but also got a good opportunity to have amazing CV pointers in my profile which genuinely helped me get into one of the Big 4 firms, KPMG. The project was immensely beneficial and got me into one of the most coveted firms that comes on our campus.'
  },
  {
    name:'Gauri',school:'IIM Jammu \'26',outcome:'Summer Internship via Live Project',
    tags:['iim','liveproject'],dark:false,
    img:null,
    quote:'I came across MBA Partner on some open group. Connected with them and enrolled for the Live Project that paid off pretty well. It not only taught me the MBA curriculum in detail but also helped me acing my Summer Internship Process in a confident manner.'
  },
  {
    name:'Anjana S E',school:'IIM Trichy \'26',outcome:'Converted First Interview',
    tags:['iim','liveproject','fresher'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_75fdb9c0d07945499d53c0cab54640d4~mv2.jpg/v1/fill/w_100,h_82,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1724938462919_edited.jpg',
    quote:'My friend recommended me to boost my profile by doing MBA Partner Live Projects and that really worked. I not only got good shortlists during interviews but also was able to convert the first interview of mine due to a sound knowledge that I had already developed doing the project. Really thankful to the mentors there.'
  },
  {
    name:'Rohit Sattigeri',school:'XLRI Jamshedpur BM \'26',outcome:'First Interview Converted via ATS',
    tags:['xlri','liveproject'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_a97d23dffb7645e6bcbc7ac40f17d6da~mv2.jpg/v1/fill/w_100,h_100,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1718538669332.jpg',
    quote:'I was quite skeptical about getting good placements at an MBA college given the market condition outside. The only controllable I had was to boost my profile and that\'s where MBA Partner helped me. The ATS friendly keywords really helped me fetch the shortlist and convert one of my first interviews during SIPs.'
  },
  {
    name:'Namrata Arora',school:'IIM Lucknow \'26',outcome:'HSBC — Day 0 Company',
    tags:['iim','finance','liveproject'],dark:false,
    img:'https://static.wixstatic.com/media/67e5e0_9597d33adab440ee853c63a9b0d24d36~mv2.jpg/v1/fill/w_100,h_100,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1719018172207.jpg',
    quote:'The mentors at MBA Partner really guided me with the Live Projects and other preparation material for my Summer Internship Placements. And the edge I got in my CV owing to those great CV points were really instrumental in getting me into HSBC, one of the companies that come on Day 0 at IIM Lucknow.'
  },
];

const HOF = [
  {name:'Nishant Khandelwal',school:'IIM Ahmedabad',company:'IIM ABC Convert',quote:'Mentors helped me craft my story for GDPI — went from 10% convert chance to actually getting in.',img:'https://static.wixstatic.com/media/67e5e0_9adcddd217334ce5818c5156afc9b22a~mv2.jpg/v1/crop/x_0,y_54,w_400,h_239/fill/w_550,h_329,fp_0.50_0.50,lg_1,q_80,enc_avif,quality_auto/1743480492229.jpg'},
  {name:'Shen Shaji',school:'IIM Bangalore',company:'Media.Net — Product Mgmt',quote:'Live Projects boosted my CV and the Bootcamp shaped my SIP prep. Landed my dream PM role!',img:'https://static.wixstatic.com/media/67e5e0_44e10e2b5f034b028e21f1a59d58f4f9~mv2.jpg/v1/fill/w_550,h_329,fp_0.57_0.17,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1742217638011.jpg'},
  {name:'Rutuja Thorat',school:'IIM Calcutta',company:'Accenture Strategy',quote:'MBA Partner cleared the information asymmetry for me. Got into Accenture Strategy for my SIP.',img:'https://static.wixstatic.com/media/67e5e0_cd37e4ff87d54ce2bef947d27e341bbd~mv2.jpg/v1/crop/x_0,y_507,w_1571,h_938/fill/w_550,h_329,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG-20241218-WA0007_edited.jpg'},
];

const TICKERS=['9.6/10 Avg. Rating','5,000+ Students Mentored','98.7% Placed in Desired Domain','IIM · XLRI · FMS Mentor Schools','Live Projects Across Domains','AIR 1 Case Competition Mentor','30+ Winning Case PPTs','Real Placements. Real Stories.'];

/* Which toggle (MBA Partner / CAT-OMETs) was last selected on the homepage —
   read here so the Testimonials page shows matching content. Defaults to
   'mba' if nothing was ever picked (e.g. a direct visit to this page). */
function getPersona(){ try { return localStorage.getItem('mbaPersona') || 'mba'; } catch(e){ return 'mba'; } }

/* ===== UTILS ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.1});
function obs(root){(root||document).querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el));}
// Safety net: on some mobile browsers the IntersectionObserver can miss elements
// that are already on-screen at page load (e.g. very tall grids, or a section
// sitting right at the fold when the page first paints). Anything that's
// already visible in the viewport a moment after load gets force-revealed so
// it never stays permanently invisible.
setTimeout(()=>{
  document.querySelectorAll('.reveal:not(.in)').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight && r.bottom>0) el.classList.add('in');
  });
},700);
function stars5(){return'★★★★★';}
function initials(name){return name.trim().charAt(0).toUpperCase();}
function avHtml(t){
  const colors=['#FF8B02','#D97400','#1B2A6B','#223278','#2B3D8A'];
  const c=colors[t.name.charCodeAt(0)%colors.length];
  if(t.img) return`<img src="${t.img}" alt="${t.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='${c}'"/>`;
  return`<span>${initials(t.name)}</span>`;
}

/* TICKER */
function initTicker(){
  const inner=document.getElementById('tickerInner');
  const h=TICKERS.map(t=>`<span class="tick">${t}<span class="tick-dot"></span></span>`).join('');
  inner.innerHTML=h+h;
}

/* MARQUEE */
function mCardHtml(t,i){
  return`<div class="mcard" onclick="openLB(${i})">
    <div class="mcard-top">
      <div class="mcard-av">${avHtml(t)}</div>
      <div><div class="mcard-name">${t.name}</div><div class="mcard-school">${t.school}</div></div>
    </div>
    <div class="mcard-stars">★★★★★</div>
    <div class="mcard-q">"${t.quote}"</div>
    <div class="mcard-outcome"><i class="ti ti-arrow-right" style="font-size:12px"></i>${t.outcome}</div>
  </div>`;
}
function initMarquee(){
  const half=Math.ceil(TESTIMONIALS.length/2);
  const row1=TESTIMONIALS.slice(0,half);
  const row2=TESTIMONIALS.slice(half);
  const h1=row1.map((t,i)=>mCardHtml(t,i)).join('');
  const h2=row2.map((t,i)=>mCardHtml(t,i+half)).join('');
  document.getElementById('mtrk1').innerHTML=h1;
  document.getElementById('mtrk1b').innerHTML=h1;
  document.getElementById('mtrk2').innerHTML=h2;
  document.getElementById('mtrk2b').innerHTML=h2;
}

/* FILTER */
let activeFilter='all';
function cardHtml(t,idx){
  return`<div class="tgrid-item">
    <div class="tcard${t.dark?' dark':''}" onclick="openLB(${idx})">
      <div class="tc-top">
        <div class="tc-av">${avHtml(t)}</div>
        <div class="tc-stars">★★★★★</div>
      </div>
      <div class="tc-quote-mark">"</div>
      <div class="tc-q">${t.quote}</div>
      <div class="tc-bottom">
        <div>
          <div class="tc-name">${t.name}</div>
          <div class="tc-meta">${t.school}</div>
          <div class="tc-outcome"><i class="ti ti-briefcase" style="font-size:11px;color:var(--orange)"></i>${t.outcome}</div>
        </div>
        <div class="tc-chip">${t.school.split(' ')[0]}</div>
      </div>
    </div>
  </div>`;
}
const MOBILE_BREAKPOINT=768;
const TGRID_MOBILE_LIMIT=4;
let tgridExpanded=false;
let tgridFullList=[];
function renderGrid(filter){
  const grid=document.getElementById('tgrid');
  const empty=document.getElementById('emptyState');
  const moreBtn=document.getElementById('tgridLoadMore');
  // This hardcoded testimonial set is MBA-track content only — CAT/OMETs
  // testimonials come from the admin-managed Placements Wall / Video
  // Testimonials sections below instead (tagged with Track='cat' there).
  if(getPersona()==='cat'){
    tgridFullList=[]; tgridExpanded=false;
    grid.innerHTML=''; if(empty){empty.style.display='block'; empty.innerHTML='<p>CAT/OMETs testimonials coming soon — check the Placements Wall below.</p>';}
    if(moreBtn) moreBtn.style.display='none';
    return;
  }
  const list=filter==='all'?TESTIMONIALS.map((t,i)=>({t,i})):TESTIMONIALS.map((t,i)=>({t,i})).filter(({t})=>t.tags.includes(filter));
  tgridFullList=list;
  tgridExpanded=false;
  if(!list.length){grid.innerHTML='';empty.style.display='block';if(moreBtn)moreBtn.style.display='none';return;}
  empty.style.display='none';
  const isMobile=window.innerWidth<=MOBILE_BREAKPOINT;
  const shown=isMobile?list.slice(0,TGRID_MOBILE_LIMIT):list;
  grid.innerHTML=shown.map(({t,i})=>cardHtml(t,i)).join('');
  if(moreBtn){
    if(isMobile && list.length>TGRID_MOBILE_LIMIT){moreBtn.style.display='inline-flex';moreBtn.innerHTML='Show More <i class="ti ti-chevron-down"></i>';}
    else moreBtn.style.display='none';
  }
}
function toggleTgridExpand(){
  tgridExpanded=!tgridExpanded;
  const grid=document.getElementById('tgrid');
  const moreBtn=document.getElementById('tgridLoadMore');
  const shown=tgridExpanded?tgridFullList:tgridFullList.slice(0,TGRID_MOBILE_LIMIT);
  grid.innerHTML=shown.map(({t,i})=>cardHtml(t,i)).join('');
  if(moreBtn) moreBtn.innerHTML=tgridExpanded?'Show Less <i class="ti ti-chevron-up"></i>':'Show More <i class="ti ti-chevron-down"></i>';
}
function initFilter(){
  document.querySelectorAll('.fchip').forEach(btn=>{
    btn.onclick=()=>{
      document.querySelectorAll('.fchip').forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      activeFilter=btn.dataset.f;
      renderGrid(activeFilter);
    };
  });
}

/* PLACEMENTS WALL (dynamic, from js/site-data.js → Google Sheet) */
let PL_DATA = [];
let plFilter = 'all';
async function renderPlacements(){
  const data = await loadSiteData();
  const persona = getPersona();
  PL_DATA = (data.placements || []).filter(p => (p.Track || 'mba') === persona);
  const cnt = document.getElementById('plCount');
  if (cnt) cnt.textContent = PL_DATA.length + '+ real placements and counting.';
  drawPlacements();
  document.querySelectorAll('#plFilter .pl-chip').forEach(b=>{
    b.onclick=()=>{
      document.querySelectorAll('#plFilter .pl-chip').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      plFilter=b.dataset.b;
      drawPlacements();
    };
  });
}
function plCard(p){
  const dom = p.Domain ? `<span class="pl-dom">${p.Domain}</span>` : '';
  const co = p.Company ? `<div class="pl-co">${p.Company}</div>` : '';
  const text = `${co}<div class="pl-name">${p.Name}</div><div class="pl-college"><i class="ti ti-building-bank"></i> ${p.College}${dom}</div>`;
  // Round avatar is opt-in per record (admin's "Image" field on Placements
  // Wall). No image set = card renders exactly as before, no placeholder
  // icon or empty avatar slot shown.
  if (p.Image) {
    return `<div class="pl-card"><div class="pl-head"><img class="pl-avatar" src="${p.Image}" alt="" loading="lazy" onerror="this.style.display='none'"><div>${text}</div></div></div>`;
  }
  return `<div class="pl-card">${text}</div>`;
}


const HOF_MOBILE_LIMIT=6;
let hofExpanded=false;
let hofFullList=[];
function drawPlacements(){
  let list;
  const f = plFilter;
  if (f === 'all') {
    list = PL_DATA;
  } else if (f === 'iim') {
    list = PL_DATA.filter(p => /\bIIM\b/i.test(p.College || ''));
  } else if (f === 'xlri') {
    list = PL_DATA.filter(p => /\bXLRI\b/i.test(p.College || ''));
  } else if (f === 'consulting') {
    list = PL_DATA.filter(p => /consulting/i.test(p.Domain || ''));
  } else if (f === 'finance') {
    list = PL_DATA.filter(p => /finance/i.test(p.Domain || ''));
  } else if (f === 'marketing') {
    list = PL_DATA.filter(p => /marketing/i.test(p.Domain || ''));
  } else if (f === 'final') {
    list = PL_DATA.filter(p => String(p.Batch || '').toLowerCase() === 'final');
  } else if (f === 'summer') {
    list = PL_DATA.filter(p => String(p.Batch || '').toLowerCase() === 'summer');
  } else {
    list = PL_DATA;
  }
  hofFullList=list;
  hofExpanded=false;
  const g = document.getElementById('hofGrid');
  const moreBtn=document.getElementById('hofGridLoadMore');
  if (!g) return;
  if (!list.length) {
    const msg = plFilter === 'all' ? 'Placements coming soon for this track.' : 'No results for this filter.';
    g.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:rgba(255,255,255,.5);font-family:'Inter',sans-serif">${msg}</div>`;
    if(moreBtn) moreBtn.style.display='none';
    return;
  }
  const isMobile=window.innerWidth<=MOBILE_BREAKPOINT;
  const shown=isMobile?list.slice(0,HOF_MOBILE_LIMIT):list;
  g.innerHTML = shown.map(plCard).join('');
  if(moreBtn){
    if(isMobile && list.length>HOF_MOBILE_LIMIT){moreBtn.style.display='inline-flex';moreBtn.innerHTML='Show More <i class="ti ti-chevron-down"></i>';}
    else moreBtn.style.display='none';
  }
}
function toggleHofExpand(){
  hofExpanded=!hofExpanded;
  const g=document.getElementById('hofGrid');
  const moreBtn=document.getElementById('hofGridLoadMore');
  const shown=hofExpanded?hofFullList:hofFullList.slice(0,HOF_MOBILE_LIMIT);
  g.innerHTML=shown.map(plCard).join('');
  if(moreBtn) moreBtn.innerHTML=hofExpanded?'Show Less <i class="ti ti-chevron-up"></i>':'Show More <i class="ti ti-chevron-down"></i>';
}


/* VIDEO TESTIMONIALS (dynamic, from js/site-data.js → Google Sheet) */
function vidEmbedUrl(url){
  if(!url) return '';
  // YouTube
  let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if(m) return 'https://www.youtube.com/embed/'+m[1]+'?autoplay=1';
  // Google Drive file
  m = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if(m) return 'https://drive.google.com/file/d/'+m[1]+'/preview';
  return url;
}
function vidThumbUrl(v){
  if(v.Thumbnail) return v.Thumbnail;
  const u = v.VideoURL || '';
  let m = u.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if(m) return 'https://drive.google.com/thumbnail?id=' + m[1] + '&sz=w640';
  m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if(m) return 'https://img.youtube.com/vi/' + m[1] + '/hqdefault.jpg';
  return '';
}
function vidCard(v){
  const has = v.VideoURL && v.VideoURL !== '#';
  const dur = v.Duration ? `<span class="vid-duration">${v.Duration}</span>` : '';
  const co  = v.Company ? `<span class="vid-company"><i class="ti ti-building-bank"></i> ${v.Company}</span>` : '';
  const meta = [v.College, v.Domain].filter(Boolean).join(' · ');
  const thumb = vidThumbUrl(v);
  return `<div class="vid-card${has?'':' soon'}" ${has?`onclick="openVidLb('${vidEmbedUrl(v.VideoURL)}')"`:''}>
    <div class="vid-thumb">
      ${thumb ? `<img class="vid-thumb-img" src="${thumb}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none'">` : ''}
      ${has ? `<div class="vid-play"><i class="ti ti-player-play-filled"></i></div>` : `<div class="vid-soon-tag">Video coming soon</div>`}
      ${dur}
    </div>
    <div class="vid-body">
      ${co}
      <div class="vid-name">${v.Name}</div>
      <div class="vid-meta">${meta}</div>
    </div>
  </div>`;
}
async function renderVideoTestimonials(){
  const grid = document.getElementById('vidGrid');
  if(!grid) return;
  const data = await loadSiteData();
  const persona = getPersona();
  const vids = (data.videos||[]).filter(v=>v.Name && (v.Track || 'mba') === persona);
  grid.innerHTML = vids.length ? vids.map(vidCard).join('')
    : `<div class="empty"><i class="ti ti-video-off"></i><p style="font-family:'Inter',sans-serif;font-size:15px;color:var(--ink3)">Video testimonials coming soon.</p></div>`;
}
function openVidLb(src){
  document.getElementById('vidIframe').src = src;
  document.getElementById('vidLb').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeVidLb(){
  document.getElementById('vidIframe').src = '';
  document.getElementById('vidLb').classList.remove('open');
  document.body.style.overflow='';
}

/* LIGHTBOX */
function openLB(i){
  const t=TESTIMONIALS[i];
  const avEl=document.getElementById('lbAv');
  avEl.innerHTML=avHtml(t);
  document.getElementById('lbQ').textContent=t.quote;
  document.getElementById('lbName').textContent=t.name;
  document.getElementById('lbMeta').textContent=t.school;
  document.getElementById('lbOut').textContent=t.outcome;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLB(){document.getElementById('lb').classList.remove('open');document.body.style.overflow='';}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLB();closeVidLb();}});

/* MOBILE NAV */
// NOTE: the mobile-menu button itself is wired by js/site-nav.js (the single
// source of truth for the shared navbar — it injects the canonical nav and
// attaches the open/close click handler). This file used to ALSO attach a
// second, duplicate click handler here, which caused the menu to open and
// immediately close again on every tap (both handlers fired on one click,
// toggling the same class twice). closeMobileNav() is kept since other
// on-page links may still reference it.
function closeMobileNav(){
  const nav=document.getElementById('mobileNav');
  if(nav) nav.classList.remove('open');
}

/* INIT */
initTicker();
initMarquee();
renderGrid('all');
renderPlacements();
renderVideoTestimonials();
initFilter();
obs();
