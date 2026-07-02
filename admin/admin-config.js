/* ============================================================
   ADMIN DASHBOARD — collection definitions
   ------------------------------------------------------------
   One entry per editable section. `fields` drives both the
   add/edit form AND is used to pick sensible table columns.
   Add a new field here and the form/table pick it up automatically.
============================================================ */
const ADMIN_SECTIONS = [
  {
    key: 'courses', label: 'Courses & Pricing', icon: 'ti-shopping-bag', group: 'Commerce',
    desc: 'Every course/program shown on the Courses page — edit prices, titles, ratings and descriptions here. Changes appear on the site immediately.',
    idField: 'id',
    fields: [
      { name: 'id', label: 'Course ID (no spaces, used internally)', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true, col: true },
      { name: 'cat', label: 'Category', type: 'select', options: ['combo', 'bootcamp', 'live', 'case', 'cert'], col: true },
      { name: 'type', label: 'Type label (shown on card)', type: 'text' },
      { name: 'price', label: 'Price (₹)', type: 'number', required: true, col: true },
      { name: 'mrp', label: 'MRP / struck-through price (₹, optional)', type: 'number' },
      { name: 'off', label: 'Offer tag (e.g. "5% off", optional)', type: 'text' },
      { name: 'badge', label: 'Card badge (e.g. "Bestseller", optional)', type: 'text' },
      { name: 'rating', label: 'Rating (0-5)', type: 'number', step: '0.1', col: true },
      { name: 'students', label: 'Students count (shown next to rating)', type: 'number' },
      { name: 'level', label: 'Level (e.g. "All levels")', type: 'text' },
      { name: 'hours', label: 'Duration (e.g. "20+ hrs")', type: 'text' },
      { name: 'instr', label: 'Mentor / instructor line', type: 'text' },
      { name: 'sub', label: 'Short description (card subtitle)', type: 'textarea' },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'desc', label: 'Full description (course detail page)', type: 'textarea' },
      { name: 'img', label: 'Image path', type: 'text' }
    ]
  },
  {
    key: 'combos', label: 'Combo Bundles', icon: 'ti-stack-2', group: 'Commerce',
    desc: 'Which standalone courses make up each combo, so the site can automatically show "why this combo saves you money".',
    idField: 'comboId',
    fields: [
      { name: 'comboId', label: 'Combo course ID (must match a Course ID above)', type: 'text', required: true, col: true },
      { name: 'includes', label: 'Included course IDs (comma-separated)', type: 'csv', col: true }
    ]
  },
  {
    key: 'coupons', label: 'Coupons', icon: 'ti-discount-2', group: 'Commerce',
    desc: 'Discount codes students can enter at checkout. Turn a code off instead of deleting it to keep its history.',
    fields: [
      { name: 'code', label: 'Coupon code', type: 'text', required: true, col: true },
      { name: 'type', label: 'Discount type', type: 'select', options: ['percent', 'flat'], col: true },
      { name: 'value', label: 'Discount value (% or ₹)', type: 'number', required: true, col: true },
      { name: 'active', label: 'Active', type: 'checkbox', col: true },
      { name: 'usageLimit', label: 'Usage limit (blank = unlimited)', type: 'number' },
      { name: 'note', label: 'Internal note', type: 'text' }
    ]
  },
  {
    key: 'settings', label: 'Homepage Stats', icon: 'ti-chart-bar', group: 'Site content', singleton: true,
    desc: 'The trust numbers shown across the site (hero section, brochure, testimonials, etc.) — e.g. the "9.6/10" rating.',
    fields: [
      { name: 'heroRating', label: 'Average rating (e.g. 9.6)', type: 'text' },
      { name: 'heroRatingScale', label: 'Rating scale label (e.g. /10)', type: 'text' },
      { name: 'studentsMentored', label: 'Students mentored (e.g. 5,000+)', type: 'text' },
      { name: 'placementRate', label: 'Placement rate (e.g. 98.7%)', type: 'text' },
      { name: 'campusesReached', label: 'Campuses reached (e.g. 40+)', type: 'text' },
      { name: 'reviewsCount', label: 'Reviews count (e.g. 700+)', type: 'text' },
      { name: 'iimCallsSecured', label: 'IIM calls secured (e.g. 500+)', type: 'text' }
    ]
  },
  {
    key: 'placements', label: 'Placements Wall', icon: 'ti-trophy', group: 'Site content',
    desc: 'The placements wall on the Testimonials page.',
    fields: [
      { name: 'Name', label: 'Student name', type: 'text', required: true, col: true },
      { name: 'College', label: 'College', type: 'text', col: true },
      { name: 'Company', label: 'Company', type: 'text', col: true },
      { name: 'Batch', label: 'Batch', type: 'select', options: ['final', 'summer'], col: true },
      { name: 'Domain', label: 'Domain (optional)', type: 'text' }
    ]
  },
  {
    key: 'mentors', label: 'Mentors', icon: 'ti-users', group: 'Site content',
    desc: 'The "Meet Your Mentors" section on the home page.',
    fields: [
      { name: 'Name', label: 'Mentor name', type: 'text', required: true, col: true },
      { name: 'School', label: 'B-school', type: 'text', col: true },
      { name: 'Company', label: 'Company', type: 'text', col: true },
      { name: 'Domain', label: 'Domain', type: 'text' },
      { name: 'LinkedIn', label: 'LinkedIn URL', type: 'text' }
    ]
  },
  {
    key: 'colleges', label: 'College Collaborations', icon: 'ti-building-bank', group: 'Site content',
    desc: 'The college chips shown under "Trusted Across India\'s Top B-Schools".',
    fields: [{ name: 'Name', label: 'College name', type: 'text', required: true, col: true }]
  },
  {
    key: 'videos', label: 'Video Testimonials', icon: 'ti-video', group: 'Site content',
    desc: 'Video testimonials on the Testimonials page. Leave URL blank to show "coming soon".',
    fields: [
      { name: 'Name', label: 'Student name', type: 'text', required: true, col: true },
      { name: 'College', label: 'College', type: 'text', col: true },
      { name: 'Company', label: 'Company (optional)', type: 'text' },
      { name: 'Domain', label: 'Domain (optional)', type: 'text' },
      { name: 'VideoURL', label: 'Video URL (YouTube/Drive, optional)', type: 'text' },
      { name: 'Duration', label: 'Duration (optional)', type: 'text' }
    ]
  },
  {
    key: 'gdpi', label: 'GDPI Quotes', icon: 'ti-message-star', group: 'Site content',
    desc: 'Student quotes on the CAT/OMETs GDPI section.',
    fields: [
      { name: 'Name', label: 'Student name', type: 'text', required: true, col: true },
      { name: 'College', label: 'College', type: 'text', col: true },
      { name: 'Quote', label: 'Quote', type: 'textarea' }
    ]
  },
  {
    key: 'programs', label: 'Dashboard Programs', icon: 'ti-school', group: 'Student dashboard',
    desc: 'The catalogue of programs students can be enrolled into (student dashboard).',
    fields: [
      { name: 'ProgramCode', label: 'Program code (unique, no spaces)', type: 'text', required: true, col: true },
      { name: 'Type', label: 'Category label', type: 'text', col: true },
      { name: 'Title', label: 'Program title', type: 'text', col: true },
      { name: 'Emoji', label: 'Emoji icon', type: 'text' }
    ]
  },
  {
    key: 'sessions', label: 'Live Sessions', icon: 'ti-calendar-event', group: 'Student dashboard',
    desc: 'Upcoming live classes shown to everyone enrolled in a program.',
    fields: [
      { name: 'ProgramCode', label: 'Program code', type: 'text', required: true, col: true },
      { name: 'Day', label: 'Day (e.g. 01)', type: 'text' },
      { name: 'Month', label: 'Month (3-letter, e.g. JUL)', type: 'text' },
      { name: 'Title', label: 'Session title', type: 'text', col: true },
      { name: 'Time', label: 'Time (e.g. 6:00 PM IST)', type: 'text' },
      { name: 'Mentor', label: 'Mentor', type: 'text' },
      { name: 'Type', label: 'Session type tag', type: 'text' },
      { name: 'Soon', label: 'Show "Join Now" button', type: 'select', options: ['yes', 'no'], col: true }
    ]
  },
  {
    key: 'materials', label: 'Study Materials', icon: 'ti-files', group: 'Student dashboard',
    desc: 'Study material cards shown directly in the dashboard, per program.',
    fields: [
      { name: 'ProgramCode', label: 'Program code', type: 'text', required: true, col: true },
      { name: 'Category', label: 'Category group', type: 'text', col: true },
      { name: 'Type', label: 'File type', type: 'select', options: ['pdf', 'ppt', 'drive', 'zip', 'sheet', 'video'] },
      { name: 'Name', label: 'Resource title', type: 'text', col: true },
      { name: 'Meta', label: 'Small description', type: 'text' },
      { name: 'Link', label: 'Link (blank or # = "coming soon")', type: 'text' }
    ]
  },
  {
    key: 'students', label: 'Students', icon: 'ti-user-circle', group: 'Student dashboard',
    desc: 'Student login accounts. Passwords are visible here only — never shown on the public site.',
    admin: true,
    fields: [
      { name: 'Email', label: 'Email (login)', type: 'text', required: true, col: true },
      { name: 'Password', label: 'Password', type: 'text', required: true },
      { name: 'Name', label: 'Full name', type: 'text', col: true },
      { name: 'Role', label: 'Subtitle under name', type: 'text' },
      { name: 'Avatar', label: 'Avatar letter', type: 'text' },
      { name: 'CV_Done', label: 'CV reviews done', type: 'number' },
      { name: 'CV_Total', label: 'CV reviews included', type: 'number' },
      { name: 'PI_Done', label: 'Mock PIs done', type: 'number' },
      { name: 'PI_Total', label: 'Mock PIs included', type: 'number' },
      { name: 'GD_Done', label: 'GD rounds done', type: 'number' },
      { name: 'GD_Total', label: 'GD rounds included', type: 'number' }
    ]
  },
  {
    key: 'enrollments', label: 'Enrollments', icon: 'ti-clipboard-check', group: 'Student dashboard',
    desc: 'Which student is enrolled in which program, and their progress. One row per student per program.',
    admin: true,
    fields: [
      { name: 'Email', label: 'Student email (must match a Students row)', type: 'text', required: true, col: true },
      { name: 'ProgramCode', label: 'Program code (must match a Programs row)', type: 'text', required: true, col: true },
      { name: 'Progress', label: 'Progress % (0-100)', type: 'number', col: true },
      { name: 'NextSession', label: 'Next session name', type: 'text' },
      { name: 'NextDate', label: 'Next date', type: 'text' }
    ]
  }
];
