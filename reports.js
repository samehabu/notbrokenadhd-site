/* ADHD Field Guide — weekly & monthly medication summaries.
   Adds "This week" / "This month" buttons next to the doctor-summary button.
   Reuses the summary overlay + print. Reads the (synced) medication log. */
(function () {
  "use strict";
  var isAr = document.documentElement.dir === 'rtl';
  var sumBtn = document.getElementById('summaryBtn');
  var overlay = document.getElementById('summaryOverlay');
  var box = document.getElementById('printSummary');
  if (!sumBtn || !overlay || !box) return;

  var OUT = isAr
    ? { good: 'جيد جداً', some: 'ساعد قليلاً', none: 'بلا أثر', bad: 'آثار جانبية', stop: 'أوقفته' }
    : { good: 'Helped a lot', some: 'Helped somewhat', none: 'No effect', bad: 'Bad side effects', stop: 'Stopped it' };

  var L = isAr ? {
    wk: '📅 ملخّص أسبوعي', mo: '📅 ملخّص شهري',
    wkTitle: 'ملخّص الأدوية الأسبوعي', moTitle: 'ملخّص الأدوية الشهري',
    prep: 'أُعِدّ في ', last: 'آخر ', days: ' يوماً',
    logged: function (p) { return 'الأدوية المسجّلة ' + (p === 'week' ? 'هذا الأسبوع' : 'هذا الشهر'); },
    none: function (d) { return 'لا أدوية مسجّلة في آخر ' + d + ' يوماً. سجّل أدويتك في المتتبّع ليظهر تقدّمك هنا.'; },
    discuss: 'ما أودّ مناقشته', d1: 'كيف شعرت مع كل دواء في هذه الفترة', d2: 'أي آثار جانبية أو أسئلة عن الجرعة', d3: 'الخطوات التالية أو التعديلات',
    note: '<strong>ملاحظة:</strong> هذا سجلّ أدوية شخصي من موقع تثقيفي — وليس سجلّاً طبياً؛ راجعه مع طبيبك.',
    print: 'اطبع / احفظ PDF', close: 'إغلاق'
  } : {
    wk: '📅 This week', mo: '📅 This month',
    wkTitle: 'Weekly medication summary', moTitle: 'Monthly medication summary',
    prep: 'Prepared ', last: 'last ', days: ' days',
    logged: function (p) { return 'Medications logged this ' + (p === 'week' ? 'week' : 'month'); },
    none: function (d) { return 'No medications logged in the last ' + d + ' days. Add entries in the tracker and your progress will appear here.'; },
    discuss: 'What I would like to discuss', d1: 'How each medication has felt this period', d2: 'Any side effects or dose questions', d3: 'Next steps or adjustments',
    note: '<strong>Note:</strong> A personal medication log generated from an educational website — not a medical record; review it with your clinician.',
    print: 'Print / Save as PDF', close: 'Close'
  };

  function esc(s) { return (s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmt(ts) {
    try {
      var d = new Date(ts);
      return isAr
        ? d.toLocaleDateString('ar', { day: 'numeric', month: 'long', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })
        : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch (e) { return ''; }
  }
  function medlog() { try { return JSON.parse(localStorage.getItem('adhd-medlog-v1') || '[]') || []; } catch (e) { return []; } }

  function report(period) {
    var days = period === 'week' ? 7 : 30, cutoff = Date.now() - days * 864e5;
    var meds = medlog().filter(function (m) { return m.ts && m.ts >= cutoff; });
    var d = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    var line = function (m) {
      return '<li>' + esc(m.t) + ' — ' + (OUT[m.o] || m.o) + (m.ts ? ' · ' + fmt(m.ts) : '') + (m.n ? ' (' + esc(m.n) + ')' : '') + '</li>';
    };
    var block = meds.length
      ? '<h3>' + L.logged(period) + '</h3><ul>' + meds.map(line).join('') + '</ul>'
      : '<h3>' + L.logged(period) + '</h3><p class="none">' + L.none(days) + '</p>';
    box.innerHTML =
      '<h2>' + (period === 'week' ? L.wkTitle : L.moTitle) + '</h2>' +
      '<div class="meta">' + L.prep + d + ' · ' + L.last + days + L.days + '</div>' +
      block +
      '<h3>' + L.discuss + '</h3><ul><li>' + L.d1 + '</li><li>' + L.d2 + '</li><li>' + L.d3 + '</li></ul>' +
      '<div class="disc">' + L.note + '</div>' +
      '<div class="sum-actions"><button class="go" id="doPrint" type="button">' + L.print + '</button>' +
      '<button class="close" id="closeSum" type="button">' + L.close + '</button></div>';
    overlay.classList.add('open');
    var dp = box.querySelector('#doPrint'), cs = box.querySelector('#closeSum');
    if (dp) dp.addEventListener('click', function () { window.print(); });
    if (cs) cs.addEventListener('click', function () { overlay.classList.remove('open'); });
  }

  function mkBtn(id, label) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = sumBtn.className; b.id = id; b.textContent = label;
    return b;
  }
  var wk = mkBtn('weekBtn', L.wk), mo = mkBtn('monthBtn', L.mo);
  sumBtn.insertAdjacentElement('afterend', mo);
  sumBtn.insertAdjacentElement('afterend', wk);
  wk.addEventListener('click', function () { report('week'); });
  mo.addEventListener('click', function () { report('month'); });
})();
