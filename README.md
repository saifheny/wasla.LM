# وصلة (WASLA) — منصة الخدمات والمشاوير

تطبيق ويب متكامل (PWA) لربط طالبي الخدمات بمقدمي الخدمات في مختلف المحافظات، مبني باستخدام **TypeScript 5** و **React 18** مع حماية **Content-Security-Policy** والتحقق عبر بصمات **SRI (SHA-384)** ودعم كامل لـ 8 لغات.

## المميزات الأساسية
- **تعدد اللغات (8 لغات)**: العربية، الإنجليزية، الصينية، الألمانية، الروسية، الفرنسية، التركية، والإسبانية، مع دعم تلقائي لاتجاه الواجهة (RTL / LTR).
- **البحث السريع والفرز حسب القرب**: البحث بالكلمات المفتاحية والفئة والتصفية حسب المحافظة والمدينة والمسافة الجغرافية.
- **الدردشة الفورية الآمنة**:
  - إرسال نصوص (بحد أقصى منضبط للرسالة للحفاظ على أداء السيرفر)، صور (بحد أقصى 3 صور كل 24 ساعة)، رسائل صوتية (بحد أقصى 5 رسائل صوتية كل 24 ساعة)، ومشاركة الموقع الجغرافي وبطاقة الاتفاق.
  - قفل المحادثات برمز مرور وتحديث فوري لحالة الرسائل والقراءة.
- **التقييمات الموثّقة**: نظام تقييم لمقدمي الخدمة بعد إتمام طلب فعلي ومكتمل على مستوى الواجهة وقواعد الأمان.
- **الحماية والأمان**:
  - `src/security/shield.ts`: تعقيم المدخلات والروابط (`esc`, `cleanInput`, `safeUrl`, `safeImgUrl`)، مخزن محلي موقّع (`SecureStore`)، ومحدد معدل العمليات (`RateGuard`).
  - عزل منطق المنصة بالكامل بدون متغيرات عامة غير محمية.

## هيكل المشروع
- `src/` — كود المصدر (`src/main.tsx`, `src/app/wasla-core.ts`, `src/i18n/wasla-i18n.ts`, `src/security/shield.ts`, `src/components/VerifiedReviewSection.tsx`).
- `styles/wasla.css` — ملف التنسيقات الرئيسي (ينتج `assets/wasla.css`).
- `scripts/build.mjs` & `scripts/seo.mjs` — سكربتات البناء وتوليد `index.html` وملفات الـ SEO وبصمات SRI.
- `functions/` — دوال السحابة لـ Firebase Cloud Functions.
- `firestore.rules` & `storage.rules` & `firebase.json` — قواعد وإعدادات Firebase.

## التطوير والبناء المحلي
```bash
npm install
npm run typecheck
npm run build
```

## النشر على Firebase
1. فعّل **Authentication (Google)** و **Firestore** و **Storage** في مشروع Firebase.
2. أضف نطاق الموقع إلى **Authorized domains** في إعدادات المصادقة.
3. نفّذ أمر النشر:
```bash
firebase deploy --only firestore:rules,firestore:indexes,storage,hosting
```
