/* ADHD Field Guide — per-user layout personalization.
   Show / hide / reorder the main sections. Saved to localStorage under
   'adhd-layout-v1', which auth.js syncs to the signed-in account. */
(function () {
  "use strict";
  var isHe = document.documentElement.lang === 'he';
  var isAr = document.documentElement.dir === 'rtl' && !isHe;
  var KEY = 'adhd-layout-v1';

  // Reorderable / hideable sections (the readable content block, in default order)
  var SECTIONS = isHe ? [
    { id: 'basics', label: 'יסודות' }, { id: 'science', label: 'המחקר' },
    { id: 'signs', label: 'סימנים' }, { id: 'diagnosis', label: 'איך מאבחנים' }, { id: 'agecompare', label: 'ילדים ומבוגרים' }, { id: 'myths', label: 'מיתוסים' },
    { id: 'check', label: 'בדיקה עצמית' }, { id: 'tools', label: 'כלי מיקוד' },
    { id: 'cope', label: 'אסטרטגיות' }, { id: 'living', label: 'בחיים האמיתיים' },
    { id: 'meds', label: 'תרופות' }, { id: 'tracker', label: 'מעקב תרופות' },
    { id: 'advocate', label: 'הגנה עצמית' },
    { id: 'help', label: 'מתי לבקש עזרה' }
  ] : isAr ? [
    { id: 'basics', label: 'ما هو ADHD' }, { id: 'science', label: 'الأدلة' },
    { id: 'signs', label: 'العلامات' }, { id: 'diagnosis', label: 'كيف يُشخَّص' }, { id: 'agecompare', label: 'الأطفال والبالغون' }, { id: 'myths', label: 'الخرافات' },
    { id: 'check', label: 'الاختبار الذاتي' }, { id: 'tools', label: 'أدوات التركيز' },
    { id: 'cope', label: 'استراتيجيات' }, { id: 'living', label: 'في الحياة اليومية' },
    { id: 'meds', label: 'الأدوية' }, { id: 'tracker', label: 'متتبّع الأدوية' },
    { id: 'faith', label: 'روحانية' }, { id: 'advocate', label: 'المناصرة' },
    { id: 'help', label: 'متى تطلب المساعدة' }
  ] : [
    { id: 'basics', label: 'What ADHD is' }, { id: 'science', label: 'The evidence' },
    { id: 'signs', label: 'Signs' }, { id: 'diagnosis', label: 'How it’s diagnosed' }, { id: 'agecompare', label: 'Children vs adults' }, { id: 'myths', label: 'Myths' },
    { id: 'check', label: 'Self-check' }, { id: 'tools', label: 'Focus tools' },
    { id: 'cope', label: 'Strategies' }, { id: 'living', label: 'In real life' },
    { id: 'meds', label: 'Medications' }, { id: 'tracker', label: 'Med tracker' },
    { id: 'faith', label: 'Faith' }, { id: 'advocate', label: 'Advocate' },
    { id: 'help', label: 'When to get help' }
  ];
  var TAIL = ['gear', 'sources']; // always kept after the managed block

  var TXT = isHe ? {
    customize: 'התאמה אישית', title: 'התאם את הפריסה שלך',
    desc: 'הצג, הסתר וסדר מחדש חלקים כדי לבנות את העמוד סביב מה שאתה צריך. נשמר במכשיר שלך — ומסונכרן כשאתה מחובר.',
    hide: 'הסתר', show: 'הצג', reset: 'איפוס', done: 'סיום'
  } : isAr ? {
    customize: 'تخصيص', title: 'خصّص ترتيب صفحتك',
    desc: 'أظهِر الأقسام وأخفِها وأعد ترتيبها لتبني الصفحة حول ما يهمّك. تُحفظ على جهازك — وتُزامَن عند تسجيل الدخول.',
    hide: 'إخفاء', show: 'إظهار', reset: 'إعادة الضبط', done: 'تم'
  } : {
    customize: 'Customize', title: 'Personalize your layout',
    desc: 'Show, hide, and reorder sections to build the page around what you need. Saved on your device — and synced when you’re signed in.',
    hide: 'Hide', show: 'Show', reset: 'Reset', done: 'Done'
  };

  var defOrder = SECTIONS.map(function (s) { return s.id; });
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }

  var st = load();
  st.order = (st.order || []).filter(function (id) { return defOrder.indexOf(id) > -1; });
  defOrder.forEach(function (id) { if (st.order.indexOf(id) < 0) st.order.push(id); });
  st.hidden = (st.hidden || []).filter(function (id) { return defOrder.indexOf(id) > -1; });

  function labelOf(id) { for (var i = 0; i < SECTIONS.length; i++) if (SECTIONS[i].id === id) return SECTIONS[i].label; return id; }

  function apply() {
    var anchor = document.getElementById('contents');
    if (!anchor) return;
    var ref = anchor;
    st.order.forEach(function (id) { var el = document.getElementById(id); if (el) { ref.after(el); ref = el; } });
    TAIL.forEach(function (id) { var el = document.getElementById(id); if (el) { ref.after(el); ref = el; } });
    defOrder.forEach(function (id) {
      var el = document.getElementById(id); if (!el) return;
      var hide = st.hidden.indexOf(id) > -1;
      el.classList.toggle('u-hidden', hide);
      var toc = document.querySelector('.toc-item[href="#' + id + '"]');
      if (toc) toc.classList.toggle('u-hidden', hide);
    });
  }

  // ---- styles ----
  var css = '' +
    '.u-hidden{display:none!important}' +
    '.cust-back{position:fixed;inset:0;background:rgba(10,12,16,.55);display:none;align-items:center;justify-content:center;z-index:10000;padding:1rem}' +
    '.cust-back.open{display:flex}' +
    '.cust-modal{background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:18px;max-width:30rem;width:100%;max-height:84vh;overflow:auto;padding:1.4rem 1.4rem 1rem;box-shadow:0 24px 60px rgba(10,12,16,.35)}' +
    '.cust-modal h3{margin:.1rem 0 .35rem;font-size:1.25rem}' +
    '.cust-desc{color:var(--grey);font-size:.9rem;line-height:1.5;margin:0 0 1.1rem}' +
    '.cust-list{display:flex;flex-direction:column;gap:.45rem;margin-bottom:1rem}' +
    '.cust-row{display:flex;align-items:center;justify-content:space-between;gap:.6rem;padding:.55rem .7rem;border:1px solid var(--line);border-radius:12px;background:var(--paper)}' +
    '.cust-row.off{opacity:.55}' +
    '.cust-lbl{font-weight:600;font-size:.95rem}' +
    '.cust-ctrls{display:flex;gap:.35rem;align-items:center}' +
    '.cust-mv,.cust-eye{border:1px solid var(--line);background:var(--surface);color:var(--ink-soft);border-radius:8px;cursor:pointer;font-size:.8rem;padding:.28rem .55rem;line-height:1;font-family:inherit}' +
    '.cust-mv:hover,.cust-eye:hover{border-color:var(--accent);color:var(--accent)}' +
    '.cust-mv:disabled{opacity:.3;cursor:default;border-color:var(--line);color:var(--ink-soft)}' +
    '.cust-eye{min-width:3.6rem;text-align:center}' +
    '.cust-foot{display:flex;justify-content:space-between;gap:.6rem;position:sticky;bottom:-1rem;background:var(--surface);padding:.5rem 0 .2rem}' +
    '.cust-btn{border-radius:999px;padding:.55rem 1.2rem;font-weight:700;cursor:pointer;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-family:inherit;font-size:.9rem}' +
    '.cust-btn.primary{background:var(--accent);color:#fff;border-color:var(--accent)}';
  var styleEl = document.createElement('style'); styleEl.textContent = css; document.head.appendChild(styleEl);

  // ---- trigger button in the nav ----
  var tools = document.querySelector('.nav-tools');
  if (!tools) return;
  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'icon-btn'; btn.id = 'custBtn';
  btn.setAttribute('aria-label', TXT.customize);
  btn.textContent = '⚙ ' + TXT.customize;

  // ---- modal ----
  var back = document.createElement('div'); back.className = 'cust-back';
  back.innerHTML =
    '<div class="cust-modal" role="dialog" aria-modal="true" aria-label="' + TXT.title + '">' +
    '<h3>' + TXT.title + '</h3><p class="cust-desc">' + TXT.desc + '</p>' +
    '<div class="cust-list"></div>' +
    '<div class="cust-foot"><button class="cust-btn" data-reset>' + TXT.reset + '</button>' +
    '<button class="cust-btn primary" data-done>' + TXT.done + '</button></div></div>';
  document.body.appendChild(back);
  var listEl = back.querySelector('.cust-list');

  function renderList() {
    listEl.innerHTML = '';
    st.order.forEach(function (id, idx) {
      var hidden = st.hidden.indexOf(id) > -1;
      var row = document.createElement('div');
      row.className = 'cust-row' + (hidden ? ' off' : ''); row.setAttribute('data-id', id);
      row.innerHTML =
        '<span class="cust-lbl">' + labelOf(id) + '</span>' +
        '<span class="cust-ctrls">' +
        '<button class="cust-mv" data-mv="up" ' + (idx === 0 ? 'disabled' : '') + ' aria-label="up">↑</button>' +
        '<button class="cust-mv" data-mv="down" ' + (idx === st.order.length - 1 ? 'disabled' : '') + ' aria-label="down">↓</button>' +
        '<button class="cust-eye" data-eye>' + (hidden ? TXT.show : TXT.hide) + '</button></span>';
      listEl.appendChild(row);
    });
  }

  function persistApply() { save(st); apply(); renderList(); }

  back.addEventListener('click', function (e) {
    if (e.target === back || e.target.closest('[data-done]')) { back.classList.remove('open'); return; }
    if (e.target.closest('[data-reset]')) { st.order = defOrder.slice(); st.hidden = []; persistApply(); return; }
    var row = e.target.closest('.cust-row'); if (!row) return;
    var id = row.getAttribute('data-id');
    var mv = e.target.closest('.cust-mv');
    if (mv) {
      var i = st.order.indexOf(id), j = mv.getAttribute('data-mv') === 'up' ? i - 1 : i + 1;
      if (j >= 0 && j < st.order.length) { st.order.splice(i, 1); st.order.splice(j, 0, id); }
    } else if (e.target.closest('[data-eye]')) {
      var k = st.hidden.indexOf(id); if (k > -1) st.hidden.splice(k, 1); else st.hidden.push(id);
    } else return;
    persistApply();
  });

  btn.addEventListener('click', function () { renderList(); back.classList.add('open'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') back.classList.remove('open'); });

  tools.appendChild(btn);
  apply();
})();
