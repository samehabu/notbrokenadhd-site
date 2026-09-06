/* ADHD Field Guide — image lightbox for the "ADHD in pictures" gallery.
   Click a card to enlarge; move with arrows (desktop) or swipe (touch).
   RTL-aware (Arabic/Hebrew): left/right and swipe directions are mirrored. */
(function () {
  "use strict";
  var imgs = [].slice.call(document.querySelectorAll('.gallery img'));
  if (!imgs.length) return;

  var rtl = document.documentElement.dir === 'rtl';
  var isHe = document.documentElement.lang === 'he';
  var isAr = rtl && !isHe;
  var T = isHe ? { close: 'סגירה', prev: 'הקודם', next: 'הבא' }
        : isAr ? { close: 'إغلاق', prev: 'السابق', next: 'التالي' }
        : { close: 'Close', prev: 'Previous', next: 'Next' };
  var srcs = imgs.map(function (im) { return im.getAttribute('src'); });
  var alts = imgs.map(function (im) { return im.getAttribute('alt') || ''; });

  // ---- styles ----
  var css =
    '.gallery img{cursor:zoom-in}' +
    '.lb-back{position:fixed;inset:0;background:rgba(9,11,15,.93);display:none;align-items:center;justify-content:center;z-index:20000;opacity:0;transition:opacity .2s;-webkit-tap-highlight-color:transparent}' +
    '.lb-back.open{display:flex;opacity:1}' +
    '.lb-fig{margin:0;display:flex;flex-direction:column;align-items:center;gap:.7rem;max-width:94vw}' +
    '.lb-img{max-width:94vw;max-height:82vh;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.5);user-select:none;-webkit-user-drag:none;touch-action:pan-y;background:#fff;transition:transform .18s}' +
    '.lb-cap{color:#e7ebf0;font-family:inherit;font-size:.9rem;opacity:.85;text-align:center;max-width:40ch}' +
    '.lb-nav{position:fixed;top:50%;transform:translateY(-50%);width:54px;height:54px;border-radius:50%;background:rgba(255,255,255,.14);color:#fff;border:1px solid rgba(255,255,255,.25);font-size:30px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s;backdrop-filter:blur(4px)}' +
    '.lb-nav:hover{background:rgba(255,255,255,.28)}' +
    '.lb-prev{left:18px}.lb-next{right:18px}' +
    '.lb-close{position:fixed;top:16px;right:18px;width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);color:#fff;font-size:26px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center}' +
    '.lb-close:hover{background:rgba(255,255,255,.28)}' +
    '.lb-count{position:fixed;bottom:20px;left:0;right:0;text-align:center;color:#fff;font-family:"IBM Plex Mono",monospace;font-size:.85rem;letter-spacing:.05em;opacity:.8}' +
    '@media(max-width:640px){.lb-nav{width:42px;height:42px;font-size:24px}.lb-prev{left:8px}.lb-next{right:8px}.lb-img{max-height:74vh}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ---- overlay ----
  var back = document.createElement('div');
  back.className = 'lb-back'; back.setAttribute('role', 'dialog'); back.setAttribute('aria-modal', 'true');
  back.innerHTML =
    '<button class="lb-close" aria-label="' + T.close + '">×</button>' +
    '<button class="lb-nav lb-prev" aria-label="' + T.prev + '">‹</button>' +
    '<figure class="lb-fig"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>' +
    '<button class="lb-nav lb-next" aria-label="' + T.next + '">›</button>' +
    '<div class="lb-count"></div>';
  document.body.appendChild(back);
  var bigImg = back.querySelector('.lb-img'), cap = back.querySelector('.lb-cap'), count = back.querySelector('.lb-count');

  var idx = 0;
  function preload(i) { var p = new Image(); p.src = srcs[(i + srcs.length) % srcs.length]; }
  function show(i) {
    idx = (i + srcs.length) % srcs.length;
    bigImg.src = srcs[idx]; bigImg.alt = alts[idx]; cap.textContent = alts[idx];
    count.textContent = (idx + 1) + ' / ' + srcs.length;
    preload(idx + 1); preload(idx - 1);
  }
  function open(i) { show(i); back.classList.add('open'); document.documentElement.style.overflow = 'hidden'; }
  function close() { back.classList.remove('open'); document.documentElement.style.overflow = ''; }

  // In RTL the visual "left" button should advance forward, and swipe is mirrored.
  var leftBtnDelta = rtl ? +1 : -1;   // the button on the LEFT edge
  var rightBtnDelta = rtl ? -1 : +1;  // the button on the RIGHT edge

  back.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx + leftBtnDelta); });
  back.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + rightBtnDelta); });
  back.querySelector('.lb-close').addEventListener('click', function (e) { e.stopPropagation(); close(); });
  back.addEventListener('click', function (e) { if (e.target === back || e.target.classList.contains('lb-fig')) close(); });

  document.addEventListener('keydown', function (e) {
    if (!back.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx + leftBtnDelta);
    else if (e.key === 'ArrowRight') show(idx + rightBtnDelta);
  });

  // ---- touch swipe ----
  var sx = 0, sy = 0, moved = false;
  bigImg.addEventListener('touchstart', function (e) { var t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; moved = false; }, { passive: true });
  bigImg.addEventListener('touchmove', function () { moved = true; }, { passive: true });
  bigImg.addEventListener('touchend', function (e) {
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (!moved || Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    // swipe left (dx<0) advances forward in LTR; mirrored in RTL
    if (dx < 0) show(idx + (rtl ? -1 : +1));
    else show(idx + (rtl ? +1 : -1));
  }, { passive: true });

  // ---- open on click ----
  imgs.forEach(function (im, i) {
    im.setAttribute('role', 'button'); im.setAttribute('tabindex', '0');
    im.addEventListener('click', function () { open(i); });
    im.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });
})();
