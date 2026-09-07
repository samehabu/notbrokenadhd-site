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
    creditH: 'בנוי על מחקר',
    creditP: 'התוכן במדריך הזה מבוסס על מקורות רפואיים ומדעיים, והמבנה והעיצוב שלו נבנו לפי מחקר נגישות קוגניטיבית שפורסם עבור קוראים עם ADHD ומוחות נוירו-שונים:',
    srcContent: 'המקורות הרפואיים למידע עצמו'
  } : isAr ? {
    min: 'دقيقة قراءة', top: 'العودة إلى الأعلى', progress: 'تقدّم القراءة',
    creditH: 'مبنيّ على البحث العلمي',
    creditP: 'محتوى هذا الدليل مبنيّ على مصادر طبية وعلمية، وبنيته وتصميمه مبنيّان على أبحاث منشورة في تيسير الوصول الإدراكي لأصحاب ADHD والأدمغة المختلفة:',
    srcContent: 'المصادر الطبية للمعلومات نفسها'
  } : {
    min: 'min read', top: 'Back to top', progress: 'Reading progress',
    creditH: 'Built on research',
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
    // Quiet mode: no motion anywhere, and reveals shown instantly
    ':root[data-calm="on"] #a11y-prog{transition:none}' +
    ':root[data-calm="on"] #a11y-top{transition:none}' +
    ':root[data-calm="on"] .reveal{opacity:1!important;transform:none!important;transition:none!important}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function calmOn(){ return document.documentElement.getAttribute('data-calm') === 'on'; }

  document.addEventListener('DOMContentLoaded', function () {
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

    var ticking = false;
    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var doc = document.documentElement;
        var h = doc.scrollHeight - doc.clientHeight;
        var y = window.scrollY || doc.scrollTop || 0;
        prog.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + '%';
        if (y > 700) top.classList.add('show'); else top.classList.remove('show');
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
      box.innerHTML = '<h3><span aria-hidden="true">🔬</span>' + T.creditH + '</h3>' +
                      '<p>' + content + '</p><ul>' + lis + '</ul>';
      wrap.appendChild(box);
    }
  });
})();
