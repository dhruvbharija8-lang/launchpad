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
      { name: 'Track', label: 'Show on which toggle?', type: 'select', options: ['mba', 'cat'], col: true },
      { name: 'title', label: 'Title', type: 'text', required: true, col: true },
      { name: 'cat', label: 'Category', type: 'select', options: ['combo', 'bootcamp', 'live', 'case', 'cert', 'gdpi'], col: true },
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
      { name: 'img', label: 'Image path', type: 'text' },
      { name: 'featsText', label: 'Feature bullets on detail page (one per line)', type: 'textarea' },
      { name: 'curriculumText', label: 'Curriculum modules on detail page (one per line — format: Module title | short description)', type: 'textarea' },
      { name: 'compCvSlots', label: 'Comparison table: CV review slots', type: 'text' },
      { name: 'compMockPIs', label: 'Comparison table: Mock PI / GD sessions', type: 'text' },
      { name: 'compLiveProject', label: 'Comparison table: Live project', type: 'text' },
      { name: 'compCasePrep', label: 'Comparison table: Case competition prep', type: 'text' },
      { name: 'compCanva', label: 'Comparison table: Canva Pro', type: 'text' },
      { name: 'compCertificate', label: 'Comparison table: Completion certificate', type: 'text' }
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
    key: 'leads', label: 'Enquiries', icon: 'ti-message-2', group: 'Leads & Applications',
    desc: 'Everyone who submitted an enquiry form on the homepage, the brochure page, or the chatbot. Read-only from the visitor side — only you can see this list.',
    fields: [
      { name: 'Name', label: 'Name', type: 'text', col: true },
      { name: 'Email', label: 'Email', type: 'text', col: true },
      { name: 'Phone', label: 'Phone', type: 'text', col: true },
      { name: 'College', label: 'College / Target B-School', type: 'text', col: true },
      { name: 'Message', label: 'Message', type: 'textarea' },
      { name: 'Source', label: 'Where it came from', type: 'text', col: true },
      { name: 'submittedAt', label: 'Submitted at', type: 'text', col: true }
    ]
  },
  {
    key: 'mentorApplications', label: 'Mentor Applications', icon: 'ti-user-plus', group: 'Leads & Applications',
    desc: 'Everyone who applied to be a mentor from the homepage "Apply to be a mentor" form.',
    fields: [
      { name: 'Name', label: 'Name', type: 'text', col: true },
      { name: 'Email', label: 'Email', type: 'text', col: true },
      { name: 'School', label: 'B-School / Company', type: 'text', col: true },
      { name: 'VideoLink', label: '60-second intro video link', type: 'text' },
      { name: 'Why', label: 'Why they want to mentor', type: 'textarea' },
      { name: 'submittedAt', label: 'Submitted at', type: 'text', col: true }
    ]
  },
  {
    key: 'collegeCollabLeads', label: 'College Collab Requests', icon: 'ti-building-bank', group: 'Leads & Applications',
    desc: 'Everyone who filled the College Collaboration form. (This also still emails you and opens WhatsApp — this is just the backup record.)',
    fields: [
      { name: 'College', label: 'College name', type: 'text', col: true },
      { name: 'ContactName', label: 'Contact person', type: 'text', col: true },
      { name: 'Designation', label: 'Designation', type: 'text' },
      { name: 'Email', label: 'Email', type: 'text', col: true },
      { name: 'Phone', label: 'Phone', type: 'text', col: true },
      { name: 'City', label: 'City', type: 'text' },
      { name: 'State', label: 'State', type: 'text' },
      { name: 'BatchSize', label: 'Approx. batch size', type: 'text' },
      { name: 'Need', label: 'What they need', type: 'textarea' },
      { name: 'submittedAt', label: 'Submitted at', type: 'text', col: true }
    ]
  },
  {
    key: 'orders', label: 'Checkout Orders', icon: 'ti-shopping-cart', group: 'Leads & Applications',
    desc: 'Everyone who completed the checkout flow (cart → Pay Now) on the main site.',
    fields: [
      { name: 'Name', label: 'Name', type: 'text', col: true },
      { name: 'Email', label: 'Email', type: 'text', col: true },
      { name: 'Phone', label: 'Phone', type: 'text', col: true },
      { name: 'College', label: 'College', type: 'text' },
      { name: 'Items', label: 'Items purchased', type: 'text', col: true },
      { name: 'ItemIds', label: 'Item course IDs (internal — used to auto-link the student dashboard)', type: 'text' },
      { name: 'Total', label: 'Total (₹)', type: 'number', col: true },
      { name: 'Coupon', label: 'Coupon used', type: 'text' },
      { name: 'submittedAt', label: 'Submitted at', type: 'text', col: true }
    ]
  },
  {
    key: 'enrollmentRequests', label: 'Enroll Page Signups', icon: 'ti-user-check', group: 'Leads & Applications',
    desc: 'Everyone who filled the solo or friend/group enrollment form on the enroll page.',
    fields: [
      { name: 'Type', label: 'Type', type: 'select', options: ['solo', 'group'], col: true },
      { name: 'Course', label: 'Course', type: 'text', col: true },
      { name: 'CourseId', label: 'Course ID (internal — used to auto-link the student dashboard)', type: 'text' },
      { name: 'Name', label: 'Name (member 1)', type: 'text', col: true },
      { name: 'Email', label: 'Email (member 1)', type: 'text', col: true },
      { name: 'Phone', label: 'Phone (member 1)', type: 'text', col: true },
      { name: 'College', label: 'College (member 1)', type: 'text' },
      { name: 'Name2', label: 'Name (member 2, if group)', type: 'text' },
      { name: 'Email2', label: 'Email (member 2, if group)', type: 'text' },
      { name: 'Phone2', label: 'Phone (member 2, if group)', type: 'text' },
      { name: 'College2', label: 'College (member 2, if group)', type: 'text' },
      { name: 'CouponUsed', label: 'Coupon used', type: 'text' },
      { name: 'submittedAt', label: 'Submitted at', type: 'text', col: true }
    ]
  },
  {
    key: 'coupons', label: 'Coupons', icon: 'ti-discount-2', group: 'Commerce',
    desc: 'Discount codes students can enter at checkout. Turn a code off instead of deleting it to keep its history. For an offline/manual payment: set Discount to 100% (or a flat amount equal to the price), set "Restrict to student email" to their email, and give them the code — checkout auto-detects ₹0 and skips Razorpay entirely, granting access immediately, no manual dashboard updates needed. Add codes one at a time, or bulk-import many at once from Excel below (e.g. one-off codes for a batch of offline-payment students).',
    bulkImport: { itemLabel: 'coupon', keepAddButton: true },
    fields: [
      { name: 'code', label: 'Coupon code', type: 'text', required: true, col: true },
      { name: 'type', label: 'Discount type', type: 'select', options: ['percent', 'flat'], col: true },
      { name: 'value', label: 'Discount value (% or ₹)', type: 'number', required: true, col: true },
      { name: 'courseIds', label: 'Restrict to specific course(s) (optional — leave all unchecked to allow on any course)', type: 'multiref', refCollection: 'courses', refValue: 'id', refLabel: r => r.title, col: true },
      { name: 'restrictedEmail', label: 'Restrict to student email (optional — only this email can use the code; e.g. for an offline-payment student)', type: 'text', col: true },
      { name: 'active', label: 'Active', type: 'checkbox', col: true },
      { name: 'usageLimit', label: 'Usage limit (blank = unlimited)', type: 'number' },
      { name: 'note', label: 'Internal note', type: 'text' }
    ]
  },
  {
    key: 'settings', label: 'Homepage Stats', icon: 'ti-chart-bar', group: 'Site content', singleton: true,
    desc: 'The trust numbers shown across the site (hero section, brochure, testimonials, etc.) — e.g. the "9.6/10" rating. Also includes site-wide link destinations (WhatsApp, Telegram, social, contact) — change one here and every button using it updates everywhere on the site.',
    fields: [
      { name: 'heroRating', label: 'Average rating (e.g. 9.6)', type: 'text' },
      { name: 'heroRatingScale', label: 'Rating scale label (e.g. /10)', type: 'text' },
      { name: 'studentsMentored', label: 'Students mentored (e.g. 5,000+)', type: 'text' },
      { name: 'placementRate', label: 'Placement rate (e.g. 98.7%)', type: 'text' },
      { name: 'campusesReached', label: 'Campuses reached (e.g. 40+)', type: 'text' },
      { name: 'reviewsCount', label: 'Reviews count (e.g. 700+)', type: 'text' },
      { name: 'iimCallsSecured', label: 'IIM calls secured (e.g. 500+)', type: 'text' },
      { name: 'whatsappCommunity', label: 'WhatsApp Community URL (used across the whole site)', type: 'text' },
      { name: 'telegramCommunity', label: 'Telegram Channel URL (used across the whole site)', type: 'text' },
      { name: 'catWhatsappCommunity', label: 'CAT/OMETs WhatsApp Community URL (leave blank to reuse the main one)', type: 'text' },
      { name: 'catTelegramCommunity', label: 'CAT/OMETs Telegram Community URL (leave blank to reuse the main one)', type: 'text' },
      { name: 'enrolledWhatsappGroup', label: 'Enrolled Students WhatsApp Group URL (shown in dashboard only to students who\'ve purchased a course)', type: 'text' },
      { name: 'freeResourcesHub', label: 'Free Resources hub URL (older, mostly unused now that Brochure/Compendium/Sample CV each have their own link below)', type: 'text' },
      { name: 'brochureUrl', label: 'Free Material — Brochure Drive folder URL (nav dropdown)', type: 'text' },
      { name: 'compendiumUrl', label: 'Free Material — Compendium Drive folder URL (nav dropdown)', type: 'text' },
      { name: 'sampleCvUrl', label: 'Free Material — Sample CV Drive folder URL (nav dropdown)', type: 'text' },
      { name: 'instagramUrl', label: 'Instagram URL', type: 'text' },
      { name: 'linkedinUrl', label: 'LinkedIn URL', type: 'text' },
      { name: 'youtubeUrl', label: 'YouTube URL', type: 'text' },
      { name: 'testimonialsExternalUrl', label: 'External testimonials link (footer)', type: 'text' },
      { name: 'phone', label: 'Contact phone number (e.g. +91 70427 32092)', type: 'text' },
      { name: 'email', label: 'Contact email address', type: 'text' }
    ]
  },
  {
    key: 'placements', label: 'Placements Wall', icon: 'ti-trophy', group: 'Site content',
    desc: 'The placements wall on the Testimonials page. Add rows one at a time, or bulk-import many at once from Excel below.',
    bulkImport: { itemLabel: 'placement', keepAddButton: true },
    fields: [
      { name: 'Track', label: 'Show on which toggle?', type: 'select', options: ['mba', 'cat'], col: true },
      { name: 'Name', label: 'Student name', type: 'text', required: true, col: true },
      { name: 'College', label: 'College', type: 'text', col: true },
      { name: 'Company', label: 'Company', type: 'text', col: true },
      { name: 'Batch', label: 'Batch', type: 'select', options: ['final', 'summer'], col: true },
      { name: 'Domain', label: 'Domain (optional)', type: 'text' },
      { name: 'Image', label: 'Avatar image URL (optional — leave blank for now, card shows unchanged without it)', type: 'text' }
    ]
  },
  {
    key: 'collabTestimonials', label: 'College Collab Testimonials', icon: 'ti-quote', group: 'Site content',
    desc: '"Hear from Students & Campus Coordinators" cards on the College Collaboration page.',
    fields: [
      { name: 'Name', label: 'Name', type: 'text', required: true, col: true },
      { name: 'Role', label: 'Role / College (e.g. "IIM Raipur · Placed in Consulting")', type: 'text', required: true, col: true },
      { name: 'Quote', label: 'Testimonial quote', type: 'textarea', required: true },
      { name: 'Rating', label: 'Star rating (1-5)', type: 'number', col: true },
      { name: 'Avatar', label: 'Avatar letter (optional, defaults to first letter of name)', type: 'text' }
    ]
  },
  {
    key: 'collabColleges', label: 'College Collab — Partner Campuses', icon: 'ti-building-bank', group: 'Site content',
    desc: '"Trusted Across India\'s Top B-Schools" grid + scrolling marquee on the College Collaboration page. NOT the same list as the "Colleges" section below.',
    fields: [
      { name: 'Name', label: 'College name', type: 'text', required: true, col: true },
      { name: 'City', label: 'City', type: 'text', required: true, col: true },
      { name: 'Badge', label: 'Status badge (e.g. "Active")', type: 'text', col: true }
    ]
  },
  {
    key: 'mentors', label: 'Mentors', icon: 'ti-users', group: 'Site content',
    desc: 'The "Meet Your Mentors" section on the home page. Add rows one at a time, or bulk-import many at once from Excel below.',
    bulkImport: { itemLabel: 'mentor', keepAddButton: true },
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
      { name: 'Track', label: 'Show on which toggle?', type: 'select', options: ['mba', 'cat'], col: true },
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
    desc: 'Student quotes on the CAT/OMETs GDPI section (also shown as testimonials for the CAT toggle). Add rows one at a time, or bulk-import many at once from Excel below.',
    bulkImport: { itemLabel: 'quote', keepAddButton: true },
    fields: [
      { name: 'Name', label: 'Student name', type: 'text', required: true, col: true },
      { name: 'College', label: 'College', type: 'text', col: true },
      { name: 'Quote', label: 'Quote', type: 'textarea' }
    ]
  },
  {
    key: 'hallOfFame', label: 'Hall of Fame Spotlight', icon: 'ti-award', group: 'Site content',
    desc: 'The 3 photo+quote spotlight stories at the top of the homepage\'s Hall of Fame section (the highlight reel — separate from the bulk Placements Wall). Add rows one at a time, or bulk-import from Excel below.',
    bulkImport: { itemLabel: 'story', keepAddButton: true },
    fields: [
      { name: 'Name', label: 'Student name', type: 'text', required: true, col: true },
      { name: 'School', label: 'B-school', type: 'text', col: true },
      { name: 'Company', label: 'Company / outcome', type: 'text', col: true },
      { name: 'Quote', label: 'Quote', type: 'textarea', required: true },
      { name: 'Photo', label: 'Photo URL', type: 'text' },
      { name: 'LinkedIn', label: 'LinkedIn profile URL', type: 'text', desc: 'Full profile link, e.g. https://www.linkedin.com/in/username. Leave blank to hide the LinkedIn icon.' }
    ]
  },
  {
    key: 'freeSessions', label: 'Free Sessions (YouTube)', icon: 'ti-brand-youtube', group: 'Site content',
    desc: 'The free YouTube masterclass cards shown under "Free Session" — pick which toggle (MBA Partner or CAT/OMETs) each video belongs to. Both sides can be edited independently here.',
    fields: [
      { name: 'Persona', label: 'Show on which toggle?', type: 'select', options: ['mba', 'cat'], required: true, col: true },
      { name: 'Title', label: 'Video title', type: 'text', required: true, col: true },
      { name: 'YouTubeURL', label: 'YouTube URL', type: 'text', required: true, col: true }
    ]
  },
  {
    key: 'programs', label: 'Dashboard Programs', icon: 'ti-school', group: 'Student dashboard',
    desc: 'The catalogue of programs students can be enrolled into (student dashboard).',
    fields: [
      { name: 'ProgramCode', label: 'Program code (unique, no spaces)', type: 'text', required: true, col: true },
      { name: 'Type', label: 'Category label', type: 'text', col: true },
      { name: 'Title', label: 'Program title', type: 'text', col: true },
      { name: 'Emoji', label: 'Not used anymore — the dashboard now always auto-picks a matching icon from the title/category, ignore this field', type: 'text' },
      { name: 'StatType', label: 'Overview stats to show for this program', type: 'select', options: ['bootcamp', 'live', 'case', 'cert', 'gdpi', 'combo'], col: true }
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
    desc: 'One row per course (already pre-created for every course — just click its row and drop in the Drive link(s), all in one place). A Live Project course instead shows as several rows, one per domain — e.g. "Live Project — 1 Domain, 1 Month — Marketing", "...— Finance" and so on — the Course column already tells you which domain each row is for, so just open the one you want to update. A student only ever sees the domain row matching what they picked at checkout. Add rows one at a time, or bulk-import many at once from Excel below (ProgramCode must exactly match a course id from "Courses & Pricing"; separate multiple drive links in one row with a | character).',
    bulkImport: { itemLabel: 'materials row', keepAddButton: true },
    fields: [
      { name: 'ProgramCode', label: 'Course', type: 'ref', refCollection: 'courses', refValue: 'id', refLabel: r => `${r.title} — ${r.id}`, required: true, col: true },
      { name: 'Domain', label: 'Domain (leave blank unless this row is for a specific Live Project domain)', type: 'select', options: ['', 'operations', 'marketing', 'hr', 'finance', 'consulting', 'product'] },
      { name: 'Category', label: 'Internal label shown to students as the section name (optional — auto-filled for Live Project domain rows)', type: 'text' },
      { name: 'driveLinks', label: 'Drive links (add as many as you like for this course/domain)', type: 'linklist', col: true }
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
      { name: 'GD_Total', label: 'GD rounds included', type: 'number' },
      { name: 'Live_Project_Progress', label: 'Live project progress (%)', type: 'number' },
      { name: 'Case_Done', label: 'Case comp rounds done', type: 'number' },
      { name: 'Case_Total', label: 'Case comp rounds included', type: 'number' },
      { name: 'Cert_Progress', label: 'Certificate course progress (%)', type: 'number' }
    ]
  },
  {
    key: 'enrollments', label: 'Enrollments', icon: 'ti-clipboard-check', group: 'Student dashboard',
    desc: 'Which student is enrolled in which program, and their progress. One row per student per program. Materials/Drive links for a course only show up on the student\'s dashboard once you flip "Drive access granted" to Yes here — since Drive folders are private and you have to individually share them with the student\'s email first. The student gets a notification banner on their dashboard the next time they log in after you do this.',
    admin: true,
    fields: [
      { name: 'Email', label: 'Student email (must match a Students row)', type: 'text', required: true, col: true },
      { name: 'ProgramCode', label: 'Program code (must match a Programs row)', type: 'text', required: true, col: true },
      { name: 'Progress', label: 'Progress % (0-100)', type: 'number', col: true },
      { name: 'NextSession', label: 'Next session name', type: 'text' },
      { name: 'NextDate', label: 'Next date', type: 'text' },
      { name: 'Domains', label: 'Live Project domain(s) chosen at checkout (comma-separated key, e.g. "marketing" or "marketing,hr") — auto-filled by Razorpay checkout', type: 'text' },
      { name: 'AccessGranted', label: 'Drive access granted to student? (share the Drive folder with their email first, then set this to Yes)', type: 'select', options: ['no', 'yes'], col: true }
    ]
  },
  {
    key: 'liveDomainLinks', label: 'Live Project — Domain Drive Links', icon: 'ti-folder', group: 'Student dashboard',
    desc: 'The Google Drive folder(s) for each Live Project domain. A student sees the link(s) for whichever domain(s) they picked at checkout (stored on their Enrollments row). Domain key must stay lowercase and match what the checkout picker uses (operations / marketing / hr / finance / consulting / product).',
    fields: [
      { name: 'DomainKey', label: 'Domain key (lowercase, no spaces)', type: 'text', required: true, col: true },
      { name: 'DomainLabel', label: 'Domain label shown to students', type: 'text', col: true },
      { name: 'driveLinks', label: 'Drive links for this domain', type: 'linklist', col: true }
    ]
  },
  {
    key: 'catMocks', label: 'CAT Mock Tests', icon: 'ti-clipboard-list', group: 'CAT / OMETs Portal',
    idField: 'MockID',
    desc: 'Create new mock tests here — set which exam it belongs to, its section, duration, and an optional deadline after which it stops showing as available. Add the actual questions in "CAT Mock Questions" below using the same Mock ID.',
    fields: [
      { name: 'MockID', label: 'Mock ID (unique, no spaces, e.g. varc-2)', type: 'text', required: true, col: true },
      { name: 'Exam', label: 'Exam', type: 'select', options: ['CAT', 'XAT', 'SNAP', 'NMAT', 'MAH-CET', 'IIFT', 'CMAT', 'TISSNET'], required: true, col: true },
      { name: 'Title', label: 'Title', type: 'text', required: true, col: true },
      { name: 'Section', label: 'Section (e.g. VARC, QA, LRDI)', type: 'text', col: true },
      { name: 'Duration', label: 'Duration (minutes)', type: 'number', required: true },
      { name: 'Status', label: 'Status', type: 'select', options: ['live', 'coming'], col: true },
      { name: 'Attempts', label: 'Attempts count (shown as stat)', type: 'number' },
      { name: 'Note', label: 'Note (e.g. "Coming soon")', type: 'text' },
      { name: 'Deadline', label: 'Deadline (blank = always available)', type: 'date' }
    ]
  },
  {
    key: 'catQuestions', label: 'CAT Mock Questions', icon: 'ti-help-circle', group: 'CAT / OMETs Portal',
    desc: 'Questions for each Mock Test above. Added via Excel bulk import only (see the panel above the table) — a full mock can be 60-70 questions, so there\'s no one-by-one form for this section anymore. You can either pick an existing Mock Test, or use "Create a new paper instead" to make a brand-new one and upload its questions in one go. Existing questions can still be edited or deleted individually below.',
    bulkImport: {
      mockCollection: 'catMocks', mockValue: 'MockID', mockLabel: r => `${r.Title} — ${r.MockID}`,
      pickerLabel: 'Which Mock Test are these questions for?',
      createFields: [
        { name: 'MockID', label: 'Mock ID (unique, no spaces, e.g. varc-2)', type: 'text', required: true },
        { name: 'Exam', label: 'Exam', type: 'select', options: ['CAT', 'XAT', 'SNAP', 'NMAT', 'MAH-CET', 'IIFT', 'CMAT', 'TISSNET'], required: true },
        { name: 'Title', label: 'Title', type: 'text', required: true },
        { name: 'Section', label: 'Section (e.g. VARC, QA, LRDI)', type: 'text' },
        { name: 'Duration', label: 'Duration (minutes)', type: 'number', required: true },
        { name: 'Deadline', label: 'Deadline (blank = always available)', type: 'date' }
      ]
    },
    fields: [
      { name: 'MockID', label: 'Mock Test (which paper is this question for?)', type: 'ref', refCollection: 'catMocks', refValue: 'MockID', refLabel: r => `${r.Title} — ${r.MockID}`, required: true, col: true },
      { name: 'Passage', label: 'Passage (optional, leave blank for standalone questions)', type: 'textarea' },
      { name: 'Q', label: 'Question', type: 'textarea', required: true, col: true },
      { name: 'OptionA', label: 'Option A', type: 'text', required: true },
      { name: 'OptionB', label: 'Option B', type: 'text', required: true },
      { name: 'OptionC', label: 'Option C', type: 'text', required: true },
      { name: 'OptionD', label: 'Option D', type: 'text', required: true },
      { name: 'Correct', label: 'Correct option', type: 'select', options: ['A', 'B', 'C', 'D'], required: true, col: true },
      { name: 'Solution', label: 'Solution / explanation', type: 'textarea' }
    ]
  },
  {
    key: 'catPyq', label: 'PYQ Papers', icon: 'ti-file-text', group: 'CAT / OMETs Portal',
    desc: 'Past Year Question papers. Upload the official PDF here (students can open/download it), and optionally set a Mock ID to link it to a full interactive question set in "PYQ Questions" below. Set a deadline to stop showing it after a date.',
    fields: [
      { name: 'Exam', label: 'Exam', type: 'select', options: ['CAT', 'XAT', 'SNAP', 'NMAT', 'MAH-CET', 'IIFT', 'CMAT', 'TISSNET'], required: true, col: true },
      { name: 'Year', label: 'Year', type: 'text', required: true, col: true },
      { name: 'Section', label: 'Section', type: 'text', col: true },
      { name: 'Title', label: 'Title', type: 'text', required: true, col: true },
      { name: 'Meta', label: 'Small description (e.g. "24 Qs · Full solutions")', type: 'text' },
      { name: 'MockID', label: 'Linked Mock ID (optional — for interactive question set)', type: 'text' },
      { name: 'PdfUrl', label: 'PYQ Paper PDF', type: 'file' },
      { name: 'Deadline', label: 'Deadline (blank = always available)', type: 'date' }
    ]
  },
  {
    key: 'catPyqQuestions', label: 'PYQ Questions', icon: 'ti-help-circle', group: 'CAT / OMETs Portal',
    desc: 'Interactive question sets for PYQ papers. Added via Excel bulk import only (see the panel above the table) — only PYQ Papers that already have a Linked Mock ID set (in "PYQ Papers" above) show up in the picker. You can also use "Create a new paper instead" to make a brand-new PYQ Paper and upload its questions in one go. Existing questions can still be edited or deleted individually below.',
    bulkImport: {
      mockCollection: 'catPyq', mockValue: 'MockID', mockLabel: r => `${r.Title} — ${r.MockID}`,
      mockFilter: r => !!r.MockID,
      pickerLabel: 'Which PYQ Paper are these questions for?',
      createFields: [
        { name: 'Exam', label: 'Exam', type: 'select', options: ['CAT', 'XAT', 'SNAP', 'NMAT', 'MAH-CET', 'IIFT', 'CMAT', 'TISSNET'], required: true },
        { name: 'Year', label: 'Year', type: 'text', required: true },
        { name: 'Section', label: 'Section', type: 'text' },
        { name: 'Title', label: 'Title', type: 'text', required: true },
        { name: 'Meta', label: 'Small description (e.g. "24 Qs · Full solutions")', type: 'text' },
        { name: 'MockID', label: 'Mock ID (unique, no spaces — links the paper to its questions, e.g. cat-2023-varc)', type: 'text', required: true },
        { name: 'Deadline', label: 'Deadline (blank = always available)', type: 'date' }
      ]
    },
    fields: [
      { name: 'MockID', label: 'PYQ Paper (which paper is this question for?)', type: 'ref', refCollection: 'catPyq', refValue: 'MockID', refLabel: r => `${r.Title} — ${r.MockID}`, refFilter: r => !!r.MockID, required: true, col: true },
      { name: 'Passage', label: 'Passage (optional)', type: 'textarea' },
      { name: 'Q', label: 'Question', type: 'textarea', required: true, col: true },
      { name: 'OptionA', label: 'Option A', type: 'text', required: true },
      { name: 'OptionB', label: 'Option B', type: 'text', required: true },
      { name: 'OptionC', label: 'Option C', type: 'text', required: true },
      { name: 'OptionD', label: 'Option D', type: 'text', required: true },
      { name: 'Correct', label: 'Correct option', type: 'select', options: ['A', 'B', 'C', 'D'], required: true, col: true },
      { name: 'Solution', label: 'Solution / explanation', type: 'textarea' }
    ]
  },
  {
    key: 'catMaterials', label: 'CAT Study Materials', icon: 'ti-files', group: 'CAT / OMETs Portal',
    desc: 'Free study material cards shown on the CAT/OMETs portal materials section.',
    fields: [
      { name: 'Section', label: 'Section (e.g. VARC, QA, LRDI)', type: 'text', required: true, col: true },
      { name: 'Title', label: 'Title', type: 'text', required: true, col: true },
      { name: 'Meta', label: 'Small description', type: 'text' },
      { name: 'Type', label: 'Type', type: 'select', options: ['pdf', 'video', 'drive', 'zip'] },
      { name: 'Link', label: 'Link', type: 'text' }
    ]
  },
  {
    key: 'catLeaderboard', label: 'CAT Leaderboard', icon: 'ti-medal', group: 'CAT / OMETs Portal',
    desc: 'Top scorers shown on the mock test leaderboard.',
    fields: [
      { name: 'Rank', label: 'Rank', type: 'number', required: true, col: true },
      { name: 'Name', label: 'Name', type: 'text', required: true, col: true },
      { name: 'College', label: 'College', type: 'text', col: true },
      { name: 'Score', label: 'Score (e.g. 48/50)', type: 'text', col: true },
      { name: 'Mock', label: 'Mock name', type: 'text' }
    ]
  },
  {
    key: 'catAttempts', label: 'Mock Attempts', icon: 'ti-checklist', group: 'CAT / OMETs Portal',
    desc: 'One row per student per mock paper — created automatically the moment a student submits that paper (nothing to add here yourself). A student can only attempt a given paper once; if someone genuinely needs a retake (e.g. a technical issue mid-exam), delete their row here and they\'ll be able to start that paper again.',
    fields: [
      { name: 'Email', label: 'Student email', type: 'text', required: true, col: true },
      { name: 'Phone', label: 'Contact number', type: 'text', col: true },
      { name: 'MockID', label: 'Mock Test', type: 'ref', refCollection: 'catMocks', refValue: 'MockID', refLabel: r => `${r.Title} — ${r.MockID}`, required: true, col: true },
      { name: 'Score', label: 'Score', type: 'number', col: true },
      { name: 'MaxScore', label: 'Max possible score', type: 'number' },
      { name: 'Correct', label: 'Correct', type: 'number' },
      { name: 'Wrong', label: 'Wrong', type: 'number' },
      { name: 'Skipped', label: 'Skipped', type: 'number' },
      { name: 'Percentile', label: 'Percentile', type: 'text' },
      { name: 'submittedAt', label: 'Submitted at', type: 'text', col: true }
    ]
  },
  {
    key: 'catGdpi', label: 'CAT GDPI', icon: 'ti-message-star', group: 'CAT / OMETs Portal',
    desc: 'Mock PI / GD sessions shown on the CAT/OMETs portal.',
    fields: [
      { name: 'Type', label: 'Type', type: 'select', options: ['PI', 'GD'], col: true },
      { name: 'Title', label: 'Title', type: 'text', required: true, col: true },
      { name: 'Meta', label: 'Small description', type: 'text' },
      { name: 'Link', label: 'Link', type: 'text' }
    ]
  },
  {
    key: 'catDomainQA', label: 'CAT Domain Q&A', icon: 'ti-bulb', group: 'CAT / OMETs Portal',
    desc: 'Domain-wise interview question banks (Finance, Marketing, Consulting, etc). Add rows one at a time, or bulk-import many at once from Excel below.',
    bulkImport: { itemLabel: 'entry', keepAddButton: true },
    fields: [
      { name: 'Domain', label: 'Domain', type: 'text', required: true, col: true },
      { name: 'Title', label: 'Title', type: 'text', required: true, col: true },
      { name: 'Meta', label: 'Small description', type: 'text' },
      { name: 'Link', label: 'Link', type: 'text' }
    ]
  },
  {
    key: 'catMentors', label: 'CAT Mentors', icon: 'ti-users', group: 'CAT / OMETs Portal',
    desc: 'Mentors shown specifically on the CAT/OMETs prep portal.',
    fields: [
      { name: 'Name', label: 'Name', type: 'text', required: true, col: true },
      { name: 'School', label: 'B-school', type: 'text', col: true },
      { name: 'Converted', label: 'Result (e.g. "CAT 99.8%ile")', type: 'text', col: true },
      { name: 'Domain', label: 'Domain', type: 'text' },
      { name: 'LinkedIn', label: 'LinkedIn URL', type: 'text' }
    ]
  }
  // NOTE: the old "CAT Pricing Plans" section (Free Material / Mock Test
  // Series / GDPI Flagship) has been removed — those 3 plans now live as
  // ordinary rows in "Courses & Pricing" above (Track: cat, ids:
  // free-material / mock-test-series / gdpi-flagship). Edit their
  // price/copy there; the CAT/OMETs portal pricing cards and cat-enroll.html
  // both read from that same 'courses' collection, so there's only one
  // place to touch a CAT price now instead of two.
];
