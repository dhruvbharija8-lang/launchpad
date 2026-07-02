/* ============================================================
   MBA PARTNER — PUBLIC SITE DATA LAYER
   ------------------------------------------------------------
   Powers the public pages (Placements wall, Mentors) from a
   Google Sheet. The client edits the sheet → the site updates.

   TO GO LIVE:
     1. Build a Google Sheet with the tabs below (see CONTENT-GUIDE.md).
     2. Publish it to the web + set link sharing to "Anyone (Viewer)".
     3. Paste its Sheet ID into SITE_SHEET.SHEET_ID and save.

   Until a SHEET_ID is set, the embedded SAMPLE data is used.

   PRIVACY: only public-safe fields live here (name, college,
   company, domain). Student emails/phone numbers are NEVER
   placed on the public site.
============================================================ */

const SITE_SHEET = {
  SHEET_ID: '',                 // <-- paste your Google Sheet ID here to go live
  TABS: {
    placements: 'Placements',   // who got placed where
    mentors:    'Mentors',      // alumni mentors
    colleges:   'Colleges',     // college collaborations / tie-ups
    videos:     'Videos',       // video testimonials
    gdpi:       'GDPI'          // CAT/OMETs GDPI-flagship students (CAT page)
  }
};

/* ---------- SAMPLE DATA (used when SHEET_ID is empty) ---------- */
/* batch: 'final' = final placements (2024-26), 'summer' = summer internships (2025-27) */
const SITE_SAMPLE = {
  placements: [
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
  ],

  mentors: [
    { Name:'Yash Gohil',     School:'IIM Ahmedabad',   Company:'Accenture Consulting', Domain:'Consulting',          LinkedIn:'https://www.linkedin.com/in/yashgohil14/' },
    { Name:'Shen Shaji',     School:'IIM Bangalore',   Company:'Media.Net',            Domain:'Product Management',  LinkedIn:'https://www.linkedin.com/in/shenshaji/' },
    { Name:'Vidhi Barolia',  School:'IIM Lucknow',     Company:'PwC US',               Domain:'Finance',            LinkedIn:'https://www.linkedin.com/in/vidhi-barolia-a555a9271/' },
    { Name:'Aadesh Gupta',   School:'IIM Mumbai',      Company:"L'Oreal",              Domain:'Marketing',          LinkedIn:'https://www.linkedin.com/in/aadesh-gupta-609528194/' },
    { Name:'Ananyo Roy',     School:'XLRI Jamshedpur', Company:'TAS',                  Domain:'HR',                 LinkedIn:'https://www.linkedin.com/in/ananyosroy/' },
    { Name:'Ashutosh Gupta', School:'IIM Lucknow',     Company:'Gulf Oil',             Domain:'Operations',         LinkedIn:'https://www.linkedin.com/in/ashutosh-gupta-iiml/' }
  ],

  colleges: [
    { Name:'IIM Ahmedabad' },   { Name:'IIM Bangalore' },  { Name:'IIM Calcutta' },
    { Name:'IIM Lucknow' },     { Name:'IIM Indore' },     { Name:'IIM Kozhikode' },
    { Name:'IIM Mumbai' },      { Name:'XLRI Jamshedpur' },{ Name:'FMS Delhi' },
    { Name:'MDI Gurgaon' },     { Name:'SPJIMR' },         { Name:'NMIMS Mumbai' },
    { Name:'JBIMS' },           { Name:'IIFT' },           { Name:'SIBM Pune' },
    { Name:'IMT Ghaziabad' },   { Name:'BITSOM' },         { Name:'GLIM Chennai' }
  ],

  videos: [
    { Name:'Mridul',   College:'IIM Calcutta',  Company:'',               Domain:'',          VideoURL:'https://drive.google.com/file/d/1O8GULMw1TSJq-BJgk1F8i7u3ywEITHeD/view', Duration:'' },
    { Name:'Jigar',    College:'IIM Amritsar',  Company:'Neesh Perfumes', Domain:'Marketing', VideoURL:'https://drive.google.com/file/d/1hdXPP9kV-flTRVH8kEq8Z75Pi2KQIRUy/view', Duration:'' },
    { Name:'Satwik',   College:'IMT Ghaziabad', Company:'',               Domain:'',          VideoURL:'https://drive.google.com/file/d/1JqSKoRcT1gQD-DCmgwf_P96p5NlcIkWV/view', Duration:'' },
    { Name:'Siddhant', College:'Delhi School of Economics',           Company:'',               Domain:'',          VideoURL:'https://drive.google.com/file/d/1DmKV0o29QQ3dMVucvhQhjgDpUOxI9PE6/view', Duration:'' },
    { Name:'Tushar',   College:'GLIM Chennai',  Company:'Caratlane',      Domain:'',          VideoURL:'https://drive.google.com/file/d/1o7WAPHo1AHYY32DfJsW2Yx46SqHEcx5H/view', Duration:'' },
    { Name:'Ananya',   College:'Welingkar',     Company:'',               Domain:'',          VideoURL:'https://drive.google.com/file/d/1oRElW0Q58PYFSrM5TDP5qzRtArVHFvOr/view', Duration:'' }
  ],

  gdpi: [
    { Name:'Sabeen',               College:'IIM Lucknow',      Quote:'Mock PIs made my final answers sharper and more confident.' },
    { Name:'Aryan Vivian',         College:'NMIMS Mumbai',     Quote:'The GDPI prep gave me structure when I needed it most.' },
    { Name:'Abhishek Rohilla',     College:'IIM Kozhikode',    Quote:'Personal feedback helped me turn every mock into progress.' },
    { Name:'Divija Bansod',        College:'IIM Lucknow',      Quote:'Mentors helped me present my story with clarity.' },
    { Name:'Rupali Priyadarshini', College:'IIM Indore',       Quote:'The practice panels made the real interview feel familiar.' },
    { Name:'Varun Gangurde',       College:'BITSOM',           Quote:'Focused prep and honest feedback improved my interview presence.' },
    { Name:'Prathamesh Mulay',     College:'NMIMS Mumbai',     Quote:'The structured mocks helped me walk in with real confidence.' },
    { Name:'Nikhil Jaiswal',       College:'JBIMS',            Quote:'The transcripts and mocks helped me prepare with direction.' },
    { Name:'Tamoghna Haldar',      College:'IIM Sambalpur',    Quote:'GD practice helped me speak with clarity and confidence.' },
    { Name:'Mrittika Mukhopadhyay',College:'XIMB',             Quote:'The feedback sessions helped me find the right words.' },
    { Name:'Satakshi Singh',       College:'SSBF',             Quote:'I could feel the difference after every mock interview.' },
    { Name:'Shivadhwaj SR',        College:'IIM Shillong',     Quote:'MBA Partner helped me refine answers without sounding rehearsed.' },
    { Name:'Aastha Jain',          College:'IIM Shillong',     Quote:'The personalized feedback made my PI prep far more effective.' },
    { Name:'Romit Banerjee',       College:'GLIM Chennai',     Quote:'The mentor feedback made my interview prep much sharper.' },
    { Name:'Kushagra Barai',       College:'IIM Mumbai',       Quote:'I learnt how to connect my profile to every answer.' },
    { Name:'Soumojit Mondal',      College:'SCMHRD',           Quote:'Consistent mock practice helped me handle pressure with ease.' },
    { Name:'Nivedha',              College:'IIM Indore',       Quote:'The GDPI prep helped me convert my calls with confidence.' },
    { Name:'Dhamo Dharan',         College:'IIT Madras',       Quote:'Structured mocks helped me stay calm under pressure.' },
    { Name:'Sandeep',              College:'IIM Bangalore',    Quote:'Their GDPI guidance helped me bring out my best points.' },
    { Name:'Srishti Mittal',       College:'NMIMS Mumbai',     Quote:'The mock panels felt so real, the actual interview was easy.' },
    { Name:'Nishtha Arora',        College:'MICA',             Quote:'I gained clarity on how to structure my PI answers effectively.' },
    { Name:'Anmisha N',            College:'IIM Lucknow',      Quote:'The GDPI course helped me tell my story with confidence.' },
    { Name:'Pranav',               College:'FMS Delhi',        Quote:'Short, focused prep sessions made a big difference.' },
    { Name:'Priya Yadav',          College:'FMS Delhi',        Quote:'Mock GDs gave me the practice I needed to stand out.' },
    { Name:'Viresh Sawant',        College:'GLIM Chennai',     Quote:'The practice and feedback loop made all the difference.' },
    { Name:'Nishita Sihag',        College:'ISME',             Quote:'Every mock session helped me get sharper and more confident.' },
    { Name:'Gaurav Sarkar',        College:'IIM Kozhikode',    Quote:'The mock feedback helped me fix gaps before the final PI.' },
    { Name:'Rudra',                College:'IIM Trichy',       Quote:'I became more confident with every mock and review.' },
    { Name:'Dev Chauhan',          College:'IIM Ahmedabad',    Quote:'Mentors helped me build a crisp, convincing interview story.' },
    { Name:'Sanjana Rai',          College:'MDI Gurgaon',      Quote:'The GDPI course gave me clarity on what panels expect.' },
    { Name:'Ayan Murmu',           College:'IIM Calcutta',     Quote:'The answer frameworks helped me communicate with impact.' },
    { Name:'Medha Rajhans',        College:'IIM Nagpur',       Quote:'Mock interviews helped me identify and improve weak areas.' },
    { Name:'Yusuf Hasan',          College:'XLRI Jamshedpur',  Quote:'The practice made my PI answers more natural and precise.' },
    { Name:'Aastha Maurya',        College:'XLRI Jamshedpur',  Quote:'Mentor feedback helped me polish my WAT and PI approach.' },
    { Name:'Sankalp Annavarpu',    College:'FMS Delhi',        Quote:'The mocks gave me confidence to handle tough follow-ups.' },
    { Name:'Piyush Kumar Jha',     College:'IIM Mumbai',       Quote:'GDPI prep helped me convert preparation into confidence.' }
  ]
};

/* ---------- ADMIN API LOADER (preferred) ---------- */
async function _fetchAdminApi() {
  const base = (typeof MBA_API_BASE !== 'undefined') ? MBA_API_BASE : '';
  const names = ['placements', 'mentors', 'colleges', 'videos', 'gdpi'];
  const results = await Promise.all(names.map(n => fetch(base + '/api/public/' + n).then(r => r.ok ? r.json() : null).catch(() => null)));
  const out = {};
  names.forEach((n, i) => { out[n] = results[i]; });
  // Only use this source if every tab loaded with at least an (possibly empty) array.
  if (names.every(n => Array.isArray(out[n]))) return out;
  return null;
}

/* ---------- GOOGLE SHEETS LOADER (gviz) — legacy fallback ---------- */
async function _fetchSiteTab(tabName) {
  const url = `https://docs.google.com/spreadsheets/d/${SITE_SHEET.SHEET_ID}` +
              `/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}`;
  const res = await fetch(url);
  const text = await res.text();
  const json = JSON.parse(text.replace(/^[\s\S]*?\(/, '').replace(/\);?\s*$/, ''));
  const cols = json.table.cols.map(c => (c.label || c.id || '').trim());
  return json.table.rows.map(row => {
    const obj = {};
    row.c.forEach((cell, i) => { obj[cols[i]] = cell ? cell.v : ''; });
    return obj;
  });
}

let _siteDataCache = null;
async function loadSiteData() {
  if (_siteDataCache) return _siteDataCache;

  // 1) Preferred: the admin-server API (edited from the admin dashboard).
  const apiData = await _fetchAdminApi();
  if (apiData) { _siteDataCache = apiData; return _siteDataCache; }

  // 2) Legacy: a directly-connected Google Sheet.
  if (!SITE_SHEET.SHEET_ID) { _siteDataCache = SITE_SAMPLE; return _siteDataCache; }
  try {
    const [placements, mentors, colleges, videos, gdpi] = await Promise.all([
      _fetchSiteTab(SITE_SHEET.TABS.placements),
      _fetchSiteTab(SITE_SHEET.TABS.mentors),
      _fetchSiteTab(SITE_SHEET.TABS.colleges),
      _fetchSiteTab(SITE_SHEET.TABS.videos),
      _fetchSiteTab(SITE_SHEET.TABS.gdpi)
    ]);
    _siteDataCache = { placements, mentors, colleges, videos, gdpi };
  } catch (err) {
    console.error('Could not load site Google Sheet — using sample data.', err);
    _siteDataCache = SITE_SAMPLE;
  }
  return _siteDataCache;
}

if (typeof module !== 'undefined') {
  module.exports = { SITE_SHEET, SITE_SAMPLE, loadSiteData };
}
