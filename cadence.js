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
    meta: 'ניסיון חינם 3 ימים · נבדק על ידי קלינאים',
    cta: 'נסה את Cadence בחינם ←'
  } : isAr ? {
    badge: 'تطبيق مذاكرة لـ ADHD',
    h: 'ذاكِر مع دماغك المصاب بـ ADHD — لا ضدّه',
    p: 'يحوّل Cadence ملاحظاتك إلى جولات مذاكرة هادئة قائمة على الاسترجاع — متباعدة، ومكافِئة، ومضبوطة الإيقاع وفق طريقة عمل دماغ ADHD في التركيز والتذكّر.',
    meta: 'تجربة مجانية 3 أيام · مراجَع من مختصّين',
    cta: 'جرّب Cadence مجاناً ←'
  } : {
    badge: 'A study app for ADHD',
    h: 'Study with your ADHD brain — not against it',
    p: 'Cadence turns your notes into calm, recall-first study rounds — spaced, rewarded and paced for how an ADHD brain actually focuses and remembers.',
    meta: 'Free 3-day trial · reviewed by clinicians',
    cta: 'Try Cadence free →'
  };
  var NAV = isHe ? 'Cadence' : isAr ? 'Cadence' : 'Cadence';

  // ---- styles ----
  var css =
    '#cadence .cad-card{display:block;text-decoration:none;color:#fff;background:linear-gradient(135deg,#4f7fe0 0%,#2f6db5 45%,#0f857f 100%);border-radius:22px;padding:2rem 2.2rem;box-shadow:0 18px 44px rgba(47,109,181,.28);transition:transform .18s,box-shadow .18s;position:relative;overflow:hidden}' +
    '#cadence .cad-card:hover{transform:translateY(-4px);box-shadow:0 26px 60px rgba(47,109,181,.36)}' +
    '#cadence .cad-badge{display:inline-block;font-family:"IBM Plex Mono","Tajawal","Heebo",monospace;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.4);border-radius:999px;padding:.3rem .75rem;margin-bottom:.9rem}' +
    '#cadence h2.cad-h{font-size:1.9rem;line-height:1.12;margin:0 0 .6rem;color:#fff;max-width:24ch}' +
    '#cadence .cad-p{margin:0 0 .8rem;color:rgba(255,255,255,.92);font-size:1.02rem;line-height:1.5;max-width:60ch}' +
    '#cadence .cad-meta{display:block;font-family:"IBM Plex Mono","Tajawal","Heebo",monospace;font-size:.8rem;color:rgba(255,255,255,.85);margin-bottom:1.1rem}' +
    '#cadence .cad-cta{display:inline-block;background:#fff;color:#1f4e86;font-weight:700;border-radius:999px;padding:.7rem 1.4rem;font-size:.95rem}' +
    '#cadence .cad-mark{position:absolute;inset-inline-end:-30px;top:-30px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,.09)}' +
    '.cad-nav{background:var(--accent,#f2551f)!important;color:#fff!important;border-color:var(--accent,#f2551f)!important;font-weight:700}' +
    '.cad-foot{color:inherit}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ---- promo card (study-relevant spot) ----
  var sec = document.createElement('section');
  sec.id = 'cadence'; sec.className = 'sec';
  sec.innerHTML =
    '<div class="wrap"><a class="cad-card" href="' + URL + '" target="_blank" rel="noopener">' +
    '<span class="cad-mark"></span>' +
    '<span class="cad-badge">' + T.badge + '</span>' +
    '<h2 class="cad-h">' + T.h + '</h2>' +
    '<p class="cad-p">' + T.p + '</p>' +
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
})();
