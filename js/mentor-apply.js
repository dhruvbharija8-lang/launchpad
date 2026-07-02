(function () {
  if (document.documentElement.dataset.mentorApplyInitialized === 'true') return;
  document.documentElement.dataset.mentorApplyInitialized = 'true';

  const MODAL_ID = 'applyModal';
  const STYLE = `
    .apply-modal{position:fixed;inset:0;background:rgba(15,20,45,.55);backdrop-filter:blur(3px);display:none;align-items:center;justify-content:center;padding:20px;z-index:1600}
    .apply-modal.open{display:flex}
    .apply-box{position:relative;background:#fff;border-radius:20px;width:100%;max-width:480px;padding:30px;box-shadow:0 24px 80px rgba(0,0,0,.28)}
    .apply-x{position:absolute;top:14px;right:14px;width:34px;height:34px;border:none;border-radius:50%;background:#f3f4f6;color:#475569;font-size:20px;cursor:pointer}
    .apply-head{margin-bottom:18px}
    .apply-ico{width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#FF8B02,#D97400);display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;margin-bottom:12px}
    .apply-head h3,.apply-success h3{font-size:20px;font-weight:800;color:#1B2A6B;letter-spacing:-.02em}
    .apply-head p,.apply-success p{font-size:13px;color:#5A6070;font-family:'Inter',sans-serif;margin-top:6px;line-height:1.55}
    .afield{margin-bottom:14px}
    .afield label{font-size:12px;font-weight:700;color:#111114;display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:.05em}
    .afield input,.afield textarea{width:100%;padding:11px 14px;border:1.5px solid #E0E4F0;border-radius:10px;font-family:'Inter',sans-serif;font-size:14px;color:#111114;background:#fff;transition:.2s;outline:none}
    .afield textarea{min-height:90px;resize:vertical}
    .afield input:focus,.afield textarea:focus{border-color:#FF8B02}
    .afield-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .apply-err{display:none;font-size:12px;color:#dc2626;margin-bottom:12px;padding:8px 12px;background:#FEE2E2;border-radius:8px}
    .apply-submit{width:100%;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#FF8B02;color:#fff;padding:12px 16px;border:none;border-radius:30px;font-size:14px;font-weight:700;cursor:pointer;transition:.2s}
    .apply-submit:hover{background:#D97400;transform:translateY(-1px)}
    .apply-success{text-align:center}
    .apply-success a{color:#D97400;font-weight:600}
    @media(max-width:480px){.afield-row{grid-template-columns:1fr}}
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = STYLE;
  document.head.appendChild(styleEl);

  function getModal() {
    let modal = document.getElementById(MODAL_ID);
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = MODAL_ID;
    modal.className = 'apply-modal';
    modal.innerHTML = `
      <div class="apply-box" role="dialog" aria-modal="true">
        <button class="apply-x" id="applyClose" aria-label="Close">&times;</button>
        <div id="applyForm">
          <div class="apply-head">
            <div class="apply-ico"><i class="ti ti-school"></i></div>
            <h3>Apply to be a mentor</h3>
            <p>90% of our mentors were once our students. Tell us about you and share a 60-second intro.</p>
          </div>
          <div class="afield"><label>Full name</label><input id="amName" placeholder="Your name"/></div>
          <div class="afield-row">
            <div class="afield"><label>Email</label><input id="amEmail" type="email" placeholder="you@email.com"/></div>
            <div class="afield"><label>B-School / Company</label><input id="amSchool" placeholder="IIM … / Company"/></div>
          </div>
          <div class="afield"><label>60-second intro video link</label><input id="amVideo" placeholder="YouTube / Drive / Loom link (optional)"/></div>
          <div class="afield"><label>Why do you want to mentor?</label><textarea id="amWhy" rows="3" placeholder="In a few lines…"></textarea></div>
          <div class="apply-err" id="amErr"></div>
          <button class="apply-submit" id="amSubmit"><i class="ti ti-send"></i> Submit application</button>
        </div>
        <div id="applySuccess" class="apply-success" style="display:none">
          <div class="apply-ico" style="margin:0 auto 12px"><i class="ti ti-circle-check"></i></div>
          <h3>Application received!</h3>
          <p>Thanks — our team will review your intro and reach out. You can also email <a href="mailto:bharat.kapoor@prodmarkconsulting.in">bharat.kapoor@prodmarkconsulting.in</a>.</p>
          <button class="apply-submit" id="applyDone" style="margin-top:16px">Done</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  const modal = getModal();

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.openApply = openModal;
  window.closeApply = closeModal;

  const openButtons = document.querySelectorAll('#navApplyMentorBtn, #mobileApplyMentorBtn, [data-open-mentor]');
  openButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const mobileNav = document.getElementById('mobileNav');
      if (mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
      }
      openModal();
    });
  });

  const openTrigger = document.getElementById('openApply');
  if (openTrigger) openTrigger.addEventListener('click', openModal);

  const closeTrigger = document.getElementById('applyClose');
  if (closeTrigger) closeTrigger.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  const submitBtn = document.getElementById('amSubmit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = (document.getElementById('amName').value || '').trim();
      const email = (document.getElementById('amEmail').value || '').trim();
      const why = (document.getElementById('amWhy').value || '').trim();
      const err = document.getElementById('amErr');

      if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !why) {
        if (err) {
          err.textContent = 'Please add your name, a valid email, and why you want to mentor.';
          err.style.display = 'block';
        }
        return;
      }

      if (err) err.style.display = 'none';
      const form = document.getElementById('applyForm');
      const success = document.getElementById('applySuccess');
      if (form) form.style.display = 'none';
      if (success) success.style.display = 'block';
    });
  }

  const doneBtn = document.getElementById('applyDone');
  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      closeModal();
      setTimeout(() => {
        const form = document.getElementById('applyForm');
        const success = document.getElementById('applySuccess');
        if (form) form.style.display = '';
        if (success) success.style.display = 'none';
        ['amName', 'amEmail', 'amSchool', 'amVideo', 'amWhy'].forEach((id) => {
          const field = document.getElementById(id);
          if (field) field.value = '';
        });
        const err = document.getElementById('amErr');
        if (err) err.style.display = 'none';
      }, 200);
    });
  }
})();

