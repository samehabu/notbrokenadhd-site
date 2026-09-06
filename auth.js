/* ADHD Field Guide — optional accounts + cross-device sync (Supabase).
   The guide works fully without this; accounts are opt-in.
   Configure your keys in config.js. Nothing here stores passwords itself —
   Supabase handles authentication securely (hashing, email confirm, resets). */
(function () {
  "use strict";

  var cfg = window.ADHD_CONFIG || {};
  var authBtn = document.getElementById('authBtn');
  var configured =
    cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY &&
    cfg.SUPABASE_URL.indexOf('YOUR_') !== 0 &&
    cfg.SUPABASE_ANON_KEY.indexOf('YOUR_') !== 0;

  // If not set up (or the SDK failed to load), leave the site as-is: local-only saving.
  if (!configured || !(window.supabase && window.supabase.createClient)) {
    if (authBtn) authBtn.style.display = 'none';
    return;
  }

  var isHe = document.documentElement.lang === 'he';
  var isAr = document.documentElement.dir === 'rtl' && !isHe;
  var T = isHe ? {
    signinTitle: 'התחבר כדי לשמור את ההתקדמות שלך', signupTitle: 'צור את החשבון שלך',
    signinSubmit: 'התחברות', signupSubmit: 'צור חשבון',
    toggleToSignup: 'חדש כאן? צור חשבון', toggleToSignin: 'כבר יש לך חשבון? התחבר',
    working: 'מעבד…', signInBtn: 'התחברות',
    whoPrefix: 'מחובר כ־ ', created: 'החשבון נוצר — בדוק את הדוא"ל לאישור, ואז התחבר.',
    resetSent: 'נשלח דוא"ל לאיפוס הסיסמה — בדוק את תיבת הדואר שלך.',
    enterEmailFirst: 'הזן קודם את הדוא"ל שלך למעלה.', enterBoth: 'אנא הזן דוא"ל וסיסמה.',
    signedInMsg: 'התחברת!', genericErr: 'משהו השתבש.',
    deleteBtn: 'מחק את החשבון והנתונים שלי', confirmDelete: 'למחוק לצמיתות את החשבון ואת כל ההתקדמות השמורה? לא ניתן לבטל פעולה זו.',
    deleted: 'החשבון והנתונים שלך נמחקו.', deleteErr: 'לא ניתן היה למחוק את החשבון. אם זה חוזר, פנה לבעל האתר.'
  } : isAr ? {
    signinTitle: 'سجّل الدخول لحفظ تقدّمك', signupTitle: 'أنشئ حسابك',
    signinSubmit: 'تسجيل الدخول', signupSubmit: 'إنشاء حساب',
    toggleToSignup: 'جديد هنا؟ أنشئ حساباً', toggleToSignin: 'لديك حساب؟ سجّل الدخول',
    working: 'جارٍ…', signInBtn: 'تسجيل الدخول',
    whoPrefix: 'مسجّل الدخول: ', created: 'تم إنشاء الحساب — تحقّق من بريدك للتأكيد ثم سجّل الدخول.',
    resetSent: 'أُرسل بريد إعادة تعيين كلمة المرور — تحقّق من صندوقك.',
    enterEmailFirst: 'أدخل بريدك أعلاه أولاً.', enterBoth: 'من فضلك أدخل البريد وكلمة المرور.',
    signedInMsg: 'تم تسجيل الدخول!', genericErr: 'حدث خطأ ما.',
    deleteBtn: 'حذف حسابي وبياناتي', confirmDelete: 'حذف حسابك وكل تقدّمك المحفوظ نهائياً؟ لا يمكن التراجع عن هذا.',
    deleted: 'تم حذف حسابك وبياناتك.', deleteErr: 'تعذّر حذف الحساب. إن تكرّر هذا، تواصل مع صاحب الموقع.'
  } : {
    signinTitle: 'Sign in to save your progress', signupTitle: 'Create your account',
    signinSubmit: 'Sign in', signupSubmit: 'Create account',
    toggleToSignup: 'New here? Create an account', toggleToSignin: 'Already have an account? Sign in',
    working: 'Working…', signInBtn: 'Sign in',
    whoPrefix: 'Signed in as ', created: 'Account created — check your email to confirm, then sign in.',
    resetSent: 'Password reset email sent — check your inbox.',
    enterEmailFirst: 'Enter your email above first.', enterBoth: 'Please enter your email and password.',
    signedInMsg: 'Signed in!', genericErr: 'Something went wrong.',
    deleteBtn: 'Delete my account & data', confirmDelete: 'Permanently delete your account and all saved progress? This cannot be undone.',
    deleted: 'Your account and data have been deleted.', deleteErr: 'Could not delete the account. If this keeps happening, contact the site owner.'
  };

  var sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);

  // Everything the app saves locally — synced as one private blob per user.
  var SYNC_KEYS = [
    'adhd-selfcheck-v1', 'adhd-selfcheck-ar-v1',
    'adhd-medlog-v1',
    'adhd-braindump-v1', 'adhd-braindump-ar-v1',
    'adhd-prefs-v1', 'adhd-prefs-ar-v1',
    'adhd-layout-v1',
    'adhd-bookmarks-v1'
  ];

  var $ = function (id) { return document.getElementById(id); };
  var back = $('authBack'), elForm = $('authForm'), elEmail = $('authEmail'), elPass = $('authPass'),
      elMsg = $('authMsg'), elTitle = $('authTitle'), elSubmit = $('authSubmit'), elToggle = $('authToggle'),
      elForgot = $('authForgot'), elWho = $('authWho'), elSignout = $('authSignout'),
      elSignedOut = $('authSignedOut'), elSignedIn = $('authSignedIn'), elClose = $('authClose'),
      elDelete = $('authDelete');

  if (authBtn) { authBtn.style.display = ''; authBtn.textContent = T.signInBtn; }

  var mode = 'signin';
  function setMode(m) {
    mode = m;
    var up = m === 'signup';
    elTitle.textContent = up ? T.signupTitle : T.signinTitle;
    elSubmit.textContent = up ? T.signupSubmit : T.signinSubmit;
    elToggle.textContent = up ? T.toggleToSignin : T.toggleToSignup;
    elPass.setAttribute('autocomplete', up ? 'new-password' : 'current-password');
    msg('');
  }
  function msg(t, ok) { elMsg.textContent = t || ''; elMsg.className = 'auth-msg' + (ok ? ' ok' : (t ? ' err' : '')); }
  function open() { back.classList.add('open'); }
  function close() { back.classList.remove('open'); }

  if (authBtn) authBtn.addEventListener('click', open);
  if (elClose) elClose.addEventListener('click', close);
  back.addEventListener('click', function (e) { if (e.target === back) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  elToggle.addEventListener('click', function () { setMode(mode === 'signin' ? 'signup' : 'signin'); });

  elForgot.addEventListener('click', function () {
    var email = (elEmail.value || '').trim();
    if (!email) { msg(T.enterEmailFirst); return; }
    sb.auth.resetPasswordForEmail(email).then(function (r) {
      if (r.error) msg(r.error.message); else msg(T.resetSent, true);
    });
  });

  elForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = (elEmail.value || '').trim(), pass = elPass.value;
    if (!email || !pass) { msg(T.enterBoth); return; }
    elSubmit.disabled = true; msg(T.working);
    var p = (mode === 'signup')
      ? sb.auth.signUp({ email: email, password: pass })
      : sb.auth.signInWithPassword({ email: email, password: pass });
    p.then(function (r) {
      elSubmit.disabled = false;
      if (r.error) { msg(r.error.message); return; }
      if (mode === 'signup' && r.data && r.data.user && !r.data.session) {
        setMode('signin'); msg(T.created, true); return;
      }
      msg(T.signedInMsg, true);
    }).catch(function (err) { elSubmit.disabled = false; msg((err && err.message) || T.genericErr); });
  });

  elSignout.addEventListener('click', function () { sb.auth.signOut(); });

  if (elDelete) {
    elDelete.textContent = T.deleteBtn;
    elDelete.addEventListener('click', function () {
      if (!window.confirm(T.confirmDelete)) return;
      elDelete.disabled = true;
      // delete_account() is a SECURITY DEFINER function (see setup guide) that removes the
      // caller's own auth user; the user_data row is removed automatically via ON DELETE CASCADE.
      sb.rpc('delete_account').then(function (r) {
        if (r && r.error) { elDelete.disabled = false; window.alert(T.deleteErr); return; }
        SYNC_KEYS.forEach(function (k) { try { localStorage.removeItem(k); } catch (e) {} });
        try { sessionStorage.removeItem('adhd-synced'); } catch (e) {}
        sb.auth.signOut().then(function () { window.alert(T.deleted); location.reload(); });
      }, function () { elDelete.disabled = false; window.alert(T.deleteErr); });
    });
  }

  // ---------- data sync ----------
  var currentUser = null, pushTimer = null;
  function collectLocal() {
    var o = {};
    SYNC_KEYS.forEach(function (k) { try { var v = localStorage.getItem(k); if (v !== null) o[k] = v; } catch (e) {} });
    return o;
  }
  function applyRemote(data) {
    var changed = false;
    SYNC_KEYS.forEach(function (k) {
      if (data && Object.prototype.hasOwnProperty.call(data, k)) {
        try { if (localStorage.getItem(k) !== data[k]) { localStorage.setItem(k, data[k]); changed = true; } } catch (e) {}
      }
    });
    return changed;
  }
  function pushNow() {
    if (!currentUser) return;
    sb.from('user_data').upsert({ user_id: currentUser.id, data: collectLocal(), updated_at: new Date().toISOString() })
      .then(function () {}, function () {});
  }
  function schedulePush() { if (!currentUser) return; clearTimeout(pushTimer); pushTimer = setTimeout(pushNow, 1500); }

  function pullAndMaybeReload(user) {
    sb.from('user_data').select('data').eq('user_id', user.id).maybeSingle().then(function (r) {
      var remote = r && r.data ? r.data.data : null;
      if (remote && Object.keys(remote).length) {
        var changed = applyRemote(remote);
        // Reload once so the app re-renders from the synced data (guarded against loops).
        if (changed && !sessionStorage.getItem('adhd-synced')) {
          try { sessionStorage.setItem('adhd-synced', '1'); } catch (e) {}
          close(); location.reload(); return;
        }
      } else {
        pushNow(); // first time on this account — seed with whatever is on this device
      }
      close();
    }, function () { close(); });
  }

  function onSignedIn(user) {
    currentUser = user;
    if (authBtn) authBtn.textContent = '● ' + (user.email ? user.email.split('@')[0] : '');
    elSignedOut.hidden = true; elSignedIn.hidden = false;
    elWho.textContent = T.whoPrefix + user.email;
    pullAndMaybeReload(user);
  }
  function onSignedOut() {
    currentUser = null;
    try { sessionStorage.removeItem('adhd-synced'); } catch (e) {}
    if (authBtn) authBtn.textContent = T.signInBtn;
    elSignedIn.hidden = true; elSignedOut.hidden = false;
  }

  // Push local changes up (same tab via a setItem hook, plus other tabs / page-hide).
  try {
    var _set = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function (k, v) { _set(k, v); if (SYNC_KEYS.indexOf(k) > -1) schedulePush(); };
  } catch (e) {}
  window.addEventListener('storage', schedulePush);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') pushNow(); });
  window.addEventListener('beforeunload', pushNow);

  sb.auth.getSession().then(function (r) {
    var s = r && r.data ? r.data.session : null;
    if (s && s.user) onSignedIn(s.user); else onSignedOut();
  });
  sb.auth.onAuthStateChange(function (_event, session) {
    if (session && session.user) { if (!currentUser || currentUser.id !== session.user.id) onSignedIn(session.user); }
    else onSignedOut();
  });

  setMode('signin');
})();
