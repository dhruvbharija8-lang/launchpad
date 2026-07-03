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

const COLLEGES = ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Indore', 'IIM Kozhikode',
  'IIM Mumbai', 'XLRI Jamshedpur', 'FMS Delhi', 'MDI Gurgaon'].map(Name => ({ Name }));

const VIDEOS = [
  { Name: 'Mridul', College: 'IIM Calcutta', Company: '', Domain: '', VideoURL: 'https://drive.google.com/file/d/1O8GULMw1TSJq-BJgk1F8i7u3ywEITHeD/view', Duration: '' }
];

const GDPI = [
  { Name: 'Sabeen', College: 'IIM Lucknow', Quote: 'Mock PIs made my final answers sharper and more confident.' }
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
    hallOfFame: HALL_OF_FAME, freeSessions: FREE_SESSIONS
  };
  let changed = false;
  Object.keys(DEFAULTS).forEach(key => {
    if (!(key in data)) {
      data[key] = withIds(DEFAULTS[key]);
      changed = true;
      console.log('Backfilled missing collection:', key);
    }
  });
  if (changed) db.writeAll(data);
}

if (require.main === module) {
  run(process.argv.includes('--force'));
}

module.exports = { run, backfillMissingCollections };
