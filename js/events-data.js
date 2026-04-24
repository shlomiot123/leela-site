const EVENTS = [
  {
    id: 'kundalini-weekly',
    title: 'קונדליני יוגה',
    category: 'yoga',
    dates: generateWeeklyDates(3, 52), // Wednesday, 52 weeks
    time: '08:15', endTime: '09:30',
    location: 'אולם היוגה, לילא',
    instructor: 'גל אביב',
    price: 75, capacity: 20,
    image: 'https://static.wixstatic.com/media/38a166_f23633939f6d4e9fa3f51c7f8e15e66e~mv2.jpg',
    color: '#7B9E87',
    description: 'קונדליני יוגה היא טכנולוגיה עתיקה לעבודה על מודעות, גוף ונשמה. בשיעור נשלב נשימות פרניאמה, תנועות גוף, מנטרות ומדיטציה להעצמה ולעיגון. מתאים לכל הרמות.',
    includes: ['תרגול פיזי', 'פרניאמה', 'מנטרה', 'מדיטציה', 'שאבאסאנה'],
    whatToBring: ['מזרן יוגה', 'בגדים נוחים', 'שמיכה קטנה', 'בקבוק מים']
  },
  {
    id: 'hatha-weekly',
    title: 'האת\'ה יוגה',
    category: 'yoga',
    dates: generateWeeklyDates(0, 52, true), // Sunday alternate
    time: '08:15', endTime: '09:30',
    location: 'אולם היוגה, לילא',
    instructor: 'גל אביב',
    price: 75, capacity: 18,
    image: 'https://static.wixstatic.com/media/7ea0d3_cc87072634d64c8e8b9426168dee916d~mv2.jpeg',
    color: '#7B9E87',
    description: 'האת\'ה יוגה קלאסית ושוטפת — עבודה עם תנוחות הגוף (אסאנות), נשימה מודעת וקשב פנימי. שיעור מאוזן שמחבר בין עוצמה לרכות, בין אתגר לנינוחות.',
    includes: ['אסאנות', 'נשימה מודעת', 'מדיטציה', 'שאבאסאנה'],
    whatToBring: ['מזרן יוגה', 'בגדים נוחים', 'בקבוק מים']
  },
  {
    id: 'ashtanga-tue',
    title: 'אשטנגה ויניאסה',
    category: 'yoga',
    dates: generateWeeklyDates(2, 52), // Tuesday
    time: '08:15', endTime: '09:30',
    location: 'אולם היוגה, לילא',
    instructor: 'שי נבנהויז',
    price: 75, capacity: 16,
    image: 'https://static.wixstatic.com/media/7ea0d3_91e893da75b34303bfb49a7db8b3865a~mv2.jpeg',
    color: '#C4A882',
    description: 'אשטנגה ויניאסה — יוגה דינמית ומאתגרת המשלבת תנועה ונשימה בצורה רצופה. הסדרה הקלאסית מחזקת, מגמישה ומנקה את הגוף ואת המוח.',
    includes: ['סדרה קלאסית', 'ויניאסה', 'בנדהות', 'נשימה אוג\'אי'],
    whatToBring: ['מזרן יוגה', 'בגדים צמודים', 'מגבת', 'בקבוק מים']
  },
  {
    id: 'ashtanga-sun-eve',
    title: 'אשטנגה ויניאסה — ערב',
    category: 'yoga',
    dates: generateWeeklyDates(0, 52), // Sunday evening
    time: '20:00', endTime: '21:15',
    location: 'אולם היוגה, לילא',
    instructor: 'בר פרץ',
    price: 75, capacity: 16,
    image: 'https://static.wixstatic.com/media/7ea0d3_7f29dc2fdce3467eb21e2e2e86d29b94~mv2.jpg',
    color: '#C4A882',
    description: 'שיעור ערב אינטנסיבי של אשטנגה ויניאסה עם בר פרץ. שחרור מתחים היום, פתיחת הגוף, וסיום מדיטטיבי לפני השינה.',
    includes: ['סדרה קלאסית', 'ויניאסה', 'בנדהות'],
    whatToBring: ['מזרן יוגה', 'בגדים צמודים', 'בקבוק מים']
  },
  {
    id: 'yin-weekly',
    title: 'יין יוגה',
    category: 'yoga',
    dates: generateWeeklyDates(1, 52), // Monday
    time: '19:30', endTime: '20:45',
    location: 'אולם היוגה, לילא',
    instructor: 'גל אביב',
    price: 75, capacity: 18,
    image: 'https://static.wixstatic.com/media/7ea0d3_29c9666f76514e4db70d233b7c6bf2d5~mv2.jpeg',
    color: '#7B9E87',
    description: 'יין יוגה — תרגול עמוק ואיטי של תנוחות שמחזיקים 3-5 דקות. עבודה על רקמות עמוקות, כיסויים פאשיאליים ואיזון אנרגטי. מושלם להרפיה ולשחרור מתחים.',
    includes: ['תנוחות יין', 'מדיטציה', 'שאבאסאנה'],
    whatToBring: ['מזרן יוגה', 'שמיכה', 'כריות נוחות', 'בגדים נוחים']
  },
  {
    id: 'kala-vinyasa',
    title: 'קלה ויניאסה',
    category: 'yoga',
    dates: generateWeeklyDates(5, 52, true), // Friday alternate
    time: '08:15', endTime: '09:30',
    location: 'אולם היוגה, לילא',
    instructor: 'ניצן זיסקינד',
    price: 75, capacity: 16,
    image: 'https://static.wixstatic.com/media/7ea0d3_c5b1625473304ad2a7300f26cdddcbb2~mv2.png',
    color: '#D4B896',
    description: 'קלה ויניאסה — יוגה יצירתית ושוטפת. כל שיעור הוא מסע ייחודי המשלב תנועה, נשימה ומודעות. גישה שמזמינה את הגוף לשחק ולהתבטא.',
    includes: ['ויניאסה יצירתי', 'תנועה חופשית', 'נשימה', 'מדיטציה'],
    whatToBring: ['מזרן יוגה', 'בגדים נוחים', 'בקבוק מים']
  },
  {
    id: 'sound-healing-monthly',
    title: 'ריפוי בצלילים — ירח מלא',
    category: 'culture',
    dates: generateMonthlyDates(52),
    time: '20:00', endTime: '22:00',
    location: 'אולם לילא, עם נגישות לטבע',
    instructor: 'גל אביב',
    price: 120, capacity: 25,
    image: 'https://static.wixstatic.com/media/7ea0d3_8651490c42e0417dbb9ea8d050f66aef~mv2.jpg',
    color: '#8B7B8B',
    description: 'טקס ריפוי בצלילים לכבוד הירח המלא. קערות טיבטיות, גונג, ותופים שאמניים יוצרים אמבט ויברציוני שמשחרר מתחים, מנקה את שדה האנרגיה ופותח את הלב.',
    includes: ['מדיטציה מונחית', 'ריפוי בצלילים', 'קערות טיבטיות', 'גונג'],
    whatToBring: ['שמיכה', 'כרית', 'בגדים נוחים', 'פתיחות לחוויה']
  },
  {
    id: 'botanical-painting',
    title: 'ציור בוטני — יצירה ומדיטציה',
    category: 'culture',
    dates: generateBiweeklyDates(52),
    time: '18:00', endTime: '21:00',
    location: 'אולם היצירה, לילא',
    instructor: '',
    price: 150, capacity: 12,
    image: 'https://static.wixstatic.com/media/38a166_8aad6126b20a43518b2eac3ebce94a28~mv2.jpg',
    color: '#9EBB9E',
    description: 'ערב של ציור בוטני מדיטטיבי. נצייר צמחים ופרחים בטכניקות מיוחדות, תוך שאנו מתחברים לטבע ולנשמה הפנימית. כלים ועוגות סיפקתם — אנחנו מביאים את השראה.',
    includes: ['חומרי ציור', 'הדרכה מקצועית', 'תה ועוגיות', 'הדפס לכל משתתף'],
    whatToBring: ['סינר', 'יצירתיות', 'לב פתוח']
  },
  {
    id: 'question-to-air',
    title: 'שאלה לאוויר — מרחב התפתחותי',
    category: 'workshop',
    dates: ['2025-09-09', '2025-09-10'],
    time: '10:00', endTime: '18:00',
    location: 'לילא — אולם, מרפסת וטבע',
    instructor: 'רחל מדמוני',
    price: 680, capacity: 20,
    image: 'https://static.wixstatic.com/media/38a166_2f9a648a4008427985a166142638d8fd~mv2.jpg',
    color: '#B8A0C8',
    description: 'סוף שבוע מרחב התפתחותי עם מנחה רחל מדמוני. שאלה לאוויר הוא מסע פנימי המשלב פסיכולוגיה עומק, תנועה, כתיבה ושיתוף. מרחב לחקירה, פגישה עם עצמך ועם אחרים.',
    includes: ['2 ימי עיון', 'ארוחות צהריים', 'חומרי עבודה', 'ליווי אישי'],
    whatToBring: ['פנקס ועט', 'בגדים נוחים', 'מזרן שינה לאופציה לינה']
  },
  {
    id: 'shifting-magic-vibes',
    title: 'Shifting by Magic Vibes — ריקוד סיום קיץ',
    category: 'special',
    dates: ['2025-08-28'],
    time: '20:00', endTime: '00:00',
    location: 'לילא — מרפסת ואולם',
    instructor: 'Magic Vibes DJs',
    price: 90, capacity: 60,
    image: 'https://static.wixstatic.com/media/7ea0d3_fa94732217804aebb374ef1eac3ce11a~mv2.jpeg',
    color: '#D4A882',
    description: 'ערב ריקודים מיוחד לסיום הקיץ. DJ \'s Magic Vibes מביאים סטים של מוזיקה אלקטרונית, world music ו-ecstatic dance. מרפסת פתוחה, אווירה מיוחדת, קהילה אוהבת.',
    includes: ['ערב ריקוד מלא', 'מוזיקה חיה', 'שתיה קלה'],
    whatToBring: ['נעליים נוחות לריקוד', 'מים', 'אנרגיה טובה']
  },
  {
    id: 'pop-art',
    title: 'פופ ארט — מראת צעצועים',
    category: 'culture',
    dates: ['2025-08-26'],
    time: '17:00', endTime: '20:00',
    location: 'גלריית לילא',
    instructor: '',
    price: 60, capacity: 40,
    image: 'https://static.wixstatic.com/media/38a166_30cf096aa5cf4180a2c3c27f84aacd9f~mv2.png',
    color: '#E8B4B8',
    description: 'תערוכת פופ ארט ייחודית — צעצועים כמראה לתרבות ולנשמה. האמן מציג עולם צבעוני ורב-שכבתי שמזמין אותנו לחשוב מחדש על ילדות, משחק ויצירה.',
    includes: ['כניסה לתערוכה', 'פגישה עם האמן', 'כיבוד קל'],
    whatToBring: ['סקרנות', 'מצלמה']
  },
  {
    id: 'braiding-academy',
    title: 'האקדמיה לקליעת צמות',
    category: 'culture',
    dates: ['2025-08-10', '2025-09-14', '2025-10-12', '2025-11-09', '2025-12-14'],
    time: '11:00', endTime: '14:00',
    location: 'אולם היצירה, לילא',
    instructor: '',
    price: 120, capacity: 15,
    image: 'https://static.wixstatic.com/media/7ea0d3_5b7b39442ebf406695d488c71f47dc1d~mv2.jpeg',
    color: '#C4A882',
    description: 'סדנת קליעת צמות — אמנות עתיקה ומרגיעה. נלמד טכניקות קליעה שונות, נגלה את המדיטטיביות שבתהליך ויוצא עם יצירה יפה. מתאים לכל הגילאים.',
    includes: ['חומרים', 'הדרכה', 'תה ועוגיות'],
    whatToBring: ['אורח טוב', 'סבלנות']
  },
  {
    id: 'leela-party-night',
    title: 'Leela Party Night — מסיבת טו ב\'אב',
    category: 'special',
    dates: ['2025-08-08'],
    time: '20:00', endTime: '01:00',
    location: 'לילא — מרפסת ואולם',
    instructor: '',
    price: 80, capacity: 80,
    image: 'https://static.wixstatic.com/media/7ea0d3_fc62b8bb566e4cfe86070bbccc6af6b4~mv2.jpg',
    color: '#AD6E7E',
    description: 'לילה של אהבה ואנרגיה לכבוד טו ב\'אב. מוזיקה, ריקוד, קהילה וטבע. ערב מיוחד שמחבר בין חג האהבה העברי לרוח החיה של לילא.',
    includes: ['ערב ריקוד', 'מוזיקה', 'שתיה קלה', 'הפתעות'],
    whatToBring: ['אהבה', 'אנרגיה', 'חברים']
  },
  {
    id: 'breathwork-ice',
    title: 'נשימה וטבילה בקרח',
    category: 'workshop',
    dates: ['2025-09-27', '2025-10-25', '2025-11-29', '2026-01-31'],
    time: '08:00', endTime: '12:00',
    location: 'לילא — מרפסת וחוץ',
    instructor: '',
    price: 220, capacity: 20,
    image: 'https://static.wixstatic.com/media/7ea0d3_9449c42231d24aa9b9cacf305281e502~mv2.jpeg',
    color: '#6B9EBB',
    description: 'חוויה טרנספורמטיבית של עבודת נשימה (breathing techniques) וטבילה בקרח. שיטת ווים הוף ונשימות טולמו מכינות את הגוף לחוויה עוצמתית של נוכחות וחוסן.',
    includes: ['הכנה ותיאוריה', 'עבודת נשימה', 'טבילת קרח', 'שיחת שילוב'],
    whatToBring: ['בגד ים', 'מגבת', 'שמיכה חמה', 'נעלי הליכה']
  },
  {
    id: 'holistic-management',
    title: 'ניהול הוליסטי — סדנת יום',
    category: 'workshop',
    dates: generateMonthlyDates(12, 6), // Every 2 months, 6 times
    time: '09:00', endTime: '17:00',
    location: 'אולם לילא',
    instructor: '',
    price: 450, capacity: 18,
    image: 'https://static.wixstatic.com/media/38a166_9be83d8268954f2bbcd54f5edaa1759c~mv2.jpg',
    color: '#9E9E7B',
    description: 'יום עיון בניהול הוליסטי — שילוב חוכמת הגוף, האינטואיציה ומנהיגות מודעת. לאנשי מקצוע, מנהלים ויזמים המחפשים גישה אחרת לעבודה ולחיים.',
    includes: ['ארוחת צהריים', 'חומרי עבודה', 'מדיטציות', 'כלים מעשיים'],
    whatToBring: ['פנקס', 'פתיחות', 'שאלות']
  }
];

// Helper: generate weekly dates for next N weeks starting from today
function generateWeeklyDates(dayOfWeek, count, alternate = false) {
  const dates = [];
  const today = new Date();
  let d = new Date(today);
  // Find next occurrence of dayOfWeek (0=Sun, 1=Mon...)
  while (d.getDay() !== dayOfWeek) d.setDate(d.getDate() + 1);
  let skip = false;
  for (let i = 0; i < count; i++) {
    if (!alternate || !skip) {
      dates.push(d.toISOString().split('T')[0]);
    }
    skip = !skip;
    d = new Date(d);
    d.setDate(d.getDate() + 7);
  }
  return dates;
}

function generateMonthlyDates(count, step = 1) {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setMonth(d.getMonth() + i * step);
    // Set to nearest Friday evening (or 15th of month for generic)
    d.setDate(15);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

function generateBiweeklyDates(count) {
  const dates = [];
  const today = new Date();
  let d = new Date(today);
  while (d.getDay() !== 3) d.setDate(d.getDate() + 1); // Wednesday
  for (let i = 0; i < count; i += 2) {
    dates.push(d.toISOString().split('T')[0]);
    d = new Date(d);
    d.setDate(d.getDate() + 14);
  }
  return dates;
}

// Flatten events: one entry per date
function getAllEventInstances() {
  const instances = [];
  EVENTS.forEach(ev => {
    const dates = ev.dates || [];
    dates.forEach(date => {
      instances.push({ ...ev, date, id: `${ev.id}-${date}`, baseId: ev.id });
    });
  });
  return instances.sort((a, b) => a.date.localeCompare(b.date));
}

// Get events for a specific date
function getEventsForDate(dateStr) {
  return getAllEventInstances().filter(e => e.date === dateStr);
}

// Get upcoming events from today
function getUpcomingEvents(limit = 10) {
  const today = new Date().toISOString().split('T')[0];
  return getAllEventInstances().filter(e => e.date >= today).slice(0, limit);
}

// Get event by baseId (for event detail page)
function getEventById(id) {
  return EVENTS.find(e => e.id === id);
}

// Category labels in Hebrew
const CATEGORY_LABELS = {
  yoga: 'יוגה',
  culture: 'תרבות ותוכן',
  workshop: 'סדנה',
  special: 'אירוע מיוחד'
};

const CATEGORY_COLORS = {
  yoga: '#7B9E87',
  culture: '#C4A882',
  workshop: '#B8A0C8',
  special: '#D4A882'
};

if (typeof module !== 'undefined') module.exports = { EVENTS, getAllEventInstances, getEventsForDate, getUpcomingEvents, getEventById, CATEGORY_LABELS, CATEGORY_COLORS };
