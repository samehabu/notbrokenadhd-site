/* ADHD Field Guide — Cadence (partner study app) promo.
   Adds a study-relevant promo card in the guide, a nav button, and a footer link.
   Trilingual. Cadence: cadenceadhd.com — a study app for ADHD brains. */
(function () {
  "use strict";
  var URL = 'https://cadenceadhd.com';
  var isHe = document.documentElement.lang === 'he';
  var isAr = document.documentElement.dir === 'rtl' && !isHe;
  var T = isHe ? {
    badge: 'אפליקציית לימוד ל-ADHD',
    h: 'תלמד עם המוח שלך עם ADHD — לא נגדו',
    p: 'Cadence הופך את ההערות שלך לסבבי למידה רגועים מבוססי-היזכרות — מרווחים, מתגמלים ומתוזמנים לאיך שמוח ADHD באמת מתמקד וזוכר.',
    quote: '«מבריק.»', cite: 'פרופ׳ ד״ר אדה פרצ׳סקה · יו״ר הפסיכיאטריה, אוניברסיטת דברצן',
    meta: 'נבדק על ידי יו״ר פסיכיאטריה · מבוסס על ~100 מחקרים · ניסיון חינם 3 ימים',
    cta: 'נסה את Cadence בחינם ←',
    srcDesc: 'אפליקציית לימוד ל-ADHD — הופכת הערות לסבבי היזכרות. נבדקה על ידי קלינאים.'
  } : isAr ? {
    badge: 'تطبيق مذاكرة لـ ADHD',
    h: 'ذاكِر مع دماغك المصاب بـ ADHD — لا ضدّه',
    p: 'يحوّل Cadence ملاحظاتك إلى جولات مذاكرة هادئة قائمة على الاسترجاع — متباعدة، ومكافِئة، ومضبوطة الإيقاع وفق طريقة عمل دماغ ADHD في التركيز والتذكّر.',
    quote: '«رائع.»', cite: 'أ.د. إيدي فريتشكا · رئيس قسم الطب النفسي، جامعة دبرتسن',
    meta: 'مراجَع من رئيس قسم الطب النفسي · مبنيّ على ~100 دراسة · تجربة مجانية 3 أيام',
    cta: 'جرّب Cadence مجاناً ←',
    srcDesc: 'تطبيق مذاكرة لـ ADHD — يحوّل ملاحظاتك إلى جولات استرجاع. مراجَع من مختصّين.'
  } : {
    badge: 'A study app for ADHD',
    h: 'Study with your ADHD brain — not against it',
    p: 'Cadence turns your notes into calm, recall-first study rounds — spaced, rewarded and paced for how an ADHD brain actually focuses and remembers.',
    quote: '“Brilliant.”', cite: 'Prof. Dr. Ede Frecska · Chair of Psychiatry, University of Debrecen',
    meta: 'Reviewed by a Chairman of Psychiatry · built on ~100 studies · free 3-day trial',
    cta: 'Try Cadence free →',
    srcDesc: 'A study app for ADHD — turns notes into recall-first study rounds. Reviewed by clinicians.'
  };
  var NAV = 'Cadence';

  // ---- styles ----
  var css =
    '#cadence .cad-card{display:block;text-decoration:none;color:#fff;background:linear-gradient(135deg,#4f7fe0 0%,#2f6db5 45%,#0f857f 100%);border-radius:22px;padding:2rem 2.2rem;box-shadow:0 18px 44px rgba(47,109,181,.28);transition:transform .18s,box-shadow .18s;position:relative;overflow:hidden}' +
    '#cadence .cad-card:hover{transform:translateY(-4px);box-shadow:0 26px 60px rgba(47,109,181,.36)}' +
    '#cadence .cad-badge{display:inline-block;font-family:"IBM Plex Mono","Tajawal","Heebo",monospace;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.4);border-radius:999px;padding:.3rem .75rem;margin-bottom:.9rem}' +
    '#cadence h2.cad-h{font-size:1.9rem;line-height:1.12;margin:0 0 .6rem;color:#fff;max-width:24ch}' +
    '#cadence .cad-p{margin:0 0 .8rem;color:rgba(255,255,255,.92);font-size:1.02rem;line-height:1.5;max-width:60ch}' +
    '#cadence .cad-quote{margin:.2rem 0 .9rem;padding-inline-start:.85rem;border-inline-start:3px solid rgba(255,255,255,.55);max-width:52ch}' +
    '#cadence .cad-quote b{font-size:1.15rem;color:#fff}' +
    '#cadence .cad-quote cite{display:block;font-style:normal;font-size:.82rem;color:rgba(255,255,255,.8);margin-top:.2rem}' +
    '#cadence .cad-stars{color:#ffd45e;font-size:.95rem;letter-spacing:2px;margin-inline-start:.5rem}' +
    '#cadence .cad-meta{display:block;font-family:"IBM Plex Mono","Tajawal","Heebo",monospace;font-size:.8rem;color:rgba(255,255,255,.9);margin-bottom:1.1rem}' +
    '#cadence .cad-cta{display:inline-block;background:#fff;color:#1f4e86;font-weight:800;border-radius:999px;padding:.8rem 1.6rem;font-size:1rem;box-shadow:0 6px 18px rgba(0,0,0,.18)}' +
    '#cadence .cad-mark{position:absolute;inset-inline-end:-30px;top:-30px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.09)}' +
    '#sources a.src.cad-src .org{color:#2f6db5}' +
    '.cad-nav{background:var(--accent,#f2551f)!important;color:#fff!important;border-color:var(--accent,#f2551f)!important;font-weight:700}' +
    '.cad-foot{color:inherit}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ---- promo card (study-relevant spot) ----
  var sec = document.createElement('section');
  sec.id = 'cadence'; sec.className = 'sec';
  sec.innerHTML =
    '<div class="wrap"><a class="cad-card" href="' + URL + '" target="_blank" rel="noopener">' +
    '<span class="cad-mark"></span>' +
    '<span class="cad-badge">' + T.badge + '<span class="cad-stars">★★★★★</span></span>' +
    '<h2 class="cad-h">' + T.h + '</h2>' +
    '<p class="cad-p">' + T.p + '</p>' +
    '<blockquote class="cad-quote"><b>' + T.quote + '</b><cite>' + T.cite + '</cite></blockquote>' +
    '<span class="cad-meta">' + T.meta + '</span>' +
    '<span class="cad-cta">' + T.cta + '</span></a></div>';

  // insert after the "in real life / work & study" section (study-relevant); fall back near tools
  var anchor = document.getElementById('living') || document.getElementById('tracker') || document.getElementById('tools');
  if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(sec, anchor.nextSibling);
  else {
    var gear = document.getElementById('gear');
    if (gear && gear.parentNode) gear.parentNode.insertBefore(sec, gear);
    else (document.querySelector('main') || document.body).appendChild(sec);
  }

  // ---- nav button ----
  var tools = document.querySelector('.nav-tools');
  if (tools) {
    var a = document.createElement('a');
    a.className = 'icon-btn cad-nav'; a.href = URL; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = NAV; a.setAttribute('aria-label', 'Cadence — ' + T.badge);
    tools.appendChild(a);
  }

  // ---- footer link ----
  var footer = document.querySelector('footer');
  if (footer) {
    var priv = footer.querySelector('a[href*="privacy"]');
    var fa = document.createElement('a');
    fa.className = 'cad-foot'; fa.href = URL; fa.target = '_blank'; fa.rel = 'noopener'; fa.textContent = 'Cadence';
    if (priv && priv.parentNode) { priv.parentNode.insertBefore(document.createTextNode(' · '), priv.nextSibling); priv.parentNode.insertBefore(fa, priv.nextSibling.nextSibling); }
    else { footer.appendChild(document.createTextNode(' · ')); footer.appendChild(fa); }
  }

  // ---- entry in the Sources & further reading grid (labeled as a study tool) ----
  var srcGrid = document.querySelector('#sources .src-grid');
  if (srcGrid) {
    var sa = document.createElement('a');
    sa.className = 'src cad-src'; sa.href = URL; sa.target = '_blank'; sa.rel = 'noopener';
    sa.innerHTML = '<span class="org">Cadence <span class="ext">↗</span></span><span class="desc">' + T.srcDesc + '</span>';
    srcGrid.appendChild(sa);
  }
})();
