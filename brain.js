/* ADHD Field Guide — animated "your brain on ADHD" explainer.
   Lightweight SVG + CSS. Three states: typical / ADHD / treated. Bilingual. */
(function () {
  "use strict";
  var isHe = document.documentElement.lang === 'he';
  var isAr = document.documentElement.dir === 'rtl' && !isHe;
  var isHu = document.documentElement.lang === 'hu';
  var anchor = document.getElementById('contents');
  if (!anchor) return;

  var L = isHe ? {
    eyebrow: 'המדע, בפשטות', h2: 'המוח שלך עם ADHD — ומה שעוזר',
    intro: 'שני מוחות נראים זהים. ההבדל הוא ב<b>פעילות</b> וב<b>כימיה</b>. גלגל כדי לראות.',
    typ: 'מוח טיפוסי', adhd: 'מוח ADHD', tre: 'עם טיפול וניהול',
    pfc: 'הקליפה הקדם-מצחית', pfcSub: 'מיקוד · שליטה', reward: 'התגמול (דופמין)', pill: 'תרופה + טיפול',
    note: 'ההבדלים האלה תפקודיים וכימיים — ואינם עדות לכך שמשהו «תקול».',
    cap: {
      typical: { lbl: 'מוח טיפוסי', h: 'עובד בחלקות', items: [
        '<b>הקליפה הקדם-מצחית</b> — מרכז המיקוד וריסון הדחף — פעילה באופן יציב.',
        '<b>דופמין ונוראדרנלין</b> משדרים אותות באמינות, כך שהמוטיבציה והתגמול מורגשים מאוזנים.',
        '<b>הקשב</b> נשאר על המשימה שאתה בוחר.'] },
      adhd: { lbl: 'מוח ADHD', h: 'מחווט אחרת, לא תקול', items: [
        'מרכז השליטה הקדם-מצחי <b>פעיל פחות</b> — קשה יותר להתחיל, לתכנן ולעמוד בפני הסחות.',
        '<b>איתות הדופמין והנוראדרנלין אינו סדיר</b> — משימות שגרתיות מורגשות פחות מתגמלות, אז המוח מחפש חידוש.',
        '<b>הקשב נמשך אל מחוץ למשימה.</b> זו כימיה וחיווט — לא עניין של רצון.'] },
      treated: { lbl: 'עם טיפול וניהול', h: 'עובד עם המוח שלך', items: [
        '<b>תרופה</b> (ממריצה או לא-ממריצה) משקמת את איתות הדופמין והנוראדרנלין, כך שהקליפה הקדם-מצחית יכולה לעשות את עבודתה.',
        '<b>מבנה, שגרות, פעילות גופנית ושינה</b> תומכים באותן מערכות.',
        '<b>המיקוד וההשלמה חוזרים</b> — אתה עובד עם המוח שלך, לא נגדו.'] }
    }
  } : isAr ? {
    eyebrow: 'العلم، ببساطة', h2: 'دماغك مع ADHD — وما الذي يساعد',
    intro: 'الدماغان يبدوان متطابقين. الفرق في <b>النشاط</b> و<b>الكيمياء</b>. تنقّل لتراه.',
    typ: 'دماغ نمطي', adhd: 'دماغ ADHD', tre: 'مع العلاج والتدبير',
    pfc: 'القشرة الجبهية', pfcSub: 'تركيز · تحكّم', reward: 'المكافأة (الدوبامين)', pill: 'دواء + رعاية',
    note: 'هذه الفروق وظيفية وكيميائية — وليست دليلاً على أن شيئاً «معطوب».',
    cap: {
      typical: { lbl: 'دماغ نمطي', h: 'يعمل بسلاسة', items: [
        '<b>القشرة الجبهية</b> — مركز التركيز وكبح الاندفاع — نشطة باستمرار.',
        '<b>الدوبامين والنورإبينفرين</b> يرسلان الإشارات بثبات، فتبدو الدافعية والمكافأة متوازنة.',
        '<b>الانتباه</b> يبقى على المهمة التي تختارها.'] },
      adhd: { lbl: 'دماغ ADHD', h: 'مختلف التوصيل، وليس معطوباً', items: [
        'مركز التحكّم الجبهي <b>أقل تنشيطاً</b> — يصعب البدء والتخطيط ومقاومة التشتّت.',
        '<b>إشارات الدوبامين والنورإبينفرين غير منتظمة</b> — المهام الروتينية تبدو أقل مكافأة، فيسعى الدماغ إلى الجديد.',
        '<b>الانتباه يُسحب بعيداً عن المهمة.</b> إنها كيمياء وتوصيل — لا مسألة إرادة.'] },
      treated: { lbl: 'مع العلاج والتدبير', h: 'تعمل مع دماغك', items: [
        '<b>الدواء</b> (منشّط أو غير منشّط) يعيد إشارات الدوبامين والنورإبينفرين، فتؤدّي القشرة الجبهية عملها.',
        '<b>الهيكلة والروتين والرياضة والنوم</b> تدعم الأنظمة نفسها.',
        '<b>يعود التركيز والإنجاز</b> — تعمل مع دماغك لا ضدّه.'] }
    }
  } : isHu ? {
    eyebrow: 'A tudomány, egyszerűen', h2: 'Az agyad ADHD-val — és mi segít',
    intro: 'Két agy kinézetre azonos. A különbség az <b>aktivitásban</b> és a <b>kémiában</b> van. Kattints, és nézd meg.',
    typ: 'Tipikus agy', adhd: 'ADHD-agy', tre: 'Kezeléssel és odafigyeléssel',
    pfc: 'Prefrontális kéreg', pfcSub: 'fókusz · irányítás', reward: 'Jutalom (dopamin)', pill: 'Kezelés',
    note: 'Ezek a különbségek működésbeli és kémiai jellegűek — nem jelei annak, hogy bármi „elromlott”.',
    cap: {
      typical: { lbl: 'Tipikus agy', h: 'Zökkenőmentesen működik', items: [
        '<b>A prefrontális kéreg</b> — a fókusz és az impulzuskontroll központja — folyamatosan aktív.',
        '<b>A dopamin és a noradrenalin</b> megbízhatóan továbbítja a jeleket, így a motiváció és a jutalom kiegyensúlyozottnak érződik.',
        '<b>A figyelem</b> azon a feladaton marad, amelyet választasz.'] },
      adhd: { lbl: 'ADHD-agy', h: 'Másképp huzalozva, nem elromolva', items: [
        'A prefrontális <b>irányítóközpont alulaktivált</b> — nehezebb elkezdeni, tervezni és ellenállni a figyelemelterelésnek.',
        '<b>A dopamin- és noradrenalin-jelzés egyenetlen</b> — a rutinfeladatok kevésbé jutalmazónak érződnek, ezért az agy újdonságot keres.',
        '<b>A figyelem elhúzódik a feladatról.</b> Ez huzalozás és kémia — nem akaraterő.'] },
      treated: { lbl: 'Kezeléssel és odafigyeléssel', h: 'Az agyaddal együttműködve', items: [
        '<b>A gyógyszer</b> (stimuláns vagy non-stimuláns) helyreállítja a dopamin- és noradrenalin-jelzést, így a prefrontális kéreg elvégezheti a dolgát.',
        '<b>A struktúra, a rutinok, a mozgás és az alvás</b> ugyanezeket a rendszereket támogatja.',
        '<b>Visszatér a fókusz és a végigvitel</b> — az agyaddal dolgozol, nem ellene.'] }
    }
  } : {
    eyebrow: 'The science, simply', h2: 'Your brain on ADHD — and what helps',
    intro: 'Two brains look identical. The difference is in <b>activity</b> and <b>chemistry</b>. Tap through to see it.',
    typ: 'Typical brain', adhd: 'ADHD brain', tre: 'With treatment & management',
    pfc: 'Prefrontal cortex', pfcSub: 'focus · control', reward: 'Reward (dopamine)', pill: 'Rx + care',
    note: 'These differences are functional and chemical — not a sign that anything is “broken.”',
    cap: {
      typical: { lbl: 'Typical brain', h: 'Running smoothly', items: [
        '<b>The prefrontal cortex</b> — your focus &amp; impulse-control centre — is steadily active.',
        '<b>Dopamine &amp; norepinephrine</b> signal reliably, so motivation and reward feel even.',
        '<b>Attention</b> stays on the task you choose.'] },
      adhd: { lbl: 'ADHD brain', h: 'Wired differently, not broken', items: [
        'The prefrontal <b>control centre is under-activated</b> — harder to start, plan and resist distraction.',
        '<b>Dopamine &amp; norepinephrine signalling is uneven</b> — routine tasks feel under-rewarded, so the brain chases novelty.',
        '<b>Attention gets pulled off-task.</b> This is wiring and chemistry — not willpower.'] },
      treated: { lbl: 'With treatment & management', h: 'Working with your brain', items: [
        '<b>Medication</b> (stimulant or non-stimulant) restores dopamine &amp; norepinephrine signalling, so the prefrontal cortex can do its job.',
        '<b>Structure, routines, exercise &amp; sleep</b> support the very same systems.',
        '<b>Focus and follow-through return</b> — you work with your brain, not against it.'] }
    }
  };

  var css =
    '#brainmap .bm-eyebrow{font-family:"IBM Plex Mono","Tajawal",monospace;font-size:.75rem;letter-spacing:.06em;text-transform:uppercase;color:var(--accent)}' +
    '#brainmap .bm-intro{color:var(--grey);max-width:60ch}' +
    '#brainmap .bm-toggle{display:inline-flex;gap:.4rem;background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:.3rem;margin:1rem 0 1.4rem;flex-wrap:wrap}' +
    '#brainmap .bm-toggle button{border:none;background:none;font-family:inherit;font-weight:700;font-size:.9rem;color:var(--grey);padding:.55rem 1.05rem;border-radius:999px;cursor:pointer;transition:.15s}' +
    '#brainmap .bm-toggle button[data-s="adhd"].on{background:var(--accent);color:#fff}' +
    '#brainmap .bm-toggle button[data-s="typical"].on{background:#2f8f83;color:#fff}' +
    '#brainmap .bm-toggle button[data-s="treated"].on{background:var(--amber);color:#fff}' +
    '#brainmap .bm-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:1.5rem;align-items:center}' +
    '@media(max-width:760px){#brainmap .bm-grid{grid-template-columns:1fr}}' +
    '#brainmap .bm-stage{background:var(--surface);border:1px solid var(--line);border-radius:20px;padding:1rem;box-shadow:var(--shadow,0 12px 30px rgba(24,31,42,.08))}' +
    '#brainmap .bm-stage svg{width:100%;height:auto;display:block}' +
    '#brainmap .bm-cap .lbl{font-family:"IBM Plex Mono","Tajawal",monospace;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;font-weight:600;color:var(--accent)}' +
    '#brainmap .bm-cap h3{font-size:1.4rem;margin:.25rem 0 .7rem}' +
    '#brainmap .bm-cap ul{margin:0;padding-inline-start:1.1rem}' +
    '#brainmap .bm-cap li{margin:.5rem 0;color:var(--ink-soft);line-height:1.55}' +
    '#brainmap .bm-cap li b{color:var(--ink)}' +
    '#brainmap .bm-note{margin-top:1rem;font-size:.85rem;color:var(--grey);font-style:italic;border-top:1px solid var(--line);padding-top:.7rem}' +
    '#brainmap .viz.state-typical .lbl{color:#2f8f83}#brainmap .viz.state-treated .lbl{color:var(--amber)}' +
    '#brainmap .brain-base{fill:#f3e7ea;stroke:#e2cdd2;stroke-width:2}' +
    '#brainmap .fold{fill:none;stroke:#e2cdd2;stroke-width:2;stroke-linecap:round}' +
    '#brainmap .pfc{fill:var(--accent);transition:opacity .5s}' +
    '#brainmap .pfc-glow{fill:var(--accent);filter:blur(6px);transition:opacity .5s}' +
    '#brainmap .reward{fill:var(--amber)}#brainmap .reward-glow{fill:var(--amber);filter:blur(5px)}' +
    '#brainmap .region-label{font-family:"IBM Plex Mono","Tajawal",monospace;font-size:11px;fill:var(--grey)}' +
    '#brainmap .sig{fill:var(--amber)}#brainmap .attn{fill:#2f8f83}' +
    '#brainmap .focus-ray{stroke:#2f8f83;stroke-width:3;stroke-linecap:round;fill:none}' +
    '@keyframes bmflow{0%,100%{opacity:.15}50%{opacity:1}}@keyframes bmflick{0%,100%{opacity:.5}45%{opacity:.2}55%{opacity:.6}}@keyframes bmdrift{0%{transform:translate(0,0)}100%{transform:translate(var(--dx),var(--dy))}}' +
    '#brainmap .viz.state-typical .pfc,#brainmap .viz.state-typical .pfc-glow{opacity:1}#brainmap .viz.state-typical .sig{animation:bmflow 1.6s ease-in-out infinite}#brainmap .viz.state-typical .attn{opacity:1;transform:none}#brainmap .viz.state-typical .focus-ray{opacity:1}' +
    '#brainmap .viz.state-adhd .pfc{opacity:.35;animation:bmflick 2.2s ease-in-out infinite}#brainmap .viz.state-adhd .pfc-glow{opacity:.15}#brainmap .viz.state-adhd .sig{animation:bmflow 2.6s ease-in-out infinite}#brainmap .viz.state-adhd .sig.drop{opacity:.08!important;animation:none}#brainmap .viz.state-adhd .attn{animation:bmdrift 2.4s ease-in-out infinite alternate;opacity:.85}#brainmap .viz.state-adhd .focus-ray{opacity:.12}' +
    '#brainmap .viz.state-treated .pfc,#brainmap .viz.state-treated .pfc-glow{opacity:1}#brainmap .viz.state-treated .sig{animation:bmflow 1.5s ease-in-out infinite}#brainmap .viz.state-treated .attn{opacity:1;transform:none}#brainmap .viz.state-treated .focus-ray{opacity:1}#brainmap .viz.state-treated .pill-rx{opacity:1}' +
    '#brainmap .pill-rx{opacity:0;transition:opacity .5s}' +
    '@media(prefers-reduced-motion:reduce){#brainmap .sig,#brainmap .pfc,#brainmap .attn{animation:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var svg =
    '<svg viewBox="0 0 460 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stylized brain diagram">' +
    '<path class="brain-base" d="M150,70 C110,55 70,80 78,120 C48,128 42,175 72,192 C58,225 92,255 128,246 C138,280 195,288 220,262 C255,285 315,272 322,232 C360,228 378,180 348,158 C372,132 356,88 318,92 C305,58 255,48 228,70 C205,52 172,54 150,70 Z"/>' +
    '<path class="fold" d="M120,110 C150,120 150,150 122,158"/><path class="fold" d="M150,185 C185,190 190,220 158,230"/><path class="fold" d="M250,95 C285,105 285,140 255,150"/><path class="fold" d="M270,185 C305,192 305,222 275,232"/>' +
    '<ellipse class="pfc-glow" cx="112" cy="150" rx="46" ry="52"/>' +
    '<path class="pfc" d="M150,70 C110,55 70,80 78,120 C48,128 42,175 72,192 C64,210 78,232 100,236 C120,210 128,175 126,140 C132,108 128,86 138,74 C142,72 146,71 150,70 Z"/>' +
    '<text class="region-label" x="60" y="272">' + L.pfc + '</text><text class="region-label" x="60" y="286" font-size="9">' + L.pfcSub + '</text>' +
    '<circle class="reward-glow" cx="250" cy="190" r="26"/><circle class="reward" cx="250" cy="190" r="15"/>' +
    '<text class="region-label" x="224" y="240">' + L.reward + '</text>' +
    '<g><circle class="sig" cx="235" cy="188" r="6" style="animation-delay:0s"/><circle class="sig drop" cx="212" cy="182" r="6" style="animation-delay:.2s"/><circle class="sig" cx="190" cy="176" r="6" style="animation-delay:.4s"/><circle class="sig drop" cx="168" cy="168" r="6" style="animation-delay:.6s"/><circle class="sig" cx="147" cy="160" r="6" style="animation-delay:.8s"/><circle class="sig drop" cx="128" cy="154" r="6" style="animation-delay:1s"/></g>' +
    '<g><circle class="attn" cx="180" cy="95" r="5" style="--dx:-18px;--dy:-14px"/><circle class="attn" cx="210" cy="82" r="5" style="--dx:22px;--dy:-10px"/><circle class="attn" cx="245" cy="88" r="5" style="--dx:26px;--dy:16px"/><circle class="attn" cx="278" cy="100" r="5" style="--dx:20px;--dy:-18px"/></g>' +
    '<path class="focus-ray" d="M96,150 L30,150"/><path class="focus-ray" d="M40,150 l14,-8 M40,150 l14,8"/>' +
    '<g class="pill-rx" transform="translate(298,286)"><rect x="-12" y="-13" width="72" height="26" rx="13" fill="#e0a144"/><text x="24" y="5" text-anchor="middle" font-family="IBM Plex Mono,Tajawal,monospace" font-size="11.5" font-weight="700" fill="#fff">' + L.pill + '</text></g>' +
    '</svg>';

  var sec = document.createElement('section');
  sec.id = 'brainmap'; sec.className = 'sec';
  sec.innerHTML =
    '<div class="wrap"><div class="reveal">' +
    '<div class="bm-eyebrow">' + L.eyebrow + '</div>' +
    '<h2>' + L.h2 + '</h2><p class="bm-intro">' + L.intro + '</p>' +
    '<div class="bm-toggle">' +
    '<button data-s="typical">' + L.typ + '</button>' +
    '<button data-s="adhd" class="on">' + L.adhd + '</button>' +
    '<button data-s="treated">' + L.tre + '</button></div>' +
    '<div class="bm-grid"><div class="bm-stage"><div class="viz state-adhd" id="bmViz">' + svg + '</div></div>' +
    '<div class="bm-cap viz state-adhd" id="bmCap"></div></div></div></div>';
  anchor.parentNode.insertBefore(sec, anchor);

  function render(state) {
    if (!L.cap[state]) state = 'adhd';
    document.getElementById('bmViz').className = 'viz state-' + state;
    var c = L.cap[state], cap = document.getElementById('bmCap');
    cap.className = 'bm-cap viz state-' + state;
    cap.innerHTML = '<div class="lbl">' + c.lbl + '</div><h3>' + c.h + '</h3><ul>' +
      c.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') +
      '</ul><div class="bm-note">' + L.note + '</div>';
    var pill = sec.querySelector('.pill-rx'); if (pill) pill.style.opacity = (state === 'treated') ? '1' : '0';
    [].forEach.call(sec.querySelectorAll('.bm-toggle button'), function (b) { b.classList.toggle('on', b.getAttribute('data-s') === state); });
  }
  [].forEach.call(sec.querySelectorAll('.bm-toggle button'), function (b) {
    b.addEventListener('click', function () { render(b.getAttribute('data-s')); });
  });
  render('adhd');
})();
