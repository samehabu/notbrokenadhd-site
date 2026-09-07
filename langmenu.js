/* ADHD Field Guide — globe language menu.
   Replaces the inline language links in the nav with a single earth/globe button
   that opens a dropdown of the site's languages (English · العربية · עברית). */
(function () {
  "use strict";
  var isHe = document.documentElement.lang === 'he';
  var isAr = document.documentElement.dir === 'rtl' && !isHe;
  var cur = isHe ? 'he' : isAr ? 'ar' : 'en';

  var LANGS = [
    { code: 'en', label: 'English', href: 'index.html', font: "'Bricolage Grotesque','Segoe UI',sans-serif" },
    { code: 'ar', label: 'العربية', href: 'ar.html',    font: "'Tajawal','Cairo','Segoe UI',sans-serif" },
    { code: 'he', label: 'עברית',   href: 'he.html',    font: "'Heebo','Rubik','Segoe UI',sans-serif" }
  ];
  var ARIA = 'Language · اللغة · שפה';

  var css =
    '.lang-wrap{position:relative;display:inline-flex}' +
    '.lang-globe{display:inline-flex;align-items:center;gap:.32rem}' +
    '.lang-globe .cav{transition:transform .18s}' +
    '.lang-globe[aria-expanded="true"] .cav{transform:rotate(180deg)}' +
    '.lang-menu{position:absolute;inset-inline-end:0;top:calc(100% + 8px);min-width:160px;' +
      'background:var(--surface,#fff);border:1px solid var(--line,#dbe1e8);border-radius:12px;' +
      'box-shadow:0 14px 34px rgba(0,0,0,.18);padding:.35rem;z-index:60}' +
    '.lang-menu a{display:flex;align-items:center;justify-content:space-between;gap:.7rem;' +
      'padding:.5rem .7rem;border-radius:8px;text-decoration:none;color:var(--ink,#141a21);' +
      'font-size:.92rem;line-height:1.2}' +
    '.lang-menu a:hover,.lang-menu a:focus{background:var(--surface-2,#f6f8fa)}' +
    '.lang-menu a.is-cur{color:var(--accent,#f2551f);font-weight:700}' +
    '.lang-menu a .chk{flex:none;color:var(--accent,#f2551f)}' +
    ':root[data-calm="on"] .lang-globe .cav{transition:none}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var globeSVG = '<svg class="cg" width="16" height="16" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/>' +
    '<path d="M12 3c2.6 2.6 3.9 5.8 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.8-3.9-9S9.4 5.6 12 3z"/></svg>';
  var caret = '<svg class="cav" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  document.addEventListener('DOMContentLoaded', function () {
    var tools = document.querySelector('.nav-tools');
    if (!tools) return;

    // remove the old inline language links (anchors pointing at the 3 pages)
    Array.prototype.forEach.call(tools.querySelectorAll('a.icon-btn'), function (a) {
      if (/(^|\/)(index|ar|he)\.html(\?|#|$)/.test(a.getAttribute('href') || '')) a.remove();
    });

    var wrap = document.createElement('div'); wrap.className = 'lang-wrap';
    var btn = document.createElement('button');
    btn.className = 'icon-btn lang-globe'; btn.type = 'button';
    btn.setAttribute('aria-label', ARIA);
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = globeSVG + caret;

    var menu = document.createElement('div');
    menu.className = 'lang-menu'; menu.setAttribute('role', 'menu'); menu.hidden = true;
    menu.innerHTML = LANGS.map(function (l) {
      var on = l.code === cur;
      return '<a role="menuitem" href="' + l.href + '" lang="' + l.code + '"' +
        (on ? ' aria-current="true"' : '') + ' class="lang-opt' + (on ? ' is-cur' : '') + '"' +
        ' style="font-family:' + l.font + '"><span>' + l.label + '</span>' +
        (on ? '<span class="chk" aria-hidden="true">✓</span>' : '') + '</a>';
    }).join('');

    wrap.appendChild(btn); wrap.appendChild(menu);
    tools.insertBefore(wrap, tools.firstChild);

    function open() { menu.hidden = false; btn.setAttribute('aria-expanded', 'true'); }
    function close() { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); if (menu.hidden) open(); else close();
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  });
})();
