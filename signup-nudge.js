/* ADHD Field Guide — gentle, contextual sign-up nudge.
   Shows ONCE, only after the visitor gets real value (2+ meds logged, or several
   self-check items ticked), only if accounts are enabled and they're NOT signed in.
   Fully dismissible; never nags again once dismissed. No popups, no walls. */
(function () {
  "use strict";
  var isAr = document.documentElement.dir === 'rtl';
  var DKEY = 'adhd-nudge-dismissed';
  var shown = false;

  function dismissed() { try { return localStorage.getItem(DKEY) === '1'; } catch (e) { return false; } }
  function setDismissed() { try { localStorage.setItem(DKEY, '1'); } catch (e) {} }
  function accountsOn() { var b = document.getElementById('authBtn'); return !!(b && getComputedStyle(b).display !== 'none'); }
  function signedIn() { var si = document.getElementById('authSignedIn'); return !!(si && si.hidden === false); }

  var T = isAr ? {
    msg: 'محفوظ على هذا الجهاز فقط. دماغك المصاب بـ ADHD لا ينبغي أن يتذكّر كل شيء — أنشئ حساباً مجانياً ليحفظ تقدّمك ويُزامنه عبر كل أجهزتك، فلا تفقده أبداً.',
    cta: 'أنشئ حساباً مجانياً', no: 'ليس الآن'
  } : {
    msg: 'Saved on this device only. Your ADHD brain shouldn’t have to remember everything — create a free account to keep your progress safe and synced across all your devices, so you never lose it.',
    cta: 'Create a free account', no: 'Not now'
  };

  function styleOnce() {
    if (document.getElementById('nudgeCss')) return;
    var st = document.createElement('style'); st.id = 'nudgeCss';
    st.textContent =
      '.signup-nudge{display:flex;gap:.85rem;align-items:flex-start;background:var(--accent-soft);border:1px solid var(--amber,#c9781b);border-radius:14px;padding:1rem 1.15rem;margin-top:1.3rem;animation:nudgeIn .3s ease}' +
      '@keyframes nudgeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}' +
      '.signup-nudge .ng-ic{font-size:1.35rem;flex:0 0 auto;line-height:1.2}' +
      '.signup-nudge .ng-tx{flex:1;min-width:0}' +
      '.signup-nudge p{margin:0 0 .65rem;color:var(--ink-soft);font-size:.92rem;line-height:1.5}' +
      '.signup-nudge .ng-actions{display:flex;gap:.6rem;flex-wrap:wrap;align-items:center}' +
      '.signup-nudge .ng-cta{background:var(--accent);color:#fff;border:none;border-radius:999px;padding:.5rem 1.05rem;font-weight:700;cursor:pointer;font-family:inherit;font-size:.85rem}' +
      '.signup-nudge .ng-cta:hover{filter:brightness(1.05)}' +
      '.signup-nudge .ng-no{background:transparent;border:none;color:var(--grey);cursor:pointer;font-size:.85rem;font-family:inherit;text-decoration:underline;padding:.3rem}';
    document.head.appendChild(st);
  }

  function show(container) {
    if (shown || dismissed() || !container || !accountsOn() || signedIn()) return;
    shown = true; styleOnce();
    var n = document.createElement('div'); n.className = 'signup-nudge';
    n.innerHTML = '<span class="ng-ic">💾</span><div class="ng-tx"><p>' + T.msg +
      '</p><div class="ng-actions"><button class="ng-cta" type="button">' + T.cta +
      '</button><button class="ng-no" type="button">' + T.no + '</button></div></div>';
    container.appendChild(n);
    n.querySelector('.ng-cta').addEventListener('click', function () {
      var ab = document.getElementById('authBtn'); if (ab) ab.click();
      // switch straight to the "create account" view if we opened on sign-in
      var tog = document.getElementById('authToggle');
      var signinHint = isAr ? 'جديد' : 'New here';
      if (tog && tog.textContent.indexOf(signinHint) > -1) tog.click();
    });
    n.querySelector('.ng-no').addEventListener('click', function () { setDismissed(); n.parentNode && n.parentNode.removeChild(n); });
  }

  // ---- Trigger 1: medication tracker reaches 2+ entries ----
  var medLog = document.getElementById('medLog');
  if (medLog) {
    var trackerBox = medLog.closest('.tracker-shell') || medLog.parentNode;
    var fire = function () { if (medLog.querySelectorAll('.medlog-item').length >= 2) show(trackerBox); };
    new MutationObserver(fire).observe(medLog, { childList: true });
    fire();
  }

  // ---- Trigger 2: several self-check items ticked ----
  var grid = document.getElementById('checkGrid');
  if (grid) {
    grid.addEventListener('change', function () {
      var n = grid.querySelectorAll('input[type="checkbox"]:checked').length;
      if (n >= 4) show(document.querySelector('#check .wrap') || grid);
    });
  }
})();
