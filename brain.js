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
    pfc: 'הקליפה הקדם-מצחית', pfcSub: 'מיקוד · שליטה', reward: 'תגמול (דופמין)', ne: 'נוראדרנלין', pill: 'תרופה + טיפול',
    key: 'מקרא', keyIntro: 'הצבעים מייצגים מערכות נוירו־שליחים — להמחשה בלבד, לא סריקה.',
    dop: 'דופמין', ser: 'סרוטונין', gab: 'GABA', glu: 'גלוטמט',
    note: 'ההבדלים האלה תפקודיים וכימיים — ואינם עדות לכך שמשהו «תקול».',
    regions: [['הקליפה הקדם-מצחית', 'קשב, תכנון, זיכרון עבודה ושליטה בדחפים'], ['קליפת החגורה הקדמית', 'הכוונת הקשב וזיהוי טעויות'], ['סטריאטום (גרעין הזנב)', 'בחירת התגובה הנכונה וויסות תנועה'], ['מעגל התגמול', 'מוטיבציה ותגמול — כשהוא פעיל פחות, קשה לחכות והבחירה האימפולסיבית מנצחת'], ['נוראדרנלין (לוקוס קרולאוס)', 'ערנות ושמירה על אותות מיקוד ברורים בקליפה הקדם-מצחית']],
    regionsFoot: 'יחד, המעגלים הפרונטו-סטריאטליים האלה מפעילים את השליטה הניהולית. איתות לא סדיר של דופמין ונוראדרנלין בהם מתבטא בקשב לקוי ו/או בהיפראקטיביות-אימפולסיביות.',
    moreH: 'ומה לגבי סרוטונין, GABA וגלוטמט?', moreIntro: 'לדופמין ולנוראדרנלין יש את הראיות החזקות ביותר ב-ADHD, ובהם פועלות התרופות ל-ADHD. נוירו-שליחים אחרים ממלאים תפקידים משניים:',
    serT: 'משפיע על מצב הרוח, הסבלנות ומהירות התגובה. הוא אינו גורם מרכזי ל-ADHD, אבל הוא חשוב כש-ADHD מגיע יחד עם חרדה או דיכאון. תרופות סרוטונין (SSRI) אינן מטפלות בתסמיני הליבה של ADHD.',
    gabT: 'הבלם המרכזי של המוח. כמה מחקרי הדמיה מצאו רמות GABA נמוכות יותר באזורי התנועה אצל ילדים עם ADHD, מה שעשוי להיות קשור לעכבה חלשה יותר ולאי-שקט. הממצאים אינם אחידים.',
    gluT: 'אות ה״קדימה״ המרכזי שמחבר בין הקליפה הקדם-מצחית לסטריאטום. מחקרי הדמיה מרמזים שרמות הגלוטמט במעגלים אלה עשויות להיות לא מאוזנות ב-ADHD. הראיות עדיין מתגבשות.',
    rxH: "איך התרופות עובדות", rxIntro: "בחרו תרופה כדי לראות על אילו מסלולים היא פועלת בתרשים.",
    rx: [["מתילפנידאט", "ריטלין, קונסרטה", "חוסם את משאבות הספיגה החוזרת של דופמין ונוראדרנלין (DAT ו-NET), כך שהאותות האלה נשארים פעילים זמן רב יותר — בעיקר בסטריאטום ובקליפה הקדם-מצחית."], ["אמפטמינים", "ויואנס, אדרל", "גם חוסמים ספיגה חוזרת, וגם דוחפים דופמין ונוראדרנלין החוצה מקצות העצבים (היפוך DAT ופעולה על VMAT2) — אפקט שחרור חזק יותר."], ["אטומוקסטין, וילוקסזין", "סטרטרה · לא-ממריצים", "חוסמים את משאבת הנוראדרנלין. בקליפה הקדם-מצחית זה מעלה גם דופמין, כי שם אותה משאבה מפנה את שניהם. ההשפעה נבנית במשך כמה שבועות."], ["גואנפצין, קלונידין", "אינטוניב · אגוניסטים של α2A", "מפעילים קולטני α2A בתאי העצב של הקליפה הקדם-מצחית, מחזקים את אותות הרשת ומסננים \"רעש\". עוזרים גם בהיפראקטיביות, בשינה ובתגובתיות רגשית."]],
    rxMore: "עוד על התרופה בפרק התרופות ↓",
    rxFoot: "הסבר מפושט לצורכי לימוד — לא ייעוץ רפואי. בחירת התרופה והמינון נעשות יחד עם הרופא/ה.",
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
    pfc: 'القشرة الجبهية', pfcSub: 'تركيز · تحكّم', reward: 'المكافأة (الدوبامين)', ne: 'النورإبينفرين', pill: 'دواء + رعاية',
    key: 'مفتاح', keyIntro: 'الألوان تمثّل أنظمة الناقلات العصبية — للتوضيح فقط، وليس فحصًا.',
    dop: 'الدوبامين', ser: 'السيروتونين', gab: 'GABA', glu: 'الغلوتامات',
    note: 'هذه الفروق وظيفية وكيميائية — وليست دليلاً على أن شيئاً «معطوب».',
    regions: [['القشرة الجبهية', 'الانتباه والتخطيط والذاكرة العاملة وكبح الاندفاع'], ['القشرة الحزامية الأمامية', 'توجيه الانتباه ورصد الأخطاء'], ['الجسم المخطط (النواة المذنبة)', 'اختيار الاستجابة الصحيحة وتنظيم الحركة'], ['دائرة المكافأة', 'الدافعية والمكافأة — حين يضعف نشاطها يصعب الانتظار ويغلب الاختيار المندفع'], ['النورإبينفرين (الموضع الأزرق)', 'اليقظة والحفاظ على وضوح إشارات التركيز في القشرة الجبهية']],
    regionsFoot: 'معاً، تدير هذه الدوائر الجبهية المخططية التحكّم التنفيذي. وعدم انتظام إشارات الدوبامين والنورإبينفرين فيها يظهر في صورة ضعف الانتباه و/أو فرط الحركة والاندفاع.',
    moreH: 'وماذا عن السيروتونين وGABA والغلوتامات؟', moreIntro: 'للدوبامين والنورإبينفرين أقوى الأدلة في ADHD، وعليهما تعمل أدوية ADHD. أما النواقل الأخرى فأدوارها مساندة:',
    serT: 'يؤثر في المزاج والصبر وسرعة ردّ الفعل. ليس سبباً رئيسياً لـ ADHD، لكنه مهم حين يترافق ADHD مع القلق أو الاكتئاب. أدوية السيروتونين (SSRIs) لا تعالج الأعراض الأساسية لـ ADHD.',
    gabT: 'المكبح الرئيسي في الدماغ. وجدت بعض دراسات التصوير مستويات أقل من GABA في مناطق الحركة لدى أطفال لديهم ADHD، وقد يرتبط ذلك بضعف الكبح والتململ. النتائج متباينة.',
    gluT: 'إشارة «الانطلاق» الرئيسية التي تربط القشرة الجبهية بالجسم المخطط. تشير دراسات التصوير إلى أن الغلوتامات قد يكون غير متوازن في هذه الدوائر لدى ADHD. الأدلة ما زالت في طور التكوّن.',
    rxH: "كيف تعمل الأدوية", rxIntro: "اختر دواءً لترى المسارات التي يؤثر فيها على الرسم.",
    rx: [["ميثيلفينيديت", "ريتالين، كونسرتا", "يحجب مضخّات إعادة امتصاص الدوبامين والنورأدرينالين (DAT وNET)، فتبقى هذه الإشارات نشطة لفترة أطول — خاصة في الجسم المخطط والقشرة الجبهية."], ["الأمفيتامينات", "فيفانس، أديرال", "تحجب إعادة الامتصاص أيضًا، وتدفع الدوبامين والنورأدرينالين إلى خارج نهايات الأعصاب (بعكس عمل DAT والتأثير على VMAT2) — أي تأثير إطلاق أقوى."], ["أتوموكسيتين، فيلوكسازين", "ستراتيرا · غير منشّطة", "تحجب مضخّة النورأدرينالين. وفي القشرة الجبهية يرفع ذلك الدوبامين أيضًا، لأن المضخّة نفسها تزيل الاثنين هناك. يتراكم التأثير على مدى عدة أسابيع."], ["غوانفاسين، كلونيدين", "إنتونيف · منبّهات α2A", "تنشّط مستقبلات α2A في خلايا القشرة الجبهية، فتقوّي إشارات الشبكة وتصفّي «الضجيج». تساعد أيضًا في فرط الحركة والنوم والتفاعل العاطفي."]],
    rxMore: "المزيد عن هذا الدواء في قسم الأدوية ↓",
    rxFoot: "شرح مبسّط لأغراض تعليمية — ليس نصيحة طبية. يُحدَّد الدواء والجرعة مع طبيبك.",
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
    pfc: 'Prefrontális kéreg', pfcSub: 'fókusz · irányítás', reward: 'Jutalom (dopamin)', ne: 'Noradrenalin', pill: 'Kezelés',
    key: 'Jelmagyarázat', keyIntro: 'A színek a neurotranszmitter-rendszereket jelölik — szemléltetés, nem felvétel.',
    dop: 'Dopamin', ser: 'Szerotonin', gab: 'GABA', glu: 'Glutamát',
    note: 'Ezek a különbségek működésbeli és kémiai jellegűek — nem jelei annak, hogy bármi „elromlott”.',
    regions: [['Prefrontális kéreg', 'figyelem, tervezés, munkamemória és impulzuskontroll'], ['Elülső cinguláris kéreg', 'a figyelem irányítása és a hibák észlelése'], ['Striatum (nucleus caudatus)', 'a megfelelő válasz kiválasztása és a mozgás szabályozása'], ['Jutalmazó rendszer', 'motiváció és jutalom — ha alulműködik, nehéz várni, és az impulzív döntés győz'], ['Noradrenalin (locus coeruleus)', 'éberség és tiszta fókuszjelek a prefrontális kéregben']],
    regionsFoot: 'Ezek a frontostriatális körök együtt működtetik a végrehajtó irányítást. Ha bennük egyenetlen a dopamin- és noradrenalin-jelzés, az figyelemzavarként és/vagy hiperaktivitás-impulzivitásként jelenik meg.',
    moreH: 'És mi a helyzet a szerotoninnal, a GABA-val és a glutamáttal?', moreIntro: 'ADHD-ban a dopaminra és a noradrenalinra van a legerősebb bizonyíték, és az ADHD-gyógyszerek is ezekre hatnak. A többi hírvivő molekula kiegészítő szerepet játszik:',
    serT: 'Hatással van a hangulatra, a türelemre és a reakciók gyorsaságára. Nem fő oka az ADHD-nak, de fontos, ha az ADHD szorongással vagy depresszióval együtt jár. A szerotoninra ható gyógyszerek (SSRI-k) nem kezelik az ADHD alaptüneteit.',
    gabT: 'Az agy fő fékje. Egyes képalkotó vizsgálatok alacsonyabb GABA-szintet találtak ADHD-s gyerekek mozgásért felelős agyterületein, ami összefügghet a gyengébb gátlással és a nyugtalansággal. Az eredmények vegyesek.',
    gluT: 'A fő „indító” jel, amely összeköti a prefrontális kérget és a striatumot. Képalkotó vizsgálatok szerint ADHD-ban ezekben a körökben felborulhat a glutamát egyensúlya. A bizonyítékok még gyűlnek.',
    rxH: "Hogyan hatnak a gyógyszerek?", rxIntro: "Válassz egy gyógyszert, és az ábrán látod, mely pályákra hat.",
    rx: [["Metilfenidát", "Ritalin, Concerta, Medikinet", "Gátolja a dopamin- és noradrenalin-visszavételi pumpákat (DAT, NET), így ezek a jelek tovább aktívak maradnak — főleg a striatumban és a prefrontális kéregben."], ["Amfetaminok", "Elvanse (lisdexamfetamin)", "Szintén gátolják a visszavételt, emellett ki is préselik a dopamint és a noradrenalint az idegvégződésekből (a DAT megfordításával, a VMAT2-re hatva) — erősebb felszabadító hatás."], ["Atomoxetin, viloxazin", "Strattera · nem stimulánsok", "Gátolják a noradrenalin-pumpát. A prefrontális kéregben ez a dopamint is emeli, mert ott ugyanez a pumpa takarítja el mindkettőt. A hatás néhány hét alatt épül fel."], ["Guanfacin, klonidin", "Intuniv · α2A-agonisták", "A prefrontális idegsejtek α2A-receptoraira hatnak: erősítik a hálózat jeleit és kiszűrik a „zajt”. A hiperaktivitásban, az alvásban és az érzelmi reaktivitásban is segíthetnek."]],
    rxMore: "Bővebben a Gyógyszerek részben ↓",
    rxFoot: "Oktatási célú egyszerűsítés — nem orvosi tanács. A gyógyszert és az adagot az orvosoddal közösen választjátok ki.",
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
    pfc: 'Prefrontal cortex', pfcSub: 'focus · control', reward: 'Reward (dopamine)', ne: 'Norepinephrine', pill: 'Rx + care',
    key: 'Key', keyIntro: 'Colors show broad neurotransmitter systems — illustrative, not a scan.',
    dop: 'Dopamine', ser: 'Serotonin', gab: 'GABA', glu: 'Glutamate',
    note: 'These differences are functional and chemical — not a sign that anything is “broken.”',
    regions: [['Prefrontal cortex', 'attention, planning, working memory and impulse control'], ['Anterior cingulate', 'where attention goes, and catching mistakes'], ['Striatum (caudate)', 'choosing the right response and regulating movement'], ['Reward circuit', 'motivation and reward — when it runs low, waiting feels hard and impulsive choices win'], ['Norepinephrine (locus coeruleus)', 'alertness, and keeping focus signals clear in the prefrontal cortex']],
    regionsFoot: 'Together these frontostriatal circuits run executive control. Uneven dopamine and norepinephrine signalling here shows up as inattention and/or hyperactivity-impulsivity.',
    moreH: 'What about serotonin, GABA and glutamate?', moreIntro: 'Dopamine and norepinephrine have the strongest evidence in ADHD, and they are what ADHD medicines act on. Other messengers play supporting roles:',
    serT: 'Shapes mood, patience and how quickly you react. It isn’t a core cause of ADHD, but it matters when ADHD comes with anxiety or depression. Serotonin medicines (SSRIs) don’t treat core ADHD symptoms.',
    gabT: 'The brain’s main brake. Some brain-imaging studies find lower GABA in movement areas in children with ADHD, which may relate to weaker inhibition and restlessness. Results are mixed.',
    gluT: 'The main “go” signal linking the prefrontal cortex and striatum. Imaging studies suggest glutamate can be out of balance in these circuits in ADHD. The evidence is still emerging.',
    rxH: "How the medicines work", rxIntro: "Pick a medicine to see which pathways it acts on in the diagram.",
    rx: [["Methylphenidate", "Ritalin, Concerta", "Blocks the dopamine and norepinephrine reuptake pumps (DAT and NET), so these signals stay active for longer — mainly in the striatum and prefrontal cortex."], ["Amphetamines", "Vyvanse, Adderall", "Also block reuptake, and additionally push dopamine and norepinephrine out of nerve endings (reversing DAT and acting on VMAT2) — a stronger release effect."], ["Atomoxetine, viloxazine", "Strattera · non-stimulants", "Block the norepinephrine pump. In the prefrontal cortex this raises dopamine too, because the same pump clears both there. The effect builds over several weeks."], ["Guanfacine, clonidine", "Intuniv · α2A agonists", "Act on α2A receptors on prefrontal neurons, strengthening the network’s signals and filtering out “noise”. They can also help with hyperactivity, sleep and emotional reactivity."]],
    rxMore: "See more in the Meds section ↓",
    rxFoot: "Simplified for education — not medical advice. The choice of medicine and dose is made with your doctor.",
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
    '#brainmap .acc{fill:none;stroke:#e0457b;stroke-width:7;stroke-linecap:round;transition:opacity .5s}' +
    '#brainmap .str{fill:none;stroke:#7a5cff;stroke-width:9;stroke-linecap:round;transition:opacity .5s}#brainmap .str-head{fill:#7a5cff;transition:opacity .5s}' +
    '#brainmap .da-path{fill:none;stroke:var(--amber);stroke-width:2;stroke-dasharray:3 5;opacity:.55}#brainmap .ne-path{fill:none;stroke:#2f8f83;stroke-width:2;stroke-dasharray:3 5;opacity:.45}#brainmap .lc{fill:#2f8f83}' +
    '#brainmap .num text{font:700 11px "IBM Plex Mono",monospace;fill:#fff}#brainmap .num circle{stroke:#fff;stroke-width:2}' +
    '#brainmap .viz.state-adhd .acc,#brainmap .viz.state-adhd .str,#brainmap .viz.state-adhd .str-head{opacity:.4;animation:bmflick 2.6s ease-in-out infinite}#brainmap .viz.state-adhd .reward{opacity:.6}' +
    '#brainmap .bm-regions{list-style:none;margin:.9rem 0 0;padding:.8rem 0 0;border-top:1px solid var(--line);display:grid;gap:.45rem;font-size:.84rem}' +
    '#brainmap .bm-regions li{display:flex;gap:.55rem;align-items:flex-start;color:var(--ink-soft);line-height:1.45}#brainmap .bm-regions li b{color:var(--ink)}' +
    '#brainmap .bm-regions .n{flex:0 0 auto;width:20px;height:20px;border-radius:50%;color:#fff;font:700 .7rem/20px "IBM Plex Mono",monospace;text-align:center;margin-top:.05rem}' +
    '#brainmap .bm-regions-foot{margin:.7rem 0 0;font-size:.8rem;color:var(--grey);line-height:1.5}' +
    '#brainmap .bm-more{margin-top:1.6rem}#brainmap .bm-more h3{font-size:1.2rem;margin:0 0 .35rem}#brainmap .bm-more>p{color:var(--grey);margin:0 0 .9rem;max-width:70ch}' +
    '#brainmap .bm-more-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}@media(max-width:760px){#brainmap .bm-more-grid{grid-template-columns:1fr}}' +
    '#brainmap .bm-nt{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:1rem 1.1rem;border-top:4px solid var(--c)}' +
    '#brainmap .bm-nt h4{margin:0 0 .4rem;font-size:1rem;display:flex;align-items:center;gap:.45rem}#brainmap .bm-nt h4:before{content:"";width:10px;height:10px;border-radius:50%;background:var(--c)}' +
    '#brainmap .bm-nt p{margin:0;font-size:.88rem;line-height:1.55;color:var(--ink-soft)}' +
'#brainmap .bm-rx{margin-top:1rem;border-top:1px solid var(--line);padding-top:.9rem}#brainmap .bm-rx h4{margin:0 0 .25rem;font-size:1rem}#brainmap .bm-rx>p{margin:0 0 .6rem;font-size:.82rem;color:var(--grey)}' +
    '#brainmap .bm-rx-tabs{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.6rem}#brainmap .bm-rx-tabs button{border:1px solid var(--line);background:var(--surface);color:var(--ink-soft);font:600 .8rem/1.2 inherit;font-family:inherit;padding:.4rem .7rem;border-radius:999px;cursor:pointer}#brainmap .bm-rx-tabs button.on{background:var(--amber);border-color:var(--amber);color:#fff}' +
    '#brainmap .bm-rx-card{background:var(--bg,#faf7f2);border:1px solid var(--line);border-radius:12px;padding:.7rem .85rem;font-size:.86rem;line-height:1.55;color:var(--ink-soft)}#brainmap .bm-rx-card b{color:var(--ink)}#brainmap .bm-rx-card .br{display:block;font-size:.74rem;color:var(--grey);margin-bottom:.3rem}#brainmap .bm-rx-foot{margin:.55rem 0 0;font-size:.74rem;color:var(--grey);font-style:italic}' +
    '#brainmap .viz.state-treated.rx-on .da-path,#brainmap .viz.state-treated.rx-on .ne-path{opacity:.15;transition:opacity .4s,stroke-width .4s}#brainmap .viz.state-treated.rx-da .da-path,#brainmap .viz.state-treated.rx-ne .ne-path{opacity:1;stroke-width:3.5}#brainmap .viz.state-treated.rx-on .sig{opacity:.25}#brainmap .viz.state-treated.rx-da .sig{opacity:1}#brainmap .viz.state-treated.rx-on .attn{opacity:.3}#brainmap .viz.state-treated.rx-ne .attn{opacity:1}#brainmap .viz.state-treated.rx-pfc .pfc-glow{opacity:1;filter:blur(12px)}#brainmap .viz.state-treated.rx-on:not(.rx-pfc) .pfc-glow{opacity:.35}' +
    '#brainmap .bm-rx-more{display:inline-block;margin-top:.5rem;font-weight:700;font-size:.82rem;color:var(--amber);text-decoration:none}#brainmap .bm-rx-more:hover{text-decoration:underline}@keyframes bmflash{0%,60%{box-shadow:0 0 0 3px var(--amber)}100%{box-shadow:0 0 0 3px transparent}}.medcard.bm-flash{animation:bmflash 2.2s ease-out}' +
    '#brainmap .bm-keybar{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem .9rem;background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:.42rem .85rem;margin:0 0 .85rem;font-size:.72rem;line-height:1.3;color:var(--ink-soft)}' +
    '#brainmap .bm-keybar .bm-key-title{font-family:"Bricolage Grotesque",sans-serif;font-weight:700;color:var(--ink);margin-inline-end:.2rem}' +
    '#brainmap .bm-keybar .bm-key-item{display:inline-flex;align-items:center;gap:.32rem;white-space:nowrap}' +
    '#brainmap .bm-keybar .dot{width:10px;height:10px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(0,0,0,.1)}' +
    '#brainmap .bm-keybar .bm-key-note{flex:1 1 100%;font-size:.65rem;color:var(--grey);margin-top:-.15rem}' +
    '@media(max-width:760px){#brainmap .bm-keybar{font-size:.65rem;gap:.4rem .7rem;padding:.35rem .7rem;border-radius:14px}#brainmap .bm-keybar .bm-key-note{font-size:.58rem}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var svg =
    '<svg viewBox="0 0 460 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stylized brain diagram">' +
    '<path class="brain-base" d="M150,70 C110,55 70,80 78,120 C48,128 42,175 72,192 C58,225 92,255 128,246 C138,280 195,288 220,262 C255,285 315,272 322,232 C360,228 378,180 348,158 C372,132 356,88 318,92 C305,58 255,48 228,70 C205,52 172,54 150,70 Z"/>' +
    '<path class="fold" d="M120,110 C150,120 150,150 122,158"/><path class="fold" d="M150,185 C185,190 190,220 158,230"/><path class="fold" d="M250,95 C285,105 285,140 255,150"/><path class="fold" d="M270,185 C305,192 305,222 275,232"/>' +
    '<ellipse class="pfc-glow" cx="112" cy="150" rx="46" ry="52"/>' +
    '<path class="pfc" d="M150,70 C110,55 70,80 78,120 C48,128 42,175 72,192 C64,210 78,232 100,236 C120,210 128,175 126,140 C132,108 128,86 138,74 C142,72 146,71 150,70 Z"/>' +
    '<path class="da-path" d="M258,236 C232,232 206,224 184,214 C160,202 134,186 112,168"/>' +
    '<path class="ne-path" d="M296,256 C322,206 302,120 232,96 C182,82 132,100 106,128"/>' +
    '<path class="acc" d="M146,198 C140,152 164,124 210,118"/>' +
    '<path class="str" d="M192,186 C176,168 180,144 202,136 C224,129 248,136 262,152"/><ellipse class="str-head" cx="194" cy="182" rx="12" ry="14"/>' +
    '<circle class="reward-glow" cx="184" cy="214" r="13" style="opacity:.45"/><circle class="reward" cx="184" cy="214" r="9"/><circle class="reward" cx="258" cy="236" r="10"/>' +
    '<circle class="lc" cx="296" cy="256" r="7"/>' +
    '<g><circle class="sig" cx="246" cy="234" r="6" style="animation-delay:0s"/><circle class="sig drop" cx="226" cy="229" r="6" style="animation-delay:.2s"/><circle class="sig" cx="205" cy="222" r="6" style="animation-delay:.4s"/><circle class="sig drop" cx="163" cy="203" r="6" style="animation-delay:.6s"/><circle class="sig" cx="143" cy="191" r="6" style="animation-delay:.8s"/><circle class="sig drop" cx="124" cy="178" r="6" style="animation-delay:1s"/></g>' +
    '<g><circle class="attn" cx="180" cy="95" r="5" style="--dx:-18px;--dy:-14px"/><circle class="attn" cx="210" cy="82" r="5" style="--dx:22px;--dy:-10px"/><circle class="attn" cx="245" cy="88" r="5" style="--dx:26px;--dy:16px"/><circle class="attn" cx="278" cy="100" r="5" style="--dx:20px;--dy:-18px"/></g>' +
    '<path class="focus-ray" d="M96,150 L30,150"/><path class="focus-ray" d="M40,150 l14,-8 M40,150 l14,8"/>' +
    '<g class="pill-rx" transform="translate(298,286)"><rect x="-12" y="-13" width="72" height="26" rx="13" fill="#e0a144"/><text x="24" y="5" text-anchor="middle" font-family="IBM Plex Mono,Tajawal,monospace" font-size="11.5" font-weight="700" fill="#fff">' + L.pill + '</text></g>' +
    '<g class="num"><circle cx="96" cy="104" r="9" style="fill:var(--accent)"/><text x="96" y="108" text-anchor="middle">1</text></g><g class="num"><circle cx="134" cy="152" r="9" style="fill:#e0457b"/><text x="134" y="156" text-anchor="middle">2</text></g><g class="num"><circle cx="276" cy="148" r="9" style="fill:#7a5cff"/><text x="276" y="152" text-anchor="middle">3</text></g><g class="num"><circle cx="222" cy="250" r="9" style="fill:var(--amber)"/><text x="222" y="254" text-anchor="middle">4</text></g><g class="num"><circle cx="318" cy="248" r="9" style="fill:#2f8f83"/><text x="318" y="252" text-anchor="middle">5</text></g>' +
    '</svg>';

  var RX_HL = ['rx-da rx-ne', 'rx-da rx-ne', 'rx-ne rx-pfc', 'rx-pfc'], rxSel = 0;
  var RX_MED = [['mph', 0], ['amp', 3], ['non', 6], ['non', 8]];
  var REGION_COLORS = ['var(--accent)', '#e0457b', '#7a5cff', 'var(--amber)', '#2f8f83'];
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
    keyHtml +
    '<div class="bm-grid"><div class="bm-stage"><div class="viz state-adhd" id="bmViz">' + svg + '</div>' +
    '<ol class="bm-regions">' + L.regions.map(function (r, i) {
      return '<li><span class="n" style="background:' + REGION_COLORS[i] + '">' + (i + 1) + '</span><span><b>' + r[0] + '</b> — ' + r[1] + '</span></li>';
    }).join('') + '</ol><p class="bm-regions-foot">' + L.regionsFoot + '</p></div>' +
    '<div class="bm-cap viz state-adhd" id="bmCap"></div></div>' +
    '<div class="bm-more"><h3>' + L.moreH + '</h3><p>' + L.moreIntro + '</p><div class="bm-more-grid">' +
    '<div class="bm-nt" style="--c:#c45cff"><h4>' + L.ser + '</h4><p>' + L.serT + '</p></div>' +
    '<div class="bm-nt" style="--c:#ff8fab"><h4>' + L.gab + '</h4><p>' + L.gabT + '</p></div>' +
    '<div class="bm-nt" style="--c:#a8c94a"><h4>' + L.glu + '</h4><p>' + L.gluT + '</p></div>' +
    '</div></div></div></div>';
  anchor.parentNode.insertBefore(sec, anchor);

  function rxHtml() {
    return '<div class="bm-rx"><h4>' + L.rxH + '</h4><p>' + L.rxIntro + '</p><div class="bm-rx-tabs">' +
      L.rx.map(function (m, i) { return '<button type="button" data-rx="' + i + '">' + m[0] + '</button>'; }).join('') +
      '</div><div class="bm-rx-card" aria-live="polite"></div><p class="bm-rx-foot">' + L.rxFoot + '</p></div>';
  }
  function pickRx(i) {
    rxSel = i;
    var m = L.rx[i], card = sec.querySelector('.bm-rx-card');
    if (card) card.innerHTML = '<b>' + m[0] + '</b><span class="br">' + m[1] + '</span>' + m[2] +
      (document.getElementById('medGrid') ? '<a class="bm-rx-more" href="#meds" data-medgo="' + i + '">' + L.rxMore + '</a>' : '');
    [].forEach.call(sec.querySelectorAll('.bm-rx-tabs button'), function (b) {
      var on = +b.getAttribute('data-rx') === i; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
    });
    document.getElementById('bmViz').className = 'viz state-treated rx-on ' + RX_HL[i];
  }
  function goMed(t) {
    var f = document.querySelector('#meds [data-filter="' + t[0] + '"]'); if (f) f.click();
    var c = document.querySelectorAll('#medGrid .medcard')[t[1]] || document.getElementById('meds');
    c.classList.add('in');
    var aim = function () { c.scrollIntoView({ block: 'center' }); };
    aim(); setTimeout(aim, 250); setTimeout(aim, 800);
    c.classList.remove('bm-flash'); setTimeout(function () { c.classList.add('bm-flash'); }, 1100);
  }
  function render(state) {
    if (!L.cap[state]) state = 'adhd';
    document.getElementById('bmViz').className = 'viz state-' + state;
    var c = L.cap[state], cap = document.getElementById('bmCap');
    cap.className = 'bm-cap viz state-' + state;
    cap.innerHTML = '<div class="lbl">' + c.lbl + '</div><h3>' + c.h + '</h3><ul>' +
      c.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') +
      '</ul>' + (state === 'treated' ? rxHtml() : '') + '<div class="bm-note">' + L.note + '</div>';
    if (state === 'treated') pickRx(rxSel);
    var pill = sec.querySelector('.pill-rx'); if (pill) pill.style.opacity = (state === 'treated') ? '1' : '0';
    [].forEach.call(sec.querySelectorAll('.bm-toggle button'), function (b) { b.classList.toggle('on', b.getAttribute('data-s') === state); });
  }
  [].forEach.call(sec.querySelectorAll('.bm-toggle button'), function (b) {
    b.addEventListener('click', function () { render(b.getAttribute('data-s')); });
  });

  document.getElementById('bmCap').addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-rx]'); if (b) pickRx(+b.getAttribute('data-rx'));
    var g = e.target.closest && e.target.closest('[data-medgo]'); if (g) { e.preventDefault(); goMed(RX_MED[+g.getAttribute('data-medgo')]); }
  });

  render('adhd');
})();
