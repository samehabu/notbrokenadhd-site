/* ADHD Field Guide — optional privacy-friendly analytics.
   OFF until you set ADHD_CONFIG.ANALYTICS in config.js. Recommended providers
   (Plausible, Umami) are cookieless and collect no personal data, so they need
   no consent banner. See SEO_SETUP.md. */
(function () {
  "use strict";
  var a = (window.ADHD_CONFIG && window.ADHD_CONFIG.ANALYTICS) || {};
  if (!a.ENABLED) return;

  var s = document.createElement('script');
  s.defer = true;

  if (a.PROVIDER === 'plausible' && a.DOMAIN) {
    s.setAttribute('data-domain', a.DOMAIN);
    s.src = a.SRC || 'https://plausible.io/js/script.js';
  } else if (a.PROVIDER === 'umami' && a.WEBSITE_ID && a.SRC) {
    s.setAttribute('data-website-id', a.WEBSITE_ID);
    s.src = a.SRC;
  } else if (a.PROVIDER === 'custom' && a.SRC) {
    s.src = a.SRC;
  } else {
    return; // not enough config to load anything
  }
  document.head.appendChild(s);
})();
