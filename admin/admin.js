/* ============================================================
   ADMIN DASHBOARD — app logic
   Vanilla JS, no build step (matches the rest of the site).
   Talks to the admin-server API mounted at /api/admin/*.
============================================================ */
const TOKEN_KEY = 'mbaAdminToken';
const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = t => localStorage.setItem(TOKEN_KEY, t);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function api(path, opts) {
  opts = opts || {};
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  const token = getToken();
  if (token) headers.Authorization = 'Bearer ' + token;
  const res = await fetch('/api' + path, Object.assign({}, opts, { headers }));
  if (res.status === 401) {
    clearToken();
    location.href = 'index.html';
    throw new Error('Session expired');
  }
  let body = null;
  try { body = await res.json(); } catch (e) { /* no body */ }
  if (!res.ok) throw new Error((body && body.error) || 'Request failed');
  return body;
}

/* ---------------- LOGIN PAGE ---------------- */
function initLoginPage() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  if (getToken()) { location.href = 'dashboard.html'; return; }
  const errBox = document.getElementById('loginErr');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    errBox.classList.remove('show');
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value;
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Login failed');
      setToken(body.token);
      location.href = 'dashboard.html';
    } catch (err) {
      errBox.textContent = err.message;
      errBox.classList.add('show');
    }
  });
}

/* ---------------- TOAST ---------------- */
function toast(msg, isErr) {
  const wrap = document.getElementById('toastWrap');
  if (!wrap) return alert(msg);
  const t = document.createElement('div');
  t.className = 'toast' + (isErr ? ' err' : '');
  t.textContent = msg;
  wrap.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 250); }, 2600);
}

/* ---------------- DASHBOARD SHELL ---------------- */
let currentSection = null;

function initDashboard() {
  const sidebar = document.getElementById('sbNav');
  if (!sidebar) return;
  if (!getToken()) { location.href = 'index.html'; return; }

  const groups = {};
  ADMIN_SECTIONS.forEach(s => { (groups[s.group] = groups[s.group] || []).push(s); });

  let html = '';
  Object.keys(groups).forEach(g => {
    html += `<div class="sb-group-lbl">${g}</div>`;
    groups[g].forEach(s => {
      html += `<a href="#" class="sb-link" data-sec="${s.key}"><i class="ti ${s.icon}"></i> ${s.label}</a>`;
    });
  });
  html += `<div class="sb-group-lbl">Account</div><a href="#" class="sb-link" data-sec="__account"><i class="ti ti-lock"></i> Change password</a>`;
  sidebar.innerHTML = html;

  sidebar.querySelectorAll('.sb-link').forEach(a => {
    a.onclick = e => { e.preventDefault(); selectSection(a.dataset.sec); };
  });

  document.getElementById('logoutBtn').onclick = () => { clearToken(); location.href = 'index.html'; };

  api('/admin/auth/me').then(me => {
    const el = document.getElementById('sbUser');
    if (el) el.textContent = 'Signed in as ' + me.username;
  }).catch(() => {});

  const first = ADMIN_SECTIONS[0].key;
  selectSection(location.hash ? location.hash.slice(1) : first);
}

function selectSection(key) {
  currentSection = key;
  location.hash = key;
  document.querySelectorAll('.sb-link').forEach(a => a.classList.toggle('active', a.dataset.sec === key));
  if (key === '__account') return renderAccountSection();
  const section = ADMIN_SECTIONS.find(s => s.key === key);
  if (!section) return;
  if (section.singleton) renderSettingsSection(section);
  else renderCollectionSection(section);
}

function mainHead(title, desc) {
  return `<div class="main-head"><div><div class="main-title">${title}</div><div class="main-desc">${desc || ''}</div></div></div>`;
}

/* ---------------- SETTINGS (singleton) ---------------- */
async function renderSettingsSection(section) {
  const main = document.getElementById('main');
  main.innerHTML = mainHead(section.label, section.desc) + `<div class="panel"><form id="settingsForm" class="grid2"></form><div class="modal-actions"><button class="btn btn-primary" id="settingsSave" style="width:auto">Save changes</button></div></div>`;
  const data = await api('/admin/settings');
  const form = document.getElementById('settingsForm');
  form.innerHTML = section.fields.map(f => fieldHtml(f, data[f.name])).join('');
  document.getElementById('settingsSave').onclick = async () => {
    const payload = readForm(form, section.fields);
    try {
      await api('/admin/settings', { method: 'PUT', body: JSON.stringify(payload) });
      toast('Homepage stats updated');
    } catch (e) { toast(e.message, true); }
  };
}

/* ---------------- ACCOUNT / CHANGE PASSWORD ---------------- */
function renderAccountSection() {
  const main = document.getElementById('main');
  main.innerHTML = mainHead('Change password', 'Update the password used to log in to this dashboard.') + `
    <div class="panel" style="max-width:420px">
      <div class="field"><label>Current password</label><input type="password" id="pwOld"/></div>
      <div class="field"><label>New password (min 8 characters)</label><input type="password" id="pwNew"/></div>
      <button class="btn btn-primary" id="pwSave">Update password</button>
    </div>`;
  document.getElementById('pwSave').onclick = async () => {
    try {
      await api('/admin/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ oldPassword: document.getElementById('pwOld').value, newPassword: document.getElementById('pwNew').value })
      });
      toast('Password updated');
      document.getElementById('pwOld').value = ''; document.getElementById('pwNew').value = '';
    } catch (e) { toast(e.message, true); }
  };
}

/* ---------------- GENERIC COLLECTION TABLE ---------------- */
async function renderCollectionSection(section) {
  const main = document.getElementById('main');
  main.innerHTML = mainHead(section.label, section.desc) +
    `<div class="panel">
      <div class="add-bar"><span></span><button class="btn btn-primary" style="width:auto" id="addBtn"><i class="ti ti-plus"></i> Add ${section.label.replace(/s$/, '')}</button></div>
      <div class="table-wrap" id="tableWrap"><div class="empty-msg">Loading…</div></div>
    </div>
    <div class="modal-overlay" id="modalOverlay"><div class="modal-card">
      <h3 id="modalTitle">Add</h3>
      <div id="modalSubtitle" style="display:none;font-size:12.5px;color:var(--ink3,#8a8f98);margin:-10px 0 14px"></div>
      <form id="recordForm"></form>
      <div class="modal-actions">
        <button class="btn btn-ghost" id="modalCancel" type="button">Cancel</button>
        <button class="btn btn-ghost" id="modalSaveNext" style="width:auto;display:none" type="button">Save &amp; add next question</button>
        <button class="btn btn-primary" id="modalSave" style="width:auto" type="button">Save</button>
      </div>
    </div></div>`;

  document.getElementById('addBtn').onclick = () => openRecordModal(section, null);
  document.getElementById('modalCancel').onclick = closeRecordModal;

  await loadAndRenderTable(section);
}

async function loadAndRenderTable(section) {
  const wrap = document.getElementById('tableWrap');
  let rows;
  try {
    rows = await api('/admin/' + section.key);
  } catch (e) {
    wrap.innerHTML = `<div class="empty-msg">${e.message}</div>`;
    return;
  }
  if (!rows.length) { wrap.innerHTML = '<div class="empty-msg">Nothing here yet — click Add to create the first one.</div>'; return; }
  const cols = section.fields.filter(f => f.col);
  const useCols = cols.length ? cols : section.fields.slice(0, 4);

  // 'ref'/'multiref' columns (e.g. a Program Code pointing at the Courses
  // collection) store just the raw id — resolve those to their human label
  // here so the table shows the actual course/paper name instead of a
  // cryptic code, matching what the dropdown already shows when editing.
  const tableRefCache = {};
  for (const f of useCols) {
    if ((f.type === 'ref' || f.type === 'multiref') && !(f.refCollection in tableRefCache)) {
      try { tableRefCache[f.refCollection] = await api('/admin/' + f.refCollection); }
      catch (e) { tableRefCache[f.refCollection] = []; }
    }
  }
  const resolveRefLabel = (f, val) => {
    const rows2 = tableRefCache[f.refCollection] || [];
    const match = rows2.find(r => String(r[f.refValue]) === String(val));
    if (!match) return val; // fall back to raw value if not found (e.g. deleted/renamed)
    return f.refLabel ? f.refLabel(match) : match[f.refValue];
  };

  let html = '<table class="dtab"><thead><tr>';
  useCols.forEach(f => html += `<th>${f.label.replace(/\s*\(.*?\)/, '')}</th>`);
  html += '<th></th></tr></thead><tbody>';
  rows.forEach(r => {
    html += '<tr>';
    useCols.forEach(f => {
      let v = r[f.name];
      let isHtml = false;
      if (f.type === 'checkbox') { v = v ? '<span class="badge badge-on">Active</span>' : '<span class="badge badge-off">Off</span>'; isHtml = true; }
      else if (f.type === 'ref' && v) v = resolveRefLabel(f, v);
      else if (f.type === 'multiref' && Array.isArray(v)) v = v.map(x => resolveRefLabel(f, x)).join(', ');
      else if (f.type === 'linklist') v = Array.isArray(v) && v.length ? v.length + ' link' + (v.length > 1 ? 's' : '') + ' — ' + v.map(x => x.Name || x.Link).join(', ') : '—';
      else if (Array.isArray(v)) v = v.join(', ');
      html += `<td>${v == null ? '' : (isHtml ? v : escapeHtml(String(v)))}</td>`;
    });
    html += `<td class="row-actions">
      <button class="btn btn-ghost btn-sm" data-edit="${r._id}"><i class="ti ti-edit"></i></button>
      <button class="btn btn-danger btn-sm" data-del="${r._id}"><i class="ti ti-trash"></i></button>
    </td></tr>`;
  });
  html += '</tbody></table>';
  wrap.innerHTML = html;

  wrap.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => {
    const rec = rows.find(r => r._id === b.dataset.edit);
    openRecordModal(section, rec);
  });
  wrap.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => {
    if (!confirm('Delete this entry? This cannot be undone.')) return;
    try {
      await api('/admin/' + section.key + '/' + b.dataset.del, { method: 'DELETE' });
      toast('Deleted');
      loadAndRenderTable(section);
    } catch (e) { toast(e.message, true); }
  });
}

function fieldHtml(f, value, refOptions) {
  const id = 'f_' + f.name;
  if (f.type === 'ref') {
    const opts = (refOptions || []).map(o => `<option value="${escapeHtml(o.value)}" ${String(value) === o.value ? 'selected' : ''}>${escapeHtml(o.label)}</option>`).join('');
    return `<div class="field"><label>${f.label}</label><select id="${id}"><option value="">— select —</option>${opts}</select></div>`;
  }
  if (f.type === 'multiref') {
    const selected = Array.isArray(value) ? value.map(String) : [];
    const rows = (refOptions || []).map(o => `<label style="display:flex;align-items:center;gap:8px;padding:7px 2px;font-weight:400;font-size:13.5px;color:var(--ink,#111114);cursor:pointer;border-bottom:1px solid rgba(0,0,0,.05)"><input type="checkbox" class="multiref-opt" value="${escapeHtml(o.value)}" ${selected.includes(String(o.value)) ? 'checked' : ''} style="width:16px;height:16px;flex:0 0 16px;margin:0;accent-color:var(--orange,#FF8B02)"/><span>${escapeHtml(o.label)}</span></label>`).join('');
    return `<div class="field"><label>${f.label}</label><div id="${id}" data-multiref style="max-height:200px;overflow-y:auto;border:1.5px solid var(--line);border-radius:10px;padding:6px 12px;background:#fff">${rows || '<span style="color:var(--ink3);font-size:13px">Nothing to pick from yet</span>'}</div></div>`;
  }
  if (f.type === 'textarea') {
    return `<div class="field"><label>${f.label}</label><textarea id="${id}" rows="3">${value == null ? '' : escapeHtml(value)}</textarea></div>`;
  }
  if (f.type === 'select') {
    const opts = f.options.map(o => `<option value="${o}" ${String(value) === o ? 'selected' : ''}>${o}</option>`).join('');
    return `<div class="field"><label>${f.label}</label><select id="${id}">${opts}</select></div>`;
  }
  if (f.type === 'checkbox') {
    return `<div class="field checkbox-row"><input type="checkbox" id="${id}" ${value ? 'checked' : ''}/><label style="margin:0">${f.label}</label></div>`;
  }
  if (f.type === 'csv') {
    const v = Array.isArray(value) ? value.join(', ') : (value || '');
    return `<div class="field"><label>${f.label}</label><input id="${id}" value="${escapeHtml(v)}"/></div>`;
  }
  if (f.type === 'linklist') {
    const items = Array.isArray(value) ? value : [];
    const rows = items.map(linklistRowHtml).join('');
    return `<div class="field">
      <label>${f.label}</label>
      <div id="${id}" data-linklist>${rows}</div>
      <button type="button" class="btn btn-ghost btn-sm" style="width:auto" onclick="addLinklistRow('${id}')"><i class="ti ti-plus"></i> Add another link</button>
    </div>`;
  }
  if (f.type === 'file') {
    const cur = value
      ? `<div style="margin-top:4px;font-size:12.5px"><a href="${escapeHtml(value)}" target="_blank" rel="noopener">View current file</a></div>`
      : `<div style="margin-top:4px;font-size:12.5px;color:#8a8f98">No file uploaded yet</div>`;
    return `<div class="field"><label>${f.label}</label><input type="file" accept="application/pdf" id="${id}_picker"/><input type="hidden" id="${id}" value="${escapeHtml(value || '')}"/>${cur}</div>`;
  }
  if (f.type === 'date') {
    return `<div class="field"><label>${f.label}</label><input id="${id}" type="date" value="${value ? escapeHtml(value) : ''}"/></div>`;
  }
  const type = f.type === 'number' ? 'number' : 'text';
  const step = f.step ? `step="${f.step}"` : '';
  return `<div class="field"><label>${f.label}</label><input id="${id}" type="${type}" ${step} value="${value == null ? '' : escapeHtml(String(value))}"/></div>`;
}

function readForm(form, fields) {
  const out = {};
  fields.forEach(f => {
    const el = document.getElementById('f_' + f.name);
    if (!el) return;
    if (f.type === 'checkbox') out[f.name] = el.checked;
    else if (f.type === 'number') out[f.name] = el.value === '' ? null : Number(el.value);
    else if (f.type === 'csv') out[f.name] = el.value.split(',').map(s => s.trim()).filter(Boolean);
    else if (f.type === 'multiref') out[f.name] = Array.from(el.querySelectorAll('.multiref-opt:checked')).map(c => c.value);
    else if (f.type === 'linklist') {
      out[f.name] = Array.from(el.querySelectorAll('.linklist-row')).map(row => ({
        Name: row.querySelector('.ll-name').value.trim(),
        Link: row.querySelector('.ll-url').value.trim()
      })).filter(item => item.Link); // drop empty rows (blank link = nothing to save)
    }
    else out[f.name] = el.value;
  });
  return out;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Repeatable "Name + URL" row used by the 'linklist' field type (e.g. a
// course's Study Materials drive links, added directly on its own edit form
// instead of needing a separate Materials-collection entry per link).
function linklistRowHtml(item) {
  return `<div class="linklist-row" style="display:flex;gap:8px;margin-bottom:6px;align-items:center">
    <input type="text" class="ll-name" placeholder="Link title (e.g. Case Study Pack)" value="${escapeHtml(item && item.Name || '')}" style="flex:1;min-width:0"/>
    <input type="text" class="ll-url" placeholder="Drive/resource link URL" value="${escapeHtml(item && item.Link || '')}" style="flex:2;min-width:0"/>
    <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.linklist-row').remove()" style="flex:0 0 auto"><i class="ti ti-trash"></i></button>
  </div>`;
}
function addLinklistRow(id) {
  const c = document.getElementById(id);
  if (c) c.insertAdjacentHTML('beforeend', linklistRowHtml({}));
}

async function uploadFile(file) {
  const fd = new FormData();
  fd.append('file', file);
  const token = getToken();
  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: token ? { Authorization: 'Bearer ' + token } : {},
    body: fd
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || 'Upload failed');
  return body;
}

let recordCtx = null;
let paperQuestionCount = 0; // how many questions added to the current paper this session
async function openRecordModal(section, record, prefill) {
  recordCtx = { section, record };
  const isChainAdd = !record && section.chainAdd;
  const subtitleEl = document.getElementById('modalSubtitle');
  const chainMockId = isChainAdd && prefill ? prefill[section.chainKey] : null;

  document.getElementById('modalTitle').textContent = record ? 'Edit' : 'Add ' + section.label.replace(/s$/, '');
  if (!chainMockId) paperQuestionCount = 0; // fresh Add click (not a chained continuation) — reset the counter
  if (isChainAdd && chainMockId) {
    subtitleEl.style.display = 'block';
    subtitleEl.textContent = `Building paper "${chainMockId}" — ${paperQuestionCount} question${paperQuestionCount === 1 ? '' : 's'} added so far in this session.`;
  } else {
    subtitleEl.style.display = 'none';
  }

  const form = document.getElementById('recordForm');
  form.innerHTML = '<div class="empty-msg">Loading…</div>';
  document.getElementById('modalOverlay').classList.add('open');

  // 'ref' fields (e.g. "which mock test does this question belong to?") need
  // their options loaded from another collection before the form can render.
  const refCache = {};
  for (const f of section.fields) {
    if ((f.type === 'ref' || f.type === 'multiref') && !(f.refCollection in refCache)) {
      try { refCache[f.refCollection] = await api('/admin/' + f.refCollection); }
      catch (e) { refCache[f.refCollection] = []; }
    }
  }
  const refOptionsFor = f => {
    if (f.type !== 'ref' && f.type !== 'multiref') return null;
    let rows = refCache[f.refCollection] || [];
    if (f.refFilter) rows = rows.filter(f.refFilter);
    return rows.map(r => ({ value: r[f.refValue], label: f.refLabel ? f.refLabel(r) : r[f.refValue] }));
  };

  form.innerHTML = section.fields.map(f => {
    let val;
    if (record) val = record[f.name];
    else if (prefill && f.name in prefill) val = prefill[f.name];
    else val = f.type === 'checkbox' ? true : '';
    return fieldHtml(f, val, refOptionsFor(f));
  }).join('');

  const saveBtn = document.getElementById('modalSave');
  const saveNextBtn = document.getElementById('modalSaveNext');
  saveBtn.textContent = isChainAdd ? 'Save & close' : 'Save';
  saveNextBtn.style.display = isChainAdd ? 'inline-block' : 'none';

  async function doSave(keepGoing) {
    const fileFields = section.fields.filter(f => f.type === 'file');
    for (const f of fileFields) {
      const picker = document.getElementById('f_' + f.name + '_picker');
      if (picker && picker.files && picker.files[0]) {
        try {
          const uploaded = await uploadFile(picker.files[0]);
          document.getElementById('f_' + f.name).value = uploaded.url;
        } catch (e) { toast('Upload failed: ' + e.message, true); return; }
      }
    }
    const payload = readForm(form, section.fields);
    const missing = section.fields.filter(f => f.required && !payload[f.name] && payload[f.name] !== 0);
    if (missing.length) { toast('Please fill in: ' + missing.map(f => f.label).join(', '), true); return; }
    try {
      if (record) await api('/admin/' + section.key + '/' + record._id, { method: 'PUT', body: JSON.stringify(payload) });
      else await api('/admin/' + section.key, { method: 'POST', body: JSON.stringify(payload) });
      toast(record ? 'Saved' : 'Added to paper');
      loadAndRenderTable(section);
      if (!record && keepGoing && section.chainKey) {
        paperQuestionCount += 1;
        const keepValue = payload[section.chainKey];
        await openRecordModal(section, null, keepValue != null ? { [section.chainKey]: keepValue } : null);
      } else {
        paperQuestionCount = 0;
        closeRecordModal();
      }
    } catch (e) { toast(e.message, true); }
  }

  saveBtn.onclick = () => doSave(false);
  saveNextBtn.onclick = () => doSave(true);
}
function closeRecordModal() { document.getElementById('modalOverlay').classList.remove('open'); recordCtx = null; }
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeRecordModal(); });
});

/* ---------------- BOOT ---------------- */
initLoginPage();
initDashboard();
