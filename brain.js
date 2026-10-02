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
    intro: 'שני מוחות נראים זהים. ההבדל הוא ב<b>פעילות</b> וב<b>כימיה</b>. גלגל כדי לראות — בתרשים או על מודל תלת־ממד.',
    typ: 'מוח טיפוסי', adhd: 'מוח ADHD', tre: 'עם טיפול וניהול',
    pfc: 'הקליפה הקדם-מצחית', pfcSub: 'מיקוד · שליטה', reward: 'תגמול (דופמין)', ne: 'נוראדרנלין', pill: 'תרופה + טיפול',
    key: 'מקרא', keyIntro: 'הצבעים מייצגים מערכות נוירו־שליחים — להמחשה בלבד, לא סריקה.',
    dop: 'דופמין', ser: 'סרוטונין', gab: 'GABA', glu: 'גלוטמט',
    viewAria: 'תצוגת המוח', viewFlat: 'תרשים', view3d: 'מודל תלת־ממד',
    drag: 'גררו כדי לסובב', illus: 'להמחשה — האור מראה פעילות וכימיה, לא סריקה.',
    loading3d: 'טוען את מודל המוח…', fail3d: 'לא ניתן לטעון את המודל.',
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
    intro: 'الدماغان يبدوان متطابقين. الفرق في <b>النشاط</b> و<b>الكيمياء</b>. تنقّل لتراه — كمخطط أو على نموذج ثلاثي الأبعاد.',
    typ: 'دماغ نمطي', adhd: 'دماغ ADHD', tre: 'مع العلاج والتدبير',
    pfc: 'القشرة الجبهية', pfcSub: 'تركيز · تحكّم', reward: 'المكافأة (الدوبامين)', ne: 'النورإبينفرين', pill: 'دواء + رعاية',
    key: 'مفتاح', keyIntro: 'الألوان تمثّل أنظمة الناقلات العصبية — للتوضيح فقط، وليس فحصًا.',
    dop: 'الدوبامين', ser: 'السيروتونين', gab: 'GABA', glu: 'الغلوتامات',
    viewAria: 'عرض الدماغ', viewFlat: 'مخطط', view3d: 'نموذج ثلاثي الأبعاد',
    drag: 'اسحب للتدوير', illus: 'للتوضيح — الضوء يبيّن النشاط والكيمياء، وليس فحصًا.',
    loading3d: 'جارٍ تحميل نموذج الدماغ…', fail3d: 'تعذّر تحميل النموذج.',
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
    intro: 'Két agy kinézetre azonos. A különbség az <b>aktivitásban</b> és a <b>kémiában</b> van. Kattints, és nézd meg — ábrán vagy egy 3D agyon.',
    typ: 'Tipikus agy', adhd: 'ADHD-agy', tre: 'Kezeléssel és odafigyeléssel',
    pfc: 'Prefrontális kéreg', pfcSub: 'fókusz · irányítás', reward: 'Jutalom (dopamin)', ne: 'Noradrenalin', pill: 'Kezelés',
    key: 'Jelmagyarázat', keyIntro: 'A színek a neurotranszmitter-rendszereket jelölik — szemléltetés, nem felvétel.',
    dop: 'Dopamin', ser: 'Szerotonin', gab: 'GABA', glu: 'Glutamát',
    viewAria: 'Agynézet', viewFlat: 'Ábra', view3d: '3D modell',
    drag: 'Húzd a forgatáshoz', illus: 'Szemléltetés — a fény a működést és a kémiát mutatja, nem felvételt.',
    loading3d: 'Az agymodell betöltése…', fail3d: 'A 3D modellt nem sikerült betölteni.',
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
    intro: 'Two brains look identical. The difference is in <b>activity</b> and <b>chemistry</b>. Tap through to see it — as a diagram, or on a 3D brain.',
    typ: 'Typical brain', adhd: 'ADHD brain', tre: 'With treatment & management',
    pfc: 'Prefrontal cortex', pfcSub: 'focus · control', reward: 'Reward (dopamine)', ne: 'Norepinephrine', pill: 'Rx + care',
    key: 'Key', keyIntro: 'Colors show broad neurotransmitter systems — illustrative, not a scan.',
    dop: 'Dopamine', ser: 'Serotonin', gab: 'GABA', glu: 'Glutamate',
    viewAria: 'Brain view', viewFlat: 'Diagram', view3d: '3D model',
    drag: 'Drag to turn', illus: 'Illustrative — the light shows activity and chemistry, not a scan.',
    loading3d: 'Loading 3D brain…', fail3d: 'Couldn’t load the 3D model.',
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

  var keyHtml =
    '<div class="bm-keybar" aria-hidden="true">' +
    '<span class="bm-key-title">' + L.key + '</span>' +
    '<span class="bm-key-item"><span class="dot" style="background:#c45cff"></span>' + L.ser + '</span>' +
    '<span class="bm-key-item"><span class="dot" style="background:#ff8fab"></span>' + L.gab + '</span>' +
    '<span class="bm-key-item"><span class="dot" style="background:#c8e66c"></span>' + L.glu + '</span>' +
    '<span class="bm-key-item"><span class="dot" style="background:#0f8f8a"></span>' + L.ne + '</span>' +
    '<span class="bm-key-item"><span class="dot" style="background:#c9781b"></span>' + L.dop + '</span>' +
    '<span class="bm-key-note">' + L.keyIntro + '</span></div>';

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
    '@media(prefers-reduced-motion:reduce){#brainmap .sig,#brainmap .pfc,#brainmap .attn{animation:none!important}}' +
    '#brainmap .bm-views{display:flex;gap:.4rem;align-items:center;margin:-.15rem 0 1.15rem;flex-wrap:wrap}' +
    '#brainmap .bm-views button{border:1px solid var(--line);background:var(--surface);font-family:inherit;font-weight:700;font-size:.82rem;color:var(--grey);padding:.4rem .9rem;border-radius:999px;cursor:pointer;transition:.15s}' +
    '#brainmap .bm-views button.on{background:var(--ink);color:var(--surface);border-color:var(--ink)}' +
    '#brainmap .bm-3d{position:relative;height:420px;border-radius:12px;overflow:hidden}' +
    '#brainmap .bm-3d canvas{width:100%;height:100%;display:block;touch-action:none;cursor:grab}' +
    '#brainmap .bm-3d canvas:active{cursor:grabbing}' +
    '#brainmap .bm-3d-status{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--grey);font-size:.92rem;pointer-events:none;text-align:center;padding:1rem}' +
    '#brainmap .bm-3d-status.hide{display:none}' +
    '#brainmap .bm-3d-hint{position:absolute;left:.75rem;right:.75rem;bottom:.55rem;display:flex;justify-content:space-between;gap:.75rem;flex-wrap:wrap;font-size:.72rem;line-height:1.35;color:var(--grey);pointer-events:none}' +
    '#brainmap .bm-3d-pill{position:absolute;top:.75rem;inset-inline-end:.75rem;background:#e0a144;color:#fff;font-family:"IBM Plex Mono","Tajawal",monospace;font-size:.72rem;font-weight:700;padding:.38rem .75rem;border-radius:999px;opacity:0;transition:opacity .5s;pointer-events:none}' +
    '#brainmap .bm-3d-pill.show{opacity:1}' +
    '#brainmap .bm-stage.is-3d .viz{display:none}' +
    '#brainmap .bm-stage:not(.is-3d) .bm-3d{display:none}' +
    '#brainmap .bm-keybar{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem .9rem;background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:.42rem .85rem;margin:0 0 .85rem;font-size:.72rem;line-height:1.3;color:var(--ink-soft)}' +
    '#brainmap .bm-keybar .bm-key-title{font-family:"Bricolage Grotesque",sans-serif;font-weight:700;color:var(--ink);margin-inline-end:.2rem}' +
    '#brainmap .bm-keybar .bm-key-item{display:inline-flex;align-items:center;gap:.32rem;white-space:nowrap}' +
    '#brainmap .bm-keybar .dot{width:10px;height:10px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(0,0,0,.1)}' +
    '#brainmap .bm-keybar .bm-key-note{flex:1 1 100%;font-size:.65rem;color:var(--grey);margin-top:-.15rem}' +
    '@media(max-width:760px){#brainmap .bm-keybar{font-size:.65rem;gap:.4rem .7rem;padding:.35rem .7rem;border-radius:14px}#brainmap .bm-keybar .bm-key-note{font-size:.58rem}}' +
    '@media(max-width:760px){#brainmap .bm-3d{height:320px}#brainmap .bm-3d-hint{font-size:.68rem}}';
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
    '<text class="region-label" x="330" y="66">' + L.ne + '</text>' +
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
    '<button type="button" data-s="typical">' + L.typ + '</button>' +
    '<button type="button" data-s="adhd" class="on">' + L.adhd + '</button>' +
    '<button type="button" data-s="treated">' + L.tre + '</button></div>' +
    '<div class="bm-views" role="group" aria-label="' + L.viewAria + '">' +
    '<button type="button" data-v="flat" class="on" aria-pressed="true">' + L.viewFlat + '</button>' +
    '<button type="button" data-v="3d" aria-pressed="false">' + L.view3d + '</button></div>' +
    keyHtml +
    '<div class="bm-grid"><div class="bm-stage"><div class="viz state-adhd" id="bmViz">' + svg + '</div>' +
    '<div class="bm-3d" id="bm3d"><canvas id="bm3dCanvas" aria-hidden="true"></canvas>' +
    '<div class="bm-3d-status" id="bm3dStatus">' + L.loading3d + '</div>' +
    '<div class="bm-3d-pill" id="bm3dPill">' + L.pill + '</div>' +
    '<div class="bm-3d-hint"><span>' + L.drag + '</span><span>' + L.illus + '</span></div></div></div>' +
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
    currentState = state;
    var pill = sec.querySelector('.pill-rx'); if (pill) pill.style.opacity = (state === 'treated') ? '1' : '0';
    var pill3 = document.getElementById('bm3dPill'); if (pill3) pill3.classList.toggle('show', state === 'treated');
    [].forEach.call(sec.querySelectorAll('.bm-toggle button'), function (b) { b.classList.toggle('on', b.getAttribute('data-s') === state); });
    if (viewer) viewer.setState(state);
  }
  [].forEach.call(sec.querySelectorAll('.bm-toggle button'), function (b) {
    b.addEventListener('click', function () { render(b.getAttribute('data-s')); });
  });

  var currentState = 'adhd';
  var viewMode = 'flat';
  var viewer = null;
  var mounting = false;

  function setView(mode) {
    viewMode = mode === '3d' ? '3d' : 'flat';
    var stage = sec.querySelector('.bm-stage');
    if (stage) stage.classList.toggle('is-3d', viewMode === '3d');
    [].forEach.call(sec.querySelectorAll('.bm-views button'), function (b) {
      var on = b.getAttribute('data-v') === viewMode;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (viewMode === '3d') mount3d();
    else if (viewer) viewer.pause();
  }
  [].forEach.call(sec.querySelectorAll('.bm-views button'), function (b) {
    b.addEventListener('click', function () { setView(b.getAttribute('data-v')); });
  });

  function cssHex(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!v || v.charAt(0) !== '#') return fallback;
    return parseInt(v.slice(1), 16);
  }

  function makeLabel(THREE, lines, opts) {
    opts = opts || {};
    var c = document.createElement('canvas');
    var W = 840, H = 280;
    c.width = W; c.height = H;
    var ctx = c.getContext('2d');
    ctx.direction = document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';

    var ink = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#181f2a';
    var surface = getComputedStyle(document.documentElement).getPropertyValue('--surface').trim() || '#ffffff';
    var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#f2551f';

    ctx.clearRect(0, 0, W, H);

    var padX = 44, padY = 30, gap = 12;
    ctx.font = '700 54px "Bricolage Grotesque", "Source Serif 4", sans-serif';
    var w1 = lines[0] ? ctx.measureText(lines[0]).width : 0;
    ctx.font = '600 34px "IBM Plex Mono", "Tajawal", monospace';
    var w2 = lines[1] ? ctx.measureText(lines[1]).width : 0;
    var pillW = Math.max(w1, w2) + padX * 2;
    var pillH = (lines[0] ? 68 : 0) + (lines[1] ? 48 : 0) + padY * 2 + (lines[1] ? gap : 0);
    var r = 30;
    var x = (W - pillW) / 2, y = 24;

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.14)';
    ctx.shadowBlur = 36;
    ctx.shadowOffsetY = 12;
    ctx.beginPath();
    ctx.roundRect(x, y, pillW, pillH, r);
    var grad = ctx.createLinearGradient(x, y, x, y + pillH);
    grad.addColorStop(0, surface + 'fc');
    grad.addColorStop(1, surface + 'e8');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    ctx.lineWidth = 4;
    ctx.strokeStyle = accent + '55';
    ctx.beginPath();
    ctx.roundRect(x, y, pillW, pillH, r);
    ctx.stroke();

    var cx = W / 2, cy = y + padY + 35;
    if (lines[0]) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '700 54px "Bricolage Grotesque", "Source Serif 4", sans-serif';
      ctx.shadowColor = 'rgba(255,255,255,0.6)';
      ctx.shadowBlur = 8;
      ctx.fillStyle = ink;
      ctx.fillText(lines[0], cx, cy);
      cy += 68 + gap;
    }
    if (lines[1]) {
      ctx.font = '600 34px "IBM Plex Mono", "Tajawal", monospace';
      ctx.shadowColor = 'rgba(255,255,255,0.5)';
      ctx.shadowBlur = 6;
      ctx.fillStyle = accent;
      ctx.fillText(lines[1], cx, cy);
    }
    ctx.shadowColor = 'transparent';

    var anchorY = y + pillH;
    ctx.strokeStyle = accent + '60';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx, anchorY);
    ctx.lineTo(cx, H - 7);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, H - 7, 8, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, H - 7, 4, 0, Math.PI * 2);
    ctx.fillStyle = surface;
    ctx.fill();

    var tex = new THREE.CanvasTexture(c);
    if ('colorSpace' in tex && THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    var sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex, transparent: true, depthTest: false, opacity: 0.98
    }));
    var width = opts.width || 0.78;
    sprite.scale.set(width, width * H / W, 1);
    sprite.renderOrder = 10;
    sprite.userData.lines = lines;
    return sprite;
  }

  function mount3d() {
    if (viewer) { viewer.resume(); viewer.setState(currentState); return; }
    if (mounting) return;
    mounting = true;
    var statusEl = document.getElementById('bm3dStatus');
    var host = document.getElementById('bm3d');
    var canvas = document.getElementById('bm3dCanvas');
    var THREE_URL = 'https://esm.sh/three@0.170.0';
    Promise.all([
      import(THREE_URL),
      import(THREE_URL + '/examples/jsm/loaders/GLTFLoader.js'),
      import(THREE_URL + '/examples/jsm/controls/OrbitControls.js')
    ]).then(function (mods) {
      var THREE = mods[0];
      var GLTFLoader = mods[1].GLTFLoader;
      var OrbitControls = mods[2].OrbitControls;
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
      } catch (err) {
        if (statusEl) statusEl.textContent = L.fail3d;
        mounting = false;
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(34, 1, 0.05, 30);
      camera.position.set(2.2, 0.88, 4.4);
      var controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enablePan = false;
      controls.minDistance = 3.2;
      controls.maxDistance = 10.5;
      controls.target.set(0, 0.02, 0.12);
      controls.minPolarAngle = 0.2;
      controls.maxPolarAngle = Math.PI - 0.2;

      scene.add(new THREE.HemisphereLight(0xfff7f4, 0x4a4542, 1.45));
      var key = new THREE.DirectionalLight(0xfff4ed, 1.05);
      key.position.set(2.6, 2.8, 2.2);
      scene.add(key);
      var fill = new THREE.DirectionalLight(0xe8f4ff, 0.72);
      fill.position.set(-2.4, 0.6, -1.6);
      scene.add(fill);
      var rim = new THREE.DirectionalLight(0xffffff, 0.42);
      rim.position.set(0, 1.4, -2.8);
      scene.add(rim);
      var warm = new THREE.PointLight(0xffe0c2, 0.28, 5, 2);
      warm.position.set(0, -0.8, 1.2);
      scene.add(warm);

      var pivot = new THREE.Group();
      scene.add(pivot);

      var accent = cssHex('--accent', 0xf2551f);
      var amber = cssHex('--amber', 0xc9781b);
      var pfcLight = new THREE.PointLight(0xfff4ed, 0.6, 1.5, 2);
      pfcLight.position.set(0, 0.28, 1.18);
      var rewardLight = new THREE.PointLight(0xfff4ed, 0.6, 0.7, 2);
      rewardLight.position.set(0.16, 0.02, 0.2);
      pivot.add(pfcLight, rewardLight);

      var haloMat = new THREE.MeshBasicMaterial({
        color: accent, transparent: true, opacity: 0.08, depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      var halo = new THREE.Mesh(new THREE.SphereGeometry(0.2, 28, 20), haloMat);
      halo.position.set(0, 0.2, 0.72);
      pivot.add(halo);
      var dopColor = 0xff6a00;
      var rewardCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.095, 24, 18),
        new THREE.MeshStandardMaterial({
          color: dopColor, emissive: dopColor, emissiveIntensity: 0.9,
          transparent: true, opacity: 1, roughness: 0.25, depthTest: false, depthWrite: false
        })
      );
      rewardCore.position.copy(rewardLight.position);
      rewardCore.renderOrder = 6;
      var rewardGlow = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 20, 16),
        new THREE.MeshBasicMaterial({
          color: dopColor, transparent: true, opacity: 0.22, depthTest: false, depthWrite: false
        })
      );
      rewardGlow.renderOrder = 5;
      rewardCore.add(rewardGlow);
      pivot.add(rewardCore);

      var rewardPos = new THREE.Vector3(0.42, -0.18, 0.55);
      var pfcPos = new THREE.Vector3(0.12, 0.32, 0.82);
      var dopCurve = null;
      var sigGeo = new THREE.SphereGeometry(0.058, 16, 12);
      var signals = [];
      for (var i = 0; i < 7; i++) {
        var sm = new THREE.Mesh(sigGeo, new THREE.MeshStandardMaterial({
          color: dopColor, emissive: dopColor, emissiveIntensity: 0.85,
          transparent: true, opacity: 1, roughness: 0.32, depthTest: false, depthWrite: false
        }));
        var sg = new THREE.Mesh(
          new THREE.SphereGeometry(0.095, 14, 10),
          new THREE.MeshBasicMaterial({
            color: dopColor, transparent: true, opacity: 0.2, depthTest: false, depthWrite: false
          })
        );
        sm.add(sg);
        sm.renderOrder = 6;
        pivot.add(sm);
        signals.push(sm);
      }
      var neColor = 0x0f8f8a;
      var neGeo = new THREE.SphereGeometry(0.044, 16, 14);
      var neHomes = [
        [0.55, 0.72, 0.42], [0.68, 0.62, 0.28], [0.48, 0.78, 0.56], [0.62, 0.52, 0.18]
      ];
      var neDrifts = [
        [-0.18, 0.14, -0.52], [-0.24, 0.18, -0.38], [-0.1, 0.1, -0.58], [-0.2, 0.16, -0.32]
      ];
      var nepis = neHomes.map(function (h, i) {
        var m = new THREE.Mesh(neGeo, new THREE.MeshStandardMaterial({
          color: neColor, emissive: neColor, emissiveIntensity: 0.55,
          transparent: true, opacity: 0.92, roughness: 0.35, metalness: 0.1,
          depthWrite: false
        }));
        m.position.set(h[0], h[1], h[2]);
        m.renderOrder = 4;
        pivot.add(m);
        return m;
      });

      var rayMat = new THREE.MeshBasicMaterial({ color: neColor, transparent: true, opacity: 0.22, depthWrite: false });
      var shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.42, 10), rayMat);
      shaft.rotation.x = -Math.PI / 2;
      shaft.position.set(0.12, 0.22, 1.34);
      var head = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.095, 12), rayMat);
      head.rotation.x = -Math.PI / 2;
      head.position.set(0.12, 0.22, 1.12);
      pivot.add(shaft, head);

      var pfcLabel = makeLabel(THREE, [L.pfc, L.pfcSub], { width: 1.0 });
      pfcLabel.position.set(0.34, 0.48, 0.92);
      var rewardLabel = makeLabel(THREE, [L.reward], { width: 0.78 });
      rewardLabel.position.set(0.72, 0.1, 0.26);
      var neLabel = makeLabel(THREE, [L.ne], { width: 0.72 });
      neLabel.position.set(0.34, 1.0, 0.42);
      pivot.add(pfcLabel, rewardLabel, neLabel);

      var shaders = [];
      function hookMaterial(mat) {
        mat.onBeforeCompile = function (shader) {
          shader.uniforms.uAct = { value: 1 };
          shader.uniforms.uSig = { value: 1 };
          shader.vertexShader = shader.vertexShader
            .replace('#include <common>', '#include <common>\nvarying float vDop;\nvarying float vPfc;\nvarying float vNe;\nfloat nbDistSeg(vec3 p, vec3 a, vec3 b){vec3 ab=b-a;float t=clamp(dot(p-a,ab)/max(dot(ab,ab),0.0001),0.0,1.0);return distance(p,a+ab*t);}')
            .replace('#include <begin_vertex>', '#include <begin_vertex>\nvec3 nb0=vec3(-0.02,-0.42,0.72);vec3 nb1=vec3(-0.22,-0.12,0.78);vec3 nb2=vec3(-0.42,0.08,0.74);vec3 nb3=vec3(-0.62,0.22,0.62);vec3 nb4=vec3(-0.78,0.30,0.42);\nfloat nbPath=min(min(nbDistSeg(transformed,nb0,nb1),nbDistSeg(transformed,nb1,nb2)),min(nbDistSeg(transformed,nb2,nb3),nbDistSeg(transformed,nb3,nb4)));\nvDop=1.0-smoothstep(0.04,0.30,nbPath);\nvPfc=1.0-smoothstep(0.02,0.38,distance(transformed,nb4));\nvNe=1.0-smoothstep(0.04,0.24,distance(transformed,vec3(-0.12,0.88,0.20)));');
          shader.fragmentShader = shader.fragmentShader
            .replace('#include <common>', '#include <common>\nuniform float uAct;\nuniform float uSig;\nvarying float vDop;\nvarying float vPfc;\nvarying float vNe;\nfloat nbFr = 0.0;')
            .replace('#include <map_fragment>', '#include <map_fragment>\nfloat dop=vDop;\nfloat pfc=vPfc;\nfloat ne=vNe;\nfloat hot=clamp(max(dop,max(pfc,ne)),0.0,1.0);\nvec3 base=diffuseColor.rgb;\nfloat lum=dot(base,vec3(0.299,0.587,0.114));\nvec3 vivid=clamp(mix(vec3(lum),base,2.3)*1.05,0.0,1.0);\nvec3 washed=mix(vec3(0.84,0.90,0.98),vivid,0.86);\nvec3 painted=vec3(1.0,0.42,0.02);\npainted=mix(painted,vec3(0.98,0.20,0.32),smoothstep(0.2,0.85,pfc)*(1.0-dop*0.3));\npainted=mix(painted,vec3(0.0,0.66,0.62),smoothstep(0.15,0.8,ne));\ndiffuseColor.rgb=mix(washed,painted,smoothstep(0.05,0.55,hot));\ndiffuseColor.a=mix(0.5,1.0,smoothstep(0.04,0.42,hot));')
            .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\nnbFr=pow(1.0-abs(dot(normalize(normal),normalize(vViewPosition))),2.4);\ntotalEmissiveRadiance+=vec3(0.45,0.70,1.0)*nbFr*0.45;\ntotalEmissiveRadiance+=vec3(1.0,0.40,0.0)*vDop*(0.5+0.5*uSig);\ntotalEmissiveRadiance+=vec3(1.0,0.18,0.28)*vPfc*(0.3+0.6*uAct);\ntotalEmissiveRadiance+=vec3(0.0,0.62,0.58)*vNe*0.45;')
            .replace('#include <opaque_fragment>', 'diffuseColor.a=max(diffuseColor.a,nbFr*0.85);\n#include <opaque_fragment>');
          mat.userData.shader = shader;
        };
        shaders.push(mat);
      }
      function glassFrom(src) {
        var glass = new THREE.MeshPhysicalMaterial({
          map: src.map || null,
          normalMap: src.normalMap || null,
          color: 0xf3f8fb,
          roughness: 0.16,
          metalness: 0.0,
          clearcoat: 1,
          clearcoatRoughness: 0.04,
          transparent: true,
          opacity: 1,
          depthWrite: false,
          side: THREE.FrontSide
        });
        hookMaterial(glass);
        return glass;
      }

      var scriptEl = document.querySelector('script[src$="brain.js"]');
      var glbUrl = new URL('brain-3d.glb', scriptEl ? scriptEl.src : document.baseURI).href;
      var loader = new GLTFLoader();
      var brainModel = null;
      loader.load(glbUrl, function (gltf) {
        var model = gltf.scene;
        model.traverse(function (obj) {
          if (obj.isMesh && obj.material) {
            var mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            obj.material = mats.length === 1 ? glassFrom(mats[0]) : mats.map(glassFrom);
          }
        });
        pivot.add(model);
        brainModel = model;
        if (statusEl) statusEl.classList.add('hide');
        try {
          model.updateMatrixWorld(true);
          var brainMeshes = [];
          model.traverse(function (obj) { if (obj.isMesh) brainMeshes.push(obj); });
          var raycaster = new THREE.Raycaster();
          raycaster.camera = camera;
          function onSurface(dir, lift) {
            var origin = dir.clone().normalize().multiplyScalar(5);
            var worldOrigin = origin.applyMatrix4(model.matrixWorld);
            var center = new THREE.Vector3().setFromMatrixPosition(model.matrixWorld);
            raycaster.set(worldOrigin, center.clone().sub(worldOrigin).normalize());
            var hits = [];
            brainMeshes.forEach(function (mesh) {
              var found = raycaster.intersectObject(mesh, false);
              if (found.length) hits.push(found[0]);
            });
            hits.sort(function (a, b) { return a.distance - b.distance; });
            if (!hits.length) return dir.clone().normalize().multiplyScalar(0.9);
            var local = model.worldToLocal(hits[0].point.clone());
            var n = hits[0].face ? hits[0].face.normal.clone() : dir.clone().normalize();
            n.transformDirection(hits[0].object.matrixWorld);
            var inv = new THREE.Matrix4().copy(model.matrixWorld).invert();
            n.transformDirection(inv);
            if (n.lengthSq() > 0.0001) local.add(n.normalize().multiplyScalar(lift || 0.06));
            return local;
          }
          function adopt(obj) {
            pivot.remove(obj);
            model.add(obj);
          }
          [rewardCore, shaft, head, pfcLabel, rewardLabel, neLabel, pfcLight, rewardLight, halo].forEach(adopt);
          signals.forEach(adopt);
          nepis.forEach(adopt);
          var dopPts = [
            new THREE.Vector3(-0.02, -0.42, 0.72),
            new THREE.Vector3(-0.22, -0.12, 0.78),
            new THREE.Vector3(-0.42, 0.08, 0.74),
            new THREE.Vector3(-0.62, 0.22, 0.62),
            new THREE.Vector3(-0.78, 0.3, 0.42)
          ].map(function (d) { return onSurface(d, 0.1); });
          dopCurve = new THREE.CatmullRomCurve3(dopPts);
          rewardPos.copy(dopPts[0]);
          pfcPos.copy(dopPts[dopPts.length - 1]);
          rewardCore.position.copy(rewardPos);
          rewardLight.position.copy(rewardPos);
          pfcLight.position.copy(pfcPos);
          halo.position.copy(pfcPos);
          rewardLabel.position.copy(rewardPos).add(new THREE.Vector3(0.02, -0.34, 0.42));
          pfcLabel.position.copy(pfcPos).add(new THREE.Vector3(-0.28, 0.26, 0.16));
          var end = dopPts[dopPts.length - 1];
          var prev = dopPts[dopPts.length - 2];
          var tang = prev.clone().sub(end);
          if (tang.lengthSq() > 0.0001) {
            tang.normalize();
            var aim = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), tang);
            shaft.position.copy(end).addScaledVector(tang, 0.18);
            shaft.quaternion.copy(aim);
            head.position.copy(end).addScaledVector(tang, 0.4);
            head.quaternion.copy(aim);
          }
          var neDirs = [
            new THREE.Vector3(-0.15, 0.92, 0.28),
            new THREE.Vector3(0.12, 0.9, 0.22),
            new THREE.Vector3(-0.35, 0.86, 0.18),
            new THREE.Vector3(0.02, 0.94, 0.08)
          ];
          neDirs.forEach(function (d, i) {
            var p = onSurface(d, 0.06);
            neHomes[i][0] = p.x; neHomes[i][1] = p.y; neHomes[i][2] = p.z;
            neDrifts[i][0] = 0; neDrifts[i][1] = 0.02; neDrifts[i][2] = 0;
            nepis[i].position.copy(p);
          });
          neLabel.position.copy(nepis[0].position).add(new THREE.Vector3(0.05, 0.34, 0.02));
        } catch (err) {
          dopCurve = null;
        }
      }, function (ev) {
        if (statusEl && ev.total) statusEl.textContent = L.loading3d.replace('…', '') + ' ' + Math.round(100 * ev.loaded / ev.total) + '%';
      }, function () {
        if (statusEl && !brainModel) statusEl.textContent = L.fail3d;
      });

      var goals = {
        typical: { act: 1, drift: 0, ray: 1, flick: 0 },
        adhd: { act: 0.36, drift: 1, ray: 0.12, flick: 1 },
        treated: { act: 1, drift: 0, ray: 1, flick: 0 }
      };
      var shown = { act: 0.36, drift: 1, ray: 0.12, flick: 1 };
      var goal = goals.adhd;
      var running = false;
      var autospin = true;
      var last = 0;
      var spinResumeTimer = null;
      controls.addEventListener('start', function () {
        autospin = false;
        if (spinResumeTimer) clearTimeout(spinResumeTimer);
      });
      controls.addEventListener('end', function () {
        if (spinResumeTimer) clearTimeout(spinResumeTimer);
        spinResumeTimer = setTimeout(function () { autospin = true; }, 3500);
      });

      function resize() {
        var w = host.clientWidth || 640;
        var h = host.clientHeight || 420;
        renderer.setSize(w, h, false);
        camera.aspect = w / Math.max(1, h);
        camera.updateProjectionMatrix();
      }
      resize();
      if (window.ResizeObserver) new ResizeObserver(resize).observe(host);

      function frame(now) {
        if (!running) return;
        var dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
        last = now;
        var t = now / 1000;
        var k = 1 - Math.pow(0.04, dt * 3);
        shown.act += (goal.act - shown.act) * k;
        shown.drift += (goal.drift - shown.drift) * k;
        shown.ray += (goal.ray - shown.ray) * k;
        shown.flick += (goal.flick - shown.flick) * k;
        var flickWave = Math.abs(Math.sin(t * 2.6) * Math.sin(t * 6.4));
        var actNow = shown.flick > 0.02
          ? shown.act * (1 - shown.flick) + (0.06 + 0.22 * flickWave) * shown.flick
          : shown.act;
        var smoothPulse = 0.78 + 0.22 * Math.sin(t * 2.3);
        var chopPulse = Math.pow(Math.abs(Math.sin(t * 1.7) * Math.sin(t * 5.6)), 1.35);
        var sigNow = smoothPulse * (1 - shown.flick) + chopPulse * shown.flick;
        if (reduced) { actNow = goal.flick ? 0.34 : goal.act; sigNow = goal.flick ? 0.4 : 0.9; }
        shaders.forEach(function (mat) {
          var sh = mat.userData.shader;
          if (!sh) return;
          sh.uniforms.uAct.value = actNow;
          sh.uniforms.uSig.value = Math.max(0, sigNow);
        });
        pfcLight.intensity = 0.25 + 3.4 * actNow;
        rewardLight.intensity = 0.35 + 2.4 * Math.max(0, sigNow);
        haloMat.opacity = 0.03 + 0.16 * actNow;
        rayMat.opacity = shown.ray;
        var speed = 0.22 + 0.52 * (1 - shown.flick);
        signals.forEach(function (m, i) {
          var u = (t * speed + i / 6) % 1;
          var ease = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
          if (dopCurve) m.position.copy(dopCurve.getPoint(1 - ease));
          else m.position.lerpVectors(pfcPos, rewardPos, ease);
          var dropped = shown.flick > 0.45 && (i % 2 === 1);
          var pulse = 0.55 + 0.45 * Math.sin(u * Math.PI);
          m.material.opacity = dropped ? 0.22 : 0.85 + 0.15 * pulse;
          m.material.emissiveIntensity = dropped ? 0.25 : 0.7 + 0.6 * pulse;
          var s = 1.05 + 0.4 * pulse;
          m.scale.setScalar(dropped ? 0.72 : s);
        });
        nepis.forEach(function (m, i) {
          var amp = reduced ? shown.drift : shown.drift * (0.55 + 0.45 * Math.sin(t * 1.25 + i));
          m.position.set(
            neHomes[i][0] + neDrifts[i][0] * amp,
            neHomes[i][1] + neDrifts[i][1] * amp,
            neHomes[i][2] + neDrifts[i][2] * amp
          );
          var steady = 1 - shown.drift;
          m.material.emissiveIntensity = 0.3 + 0.45 * steady + 0.15 * Math.sin(t * 2.2 + i);
          m.material.opacity = 0.75 + 0.2 * steady;
        });
        if (autospin && viewMode === '3d') pivot.rotation.y += dt * 0.28;
        if (brainModel) {
          var breath = 1 + 0.006 * Math.sin(t * 1.6) * actNow;
          brainModel.scale.setScalar(breath);
        }
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
      }

      viewer = {
        setState: function (name) { goal = goals[name] || goals.adhd; },
        pause: function () { running = false; },
        resume: function () {
          if (running) return;
          running = true;
          last = 0;
          requestAnimationFrame(frame);
        }
      };
      viewer.setState(currentState);
      if (viewMode === '3d') viewer.resume();
      mounting = false;

      new MutationObserver(function () {
        var accent = cssHex('--accent', 0xf2551f);
        var amber = cssHex('--amber', 0xc9781b);
        haloMat.color.setHex(accent);
        rewardCore.material.color.setHex(amber);
        signals.forEach(function (m) { m.material.color.setHex(amber); });
        [pfcLabel, rewardLabel, neLabel].forEach(function (s) {
          var next = makeLabel(THREE, s.userData.lines, s === neLabel ? { width: 0.5 } : undefined);
          s.material.map.dispose();
          s.material.map = next.material.map;
          s.material.needsUpdate = true;
          next.material.dispose();
        });
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    }).catch(function () {
      if (statusEl && !(statusEl.classList.contains('hide'))) statusEl.textContent = L.fail3d;
      mounting = false;
    });
  }

  render('adhd');
})();
