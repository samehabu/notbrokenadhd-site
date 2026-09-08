/* ADHD Field Guide — bookmark / save-for-later.
   A ☆ on each section title, and a "Saved" panel in the nav to jump back.
   Stored under 'adhd-bookmarks-v1' (synced to the account via auth.js). */
(function () {
  "use strict";
  var isHe = document.documentElement.lang === 'he';
  var isAr = document.documentElement.dir === 'rtl' && !isHe;
  var isHu = document.documentElement.lang === 'hu';
  var KEY = 'adhd-bookmarks-v1';
  var SKIP = { illustrated: 1, downloads: 1, contents: 1, sources: 1, gear: 1, experience: 1, brainmap: 1 };

  var T = isHe ? {
    savedBtn: 'שמורים', title: 'החלקים השמורים שלך',
    empty: 'עדיין לא נשמר דבר — הקש ☆ ליד כותרת של כל חלק כדי לשמור אותו ולחזור אליו במהירות.',
    go: 'מעבר', remove: 'הסרה', close: 'סגירה', save: 'שמור חלק', saved: 'נשמר'
  } : isAr ? {
    savedBtn: 'المحفوظات', title: 'أقسامك المحفوظة',
    empty: 'لا أقسام محفوظة بعد — اضغط ☆ بجانب عنوان أي قسم لحفظه، لتعود إليه بسرعة.',
    go: 'انتقال', remove: 'إزالة', close: 'إغلاق', save: 'حفظ القسم', saved: 'محفوظ'
  } : isHu ? {
    savedBtn: 'Mentett', title: 'Mentett szakaszaid',
    empty: 'Még nincs mentve semmi — koppints a ☆-ra bármely szakasz címe mellett, hogy elmentsd és később gyorsan visszaugorj.',
    go: 'Ugrás', remove: 'Eltávolítás', close: 'Bezárás', save: 'Szakasz mentése', saved: 'Mentve'
  } : {
    savedBtn: 'Saved', title: 'Your saved sections',
    empty: 'Nothing saved yet — tap ☆ next to any section title to save it and jump back later.',
    go: 'Go', remove: 'Remove', close: 'Close', save: 'Save section', saved: 'Saved'
  };

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {} }
  var saved = load();

  // collect bookmarkable sections (titled content sections)
  var items = [], byId = {};
  [].forEach.call(document.querySelectorAll('section[id]'), function (sec) {
    if (SKIP[sec.id]) return;
    var h2 = sec.querySelector('.sec-head h2') || sec.querySelector('h2');
    if (!h2) return;
    var label = (h2.textContent || '').trim();
    if (!label) return;
    items.push({ id: sec.id, label: label }); byId[sec.id] = { sec: sec, h2: h2, label: label };
  });
  if (!items.length) return;
  saved = saved.filter(function (id) { return byId[id]; }); // drop stale

  // ---- styles ----
  var st = document.createElement('style');
  st.textContent =
    '.bm-star{background:none;border:none;cursor:pointer;font-size:1.05rem;line-height:1;color:var(--grey);margin-inline-start:.55rem;padding:.1rem .15rem;vertical-align:middle;transition:color .15s,transform .15s}' +
    '.bm-star:hover{color:var(--accent);transform:scale(1.18)}' +
    '.bm-star.on{color:var(--accent)}' +
    '.bm-count{background:var(--accent);color:#fff;border-radius:999px;font-size:.62rem;font-weight:700;padding:.05rem .34rem;margin-inline-start:.35rem}' +
    '.bm-back{position:fixed;inset:0;background:rgba(10,12,16,.55);display:none;align-items:center;justify-content:center;z-index:10000;padding:1rem}' +
    '.bm-back.open{display:flex}' +
    '.bm-modal{background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:18px;max-width:27rem;width:100%;max-height:82vh;overflow:auto;padding:1.3rem 1.3rem 1rem;box-shadow:0 24px 60px rgba(10,12,16,.35)}' +
    '.bm-modal h3{margin:.1rem 0 .85rem;font-size:1.2rem}' +
    '.bm-empty{color:var(--grey);font-size:.92rem;line-height:1.55}' +
    '.bm-row{display:flex;align-items:center;justify-content:space-between;gap:.6rem;padding:.55rem .7rem;border:1px solid var(--line);border-radius:12px;margin-bottom:.45rem;background:var(--paper)}' +
    '.bm-row .lbl{font-weight:600;font-size:.95rem}' +
    '.bm-row .acts{display:flex;gap:.4rem;flex:0 0 auto}' +
    '.bm-go,.bm-rm{border:1px solid var(--line);background:var(--surface);color:var(--ink-soft);border-radius:8px;cursor:pointer;font-size:.8rem;padding:.28rem .6rem;font-family:inherit}' +
    '.bm-go:hover,.bm-rm:hover{border-color:var(--accent);color:var(--accent)}' +
    '.bm-foot{display:flex;justify-content:flex-end;margin-top:.6rem}' +
    '.bm-close{border-radius:999px;padding:.5rem 1.15rem;font-weight:700;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font-family:inherit}';
  document.head.appendChild(st);

  function isSaved(id) { return saved.indexOf(id) > -1; }

  // ---- stars on each section ----
  items.forEach(function (it) {
    var star = document.createElement('button');
    star.type = 'button'; star.className = 'bm-star'; star.setAttribute('data-bm', it.id);
    star.setAttribute('aria-label', T.save);
    paintStar(star, it.id);
    star.addEventListener('click', function (e) { e.preventDefault(); toggle(it.id); });
    byId[it.id].h2.appendChild(star);
  });
  function paintStar(star, id) { var on = isSaved(id); star.textContent = on ? '★' : '☆'; star.classList.toggle('on', on); star.title = on ? T.saved : T.save; }

  // ---- nav button + panel ----
  var tools = document.querySelector('.nav-tools');
  var navBtn = null;
  if (tools) {
    navBtn = document.createElement('button');
    navBtn.type = 'button'; navBtn.className = 'icon-btn'; navBtn.id = 'bmBtn';
    navBtn.innerHTML = '☆ ' + T.savedBtn + ' <span class="bm-count" hidden>0</span>';
    tools.appendChild(navBtn);
    navBtn.addEventListener('click', openPanel);
  }
  var back = document.createElement('div'); back.className = 'bm-back';
  back.innerHTML = '<div class="bm-modal" role="dialog" aria-modal="true" aria-label="' + T.title + '">' +
    '<h3>' + T.title + '</h3><div class="bm-list"></div>' +
    '<div class="bm-foot"><button class="bm-close" data-close>' + T.close + '</button></div></div>';
  document.body.appendChild(back);
  var listEl = back.querySelector('.bm-list');

  function updateCount() {
    if (!navBtn) return;
    var c = navBtn.querySelector('.bm-count');
    c.textContent = saved.length; c.hidden = saved.length === 0;
  }
  function renderPanel() {
    if (!saved.length) { listEl.innerHTML = '<p class="bm-empty">' + T.empty + '</p>'; return; }
    listEl.innerHTML = saved.map(function (id) {
      return '<div class="bm-row" data-id="' + id + '"><span class="lbl">' + byId[id].label + '</span>' +
        '<span class="acts"><button class="bm-go" data-go>' + T.go + '</button>' +
        '<button class="bm-rm" data-rm>' + T.remove + '</button></span></div>';
    }).join('');
  }
  function toggle(id) { var i = saved.indexOf(id); if (i > -1) saved.splice(i, 1); else saved.push(id); persist(); refresh(); }
  function refresh() {
    [].forEach.call(document.querySelectorAll('.bm-star'), function (s) { paintStar(s, s.getAttribute('data-bm')); });
    renderPanel(); updateCount();
  }
  function openPanel() { renderPanel(); back.classList.add('open'); }

  back.addEventListener('click', function (e) {
    if (e.target === back || e.target.closest('[data-close]')) { back.classList.remove('open'); return; }
    var row = e.target.closest('.bm-row'); if (!row) return; var id = row.getAttribute('data-id');
    if (e.target.closest('[data-go]')) {
      back.classList.remove('open');
      var sec = byId[id] && byId[id].sec;
      if (sec) { sec.classList.remove('u-hidden'); sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    } else if (e.target.closest('[data-rm]')) { toggle(id); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') back.classList.remove('open'); });

  updateCount();
})();
