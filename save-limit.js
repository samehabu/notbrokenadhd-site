/* ADHD Field Guide — free save limit.
   Guests (not signed in) can save up to LIMIT medication entries. The next save
   prompts a free account. Existing entries are kept and sync on registration.
   Only active when accounts are configured; signed-in users are unlimited. */
(function () {
  "use strict";
  var LIMIT = 2;
  var isHe = document.documentElement.lang === 'he';
  var isAr = document.documentElement.dir === 'rtl' && !isHe;
  var isHu = document.documentElement.lang === 'hu';

  function signedIn() { var si = document.getElementById('authSignedIn'); return !!(si && si.hidden === false); }
  function accountsOn() { var b = document.getElementById('authBtn'); return !!(b && getComputedStyle(b).display !== 'none'); }
  function medCount() { try { return (JSON.parse(localStorage.getItem('adhd-medlog-v1') || '[]') || []).length; } catch (e) { return 0; } }
  function atLimit() { return accountsOn() && !signedIn() && medCount() >= LIMIT; }

  var nameEl = document.getElementById('medName');
  var trackerBox = (document.getElementById('medLog') || {}).parentNode;
  if (!nameEl || !trackerBox) return;

  var T = isHe ? {
    msg: 'שמרת שתי תרופות — זהו המגבלה החינמית ללא חשבון. צור חשבון חינמי כדי להמשיך להוסיף ולסנכרן את היומן שלך בכל המכשירים. (חינם לגמרי, ושתי הראשונות נשמרות לך.)',
    cta: 'צור חשבון חינמי', close: 'סגירה'
  } : isAr ? {
    msg: 'حفظت دواءين — وهو الحدّ المجاني دون حساب. أنشئ حساباً مجانياً لمواصلة الإضافة ومزامنة سجلّك عبر كل أجهزتك. (مجاني تماماً، وأول دواءين محفوظان لك.)',
    cta: 'أنشئ حساباً مجانياً', close: 'إغلاق'
  } : isHu ? {
    msg: 'Már két gyógyszert mentettél — ez az ingyenes korlát fiók nélkül. Hozz létre egy ingyenes fiókot, hogy tovább adhass hozzá bejegyzéseket, és szinkronizáld az előzményeidet minden eszközödön. (Teljesen ingyenes, és az első kettő megmarad.)',
    cta: 'Ingyenes fiók létrehozása', close: 'Bezárás'
  } : {
    msg: 'You’ve saved 2 medications — the free limit without an account. Create a free account to keep adding and sync your history across all your devices. (It’s completely free, and your first two are kept.)',
    cta: 'Create a free account', close: 'Close'
  };

  function styleOnce() {
    if (document.getElementById('gateCss')) return;
    var st = document.createElement('style'); st.id = 'gateCss';
    st.textContent =
      '.save-gate{display:flex;gap:.85rem;align-items:flex-start;background:var(--accent-soft);border:1.5px solid var(--accent);border-radius:14px;padding:1rem 1.15rem;margin-top:1.2rem;animation:gateIn .3s ease}' +
      '@keyframes gateIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}' +
      '.save-gate .g-ic{font-size:1.35rem;flex:0 0 auto;line-height:1.2}' +
      '.save-gate .g-tx{flex:1;min-width:0}' +
      '.save-gate p{margin:0 0 .65rem;color:var(--ink);font-size:.92rem;line-height:1.5;font-weight:500}' +
      '.save-gate .g-actions{display:flex;gap:.6rem;align-items:center;flex-wrap:wrap}' +
      '.save-gate .g-cta{background:var(--accent);color:#fff;border:none;border-radius:999px;padding:.5rem 1.05rem;font-weight:700;cursor:pointer;font-family:inherit;font-size:.85rem}' +
      '.save-gate .g-no{background:none;border:none;color:var(--grey);cursor:pointer;font-size:.85rem;text-decoration:underline;font-family:inherit}';
    document.head.appendChild(st);
  }

  var gate = null;
  function removeGate() { if (gate && gate.parentNode) gate.parentNode.removeChild(gate); gate = null; }
  function showGate() {
    var nud = document.querySelector('.signup-nudge'); if (nud && nud.parentNode) nud.parentNode.removeChild(nud);
    if (gate && gate.parentNode) { gate.scrollIntoView({ block: 'center' }); return; }
    styleOnce();
    gate = document.createElement('div'); gate.className = 'save-gate';
    gate.innerHTML = '<span class="g-ic">🔒</span><div class="g-tx"><p>' + T.msg +
      '</p><div class="g-actions"><button class="g-cta" type="button">' + T.cta +
      '</button><button class="g-no" type="button">' + T.close + '</button></div></div>';
    trackerBox.appendChild(gate);
    gate.querySelector('.g-cta').addEventListener('click', function () {
      var ab = document.getElementById('authBtn'); if (ab) ab.click();
      var tog = document.getElementById('authToggle'), hint = isHe ? 'חדש כאן' : isAr ? 'جديد' : isHu ? 'Új' : 'New here';
      if (tog && tog.textContent.indexOf(hint) > -1) tog.click();
    });
    gate.querySelector('.g-no').addEventListener('click', removeGate);
    gate.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  function block(e) {
    if (!nameEl.value.trim()) return;      // empty adds are a normal no-op
    if (atLimit()) { e.preventDefault(); e.stopImmediatePropagation(); showGate(); }
  }
  // capture phase on document runs BEFORE the tracker's own handlers on the target
  document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('#medAdd')) block(e); }, true);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.target.id === 'medName' || e.target.id === 'medNotes')) block(e);
  }, true);

  // clear the gate once the visitor signs in
  var si = document.getElementById('authSignedIn');
  if (si) new MutationObserver(function () { if (si.hidden === false) removeGate(); }).observe(si, { attributes: true, attributeFilter: ['hidden'] });
})();
