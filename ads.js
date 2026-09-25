/* ADHD Field Guide — optional ads (Google AdSense), with consent.
   Ads are OFF until you set ADHD_CONFIG.ADS in config.js. Nothing loads,
   and no ad cookies are set, until the visitor accepts. See ADS_SETUP.md. */
(function () {
  "use strict";

  var cfg = (window.ADHD_CONFIG && window.ADHD_CONFIG.ADS) || {};
  var slots = [].slice.call(document.querySelectorAll('.ad-slot'));
  var configured = cfg.ENABLED && typeof cfg.CLIENT === 'string' && cfg.CLIENT.indexOf('ca-pub-') === 0;

  // Not set up → hide the slots, show no banner, set no cookies.
  if (!configured) { slots.forEach(function (s) { s.style.display = 'none'; }); return; }

  var isHe = document.documentElement.lang === 'he';
  var isAr = document.documentElement.dir === 'rtl' && !isHe;
  var isHu = document.documentElement.lang === 'hu';
  var T = isHe ? {
    msg: 'אנחנו מציגים פרסומות כדי לשמור על המדריך הזה חינמי. לאשר פרסומות מותאמות אישית (הן משתמשות בעוגיות)? המדריך נשאר חינמי בכל מקרה.',
    accept: 'אישור', decline: 'לא מותאמות אישית', privacy: 'פרטיות'
  } : isAr ? {
    msg: 'نعرض إعلانات لإبقاء هذا الدليل مجانياً. هل توافق على إعلانات مخصّصة (تستخدم الكوكيز)؟ يبقى الدليل مجانياً في الحالتين.',
    accept: 'أوافق', decline: 'إعلانات غير مخصّصة', privacy: 'الخصوصية'
  } : isHu ? {
    msg: 'Hirdetéseket mutatunk, hogy ez az útmutató ingyenes maradhasson. Elfogadod a személyre szabott hirdetéseket (sütiket használnak)? Az útmutató mindenképp ingyenes marad.',
    accept: 'Elfogadom', decline: 'Nem személyre szabott', privacy: 'Adatvédelem'
  } : {
    msg: 'We show ads to keep this guide free. Allow personalised ads (they use cookies)? The guide stays free either way.',
    accept: 'Accept', decline: 'Non-personalised', privacy: 'Privacy'
  };

  var CKEY = 'adhd-ad-consent'; // 'yes' (personalised) | 'npa' (non-personalised)
  var consent = null;
  try { consent = localStorage.getItem(CKEY); } catch (e) {}

  function hideSlots() { slots.forEach(function (s) { s.style.display = 'none'; }); }

  function activateSlots() {
    slots.forEach(function (s) {
      var name = s.getAttribute('data-adslot');
      var slotId = cfg.SLOTS && cfg.SLOTS[name];
      if (!slotId) { s.style.display = 'none'; return; }
      if (s.getAttribute('data-filled')) return;
      s.style.display = 'block';   // override the default .ad-slot{display:none}
      s.setAttribute('data-filled', '1');
      var ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', cfg.CLIENT);
      ins.setAttribute('data-ad-slot', String(slotId));
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
      s.appendChild(ins);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  }

  function loadAdsense(nonPersonalised) {
    window.adsbygoogle = window.adsbygoogle || [];
    if (nonPersonalised) { window.adsbygoogle.requestNonPersonalizedAds = 1; }
    if (!document.getElementById('adsbygoogle-js')) {
      var sc = document.createElement('script');
      sc.id = 'adsbygoogle-js';
      sc.async = true;
      sc.crossOrigin = 'anonymous';
      sc.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(cfg.CLIENT);
      document.head.appendChild(sc);
    }
    activateSlots();
  }

  function apply(c) {
    try { localStorage.setItem(CKEY, c); } catch (e) {}
    consent = c;
    removeBanner();
    if (c === 'yes') loadAdsense(false);
    else loadAdsense(true); // 'npa'
  }

  var banner = null;
  function showBanner() {
    banner = document.createElement('div');
    banner.className = 'ad-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Ad consent');
    var priv = isHe ? 'privacy-he.html' : isAr ? 'privacy-ar.html' : isHu ? 'privacy-hu.html' : 'privacy.html';
    banner.innerHTML =
      '<span class="acm">' + T.msg + ' <a href="' + priv + '">' + T.privacy + '</a></span>' +
      '<span class="acb"><button type="button" class="ac-decline">' + T.decline + '</button>' +
      '<button type="button" class="ac-accept">' + T.accept + '</button></span>';
    document.body.appendChild(banner);
    banner.querySelector('.ac-accept').addEventListener('click', function () { apply('yes'); });
    banner.querySelector('.ac-decline').addEventListener('click', function () { apply('npa'); });
  }
  function removeBanner() { if (banner && banner.parentNode) { banner.parentNode.removeChild(banner); banner = null; } }

  hideSlots(); // stay hidden until a choice is made
  if (consent === 'yes') loadAdsense(false);
  else if (consent === 'npa') loadAdsense(true);
  else showBanner();
})();
