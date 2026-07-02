        /* ===== SCORE → PERCENTILE MAP ===== */
        function scoreToPercentile(score) {
            score = parseFloat(score) || 0;
            if (score >= 185) return 99.99;
            if (score >= 170) return 99.9;
            if (score >= 155) return 99.7;
            if (score >= 145) return 99.4;
            if (score >= 135) return 99.0;
            if (score >= 125) return 98.5;
            if (score >= 115) return 97.5;
            if (score >= 105) return 96.0;
            if (score >= 95) return 94.0;
            if (score >= 85) return 91.5;
            if (score >= 75) return 88.0;
            if (score >= 65) return 83.0;
            if (score >= 55) return 76.0;
            if (score >= 45) return 68.0;
            if (score >= 35) return 57.0;
            return Math.max(0, score * 1.5);
        }

        function sectionToPercentile(score) {
            score = parseFloat(score) || 0;
            if (score >= 58) return 99;
            if (score >= 50) return 97;
            if (score >= 44) return 94;
            if (score >= 38) return 90;
            if (score >= 32) return 85;
            if (score >= 26) return 75;
            if (score >= 20) return 60;
            return Math.max(0, score * 2);
        }

        /* ===== SLIDER ===== */
        function updateScore(val) {
            val = parseInt(val);
            document.getElementById('scoreDisplay').textContent = val;
            const pct = scoreToPercentile(val);
            document.getElementById('percentileDisplay').textContent = '≈ ' + pct.toFixed(1) + ' Percentile';
            updateSectionals();
        }

        function updateSectionals() {
            const v = parseInt(document.getElementById('varc').value) || 0;
            const d = parseInt(document.getElementById('dilr').value) || 0;
            const q = parseInt(document.getElementById('qa').value) || 0;
            document.getElementById('varcPct').textContent = sectionToPercentile(v).toFixed(0);
            document.getElementById('dilrPct').textContent = sectionToPercentile(d).toFixed(0);
            document.getElementById('qaPct').textContent = sectionToPercentile(q).toFixed(0);
            // Auto-update slider to match total
            const total = v + d + q;
            if (total > 0 && total <= 198) {
                document.getElementById('scoreSlider').value = total;
                document.getElementById('scoreDisplay').textContent = total;
                const pct = scoreToPercentile(total);
                document.getElementById('percentileDisplay').textContent = '≈ ' + pct.toFixed(1) + ' Percentile';
            }
        }
        ['varc', 'dilr', 'qa'].forEach(id => {
            document.getElementById(id).addEventListener('input', updateSectionals);
        });

        /* ===== COLLEGE DATA ===== */
        const COLLEGES = [
            // tier, name, cutoff_gen, cutoff_ncobc, cutoff_sc, cutoff_st, fees, avg_ctc, seats, diversity_bonus, workex_boost
            { tier: 1, name: 'IIM Ahmedabad', gen: 99.5, ncobc: 97, sc: 90, st: 80, ews: 99.5, fees: '₹24L', ctc: '₹35 LPA', note: 'AR system — academics matter heavily', sectional: 85 },
            { tier: 1, name: 'IIM Bangalore', gen: 99.0, ncobc: 97, sc: 89, st: 79, ews: 99.0, fees: '₹23L', ctc: '₹34 LPA', note: 'Profile-heavy; 50% weight on 10th/12th', sectional: 80, diversityBonus: true },
            { tier: 1, name: 'IIM Calcutta', gen: 99.0, ncobc: 95, sc: 87, st: 77, ews: 99.0, fees: '₹23L', ctc: '₹34 LPA', note: 'High CAT weight; tough for GEM freshers', sectional: 80 },
            { tier: 1, name: 'FMS Delhi', gen: 99.0, ncobc: 95, sc: 85, st: 75, ews: 99.0, fees: '₹2L', ctc: '₹32 LPA', note: 'Near-zero fees; extremely competitive', sectional: 80 },
            { tier: 1, name: 'IIM Lucknow', gen: 97.5, ncobc: 90, sc: 82, st: 72, ews: 97.5, fees: '₹19L', ctc: '₹28 LPA', note: 'Strong WAT-PI component', sectional: 75 },
            { tier: 1, name: 'IIM Kozhikode', gen: 97.0, ncobc: 88, sc: 80, st: 70, ews: 97.0, fees: '₹20L', ctc: '₹26 LPA', note: 'Diversity-friendly; non-engineer+female = bonus', sectional: 70, diversityBonus: true },
            { tier: 1, name: 'IIM Indore', gen: 97.0, ncobc: 89, sc: 80, st: 70, ews: 97.0, fees: '₹17L', ctc: '₹27 LPA', note: 'School marks weighted heavily (76%)', sectional: 72 },
            { tier: 2, name: 'MDI Gurgaon', gen: 95.0, ncobc: 87, sc: 77, st: 67, ews: 95.0, fees: '₹22L', ctc: '₹24 LPA', note: 'Workex friendly; drops 10/12 from 2026', sectional: 65, workexBoost: true },
            { tier: 2, name: 'SPJIMR Mumbai', gen: 85.0, ncobc: 78, sc: 70, st: 60, ews: 85.0, fees: '₹21L', ctc: '₹28 LPA', note: 'Profile + essay based; CAT not the only factor', sectional: 60, diversityBonus: true, workexBoost: true },
            { tier: 2, name: 'IIM Shillong', gen: 90.0, ncobc: 83, sc: 77, st: 65, ews: 90.0, fees: '₹13L', ctc: '₹18 LPA', note: 'Lowest cutoff among old IIMs', sectional: 65 },
            { tier: 2, name: 'IIM Trichy', gen: 94.0, ncobc: 87, sc: 78, st: 68, ews: 94.0, fees: '₹13L', ctc: '₹18 LPA', note: 'Part of CAP process', sectional: 65 },
            { tier: 2, name: 'IIM Udaipur', gen: 93.0, ncobc: 86, sc: 77, st: 67, ews: 93.0, fees: '₹14L', ctc: '₹17 LPA', note: 'CAP IIM; female diversity bonus', sectional: 65, diversityBonus: true },
            { tier: 2, name: 'IIM Raipur', gen: 93.0, ncobc: 85, sc: 75, st: 65, ews: 93.0, fees: '₹12L', ctc: '₹16 LPA', note: 'Part of JAP 2026 group', sectional: 63 },
            { tier: 2, name: 'IIM Ranchi', gen: 92.0, ncobc: 84, sc: 75, st: 65, ews: 92.0, fees: '₹13L', ctc: '₹16 LPA', note: 'Part of JAP 2026 group', sectional: 63 },
            { tier: 2, name: 'IIM Kashipur', gen: 92.0, ncobc: 83, sc: 74, st: 64, ews: 92.0, fees: '₹12L', ctc: '₹15 LPA', note: 'Part of JAP 2026 group', sectional: 60 },
            { tier: 2, name: 'IIM Rohtak', gen: 94.0, ncobc: 86, sc: 76, st: 66, ews: 94.0, fees: '₹14L', ctc: '₹16 LPA', note: 'Female GEN called at 92–94 vs 98+ for males!', sectional: 65, femaleBonus: true },
            { tier: 2, name: 'IIFT Delhi', gen: 96.0, ncobc: 90, sc: 80, st: 70, ews: 96.0, fees: '₹17L', ctc: '₹20 LPA', note: 'IIFT exam; also accepts CAT', sectional: 70 },
            { tier: 3, name: 'IMT Ghaziabad', gen: 88.0, ncobc: 80, sc: 70, st: 60, ews: 88.0, fees: '₹18L', ctc: '₹15 LPA', note: 'Strong for 85–92 range', sectional: 55 },
            { tier: 3, name: 'IMI New Delhi', gen: 87.0, ncobc: 79, sc: 69, st: 59, ews: 87.0, fees: '₹17L', ctc: '₹14 LPA', note: 'Workex given good weight', sectional: 55, workexBoost: true },
            { tier: 3, name: 'GIM Goa', gen: 83.0, ncobc: 75, sc: 65, st: 55, ews: 83.0, fees: '₹15L', ctc: '₹12 LPA', note: 'Good for 80–88 range', sectional: 50 },
            { tier: 3, name: 'TAPMI Manipal', gen: 80.0, ncobc: 72, sc: 62, st: 52, ews: 80.0, fees: '₹14L', ctc: '₹11 LPA', note: 'Good profile focus', sectional: 50 },
            { tier: 3, name: 'FORE New Delhi', gen: 82.0, ncobc: 74, sc: 65, st: 55, ews: 82.0, fees: '₹16L', ctc: '₹12 LPA', note: 'Good for Delhi aspirants', sectional: 50 },
            { tier: 3, name: 'XIMB Bhubaneswar', gen: 90.0, ncobc: 82, sc: 72, st: 62, ews: 90.0, fees: '₹16L', ctc: '₹15 LPA', note: 'XAT + CAT; strong in operations', sectional: 60 },
            { tier: 3, name: 'IIT Bombay SJMSOM', gen: 96.0, ncobc: 90, sc: 80, st: 70, ews: 96.0, fees: '₹8L', ctc: '₹26 LPA', note: 'Near-IIM quality at IIT fees', sectional: 70 },
            { tier: 3, name: 'IIT Delhi DMS', gen: 95.0, ncobc: 88, sc: 78, st: 68, ews: 95.0, fees: '₹4L', ctc: '₹22 LPA', note: 'CAT + interview; engineer friendly', sectional: 68 },
        ];

        /* ===== PREDICTOR ENGINE ===== */
        function runPredictor() {
            const score = parseInt(document.getElementById('scoreSlider').value);
            const varc = parseInt(document.getElementById('varc').value) || 0;
            const dilr = parseInt(document.getElementById('dilr').value) || 0;
            const qa = parseInt(document.getElementById('qa').value) || 0;
            const gender = document.getElementById('gender').value;
            const category = document.getElementById('category').value;
            const workex = parseInt(document.getElementById('workex').value);
            const background = document.getElementById('background').value;
            const tenth = parseFloat(document.getElementById('tenth').value) || 0;
            const twelfth = parseFloat(document.getElementById('twelfth').value) || 0;
            const grad = parseFloat(document.getElementById('grad').value) || 0;
            const gaps = document.getElementById('gaps').value;

            const percentile = scoreToPercentile(score);
            const varcPct = sectionToPercentile(varc);
            const dilrPct = sectionToPercentile(dilr);
            const qaPct = sectionToPercentile(qa);
            const minSectional = Math.min(varcPct, dilrPct, qaPct);

            // Get category cutoff key
            const catKey = { 'general': 'gen', 'ncobc': 'ncobc', 'sc': 'sc', 'st': 'st', 'ews': 'gen', 'pwd': 'sc' }[category] || 'gen';

            // Profile scoring
            const profileScore = calcProfileScore(tenth, twelfth, grad, workex, background, gender, gaps);

            // Categorize colleges
            const dream = [], ambitious = [], safe = [];

            COLLEGES.forEach(c => {
                let cutoff = c[catKey] || c.gen;

                // Apply female bonus
                if (gender === 'female' && c.femaleBonus) cutoff -= 3;
                if (gender === 'female' && c.diversityBonus) cutoff -= 1.5;

                // Non-engineer bonus at diversity-friendly colleges
                if (background === 'noneng' && c.diversityBonus) cutoff -= 1;

                // Workex boost
                if (workex >= 24 && c.workexBoost) cutoff -= 2;

                // Check sectional cutoffs
                const sectionalOk = minSectional >= (c.sectional || 60);

                const gap = percentile - cutoff;
                const chance = calculateChance(gap, profileScore, sectionalOk, tenth, twelfth, grad);

                const entry = { ...c, cutoff, chance, sectionalOk, gap };

                if (!sectionalOk) {
                    // Still show but with low chance
                    entry.chance = Math.min(entry.chance, 15);
                    entry.sectionalWarning = true;
                }

                if (gap >= 1.5) safe.push(entry);
                else if (gap >= -1.5) ambitious.push(entry);
                else if (gap >= -4) dream.push(entry);
            });

            // Sort by chance desc
            dream.sort((a, b) => b.chance - a.chance);
            ambitious.sort((a, b) => b.chance - a.chance);
            safe.sort((a, b) => b.chance - a.chance);

            renderResults({ percentile, score, varc, dilr, qa, varcPct, dilrPct, qaPct, gender, category, workex, background, tenth, twelfth, grad, dream: dream.slice(0, 4), ambitious: ambitious.slice(0, 6), safe: safe.slice(0, 6), profileScore, minSectional });

            // AI tips
            fetchAITips({ percentile, score, gender, category, workex, background, tenth, twelfth, grad, gaps, dream, ambitious, safe, minSectional });
        }

        function calcProfileScore(tenth, twelfth, grad, workex, background, gender, gaps) {
            let score = 0;
            const avgAcad = (tenth + twelfth + (grad > 10 ? grad : grad * 10)) / 3;
            if (avgAcad >= 90) score += 30;
            else if (avgAcad >= 85) score += 20;
            else if (avgAcad >= 80) score += 10;
            else if (avgAcad >= 75) score += 5;
            if (workex >= 36) score += 20;
            else if (workex >= 24) score += 15;
            else if (workex >= 12) score += 10;
            if (gender === 'female') score += 10;
            if (background === 'noneng') score += 8;
            if (background === 'doctor' || background === 'law') score += 8;
            if (gaps === 'none') score += 5;
            return Math.min(score, 100);
        }

        function calculateChance(gap, profileScore, sectionalOk, tenth, twelfth, grad) {
            let base = 0;
            if (gap >= 3) base = 90;
            else if (gap >= 2) base = 78;
            else if (gap >= 1) base = 65;
            else if (gap >= 0) base = 50;
            else if (gap >= -1) base = 35;
            else if (gap >= -2) base = 22;
            else if (gap >= -3) base = 12;
            else if (gap >= -4) base = 6;
            else base = 2;

            // Profile adjustments
            const avgAcad = (tenth + twelfth + (grad > 10 ? grad : grad * 10)) / 3;
            if (avgAcad >= 90) base += 8;
            else if (avgAcad < 75) base -= 10;

            base += (profileScore / 100) * 10;
            if (!sectionalOk) base = Math.min(base, 15);
            return Math.max(0, Math.min(95, Math.round(base)));
        }

        function renderResults(data) {
            const { percentile, score, varcPct, dilrPct, qaPct, gender, category, workex, background, dream, ambitious, safe, profileScore, minSectional } = data;

            const genderLabel = { 'male': 'Male', 'female': 'Female', 'other': 'Other' }[gender];
            const catLabel = { 'general': 'General', 'ncobc': 'NC-OBC', 'sc': 'SC', 'st': 'ST', 'ews': 'EWS', 'pwd': 'PwD' }[category];
            const bgLabel = { 'engineer': 'Engineer', 'noneng': 'Non-Engineer', 'doctor': 'Doctor', 'law': 'Law' }[background];
            const wxLabel = workex >= 48 ? '48+ months WE' : workex >= 36 ? '37–48m WE' : workex >= 24 ? '25–36m WE' : workex >= 12 ? '12–24m WE' : workex >= 1 ? '6–12m WE' : 'Fresher';

            const sectionalAlert = minSectional < 70 ? `<div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:12.5px;color:#DC2626;font-family:'Inter',sans-serif;display:flex;gap:8px;align-items:flex-start"><i class="ti ti-alert-triangle" style="font-size:16px;flex-shrink:0;margin-top:1px"></i><div><strong>Sectional Cutoff Warning!</strong> Your minimum sectional percentile is ${minSectional.toFixed(0)}. Most IIMs require 70–85+ in each section. A weak section can disqualify you even with a high overall score.</div></div>` : '';

            const html = `
    <div class="results-wrap">
      ${sectionalAlert}
      <div class="profile-summary">
        <div class="profile-summary-left">
          <h4>Your Profile</h4>
          <p>${genderLabel} · ${catLabel} · ${bgLabel}</p>
          <div class="profile-tags" style="margin-top:10px">
            <span class="profile-tag">${wxLabel}</span>
            <span class="profile-tag">VARC: ${varcPct.toFixed(0)}%ile</span>
            <span class="profile-tag">DILR: ${dilrPct.toFixed(0)}%ile</span>
            <span class="profile-tag">QA: ${qaPct.toFixed(0)}%ile</span>
            <span class="profile-tag">Profile Score: ${profileScore}/100</span>
          </div>
        </div>
        <div class="profile-percentile">
          <div class="big">${percentile.toFixed(1)}<span>%ile</span></div>
          <div class="lbl">Overall Percentile · Score ${score}/198</div>
        </div>
      </div>

      ${renderCollegeSection('🌟 Dream Colleges', dream, 'dream', 'rank-dream')}
      ${renderCollegeSection('🎯 Ambitious (Apply!)', ambitious, 'ambitious', 'rank-ambitious')}
      ${renderCollegeSection('✅ Safe Bets', safe, 'safe', 'rank-safe')}

      <div class="ai-tips-card">
        <h3><i class="ti ti-sparkles"></i> AI Strategy Analysis <span style="font-size:11px;font-weight:500;color:#7C3AED;margin-left:6px">Powered by Claude</span></h3>
        <div id="aiTipsContent">
          <div class="ai-loading">
            <div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div>
            <span style="margin-left:4px">Analysing your profile...</span>
          </div>
        </div>
      </div>
    </div>`;

            const section = document.getElementById('resultsSection');
            section.innerHTML = html;
            section.style.display = 'block';
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Animate chance bars
            setTimeout(() => {
                section.querySelectorAll('.chance-bar').forEach(bar => {
                    const w = bar.dataset.width;
                    bar.style.width = w + '%';
                });
            }, 200);
        }

        function renderCollegeSection(title, colleges, type, rankClass) {
            if (!colleges.length) return '';
            return `
    <div class="colleges-section">
      <h3>${title} <span class="section-tag ${type}">${colleges.length} colleges</span></h3>
      ${colleges.map((c, i) => `
        <div class="college-card">
          <div class="college-rank ${rankClass}">#${i + 1}</div>
          <div class="college-info">
            <div class="college-name">${c.name}</div>
            <div class="college-meta">
              <span><i class="ti ti-coin-rupee"></i>${c.fees} fees</span>
              <span><i class="ti ti-trending-up"></i>${c.ctc} avg</span>
              <span style="color:var(--ink3)">Cutoff: ${c.cutoff.toFixed(1)}%ile</span>
            </div>
            ${c.note ? `<div style="font-size:11px;color:var(--ink2);font-family:'Inter',sans-serif;margin-top:4px;font-style:italic">${c.note}</div>` : ''}
            ${c.sectionalWarning ? `<div class="college-diversity-note" style="background:#FEE2E2;color:#DC2626">⚠ Sectional cutoff may be an issue</div>` : ''}
            ${(c.diversityBonus || c.femaleBonus) && type !== 'safe' ? `<div class="college-diversity-note">✨ Diversity advantage applied</div>` : ''}
          </div>
          <div class="college-right">
            <div class="college-chance">${c.chance}%</div>
            <div class="college-chance-lbl">call chance</div>
            <div class="chance-bar-wrap">
              <div class="chance-bar ${c.chance >= 60 ? 'high' : c.chance >= 35 ? 'medium' : 'low'}" style="width:0%" data-width="${c.chance}"></div>
            </div>
          </div>
        </div>`).join('')}
    </div>`;
        }

        /* ===== AI TIPS via Claude ===== */
        async function fetchAITips(data) {
            const { percentile, gender, category, workex, background, tenth, twelfth, grad, gaps, dream, ambitious, safe, minSectional } = data;

            const dreamNames = dream.slice(0, 3).map(c => c.name).join(', ');
            const ambitiousNames = ambitious.slice(0, 3).map(c => c.name).join(', ');
            const safeNames = safe.slice(0, 3).map(c => c.name).join(', ');

            const prompt = `You are a CAT MBA admissions expert at MBA Partner. Analyse this student's profile and give 4–5 specific, actionable strategy tips.

Profile:
- CAT Percentile: ${percentile.toFixed(1)}
- Gender: ${gender}, Category: ${category}
- Background: ${background}
- Work Experience: ${workex} months
- Academics: 10th ${tenth}%, 12th ${twelfth}%, Grad ${grad}%
- Gaps/Backlogs: ${gaps}
- Weakest sectional: ${minSectional.toFixed(0)} percentile
- Dream colleges: ${dreamNames}
- Ambitious targets: ${ambitiousNames}  
- Safe colleges: ${safeNames}

Give 4–5 sharp, personalized tips. Format each as: **[Topic]:** [advice]. Be specific — mention actual college names, percentiles, and actionable next steps. Keep each tip 1–2 sentences max. Respond ONLY with the tips, no preamble.`;

            try {
                const res = await fetch('/.netlify/functions/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: 'claude-sonnet-4-6',
                        max_tokens: 500,
                        messages: [{ role: 'user', content: prompt }]
                    })
                });
                const json = await res.json();
                const text = json.content?.[0]?.text || '';
                const tips = text.split('\n').filter(t => t.trim());
                document.getElementById('aiTipsContent').innerHTML = tips.map(t =>
                    `<div class="ai-tip-item">${t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>`
                ).join('');
            } catch (e) {
                // Fallback tips if API not available
                const fallback = buildFallbackTips(data);
                document.getElementById('aiTipsContent').innerHTML = fallback.map(t =>
                    `<div class="ai-tip-item">${t}</div>`
                ).join('');
            }
        }

        function buildFallbackTips(data) {
            const { percentile, gender, category, workex, background, tenth, twelfth, grad, minSectional, dream, ambitious } = data;
            const tips = [];

            if (minSectional < 75) tips.push(`<strong>Sectional Priority:</strong> Your weakest section is at ${minSectional.toFixed(0)} percentile — IIMs like ABC, FMS require 80–85+ in each section. Fix this before targeting top IIMs.`);
            if (gender === 'female') tips.push(`<strong>Diversity Advantage:</strong> As a female candidate, you get 2–4 percentile relaxation at IIM Kozhikode, Rohtak, MDI, and SPJIMR. Prioritise these in your application list.`);
            if (background === 'noneng') tips.push(`<strong>Non-Engineer Bonus:</strong> IIM Bangalore, Kozhikode, and SPJIMR actively seek non-engineers. Your profile stands out — highlight this in your WAT-PI.`);
            if (workex >= 24) tips.push(`<strong>Work Experience Edge:</strong> Your ${workex} months of experience is valuable at MDI Gurgaon and SPJIMR which explicitly reward it. Prepare strong work-ex stories for PI.`);
            const avgAcad = (parseFloat(tenth) + parseFloat(twelfth) + (parseFloat(grad) > 10 ? parseFloat(grad) : parseFloat(grad) * 10)) / 3;
            if (avgAcad < 80) tips.push(`<strong>Academic Gap:</strong> Academics below 80% can affect IIM B and L shortlists significantly. Compensate with strong CAT score and exceptional interview performance.`);
            if (percentile >= 99) tips.push(`<strong>Top Percentile Strategy:</strong> At ${percentile.toFixed(1)}%ile, apply to IIM ABC, FMS, and all old IIMs — but prepare your profile story thoroughly. Score alone doesn't guarantee calls.`);
            if (tips.length < 3) tips.push(`<strong>Application Strategy:</strong> Apply to a mix of 2 dream, 4 ambitious, and 4 safe colleges. CAT results don't guarantee calls — your composite score including academics and profile matters equally.`);
            return tips.slice(0, 5);
        }

        /* ===== CONVERTER TAB ===== */
        function updateConverter(val) {
            val = parseFloat(val);
            const result = document.getElementById('convResult');
            if (!val || val < 0 || val > 198) { result.style.display = 'none'; return; }
            const pct = scoreToPercentile(val);
            document.getElementById('convPercentileResult').textContent = pct.toFixed(1) + ' Percentile';
            let note = '';
            if (pct >= 99.5) note = '🏆 Excellent! Competitive for IIM ABC, FMS Delhi';
            else if (pct >= 98) note = '🎯 Great score! Target old IIMs + FMS + MDI';
            else if (pct >= 95) note = '✅ Good score! MDI, SPJIMR, new IIMs in range';
            else if (pct >= 90) note = '📚 Decent — IMT, GIM, IIT B-schools accessible';
            else note = '💪 Keep preparing — aim for 95+ for good options';
            document.getElementById('convNote').textContent = note;
            result.style.display = 'block';
        }

        /* ===== CUTOFFS TABLE ===== */
        let currentCatFilter = 'all';
        function filterCutoffs(cat, btn) {
            currentCatFilter = cat;
            document.querySelectorAll('#tab-cutoffs .calc-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCutoffTable();
        }

        function renderCutoffTable() {
            const catCols = currentCatFilter === 'all'
                ? [{ key: 'gen', label: 'General' }, { key: 'ncobc', label: 'NC-OBC' }, { key: 'sc', label: 'SC' }, { key: 'st', label: 'ST' }]
                : [{ key: { general: 'gen', ncobc: 'ncobc', sc: 'sc', st: 'st' }[currentCatFilter] || 'gen', label: currentCatFilter.toUpperCase() }];

            let html = `<thead><tr>
    <th style="min-width:180px">College</th>
    ${catCols.map(c => `<th>${c.label} Cutoff</th>`).join('')}
    <th>Fees</th><th>Avg CTC</th><th>Note</th>
  </tr></thead><tbody>`;

            COLLEGES.forEach(c => {
                const tierLabel = { 1: 'Tier 1', 2: 'Tier 2', 3: 'Tier 3' }[c.tier];
                const tierClass = { 1: 'tier-1', 2: 'tier-2', 3: 'tier-3' }[c.tier];
                html += `<tr>
      <td>
        <div class="college-name-cell">${c.name}</div>
        <span class="tier-badge ${tierClass}">${tierLabel}</span>
      </td>
      ${catCols.map(col => `<td><strong>${(c[col.key] || c.gen).toFixed(0)}%ile</strong></td>`).join('')}
      <td>${c.fees}</td>
      <td style="color:var(--green);font-weight:700">${c.ctc}</td>
      <td style="font-size:11px;color:var(--ink2);max-width:180px">${c.note || '—'}</td>
    </tr>`;
            });
            html += '</tbody>';
            document.getElementById('cutoffTable').innerHTML = html;
        }

        /* ===== TAB SWITCHING ===== */
        function switchTab(id, btn) {
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.calc-tabs .calc-tab').forEach(b => b.classList.remove('active'));
            document.getElementById('tab-' + id).classList.add('active');
            btn.classList.add('active');
        }

        /* ===== INIT ===== */
        updateScore(120);
        renderCutoffTable();
