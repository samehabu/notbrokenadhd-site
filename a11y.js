/* ADHD Field Guide — cognitive-accessibility helpers.
   Built from published research on organising content for ADHD / neurodivergent
   readers (W3C COGA, BOIA, Stéphanie Walter, UserWay). Trilingual, RTL-aware.
   - reading-time badges on long reading sections (re-orientation, sense of scope)
   - a slim scroll-progress bar + a "back to top" button (re-orientation on long pages)
   - guarantees Quiet mode kills every reveal/scroll animation (no motion)
   - a visible "Built on research" credit box in the footer, with the sources. */
(function () {
  "use strict";
  var isHe = document.documentElement.lang === 'he';
  var isAr = document.documentElement.dir === 'rtl' && !isHe;

  var T = isHe ? {
    min: 'דק׳ קריאה', top: 'חזרה למעלה', progress: 'התקדמות בקריאה',
    prevLbl: 'הקודם', nextLbl: 'הבא', nowLbl: 'עכשיו',
    evLead: 'בנוי על מדע שנבדק בעמיתים.',
    evMid: ' המדריך מבוסס על בסיס הראיות הרפואי — כולל ',
    evStmt: 'הצהרת הקונצנזוס הבינלאומית של הפדרציה העולמית ל-ADHD',
    evMeta: ' — 208 מסקנות מבוססות-ראיות (Faraone ועמיתיו, 2021, Neuroscience & Biobehavioral Reviews). ',
    evSources: 'לכל המקורות ←',
    creditH: 'בנוי על מחקר', creditSci: 'מקור מדעי מרכזי:',
    creditP: 'התוכן במדריך הזה מבוסס על מקורות רפואיים ומדעיים, והמבנה והעיצוב שלו נבנו לפי מחקר נגישות קוגניטיבית שפורסם עבור קוראים עם ADHD ומוחות נוירו-שונים:',
    srcContent: 'המקורות הרפואיים למידע עצמו'
  } : isAr ? {
    min: 'دقيقة قراءة', top: 'العودة إلى الأعلى', progress: 'تقدّم القراءة',
    prevLbl: 'السابق', nextLbl: 'التالي', nowLbl: 'الآن',
    evLead: 'مبنيّ على علمٍ محكَّم.',
    evMid: ' يستند هذا الدليل إلى قاعدة الأدلة الطبية — بما في ذلك ',
    evStmt: 'بيان الإجماع الدولي للاتحاد العالمي لـ ADHD',
    evMeta: ' — 208 استنتاجاً قائماً على الأدلة (Faraone وزملاؤه، 2021، Neuroscience & Biobehavioral Reviews). ',
    evSources: 'اطّلع على كل المصادر ←',
    creditH: 'مبنيّ على البحث العلمي', creditSci: 'المرجع العلمي الأساسي:',
    creditP: 'محتوى هذا الدليل مبنيّ على مصادر طبية وعلمية، وبنيته وتصميمه مبنيّان على أبحاث منشورة في تيسير الوصول الإدراكي لأصحاب ADHD والأدمغة المختلفة:',
    srcContent: 'المصادر الطبية للمعلومات نفسها'
  } : {
    min: 'min read', top: 'Back to top', progress: 'Reading progress',
    prevLbl: 'Previous', nextLbl: 'Next', nowLbl: 'Now',
    evLead: 'Built on peer-reviewed science.',
    evMid: ' This guide is grounded in the medical evidence base — including the ',
    evStmt: 'World Federation of ADHD International Consensus Statement',
    evMeta: ' — 208 evidence-based conclusions (Faraone et al., 2021, Neuroscience & Biobehavioral Reviews). ',
    evSources: 'See all sources →',
    creditH: 'Built on research', creditSci: 'Key scientific reference:',
    creditP: 'The information in this guide is grounded in clinical and scientific sources, and the way it is laid out follows published cognitive-accessibility research for people with ADHD and neurodivergent minds:',
    srcContent: 'the medical sources for the information itself'
  };

  // Design/accessibility sources (same in every language — proper resources).
  var SRC = [
    ['W3C — Making Content Usable for People with Cognitive and Learning Disabilities (COGA)', 'https://www.w3.org/TR/coga-usable/'],
    ['Bureau of Internet Accessibility — Making your website more accessible for people with ADHD', 'https://www.boia.org/blog/how-to-make-your-website-more-accessible-for-people-with-adhd'],
    ['Stéphanie Walter — Neurodiversity & UX: cognitive-accessibility resources', 'https://stephaniewalter.design/blog/neurodiversity-and-ux-essential-resources-for-cognitive-accessibility/'],
    ['UserWay — Designing for people with ADHD', 'https://userway.org/blog/people-with-adhd/']
  ];

  // Flagship scientific reference for the guide's CONTENT (peer-reviewed, PubMed/NIH).
  var STMT = 'https://pubmed.ncbi.nlm.nih.gov/33549739/';

  // Sections that are "reading" (get a reading-time badge if long enough).
  var READ = {basics:1, science:1, signs:1, diagnosis:1, agecompare:1, myths:1,
              cope:1, living:1, meds:1, advocate:1, help:1};

  var css =
    // progress bar
    '#a11y-prog{position:fixed;inset-block-start:0;inset-inline-start:0;height:3px;width:0;' +
      'background:linear-gradient(90deg,var(--accent,#f2551f),#f2a51f);z-index:1200;' +
      'transition:width .12s linear;pointer-events:none}' +
    // back to top
    '#a11y-top{position:fixed;inset-block-end:20px;inset-inline-end:18px;z-index:1200;' +
      'display:inline-flex;align-items:center;gap:.4rem;border:1px solid var(--line,#dbe1e8);' +
      'background:var(--surface,#fff);color:var(--ink,#141a21);font:inherit;font-weight:700;font-size:.82rem;' +
      'padding:.55rem .8rem;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.16);cursor:pointer;' +
      'opacity:0;transform:translateY(10px);transition:opacity .2s,transform .2s;pointer-events:none}' +
    '#a11y-top.show{opacity:1;transform:none;pointer-events:auto}' +
    '#a11y-top:hover{border-color:var(--accent,#f2551f);color:var(--accent,#f2551f)}' +
    '#a11y-top .ar{font-size:1rem;line-height:1}' +
    // reading-time badge
    '.rt-badge{display:inline-flex;align-items:center;gap:.35rem;margin:-.2rem 0 1rem;' +
      'font-size:.76rem;font-weight:700;color:var(--grey,#59626f);' +
      'background:var(--surface-2,#f6f8fa);border:1px solid var(--line,#dbe1e8);' +
      'border-radius:999px;padding:.22rem .7rem;line-height:1.4}' +
    '.rt-badge .ar{font-size:.85rem}' +
    // built-on-research credit
    '.rsch-credit{margin:1.1rem 0 .2rem;padding:1rem 1.1rem;border:1px solid var(--line,#dbe1e8);' +
      'border-radius:14px;background:var(--surface-2,#f6f8fa);max-width:760px}' +
    '.rsch-credit h3{margin:.1rem 0 .5rem;font-size:1rem;display:flex;align-items:center;gap:.45rem}' +
    '.rsch-credit p{margin:.2rem 0 .6rem;font-size:.9rem;line-height:1.7;color:var(--grey,#59626f)}' +
    '.rsch-credit ul{margin:.2rem 0 0;padding-inline-start:1.1rem;font-size:.85rem;line-height:1.65}' +
    '.rsch-credit li{margin:.25rem 0}' +
    '.rsch-credit a{color:var(--accent,#f2551f);font-weight:600}' +
    '.rsch-credit strong{color:var(--ink,#141a21)}' +
    // "built on research" evidence bar at the top of the page
    '#evbar{max-width:var(--maxw,1080px);margin:1.3rem auto 0;padding:0 1.5rem;box-sizing:border-box}' +
    '#evbar .in{display:flex;gap:.75rem;align-items:flex-start;background:var(--surface,#fff);' +
      'border:1px solid var(--line,#dbe1e8);border-inline-start:3px solid var(--accent,#f2551f);' +
      'border-radius:12px;padding:.8rem 1.05rem;box-shadow:var(--shadow);' +
      'font-size:.9rem;line-height:1.55;color:var(--ink-soft,#39424e)}' +
    '#evbar .ic{font-size:1.15rem;flex:none;line-height:1.35}' +
    '#evbar p{margin:0}' +
    '#evbar strong{color:var(--ink,#141a21)}' +
    '#evbar a{color:var(--accent,#f2551f);font-weight:700;text-decoration:none}' +
    '#evbar a:hover{text-decoration:underline}' +
    // section pager (previous / next category), sticky under the nav
    '#a11y-pager{position:fixed;inset-inline:0;z-index:40;display:flex;gap:.4rem;align-items:center;' +
      'justify-content:space-between;padding:.28rem clamp(.5rem,3vw,1.4rem);' +
      'background:color-mix(in srgb,var(--surface,#fff) 90%,transparent);' +
      'backdrop-filter:saturate(1.3) blur(10px);-webkit-backdrop-filter:saturate(1.3) blur(10px);' +
      'border-bottom:1px solid var(--line,#dbe1e8);box-shadow:0 6px 16px -12px rgba(0,0,0,.4);' +
      'transform:translateY(-8px);opacity:0;pointer-events:none;transition:opacity .2s,transform .2s}' +
    '#a11y-pager.show{opacity:1;transform:none;pointer-events:auto}' +
    '#a11y-pager a{display:inline-flex;align-items:center;gap:.45rem;max-width:44%;min-width:0;' +
      'text-decoration:none;color:var(--ink-soft,#39424e);padding:.3rem .5rem;border-radius:9px;' +
      'transition:color .15s,background .15s}' +
    '#a11y-pager a:hover{color:var(--accent,#f2551f);background:var(--surface-2,#f6f8fa)}' +
    '#a11y-pager a.pg-off{visibility:hidden;pointer-events:none}' +
    '#a11y-pager .ar{font-size:1.05rem;flex:none;color:var(--accent,#f2551f)}' +
    '#a11y-pager .pg-txt{display:flex;flex-direction:column;min-width:0;line-height:1.15}' +
    '#a11y-pager .lb{font-size:.6rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;' +
      'color:var(--grey,#59626f)}' +
    '#a11y-pager .tt2{font-size:.84rem;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '#a11y-pager .pg-next{text-align:end}' +
    '#a11y-pager .pg-now{align-self:center;max-width:26%;font-size:.72rem;font-weight:700;color:var(--grey,#59626f);' +
      'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}' +
    '@media(max-width:640px){#a11y-pager .pg-now{display:none}#a11y-pager a{max-width:49%}}' +
    // keep anchor jumps clear of the nav + pager
    '[id]{scroll-margin-top:var(--a11y-anchor,70px)}' +
    ':root[data-calm="on"] #a11y-pager{transition:none;backdrop-filter:none;-webkit-backdrop-filter:none;background:var(--surface,#fff)}' +
    // Quiet mode: no motion anywhere, and reveals shown instantly
    ':root[data-calm="on"] #a11y-prog{transition:none}' +
    ':root[data-calm="on"] #a11y-top{transition:none}' +
    ':root[data-calm="on"] .reveal{opacity:1!important;transform:none!important;transition:none!important}' +
    // print / PDF export: drop the chrome, keep the content
    '@media print{#a11y-prog,#a11y-top,#a11y-pager,#evbar,.nav{display:none!important}' +
      '.reveal{opacity:1!important;transform:none!important}body{background:#fff!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function calmOn(){ return document.documentElement.getAttribute('data-calm') === 'on'; }

  document.addEventListener('DOMContentLoaded', function () {
    // ---- "built on research" evidence bar (top of page, guide pages only) ----
    var hero = document.querySelector('.hero');
    if (hero && document.getElementById('sources')) {
      var ev = document.createElement('div'); ev.id = 'evbar';
      ev.innerHTML = '<div class="in"><span class="ic" aria-hidden="true">🔬</span>' +
        '<p><strong>' + T.evLead + '</strong>' + T.evMid +
        '<a href="' + STMT + '" target="_blank" rel="noopener">' + T.evStmt + '</a>' +
        T.evMeta + '<a href="#sources">' + T.evSources + '</a></p></div>';
      hero.parentNode.insertBefore(ev, hero.nextSibling);
    }

    // ---- reading-time badges ----
    Object.keys(READ).forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return;
      var h = sec.querySelector('h2'); if (!h) return;
      var clone = sec.cloneNode(true);
      Array.prototype.forEach.call(clone.querySelectorAll('script,style,button,input,textarea,select,.rt-badge'), function (n) { n.remove(); });
      var words = (clone.textContent || '').trim().split(/\s+/).filter(Boolean).length;
      if (words < 320) return;                 // only badge genuinely long sections (~1.5 min+)
      var mins = Math.max(1, Math.round(words / 200));
      var b = document.createElement('div');
      b.className = 'rt-badge reveal';
      b.setAttribute('aria-label', mins + ' ' + T.min);
      b.innerHTML = '<span class="ar" aria-hidden="true">◷</span>' + mins + ' ' + T.min;
      if (h.nextSibling) h.parentNode.insertBefore(b, h.nextSibling); else h.parentNode.appendChild(b);
    });

    // ---- progress bar + back to top ----
    var prog = document.createElement('div'); prog.id = 'a11y-prog';
    prog.setAttribute('role', 'progressbar'); prog.setAttribute('aria-label', T.progress);
    document.body.appendChild(prog);

    var top = document.createElement('button'); top.id = 'a11y-top'; top.type = 'button';
    top.setAttribute('aria-label', T.top);
    top.innerHTML = '<span class="ar" aria-hidden="true">↑</span><span>' + T.top + '</span>';
    document.body.appendChild(top);
    top.addEventListener('click', function () {
      var reduce = calmOn() || window.matchMedia('(prefers-reduced-motion:reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });

    // ---- section pager (previous / next category) ----
    var nav = document.querySelector('.nav');
    // ordered list of content sections + their short titles (the eyebrow kicker)
    var cats = [];
    Array.prototype.forEach.call(document.querySelectorAll('section[id]'), function (sec) {
      var eb = sec.querySelector('.eyebrow');
      var title = eb && eb.textContent.trim();
      if (!title) { var h = sec.querySelector('h2'); title = h ? h.textContent.replace(/[☆★]/g, '').trim() : ''; }
      if (title) cats.push({ el: sec, title: title });
    });

    var pager = null, pgPrev, pgNext, pgNow, lastIdx = -2;
    function navH() { return nav ? nav.offsetHeight : 0; }
    function topOf(el) { return el.getBoundingClientRect().top + (window.scrollY || 0); }
    function goTo(el) {
      var reduce = calmOn() || window.matchMedia('(prefers-reduced-motion:reduce)').matches;
      var y = topOf(el) - navH() - (pager ? pager.offsetHeight : 0) - 10;
      window.scrollTo({ top: Math.max(0, y), behavior: reduce ? 'auto' : 'smooth' });
    }
    if (cats.length > 2) {
      pager = document.createElement('nav');
      pager.id = 'a11y-pager';
      pager.setAttribute('aria-label', T.progress);
      pager.innerHTML =
        '<a class="pg-prev" href="#"><span class="ar" aria-hidden="true">↑</span>' +
          '<span class="pg-txt"><span class="lb">' + T.prevLbl + '</span><span class="tt2"></span></span></a>' +
        '<span class="pg-now"></span>' +
        '<a class="pg-next" href="#"><span class="pg-txt"><span class="lb">' + T.nextLbl + '</span><span class="tt2"></span></span>' +
          '<span class="ar" aria-hidden="true">↓</span></a>';
      document.body.appendChild(pager);
      pgPrev = pager.querySelector('.pg-prev');
      pgNext = pager.querySelector('.pg-next');
      pgNow = pager.querySelector('.pg-now');
      pgPrev.addEventListener('click', function (e) { e.preventDefault(); if (pgPrev._t) goTo(pgPrev._t); });
      pgNext.addEventListener('click', function (e) { e.preventDefault(); if (pgNext._t) goTo(pgNext._t); });
    }
    function updatePager(y) {
      if (!pager) return;
      pager.style.top = navH() + 'px';
      document.documentElement.style.setProperty('--a11y-anchor', (navH() + pager.offsetHeight + 12) + 'px');
      if (y < 500) { pager.classList.remove('show'); return; }
      pager.classList.add('show');
      var probe = y + navH() + pager.offsetHeight + 24;
      var idx = 0;
      for (var i = 0; i < cats.length; i++) { if (topOf(cats[i].el) <= probe) idx = i; else break; }
      if (idx === lastIdx) return; lastIdx = idx;
      var prev = cats[idx - 1], next = cats[idx + 1];
      if (prev) { pgPrev.classList.remove('pg-off'); pgPrev._t = prev.el; pgPrev.querySelector('.tt2').textContent = prev.title; pgPrev.setAttribute('aria-label', T.prevLbl + ': ' + prev.title); }
      else { pgPrev.classList.add('pg-off'); pgPrev._t = null; }
      if (next) { pgNext.classList.remove('pg-off'); pgNext._t = next.el; pgNext.querySelector('.tt2').textContent = next.title; pgNext.setAttribute('aria-label', T.nextLbl + ': ' + next.title); }
      else { pgNext.classList.add('pg-off'); pgNext._t = null; }
      pgNow.textContent = cats[idx].title;
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var doc = document.documentElement;
        var h = doc.scrollHeight - doc.clientHeight;
        var y = window.scrollY || doc.scrollTop || 0;
        prog.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + '%';
        if (y > 700) top.classList.add('show'); else top.classList.remove('show');
        updatePager(y);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    // ---- "Built on research" footer credit ----
    var footer = document.querySelector('footer');
    if (footer) {
      var wrap = footer.querySelector('.wrap') || footer;
      var box = document.createElement('div'); box.className = 'rsch-credit';
      var srcSec = document.getElementById('sources');
      var content = srcSec
        ? T.creditP.replace(/:$/, '') + ' — <a href="#sources">' + T.srcContent + '</a>:'
        : T.creditP;
      var lis = SRC.map(function (s) {
        return '<li><a href="' + s[1] + '" target="_blank" rel="noopener">' + s[0] + '</a></li>';
      }).join('');
      var sci = '<p><strong>' + T.creditSci + '</strong> ' +
        '<a href="' + STMT + '" target="_blank" rel="noopener">' + T.evStmt + '</a>' + T.evMeta + '</p>';
      box.innerHTML = '<h3><span aria-hidden="true">🔬</span>' + T.creditH + '</h3>' +
                      '<p>' + content + '</p>' + sci + '<ul>' + lis + '</ul>';
      wrap.appendChild(box);
    }
  });
})();
