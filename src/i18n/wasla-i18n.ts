/**
 * Wasla 8-Language Localization Engine
 * Base approved interface: Egyptian Arabic (`ar`, RTL)
 * + US English (`en`), Mainland Simplified Chinese (`zh`), German (`de`),
 *   Russian (`ru`), French (`fr`), Turkish (`tr`), Spanish (`es`)
 */
import { SecureStore } from '../security/shield';

export type LangCode = 'ar' | 'en' | 'zh' | 'de' | 'ru' | 'fr' | 'tr' | 'es';

export interface LangMeta {
  code: LangCode;
  dir: 'rtl' | 'ltr';
  nativeName: string;
  regionLabel: string;
  badge: string;
  fbCode: string;
  speechLang: string;
  timeLocale: string;
  photoUrl: string;
  speakersBadge: string;
  cultureTitle: string;
  cultureSub: string;
  sampleGreeting: string;
}

export const LANGS: LangMeta[] = [
  {
    code: 'ar',
    dir: 'rtl',
    nativeName: 'العربية',
    regionLabel: 'المصرية · الافتراضية',
    badge: 'AR',
    fbCode: 'ar',
    speechLang: 'ar-EG',
    timeLocale: 'ar-EG',
    photoUrl: 'https://images.unsplash.com/photo-1713239060784-e6ed820a0715?auto=format&fit=crop&w=960&h=560&crop=focalpoint&fp-x=0.5&fp-y=0.58&fp-z=1.0&q=88',
    speakersBadge: '+420M',
    cultureTitle: 'مكة المكرمة والعالم العربي · الكعبة المشرفة',
    cultureSub: 'رحاب المسجد الحرام، الروابط الإسلامية الأصيلة، والشهامة العربية والحرف الموثوقة في كل مدينة.',
    sampleGreeting: 'أهلاً بيك في وصلة — الصنعة والخدمة في منطقتك'
  },
  {
    code: 'en',
    dir: 'ltr',
    nativeName: 'English',
    regionLabel: 'English (US)',
    badge: 'US',
    fbCode: 'en',
    speechLang: 'en-US',
    timeLocale: 'en-US',
    photoUrl: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=760&q=80',
    speakersBadge: '+1.5B',
    cultureTitle: 'United States · Skyline & Modern Innovation',
    cultureSub: 'Fast-paced metropolitan culture, global communication, and modern digital craftsmanship.',
    sampleGreeting: 'Welcome to Wasla — trusted local pros right in your neighborhood'
  },
  {
    code: 'zh',
    dir: 'ltr',
    nativeName: '中文',
    regionLabel: '简体中文 · 中国',
    badge: '中',
    fbCode: 'zh-CN',
    speechLang: 'zh-CN',
    timeLocale: 'zh-CN',
    photoUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=760&q=80',
    speakersBadge: '+1.4B',
    cultureTitle: '中国文化 · 万里长城与现代都市匠心',
    cultureSub: '千年中华文明、精益求精的工匠精神与高效的智慧城市生活服务。',
    sampleGreeting: '欢迎来到 Wasla — 您身边的本地专业工匠与生活服务'
  },
  {
    code: 'de',
    dir: 'ltr',
    nativeName: 'Deutsch',
    regionLabel: 'Deutsch · DACH',
    badge: 'DE',
    fbCode: 'de',
    speechLang: 'de-DE',
    timeLocale: 'de-DE',
    photoUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=760&q=80',
    speakersBadge: '+135M',
    cultureTitle: 'Deutschland · Meisterhandwerk & Architektur',
    cultureSub: 'Berliner Wahrzeichen, deutsche Ingenieurskunst und traditionsreiche Handwerksqualität.',
    sampleGreeting: 'Willkommen bei Wasla — zuverlässige Handwerker & Profis in Ihrer Nähe'
  },
  {
    code: 'ru',
    dir: 'ltr',
    nativeName: 'Русский',
    regionLabel: 'Русский · Евразия',
    badge: 'RU',
    fbCode: 'ru',
    speechLang: 'ru-RU',
    timeLocale: 'ru-RU',
    photoUrl: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=760&q=80',
    speakersBadge: '+260M',
    cultureTitle: 'Русская культура · Архитектура и гостеприимство',
    cultureSub: 'Классическое наследие, широкая география общения и надёжные мастера своего дела.',
    sampleGreeting: 'Добро пожаловать в Wasla — проверенные мастера и услуги рядом с вами'
  },
  {
    code: 'fr',
    dir: 'ltr',
    nativeName: 'Français',
    regionLabel: 'Français · Monde',
    badge: 'FR',
    fbCode: 'fr',
    speechLang: 'fr-FR',
    timeLocale: 'fr-FR',
    photoUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=760&q=80',
    speakersBadge: '+320M',
    cultureTitle: 'Culture Française · Art de vivre & Savoir-faire',
    cultureSub: 'Patrimoine parisien, élégance architecturale et tradition des métiers d’art et de proximité.',
    sampleGreeting: 'Bienvenue sur Wasla — l’artisanat et les services de confiance près de chez vous'
  },
  {
    code: 'tr',
    dir: 'ltr',
    nativeName: 'Türkçe',
    regionLabel: 'Türkçe · Türkiye',
    badge: 'TR',
    fbCode: 'tr',
    speechLang: 'tr-TR',
    timeLocale: 'tr-TR',
    photoUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=760&q=80',
    speakersBadge: '+90M',
    cultureTitle: 'Türk Kültürü · Boğaziçi ve Esnaf Geleneği',
    cultureSub: 'İstanbul Boğazı, köklü ahilik ve ustalık kültürü, sıcak komşuluk ve güvenilir hizmet.',
    sampleGreeting: 'Wasla’ya hoş geldiniz — mahallenizdeki güvenilir ustalar ve hizmetler'
  },
  {
    code: 'es',
    dir: 'ltr',
    nativeName: 'Español',
    regionLabel: 'Español · Global',
    badge: 'ES',
    fbCode: 'es',
    speechLang: 'es-ES',
    timeLocale: 'es-ES',
    photoUrl: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=760&q=80',
    speakersBadge: '+590M',
    cultureTitle: 'Cultura Hispana · Plazas Históricas y Comunidad',
    cultureSub: 'Calidez humana, arquitectura vibrante y una comunidad global de oficios y profesionales.',
    sampleGreeting: 'Bienvenido a Wasla — profesionales y oficios de confianza en tu zona'
  }
];

const LANG_KEY = 'wasla_lang_v1';

export function isValidLang(v: any): v is LangCode {
  return LANGS.some(l => l.code === v);
}

let _curLang: LangCode = (() => {
  try {
    const saved = SecureStore.get(LANG_KEY) || localStorage.getItem(LANG_KEY) || 'ar';
    return isValidLang(saved) ? saved : 'ar';
  } catch {
    return 'ar';
  }
})();

export function curLang(): LangCode {
  return _curLang;
}

export function getLangMeta(code: LangCode = _curLang): LangMeta {
  return LANGS.find(l => l.code === code) || LANGS[0];
}

export function setStoredLang(code: LangCode): void {
  if (!isValidLang(code)) return;
  _curLang = code;
  try {
    SecureStore.set(LANG_KEY, code);
    localStorage.setItem(LANG_KEY, code);
  } catch {}
}

export function applyDocDirection(code: LangCode = _curLang): void {
  const meta = getLangMeta(code);
  if (typeof document !== 'undefined') {
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
    document.body.dataset.lang = meta.code;
    document.body.classList.toggle('is-ltr', meta.dir === 'ltr');
    document.body.classList.toggle('is-rtl', meta.dir === 'rtl');
  }
}

/* ====== View Names & Nav Aliases ====== */
export const VIEW_LABELS: Record<LangCode, Record<string, string>> = {
  ar: {
    'الرئيسية': 'الرئيسية',
    'طلبات قريبة': 'طلبات قريبة',
    'طلباتي': 'طلباتي',
    'مقدمو الخدمة': 'مقدمو الخدمة',
    'الرسائل': 'الرسائل',
    'المحفوظات': 'المحفوظات',
    'الإشعارات': 'الإشعارات',
    'اللغة': 'اللغة',
    'حسابي': 'حسابي',
    'المزيد': 'المزيد',
    'بحث': 'بحث',
    'طلب جديد': 'طلب جديد',
    'محادثة': 'محادثة',
    'ملف مقدم الخدمة': 'الصفحة الشخصية'
  },
  en: {
    'الرئيسية': 'Home',
    'طلبات قريبة': 'Nearby',
    'طلباتي': 'My Requests',
    'مقدمو الخدمة': 'Pros',
    'الرسائل': 'Messages',
    'المحفوظات': 'Saved',
    'الإشعارات': 'Alerts',
    'اللغة': 'Language',
    'حسابي': 'Account',
    'المزيد': 'More',
    'بحث': 'Search',
    'طلب جديد': 'New Request',
    'محادثة': 'Chat',
    'ملف مقدم الخدمة': 'Profile'
  },
  zh: {
    'الرئيسية': '首页',
    'طلبات قريبة': '附近需求',
    'طلباتي': '我的需求',
    'مقدمو الخدمة': '服务商',
    'الرسائل': '消息',
    'المحفوظات': '已收藏',
    'الإشعارات': '通知',
    'اللغة': '语言与文化',
    'حسابي': '我的账户',
    'المزيد': '更多',
    'بحث': '搜索',
    'طلب جديد': '发布需求',
    'محادثة': '聊天',
    'ملف مقدم الخدمة': '个人主页'
  },
  de: {
    'الرئيسية': 'Start',
    'طلبات قريبة': 'In der Nähe',
    'طلباتي': 'Anfragen',
    'مقدمو الخدمة': 'Anbieter',
    'الرسائل': 'Nachrichten',
    'المحفوظات': 'Gespeichert',
    'الإشعارات': 'Meldungen',
    'اللغة': 'Sprache',
    'حسابي': 'Mein Konto',
    'المزيد': 'Mehr',
    'بحث': 'Suche',
    'طلب جديد': 'Neue Anfrage',
    'محادثة': 'Chat',
    'ملف مقدم الخدمة': 'Profil'
  },
  ru: {
    'الرئيسية': 'Главная',
    'طلبات قريبة': 'Рядом',
    'طلباتي': 'Мои заказы',
    'مقدمو الخدمة': 'Мастера',
    'الرسائل': 'Сообщения',
    'المحفوظات': 'Сохранённое',
    'الإشعارات': 'Уведомления',
    'اللغة': 'Язык',
    'حسابي': 'Аккаунт',
    'المزيد': 'Ещё',
    'بحث': 'Поиск',
    'طلب جديد': 'Новый заказ',
    'محادثة': 'Чат',
    'ملف مقدم الخدمة': 'Профиль'
  },
  fr: {
    'الرئيسية': 'Accueil',
    'طلبات قريبة': 'À proximité',
    'طلباتي': 'Mes demandes',
    'مقدمو الخدمة': 'Prestataires',
    'الرسائل': 'Messages',
    'المحفوظات': 'Enregistrés',
    'الإشعارات': 'Alertes',
    'اللغة': 'Langue',
    'حسابي': 'Mon compte',
    'المزيد': 'Plus',
    'بحث': 'Recherche',
    'طلب جديد': 'Nouvelle demande',
    'محادثة': 'Discussion',
    'ملف مقدم الخدمة': 'Profil'
  },
  tr: {
    'الرئيسية': 'Ana Sayfa',
    'طلبات قريبة': 'Yakındakiler',
    'طلباتي': 'Taleplerim',
    'مقدمو الخدمة': 'Ustalar',
    'الرسائل': 'Mesajlar',
    'المحفوظات': 'Kaydedilenler',
    'الإشعارات': 'Bildirimler',
    'اللغة': 'Dil',
    'حسابي': 'Hesabım',
    'المزيد': 'Diğer',
    'بحث': 'Ara',
    'طلب جديد': 'Yeni Talep',
    'محادثة': 'Sohbet',
    'ملف مقدم الخدمة': 'Profil'
  },
  es: {
    'الرئيسية': 'Inicio',
    'طلبات قريبة': 'Cerca de mí',
    'طلباتي': 'Mis pedidos',
    'مقدمو الخدمة': 'Profesionales',
    'الرسائل': 'Mensajes',
    'المحفوظات': 'Guardados',
    'الإشعارات': 'Alertas',
    'اللغة': 'Idioma',
    'حسابي': 'Mi cuenta',
    'المزيد': 'Más',
    'بحث': 'Buscar',
    'طلب جديد': 'Nuevo pedido',
    'محادثة': 'Chat',
    'ملف مقدم الخدمة': 'Perfil'
  }
};

export function tView(viewKey: string, code: LangCode = _curLang): string {
  return (VIEW_LABELS[code] && VIEW_LABELS[code][viewKey]) || VIEW_LABELS.ar[viewKey] || viewKey;
}

/* ====== Categories & Subcategories ====== */
export const CAT_NAMES: Record<LangCode, string[]> = {
  ar: ['نقل وعفش وشحن', 'صيانة وصنايعية', 'دروس وتعليم', 'بيع وشرا ومستعمل', 'شركات وخدمات متنوعة', 'تجارة وتوريد جملة'],
  en: ['Moving & Delivery', 'Home Repair & Trades', 'Tutoring & Classes', 'Buy, Sell & Used', 'Local Services & Teams', 'Wholesale & Supply'],
  zh: ['搬家货运与跑腿', '维修技工与安装', '家教辅导与培训', '二手买卖与数码', '生活服务与外包', '批发供货与采购'],
  de: ['Umzug & Transport', 'Handwerk & Reparatur', 'Nachhilfe & Kurse', 'Kaufen & Gebraucht', 'Haushalt & Services', 'Großhandel & Bedarf'],
  ru: ['Перевозки и грузы', 'Ремонт и мастера', 'Учёба и репетиторы', 'Б/У и покупки', 'Бытовые услуги', 'Опт и поставки'],
  fr: ['Déménagement & Livraison', 'Dépannage & Artisans', 'Cours & Soutien', 'Achat, Vente & Occasion', 'Services & Entreprises', 'Commerce & Gros'],
  tr: ['Nakliye ve Kargo', 'Tamir ve Ustalar', 'Özel Ders ve Eğitim', 'Alım Satım & İkinci El', 'Çeşitli Hizmetler', 'Toptan Tedarik'],
  es: ['Mudanzas y Fletes', 'Reparaciones y Oficios', 'Clases y Tutorías', 'Compra, Venta y Usado', 'Servicios y Empresas', 'Comercio y Mayoreo']
};

export const SUB_NAMES: Record<LangCode, string[][]> = {
  ar: [
    ['نقل عفش شقة', 'ربع نقل وبضائع', 'شحن محافظات', 'ونش رفع عفش', 'سحب وإنقاذ عربيات', 'توصيل ومشاوير خاصة'],
    ['سباكة', 'كهرباء', 'نجارة', 'نقاشة ودهانات', 'تكييف وتبريد', 'تصليح أجهزة منزلية', 'ألوميتال وحدادة', 'سيراميك ومحارة وجبس', 'كاميرات مراقبة وإنتركوم', 'فلاتر مياه وسخانات', 'ميكانيكا وكهرباء سيارات'],
    ['دروس خصوصية', 'تأسيس أطفال', 'لغات وكورسات', 'برمجة وكمبيوتر', 'تحفيظ قرآن', 'تدريب ومهارات'],
    ['موبايلات وإلكترونيات', 'أجهزة كهربائية', 'عفش مستعمل', 'عربيات وموتوسيكلات', 'هدوم ومستلزمات', 'معدات وعدد'],
    ['نظافة شقق ومنازل', 'تشطيب وديكور', 'تمريض ورعاية منزلية', 'طبخ وحلويات بيتي', 'تصوير ومونتاج وتصميم', 'خياطة وتفصيل', 'أمن وحراسة', 'تخليص أوراق ومحاسبة'],
    ['مواد غذائية جملة', 'مستلزمات محلات', 'مواد بناء وتشطيب', 'ملابس ومنسوجات جملة', 'توريد وتجهيز عام']
  ],
  en: [
    ['Apartment Moving', 'Pickup Truck & Cargo', 'Intercity Shipping', 'Furniture Hoist Crane', 'Towing & Roadside Help', 'Courier & Errands'],
    ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'HVAC & AC Service', 'Appliance Repair', 'Aluminum & Welding', 'Tile, Plaster & Drywall', 'CCTV & Intercoms', 'Water Filters & Heaters', 'Auto Mechanic & Electrics'],
    ['Private Tutoring', 'Early Learning', 'Languages & Courses', 'Coding & IT', 'Quran Memorization', 'Skills Coaching'],
    ['Phones & Electronics', 'Home Appliances', 'Used Furniture', 'Cars & Motorcycles', 'Apparel & Gear', 'Tools & Hardware'],
    ['Home Cleaning', 'Finishing & Interior', 'Home Nursing & Care', 'Home Cooking & Baking', 'Photo, Video & Design', 'Tailoring & Alterations', 'Security Guards', 'Paperwork & Accounting'],
    ['Bulk Groceries', 'Shop Supplies', 'Building Materials', 'Wholesale Apparel', 'General B2B Supply']
  ],
  zh: [
    ['家庭整屋搬家', '小货车拉货', '跨省市物流配送', '高空吊装搬运', '道路救援拖车', '同城急送代办'],
    ['管道疏通水工', '电路电工维修', '木工家具修补', '墙面粉刷油漆', '空调制冷拆洗', '家电上门维修', '门窗铝艺焊工', '贴砖刮腻子吊顶', '监控安防对讲', '净水器热水器', '汽车机修电路'],
    ['上门一对一家教', '少儿基础启蒙', '外语口语课程', '编程电脑培训', '经典诵读辅导', '技能专项训练'],
    ['手机数码产品', '二手家用电器', '二手家具', '汽车与摩托车', '服饰日用百货', '五金工具设备'],
    ['居家保洁深度洗', '室内装修装饰', '居家护理陪护', '私房烘焙家常菜', '摄影剪辑平面设计', '裁缝改衣定制', '安保值守服务', '代办证照与会计'],
    ['粮油副食批发', '商铺耗材配套', '建材装修主材', '服装纺织批货', '综合企采供货']
  ],
  de: [
    ['Wohnungsumzug', 'Transporter & Fracht', 'Fernversand', 'Möbellift', 'Pannenhilfe & Abschleppen', 'Kurier & Botengänge'],
    ['Sanitär & Klempner', 'Elektrik', 'Tischlerei', 'Malerarbeiten', 'Klima & Kühlung', 'Haushaltsgeräte', 'Metall & Alu-Bau', 'Fliesen & Trockenbau', 'Kameras & Gegensprechanlage', 'Wasserfilter & Boiler', 'KFZ-Mechanik & Elektrik'],
    ['Privatunterricht', 'Grundschul-Förderung', 'Sprachen & Kurse', 'Programmieren & IT', 'Koran-Unterricht', 'Praxis-Coaching'],
    ['Handys & Elektronik', 'Elektrogeräte', 'Gebrauchte Möbel', 'Autos & Motorräder', 'Kleidung & Bedarf', 'Werkzeug & Maschinen'],
    ['Wohnungsreinigung', 'Innenausbau & Deko', 'Häusliche Pflege', 'Hausgemachtes & Gebäck', 'Foto, Video & Design', 'Schneiderei', 'Sicherheitsdienst', 'Behördengänge & Buchhaltung'],
    ['Lebensmittel-Großhandel', 'Ladenbedarf', 'Baustoffe', 'Textil-Großhandel', 'Allgemeine Belieferung']
  ],
  ru: [
    ['Квартирный переезд', 'Грузовая газель', 'Междугородняя доставка', 'Грузовой подъёмник', 'Эвакуатор на дороге', 'Курьер и поручения'],
    ['Сантехника', 'Электрика', 'Столяр и плотник', 'Малярные работы', 'Кондиционеры', 'Ремонт техники', 'Окна и сварка', 'Плитка и гипсокартон', 'Видеонаблюдение и домофон', 'Фильтры и бойлеры', 'Автомеханик и автоэлектрик'],
    ['Частные уроки', 'Подготовка детей', 'Языки и курсы', 'IT и программирование', 'Чтение Корана', 'Навыки и тренинги'],
    ['Телефоны и гаджеты', 'Бытовая техника', 'Мебель Б/У', 'Авто и мото', 'Одежда и вещи', 'Инструменты'],
    ['Уборка квартир', 'Отделка и декор', 'Медсестра и уход на дому', 'Домашняя кухня и торты', 'Фото, видео и дизайн', 'Пошив и ремонт одежды', 'Охрана объектов', 'Документы и бухгалтерия'],
    ['Продукты оптом', 'Товары для магазинов', 'Стройматериалы', 'Одежда и ткани оптом', 'Общие поставки']
  ],
  fr: [
    ['Déménagement', 'Utilitaire & Marchandises', 'Transport inter-villes', 'Monte-meubles', 'Dépannage & Remorquage', 'Coursier & Courses'],
    ['Plomberie', 'Électricité', 'Menuiserie', 'Peinture & Enduit', 'Climatisation', 'Électroménager', 'Aluminium & Soudure', 'Carrelage & Plâtre', 'Caméras & Interphone', 'Filtres & Chauffe-eau', 'Mécanique auto'],
    ['Cours particuliers', 'Éveil scolaire', 'Langues & Cours', 'Code & Informatique', 'Mémorisation du Coran', 'Coaching & Compétences'],
    ['Mobiles & Électronique', 'Appareils ménagers', 'Meubles d’occasion', 'Voitures & Motos', 'Vêtements & Accessoires', 'Outils & Matériel'],
    ['Ménage à domicile', 'Finition & Déco', 'Soins infirmiers', 'Cuisine & Pâtisserie maison', 'Photo, Montage & Design', 'Couture & Retouches', 'Sécurité & Gardiennage', 'Papiers & Comptabilité'],
    ['Alimentaire en gros', 'Fournitures commerces', 'Matériaux de construction', 'Textile en gros', 'Approvisionnement général']
  ],
  tr: [
    ['Evden Eve Nakliyat', 'Kamyonet & Yük', 'Şehirlerarası Kargo', 'Asansörlü Taşıma', 'Oto Çekici & Kurtarma', 'Özel Kurye'],
    ['Sıhhi Tesisat', 'Elektrik', 'Marangozluk', 'Boya & Badana', 'Klima & Soğutma', 'Beyaz Eşya Tamiri', 'Alüminyum & Demir', 'Fayans & Alçıpan', 'Kamera & Diyafon', 'Su Arıtma & Şofben', 'Oto Mekanik & Elektrik'],
    ['Özel Ders', 'İlköğretim Takviye', 'Dil & Kurslar', 'Yazılım & Bilgisayar', 'Kuran Eğitimi', 'Beceri Geliştirme'],
    ['Telefon & Elektronik', 'Elektrikli Ev Aletleri', 'İkinci El Eşya', 'Araba & Motosiklet', 'Giyim & Aksesuar', 'El Aletleri'],
    ['Ev & Ofis Temizliği', 'Tadilat & Dekorasyon', 'Evde Bakım & Hemşire', 'Ev Yemekleri & Pasta', 'Fotoğraf, Video & Tasarım', 'Terzi & Tadilat', 'Güvenlik Hizmeti', 'Evrak & Muhasebe'],
    ['Toptan Gıda', 'Esnaf Malzemeleri', 'İnşaat Malzemeleri', 'Toptan Giyim', 'Genel Tedarik']
  ],
  es: [
    ['Mudanza de hogar', 'Flete y camioneta', 'Envíos nacionales', 'Grúa elevadora', 'Grúa vehicular', 'Mensajería y mandados'],
    ['Plomería', 'Electricidad', 'Carpintería', 'Pintura', 'Aire acondicionado', 'Electrodomésticos', 'Aluminio y herrería', 'Pisos y tablaroca', 'Cámaras e interfon', 'Filtros y calentadores', 'Mecánica automotriz'],
    ['Clases particulares', 'Apoyo infantil', 'Idiomas y cursos', 'Programación y PC', 'Enseñanza del Corán', 'Talleres y habilidades'],
    ['Celulares y electrónica', 'Electrodomésticos', 'Muebles usados', 'Autos y motos', 'Ropa y artículos', 'Herramientas'],
    ['Limpieza de hogares', 'Acabados y diseño', 'Enfermería y cuidado', 'Comida y repostería casera', 'Foto, video y diseño', 'Costura y ajustes', 'Seguridad privada', 'Trámites y contabilidad'],
    ['Abarrotes por mayoreo', 'Insumos para tienda', 'Materiales de obra', 'Ropa textil mayoreo', 'Abasto general']
  ]
};

export function tCat(idx: number, code: LangCode = _curLang): string {
  const arr = CAT_NAMES[code] || CAT_NAMES.ar;
  return arr[idx] || CAT_NAMES.ar[idx] || '';
}

export function tSub(catIdx: number, subVal: string, code: LangCode = _curLang): string {
  if (!subVal) return '';
  if (code === 'ar') return subVal;
  const arList = SUB_NAMES.ar[catIdx] || [];
  const idx = arList.indexOf(subVal);
  if (idx >= 0 && SUB_NAMES[code]?.[catIdx]?.[idx]) return SUB_NAMES[code][catIdx][idx];
  for (let c = 0; c < SUB_NAMES.ar.length; c++) {
    const j = SUB_NAMES.ar[c].indexOf(subVal);
    if (j >= 0 && SUB_NAMES[code]?.[c]?.[j]) return SUB_NAMES[code][c][j];
  }
  return subVal;
}

/* ====== QR Chips, Ribbon, Estimator Guides, Star Labels ====== */
export const QR_I18N: Record<LangCode, Array<[string, string]>> = {
  ar: [
    ['السعر كام تقريباً؟', 'لو سمحت السعر كام تقريباً بالتفصيل؟'],
    ['فاضي إمتى تنفّذ؟', 'متاح إمتى تبدأ في الشغل؟'],
    ['مكاني والتفاصيل', 'ممكن نتفق على المكان والميعاد المناسب؟'],
    ['صور من شغلك', 'ممكن تبعتلي صور من شغلك قبل كده؟']
  ],
  en: [
    ['How much roughly?', 'Hi! Could you share a rough quote and breakdown?'],
    ['When are you free?', 'When’s your earliest opening to get started?'],
    ['Location & timing', 'Can we lock in the exact address and time slot?'],
    ['Past work photos', 'Could you send a few photos of your previous work?']
  ],
  zh: [
    ['大概多少钱？', '你好，能发一下大概报价和明细吗？'],
    ['什么时候有空？', '你最快什么时候可以过来做？'],
    ['地址和预约时间', '我们确定一下具体地址和上门时间好吗？'],
    ['发点完工实拍图', '可以发几张你之前做过的实拍案例吗？']
  ],
  de: [
    ['Was kostet es ca.?', 'Hallo, wie viel würde es ungefähr inklusive Details kosten?'],
    ['Wann haben Sie Zeit?', 'Ab wann könnten Sie frühestens starten?'],
    ['Ort & Termin', 'Können wir Adresse und Uhrzeit genau abstimmen?'],
    ['Arbeitsproben', 'Können Sie mir ein paar Fotos Ihrer bisherigen Arbeit schicken?']
  ],
  ru: [
    ['Сколько примерно?', 'Здравствуйте! Подскажите примерную стоимость с деталями?'],
    ['Когда свободны?', 'Когда вы сможете приступить к работе?'],
    ['Адрес и время', 'Давайте уточним точный адрес и удобное время?'],
    ['Фото ваших работ', 'Можете прислать фото ваших выполненных работ?']
  ],
  fr: [
    ['Combien environ ?', 'Bonjour, quel serait le tarif estimatif détaillé ?'],
    ['Quand êtes-vous libre ?', 'À partir de quand pouvez-vous commencer ?'],
    ['Lieu & créneau', 'On peut confirmer l’adresse et l’horaire ?'],
    ['Photos de vos travaux', 'Pouvez-vous envoyer des photos de vos réalisations ?']
  ],
  tr: [
    ['Tahmini ücret nedir?', 'Merhaba, detaylı yaklaşık fiyat paylaşabilir misiniz?'],
    ['Ne zaman müsaitsiniz?', 'İşe en erken ne zaman başlayabilirsiniz?'],
    ['Konum ve zaman', 'Adresi ve uygun saati netleştirelim mi?'],
    ['Önceki işlerden kareler', 'Daha önce yaptığınız işlerden birkaç fotoğraf atar mısınız?']
  ],
  es: [
    ['¿Cuánto cuesta aprox.?', 'Hola, ¿me pasas un presupuesto aproximado con detalle?'],
    ['¿Cuándo puedes?', '¿Desde cuándo tienes disponibilidad para empezar?'],
    ['Lugar y horario', '¿Confirmamos la dirección exacta y el horario?'],
    ['Fotos de tu trabajo', '¿Me mandas fotos de trabajos que hayas hecho antes?']
  ]
};

export const RIBBON_I18N: Record<LangCode, string[]> = {
  ar: ['أهلاً بيك في وصلة', 'نزّل طلبك ببلاش', 'صنايعية ومقدمين خدمة حقيقيين', 'أقرب ناس ليك', 'اتفق بشفافية', 'تقييمات موثّقة ✓'],
  en: ['Welcome to Wasla', 'Post Requests Free', 'Verified Local Pros', 'Closest To You', 'Clear Quotes', 'Verified Deals ✓'],
  zh: ['欢迎来到 Wasla', '免费发布需求', '真实本地专业师傅', '离你最近的帮手', '价格透明协商', '真实成交评价 ✓'],
  de: ['Willkommen bei Wasla', 'Anfrage kostenlos posten', 'Echte Profis vor Ort', 'Direkt in der Nähe', 'Klare Angebote', 'Verifizierte Deals ✓'],
  ru: ['Добро пожаловать в Wasla', 'Бесплатный заказ', 'Настоящие мастера рядом', 'Ближайшие профи', 'Честные цены', 'Проверенные отзывы ✓'],
  fr: ['Bienvenue sur Wasla', 'Publiez gratuitement', 'Vrais pros à proximité', 'Les plus proches de vous', 'Tarifs clairs', 'Avis vérifiés ✓'],
  tr: ['Wasla’ya Hoş Geldin', 'Ücretsiz Talep Aç', 'Gerçek Yerel Ustalar', 'Sana En Yakınlar', 'Şeffaf Teklifler', 'Onaylı İşler ✓'],
  es: ['Bienvenido a Wasla', 'Publica gratis', 'Profesionales reales', 'Más cerca de ti', 'Acuerdos claros', 'Reseñas verificadas ✓']
};

export const EST_GUIDES_I18N: Record<LangCode, Array<{ n: string; tip: string }>> = {
  ar: [
    { n: 'سباكة وإصلاح تسريب / خلاط', tip: 'يزيد لو يحتاج قطع غيار أو تكسير' },
    { n: 'كهرباء وتوصيل لوحة / إضاءة', tip: 'يشمل الكشف وتأمين المفاتيح' },
    { n: 'صيانة وتنظيف تكييف سبليت', tip: 'تنظيف عميق + فحص الفريون' },
    { n: 'نقل عفش أو توصيل طلبية', tip: 'يتحدد حسب الدور والمسافة والحجم' },
    { n: 'نقاشة أو تشطيب غرفة', tip: 'مصنعية الغرفة حسب المعجون والدهان' },
    { n: 'صيانة أجهزة منزلية / غسالة / ثلاجة', tip: 'كشف وإصلاح عطل بدون قطع الغيار' }
  ],
  en: [
    { n: 'Plumbing, Faucet & Leak Repair', tip: 'May vary if spare parts or wall work is needed' },
    { n: 'Electrical Panel & Lighting Setup', tip: 'Includes inspection and breaker safety check' },
    { n: 'Split AC Deep Clean & Service', tip: 'Full coil wash + refrigerant check' },
    { n: 'Apartment Move or Cargo Delivery', tip: 'Depends on floors, distance, and load size' },
    { n: 'Interior Room Painting & Prep', tip: 'Labor cost based on putty & paint coats' },
    { n: 'Washer / Fridge Appliance Repair', tip: 'Diagnostics & repair (parts billed separately)' }
  ],
  zh: [
    { n: '管道漏水检修 / 水龙头更换', tip: '如需额外配件或凿墙，费用另计' },
    { n: '电路开关配电箱 / 灯具安装', tip: '含电路检测与安全排查' },
    { n: '分体空调深度清洗与保养', tip: '包含内机深洗与制冷剂压力检查' },
    { n: '居民搬家或专车拉货配送', tip: '按楼层、里程与物品体积核价' },
    { n: '房间刷漆涂装与墙面处理', tip: '人工费依腻子层数及漆料工艺而定' },
    { n: '洗衣机 / 冰箱等家电维修', tip: '含上门检测与故障修复（不含零配件）' }
  ],
  de: [
    { n: 'Sanitär & Leck / Armatur', tip: 'Höher bei Ersatzteilen oder Stemmarbeiten' },
    { n: 'Elektrik, Sicherung & Licht', tip: 'Inkl. Prüfung und Absicherung' },
    { n: 'Split-Klimaanlage Wartung', tip: 'Tiefenreinigung + Kältemittelcheck' },
    { n: 'Umzug oder Kurierfahrt', tip: 'Abhängig von Etage, Strecke & Menge' },
    { n: 'Zimmer streichen & Spachteln', tip: 'Arbeitskosten je nach Spachtel & Anstrich' },
    { n: 'Haushaltsgeräte-Reparatur', tip: 'Diagnose & Reparatur ohne Ersatzteile' }
  ],
  ru: [
    { n: 'Сантехника, кран и протечки', tip: 'Зависит от запчастей и сложности доступа' },
    { n: 'Электрика, щиток и освещение', tip: 'Включая проверку автоматов и проводки' },
    { n: 'Чистка и сервис сплит-системы', tip: 'Глубокая мойка и проверка фреона' },
    { n: 'Переезд или доставка груза', tip: 'Зависит от этажа, расстояния и объёма' },
    { n: 'Покраска и отделка комнаты', tip: 'Работа зависит от шпаклёвки и слоёв' },
    { n: 'Ремонт стиральной / холодильника', tip: 'Диагностика и ремонт без цены деталей' }
  ],
  fr: [
    { n: 'Plomberie, fuite ou robinet', tip: 'Varie si pièces ou perçage nécessaires' },
    { n: 'Tableau électrique & éclairage', tip: 'Diagnostic et mise en sécurité inclus' },
    { n: 'Entretien climatisation split', tip: 'Nettoyage complet + contrôle fluide' },
    { n: 'Déménagement ou livraison', tip: 'Selon étage, distance et volume' },
    { n: 'Peinture complète d’une pièce', tip: 'Main-d’œuvre selon enduit et couches' },
    { n: 'Dépannage électroménager', tip: 'Diagnostic & réparation hors pièces' }
  ],
  tr: [
    { n: 'Tesisat, Musluk ve Sızıntı', tip: 'Yedek parça veya kırma olursa artabilir' },
    { n: 'Elektrik Panosu & Aydınlatma', tip: 'Arıza tespiti ve sigorta kontrolü dahil' },
    { n: 'Split Klima Bakım & Temizlik', tip: 'Detaylı yıkama + gaz kontrolü' },
    { n: 'Ev Taşıma veya Yük Nakliyesi', tip: 'Kat, mesafe ve yük hacmine göre değişir' },
    { n: 'Oda Boyama ve Alçı İşçiliği', tip: 'Macun ve boya katına göre işçilik' },
    { n: 'Çamaşır / Buzdolabı Tamiri', tip: 'Arıza tespiti ve işçilik (parça hariç)' }
  ],
  es: [
    { n: 'Plomería, fugas y llaves', tip: 'Sube si requiere refacciones o abrir muro' },
    { n: 'Instalación eléctrica y luces', tip: 'Incluye revisión y seguridad del tablero' },
    { n: 'Limpieza y servicio de minisplit', tip: 'Lavado profundo + revisión de gas' },
    { n: 'Mudanza o envío de carga', tip: 'Varía según piso, distancia y volumen' },
    { n: 'Pintura y resane de cuarto', tip: 'Mano de obra según pasta y manos' },
    { n: 'Reparación de lavadora / refri', tip: 'Revisión y arreglo sin incluir piezas' }
  ]
};

export const STAR_LABELS_I18N: Record<LangCode, string[]> = {
  ar: ['', 'ضعيف (1/5)', 'مقبول (2/5)', 'كويس (3/5)', 'شاطر ومحترم (4/5)', 'معلّم وشغل نظيف! (5/5)'],
  en: ['', 'Poor (1/5)', 'Fair (2/5)', 'Good (3/5)', 'Great Pro (4/5)', 'Top-Notch Work! (5/5)'],
  zh: ['', '较差 (1/5)', '一般 (2/5)', '不错 (3/5)', '靠谱专业 (4/5)', '手艺超赞！满分好评 (5/5)'],
  de: ['', 'Schwach (1/5)', 'Okay (2/5)', 'Gut (3/5)', 'Sehr gut (4/5)', 'Meisterhaft! (5/5)'],
  ru: ['', 'Слабо (1/5)', 'Норм (2/5)', 'Хорошо (3/5)', 'Отличный мастер (4/5)', 'Идеальная работа! (5/5)'],
  fr: ['', 'Faible (1/5)', 'Correct (2/5)', 'Bien (3/5)', 'Très pro (4/5)', 'Travail impeccable ! (5/5)'],
  tr: ['', 'Zayıf (1/5)', 'İdare Eder (2/5)', 'İyi (3/5)', 'Başarılı ve Saygılı (4/5)', 'Usta İşi, Tertemiz! (5/5)'],
  es: ['', 'Bajo (1/5)', 'Regular (2/5)', 'Bien (3/5)', 'Muy bueno (4/5)', '¡Excelente trabajo! (5/5)']
};

export function trStarLabels(code: LangCode = _curLang): string[] {
  return STAR_LABELS_I18N[code] || STAR_LABELS_I18N.ar;
}

/* ====== Complete 27 Governorates & ~250 Cities/Centers Localization Engine ====== */
const LOC_MAP: Record<string, Record<Exclude<LangCode, 'ar'>, string>> = {
  /* All 27 Governorates */
  'القاهرة': { en: 'Cairo', zh: '开罗', de: 'Kairo', ru: 'Каир', fr: 'Le Caire', tr: 'Kahire', es: 'El Cairo' },
  'الجيزة': { en: 'Giza', zh: '吉萨', de: 'Gizeh', ru: 'Гиза', fr: 'Gizeh', tr: 'Gize', es: 'Guiza' },
  'الإسكندرية': { en: 'Alexandria', zh: '亚历山大港', de: 'Alexandria', ru: 'Александрия', fr: 'Alexandrie', tr: 'İskenderiye', es: 'Alejandría' },
  'القليوبية': { en: 'Qalyubia', zh: '盖卢比耶', de: 'Qalyubiyya', ru: 'Кальюбия', fr: 'Qalyubiya', tr: 'Kalyubiye', es: 'Caliubia' },
  'الشرقية': { en: 'Sharqia', zh: '东部省', de: 'Scharqiyya', ru: 'Шаркия', fr: 'Ach-Charqiya', tr: 'Şarkiye', es: 'Oriental' },
  'الدقهلية': { en: 'Dakahlia', zh: '代盖赫利耶', de: 'Dakahlia', ru: 'Дакахлия', fr: 'Dakahleya', tr: 'Dekahliye', es: 'Dacalia' },
  'الغربية': { en: 'Gharbia', zh: '西部省', de: 'Gharbiyya', ru: 'Гарбия', fr: 'Gharbeya', tr: 'Garbiye', es: 'Occidental' },
  'المنوفية': { en: 'Monufia', zh: '米努夫', de: 'Minufiyya', ru: 'Минуфия', fr: 'Ménoufia', tr: 'Minufiye', es: 'Menufia' },
  'البحيرة': { en: 'Beheira', zh: '布海拉', de: 'Buhaira', ru: 'Бухейра', fr: 'Beheira', tr: 'Buheyra', es: 'Behera' },
  'كفر الشيخ': { en: 'Kafr El Sheikh', zh: '谢赫村', de: 'Kafr asch-Schaich', ru: 'Кафр-эш-Шейх', fr: 'Kafr el-Cheikh', tr: 'Kafr el-Şeyh', es: 'Kafr el-Sheij' },
  'دمياط': { en: 'Damietta', zh: '杜姆亚特', de: 'Damiette', ru: 'Думьят', fr: 'Damiette', tr: 'Dimyat', es: 'Damieta' },
  'بورسعيد': { en: 'Port Said', zh: '塞得港', de: 'Port Said', ru: 'Порт-Саид', fr: 'Port-Saïd', tr: 'Port Said', es: 'Puerto Saíd' },
  'الإسماعيلية': { en: 'Ismailia', zh: '伊斯梅利亚', de: 'Ismailia', ru: 'Исмаилия', fr: 'Ismaïlia', tr: 'İsmailiye', es: 'Ismailía' },
  'السويس': { en: 'Suez', zh: '苏伊士', de: 'Sues', ru: 'Суэц', fr: 'Suez', tr: 'Süveyş', es: 'Suez' },
  'شمال سيناء': { en: 'North Sinai', zh: '北西奈省', de: 'Nord-Sinai', ru: 'Северный Синай', fr: 'Sinaï du Nord', tr: 'Kuzey Sina', es: 'Sinaí del Norte' },
  'جنوب سيناء': { en: 'South Sinai', zh: '南西奈省', de: 'Süd-Sinai', ru: 'Южный Синай', fr: 'Sinaï du Sud', tr: 'Güney Sina', es: 'Sinaí del Sur' },
  'الفيوم': { en: 'Faiyum', zh: '法尤姆', de: 'Fayyum', ru: 'Эль-Файюм', fr: 'Fayoum', tr: 'Feyyum', es: 'Fayún' },
  'بني سويف': { en: 'Beni Suef', zh: '贝尼苏韦夫', de: 'Bani Suwaif', ru: 'Бени-Суэйф', fr: 'Beni Souef', tr: 'Beni Süveyf', es: 'Beni Suef' },
  'المنيا': { en: 'Minya', zh: '明亚', de: 'Minya', ru: 'Эль-Минья', fr: 'Minya', tr: 'Minye', es: 'Menia' },
  'أسيوط': { en: 'Asyut', zh: '艾斯尤特', de: 'Assiut', ru: 'Асьют', fr: 'Assiout', tr: 'Asyut', es: 'Asiut' },
  'سوهاج': { en: 'Sohag', zh: '索哈杰', de: 'Sohag', ru: 'Сохаг', fr: 'Sohag', tr: 'Sohag', es: 'Suhag' },
  'قنا': { en: 'Qena', zh: '基纳', de: 'Qina', ru: 'Кена', fr: 'Qena', tr: 'Kena', es: 'Qena' },
  'الأقصر': { en: 'Luxor', zh: '卢克索', de: 'Luxor', ru: 'Луксор', fr: 'Louxor', tr: 'Luksor', es: 'Lúxor' },
  'أسوان': { en: 'Aswan', zh: '阿斯旺', de: 'Assuan', ru: 'Асуан', fr: 'Assouan', tr: 'Asvan', es: 'Asuán' },
  'البحر الأحمر': { en: 'Red Sea', zh: '红海省', de: 'Rotes Meer', ru: 'Красное Море', fr: 'Mer Rouge', tr: 'Kızıldeniz', es: 'Mar Rojo' },
  'الوادي الجديد': { en: 'New Valley', zh: '新河谷省', de: 'Neues Tal', ru: 'Новая Долина', fr: 'Nouvelle Vallée', tr: 'Yeni Vadi', es: 'Nuevo Valle' },
  'مطروح': { en: 'Matrouh', zh: '马特鲁', de: 'Matruh', ru: 'Матрух', fr: 'Matrouh', tr: 'Matruh', es: 'Matrú' },

  /* Major Cities with Distinct Multi-Language Names */
  'المنصورة': { en: 'Mansoura', zh: '曼苏拉', de: 'Mansura', ru: 'Эль-Мансура', fr: 'Mansourah', tr: 'Mansura', es: 'Mansura' },
  'مدينة نصر': { en: 'Nasr City', zh: '纳斯尔城', de: 'Nasr City', ru: 'Наср-Сити', fr: 'Nasr City', tr: 'Nasr City', es: 'Ciudad Nasr' },
  'مصر الجديدة': { en: 'Heliopolis', zh: '赫利奥波利斯', de: 'Heliopolis', ru: 'Гелиополис', fr: 'Héliopolis', tr: 'Heliopolis', es: 'Heliópolis' },
  'المعادي': { en: 'Maadi', zh: '马阿迪', de: 'Maadi', ru: 'Маади', fr: 'Maadi', tr: 'Maadi', es: 'Maadi' },
  'التجمع الخامس': { en: '5th Settlement', zh: '第五定居点', de: '5. Siedlung', ru: '5-е поселение', fr: '5e District', tr: '5. Yerleşim', es: '5.º Asentamiento' },
  '6 أكتوبر': { en: '6th of October', zh: '十月六日城', de: '6. Oktober', ru: '6 Октября', fr: '6 Octobre', tr: '6 Ekim', es: '6 de Octubre' },
  'الشيخ زايد': { en: 'Sheikh Zayed', zh: '谢赫扎耶德', de: 'Scheich Zayed', ru: 'Шейх-Заид', fr: 'Cheikh Zayed', tr: 'Şeyh Zayid', es: 'Sheikh Zayed' },
  'شرم الشيخ': { en: 'Sharm El Sheikh', zh: '沙姆沙伊赫', de: 'Scharm El-Scheich', ru: 'Шарм-эш-Шейх', fr: 'Charm el-Cheikh', tr: 'Şarm El-Şeyh', es: 'Sharm el-Sheij' },
  'الغردقة': { en: 'Hurghada', zh: '赫尔格达', de: 'Hurghada', ru: 'Хургада', fr: 'Hurghada', tr: 'Hurgada', es: 'Hurgada' },
  'طنطا': { en: 'Tanta', zh: '坦塔', de: 'Tanta', ru: 'Танта', fr: 'Tanta', tr: 'Tanta', es: 'Tanta' },
  'الزقازيق': { en: 'Zagazig', zh: '宰加济格', de: 'Zagazig', ru: 'Заказик', fr: 'Zagazig', tr: 'Zagazig', es: 'Zagazig' },
  'بنها': { en: 'Banha', zh: '本哈', de: 'Banha', ru: 'Бенха', fr: 'Banha', tr: 'Banha', es: 'Banha' },
  'أكتوبر': { en: 'October', zh: '十月城', de: 'Oktober', ru: 'Октябрь', fr: 'Octobre', tr: 'Ekim', es: 'Octubre' },
  'المهندسين': { en: 'Mohandessin', zh: '莫罕德辛', de: 'Mohandessin', ru: 'Мохандесин', fr: 'Mohandessin', tr: 'Mohandessin', es: 'Mohandessin' },
  'الدقي': { en: 'Dokki', zh: '多基', de: 'Dokki', ru: 'Докки', fr: 'Dokki', tr: 'Dokki', es: 'Dokki' },
  'الهرم': { en: 'Haram', zh: '金字塔区', de: 'Haram', ru: 'Харам', fr: 'Haram', tr: 'Haram', es: 'Haram' },
  'فيصل': { en: 'Faisal', zh: '费萨尔', de: 'Faisal', ru: 'Фейсал', fr: 'Faisal', tr: 'Faisal', es: 'Faisal' },
  'سموحة': { en: 'Smouha', zh: '斯穆哈', de: 'Smouha', ru: 'Смуха', fr: 'Smouha', tr: 'Smouha', es: 'Smouha' },
  'المنتزه': { en: 'Montaza', zh: '蒙塔扎', de: 'Montaza', ru: 'Монтаза', fr: 'Montaza', tr: 'Montaza', es: 'Montaza' },
  'وسط البلد': { en: 'Downtown', zh: '市中心', de: 'Stadtzentrum', ru: 'Центр города', fr: 'Centre-ville', tr: 'Şehir Merkezi', es: 'Centro' },
  '15 مايو': { en: '15th of May', zh: '五月十五日城', de: '15. Mai', ru: '15 Мая', fr: '15 Mai', tr: '15 Mayıs', es: '15 de Mayo' },
  'العاشر من رمضان': { en: '10th of Ramadan', zh: '斋月十日城', de: '10. Ramadan', ru: '10 Рамадана', fr: '10 Ramadan', tr: '10 Ramazan', es: '10 de Ramadán' },
  'دمياط الجديدة': { en: 'New Damietta', zh: '新杜姆亚特', de: 'Neu-Damiette', ru: 'Новый Думьят', fr: 'Nouvelle-Damiette', tr: 'Yeni Dimyat', es: 'Nueva Damieta' },
  'القنطرة شرق': { en: 'Qantara East', zh: '东坎塔拉', de: 'Qantara Ost', ru: 'Восточная Кантара', fr: 'Qantara Est', tr: 'Doğu Kantara', es: 'Qantara Este' },
  'القنطرة غرب': { en: 'Qantara West', zh: '西坎塔拉', de: 'Qantara West', ru: 'Западная Кантара', fr: 'Qantara Ouest', tr: 'Batı Kantara', es: 'Qantara Oeste' },
  'سانت كاترين': { en: 'Saint Catherine', zh: '圣凯瑟琳', de: 'Sankt Katharina', ru: 'Сент-Катрин', fr: 'Sainte-Catherine', tr: 'Azize Katerina', es: 'Santa Catalina' },
  'العلمين': { en: 'El Alamein', zh: '阿拉曼', de: 'El-Alamein', ru: 'Эль-Аламейн', fr: 'El-Alamein', tr: 'El-Alameyn', es: 'El Alamein' },
  'سيوة': { en: 'Siwa Oasis', zh: '锡瓦绿洲', de: 'Oase Siwa', ru: 'Оазис Сива', fr: 'Oasis de Siwa', tr: 'Siva Vahası', es: 'Oasis de Siwa' },
  'أبو سمبل': { en: 'Abu Simbel', zh: '阿布辛贝', de: 'Abu Simbel', ru: 'Абу-Симбел', fr: 'Abou Simbel', tr: 'Ebu Simbel', es: 'Abu Simbel' },
  'مرسى علم': { en: 'Marsa Alam', zh: '马萨阿拉姆', de: 'Marsa Alam', ru: 'Марса-Алам', fr: 'Marsa Alam', tr: 'Marsa Alam', es: 'Marsa Alam' },
  'دهب': { en: 'Dahab', zh: '达哈卜', de: 'Dahab', ru: 'Дахаб', fr: 'Dahab', tr: 'Dahab', es: 'Dahab' },
  'طابا': { en: 'Taba', zh: '塔巴', de: 'Taba', ru: 'Таба', fr: 'Taba', tr: 'Taba', es: 'Taba' },
  'نويبع': { en: 'Nuweiba', zh: '努韦巴', de: 'Nuweiba', ru: 'Нувейба', fr: 'Nuweiba', tr: 'Nuveyba', es: 'Nuweiba' }
};

/* Complete City/Center Dictionary for all ~245 Cities across Egypt's 27 Governorates */
const CITY_EN_MAP: Record<string, string> = {
  // القاهرة
  'حلوان': 'Helwan', 'شبرا': 'Shubra', 'الزيتون': 'Zaytoun', 'عين شمس': 'Ain Shams',
  'المطرية': 'Mataria', 'النزهة': 'Nozha', 'الشروق': 'El Shorouk', 'بدر': 'Badr City',
  'الرحاب': 'El Rehab', 'مدينتي': 'Madinaty', 'المقطم': 'Mokattam', 'السيدة زينب': 'Sayyida Zeinab',
  'المرج': 'El Marg',
  // الجيزة
  'العجوزة': 'Agouza', 'إمبابة': 'Imbaba', 'بولاق الدكرور': 'Boulaq El Dakrour',
  'العياط': 'El Ayat', 'الصف': 'El Saff', 'أطفيح': 'Atfih', 'الحوامدية': 'Hawamdiya',
  'البدرشين': 'Badrasheen', 'أوسيم': 'Ausim', 'كرداسة': 'Kerdasa', 'منشأة القناطر': 'Manshiyat El Qanater',
  // الإسكندرية
  'العجمي': 'Agami', 'سيدي جابر': 'Sidi Gaber', 'العطارين': 'Attarin', 'الجمرك': 'Gomrok',
  'برج العرب': 'Borg El Arab', 'العامرية': 'Amreya', 'محرم بك': 'Moharam Bek', 'كرموز': 'Karmouz',
  'المنشية': 'Mansheya', 'أبو قير': 'Abu Qir', 'العصافرة': 'Asafra', 'سيدي بشر': 'Sidi Bishr',
  // القليوبية
  'شبرا الخيمة': 'Shubra El Kheima', 'قليوب': 'Qalyub', 'الخانكة': 'El Khanka',
  'القناطر الخيرية': 'El Qanater El Khayreya', 'شبين القناطر': 'Shibin El Qanater',
  'طوخ': 'Toukh', 'كفر شكر': 'Kafr Shukr', 'العبور': 'Obour City', 'الخصوص': 'El Khosous',
  // الشرقية
  'بلبيس': 'Bilbeis', 'أبو حماد': 'Abu Hammad', 'منيا القمح': 'Minya El Qamh', 'فاقوس': 'Faqous',
  'ههيا': 'Hihya', 'أبو كبير': 'Abu Kebir', 'ديرب نجم': 'Diyarb Negm', 'الحسينية': 'El Husseiniya',
  'كفر صقر': 'Kafr Saqr', 'مشتول السوق': 'Mashtoul El Souk', 'الإبراهيمية': 'El Ibrahimiya',
  // الدقهلية
  'طلخا': 'Talkha', 'ميت غمر': 'Mit Ghamr', 'دكرنس': 'Dekernes', 'أجا': 'Aga',
  'السنبلاوين': 'Sinbillawin', 'بلقاس': 'Bilqas', 'المنزلة': 'El Manzala', 'شربين': 'Sherbin',
  'نبروه': 'Nabaroh', 'تمي الأمديد': 'Tami El Amdid', 'الجمالية': 'El Gamaliya',
  'منية النصر': 'Minyat El Nasr', 'بني عبيد': 'Beni Ebeid', 'ميت سلسيل': 'Mit Salsil',
  // الغربية
  'المحلة الكبرى': 'El Mahalla El Kubra', 'كفر الزيات': 'Kafr El Zayat', 'زفتى': 'Zifta',
  'السنطة': 'El Santa', 'بسيون': 'Basyoun', 'سمنود': 'Samannoud', 'قطور': 'Qutour',
  // المنوفية
  'شبين الكوم': 'Shibin El Kom', 'مدينة السادات': 'Sadat City', 'منوف': 'Menouf', 'أشمون': 'Ashmoun',
  'الباجور': 'El Bagour', 'قويسنا': 'Quesna', 'بركة السبع': 'Birket El Sab', 'تلا': 'Tala',
  'الشهداء': 'El Shohada', 'سرس الليان': 'Sers El Lyan',
  // البحيرة
  'دمنهور': 'Damanhour', 'كفر الدوار': 'Kafr El Dawwar', 'رشيد': 'Rosetta (Rashid)',
  'إيتاي البارود': 'Itay El Baroud', 'أبو حمص': 'Abu Hommos', 'حوش عيسى': 'Hosh Essa',
  'الدلنجات': 'Delengat', 'كوم حمادة': 'Kom Hamada', 'إدكو': 'Idku', 'أبو المطامير': 'Abu El Matamir',
  'شبراخيت': 'Shubrakhit', 'المحمودية': 'El Mahmoudiya', 'وادي النطرون': 'Wadi El Natrun',
  // كفر الشيخ
  'دسوق': 'Desouk', 'بلطيم': 'Baltim', 'الحامول': 'El Hamoul', 'بيلا': 'Biyala',
  'فوه': 'Fuwwah', 'مطوبس': 'Metoubes', 'قلين': 'Qallin', 'سيدي سالم': 'Sidi Salem', 'الرياض': 'El Reyad',
  // دمياط
  'رأس البر': 'Ras El Bar', 'فارسكور': 'Faraskour', 'كفر سعد': 'Kafr Saad',
  'الزرقا': 'El Zarqa', 'كفر البطيخ': 'Kafr El Battikh',
  // بورسعيد
  'بورفؤاد': 'Port Fouad', 'العرب': 'El Arab', 'الضواحي': 'El Dawahi', 'الزهور': 'El Zohour', 'المناخ': 'El Manakh',
  // الإسماعيلية
  'فايد': 'Fayed', 'التل الكبير': 'Tell El Kebir', 'أبو صوير': 'Abu Suwir', 'القصاصين': 'El Qassasin',
  // السويس
  'الأربعين': 'El Arbaeen', 'عتاقة': 'Attaka', 'الجناين': 'El Ganayen',
  // شمال سيناء
  'العريش': 'El Arish', 'الشيخ زويد': 'Sheikh Zuweid', 'رفح': 'Rafah', 'بئر العبد': 'Bir El Abd',
  'الحسنة': 'El Hasana', 'نخل': 'Nakhl',
  // جنوب سيناء
  'الطور': 'El Tor', 'أبو رديس': 'Abu Rudeis', 'رأس سدر': 'Ras Sudr',
  // الفيوم
  'سنورس': 'Sinnuris', 'إطسا': 'Itsa', 'طامية': 'Tamiya', 'إبشواي': 'Ibsheway', 'يوسف الصديق': 'Youssef El Seddik',
  // بني سويف
  'الواسطى': 'El Wasta', 'ناصر': 'Nasser', 'إهناسيا': 'Ihnasya', 'ببا': 'Biba', 'سمسطا': 'Sumusta', 'الفشن': 'El Fashn',
  // المنيا
  'ملوي': 'Mallawi', 'سمالوط': 'Samalout', 'مغاغة': 'Maghagha', 'بني مزار': 'Beni Mazar',
  'العدوة': 'El Idwa', 'مطاي': 'Matai', 'أبو قرقاص': 'Abu Qurqas', 'دير مواس': 'Deir Mawas',
  // أسيوط
  'ديروط': 'Dayrout', 'منفلوط': 'Manfalout', 'القوصية': 'El Qusiya', 'أبنوب': 'Abnoub',
  'أبو تيج': 'Abu Tig', 'الغنايم': 'El Ghanayem', 'صدفا': 'Sedfa', 'البداري': 'El Badari', 'ساحل سليم': 'Sahel Selim',
  // سوهاج
  'أخميم': 'Akhmim', 'جرجا': 'Girga', 'طهطا': 'Tahta', 'المراغة': 'El Maragha',
  'البلينا': 'El Balyana', 'المنشأة': 'El Monshaa', 'دار السلام': 'Dar El Salam', 'جهينة': 'Juhayna', 'طما': 'Tima',
  // قنا
  'نجع حمادي': 'Nag Hammadi', 'دشنا': 'Deshna', 'قوص': 'Qus', 'أبو تشت': 'Abu Tesht',
  'فرشوط': 'Farshout', 'نقادة': 'Naqada', 'الوقف': 'El Waqf',
  // الأقصر
  'إسنا': 'Esna', 'أرمنت': 'Armant', 'الطود': 'El Tod', 'القرنة': 'El Qurna', 'البياضية': 'El Bayadiya',
  // أسوان
  'كوم أمبو': 'Kom Ombo', 'إدفو': 'Edfu', 'دراو': 'Daraw', 'نصر النوبة': 'Nasr El Nuba',
  // البحر الأحمر
  'سفاجا': 'Safaga', 'القصير': 'El Quseir', 'رأس غارب': 'Ras Gharib', 'الشلاتين': 'Shalateen',
  // الوادي الجديد
  'الخارجة': 'Kharga', 'الداخلة': 'Dakhla', 'الفرافرة': 'Farafra', 'باريس': 'Baris', 'بلاط': 'Balat',
  // مطروح
  'مرسى مطروح': 'Marsa Matrouh', 'الحمام': 'El Hammam', 'الضبعة': 'El Dabaa',
  'سيدي براني': 'Sidi Barrani', 'السلوم': 'Salloum', 'النجيلة': 'El Negaila'
};

function latinToCyrillic(s: string): string {
  return s
    .replace(/\bRosetta \(Rashid\)/g, 'Рашид (Розетта)')
    .replace(/\bSadat City\b/g, 'Мадинат-эс-Садат')
    .replace(/\bObour City\b/g, 'Эль-Обур')
    .replace(/\bBadr City\b/g, 'Бадр-Сити')
    .replace(/\bEl /g, 'Эль-')
    .replace(/sh/gi, m => m[0] === 'S' ? 'Ш' : 'ш')
    .replace(/ch/gi, m => m[0] === 'C' ? 'Ч' : 'ч')
    .replace(/kh/gi, m => m[0] === 'K' ? 'Х' : 'х')
    .replace(/gh/gi, m => m[0] === 'G' ? 'Г' : 'г')
    .replace(/th/gi, m => m[0] === 'T' ? 'Т' : 'т')
    .replace(/ph/gi, m => m[0] === 'P' ? 'Ф' : 'ф')
    .replace(/ou/gi, 'у')
    .replace(/ee/gi, 'и')
    .replace(/oo/gi, 'у')
    .replace(/ai/gi, 'ай')
    .replace(/ay/gi, 'ай')
    .replace(/ey/gi, 'ей')
    .replace(/[A-Za-z]/g, ch => {
      const low = ch.toLowerCase();
      const map: Record<string, string> = {
        a: 'а', b: 'б', c: 'к', d: 'д', e: 'е', f: 'ф', g: 'г', h: 'х',
        i: 'и', j: 'дж', k: 'к', l: 'л', m: 'м', n: 'н', o: 'о', p: 'п',
        q: 'к', r: 'р', s: 'с', t: 'т', u: 'у', v: 'в', w: 'в', x: 'кс',
        y: 'и', z: 'з'
      };
      const r = map[low] || ch;
      return ch === low ? r : r.charAt(0).toUpperCase() + r.slice(1);
    });
}

function latinToChinese(en: string): string {
  const known: Record<string, string> = {
    'Helwan': '赫勒万', 'Shubra': '舒卜拉', 'Zaytoun': '宰툰区', 'Ain Shams': '艾因夏姆斯',
    'Mataria': '马塔里亚', 'Nozha': '努즈哈', 'El Shorouk': '舒鲁克城', 'Badr City': '巴德尔城',
    'El Rehab': '瑞哈卜城', 'Madinaty': '马迪纳蒂', 'Mokattam': '穆卡塔姆', 'Sayyida Zeinab': '赛义达泽纳布',
    'El Marg': '马尔吉', 'Agouza': '阿古扎', 'Imbaba': '因巴巴', 'Boulaq El Dakrour': '布拉克达克鲁尔',
    'Shubra El Kheima': '舒卜拉海马', 'Obour City': '奥布尔城', 'Talkha': '塔尔哈', 'Mit Ghamr': '米特加姆尔',
    'Dekernes': '迪ikir尼斯', 'Sinbillawin': '辛比拉温', 'Bilqas': '比尔卡斯', 'El Manzala': '曼扎拉',
    'Sherbin': '谢尔宾', 'El Mahalla El Kubra': '大马哈拉', 'Kafr El Zayat': '扎亚特村', 'Shibin El Kom': '希宾库姆',
    'Sadat City': '萨达特城', 'Damanhour': '达aman胡尔', 'Kafr El Dawwar': '达瓦尔村', 'Rosetta (Rashid)': '罗塞塔 (拉希德)',
    'Wadi El Natrun': '纳特伦谷', 'Desouk': '迪苏克', 'Baltim': '巴尔蒂姆', 'Ras El Bar': '拉斯巴尔',
    'Port Fouad': '福阿德港', 'El Arish': '阿里什', 'Rafah': '拉法', 'El Tor': '图尔', 'Ras Sudr': '拉斯苏德尔',
    'Mallawi': '马拉维', 'Nag Hammadi': '纳季哈马迪', 'Esna': '伊斯纳', 'Kom Ombo': '康翁波', 'Edfu': '埃德富',
    'Safaga': '萨法加', 'El Quseir': '库赛尔', 'Kharga': '哈里杰', 'Dakhla': '达赫拉', 'Farafra': '法拉夫拉',
    'Marsa Matrouh': '马萨马特鲁', 'Salloum': '塞卢姆', 'Borg El Arab': '阿拉伯堡', 'Sidi Gaber': '西迪加贝尔',
    'Sidi Bishr': '西迪比什尔', 'Abu Qir': '阿布基尔'
  };
  if (known[en]) return known[en].replace(/[^\u4e00-\u9fa5（）()\s]/g, '');
  const syls = ['阿', '巴', '卡', '达', '埃', '法', '加', '哈', '伊', '贾', '卡', '拉', '马', '纳', '奥', '帕', '库', '拉', '萨', '塔', '乌', '瓦', '瓦', '克', '亚', '扎'];
  const clean = en.replace(/^El\s+/i, '').replace(/\s+City$/i, '');
  const parts = clean.split(/[\s-]+/).filter(Boolean);
  const zh = parts.map(w => {
    let out = '';
    const step = Math.max(1, Math.floor(w.length / 3));
    for (let i = 0; i < w.length && out.length < 3; i += step) {
      const c = w.toLowerCase().charCodeAt(i) - 97;
      if (c >= 0 && c < 26) out += syls[c];
    }
    return out || '城';
  }).join('·');
  return zh + '区';
}

function arabicToPhoneticLatin(ar: string): string {
  const map: Record<string, string> = {
    'ا': 'a', 'أ': 'a', 'إ': 'e', 'آ': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th',
    'ج': 'g', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z',
    'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a',
    'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
    'ه': 'h', 'ة': 'a', 'و': 'w', 'ي': 'y', 'ى': 'a', 'ئ': 'e', 'ؤ': 'o', 'ء': ''
  };
  return ar.split(/\s+/).map(w => {
    const clean = w.replace(/^ال/, 'El-');
    let res = '';
    for (const ch of clean) res += (map[ch] !== undefined ? map[ch] : ch);
    return res.charAt(0).toUpperCase() + res.slice(1);
  }).join(' ');
}

export function tLocToken(tok: string, code: LangCode = _curLang): string {
  const s = String(tok || '').trim();
  if (!s || code === 'ar') return s;
  const hit = LOC_MAP[s]?.[code];
  if (hit) return hit;
  const en = CITY_EN_MAP[s] || (/[\u0600-\u06FF]/.test(s) ? arabicToPhoneticLatin(s) : s);
  if (code === 'en' || code === 'de' || code === 'fr' || code === 'tr' || code === 'es') return en;
  if (code === 'ru') return latinToCyrillic(en);
  if (code === 'zh') return latinToChinese(en);
  return en;
}

export function tLocText(loc: string, code: LangCode = _curLang): string {
  const s = String(loc || '').trim();
  if (!s || code === 'ar') return s;
  return s.split(' · ').map(part =>
    part.split(' - ').map(sub => tLocToken(sub.trim(), code)).join(' - ')
  ).join(' · ');
}

/* ====== Core Dictionary ====== */
const DICT: Record<string, Record<LangCode, string>> = {
  brand_name: { ar: 'وصلة', en: 'Wasla', zh: 'Wasla', de: 'Wasla', ru: 'Wasla', fr: 'Wasla', tr: 'Wasla', es: 'Wasla' },
  live: { ar: 'مباشر', en: 'Live', zh: '实时', de: 'Live', ru: 'Онлайн', fr: 'En direct', tr: 'Canlı', es: 'En vivo' },
  back: { ar: 'رجوع', en: 'Back', zh: '返回', de: 'Zurück', ru: 'Назад', fr: 'Retour', tr: 'Geri', es: 'Atrás' },
  close: { ar: 'إغلاق', en: 'Close', zh: '关闭', de: 'Schließen', ru: 'Закрыть', fr: 'Fermer', tr: 'Kapat', es: 'Cerrar' },
  cancel: { ar: 'إلغاء', en: 'Cancel', zh: '取消', de: 'Abbrechen', ru: 'Отмена', fr: 'Annuler', tr: 'İptal', es: 'Cancelar' },
  ok_done: { ar: 'تمام', en: 'Got it', zh: '好的', de: 'Alles klar', ru: 'Понятно', fr: 'Compris', tr: 'Tamam', es: 'Entendido' },
  egp: { ar: 'ج.م', en: 'EGP', zh: '埃及镑', de: 'EGP', ru: 'фунтов', fr: 'EGP', tr: 'EGP', es: 'EGP' },
  egp_short: { ar: 'ج', en: 'EGP', zh: '镑', de: 'EGP', ru: 'EGP', fr: 'EGP', tr: 'EGP', es: 'EGP' },
  guest: { ar: 'زائر', en: 'Guest', zh: '访客', de: 'Gast', ru: 'Гость', fr: 'Invité', tr: 'Misafir', es: 'Invitado' },
  hero_guest_name: { ar: 'يا بطل', en: 'there', zh: '朋友', de: 'Hallo', ru: 'друг', fr: 'l’ami', tr: 'dostum', es: 'amigo' },
  browsing_guest: { ar: 'بتتصفح من غير تسجيل', en: 'Browsing as guest', zh: '当前以访客浏览', de: 'Als Gast aktiv', ru: 'Просмотр без входа', fr: 'Navigation invité', tr: 'Misafir olarak geziyor', es: 'Navegando como invitado' },
  browsing_guest_short: { ar: 'بتتصفح كزائر', en: 'Guest mode', zh: '访客模式', de: 'Gastmodus', ru: 'Гостевой режим', fr: 'Mode invité', tr: 'Misafir modu', es: 'Modo invitado' },
  sign_out_btn: { ar: 'خروج', en: 'Log out', zh: '退出', de: 'Abmelden', ru: 'Выйти', fr: 'Déconnexion', tr: 'Çıkış', es: 'Salir' },
  sign_in_btn: { ar: 'سجّل', en: 'Sign in', zh: '登录', de: 'Anmelden', ru: 'Войти', fr: 'Connexion', tr: 'Giriş', es: 'Entrar' },

  /* Intro & Onboarding */
  intro_title_pre: { ar: 'أهلاً بيك في ', en: 'Welcome to ', zh: '欢迎来到 ', de: 'Willkommen bei ', ru: 'Добро пожаловать в ', fr: 'Bienvenue sur ', tr: 'Hoş geldin: ', es: 'Bienvenido a ' },
  intro_lead: {
    ar: 'محتاج صنايعي شاطر؟ عربية تنقل عفشك؟ مدرّس لولادك؟ نزّل طلبك في ثواني وهيوصل لأقرب ناس بتفهم في الشغلانة، ولو إنت صاحب صنعة أو خدمة قدّم عروضك واشتغل على طول.',
    en: 'Need a trusted pro, a moving truck, or a tutor? Post what you need in seconds and reach vetted pros nearby — or offer your own services and win local jobs right away.',
    zh: '找靠谱维修工、搬家货车或上门家教？几秒发布需求即可直达附近专业人士；如果您本身提供手艺或专业服务，也可随时抢单接活。',
    de: 'Einen zuverlässigen Handwerker, Transporter oder Nachhilfelehrer gesucht? Anfrage in Sekunden posten und Profis in der Nähe erreichen – oder selbst Aufträge annehmen.',
    ru: 'Нужен толковый мастер, грузовая машина или репетитор? Опубликуйте заказ за пару секунд и получайте отклики рядом, или берите заказы сами.',
    fr: 'Besoin d’un artisan fiable, d’un utilitaire ou d’un prof ? Publiez votre demande en quelques secondes et touchez les pros à proximité, ou proposez vos services.',
    tr: 'İyi bir usta, nakliye aracı veya özel ders mi lazım? Saniyeler içinde talebini aç ve yakındaki uzmanlara ulaş; ustaysan hemen teklif verip çalışmaya başla.',
    es: '¿Buscas un técnico confiable, flete o tutor? Publica tu pedido en segundos y conecta con profesionales cerca de ti, o envía cotizaciones y empieza a trabajar.'
  },
  intro_p1: { ar: 'نقل وعفش', en: 'Moving & Cargo', zh: '搬家货运', de: 'Umzug & Transport', ru: 'Перевозки', fr: 'Déménagement', tr: 'Nakliye', es: 'Mudanzas' },
  intro_p2: { ar: 'صيانة وصنايعية', en: 'Repairs & Pros', zh: '维修技工', de: 'Handwerk', ru: 'Ремонт', fr: 'Dépannage', tr: 'Tamir & Usta', es: 'Reparaciones' },
  intro_p3: { ar: 'دروس وتعليم', en: 'Tutoring', zh: '家教课程', de: 'Nachhilfe', ru: 'Учёба', fr: 'Cours', tr: 'Eğitim', es: 'Clases' },
  intro_p4: { ar: 'شركات وتوريدات', en: 'Wholesale & Teams', zh: '采购供货', de: 'Gewerbe', ru: 'Поставки', fr: 'Entreprises', tr: 'Tedarik', es: 'Empresas' },
  intro_enter: { ar: 'ادخل اتفرج ع الموقع', en: 'Explore Wasla', zh: '直接进入浏览', de: 'Plattform ansehen', ru: 'Смотреть сайт', fr: 'Explorer le site', tr: 'Siteyi Keşfet', es: 'Explorar Wasla' },
  intro_google: { ar: 'سجّل بحساب جوجل', en: 'Continue with Google', zh: '使用 Google 账号登录', de: 'Mit Google anmelden', ru: 'Войти через Google', fr: 'Continuer avec Google', tr: 'Google ile Devam Et', es: 'Continuar con Google' },
  intro_hint: {
    ar: 'تصفح براحتك من غير تعقيد، والتسجيل بجوجل مبياخدش ثواني.',
    en: 'Browse freely anytime — signing in with Google takes seconds.',
    zh: '随时自由浏览，使用 Google 登录仅需几秒。',
    de: 'Frei stöbern ohne Hürden – Google-Login dauert nur Sekunden.',
    ru: 'Свободный просмотр без лишних шагов, вход через Google за секунду.',
    fr: 'Naviguez librement sans prise de tête, la connexion Google prend 2 secondes.',
    tr: 'Rahatça gez, Google ile kayıt olmak sadece saniyeler sürer.',
    es: 'Explora sin complicaciones; iniciar con Google toma solo unos segundos.'
  },
  login_title: { ar: 'تسجيل الدخول', en: 'Sign In', zh: '账号登录', de: 'Anmeldung', ru: 'Вход', fr: 'Connexion', tr: 'Giriş Yap', es: 'Iniciar sesión' },
  step_1_2: { ar: 'خطوة 1 من 2', en: 'Step 1 of 2', zh: '第 1 步（共 2 步）', de: 'Schritt 1 von 2', ru: 'Шаг 1 из 2', fr: 'Étape 1 sur 2', tr: 'Adım 1 / 2', es: 'Paso 1 de 2' },
  step_2_2: { ar: 'خطوة 2 من 2', en: 'Step 2 of 2', zh: '第 2 步（共 2 步）', de: 'Schritt 2 von 2', ru: 'Шаг 2 из 2', fr: 'Étape 2 sur 2', tr: 'Adım 2 / 2', es: 'Paso 2 de 2' },
  login_h2: { ar: 'كمّل بحساب جوجل بتاعك', en: 'Continue with your Google account', zh: '使用您的 Google 账号继续', de: 'Mit Google-Konto fortfahren', ru: 'Продолжите с аккаунтом Google', fr: 'Continuez avec Google', tr: 'Google hesabınla devam et', es: 'Continúa con tu cuenta de Google' },
  login_sub: { ar: 'اختار حسابك وهتدخل على طول تكمّل بياناتك الأساسية وتبدأ.', en: 'Pick your account to finish quick profile setup and start.', zh: '选择账号即可快速完善基本资料并开始使用。', de: 'Konto wählen, Profil kurz vervollständigen und loslegen.', ru: 'Выберите аккаунт, заполните пару полей и начинайте.', fr: 'Choisissez votre compte pour finaliser votre profil.', tr: 'Hesabını seç, temel bilgilerini tamamlayıp hemen başla.', es: 'Elige tu cuenta para completar tu perfil y empezar.' },
  login_add_b: { ar: 'فتح نافذة حسابات جوجل', en: 'Open Google Accounts', zh: '打开 Google 账号窗口', de: 'Google-Konten öffnen', ru: 'Открыть аккаунты Google', fr: 'Ouvrir les comptes Google', tr: 'Google Hesaplarını Aç', es: 'Abrir cuentas de Google' },
  login_add_s: { ar: 'اختار أي حساب جوجل مسجّل عندك', en: 'Choose any signed-in Google account', zh: '选择任意已登录的 Google 账号', de: 'Beliebiges Google-Konto wählen', ru: 'Выберите любой ваш аккаунт', fr: 'Sélectionnez un compte Google', tr: 'Kayıtlı bir Google hesabı seç', es: 'Elige cualquier cuenta de Google' },
  login_fine: { ar: 'بناخد اسمك وإيميلك وصورتك من جوجل بس علشان نوثّق الحسابات الحقيقية.', en: 'We only use your name, email, and photo from Google to verify real accounts.', zh: '我们仅获取您的姓名、邮箱和头像用于实名账号验证。', de: 'Wir nutzen nur Name, E-Mail und Foto zur Verifizierung echter Konten.', ru: 'Мы берём только имя, почту и фото из Google для проверки аккаунта.', fr: 'Nous utilisons uniquement nom, e-mail et photo Google pour authentifier les comptes.', tr: 'Yalnızca gerçek hesapları doğrulamak için ad, e-posta ve fotoğraf bilgilerini alırız.', es: 'Solo usamos tu nombre, correo y foto de Google para verificar cuentas reales.' },

  /* Home Hero & Radar Strip */
  hero_sub: { ar: 'وصـلـة · الصنعة والخدمة في منطقتك', en: 'Wasla · Trusted Local Pros Near You', zh: 'Wasla · 身边的靠谱手艺与本地服务', de: 'Wasla · Handwerk & Service vor Ort', ru: 'Wasla · Мастера и услуги рядом с вами', fr: 'Wasla · Artisans & services près de chez vous', tr: 'Wasla · Bölgendeki Güvenilir Usta ve Hizmetler', es: 'Wasla · Servicios y profesionales cerca de ti' },
  hero_hi: { ar: 'أهلاً {name}، محتاج تنجز إيه النهاردة؟', en: 'Hey {name}, what do you need done today?', zh: '你好 {name}，今天有什么需要帮忙搞定的？', de: 'Hallo {name}, was steht heute an?', ru: 'Привет, {name}! Что нужно сделать сегодня?', fr: 'Salut {name}, de quel service avez-vous besoin ?', tr: 'Merhaba {name}, bugün ne halletmek istersin?', es: 'Hola {name}, ¿qué necesitas resolver hoy?' },
  post_free: { ar: 'نزّل طلبك ببلاش', en: 'Post Request Free', zh: '免费发布需求', de: 'Kostenlos anfragen', ru: 'Создать заказ', fr: 'Publier gratuitement', tr: 'Ücretsiz Talep Aç', es: 'Publicar gratis' },
  work_pro: { ar: 'اشتغل كمقدم خدمة', en: 'Become a Pro', zh: '入驻成为服务商', de: 'Als Anbieter starten', ru: 'Стать мастером', fr: 'Devenir prestataire', tr: 'Hizmet Veren Ol', es: 'Trabajar como Pro' },
  search_home_ph: { ar: 'دوّر على سباك، نقل عفش، مدرس، كهربائي...', en: 'Search plumber, moving truck, tutor, electrician...', zh: '搜索水电工、搬家拉货、家教老师...', de: 'Suche Klempner, Umzug, Nachhilfe, Elektriker...', ru: 'Искать сантехника, переезд, репетитора...', fr: 'Chercher plombier, déménagement, cours...', tr: 'Tesisatçı, nakliye, özel ders, elektrikçi ara...', es: 'Busca plomero, mudanza, clases, electricista...' },
  search_btn: { ar: 'بحث', en: 'Search', zh: '搜索', de: 'Suchen', ru: 'Найти', fr: 'Rechercher', tr: 'Ara', es: 'Buscar' },
  search_side_ph: { ar: 'دوّر في القايمة...', en: 'Jump to section...', zh: '搜索菜单导航...', de: 'Im Menü suchen...', ru: 'Поиск по меню...', fr: 'Chercher un onglet...', tr: 'Menüde ara...', es: 'Buscar en el menú...' },
  req_avail_lbl: { ar: 'طلب متاح', en: 'open requests', zh: '条进行中需求', de: 'offene Anfragen', ru: 'акт. заказов', fr: 'demandes actives', tr: 'açık talep', es: 'pedidos activos' },
  pro_avail_lbl: { ar: 'صنايعي متاح', en: 'pros ready', zh: '位服务商在线', de: 'Anbieter bereit', ru: 'мастеров онлайн', fr: 'pros dispo', tr: 'müsait usta', es: 'pros disponibles' },
  radar_btn: { ar: 'رادار القريبين', en: 'Nearby Radar', zh: '附近雷达', de: 'Umfeld-Radar', ru: 'Радар рядом', fr: 'Radar proximité', tr: 'Yakın Radar', es: 'Radar cercano' },
  calc_btn: { ar: 'حاسبة الأسعار', en: 'Price Estimator', zh: '价格估算器', de: 'Preisrechner', ru: 'Калькулятор цен', fr: 'Estimateur prix', tr: 'Fiyat Hesaplayıcı', es: 'Calculadora' },
  nearest_btn: { ar: 'أقرب طلب', en: 'Closest Job', zh: '最近需求', de: 'Nächste Anfrage', ru: 'Ближайший заказ', fr: 'Plus proche', tr: 'En Yakın Talep', es: 'Más cercano' },
  radar_short: { ar: 'رادار', en: 'Radar', zh: '雷达', de: 'Radar', ru: 'Радар', fr: 'Radar', tr: 'Radar', es: 'Radar' },
  calc_short: { ar: 'حاسبة', en: 'Pricing', zh: '估价', de: 'Rechner', ru: 'Цены', fr: 'Tarifs', tr: 'Fiyat', es: 'Precios' },
  cats_sec: { ar: 'الأقسام', en: 'Categories', zh: '服务分类', de: 'Kategorien', ru: 'Категории', fr: 'Catégories', tr: 'Kategoriler', es: 'Categorías' },
  near_provs_sec: { ar: 'مقدمو خدمة قريبون منك', en: 'Top Pros Near You', zh: '附近推荐服务商', de: 'Profis in deiner Nähe', ru: 'Мастера рядом с вами', fr: 'Pros près de chez vous', tr: 'Yakınındaki Ustalar', es: 'Profesionales cerca de ti' },
  all_provs_lnk: { ar: 'كل الصنايعية', en: 'All Pros', zh: '全部服务商', de: 'Alle Anbieter', ru: 'Все мастера', fr: 'Tous les pros', tr: 'Tüm Ustalar', es: 'Ver todos' },
  avail_tag: { ar: 'متاح', en: 'Available', zh: '可接单', de: 'Verfügbar', ru: 'Свободен', fr: 'Disponible', tr: 'Müsait', es: 'Disponible' },
  avail_now: { ar: 'متاح للشغل دلوقتي', en: 'Available now', zh: '当前可立即接单', de: 'Jetzt verfügbar', ru: 'Свободен сейчас', fr: 'Disponible maintenant', tr: 'Şu an işe müsait', es: 'Disponible ahora' },
  busy_now: { ar: 'مشغول حالياً', en: 'Busy right now', zh: '目前忙碌中', de: 'Gerade beschäftigt', ru: 'Сейчас занят', fr: 'Occupé', tr: 'Şu an meşgul', es: 'Ocupado ahora' },
  no_near_provs: { ar: 'لسه مفيش مقدمين خدمة مسجلين في منطقتك — لو إنت صاحب صنعة أو خدمة سجّل دلوقتي واظهر أول واحد!', en: 'No pros registered in your area yet — offer your service and be the first!', zh: '附近暂未入驻服务商 — 如果您提供相关服务，欢迎立即抢先入驻！', de: 'Noch keine Anbieter in deiner Region – registriere dich jetzt als Erster!', ru: 'Поблизости пока нет мастеров — станьте первым в своём районе!', fr: 'Aucun pro inscrit ici pour l’instant — soyez le premier !', tr: 'Bölgende henüz kayıtlı usta yok — ilk sen kayıt ol!', es: 'Aún no hay profesionales en tu zona — ¡sé el primero en registrarte!' },
  reg_pro_btn: { ar: 'سجّل كمقدم خدمة', en: 'Register as Pro', zh: '入驻服务商', de: 'Anbieter werden', ru: 'Стать мастером', fr: 'Devenir pro', tr: 'Hizmet Veren Ol', es: 'Registrarme como Pro' },
  latest_reqs_sec: { ar: 'أحدث الطلبات المتاحة حواليك', en: 'Latest Requests Near You', zh: '附近最新需求动态', de: 'Aktuelle Anfragen vor Ort', ru: 'Свежие заказы рядом', fr: 'Dernières demandes', tr: 'Yakındaki Son Talepler', es: 'Últimos pedidos cerca' },
  closest_to_u: { ar: 'الأقرب ليك', en: 'Closest', zh: '按距离优先', de: 'Nächste zuerst', ru: 'Ближайшие', fr: 'Plus proches', tr: 'En yakınlar', es: 'Más cercanos' },
  all_reqs_chip: { ar: 'كل الطلبات', en: 'All Requests', zh: '全部需求', de: 'Alle Anfragen', ru: 'Все заказы', fr: 'Toutes', tr: 'Tüm Talepler', es: 'Todos' },
  no_reqs_here: { ar: 'لسه مفيش طلبات منشورة هنا', en: 'No requests posted yet', zh: '这里还没有发布任何需求', de: 'Noch keine Anfragen hier', ru: 'Здесь пока нет заказов', fr: 'Aucune demande publiée ici', tr: 'Burada henüz talep yok', es: 'Aún no hay pedidos aquí' },
  be_first_req: { ar: 'كن أول واحد ينزّل طلبه وهيشوفه كل مقدمين الخدمة على وصلة لحظياً!', en: 'Be the first to post — nearby pros will see your request right away!', zh: '抢先发布第一条需求，周边所有服务商将立即收到通知！', de: 'Poste als Erster – alle Anbieter sehen deine Anfrage sofort!', ru: 'Станьте первым — все мастера вокруг увидят заказ моментально!', fr: 'Publiez le premier et soyez vu par tous les pros en direct !', tr: 'İlk talebi sen aç, çevredeki ustalar anında görsün!', es: 'Sé el primero en publicar y los pros cercanos lo verán al instante.' },
  post_first_req: { ar: 'نزّل أول طلب دلوقتي', en: 'Post First Request', zh: '立即发布首条需求', de: 'Erste Anfrage posten', ru: 'Разместить заказ', fr: 'Publier maintenant', tr: 'İlk Talebi Aç', es: 'Publicar primer pedido' },

  /* Request Cards & Statuses */
  st_new: { ar: 'جديد', en: 'New', zh: '新发布', de: 'Neu', ru: 'Новый', fr: 'Nouveau', tr: 'Yeni', es: 'Nuevo' },
  st_open: { ar: 'بيستقبل عروض', en: 'Accepting Offers', zh: '接受报价中', de: 'Offen', ru: 'Ждёт откликов', fr: 'Ouvert aux offres', tr: 'Tekliflere Açık', es: 'Recibiendo ofertas' },
  st_accepted: { ar: 'تم الاتفاق ✓', en: 'Agreed ✓', zh: '已达成合作 ✓', de: 'Vereinbart ✓', ru: 'Согласовано ✓', fr: 'Accord conclu ✓', tr: 'Anlaşıldı ✓', es: 'Acordado ✓' },
  st_completed: { ar: 'تم ومكتمل ✓', en: 'Completed ✓', zh: '已完成 ✓', de: 'Erledigt ✓', ru: 'Выполнено ✓', fr: 'Terminé ✓', tr: 'Tamamlandı ✓', es: 'Completado ✓' },
  st_cancelled: { ar: 'ملغي', en: 'Cancelled', zh: '已取消', de: 'Storniert', ru: 'Отменён', fr: 'Annulé', tr: 'İptal edildi', es: 'Cancelado' },
  need_urgent: { ar: 'مستعجل النهاردة', en: 'Urgent today', zh: '今天加急', de: 'Dringend heute', ru: 'Срочно сегодня', fr: 'Urgent aujourd’hui', tr: 'Bugün acil', es: 'Urgente hoy' },
  need_asap: { ar: 'في أقرب وقت', en: 'As soon as possible', zh: '尽快办理', de: 'So bald wie möglich', ru: 'Как можно скорее', fr: 'Dès que possible', tr: 'En kısa sürede', es: 'Lo antes posible' },
  need_days: { ar: 'خلال يومين تلاتة', en: 'Within 2–3 days', zh: '2-3天内', de: 'In 2–3 Tagen', ru: 'За 2–3 дня', fr: 'Sous 2–3 jours', tr: '2-3 gün içinde', es: 'En 2–3 días' },
  need_flex: { ar: 'وقتي مرن', en: 'Flexible timing', zh: '时间灵活', de: 'Zeitlich flexibel', ru: 'Свободный график', fr: 'Horaires flexibles', tr: 'Zaman esnek', es: 'Horario flexible' },
  bud_open: { ar: 'مفتوحة', en: 'Open', zh: '面议预算', de: 'Offen', ru: 'Договорная', fr: 'À négocier', tr: 'Açık bütçe', es: 'Abierto' },
  urgent_badge: { ar: '⚡ مستعجل', en: '⚡ Urgent', zh: '⚡ 加急', de: '⚡ Dringend', ru: '⚡ Срочно', fr: '⚡ Urgent', tr: '⚡ Acil', es: '⚡ Urgente' },
  offers_cnt: { ar: '{n} عروض', en: '{n} offers', zh: '{n} 个报价', de: '{n} Angebote', ru: '{n} предл.', fr: '{n} offres', tr: '{n} teklif', es: '{n} ofertas' },
  budget_lbl: { ar: 'الميزانية:', en: 'Budget:', zh: '预算：', de: 'Budget:', ru: 'Бюджет:', fr: 'Budget :', tr: 'Bütçe:', es: 'Presupuesto:' },
  your_req_tag: { ar: '(طلبك)', en: '(yours)', zh: '(你的)', de: '(deins)', ru: '(ваш)', fr: '(le vôtre)', tr: '(senin)', es: '(tuyo)' },
  mark_done_btn: { ar: 'تم ومكتمل ✓', en: 'Mark Done ✓', zh: '确认完成 ✓', de: 'Erledigt ✓', ru: 'Завершено ✓', fr: 'Terminer ✓', tr: 'Tamamlandı ✓', es: 'Completado ✓' },
  edit_btn: { ar: 'تعديل', en: 'Edit', zh: '编辑', de: 'Ändern', ru: 'Изменить', fr: 'Modifier', tr: 'Düzenle', es: 'Editar' },
  cancel_btn: { ar: 'إلغاء', en: 'Cancel', zh: '取消', de: 'Stornieren', ru: 'Отменить', fr: 'Annuler', tr: 'İptal', es: 'Cancelar' },
  reopen_btn: { ar: 'إعادة فتح', en: 'Reopen', zh: '重新开启', de: 'Neu öffnen', ru: 'Открыть снова', fr: 'Rouvrir', tr: 'Yeniden Aç', es: 'Reabrir' },
  del_btn: { ar: 'مسح', en: 'Delete', zh: '删除', de: 'Löschen', ru: 'Удалить', fr: 'Supprimer', tr: 'Sil', es: 'Eliminar' },
  del_forever_btn: { ar: 'مسح نهائي', en: 'Delete Permanently', zh: '永久删除', de: 'Endgültig löschen', ru: 'Удалить навсегда', fr: 'Supprimer définitivement', tr: 'Kalıcı Sil', es: 'Eliminar definitivo' },
  cancel_req_btn: { ar: 'إلغاء الطلب', en: 'Cancel Request', zh: '取消需求', de: 'Anfrage stornieren', ru: 'Отменить заказ', fr: 'Annuler', tr: 'Talebi İptal Et', es: 'Cancelar pedido' },
  reopen_req_btn: { ar: 'إعادة فتح الطلب', en: 'Reopen Request', zh: '重新上架需求', de: 'Anfrage reaktivieren', ru: 'Возобновить заказ', fr: 'Réouvrir la demande', tr: 'Talebi Yeniden Aç', es: 'Reabrir pedido' },
  details_btn: { ar: 'التفاصيل', en: 'Details', zh: '详情', de: 'Details', ru: 'Подробнее', fr: 'Détails', tr: 'Detaylar', es: 'Detalles' },
  msg_him_btn: { ar: 'راسله', en: 'Message', zh: '发消息', de: 'Schreiben', ru: 'Написать', fr: 'Contacter', tr: 'Mesaj At', es: 'Chatear' },
  sent_offer_btn: { ar: 'بعتّ عرضك ✓', en: 'Offer Sent ✓', zh: '已报价 ✓', de: 'Gesendet ✓', ru: 'Отправлено ✓', fr: 'Offre envoyée ✓', tr: 'Teklif İletildi ✓', es: 'Oferta enviada ✓' },
  send_offer_btn: { ar: 'قدّم عرض سعر', en: 'Send Quote', zh: '立即报价', de: 'Angebot senden', ru: 'Откликнуться', fr: 'Faire un devis', tr: 'Teklif Ver', es: 'Cotizar' },
  confirm_job_btn: { ar: 'أكّد إنهاء الشغل ✓', en: 'Confirm Job Done ✓', zh: '确认已完工 ✓', de: 'Abschluss bestätigen ✓', ru: 'Подтвердить выполнение ✓', fr: 'Confirmer fin ✓', tr: 'İşi Bitir ✓', es: 'Confirmar trabajo ✓' },

  /* Language Settings & Morph UI */
  lang_row_title: { ar: 'اللغة', en: 'Language', zh: '语言设置', de: 'Sprache', ru: 'Язык', fr: 'Langue', tr: 'Dil Seçimi', es: 'Idioma' },
  lang_row_sub: { ar: 'العربية (المصرية) و 7 لغات', en: 'US English + 7 languages', zh: '简体中文与多语言界面', de: 'Deutsch + 7 Sprachen', ru: 'Русский и ещё 7 языков', fr: 'Français + 7 langues', tr: 'Türkçe + 7 dil seçeneği', es: 'Español + 7 idiomas' },
  lang_modal_h2: { ar: 'تغيير لغة الواجهة', en: 'Choose Interface Language', zh: '选择界面语言', de: 'Sprache der App wählen', ru: 'Выберите язык интерфейса', fr: 'Changer la langue', tr: 'Arayüz Dilini Seç', es: 'Idioma de la interfaz' },
  lang_modal_sub: {
    ar: 'الواجهة كاملة بتتحوّل فوراً للّغة المختارة بمزامنة كاملة بدون التأثير على حسابك أو طلباتك.',
    en: 'The entire interface syncs smoothly into your selected language without affecting your data.',
    zh: '全站界面将完整切换至您选择的语言，个人数据、需求与聊天记录完全保留。',
    de: 'Die gesamte Oberfläche wechselt nahtlos in die gewählte Sprache – alle Daten bleiben erhalten.',
    ru: 'Весь интерфейс переключится на выбранный язык, все ваши заказы и чаты полностью сохранятся.',
    fr: 'Toute l’interface bascule dans la langue choisie sans rien perdre de vos données.',
    tr: 'Tüm arayüz hesap verilerini ve taleplerini koruyarak seçtiğin dile anında uyarlanır.',
    es: 'Toda la interfaz cambia al instante al idioma elegido sin alterar tus datos ni chats.'
  },
  lang_switching: { ar: 'جاري المزامنة وتجهيز الواجهة...', en: 'Syncing interface language...', zh: '正在同步并切换界面...', de: 'Oberfläche wird synchronisiert...', ru: 'Синхронизация интерфейса...', fr: 'Synchronisation de l’interface...', tr: 'Arayüz senkronize ediliyor...', es: 'Sincronizando idioma...' },

  /* More Page */
  share_app_row: { ar: 'مشاركة تطبيق وصلة', en: 'Share Wasla App', zh: '分享 Wasla 应用', de: 'Wasla-App teilen', ru: 'Поделиться Wasla', fr: 'Partager Wasla', tr: 'Wasla Uygulamasını Paylaş', es: 'Compartir Wasla' },
  logout_row: { ar: 'تسجيل الخروج', en: 'Sign Out', zh: '退出登录', de: 'Abmelden', ru: 'Выйти из аккаунта', fr: 'Se déconnecter', tr: 'Çıkış Yap', es: 'Cerrar sesión' },
  login_row: { ar: 'سجّل دخولك بحساب جوجل', en: 'Sign in with Google', zh: '使用 Google 登录', de: 'Mit Google anmelden', ru: 'Войти через Google', fr: 'Se connecter avec Google', tr: 'Google ile Giriş Yap', es: 'Iniciar sesión con Google' },

  /* Chat & Composer */
  cm_edit_ph: { ar: 'عدّل رسالتك...', en: 'Edit your message...', zh: '编辑你的消息...', de: 'Nachricht bearbeiten...', ru: 'Измените сообщение...', fr: 'Modifiez votre message...', tr: 'Mesajını düzenle...', es: 'Edita tu mensaje...' },
  cm_msg_ph: { ar: 'اكتب رسالة...', en: 'Message...', zh: '发消息...', de: 'Nachricht schreiben...', ru: 'Сообщение...', fr: 'Écrire un message...', tr: 'Mesaj yaz...', es: 'Escribe un mensaje...' },
  cm_minimize: { ar: 'تصغير', en: 'Minimize', zh: '收起', de: 'Verkleinern', ru: 'Свернуть', fr: 'Réduire', tr: 'Küçült', es: 'Minimizar' },
  cm_expand_aria: { ar: 'توسيع مساحة الكتابة', en: 'Expand composer', zh: '展开输入框', de: 'Eingabe vergrößern', ru: 'Развернуть поле ввода', fr: 'Agrandir la saisie', tr: 'Yazma alanını büyüt', es: 'Expandir editor' },
  cm_words_fmt: { ar: '{w} كلمة · {c}/{m}', en: '{w} words · {c}/{m}', zh: '{w} 词 · {c}/{m}', de: '{w} Wörter · {c}/{m}', ru: '{w} слов · {c}/{m}', fr: '{w} mots · {c}/{m}', tr: '{w} kelime · {c}/{m}', es: '{w} palabras · {c}/{m}' },
  cm_words_init: { ar: '0 كلمة', en: '0 words', zh: '0 字', de: '0 Wörter', ru: '0 слов', fr: '0 mot', tr: '0 kelime', es: '0 palabras' },
  cm_attach: { ar: 'إرفاق صورة أو موقع', en: 'Attach photo or location', zh: '添加图片或位置', de: 'Foto oder Standort anhängen', ru: 'Фото или геолокация', fr: 'Joindre photo ou lieu', tr: 'Fotoğraf veya konum ekle', es: 'Adjuntar foto o ubicación' },
  cm_send_title: { ar: 'إرسال الرسالة', en: 'Send message', zh: '发送消息', de: 'Nachricht senden', ru: 'Отправить', fr: 'Envoyer', tr: 'Mesajı gönder', es: 'Enviar mensaje' },
  cm_mic_title: { ar: 'تسجيل رسالة صوتية', en: 'Record voice message', zh: '录制语音消息', de: 'Sprachnachricht aufnehmen', ru: 'Голосовое сообщение', fr: 'Message vocal', tr: 'Sesli mesaj kaydet', es: 'Grabar nota de voz' },
  cm_rec_title: { ar: 'جاري الاستماع.. اضغط للإيقاف', en: 'Listening… tap to stop', zh: '正在听写…点击停止', de: 'Höre zu… tippen zum Stoppen', ru: 'Слушаю… нажмите для стопа', fr: 'Écoute… appuyer pour arrêter', tr: 'Dinleniyor… durdurmak için dokun', es: 'Escuchando… toca para parar' },
  msg_read_more: { ar: 'أظهر النص الكامل', en: 'Show full message', zh: '展开全文', de: 'Volltext anzeigen', ru: 'Показать полностью', fr: 'Afficher tout', tr: 'Tamamını göster', es: 'Ver completo' },
  msg_read_less: { ar: 'طيّ النص', en: 'Collapse text', zh: '收起长文', de: 'Einklappen', ru: 'Свернуть текст', fr: 'Réduire', tr: 'Metni daralt', es: 'Contraer texto' },
  chat_start_hi: { ar: 'ابدأ المحادثة مع {name}', en: 'Start chatting with {name}', zh: '开始与 {name} 对话', de: 'Chat mit {name} starten', ru: 'Начните чат с {name}', fr: 'Discutez avec {name}', tr: '{name} ile sohbete başla', es: 'Inicia el chat con {name}' },
  chat_start_sub: { ar: 'اسأل براحتك على السعر والميعاد وابعت صور الشغل — وتقدر تضغط على اسمه فوق علشان تشوف صفحته ومعاملاته.', en: 'Ask freely about pricing, schedule, or work photos — tap their name above anytime to see their profile and reviews.', zh: '随时询问价格、档期或施工细节并发送图片；点击上方对方昵称可查看主页与历史评价。', de: 'Frage frei nach Preis, Termin und Arbeitsfotos – tippe oben auf den Namen für Bewertungen.', ru: 'Спросите про цену, сроки или фото работ — нажмите на имя сверху для просмотра профиля.', fr: 'Demandez tarifs, créneaux et photos — touchez le nom ci-dessus pour voir son profil.', tr: 'Fiyat, zaman ve iş örneklerini sorabilir; yukarıdaki isme basıp profilini görebilirsin.', es: 'Pregunta precio, horario o manda fotos — toca su nombre arriba para ver su perfil y reseñas.' },
  chat_search_ph: { ar: 'ابحث ذكياً (سعر، موقع، فويس، أو أي حرف)...', en: 'Smart search (price, location, voice, text)...', zh: '智能检索聊天内容（价格、定位、语音）...', de: 'Schlaue Suche (Preis, Ort, Sprache, Text)...', ru: 'Умный поиск (цена, место, голос, текст)...', fr: 'Recherche intelligente (prix, lieu, vocal)...', tr: 'Akıllı arama (fiyat, konum, sesli veya yazı)...', es: 'Búsqueda inteligente (precio, lugar, voz)...' },
  chat_profile_hint: { ar: 'صفحته ومعاملاته', en: 'View profile & deals', zh: '主页与交易记录', de: 'Profil & Aufträge', ru: 'Профиль и сделки', fr: 'Voir le profil', tr: 'Profil ve işlemler', es: 'Perfil y acuerdos' },
  chat_locked_sub: { ar: 'محمية بالرمز السري', en: 'Protected by passcode', zh: '受密码锁保护', de: 'Mit Code geschützt', ru: 'Защищено кодом', fr: 'Protégée par code', tr: 'Şifre ile korumalı', es: 'Protegido con PIN' },
  chat_locked_row: { ar: 'محادثة مقفولة', en: 'Locked chat', zh: '已加密对话', de: 'Gesperrter Chat', ru: 'Закрытый чат', fr: 'Discussion verrouillée', tr: 'Kilitli sohbet', es: 'Chat bloqueado' },
  chat_blocked_tag: { ar: 'محظور', en: 'Blocked', zh: '已拉黑', de: 'Blockiert', ru: 'Заблокирован', fr: 'Bloqué', tr: 'Engelli', es: 'Bloqueado' },
  chat_draft_tag: { ar: 'مسودة', en: 'Draft', zh: '草稿', de: 'Entwurf', ru: 'Черновик', fr: 'Brouillon', tr: 'Taslak', es: 'Borrador' },
  chat_you_blocked: { ar: 'انت حاظر {name}', en: 'You blocked {name}', zh: '你已拉黑 {name}', de: 'Du hast {name} blockiert', ru: 'Вы заблокировали {name}', fr: 'Vous avez bloqué {name}', tr: '{name} engellendi', es: 'Bloqueaste a {name}' },
  chat_unblock_btn: { ar: 'إلغاء الحظر', en: 'Unblock', zh: '解除拉黑', de: 'Entsperren', ru: 'Разблокировать', fr: 'Débloquer', tr: 'Engeli Kaldır', es: 'Desbloquear' },
  chat_blocked_other: { ar: 'مقدرتش تبعت رسائل في الدردشة دي', en: 'You can’t send messages in this chat', zh: '无法在此对话发送消息', de: 'Nachrichten nicht möglich', ru: 'Отправка сообщений недоступна', fr: 'Impossible d’envoyer des messages', tr: 'Bu sohbete mesaj gönderilemiyor', es: 'No puedes enviar mensajes aquí' },
  lock_show: { ar: 'إظهار', en: 'Show', zh: '显示', de: 'Zeigen', ru: 'Показать', fr: 'Afficher', tr: 'Göster', es: 'Mostrar' },
  lock_hide: { ar: 'إخفاء', en: 'Hide', zh: '隐藏', de: 'Ausblenden', ru: 'Скрыть', fr: 'Masquer', tr: 'Gizle', es: 'Ocultar' },
  lock_open: { ar: 'فتح', en: 'Unlock', zh: '解锁进入', de: 'Öffnen', ru: 'Открыть', fr: 'Déverrouiller', tr: 'Aç', es: 'Desbloquear' },
  empty_chats_h: { ar: 'لسه مفيش محادثات عندك', en: 'No conversations yet', zh: '暂无聊天记录', de: 'Noch keine Chats', ru: 'Пока нет чатов', fr: 'Aucune discussion', tr: 'Henüz sohbet yok', es: 'Aún no hay chats' },
  empty_chats_p: { ar: 'أول ما تراسل صاحب طلب أو مقدم خدمة حقيقي، هتلاقي كلامكم كله محفوظ هنا لحظة بلحظة.', en: 'Once you message a requester or local pro, all your chats stay synced right here in real time.', zh: '当您向需求方或服务商发起咨询时，全部实时消息都会自动保存在这里。', de: 'Sobald du Anbietern oder Kunden schreibst, erscheinen alle Chats hier in Echtzeit.', ru: 'Как только вы напишете мастеру или заказчику, переписка появится здесь.', fr: 'Dès que vous contactez un pro ou client, vos discussions s’affichent ici.', tr: 'Bir usta ya da talep sahibiyle görüştüğünde tüm sohbetin anlık olarak burada kalır.', es: 'Cuando hables con un cliente o profesional, tus chats se sincronizarán aquí en tiempo real.' },
  see_provs_btn: { ar: 'شوف مقدمين الخدمة', en: 'Browse Pros', zh: '浏览附近服务商', de: 'Anbieter ansehen', ru: 'Смотреть мастеров', fr: 'Voir les pros', tr: 'Ustalara Göz At', es: 'Ver profesionales' },

  /* Saved, Notifications, Account, Profile, Search, Reviews */
  saved_empty_h: { ar: 'مفيش طلبات محفوظة', en: 'No saved requests yet', zh: '暂无收藏需求', de: 'Keine Merkliste', ru: 'Нет сохранённого', fr: 'Aucun favori', tr: 'Kayıtlı talep yok', es: 'Sin guardados' },
  saved_empty_p: { ar: 'اضغط على علامة الحفظ على أي طلب علشان ترجعله بسهولة في أي وقت.', en: 'Bookmark any request to jump back to it whenever you need.', zh: '点击任意需求上的书签图标，方便以后随时查看。', de: 'Markiere Anfragen mit dem Lesezeichen, um sie schnell wiederzufinden.', ru: 'Нажмите на закладку у заказа, чтобы быстро вернуться к нему.', fr: 'Enregistrez n’importe quelle demande pour la retrouver facilement.', tr: 'İstediğin zaman dönmek için herhangi bir talebi kaydet.', es: 'Guarda cualquier pedido con el marcador para volver fácil.' },
  notif_empty_h: { ar: 'مفيش إشعارات جديدة', en: 'You’re all caught up', zh: '暂无新通知', de: 'Alles gelesen', ru: 'Новых уведомлений нет', fr: 'Aucune notification', tr: 'Yeni bildirim yok', es: 'Sin notificaciones nuevas' },
  notif_empty_p: { ar: 'أول ما يجيلك عرض سعر أو رسالة أو تقييم جديد هيظهرلك هنا فوراً.', en: 'New quotes, messages, and verified reviews will show up here instantly.', zh: '有新的报价、消息或真实评价时，将第一时间在这里提醒您。', de: 'Neue Angebote, Nachrichten und Bewertungen erscheinen hier sofort.', ru: 'Новые отклики, сообщения и отзывы сразу появятся здесь.', fr: 'Devis, messages et nouveaux avis apparaîtront ici instantanément.', tr: 'Yeni teklif, mesaj veya değerlendirme geldiğinde anında burada görünür.', es: 'Nuevas ofertas, mensajes y reseñas aparecerán aquí al instante.' },
  acc_reqs: { ar: 'طلباتي', en: 'Requests', zh: '我的需求', de: 'Anfragen', ru: 'Заказы', fr: 'Demandes', tr: 'Talepler', es: 'Pedidos' },
  acc_rate: { ar: 'تقييمي', en: 'Rating', zh: '我的评分', de: 'Bewertung', ru: 'Рейтинг', fr: 'Note', tr: 'Puan', es: 'Calificación' },
  acc_chats: { ar: 'محادثاتي', en: 'Chats', zh: '我的对话', de: 'Chats', ru: 'Чаты', fr: 'Chats', tr: 'Sohbet', es: 'Chats' },
  new_badge: { ar: 'جديد', en: 'New', zh: '新入驻', de: 'Neu', ru: 'Новичок', fr: 'Nouveau', tr: 'Yeni', es: 'Nuevo' },
  acc_av_sec: { ar: 'اختار أفاتار خاص بيك أو ارفع صورتك', en: 'Pick an Avatar or Upload Your Photo', zh: '选择头像或上传真实照片', de: 'Avatar wählen oder Foto hochladen', ru: 'Выберите аватар или фото', fr: 'Avatar ou photo perso', tr: 'Avatar Seç veya Fotoğraf Yükle', es: 'Elige tu avatar o sube tu foto' },
  acc_upload: { ar: 'رفع صورة حقيقية', en: 'Upload Photo', zh: '上传照片', de: 'Foto hochladen', ru: 'Загрузить фото', fr: 'Importer une photo', tr: 'Fotoğraf Yükle', es: 'Subir foto' },
  acc_info_sec: { ar: 'بيانات الحساب', en: 'Account Details', zh: '账号信息', de: 'Kontodaten', ru: 'Данные аккаунта', fr: 'Infos du compte', tr: 'Hesap Bilgileri', es: 'Datos de cuenta' },
  acc_phone: { ar: 'رقم الموبايل', en: 'Mobile Number', zh: '手机号码', de: 'Mobilnummer', ru: 'Телефон', fr: 'Téléphone', tr: 'Telefon', es: 'Celular' },
  acc_loc: { ar: 'المحافظة والمدينة', en: 'Location', zh: '所在地区', de: 'Standort', ru: 'Город и регион', fr: 'Localisation', tr: 'Konum', es: 'Ubicación' },
  acc_role: { ar: 'حالة تقديم الخدمات', en: 'Pro Status', zh: '服务商认证状态', de: 'Anbieter-Status', ru: 'Статус мастера', fr: 'Statut Pro', tr: 'Hizmet Durumu', es: 'Estado Pro' },
  acc_ctrl_sec: { ar: 'التحكم السريع', en: 'Quick Actions', zh: '快捷管理', de: 'Schnellzugriff', ru: 'Быстрые действия', fr: 'Raccourcis', tr: 'Hızlı Kontrol', es: 'Acciones rápidas' },
  acc_edit_row: { ar: 'تعديل بياناتي', en: 'Edit My Details', zh: '修改个人资料', de: 'Daten bearbeiten', ru: 'Редактировать', fr: 'Modifier mes infos', tr: 'Bilgilerimi Düzenle', es: 'Editar mis datos' },
  acc_name_ph_addr: { ar: 'الاسم والموبايل والعنوان', en: 'Name, mobile & address', zh: '姓名、电话与地址', de: 'Name, Telefon & Adresse', ru: 'Имя, телефон и адрес', fr: 'Nom, mobile et adresse', tr: 'Ad, telefon ve adres', es: 'Nombre, celular y dirección' },
  edit_modal_h2: { ar: 'تعديل بياناتي', en: 'Edit Profile Info', zh: '编辑个人资料', de: 'Profildaten bearbeiten', ru: 'Изменить профиль', fr: 'Modifier mes informations', tr: 'Bilgilerimi Düzenle', es: 'Editar mis datos' },
  first_nm: { ar: 'الاسم الأول', en: 'First Name', zh: '名字', de: 'Vorname', ru: 'Имя', fr: 'Prénom', tr: 'Ad', es: 'Nombre' },
  second_nm: { ar: 'الاسم التاني', en: 'Middle Name', zh: '中间名', de: 'Zweitname', ru: 'Отчество', fr: 'Deuxième prénom', tr: 'İkinci Ad', es: 'Segundo nombre' },
  last_nm: { ar: 'اللقب', en: 'Last Name', zh: '姓氏', de: 'Nachname', ru: 'Фамилия', fr: 'Nom', tr: 'Soyad', es: 'Apellido' },
  save_changes: { ar: 'حفظ التعديلات', en: 'Save Changes', zh: '保存修改', de: 'Speichern', ru: 'Сохранить', fr: 'Enregistrer', tr: 'Değişiklikleri Kaydet', es: 'Guardar cambios' },
  logout_h2: { ar: 'تسجيل الخروج', en: 'Sign Out', zh: '退出账号', de: 'Abmelden', ru: 'Выйти?', fr: 'Déconnexion', tr: 'Çıkış Yap', es: 'Cerrar sesión' },
  logout_p: { ar: 'تحب تخرج من حسابك دلوقتي؟', en: 'Ready to sign out of your account?', zh: '确定现在退出当前账号吗？', de: 'Möchtest du dich jetzt abmelden?', ru: 'Выйти из вашего аккаунта сейчас?', fr: 'Voulez-vous vous déconnecter ?', tr: 'Hesabından çıkış yapmak istiyor musun?', es: '¿Seguro que quieres cerrar sesión?' },
  logout_go: { ar: 'تأكيد الخروج', en: 'Sign Out', zh: '确认退出', de: 'Abmelden', ru: 'Выйти', fr: 'Confirmer', tr: 'Çıkış Yap', es: 'Confirmar' },

  /* Verified Reviews */
  rev_sec_h: { ar: 'التقييمات وآراء العملاء الموثّقة', en: 'Verified Ratings & Customer Reviews', zh: '真实成交评价与口碑', de: 'Verifizierte Bewertungen', ru: 'Проверенные отзывы', fr: 'Avis clients vérifiés', tr: 'Onaylı Değerlendirme ve Yorumlar', es: 'Calificaciones y reseñas verificadas' },
  rev_cnt_fmt: { ar: '{n} تقييم موثّق', en: '{n} verified reviews', zh: '{n} 条真实评价', de: '{n} verif. Bewertungen', ru: '{n} провер. отзывов', fr: '{n} avis vérifiés', tr: '{n} onaylı yorum', es: '{n} reseñas verificadas' },
  rev_first: { ar: 'لسه أول تقييم', en: 'Awaiting first review', zh: '期待首条评价', de: 'Erste Bewertung offen', ru: 'Пока без отзывов', fr: 'Premier avis à venir', tr: 'Henüz ilk yorum yok', es: 'Esperando primera reseña' },
  rev_me_b: { ar: 'دي صفحتك الشخصية العامة!', en: 'This is your public profile!', zh: '这是您的公开认证主页！', de: 'Dein öffentliches Profil!', ru: 'Это ваш публичный профиль!', fr: 'Votre page publique !', tr: 'Bu senin herkese açık profilin!', es: '¡Este es tu perfil público!' },
  rev_me_s: { ar: 'التقييمات هنا محمية وموثّقة — العملاء اللي نفّذتلهم خدمات فعلية بس هم اللي يقدروا يقيّموا شغلك.', en: 'Reviews here are tamper-proof — only customers with a real completed deal can rate you.', zh: '这里的评价受交易核验保护，仅真实完成服务的客户可为您打分。', de: 'Bewertungen sind geschützt – nur echte Kunden mit abgeschlossenem Auftrag dürfen bewerten.', ru: 'Отзывы защищены — оценить вас могут только реальные клиенты после сделки.', fr: 'Les avis sont protégés — seuls vos vrais clients peuvent noter.', tr: 'Yorumlar koruma altında — sadece gerçekten hizmet verdiğin müşteriler puan verebilir.', es: 'Tus reseñas están protegidas — solo clientes con un trato real pueden calificarte.' },
  rev_copy_link: { ar: 'انسخ رابط صفحتي', en: 'Copy Profile Link', zh: '复制主页链接', de: 'Profil-Link kopieren', ru: 'Копировать ссылку', fr: 'Copier le lien', tr: 'Profil Linkini Kopyala', es: 'Copiar mi enlace' },
  rev_verified_pill: { ar: 'خدمة منفّذة ✓', en: 'Verified Deal ✓', zh: '已核实成交 ✓', de: 'Verifiziert ✓', ru: 'Сделка подтверждена ✓', fr: 'Service vérifié ✓', tr: 'Onaylı Hizmet ✓', es: 'Servicio verificado ✓' },
  rev_write_title: { ar: 'استلمت الخدمة؟ اكتب تقييمك الموثّق', en: 'Job completed? Write your verified review', zh: '服务已完成？写下您的真实评价', de: 'Service erhalten? Bewertung abgeben', ru: 'Заказ выполнен? Оставьте отзыв', fr: 'Service terminé ? Notez la prestation', tr: 'Hizmeti aldın mı? Onaylı yorumunu yaz', es: '¿Recibiste el servicio? Deja tu reseña' },
  rev_edit_title: { ar: 'عدّل تقييمك للخدمة اللي استلمتها', en: 'Update your verified review', zh: '修改您的真实评价', de: 'Bewertung aktualisieren', ru: 'Измените свой отзыв', fr: 'Modifiez votre avis', tr: 'Yorumunu güncelle', es: 'Edita tu reseña verificada' },
  rev_voice_tip: { ar: 'تقدر تكتب بإيدك أو تدوس ع المايك وتتكلم', en: 'Type or tap the mic to dictate', zh: '可打字或点击麦克风语音输入', de: 'Tippen oder per Mikrofon einsprechen', ru: 'Пишите или надиктуйте голосом', fr: 'Tapez ou dictez au micro', tr: 'Yazabilir ya da mikrofona konuşabilirsin', es: 'Escribe o usa el micrófono para dictar' },
  rev_ph: { ar: 'احكي تجربتك بصراحة في الشغل والمواعيد والمعاملة.. أو دوس على زرار الصوت واتكلم وهيكتب لوحده!', en: 'Share honest feedback on workmanship, timing, and attitude — or dictate with voice!', zh: '如实分享施工质量、准时度与沟通体验……也可直接语音输入！', de: 'Beschreibe Arbeit, Pünktlichkeit & Umgang ehrlich – oder nutze das Mikrofon!', ru: 'Опишите качество, пунктуальность и общение — или продиктуйте голосом!', fr: 'Partagez votre expérience (qualité, ponctualité) — ou dictez à voix haute !', tr: 'İşçilik, dakiklik ve iletişim hakkında deneyimlerini dürüstçe yaz…', es: 'Cuenta cómo estuvo el trabajo, puntualidad y trato — o dicta por voz.' },
  rev_post_btn: { ar: 'انشر التقييم دلوقتي ✓', en: 'Publish Review ✓', zh: '立即发布评价 ✓', de: 'Bewertung senden ✓', ru: 'Опубликовать ✓', fr: 'Publier l’avis ✓', tr: 'Yorumu Yayınla ✓', es: 'Publicar reseña ✓' },
  rev_upd_btn: { ar: 'تحديث تقييمي الموثّق ✓', en: 'Update Review ✓', zh: '更新我的评价 ✓', de: 'Aktualisieren ✓', ru: 'Обновить отзыв ✓', fr: 'Mettre à jour ✓', tr: 'Yorumu Güncelle ✓', es: 'Actualizar reseña ✓' },
  rev_del_btn: { ar: 'مسح تقييمي', en: 'Delete My Review', zh: '删除评价', de: 'Löschen', ru: 'Удалить отзыв', fr: 'Supprimer mon avis', tr: 'Yorumumu Sil', es: 'Borrar mi reseña' },
  rev_empty_h: { ar: 'لسه مفيش تقييمات موثّقة لـ {name}', en: 'No verified reviews for {name} yet', zh: '{name} 暂无已核实评价', de: 'Noch keine Bewertungen für {name}', ru: 'Пока нет отзывов для {name}', fr: 'Aucun avis pour {name} encore', tr: '{name} için henüz onaylı yorum yok', es: 'Aún no hay reseñas para {name}' },

  /* Radar & Estimator & Command Hub */
  radar_h2: { ar: 'رادار وصلة المباشر', en: 'Wasla Live Radar', zh: 'Wasla 实时周边雷达', de: 'Wasla Live-Radar', ru: 'Живой радар Wasla', fr: 'Radar Wasla en direct', tr: 'Wasla Canlı Radar', es: 'Radar Wasla en vivo' },
  radar_sub: { ar: 'أقرب الطلبات المتاحة وأقرب مقدمي الخدمة المتصلين حواليك دلوقتي.', en: 'Closest open requests and online pros around you right now.', zh: '实时展示您周边最近的待接需求与在线专业人员。', de: 'Die nächsten offenen Anfragen und aktive Profis in deiner Umgebung.', ru: 'Ближайшие открытые заказы и доступные мастера вокруг вас.', fr: 'Demandes ouvertes et pros en ligne au plus près de vous.', tr: 'Çevrendeki en yakın açık talepler ve aktif ustalar.', es: 'Pedidos abiertos y profesionales cercanos ahora mismo.' },
  radar_r_sec: { ar: 'طلبات قريبة متاحة ({n})', en: 'Open Requests Nearby ({n})', zh: '附近可接需求 ({n})', de: 'Offene Anfragen ({n})', ru: 'Заказы рядом ({n})', fr: 'Demandes proches ({n})', tr: 'Yakındaki Açık Talepler ({n})', es: 'Pedidos cercanos ({n})' },
  radar_p_sec: { ar: 'مقدمو خدمة متاحون الآن ({n})', en: 'Pros Available Now ({n})', zh: '当前可约服务商 ({n})', de: 'Verfügbare Anbieter ({n})', ru: 'Свободные мастера ({n})', fr: 'Pros disponibles ({n})', tr: 'Şu An Müsait Ustalar ({n})', es: 'Profesionales disponibles ({n})' },
  est_h2: { ar: 'حاسبة أسعار الخدمات الذكية', en: 'Smart Service Price Estimator', zh: '智能服务价格估算器', de: 'Smarter Preisrechner', ru: 'Умный калькулятор цен', fr: 'Estimateur de tarifs intelligent', tr: 'Akıllı Hizmet Fiyat Hesaplayıcı', es: 'Calculadora inteligente de precios' },
  est_sub: { ar: 'اضبط السعر التقديري وشوف توزيع المصنعية والخامات لحظياً:', en: 'Slide to adjust your budget estimate and see labor vs. materials live:', zh: '拖动滑块查看预算范围，并实时拆分人工费与材料费比例：', de: 'Budget anpassen und Arbeits-/Materialanteil sofort sehen:', ru: 'Настройте смету ползунком — расчёт работы и материалов сразу:', fr: 'Ajustez le budget et voyez main-d’œuvre vs matériaux en direct :', tr: 'Tahmini fiyatı ayarla; işçilik ve malzeme dağılımını anında gör:', es: 'Ajusta el estimado y mira al instante mano de obra y materiales:' },
  est_labor: { ar: 'مصنعية (~72%):', en: 'Labor (~72%):', zh: '人工费 (~72%)：', de: 'Arbeit (~72%):', ru: 'Работа (~72%):', fr: 'Main-d’œuvre (~72%) :', tr: 'İşçilik (%72):', es: 'Mano de obra (~72%):' },
  est_mats: { ar: 'خامات ومستهلكات (~28%):', en: 'Materials (~28%):', zh: '辅料耗材 (~28%)：', de: 'Material (~28%):', ru: 'Материалы (~28%):', fr: 'Matériaux (~28%) :', tr: 'Malzeme (%28):', es: 'Materiales (~28%):' },
  est_use_pre: { ar: 'استخدم (', en: 'Use (', zh: '使用预算 (', de: 'Nutzen (', ru: 'Взять (', fr: 'Utiliser (', tr: 'Kullan (', es: 'Usar (' },
  est_use_post: { ar: ' ج.م) في طلب جديد', en: ' EGP) in a new request', zh: ' 埃及镑) 发布新需求', de: ' EGP) in neuer Anfrage', ru: ' EGP) в заказе', fr: ' EGP) dans une demande', tr: ' EGP) ile talep aç', es: ' EGP) en pedido nuevo' },
  cmd_ph: { ar: 'انتقال سريع: قسم، أداة، طلب، صنايعي...', en: 'Quick jump: page, tool, request, pro...', zh: '快速跳转：版块、工具、需求、师傅…', de: 'Schnellzugriff: Bereich, Tool, Anfrage, Profi...', ru: 'Быстрый переход: раздел, инструмент, заказ...', fr: 'Accès rapide : page, outil, demande, pro...', tr: 'Hızlı geçiş: bölüm, araç, talep, usta...', es: 'Ir rápido: sección, herramienta, pedido, pro...' },
  cmd_tools: { ar: 'أدوات سريعة', en: 'Quick Tools', zh: '快捷工具', de: 'Schnell-Tools', ru: 'Инструменты', fr: 'Outils rapides', tr: 'Hızlı Araçlar', es: 'Herramientas' },
  cmd_secs: { ar: 'الأقسام', en: 'Sections', zh: '功能版块', de: 'Bereiche', ru: 'Разделы', fr: 'Sections', tr: 'Bölümler', es: 'Secciones' },
  cmd_go: { ar: 'انتقال', en: 'Open', zh: '打开', de: 'Öffnen', ru: 'Перейти', fr: 'Ouvrir', tr: 'Git', es: 'Ir' },

  /* Share sheet */
  share_h: { ar: 'مشاركة', en: 'Share', zh: '分享', de: 'Teilen', ru: 'Поделиться', fr: 'Partager', tr: 'Paylaş', es: 'Compartir' },
  copy_btn: { ar: 'نسخ', en: 'Copy', zh: '复制', de: 'Kopieren', ru: 'Копировать', fr: 'Copier', tr: 'Kopyala', es: 'Copiar' },
  share_in_app: { ar: 'ابعت مباشرة جوه وصلة', en: 'Send inside Wasla', zh: '在 Wasla 内直接发送', de: 'Direkt in Wasla senden', ru: 'Отправить в Wasla', fr: 'Envoyer dans Wasla', tr: 'Wasla içinde gönder', es: 'Enviar dentro de Wasla' },

  /* PWA banner & Post Request Form */
  pwa_t: { ar: 'ثبّت تطبيق وصلة', en: 'Install Wasla App', zh: '安装 Wasla 应用', de: 'Wasla installieren', ru: 'Установить Wasla', fr: 'Installer Wasla', tr: 'Wasla Uygulamasını Yükle', es: 'Instalar Wasla' },
  pwa_s: { ar: 'نزّله كـ تطبيق على جهازك', en: 'Add directly to your home screen', zh: '添加到桌面像原生应用一样运行', de: 'Als App auf dein Gerät laden', ru: 'Установите как приложение', fr: 'Ajouter sur votre appareil', tr: 'Cihazına uygulama gibi kur', es: 'Instálala como app en tu dispositivo' },
  pwa_go: { ar: 'تثبيت', en: 'Install', zh: '安装', de: 'Installieren', ru: 'Установить', fr: 'Installer', tr: 'Yükle', es: 'Instalar' },
  post_submit: { ar: 'انشر الطلب دلوقتي', en: 'Post Request Now', zh: '立即发布需求', de: 'Jetzt veröffentlichen', ru: 'Опубликовать заказ', fr: 'Publier maintenant', tr: 'Talebi Şimdi Yayınla', es: 'Publicar ahora' },
  assist_title: { ar: 'مساعد وصلة السريع', en: 'Wasla Smart Helper', zh: 'Wasla 快捷助手', de: 'Wasla Schnell-Assistent', ru: 'Помощник Wasla', fr: 'Assistant rapide Wasla', tr: 'Wasla Hızlı Yardımcı', es: 'Asistente rápido Wasla' },
  assist_sub: { ar: 'اكتب بس إنت محتاج إيه في العنوان ودوس «اقترح لي»، وهنختارلك القسم ونجهزلك وصف مظبوط.', en: 'Enter your short title and tap Auto-Fill — we’ll pick the right category and draft clear details.', zh: '只需输入需求标题并点击“自动填充”，系统将自动匹配分类并生成清晰描述。', de: 'Titel eingeben und auf Vorschlagen tippen – Kategorie & Text werden vorbereitet.', ru: 'Напишите заголовок и нажмите «Подобрать» — выберем категорию и описание.', fr: 'Tapez le titre puis « Suggérer » pour préremplir la catégorie et les détails.', tr: 'Sadece başlığı yazıp «Öner» butonuna bas; kategoriyi ve açıklamayı hazırlayalım.', es: 'Escribe el título y pulsa «Sugerir» para elegir categoría y redactar detalles.' },
  assist_btn: { ar: 'اقترح لي التخصص والوصف', en: 'Auto-Fill Category & Details', zh: '自动填充分类与描述', de: 'Kategorie & Text vorschlagen', ru: 'Подобрать раздел и текст', fr: 'Suggérer catégorie et détails', tr: 'Kategori ve Açıklama Öner', es: 'Sugerir categoría y detalles' },

  /* Onboarding step 2 & Gate */
  s1_title: { ar: 'كمّل تسجيل حسابك', en: 'Finish Account Setup', zh: '完善账号资料', de: 'Konto einrichten', ru: 'Настройка профиля', fr: 'Finaliser votre compte', tr: 'Hesap Kurulumunu Tamamla', es: 'Completa tu registro' },
  s1_h2: { ar: 'عرّفنا بيك علشان نبدأ', en: 'Tell us about yourself to start', zh: '简单介绍自己即可开始', de: 'Erzähl kurz über dich', ru: 'Представьтесь для старта', fr: 'Présentez-vous pour commencer', tr: 'Başlamak için kendini tanıt', es: 'Cuéntanos sobre ti para iniciar' },
  s1_sub: { ar: 'البيانات دي بتتطلب أول مرة بتسجّل فيها بس، والموقع هيتحدّث تلقائي كل أسبوع.', en: 'Only needed on first sign-up — your location refreshes weekly automatically.', zh: '仅首次注册需填写，定位将每周自动更新一次。', de: 'Nur bei der Erstanmeldung nötig – Standort aktualisiert sich wöchentlich.', ru: 'Нужно только при первом входе — геопозиция обновляется сама.', fr: 'Requis uniquement la 1re fois — position actualisée chaque semaine.', tr: 'Sadece ilk kayıtta gerekir; konumun haftalık otomatik güncellenir.', es: 'Solo se pide la primera vez; tu ubicación se actualiza semanalmente.' },
  s1_go: { ar: 'سجّل وادخل على وصلة', en: 'Save & Enter Wasla', zh: '完成并进入 Wasla', de: 'Speichern & Starten', ru: 'Сохранить и войти', fr: 'Valider et entrer', tr: 'Kaydet ve Wasla’ya Gir', es: 'Guardar y entrar a Wasla' },
  gate_complete: { ar: 'كمّل بيانات التسجيل', en: 'Complete Setup', zh: '完善资料', de: 'Profil abschließen', ru: 'Завершить вход', fr: 'Finaliser le profil', tr: 'Kaydı Tamamla', es: 'Completar registro' },
  gate_google: { ar: 'سجّل بحساب جوجل', en: 'Sign in with Google', zh: '使用 Google 登录', de: 'Mit Google anmelden', ru: 'Войти через Google', fr: 'Se connecter avec Google', tr: 'Google ile Giriş Yap', es: 'Iniciar con Google' },

  /* Nearby Requests, My Requests, Pros, Profile, Search, Forms & Modals */
  near_pro_banner_b: { ar: 'عايز تقدّم عروض على الطلبات دي؟', en: 'Want to send quotes on these requests?', zh: '想为这些需求报价接单？', de: 'Möchtest du Angebote senden?', ru: 'Хотите откликаться на заказы?', fr: 'Envie de répondre à ces demandes ?', tr: 'Bu taleplere teklif vermek ister misin?', es: '¿Quieres cotizar en estos pedidos?' },
  near_pro_banner_s: { ar: 'لازم تكون مسجّل كمقدم خدمة الأول.', en: 'Set up your Pro profile first.', zh: '请先注册成为认证服务商。', de: 'Registriere dich zuerst als Anbieter.', ru: 'Сначала активируйте профиль мастера.', fr: 'Créez d’abord votre profil Pro.', tr: 'Önce hizmet veren kaydını tamamlamalısın.', es: 'Primero regístrate como Profesional.' },
  near_empty_h: { ar: 'مفيش طلبات مطابقة للفلتر ده', en: 'No requests match this filter', zh: '暂无符合该筛选条件的需求', de: 'Keine passenden Anfragen', ru: 'Нет заказов по этому фильтру', fr: 'Aucune demande correspondante', tr: 'Bu filtreye uygun talep yok', es: 'No hay pedidos con este filtro' },
  near_empty_p: { ar: 'جرّب تختار كل المحافظات أو انشر طلبك لو محتاج خدمة.', en: 'Try showing all regions or post your own request.', zh: '尝试选择全部地区，或直接发布您的需求。', de: 'Versuche alle Regionen oder erstelle eine eigene Anfrage.', ru: 'Попробуйте выбрать все регионы или создайте свой заказ.', fr: 'Essayez toutes les zones ou publiez votre demande.', tr: 'Tüm şehirleri seçmeyi dene veya kendi talebini oluştur.', es: 'Prueba todas las zonas o publica tu propio pedido.' },
  clear_loc_filter: { ar: 'إلغاء فلتر المكان', en: 'Clear Location Filter', zh: '清除地区筛选', de: 'Ortsfilter aufheben', ru: 'Сбросить фильтр', fr: 'Effacer le filtre', tr: 'Konum Filtresini Temizle', es: 'Quitar filtro' },
  clear_filters: { ar: 'إلغاء الفلاتر', en: 'Reset Filters', zh: '重置全部筛选', de: 'Filter zurücksetzen', ru: 'Сбросить фильтры', fr: 'Réinitialiser', tr: 'Filtreleri Sıfırla', es: 'Limpiar filtros' },
  mine_all: { ar: 'الكل ({n})', en: 'All ({n})', zh: '全部 ({n})', de: 'Alle ({n})', ru: 'Все ({n})', fr: 'Toutes ({n})', tr: 'Tümü ({n})', es: 'Todos ({n})' },
  mine_active: { ar: 'نشطة', en: 'Active', zh: '进行中', de: 'Aktiv', ru: 'Активные', fr: 'Actives', tr: 'Aktif', es: 'Activos' },
  mine_agreed: { ar: 'بنتفق', en: 'Agreed', zh: '已协商', de: 'Vereinbart', ru: 'В работе', fr: 'Acceptées', tr: 'Anlaşıldı', es: 'Acordados' },
  mine_done: { ar: 'مكتملة', en: 'Done', zh: '已完成', de: 'Erledigt', ru: 'Завершённые', fr: 'Terminées', tr: 'Tamamlandı', es: 'Completados' },
  mine_cancelled: { ar: 'ملغية', en: 'Cancelled', zh: '已取消', de: 'Storniert', ru: 'Отменённые', fr: 'Annulées', tr: 'İptal', es: 'Cancelados' },
  mine_jobs: { ar: 'شغلاناتي ({n})', en: 'My Jobs ({n})', zh: '我的接单 ({n})', de: 'Meine Jobs ({n})', ru: 'Мои работы ({n})', fr: 'Mes missions ({n})', tr: 'İşlerim ({n})', es: 'Mis trabajos ({n})' },
  mine_new_btn: { ar: 'طلب جديد', en: 'New Request', zh: '新需求', de: 'Neue Anfrage', ru: 'Новый заказ', fr: 'Nouvelle', tr: 'Yeni Talep', es: 'Nuevo pedido' },
  mine_offers_hdr: { ar: 'العروض اللي وصلتلك ({vis} من {tot}):', en: 'Quotes Received ({vis} of {tot}):', zh: '收到的报价 ({vis}/{tot})：', de: 'Erhaltene Angebote ({vis} von {tot}):', ru: 'Отклики ({vis} из {tot}):', fr: 'Offres reçues ({vis} sur {tot}) :', tr: 'Gelen Teklifler ({vis}/{tot}):', es: 'Ofertas recibidas ({vis} de {tot}):' },
  compare_smart: { ar: 'مقارنة ذكية', en: 'Smart Compare', zh: '智能对比报价', de: 'Schlau vergleichen', ru: 'Сравнить', fr: 'Comparateur', tr: 'Akıllı Karşılaştır', es: 'Comparar ofertas' },
  lowest_price: { ar: 'أقل سعر', en: 'Best Price', zh: '最低报价', de: 'Bester Preis', ru: 'Лучшая цена', fr: 'Meilleur prix', tr: 'En Uygun Fiyat', es: 'Mejor precio' },
  top_rating: { ar: 'أعلى تقييم ★', en: 'Top Rated ★', zh: '最高评分 ★', de: 'Top bewertet ★', ru: 'Топ рейтинг ★', fr: 'Mieux noté ★', tr: 'En Yüksek Puan ★', es: 'Mejor calificado ★' },
  accept_offer: { ar: 'اقبل العرض', en: 'Accept Quote', zh: '采纳报价', de: 'Annehmen', ru: 'Принять', fr: 'Accepter', tr: 'Teklifi Kabul Et', es: 'Aceptar oferta' },
  reject_offer: { ar: 'رفض', en: 'Decline', zh: '谢绝', de: 'Ablehnen', ru: 'Отклонить', fr: 'Refuser', tr: 'Reddet', es: 'Rechazar' },
  offer_agreed_tag: { ar: 'اتفقنا معاه ✓', en: 'Agreed ✓', zh: '已达成一致 ✓', de: 'Einig ✓', ru: 'Договорились ✓', fr: 'Acceptée ✓', tr: 'Anlaşıldı ✓', es: 'Acordado ✓' },
  offer_rejected_tag: { ar: 'مرفوض', en: 'Declined', zh: '已婉拒', de: 'Abgelehnt', ru: 'Отклонено', fr: 'Refusée', tr: 'Reddedildi', es: 'Rechazada' },
  mine_empty_h1: { ar: 'مفيش طلبات في الحالة دي', en: 'No requests in this status', zh: '该状态下暂无需求', de: 'Keine Anfragen hier', ru: 'Нет заказов в этом статусе', fr: 'Aucune demande ici', tr: 'Bu durumda talep yok', es: 'Sin pedidos en este estado' },
  mine_empty_h0: { ar: 'لسه ما نزّلتش أي طلب', en: 'You haven’t posted any requests yet', zh: '您还没有发布任何需求', de: 'Noch keine Anfragen erstellt', ru: 'Вы ещё не создавали заказы', fr: 'Aucune demande publiée', tr: 'Henüz hiç talep açmadın', es: 'Aún no has publicado pedidos' },
  mine_empty_p: { ar: 'نزّل اللي محتاجه بالتفصيل والمكان، وهتقدر تعدّله أو تلغيه أو تمسحه في أي وقت.', en: 'Post what you need with location and details — edit, pause, or delete anytime.', zh: '填好详细要求与地址即可发布，之后可随时修改、取消或删除。', de: 'Beschreibe deinen Bedarf mit Ort – jederzeit bearbeitbar oder löschbar.', ru: 'Опишите задачу и адрес — заказ всегда можно изменить или удалить.', fr: 'Décrivez votre besoin et le lieu — modifiable ou supprimable à tout moment.', tr: 'İhtiyacını konum ve detaylarla paylaş — istediğin an düzenle veya iptal et.', es: 'Publica lo que necesitas con ubicación — edita o borra cuando quieras.' },
  pro_sort_note: { ar: 'مرتبين من الأقرب لمكانك — ادخل على صفحة أي مقدم خدمة وشوف التقييمات', en: 'Sorted closest to you — open any profile to inspect verified reviews', zh: '按距离从近到远排序 — 点击主页可查看真实客户评价', de: 'Nach Nähe sortiert – Profil öffnen für verifizierte Bewertungen', ru: 'Отсортированы по близости — откройте профиль для просмотра отзывов', fr: 'Triés par proximité — touchez un profil pour voir les avis', tr: 'Konumuna göre en yakından sıralandı — yorumlar için profili aç', es: 'Ordenados por cercanía — entra a un perfil para ver sus reseñas' },
  my_stat_avail: { ar: 'حالتي: متاح الآن', en: 'Status: Available', zh: '我的状态：可接单', de: 'Status: Verfügbar', ru: 'Статус: Свободен', fr: 'Statut : Dispo', tr: 'Durumum: Müsait', es: 'Estado: Disponible' },
  my_stat_busy: { ar: 'حالتي: مشغول', en: 'Status: Busy', zh: '我的状态：忙碌中', de: 'Status: Beschäftigt', ru: 'Статус: Занят', fr: 'Statut : Occupé', tr: 'Durumum: Meşgul', es: 'Estado: Ocupado' },
  my_page_revs: { ar: 'صفحتي وتقييماتي', en: 'My Profile & Reviews', zh: '我的主页与评价', de: 'Mein Profil & Bewertungen', ru: 'Мой профиль и отзывы', fr: 'Mon profil & avis', tr: 'Profilim ve Yorumlar', es: 'Mi perfil y reseñas' },
  edit_my_svc: { ar: 'تعديل خدمتي', en: 'Edit My Service', zh: '编辑服务资料', de: 'Service bearbeiten', ru: 'Изменить услугу', fr: 'Modifier mon service', tr: 'Hizmetimi Düzenle', es: 'Editar mi servicio' },
  plus_reg_pro: { ar: '+ سجّل كمقدم خدمة', en: '+ Become a Pro', zh: '+ 入驻成为服务商', de: '+ Anbieter werden', ru: '+ Стать мастером', fr: '+ Devenir Pro', tr: '+ Hizmet Veren Ol', es: '+ Registrarme como Pro' },
  pro_search_ph: { ar: 'دوّر باسم الصنايعي أو التخصص (أو دوس ع المايك واتكلم)...', en: 'Search pro by name or trade (or tap mic)...', zh: '搜索师傅姓名或工种（或点击麦克风语音）...', de: 'Nach Name oder Fachgebiet suchen...', ru: 'Поиск мастера по имени или профилю...', fr: 'Chercher un artisan ou métier...', tr: 'Usta adı veya uzmanlık ara...', es: 'Busca por nombre o especialidad...' },
  all_specs_chip: { ar: 'كل التخصصات', en: 'All Specialties', zh: '全部专业分类', de: 'Alle Fachgebiete', ru: 'Все специальности', fr: 'Toutes spécialités', tr: 'Tüm Uzmanlıklar', es: 'Todas las áreas' },
  pro_card_btn: { ar: 'الصفحة والمعاملات', en: 'Profile & Deals', zh: '主页与交易', de: 'Profil & Deals', ru: 'Профиль и сделки', fr: 'Profil & avis', tr: 'Profil ve İşlemler', es: 'Perfil y tratos' },
  pro_his_page: { ar: 'صفحته ومعاملاته', en: 'View Profile', zh: '查看主页', de: 'Profil ansehen', ru: 'Профиль', fr: 'Voir profil', tr: 'Profilini Gör', es: 'Ver perfil' },
  years_exp: { ar: '{n} سنين خبرة', en: '{n} yrs exp.', zh: '{n} 年经验', de: '{n} J. Erfahrung', ru: 'опыт {n} лет', fr: '{n} ans d’exp.', tr: '{n} yıl deneyim', es: '{n} años exp.' },
  trust_meter_h: { ar: 'مؤشر الثقة والأمان على وصلة', en: 'Wasla Trust & Safety Score', zh: 'Wasla 安全信誉指数', de: 'Wasla Vertrauens-Index', ru: 'Индекс доверия Wasla', fr: 'Indice de confiance Wasla', tr: 'Wasla Güven Endeksi', es: 'Índice de confianza Wasla' },
  trust_clean: { ar: 'سجل تعامل نظيف ✓', en: 'Clean track record ✓', zh: '良好信用记录 ✓', de: 'Saubere Bilanz ✓', ru: 'Безупречная история ✓', fr: 'Historique impeccable ✓', tr: 'Temiz işlem geçmişi ✓', es: 'Historial limpio ✓' },
  trust_deals_c: { ar: '{n} معاملات مكتملة', en: '{n} completed deals', zh: '{n} 笔已完成交易', de: '{n} abgeschlossene Aufträge', ru: '{n} завершённых сделок', fr: '{n} prestations réalisées', tr: '{n} tamamlanan işlem', es: '{n} tratos completados' },
  share_page_btn: { ar: 'مشاركة الصفحة', en: 'Share Profile', zh: '分享主页', de: 'Profil teilen', ru: 'Поделиться', fr: 'Partager profil', tr: 'Sayfayı Paylaş', es: 'Compartir perfil' },
  works_sec_h: { ar: 'صور من الشغل على الطبيعة', en: 'Real Work Portfolio', zh: '真实完工案例相册', de: 'Arbeitsproben-Galerie', ru: 'Фото выполненных работ', fr: 'Galerie de réalisations', tr: 'Gerçek İş Fotoğrafları', es: 'Fotos de trabajos reales' },
  add_work_btn: { ar: 'ضِف صورة من شغلك', en: 'Add Work Photo', zh: '添加完工案例图', de: 'Arbeitsfoto hinzufügen', ru: 'Добавить фото работ', fr: 'Ajouter une photo', tr: 'İş Fotoğrafı Ekle', es: 'Subir foto de trabajo' },
  bio_sec_h: { ar: 'نبذة عن الشغل والخدمة:', en: 'About Services:', zh: '个人手艺与服务简介：', de: 'Über meine Arbeit:', ru: 'О мастере и услугах:', fr: 'À propos du service :', tr: 'Hizmet Hakkında:', es: 'Sobre el servicio:' },
  warn_btn: { ar: 'علامة تحذير', en: 'Flag Account', zh: '举报风险警示', de: 'Melden', ru: 'Предупреждение', fr: 'Signaler', tr: 'Uyarı İşareti', es: 'Reportar alerta' },
  warn_done_btn: { ar: 'حطيت علامة تحذير ✓', en: 'Flagged ✓', zh: '已提交警示 ✓', de: 'Gemeldet ✓', ru: 'Жалоба отправлена ✓', fr: 'Signalé ✓', tr: 'Uyarı Eklendi ✓', es: 'Reportado ✓' },
  search_page_ph: { ar: 'دوّر على خدمة أو صنايعي أو طلب...', en: 'Search services, pros, or requests...', zh: '搜索本地服务、专业师傅或需求...', de: 'Suche Services, Profis oder Anfragen...', ru: 'Ищите услуги, мастеров или заказы...', fr: 'Chercher un service, un pro, une demande...', tr: 'Hizmet, usta veya talep ara...', es: 'Busca servicios, pros o pedidos...' },
  search_empty_tip: { ar: 'اكتب اللي بتدور عليه بالعامية عادي، زي «سباك في المنصورة» أو «نقل عفش».', en: 'Type naturally — like “plumber in Cairo” or “apartment move”.', zh: '像平时聊天一样输入即可，例如“开罗水电工”或“搬家”。', de: 'Einfach drauflosschreiben, z.B. „Klempner“ oder „Umzug“.', ru: 'Пишите как удобно, например «сантехник» или «переезд».', fr: 'Écrivez naturellement, ex. « plombier » ou « déménagement ».', tr: 'Doğal şekilde yaz: «tesisatçı» veya «ev taşıma» gibi.', es: 'Escribe natural, ej. «plomero» o «mudanza».' },
  search_no_res: { ar: 'ملقيناش نتايج مطابقة لـ «{q}»', en: 'No results found for “{q}”', zh: '未找到与 “{q}” 匹配的结果', de: 'Keine Treffer für „{q}“', ru: 'Ничего не найдено по запросу «{q}»', fr: 'Aucun résultat pour « {q} »', tr: '“{q}” için eşleşen sonuç yok', es: 'Sin resultados para «{q}»' },
  search_no_res_sub: { ar: 'نزّل طلبك باللي محتاجه وهيوصل للصنايعية ومقدمين الخدمة حواليك.', en: 'Post what you need and nearby pros will reach out fast.', zh: '直接发布您的需求，周边手艺人会第一时间看到并报价。', de: 'Stelle deine Anfrage ein – Profis in der Nähe melden sich sofort.', ru: 'Разместите заказ — свободные мастера рядом сразу откликнутся.', fr: 'Publiez votre besoin — les pros du coin vous répondront vite.', tr: 'İhtiyacını talep olarak aç, yakındaki ustalar hemen görsün.', es: 'Publica lo que necesitas y los pros cercanos responderán rápido.' },
  gate_req_title: { ar: 'طلباتك', en: 'My Requests', zh: '我的需求', de: 'Meine Anfragen', ru: 'Мои заказы', fr: 'Mes demandes', tr: 'Taleplerim', es: 'Mis pedidos' },
  gate_msg_sub: { ar: 'سجّل بحسابك الأول علشان تتكلم مع الصنايعية ومقدمين الخدمة وأصحاب الطلبات مباشرة.', en: 'Sign in first to message local pros and customers directly.', zh: '请先登录账号，即可随时与服务商和客户在线沟通。', de: 'Melde dich zuerst an, um direkt mit Profis und Kunden zu chatten.', ru: 'Войдите в аккаунт, чтобы переписываться с мастерами и заказчиками.', fr: 'Connectez-vous d’abord pour discuter avec les pros et clients.', tr: 'Ustalar ve müşterilerle doğrudan yazışmak için önce giriş yap.', es: 'Inicia sesión primero para chatear con clientes y profesionales.' },
  gate_notifs_sub: { ar: 'سجّل دخولك علشان تشوف تنبيهات العروض والرسائل والتقييمات الجديدة.', en: 'Sign in to get live alerts for quotes, messages, and verified reviews.', zh: '登录后即可实时查看最新报价、私信与成交评价提醒。', de: 'Melde dich an für Live-Meldungen zu Angeboten & Nachrichten.', ru: 'Войдите, чтобы видеть уведомления об откликах и сообщениях.', fr: 'Connectez-vous pour recevoir alertes de devis et messages.', tr: 'Teklif, mesaj ve değerlendirme bildirimleri için giriş yap.', es: 'Inicia sesión para ver alertas de ofertas y mensajes.' },
  gate_acc_sub: { ar: 'سجّل بحساب جوجل في ثواني علشان تظبّط ملفك الشخصي أو تفعّل حساب مقدم خدمة.', en: 'Sign in with Google in seconds to customize your profile or become a Pro.', zh: '几秒登录 Google 账号即可管理个人主页或入驻成为服务商。', de: 'In Sekunden mit Google anmelden für Profil oder Anbieter-Status.', ru: 'Войдите через Google за пару секунд, чтобы настроить профиль.', fr: 'Connectez-vous avec Google pour gérer votre profil.', tr: 'Profilini ayarlamak veya usta olmak için saniyeler içinde Google ile gir.', es: 'Inicia con Google en segundos para configurar tu perfil.' },
  gate_post_title: { ar: 'نزّل طلب جديد', en: 'Post a New Request', zh: '发布新需求', de: 'Neue Anfrage erstellen', ru: 'Создать заказ', fr: 'Nouvelle demande', tr: 'Yeni Talep Oluştur', es: 'Publicar pedido' },
  gate_post_sub: { ar: 'سجّل دخولك الأول علشان طلبك يتنشر على وصلة ويشوفه كل مقدمين الخدمة.', en: 'Sign in first so your request goes live to local pros on Wasla.', zh: '请先登录，您的需求即可立即推送到 Wasla 并展示给附近服务商。', de: 'Melde dich zuerst an, damit Anbieter deine Anfrage sehen können.', ru: 'Войдите сначала, чтобы заказ сразу стал виден всем мастерам.', fr: 'Connectez-vous d’abord pour publier votre demande sur Wasla.', tr: 'Talebinin tüm ustalara yayınlanması için önce giriş yap.', es: 'Inicia sesión primero para publicar tu pedido en Wasla.' },

  /* Post Request labels */
  post_title_lbl: { ar: 'محتاج إيه بالظبط؟ (عنوان الطلب)', en: 'What do you need done? (Title)', zh: '您需要什么服务？（需求标题）', de: 'Was genau wird benötigt? (Titel)', ru: 'Что нужно сделать? (Заголовок)', fr: 'De quoi avez-vous besoin ? (Titre)', tr: 'Tam olarak neye ihtiyacın var? (Başlık)', es: '¿Qué necesitas exactamente? (Título)' },
  post_title_ph: { ar: 'مثلاً: سباك يركّب خلاط ويصلّح تسريب في المطبخ', en: 'e.g. Plumber to install faucet and fix kitchen sink leak', zh: '例如：急找水工安装厨房水龙头并修漏水', de: 'z. B. Klempner für Mischbatterie und Leck in der Küche', ru: 'Например: сантехник поменять смеситель и устранить течь', fr: 'ex. Plombier pour poser un mitigeur et réparer une fuite', tr: 'Örn: Mutfak bataryası takıp sızıntıyı giderecek tesisatçı', es: 'Ej. Plomero para instalar llave y reparar fuga en cocina' },
  post_cat_lbl: { ar: 'القسم والتخصص', en: 'Category & Specialty', zh: '服务大类与细分工种', de: 'Kategorie & Fachgebiet', ru: 'Категория и специализация', fr: 'Catégorie & Spécialité', tr: 'Kategori ve Uzmanlık', es: 'Categoría y especialidad' },
  post_det_lbl: { ar: 'تفاصيل الطلب علشان العروض تيجي مظبوطة', en: 'Job Details (for accurate quotes)', zh: '详细说明（方便获得更精准的报价）', de: 'Details für genaue Angebote', ru: 'Детали заказа для точных цен', fr: 'Détails de la demande', tr: 'Doğru teklifler için talep detayları', es: 'Detalles para recibir mejores cotizaciones' },
  post_det_ph: { ar: 'اكتب التفاصيل، الدور أو المساحة، وأي حاجة محتاج الصنايعي يعرفها...', en: 'Describe the issue, floor/size, and anything the pro should know...', zh: '说明具体情况、楼层或面积，以及师傅上门需注意的细节…', de: 'Beschreibe Umfang, Etage/Größe und wichtige Hinweise...', ru: 'Опишите объём, этаж, площадь и важные нюансы...', fr: 'Précisez les détails, étage ou surface, infos utiles...', tr: 'Detayları, kat/alan bilgisini ve ustanın bilmesi gerekenleri yaz...', es: 'Describe el trabajo, piso, tamaño y datos importantes...' },
  post_imgs_lbl: { ar: 'صور توضّح المطلوب (اختياري — لحد 3 صور)', en: 'Reference Photos (Optional — up to 3)', zh: '参考现场照片（可选，最多 3 张）', de: 'Fotos zur Orientierung (optional, max. 3)', ru: 'Фото задачи (по желанию — до 3)', fr: 'Photos utiles (optionnel — max 3)', tr: 'İşi gösteren fotoğraflar (isteğe bağlı, en fazla 3)', es: 'Fotos de referencia (opcional — hasta 3)' },
  post_loc_lbl: { ar: 'المكان', en: 'Location', zh: '服务地点', de: 'Standort', ru: 'Местоположение', fr: 'Lieu', tr: 'Konum', es: 'Ubicación' },
  post_area_lbl: { ar: 'الشارع / المنطقة / القرية (اختياري)', en: 'Street / Neighborhood (Optional)', zh: '具体街道 / 小区 / 村镇（可选）', de: 'Straße / Viertel (optional)', ru: 'Улица / район (необязательно)', fr: 'Rue / Quartier (optionnel)', tr: 'Cadde / Mahalle / Semt (isteğe bağlı)', es: 'Calle / Colonia (opcional)' },
  post_bud_lbl: { ar: 'الميزانية التقريبية بالجنيه (اختياري)', en: 'Estimated Budget in EGP (Optional)', zh: '预计预算（埃及镑，可选）', de: 'Geschätztes Budget in EGP (optional)', ru: 'Ориентировочный бюджет в EGP (опц.)', fr: 'Budget estimé en EGP (optionnel)', tr: 'Tahmini Bütçe (EGP, isteğe bağlı)', es: 'Presupuesto aprox. en EGP (opcional)' },
  post_bud_ph: { ar: 'سيبها فاضية لو مفتوحة', en: 'Leave blank if open', zh: '留空则表示价格面议', de: 'Leer lassen falls offen', ru: 'Оставьте пустым, если договорная', fr: 'Laisser vide si ouvert', tr: 'Açık bütçeyse boş bırak', es: 'Déjalo vacío si es abierto' },
  post_when_lbl: { ar: 'محتاج التنفيذ إمتى؟', en: 'When do you need it done?', zh: '期望上门时间？', de: 'Wann soll es erledigt werden?', ru: 'Когда нужно выполнить?', fr: 'Pour quand en avez-vous besoin ?', tr: 'Ne zaman yapılmasını istersin?', es: '¿Para cuándo lo necesitas?' },
  gps_ok: { ar: 'موقعك الدقيق متحدد ✓', en: 'Exact GPS location set ✓', zh: '已精准获取当前位置 ✓', de: 'Genauer GPS-Standort aktiv ✓', ru: 'Точная геопозиция задана ✓', fr: 'Position GPS exacte définie ✓', tr: 'Tam konum belirlendi ✓', es: 'Ubicación GPS fijada ✓' },
  gps_use: { ar: 'استخدم موقعي الحالي بدقة', en: 'Use My Exact Current Location', zh: '使用我的精准实时定位', de: 'Meinen genauen Standort nutzen', ru: 'Использовать точную геолокацию', fr: 'Utiliser ma position actuelle', tr: 'Şu Anki Konumumu Kullan', es: 'Usar mi ubicación exacta' },

  /* Offer & Provider Modals */
  offer_h2: { ar: 'قدّم عرض سعر على الطلب', en: 'Send Your Price Quote', zh: '提交需求报价', de: 'Preisangebot senden', ru: 'Отправить предложение', fr: 'Envoyer un devis', tr: 'Talebe Fiyat Teklifi Ver', es: 'Enviar cotización' },
  offer_price_lbl: { ar: 'السعر اللي بتقترحه (بالجنيه)', en: 'Your Quoted Price (EGP)', zh: '您的报价金额（埃及镑）', de: 'Dein Preisvorschlag (EGP)', ru: 'Ваша цена (EGP)', fr: 'Votre tarif proposé (EGP)', tr: 'Önerdiğin Ücret (EGP)', es: 'Tu precio propuesto (EGP)' },
  offer_when_lbl: { ar: 'تقدر تنفّذ إمتى؟', en: 'Earliest Start Time', zh: '最早何时可以施工？', de: 'Wann kannst du starten?', ru: 'Когда сможете приступить?', fr: 'Quand pouvez-vous intervenir ?', tr: 'Ne zaman başlayabilirsin?', es: '¿Cuándo puedes empezar?' },
  offer_msg_lbl: { ar: 'رسالتك لصاحب الطلب', en: 'Note to Requester', zh: '给客户附言说明', de: 'Nachricht an den Kunden', ru: 'Комментарий заказчику', fr: 'Message pour le client', tr: 'Talep Sahibine Notun', es: 'Nota para el cliente' },
  offer_submit: { ar: 'ابعت العرض دلوقتي', en: 'Submit Quote Now', zh: '立即发送报价', de: 'Angebot absenden', ru: 'Отправить отклик', fr: 'Envoyer le devis', tr: 'Teklifi Şimdi Gönder', es: 'Enviar oferta ahora' },
  need_pro_h2: { ar: 'سجّل كمقدم خدمة الأول', en: 'Set Up Your Pro Profile First', zh: '请先激活服务商身份', de: 'Zuerst als Anbieter registrieren', ru: 'Сначала зарегистрируйтесь как мастер', fr: 'Devenez Pro d’abord', tr: 'Önce Hizmet Veren Olarak Kayıt Ol', es: 'Regístrate como Pro primero' },
  need_pro_p: { ar: 'علشان تقدّم عرض سعر لأي حد بينشر على وصلة، لازم يكون ليك ملف مقدم خدمة مسجّل بالتخصص بتاعك. خطوة واحدة في ثواني وهنرجعك للطلب على طول!', en: 'To quote on requests, you need an active Pro profile with your trade. It takes seconds and takes you straight back here!', zh: '向需求方报价前，需先完善一次您的服务商专长信息，仅需几秒即可直接返回本单报价！', de: 'Für Angebote brauchst du ein kurzes Anbieter-Profil. Dauert Sekunden und bringt dich direkt zurück!', ru: 'Чтобы отправлять цены, заполните профиль мастера за пару секунд и сразу вернётесь к заказу!', fr: 'Pour envoyer un devis, activez votre profil pro en quelques secondes !', tr: 'Teklif verebilmek için uzmanlığını içeren bir profilin olmalı. Saniyeler içinde tamamlayıp buraya dönersin!', es: 'Para enviar cotizaciones necesitas un perfil Pro activo. ¡Toma segundos!' },
  need_pro_btn: { ar: 'سجّل كمقدم خدمة دلوقتي', en: 'Create Pro Profile Now', zh: '立即开通服务商主页', de: 'Jetzt Anbieter-Profil anlegen', ru: 'Создать профиль мастера', fr: 'Activer mon profil Pro', tr: 'Hemen Hizmet Veren Ol', es: 'Crear perfil Pro ahora' },
  pro_reg_h2: { ar: 'سجّل كمقدم خدمة على وصلة', en: 'Register as a Pro on Wasla', zh: '在 Wasla 注册成为服务商', de: 'Als Anbieter auf Wasla registrieren', ru: 'Стать мастером на Wasla', fr: 'Devenir Prestataire sur Wasla', tr: 'Wasla’da Hizmet Veren Ol', es: 'Regístrate como Pro en Wasla' },
  pro_edit_h2: { ar: 'تعديل ملفك كمقدم خدمة', en: 'Edit Your Pro Profile', zh: '编辑您的服务商主页', de: 'Anbieter-Profil bearbeiten', ru: 'Редактировать профиль мастера', fr: 'Modifier mon profil Pro', tr: 'Hizmet Veren Profilini Düzenle', es: 'Editar perfil Pro' },
  pro_modal_sub: { ar: 'تقدر تقدّم أي خدمة أو صنعة أو مهنة متاحة عندك، وتبعت عروض لأي حد بينشر طلب حواليك.', en: 'Offer any trade, skill, or service and send quotes directly to local requests near you.', zh: '支持各行各业手艺人、教师与服务团队入驻，随时向周边客户需求发送报价。', de: 'Biete jedes Handwerk oder jeden Service an und sende Angebote in deiner Nähe.', ru: 'Предлагайте любые услуги и сразу откликайтесь на заказы рядом с вами.', fr: 'Proposez tout métier ou service et envoyez des devis autour de vous.', tr: 'Her türlü usta, eğitim veya hizmeti ekleyip çevrendeki taleplere teklif gönderebilirsin.', es: 'Ofrece cualquier oficio o servicio y cotiza pedidos cerca de ti.' },
  pro_save_btn: { ar: 'حفظ التعديلات', en: 'Save Changes', zh: '保存修改', de: 'Änderungen speichern', ru: 'Сохранить изменения', fr: 'Enregistrer', tr: 'Değişiklikleri Kaydet', es: 'Guardar cambios' },
  pro_act_btn: { ar: 'تفعيل حساب مقدم الخدمة', en: 'Activate Pro Account', zh: '激活服务商账户', de: 'Anbieter-Konto aktivieren', ru: 'Активировать профиль', fr: 'Activer le compte Pro', tr: 'Hizmet Veren Hesabını Aç', es: 'Activar cuenta Pro' },
  more_ofrs_fmt: { ar: 'المزيد (+{next} عروض تانية من أصل {rem})', en: 'Show More (+{next} of {rem} quotes)', zh: '展开更多（+{next} 条，共剩 {rem} 条）', de: 'Mehr anzeigen (+{next} von {rem})', ru: 'Показать ещё (+{next} из {rem})', fr: 'Voir plus (+{next} sur {rem})', tr: 'Daha fazla (+{next} / {rem} teklif)', es: 'Ver más (+{next} de {rem})' },
  less_ofrs_btn: { ar: 'عرض أقل', en: 'Show Less', zh: '收起', de: 'Weniger anzeigen', ru: 'Свернуть', fr: 'Voir moins', tr: 'Daha az göster', es: 'Ver menos' },
  chat_arch_back: { ar: 'رجوع للمحادثات', en: 'Back to Chats', zh: '返回消息列表', de: 'Zurück zu Chats', ru: 'Назад к чатам', fr: 'Retour aux discussions', tr: 'Sohbetlere Dön', es: 'Volver a chats' },
  chat_arch_lbl: { ar: 'المحادثات المؤرشفة', en: 'Archived Chats', zh: '已归档对话', de: 'Archivierte Chats', ru: 'Архив чатов', fr: 'Discussions archivées', tr: 'Arşivlenen Sohbetler', es: 'Chats archivados' },
  chat_arch_sub: { ar: 'دردشات مخفية من القائمة الرئيسية', en: 'Hidden from main inbox', zh: '已从主消息列表中隐藏归档', de: 'Aus dem Posteingang ausgeblendet', ru: 'Скрыты из основного списка', fr: 'Masquées de la boîte principale', tr: 'Ana listeden gizlenen sohbetler', es: 'Ocultos de la lista principal' },
  chat_arch_cnt: { ar: '{n} محادثة في الأرشيف', en: '{n} archived chats', zh: '{n} 个归档对话', de: '{n} Chats im Archiv', ru: '{n} в архиве', fr: '{n} archivées', tr: '{n} sohbet arşivde', es: '{n} en archivo' },
  new_req_top_btn: { ar: 'نزّل طلب', en: 'Post', zh: '发需求', de: 'Neu', ru: 'Заказ', fr: 'Publier', tr: 'Talep Aç', es: 'Publicar' },
  custom_sub_chip: { ar: '✎ خدمة أو مساعدة تانية (اكتبها بنفسك)', en: '✎ Other service (type your own)', zh: '✎ 其他具体需求（手动填写）', de: '✎ Anderer Service (selbst eingeben)', ru: '✎ Другая услуга (вписать самому)', fr: '✎ Autre service (saisie libre)', tr: '✎ Başka bir hizmet (kendin yaz)', es: '✎ Otro servicio (escríbelo)' },
  custom_sub_lbl: { ar: 'اكتب أي خدمة أو مساعدة محتاجها بالظبط:', en: 'Type the exact service you need:', zh: '请填写您所需的具体服务名称：', de: 'Benötigte Leistung genau angeben:', ru: 'Укажите точную нужную услугу:', fr: 'Précisez le service recherché :', tr: 'İhtiyacın olan hizmeti tam olarak yaz:', es: 'Escribe exactamente el servicio que buscas:' },
  add_photo_tile: { ar: 'ضِف صورة', en: 'Add photo', zh: '添加照片', de: 'Foto +', ru: 'Добавить фото', fr: 'Ajouter photo', tr: 'Fotoğraf ekle', es: 'Añadir foto' },
  voice_btn: { ar: 'صوت', en: 'Voice', zh: '语音', de: 'Sprache', ru: 'Голос', fr: 'Voix', tr: 'Ses', es: 'Voz' },
  voice_rec: { ar: 'اتكلم..', en: 'Speak..', zh: '聆听中..', de: 'Sprechen..', ru: 'Говорите..', fr: 'Parlez..', tr: 'Konuşun..', es: 'Habla..' },
  voice_aria: { ar: 'اتكلم واكتب بالصوت', en: 'Speak to type', zh: '语音输入', de: 'Per Sprache eingeben', ru: 'Голосовой ввод', fr: 'Dicter', tr: 'Sesle yaz', es: 'Dictar por voz' },
  side_show: { ar: 'إظهار القائمة', en: 'Show menu', zh: '显示菜单', de: 'Menü anzeigen', ru: 'Показать меню', fr: 'Afficher le menu', tr: 'Menüyü göster', es: 'Mostrar menú' },
  nav_no_match: { ar: 'مفيش قسم بالاسم ده في القايمة.', en: 'No matching section in menu.', zh: '菜单中没有匹配项。', de: 'Kein Menüeintrag gefunden.', ru: 'Раздел не найден в меню.', fr: 'Aucune rubrique correspondante.', tr: 'Menüde bölüm bulunamadı.', es: 'No hay sección coincidente.' },
  nav_search_site: { ar: 'دوّر في الموقع عن «{q}»', en: 'Search site for «{q}»', zh: '在全站搜索 «{q}»', de: 'Website nach «{q}» durchsuchen', ru: 'Искать на сайте «{q}»', fr: 'Rechercher «{q}» sur le site', tr: 'Sitede «{q}» ara', es: 'Buscar «{q}» en el sitio' },
  side_pulse_cnt: { ar: '<b>{r}</b> طلب · <b>{p}</b> متاح', en: '<b>{r}</b> requests · <b>{p}</b> active', zh: '<b>{r}</b> 需求 · <b>{p}</b> 在线', de: '<b>{r}</b> Anfragen · <b>{p}</b> aktiv', ru: '<b>{r}</b> заказов · <b>{p}</b> свободны', fr: '<b>{r}</b> demandes · <b>{p}</b> dispo', tr: '<b>{r}</b> talep · <b>{p}</b> müsait', es: '<b>{r}</b> pedidos · <b>{p}</b> activos' },
  spoiler_tap: { ar: 'اضغط للإظهار', en: 'Tap to reveal', zh: '点击查看', de: 'Tippen zum Anzeigen', ru: 'Нажмите, чтобы показать', fr: 'Appuyer pour afficher', tr: 'Göstermek için dokun', es: 'Tocar para ver' },
  spoiler_hidden: { ar: 'محتوى مخفي', en: 'Hidden content', zh: '隐藏内容', de: 'Versteckter Inhalt', ru: 'Скрытый контент', fr: 'Contenu masqué', tr: 'Gizli içerik', es: 'Contenido oculto' },
  user_fallback: { ar: 'مستخدم', en: 'User', zh: '用户', de: 'Nutzer', ru: 'Пользователь', fr: 'Utilisateur', tr: 'Kullanıcı', es: 'Usuario' },
  wa_lbl: { ar: 'واتساب', en: 'WhatsApp', zh: 'WhatsApp', de: 'WhatsApp', ru: 'WhatsApp', fr: 'WhatsApp', tr: 'WhatsApp', es: 'WhatsApp' },
  tg_lbl: { ar: 'تليجرام', en: 'Telegram', zh: 'Telegram', de: 'Telegram', ru: 'Telegram', fr: 'Telegram', tr: 'Telegram', es: 'Telegram' },
  chat_options: { ar: 'خيارات الدردشة', en: 'Chat options', zh: '聊天选项', de: 'Chat-Optionen', ru: 'Настройки чата', fr: 'Options du chat', tr: 'Sohbet seçenekleri', es: 'Opciones del chat' },
  chat_search_title: { ar: 'بحث ذكي في المحادثة', en: 'Smart chat search', zh: '智能聊天搜索', de: 'Intelligente Suche', ru: 'Умный поиск в чате', fr: 'Recherche intelligente', tr: 'Akıllı sohbet araması', es: 'Búsqueda inteligente' },
  close_search: { ar: 'إغلاق البحث', en: 'Close search', zh: '关闭搜索', de: 'Suche schließen', ru: 'Закрыть поиск', fr: 'Fermer la recherche', tr: 'Aramayı kapat', es: 'Cerrar búsqueda' },
  clear_search: { ar: 'مسح البحث', en: 'Clear search', zh: '清除搜索', de: 'Suche leeren', ru: 'Очистить', fr: 'Effacer', tr: 'Temizle', es: 'Limpiar' },
  prev_lbl: { ar: 'السابق', en: 'Previous', zh: '上一个', de: 'Vorherige', ru: 'Назад', fr: 'Précédent', tr: 'Önceki', es: 'Anterior' },
  next_lbl: { ar: 'التالي', en: 'Next', zh: '下一个', de: 'Nächste', ru: 'Далее', fr: 'Suivant', tr: 'Sonraki', es: 'Siguiente' },
  otp_box_aria: { ar: 'خانة {n}', en: 'Digit {n}', zh: '第 {n} 位', de: 'Feld {n}', ru: 'Символ {n}', fr: 'Case {n}', tr: 'Hane {n}', es: 'Casilla {n}' },
  otp_toggle_aria: { ar: 'إظهار أو إخفاء الرمز', en: 'Toggle code visibility', zh: '显示或隐藏密码', de: 'Code ein-/ausblenden', ru: 'Показать или скрыть код', fr: 'Afficher ou masquer le code', tr: 'Kodu göster/gizle', es: 'Mostrar u ocultar código' },
  pinned_lbl: { ar: 'مثبتة', en: 'Pinned', zh: '已置顶', de: 'Angepinnt', ru: 'Закреплён', fr: 'Épinglé', tr: 'Sabitlendi', es: 'Fijado' },
  warn_tag_cnt: { ar: 'تحذير ({n})', en: 'Warning ({n})', zh: '警告 ({n})', de: 'Warnung ({n})', ru: 'Предупреждение ({n})', fr: 'Alerte ({n})', tr: 'Uyarı ({n})', es: 'Aviso ({n})' },
  start_talk_now: { ar: 'ابدأ كلامك دلوقتي', en: 'Start chatting now', zh: '现在开始聊天', de: 'Jetzt Gespräch starten', ru: 'Начните диалог сейчас', fr: 'Commencez la discussion', tr: 'Şimdi sohbete başlayın', es: 'Empieza a hablar ahora' },
  arch_empty: { ar: 'الأرشيف فاضي دلوقتي', en: 'Archive is empty', zh: '归档为空', de: 'Archiv ist leer', ru: 'Архив пуст', fr: 'Archive vide', tr: 'Arşiv şu anda boş', es: 'El archivo está vacío' },
  arch_all: { ar: 'كل محادثاتك في الأرشيف', en: 'All your chats are archived', zh: '所有聊天均已归档', de: 'Alle Chats archiviert', ru: 'Все чаты в архиве', fr: 'Toutes les discussions archivées', tr: 'Tüm sohbetlerin arşivde', es: 'Todos tus chats archivados' },
  arch_open: { ar: 'افتح الأرشيف ({n})', en: 'Open archive ({n})', zh: '打开归档 ({n})', de: 'Archiv öffnen ({n})', ru: 'Открыть архив ({n})', fr: 'Ouvrir l archive ({n})', tr: 'Arşivi aç ({n})', es: 'Abrir archivo ({n})' },
  chat_warn_msg: { ar: 'تنبيه: الحساب ده عليه علامة تحذير', en: 'Alert: This account has warnings', zh: '提醒：此账号收到警告标记', de: 'Hinweis: Konto hat Warnungen', ru: 'Внимание: у аккаунта есть жалобы', fr: 'Alerte : compte signalé', tr: 'Uyarı: Bu hesapta uyarı var', es: 'Aviso: cuenta con advertencias' },
  view_his_page: { ar: 'شوف صفحته', en: 'View profile', zh: '查看主页', de: 'Profil ansehen', ru: 'Профиль', fr: 'Voir profil', tr: 'Profili gör', es: 'Ver perfil' },
  thr_down_aria: { ar: 'الانتقال لآخر الرسائل', en: 'Jump to latest messages', zh: '滚动到最新消息', de: 'Zu neuesten Nachrichten', ru: 'К последним сообщениям', fr: 'Aller aux derniers messages', tr: 'Son mesajlara in', es: 'Ir a los últimos mensajes' },
  acc_cam_aria: { ar: 'تغيير الصورة', en: 'Change photo', zh: '更换头像', de: 'Foto ändern', ru: 'Сменить фото', fr: 'Changer la photo', tr: 'Fotoğrafı değiştir', es: 'Cambiar foto' },
  acc_use_google_av: { ar: 'استخدام صورة جوجل / الأفاتار', en: 'Use Google / Avatar', zh: '使用 Google 或默认头像', de: 'Google-/Avatar-Bild nutzen', ru: 'Использовать фото Google', fr: 'Utiliser Google / Avatar', tr: 'Google / Avatar kullan', es: 'Usar foto de Google / Avatar' },
  acc_role_on: { ar: 'مقدم خدمة مفعّل · {n}', en: 'Active Pro · {n}', zh: '已认证服务商 · {n}', de: 'Aktiver Anbieter · {n}', ru: 'Активный мастер · {n}', fr: 'Prestataire actif · {n}', tr: 'Aktif hizmet veren · {n}', es: 'Profesional activo · {n}' },
  acc_role_off: { ar: 'طالب خدمة فقط (اضغط تحت للتفعيل)', en: 'Customer only (tap below to activate)', zh: '仅需求方（点击下方启用服务商）', de: 'Nur Kunde (unten aktivieren)', ru: 'Только заказчик (включите ниже)', fr: 'Client uniquement (activer ci-dessous)', tr: 'Sadece müşteri (aşağıdan etkinleştir)', es: 'Solo cliente (activa abajo)' },
  acc_req_toggle_lbl: { ar: 'حالة استقبال الطلبات', en: 'Availability Status', zh: '接单状态', de: 'Verfügbarkeit', ru: 'Приём заказов', fr: 'Disponibilité', tr: 'Talep alma durumu', es: 'Disponibilidad' },
  acc_avail_tog: { ar: 'متاح الآن للعمل (اضغط للتبديل)', en: 'Available now (tap to toggle)', zh: '当前可接单（点击切换）', de: 'Jetzt verfügbar (tippen)', ru: 'Доступен сейчас (нажмите)', fr: 'Disponible maintenant (basculer)', tr: 'Şimdi müsait (değiştir)', es: 'Disponible ahora (tocar)' },
  acc_busy_tog: { ar: 'مشغول مؤقتاً (اضغط للتبديل)', en: 'Temporarily busy (tap to toggle)', zh: '暂时忙碌（点击切换）', de: 'Derzeit beschäftigt (tippen)', ru: 'Временно занят (нажмите)', fr: 'Temporairement occupé (basculer)', tr: 'Geçici olarak meşgul (değiştir)', es: 'Ocupado temporalmente (tocar)' },
  acc_pub_lbl: { ar: 'صفحتك العامة ومعاملاتك', en: 'Public profile & deals', zh: '公开主页与交易记录', de: 'Öffentliches Profil & Aufträge', ru: 'Публичный профиль и сделки', fr: 'Profil public et transactions', tr: 'Genel profilin ve işlemlerin', es: 'Perfil público y trabajos' },
  acc_pub_me: { ar: 'شوف صفحتي الشخصية والتقييمات', en: 'View my profile & reviews', zh: '查看个人主页与评价', de: 'Mein Profil & Bewertungen', ru: 'Мой профиль и отзывы', fr: 'Voir mon profil et avis', tr: 'Profilimi ve değerlendirmeleri gör', es: 'Ver mi perfil y reseñas' },
  acc_pub_usr: { ar: 'شوف صفحتي الشخصية ومعاملاتي', en: 'View my profile & deals', zh: '查看个人主页与交易', de: 'Mein Profil & Aufträge', ru: 'Мой профиль и сделки', fr: 'Voir mon profil et historique', tr: 'Profilimi ve işlemlerimi gör', es: 'Ver mi perfil e historial' },
  acc_work_lbl: { ar: 'الشغل وتقديم العروض', en: 'Work & Offers', zh: '接单与报价', de: 'Arbeit & Angebote', ru: 'Работа и отклики', fr: 'Travail et offres', tr: 'İş ve teklifler', es: 'Trabajo y ofertas' },
  acc_work_edit: { ar: 'تعديل ملف الخدمة والتفرغ', en: 'Edit service & availability', zh: '编辑服务资料与状态', de: 'Service & Status bearbeiten', ru: 'Редактировать профиль мастера', fr: 'Modifier le service', tr: 'Hizmet profilini düzenle', es: 'Editar perfil profesional' },
  acc_work_reg: { ar: 'سجّل كمقدم خدمة دلوقتي', en: 'Register as a Pro now', zh: '立即注册为服务商', de: 'Jetzt registrieren', ru: 'Стать мастером сейчас', fr: 'Devenir prestataire', tr: 'Şimdi hizmet veren ol', es: 'Regístrate como profesional ahora' },
  acc_hdr: { ar: 'الحساب', en: 'Account', zh: '账户', de: 'Konto', ru: 'Аккаунт', fr: 'Compte', tr: 'Hesap', es: 'Cuenta' },
  pick_cat_first: { ar: 'اختار القسم فوق الأول (أو اكتب عنوان الطلب وهنقترحلك القسم، وتقدر تكتب أي خدمة تانية بنفسك).', en: 'Pick a category above first (or write your title for auto-suggestion).', zh: '请先选择上方分类（或填写标题由系统自动推荐）。', de: 'Wählen Sie zuerst eine Kategorie oben.', ru: 'Сначала выберите категорию выше.', fr: 'Choisissez d abord une catégorie.', tr: 'Önce yukarıdan kategori seçin.', es: 'Elige primero una categoría arriba.' },
  custom_sub_ph: { ar: 'مثلاً: صيانة أسانسير، ممرض منزلي، تصوير، خياطة، محامي...', en: 'e.g. elevator repair, home nurse, photography, tailoring...', zh: '例如：电梯维修、家庭护理、摄影、裁缝...', de: 'z. B. Aufzugreparatur, Pflege, Fotografie...', ru: 'Напр.: ремонт лифта, сиделка, фотограф...', fr: 'Ex : dépannage, infirmier, photo, couture...', tr: 'Örn: asansör, bakım, fotoğraf, terzi...', es: 'Ej: ascensores, enfermería, fotografía...' },
  street_ph: { ar: 'مثلاً: شارع البحر جنب موقف...', en: 'e.g. Main St near transit stop...', zh: '例如：街道、小区或地标附近...', de: 'z. B. Hauptstraße nahe Bahnhof...', ru: 'Напр.: ул. Мира, рядом с метро...', fr: 'Ex : rue principale près de la gare...', tr: 'Örn: Atatürk Cd. durak yanı...', es: 'Ej: Av. Central cerca de...' },
  s_cat_sub: { ar: 'قسم', en: 'Category', zh: '分类', de: 'Kategorie', ru: 'Категория', fr: 'Catégorie', tr: 'Kategori', es: 'Categoría' },
  s_req_sub: { ar: 'طلب', en: 'Request', zh: '需求', de: 'Anfrage', ru: 'Заказ', fr: 'Demande', tr: 'Talep', es: 'Pedido' },
  s_provs_h: { ar: 'مقدمو خدمة', en: 'Service Pros', zh: '服务商', de: 'Anbieter', ru: 'Мастера', fr: 'Prestataires', tr: 'Hizmet verenler', es: 'Profesionales' },
  s_reqs_h: { ar: 'طلبات منشورة', en: 'Posted Requests', zh: '已发布需求', de: 'Aktive Anfragen', ru: 'Опубликованные заказы', fr: 'Demandes publiées', tr: 'Yayınlanan talepler', es: 'Pedidos publicados' },
  radar_empty_reqs: { ar: 'مفيش طلبات قريبة حالياً.', en: 'No nearby requests right now.', zh: '附近暂无需求。', de: 'Keine Anfragen in der Nähe.', ru: 'Рядом пока нет заказов.', fr: 'Aucune demande à proximité.', tr: 'Yakında talep yok.', es: 'No hay pedidos cercanos ahora.' },
  radar_empty_provs: { ar: 'مفيش مقدمي خدمة متاحين دلوقتي.', en: 'No pros available right now.', zh: '暂无可用服务商。', de: 'Keine Anbieter verfügbar.', ru: 'Нет доступных мастеров.', fr: 'Aucun prestataire disponible.', tr: 'Şu an müsait hizmet veren yok.', es: 'No hay profesionales disponibles.' },
  est_slider_aria: { ar: 'تحديد الميزانية التقديرية', en: 'Set estimated budget', zh: '调整预估预算', de: 'Geschätztes Budget festlegen', ru: 'Указать бюджет', fr: 'Définir le budget estimé', tr: 'Tahmini bütçeyi ayarla', es: 'Ajustar presupuesto estimado' },
  cmd_no_res: { ar: 'لا توجد نتائج لـ «{q}»', en: 'No results for «{q}»', zh: '没有找到 «{q}»', de: 'Keine Ergebnisse für «{q}»', ru: 'Нет результатов для «{q}»', fr: 'Aucun résultat pour «{q}»', tr: '«{q}» için sonuç yok', es: 'Sin resultados para «{q}»' },
  cmd_tool_nw: { ar: 'نزّل طلب جديد', en: 'Post New Request', zh: '发布新需求', de: 'Neue Anfrage erstellen', ru: 'Новый заказ', fr: 'Publier une demande', tr: 'Yeni talep ekle', es: 'Publicar pedido' },
  cmd_tool_nw_s: { ar: 'نشر فوري', en: 'Instant post', zh: '立即发布', de: 'Sofort', ru: 'Сразу', fr: 'Instantané', tr: 'Anında', es: 'Al instante' },
  cmd_tool_rad_s: { ar: 'مباشر', en: 'Live', zh: '实时', de: 'Live', ru: 'Онлайн', fr: 'En direct', tr: 'Canlı', es: 'En vivo' },
  cmd_tool_est_s: { ar: 'تقدير ذكي', en: 'Smart estimate', zh: '智能估算', de: 'Schätzung', ru: 'Умный расчёт', fr: 'Estimation', tr: 'Akıllı hesap', es: 'Estimación' },
  cmd_tool_near: { ar: 'أقرب طلب متاح', en: 'Closest Open Request', zh: '最近可用需求', de: 'Nächste Anfrage', ru: 'Ближайший заказ', fr: 'Demande la plus proche', tr: 'En yakın talep', es: 'Pedido más cercano' },
  cmd_tool_near_s: { ar: 'الأسرع', en: 'Fastest', zh: '最快', de: 'Am schnellsten', ru: 'Быстрее всего', fr: 'Le plus rapide', tr: 'En hızlı', es: 'Más rápido' },
  cmd_reqs_grp: { ar: 'طلبات مطابقة', en: 'Matching Requests', zh: '匹配需求', de: 'Passende Anfragen', ru: 'Подходящие заказы', fr: 'Demandes correspondantes', tr: 'Eşleşen talepler', es: 'Pedidos coincidentes' },
  cmp_title: { ar: 'مقارنة ذكية لعروض «{t}»', en: 'Smart Comparison: «{t}»', zh: '«{t}» 报价智能对比', de: 'Angebotsvergleich: «{t}»', ru: 'Сравнение откликов «{t}»', fr: 'Comparaison : «{t}»', tr: '«{t}» Teklif Karşılaştırması', es: 'Comparación: «{t}»' },
  bud_shown: { ar: 'الميزانية المعروضة:', en: 'Listed budget:', zh: '标明预算：', de: 'Angegebenes Budget:', ru: 'Бюджет заказа:', fr: 'Budget affiché :', tr: 'Belirtilen bütçe:', es: 'Presupuesto indicado:' },
  off_price_ph: { ar: 'مثلاً: 500', en: 'e.g. 500', zh: '例如：500', de: 'z. B. 500', ru: 'Напр.: 500', fr: 'Ex : 500', tr: 'Örn: 500', es: 'Ej: 500' },
  off_when_ph: { ar: 'مثلاً: النهاردة بعد العصر / بكرة 10 الصبح', en: 'e.g. Today afternoon / Tomorrow 10 AM', zh: '例如：今天下午 / 明天上午 10 点', de: 'z. B. Heute Nachmittag / Morgen 10 Uhr', ru: 'Напр.: сегодня после 16:00 / Завтра в 10:00', fr: 'Ex : Aujourd hui 16h / Demain 10h', tr: 'Örn: Bugün öğleden sonra / Yarın 10:00', es: 'Ej: Hoy tarde / Mañana 10:00' },
  off_msg_ph: { ar: 'وضّحله السعر شامل إيه وخبرتك في الشغلانة...', en: 'Explain what the price covers and your experience...', zh: '说明报价包含内容及您的经验...', de: 'Leistungsumfang & Erfahrung beschreiben...', ru: 'Опишите, что входит в цену и опыт...', fr: 'Précisez ce que couvre le prix et votre expérience...', tr: 'Fiyata nelerin dahil olduğunu ve deneyiminizi yazın...', es: 'Explica qué incluye el precio y tu experiencia...' },
  pro_name_lbl: { ar: 'اسمك أو اسم الورشة / النشاط', en: 'Your Name or Business / Workshop', zh: '您的姓名或工作室/企业名称', de: 'Ihr Name oder Betriebsname', ru: 'Ваше имя или мастерская', fr: 'Votre nom ou entreprise', tr: 'Adınız veya atölye/işletme adı', es: 'Tu nombre o negocio' },
  pro_name_ph: { ar: 'مثلاً: الأسطى محمود / دكتور أحمد / شركة النور', en: 'e.g. Alex Carter / TechPro Services', zh: '例如：张师傅 / 顺达维修工作室', de: 'z. B. Meister Weber / ElektroPlus', ru: 'Напр.: Мастер Иван / ПрофиСервис', fr: 'Ex : Marc Dépannage / Studio Éclair', tr: 'Örn: Ahmet Usta / Güven Teknik', es: 'Ej: Taller López / Técnico Carlos' },
  pro_cat_lbl: { ar: 'القسم العام', en: 'General Category', zh: '所属大类', de: 'Kategorie', ru: 'Категория', fr: 'Catégorie générale', tr: 'Genel Kategori', es: 'Categoría general' },
  pro_spec_lbl: { ar: 'المهنة أو الخدمة الدقيقة اللي بتقدمها (اكتب أي خدمة أو اختار من تحت)', en: 'Exact Service or Trade (type any or pick below)', zh: '具体工种或服务（可自填或下方选择）', de: 'Genauer Beruf oder Service', ru: 'Точная специальность', fr: 'Métier ou service précis', tr: 'Sunduğunuz kesin hizmet veya meslek', es: 'Servicio u oficio exacto' },
  pro_spec_ph: { ar: 'اكتب أي خدمة بتقدمها (مثلاً: سباك صحي، ممرض منزلي، مصمم جرافيك، شيف...)', en: 'Type any service (e.g. plumber, nurse, designer...)', zh: '输入服务内容（如水管工、家政、设计...）', de: 'Service eingeben (z. B. Klempner, Design...)', ru: 'Введите услугу (напр.: сантехник, репетитор...)', fr: 'Saisissez votre service (ex : plombier...)', tr: 'Hizmetinizi yazın (örn: tesisatçı...)', es: 'Escribe tu servicio (ej: fontanero...)' },
  pro_loc_lbl: { ar: 'المحافظة والمركز', en: 'Region & City', zh: '省市与地区', de: 'Region & Stadt', ru: 'Регион и город', fr: 'Région & ville', tr: 'Bölge ve Şehir', es: 'Provincia y Ciudad' },
  pro_years_lbl: { ar: 'سنين الخبرة', en: 'Years of Experience', zh: '从业年限', de: 'Berufserfahrung (Jahre)', ru: 'Лет опыта', fr: 'Années d expérience', tr: 'Deneyim yılı', es: 'Años de experiencia' },
  pro_status_lbl: { ar: 'حالتك دلوقتي', en: 'Current Status', zh: '当前状态', de: 'Aktueller Status', ru: 'Текущий статус', fr: 'Statut actuel', tr: 'Şu anki durum', es: 'Estado actual' },
  pro_bio_lbl: { ar: 'نبذة سريعة عن شغلك وخدماتك ومواعيدك (اختياري)', en: 'Short bio about your work & hours (optional)', zh: '简介与工作时间（可选）', de: 'Kurze Beschreibung & Zeiten (optional)', ru: 'Кратко о работе и графике', fr: 'Courte bio et horaires (optionnel)', tr: 'İşiniz ve saatleriniz hakkında özet', es: 'Breve resumen de trabajo y horarios' },
  pro_bio_ph: { ar: 'مثلاً: بقدّم كافة أعمال الصيانة والتأسيس، متاح يومياً من 9 ص لـ 10 م...', en: 'e.g. Full installation & repair service, available daily 9 AM – 10 PM...', zh: '例如：承接各类安装与维修，每日 9:00-22:00 在线...', de: 'z. B. Zuverlässige Reparatur & Montage, 9–22 Uhr...', ru: 'Напр.: ремонт и монтаж, ежедневно 9:00–22:00...', fr: 'Ex : Installation et dépannage, 9h–22h...', tr: 'Örn: Bakım ve onarım, her gün 09:00–22:00...', es: 'Ej: Instalaciones y reparaciones, 9:00 a 22:00...' },
  ob_loc_ok: { ar: 'اتحدد موقعك بنجاح ({acc}) وهيتحدث تلقائي كل أسبوع.', en: 'Location saved ({acc}) and auto-refreshes weekly.', zh: '位置已确定（{acc}），每周自动更新。', de: 'Standort gespeichert ({acc}).', ru: 'Геопозиция сохранена ({acc}).', fr: 'Position enregistrée ({acc}).', tr: 'Konumunuz kaydedildi ({acc}).', es: 'Ubicación guardada ({acc}).' },
  ob_loc_city: { ar: 'حسب مدينتك المختارة', en: 'by selected city', zh: '按所选城市', de: 'per gewählter Stadt', ru: 'по выбранному городу', fr: 'selon la ville choisie', tr: 'seçilen şehre göre', es: 'según ciudad elegida' },
  ob_loc_need: { ar: 'اضغط الزر علشان المتصفح يظهرلك نافذة الموافقة على الموقع ونجبلك أقرب خدمات حواليك.', en: 'Tap to allow browser location so we find nearby services.', zh: '点击授权位置权限以获取附近服务。', de: 'Tippen Sie, um Standortfreigabe zu erteilen.', ru: 'Разрешите геолокацию для поиска рядом.', fr: 'Autorisez la localisation pour trouver à proximité.', tr: 'Yakındaki hizmetler için konum izni verin.', es: 'Permite la ubicación para ver servicios cercanos.' },
  ob_loc_btn_ok: { ar: 'تم تحديد الموقع ✓ (تحديث)', en: 'Location Set ✓ (Update)', zh: '位置已设置 ✓（更新）', de: 'Standort aktiv ✓', ru: 'Геопозиция задана ✓', fr: 'Position définie ✓', tr: 'Konum ayarlandı ✓', es: 'Ubicación lista ✓' },
  ob_loc_btn_go: { ar: 'تحديد موقعي دلوقتي', en: 'Locate Me Now', zh: '立即定位', de: 'Standort abrufen', ru: 'Определить место', fr: 'Me localiser', tr: 'Konumumu belirle', es: 'Detectar ubicación' },
  ob_push_in: { ar: 'التنبيهات الفورية شغّالة جوه الموقع أول بأول ✓', en: 'Live in-app alerts are active ✓', zh: '站内实时通知已开启 ✓', de: 'In-App-Benachrichtigungen aktiv ✓', ru: 'Уведомления в приложении включены ✓', fr: 'Alertes en direct actives ✓', tr: 'Uygulama içi bildirimler açık ✓', es: 'Alertas en vivo activas ✓' },
  ob_push_ok: { ar: 'الإشعارات شغّالة تمام وهتوصلك أول بأول.', en: 'Notifications are enabled and live.', zh: '通知已开启，消息实时送达。', de: 'Benachrichtigungen aktiviert.', ru: 'Уведомления включены.', fr: 'Notifications activées.', tr: 'Bildirimler açık.', es: 'Notificaciones activadas.' },
  ob_push_need: { ar: 'لازم تفعل الإشعارات علشان يوصلك تنبيه أول ما يجيلك عرض أو رسالة.', en: 'Enable notifications for instant offer & message alerts.', zh: '请开启通知以第一时间接收报价与消息。', de: 'Benachrichtigungen für neue Angebote aktivieren.', ru: 'Включите уведомления для откликов и сообщений.', fr: 'Activez les notifications pour offres et messages.', tr: 'Teklif ve mesajlar için bildirimleri açın.', es: 'Activa notificaciones para ofertas y mensajes.' },
  ob_push_btn_ok: { ar: 'الإشعارات مفعّلة ✓', en: 'Notifications On ✓', zh: '通知已开启 ✓', de: 'Benachrichtigungen an ✓', ru: 'Уведомления включены ✓', fr: 'Notifications activées ✓', tr: 'Bildirimler açık ✓', es: 'Notificaciones activadas ✓' },
  ob_push_btn_go: { ar: 'تفعيل الإشعارات دلوقتي', en: 'Enable Notifications Now', zh: '立即开启通知', de: 'Jetzt aktivieren', ru: 'Включить уведомления', fr: 'Activer les notifications', tr: 'Bildirimleri şimdi aç', es: 'Activar notificaciones' },

  /* Location Picker & Governorate/City Selector */
  loc_all_centers: { ar: 'كل المراكز', en: 'All Districts', zh: '全部区县', de: 'Alle Bezirke', ru: 'Все районы', fr: 'Tous les districts', tr: 'Tüm İlçeler', es: 'Todos los distritos' },
  loc_all_all: { ar: 'كل المحافظات والمراكز', en: 'All Governorates & Cities', zh: '全部省份与城市', de: 'Alle Provinzen & Städte', ru: 'Все провинции и города', fr: 'Toutes les régions et villes', tr: 'Tüm İller ve İlçeler', es: 'Todas las provincias y ciudades' },
  loc_choose_any: { ar: 'اختار المحافظة والمدينة', en: 'Choose Governorate & City', zh: '选择省份与城市', de: 'Provinz & Stadt wählen', ru: 'Выберите провинцию и город', fr: 'Choisir gouvernorat et ville', tr: 'İl ve İlçe Seçin', es: 'Elige provincia y ciudad' },
  loc_all_cities_of: { ar: 'كل مدن ومراكز {g}', en: 'All cities & districts of {g}', zh: '{g} 全部城市与区县', de: 'Alle Städte in {g}', ru: 'Все города и районы ({g})', fr: 'Toutes les villes de {g}', tr: '{g} tüm şehir ve ilçeleri', es: 'Todas las ciudades de {g}' },
  loc_all_govs: { ar: 'كل محافظات مصر', en: 'All Governorates of Egypt', zh: '埃及全部省份', de: 'Alle Provinzen Ägyptens', ru: 'Все провинции Египта', fr: 'Tous les gouvernorats d’Égypte', tr: 'Mısır’ın Tüm İlleri', es: 'Todas las provincias de Egipto' },
  loc_no_match: { ar: 'مفيش مكان بالاسم ده.', en: 'No matching location found.', zh: '未找到匹配的地点。', de: 'Kein passender Ort gefunden.', ru: 'Место с таким названием не найдено.', fr: 'Aucun lieu correspondant.', tr: 'Bu isimde bir yer bulunamadı.', es: 'No se encontró ningún lugar.' },
  loc_pick_city_title: { ar: 'اختار المركز / المدينة · {g}', en: 'Select City / District · {g}', zh: '选择城市 / 区县 · {g}', de: 'Stadt / Bezirk wählen · {g}', ru: 'Выберите город / район · {g}', fr: 'Choisir ville / district · {g}', tr: 'Şehir / İlçe Seç · {g}', es: 'Elegir ciudad / distrito · {g}' },
  loc_pick_gov_title: { ar: 'اختار المحافظة', en: 'Select Governorate', zh: '选择省份', de: 'Provinz wählen', ru: 'Выберите провинцию', fr: 'Choisir le gouvernorat', tr: 'İl Seçin', es: 'Elegir provincia' },
  loc_search_ph: { ar: 'ابحث باسم المحافظة أو المدينة...', en: 'Search governorate or city...', zh: '搜索省份或城市名称...', de: 'Provinz oder Stadt suchen...', ru: 'Поиск провинции или города...', fr: 'Rechercher gouvernorat ou ville...', tr: 'İl veya şehir adıyla ara...', es: 'Buscar provincia o ciudad...' },
  back_aria: { ar: 'رجوع', en: 'Back', zh: '返回', de: 'Zurück', ru: 'Назад', fr: 'Retour', tr: 'Geri', es: 'Atrás' },

  /* S1 Onboarding Form Labels & Modals */
  s1_n1_ph: { ar: 'مثلاً: محمد', en: 'e.g. Mohamed', zh: '例如：穆罕默德', de: 'z. B. Mohamed', ru: 'Напр.: Мохамед', fr: 'Ex : Mohamed', tr: 'Örn: Muhammed', es: 'Ej: Mohamed' },
  s1_n2_ph: { ar: 'أحمد', en: 'Ahmed', zh: '艾哈迈德', de: 'Ahmed', ru: 'Ахмед', fr: 'Ahmed', tr: 'Ahmet', es: 'Ahmed' },
  s1_n3_ph: { ar: 'حسن', en: 'Hassan', zh: '哈桑', de: 'Hassan', ru: 'Хасан', fr: 'Hassan', tr: 'Hasan', es: 'Hassan' },
  s1_ph_lbl: { ar: 'رقم الموبايل المصري', en: 'Egyptian Mobile Number', zh: '埃及手机号码', de: 'Ägyptische Handynummer', ru: 'Египетский номер телефона', fr: 'Numéro mobile égyptien', tr: 'Mısır Cep Numarası', es: 'Número móvil egipcio' },
  s1_loc_lbl: { ar: 'المحافظة والمركز / المدينة', en: 'Governorate & City / District', zh: '省份与城市 / 区县', de: 'Provinz & Stadt / Bezirk', ru: 'Провинция и город / район', fr: 'Gouvernorat et ville', tr: 'İl ve İlçe / Şehir', es: 'Provincia y ciudad' },
  s1_area_lbl: { ar: 'المنطقة أو الشارع أو القرية (اختياري)', en: 'Neighborhood, Street or Village (optional)', zh: '街区、街道或村庄（可选）', de: 'Viertel, Straße oder Dorf (optional)', ru: 'Район, улица или деревня (необяз.)', fr: 'Quartier, rue ou village (optionnel)', tr: 'Mahalle, Sokak veya Köy (isteğe bağlı)', es: 'Barrio, calle o pueblo (opcional)' },
  s1_area_ph: { ar: 'مثلاً: شارع الجلاء / الحي التالت', en: 'e.g. El Galaa St / 3rd District', zh: '例如：解放街 / 第三社区', de: 'z. B. El-Galaa-Str. / 3. Bezirk', ru: 'Напр.: ул. Эль-Галаа / 3-й район', fr: 'Ex : Rue El Galaa / 3e quartier', tr: 'Örn: El Galaa Cd. / 3. Mahalle', es: 'Ej: Calle El Galaa / Distrito 3' },
  s1_perms_lbl: { ar: 'تفعيل الموقع والإشعارات (إجباري لإتمام التسجيل)', en: 'Enable Location & Notifications (Required)', zh: '开启定位与通知权限（完成注册必填）', de: 'Standort & Benachrichtigungen (erforderlich)', ru: 'Геолокация и уведомления (обязательно)', fr: 'Localisation et notifications (obligatoire)', tr: 'Konum ve Bildirimler (Kayıt için zorunlu)', es: 'Ubicación y notificaciones (obligatorio)' },
  s1_loc_b: { ar: 'تحديد الموقع الجغرافي', en: 'GPS Location Access', zh: '地理位置定位', de: 'Standortbestimmung', ru: 'Геолокация', fr: 'Position géographique', tr: 'Coğrafi Konum', es: 'Ubicación geográfica' },
  s1_push_b: { ar: 'تفعيل الإشعارات', en: 'Push Notifications', zh: '开启消息通知', de: 'Benachrichtigungen', ru: 'Уведомления', fr: 'Notifications', tr: 'Bildirimleri Aç', es: 'Notificaciones' },
  s1_back_h2: { ar: 'تحب تعمل إيه دلوقتي؟', en: 'What would you like to do?', zh: '您现在想做什么？', de: 'Was möchten Sie tun?', ru: 'Что вы хотите сделать?', fr: 'Que souhaitez-vous faire ?', tr: 'Şimdi ne yapmak istersin?', es: '¿Qué te gustaría hacer?' },
  s1_back_p: { ar: 'بيانات حسابك لسه ما اتكملتش — تقدر تتصفح وصلة كزائر دلوقتي وترجع تكمّل بياناتك وقت ما تحب، أو تختار حساب جوجل تاني:', en: 'Your profile isn’t complete yet — you can browse Wasla as a guest now and finish later, or switch Google accounts:', zh: '您的账户资料尚未完成 — 您可以先以访客身份浏览，稍后再补充，或切换其他 Google 账号：', de: 'Ihr Profil ist noch unvollständig – jetzt als Gast stöbern oder ein anderes Google-Konto wählen:', ru: 'Профиль ещё не заполнен — вы можете продолжить как гость или выбрать другой аккаунт Google:', fr: 'Votre profil n’est pas encore terminé — naviguez en invité ou changez de compte Google :', tr: 'Hesap bilgilerin henüz tamamlanmadı — şimdi misafir olarak gezebilir veya başka bir Google hesabı seçebilirsin:', es: 'Tu perfil aún no está completo: explora como invitado ahora o cambia de cuenta de Google:' },
  s1_browse_guest: { ar: 'اتصفح الموقع دلوقتي', en: 'Browse as Guest Now', zh: '先以访客浏览网站', de: 'Jetzt als Gast stöbern', ru: 'Смотреть сайт сейчас', fr: 'Parcourir le site maintenant', tr: 'Şimdi Siteyi Gez', es: 'Explorar el sitio ahora' },
  s1_switch_acct: { ar: 'اختار حساب جوجل تاني', en: 'Choose Another Google Account', zh: '切换其他 Google 账号', de: 'Anderes Google-Konto wählen', ru: 'Выбрать другой аккаунт Google', fr: 'Choisir un autre compte Google', tr: 'Başka Google Hesabı Seç', es: 'Elegir otra cuenta de Google' },
  s1_cont_reg: { ar: 'كمّل تسجيل الحساب', en: 'Continue Registration', zh: '继续完成注册', de: 'Registrierung fortsetzen', ru: 'Продолжить регистрацию', fr: 'Continuer l’inscription', tr: 'Kayda Devam Et', es: 'Continuar registro' },

  /* Chat Attachment & Context Actions */
  att_title: { ar: 'إرسال', en: 'Share & Attach', zh: '发送与附件', de: 'Senden & Anhängen', ru: 'Отправить', fr: 'Envoyer et joindre', tr: 'Gönder ve Ekle', es: 'Enviar y adjuntar' },
  att_photos: { ar: 'صور (حتى 3)', en: 'Photos (up to 3)', zh: '照片（最多 3 张）', de: 'Fotos (bis zu 3)', ru: 'Фото (до 3)', fr: 'Photos (jusqu’à 3)', tr: 'Fotoğraf (en fazla 3)', es: 'Fotos (hasta 3)' },
  att_cam: { ar: 'الكاميرا', en: 'Camera', zh: '拍照', de: 'Kamera', ru: 'Камера', fr: 'Caméra', tr: 'Kamera', es: 'Cámara' },
  att_loc: { ar: 'موقعي', en: 'My Location', zh: '我的位置', de: 'Mein Standort', ru: 'Моя геопозиция', fr: 'Ma position', tr: 'Konumum', es: 'Mi ubicación' },
  att_deal: { ar: 'اتفاق ميعاد وسعر', en: 'Deal Card (Price & Time)', zh: '服务协议卡（价格与时间）', de: 'Vereinbarung (Preis & Termin)', ru: 'Карточка сделки (цена и время)', fr: 'Accord (prix et horaire)', tr: 'Anlaşma Kartı (Fiyat ve Saat)', es: 'Acuerdo (precio y hora)' },
  loc_share_h2: { ar: 'مشاركة الموقع الحالي', en: 'Share Current Location', zh: '分享当前位置', de: 'Aktuellen Standort teilen', ru: 'Поделиться текущей геопозицией', fr: 'Partager la position actuelle', tr: 'Mevcut Konumu Paylaş', es: 'Compartir ubicación actual' },
  loc_acc_note: { ar: 'الدقة التقريبية: ±{m} متر', en: 'Approx. accuracy: ±{m} m', zh: '精度约 ±{m} 米', de: 'Genauigkeit: ca. ±{m} m', ru: 'Точность: ±{m} м', fr: 'Précision : ±{m} m', tr: 'Yaklaşık doğruluk: ±{m} m', es: 'Precisión aprox.: ±{m} m' },
  loc_send_btn: { ar: 'إرسال الموقع', en: 'Send Location', zh: '发送位置', de: 'Standort senden', ru: 'Отправить локацию', fr: 'Envoyer la position', tr: 'Konumu Gönder', es: 'Enviar ubicación' },
  ctx_del_me: { ar: 'حذف من عندي', en: 'Delete for me', zh: '从我这里删除', de: 'Für mich löschen', ru: 'Удалить у меня', fr: 'Supprimer pour moi', tr: 'Benden sil', es: 'Eliminar para mí' },
  ctx_del_all: { ar: 'حذف للجميع', en: 'Delete for everyone', zh: '为所有人删除', de: 'Für alle löschen', ru: 'Удалить у всех', fr: 'Supprimer pour tous', tr: 'Herkesten sil', es: 'Eliminar para todos' },

  /* Dedicated Full-Page Language Hub (VIEWS['اللغة']) */
  lang_page_hero_h: {
    ar: 'بوابة اللغات والثقافات العالمية',
    en: 'Global Languages & Cultural Hub',
    zh: '全球语言与文化中心',
    de: 'Weltweite Sprachen & Kulturen',
    ru: 'Мировые языки и культуры',
    fr: 'Portail des Langues et Cultures',
    tr: 'Dünya Dilleri ve Kültür Merkezi',
    es: 'Portal de Idiomas y Culturas'
  },
  lang_page_hero_p: {
    ar: 'اختار لغتك المفضلة — الواجهة بالكامل، الـ 27 محافظة وجميع المراكز، والكتابة الصوتية الفورية هتتحول معاك بتأثير التفتيت السينمائي.',
    en: 'Pick your preferred language — the entire interface, all 27 governorates & 245+ cities, and live voice typing adapt seamlessly.',
    zh: '选择您偏好的语言 — 全站界面、埃及 27 省与 245+ 城市以及实时语音输入将通过粒子动效无缝切换。',
    de: 'Wählen Sie Ihre Sprache — die gesamte Oberfläche, alle 27 Provinzen & 245+ Städte sowie die Spracheingabe passen sich sofort an.',
    ru: 'Выберите удобный язык — весь интерфейс, все 27 провинций и 245+ городов, а также голосовой ввод перестроятся мгновенно.',
    fr: 'Choisissez votre langue — toute l’interface, les 27 gouvernorats et 245+ villes ainsi que la dictée vocale s’adaptent instantanément.',
    tr: 'Dilini seç — tüm arayüz, 27 il ve 245+ ilçe ile canlı sesli yazma sinematik parçacık efektiyle anında dönüşür.',
    es: 'Elige tu idioma — toda la interfaz, las 27 provincias y 245+ ciudades y el dictado por voz se adaptan al instante.'
  },
  lang_search_ph: {
    ar: 'ابحث عن لغة أو بلد أو ثقافة...',
    en: 'Search language, country, or culture...',
    zh: '搜索语言、国家或文化...',
    de: 'Sprache, Land oder Kultur suchen...',
    ru: 'Поиск языка, страны или культуры...',
    fr: 'Rechercher une langue, un pays ou une culture...',
    tr: 'Dil, ülke veya kültür ara...',
    es: 'Buscar idioma, país o cultura...'
  },
  lang_active_badge: {
    ar: 'اللغة النشطة الآن ✓',
    en: 'Active Language ✓',
    zh: '当前使用语言 ✓',
    de: 'Aktive Sprache ✓',
    ru: 'Активный язык ✓',
    fr: 'Langue active ✓',
    tr: 'Aktif Dil ✓',
    es: 'Idioma activo ✓'
  },
  lang_select_btn: {
    ar: 'تفعيل اللغة الآن',
    en: 'Switch to Language',
    zh: '立即切换此语言',
    de: 'Sprache aktivieren',
    ru: 'Включить этот язык',
    fr: 'Activer cette langue',
    tr: 'Bu Dile Geç',
    es: 'Activar este idioma'
  },
  lang_dir_rtl: {
    ar: 'من اليمين لليسار (RTL)',
    en: 'Right-to-Left (RTL)',
    zh: '从右向左 (RTL)',
    de: 'Rechts-nach-Links (RTL)',
    ru: 'Справа налево (RTL)',
    fr: 'Droite à gauche (RTL)',
    tr: 'Sağdan Sola (RTL)',
    es: 'Derecha a izquierda (RTL)'
  },
  lang_dir_ltr: {
    ar: 'من اليسار لليمين (LTR)',
    en: 'Left-to-Right (LTR)',
    zh: '从左向右 (LTR)',
    de: 'Links-nach-Rechts (LTR)',
    ru: 'Слева направо (LTR)',
    fr: 'Gauche à droite (LTR)',
    tr: 'Soldan Sağa (LTR)',
    es: 'Izquierda a derecha (LTR)'
  },
  lang_voice_ready: {
    ar: 'إملاء صوتي ذكي',
    en: 'Smart Voice Dictation',
    zh: '智能语音听写',
    de: 'Sprachdiktat bereit',
    ru: 'Голосовой ввод',
    fr: 'Dictée vocale',
    tr: 'Sesli Yazma Hazır',
    es: 'Dictado por voz'
  },
  lang_stat_langs: {
    ar: '8 لغات عالمية حية',
    en: '8 Live Global Languages',
    zh: '8 种全球语言',
    de: '8 Weltsprachen',
    ru: '8 мировых языков',
    fr: '8 langues mondiales',
    tr: '8 Dünya Dili',
    es: '8 idiomas globales'
  },
  lang_stat_govs: {
    ar: '27 محافظة و+245 مدينة مترجمة',
    en: '27 Govs & 245+ Cities Localized',
    zh: '27 省与 245+ 城市全翻译',
    de: '27 Provinzen & 245+ Städte übersetzt',
    ru: '27 провинций и 245+ городов',
    fr: '27 régions & 245+ villes traduites',
    tr: '27 İl ve 245+ İlçe Çevrili',
    es: '27 provincias y 245+ ciudades'
  },
  lang_empty_search: {
    ar: 'مفيش لغة مطابقة للبحث ده.',
    en: 'No language matches your search.',
    zh: '没有找到匹配的语言。',
    de: 'Keine passende Sprache gefunden.',
    ru: 'Язык по запросу не найден.',
    fr: 'Aucune langue ne correspond.',
    tr: 'Aramanızla eşleşen dil yok.',
    es: 'Ningún idioma coincide con tu búsqueda.'
  },
  quota_img_title: {
    ar: 'اكتمل حد الصور اليومي في الدردشة',
    en: 'Daily Chat Photo Limit Reached',
    zh: '今日聊天图片额度已用完',
    de: 'Tageslimit für Chat-Fotos erreicht',
    ru: 'Дневной лимит фото исчерпан',
    fr: 'Limite quotidienne de photos atteinte',
    tr: 'Günlük Fotoğraf Sınırına Ulaşıldı',
    es: 'Límite diario de fotos alcanzado'
  },
  quota_img_desc: {
    ar: 'مسموح لك بإرسال 3 صور كحد أقصى خلال كل 24 ساعة في الدردشة، للحفاظ على سرعة وخفة المحادثات للجميع.',
    en: 'You can send up to 3 photos every 24 hours in chat to keep conversations fast and reliable for everyone.',
    zh: '为保持聊天流畅与高速响应，每位用户每 24 小时最多可发送 3 张聊天图片。',
    de: 'Du kannst alle 24 Stunden bis zu 3 Fotos im Chat senden, damit Chats schnell und leicht bleiben.',
    ru: 'Можно отправлять до 3 фото каждые 24 часа, чтобы чаты оставались быстрыми для всех.',
    fr: 'Vous pouvez envoyer jusqu’à 3 photos par tranche de 24 h pour garder des échanges fluides.',
    tr: 'Sohbetlerin hızlı ve akıcı kalması için 24 saatte en fazla 3 fotoğraf gönderebilirsin.',
    es: 'Puedes enviar hasta 3 fotos cada 24 horas en el chat para mantener las charlas rápidas.'
  },
  quota_voice_title: {
    ar: 'اكتمل حد الرسائل الصوتية اليومي',
    en: 'Daily Voice Note Limit Reached',
    zh: '今日语音消息额度已用完',
    de: 'Tageslimit für Sprachnachrichten erreicht',
    ru: 'Дневной лимит голосовых исчерпан',
    fr: 'Limite quotidienne de vocaux atteinte',
    tr: 'Günlük Sesli Mesaj Sınırına Ulaşıldı',
    es: 'Límite diario de notas de voz alcanzado'
  },
  quota_voice_desc: {
    ar: 'مسموح لك بإرسال 5 فويزات صوتية كحد أقصى خلال كل 24 ساعة في الدردشة لضمان استقرار وجودة الصوت.',
    en: 'You can send up to 5 voice messages every 24 hours in chat to keep audio crisp and fast.',
    zh: '为保障通话级清晰度与服务器稳定，每位用户每 24 小时最多可发送 5 条语音消息。',
    de: 'Du kannst alle 24 Stunden maximal 5 Sprachnachrichten senden, damit alles stabil bleibt.',
    ru: 'Доступно до 5 голосовых сообщений каждые 24 часа для стабильной работы чата.',
    fr: 'Vous pouvez envoyer jusqu’à 5 messages vocaux par 24 h pour garantir une qualité optimale.',
    tr: 'Ses kalitesini ve hızı korumak için 24 saatte en fazla 5 sesli mesaj gönderebilirsin.',
    es: 'Puedes enviar hasta 5 notas de voz cada 24 horas para mantener el servicio fluido.'
  },
  quota_meter_lbl: {
    ar: 'الرصيد المستخدم خلال 24 ساعة',
    en: '24-Hour Usage Quota',
    zh: '24 小时已用额度',
    de: '24-Stunden-Kontingent',
    ru: 'Использовано за 24 часа',
    fr: 'Utilisation sur 24 heures',
    tr: '24 Saatlik Kullanım',
    es: 'Uso en las últimas 24 h'
  },
  quota_reset_lbl: {
    ar: 'يتجدد الإرسال تلقائياً خلال',
    en: 'Next slot unlocks in',
    zh: '下次可发送倒计时',
    de: 'Nächstes Kontingent frei in',
    ru: 'Следующее окно откроется через',
    fr: 'Prochain créneau dans',
    tr: 'Yeni hak açılma süresi',
    es: 'Se desbloquea en'
  },
  quota_tip_txt: {
    ar: 'تقدر تكمل محادثتك فوراً بالرسائل النصية أو مشاركة موقعك والاتفاقية عادي',
    en: 'You can keep chatting right away with text messages, location pins, or deal cards',
    zh: '您仍可随时发送文字消息、位置坐标或时间价格协议卡片',
    de: 'Du kannst direkt mit Textnachrichten, Standort-Pins oder Deal-Karten weiterschreiben',
    ru: 'Вы по-прежнему можете писать текстом, отправлять геопозицию и условия сделки',
    fr: 'Vous pouvez continuer librement par texte, position GPS ou carte d’accord',
    tr: 'Metin mesajları, konum paylaşımı ve anlaşma kartlarıyla sohbete hemen devam edebilirsin',
    es: 'Puedes seguir chateando ahora mismo por texto, ubicación o tarjetas de acuerdo'
  },
  quota_ok_btn: {
    ar: 'تمام · العودة للدردشة',
    en: 'Got It · Back to Chat',
    zh: '知道了 · 返回聊天',
    de: 'Verstanden · Zurück',
    ru: 'Понятно · В чат',
    fr: 'Compris · Retour au chat',
    tr: 'Anlaşıldı · Sohbete Dön',
    es: 'Entendido · Volver al chat'
  },
  quota_img_left: {
    ar: 'متبقي {r}/3 خلال 24 ساعة',
    en: '{r}/3 left today',
    zh: '今日剩 {r}/3 张',
    de: 'Noch {r}/3 heute',
    ru: 'Осталось {r}/3 за 24ч',
    fr: '{r}/3 restant(s)',
    tr: 'Bugün {r}/3 kaldı',
    es: 'Quedan {r}/3 hoy'
  },
  quota_img_zero: {
    ar: 'اكتمل 3/3 اليوم',
    en: '3/3 limit reached',
    zh: '3/3 已达上限',
    de: '3/3 erschöpft',
    ru: 'Лимит 3/3',
    fr: '3/3 utilisé',
    tr: '3/3 doldu',
    es: '3/3 límite'
  },
  quota_voice_left: {
    ar: 'فويز ({r}/5 متبقي اليوم)',
    en: 'Voice ({r}/5 left today)',
    zh: '语音（今日剩 {r}/5 条）',
    de: 'Sprache ({r}/5 heute übrig)',
    ru: 'Голос ({r}/5 осталось)',
    fr: 'Vocal ({r}/5 restants)',
    tr: 'Sesli ({r}/5 kaldı)',
    es: 'Voz ({r}/5 hoy)'
  },
  quota_partial_warn: {
    ar: 'تم اختيار {n} صورة فقط (المتبقي لك من رصيد الـ 24 ساعة)',
    en: 'Selected {n} photo(s) based on your remaining 24h allowance',
    zh: '已按您当前 24 小时剩余额度选择了 {n} 张图片',
    de: '{n} Foto(s) gemäß deinem verbleibenden 24h-Limit ausgewählt',
    ru: 'Выбрано {n} фото по остатку лимита за 24 часа',
    fr: '{n} photo(s) sélectionnée(s) selon votre quota 24h restant',
    tr: 'Kalan 24 saatlik hakkına göre {n} fotoğraf seçildi',
    es: 'Se seleccionaron {n} foto(s) según tu límite de 24 h'
  },
  quota_max_3_note: {
    ar: 'مساحة الإرسال بحد أقصى 3 صور كل 24 ساعة.',
    en: 'Chat allows up to 3 photos per 24 hours.',
    zh: '每 24 小时最多可发送 3 张图片。',
    de: 'Maximal 3 Fotos pro 24 Stunden.',
    ru: 'Максимум 3 фото за 24 часа.',
    fr: 'Maximum 3 photos par 24 heures.',
    tr: '24 saatte en fazla 3 fotoğraf.',
    es: 'Máximo 3 fotos cada 24 horas.'
  },

  /* ====== Share Sheet, Link Preview & Studio Story Card ====== */
  fb_lbl: { ar: 'فيسبوك', en: 'Facebook', zh: '脸书', de: 'Facebook', ru: 'Facebook', fr: 'Facebook', tr: 'Facebook', es: 'Facebook' },
  story_lbl: { ar: 'ستوري', en: 'Story', zh: '快拍海报', de: 'Story', ru: 'Сторис', fr: 'Story', tr: 'Hikâye', es: 'Historia' },
  copied_btn: { ar: 'اتنسخ', en: 'Copied', zh: '已复制', de: 'Kopiert', ru: 'Скопировано', fr: 'Copié', tr: 'Kopyalandı', es: 'Copiado' },
  share_btn_lbl: { ar: 'مشاركة', en: 'Share', zh: '分享', de: 'Teilen', ru: 'Поделиться', fr: 'Partager', tr: 'Paylaş', es: 'Compartir' },
  share_app_tag: { ar: 'منصة وصلة', en: 'Wasla Platform', zh: 'Wasla 服务平台', de: 'Wasla Plattform', ru: 'Платформа Wasla', fr: 'Plateforme Wasla', tr: 'Wasla Platformu', es: 'Plataforma Wasla' },
  share_app_title: { ar: 'وصلة · الصنعة والخدمة في منطقتك', en: 'Wasla · Services & Pros Near You', zh: 'Wasla · 身边可靠的服务与技师', de: 'Wasla · Dienste & Profis vor Ort', ru: 'Wasla · Услуги и мастера рядом', fr: 'Wasla · Services et pros près de chez vous', tr: 'Wasla · Bölgenizdeki Hizmet ve Ustalar', es: 'Wasla · Servicios y profesionales cerca' },
  share_app_sub: { ar: 'اطلب أي خدمة أو صنايعي قريب منك مجاناً وبكل أمان في مصر', en: 'Request any local service or verified technician near you for free & safely', zh: '免费安全预约身边的本地服务与认证技师，直连沟通零佣金', de: 'Finde lokale Dienste & geprüfte Profis kostenlos & sicher in deiner Nähe', ru: 'Находите мастеров и локальные услуги рядом бесплатно и безопасно', fr: 'Trouvez artisans et services locaux près de chez vous gratuitement', tr: 'Yakınındaki güvenilir ustaları ve hizmetleri ücretsiz ve güvenle bul', es: 'Encuentra técnicos y servicios locales gratis y de forma segura' },
  share_app_text: { ar: 'جرّب موقع وتطبيق وصلة للخدمات والصنايعية القريبين منك: {u}', en: 'Try Wasla for trusted nearby services & technicians: {u}', zh: '推荐试试 Wasla 找附近靠谱技师和服务：{u}', de: 'Entdecke Wasla für lokale Dienste & Profis in deiner Nähe: {u}', ru: 'Попробуйте Wasla для поиска проверенных мастеров рядом: {u}', fr: 'Essayez Wasla pour vos services locaux et artisans de confiance : {u}', tr: 'Yakınındaki hizmet ve ustalar için Wasla uygulamasını dene: {u}', es: 'Prueba Wasla para servicios locales y técnicos cerca de ti: {u}' },
  share_all_loc: { ar: 'كل محافظات مصر', en: 'All Across Egypt', zh: '覆盖埃及全境各省', de: 'Ganz Ägypten', ru: 'По всему Египту', fr: 'Partout en Égypte', tr: 'Mısır Genelinde', es: 'En todo Egipto' },
  share_loc_def: { ar: 'مصر', en: 'Egypt', zh: '埃及', de: 'Ägypten', ru: 'Египет', fr: 'Égypte', tr: 'Mısır', es: 'Egipto' },
  share_req_tag: { ar: 'طلب خدمة', en: 'Service Request', zh: '服务需求', de: 'Service-Anfrage', ru: 'Запрос услуги', fr: 'Demande de service', tr: 'Hizmet Talebi', es: 'Solicitud de servicio' },
  share_req_sub_def: { ar: 'طلب خدمة على وصلة', en: 'Service request on Wasla', zh: 'Wasla 平台服务需求', de: 'Service-Anfrage auf Wasla', ru: 'Заявка на услугу в Wasla', fr: 'Demande de service sur Wasla', tr: 'Wasla üzerinden hizmet talebi', es: 'Solicitud de servicio en Wasla' },
  share_bud_fmt: { ar: 'الميزانية: {b}', en: 'Budget: {b}', zh: '预算：{b}', de: 'Budget: {b}', ru: 'Бюджет: {b}', fr: 'Budget : {b}', tr: 'Bütçe: {b}', es: 'Presupuesto: {b}' },
  share_req_text: { ar: 'طلب خدمة على وصلة: {t}{loc}\n{u}', en: 'Service request on Wasla: {t}{loc}\n{u}', zh: 'Wasla 平台服务需求：{t}{loc}\n{u}', de: 'Service-Anfrage auf Wasla: {t}{loc}\n{u}', ru: 'Заказ услуги на Wasla: {t}{loc}\n{u}', fr: 'Demande sur Wasla : {t}{loc}\n{u}', tr: 'Wasla hizmet talebi: {t}{loc}\n{u}', es: 'Solicitud en Wasla: {t}{loc}\n{u}' },
  share_prov_tag: { ar: 'حساب على وصلة', en: 'Wasla Profile', zh: 'Wasla 用户主页', de: 'Wasla-Profil', ru: 'Профиль Wasla', fr: 'Profil Wasla', tr: 'Wasla Profili', es: 'Perfil en Wasla' },
  share_prov_sub_def: { ar: 'صفحة مقدم الخدمة والمعاملات', en: 'Service provider page & verified deals', zh: '服务商主页与认证成交记录', de: 'Anbieter-Profil & bestätigte Aufträge', ru: 'Страница мастера и отзывы клиентов', fr: 'Profil du prestataire et transactions', tr: 'Hizmet veren sayfası ve işlemleri', es: 'Perfil del proveedor y tratos verificados' },
  share_user_sub_def: { ar: 'صفحة المعاملات والطلبات', en: 'Profile, requests & verified deals', zh: '需求与信用交易主页', de: 'Anfragen- & Transaktionsprofil', ru: 'Заказы и история сделок', fr: 'Demandes et transactions vérifiées', tr: 'Talepler ve işlem geçmişi sayfası', es: 'Página de pedidos y tratos' },
  share_prov_text: { ar: 'شوف صفحة {n} على وصلة{loc}: {u}', en: 'Check {n} on Wasla{loc}: {u}', zh: '在 Wasla 查看 {n} 的主页{loc}：{u}', de: 'Sieh dir {n} auf Wasla an{loc}: {u}', ru: 'Посмотрите профиль {n} на Wasla{loc}: {u}', fr: 'Découvrez {n} sur Wasla{loc} : {u}', tr: 'Wasla’da {n} profiline göz at{loc}: {u}', es: 'Mira el perfil de {n} en Wasla{loc}: {u}' },
  story_brand_hdr: { ar: 'وصلة · خدمات ومنفّذين حولك', en: 'WASLA · LOCAL PROS', zh: 'WASLA · 身边好服务', de: 'WASLA · LOKALE PROFIS', ru: 'WASLA · УСЛУГИ РЯДОМ', fr: 'WASLA · PROS LOCAUX', tr: 'WASLA · YEREL USTALAR', es: 'WASLA · PROS LOCALES' },
  story_banner_pill: { ar: 'بوستر مشاركة مباشر', en: 'LIVE SHARE CARD', zh: '实时分享卡片', de: 'LIVE-TEILKARTE', ru: 'ЖИВАЯ КАРТОЧКА', fr: 'CARTE PARTAGÉE', tr: 'CANLI PAYLAŞIM', es: 'TARJETA EN VIVO' },
  story_direct_cta: { ar: 'تواصل مباشر بدون عمولة ✓', en: 'Direct & Zero Fee ✓', zh: '直连沟通 · 零佣金 ✓', de: 'Direkt & Gebührenfrei ✓', ru: 'Напрямую и без комиссий ✓', fr: 'Contact direct sans frais ✓', tr: 'Doğrudan & Komisyonsuz ✓', es: 'Trato directo y sin comisión ✓' },
  story_footer_cta: { ar: 'افتح الرابط المباشر من المتصفح أو تليجرام وواتساب', en: 'OPEN DIRECTLY IN BROWSER, TELEGRAM OR WHATSAPP', zh: '在浏览器、Telegram 或 WhatsApp 中直接打开直达链接', de: 'DIREKT IN BROWSER, TELEGRAM ODER WHATSAPP ÖFFNEN', ru: 'ОТКРОЙТЕ ПРЯМУЮ ССЫЛКУ В БРАУЗЕРЕ ИЛИ МЕССЕНДЖЕРЕ', fr: 'OUVREZ DIRECTEMENT SUR NAVIGATEUR, TELEGRAM OU WHATSAPP', tr: 'TARAYICI, TELEGRAM VEYA WHATSAPP İLE HEMEN AÇIN', es: 'ABRE EL ENLACE EN NAVEGADOR, TELEGRAM O WHATSAPP' },
  story_hl_1: { ar: 'دردشة فورية ومشفّرة', en: 'Instant Chat', zh: '即时安全沟通', de: 'Sofort-Chat', ru: 'Быстрый чат', fr: 'Chat instantané', tr: 'Anlık Sohbet', es: 'Chat al instante' },
  story_hl_2: { ar: 'تقييمات موثّقة', en: 'Verified Reviews', zh: '真实成交评价', de: 'Geprüft & Fair', ru: 'Честные отзывы', fr: 'Avis vérifiés', tr: 'Doğrulanmış Oy', es: 'Reseñas reales' },
  story_hl_3: { ar: 'الأقرب لموقعك', en: 'Radar Nearby', zh: '就近极速匹配', de: 'Direkt vor Ort', ru: 'Рядом с вами', fr: 'Près de vous', tr: 'Konuma En Yakın', es: 'Cerca de ti' },
  story_scan_hint: { ar: 'امسح الكود أو افتح الرابط', en: 'SCAN OR TAP LINK', zh: '扫码或点击链接立即体验', de: 'SCANNEN ODER TIPPEN', ru: 'СКАН ИЛИ ССЫЛКА', fr: 'SCANNER OU LIEN', tr: 'TARA VEYA AÇ', es: 'ESCANEA O ABRE' },
  story_ready_toast: { ar: 'اتجهّز كارت الستوري بالتصميم الجديد ✓', en: 'New localized Story card ready ✓', zh: '新版多语言快拍海报已生成 ✓', de: 'Neue Story-Karte erstellt ✓', ru: 'Новая карточка Сторис готова ✓', fr: 'Nouvelle Story générée ✓', tr: 'Yeni Hikâye görseli hazırlandı ✓', es: 'Nueva tarjeta Story lista ✓' },

  /* ====== Message Context Menu, Chat Status & Inline Translation ====== */
  ctx_reply: { ar: 'رد', en: 'Reply', zh: '回复', de: 'Antworten', ru: 'Ответить', fr: 'Répondre', tr: 'Yanıtla', es: 'Responder' },
  ctx_copy: { ar: 'نسخ النص', en: 'Copy text', zh: '复制文字', de: 'Text kopieren', ru: 'Копировать', fr: 'Copier le texte', tr: 'Metni kopyala', es: 'Copiar texto' },
  ctx_pin: { ar: 'تثبيت', en: 'Pin', zh: '置顶', de: 'Anheften', ru: 'Закрепить', fr: 'Épingler', tr: 'Sabitle', es: 'Fijar' },
  ctx_unpin: { ar: 'إلغاء التثبيت', en: 'Unpin', zh: '取消置顶', de: 'Lösen', ru: 'Открепить', fr: 'Désépingler', tr: 'Sabitlemeyi kaldır', es: 'Desfijar' },
  msg_edited: { ar: 'معدّلة', en: 'edited', zh: '已编辑', de: 'bearbeitet', ru: 'изменено', fr: 'modifié', tr: 'düzenlendi', es: 'editado' },
  msg_seen: { ar: 'تمت القراءة', en: 'Seen', zh: '已读', de: 'Gelesen', ru: 'Прочитано', fr: 'Vu', tr: 'Okundu', es: 'Leído' },
  msg_sent: { ar: 'تم الإرسال', en: 'Sent', zh: '已发送', de: 'Gesendet', ru: 'Отправлено', fr: 'Envoyé', tr: 'Gönderildi', es: 'Enviado' },
  msg_play_aria: { ar: 'تشغيل', en: 'Play voice message', zh: '播放语音', de: 'Abspielen', ru: 'Воспроизвести', fr: 'Lire', tr: 'Oynat', es: 'Reproducir' },
  msg_speed_aria: { ar: 'سرعة التشغيل', en: 'Playback speed', zh: '倍速切换', de: 'Geschwindigkeit', ru: 'Скорость', fr: 'Vitesse', tr: 'Hız', es: 'Velocidad' },
  msg_img_alt: { ar: 'صورة مرفقة', en: 'Attached photo', zh: '图片附件', de: 'Angehängtes Foto', ru: 'Фотография', fr: 'Photo jointe', tr: 'Ekli fotoğraf', es: 'Foto adjunta' },
  msg_audio_lbl: { ar: 'رسالة صوتية {d}', en: 'Voice note {d}', zh: '语音消息 {d}', de: 'Sprachnachricht {d}', ru: 'Голосовое {d}', fr: 'Vocal {d}', tr: 'Sesli mesaj {d}', es: 'Nota de voz {d}' },
  msg_loc_lbl: { ar: 'موقع مشترك', en: 'Shared location', zh: '共享位置', de: 'Geteilter Standort', ru: 'Геолокация', fr: 'Position partagée', tr: 'Paylaşılan konum', es: 'Ubicación compartida' },
  msg_open_map: { ar: 'اضغط لفتح الموقع على الخريطة', en: 'Tap to open location on map', zh: '点击在地图中打开', de: 'Auf Karte öffnen', ru: 'Открыть на карте', fr: 'Ouvrir sur la carte', tr: 'Haritada aç', es: 'Abrir en el mapa' },
  msg_dl_photo: { ar: 'تنزيل الصورة', en: 'Download photo', zh: '保存图片', de: 'Foto herunterladen', ru: 'Скачать фото', fr: 'Télécharger l’image', tr: 'Fotoğrafı indir', es: 'Descargar foto' },
  msg_you: { ar: 'أنت', en: 'You', zh: '您', de: 'Du', ru: 'Вы', fr: 'Vous', tr: 'Sen', es: 'Tú' },
  msg_orig_deleted: { ar: 'الرسالة الأصلية اتحذفت.', en: 'Original message was deleted.', zh: '原消息已被删除。', de: 'Ursprüngliche Nachricht gelöscht.', ru: 'Исходное сообщение удалено.', fr: 'Message original supprimé.', tr: 'Orijinal mesaj silindi.', es: 'El mensaje original fue eliminado.' },
  tr_btn_tip: { ar: 'ترجمة', en: 'Translate', zh: '翻译', de: 'Übersetzen', ru: 'Перевести', fr: 'Traduire', tr: 'Çevir', es: 'Traducir' },
  tr_orig_tip: { ar: 'النص الأصلي', en: 'Original', zh: '查看原文', de: 'Original', ru: 'Оригинал', fr: 'Original', tr: 'Orijinal', es: 'Original' },
  tr_badge_on: { ar: 'مترجم · اضغط للأصل', en: 'Translated · tap for original', zh: '已翻译 · 点击还原', de: 'Übersetzt · Original', ru: 'Переведено · оригинал', fr: 'Traduit · voir l’original', tr: 'Çevrildi · orijinali gör', es: 'Traducido · ver original' },
  tr_fail: { ar: 'تعذرت الترجمة حالياً — تأكد من الاتصال.', en: 'Could not translate right now — check connection.', zh: '暂无法完成翻译，请检查网络。', de: 'Übersetzung momentan nicht möglich.', ru: 'Не удалось перевести — проверьте сеть.', fr: 'Traduction indisponible — vérifiez la connexion.', tr: 'Şu an çeviri yapılamadı — bağlantıyı kontrol edin.', es: 'No se pudo traducir ahora — revisa tu conexión.' },

  /* ====== In-Chat Search & Categories ====== */
  chat_srch_all: { ar: 'الكل ({n})', en: 'All ({n})', zh: '全部 ({n})', de: 'Alle ({n})', ru: 'Все ({n})', fr: 'Tout ({n})', tr: 'Tümü ({n})', es: 'Todo ({n})' },
  chat_srch_deal: { ar: 'أسعار واتفاقات ({n})', en: 'Deals & Prices ({n})', zh: '价格与协议 ({n})', de: 'Preise & Deals ({n})', ru: 'Цены и сделки ({n})', fr: 'Prix & Accords ({n})', tr: 'Fiyat ve Anlaşma ({n})', es: 'Precios y Tratos ({n})' },
  chat_srch_text: { ar: 'الرسائل ({n})', en: 'Messages ({n})', zh: '消息 ({n})', de: 'Nachrichten ({n})', ru: 'Сообщения ({n})', fr: 'Messages ({n})', tr: 'Mesajlar ({n})', es: 'Mensajes ({n})' },
  chat_srch_img: { ar: 'الصور ({n})', en: 'Photos ({n})', zh: '图片 ({n})', de: 'Fotos ({n})', ru: 'Фото ({n})', fr: 'Photos ({n})', tr: 'Fotoğraflar ({n})', es: 'Fotos ({n})' },
  chat_srch_audio: { ar: 'الصوت ({n})', en: 'Voice ({n})', zh: '语音 ({n})', de: 'Sprache ({n})', ru: 'Голос ({n})', fr: 'Audio ({n})', tr: 'Ses ({n})', es: 'Voz ({n})' },
  chat_srch_link: { ar: 'الرابط والموقع ({n})', en: 'Links & Maps ({n})', zh: '链接与位置 ({n})', de: 'Links & Orte ({n})', ru: 'Ссылки и карты ({n})', fr: 'Liens & Lieux ({n})', tr: 'Bağlantı ve Konum ({n})', es: 'Enlaces y Mapas ({n})' },
  chat_bdg_audio: { ar: 'الصوت', en: 'Voice', zh: '语音', de: 'Sprache', ru: 'Голос', fr: 'Audio', tr: 'Ses', es: 'Voz' },
  chat_bdg_img: { ar: 'صورة', en: 'Photo', zh: '图片', de: 'Foto', ru: 'Фото', fr: 'Photo', tr: 'Fotoğraf', es: 'Foto' },
  chat_bdg_loc: { ar: 'موقع', en: 'Location', zh: '位置', de: 'Standort', ru: 'Локация', fr: 'Lieu', tr: 'Konum', es: 'Ubicación' },
  chat_bdg_link: { ar: 'الرابط', en: 'Link', zh: '链接', de: 'Link', ru: 'Ссылка', fr: 'Lien', tr: 'Bağlantı', es: 'Enlace' },
  chat_bdg_deal: { ar: 'بطاقة اتفاق', en: 'Deal Card', zh: '协议卡', de: 'Deal-Karte', ru: 'Сделка', fr: 'Accord', tr: 'Anlaşma', es: 'Acuerdo' },
  chat_bdg_price: { ar: 'سعر واتفاق', en: 'Price / Quote', zh: '价格报价', de: 'Preisangebot', ru: 'Цена', fr: 'Prix', tr: 'Fiyat', es: 'Precio' },
  chat_bdg_msg: { ar: 'الرسائل', en: 'Message', zh: '消息', de: 'Nachricht', ru: 'Сообщение', fr: 'Message', tr: 'Mesaj', es: 'Mensaje' },
  chat_srch_empty: { ar: 'مفيش نتائج مطابقة لـ «{q}» — جرّب كلمة تانية أو غيّر التصنيف', en: 'No results for “{q}” — try another word or filter', zh: '未找到“{q}”相关记录，请换个关键词或分类', de: 'Keine Treffer für „{q}“', ru: 'Нет совпадений для «{q}»', fr: 'Aucun résultat pour « {q} »', tr: '“{q}” için sonuç yok', es: 'Sin resultados para «{q}»' },
  pin_msg_lbl: { ar: 'رسالة مثبّتة', en: 'Pinned Message', zh: '置顶消息', de: 'Angeheftet', ru: 'Закреплено', fr: 'Message épinglé', tr: 'Sabitlenmiş Mesaj', es: 'Mensaje fijado' },
  pin_jump_hint: { ar: 'اضغط للانتقال', en: 'Tap to jump', zh: '点击跳转', de: 'Zum Springen tippen', ru: 'Нажмите для перехода', fr: 'Appuyer pour voir', tr: 'Gitmek için dokun', es: 'Toca para ir' },
  chat_deal_wait: { ar: 'شغلانة «{t}» — بانتظار تأكيدك', en: 'Job “{t}” — awaiting your confirmation', zh: '任务“{t}” — 待您确认完工', de: 'Auftrag „{t}“ – wartet auf Bestätigung', ru: 'Заказ «{t}» — ждёт подтверждения', fr: 'Tâche « {t} » — en attente', tr: '«{t}» işi — onayınızı bekliyor', es: 'Trabajo «{t}» — falta tu confirmación' },
  chat_deal_ok_btn: { ar: 'أكّد الانتهاء ✓', en: 'Confirm Done ✓', zh: '确认完成 ✓', de: 'Fertig bestätigen ✓', ru: 'Подтвердить ✓', fr: 'Confirmer ✓', tr: 'Tamamlandı ✓', es: 'Confirmar ✓' },
  search_do_lbl: { ar: 'دوّر على «{q}»', en: 'Search for “{q}”', zh: '搜索“{q}”', de: 'Suchen nach „{q}“', ru: 'Найти «{q}»', fr: 'Rechercher « {q} »', tr: '“{q}” ara', es: 'Buscar «{q}»' },

  /* ====== Chat Settings, Passcode Lock, Archive, Block, Media Vault, Deal Card ====== */
  cset_blocked_sub: { ar: 'محظور من المراسلة', en: 'Blocked from messaging', zh: '已屏蔽对方消息', de: 'Nachrichten blockiert', ru: 'Пользователь заблокирован', fr: 'Utilisateur bloqué', tr: 'Mesajlaşma engellendi', es: 'Bloqueado en el chat' },
  cset_locked_sub: { ar: 'محادثة محمية برمز سري 🔒', en: 'Protected by passcode lock 🔒', zh: '密码锁已保护对话 🔒', de: 'Mit Code geschützt 🔒', ru: 'Чат защищён кодом 🔒', fr: 'Protégé par code 🔒', tr: 'Şifre ile korumalı 🔒', es: 'Protegido con PIN 🔒' },
  cset_safe_sub: { ar: 'اتصال آمن ومباشر عبر وصلة', en: 'Direct encrypted Wasla chat', zh: 'Wasla 安全直连对话', de: 'Direkter sicherer Wasla-Chat', ru: 'Безопасный чат в Wasla', fr: 'Discussion directe sécurisée', tr: 'Güvenli ve doğrudan Wasla sohbeti', es: 'Chat directo y seguro en Wasla' },
  cset_media_t: { ar: 'الوسائط والروابط', en: 'Media & Links', zh: '媒体与链接库', de: 'Medien & Links', ru: 'Медиа и ссылки', fr: 'Médias & Liens', tr: 'Medya ve Bağlantılar', es: 'Medios y Enlaces' },
  cset_media_s: { ar: 'الصور والخرائط', en: 'Photos, voice & maps', zh: '图片、链接与位置', de: 'Fotos & Karten', ru: 'Фото и карты', fr: 'Photos et cartes', tr: 'Fotoğraf ve haritalar', es: 'Fotos y mapas' },
  cset_deal_t: { ar: 'بطاقة اتفاق', en: 'Deal Card', zh: '发送协议卡', de: 'Deal-Karte', ru: 'Карточка сделки', fr: 'Carte d’accord', tr: 'Anlaşma Kartı', es: 'Tarjeta de Trato' },
  cset_deal_s: { ar: 'سعر وميعاد', en: 'Price & schedule', zh: '约定价格与时间', de: 'Preis & Termin', ru: 'Цена и сроки', fr: 'Prix et horaire', tr: 'Fiyat ve randevu', es: 'Precio y fecha' },
  cset_pin_t: { ar: 'تثبيت الدردشة', en: 'Pin Chat', zh: '置顶对话', de: 'Chat anheften', ru: 'Закрепить чат', fr: 'Épingler', tr: 'Sohbeti Sabitle', es: 'Fijar Chat' },
  cset_unpin_t: { ar: 'فك التثبيت', en: 'Unpin Chat', zh: '取消置顶', de: 'Chat lösen', ru: 'Открепить чат', fr: 'Désépingler', tr: 'Sabitlemeyi Kaldır', es: 'Desfijar Chat' },
  cset_pin_on_s: { ar: 'مثبتة بالأعلى', en: 'Pinned to top', zh: '已置顶在列表顶部', de: 'Oben angeheftet', ru: 'Закреплён сверху', fr: 'Épinglé en haut', tr: 'Üstte sabitli', es: 'Fijado arriba' },
  cset_pin_off_s: { ar: 'تظهر في الأول', en: 'Keep on top', zh: '在消息列表最上方显示', de: 'Ganz oben zeigen', ru: 'Показывать первым', fr: 'Afficher en premier', tr: 'En üstte görünür', es: 'Mostrar primero' },
  cset_unlock_t: { ar: 'إزالة قفل الدردشة', en: 'Remove Chat Lock', zh: '关闭对话密码锁', de: 'Chat-Sperre entfernen', ru: 'Снять пароль с чата', fr: 'Retirer le verrou', tr: 'Sohbet Kilidini Kaldır', es: 'Quitar bloqueo de chat' },
  cset_lock_t: { ar: 'قفل الدردشة بالرمز', en: 'Lock Chat with PIN', zh: '为对话设置密码锁', de: 'Chat mit Code sperren', ru: 'Закрыть чат на код', fr: 'Verrouiller par code', tr: 'Sohbeti Şifreyle Kilitle', es: 'Bloquear chat con PIN' },
  cset_unlock_s: { ar: 'إلغاء طلب الـ 6 خانات هنا', en: 'Disable 6-char passcode here', zh: '关闭此对话的 6 位密码验证', de: '6-stelliges Passwort deaktivieren', ru: 'Отключить ввод 6 знаков здесь', fr: 'Désactiver le code à 6 chiffres', tr: 'Burada 6 haneli şifreyi kapat', es: 'Desactivar código aquí' },
  cset_lock_s: { ar: 'حماية خصوصية الرسائل والاسم', en: 'Blur & protect messages & name', zh: '隐藏姓名与消息隐私', de: 'Nachrichten & Namen schützen', ru: 'Скрыть имя и переписку кодом', fr: 'Protéger nom et messages', tr: 'Mesaj ve isim gizliliğini koru', es: 'Proteger privacidad y mensajes' },
  cset_chpin_t: { ar: 'تغيير رمز القفل العام', en: 'Change Master PIN', zh: '更改主密码', de: 'Haupt-Code ändern', ru: 'Изменить общий код', fr: 'Modifier le code global', tr: 'Ana Şifreyi Değiştir', es: 'Cambiar PIN general' },
  cset_chpin_s: { ar: 'تحديث رمز الـ 6 خانات', en: 'Update 6-character passcode', zh: '更新您的 6 位解锁密码', de: '6-stelligen Code aktualisieren', ru: 'Обновить 6-значный пароль', fr: 'Mettre à jour le code', tr: '6 haneli şifreyi güncelle', es: 'Actualizar código de 6 dígitos' },
  cset_unarch_t: { ar: 'إلغاء أرشفة الدردشة', en: 'Unarchive Chat', zh: '取消归档对话', de: 'Aus Archiv holen', ru: 'Вернуть из архива', fr: 'Désarchiver', tr: 'Arşivden Çıkar', es: 'Desarchivar Chat' },
  cset_arch_t: { ar: 'أرشفة الدردشة', en: 'Archive Chat', zh: '归档对话', de: 'Chat archivieren', ru: 'В архив', fr: 'Archiver', tr: 'Sohbeti Arşivle', es: 'Archivar Chat' },
  cset_unarch_s: { ar: 'إرجاعها لقائمة الرسائل', en: 'Restore to main inbox', zh: '恢复至主消息列表', de: 'Zurück in den Posteingang', ru: 'Вернуть в основной список', fr: 'Remettre dans la boîte', tr: 'Mesaj listesine geri al', es: 'Volver a la bandeja' },
  cset_arch_s: { ar: 'إخفاء مؤقت من الواجهة', en: 'Hide from main list', zh: '暂时从主列表隐藏', de: 'Vorübergehend ausblenden', ru: 'Временно скрыть из списка', fr: 'Masquer temporairement', tr: 'Ana listeden gizle', es: 'Ocultar temporalmente' },
  cset_warned_t: { ar: 'تم وضع علامة تحذير ✓', en: 'Warning Flag Recorded ✓', zh: '已标记社区提醒 ✓', de: 'Warnung erfasst ✓', ru: 'Предупреждение отмечено ✓', fr: 'Alerte enregistrée ✓', tr: 'Uyarı İşareti Kaydedildi ✓', es: 'Alerta registrada ✓' },
  cset_warn_t: { ar: 'علامة تحذير مجتمعية', en: 'Community Warning Flag', zh: '社区风险提醒', de: 'Community-Warnung', ru: 'Предупреждение сообщества', fr: 'Signalement communautaire', tr: 'Topluluk Uyarı İşareti', es: 'Advertencia comunitaria' },
  cset_warn_s: { ar: 'مساعدة المجتمع على الحذر', en: 'Help others stay safe after deals', zh: '完成合作后共同守护社区信用', de: 'Andere bei Geschäften schützen', ru: 'Помогите защитить сообщество', fr: 'Aider la communauté', tr: 'Topluluğu korumaya yardımcı ol', es: 'Ayuda a proteger a otros' },
  cset_unblock_t: { ar: 'إلغاء حظر المستخدم', en: 'Unblock User', zh: '取消拉黑用户', de: 'Nutzer entsperren', ru: 'Разблокировать', fr: 'Débloquer', tr: 'Engeli Kaldır', es: 'Desbloquear usuario' },
  cset_block_t: { ar: 'حظر المستخدم', en: 'Block User', zh: '拉黑此用户', de: 'Nutzer blockieren', ru: 'Заблокировать', fr: 'Bloquer l’utilisateur', tr: 'Kullanıcıyı Engelle', es: 'Bloquear usuario' },
  cset_unblock_s: { ar: 'السماح بتبادل الرسائل مجدداً', en: 'Allow messages again', zh: '恢复正常收发消息', de: 'Nachrichten wieder zulassen', ru: 'Снова разрешить сообщения', fr: 'Autoriser les messages', tr: 'Mesajlaşmaya yeniden izin ver', es: 'Permitir mensajes de nuevo' },
  cset_block_s: { ar: 'منع استقبال أو إرسال الرسائل', en: 'Stop receiving or sending messages', zh: '停止接收或发送任何消息', de: 'Keine Nachrichten senden/empfangen', ru: 'Запретить переписку в чате', fr: 'Bloquer tout échange', tr: 'Mesaj alımını ve gönderimini durdur', es: 'Evitar recibir o enviar mensajes' },
  cset_del_t: { ar: 'حذف الدردشة من عندي', en: 'Clear Chat For Me', zh: '为自己清空聊天记录', de: 'Chat für mich löschen', ru: 'Удалить переписку у себя', fr: 'Supprimer pour moi', tr: 'Sohbeti Benden Sil', es: 'Eliminar chat para mí' },
  cset_del_s: { ar: 'مسح السجل من جهازك وحسابك فقط', en: 'Deletes history on your side only', zh: '仅清除您这端的历史消息', de: 'Löscht Verlauf nur auf deiner Seite', ru: 'Очистит историю только у вас', fr: 'Efface uniquement de votre côté', tr: 'Yalnızca sizin tarafınızdan siler', es: 'Borra el historial solo para ti' },

  pin_setup_chg: { ar: 'تغيير الرمز', en: 'Change Passcode', zh: '更改密码', de: 'Code ändern', ru: 'Смена кода', fr: 'Changer le code', tr: 'Şifreyi Değiştir', es: 'Cambiar código' },
  pin_setup_new_t: { ar: 'تأمين الدردشة', en: 'Secure Chat Lock', zh: '设置对话锁', de: 'Chat sichern', ru: 'Защита чата', fr: 'Sécuriser le chat', tr: 'Sohbeti Koru', es: 'Proteger chat' },
  pin_inp_new: { ar: 'الرمز الجديد', en: 'New 6-char Code', zh: '输入 6 位密码', de: 'Neuer Code (6 Zeichen)', ru: 'Новый код (6 знаков)', fr: 'Nouveau code', tr: 'Yeni Şifre', es: 'Nuevo código' },
  pin_inp_conf: { ar: 'تأكيد الرمز', en: 'Confirm Code', zh: '再次确认密码', de: 'Code bestätigen', ru: 'Повторите код', fr: 'Confirmer le code', tr: 'Şifreyi Onayla', es: 'Confirmar código' },
  pin_save_btn: { ar: 'حفظ', en: 'Save', zh: '保存', de: 'Speichern', ru: 'Сохранить', fr: 'Enregistrer', tr: 'Kaydet', es: 'Guardar' },
  pin_enable_btn: { ar: 'تفعيل', en: 'Enable Lock', zh: '开启密码锁', de: 'Aktivieren', ru: 'Включить', fr: 'Activer', tr: 'Etkinleştir', es: 'Activar' },
  pin_err_incomplete: { ar: 'أكمل الرمز', en: 'Enter all 6 characters', zh: '请输满 6 位密码', de: 'Alle 6 Zeichen eingeben', ru: 'Введите все 6 символов', fr: 'Complétez les 6 caractères', tr: '6 haneyi tamamlayın', es: 'Completa los 6 dígitos' },
  pin_err_wait: { ar: 'انتظر قليلاً ثم أعد المحاولة', en: 'Too many tries — wait 30s', zh: '尝试次数过多，请稍等片刻再试', de: 'Bitte kurz warten und erneut versuchen', ru: 'Подождите немного и повторите', fr: 'Patientez puis réessayez', tr: 'Lütfen biraz bekleyip tekrar deneyin', es: 'Espera un momento e intenta de nuevo' },
  pin_err_wrong: { ar: 'الرمز غير صحيح', en: 'Incorrect passcode', zh: '密码不正确', de: 'Falscher Code', ru: 'Неверный код', fr: 'Code incorrect', tr: 'Şifre hatalı', es: 'Código incorrecto' },
  chblock_h: { ar: 'حظر {n}؟', en: 'Block {n}?', zh: '确认拉黑 {n} 吗？', de: '{n} blockieren?', ru: 'Заблокировать {n}?', fr: 'Bloquer {n} ?', tr: '{n} engellensin mi?', es: '¿Bloquear a {n}?' },
  chblock_p: { ar: 'مش هتقدر تبعتله رسائل، وهو كمان مش هيقدر يبعتلك في الدردشة دي. تقدر تلغي الحظر في أي وقت.', en: 'Neither of you can exchange messages in this chat until you unblock.', zh: '拉黑后双方将无法在此对话收发消息，您可随时解除拉黑。', de: 'Ihr könnt euch keine Nachrichten mehr senden, bis die Sperre aufgehoben wird.', ru: 'Вы не сможете обмениваться сообщениями. Блокировку можно снять позже.', fr: 'Aucun message ne pourra être échangé jusqu’au déblocage.', tr: 'Engel kaldırılana kadar bu sohbette mesajlaşamazsınız.', es: 'No podrán enviarse mensajes hasta que desbloquees.' },
  chblock_btn: { ar: 'حظر', en: 'Block', zh: '确认拉黑', de: 'Blockieren', ru: 'Заблокировать', fr: 'Bloquer', tr: 'Engelle', es: 'Bloquear' },
  chdel_h: { ar: 'حذف الدردشة؟', en: 'Clear chat?', zh: '清空聊天记录？', de: 'Chat löschen?', ru: 'Очистить чат?', fr: 'Effacer le chat ?', tr: 'Sohbet silinsin mi?', es: '¿Eliminar chat?' },
  chdel_p: { ar: 'هتتمسح كل الرسائل من عندك إنت بس، وهتفضل ظاهرة عند {n} زي ما هي.', en: 'All messages will be cleared on your side only; {n} still keeps their copy.', zh: '消息仅在您的设备上清除，{n} 那一端仍会保留。', de: 'Alle Nachrichten werden nur für dich gelöscht; bei {n} bleiben sie erhalten.', ru: 'История очистится только у вас; у {n} сообщения останутся.', fr: 'Les messages seront effacés pour vous seul, pas pour {n}.', tr: 'Mesajlar yalnızca sizin tarafınızdan silinir, {n} tarafında kalır.', es: 'Se borrarán solo de tu lado; {n} conservará los mensajes.' },
  chdel_btn: { ar: 'حذف من عندي', en: 'Clear for me', zh: '仅自己清空', de: 'Für mich löschen', ru: 'Удалить у себя', fr: 'Supprimer pour moi', tr: 'Benden Sil', es: 'Borrar para mí' },
  img_send_one: { ar: 'إرسال صورة', en: 'Send Photo', zh: '发送图片', de: 'Foto senden', ru: 'Отправить фото', fr: 'Envoyer photo', tr: 'Fotoğraf Gönder', es: 'Enviar foto' },
  img_send_multi: { ar: 'إرسال {n} صور', en: 'Send {n} Photos', zh: '发送 {n} 张图片', de: '{n} Fotos senden', ru: 'Отправить {n} фото', fr: 'Envoyer {n} photos', tr: '{n} Fotoğraf Gönder', es: 'Enviar {n} fotos' },
  img_cap_ph: { ar: 'أضف تعليق (اختياري)', en: 'Add a caption (optional)', zh: '添加说明文字（可选）', de: 'Bildunterschrift (optional)', ru: 'Добавить подпись', fr: 'Ajouter une légende', tr: 'Açıklama ekle (isteğe bağlı)', es: 'Añadir comentario (opcional)' },
  send_btn: { ar: 'إرسال', en: 'Send', zh: '发送', de: 'Senden', ru: 'Отправить', fr: 'Envoyer', tr: 'Gönder', es: 'Enviar' },
  pause_rec_lbl: { ar: 'إيقاف مؤقت', en: 'Pause', zh: '暂停录音', de: 'Pause', ru: 'Пауза', fr: 'Pause', tr: 'Duraklat', es: 'Pausar' },
  resume_rec_lbl: { ar: 'استكمال التسجيل', en: 'Resume', zh: '继续录音', de: 'Fortsetzen', ru: 'Продолжить', fr: 'Reprendre', tr: 'Devam et', es: 'Reanudar' },

  /* ====== Media Vault & Deal Card ====== */
  mv_title: { ar: 'خزنة الوسائط والروابط', en: 'Media & Links Vault', zh: '媒体与链接百宝箱', de: 'Medien- & Link-Tresor', ru: 'Хранилище медиа и ссылок', fr: 'Coffre Médias & Liens', tr: 'Medya ve Bağlantı Kasası', es: 'Bóveda de Medios y Enlaces' },
  mv_empty: { ar: 'لسه مفيش صور أو روابط أو خرائط متبادلة في الدردشة دي.', en: 'No photos, links, voice notes, or maps shared in this chat yet.', zh: '此对话尚未分享过图片、链接、语音或位置。', de: 'Noch keine Medien oder Links in diesem Chat.', ru: 'В этом чате пока нет фото, ссылок или карт.', fr: 'Aucun média ni lien partagé pour le moment.', tr: 'Bu sohbette henüz medya veya konum paylaşılmadı.', es: 'Aún no hay medios ni enlaces en este chat.' },
  mv_imgs_h: { ar: 'الصور ({n})', en: 'Photos ({n})', zh: '图片 ({n})', de: 'Fotos ({n})', ru: 'Фото ({n})', fr: 'Photos ({n})', tr: 'Fotoğraflar ({n})', es: 'Fotos ({n})' },
  mv_links_h: { ar: 'الروابط ({n})', en: 'Links ({n})', zh: '链接 ({n})', de: 'Links ({n})', ru: 'Ссылки ({n})', fr: 'Liens ({n})', tr: 'Bağlantılar ({n})', es: 'Enlaces ({n})' },
  mv_locs_h: { ar: 'المواقع ({n})', en: 'Locations ({n})', zh: '位置 ({n})', de: 'Standorte ({n})', ru: 'Локации ({n})', fr: 'Lieux ({n})', tr: 'Konumlar ({n})', es: 'Ubicaciones ({n})' },
  mv_audios_h: { ar: 'الرسائل الصوتية ({n})', en: 'Voice Notes ({n})', zh: '语音消息 ({n})', de: 'Sprachnotizen ({n})', ru: 'Голосовые ({n})', fr: 'Vocaux ({n})', tr: 'Sesli Mesajlar ({n})', es: 'Notas de voz ({n})' },
  mv_loc_row: { ar: 'موقع مشترك ({lat}, {lng})', en: 'Shared location ({lat}, {lng})', zh: '共享位置 ({lat}, {lng})', de: 'Geteilter Standort ({lat}, {lng})', ru: 'Локация ({lat}, {lng})', fr: 'Lieu partagé ({lat}, {lng})', tr: 'Konum ({lat}, {lng})', es: 'Ubicación ({lat}, {lng})' },
  mv_audio_row: { ar: 'رسالة صوتية ({d})', en: 'Voice note ({d})', zh: '语音 ({d})', de: 'Sprachnotiz ({d})', ru: 'Голосовое ({d})', fr: 'Vocal ({d})', tr: 'Sesli mesaj ({d})', es: 'Audio ({d})' },
  mv_tab_all: { ar: 'الكل ({n})', en: 'All ({n})', zh: '全部 ({n})', de: 'Alle ({n})', ru: 'Все ({n})', fr: 'Tout ({n})', tr: 'Tümü ({n})', es: 'Todo ({n})' },
  mv_tab_img: { ar: 'صور ({n})', en: 'Photos ({n})', zh: '图片 ({n})', de: 'Fotos ({n})', ru: 'Фото ({n})', fr: 'Photos ({n})', tr: 'Foto ({n})', es: 'Fotos ({n})' },
  mv_tab_link: { ar: 'روابط ({n})', en: 'Links ({n})', zh: '链接 ({n})', de: 'Links ({n})', ru: 'Ссылки ({n})', fr: 'Liens ({n})', tr: 'Bağlantı ({n})', es: 'Enlaces ({n})' },
  mv_tab_loc: { ar: 'خرائط ({n})', en: 'Maps ({n})', zh: '地图 ({n})', de: 'Karten ({n})', ru: 'Карты ({n})', fr: 'Cartes ({n})', tr: 'Harita ({n})', es: 'Mapas ({n})' },
  mv_tab_audio: { ar: 'صوتيات ({n})', en: 'Voice ({n})', zh: '语音 ({n})', de: 'Audio ({n})', ru: 'Звук ({n})', fr: 'Audio ({n})', tr: 'Ses ({n})', es: 'Voz ({n})' },
  dl_modal_h: { ar: 'إرسال بطاقة ميعاد وسعر', en: 'Send Deal & Schedule Card', zh: '发送价格与预约协议卡', de: 'Deal- & Terminkarte senden', ru: 'Отправить карточку сделки', fr: 'Envoyer carte d’accord', tr: 'Fiyat ve Randevu Kartı', es: 'Enviar tarjeta de trato' },
  dl_modal_p: { ar: 'اتفق بوضوح جوه الشات في كارت منظم يضمن حق الطرفين.', en: 'Lock in clear terms inside chat to protect both sides.', zh: '在聊天中清晰约定价格与时间，保障双方权益。', de: 'Halte Preis und Termin klar für beide Seiten fest.', ru: 'Зафиксируйте цену и время прямо в чате.', fr: 'Fixez clairement le prix et le rendez-vous dans le chat.', tr: 'Her iki taraf için de fiyatı ve zamanı netleştirin.', es: 'Acuerda precio y horario claramente en el chat.' },
  dl_svc_lbl: { ar: 'الخدمة أو المطلوب', en: 'Service / Scope', zh: '服务内容', de: 'Leistung', ru: 'Услуга / задача', fr: 'Service demandé', tr: 'Hizmet veya İş', es: 'Servicio' },
  dl_svc_ph: { ar: 'مثلاً: تركيب خلاط مياه وتصليح تسريب', en: 'e.g. Fix sink mixer & pipe leak', zh: '例如：安装水龙头并修理漏水', de: 'z. B. Wasserhahn montieren', ru: 'Напр.: установка смесителя', fr: 'Ex. : Réparation fuite robinet', tr: 'Örn: Musluk montajı ve tamiri', es: 'Ej.: Reparación de grifo' },
  dl_price_lbl: { ar: 'السعر المتفق عليه (ج.م)', en: 'Agreed Price (EGP)', zh: '约定价格（埃镑）', de: 'Vereinbarter Preis (EGP)', ru: 'Цена (EGP)', fr: 'Prix convenu (EGP)', tr: 'Anlaşılan Fiyat (EGP)', es: 'Precio acordado (EGP)' },
  dl_when_lbl: { ar: 'الميعاد', en: 'Schedule / Time', zh: '预约时间', de: 'Termin', ru: 'Дата и время', fr: 'Horaire', tr: 'Zaman', es: 'Horario' },
  dl_when_ph: { ar: 'النهاردة 5 مساءً', en: 'Today 5:00 PM', zh: '今天下午 5:00', de: 'Heute 17:00 Uhr', ru: 'Сегодня в 17:00', fr: 'Aujourd’hui 17h', tr: 'Bugün 17:00', es: 'Hoy 5:00 PM' },
  dl_note_lbl: { ar: 'ملاحظة أو ضمان (اختياري)', en: 'Notes or Warranty (optional)', zh: '备注或质保（可选）', de: 'Notiz / Garantie', ru: 'Примечание или гарантия', fr: 'Remarque / Garantie', tr: 'Not veya Garanti', es: 'Nota o garantía' },
  dl_note_ph: { ar: 'شامل الخامات أو المعاينة', en: 'Includes inspection & parts', zh: '含上门检测或耗材', de: 'Inkl. Material / Prüfung', ru: 'Включая осмотр', fr: 'Inclut déplacement', tr: 'Malzeme veya keşif dahil', es: 'Incluye revisión' },
  dl_hide_chk: { ar: 'إخفاء السعر بضبابية تليجرام حتى الضغط عليه', en: 'Blur agreed price until tapped', zh: '将价格模糊隐藏，点击后显示', de: 'Preis bis zum Antippen verbergen', ru: 'Скрыть цену размытием до нажатия', fr: 'Flouter le prix jusqu’au clic', tr: 'Dokunulana kadar fiyatı bulanıklaştır', es: 'Ocultar precio hasta tocarlo' },
  dl_send_btn: { ar: 'إرسال الاتفاق الآن', en: 'Send Deal Now', zh: '立即发送协议', de: 'Vereinbarung senden', ru: 'Отправить сделку', fr: 'Envoyer l’accord', tr: 'Anlaşmayı Gönder', es: 'Enviar acuerdo' },
  dl_brand: { ar: 'بطاقة اتفاق وصلة', en: 'Wasla Deal Card', zh: 'Wasla 协议卡片', de: 'Wasla Deal-Karte', ru: 'Карта сделки Wasla', fr: 'Carte d’accord Wasla', tr: 'Wasla Anlaşma Kartı', es: 'Tarjeta de Trato Wasla' },
  dl_badge: { ar: 'اتفاق موثّق', en: 'Verified Terms', zh: '认证条款', de: 'Bestätigt', ru: 'Подтверждено', fr: 'Confirmé', tr: 'Onaylı Anlaşma', es: 'Acuerdo verificado' },
  dl_price_hdr: { ar: 'السعر المتفق عليه', en: 'Agreed Price', zh: '约定价格', de: 'Preis', ru: 'Согласованная цена', fr: 'Prix convenu', tr: 'Anlaşılan Fiyat', es: 'Precio acordado' },
  dl_when_hdr: { ar: 'الموعد', en: 'Schedule', zh: '时间安排', de: 'Termin', ru: 'Срок', fr: 'Rendez-vous', tr: 'Randevu', es: 'Fecha' },
  dl_copy_btn: { ar: 'نسخ بنود الاتفاق', en: 'Copy Deal Terms', zh: '复制协议内容', de: 'Details kopieren', ru: 'Копировать условия', fr: 'Copier les termes', tr: 'Anlaşmayı Kopyala', es: 'Copiar acuerdo' },
  dl_reveal_hint: { ar: 'اضغط لإظهار السعر المتفق عليه', en: 'Tap to reveal agreed price', zh: '点击查看约定价格', de: 'Tippen für Preis', ru: 'Нажмите, чтобы увидеть цену', fr: 'Appuyer pour voir le prix', tr: 'Fiyatı görmek için dokun', es: 'Toca para ver el precio' },
  dl_raw_fmt: { ar: 'اتفاق وصلة: {t} — السعر: {p} — الموعد: {w}{n}', en: 'Wasla Deal: {t} — Price: {p} — Time: {w}{n}', zh: 'Wasla协议：{t} — 价格：{p} — 时间：{w}{n}', de: 'Wasla-Deal: {t} — Preis: {p} — Termin: {w}{n}', ru: 'Сделка Wasla: {t} — Цена: {p} — Срок: {w}{n}', fr: 'Accord Wasla : {t} — Prix : {p} — Date : {w}{n}', tr: 'Wasla Anlaşma: {t} — Fiyat: {p} — Zaman: {w}{n}', es: 'Acuerdo Wasla: {t} — Precio: {p} — Fecha: {w}{n}' },
  dl_open_price: { ar: 'حسب المعاينة', en: 'Upon inspection', zh: '现场报价', de: 'Nach Besichtigung', ru: 'По осмотру', fr: 'Selon devis', tr: 'Keşif sonrası', es: 'Según revisión' },
  dl_when_def: { ar: 'بالتنسيق', en: 'Flexible', zh: '协商确定', de: 'Nach Absprache', ru: 'По договорённости', fr: 'À convenir', tr: 'Kararlaştırılacak', es: 'A convenir' },
  dl_svc_def: { ar: 'اتفاق خدمة', en: 'Service Agreement', zh: '服务协议', de: 'Servicevertrag', ru: 'Договор на услугу', fr: 'Accord de service', tr: 'Hizmet Anlaşması', es: 'Acuerdo de servicio' },

  /* ====== Community Reputation Protection & Warnings ====== */
  warn_people_p: { ar: '{n} أشخاص مختلفين', en: '{n} different users', zh: '{n} 位不同用户', de: '{n} Nutzer', ru: '{n} разных пользователей', fr: '{n} utilisateurs', tr: '{n} farklı kullanıcı', es: '{n} usuarios distintos' },
  warn_tag_txt: { ar: 'تحذير من {p}', en: 'Warned by {p}', zh: '收到 {p} 警示', de: 'Warnung ({p})', ru: 'Жалобы: {p}', fr: 'Signalé par {p}', tr: '{p} uyarısı', es: 'Alerta de {p}' },
  warn_tag_title: { ar: 'علامات تحذير موثقة من مستخدمين مختلفين', en: 'Verified community warnings from multiple users', zh: '来自多位真实合作用户的社区信用警示', de: 'Bestätigte Warnungen mehrerer Nutzer', ru: 'Подтверждённые предупреждения пользователей', fr: 'Avertissements vérifiés de plusieurs clients', tr: 'Farklı kullanıcılardan doğrulanmış uyarılar', es: 'Alertas verificadas de varios usuarios' },
  warn_saved_private_b: { ar: 'سجّلت علامة تحذير على الحساب ده ✓', en: 'You recorded a warning on this account ✓', zh: '您已对此账号记录风险提醒 ✓', de: 'Du hast eine Warnung erfasst ✓', ru: 'Вы оставили предупреждение об аккаунте ✓', fr: 'Avertissement enregistré sur ce compte ✓', tr: 'Bu hesap için uyarı işareti bıraktınız ✓', es: 'Registraste una advertencia ✓' },
  warn_saved_private_s: { ar: ' — حمايةً لسمعة الناس، التحذير مابيظهرش للعلن غير لما يأكد عليه 3 أشخاص مختلفين على الأقل.', en: ' — To protect reputations fairly, warnings stay private until confirmed by at least 3 different users.', zh: ' — 为公平保护用户名誉，警示仅在至少 3 位不同合作用户共同确认后才会公开显示。', de: ' — Zum Schutz vor Rufschädigung wird die Warnung erst ab mindestens 3 verschiedenen Nutzern öffentlich.', ru: ' — Для защиты репутации метка станет публичной только после подтверждения от 3 разных людей.', fr: ' — Pour protéger la réputation chacun, l’alerte reste privée jusqu’à 3 confirmations distinctes.', tr: ' — Kişi itibarını korumak için bu uyarı en az 3 farklı kullanıcı onaylayana kadar gizli kalır.', es: ' — Para proteger reputaciones, la alerta no es pública hasta que al menos 3 personas distintas la confirmen.' },
  warn_banner_h: { ar: 'تنبيه للمجتمع: الشخص ده تم التحذير منه من {p}', en: 'Community Alert: Warned by {p}', zh: '社区重要提示：该账号已被 {p} 标记警示', de: 'Warnhinweis: Gemeldet von {p}', ru: 'Внимание: предупреждения от {p}', fr: 'Alerte communauté : signalé par {p}', tr: 'Topluluk Uyarısı: {p} tarafından işaretlendi', es: 'Alerta comunitaria: advertido por {p}' },
  warn_banner_p: { ar: 'فيه {p} اتعاملوا مع الحساب ده وسجّلوا علامات تحذير ضده{r}. خد حذرك في الاتفاق وماتدفعش أي فلوس مقدم قبل ما تتأكد بنفسك.', en: '{p} verified users dealt with this account and recorded warnings{r}. Exercise caution and never pay upfront before verifying.', zh: '已有 {p} 与该账号完成过实际订单并标记了警示{r}。沟通约定请多留心，切勿提前预付全款。', de: '{p} haben nach Aufträgen eine Warnung hinterlegt{r}. Bitte Vorsicht und keine Vorkasse.', ru: '{p} подтверждённых клиентов оставили предупреждение{r}. Не переводите предоплату заранее.', fr: '{p} ont signalé ce compte après une prestation{r}. Soyez vigilant et évitez les acomptes.', tr: '{p} bu hesapla işlem yapıp uyarı kaydetti{r}. Anlaşmada dikkatli olun ve peşinat vermeyin.', es: '{p} dejaron alertas verificadas tras tratar con esta cuenta{r}. No pagues por adelantado.' },
  warn_banner_reason: { ar: ' بخصوص ({reasons})', en: ' regarding ({reasons})', zh: '（涉及：{reasons}）', de: ' wegen ({reasons})', ru: ' (причины: {reasons})', fr: ' concernant ({reasons})', tr: ' ({reasons} hakkında)', es: ' sobre ({reasons})' },
  warn_thread_strip: { ar: 'تنبيه: الحساب ده عليه علامة تحذير من {p}', en: 'Alert: Account warned by {p}', zh: '注意：该账号已有 {p} 风险警示', de: 'Hinweis: Warnung von {p}', ru: 'Внимание: на аккаунте метки от {p}', fr: 'Alerte : signalé par {p}', tr: 'Uyarı: Bu hesapta {p} bildirimi var', es: 'Aviso: cuenta alertada por {p}' },
  warn_prev_h: { ar: 'سجّلت علامة تحذير قبل كده', en: 'Warning Already Recorded', zh: '您已记录过提醒', de: 'Warnung bereits erfasst', ru: 'Предупреждение уже оставлено', fr: 'Déjà signalé', tr: 'Uyarı Zaten Kayıtlı', es: 'Alerta ya registrada' },
  warn_prev_p: { ar: 'إنت سجّلت بالفعل علامة تحذير على حساب «{n}». كل مستخدم ليه حق تسجيل علامة واحدة بس على نفس الشخص علشان المصداقية والعدالة.', en: 'You already flagged “{n}”. Each user gets one verified flag per account for fairness.', zh: '您已对“{n}”账号留下过一次风险提醒。为保证公平真实，每位用户对同一人仅限标记一次。', de: 'Du hast „{n}“ bereits gemeldet. Aus Fairness ist nur eine Meldung pro Person möglich.', ru: 'Вы уже отметили аккаунт «{n}». Допускается только одна метка от каждого клиента.', fr: 'Vous avez déjà signalé « {n} ». Une seule alerte par utilisateur pour plus d’équité.', tr: '“{n}” için zaten bir uyarı bıraktınız. Adalet için kullanıcı başına tek hak tanınır.', es: 'Ya registraste una alerta para «{n}». Solo se permite una por usuario.' },
  warn_prev_pub: { ar: 'الحساب ده عليه حالياً تحذير علني ظاهر للناس من {p}.', en: 'Public community warning is currently visible ({p}).', zh: '目前已有 {p} 确认，公开提醒已显示。', de: 'Öffentliche Warnung aktiv ({p}).', ru: 'Публичное предупреждение активно ({p}).', fr: 'Alerte publique active ({p}).', tr: 'Bu hesapta şu an {p} kaynaklı herkese açık uyarı görünüyor.', es: 'Alerta pública activa ({p}).' },
  warn_prev_priv: { ar: 'علامتك محفوظة بأمان، والتحذير مابيظهرش للناس إلا لو أكّد عليه 3 أشخاص مختلفين تماماً على الأقل.', en: 'Your flag is saved privately; it only goes public once 3 distinct verified users agree.', zh: '您的记录已安全保存，只有凑齐至少 3 位不同用户确认才会公开。', de: 'Deine Meldung ist gespeichert und wird erst ab 3 Nutzern sichtbar.', ru: 'Ваша отметка сохранена в системе и станет видна после 3 подтверждений.', fr: 'Votre alerte reste confidentielle tant que 3 clients distincts ne confirment pas.', tr: 'Kaydınız güvende; en az 3 farklı kişi onaylamadıkça kimseye görünmez.', es: 'Tu alerta está guardada; solo será pública con 3 confirmaciones distintas.' },
  warn_gate_h: { ar: 'حماية المعاملات ومنع الظلم', en: 'Fairness & Anti-Abuse Gate', zh: '公平防恶意举报机制', de: 'Schutz vor Missbrauch', ru: 'Защита от ложных жалоб', fr: 'Protection contre les abus', tr: 'Haksız Bildirim Koruması', es: 'Protección contra abusos' },
  warn_gate_my: { ar: 'مطلوب تأكيدك إنت كمان إن الشغلانة «{t}» خلصت علشان النظام يتأكد إنكم خلصتم تعامل فعلي قبل الإبلاغ.', en: 'Please also confirm that job “{t}” concluded so our system verifies real interaction first.', zh: '请先确认订单“{t}”已结束，以验证双方发生过真实合作后再提交提醒。', de: 'Bitte bestätige zuerst, dass der Auftrag „{t}“ abgeschlossen ist.', ru: 'Подтвердите завершение заказа «{t}», чтобы система убедилась в реальной сделке.', fr: 'Veuillez d’abord confirmer la fin de « {t} ».', tr: 'Önce “{t}” işinin bittiğini sizin de onaylamanız gerekir.', es: 'Confirma primero que el trabajo «{t}» finalizó.' },
  warn_gate_other: { ar: 'إنت أكدت إن الشغلانة «{t}» خلصت، بس الطرف التاني لسه ما أكدش إنها خلصت. لازم الشخصين يأكدوا انتهاء الشغلانة علشان يتفتح الإبلاغ بعدل وبدون أي ظلم.', en: 'You marked “{t}” finished, waiting on the other side to confirm completion so warnings stay fair.', zh: '您已确认“{t}”完成，但对方尚未确认。需双方均确认完工后才开放公平标记。', de: 'Du hast „{t}“ bestätigt, aber die Gegenseite noch nicht. Beide müssen abschließen.', ru: 'Вы подтвердили заказ «{t}», ждём подтверждения второй стороны для честности.', fr: 'Vous avez confirmé « {t} », l’autre partie doit aussi confirmer avant signalement.', tr: '“{t}” işini onayladınız ancak karşı taraf henüz onaylamadı. İki taraf da onaylamalıdır.', es: 'Confirmaste «{t}», falta que la otra parte confirme el cierre.' },
  warn_gate_none: { ar: 'علشان محدش يتظلم ببلاغات وهمية، تسجيل علامة تحذير على «{n}» متاح بس لما يكون بينكم طلب شغل حقيقي وأكّدتم انتو الاتنين إن الشغلانة خلصت.', en: 'To prevent false flags, warning “{n}” requires a real job confirmed as finished by both of you.', zh: '为杜绝恶意差评，仅在与“{n}”完成真实订单且双方确认结束后才可标记提醒。', de: 'Um Fehlurteile zu verhindern, muss ein beiderseitig bestätigter Auftrag mit „{n}“ vorliegen.', ru: 'Чтобы избежать несправедливости, жалоба на «{n}» доступна только после подтверждённого заказа.', fr: 'Pour éviter tout abus, un accord réel confirmé par les deux parties avec « {n} » est requis.', tr: 'Kimsenin haksız yere zarar görmemesi için “{n}” ile iki tarafça onaylı gerçek bir iş tamamlanmış olmalıdır.', es: 'Para evitar reportes falsos, debe haber un pedido real con «{n}» confirmado por ambos.' },
  warn_gate_note: { ar: 'أول ما الاتنين يأكدوا إنهاء الطلب ويسجل 3 أشخاص مختلفين تحذير عليه، هتظهر علامة التحذير عنده تلقائياً لكل الناس.', en: 'Once 3 different verified partners flag an account, the alert automatically appears publicly.', zh: '当双方确认完工且至少 3 位不同用户均留下警示后，系统将自动公开提醒。', de: 'Erst ab 3 unabhängigen Warnungen wird der Hinweis öffentlich angezeigt.', ru: 'Как только наберётся 3 независимых отзыва о нарушении, метка появится публично.', fr: 'Dès 3 signalements distincts après accord, l’alerte devient visible publiquement.', tr: 'İş tamamlanıp 3 farklı kullanıcı uyarı bıraktığında uyarı herkese otomatik gösterilir.', es: 'Con 3 alertas distintas tras tratos reales, el aviso aparece automáticamente.' },
  warn_form_h: { ar: 'تسجيل علامة تحذير على «{n}»', en: 'Record Warning for “{n}”', zh: '对“{n}”提交信用风险提醒', de: 'Warnung für „{n}“ erfassen', ru: 'Предупреждение для «{n}»', fr: 'Signaler « {n} »', tr: '“{n}” İçin Uyarı Kaydet', es: 'Registrar alerta para «{n}»' },
  warn_form_p: { ar: 'العلامة دي لحماية المجتمع مش بلاغ للإدارة: مابتظهرش للناس خالص غير لما 3 أشخاص مختلفين تماماً يسجّلوا تحذير على نفس الحساب، وليك علامة واحدة بس.', en: 'Community protection — stays hidden until 3 distinct verified users submit a warning. 1 per person.', zh: '社区互助提示：仅当 3 位完全不同的用户对同一账号标记后才公开，每人仅限一次。', de: 'Wird erst öffentlich, wenn 3 verschiedene Nutzer unabhängig warnen. 1 pro Nutzer.', ru: 'Знак защиты сообщества: виден людям только при 3 отметках от разных клиентов.', fr: 'Protection communautaire : invisible jusqu’à 3 signalements distincts. 1 par personne.', tr: 'Topluluk korumasıdır: 3 farklı kişi onaylamadıkça kimseye görünmez.', es: 'Protección comunitaria: invisible hasta que 3 personas distintas lo confirmen.' },
  warn_proof_lbl: { ar: 'تعامل موثّق: {l}', en: 'Verified Deal: {l}', zh: '已认证交易：{l}', de: 'Bestätigter Auftrag: {l}', ru: 'Подтверждённая сделка: {l}', fr: 'Transaction vérifiée : {l}', tr: 'Doğrulanmış İşlem: {l}', es: 'Trato verificado: {l}' },
  warn_reason_lbl: { ar: 'سبب التحذير الأساسي', en: 'Primary Reason', zh: '主要警示原因', de: 'Hauptgrund', ru: 'Основная причина', fr: 'Motif principal', tr: 'Ana Uyarı Nedeni', es: 'Motivo principal' },
  warn_det_lbl: { ar: 'وضّح اللي حصل بالتفصيل (على الأقل 20 حرف — تقدر تقوله بالصوت)', en: 'Explain what happened (min 20 chars — voice supported)', zh: '请详细说明具体情况（至少 20 字，支持语音输入）', de: 'Details schildern (mind. 20 Zeichen – auch per Sprache)', ru: 'Опишите ситуацию подробнее (от 20 знаков)', fr: 'Décrivez les faits (20 car. min. — dictée possible)', tr: 'Olanları detaylıca açıklayın (en az 20 karakter)', es: 'Explica qué pasó (mín. 20 caracteres)' },
  warn_det_ph: { ar: 'اكتب الواقعة بصراحة ودقة علشان تحمي غيرك بدون ظلم...', en: 'Describe accurately & fairly to protect others...', zh: '请真实客观描述经过，帮助他人避坑……', de: 'Sachlich und ehrlich schildern...', ru: 'Опишите честно и точно...', fr: 'Décrivez avec précision et honnêteté...', tr: 'Başkalarını korumak için dürüstçe ve net anlatın...', es: 'Describe con claridad y justicia...' },
  warn_pledge_lbl: { ar: 'أشهد إن الواقعة دي حصلت معايا فعلاً في تعامل حقيقي، ومش غرضي الإضرار بسمعة الشخص بدون وجه حق.', en: 'I confirm this actually happened in a real deal and is not meant to harm anyone unfairly.', zh: '我确认此情况在真实交易中发生，绝非恶意诽谤或损害他人名誉。', de: 'Ich bestätige, dass dies aus einem echten Geschäft stammt.', ru: 'Подтверждаю, что это произошло в реальной сделке без злого умысла.', fr: 'Je certifie que ces faits sont réels lors d’une vraie transaction.', tr: 'Bunun gerçek bir işlemde yaşandığını, haksız itibar zedeleme amacı taşımadığını beyan ederim.', es: 'Confirmo que esto ocurrió en un trato real y no busca dañar sin razón.' },
  warn_submit_btn: { ar: 'تأكيد تسجيل علامة التحذير', en: 'Submit Warning Flag', zh: '确认提交警示', de: 'Warnung absenden', ru: 'Отправить предупреждение', fr: 'Valider le signalement', tr: 'Uyarıyı Kaydet', es: 'Confirmar alerta' },
  warn_understood_btn: { ar: 'تمام فهمت', en: 'Got it', zh: '知道了', de: 'Verstanden', ru: 'Понятно', fr: 'Compris', tr: 'Anladım', es: 'Entendido' },
  warn_ok_btn: { ar: 'حسناً', en: 'OK', zh: '好的', de: 'OK', ru: 'ОК', fr: 'OK', tr: 'Tamam', es: 'Aceptar' },
  warn_confirm_my: { ar: 'تأكيد إنهاء الطلب الأول ✓', en: 'Confirm Request Done First ✓', zh: '先确认需求已完成 ✓', de: 'Auftrag zuerst abschließen ✓', ru: 'Сначала подтвердить заказ ✓', fr: 'Confirmer la fin d’abord ✓', tr: 'Önce Talebi Tamamla ✓', es: 'Confirmar pedido primero ✓' },
  warn_confirm_prov: { ar: 'أكّد إن الشغلانة خلصت الأول ✓', en: 'Confirm Job Finished First ✓', zh: '先确认完工 ✓', de: 'Arbeit zuerst bestätigen ✓', ru: 'Подтвердить работу ✓', fr: 'Confirmer travail terminé ✓', tr: 'Önce İşin Bittiğini Onayla ✓', es: 'Confirmar trabajo primero ✓' },
  warn_r_0: { ar: 'نصب أو تحايل مالي', en: 'Fraud / Payment Scam', zh: '诈骗或资金欺诈', de: 'Betrug / Zahlungsausfall', ru: 'Мошенничество с оплатой', fr: 'Arnaque / fraude financière', tr: 'Dolandırıcılık / Maddi Suistimal', es: 'Estafa o fraude financiero' },
  warn_r_1: { ar: 'إخلال صريح بالاتفاق بعد التعامل', en: 'Clear Breach of Agreement', zh: '严重违约 / 爽约', de: 'Vertragsbruch nach Zusage', ru: 'Нарушение условий сделки', fr: 'Rupture claire de l’accord', tr: 'Anlaşmaya Açık İhlal', es: 'Incumplimiento del acuerdo' },
  warn_r_2: { ar: 'سوء معاملة أو إساءة وتهديد', en: 'Abusive Behavior / Threats', zh: '恶劣态度或言语威胁', de: 'Unangemessenes Verhalten', ru: 'Хамство или угрозы', fr: 'Comportement abusif / menaces', tr: 'Kötü Muamele veya Tehdit', es: 'Maltrato o amenazas' },
  warn_r_3: { ar: 'بيانات وهمية أو انتحال صفة', en: 'Fake Info / Impersonation', zh: '虚假资料或冒充他人', de: 'Falsche Daten / Identität', ru: 'Поддельные данные', fr: 'Fausse identité / infos', tr: 'Sahte Bilgi veya Kimlik', es: 'Datos falsos / suplantación' },
  mutual_both_done: { ar: 'مؤكد من الطرفين ✓✓', en: 'Verified by both sides ✓✓', zh: '双方共同确认完工 ✓✓', de: 'Beiderseitig bestätigt ✓✓', ru: 'Подтверждено обеими сторонами ✓✓', fr: 'Confirmé par les 2 parties ✓✓', tr: 'Çift Taraflı Onaylı ✓✓', es: 'Confirmado por ambos ✓✓' },
  mutual_wait_prov: { ar: 'بانتظار تأكيد الصنايعي', en: 'Awaiting provider confirm', zh: '待服务商确认', de: 'Wartet auf Anbieter', ru: 'Ждёт ответа мастера', fr: 'Attente prestataire', tr: 'Usta onayı bekleniyor', es: 'Falta confirmación del pro' },
  mutual_wait_you: { ar: 'الصنايعي أكد الانتهاء — بانتظار تأكيدك', en: 'Pro confirmed — awaiting yours', zh: '对方已确认完工 — 请您确认', de: 'Pro bestätigt – deine fehlt', ru: 'Мастер подтвердил — ваш черёд', fr: 'Pro confirmé — à vous', tr: 'Usta onayladı — onayınız bekleniyor', es: 'Pro confirmó — falta tu confirmación' },
  mutual_deal_lbl: { ar: 'طلب مكتمل ومؤكد من الطرفين «{t}»', en: 'Mutually verified completed deal “{t}”', zh: '双方共同确认完工订单“{t}”', de: 'Beiderseitig bestätigter Auftrag „{t}“', ru: 'Подтверждённая сделка «{t}»', fr: 'Accord terminé mutuellement « {t} »', tr: 'İki taraflı onaylı tamamlanan iş «{t}»', es: 'Trato mutuo completado «{t}»' },

  /* ====== Modals, Notifications & Remaining Dynamic Phrases ====== */
  req_edit_h2: { ar: 'تعديل الطلب', en: 'Edit Request', zh: '编辑需求', de: 'Anfrage bearbeiten', ru: 'Редактировать заказ', fr: 'Modifier la demande', tr: 'Talebi Düzenle', es: 'Editar solicitud' },
  req_del_h2: { ar: 'مسح الطلب نهائياً؟', en: 'Delete Request Forever?', zh: '永久删除该需求？', de: 'Anfrage endgültig löschen?', ru: 'Удалить заказ навсегда?', fr: 'Supprimer définitivement ?', tr: 'Talep kalıcı silinsin mi?', es: '¿Eliminar solicitud?' },
  req_del_p: { ar: 'متأكد إنك عايز تمسح «{t}» من الموقع خالص؟', en: 'Are you sure you want to delete “{t}” permanently?', zh: '确定从平台永久删除“{t}”吗？', de: 'Möchtest du „{t}“ wirklich endgültig löschen?', ru: 'Вы уверены, что хотите удалить «{t}» навсегда?', fr: 'Voulez-vous vraiment supprimer « {t} » ?', tr: '“{t}” talebini tamamen silmek istediğine emin misin?', es: '¿Seguro que deseas eliminar «{t}»?' },
  req_del_btn: { ar: 'أيوه، امسح الطلب', en: 'Yes, Delete', zh: '确认删除', de: 'Ja, löschen', ru: 'Да, удалить', fr: 'Oui, supprimer', tr: 'Evet, Sil', es: 'Sí, eliminar' },
  done_h2: { ar: 'تأكيد إتمام الطلب (تم ومكتمل ✓)', en: 'Mark Request Completed ✓', zh: '确认需求已完成 ✓', de: 'Auftrag abschließen ✓', ru: 'Подтвердить выполнение ✓', fr: 'Marquer terminé ✓', tr: 'Talebi Tamamlandı İşaretle ✓', es: 'Marcar como completado ✓' },
  done_p: { ar: 'أول ما تأكد، الطلب هيتقفل وهيتكتب عليه «تم ومكتمل ✓» بدل «قدّم عرضك».', en: 'Confirming closes this request as Completed instead of taking new quotes.', zh: '确认后需求将关闭并标注为“已完成 ✓”，不再接收新报价。', de: 'Danach wird die Anfrage als erledigt geschlossen.', ru: 'Заказ закроется и получит статус «Выполнено ✓».', fr: 'Cela clôt la demande comme terminée ✓.', tr: 'Onaylandığında talep kapanır ve Tamamlandı görünür.', es: 'Se cerrará como Completado ✓.' },
  done_prov_lbl: { ar: 'مين اللي نفّذلك الطلب؟ (اختياري علشان تقيّم شغله)', en: 'Who completed it? (Optional — to leave a review)', zh: '哪位服务商完成了订单？（可选，方便评价）', de: 'Wer hat es erledigt? (Optional für Bewertung)', ru: 'Кто выполнил заказ? (для отзыва)', fr: 'Qui a réalisé la prestation ? (Optionnel)', tr: 'İşi kim tamamladı? (İsteğe bağlı değerlendirme)', es: '¿Quién lo completó? (Opcional)' },
  done_no_prov: { ar: 'تم الاتفاق والانتهاء (بدون تقييم شخص محدد)', en: 'Completed (no specific review)', zh: '已成交并完成（暂不评价）', de: 'Erledigt (ohne Bewertung)', ru: 'Завершено (без отзыва)', fr: 'Terminé (sans avis)', tr: 'Tamamlandı (kişi seçmeden)', es: 'Completado (sin reseña)' },
  done_rev_lbl: { ar: 'اكتب رأيك وتجربتك (أو دوس ع الصوت واتكلم)', en: 'Write your review (or dictate by voice)', zh: '写下您的评价体验（支持语音输入）', de: 'Deine Bewertung (oder per Sprache)', ru: 'Напишите отзыв (или надиктуйте)', fr: 'Écrivez votre avis (ou dictez)', tr: 'Deneyiminizi yazın (veya sesle anlatın)', es: 'Escribe tu opinión (o dicta por voz)' },
  done_rev_ph: { ar: 'مثلاً: صنايعي محترم ومواعيده مظبوطة وشغله نظيف جداً...', en: 'e.g. Punctual, honest pricing, and super clean work...', zh: '例如：准时守信，报价公道，活干得非常细致……', de: 'z. B. Pünktlich, sauber gearbeitet...', ru: 'Напр.: вежливый мастер, всё вовремя и чисто...', fr: 'Ex. : Ponctuel, travail propre et soigné...', tr: 'Örn: Zamanında geldi, işi çok temiz...', es: 'Ej.: Muy puntual y trabajo impecable...' },
  done_banner_note: { ar: 'خلّصت الشغل أو اتفقت خلاص مع حد في الرسائل؟ اضغط تأكيد تحت علشان الطلب يتعلّم «تم ومكتمل ✓» فوراً.', en: 'Finished the job or agreed in chat? Confirm below to mark Completed right away.', zh: '已完工或已在私信协商成交？点击下方按钮立即标记完成。', de: 'Alles erledigt? Unten bestätigen.', ru: 'Работа сделана? Нажмите подтвердить ниже.', fr: 'Travail fini ? Confirmez ci-dessous.', tr: 'İş bittiyse aşağıdan hemen tamamlandı olarak işaretleyin.', es: '¿Trabajo listo? Confirma abajo.' },
  done_submit_btn: { ar: 'تأكيد إن الطلب تم ومكتمل ✓', en: 'Confirm Completed ✓', zh: '确认完成 ✓', de: 'Abschluss bestätigen ✓', ru: 'Подтвердить завершение ✓', fr: 'Confirmer terminé ✓', tr: 'Tamamlandığını Onayla ✓', es: 'Confirmar completado ✓' },
  work_add_h2: { ar: 'ضِف صورة من شغلك لصفحتك', en: 'Add Portfolio Work Photo', zh: '添加作品案例照片到主页', de: 'Arbeitsfoto hinzufügen', ru: 'Добавить фото работы', fr: 'Ajouter une photo au portfolio', tr: 'Çalışma Fotoğrafı Ekle', es: 'Añadir foto de trabajo' },
  work_cap_lbl: { ar: 'وصف قصير للصورة (اختياري — تقدر تقوله بالصوت)', en: 'Short description (optional)', zh: '作品简短描述（可选）', de: 'Kurze Beschreibung (optional)', ru: 'Краткое описание (необяз.)', fr: 'Courte description', tr: 'Kısa açıklama (isteğe bağlı)', es: 'Descripción corta (opcional)' },
  work_cap_ph: { ar: 'مثلاً: تشطيب سباكة حمام كامل بالمنصورة', en: 'e.g. Full bathroom plumbing remodel', zh: '例如：整套卫浴管道精装改造', de: 'z. B. Komplettes Bad installiert', ru: 'Напр.: полная разводка сантехники', fr: 'Ex. : Rénovation plomberie complète', tr: 'Örn: Komple banyo tesisatı yenileme', es: 'Ej.: Renovación completa de baño' },
  work_save_btn: { ar: 'ارفع الصورة على صفحتي', en: 'Upload to My Page', zh: '上传至主页作品集', de: 'Auf Profil hochladen', ru: 'Загрузить в портфолио', fr: 'Publier sur ma page', tr: 'Sayfama Yükle', es: 'Subir a mi página' },
  pwa_h2: { ar: 'تثبيت تطبيق وصلة', en: 'Install Wasla App', zh: '安装 Wasla 应用', de: 'Wasla App installieren', ru: 'Установить Wasla', fr: 'Installer l’app Wasla', tr: 'Wasla Uygulamasını Kur', es: 'Instalar app Wasla' },
  pwa_sub: { ar: 'يفتح فوراً كـ تطبيق مستقل من شاشتك', en: 'Launches straight from your home screen', zh: '添加到桌面像原生 App 一样秒开使用', de: 'Direkt vom Startbildschirm öffnen', ru: 'Быстрый запуск с главного экрана', fr: 'Accès direct depuis votre écran d’accueil', tr: 'Ana ekrandan anında uygulama gibi açılır', es: 'Abre directo desde tu pantalla' },
  pwa_ext_h2: { ar: 'تثبيت تطبيق وصلة على موبايلك', en: 'Install Wasla on Mobile', zh: '在手机上安装 Wasla', de: 'Wasla mobil installieren', ru: 'Установка на телефон', fr: 'Installer sur mobile', tr: 'Telefona Wasla Kur', es: 'Instalar Wasla en móvil' },
  pwa_ext_p: { ar: 'لتثبيت تطبيق وصلة بأيقونته على شاشتك، افتح الموقع في متصفح Chrome الخارجي واضغط تثبيت:', en: 'Open in Chrome outside the in-app browser to install the Wasla icon on your screen:', zh: '请在系统 Chrome 浏览器中打开本站即可点击安装到桌面：', de: 'Öffne die Seite in Chrome zur Installation:', ru: 'Откройте сайт в внешнем браузере Chrome для установки:', fr: 'Ouvrez dans Chrome pour installer l’icône Wasla :', tr: 'Ana ekrana eklemek için dış Chrome tarayıcıda açın:', es: 'Abre en Chrome externo para instalar la app:' },
  pwa_ext_btn: { ar: 'افتح في Chrome للتثبيت', en: 'Open in Chrome to Install', zh: '在 Chrome 中打开安装', de: 'In Chrome öffnen', ru: 'Открыть в Chrome', fr: 'Ouvrir dans Chrome', tr: 'Kurulum İçin Chrome’da Aç', es: 'Abrir en Chrome' },
  pwa_ios_1: { ar: 'اضغط على زر المشاركة (⬆️ Share) في شريط متصفح Safari تحت.', en: 'Tap the Share button (⬆️) at the bottom bar of Safari.', zh: '点击底部 Safari 浏览器栏中的“分享 (⬆️)”按钮。', de: 'Tippe unten in Safari auf den Teilen-Button (⬆️).', ru: 'Нажмите кнопку «Поделиться (⬆️)» в нижней панели Safari.', fr: 'Touchez le bouton Partager (⬆️) en bas de Safari.', tr: 'Alt Safari çubuğundaki Paylaş (⬆️) düğmesine dokunun.', es: 'Toca el botón Compartir (⬆️) en la barra inferior de Safari.' },
  pwa_ios_2: { ar: 'اختار «إضافة إلى الشاشة الرئيسية / Add to Home Screen» ثم اضغط إضافة.', en: 'Select “Add to Home Screen”, then tap Add.', zh: '选择“添加到主屏幕 (Add to Home Screen)”，然后点击添加。', de: 'Wähle „Zum Home-Bildschirm“ und tippe auf Hinzufügen.', ru: 'Выберите «На экран „Домой“» и нажмите «Добавить».', fr: 'Choisissez « Sur l’écran d’accueil », puis Ajouter.', tr: '«Ana Ekrana Ekle»yi seçip Ekle’ye dokunun.', es: 'Elige «Añadir a pantalla de inicio» y toca Añadir.' },
  pwa_and_1: { ar: 'اضغط على قائمة المتصفح (⋮) أعلى الشاشة.', en: 'Tap the browser menu (⋮) at the top right.', zh: '点击屏幕右上角浏览器菜单 (⋮)。', de: 'Tippe oben rechts auf das Browser-Menü (⋮).', ru: 'Нажмите на меню браузера (⋮) вверху экрана.', fr: 'Touchez le menu du navigateur (⋮) en haut.', tr: 'Ekranın üstündeki tarayıcı menüsüne (⋮) dokunun.', es: 'Toca el menú del navegador (⋮) arriba.' },
  pwa_and_2: { ar: 'اختار «تثبيت التطبيق / Install app» أو «الإضافة إلى الشاشة الرئيسية» وهينزل بأيقونة وصلة فوراً.', en: 'Choose “Install app” or “Add to Home screen” to add the Wasla icon.', zh: '选择“安装应用”或“添加到主屏幕”，桌面即刻出现 Wasla 图标。', de: 'Wähle „App installieren“ oder „Zum Startbildschirm hinzufügen“.', ru: 'Выберите «Установить приложение» или «На главный экран».', fr: 'Sélectionnez « Installer l’application » ou « Ajouter à l’écran d’accueil ».', tr: '«Uygulamayı yükle» veya «Ana ekrana ekle» seçeneğini seçin.', es: 'Elige «Instalar app» o «Añadir a pantalla de inicio».' },
  req_title_lbl: { ar: 'عنوان الطلب', en: 'Request Title', zh: '需求标题', de: 'Anfragetitel', ru: 'Заголовок заказа', fr: 'Titre de la demande', tr: 'Talep Başlığı', es: 'Título del pedido' },
  req_det_lbl: { ar: 'تفاصيل الطلب', en: 'Request Details', zh: '需求详情', de: 'Details der Anfrage', ru: 'Подробности заказа', fr: 'Détails de la demande', tr: 'Talep Detayları', es: 'Detalles del pedido' },
  req_bud_lbl: { ar: 'الميزانية بالجنيه (سيبها فاضية لو مفتوحة)', en: 'Budget in EGP (leave empty if open)', zh: '预算金额（埃镑，可留空面议）', de: 'Budget in EGP (leer falls offen)', ru: 'Бюджет в EGP (оставьте пустым, если договорная)', fr: 'Budget en EGP (laisser vide si ouvert)', tr: 'Bütçe EGP (açıksa boş bırakın)', es: 'Presupuesto en EGP (vacío si es abierto)' },
  req_when_lbl: { ar: 'الوقت المطلوب', en: 'Needed Timeframe', zh: '期望时间', de: 'Gewünschter Zeitraum', ru: 'Срок выполнения', fr: 'Délai souhaité', tr: 'İstenen Zaman', es: 'Plazo requerido' },
  warn_done_pub_toast: { ar: 'تم تسجيل علامتك — الحساب بقى عليه تحذير علني من {p}!', en: 'Warning recorded — this account now displays a public alert from {p}!', zh: '警示已提交 — 该账号现已公开显示来自 {p} 的风险提示！', de: 'Warnung erfasst – öffentlicher Hinweis ab jetzt sichtbar ({p})!', ru: 'Жалоба учтена — теперь аккаунт помечен предупреждением от {p}!', fr: 'Signalement enregistré — alerte publique affichée ({p}) !', tr: 'Uyarı kaydedildi — hesapta {p} tarafından açık uyarı görünüyor!', es: '¡Alerta registrada — este perfil ahora muestra aviso público de {p}!' },
  notif_offer_t: { ar: 'عرض سعر جديد ({p} ج) من {n} على «{t}»', en: 'New quote ({p} EGP) from {n} for “{t}”', zh: '{n} 对“{t}”提交新报价（{p} 埃镑）', de: 'Neues Angebot ({p} EGP) von {n} für „{t}“', ru: 'Новое предложение ({p} EGP) от {n} к «{t}»', fr: 'Nouveau devis ({p} EGP) de {n} pour « {t} »', tr: '“{t}” için {n} kişisinden yeni teklif ({p} EGP)', es: 'Nueva oferta ({p} EGP) de {n} para «{t}»' },
  notif_msg_multi: { ar: '{c} رسائل جديدة من {n}', en: '{c} new messages from {n}', zh: '来自 {n} 的 {c} 条新消息', de: '{c} neue Nachrichten von {n}', ru: '{c} новых сообщений от {n}', fr: '{c} nouveaux messages de {n}', tr: '{n} kişisinden {c} yeni mesaj', es: '{c} mensajes nuevos de {n}' },
  notif_msg_one: { ar: 'رسالة من {n}', en: 'Message from {n}', zh: '来自 {n} 的消息', de: 'Nachricht von {n}', ru: 'Сообщение от {n}', fr: 'Message de {n}', tr: '{n} kişisinden mesaj', es: 'Mensaje de {n}' },
  notif_msg_img: { ar: 'أرسل صورة مرفقة', en: 'Sent a photo', zh: '发送了一张图片', de: 'Hat ein Foto gesendet', ru: 'Отправил(а) фото', fr: 'A envoyé une photo', tr: 'Bir fotoğraf gönderdi', es: 'Envió una foto' },
  notif_rev_t: { ar: 'تقييم موثّق جديد ({s} من 5) من {n}', en: 'New verified review ({s}/5) from {n}', zh: '{n} 给出了 {s}/5 分认证评价', de: 'Neue Bewertung ({s}/5) von {n}', ru: 'Новый отзыв ({s}/5) от {n}', fr: 'Nouvel avis ({s}/5) de {n}', tr: '{n} kişisinden yeni onaylı yorum ({s}/5)', es: 'Nueva reseña ({s}/5) de {n}' },
  notif_rev_s: { ar: 'تقييم بعد إتمام الخدمة', en: 'Verified service review', zh: '交易完成后的真实评价', de: 'Bewertung nach Auftrag', ru: 'Отзыв после услуги', fr: 'Avis après prestation', tr: 'Hizmet sonrası değerlendirme', es: 'Reseña tras servicio' },
  ctx_translate: { ar: 'ترجمة', en: 'Translate', zh: '翻译', de: 'Übersetzen', ru: 'Перевести', fr: 'Traduire', tr: 'Çevir', es: 'Traducir' },
  pause_lbl: { ar: 'إيقاف مؤقت', en: 'Pause', zh: '暂停', de: 'Pause', ru: 'Пауза', fr: 'Pause', tr: 'Duraklat', es: 'Pausa' },
  reveal_hide_tip: { ar: 'اضغط لإعادة الإخفاء', en: 'Tap to hide again', zh: '点击重新隐藏', de: 'Tippen zum Verbergen', ru: 'Нажмите, чтобы скрыть', fr: 'Toucher pour masquer', tr: 'Gizlemek için dokunun', es: 'Toca para ocultar' },
  reveal_show_tip: { ar: 'اضغط للإظهار', en: 'Tap to reveal', zh: '点击查看内容', de: 'Tippen zum Anzeigen', ru: 'Нажмите, чтобы показать', fr: 'Toucher pour afficher', tr: 'Göstermek için dokunun', es: 'Toca para ver' },
  yt_watch_lbl: { ar: 'فيديو يوتيوب — اضغط للمشاهدة', en: 'YouTube Video — Tap to watch', zh: 'YouTube 视频 — 点击观看', de: 'YouTube-Video – zum Ansehen tippen', ru: 'Видео YouTube — нажмите для просмотра', fr: 'Vidéo YouTube — Toucher pour voir', tr: 'YouTube Videosu — İzlemek için dokunun', es: 'Video de YouTube — Toca para ver' },
  maps_shared_lbl: { ar: 'موقع مشترك على خرائط جوجل', en: 'Shared location on Google Maps', zh: '在 Google 地图上共享的位置', de: 'Geteilter Standort auf Google Maps', ru: 'Местоположение в Google Картах', fr: 'Position partagée sur Google Maps', tr: 'Google Haritalar’da paylaşılan konum', es: 'Ubicación compartida en Google Maps' },
  share_from_lbl: { ar: 'مشاركة من {b}', en: 'Shared from {b}', zh: '分享自 {b}', de: 'Geteilt von {b}', ru: 'Поделились из {b}', fr: 'Partagé depuis {b}', tr: '{b} üzerinden paylaşıldı', es: 'Compartido desde {b}' },
  done_ok_msg: { ar: 'تمام! اتقفل الطلب واتكتب عليه «تم ومكتمل ✓» للكل.', en: 'Done! Request closed as Completed ✓ for everyone.', zh: '已确认！该需求现已对所有人显示为“已完成 ✓”。', de: 'Erledigt! Auftrag für alle als abgeschlossen markiert ✓.', ru: 'Готово! Заказ закрыт со статусом «Выполнено ✓».', fr: 'C’est fait ! Demande marquée Terminée ✓.', tr: 'Tamam! Talep herkes için Tamamlandı ✓ oldu.', es: '¡Listo! Pedido cerrado como Completado ✓.' },
  done_rev_ok_msg: { ar: 'تم ومكتمل ✓ واتنشر تقييمك الموثّق ({n} من 5) في صفحة مقدم الخدمة!', en: 'Completed ✓ & your verified review ({n}/5) is live on their profile!', zh: '已完成 ✓！您的真实评价（{n}/5 星）已发布至服务商主页！', de: 'Erledigt ✓ & deine Bewertung ({n}/5) ist live!', ru: 'Выполнено ✓ и ваш отзыв ({n}/5) опубликован!', fr: 'Terminé ✓ et votre avis ({n}/5) est publié !', tr: 'Tamamlandı ✓ ve onaylı yorumunuz ({n}/5) yayınlandı!', es: '¡Completado ✓ y tu reseña ({n}/5) fue publicada!' },
  done_rev_warn_msg: { ar: 'اتقفل الطلب «تم ومكتمل ✓» (لكن حفظ التقييم يحتاج نشر قواعد Firebase).', en: 'Marked Completed ✓ (publishing review requires updated Firebase rules).', zh: '已标记完成 ✓（发表评价需在 Firebase 控制台更新规则）。', de: 'Als erledigt markiert ✓ (Bewertung erfordert aktuelle Firebase-Regeln).', ru: 'Отмечено как выполнено ✓ (для отзыва нужно обновить правила Firebase).', fr: 'Marqué Terminé ✓ (l’avis nécessite les règles Firebase à jour).', tr: 'Tamamlandı ✓ olarak işaretlendi (yorum için Firebase kurallarını yayınlayın).', es: 'Marcado Completado ✓ (la reseña requiere reglas Firebase actualizadas).' },
  msg_edit_fail_rules: { ar: 'معرفناش نعدل الرسالة — انشر firestore.rules المحدّث في Firebase Console.', en: 'Could not edit message — publish updated firestore.rules in Firebase Console.', zh: '编辑失败 — 请在 Firebase 控制台发布最新 firestore.rules。', de: 'Nachricht konnte nicht bearbeitet werden – bitte firestore.rules in Firebase veröffentlichen.', ru: 'Не удалось изменить сообщение — опубликуйте обновлённые firestore.rules в Firebase Console.', fr: 'Impossible de modifier — publiez firestore.rules dans Firebase Console.', tr: 'Mesaj düzenlenemedi — güncel firestore.rules dosyasını Firebase Console’da yayınlayın.', es: 'No se pudo editar — publica firestore.rules en Firebase Console.' },
  msg_del_fail_rules: { ar: 'معرفناش نحذف الرسالة للجميع — انشر firestore.rules المحدّث في Firebase Console.', en: 'Could not delete for everyone — publish updated firestore.rules in Firebase Console.', zh: '撤回失败 — 请在 Firebase 控制台发布最新 firestore.rules。', de: 'Löschen fehlgeschlagen – bitte firestore.rules in Firebase veröffentlichen.', ru: 'Не удалось удалить у всех — опубликуйте firestore.rules в Firebase Console.', fr: 'Suppression échouée — publiez firestore.rules dans Firebase Console.', tr: 'Herkesten silinemedi — güncel firestore.rules dosyasını Firebase Console’da yayınlayın.', es: 'No se pudo eliminar — publica firestore.rules en Firebase Console.' },
  react_fail_rules: { ar: 'معرفناش نحفظ التفاعل — انشر firestore.rules المحدّث في Firebase Console.', en: 'Could not save reaction — publish updated firestore.rules in Firebase Console.', zh: '未能保存表情互动 — 请在 Firebase 控制台发布最新 firestore.rules。', de: 'Reaktion fehlgeschlagen – bitte firestore.rules in Firebase veröffentlichen.', ru: 'Не удалось сохранить реакцию — опубликуйте firestore.rules в Firebase Console.', fr: 'Réaction non enregistrée — publiez firestore.rules dans Firebase Console.', tr: 'İfade kaydedilemedi — güncel firestore.rules dosyasını Firebase Console’da yayınlayın.', es: 'No se pudo guardar reacción — publica firestore.rules en Firebase Console.' },
  done_fail_rules: { ar: 'معرفناش نأكد إتمام الطلب ({c}).', en: 'Could not confirm request completion ({c}).', zh: '无法确认完工（{c}）。', de: 'Abschluss fehlgeschlagen ({c}).', ru: 'Не удалось подтвердить завершение ({c}).', fr: 'Échec de confirmation ({c}).', tr: 'Tamamlandı onayı başarısız ({c}).', es: 'No se pudo confirmar ({c}).' }
};


export function t(key: string, vars?: Record<string, string | number>, code: LangCode = _curLang): string {
  const row = DICT[key];
  let out = (row && (row[code] || row.ar)) || key;
  if (vars) {
    Object.keys(vars).forEach(k => {
      out = out.replace(new RegExp(`\\{${k}\\}`, 'g'), String(vars[k]));
    });
  }
  return out;
}

/* ====== Distance, Time, Budgets & Dynamic Phrase Translator (Toasts/Modals) ====== */
export function tKm(k: number, code: LangCode = _curLang): string {
  if (k >= 9000) return '';
  if (k < 1) {
    return ({
      ar: 'أقل من كيلو',
      en: '< 1 km',
      zh: '不到 1 公里',
      de: '< 1 km',
      ru: 'меньше 1 км',
      fr: 'moins de 1 km',
      tr: '1 km’den az',
      es: 'menos de 1 km'
    }[code]);
  }
  const n = k < 10 ? Math.round(k * 2) / 2 : Math.round(k);
  return ({
    ar: `حوالي ${n} كم`,
    en: `~${n} km`,
    zh: `约 ${n} 公里`,
    de: `ca. ${n} km`,
    ru: `около ${n} км`,
    fr: `env. ${n} km`,
    tr: `yaklaşık ${n} km`,
    es: `aprox. ${n} km`
  }[code]);
}

export function tDist(k: number, code: LangCode = _curLang): string {
  if (k >= 9000) return '';
  if (k < 1) {
    return ({
      ar: 'جنبك في نفس المنطقة',
      en: 'Right in your neighborhood',
      zh: '就在你附近同区域',
      de: 'Direkt in deiner Nähe',
      ru: 'Рядом в вашем районе',
      fr: 'Tout près de chez vous',
      tr: 'Hemen yanında, aynı bölgede',
      es: 'Muy cerca en tu zona'
    }[code]);
  }
  const km = tKm(k, code);
  return ({
    ar: `${km} منك`,
    en: `${km} away`,
    zh: `距你${km}`,
    de: `${km} entfernt`,
    ru: `${km} от вас`,
    fr: `à ${km}`,
    tr: `${km} mesafede`,
    es: `a ${km}`
  }[code]);
}

export function tAgo(msInput: number, code: LangCode = _curLang): string {
  const ms = msInput || Date.now();
  const m = Math.max(0, Math.round((Date.now() - ms) / 60000));
  if (m < 2) {
    return ({ ar: 'لسه دلوقتي', en: 'Just now', zh: '刚刚', de: 'Gerade eben', ru: 'Только что', fr: 'À l’instant', tr: 'Az önce', es: 'Justo ahora' }[code]);
  }
  if (m < 60) {
    return ({
      ar: `من ${m}${m <= 10 ? ' دقايق' : ' دقيقة'}`,
      en: `${m}m ago`,
      zh: `${m} 分钟前`,
      de: `vor ${m} Min.`,
      ru: `${m} мин назад`,
      fr: `il y a ${m} min`,
      tr: `${m} dk önce`,
      es: `hace ${m} min`
    }[code]);
  }
  const h = Math.round(m / 60);
  if (h < 24) {
    if (code === 'ar') return h === 1 ? 'من ساعة' : h === 2 ? 'من ساعتين' : `من ${h}${h <= 10 ? ' ساعات' : ' ساعة'}`;
    return ({
      en: `${h}h ago`,
      zh: `${h} 小时前`,
      de: `vor ${h} Std.`,
      ru: `${h} ч назад`,
      fr: `il y a ${h} h`,
      tr: `${h} sa önce`,
      es: `hace ${h} h`
    }[code]);
  }
  const d = Math.round(h / 24);
  if (code === 'ar') return d === 1 ? 'امبارح' : d === 2 ? 'من يومين' : `من ${d}${d <= 10 ? ' أيام' : ' يوم'}`;
  if (d === 1) {
    return ({ en: 'Yesterday', zh: '昨天', de: 'Gestern', ru: 'Вчера', fr: 'Hier', tr: 'Dün', es: 'Ayer' }[code]);
  }
  return ({
    en: `${d}d ago`,
    zh: `${d} 天前`,
    de: `vor ${d} Tagen`,
    ru: `${d} дн. назад`,
    fr: `il y a ${d} j`,
    tr: `${d} gün önce`,
    es: `hace ${d} d`
  }[code]);
}

export function tStatus(raw: string, code: LangCode = _curLang): string {
  const k = raw === 'open' ? 'st_open' : raw === 'accepted' ? 'st_accepted' : raw === 'completed' ? 'st_completed' : raw === 'cancelled' ? 'st_cancelled' : 'st_new';
  return t(k, undefined, code);
}

export function tNeed(raw: string, code: LangCode = _curLang): string {
  if (!raw || code === 'ar') return raw;
  if (raw === 'مستعجل النهاردة') return t('need_urgent', undefined, code);
  if (raw === 'في أقرب وقت') return t('need_asap', undefined, code);
  if (raw === 'خلال يومين تلاتة') return t('need_days', undefined, code);
  if (raw === 'وقتي مرن') return t('need_flex', undefined, code);
  return raw;
}

export function tBud(raw: string, code: LangCode = _curLang): string {
  if (!raw || code === 'ar') return raw;
  if (raw === 'مفتوحة') return t('bud_open', undefined, code);
  return raw.replace(/\s*ج\.م\b/g, ' ' + t('egp', undefined, code)).replace(/\s*ج\b/g, ' ' + t('egp_short', undefined, code));
}

/* ====== Full Phrase / Toast Fallback Map (for edge toasts & dynamic notices) ====== */
const PHRASE_MAP: Array<[string, Record<Exclude<LangCode, 'ar'>, string>]> = [
  ['اتنسخ الرابط المختصر ✓', { en: 'Short link copied ✓', zh: '短链接已复制 ✓', de: 'Kurzlink kopiert ✓', ru: 'Ссылка скопирована ✓', fr: 'Lien court copié ✓', tr: 'Kısa bağlantı kopyalandı ✓', es: 'Enlace corto copiado ✓' }],
  ['اتنسخ النص ✓', { en: 'Text copied ✓', zh: '文字已复制 ✓', de: 'Text kopiert ✓', ru: 'Текст скопирован ✓', fr: 'Texte copié ✓', tr: 'Metin kopyalandı ✓', es: 'Texto copiado ✓' }],
  ['اتحدّثت صورتك الشخصية!', { en: 'Profile photo updated!', zh: '头像已更新！', de: 'Profilbild aktualisiert!', ru: 'Фото профиля обновлено!', fr: 'Photo de profil mise à jour !', tr: 'Profil fotoğrafı güncellendi!', es: '¡Foto de perfil actualizada!' }],
  ['اتحفظت بياناتك تمام!', { en: 'Your profile has been saved!', zh: '个人资料保存成功！', de: 'Daten erfolgreich gespeichert!', ru: 'Ваши данные сохранены!', fr: 'Informations enregistrées !', tr: 'Bilgilerin başarıyla kaydedildi!', es: '¡Datos guardados correctamente!' }],
  ['اتنشر تقييمك', { en: 'Your verified review is live ✓', zh: '真实评价已发布 ✓', de: 'Bewertung veröffentlicht ✓', ru: 'Отзыв опубликован ✓', fr: 'Avis publié ✓', tr: 'Yorumun yayınlandı ✓', es: '¡Reseña publicada ✓!' }],
  ['طلبك اتنشر على وصلة وبقى ظاهر للكل دلوقتي!', { en: 'Your request is live on Wasla!', zh: '您的需求已在 Wasla 成功发布！', de: 'Deine Anfrage ist jetzt live!', ru: 'Ваш заказ опубликован на Wasla!', fr: 'Votre demande est en ligne sur Wasla !', tr: 'Talebin Wasla’da yayına alındı!', es: '¡Tu pedido ya está visible en Wasla!' }],
  ['ألف مبروك! اتفعّل حسابك كمقدم خدمة وتقدر تقدّم عروض دلوقتي.', { en: 'Awesome! Your Pro profile is live — start sending quotes!', zh: '恭喜！服务商账号已激活，现在可以接单报价了！', de: 'Super! Dein Anbieter-Profil ist aktiv – leg los!', ru: 'Поздравляем! Профиль мастера активен — можно откликаться!', fr: 'Bravo ! Votre profil pro est activé !', tr: 'Harika! Hizmet veren hesabın aktif — hemen teklif verebilirsin!', es: '¡Listo! Tu perfil Pro ya está activo para cotizar.' }],
  ['مبروك الاتفاق! تقدر تراسله دلوقتي، ولما تخلصوا أكدوا الانتهاء انتم الاتنين.', { en: 'Deal agreed! Message each other and mark Done when finished.', zh: '合作达成！现在可随时沟通，完工后双方确认即可。', de: 'Einigung erzielt! Schreibt euch und bestätigt nach Abschluss.', ru: 'Договорились! Спишитесь в чате и подтвердите завершение после работы.', fr: 'Accord validé ! Discutez et confirmez une fois terminé.', tr: 'Anlaşma tamam! Şimdi mesajlaşıp iş bitince ikiniz de onaylayın.', es: '¡Trato cerrado! Ya pueden chatear y confirmar al terminar.' }],
  ['وصل عرضك لصاحب الطلب تمام!', { en: 'Your quote has been sent!', zh: '报价已成功发送给客户！', de: 'Dein Angebot wurde gesendet!', ru: 'Ваше предложение отправлено!', fr: 'Votre devis a bien été envoyé !', tr: 'Teklifin talep sahibine iletildi!', es: '¡Tu cotización fue enviada!' }],
  ['اتحفظ الطلب في المحفوظات ✓', { en: 'Saved to bookmarks ✓', zh: '已加入收藏 ✓', de: 'Gespeichert ✓', ru: 'Добавлено в сохранённое ✓', fr: 'Ajouté aux favoris ✓', tr: 'Kaydedilenlere eklendi ✓', es: 'Guardado en favoritos ✓' }],
  ['اتشال من المحفوظات', { en: 'Removed from bookmarks', zh: '已取消收藏', de: 'Aus Merkliste entfernt', ru: 'Удалено из сохранённого', fr: 'Retiré des favoris', tr: 'Kaydedilenlerden çıkarıldı', es: 'Quitado de guardados' }],
  ['اتثبتت الرسالة 📌', { en: 'Message pinned 📌', zh: '消息已置顶 📌', de: 'Nachricht angeheftet 📌', ru: 'Сообщение закреплено 📌', fr: 'Message épinglé 📌', tr: 'Mesaj sabitlendi 📌', es: 'Mensaje fijado 📌' }],
  ['اتشال تثبيت الرسالة', { en: 'Message unpinned', zh: '已取消置顶', de: 'Nicht mehr angeheftet', ru: 'Сообщение откреплено', fr: 'Message désépinglé', tr: 'Sabitleme kaldırıldı', es: 'Mensaje desfijado' }],
  ['اتقفلت الدردشة 🔒', { en: 'Chat locked 🔒', zh: '对话已上锁 🔒', de: 'Chat gesperrt 🔒', ru: 'Чат заблокирован кодом 🔒', fr: 'Discussion verrouillée 🔒', tr: 'Sohbet kilitlendi 🔒', es: 'Chat bloqueado 🔒' }],
  ['اتشال قفل الدردشة ✓', { en: 'Chat lock removed ✓', zh: '对话密码已移除 ✓', de: 'Sperre aufgehoben ✓', ru: 'Код-пароль снят ✓', fr: 'Verrouillage retiré ✓', tr: 'Sohbet kilidi kaldırıldı ✓', es: 'Bloqueo quitado ✓' }],
  ['اتعدّلت الرسالة ✓', { en: 'Message updated ✓', zh: '消息已编辑 ✓', de: 'Nachricht aktualisiert ✓', ru: 'Сообщение изменено ✓', fr: 'Message modifié ✓', tr: 'Mesaj güncellendi ✓', es: 'Mensaje editado ✓' }],
  ['اتحفظ رمز القفل بنجاح ✓', { en: 'Passcode saved ✓', zh: '密码锁设置成功 ✓', de: 'Code gespeichert ✓', ru: 'Код сохранён ✓', fr: 'Code enregistré ✓', tr: 'Kilit kodu kaydedildi ✓', es: 'PIN guardado ✓' }],
  ['اتلغى الطلب ومبقاش بيستقبل عروض جديدة.', { en: 'Request cancelled and closed to new quotes.', zh: '需求已取消，不再接收新报价。', de: 'Anfrage storniert.', ru: 'Заказ отменён и закрыт для откликов.', fr: 'Demande annulée.', tr: 'Talep iptal edildi.', es: 'Pedido cancelado.' }],
  ['اتمسح الطلب خالص.', { en: 'Request permanently deleted.', zh: '需求已彻底删除。', de: 'Anfrage endgültig gelöscht.', ru: 'Заказ полностью удалён.', fr: 'Demande supprimée.', tr: 'Talep tamamen silindi.', es: 'Pedido eliminado.' }],
  ['اتحدد موقعك تمام ✓', { en: 'Location locked in ✓', zh: '定位已确认 ✓', de: 'Standort erfasst ✓', ru: 'Локация определена ✓', fr: 'Position détectée ✓', tr: 'Konumun ayarlandı ✓', es: 'Ubicación lista ✓' }],
  ['حالتك الآن: متاح للشغل 🟢', { en: 'Status: Available for work 🟢', zh: '当前状态：可接单工作中 🟢', de: 'Status: Verfügbar 🟢', ru: 'Статус: Свободен 🟢', fr: 'Statut : Disponible 🟢', tr: 'Durumun: İşe Müsait 🟢', es: 'Estado: Disponible 🟢' }],
  ['حالتك الآن: مشغول مؤقتاً 🟠', { en: 'Status: Temporarily busy 🟠', zh: '当前状态：暂时忙碌 🟠', de: 'Status: Beschäftigt 🟠', ru: 'Статус: Временно занят 🟠', fr: 'Statut : Occupé 🟠', tr: 'Durumun: Geçici Meşgul 🟠', es: 'Estado: Ocupado 🟠' }],
  ['وقفنا التسجيل الصوتي — راجع النص أو دوس إرسال ✓', { en: 'Voice capture stopped — review and tap Send ✓', zh: '语音录入已停 — 核对后点击发送 ✓', de: 'Aufnahme gestoppt – prüfen & senden ✓', ru: 'Запись остановлена — проверьте и отправьте ✓', fr: 'Dictée terminée — vérifiez et envoyez ✓', tr: 'Ses kaydı durduruldu — gözden geçir ve gönder ✓', es: 'Voz detenida — revisa y envía ✓' }],
  ['وقفنا الكتابة بالصوت ✓', { en: 'Voice typing stopped ✓', zh: '语音输入已停止 ✓', de: 'Spracheingabe beendet ✓', ru: 'Голосовой ввод остановлен ✓', fr: 'Dictée vocale arrêtée ✓', tr: 'Sesle yazma durduruldu ✓', es: 'Dictado detenido ✓' }],
  ['مفيش طلبات متاحة دلوقتي.', { en: 'No open requests available right now.', zh: '当前暂无开放需求。', de: 'Derzeit keine offenen Anfragen.', ru: 'Сейчас нет доступных заказов.', fr: 'Aucune demande disponible.', tr: 'Şu an açık talep bulunmuyor.', es: 'No hay pedidos disponibles ahora.' }],
  ['ده طلبك إنت!', { en: 'That’s your own request!', zh: '这是您自己发布的需求！', de: 'Das ist deine eigene Anfrage!', ru: 'Это ваш собственный заказ!', fr: 'C’est votre propre demande !', tr: 'Bu senin kendi talebin!', es: '¡Es tu propio pedido!' }],
  ['ده حسابك إنت', { en: 'That’s your own profile!', zh: '这是您自己的主页！', de: 'Das ist dein eigenes Profil!', ru: 'Это ваш профиль!', fr: 'C’est votre profil !', tr: 'Bu senin kendi hesabın!', es: '¡Es tu propia cuenta!' }],
  ['الحد الأقصى للرسالة 900 حرف', { en: '900-character message limit reached.', zh: '单条消息上限为 900 字符。', de: 'Limit von 900 Zeichen erreicht.', ru: 'Максимум 900 символов в сообщении.', fr: 'Limite de 900 caractères atteinte.', tr: 'Mesaj sınırı 900 karakterdir.', es: 'Límite máximo de 900 caracteres.' }],
  ['اتقفلت الدردشة 🔒', { en: 'Chat locked 🔒', zh: '对话已上锁 🔒', de: 'Chat gesperrt 🔒', ru: 'Чат заблокирован кодом 🔒', fr: 'Discussion verrouillée 🔒', tr: 'Sohbet kilitlendi 🔒', es: 'Chat bloqueado 🔒' }],
  ['افتح الدردشة بالرمز الأول.', { en: 'Unlock the chat with your passcode first.', zh: '请先输入密码解锁此对话。', de: 'Bitte entsperre den Chat zuerst mit dem Code.', ru: 'Сначала разблокируйте чат паролем.', fr: 'Déverrouillez d’abord le chat avec le code.', tr: 'Önce şifre ile sohbeti açın.', es: 'Desbloquea el chat con el código primero.' }],
  ['الرمز لازم يكون 6 خانات بالظبط.', { en: 'Passcode must be exactly 6 characters.', zh: '密码必须正好为 6 位。', de: 'Der Code muss genau 6 Zeichen lang sein.', ru: 'Пароль должен содержать ровно 6 знаков.', fr: 'Le code doit contenir exactement 6 caractères.', tr: 'Şifre tam olarak 6 haneli olmalıdır.', es: 'El código debe tener exactamente 6 dígitos.' }],
  ['الرمزين مش متطابقين.', { en: 'The two passcodes do not match.', zh: '两次输入的密码不一致。', de: 'Die beiden Codes stimmen nicht überein.', ru: 'Коды не совпадают.', fr: 'Les deux codes ne correspondent pas.', tr: 'İki şifre birbiriyle eşleşmiyor.', es: 'Los códigos no coinciden.' }],
  ['اتأرشفت الدردشة ✓', { en: 'Chat archived ✓', zh: '对话已归档 ✓', de: 'Chat archiviert ✓', ru: 'Чат архивирован ✓', fr: 'Chat archivé ✓', tr: 'Sohbet arşivlendi ✓', es: 'Chat archivado ✓' }],
  ['رجعت الدردشة من الأرشيف ✓', { en: 'Chat unarchived ✓', zh: '已移出归档 ✓', de: 'Aus Archiv geholt ✓', ru: 'Чат восстановлен из архива ✓', fr: 'Chat désarchivé ✓', tr: 'Sohbet arşivden çıkarıldı ✓', es: 'Chat desarchivado ✓' }],
  ['اتلغى الحظر ✓', { en: 'User unblocked ✓', zh: '已取消拉黑 ✓', de: 'Nutzer entsperrt ✓', ru: 'Разблокировано ✓', fr: 'Utilisateur débloqué ✓', tr: 'Engel kaldırıldı ✓', es: 'Usuario desbloqueado ✓' }],
  ['اتحظر المستخدم ✓', { en: 'User blocked ✓', zh: '已拉黑该用户 ✓', de: 'Nutzer blockiert ✓', ru: 'Пользователь заблокирован ✓', fr: 'Utilisateur bloqué ✓', tr: 'Kullanıcı engellendi ✓', es: 'Usuario bloqueado ✓' }],
  ['اتحذفت الدردشة من عندك ✓', { en: 'Chat cleared for you ✓', zh: '聊天记录已仅为您清除 ✓', de: 'Chat für dich gelöscht ✓', ru: 'Чат удалён у вас ✓', fr: 'Chat effacé pour vous ✓', tr: 'Sohbet sizden silindi ✓', es: 'Chat borrado para ti ✓' }],
  ['اتثبتت المحادثة فوق 📌', { en: 'Chat pinned to top 📌', zh: '对话已置顶 📌', de: 'Chat oben angeheftet 📌', ru: 'Чат закреплён наверху 📌', fr: 'Chat épinglé en haut 📌', tr: 'Sohbet üste sabitlendi 📌', es: 'Chat fijado arriba 📌' }],
  ['اتشال التثبيت', { en: 'Chat unpinned', zh: '已取消对话置顶', de: 'Anheften aufgehoben', ru: 'Чат откреплён', fr: 'Chat désépinglé', tr: 'Sabitleme kaldırıldı', es: 'Chat desfijado' }],
  ['سجّل دخولك الأول علشان تبعت الرسالة.', { en: 'Sign in first to send a message.', zh: '请先登录后再发送消息。', de: 'Bitte melde dich zuerst an, um zu schreiben.', ru: 'Войдите, чтобы отправить сообщение.', fr: 'Connectez-vous d’abord pour envoyer.', tr: 'Mesaj göndermek için önce giriş yapın.', es: 'Inicia sesión primero para enviar.' }],
  ['انت حاظر الشخص ده — الغي الحظر الأول.', { en: 'You blocked this user — unblock first.', zh: '您已拉黑对方，请先解除拉黑。', de: 'Du hast diesen Nutzer blockiert.', ru: 'Вы заблокировали собеседника.', fr: 'Vous avez bloqué cet utilisateur.', tr: 'Bu kişiyi engellediniz — önce engeli kaldırın.', es: 'Bloqueaste a este usuario — desbloquéalo primero.' }],
  ['مقدرتش تبعت رسائل في الدردشة دي.', { en: 'Unable to send messages in this chat.', zh: '无法在此对话中发送消息。', de: 'Senden in diesem Chat nicht möglich.', ru: 'Нельзя отправить сообщение в этот чат.', fr: 'Impossible d’envoyer dans ce chat.', tr: 'Bu sohbette mesaj gönderilemiyor.', es: 'No puedes enviar mensajes en este chat.' }],
  ['بتبعت رسائل بسرعة جداً — استنى ثواني وجرّب تاني.', { en: 'Sending too fast — wait a moment.', zh: '发送过快，请稍等几秒再试。', de: 'Zu schnell gesendet – kurz warten.', ru: 'Слишком часто — подождите пару секунд.', fr: 'Envoi trop rapide — patientez.', tr: 'Çok hızlı gönderiyorsunuz — biraz bekleyin.', es: 'Envías muy rápido — espera unos segundos.' }],
  ['تعديل النص متاح للرسائل الكتابية بتاعتك بس.', { en: 'You can only edit your own text messages.', zh: '只能编辑您自己发送的文本消息。', de: 'Nur eigene Textnachrichten bearbeitbar.', ru: 'Редактировать можно только свои тексты.', fr: 'Seuls vos propres messages texte sont modifiables.', tr: 'Yalnızca kendi metin mesajlarınızı düzenleyebilirsiniz.', es: 'Solo puedes editar tus mensajes de texto.' }],
  ['تعديل النصوص متاح لرسائلك النصية بس.', { en: 'You can only edit your own text messages.', zh: '只能编辑您自己发送的文本消息。', de: 'Nur eigene Textnachrichten bearbeitbar.', ru: 'Редактировать можно только свои тексты.', fr: 'Seuls vos propres messages texte sont modifiables.', tr: 'Yalnızca kendi metin mesajlarınızı düzenleyebilirsiniz.', es: 'Solo puedes editar tus mensajes de texto.' }],
  ['اتنسخت تفاصيل الاتفاق ✓', { en: 'Deal terms copied ✓', zh: '协议详情已复制 ✓', de: 'Deal-Details kopiert ✓', ru: 'Условия сделки скопированы ✓', fr: 'Accord copié ✓', tr: 'Anlaşma detayları kopyalandı ✓', es: 'Términos copiados ✓' }],
  ['اكتب اسم الخدمة المتفق عليها الأول.', { en: 'Enter the agreed service name first.', zh: '请先填写约定的服务名称。', de: 'Bitte zuerst den Service eingeben.', ru: 'Сначала укажите название услуги.', fr: 'Indiquez d’abord le service convenu.', tr: 'Önce anlaşılan hizmet adını yazın.', es: 'Escribe primero el servicio acordado.' }],
  ['المتصفح ده مش بيدعم التسجيل الصوتي.', { en: 'This browser does not support voice recording.', zh: '当前浏览器不支持语音录制。', de: 'Dieser Browser unterstützt keine Aufnahme.', ru: 'Браузер не поддерживает запись звука.', fr: 'Enregistrement vocal non supporté ici.', tr: 'Bu tarayıcı ses kaydını desteklemiyor.', es: 'Este navegador no soporta grabación de voz.' }],
  ['محتاج تسمح باستخدام الميكروفون علشان تسجل رسالة صوتية.', { en: 'Allow microphone permission to record voice notes.', zh: '请允许使用麦克风权限以录制语音。', de: 'Bitte Mikrofon-Zugriff für Sprachnotizen erlauben.', ru: 'Разрешите доступ к микрофону для записи.', fr: 'Autorisez le micro pour enregistrer un vocal.', tr: 'Sesli mesaj için mikrofon izni verin.', es: 'Permite el micrófono para grabar audio.' }],
  ['معرفناش نبدأ التسجيل.', { en: 'Could not start recording.', zh: '无法启动录音。', de: 'Aufnahme konnte nicht gestartet werden.', ru: 'Не удалось начать запись.', fr: 'Impossible de démarrer l’enregistrement.', tr: 'Kayıt başlatılamadı.', es: 'No se pudo iniciar la grabación.' }],
  ['التسجيل قصير جداً — اضغط مطولاً وكمّل كلامك.', { en: 'Recording too short — speak a little longer.', zh: '录音太短，请长按并多说几句。', de: 'Aufnahme zu kurz – etwas länger sprechen.', ru: 'Запись слишком короткая.', fr: 'Enregistrement trop court.', tr: 'Kayıt çok kısa — biraz daha uzun konuşun.', es: 'Grabación muy corta — habla un poco más.' }],
  ['معرفناش نقرأ الصورة.', { en: 'Could not read that photo.', zh: '无法读取所选图片。', de: 'Foto konnte nicht gelesen werden.', ru: 'Не удалось прочитать изображение.', fr: 'Impossible de lire cette image.', tr: 'Fotoğraf okunamadı.', es: 'No se pudo leer la imagen.' }],
  ['الدردشة دي محظورة.', { en: 'This chat is blocked.', zh: '该对话已被拉黑。', de: 'Dieser Chat ist blockiert.', ru: 'Этот чат заблокирован.', fr: 'Cette discussion est bloquée.', tr: 'Bu sohbet engellenmiş.', es: 'Este chat está bloqueado.' }],
  ['الحساب ده ملوش معرف مراسلة نشط.', { en: 'This account has no active chat ID.', zh: '该账号暂无有效聊天 ID。', de: 'Dieses Konto hat keine Chat-ID.', ru: 'У аккаунта нет активного чата.', fr: 'Ce compte n’a pas d’identifiant actif.', tr: 'Bu hesabın aktif sohbet kimliği yok.', es: 'Esta cuenta no tiene chat activo.' }],
  ['سجّلت علامة تحذير على الحساب ده قبل كده.', { en: 'You already recorded a warning on this account.', zh: '您此前已对该账号提交过提醒。', de: 'Du hast dieses Konto bereits gemeldet.', ru: 'Вы уже отправляли жалобу на этот аккаунт.', fr: 'Vous avez déjà signalé ce compte.', tr: 'Bu hesap için daha önce uyarı bıraktınız.', es: 'Ya advertiste sobre esta cuenta antes.' }],
  ['لازم يكون فيه تعامل موثق بينكم الأول.', { en: 'Requires a mutually confirmed deal first.', zh: '需双方完成实际交易后方可评价。', de: 'Erfordert zuerst einen bestätigten Auftrag.', ru: 'Сначала требуется подтверждённая сделка.', fr: 'Un accord confirmé par les deux parties est requis.', tr: 'Önce aranızda onaylı bir işlem olmalıdır.', es: 'Se requiere un trato confirmado primero.' }],
  ['استنى لحظة وجرّب تاني.', { en: 'Please wait a moment and try again.', zh: '请稍等片刻后重试。', de: 'Bitte kurz warten und erneut versuchen.', ru: 'Подождите секунду и попробуйте снова.', fr: 'Patientez un instant et réessayez.', tr: 'Biraz bekleyip tekrar deneyin.', es: 'Espera un momento e inténtalo de nuevo.' }],
  ['اكتب تفاصيل الواقعة بوضوح (20 حرف على الأقل) لمنع البلاغات الكيدية.', { en: 'Write clear details (min 20 characters).', zh: '请至少输入 20 字详细说明情况。', de: 'Bitte mindestens 20 Zeichen Details angeben.', ru: 'Опишите подробнее (минимум 20 символов).', fr: 'Saisissez au moins 20 caractères de détails.', tr: 'En az 20 karakter detay yazın.', es: 'Escribe detalles claros (mínimo 20 caracteres).' }],
  ['لازم تعلّم على إقرار المصداقية الأول.', { en: 'Check the honesty pledge first.', zh: '请先勾选真实性承诺声明。', de: 'Bitte zuerst das Versprechen bestätigen.', ru: 'Подтвердите честность отзыва галочкой.', fr: 'Cochez d’abord l’engagement de sincérité.', tr: 'Önce doğruluk beyanını işaretleyin.', es: 'Marca primero la declaración de veracidad.' }],
  ['التقييم متاح فقط بعد تنفيذ وإتمام طلب خدمة فعلي مع مقدم الخدمة ده.', { en: 'Reviews unlock only after completing a real job together.', zh: '仅在与该服务商完成真实订单后才可发布评价。', de: 'Bewertungen erst nach abgeschlossenem Auftrag.', ru: 'Отзыв доступен только после реального заказа.', fr: 'Les avis sont ouverts uniquement après prestation.', tr: 'Yorumlar yalnızca gerçek bir iş tamamlandıktan sonra açılır.', es: 'Solo puedes opinar tras completar un trabajo real.' }],
  ['مينفعش تقيّم نفسك يا بطل!', { en: 'You can’t review your own profile!', zh: '不能给自己撰写评价哦！', de: 'Du kannst dich nicht selbst bewerten!', ru: 'Нельзя оценивать самого себя!', fr: 'Impossible de vous évaluer vous-même !', tr: 'Kendi kendini değerlendiremezsin!', es: '¡No puedes reseñarte a ti mismo!' }],
  ['تسلم! اتنشر تقييمك الموثّق على صفحة مقدم الخدمة ✓', { en: 'Published your verified review ✓', zh: '您的真实评价已成功发布 ✓', de: 'Deine Bewertung ist live ✓', ru: 'Ваш отзыв опубликован ✓', fr: 'Votre avis vérifié est en ligne ✓', tr: 'Onaylı yorumunuz yayınlandı ✓', es: '¡Tu reseña verificada fue publicada ✓!' }],
  ['اتمسح تقييمك.', { en: 'Review deleted.', zh: '评价已删除。', de: 'Bewertung gelöscht.', ru: 'Отзыв удалён.', fr: 'Avis supprimé.', tr: 'Yorumun silindi.', es: 'Reseña eliminada.' }],
  ['اتضافت الصورة لمعرض شغلك ✓', { en: 'Photo added to your portfolio ✓', zh: '已添加作品照到您的主页 ✓', de: 'Foto zum Portfolio hinzugefügt ✓', ru: 'Фото добавлено в портфолио ✓', fr: 'Photo ajoutée à votre galerie ✓', tr: 'Fotoğraf portföyüne eklendi ✓', es: 'Foto añadida a tu galería ✓' }],
  ['اتمسحت الصورة من معرض شغلك.', { en: 'Photo removed from portfolio.', zh: '已从作品集删除图片。', de: 'Foto entfernt.', ru: 'Фото удалено из портфолио.', fr: 'Photo retirée du portfolio.', tr: 'Fotoğraf portföyden silindi.', es: 'Foto eliminada de la galería.' }],
  ['اتعدّل طلبك بنجاح!', { en: 'Request updated successfully!', zh: '需求已更新成功！', de: 'Anfrage aktualisiert!', ru: 'Заказ обновлён!', fr: 'Demande mise à jour !', tr: 'Talebin başarıyla güncellendi!', es: '¡Solicitud actualizada!' }],
  ['رجعنا فتحنا الطلب تاني للناس!', { en: 'Request reopened for quotes!', zh: '已重新开放此需求接收报价！', de: 'Anfrage wieder geöffnet!', ru: 'Заказ снова открыт для откликов!', fr: 'Demande rouverte !', tr: 'Talebin tekrar tekliflere açıldı!', es: '¡Solicitud reabierta!' }],
  ['الطلب ده تم ومكتمل خلاص ✓', { en: 'This request is already completed ✓', zh: '此需求已完成 ✓', de: 'Diese Anfrage ist bereits erledigt ✓', ru: 'Этот заказ уже выполнен ✓', fr: 'Cette demande est déjà terminée ✓', tr: 'Bu talep zaten tamamlanmış ✓', es: 'Esta solicitud ya está completada ✓' }],
  ['صاحب الطلب اتفق خلاص على تنفيذ الطلب ✓', { en: 'Client already agreed with a pro ✓', zh: '需求方已选定合作服务商 ✓', de: 'Bereits an einen Profi vergeben ✓', ru: 'Исполнитель по заказу уже выбран ✓', fr: 'Le client a déjà choisi un prestataire ✓', tr: 'Talep sahibi zaten anlaşma sağladı ✓', es: 'Ya hay un acuerdo confirmado ✓' }],
  ['تمام! اتسجّل تأكيدك لإنهاء الشغلانة ✓', { en: 'Recorded your job completion confirmation ✓', zh: '已记录您的完工确认 ✓', de: 'Abschluss bestätigt ✓', ru: 'Подтверждение завершения записано ✓', fr: 'Confirmation de fin enregistrée ✓', tr: 'İş bitirme onayınız kaydedildi ✓', es: 'Confirmación registrada ✓' }],
  ['أكدت إنهاء الشغلانة دي بالفعل ✓', { en: 'You already confirmed this job ✓', zh: '您之前已确认该订单完工 ✓', de: 'Du hast bereits bestätigt ✓', ru: 'Вы уже подтвердили этот заказ ✓', fr: 'Vous avez déjà confirmé ✓', tr: 'Bunu zaten onayladınız ✓', es: 'Ya habías confirmado este trabajo ✓' }],
  ['اكتب الكلمة اللي بتدور عليها الأول.', { en: 'Type what you are looking for first.', zh: '请先输入搜索关键词。', de: 'Bitte zuerst einen Suchbegriff eingeben.', ru: 'Сначала введите поисковый запрос.', fr: 'Tapez d’abord votre recherche.', tr: 'Önce ne aradığınızı yazın.', es: 'Escribe qué buscas primero.' }],
  ['اتنسخ الرابط — افتح Safari أو Chrome والصقه هناك ✓', { en: 'Link copied — open Safari or Chrome and paste it ✓', zh: '链接已复制 — 请在 Safari 或 Chrome 中粘贴打开 ✓', de: 'Link kopiert – in Chrome/Safari öffnen ✓', ru: 'Ссылка скопирована — вставьте в браузер ✓', fr: 'Lien copié — ouvrez Safari ou Chrome ✓', tr: 'Bağlantı kopyalandı — tarayıcıda açın ✓', es: 'Enlace copiado — pégalo en Chrome o Safari ✓' }],
  ['جاري تثبيت تطبيق وصلة على جهازك ✓', { en: 'Installing Wasla on your device ✓', zh: '正在为您安装 Wasla 应用 ✓', de: 'Wasla wird installiert ✓', ru: 'Устанавливаем Wasla ✓', fr: 'Installation de Wasla ✓', tr: 'Wasla cihazına kuruluyor ✓', es: 'Instalando Wasla en tu dispositivo ✓' }],
  ['اتثبّت تطبيق وصلة على جهازك بنجاح ✓', { en: 'Wasla installed successfully ✓', zh: 'Wasla 已成功安装到桌面 ✓', de: 'Wasla erfolgreich installiert ✓', ru: 'Wasla успешно установлено ✓', fr: 'Wasla installé avec succès ✓', tr: 'Wasla başarıyla kuruldu ✓', es: '¡Wasla instalado con éxito ✓!' }],
  ['اتنسخ الرابط للمشاركة ✓', { en: 'Link copied for sharing ✓', zh: '链接已复制，快去分享吧 ✓', de: 'Link zum Teilen kopiert ✓', ru: 'Ссылка скопирована ✓', fr: 'Lien copié pour partager ✓', tr: 'Paylaşım bağlantısı kopyalandı ✓', es: 'Enlace copiado para compartir ✓' }],
  ['معرفناش نشغل التسجيل ده.', { en: 'Could not play this voice message.', zh: '无法播放该语音。', de: 'Sprachnachricht konnte nicht abgespielt werden.', ru: 'Не удалось воспроизвести голосовое.', fr: 'Impossible de lire ce message vocal.', tr: 'Sesli mesaj oynatılamadı.', es: 'No se pudo reproducir el audio.' }],
  ['انسخ الاتفاق من الشات.', { en: 'Copy deal terms from the chat.', zh: '请从聊天中复制协议内容。', de: 'Details aus dem Chat kopieren.', ru: 'Скопируйте условия из чата.', fr: 'Copiez l’accord depuis le chat.', tr: 'Anlaşmayı sohbetten kopyalayın.', es: 'Copia el acuerdo desde el chat.' }],
  ['اترفض العرض.', { en: 'Quote declined.', zh: '报价已拒绝。', de: 'Angebot abgelehnt.', ru: 'Предложение отклонено.', fr: 'Devis refusé.', tr: 'Teklif reddedildi.', es: 'Oferta rechazada.' }],
  ['معرفناش نرفض العرض.', { en: 'Could not decline quote.', zh: '无法拒绝该报价。', de: 'Angebot konnte nicht abgelehnt werden.', ru: 'Не удалось отклонить.', fr: 'Impossible de refuser.', tr: 'Teklif reddedilemedi.', es: 'No se pudo rechazar la oferta.' }],
  ['مش محدد منفّذ للطلب ده.', { en: 'No provider assigned to this request.', zh: '该需求尚未指定服务商。', de: 'Kein Anbieter zugewiesen.', ru: 'Исполнитель не назначен.', fr: 'Aucun prestataire assigné.', tr: 'Bu talebe usta atanmamış.', es: 'No hay proveedor asignado.' }],
  ['ملف الصورة غير مدعوم.', { en: 'Image file not supported.', zh: '不支持该图片格式。', de: 'Bilddatei nicht unterstützt.', ru: 'Формат изображения не поддерживается.', fr: 'Image non prise en charge.', tr: 'Görsel dosyası desteklenmiyor.', es: 'Imagen no compatible.' }]
];

export function translateReasonText(rawReason: string, code: LangCode = _curLang): string {
  const s = String(rawReason || '').trim();
  if (!s || code === 'ar') return s;
  const idx = ['نصب أو تحايل مالي', 'إخلال صريح بالاتفاق بعد التعامل', 'سوء معاملة أو إساءة وتهديد', 'بيانات وهمية أو انتحال صفة'].indexOf(s);
  return idx >= 0 ? t(`warn_r_${idx}`, undefined, code) : s;
}

export function tf(raw: string, code: LangCode = _curLang): string {
  const s = String(raw || '');
  if (!s || code === 'ar') return s;
  for (const [needle, trans] of PHRASE_MAP) {
    if (s === needle || s.includes(needle)) return trans[code];
  }
  return s;
}

/* ====== Smart Client-Side Language Detector & Literal Cross-Language Translator ====== */
function analyzeTextScript(raw: string): {
  lang: LangCode | null;
  confident: boolean;
  arCount: number;
  latCount: number;
  zhCount: number;
  ruCount: number;
} {
  const s = String(raw || '')
    .replace(/https?:\/\/\S+|www\.\S+/gi, ' ')
    .replace(/[\d٠-٩۰-۹+\-.,:;!?@#%^&*()\[\]{}<>\/\\|"'`~_=«»—–✓📌📍🎤🖼🤝★☆🟢🟠🔒·•…]+/g, ' ')
    .trim();
  if (!s) return { lang: null, confident: false, arCount: 0, latCount: 0, zhCount: 0, ruCount: 0 };

  const arCount = (s.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g) || []).length;
  const zhCount = (s.match(/[\u4E00-\u9FFF\u3400-\u4DBF]/g) || []).length;
  const ruCount = (s.match(/[\u0400-\u04FF]/g) || []).length;
  const latCount = (s.match(/[A-Za-zÀ-ÖØ-öø-ÿğĞşŞıİçÇöÖüÜßñÑœŒ]/g) || []).length;

  const total = arCount + zhCount + ruCount + latCount;
  if (zhCount >= 1 && zhCount >= arCount && zhCount >= ruCount && zhCount >= latCount) {
    return { lang: 'zh', confident: true, arCount, latCount, zhCount, ruCount };
  }
  if (total < 2) return { lang: null, confident: false, arCount, latCount, zhCount, ruCount };
  if (arCount >= ruCount && arCount >= latCount && arCount >= zhCount) {
    return { lang: 'ar', confident: arCount >= 3, arCount, latCount, zhCount, ruCount };
  }
  if (ruCount >= arCount && ruCount >= latCount && ruCount >= zhCount) {
    return { lang: 'ru', confident: ruCount >= 3, arCount, latCount, zhCount, ruCount };
  }

  const low = ' ' + s.toLowerCase() + ' ';
  const scores: Record<'tr' | 'de' | 'fr' | 'es' | 'en', number> = { tr: 0, de: 0, fr: 0, es: 0, en: 0.05 };
  scores.tr += (s.match(/[ğĞşŞıİ]/g) || []).length * 4 + (s.match(/[çÇöÖüÜ]/g) || []).length * 1.1;
  scores.de += (s.match(/[ßäÄ]/g) || []).length * 4 + (s.match(/[öÖüÜ]/g) || []).length * 1.1;
  scores.fr += (s.match(/[éèêëàâîïôùûüœç]/gi) || []).length * 1.6;
  scores.es += (s.match(/[ñÑ¿¡áéíóú]/gi) || []).length * 2.2;

  const trHits = low.match(/\b(merhaba|selam|tesekkur|tesekkurler|teşekkür|teşekkürler|lutfen|lütfen|fiyat|ne kadar|cok|çok|iyi|tamam|evet|hayir|hayır|usta|bugun|bugün|yarin|yarın|musait|müsait|hizmet|bir|ve|bu|var|yok|ben|sen|kac|kaç)\b/gi);
  if (trHits) scores.tr += trHits.length * 2.6;
  const deHits = low.match(/\b(hallo|guten|danke|bitte|preis|kosten|sehr|gut|ich|sie|wir|und|der|die|das|ein|eine|mit|fur|für|nicht|wann|heute|morgen|arbeit|frei|brauche)\b/gi);
  if (deHits) scores.de += deHits.length * 2.6;
  const frHits = low.match(/\b(bonjour|salut|bonsoir|merci|combien|prix|tres|très|bien|avec|pour|dans|est|sont|je|tu|nous|vous|il|elle|les|des|une|oui|non|demain|aujourd|travail|besoin|disponible)\b/gi);
  if (frHits) scores.fr += frHits.length * 2.6;
  const esHits = low.match(/\b(hola|buenos|buenas|gracias|precio|cuanto|cuánto|muy|bueno|bien|para|con|por|favor|hoy|manana|mañana|trabajo|servicio|necesito|que|qué|una|uno|los|las|estoy)\b/gi);
  if (esHits) scores.es += esHits.length * 2.6;
  const enHits = low.match(/\b(the|is|are|was|were|be|have|has|do|does|can|could|will|would|this|that|with|from|you|your|we|they|for|and|not|hello|hi|hey|thanks|thank|please|price|how|much|available|when|today|tomorrow|service|good|work|photo|need|great|looking|want)\b/gi);
  if (enHits) scores.en += enHits.length * 2.4;

  let best: 'tr' | 'de' | 'fr' | 'es' | 'en' = 'en';
  let bestVal = scores.en;
  (['tr', 'de', 'fr', 'es'] as const).forEach(k => {
    if (scores[k] > bestVal) { best = k; bestVal = scores[k]; }
  });
  return { lang: best, confident: bestVal >= 2.2, arCount, latCount, zhCount, ruCount };
}

export function detectTextLang(raw: string): LangCode | null {
  return analyzeTextScript(raw).lang;
}

export function shouldShowTranslateBtn(raw: string, targetLang: LangCode = _curLang): boolean {
  const txt = String(raw || '').trim();
  if (!txt) return false;
  const info = analyzeTextScript(txt);
  if (!info.lang) return false;
  if (info.arCount > 0 && info.latCount >= 6 && targetLang === 'ar') return true;
  if (targetLang === 'en' && info.lang === 'en' && !info.confident && info.latCount >= 4) return true;
  return info.lang !== targetLang;
}

const QUICK_LITERAL_PHRASES: Array<[RegExp, Record<LangCode, string>]> = [
  [/^(?:السعر\s*(?:كم|كام)|بكام|كام\s*تقريباً)\s*[؟?]*$/i, { ar: 'السعر كام تقريباً؟', en: 'What is the approximate price?', zh: '价格大概是多少？', de: 'Wie hoch ist ungefähr der Preis?', ru: 'Какая примерная цена?', fr: 'Quel est le prix approximatif ?', tr: 'Fiyatı yaklaşık ne kadar?', es: '¿Cuál es el precio aproximado?' }],
  [/^(?:فاضي\s*[إا]متى\s*(?:ننفذ|تيجي)?|[إا]متى\s*فاضي)\s*[؟?]*$/i, { ar: 'فاضي إمتى ننفذ؟', en: 'When are you free to do it?', zh: '您什么时候有空上门施工？', de: 'Wann haben Sie Zeit dafür?', ru: 'Когда вы свободны для работы?', fr: 'Quand êtes-vous disponible ?', tr: 'Ne zaman müsaitsiniz?', es: '¿Cuándo estás disponible?' }],
  [/^(?:ممكن\s*صورة?\s*من\s*شغلك|ابعت\s*صور\s*شغلك)\s*[؟?]*$/i, { ar: 'ممكن صورة من شغلك؟', en: 'Could you share a photo of your past work?', zh: '能发一张您以往作品的照片吗？', de: 'Können Sie Fotos Ihrer Arbeit senden?', ru: 'Можно фото ваших работ?', fr: 'Pouvez-vous envoyer une photo de vos travaux ?', tr: 'İşlerinizden bir fotoğraf atabilir misiniz?', es: '¿Puedes mostrar una foto de tu trabajo?' }],
  [/^(?:بعتلك\s*مكاني\s*والتفاصيل|بعتلك\s*اللوكيشن)$/i, { ar: 'بعتلك مكاني والتفاصيل', en: 'I sent you my location and details.', zh: '我已把我的位置和详细信息发给您了。', de: 'Ich habe Ihnen meinen Standort und Details gesendet.', ru: 'Отправил вам локацию и детали.', fr: 'Je vous ai envoyé ma position et les détails.', tr: 'Konumumu ve detayları size gönderdim.', es: 'Te envié mi ubicación y los detalles.' }],
  [/^(?:السلام\s*عليكم|أهلاً|اهلا|مرحبا|هالو|hello|hi)$/i, { ar: 'أهلاً بك!', en: 'Hello!', zh: '您好！', de: 'Hallo!', ru: 'Здравствуйте!', fr: 'Bonjour !', tr: 'Merhaba!', es: '¡Hola!' }],
  [/^(?:شكراً|شكرا(\s*جزيلاً)?|متشكر|تسلم|thanks|thank you)$/i, { ar: 'شكراً لك!', en: 'Thank you!', zh: '非常感谢！', de: 'Vielen Dank!', ru: 'Спасибо!', fr: 'Merci beaucoup !', tr: 'Teşekkür ederim!', es: '¡Muchas gracias!' }],
  [/^(?:تمام|حاضر|ماشي|أوكي|ok|okay)$/i, { ar: 'تمام!', en: 'Okay, sounds good!', zh: '好的，没问题！', de: 'Alles klar, einverstanden!', ru: 'Хорошо, договорились!', fr: 'D’accord !', tr: 'Tamam, anlaştık!', es: '¡De acuerdo!' }]
];

const _trMemCache = new Map<string, string>();
const TR_SS_K = 'wasla_tr_cache_v1';

function _trLoadSS(): Record<string, string> {
  try { return JSON.parse(window.sessionStorage.getItem(TR_SS_K) || '{}') || {}; } catch { return {}; }
}
function _trSaveSS(cacheKey: string, val: string): void {
  try {
    const cur = _trLoadSS();
    cur[cacheKey] = val;
    const keys = Object.keys(cur);
    if (keys.length > 160) delete cur[keys[0]];
    window.sessionStorage.setItem(TR_SS_K, JSON.stringify(cur));
  } catch {}
}

export async function translateTextSmart(
  raw: string,
  toLang: LangCode = _curLang,
  opts?: { force?: boolean }
): Promise<{ text: string; srcLang: LangCode | null; ok: boolean }> {
  const txt = String(raw || '').trim();
  const info = analyzeTextScript(txt);
  const srcLang = info.lang;
  if (!txt) return { text: txt, srcLang, ok: false };
  const isMixedArLat = info.arCount > 0 && info.latCount >= 6 && toLang === 'ar';
  const skipSame = !opts?.force && !isMixedArLat && srcLang === toLang && info.confident;
  if (skipSame) return { text: txt, srcLang, ok: true };

  const cacheKey = `${toLang}:${txt}`;
  if (_trMemCache.has(cacheKey)) {
    return { text: _trMemCache.get(cacheKey)!, srcLang, ok: true };
  }
  const ss = _trLoadSS();
  if (ss[cacheKey]) {
    _trMemCache.set(cacheKey, ss[cacheKey]);
    return { text: ss[cacheKey], srcLang, ok: true };
  }

  for (const [re, map] of QUICK_LITERAL_PHRASES) {
    if (re.test(txt)) {
      const hit = map[toLang];
      if (hit) {
        _trMemCache.set(cacheKey, hit);
        _trSaveSS(cacheKey, hit);
        return { text: hit, srcLang, ok: true };
      }
    }
  }

  const mapLang = (c: LangCode | null) => (c === 'zh' ? 'zh-CN' : c || 'auto');
  const tl = mapLang(toLang);
  const sl = (srcLang === 'ar' || srcLang === 'zh' || srcLang === 'ru') && !isMixedArLat ? mapLang(srcLang) : 'auto';
  const clipped = txt.slice(0, 1800);

  try {
    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const tid = ctrl ? setTimeout(() => ctrl.abort(), 7500) : 0;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(clipped)}`;
    const res = await fetch(url, ctrl ? { signal: ctrl.signal } : undefined);
    if (tid) clearTimeout(tid);
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json) && Array.isArray(json[0])) {
        const out = json[0].map((seg: any) => (Array.isArray(seg) ? String(seg[0] || '') : '')).join('').trim();
        if (out) {
          _trMemCache.set(cacheKey, out);
          _trSaveSS(cacheKey, out);
          return { text: out, srcLang: (json[2] as LangCode) || srcLang, ok: true };
        }
      }
    }
  } catch {}

  try {
    const mmSl = srcLang && srcLang !== toLang ? mapLang(srcLang) : (toLang === 'ar' ? 'en' : 'ar');
    if (mmSl !== tl) {
      const ctrl2 = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const tid2 = ctrl2 ? setTimeout(() => ctrl2.abort(), 7500) : 0;
      const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clipped.slice(0, 500))}&langpair=${encodeURIComponent(mmSl + '|' + tl)}`;
      const res2 = await fetch(mmUrl, ctrl2 ? { signal: ctrl2.signal } : undefined);
      if (tid2) clearTimeout(tid2);
      if (res2.ok) {
        const mm = await res2.json();
        const out2 = String(mm?.responseData?.translatedText || '').trim();
        if (out2 && mm?.responseStatus === 200 && !/INVALID LANGUAGE PAIR|MYMEMORY WARNING|NO QUERY SPECIFIED/i.test(out2)) {
          _trMemCache.set(cacheKey, out2);
          _trSaveSS(cacheKey, out2);
          return { text: out2, srcLang, ok: true };
        }
      }
    }
  } catch {}

  return { text: '', srcLang, ok: false };
}

/* ====== Update Static DOM Elements in index.html ====== */
export function syncStaticDOM(code: LangCode = _curLang): void {
  if (typeof document === 'undefined') return;
  applyDocDirection(code);

  const setText = (sel: string, txt: string) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = txt;
  };
  const setPh = (sel: string, ph: string) => {
    const el = document.querySelector(sel) as HTMLInputElement | null;
    if (el) el.placeholder = ph;
  };

  // Title & Intro Screen
  document.title = code === 'ar'
    ? 'وصلة — الصنعة والخدمة في منطقتك'
    : `Wasla — ${t('hero_sub', undefined, code).split('·').pop()?.trim() || 'Local Services'}`;

  const h1 = document.querySelector('#intro h1');
  if (h1) h1.innerHTML = `${t('intro_title_pre', undefined, code)}<span>${t('brand_name', undefined, code)}</span>`;
  setText('#intro .lead', t('intro_lead', undefined, code));
  const pills = document.querySelectorAll('#intro .intro-pill');
  if (pills.length >= 4) {
    pills[0].textContent = t('intro_p1', undefined, code);
    pills[1].textContent = t('intro_p2', undefined, code);
    pills[2].textContent = t('intro_p3', undefined, code);
    pills[3].textContent = t('intro_p4', undefined, code);
  }
  setText('#enter', t('intro_enter', undefined, code));
  const igBtn = document.getElementById('intro-google');
  if (igBtn) {
    const svg = igBtn.querySelector('svg');
    igBtn.textContent = '';
    if (svg) igBtn.appendChild(svg);
    igBtn.append(' ' + t('intro_google', undefined, code));
  }
  setText('#intro .hint', t('intro_hint', undefined, code));

  // Login Screen
  setText('#login .atitle', t('login_title', undefined, code));
  setText('#login .stp', t('step_1_2', undefined, code));
  setText('#login h2', t('login_h2', undefined, code));
  setText('#login .sub', t('login_sub', undefined, code));
  setText('#google .atx b', t('login_add_b', undefined, code));
  setText('#google .atx small', t('login_add_s', undefined, code));
  setText('#login .fine', t('login_fine', undefined, code));

  // S1 Onboarding
  setText('#s1 .atitle', t('s1_title', undefined, code));
  setText('#s1 .stp', t('step_2_2', undefined, code));
  setText('#s1 h2', t('s1_h2', undefined, code));
  setText('#s1 .sub', t('s1_sub', undefined, code));
  setText('#s1 label[for="n1"]', t('first_nm', undefined, code));
  setPh('#n1', t('s1_n1_ph', undefined, code));
  setText('#s1 label[for="n2"]', t('second_nm', undefined, code));
  setPh('#n2', t('s1_n2_ph', undefined, code));
  setText('#s1 label[for="n3"]', t('last_nm', undefined, code));
  setPh('#n3', t('s1_n3_ph', undefined, code));
  setText('#s1 label[for="ph"]', t('s1_ph_lbl', undefined, code));
  const lb1Prev = document.querySelector('#lb1')?.previousElementSibling;
  if (lb1Prev && lb1Prev.tagName === 'LABEL') lb1Prev.textContent = t('s1_loc_lbl', undefined, code);
  setText('#s1 label[for="a1"]', t('s1_area_lbl', undefined, code));
  setPh('#a1', t('s1_area_ph', undefined, code));
  const permsPrev = document.querySelector('#s1 .perms-grid')?.previousElementSibling;
  if (permsPrev && permsPrev.tagName === 'LABEL') permsPrev.textContent = t('s1_perms_lbl', undefined, code);
  setText('#perm-loc-card .perm-head b', t('s1_loc_b', undefined, code));
  setText('#perm-push-card .perm-head b', t('s1_push_b', undefined, code));
  setText('#next1', t('s1_go', undefined, code));

  // Back buttons aria-label
  document.querySelectorAll('#bk, .bkb').forEach(el => {
    el.setAttribute('aria-label', t('back_aria', undefined, code));
  });

  // Sidebar & Shell
  const brand = document.querySelector('#side .brand');
  if (brand) {
    const logo = brand.querySelector('#side-logo');
    brand.textContent = '';
    if (logo) brand.appendChild(logo);
    brand.append(t('brand_name', undefined, code));
  }
  setPh('#q', t('search_side_ph', undefined, code));

  // PWA Bar
  setText('#pwa-bar .pwa-tx b', t('pwa_t', undefined, code));
  setText('#pwa-bar .pwa-tx small', t('pwa_s', undefined, code));
  setText('#pwa-install-btn', t('pwa_go', undefined, code));
}
