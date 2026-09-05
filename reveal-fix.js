/* ADHD Field Guide — reveal safety net.
   The original reveal used IntersectionObserver {threshold:.12}, which never fires
   for sections taller than the viewport (they can't reach 12% visible) — leaving
   content stuck invisible. This reveals elements reliably on scroll, covers
   dynamically-injected sections, and guarantees nothing stays permanently hidden. */
(function () {
  "use strict";
  function reveal(e) { e.classList.add('in'); }
  function inView(e) {
    var r = e.getBoundingClientRect();
    var h = window.innerHeight || document.documentElement.clientHeight;
    return r.top < h * 0.95 && r.bottom > 0;
  }
  function sweep() {
    var hidden = document.querySelectorAll('.reveal:not(.in)');
    for (var i = 0; i < hidden.length; i++) { if (inView(hidden[i])) reveal(hidden[i]); }
  }
  // lenient observer (threshold 0) also catches JS-injected sections like the brain map
  if ('IntersectionObserver' in window) {
    try {
      var io = new IntersectionObserver(function (es) {
        for (var i = 0; i < es.length; i++) {
          if (es[i].isIntersecting) { reveal(es[i].target); io.unobserve(es[i].target); }
        }
      }, { threshold: 0, rootMargin: '0px 0px -4% 0px' });
      [].forEach.call(document.querySelectorAll('.reveal'), function (e) { io.observe(e); });
    } catch (e) {}
  }
  sweep();
  window.addEventListener('scroll', sweep, { passive: true });
  window.addEventListener('resize', sweep);
  window.addEventListener('load', sweep);
  // absolute backstop — content must never stay permanently hidden
  setTimeout(function () { [].forEach.call(document.querySelectorAll('.reveal:not(.in)'), reveal); }, 6000);
})();
