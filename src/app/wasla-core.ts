import { esc, cleanInput, safeImgUrl, SecureStore, RateGuard } from '../security/shield';
import { mountVerifiedReviewSection, unmountVerifiedReviewSection } from '../components/VerifiedReviewSection';
import {
  LANGS, LangCode, isValidLang, curLang, getLangMeta, setStoredLang, applyDocDirection,
  t, tf, tView, tCat, tSub, tLocToken, tLocText, tAgo as trAgoMs, tKm, tDist, tStatus, tNeed, tBud,
  QR_I18N, EST_GUIDES_I18N, syncStaticDOM, SUB_NAMES, trStarLabels,
  translateReasonText, detectTextLang, shouldShowTranslateBtn, translateTextSmart
} from '../i18n/wasla-i18n';

declare const firebase: any;
declare global {
  interface Window {
    firebase?: any;
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export function bootstrapWaslaApp(): void {
/* ====== إعدادات Firebase الحقيقية لمشروع وصلة ====== */
const FIREBASE_CONFIG = Object.freeze({
  apiKey: "AIzaSyAjE-2q6PONBkCin9ZN22gDp9Q8pAH9ZW8",
  authDomain: "story-97cf7.firebaseapp.com",
  projectId: "story-97cf7",
  storageBucket: "story-97cf7.firebasestorage.app",
  messagingSenderId: "742801388214",
  appId: "1:742801388214:web:32a305a8057b0582c5ec17",
  databaseURL: "https://story-97cf7-default-rtdb.firebaseio.com",
  measurementId: "G-9DPPWX7CF0"
});

applyDocDirection();
const HAS_FB = typeof window.firebase !== 'undefined';
let auth: any = null, db: any = null, storage: any = null;
let user: any = null, profile: any = {};
let _pendWorkImg = '';
let _deferredPwaPrompt: any = null;
window.addEventListener('beforeinstallprompt', (ev: any) => {
  ev.preventDefault();
  _deferredPwaPrompt = ev;
});
if (HAS_FB) {
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
  auth = firebase.auth();
  auth.languageCode = getLangMeta().fbCode;
  db = firebase.firestore();
  try {
    db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
  } catch (e) {}
  storage = firebase.storage();
}
const SVT = () => firebase.firestore.FieldValue.serverTimestamp();

const $ = (s: string): any => document.querySelector(s);
const $$ = (s: string): any[] => Array.from(document.querySelectorAll(s));
const store = SecureStore;

let _toastTimer: any = null;
function toast(msg: string) {
  const e = $('#toast');
  if (!e) return;
  e.textContent = tf(msg);
  e.classList.add('on');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => e.classList.remove('on'), 3100);
}
function hideToast() {
  clearTimeout(_toastTimer);
  const e = $('#toast');
  if (e) e.classList.remove('on');
}

/* ====== الواجهة الأساسية فقط (تنظيف أي إعدادات ثيم قديمة) ====== */
try { localStorage.removeItem('wasla_theme_2026'); } catch {}
document.body.classList.remove('theme-dark', 'theme-glass');

/* ====== الأيقونات والرسومات المتجهة ====== */
const ICO = {
  home: '<path d="M40 112l88-74 88 74v94a18 18 0 0 1-18 18H58a18 18 0 0 1-18-18z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/><path d="M100 224v-66a14 14 0 0 1 14-14h28a14 14 0 0 1 14 14v66" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  near: '<circle cx="128" cy="128" r="76" fill="none" stroke="currentColor" stroke-width="19"/><circle cx="128" cy="128" r="24" fill="none" stroke="currentColor" stroke-width="19"/><path d="M128 28v24M128 204v24M28 128h24M204 128h24" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  list: '<rect x="46" y="42" width="164" height="176" rx="24" fill="none" stroke="currentColor" stroke-width="19"/><path d="M90 30h76a14 14 0 0 1 14 14v12a10 10 0 0 1-10 10H86a10 10 0 0 1-10-10V44a14 14 0 0 1 14-14z" fill="var(--paper, #fff)" stroke="currentColor" stroke-width="18"/><path d="M88 112h80M88 152h60" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  star: '<path d="M128 32l28 58 64 9-46 45 11 64-57-30-57 30 11-64-46-45 64-9z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/>',
  mail: '<path d="M44 190c-9-17-14-36-14-58 0-54 44-96 98-96s98 42 98 96-44 96-98 96c-17 0-33-4-47-12l-43 14 12-40z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/><circle cx="94" cy="132" r="10"/><circle cx="128" cy="132" r="10"/><circle cx="162" cy="132" r="10"/>',
  bell: '<path d="M60 112a68 68 0 0 1 136 0c0 38 14 58 20 68a10 10 0 0 1-8 16H48a10 10 0 0 1-8-16c6-10 20-30 20-68z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/><path d="M104 198a24 24 0 0 0 48 0" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  bellring: '<path d="M64 114a64 64 0 0 1 128 0c0 36 14 56 20 66a10 10 0 0 1-8 16H52a10 10 0 0 1-8-16c6-10 20-30 20-66z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/><path d="M104 198a24 24 0 0 0 48 0M42 74a88 88 0 0 1 28-36M214 74a88 88 0 0 0-28-36" fill="none" stroke="currentColor" stroke-width="18" stroke-linecap="round"/>',
  user: '<circle cx="128" cy="88" r="38" fill="none" stroke="currentColor" stroke-width="19"/><path d="M52 212a76 76 0 0 1 152 0" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  truck: '<path d="M255.42,117l-14-35A15.93,15.93,0,0,0,226.58,72H192V64a8,8,0,0,0-8-8H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H49a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,255.42,117ZM192,88h34.58l9.6,24H192ZM32,72H176v64H32ZM80,208a16,16,0,1,1,16-16A16,16,0,0,1,80,208Zm81-24H111a32,32,0,0,0-62,0H32V152H176v12.31A32.11,32.11,0,0,0,161,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,192,208Zm48-24H223a32.06,32.06,0,0,0-31-24V128h48Z"/>',
  wrench: '<path d="M226.76,69a8,8,0,0,0-12.84-2.88l-40.3,37.19-17.23-3.7-3.7-17.23,37.19-40.3A8,8,0,0,0,187,29.24,72,72,0,0,0,88,96,72.34,72.34,0,0,0,94,124.94L33.79,177c-.15.12-.29.26-.43.39a32,32,0,0,0,45.26,45.26c.13-.13.27-.28.39-.42L131.06,162A72,72,0,0,0,232,96,71.56,71.56,0,0,0,226.76,69ZM160,152a56.14,56.14,0,0,1-27.07-7,8,8,0,0,0-9.92,1.77L67.11,211.51a16,16,0,0,1-22.62-22.62L109.18,133a8,8,0,0,0,1.77-9.93,56,56,0,0,1,58.36-82.31l-31.2,33.81a8,8,0,0,0-1.94,7.1L141.83,108a8,8,0,0,0,6.14,6.14l26.35,5.66a8,8,0,0,0,7.1-1.94l33.81-31.2A56.06,56.06,0,0,1,160,152Z"/>',
  book: '<path d="M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64ZM160,88h40a8,8,0,0,1,0,16H160a8,8,0,0,1,0-16Zm48,40a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,128Zm0,32a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,160Z"/>',
  cart: '<path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z"/>',
  building: '<path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z"/>',
  box: '<path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"/>',
  check: '<circle cx="128" cy="128" r="94" fill="none" stroke="currentColor" stroke-width="19"/><path d="M88 130l28 28 54-56" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>',
  seal: '<path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"/>',
  money: '<circle cx="128" cy="128" r="94" fill="none" stroke="currentColor" stroke-width="19"/><path d="M128 74v108M152 98a24 24 0 0 0-48 0c0 24 48 16 48 44a24 24 0 0 1-48 0" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  phone: '<path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46Z"/>',
  plus: '<path d="M128 52v152M52 128h152" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round"/>',
  back: '<path d="M204 128H54M112 70L54 128l58 58" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>',
  chev: '<path d="M154 58l-68 70 68 70" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>',
  out: '<path d="M112 44H62a20 20 0 0 0-20 20v128a20 20 0 0 0 20 20h50M162 84l48 44-48 44M210 128H98" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>',
  sparkle: '<path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144Z"/>',
  more: '<circle cx="128" cy="128" r="94" fill="none" stroke="currentColor" stroke-width="19"/><circle cx="88" cy="128" r="13"/><circle cx="128" cy="128" r="13"/><circle cx="168" cy="128" r="13"/>',
  pin: '<path d="M128 28a74 74 0 0 0-74 74c0 54 74 126 74 126s74-72 74-126a74 74 0 0 0-74-74z" fill="currentColor"/><circle cx="128" cy="100" r="24" fill="#fff"/>',
  camera: '<path d="M36 88a24 24 0 0 1 24-24h20l14-22a12 12 0 0 1 10-6h48a12 12 0 0 1 10 6l14 22h20a24 24 0 0 1 24 24v100a24 24 0 0 1-24 24H60a24 24 0 0 1-24-24z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/><circle cx="128" cy="136" r="34" fill="none" stroke="currentColor" stroke-width="19"/>',
  image: '<rect x="34" y="44" width="188" height="168" rx="26" fill="none" stroke="currentColor" stroke-width="19"/><circle cx="92" cy="96" r="15"/><path d="M40 180l50-50a14 14 0 0 1 20 0l28 28 22-22a14 14 0 0 1 20 0l36 36" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>',
  lock: '<rect x="44" y="106" width="168" height="114" rx="26" fill="none" stroke="currentColor" stroke-width="19"/><path d="M84 106V78a44 44 0 0 1 88 0v28" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/><circle cx="128" cy="162" r="13"/>',
  play: '<path d="M86 58l114 70-114 70z" fill="currentColor" stroke="currentColor" stroke-width="16" stroke-linejoin="round"/>',
  pause: '<rect x="68" y="54" width="40" height="148" rx="14"/><rect x="148" y="54" width="40" height="148" rx="14"/>',
  dotsV: '<circle cx="128" cy="56" r="16"/><circle cx="128" cy="128" r="16"/><circle cx="128" cy="200" r="16"/>',

  block: '<circle cx="128" cy="128" r="94" fill="none" stroke="currentColor" stroke-width="19"/><path d="M62 62l132 132" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  archive: '<rect x="30" y="46" width="196" height="44" rx="12" fill="none" stroke="currentColor" stroke-width="19"/><path d="M48 90v102a18 18 0 0 0 18 18h124a18 18 0 0 0 18-18V90M104 134h48" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  reply: '<path d="M96 64L38 118l58 54M40 118h96a72 72 0 0 1 72 72" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>',
  copy: '<rect x="88" y="88" width="124" height="124" rx="24" fill="none" stroke="currentColor" stroke-width="19"/><path d="M168 88V64a22 22 0 0 0-22-22H64a22 22 0 0 0-22 22v82a22 22 0 0 0 22 22h24" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  x: '<path d="M64 64l128 128M192 64L64 192" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round"/>',
  search: '<circle cx="114" cy="114" r="72" fill="none" stroke="currentColor" stroke-width="20"/><path d="M168 168l48 48" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round"/>',
  nav: '<path d="M214 42L40 108l72 30 30 72z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/>',
  trash: '<path d="M46 68h164M98 68V48a14 14 0 0 1 14-14h32a14 14 0 0 1 14 14v20M68 68l10 134a20 20 0 0 0 20 18h60a20 20 0 0 0 20-18l10-134M106 112v64M150 112v64" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>',
  eyeOff: '<path d="M42 42l172 172M106 106a32 32 0 0 0 44 44M92 56a112 112 0 0 1 36-6c58 0 98 48 108 78-6 18-19 37-36 51M174 174c-14 9-30 14-46 14-58 0-98-48-108-78 6-18 19-37 36-51" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>',
  edit: '<path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"/>',
  checks: '<path d="M24 134l44 44 92-92M94 164l24 24 114-114" fill="none" stroke="currentColor" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>',
  arrowup: '<path d="M128 214V46M58 114l70-70 70 70" fill="none" stroke="currentColor" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>',
  clip: '<path d="M184 120l-60 60a32 32 0 0 1-45-45l78-78a22 22 0 0 1 31 31l-74 74a11 11 0 0 1-16-16l60-60" fill="none" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>',
  clock: '<circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="18"/><path d="M128 72v58l38 22" fill="none" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>',
  bookmark: '<path d="M68 42h120a16 16 0 0 1 16 16v164l-76-44-76 44V58a16 16 0 0 1 16-16z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/>',
  share: '<circle cx="182" cy="58" r="26" fill="none" stroke="currentColor" stroke-width="19"/><circle cx="74" cy="128" r="26" fill="none" stroke="currentColor" stroke-width="19"/><circle cx="182" cy="198" r="26" fill="none" stroke="currentColor" stroke-width="19"/><path d="M97 114l62-42M97 142l62 42" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  ban: '<circle cx="128" cy="128" r="94" fill="none" stroke="currentColor" stroke-width="19"/><path d="M62 62l132 132" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  rocket: '<path d="M152,224a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,224ZM128,112a12,12,0,1,0-12-12A12,12,0,0,0,128,112Zm95.62,43.83-12.36,55.63a16,16,0,0,1-25.51,9.11L158.51,200h-61L70.25,220.57a16,16,0,0,1-25.51-9.11L32.38,155.83a16.09,16.09,0,0,1,3.32-13.71l28.56-34.26a123.07,123.07,0,0,1,8.57-36.67c12.9-32.34,36-52.63,45.37-59.85a16,16,0,0,1,19.6,0c9.34,7.22,32.47,27.51,45.37,59.85a123.07,123.07,0,0,1,8.57,36.67l28.56,34.26A16.09,16.09,0,0,1,223.62,155.83Z"/>',
  crown: '<path d="M248,80a28,28,0,1,0-51.12,15.77l-26.79,33L146,73.4a28,28,0,1,0-36.06,0L85.91,128.74l-26.79-33a28,28,0,1,0-26.6,12L47,194.63A16,16,0,0,0,62.78,208H193.22A16,16,0,0,0,209,194.63l14.47-86.85A28,28,0,0,0,248,80Z"/>',
  lightning: '<path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17Z"/>',
  smiley: '<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-48,84a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.08,48c-10.29,17.79-27.39,28-46.92,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.08-20a8,8,0,1,1,13.84,8Z"/>',
  mic: '<rect x="92" y="34" width="72" height="114" rx="36" fill="none" stroke="currentColor" stroke-width="20"/><path d="M56 122a72 72 0 0 0 144 0M128 194v34M96 228h64" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>',
  voiceOrb: '<circle cx="128" cy="128" r="76" fill="currentColor" opacity=".16"/><rect x="98" y="48" width="60" height="94" rx="30" fill="none" stroke="currentColor" stroke-width="20"/><path d="M68 124a60 60 0 0 0 120 0M128 184v28" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>',
  imgPlus: '<rect x="28" y="44" width="172" height="164" rx="26" fill="none" stroke="currentColor" stroke-width="17"/><circle cx="84" cy="96" r="15"/><path d="M34 176l46-46a14 14 0 0 1 20 0l26 26 22-22a14 14 0 0 1 20 0l28 28" fill="none" stroke="currentColor" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/><circle cx="198" cy="62" r="34" fill="var(--sun)" stroke="currentColor" stroke-width="15"/><path d="M198 46v32M182 62h32" fill="none" stroke="currentColor" stroke-width="15" stroke-linecap="round"/>',
  warn: '<path d="M236.8,188.09,149.35,36.22a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"/>',
  pinMsg: '<path d="M90 48h76l-10 56 32 32v14H68v-14l32-32z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/><path d="M128 150v72" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>',
  settings: '<circle cx="128" cy="128" r="34" fill="none" stroke="currentColor" stroke-width="19"/><path d="M128 32v22M128 202v22M32 128h22M202 128h22M60 60l16 16M180 180l16 16M196 60l-16 16M76 180l-16 16" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  checkSq: '<rect x="38" y="38" width="180" height="180" rx="34" fill="none" stroke="currentColor" stroke-width="19"/><path d="M86 130l28 28 56-58" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>',
  down: '<path d="M62 98l66 66 66-66" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>',
  eye: '<path d="M26 128c22-44 60-68 102-68s80 24 102 68c-22 44-60 68-102 68s-80-24-102-68z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/><circle cx="128" cy="128" r="30" fill="none" stroke="currentColor" stroke-width="19"/>',
  download: '<path d="M128 42v116M82 114l46 46 46-46" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><path d="M46 176v22a20 20 0 0 0 20 20h124a20 20 0 0 0 20-20v-22" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>',
  send: '<path d="M216 44L38 112l66 32 32 66zM104 144l112-100" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>',
  wa: '<path d="M44 192c-8-16-12-34-12-56 0-56 44-100 98-100s98 44 98 100-44 100-98 100c-18 0-35-5-49-13l-43 13z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/><path d="M98 94c4-6 10-7 15-1l8 11c4 5 3 11-2 15-4 4-4 8 3 16s12 9 16 4c4-5 10-5 15-1l11 9c6 5 5 11-1 15-12 8-34 2-56-20s-28-44-20-56z" fill="currentColor"/>',
  tg: '<path d="M220 46L34 118l58 22 22 62 34-34 48 36z" fill="none" stroke="currentColor" stroke-width="18" stroke-linejoin="round"/><path d="M92 140l96-66" fill="none" stroke="currentColor" stroke-width="18" stroke-linecap="round"/>',
  card: '<rect x="44" y="32" width="168" height="192" rx="28" fill="none" stroke="currentColor" stroke-width="19"/><circle cx="104" cy="96" r="22" fill="none" stroke="currentColor" stroke-width="18"/><path d="M68 182l38-38a14 14 0 0 1 20 0l22 22 14-14a14 14 0 0 1 20 0l14 14" fill="none" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>',
  shieldCheck: '<path d="M128 32l82 32v58c0 54-36 92-82 108-46-16-82-54-82-108V64z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/><path d="M94 128l24 24 46-48" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>',
  sliders: '<path d="M44 74h168M44 128h168M44 182h168" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/><circle cx="94" cy="74" r="20" fill="var(--paper,#fff)" stroke="currentColor" stroke-width="18"/><circle cx="164" cy="128" r="20" fill="var(--paper,#fff)" stroke="currentColor" stroke-width="18"/><circle cx="108" cy="182" r="20" fill="var(--paper,#fff)" stroke="currentColor" stroke-width="18"/>',
  gallery: '<rect x="52" y="54" width="166" height="148" rx="26" fill="none" stroke="currentColor" stroke-width="19"/><path d="M36 98v88a28 28 0 0 0 28 28h104" fill="none" stroke="currentColor" stroke-width="18" stroke-linecap="round"/><circle cx="106" cy="102" r="14"/><path d="M60 176l42-42a14 14 0 0 1 20 0l26 26 20-20a14 14 0 0 1 20 0l24 24" fill="none" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>',
  moon: '<path d="M204 148A84 84 0 0 1 108 52a84 84 0 1 0 96 96z" fill="none" stroke="currentColor" stroke-width="19" stroke-linejoin="round"/>',
  sunMode: '<circle cx="128" cy="128" r="46" fill="none" stroke="currentColor" stroke-width="19"/><path d="M128 32v22M128 202v22M32 128h22M202 128h22M60 60l16 16M180 180l16 16M196 60l-16 16M76 180l-16 16" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  radar: '<circle cx="128" cy="128" r="92" fill="none" stroke="currentColor" stroke-width="18"/><circle cx="128" cy="128" r="54" fill="none" stroke="currentColor" stroke-width="16" stroke-dasharray="14 12"/><circle cx="128" cy="128" r="16"/><path d="M128 128l62-58" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  calc: '<rect x="52" y="34" width="152" height="188" rx="26" fill="none" stroke="currentColor" stroke-width="19"/><rect x="82" y="64" width="92" height="34" rx="10" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="92" cy="134" r="10"/><circle cx="128" cy="134" r="10"/><circle cx="164" cy="134" r="10"/><circle cx="92" cy="174" r="10"/><circle cx="128" cy="174" r="10"/><circle cx="164" cy="174" r="10"/>',
  link: '<path d="M104 152l48-48M140 76l20-20a38 38 0 0 1 54 54l-20 20M116 180l-20 20a38 38 0 0 1-54-54l20-20" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>',
  deal: '<rect x="44" y="42" width="168" height="172" rx="26" fill="none" stroke="currentColor" stroke-width="19"/><path d="M84 96h88M84 134h62M84 172h42" fill="none" stroke="currentColor" stroke-width="18" stroke-linecap="round"/><circle cx="174" cy="164" r="24" fill="var(--mint)" stroke="currentColor" stroke-width="14"/>',
  ext: '<path d="M148 52h56v56M204 52l-88 88M196 144v48a20 20 0 0 1-20 20H64a20 20 0 0 1-20-20V80a20 20 0 0 1 20-20h48" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>',
  expand: '<path d="M148 44h64v64M212 44l-68 68M108 212H44v-64M44 212l68-68" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>',
  compress: '<path d="M196 44l-56 56M140 52v48h48M60 212l56-56M116 204v-48H68" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>',
  globe: '<circle cx="128" cy="128" r="94" fill="none" stroke="currentColor" stroke-width="19"/><ellipse cx="128" cy="128" rx="44" ry="94" fill="none" stroke="currentColor" stroke-width="17"/><path d="M40 96h176M40 160h176" fill="none" stroke="currentColor" stroke-width="17" stroke-linecap="round"/>',
  translate: '<path d="M36 62h88M80 42v20M108 62c-8 44-32 76-68 96M58 94c14 24 34 42 54 54" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/><path d="M134 208l38-100 38 100M146 178h52" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>'
};

const ICOF = {
  home: '<path d="M40 112l88-74 88 74v94a18 18 0 0 1-18 18H58a18 18 0 0 1-18-18z" fill="currentColor" opacity=".2"/><path d="M40 112l88-74 88 74v94a18 18 0 0 1-18 18H58a18 18 0 0 1-18-18z" fill="none" stroke="currentColor" stroke-width="20" stroke-linejoin="round"/><path d="M100 224v-66a14 14 0 0 1 14-14h28a14 14 0 0 1 14 14v66" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>',
  near: '<circle cx="128" cy="128" r="76" fill="currentColor" opacity=".2"/><circle cx="128" cy="128" r="76" fill="none" stroke="currentColor" stroke-width="20"/><circle cx="128" cy="128" r="24" fill="currentColor"/><path d="M128 28v24M128 204v24M28 128h24M204 128h24" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>',
  list: '<rect x="46" y="42" width="164" height="176" rx="24" fill="currentColor" opacity=".2"/><rect x="46" y="42" width="164" height="176" rx="24" fill="none" stroke="currentColor" stroke-width="20"/><path d="M90 30h76a14 14 0 0 1 14 14v12a10 10 0 0 1-10 10H86a10 10 0 0 1-10-10V44a14 14 0 0 1 14-14z" fill="currentColor"/><path d="M88 112h80M88 152h60" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>',
  star: '<path d="M128 32l28 58 64 9-46 45 11 64-57-30-57 30 11-64-46-45 64-9z" fill="currentColor" stroke="currentColor" stroke-width="14" stroke-linejoin="round"/>',
  mail: '<path d="M44 190c-9-17-14-36-14-58 0-54 44-96 98-96s98 42 98 96-44 96-98 96c-17 0-33-4-47-12l-43 14 12-40z" fill="currentColor" opacity=".2"/><path d="M44 190c-9-17-14-36-14-58 0-54 44-96 98-96s98 42 98 96-44 96-98 96c-17 0-33-4-47-12l-43 14 12-40z" fill="none" stroke="currentColor" stroke-width="20" stroke-linejoin="round"/><circle cx="94" cy="132" r="12"/><circle cx="128" cy="132" r="12"/><circle cx="162" cy="132" r="12"/>',
  bell: '<path d="M60 112a68 68 0 0 1 136 0c0 38 14 58 20 68a10 10 0 0 1-8 16H48a10 10 0 0 1-8-16c6-10 20-30 20-68z" fill="currentColor" opacity=".22"/><path d="M60 112a68 68 0 0 1 136 0c0 38 14 58 20 68a10 10 0 0 1-8 16H48a10 10 0 0 1-8-16c6-10 20-30 20-68z" fill="none" stroke="currentColor" stroke-width="20" stroke-linejoin="round"/><path d="M104 198a24 24 0 0 0 48 0" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>',
  user: '<circle cx="128" cy="88" r="38" fill="currentColor" opacity=".24"/><circle cx="128" cy="88" r="38" fill="none" stroke="currentColor" stroke-width="20"/><path d="M52 212a76 76 0 0 1 152 0" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>',
  more: '<circle cx="128" cy="128" r="94" fill="currentColor" opacity=".2"/><circle cx="128" cy="128" r="94" fill="none" stroke="currentColor" stroke-width="20"/><circle cx="88" cy="128" r="14"/><circle cx="128" cy="128" r="14"/><circle cx="168" cy="128" r="14"/>',
  bookmark: '<path d="M68 42h120a16 16 0 0 1 16 16v164l-76-44-76 44V58a16 16 0 0 1 16-16z" fill="currentColor" stroke="currentColor" stroke-width="14" stroke-linejoin="round"/>'
};

const ic = (n, z = 20, f = false) =>
  `<svg class="ic" width="${z}" height="${z}" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">${(f && ICOF[n]) || ICO[n] || ''}</svg>`;
const ic2 = (n, z = 22) => `<span class="i-d">${ic(n, z)}</span><span class="i-f">${ic(n, z, true)}</span>`;

/* ====== الترجمة الفورية الموضعية للنصوص مختلفة اللغة + أدوات رسم الكانفس متعدد اللغات ====== */
const _trRaw = new Map<string, string[]>();
const _trCache = new Map<string, { lang: LangCode; parts: string[]; on: boolean }>();
const _trBusy = new Set<string>();

function trPrep(id: string, parts: string[]): { show: boolean; on: boolean; disp: string[] } {
  const cleanParts = parts.map(p => String(p || ''));
  _trRaw.set(id, cleanParts);
  const combined = cleanParts.join(' ').trim();
  const lang = curLang();
  const show = Boolean(combined && shouldShowTranslateBtn(combined, lang));
  const cached = _trCache.get(id);
  if (show && cached && cached.on && cached.lang === lang && cached.parts.length === cleanParts.length) {
    return { show: true, on: true, disp: cached.parts };
  }
  return { show, on: false, disp: cleanParts };
}

function trBtnHtml(id: string, prep: { show: boolean; on: boolean }, extraCls = ''): string {
  if (!prep.show) return '';
  const tip = t(prep.on ? 'tr_orig_tip' : 'tr_btn_tip');
  return `<button type="button" class="tr-btn${prep.on ? ' on' : ''}${extraCls ? ' ' + extraCls : ''}" data-a="trInline" data-trid="${esc(id)}" title="${esc(tip)}" aria-label="${esc(tip)}">${ic('translate', 14)}<span>${esc(tip)}</span></button>`;
}

function trApplySwap(id: string, texts: string[], on: boolean): void {
  const targets = Array.from(document.querySelectorAll('.tr-target')).filter(
    el => (el as HTMLElement).dataset.trid === id
  ) as HTMLElement[];
  const btns = Array.from(document.querySelectorAll('.tr-btn')).filter(
    el => (el as HTMLElement).dataset.trid === id
  ) as HTMLElement[];
  const tip = t(on ? 'tr_orig_tip' : 'tr_btn_tip');
  btns.forEach(btn => {
    btn.classList.remove('is-busy');
    btn.classList.toggle('on', on);
    btn.setAttribute('title', tip);
    btn.setAttribute('aria-label', tip);
    const sp = btn.querySelector('span');
    if (sp) sp.textContent = tip;
  });
  targets.forEach(el => {
    el.classList.remove('is-fading-in');
    el.classList.add('is-fading-out');
  });
  window.setTimeout(() => {
    targets.forEach(el => {
      const idx = Math.max(0, parseInt(el.dataset.tridx || '0', 10) || 0);
      const val = texts[idx] !== undefined ? texts[idx] : (texts[0] || '');
      if (el.dataset.trFmt === 'msg') el.innerHTML = cpFormatMsgHtml(val);
      else el.textContent = val;
      el.classList.remove('is-fading-out');
      void el.offsetWidth;
      el.classList.add('is-fading-in');
      window.setTimeout(() => el.classList.remove('is-fading-in'), 260);
    });
  }, 150);
}

async function trRunById(id: string, btn?: HTMLElement | null, opts?: { force?: boolean; mid?: string }): Promise<void> {
  if (!id || _trBusy.has(id)) return;
  const rawParts = _trRaw.get(id);
  if (!rawParts || !rawParts.length) return;
  const lang = curLang();
  const cached = _trCache.get(id);
  if (cached && cached.lang === lang && cached.parts.length === rawParts.length) {
    cached.on = !cached.on;
    trApplySwap(id, cached.on ? cached.parts : rawParts, cached.on);
    return;
  }
  const btnList = btn
    ? [btn]
    : (Array.from(document.querySelectorAll('.tr-btn')).filter(el => (el as HTMLElement).dataset.trid === id) as HTMLElement[]);
  _trBusy.add(id);
  btnList.forEach(b => b.classList.add('is-busy'));
  try {
    const res = await Promise.all(
      rawParts.map(p => (p.trim() ? translateTextSmart(p, lang, { force: true }) : Promise.resolve({ text: '', srcLang: null, ok: true })))
    );
    if (res.every(r => !r.ok)) {
      btnList.forEach(b => b.classList.remove('is-busy'));
      toast(t('tr_fail'));
      return;
    }
    const translated = res.map((r, idx) => (r.ok && r.text ? r.text : rawParts[idx]));
    _trCache.set(id, { lang, parts: translated, on: true });
    if (opts && opts.mid && !btnList.length) {
      const box = Array.from(document.querySelectorAll('#thr [data-mid]')).find(
        n => (n as HTMLElement).dataset.mid === opts.mid
      ) as HTMLElement | undefined;
      const bubble = box ? ((box.matches('.bb') ? box : box.querySelector('.bb')) as HTMLElement | null) : null;
      if (bubble && !bubble.querySelector(`.tr-btn[data-trid="${id}"]`)) {
        const foot = bubble.querySelector('.dm-foot') || bubble.querySelector('.tr-msg-foot');
        const newBtn = trBtnHtml(id, { show: true, on: true }, 'in-msg');
        if (foot) {
          foot.insertAdjacentHTML('afterbegin', newBtn);
        } else {
          const mt = bubble.querySelector(':scope > small.mt');
          if (mt) {
            const wrap = document.createElement('div');
            wrap.className = 'tr-msg-foot';
            wrap.innerHTML = newBtn;
            mt.replaceWith(wrap);
            wrap.appendChild(mt);
          }
        }
      }
    }
    trApplySwap(id, translated, true);
  } catch {
    btnList.forEach(b => b.classList.remove('is-busy'));
    toast(t('tr_fail'));
  } finally {
    _trBusy.delete(id);
  }
}

async function trToggleInline(btn: HTMLElement): Promise<void> {
  const id = btn.dataset.trid || '';
  if (id) await trRunById(id, btn, { force: true });
}

function canvasFontStack(lang = curLang()): string {
  if (lang === 'ar') return 'Cairo, "Segoe UI", Tahoma, Arial, sans-serif';
  if (lang === 'zh') return '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif';
  return 'Inter, "Segoe UI", Arial, sans-serif';
}

function canvasRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawCanvasWrapped(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
  maxLines: number
): number {
  const clean = String(text || '').trim();
  if (!clean) return y;
  const lines: string[] = [];
  const words = clean.split(/\s+/);
  let cur = '';
  for (const w of words) {
    if (ctx.measureText(w).width > maxW) {
      if (cur) { lines.push(cur); cur = ''; }
      let chunk = '';
      for (const ch of Array.from(w)) {
        if (ctx.measureText(chunk + ch).width > maxW && chunk) {
          lines.push(chunk);
          chunk = ch;
        } else {
          chunk += ch;
        }
      }
      cur = chunk;
      continue;
    }
    const test = cur ? cur + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  const sliced = lines.slice(0, maxLines);
  sliced.forEach((ln, i) => {
    let out = ln;
    if (i === maxLines - 1 && lines.length > maxLines) {
      while (out.length > 2 && ctx.measureText(out + '…').width > maxW) out = out.slice(0, -1);
      out += '…';
    }
    ctx.fillText(out, x, y + i * lineH);
  });
  return y + sliced.length * lineH;
}

/* أشكال الدب الخاصة بوصلة بستايل Neo-Brutalist نظيف (بحدود حبر واضحة بدون أي توهج) */
const BEARS = {
  orange: ['#F7A56C', '#FFD5B5', '#FFF0E3', '#1B1B1B'],
  lav: ['#9C89FF', '#D6CEFF', '#F2EFFF', '#1B1B1B'],
  pink: ['#FA6B63', '#FAD2CC', '#FFF0EE', '#1B1B1B'],
  sky: ['#55B9DB', '#BCE6F5', '#ECFAFF', '#1B1B1B'],
  mint: ['#4BD4BE', '#B3F0E5', '#E8FCF8', '#1B1B1B'],
  sun: ['#FFE26A', '#FFF1B2', '#FFFBE6', '#1B1B1B']
};
function bear(z = 92, k = 'orange') {
  const c = BEARS[k] || BEARS.orange;
  return `<svg class="bear" width="${z}" height="${z}" viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="30" cy="34" r="17" fill="${c[0]}" stroke="${c[3]}" stroke-width="3.5"/>
    <circle cx="30" cy="34" r="8.5" fill="${c[1]}"/>
    <circle cx="90" cy="34" r="17" fill="${c[0]}" stroke="${c[3]}" stroke-width="3.5"/>
    <circle cx="90" cy="34" r="8.5" fill="${c[1]}"/>
    <ellipse cx="60" cy="66" rx="44" ry="40" fill="${c[0]}" stroke="${c[3]}" stroke-width="3.5"/>
    <ellipse cx="33" cy="78" rx="7.5" ry="5" fill="#FA6B63" opacity=".45"/>
    <ellipse cx="87" cy="78" rx="7.5" ry="5" fill="#FA6B63" opacity=".45"/>
    <ellipse cx="60" cy="78" rx="18" ry="13.5" fill="${c[2]}" stroke="${c[3]}" stroke-width="2.6"/>
    <ellipse cx="60" cy="72" rx="6" ry="4.4" fill="${c[3]}"/>
    <path d="M60 76v5M52 82c3 5 13 5 16 0" fill="none" stroke="${c[3]}" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="43" cy="60" r="4.8" fill="${c[3]}"/>
    <circle cx="77" cy="60" r="4.8" fill="${c[3]}"/>
    <circle cx="44.5" cy="58.5" r="1.5" fill="#fff"/>
    <circle cx="78.5" cy="58.5" r="1.5" fill="#fff"/>
  </svg>`;
}

const PRE = [
  ['bear:orange', '#FFE8D4'],
  ['bear:mint', '#DDF9F3'],
  ['bear:lav', '#EAE5FF'],
  ['bear:sun', '#FFF5C2'],
  ['bear:sky', '#DCF3FA'],
  ['bear:pink', '#FAD2CC'],
  ['rocket', '#FAD2CC'],
  ['crown', '#FFE26A'],
  ['lightning', '#9C89FF'],
  ['smiley', '#4BD4BE']
];

const AV_COLORS = ['#4BD4BE', '#FFE26A', '#9C89FF', '#FA6B63', '#55B9DB', '#F7A56C', '#FAD2CC'];
function colorForName(name) {
  let h = 0;
  const s = String(name || 'م');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return AV_COLORS[h % AV_COLORS.length];
}

/* الأفاتار: يعرض الصورة الحقيقية فقط (جوجل أو المرفوعة) أو الأفاتار المختار أو أول حرف من الاسم الحقيقي — متوافق 100% مع CSP الصارم */
function avH(z: number, o: any = {}) {
  const nm = String(o.name || 'م').trim() || 'م';
  const ch = esc(nm.charAt(0));
  let bg = o.bg || colorForName(nm);
  let inner = ch;
  const safePh = safeImgUrl(o.photo);
  if (safePh) {
    inner = `<img src="${esc(safePh)}" alt="${ch}" referrerpolicy="no-referrer" data-fbk="${ch}">`;
  } else if (o.preset && PRE[+o.preset.slice(1)]) {
    const p = PRE[+o.preset.slice(1)];
    bg = p[1];
    inner = p[0].startsWith('bear:') ? bear(Math.round(z * 0.88), p[0].slice(5)) : ic(p[0], Math.round(z * 0.54));
  }
  return `<span class="avx" style="width:${z}px;height:${z}px;font-size:${Math.round(z * 0.42)}px;background:${bg}">${inner}</span>`;
}

const myDisplayName = () => {
  if (profile && profile.first) return [profile.first, profile.third || profile.second].filter(Boolean).join(' ');
  if (user && user.displayName) return user.displayName;
  return t('guest');
};
const myAv = z => avH(z, {
  photo: profile.photo || (user && user.photoURL) || '',
  preset: profile.avatar || '',
  name: myDisplayName()
});

/* ====== اختيار المحافظة والمدينة (مرفوعة قبل التهيئة الأولية لمنع أي TDZ) ====== */
let fG = '', fC = '';
const LOC: Record<string, any> = { ob: {}, rq: {}, pv: {}, pe: {}, erq: {} };
function locOf(k: any) { return k === 'fl' ? { g: fG, c: fC } : (LOC[k] || {}); }
function locTxt(k: any): string {
  const l = locOf(k);
  return l.c
    ? tLocToken(l.c) + ' · ' + tLocToken(l.g)
    : l.g
    ? tLocToken(l.g) + ' · ' + t('loc_all_centers')
    : k === 'fl'
    ? t('loc_all_all')
    : t('loc_choose_any');
}
const locBtn = (k: any) => `<button type="button" class="sel locb" data-a="pick" data-k="${k}"><span>${esc(locTxt(k))}</span>${ic('chev', 16)}</button>`;

/* تركيب الأيقونات الثابتة في الهيدر والشريط + مزامنة النصوص مع اللغة النشطة */
function syncTabsBar() {
  const tabsEl = $('#tabs');
  if (!tabsEl) return;
  const curView = cur;
  tabsEl.dataset.ready = '1';
  tabsEl.innerHTML =
    '<i class="pill" id="pill"></i>' +
    [['الرئيسية', 'home'], ['طلبات قريبة', 'near']]
      .map(x => `<button type="button" data-a="tab" data-n="${x[0]}">${ic2(x[1], 22)}<span>${esc(tView(x[0]))}</span></button>`).join('') +
    `<button class="fab" type="button" data-a="nw" aria-label="${esc(t('gate_post_title'))}">${ic('plus', 24)}</button>` +
    `<button type="button" data-a="tab" data-n="طلباتي">${ic2('list', 22)}<span>${esc(tView('طلباتي'))}</span></button>` +
    `<button type="button" data-a="tab" data-n="المزيد">${ic2('more', 22)}<span>${esc(tView('المزيد'))}</span></button>`;
  $$('#tabs [data-n]').forEach(b => {
    const active = b.dataset.n === curView || (b.dataset.n === 'المزيد' && !MAIN_TABS.includes(curView) && !FULL_VIEWS.includes(curView));
    b.classList.toggle('on', active);
  });
  if (typeof syncDot === 'function') syncDot();
  requestAnimationFrame(() => { if (typeof pillMove === 'function') pillMove(); });
}

function syncShellChrome() {
  syncStaticDOM(curLang());
  const sideLogo = $('#side-logo');
  if (sideLogo && !sideLogo.innerHTML) sideLogo.innerHTML = bear(32, 'sun');
  const introLogo = $('#intro-logo');
  if (introLogo && !introLogo.innerHTML) introLogo.innerHTML = bear(58, 'sun');
  $$('.bkb').forEach(b => { b.innerHTML = ic('back', 20); });
  const bk = $('#bk');
  if (bk) bk.innerHTML = ic('back', 20);
  const spk = $('#side-peek');
  if (spk) { spk.title = t('side_show'); spk.setAttribute('aria-label', t('side_show')); }
  const topNw = $('#shell .top-nw') || document.querySelector('.top-nw');
  if (topNw) topNw.innerHTML = ic('plus', 16) + ' ' + esc(t('new_req_top_btn'));
  $$('[data-a="pick"][data-k]').forEach((b: any) => {
    const sp = b.querySelector('span');
    if (sp && b.dataset.k) sp.textContent = locTxt(b.dataset.k);
  });
  const tabsEl = $('#tabs');
  if (tabsEl && tabsEl.dataset.ready === '1') syncTabsBar();
}
syncShellChrome();
$('#perm-loc-ic').innerHTML = ic('nav', 20);
$('#perm-push-ic').innerHTML = ic('bell', 20);

/* ====== المحافظات والمدن المصرية والمسافات ====== */
const GEO = Object.fromEntries(`القاهرة:مدينة نصر,مصر الجديدة,المعادي,حلوان,شبرا,الزيتون,عين شمس,المطرية,النزهة,التجمع الخامس,الشروق,بدر,الرحاب,مدينتي,المقطم,السيدة زينب,وسط البلد,المرج,15 مايو
الجيزة:الجيزة,الدقي,المهندسين,العجوزة,إمبابة,بولاق الدكرور,فيصل,الهرم,6 أكتوبر,الشيخ زايد,العياط,الصف,أطفيح,الحوامدية,البدرشين,أوسيم,كرداسة,منشأة القناطر
الإسكندرية:المنتزه,العجمي,سيدي جابر,سموحة,العطارين,الجمرك,برج العرب,العامرية,محرم بك,كرموز,المنشية,أبو قير,العصافرة,سيدي بشر
القليوبية:بنها,شبرا الخيمة,قليوب,الخانكة,القناطر الخيرية,شبين القناطر,طوخ,كفر شكر,العبور,الخصوص
الشرقية:الزقازيق,العاشر من رمضان,بلبيس,أبو حماد,منيا القمح,فاقوس,ههيا,أبو كبير,ديرب نجم,الحسينية,كفر صقر,مشتول السوق,الإبراهيمية
الدقهلية:المنصورة,طلخا,ميت غمر,دكرنس,أجا,السنبلاوين,بلقاس,المنزلة,شربين,نبروه,تمي الأمديد,المطرية,الجمالية,منية النصر,بني عبيد,ميت سلسيل
الغربية:طنطا,المحلة الكبرى,كفر الزيات,زفتى,السنطة,بسيون,سمنود,قطور
المنوفية:شبين الكوم,مدينة السادات,منوف,أشمون,الباجور,قويسنا,بركة السبع,تلا,الشهداء,سرس الليان
البحيرة:دمنهور,كفر الدوار,رشيد,إيتاي البارود,أبو حمص,حوش عيسى,الدلنجات,كوم حمادة,إدكو,أبو المطامير,شبراخيت,المحمودية,وادي النطرون
كفر الشيخ:كفر الشيخ,دسوق,بلطيم,الحامول,بيلا,فوه,مطوبس,قلين,سيدي سالم,الرياض
دمياط:دمياط,دمياط الجديدة,رأس البر,فارسكور,كفر سعد,الزرقا,كفر البطيخ
بورسعيد:بورسعيد,بورفؤاد,العرب,الضواحي,الزهور,المناخ
الإسماعيلية:الإسماعيلية,فايد,القنطرة شرق,القنطرة غرب,التل الكبير,أبو صوير,القصاصين
السويس:السويس,الأربعين,فيصل,عتاقة,الجناين
شمال سيناء:العريش,الشيخ زويد,رفح,بئر العبد,الحسنة,نخل
جنوب سيناء:الطور,شرم الشيخ,دهب,نويبع,طابا,سانت كاترين,أبو رديس,رأس سدر
الفيوم:الفيوم,سنورس,إطسا,طامية,إبشواي,يوسف الصديق
بني سويف:بني سويف,الواسطى,ناصر,إهناسيا,ببا,سمسطا,الفشن
المنيا:المنيا,ملوي,سمالوط,مغاغة,بني مزار,العدوة,مطاي,أبو قرقاص,دير مواس
أسيوط:أسيوط,ديروط,منفلوط,القوصية,أبنوب,أبو تيج,الغنايم,صدفا,البداري,ساحل سليم
سوهاج:سوهاج,أخميم,جرجا,طهطا,المراغة,البلينا,المنشأة,دار السلام,جهينة,طما
قنا:قنا,نجع حمادي,دشنا,قوص,أبو تشت,فرشوط,نقادة,الوقف
الأقصر:الأقصر,إسنا,أرمنت,الطود,القرنة,البياضية
أسوان:أسوان,كوم أمبو,إدفو,دراو,نصر النوبة,أبو سمبل
البحر الأحمر:الغردقة,سفاجا,القصير,مرسى علم,رأس غارب,الشلاتين
الوادي الجديد:الخارجة,الداخلة,الفرافرة,باريس,بلاط
مطروح:مرسى مطروح,الحمام,العلمين,الضبعة,سيوة,سيدي براني,السلوم,النجيلة`.split('\n').map(l => { const k = l.split(':'); return [k[0], k[1].split(',')]; }));

const GOVS = Object.keys(GEO);
const govOf = c => GOVS.find(g => GEO[g].includes(c)) || '';
const GOVXY = { 'القاهرة': [30.04, 31.24], 'الجيزة': [30.01, 31.21], 'الإسكندرية': [31.20, 29.92], 'القليوبية': [30.46, 31.18], 'الشرقية': [30.59, 31.50], 'الدقهلية': [31.04, 31.38], 'الغربية': [30.79, 31.00], 'المنوفية': [30.56, 31.01], 'البحيرة': [31.04, 30.47], 'كفر الشيخ': [31.11, 30.94], 'دمياط': [31.42, 31.81], 'بورسعيد': [31.27, 32.30], 'الإسماعيلية': [30.60, 32.27], 'السويس': [29.97, 32.55], 'شمال سيناء': [31.13, 33.80], 'جنوب سيناء': [28.24, 33.62], 'الفيوم': [29.31, 30.84], 'بني سويف': [29.07, 31.10], 'المنيا': [28.11, 30.75], 'أسيوط': [27.18, 31.18], 'سوهاج': [26.56, 31.70], 'قنا': [26.16, 32.72], 'الأقصر': [25.70, 32.64], 'أسوان': [24.09, 32.90], 'البحر الأحمر': [27.26, 33.81], 'الوادي الجديد': [25.45, 30.55], 'مطروح': [31.35, 27.24] };
const CITYXY = { 'المنصورة': [31.04, 31.38], 'طلخا': [31.06, 31.38], 'ميت غمر': [30.72, 31.26], 'دكرنس': [31.09, 31.60], 'مدينة نصر': [30.06, 31.34], 'مصر الجديدة': [30.09, 31.32], 'المعادي': [29.96, 31.26], '6 أكتوبر': [29.97, 30.93], 'الشيخ زايد': [30.02, 30.97], 'التجمع الخامس': [30.01, 31.47], 'شبرا الخيمة': [30.13, 31.25], 'الهرم': [29.99, 31.13], 'فيصل': [30.00, 31.16], 'الدقي': [30.04, 31.21], 'المهندسين': [30.05, 31.20], 'طنطا': [30.79, 31.00], 'المحلة الكبرى': [30.97, 31.17], 'الزقازيق': [30.59, 31.50], 'سموحة': [31.21, 29.96], 'سيدي جابر': [31.22, 29.94], 'المنتزه': [31.28, 30.01], 'شرم الشيخ': [27.91, 34.33], 'الغردقة': [27.26, 33.81], 'الأقصر': [25.70, 32.64], 'أسوان': [24.09, 32.90], 'بورسعيد': [31.27, 32.30], 'دمياط': [31.42, 31.81], 'رأس البر': [31.51, 31.82], 'العريش': [31.13, 33.80], 'دمنهور': [31.04, 30.47], 'الفيوم': [29.31, 30.84], 'المنيا': [28.11, 30.75], 'أسيوط': [27.18, 31.18], 'سوهاج': [26.56, 31.70], 'قنا': [26.16, 32.72], 'بنها': [30.46, 31.18], 'الإسماعيلية': [30.60, 32.27], 'السويس': [29.97, 32.55], 'شبين الكوم': [30.56, 31.01], 'كفر الشيخ': [31.11, 30.94], 'بني سويف': [29.07, 31.10] };

const xyOf = (g, c) => CITYXY[c] || GOVXY[g] || null;
const locXY = l => {
  const p = String(l || '').split(' · ');
  return xyOf(p[1], (p[0] || '').split(' - ').pop());
};
const hav = (a, b) => {
  const t = x => x * Math.PI / 180;
  const h = Math.sin(t(b[0] - a[0]) / 2) ** 2 + Math.cos(t(a[0])) * Math.cos(t(b[0])) * Math.sin(t(b[1] - a[1]) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};

let POS: any = null;
try { POS = JSON.parse(store.get('wasla_pos') || store.get('pos') || 'null'); } catch (e) {}
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const origin = () => POS ? [POS.lat, POS.lng] : xyOf(profile.gov, profile.city);
const dist = o => {
  const a = origin();
  return a && o && o.xy ? hav(a, o.xy) : 9999;
};
const kmTxt = k => tKm(k);
const distTxt = k => tDist(k);
const byNear = a => [...a].sort((x, y) => dist(x) - dist(y));
function reqStatusRank(r: any): number {
  const st = (r && (r.rawStatus || r.status)) || 'new';
  if (st === 'new' || st === 'open') return 0;
  if (st === 'accepted') return 1;
  if (st === 'completed') return 2;
  return 3;
}
const byNearReqs = (arr: any[]) =>
  [...arr].sort((x, y) => (reqStatusRank(x) - reqStatusRank(y)) || (dist(x) - dist(y)) || ((y.ts || 0) - (x.ts || 0)));

/* الأقسام والخدمات الفرعية باللهجة المصرية */
const CATS = [
  ['نقل وعفش وشحن', 'truck', '#FFE26A'],
  ['صيانة وصنايعية', 'wrench', '#4BD4BE'],
  ['دروس وتعليم', 'book', '#9C89FF'],
  ['بيع وشرا ومستعمل', 'cart', '#F7A56C'],
  ['شركات وخدمات متنوعة', 'building', '#55B9DB'],
  ['تجارة وتوريد جملة', 'box', '#FAD2CC']
];
const SUBS = [
  ['نقل عفش شقة', 'ربع نقل وبضائع', 'شحن محافظات', 'ونش رفع عفش', 'سحب وإنقاذ عربيات', 'توصيل ومشاوير خاصة'],
  ['سباكة', 'كهرباء', 'نجارة', 'نقاشة ودهانات', 'تكييف وتبريد', 'تصليح أجهزة منزلية', 'ألوميتال وحدادة', 'سيراميك ومحارة وجبس', 'كاميرات مراقبة وإنتركوم', 'فلاتر مياه وسخانات', 'ميكانيكا وكهرباء سيارات'],
  ['دروس خصوصية', 'تأسيس أطفال', 'لغات وكورسات', 'برمجة وكمبيوتر', 'تحفيظ قرآن', 'تدريب ومهارات'],
  ['موبايلات وإلكترونيات', 'أجهزة كهربائية', 'عفش مستعمل', 'عربيات وموتوسيكلات', 'هدوم ومستلزمات', 'معدات وعدد'],
  ['نظافة شقق ومنازل', 'تشطيب وديكور', 'تمريض ورعاية منزلية', 'طبخ وحلويات بيتي', 'تصوير ومونتاج وتصميم', 'خياطة وتفصيل', 'أمن وحراسة', 'تخليص أوراق ومحاسبة'],
  ['مواد غذائية جملة', 'مستلزمات محلات', 'مواد بناء وتشطيب', 'ملابس ومنسوجات جملة', 'توريد وتجهيز عام']
];
const KW = [
  [0, 'نقل شحن اثاث أثاث عفش توصيل سيارة عربيه ربع ونش شيال عزال مشوار دليفري'],
  [1, 'كهرباء كهربائي سباك سباكه نجار نقاش دهان صيانة تصليح تكييف ثلاجه غساله ماسورة حنفيه مفتاح سيراميك محاره كاميرات فلتر سخان ميكانيكي'],
  [2, 'مدرس درس دروس تعليم مذاكرة ثانوية حصة تأسيس كورس انجليزي عربي رياضيات فيزياء قران تدريب'],
  [3, 'بيع شراء اشتري أبيع جهاز موبايل لابتوب شاشه مستعمل كسر زيرو معدات'],
  [4, 'تنظيف شركة تشطيب نظافة ديكور تمريض ممرض رعايه مسنين طبخ شيف تصوير مونتاج تصميم جرافيك خياطه تفصيل محامي ورق محاسبه امن حراسه'],
  [5, 'توريد جملة تجارة كرتونة بضاعة مخزن مصنع تجهيز']
];
const cic = i => ic((CATS[i] || CATS[0])[1], 15);

/* ====== فحص متصفحات السوشيال الداخلية + أذونات الموبايل الذكية (الموقع + المايكروفون + الإشعارات) ====== */
let PUSH_ON = typeof Notification !== 'undefined' && Notification.permission === 'granted' && store.get('push') !== 'off';
let PUSH_FALLBACK_OK = store.get('wasla_push_fbk') === '1';
let MY: any = { on: false };
let _lastLocCb: any = null;
let _lastVoiceTarget: any = null;
let _micPrimed = false;

function isInAppBrowser(): boolean {
  const ua = String((typeof navigator !== 'undefined' && navigator.userAgent) || '');
  return /(FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\/|TikTok|BytedanceWebview|Snapchat|MicroMessenger|; wv\)|\bWebView\b)/i.test(ua);
}

function isAndroidDevice(): boolean {
  return /Android/i.test(String((typeof navigator !== 'undefined' && navigator.userAgent) || ''));
}

function openInExternalChrome() {
  const cleanHref = location.href.startsWith('http') ? location.href : 'https://saifheny.github.io/wasla.LM/';
  if (isAndroidDevice()) {
    const noProto = cleanHref.replace(/^https?:\/\//i, '');
    const scheme = cleanHref.startsWith('http:') ? 'http' : 'https';
    location.href = `intent://${noProto}#Intent;scheme=${scheme};package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(cleanHref)};end`;
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(cleanHref).then(() => toast('اتنسخ الرابط — افتح Safari أو Chrome والصقه هناك ✓')).catch(() => {});
  }
  window.open(cleanHref, '_blank', 'noopener');
}

function showPermHelpModal(kind: 'mic' | 'loc' | 'speech-service') {
  hideToast();
  const inApp = isInAppBrowser();
  const insecure = typeof window !== 'undefined' && !window.isSecureContext && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1';
  const isLoc = kind === 'loc';
  const title = isLoc ? 'تفعيل إذن الموقع على موبايلك' : 'تفعيل المايكروفون والكتابة بالصوت';

  if (insecure) {
    openModal(`
      <h2>${title}</h2>
      <p style="font-size:.9rem;line-height:1.7">المتصفح على الموبايل بيقفل نافذة الموافقة على المايكروفون والموقع لو الرابط مش آمن (<b dir="ltr">HTTPS</b>).</p>
      <div class="meta" style="margin-top:8px">
        <a class="btn mint" style="flex:1;text-align:center;text-decoration:none" href="https://saifheny.github.io/wasla.LM/">افتح الرابط الآمن الرسمي ◂</a>
        <button class="btn white" type="button" data-a="x">إغلاق</button>
      </div>
    `);
    return;
  }

  const inAppBanner = inApp ? `
    <div class="ofr" style="border-style:solid;background:var(--sun);gap:8px">
      <b>إنت فاتح الرابط جوه تطبيق تواصل اجتماعي!</b>
      <span style="font-size:.85rem;line-height:1.6">المتصفح الداخلي لفيسبوك/ماسنجر/إنستجرام بيمنع ظهور رسالة «موافق / سماح» للصوت والموقع. دوس الزر تحت هيفتحلك الموقع فوراً في متصفح <b>Chrome</b> العادي وهيشتغل كل حاجة معاك:</span>
      <button class="btn coral" type="button" data-a="openExtBrowser">${ic('share', 15)} افتح وصلة في متصفح Chrome الخارجي</button>
    </div>
  ` : '';

  const stepsHtml = isLoc ? `
    <div class="perm-steps">
      <div class="perm-step"><b class="st-num">1</b><span>اتأكد إن علامة <b>الموقع (Location / GPS)</b> شغّالة من شريط الإشعارات فوق في الموبايل.</span></div>
      <div class="perm-step"><b class="st-num">2</b><span>اضغط على <b>علامة الضبط أو القفل 🔒</b> اللي جنب عنوان الرابط فوق في المتصفح ⬅ اختار <b>الأذونات (Permissions)</b> ⬅ خلّي <b>الموقع الجغرافي: سماح (Allow)</b>.</span></div>
    </div>
  ` : kind === 'speech-service' ? `
    <div class="perm-steps">
      <div class="perm-step"><b class="st-num">1</b><span>المتصفح الحالي قافل محرك تحويل الصوت لنص — افتح الموقع من متصفح <b>Google Chrome</b> على الموبايل وهتشتغل معاك فوراً.</span></div>
      <div class="perm-step"><b class="st-num">2</b><span>أو تقدر في أي خانة كتابة تدوس على <b>علامة المايكروفون 🎤 اللي في كيبورد الموبايل</b> وهيكتب كلامك بالعربي تلقائي برضه!</span></div>
    </div>
  ` : `
    <div class="perm-steps">
      <div class="perm-step"><b class="st-num">1</b><span>اضغط على <b>علامة الضبط أو القفل 🔒</b> جنب الرابط فوق في المتصفح ⬅ <b>الأذونات (Permissions)</b> ⬅ خلّي <b>الميكروفون: سماح (Allow)</b>.</span></div>
      <div class="perm-step"><b class="st-num">2</b><span>لو المتصفح لسه مبيظهرش الرسالة، افتح <b>إعدادات الموبايل ⬅ التطبيقات ⬅ Chrome ⬅ الأذونات</b> واسمح بـ <b>الميكروفون</b>، أو استخدم <b>مايك الكيبورد 🎤</b> مباشرة.</span></div>
    </div>
  `;

  const cityChosen = (LOC.ob && LOC.ob.c) || (profile && profile.city) || '';
  const actionsHtml = isLoc ? `
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
      <button class="btn mint" type="button" data-a="retryLoc">${ic('nav', 15)} جرّب طلب الموقع من المتصفح تاني</button>
      <button class="btn white" type="button" data-a="useCityLoc">${ic('pin', 15)} ${cityChosen ? `اعتمد موقع مدينتي (${esc(cityChosen)}) وكمّل` : 'اختار محافظتي ومدينتي يدوياً وكمّل'}</button>
    </div>
  ` : `
    <div class="meta" style="margin-top:8px">
      ${!inApp ? `<button class="btn mint" style="flex:1" type="button" data-a="retryMic">${ic('mic', 15)} جرّب فتح المايكروفون تاني</button>` : `<button class="btn mint" style="flex:1" type="button" data-a="openExtBrowser">افتح في Chrome</button>`}
      <button class="btn white" type="button" data-a="x">تمام</button>
    </div>
  `;

  openModal(`
    <h2>${title}</h2>
    <p style="font-size:.86rem;color:var(--muted)">المتصفح عندك كتم نافذة السماح التلقائية — اتبع الخطوة السريعة دي وهتفتح معاك على طول:</p>
    ${inAppBanner}
    ${stepsHtml}
    ${actionsHtml}
  `);
}

function saveResolvedPos(lat: number, lng: number, acc: number, silent: boolean, cb?: any) {
  const now = Date.now();
  POS = { lat, lng, acc: Math.round(acc || 50) };
  store.set('wasla_pos', JSON.stringify(POS));
  store.set('wasla_loc_ts', String(now));
  syncPermCards();
  if (!silent) toast('اتحدد موقعك تمام ✓');
  if (hasLiveAuth() && isIn() && db) {
    try {
      profile.lat = POS.lat;
      profile.lng = POS.lng;
      profile.locUpdatedAtMs = now;
      persistSessionCache();
      db.doc('users/' + user.uid).set({
        lat: POS.lat,
        lng: POS.lng,
        locUpdatedAtMs: now,
        roles: MY.on ? ['customer', 'provider'] : ['customer'],
        updatedAt: SVT()
      }, { merge: true }).catch(() => {});
      if (MY.on) {
        db.doc('providers/' + user.uid).update({ lat: POS.lat, lng: POS.lng, updatedAt: SVT() }).catch(() => {});
      }
    } catch (e) {}
  }
  if ($('#app').classList.contains('on') && !['طلب جديد', 'محادثة'].includes(cur)) softRender();
  if (cb) cb(POS);
}

function locateNow(cb?: any, silent = false) {
  if (!silent) _lastLocCb = cb || null;
  if (!navigator.geolocation) {
    if (!silent) showPermHelpModal('loc');
    return;
  }
  if (!silent && !window.isSecureContext && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    showPermHelpModal('loc');
    return;
  }
  if (!silent) toast('لحظة بنطلب موقعك من المتصفح...');
  const t0 = Date.now();
  navigator.geolocation.getCurrentPosition(
    p => saveResolvedPos(p.coords.latitude, p.coords.longitude, p.coords.accuracy || 50, silent, cb),
    e => {
      // لو الـ GPS العالي الدقة اتأخر جوه البيت (code 2 أو 3)، نجرب فوراً تحديد الموقع بالشبكة/الواي فاي
      if (e.code !== 1) {
        navigator.geolocation.getCurrentPosition(
          p2 => saveResolvedPos(p2.coords.latitude, p2.coords.longitude, p2.coords.accuracy || 250, silent, cb),
          () => {
            if (!silent) showPermHelpModal('loc');
          },
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 180000 }
        );
        return;
      }
      if (!silent) {
        if (Date.now() - t0 < 450 || isInAppBrowser()) {
          showPermHelpModal('loc');
        } else {
          showPermHelpModal('loc');
        }
      }
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: silent ? 300000 : 0 }
  );
}

/* تحديث الموقع تلقائي مرة كل أسبوع من غير أي إزعاج */
function checkWeeklyLocSync() {
  if (!user || !isIn()) return;
  const last = Number(store.get('wasla_loc_ts') || profile.locUpdatedAtMs || 0);
  if (!POS || (Date.now() - last >= WEEK_MS)) {
    locateNow(null, true);
  }
}

function isNotifGranted() {
  if (typeof Notification === 'undefined') return true; // متصفح لا يدعم واجهة الإشعارات أصلاً (مثل Safari على iPhone)
  return Notification.permission === 'granted' || PUSH_FALLBACK_OK;
}

function syncPermCards() {
  const lc = $('#perm-loc-card'), lt = $('#perm-loc-txt'), lb = $('#btn-ob-loc'), li = $('#perm-loc-ic');
  if (lc) {
    const ok = !!POS;
    lc.classList.toggle('ok', ok);
    if (ok) lc.classList.remove('bad');
    li.innerHTML = ic(ok ? 'check' : 'nav', 20);
    const accTxt = ok ? (POS.cityFallback ? t('ob_loc_city') : `±${POS.acc || 50}m`) : '';
    lt.textContent = ok
      ? t('ob_loc_ok', { acc: accTxt })
      : t('ob_loc_need');
    lb.textContent = ok ? t('ob_loc_btn_ok') : t('ob_loc_btn_go');
    lb.className = 'btn sm ' + (ok ? 'mint' : 'coral');
  }
  const pc = $('#perm-push-card'), pt = $('#perm-push-txt'), pb = $('#btn-ob-push'), pi = $('#perm-push-ic');
  if (pc) {
    const ok = isNotifGranted();
    pc.classList.toggle('ok', ok);
    if (ok) pc.classList.remove('bad');
    pi.innerHTML = ic(ok ? 'check' : 'bell', 20);
    pt.textContent = ok
      ? (PUSH_FALLBACK_OK && typeof Notification !== 'undefined' && Notification.permission !== 'granted'
          ? t('ob_push_in')
          : t('ob_push_ok'))
      : t('ob_push_need');
    pb.textContent = ok ? t('ob_push_btn_ok') : t('ob_push_btn_go');
    pb.className = 'btn sm ' + (ok ? 'mint' : 'coral');
  }
}

$('#btn-ob-loc').onclick = () => locateNow(() => syncPermCards(), false);
$('#btn-ob-push').onclick = async () => {
  if (typeof Notification === 'undefined') {
    PUSH_ON = true;
    syncPermCards();
    toast('التنبيهات مفعّلة تلقائياً على متصفحك ✓');
    return;
  }
  const t0 = Date.now();
  try {
    const perm = await Notification.requestPermission();
    PUSH_ON = perm === 'granted';
    if (PUSH_ON) {
      PUSH_FALLBACK_OK = false;
      store.set('push', 'on');
      syncPermCards();
      toast('اتفعّلت الإشعارات بنجاح!');
    } else if (Date.now() - t0 < 350 || isInAppBrowser()) {
      // المتصفح الداخلي كتم نافذة الإشعارات أصلاً بدون سؤال المستخدم — نفعل التنبيهات الداخلية حتى لا يتعطل التسجيل
      PUSH_FALLBACK_OK = true;
      store.set('wasla_push_fbk', '1');
      syncPermCards();
      toast('المتصفح الحالي قافل إشعارات النظام، ففعّلنالك التنبيهات الفورية جوه الموقع ✓');
    } else {
      store.set('push', 'off');
      syncPermCards();
      toast('اضغط سماح (Allow) لما تظهرلك نافذة الإشعارات من المتصفح.');
    }
  } catch (e) {
    PUSH_FALLBACK_OK = true;
    store.set('wasla_push_fbk', '1');
    syncPermCards();
    toast('فعّلنالك التنبيهات الفورية داخل الموقع ✓');
  }
};

/* ====== اختيار المحافظة والمدينة ====== */
function updLocUI(k) {
  if (k === 'fl') { nearReqLim = 8; provPageLim = 8; render(); return; }
  $$('[data-k="' + k + '"] span').forEach(x => { x.textContent = locTxt(k); });
  if (k === 'ob' && $('#lb1')) $('#lb1').classList.remove('bad');
  if (k === 'rq') {
    RQ.xy = xyOf(LOC.rq.g, LOC.rq.c);
    const b = $('#rloc');
    if (b) b.innerHTML = ic('nav', 15) + ' ' + esc(t('post_use_gps'));
  }
}

function pickLoc(k) {
  const old = $('#pk'); if (old) old.remove();
  const p = document.createElement('div');
  p.className = 'pk'; p.id = 'pk';
  document.body.appendChild(p);
  if (typeof syncBackTrap === 'function') syncBackTrap();
  let g = '', q = '';
  const fin = (G, C) => {
    if (k === 'fl') { fG = G; fC = C; }
    else LOC[k] = { g: G, c: C };
    p.remove();
    updLocUI(k);
  };
  const rows = () => {
    const any = k === 'fl';
    const qNorm = q.toLowerCase();
    const L = (g ? (GEO[g] || []) : GOVS).filter(x =>
      !qNorm ||
      x.toLowerCase().includes(qNorm) ||
      tLocToken(x).toLowerCase().includes(qNorm) ||
      tLocToken(x, 'en').toLowerCase().includes(qNorm)
    );
    const out: string[] = [];
    if (any) {
      out.push(
        g
          ? `<button class="row" type="button" data-c=""><span>${esc(t('loc_all_cities_of', { g: tLocToken(g) }))}</span></button>`
          : `<button class="row" type="button" data-g=""><span>${esc(t('loc_all_govs'))}</span></button>`
      );
    }
    L.forEach(x => out.push(`<button class="row" type="button" data-${g ? 'c' : 'g'}="${esc(x)}"><span>${esc(tLocToken(x))}</span>${ic('chev', 16)}</button>`));
    return out.join('') || `<p style="text-align:center;padding:24px;color:var(--muted)">${esc(t('loc_no_match'))}</p>`;
  };
  const draw = () => {
    p.innerHTML = `
      <header><button class="btn sq" id="pb" type="button" aria-label="${esc(t('back_aria'))}" title="${esc(t('back_aria'))}">${ic('back', 20)}</button><h3>${esc(g ? t('loc_pick_city_title', { g: tLocToken(g) }) : t('loc_pick_gov_title'))}</h3></header>
      <div class="ps"><input id="pq" placeholder="${esc(t('loc_search_ph'))}" value="${esc(q)}"></div>
      <div class="pl">${rows()}</div>`;
    const inp = $('#pq');
    inp.oninput = () => { q = inp.value.trim(); p.querySelector('.pl')!.innerHTML = rows(); };
    if (typeof enhanceVoiceInputs === 'function') enhanceVoiceInputs(p);
  };
  p.onclick = (e: any) => {
    const b = e.target?.closest?.('button'); if (!b || b.classList.contains('v-mic')) return;
    if (b.id === 'pb') { if (typeof stopVoice === 'function') stopVoice(); if (g) { g = ''; q = ''; draw(); } else p.remove(); return; }
    if (b.hasAttribute('data-g')) { if (typeof stopVoice === 'function') stopVoice(); if (b.dataset.g === '') return fin('', ''); g = b.dataset.g; q = ''; draw(); }
    else if (b.hasAttribute('data-c')) { if (typeof stopVoice === 'function') stopVoice(); fin(g, b.dataset.c); }
  };
  draw();
}
$('#lb1').innerHTML = locBtn('ob');

/* ====== الحسابات وتسجيل الدخول بجوجل واستكمال البيانات ====== */
let PEND: any = null;
const isIn = () => !!(user && profile && profile.first);
const hasLiveAuth = () => !!(user && user.uid && !user._cachedStub);

const ACC_K = 'wasla_accts_v2';
const getSavedAccts = () => { try { return JSON.parse(store.get(ACC_K) || '[]'); } catch (e) { return []; } };
function rememberAcct(u) {
  if (!u || !u.email) return;
  const list = getSavedAccts().filter(x => x.email !== u.email);
  list.unshift({ email: u.email, name: u.displayName || u.email.split('@')[0], photo: u.photoURL || '' });
  store.set(ACC_K, JSON.stringify(list.slice(0, 5)));
}

function drawAccts() {
  const l = $('#acl'); if (!l) return;
  const list = getSavedAccts();
  l.innerHTML = list.map((a: any, i: number) => {
    const ch = esc((a.name || 'م').trim().charAt(0));
    const safePh = safeImgUrl(a.photo);
    const av = safePh
      ? `<img src="${esc(safePh)}" alt="${ch}" referrerpolicy="no-referrer" data-fbk="${ch}">`
      : ch;
    return `<button class="arow" type="button" data-i="${i}">
      <span class="aav">${av}</span>
      <span class="atx"><b>${esc(a.name)}</b><small dir="ltr">${esc(a.email)}</small></span>
      <span>${ic('chev', 16)}</span>
    </button>`;
  }).join('');
  l.querySelectorAll('.arow').forEach((b: any) => { b.onclick = () => gsign(list[+b.dataset.i].email); });
}

async function loadProfileResilient(u: any): Promise<{ status: 'ok' | 'missing' | 'error'; data: any }> {
  if (!u || !db) return { status: 'error', data: null };
  try {
    const d = await db.doc('users/' + u.uid).get();
    if (d.exists && d.data()?.onboarded) return { status: 'ok', data: d.data() };
    return { status: 'missing', data: null };
  } catch (e) {
    try {
      const cachedDoc = await db.doc('users/' + u.uid).get({ source: 'cache' });
      if (cachedDoc.exists && cachedDoc.data()?.onboarded) {
        return { status: 'ok', data: cachedDoc.data() };
      }
    } catch {}
    return { status: 'error', data: null };
  }
}

async function saveProfileToFirebase() {
  if (!hasLiveAuth() || !db) return;
  const roles = MY.on ? ['customer', 'provider'] : ['customer'];
  await db.doc('users/' + user.uid).set({
    ...profile,
    email: user.email || null,
    photoURL: profile.photo || user.photoURL || null,
    roles,
    onboarded: true,
    updatedAt: SVT()
  }, { merge: true });
  persistSessionCache();
}

function prefillOnboardingFromGoogle() {
  if (!user) return;
  const parts = String(user.displayName || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length && !$('#n1').value.trim()) $('#n1').value = parts[0] || '';
  if (parts.length >= 3 && !$('#n2').value.trim()) $('#n2').value = parts[1] || '';
  if (parts.length >= 2 && !$('#n3').value.trim()) $('#n3').value = parts[parts.length - 1] || '';
  syncPermCards();
}

function go(id) {
  if (typeof stopVoice === 'function') stopVoice();
  $$('.screen').forEach(s => s.classList.toggle('on', s.id === id));
  window.scrollTo(0, 0);
  if (id === 'app') store.set(VISITED_APP_K, '1');
  if (typeof saveNavState === 'function') saveNavState(id);
  if (id === 'login') drawAccts();
  if (id === 's1') {
    prefillOnboardingFromGoogle();
    if (typeof enhanceVoiceInputs === 'function') enhanceVoiceInputs($('#s1'));
  }
  if (id === 'app') {
    initApp();
    if (PEND && isIn()) {
      const fn = PEND;
      PEND = null;
      setTimeout(fn, 180);
    }
  }
  if (typeof syncBackTrap === 'function') syncBackTrap();
}

function handleS1Back() {
  if (!user || isIn()) {
    go('app');
    return;
  }
  openModal(`
    <h2>${esc(t('s1_back_h2'))}</h2>
    <p style="font-size:.88rem;color:var(--muted);line-height:1.65">${esc(t('s1_back_p'))}</p>
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
      <button class="btn mint" type="button" data-a="s1BrowseGuest">${ic('home', 16)} ${esc(t('s1_browse_guest'))}</button>
      <button class="btn peach" type="button" data-a="s1SwitchAcct">${ic('user', 16)} ${esc(t('s1_switch_acct'))}</button>
      <button class="btn white" type="button" data-a="x">${esc(t('s1_cont_reg'))}</button>
    </div>
  `);
}

$$('[data-go]').forEach(b => { b.onclick = () => go(b.dataset.go); });
if ($('#s1-back')) $('#s1-back').onclick = handleS1Back;

/* دخول سريع فوري للموقع من شاشة البداية (صفر تأخير!) */
$('#enter').onclick = () => go('app');
$('#intro-google').onclick = () => {
  if (getSavedAccts().length) go('login');
  else gsign();
};

async function gsign(hint?: string) {
  if (!auth) return toast('خدمة تسجيل جوجل بتحمّل، جرّب كمان ثانية.');
  if (isInAppBrowser()) {
    openModal(`
      <h2>افتح في متصفح الموبايل لتسجيل جوجل</h2>
      <p style="font-size:.9rem;line-height:1.7">جوجل بيمنع تسجيل الدخول جوه المتصفح الداخلي لفيسبوك أو ماسنجر لحماية حسابك. بضغطة واحدة افتح وصلة في <b>Chrome</b> وسجّل فوراً:</p>
      <div class="meta" style="margin-top:8px">
        <button class="btn coral" style="flex:1" type="button" data-a="openExtBrowser">${ic('share', 15)} افتح في Chrome الخارجي</button>
        <button class="btn white" type="button" data-a="x">إلغاء</button>
      </div>
    `);
    return false;
  }
  const btns = $$('#login .arow, #intro-google');
  btns.forEach(b => { b.disabled = true; });
  try {
    try { await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); } catch {}
    const pr = new firebase.auth.GoogleAuthProvider();
    pr.setCustomParameters({ prompt: 'select_account', ...(typeof hint === 'string' ? { login_hint: hint } : {}) });
    const r = await auth.signInWithPopup(pr);
    user = r.user;
    rememberAcct(user);
    const res = await loadProfileResilient(user);
    if (res.status === 'ok' && res.data) {
      profile = res.data;
      persistSessionCache();
      rebuildReq();
      rebuildProv();
      checkWeeklyLocSync();
      go('app');
    } else {
      go('s1');
    }
    return true;
  } catch (e: any) {
    if (e && e.code === 'auth/popup-blocked') {
      try {
        const pr2 = new firebase.auth.GoogleAuthProvider();
        pr2.setCustomParameters({ prompt: 'select_account', ...(typeof hint === 'string' ? { login_hint: hint } : {}) });
        await auth.signInWithRedirect(pr2);
        return false;
      } catch {}
    }
    toast(e.code === 'auth/popup-closed-by-user'
      ? 'قفلت نافذة جوجل قبل ما تكمّل الدخول.'
      : e.code === 'auth/unauthorized-domain'
      ? 'ضيف الدومين ده (' + location.hostname + ') في Firebase Console ⬅ Authentication ⬅ Authorized domains.'
      : 'معرفناش نسجّل دخولك بجوجل (' + (e.code || 'تأكد من الرابط المصرح به') + ')');
    return false;
  } finally {
    btns.forEach(b => { b.disabled = false; });
  }
}
$('#google').onclick = () => gsign();

function markBad(ids, msg) {
  ids.forEach(id => {
    const el = $('#' + id);
    if (!el) return;
    el.classList.remove('bad');
    void el.offsetWidth;
    el.classList.add('bad');
  });
  $('#e1').textContent = msg;
}
$$('input').forEach(i => i.addEventListener('input', () => i.classList.remove('bad')));

function normalizeEgyptPhone(raw: string): string | null {
  let s = String(raw || '')
    .replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[\s\-().]/g, '');
  if (s.startsWith('0020')) s = '0' + s.slice(4);
  else if (s.startsWith('+20')) s = '0' + s.slice(3);
  else if (s.startsWith('20') && s.length === 12) s = '0' + s.slice(2);
  else if (/^1[0125]\d{8}$/.test(s)) s = '0' + s;
  return /^01[0125]\d{8}$/.test(s) ? s : null;
}

$('#next1').onclick = async () => {
  if (!user) return go('login');
  const n = ['n1', 'n2', 'n3'].map(i => cleanInput($('#' + i).value, 60));
  const empty = ['n1', 'n2', 'n3'].filter((id, k) => !n[k]);
  if (empty.length) return markBad(empty, 'يا ريت تكتب الاسم التلاتي كامل.');
  const ph = normalizeEgyptPhone($('#ph').value);
  if (!ph) return markBad(['ph'], 'اكتب رقم موبايل مصري مظبوط، زي: 01012345678');
  if (!LOC.ob.c) return markBad(['lb1'], 'اختار المحافظة والمركز أو المدينة بتاعتك.');
  if (!POS) return markBad(['perm-loc-card'], 'تحديد الموقع إجباري وقت التسجيل — اضغط «تحديد موقعي دلوقتي» واسمح بالموقع.');
  if (!isNotifGranted()) return markBad(['perm-push-card'], 'تفعيل الإشعارات إجباري وقت التسجيل — اضغط «تفعيل الإشعارات دلوقتي» واسمح بيها.');

  $('#e1').textContent = '';
  const btn = $('#next1');
  btn.disabled = true;
  btn.textContent = 'بنحفظ حسابك...';
  try {
    const now = Date.now();
    profile = {
      first: n[0],
      second: n[1],
      third: n[2],
      phone: ph,
      gov: LOC.ob.g,
      city: LOC.ob.c,
      area: cleanInput($('#a1').value, 200),
      lat: POS.lat,
      lng: POS.lng,
      locUpdatedAtMs: now
    };
    store.set('wasla_loc_ts', String(now));
    await saveProfileToFirebase();
    toast('نوّرت وصلة يا ' + n[0] + '!');
    go('app');
  } catch (e) {
    toast('معرفناش نحفظ بياناتك (' + (e.code || 'خطأ في الاتصال') + ')');
  } finally {
    btn.disabled = false;
    btn.textContent = 'سجّل وادخل على وصلة';
  }
};

/* ====== البيانات الحية 100% من Firebase (صفر حسابات وهمية وصفر عروض أو ردود وهمية) ====== */
const STS = {
  new: 'جديد',
  open: 'بيستقبل عروض',
  accepted: 'تم الاتفاق ✓',
  completed: 'تم ومكتمل ✓',
  cancelled: 'ملغي'
};

let RAWR: any[] = [], RAWP: any[] = [], RAWT: any[] = [], RAWW: any[] = [];
let REQS: any[] = [], PROV: any[] = [], REVIEWS: any[] = [], NOTIFS: any[] = [], SERVER_NOTIFS: any[] = [], CHATS: any[] = [];
let WARNINGS_BY_TARGET: Record<string, any[]> = {}, LOCAL_WARNS: any[] = [];
let PROV_WORKS: Record<string, any[]> = {}, EXTRA_PROV: Record<string, any> = {}, PERSON_CACHE: Record<string, any> = {};
let OFFER_LIM: Record<string, number> = {}; // عدد العروض المعروضة لكل طلب (يبدأ بـ 3 ويزيد 3 مع زر المزيد)
let _worksUnsub: any = null;
let UNREAD = 0;
let liveReqsReady = false, liveProvsReady = false, liveRevsReady = false, authReady = !HAS_FB;
let MY_SENT_OFFERS = new Set<string>();
let _offerUnsubs: Record<string, any> = {};
let _notifUnsub: any = null;

const READ_NOTIFS_K = () => 'wasla_read_notifs_v1_' + ((user && user.uid) || 'guest');
function loadReadNotifs(): Set<string> {
  try { return new Set(JSON.parse(store.get(READ_NOTIFS_K()) || '[]')); } catch { return new Set(); }
}
function saveReadNotifs(set: Set<string>) {
  store.set(READ_NOTIFS_K(), JSON.stringify([...set].slice(-300)));
}

/* حفظ واسترجاع علامات التحذير المحلية (للتوافق الفوري مع السيرفر) */
const LOCAL_WARNS_K = 'wasla_local_warns_v1';
try { LOCAL_WARNS = JSON.parse(store.get(LOCAL_WARNS_K) || '[]'); } catch (e) { LOCAL_WARNS = []; }

/* حفظ واسترجاع جلسة المستخدم ومكانه بالظبط علشان الريفريش يفضل ثابت 100% بدون أي خروج */
const NAV_K = 'wasla_nav_state_v1';
const SESSION_HINT_K = 'wasla_has_session_v1';
const SESSION_CACHE_K = 'wasla_session_cache_v1';
const VISITED_APP_K = 'wasla_entered_app_v1';
const SCROLL_SS_K = 'wasla_scroll_pos_v1';

function persistSessionCache() {
  if (!user || !user.uid || !profile || !profile.first) return;
  store.set(SESSION_HINT_K, '1');
  store.set(VISITED_APP_K, '1');
  store.set(SESSION_CACHE_K, JSON.stringify({
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    profile,
    myProv: MY && MY.on ? MY : { on: false },
    ts: Date.now()
  }));
}

function hydrateCachedSession() {
  try {
    const raw = store.get(SESSION_CACHE_K);
    if (!raw) return;
    const cached = JSON.parse(raw);
    if (!cached || !cached.uid || !cached.profile || !cached.profile.first) return;
    if (!user) {
      user = {
        uid: cached.uid,
        email: cached.email || '',
        displayName: cached.displayName || '',
        photoURL: cached.photoURL || '',
        _cachedStub: true
      };
    }
    profile = cached.profile;
    if (cached.myProv && cached.myProv.on) {
      MY = cached.myProv;
    }
  } catch (e) {}
}

function saveScrollPos() {
  try {
    if (!$('#app') || !$('#app').classList.contains('on')) return;
    const mn = window.innerWidth >= 900 ? $('#shell .main') : null;
    const y = mn ? mn.scrollTop : (window.scrollY || document.documentElement.scrollTop || 0);
    window.sessionStorage.setItem(SCROLL_SS_K, JSON.stringify({ cur, y: Math.max(0, Math.round(y)) }));
  } catch (e) {}
}

function readSavedScrollPos(forView: string): number {
  try {
    const raw = window.sessionStorage.getItem(SCROLL_SS_K);
    if (!raw) return 0;
    const obj = JSON.parse(raw);
    return (obj && obj.cur === forView && Number(obj.y) > 0) ? Number(obj.y) : 0;
  } catch {
    return 0;
  }
}

function loadNavState() {
  try { return JSON.parse(store.get(NAV_K) || 'null'); } catch (e) { return null; }
}
function saveNavState(screenOverride?: string) {
  const activeScreenEl = $('.screen.on');
  const scr = screenOverride || (activeScreenEl ? activeScreenEl.id : 'intro');
  if (scr === 'intro') {
    store.del(NAV_K);
    return;
  }
  const activeChat = CHATS[chat] || null;
  store.set(NAV_K, JSON.stringify({
    screen: scr,
    cur: typeof cur !== 'undefined' ? cur : 'الرئيسية',
    backView: typeof backView !== 'undefined' ? backView : 'الرئيسية',
    curProvUid: curProvUid || '',
    chatCid: (cur === 'محادثة' && activeChat && activeChat.cid) || '',
    chatUid: (cur === 'محادثة' && activeChat && activeChat.uid) || '',
    chatName: (cur === 'محادثة' && activeChat && activeChat.w) || '',
    chatPhoto: (cur === 'محادثة' && activeChat && activeChat.photo) || '',
    mineTab: mineTab || 'all',
    catF: typeof catF === 'number' ? catF : -1,
    homeCatF: typeof homeCatF === 'number' ? homeCatF : -1,
    SQ: SQ || ''
  }));
}
function clearNavState() {
  store.del(NAV_K);
  store.del(SESSION_HINT_K);
  store.del(SESSION_CACHE_K);
  store.del(VISITED_APP_K);
  try { window.sessionStorage.removeItem(SCROLL_SS_K); } catch {}
}

/* استرجاع الجلسة الموقّعة فوراً في اللحظة صفر قبل أي رسم للواجهة */
hydrateCachedSession();

/* المحفوظات (Bookmark) */
const SAVED_K = () => 'wasla_saved_' + ((user && user.uid) || 'guest');
let SAVED_IDS = new Set<string>();
function loadSaved() {
  try { SAVED_IDS = new Set(JSON.parse(store.get(SAVED_K()) || '[]')); } catch (e) { SAVED_IDS = new Set(); }
}
function toggleSaveId(id) {
  if (SAVED_IDS.has(id)) SAVED_IDS.delete(id);
  else SAVED_IDS.add(id);
  store.set(SAVED_K(), JSON.stringify([...SAVED_IDS]));
}
loadSaved();

/* حدود التحميل التدريجي مع الشيمر الرمادي الفضي */
let homeReqLim = 6, homeProvLim = 6, nearReqLim = 8, provPageLim = 8;
let homeCatF = -1, catF = -1, mineTab = 'all', qS = '', SQ = '';
let chat = 0, curReq = '', rateId = '', editReqId = '', PEND_OFFER = '';
let curProvUid = '', revStars = 5, doneStars = 5, doneProvUid = '';
let warnTargetUid = '', warnTargetName = '', warnReason = 'نصب أو تحايل مالي';
let RQ: any = { c: -1, sub: '', imgs: [], xy: null, need: 'في أقرب وقت' };

const tMillis = ts => {
  if (!ts) return 0;
  if (typeof ts.toMillis === 'function') return ts.toMillis();
  if (typeof ts === 'number') return ts;
  if (ts.seconds) return ts.seconds * 1000;
  return 0;
};
const tAgo = (ts: any) => trAgoMs(tMillis(ts) || Date.now());

/* شيمر التحميل الرمادي الفضي */
const reqSkels = (n = 3) => Array.from({ length: n }, () => `
  <div class="skel-card" aria-hidden="true">
    <div style="display:flex;gap:10px;align-items:center">
      <div class="shimmer sh-av"></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:6px">
        <div class="shimmer sh-ln w45"></div>
        <div class="shimmer sh-ln w70"></div>
      </div>
    </div>
    <div class="shimmer sh-ln h18"></div>
    <div class="shimmer sh-ln w70"></div>
    <div style="display:flex;gap:8px;margin-top:4px">
      <div class="shimmer sh-btn"></div>
      <div class="shimmer sh-btn" style="width:76px"></div>
    </div>
  </div>`).join('');

const provHorizSkels = (n = 4) => Array.from({ length: n }, () => `
  <div class="skel-prov" aria-hidden="true">
    <div class="shimmer sh-av-lg"></div>
    <div class="shimmer sh-ln w70"></div>
    <div class="shimmer sh-ln w45"></div>
  </div>`).join('');

let _quotaCdTimer: any = null;
function openModal(html) {
  closeModal();
  const m = document.createElement('div');
  m.className = 'md';
  m.id = 'md';
  m.innerHTML = `<div class="mc"><button class="mx mx-back" data-a="x" type="button" aria-label="${esc(t('back_aria'))}" title="${esc(t('back_aria'))}">${ic('back', 19)}</button>${html}</div>`;
  m.addEventListener('click', e => { if (e.target === m) closeModal(); });
  document.body.appendChild(m);
  if (typeof enhanceVoiceInputs === 'function') enhanceVoiceInputs(m);
  if (typeof syncBackTrap === 'function') syncBackTrap();
}
function closeModal() {
  if (_quotaCdTimer) { clearInterval(_quotaCdTimer); _quotaCdTimer = null; }
  const m = $('#md');
  if (m) {
    if (typeof _voiceEl !== 'undefined' && _voiceEl && m.contains(_voiceEl) && typeof stopVoice === 'function') stopVoice();
    m.remove();
  }
}
const mbtns = (okAct, okTxt, okCls = 'mint') =>
  `<div class="meta" style="margin-top:6px"><button class="btn ${okCls}" style="flex:1" type="button" data-a="${okAct}">${okTxt}</button><button class="btn white" type="button" data-a="x">${esc(t('cancel_btn'))}</button></div>`;

function pickImg(max: number, sq: boolean, cb: any, cap?: boolean) {
  const i = document.createElement('input');
  i.type = 'file';
  i.accept = 'image/*';
  if (cap) (i as any).capture = 'environment';
  i.onchange = () => {
    const f = i.files && i.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const im = new Image();
      im.onload = () => {
        const c = document.createElement('canvas'), x = c.getContext('2d')!;
        x.imageSmoothingEnabled = true;
        (x as any).imageSmoothingQuality = 'high';
        if (sq) {
          const m = Math.min(im.width, im.height), s = Math.min(max, m);
          c.width = c.height = s;
          x.drawImage(im, (im.width - m) / 2, (im.height - m) / 2, m, m, 0, 0, s, s);
        } else {
          const k = Math.min(1, max / Math.max(im.width, im.height));
          c.width = Math.round(im.width * k);
          c.height = Math.round(im.height * k);
          x.drawImage(im, 0, 0, c.width, c.height);
        }
        const webp = c.toDataURL('image/webp', 0.78);
        cb(webp && webp.startsWith('data:image/webp') ? webp : c.toDataURL('image/jpeg', 0.76));
      };
      im.src = String(r.result || '');
    };
    r.readAsDataURL(f);
  };
  i.click();
}

const toBlob = u => fetch(u).then(r => r.blob());
async function uploadImgSafe(path: string, dataUrl: string, fallbackPath?: string) {
  if (!storage || !dataUrl || !dataUrl.startsWith('data:')) return dataUrl;
  const blobProm = toBlob(dataUrl);
  try {
    const ref = storage.ref(path);
    await ref.put(await blobProm);
    return await ref.getDownloadURL();
  } catch (e) {
    if (fallbackPath && fallbackPath !== path) {
      try {
        const ref2 = storage.ref(fallbackPath);
        await ref2.put(await blobProm);
        return await ref2.getDownloadURL();
      } catch {}
    }
    return dataUrl; // في حال تعذر Storage نستخدم الصورة المضغوطة مباشرة حتى لا يفشل النشر أبدًا
  }
}

/* مزامنة العروض الحقيقية لطلبات المستخدم على Firestore */
function syncMyRequestOffers() {
  if (!db || !hasLiveAuth()) return;
  const myIds = new Set(REQS.filter(r => r.mine).map(r => r.id));
  Object.keys(_offerUnsubs).forEach(rid => {
    if (!myIds.has(rid)) {
      try { _offerUnsubs[rid](); } catch (e) {}
      delete _offerUnsubs[rid];
    }
  });
  REQS.filter(r => r.mine).forEach(r => {
    if (_offerUnsubs[r.id]) return;
    _offerUnsubs[r.id] = db.collection('requests').doc(r.id).collection('offers').onSnapshot(sn => {
      const target = REQS.find(x => x.id === r.id);
      if (!target) return;
      target.offers = sn.docs.map(doc => {
        const d = doc.data();
        return {
          oid: doc.id,
          providerId: d.providerId || doc.id,
          p: d.providerName || 'مقدم خدمة',
          photo: d.providerPhoto || '',
          preset: d.providerPreset || '',
          pr: Number(d.price) || 0,
          r: Number(d.ratingAvg) || 0,
          when: d.when || 'في أقرب وقت',
          msg: d.message || '',
          s: d.status === 'accepted' ? 1 : d.status === 'rejected' ? 2 : 0,
          ts: tMillis(d.createdAt)
        };
      }).sort((a, b) => b.ts - a.ts);
      rebuildSmartNotifs();
      if (cur === 'طلباتي') softRender();
    }, () => {});
  });
}

/* فحص العروض اللي المستخدم بعتها كمقدم خدمة */
function checkMySentOffers() {
  if (!db || !hasLiveAuth() || !MY.on) return;
  REQS.filter(r => !r.mine && r.rawStatus !== 'cancelled').slice(0, 25).forEach(r => {
    if (r._checkedSent) return;
    r._checkedSent = true;
    db.collection('requests').doc(r.id).collection('offers')
      .where('providerId', '==', user.uid).limit(1).get()
      .then(sn => {
        if (!sn.empty) {
          MY_SENT_OFFERS.add(r.id);
          r.sent = true;
          softRender();
        }
      }).catch(() => {});
  });
}

function rebuildReq() {
  const prevOffers = Object.fromEntries(REQS.map(r => [r.id, r.offers || []]));
  REQS = RAWR
    .filter(d => d.status !== 'deleted')
    .map(d => {
      const ts = tMillis(d.createdAt) || Date.now();
      return {
        id: d.id,
        ownerId: d.ownerId || '',
        t: d.title || '',
        d: d.description || '',
        c: Math.max(0, Math.min(5, d.category | 0)),
        sub: d.sub || '',
        loc: d.locText || ((d.city || '') + (d.gov ? ' · ' + d.gov : '')),
        gov: d.gov || '',
        city: d.city || '',
        bud: d.budget || 'مفتوحة',
        need: d.neededBy || 'في أقرب وقت',
        by: d.ownerName || 'مستخدم',
        ownerPhoto: d.ownerPhoto || '',
        ownerPreset: d.ownerPreset || '',
        ago: tAgo(d.createdAt),
        ts,
        rawStatus: d.status || 'new',
        st: STS[d.status] || 'جديد',
        acceptedProviderId: d.acceptedProviderId || '',
        completedProviderId: d.completedProviderId || '',
        clientDone: !!d.clientDone,
        providerDone: !!d.providerDone,
        offers: prevOffers[d.id] || [],
        imgs: Array.isArray(d.imgs) ? d.imgs : [],
        mine: !!(user && d.ownerId === user.uid),
        sent: MY_SENT_OFFERS.has(d.id),
        xy: d.lat != null && d.lng != null ? [d.lat, d.lng] : locXY(d.locText || '')
      };
    })
    .sort((a, b) => (reqStatusRank(a) - reqStatusRank(b)) || (b.ts - a.ts)); // الطلبات المفتوحة أولاً دائماً، والمكتملة في الأسفل حتى لا تتصدر أبداً
  syncMyRequestOffers();
  checkMySentOffers();
  softRender();
}

/* التحقق الصارم من وجود طلب خدمة مكتمل فعلياً بين العميل الحالي ومقدم الخدمة (شرط التقييم الموثّق) */
function getCompletedDealsWithProvider(targetUid: string) {
  if (!user || !user.uid || !targetUid || targetUid === user.uid) return [];
  return REQS.filter(r =>
    r.mine &&
    r.rawStatus === 'completed' &&
    (r.completedProviderId === targetUid ||
      (r.offers || []).some((o: any) => o.providerId === targetUid && o.s !== 2))
  );
}

function getAgreedDealWithProvider(targetUid: string) {
  if (!user || !user.uid || !targetUid || targetUid === user.uid) return null;
  return REQS.find(r =>
    r.mine &&
    r.rawStatus === 'accepted' &&
    (r.offers || []).some((o: any) => o.providerId === targetUid && o.s === 1)
  ) || REQS.find(r =>
    r.mine &&
    (r.rawStatus === 'accepted' || r.rawStatus === 'open' || r.rawStatus === 'new') &&
    (r.offers || []).some((o: any) => o.providerId === targetUid && o.s === 1)
  ) || null;
}

function rebuildReviews() {
  REVIEWS = RAWT.map(d => {
    const ts = tMillis(d.createdAt) || Date.now();
    return {
      id: d.id,
      providerId: d.providerId || '',
      customerId: d.customerId || '',
      requestId: d.requestId || '',
      by: d.customerName || 'عميل على وصلة',
      photo: d.customerPhoto || '',
      preset: d.customerPreset || '',
      stars: Math.max(1, Math.min(5, Math.round(Number(d.stars) || 5))),
      comment: d.comment || d.text || '',
      verifiedDeal: !!d.verifiedDeal || !!(d.requestId && !String(d.requestId).includes('_')),
      ts,
      ago: tAgo(d.createdAt)
    };
  }).sort((a, b) => b.ts - a.ts);
  rebuildProv();
  rebuildSmartNotifs();
}

function provStatsFromReviews(uid, fallbackAvg = 0, fallbackCount = 0) {
  const list = REVIEWS.filter(x => x.providerId === uid);
  if (!list.length) return { r: Number(fallbackAvg) || 0, rc: Number(fallbackCount) || 0, list };
  const sum = list.reduce((s, x) => s + x.stars, 0);
  return { r: sum / list.length, rc: list.length, list };
}

function rebuildProv() {
  PROV = RAWP
    .filter(d => !d.suspended)
    .map(d => {
      const st = provStatsFromReviews(d.id, d.ratingAvg, d.ratingCount);
      return {
        uid: d.id,
        n: d.name || 'مقدم خدمة',
        c: Math.max(0, Math.min(5, d.category | 0)),
        spec: d.specialty || '',
        loc: d.city || '',
        gov: d.gov || govOf(d.city || ''),
        bio: d.bio || '',
        r: st.r,
        rc: st.rc,
        y: Number(d.years) || 0,
        v: !!d.verified,
        ok: d.available !== false,
        photo: d.photoURL || '',
        preset: d.preset || '',
        xy: d.lat != null && d.lng != null ? [d.lat, d.lng] : xyOf(d.gov || govOf(d.city || ''), d.city || '')
      };
    });
  const mineP = user && RAWP.find(d => d.id === user.uid);
  if (mineP) {
    const st = provStatsFromReviews(user.uid, mineP.ratingAvg, mineP.ratingCount);
    MY = {
      on: true,
      n: mineP.name || '',
      c: mineP.category | 0,
      spec: mineP.specialty || '',
      gov: mineP.gov || '',
      city: mineP.city || '',
      bio: mineP.bio || '',
      y: Number(mineP.years) || 0,
      ok: mineP.available !== false,
      r: st.r,
      rc: st.rc
    };
    if (hasLiveAuth() && isIn()) persistSessionCache();
    checkMySentOffers();
  } else if (liveProvsReady || !user) {
    MY = { on: false };
    if (hasLiveAuth() && isIn()) persistSessionCache();
  }
  softRender();
}

function watchProvWorks(uid) {
  if (_worksUnsub) { try { _worksUnsub(); } catch (e) {} _worksUnsub = null; }
  if (!db || !uid) return;
  if (!PROV.find(x => x.uid === uid) && !EXTRA_PROV[uid]) {
    db.doc('providers/' + uid).get().then(doc => {
      if (doc.exists) {
        const d = doc.data();
        EXTRA_PROV[uid] = { id: doc.id, ...d };
        if (!RAWP.find(x => x.id === doc.id)) { RAWP.push(EXTRA_PROV[uid]); rebuildProv(); }
        else if (cur === 'ملف مقدم الخدمة') softRender();
      }
    }).catch(() => {});
  }
  try {
    _worksUnsub = db.collection('providers').doc(uid).collection('works')
      .orderBy('createdAt', 'desc').limit(12).onSnapshot(sn => {
        PROV_WORKS[uid] = sn.docs.map(d => ({ id: d.id, ...d.data() }));
        if (cur === 'ملف مقدم الخدمة' && curProvUid === uid) softRender();
      }, () => {});
  } catch (e) {}
}

/* ====== نظام علامات التحذير المجتمعية + بيانات الصفحة الشخصية لأي مستخدم ====== */
const WARN_REASONS = [
  'نصب أو تحايل مالي',
  'إخلال صريح بالاتفاق بعد التعامل',
  'سوء معاملة أو إساءة وتهديد',
  'بيانات وهمية أو انتحال صفة'
];

function rebuildWarnings() {
  const map: Record<string, Map<string, any>> = {};
  /* حماية ضد التزوير المحلي: لا نقبل من التخزين المحلي إلا علامة المستخدم المسجّل حالياً فقط، والباقي حصرياً من السيرفر */
  const ownLocal = (user && user.uid)
    ? LOCAL_WARNS.filter((w: any) => w && w.reporterId === user.uid)
    : [];
  const merged = [...RAWW, ...ownLocal];
  merged.forEach((w: any) => {
    const tId = String(w.targetId || '').trim();
    const rId = String(w.reporterId || '').trim();
    if (!tId || !rId || tId === rId) return;
    if (!map[tId]) map[tId] = new Map();
    /* كل شخص مختلف ليه علامة واحدة بس ضد نفس الشخص مهما حاول */
    if (!map[tId].has(rId)) {
      map[tId].set(rId, {
        id: w.id || (tId + '_' + rId),
        targetId: tId,
        reporterId: rId,
        reason: w.reason || WARN_REASONS[0],
        details: w.details || '',
        ts: tMillis(w.createdAt) || w.ts || Date.now()
      });
    }
  });
  WARNINGS_BY_TARGET = {};
  Object.keys(map).forEach(tId => {
    WARNINGS_BY_TARGET[tId] = Array.from(map[tId].values()).sort((a, b) => b.ts - a.ts);
  });
  softRender();
}

function getWarnList(uid) {
  return (uid && WARNINGS_BY_TARGET[uid]) ? WARNINGS_BY_TARGET[uid] : [];
}
function getWarnCount(uid) {
  return getWarnList(uid).length;
}
function hasMyWarn(uid) {
  if (!uid || !user || !user.uid) return false;
  return getWarnList(uid).some(w => w.reporterId === user.uid);
}
function warnPeopleTxt(n) {
  return t('warn_people_p', { n });
}
/* لا يظهر أي تحذير للناس إلا لو 3 أشخاص مختلفين تماماً أو أكتر حطوا علامة */
function warnTagHtml(uid) {
  const n = getWarnCount(uid);
  if (n < 3) return '';
  return `<span class="tag warn" title="${esc(t('warn_tag_title'))}">${ic('warn', 13)} ${esc(t('warn_tag_txt', { p: warnPeopleTxt(n) }))}</span>`;
}
function warnBannerHtml(uid) {
  const list = getWarnList(uid);
  const n = list.length;
  if (n < 3) {
    if (hasMyWarn(uid)) {
      return `<div class="ofr" style="background:var(--bg);border-style:solid;font-size:.82rem">
        <span><b>${esc(t('warn_saved_private_b'))}</b>${esc(t('warn_saved_private_s'))}</span>
      </div>`;
    }
    return '';
  }
  const reasons = [...new Set(list.map(x => x.reason).filter(Boolean))].slice(0, 3).map(r => translateReasonText(r));
  const rTxt = reasons.length ? t('warn_banner_reason', { reasons: reasons.join(' · ') }) : '';
  return `<div class="warn-banner" role="alert">
    <div class="warn-banner-head">${ic('warn', 20)} <span>${esc(t('warn_banner_h', { p: warnPeopleTxt(n) }))}</span></div>
    <p>${esc(t('warn_banner_p', { p: warnPeopleTxt(n), r: rTxt }))}</p>
  </div>`;
}

/* فحص إتمام الشغلانة وتأكيدها من الطرفين معاً على نفس الطلب (منع أي بلاغات كيدية من طرف واحد) */
function isProviderLinkedToReq(r: any, provUid: string) {
  if (!r || !provUid) return false;
  return r.completedProviderId === provUid ||
    r.acceptedProviderId === provUid ||
    (r.offers || []).some((o: any) => o.providerId === provUid && o.s === 1);
}

function getProviderAssignedJobs() {
  if (!user || !user.uid) return [];
  return REQS.filter(r => !r.mine && r.rawStatus !== 'cancelled' && isProviderLinkedToReq(r, user.uid));
}

function getMutualDealsWithUser(targetUid: string) {
  if (!user || !user.uid || !targetUid || targetUid === user.uid) {
    return { mutualCompleted: null, awaitingMyConfirm: null, awaitingOtherConfirm: null, activeDeal: null };
  }
  const myUid = user.uid;
  const shared = REQS.filter(r =>
    r.rawStatus !== 'cancelled' && (
      (r.ownerId === myUid && isProviderLinkedToReq(r, targetUid)) ||
      (r.ownerId === targetUid && isProviderLinkedToReq(r, myUid))
    )
  );
  const mutualCompleted = shared.find(r => r.rawStatus === 'completed' && r.clientDone && r.providerDone) || null;
  const awaitingMyConfirm = shared.find(r => {
    const iAmClient = r.ownerId === myUid;
    if (iAmClient) return !r.clientDone && (r.rawStatus === 'accepted' || r.rawStatus === 'completed' || !!r.acceptedProviderId || !!r.completedProviderId);
    return (r.rawStatus === 'completed' || r.rawStatus === 'accepted') && !r.providerDone;
  }) || null;
  const awaitingOtherConfirm = shared.find(r => {
    const iAmClient = r.ownerId === myUid;
    return (iAmClient && r.clientDone && !r.providerDone) || (!iAmClient && r.providerDone && !r.clientDone);
  }) || null;
  return { mutualCompleted, awaitingMyConfirm, awaitingOtherConfirm, activeDeal: shared[0] || null };
}

function mutualBadgeHtml(r: any) {
  if (!r || r.rawStatus === 'cancelled') return '';
  if (r.rawStatus === 'completed' && r.clientDone && r.providerDone) {
    return `<span class="tag mint">${ic('shieldCheck', 12)} ${esc(t('mutual_both_done'))}</span>`;
  }
  if (r.rawStatus === 'completed' && (r.completedProviderId || r.acceptedProviderId)) {
    return r.clientDone && !r.providerDone
      ? `<span class="tag sun">${ic('clock', 12)} ${esc(t('mutual_wait_prov'))}</span>`
      : '';
  }
  if (r.rawStatus === 'accepted' && r.providerDone && !r.clientDone) {
    return `<span class="tag sun">${ic('clock', 12)} ${esc(t('mutual_wait_you'))}</span>`;
  }
  return '';
}

function getInteractionProof(targetUid) {
  if (!user || !user.uid || !targetUid || targetUid === user.uid) return null;
  const deals = getMutualDealsWithUser(targetUid);
  if (deals.mutualCompleted) {
    return {
      type: 'mutual_req',
      id: deals.mutualCompleted.id,
      label: t('mutual_deal_lbl', { t: deals.mutualCompleted.t })
    };
  }
  return null;
}

function cachePerson(uid: string, info: any = {}) {
  if (!uid) return;
  const prev = PERSON_CACHE[uid] || {};
  PERSON_CACHE[uid] = {
    name: info.name || prev.name || '',
    photo: info.photo || prev.photo || '',
    preset: info.preset || prev.preset || '',
    loc: info.loc || prev.loc || ''
  };
}

function resolvePerson(uid) {
  const isMe = !!(user && uid === user.uid);
  const prov = PROV.find(x => x.uid === uid) || null;
  const reqs = REQS.filter(r => r.ownerId === uid && (isMe ? true : r.rawStatus !== 'cancelled'));
  const sampleReq = reqs[0] || REQS.find(r => r.ownerId === uid) || null;
  const chatObj = CHATS.find(c => c.uid === uid) || null;
  const revAsCust = REVIEWS.find(rv => rv.customerId === uid) || null;
  const cached = PERSON_CACHE[uid] || {};

  const name = isMe
    ? (MY.on && MY.n ? MY.n : myDisplayName())
    : (prov && prov.n) || (sampleReq && sampleReq.by) || (chatObj && chatObj.w) || (revAsCust && revAsCust.by) || cached.name || 'مستخدم على وصلة';
  const photo = isMe
    ? (profile.photo || (user && user.photoURL) || '')
    : (prov && prov.photo) || (sampleReq && sampleReq.ownerPhoto) || (chatObj && chatObj.photo) || (revAsCust && revAsCust.photo) || cached.photo || '';
  const preset = isMe
    ? (profile.avatar || '')
    : (prov && prov.preset) || (sampleReq && sampleReq.ownerPreset) || (revAsCust && revAsCust.preset) || cached.preset || '';
  const loc = isMe
    ? ((profile.city || '') + (profile.gov ? ' · ' + profile.gov : ''))
    : (prov ? (prov.loc + (prov.gov ? ' · ' + prov.gov : '')) : (sampleReq ? sampleReq.loc : (cached.loc || '')));

  return { uid, isMe, prov, reqs, name, photo, preset, loc };
}

/* تشغيل الاستماع اللحظي على Firebase Firestore */
let _liveStarted = false;
function startLive() {
  if (!db || _liveStarted) return;
  _liveStarted = true;
  rebuildWarnings();
  db.collection('requests').orderBy('createdAt', 'desc').limit(120).onSnapshot(
    sn => {
      liveReqsReady = true;
      RAWR = sn.docs.map(x => ({ id: x.id, ...x.data() }));
      rebuildReq();
      checkDeepLink();
    },
    err => {
      console.warn('requests listener:', err);
      liveReqsReady = true;
      softRender();
    }
  );
  db.collection('providers').limit(120).onSnapshot(
    sn => {
      liveProvsReady = true;
      RAWP = sn.docs.map(x => ({ id: x.id, ...x.data() }));
      rebuildProv();
      checkDeepLink();
    },
    err => {
      console.warn('providers listener:', err);
      liveProvsReady = true;
      softRender();
    }
  );
  db.collection('reviews').limit(300).onSnapshot(
    sn => {
      liveRevsReady = true;
      RAWT = sn.docs.map(x => ({ id: x.id, ...x.data() }));
      rebuildReviews();
    },
    err => {
      console.warn('reviews listener:', err);
      liveRevsReady = true;
      softRender();
    }
  );
  db.collection('warnings').limit(500).onSnapshot(
    sn => {
      RAWW = sn.docs.map(x => ({ id: x.id, ...x.data() }));
      rebuildWarnings();
    },
    () => {
      rebuildWarnings();
    }
  );
}

/* تجميع الإشعارات الحقيقية اللحظية (العروض الجديدة + الرسائل الواردة + التقييمات الموثّقة + تنبيهات السيرفر) بدون الحاجة لـ Cloud Functions */
function rebuildSmartNotifs() {
  if (!user || !user.uid) {
    NOTIFS = [];
    UNREAD = 0;
    syncDot();
    return;
  }
  const readSet = loadReadNotifs();
  const isViewingNotifs = cur === 'الإشعارات';
  const items: any[] = [];

  SERVER_NOTIFS.forEach(n => {
    const nid = 'srv_' + n.id;
    items.push({
      id: nid,
      rawId: n.id,
      isServer: true,
      kind: 'server',
      ico: 'bellring',
      bg: 'var(--peach)',
      txt: n.txt,
      sub: '',
      ts: n.ts || Date.now(),
      ago: n.ago || tAgo(n.ts),
      read: isViewingNotifs || !!n.read || readSet.has(nid)
    });
  });

  REQS.filter(r => r.mine).forEach(r => {
    (r.offers || []).forEach((o: any) => {
      if (o.providerId === user.uid) return;
      const nid = `off_${r.id}_${o.oid}`;
      const ts = o.ts || r.ts || Date.now();
      items.push({
        id: nid,
        kind: 'offer',
        reqId: r.id,
        ico: 'money',
        bg: 'var(--mint)',
        txt: t('notif_offer_t', { p: o.pr, n: o.p, t: r.t }),
        sub: o.msg ? cleanInput(o.msg, 90) : tNeed(o.when || 'في أقرب وقت'),
        ts,
        ago: tAgo(ts),
        read: isViewingNotifs || readSet.has(nid)
      });
    });
  });

  CHATS.forEach(c => {
    const msgs = Array.isArray(c.m) ? c.m : [];
    const lastIn = [...msgs].reverse().find(m => m && m[0] === 0);
    const hasIncoming = !!lastIn || (c.lastSender && c.lastSender !== user.uid && c.lastText);
    if (!hasIncoming) return;
    const msgKey = lastIn ? (lastIn[4] || lastIn[2] || String(msgs.length)) : (c.lastTime || 'last');
    const nid = `chat_${c.cid}_${msgKey}`;
    const preview = lastIn
      ? (lastIn[3] && !lastIn[1] ? t('notif_msg_img') : cleanInput(lastIn[1] || '', 90))
      : cleanInput(c.lastText || '', 90);
    const ts = c.updatedAtMs || Date.now();
    const unreadNow = (c.u || 0) > 0 && !readSet.has(nid) && !isViewingNotifs;
    items.push({
      id: nid,
      kind: 'chat',
      cid: c.cid,
      ico: 'mail',
      bg: 'var(--sky)',
      txt: (c.u || 0) > 1 ? t('notif_msg_multi', { c: c.u, n: c.w }) : t('notif_msg_one', { n: c.w }),
      sub: preview,
      ts,
      ago: lastIn ? (lastIn[2] || tAgo(ts)) : (c.lastTime || tAgo(ts)),
      read: !unreadNow
    });
  });

  REVIEWS.filter(rv => rv.providerId === user.uid && rv.customerId !== user.uid).forEach(rv => {
    const nid = `rev_${rv.id}`;
    const ts = rv.ts || Date.now();
    items.push({
      id: nid,
      kind: 'review',
      ico: 'star',
      bg: 'var(--sun)',
      txt: t('notif_rev_t', { s: rv.stars, n: rv.by }),
      sub: rv.comment ? cleanInput(rv.comment, 90) : t('notif_rev_s'),
      ts,
      ago: rv.ago || tAgo(ts),
      read: isViewingNotifs || readSet.has(nid)
    });
  });

  items.sort((a, b) => (b.ts || 0) - (a.ts || 0));
  if (isViewingNotifs && items.length) {
    let changed = false;
    items.forEach(it => {
      if (!readSet.has(it.id)) { readSet.add(it.id); changed = true; }
    });
    if (changed) saveReadNotifs(readSet);
  }
  NOTIFS = items.slice(0, 40);
  UNREAD = NOTIFS.filter(n => !n.read).length;
  drawNav();
  syncDot();
  if (cur === 'الإشعارات' || cur === 'المزيد') softRender();
}

function watchNotifs() {
  if (!db || !hasLiveAuth()) return;
  rebuildSmartNotifs();
  if (_notifUnsub) return;
  try {
    _notifUnsub = db.collection('notifications').doc(user.uid).collection('items')
      .orderBy('createdAt', 'desc').limit(40).onSnapshot(sn => {
        SERVER_NOTIFS = sn.docs.map(d => {
          const x = d.data();
          const ts = tMillis(x.createdAt) || Date.now();
          return { id: d.id, txt: x.title || x.body || 'إشعار جديد', ts, ago: tAgo(x.createdAt), read: !!x.read };
        });
        rebuildSmartNotifs();
      }, () => {
        rebuildSmartNotifs();
      });
  } catch (e) {}
}

/* ====== مكونات العرض والواجهات ====== */
const secH = (t, a = '') => `<div class="sech"><h5 class="sec">${t}</h5>${a}</div>`;
const lnk = (n, t) => `<button class="lnk" type="button" data-a="tab" data-n="${n}">${t} ${ic('chev', 12)}</button>`;
const chipBtn = (on, a, i, t) => `<button class="chip${on ? ' on' : ''}" type="button" data-a="${a}" data-i="${i}">${t}</button>`;
const locOK = (city, gov) => (!fC || city === fC) && (!fG || (gov || govOf(city)) === fG);
const locFilter = () => `<div style="margin-bottom:12px">${locBtn('fl')}</div>`;

const whoHtml = r => {
  const av = r.mine
    ? myAv(38)
    : avH(38, { name: r.by, photo: r.ownerPhoto, preset: r.ownerPreset, bg: (CATS[r.c] || CATS[0])[2] });
  const nm = r.mine ? myDisplayName() : r.by;
  const uid = r.mine ? ((user && user.uid) || r.ownerId || '') : (r.ownerId || '');
  const clickAttrs = uid
    ? `data-a="prof" data-uid="${esc(uid)}" data-n="${esc(nm)}" data-ph="${esc(r.ownerPhoto || '')}" data-pr="${esc(r.ownerPreset || '')}" data-loc="${esc(r.loc || '')}"`
    : '';
  return `<div class="who${uid ? ' who-link' : ''}" ${clickAttrs}>${av}<div><b>${esc(nm)}${r.mine ? ` <small style="display:inline;color:var(--muted)">${esc(t('your_req_tag'))}</small>` : ''}</b><small>${esc(tLocText(r.loc))} · ${esc(tAgo(r.ts))}</small></div></div>`;
};

const rImgs = (r: any) => {
  const valid = (r.imgs || []).map((d: any) => safeImgUrl(d)).filter(Boolean);
  return valid.length
    ? `<div class="rimgs">${valid.map((u: string) => `<img src="${esc(u)}" alt="" data-a="zoom">`).join('')}</div>`
    : '';
};

function visitorOfferBtnHtml(r, fullWidth = false) {
  const stStyle = fullWidth ? ' style="flex:1"' : '';
  if (r.rawStatus === 'completed') {
    return `<button class="btn ${fullWidth ? '' : 'sm '}done-state"${stStyle} type="button" disabled>${ic('check', 15)} ${esc(t('st_completed'))}</button>`;
  }
  if (r.rawStatus === 'accepted') {
    return `<button class="btn ${fullWidth ? '' : 'sm '}agreed-state"${stStyle} type="button" disabled>${ic('check', 15)} ${esc(t('st_accepted'))}</button>`;
  }
  return `<button class="btn ${fullWidth ? '' : 'sm '}${r.sent ? 'white' : 'mint'}"${stStyle} type="button" data-a="offer" data-i="${esc(r.id)}" ${r.sent ? 'disabled' : ''}>${r.sent ? esc(t('sent_offer_btn')) : esc(t('send_offer_btn'))}</button>`;
}

function reqCard(r) {
  const d = dist(r);
  const dt = !r.mine && d < 9000 ? `<span class="tag sky">${ic('pin', 12)} ${esc(distTxt(d))}</span>` : '';
  const stCls = r.rawStatus === 'cancelled' ? 'cancelled' : r.rawStatus === 'completed' ? 'mint' : 'st';
  const saved = SAVED_IDS.has(r.id);
  const wTag = warnTagHtml(r.ownerId);
  const ownerBtns = `
    ${r.rawStatus !== 'cancelled' && r.rawStatus !== 'completed' ? `<button class="btn sm mint" type="button" data-a="done" data-i="${esc(r.id)}">${ic('check', 14)} ${esc(t('mark_done_btn'))}</button>` : ''}
    <button class="btn sm white" type="button" data-a="editReq" data-i="${esc(r.id)}">${ic('edit', 14)} ${esc(t('edit_btn'))}</button>
    ${r.rawStatus !== 'cancelled' && r.rawStatus !== 'completed' ? `<button class="btn sm peach" type="button" data-a="cancelReq" data-i="${esc(r.id)}">${ic('ban', 14)} ${esc(t('cancel_btn'))}</button>` : ''}
    ${r.rawStatus === 'cancelled' ? `<button class="btn sm mint" type="button" data-a="reopenReq" data-i="${esc(r.id)}">${esc(t('reopen_btn'))}</button>` : ''}
    <button class="btn sm danger" type="button" data-a="delReq" data-i="${esc(r.id)}">${ic('trash', 14)} ${esc(t('del_btn'))}</button>
  `;
  const visitorBtns = `
    ${visitorOfferBtnHtml(r, false)}
    ${(!r.mine && user && isProviderLinkedToReq(r, user.uid) && !r.providerDone && (r.rawStatus === 'accepted' || r.rawStatus === 'completed'))
      ? `<button class="btn sm mint" type="button" data-a="provDone" data-i="${esc(r.id)}">${ic('shieldCheck', 14)} ${esc(t('confirm_job_btn'))}</button>`
      : ''}
    <button class="btn sm white" type="button" data-a="reqDet" data-i="${esc(r.id)}">${esc(t('details_btn'))}</button>
    ${r.ownerId && r.rawStatus !== 'completed' ? `<button class="btn sm white" type="button" data-a="chat" data-n="${esc(r.by)}" data-uid="${esc(r.ownerId)}">${esc(t('msg_him_btn'))}</button>` : ''}
  `;
  const trId = `req_${r.id}`;
  const trp = trPrep(trId, [r.t || '', r.d || '']);
  return `<article class="it${r.rawStatus === 'completed' ? ' is-done' : ''}">
    ${whoHtml(r)}
    <div class="meta">
      <span class="tag" style="background:${(CATS[r.c] || CATS[0])[2]}">${cic(r.c)} ${esc(tCat(r.c))}</span>
      ${r.sub ? `<span class="tag">${esc(tSub(r.c, r.sub))}</span>` : ''}
      <span class="tag ${stCls}">${esc(tStatus(r.rawStatus))}</span>
      ${r.need === 'مستعجل النهاردة' && r.rawStatus !== 'completed' && r.rawStatus !== 'cancelled' ? `<span class="tag coral">${esc(t('urgent_badge'))}</span>` : ''}
      ${r.offers && r.offers.length ? `<span class="tag lav">${esc(t('offers_cnt', { n: r.offers.length }))}</span>` : ''}
      ${mutualBadgeHtml(r)}
      ${dt}
      ${wTag}
    </div>
    <h4 class="tr-target" data-trid="${esc(trId)}" data-tridx="0" data-a="reqDet" data-i="${esc(r.id)}" style="cursor:pointer">${esc(trp.disp[0])}</h4>
    ${r.d ? `<p class="desc tr-target" data-trid="${esc(trId)}" data-tridx="1">${esc(trp.disp[1])}</p>` : ''}
    ${rImgs(r)}
    <div class="meta">
      <span>${ic('money', 15)} ${esc(t('budget_lbl'))} <b>${esc(tBud(r.bud))}</b></span>
      ${r.need ? `<span>· ${ic('clock', 14)} ${esc(tNeed(r.need))}</span>` : ''}
    </div>
    <div class="req-actions">
      ${r.mine ? ownerBtns : visitorBtns}
      ${trBtnHtml(trId, trp)}
      <button class="icon-act${saved ? ' saved' : ''}" type="button" data-a="saveReq" data-i="${esc(r.id)}" title="${esc(saved ? t('st_new') : t('share_h'))}">${ic('bookmark', 16, saved)}</button>
      <button class="icon-act" style="margin-inline-start:0" type="button" data-a="shareReq" data-i="${esc(r.id)}" title="${esc(t('share_h'))}">${ic('share', 16)}</button>
    </div>
  </article>`;
}

function provCard(p, idx) {
  const d = dist(p);
  const isMe = user && p.uid === user.uid;
  const wTag = warnTagHtml(p.uid);
  const trId = `prov_${p.uid}`;
  const trp = trPrep(trId, [p.spec || '', p.bio || '']);
  const roleDisp = trp.disp[0] ? `${trp.disp[0]} · ${tCat(p.c)}` : tCat(p.c);
  return `<article class="it">
    <div class="who who-link" data-a="prof" data-uid="${esc(p.uid)}" data-n="${esc(p.n)}" data-ph="${esc(p.photo || '')}" data-pr="${esc(p.preset || '')}" data-i="${idx}">
      ${avH(46, { name: p.n, photo: p.photo, preset: p.preset, bg: (CATS[p.c] || CATS[0])[2] })}
      <div>
        <h4>${esc(p.n)} ${p.v ? `<span style="color:#12806E">${ic('seal', 16)}</span>` : ''}</h4>
        <small>${cic(p.c)} ${p.spec ? `<span class="tr-target" data-trid="${esc(trId)}" data-tridx="0">${esc(trp.disp[0])}</span> · ${esc(tCat(p.c))}` : esc(roleDisp)}</small>
      </div>
    </div>
    ${p.bio ? `<p class="desc tr-target" data-trid="${esc(trId)}" data-tridx="1">${esc(trp.disp[1])}</p>` : ''}
    <div class="meta">
      ${p.rc > 0 ? `<span class="tag st">${ic('star', 12, true)} ${p.r.toFixed(1)} (${p.rc})</span>` : `<span class="tag">${esc(t('new_badge'))}</span>`}
      <span class="tag">${ic('pin', 12)} ${esc(tLocText(p.loc))}${d < 9000 ? ' · ' + esc(kmTxt(d)) : ''}</span>
      ${p.y > 0 ? `<span class="tag">${esc(t('years_exp', { n: p.y }))}</span>` : ''}
      <span class="tag ${p.ok ? 'mint' : 'coral'}">${p.ok ? esc(t('avail_now')) : esc(t('busy_now'))}</span>
      ${wTag}
    </div>
    <div class="req-actions">
      <button class="btn sm mint" type="button" data-a="prof" data-uid="${esc(p.uid)}" data-n="${esc(p.n)}" data-i="${idx}">${ic('user', 14)} ${esc(t('pro_card_btn'))}</button>
      ${isMe
        ? `<button class="btn sm white" type="button" data-a="bp">${esc(t('edit_btn'))}</button>`
        : `<button class="btn sm white" type="button" data-a="chat" data-n="${esc(p.n)}" data-uid="${esc(p.uid)}">${esc(t('msg_him_btn'))}</button>`}
      ${trBtnHtml(trId, trp)}
    </div>
  </article>`;
}

function offerRow(r, o) {
  const many = r.offers.length > 1;
  const minP = many ? Math.min(...r.offers.filter(x => x.pr > 0).map(x => x.pr)) : 0;
  const low = many && o.pr > 0 && o.pr === minP;
  const pLive = o.providerId && PROV.find(x => x.uid === o.providerId);
  const rVal = pLive ? pLive.r : o.r;
  const rcVal = pLive ? pLive.rc : 0;
  const wTag = warnTagHtml(o.providerId);
  const profBtn = o.providerId
    ? `<button class="btn sm white" type="button" data-a="prof" data-uid="${esc(o.providerId)}" data-n="${esc(o.p)}" data-ph="${esc(o.photo || '')}" data-pr="${esc(o.preset || '')}">${ic('user', 13)} ${esc(t('pro_his_page'))}</button>`
    : '';
  const chatBtn = o.providerId
    ? `<button class="btn sm white" type="button" data-a="chat" data-n="${esc(o.p)}" data-uid="${esc(o.providerId)}">${esc(t('msg_him_btn'))}</button>`
    : '';
  return `<div class="ofr" style="opacity:${o.s === 2 ? 0.5 : 1}">
    <div class="${o.providerId ? 'who-link' : ''}" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center" ${o.providerId ? `data-a="prof" data-uid="${esc(o.providerId)}" data-n="${esc(o.p)}" data-ph="${esc(o.photo || '')}" data-pr="${esc(o.preset || '')}"` : ''}>
      ${avH(30, { name: o.p, photo: o.photo, preset: o.preset })}
      <b>${esc(o.p)}</b>
      ${rVal > 0 ? `<span class="tag st">${ic('star', 12, true)} ${rVal.toFixed(1)}${rcVal ? ` (${rcVal})` : ''}</span>` : ''}
      ${low ? `<span class="tag mint">${esc(t('lowest_price'))}</span>` : ''}
      ${wTag}
    </div>
    <div class="meta"><span>${ic('money', 14)} ${o.s === 1 && o.pr > 0 ? cpSpoilerHtml('...', 4, `${o.pr} ${t('egp_short')}`) : `<b>${o.pr} ${esc(t('egp_short'))}</b>`}</span><span>· ${ic('clock', 13)} ${esc(tNeed(o.when))}</span></div>
    ${(() => {
      if (!o.msg) return '';
      const oidKey = `ofr_${r.id}_${o.oid || o.providerId || '0'}`;
      const trp = trPrep(oidKey, [o.msg]);
      return `<div class="tr-wrap"><p class="tr-target" data-trid="${esc(oidKey)}" data-tridx="0" style="font-size:.86rem;color:#3E3832">${esc(trp.disp[0])}</p>${trBtnHtml(oidKey, trp)}</div>`;
    })()}
    ${o.s === 0 && (r.rawStatus === 'new' || r.rawStatus === 'open')
      ? `<div class="meta"><button class="btn sm mint" type="button" data-a="acc" data-i="${esc(r.id)}" data-oid="${esc(o.oid)}">${esc(t('accept_offer'))}</button><button class="btn sm white" type="button" data-a="rej" data-i="${esc(r.id)}" data-oid="${esc(o.oid)}">${esc(t('reject_offer'))}</button>${profBtn}${chatBtn}</div>`
      : o.s === 1
      ? `<div class="meta"><span class="tag mint">${esc(t('offer_agreed_tag'))}</span>${profBtn}${chatBtn}</div>`
      : `<div class="meta"><span class="tag cancelled">${esc(t('offer_rejected_tag'))}</span>${profBtn}${chatBtn}</div>`}
  </div>`;
}

/* ====== الصفحات الرئيسية ====== */
const VIEWS: Record<string, () => string> = {};

/* 1. الرئيسية: الأقسام + مقدمو خدمة قريبون منك (تحميل تدريجي) + آخر اللي اتنشر حواليك (من الأحدث للأقدم + تحميل تدريجي بشيمر فضي) */
VIEWS['الرئيسية'] = () => {
  const firstName = isIn() ? profile.first : (user && user.displayName ? user.displayName.split(' ')[0] : t('hero_guest_name'));
  const activeReqs = REQS.filter(r => r.rawStatus !== 'cancelled' && (homeCatF < 0 || r.c === homeCatF));
  const shownReqs = activeReqs.slice(0, homeReqLim);
  const moreReqs = activeReqs.length > homeReqLim;

  const nearProvs = byNear(PROV.filter(p => p.ok));
  const shownProvs = nearProvs.slice(0, homeProvLim);
  const moreProvs = nearProvs.length > homeProvLim;

  return `
    <div class="hh">
      <div class="hh-txt">
        <small>${esc(t('hero_sub'))}</small>
        <h2>${esc(t('hero_hi', { name: firstName }))}</h2>
        <div class="hh-actions">
          <button class="btn sm coral" type="button" data-a="nw">${ic('plus', 15)} ${esc(t('post_free'))}</button>
          ${MY.on ? '' : `<button class="btn sm white" type="button" data-a="bp">${ic('seal', 15)} ${esc(t('work_pro'))}</button>`}
        </div>
      </div>
      <div class="hh-art">${bear(76, 'orange')}</div>
    </div>

    <div class="hero2">
      <input id="hs" placeholder="${esc(t('search_home_ph'))}" autocomplete="off">
      <button class="btn coral" type="button" data-a="search">${ic('search', 18)} ${esc(t('search_btn'))}</button>
    </div>

    <div class="radar-strip">
      <div class="radar-stats">
        <span class="r-live-dot"></span>
        <span><b>${activeReqs.length}</b> ${esc(t('req_avail_lbl'))}</span>
        <span class="r-sep">·</span>
        <span><b>${nearProvs.length}</b> ${esc(t('pro_avail_lbl'))}</span>
      </div>
      <div class="radar-tools">
        <button class="btn sm white" type="button" data-a="openRadar">${ic('radar', 14)} ${esc(t('radar_btn'))}</button>
        <button class="btn sm white" type="button" data-a="openEstimator">${ic('calc', 14)} ${esc(t('calc_btn'))}</button>
        ${activeReqs.length ? `<button class="btn sm sun" type="button" data-a="nearestJump">${ic('lightning', 14)} ${esc(t('nearest_btn'))}</button>` : ''}
      </div>
    </div>

    ${secH(t('cats_sec'))}
    <div class="cats">
      ${CATS.map((c, i) => `<button class="cat" type="button" style="--c:${c[2]}" data-a="cat" data-i="${i}"><span>${ic(c[1], 24)}</span>${esc(tCat(i))}</button>`).join('')}
    </div>

    ${secH(t('near_provs_sec'), lnk('مقدمو الخدمة', t('all_provs_lnk')))}
    ${!liveProvsReady
      ? `<div class="hs">${provHorizSkels(4)}</div>`
      : nearProvs.length
      ? `<div class="hs" id="home-prov-hs">
          ${shownProvs.map(p => `<button class="pc" type="button" data-a="prof" data-uid="${esc(p.uid)}">
            ${avH(50, { name: p.n, photo: p.photo, preset: p.preset, bg: (CATS[p.c] || CATS[0])[2] })}
            <b>${esc(p.n)}</b>
            <small>${esc(p.spec || tCat(p.c))}</small>
            ${p.rc > 0 ? `<span class="tag st">${ic('star', 11)} ${p.r.toFixed(1)}</span>` : `<span class="tag mint">${esc(t('avail_tag'))}</span>`}
            ${dist(p) < 9000 ? `<small>${esc(kmTxt(dist(p)))}</small>` : `<small>${esc(tLocText(p.loc))}</small>`}
          </button>`).join('')}
          ${moreProvs ? `<div id="home-prov-more" style="display:flex;gap:10px;min-width:16px;align-items:stretch"></div>` : ''}
        </div>`
      : `<div class="ofr" style="flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap">
          <span>${esc(t('no_near_provs'))}</span>
          <button class="btn sm mint" type="button" data-a="bp">${esc(t('reg_pro_btn'))}</button>
        </div>`}

    ${secH(t('latest_reqs_sec'), lnk('طلبات قريبة', t('closest_to_u')))}
    <div class="fq">
      ${chipBtn(homeCatF < 0, 'hcat', -1, t('all_reqs_chip'))}
      ${CATS.map((_, i) => chipBtn(homeCatF === i, 'hcat', i, cic(i) + ' ' + tCat(i))).join('')}
    </div>
    ${!liveReqsReady
      ? `<div class="list">${reqSkels(4)}</div>`
      : shownReqs.length
      ? `<div class="list" id="home-req-list">
          ${shownReqs.map(reqCard).join('')}
          ${moreReqs ? `<div class="feed-more" id="home-req-more"></div>` : ''}
        </div>`
      : `<div class="empty2">
          ${bear(76, 'mint')}
          <h3>${esc(t('no_reqs_here'))}</h3>
          <p>${esc(t('be_first_req'))}</p>
          <button class="btn coral" type="button" data-a="nw">${ic('plus', 16)} ${esc(t('post_first_req'))}</button>
        </div>`}
  `;
};

/* 2. طلبات قريبة: الطلبات المفتوحة الأقرب أولاً (والمكتملة لا تظهر في التوب وان أبداً) + تحميل تدريجي */
VIEWS['طلبات قريبة'] = () => {
  const list = byNearReqs(REQS.filter(r => r.rawStatus !== 'cancelled' && locOK(r.city, r.gov)));
  const shown = list.slice(0, nearReqLim);
  const more = list.length > nearReqLim;
  return `
    ${!MY.on ? `<div class="ofr" style="margin-bottom:12px;background:var(--sun);border-style:solid;flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <span><b>${esc(t('near_pro_banner_b'))}</b> ${esc(t('near_pro_banner_s'))}</span>
      <button class="btn sm white" type="button" data-a="bp">${esc(t('reg_pro_btn'))}</button>
    </div>` : ''}
    ${locFilter()}
    ${!liveReqsReady
      ? `<div class="list">${reqSkels(4)}</div>`
      : shown.length
      ? `<div class="list">${shown.map(reqCard).join('')}${more ? `<div class="feed-more" id="near-req-more"></div>` : ''}</div>`
      : `<div class="empty2">
          ${bear(72, 'sun')}
          <h3>${esc(t('near_empty_h'))}</h3>
          <p>${esc(t('near_empty_p'))}</p>
          ${(fG || fC) ? `<button class="btn sm white" type="button" data-a="clr">${esc(t('clear_loc_filter'))}</button>` : ''}
        </div>`}
  `;
};

/* 3. طلباتي: مدمجة مباشرة في الموقع من غير حاويات + تعديل وإلغاء ومسح كامل + تأكيد الطرفين للشغلانات */
VIEWS['طلباتي'] = () => {
  if (!isIn()) return gatePanel(t('gate_req_title'), t('mine_empty_p'));
  const allMine = REQS.filter(r => r.mine);
  const myJobs = getProviderAssignedJobs();
  const pendingJobConfirm = myJobs.filter(r => !r.providerDone);
  const showingJobs = mineTab === 'jobs';
  const filtered = showingJobs
    ? myJobs
    : allMine.filter(r => {
        if (mineTab === 'active') return r.rawStatus === 'new' || r.rawStatus === 'open';
        if (mineTab === 'agreed') return r.rawStatus === 'accepted';
        if (mineTab === 'done') return r.rawStatus === 'completed';
        if (mineTab === 'cancelled') return r.rawStatus === 'cancelled';
        return true;
      });

  return `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
      <div class="fq" style="margin:0;flex:1">
        ${chipBtn(mineTab === 'all', 'mtab', 'all', t('mine_all', { n: allMine.length }))}
        ${chipBtn(mineTab === 'active', 'mtab', 'active', t('mine_active'))}
        ${chipBtn(mineTab === 'agreed', 'mtab', 'agreed', t('mine_agreed'))}
        ${chipBtn(mineTab === 'done', 'mtab', 'done', t('mine_done'))}
        ${chipBtn(mineTab === 'cancelled', 'mtab', 'cancelled', t('mine_cancelled'))}
        ${(MY.on || myJobs.length) ? chipBtn(mineTab === 'jobs', 'mtab', 'jobs', t('mine_jobs', { n: myJobs.length })) : ''}
      </div>
      <button class="btn sm coral" type="button" data-a="nw">${ic('plus', 15)} ${esc(t('mine_new_btn'))}</button>
    </div>
    ${pendingJobConfirm.length && !showingJobs ? `
      <div class="ofr" style="margin-bottom:12px;background:var(--mint-soft);border-style:solid">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;width:100%">
          <span>${ic('shieldCheck', 16)} <b>${pendingJobConfirm.length}</b> ${esc(t('confirm_job_btn'))}</span>
          <button class="btn sm mint" type="button" data-a="mtab" data-i="jobs">${esc(t('confirm_job_btn'))}</button>
        </div>
      </div>
    ` : ''}
    ${!liveReqsReady
      ? `<div class="list single">${reqSkels(2)}</div>`
      : showingJobs
      ? (filtered.length
          ? `<div class="list single">${filtered.map(reqCard).join('')}</div>`
          : `<div class="empty2">${bear(70, 'mint')}<h3>${esc(t('mine_empty_h1'))}</h3><p>${esc(t('mine_empty_p'))}</p></div>`)
      : filtered.length
      ? `<div class="list single">${filtered.map(r => {
          const stCls = r.rawStatus === 'cancelled' ? 'cancelled' : r.rawStatus === 'completed' ? 'mint' : 'st';
          const myReqTrId = `myreq_${r.id}`;
          const trp = trPrep(myReqTrId, [r.t || '', r.d || '']);
          return `<article class="it${r.rawStatus === 'completed' ? ' is-done' : ''}">
            <div class="meta">
              <span class="tag ${stCls}">${esc(tStatus(r.rawStatus))}</span>
              ${mutualBadgeHtml(r)}
              <span class="tag" style="background:${(CATS[r.c] || CATS[0])[2]}">${cic(r.c)} ${esc(tCat(r.c))}</span>
              ${r.sub ? `<span class="tag">${esc(tSub(r.c, r.sub))}</span>` : ''}
              <span class="tag lav">${esc(t('offers_cnt', { n: r.offers.length }))}</span>
              <small style="margin-inline-start:auto">${esc(tAgo(r.ts))}</small>
            </div>
            <h4 class="tr-target" data-trid="${esc(myReqTrId)}" data-tridx="0">${esc(trp.disp[0])}</h4>
            ${r.d ? `<p class="desc tr-target" data-trid="${esc(myReqTrId)}" data-tridx="1" style="-webkit-line-clamp:6">${esc(trp.disp[1])}</p>` : ''}
            ${trp.show ? `<div style="display:flex;justify-content:flex-end;margin-top:2px">${trBtnHtml(myReqTrId, trp)}</div>` : ''}
            ${rImgs(r)}
            <div class="meta">
              <span>${ic('pin', 14)} ${esc(tLocText(r.loc))}</span>
              <span>· ${ic('money', 14)} ${esc(tBud(r.bud))}</span>
              ${r.need ? `<span>· ${ic('clock', 13)} ${esc(tNeed(r.need))}</span>` : ''}
            </div>
            ${r.offers.length
              ? (() => {
                  const lim = OFFER_LIM[r.id] || 3;
                  const visOffers = r.offers.slice(0, lim);
                  const rem = r.offers.length - visOffers.length;
                  const nextStep = Math.min(3, rem);
                  return `<div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
                      <b style="font-size:.86rem">${esc(t('mine_offers_hdr', { vis: visOffers.length, tot: r.offers.length }))}</b>
                      ${r.offers.length >= 2 ? `<button class="btn sm sun" type="button" data-a="compareOffers" data-i="${esc(r.id)}">${ic('lightning', 14)} ${esc(t('compare_smart'))}</button>` : ''}
                    </div>
                    ${visOffers.map(o => offerRow(r, o)).join('')}
                    ${rem > 0 ? `<button class="btn sm sun more-ofrs-btn" type="button" data-a="moreOffers" data-i="${esc(r.id)}">${esc(t('more_ofrs_fmt', { next: nextStep, rem }))}</button>` : ''}
                    ${rem <= 0 && r.offers.length > 3 ? `<button class="btn sm white more-ofrs-btn" type="button" data-a="lessOffers" data-i="${esc(r.id)}">${esc(t('less_ofrs_btn'))}</button>` : ''}
                  </div>`;
                })()
              : ''}
            <div class="req-actions">
              ${r.rawStatus !== 'completed' && r.rawStatus !== 'cancelled' ? `<button class="btn sm mint" type="button" data-a="done" data-i="${esc(r.id)}">${ic('check', 15)} ${esc(t('mark_done_btn'))}</button>` : ''}
              <button class="btn sm white" type="button" data-a="editReq" data-i="${esc(r.id)}">${ic('edit', 14)} ${esc(t('edit_btn'))}</button>
              ${r.rawStatus !== 'cancelled' && r.rawStatus !== 'completed' ? `<button class="btn sm peach" type="button" data-a="cancelReq" data-i="${esc(r.id)}">${ic('ban', 14)} ${esc(t('cancel_req_btn'))}</button>` : ''}
              ${r.rawStatus === 'cancelled' ? `<button class="btn sm mint" type="button" data-a="reopenReq" data-i="${esc(r.id)}">${esc(t('reopen_req_btn'))}</button>` : ''}
              <button class="btn sm danger" type="button" data-a="delReq" data-i="${esc(r.id)}">${ic('trash', 14)} ${esc(t('del_forever_btn'))}</button>
              <button class="icon-act" type="button" data-a="shareReq" data-i="${esc(r.id)}" title="${esc(t('share_h'))}">${ic('share', 16)}</button>
            </div>
          </article>`;
        }).join('')}</div>`
      : `<div class="empty2">
          ${bear(76, 'lav')}
          <h3>${allMine.length ? esc(t('mine_empty_h1')) : esc(t('mine_empty_h0'))}</h3>
          <p>${esc(t('mine_empty_p'))}</p>
          <button class="btn coral" type="button" data-a="nw">${ic('plus', 16)} ${esc(t('post_free'))}</button>
        </div>`}
  `;
};

/* 4. مقدمو الخدمة: مرتبين بالأقرب مع تحميل تدريجي وشيمر رمادي فضي */
function provResultsHtml() {
  const q = AN(qS);
  const list = byNear(PROV).filter(p =>
    (catF < 0 || p.c === catF) &&
    (!q || AN(p.n + ' ' + (p.spec || '') + ' ' + tCat(p.c) + ' ' + (p.bio || '')).includes(q)) &&
    locOK(p.loc, p.gov)
  );
  const shown = list.slice(0, provPageLim);
  const more = list.length > provPageLim;
  if (!liveProvsReady) return `<div class="list">${reqSkels(4)}</div>`;
  if (shown.length) return `<div class="list" id="prov-page-list">${shown.map((p, idx) => provCard(p, idx)).join('')}${more ? `<div class="feed-more" id="prov-page-more"></div>` : ''}</div>`;
  return `<div class="empty2">
    ${bear(72, 'sky')}
    <h3>${esc(t('near_empty_h'))}</h3>
    <p>${esc(t('no_near_provs'))}</p>
    <div class="meta">
      ${(catF >= 0 || fG || fC || qS) ? `<button class="btn sm white" type="button" data-a="clr">${esc(t('clear_filters'))}</button>` : ''}
      <button class="btn sm mint" type="button" data-a="bp">${esc(t('reg_pro_btn'))}</button>
    </div>
  </div>`;
}

VIEWS['مقدمو الخدمة'] = () => `
  <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px">
    <span style="font-size:.86rem;color:var(--muted)">${esc(t('pro_sort_note'))}</span>
    <div class="meta">
      ${MY.on ? `<button class="btn sm ${MY.ok !== false ? 'mint' : 'peach'}" type="button" data-a="toggleAvail">${ic('lightning', 14)} ${MY.ok !== false ? esc(t('my_stat_avail')) : esc(t('my_stat_busy'))}</button>` : ''}
      ${MY.on ? `<button class="btn sm" type="button" data-a="myProf">${ic('star', 14)} ${esc(t('my_page_revs'))}</button>` : ''}
      <button class="btn sm ${MY.on ? 'white' : 'mint'}" type="button" data-a="bp">${MY.on ? esc(t('edit_my_svc')) : esc(t('plus_reg_pro'))}</button>
    </div>
  </div>
  <div class="hero2" style="margin-bottom:12px">
    <input id="ps-q" value="${esc(qS)}" placeholder="${esc(t('pro_search_ph'))}" autocomplete="off">
  </div>
  <div class="fq">
    ${chipBtn(catF < 0, 'pf', -1, t('all_specs_chip'))}
    ${CATS.map((_, i) => chipBtn(catF === i, 'pf', i, cic(i) + ' ' + tCat(i))).join('')}
  </div>
  ${locFilter()}
  <div id="prov-res-wrap">${provResultsHtml()}</div>
`;

const STAR_LABELS_REF = () => trStarLabels();
function starPickerHtml(act, val) {
  const lbls = STAR_LABELS_REF();
  return `<div class="star-pick">
    ${[1, 2, 3, 4, 5].map(n => `<button type="button" class="star-btn${n <= val ? ' on' : ''}" data-a="${act}" data-i="${n}" aria-label="${n} ★">${ic('star', 22, true)}</button>`).join('')}
    <span class="tag st" style="margin-inline-start:4px">${lbls[val] || ''}</span>
  </div>`;
}

/* 4-ب. الصفحة الشخصية الموحدة لأي مستخدم (مقدم خدمة أو عميل صاحب طلبات — معاملات + تقييمات + علامة تحذير) */
VIEWS['ملف مقدم الخدمة'] = () => {
  const uid = curProvUid;
  if (!uid) {
    return `<div class="empty2">
      ${bear(72, 'lav')}
      <h3>${esc(t('pro_card_btn'))}</h3>
      <button class="btn white" type="button" data-a="tab" data-n="الرئيسية">${esc(tView('الرئيسية'))}</button>
    </div>`;
  }
  const person = resolvePerson(uid);
  const p = person.prov;
  const isMe = person.isMe;
  const userReqs = person.reqs;
  const completedReqs = userReqs.filter(r => r.rawStatus === 'completed').length;
  const agreedReqs = userReqs.filter(r => r.rawStatus === 'accepted').length;
  const writtenRevs = REVIEWS.filter(x => x.customerId === uid);
  const alreadyWarned = hasMyWarn(uid);

  if (!p && !userReqs.length && !writtenRevs.length && !PERSON_CACHE[uid] && (!liveProvsReady || !liveReqsReady)) {
    return `<div class="prov-page">${reqSkels(2)}</div>`;
  }

  const catInfo = p ? (CATS[p.c] || CATS[0]) : null;
  const catTitle = p ? tCat(p.c) : '';
  const coverBg = catInfo ? catInfo[2] : 'var(--sky)';
  const d = p ? dist(p) : 99999;
  const pRevs = p ? REVIEWS.filter(x => x.providerId === uid) : [];
  const totalRevs = pRevs.length;
  const avgVal = p ? (totalRevs ? (pRevs.reduce((s, x) => s + x.stars, 0) / totalRevs) : p.r) : 0;
  const shownCount = p ? (totalRevs || p.rc) : 0;
  const works = p ? (PROV_WORKS[uid] || []) : [];
  const verifiedProvDeals = pRevs.filter(x => x.verifiedDeal).length;

  const bioTrId = `pvbio_${uid}`;
  const bioTrp = p ? trPrep(bioTrId, [p.bio || '', p.spec || '']) : { show: false, on: false, disp: ['', ''] };
  const roleLabel = p
    ? `${cic(p.c)} ${p.spec ? `<span class="tr-target" data-trid="${esc(bioTrId)}" data-tridx="1">${esc(bioTrp.disp[1])}</span> (${esc(catTitle)})` : esc(catTitle)}`
    : `${ic('user', 13)} ${esc(tView('ملف مقدم الخدمة'))}`;

  return `<div class="prov-page">
    <div class="prov-cover" style="background:${coverBg}">
      <span class="tag" style="background:var(--paper)">${roleLabel}</span>
      <button class="btn sm white" type="button" data-a="shareProv" data-uid="${esc(uid)}">${ic('share', 14)} ${esc(t('share_page_btn'))}</button>
    </div>

    <div class="prov-hero">
      <div class="ring" style="background:var(--paper)">${avH(90, { name: person.name, photo: person.photo, preset: person.preset, bg: coverBg })}</div>
      <h2>${esc(person.name)} ${p && p.v ? `<span style="color:#12806E">${ic('seal', 20)}</span>` : ''}</h2>
      <div class="meta" style="justify-content:center">
        ${p ? `<span class="tag ${p.ok ? 'mint' : 'coral'}">${p.ok ? esc(t('avail_now')) : esc(t('busy_now'))}</span>` : `<span class="tag lav">${esc(tView('حسابي'))}</span>`}
        ${person.loc ? `<span class="tag">${ic('pin', 12)} ${esc(tLocText(person.loc))}${d < 9000 ? ' (' + esc(kmTxt(d)) + ')' : ''}</span>` : ''}
        ${p && !p.bio && bioTrp.show ? trBtnHtml(bioTrId, bioTrp) : ''}
      </div>
      <div class="meta" style="justify-content:center;margin-top:4px">
        ${isMe
          ? `${p ? `<button class="btn sm mint" type="button" data-a="bp">${ic('edit', 14)} ${esc(t('edit_my_svc'))}</button>
                    <button class="btn sm" type="button" data-a="addWork">${ic('camera', 15)} ${esc(t('add_work_btn'))}</button>`
                 : `<button class="btn sm mint" type="button" data-a="edit">${ic('edit', 14)} ${esc(t('acc_edit_row'))}</button>
                    <button class="btn sm white" type="button" data-a="bp">${ic('seal', 14)} ${esc(t('reg_pro_btn'))}</button>`}`
          : `<button class="btn mint" type="button" data-a="chat" data-n="${esc(person.name)}" data-uid="${esc(uid)}">${ic('mail', 17)} ${esc(t('msg_him_btn'))}</button>
             <button class="btn sm ${alreadyWarned ? 'white' : 'peach'}" type="button" data-a="warnUser" data-uid="${esc(uid)}" data-n="${esc(person.name)}">${ic('warn', 15)} ${alreadyWarned ? esc(t('warn_done_btn')) : esc(t('warn_btn'))}</button>`}
      </div>
    </div>

    ${warnBannerHtml(uid)}

    ${(() => {
      const wc = getWarnCount(uid);
      const rawScore = 52 + (p && p.v ? 18 : 0) + Math.min(18, (completedReqs + verifiedProvDeals) * 4) + (shownCount > 0 ? Math.round((avgVal / 5) * 12) : 4) - (wc >= 3 ? Math.min(45, wc * 12) : 0);
      const score = Math.max(15, Math.min(99, rawScore));
      const tone = score >= 82 ? 'var(--mint)' : score >= 58 ? 'var(--sun)' : 'var(--coral)';
      return `<div class="trust-meter">
        <div class="tm-top"><span>${ic('shieldCheck', 16)} ${esc(t('trust_meter_h'))}</span><b>${score}%</b></div>
        <div class="tm-bar"><i style="width:${score}%;background:${tone}"></i></div>
        <small>${esc(t('trust_deals_c', { n: completedReqs + verifiedProvDeals }))} · ${wc >= 3 ? `(${wc})` : esc(t('trust_clean'))}</small>
        ${(isMe || (p && p.v)) ? `<div class="tm-code"><span>ID:</span>${cpSpoilerHtml('ID', 4, 'WSL-' + uid.slice(0, 6).toUpperCase(), { cls: 'ltr' })}</div>` : ''}
      </div>`;
    })()}

    ${p ? `
      <div class="stats">
        <div><b>${shownCount > 0 ? avgVal.toFixed(1) + ' ★' : t('new_badge')}</b><small>${esc(t('acc_rate'))} (${shownCount})</small></div>
        <div><b>${completedReqs + verifiedProvDeals + userReqs.length}</b><small>${esc(t('acc_reqs'))}</small></div>
        <div><b>${p.y > 0 ? t('years_exp', { n: p.y }) : t('avail_tag')}</b><small>${esc(catTitle)}</small></div>
      </div>
      ${p.bio ? `<div class="prov-bio-box"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px"><b style="font-size:.86rem;color:var(--muted)">${esc(t('bio_sec_h'))}</b>${trBtnHtml(bioTrId, bioTrp)}</div><p class="tr-target" data-trid="${esc(bioTrId)}" data-tridx="0">${esc(bioTrp.disp[0])}</p></div>` : ''}
    ` : `
      <div class="stats">
        <div><b>${userReqs.length}</b><small>${esc(t('acc_reqs'))}</small></div>
        <div><b>${completedReqs + agreedReqs}</b><small>${esc(t('mine_done'))}</small></div>
        <div><b>${writtenRevs.length}</b><small>${esc(t('acc_rate'))}</small></div>
      </div>
    `}

    ${(p && (works.length || isMe)) ? `
      ${secH(t('works_sec_h'), isMe ? `<button class="lnk" type="button" data-a="addWork">+ ${esc(t('add_photo_tile'))}</button>` : '')}
      ${works.length ? `<div class="works-grid">
        ${works.map((w: any) => {
          const safeWk = safeImgUrl(w.img);
          if (!safeWk) return '';
          const wTrId = `work_${w.id}`;
          const wTrp = w.title ? trPrep(wTrId, [w.title]) : { show: false, on: false, disp: [''] };
          return `<div class="work-item">
          <img src="${esc(safeWk)}" alt="" data-a="zoom">
          ${w.title ? `<span class="tr-target" data-trid="${esc(wTrId)}" data-tridx="0">${esc(wTrp.disp[0])}</span>` : ''}
          ${wTrp.show ? trBtnHtml(wTrId, wTrp, 'tr-work-btn') : ''}
          ${isMe ? `<button class="work-del" type="button" data-a="delWork" data-i="${esc(w.id)}">${ic('x', 12)}</button>` : ''}
        </div>`;
        }).join('')}
      </div>` : ''}
    ` : ''}

    ${(userReqs.length || !p) ? `
      ${secH(`${esc(t('acc_reqs'))} (${userReqs.length})`)}
      ${userReqs.length
        ? `<div class="list single">${userReqs.slice(0, 8).map(reqCard).join('')}</div>`
        : `<div class="ofr"><small>${esc(t('no_reqs_here'))}</small></div>`}
    ` : ''}

    ${p ? `<div id="react-verified-reviews-root"></div>` : (writtenRevs.length ? `
      ${secH(t('rev_sec_h'))}
      <div class="list single">
        ${writtenRevs.slice(0, 6).map(rv => {
          const tp = PROV.find(x => x.uid === rv.providerId);
          const rvTrId = `wrev_${rv.id || (rv.providerId + '_' + (rv.ts || ''))}`;
          const rvTrp = rv.comment ? trPrep(rvTrId, [rv.comment]) : { show: false, on: false, disp: [''] };
          return `<article class="rev-card">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
              <small><b class="who-link" data-a="prof" data-uid="${esc(rv.providerId)}">${esc(tp ? tp.n : '')}</b> · ${esc(rv.ts ? tAgo(rv.ts) : rv.ago)}</small>
              <span class="tag st">${'★'.repeat(rv.stars)} (${rv.stars}/5)</span>
            </div>
            ${rv.comment ? `<p class="tr-target" data-trid="${esc(rvTrId)}" data-tridx="0">${esc(rvTrp.disp[0])}</p>` : ''}
            ${rvTrp.show ? `<div style="margin-top:6px;display:flex;justify-content:flex-end">${trBtnHtml(rvTrId, rvTrp)}</div>` : ''}
          </article>`;
        }).join('')}
      </div>
    ` : '')}
  </div>`;
};

/* 5. الرسائل والدردشة */
const QR_ICONS = ['money', 'clock', 'pin', 'image'];
const getQrChips = () => {
  const list = QR_I18N[curLang()] || QR_I18N.ar;
  return list.map((pair, idx) => [QR_ICONS[idx], pair[0], pair[1]]);
};

const heroStage = () => `<div class="hstage">
  <span class="hchip c1">${ic('wrench', 20)}</span>
  <span class="hchip c2">${ic('truck', 22)}</span>
  <span class="hchip c3">${ic('book', 20)}</span>
  ${bear(94, 'orange')}
</div>`;

/* ================== ميزات الدردشة المتطورة (Chat Plus + Share Sheet) ================== */
const CP_STORE_K = () => 'wasla_chatplus_v1_' + ((user && user.uid) || 'guest');
function cpLoad(): any { try { return JSON.parse(store.get(CP_STORE_K()) || '{}') || {}; } catch (e) { return {}; } }
function cpSave(o: any) { store.set(CP_STORE_K(), JSON.stringify(o || {})); }
const _cpUnlocked = new Set<string>();
let _cpShowArch = false;
let _mvTab: 'all' | 'img' | 'link' | 'loc' | 'audio' = 'all';
let _cpReply: any = null;
let _cpEdit: any = null;
let _cpPend: string[] = [];
let _cpAu: any = null, _cpAuId = '', _cpRate = 1;
let _rec: any = null;
let _shareData: any = null;
let _chSearchOpen = false, _chSearchQ = '', _chSearchIdx = 0;
let _chSearchCat: 'all' | 'text' | 'deal' | 'audio' | 'img' | 'link' = 'all';
let _otpReveal = false;
const MSG_MAX_CHARS = 900;
const MSG_COLLAPSE_CHARS = 160;
const MSG_COLLAPSE_LINES = 3;
const _expandedMids = new Set<string>();
let _cmExpanded = false, _lastLimitToast = 0;
const cpDraftKey = (cid: string) => 'wasla_draft_' + ((user && user.uid) || 'guest') + '_' + cid;
const cpGetDraft = (cid: string) => cid ? (store.get(cpDraftKey(cid)) || '') : '';
function cpSetDraft(cid: string, v: string) {
  if (!cid) return;
  const trimmed = String(v || '');
  if (trimmed.trim()) store.set(cpDraftKey(cid), trimmed.slice(0, MSG_MAX_CHARS));
  else store.set(cpDraftKey(cid), '');
}
function cpIsLongMsg(raw: any): boolean {
  const s = String(raw || '');
  return s.length > MSG_COLLAPSE_CHARS || s.split(/\n/).length > MSG_COLLAPSE_LINES;
}
function cpCollapseExpandedMsg(wrap: HTMLElement | null) {
  if (!wrap || !wrap.classList.contains('is-open')) return;
  const bb = wrap.closest('.bb[data-mid]') as HTMLElement | null;
  const mid = bb?.dataset?.mid || '';
  if (mid) _expandedMids.delete(mid);
  const inEl = wrap.querySelector('.mtxt-in') as HTMLElement | null;
  const lbl = wrap.querySelector('.mtxt-m-lbl');
  if (inEl) {
    inEl.style.maxHeight = inEl.scrollHeight + 'px';
    void inEl.offsetHeight;
    inEl.style.maxHeight = '5.15em';
    setTimeout(() => { if (!wrap.classList.contains('is-open')) inEl.style.maxHeight = ''; }, 580);
  }
  wrap.classList.remove('is-open');
  if (lbl) lbl.textContent = t('msg_read_more');
}
let _cmWasSend = false;
let _cmTypePulseTimer: any = 0;
function measureCmHeight(cm: HTMLTextAreaElement, rawVal: string): { h: number; atCap: boolean } {
  const mirror = document.getElementById('cm-mirror') as HTMLElement | null;
  if (!mirror) return { h: 38, atCap: false };
  const w = cm.clientWidth;
  if (w > 0 && mirror.style.width !== w + 'px') mirror.style.width = w + 'px';
  const txt = rawVal ? (rawVal.endsWith('\n') ? rawVal + ' ' : rawVal) : ' ';
  if (mirror.textContent !== txt) mirror.textContent = txt;
  const measured = Math.ceil(mirror.scrollHeight || mirror.getBoundingClientRect().height || 38);
  const maxH = 148;
  return { h: Math.min(maxH, Math.max(38, measured)), atCap: measured > maxH };
}
function syncComposerViewport() {
  const bx = $('#cbox') as HTMLElement | null;
  if (!bx) return;
  if (_cmExpanded && window.visualViewport) {
    bx.style.setProperty('--cm-vv-h', Math.round(window.visualViewport.height) + 'px');
  } else {
    bx.style.removeProperty('--cm-vv-h');
  }
}
function cpApplyExpandedUI() {
  const cw = $('#cwrap') as HTMLElement | null;
  const bx = $('#cbox') as HTMLElement | null;
  const cm = $('#cm') as HTMLTextAreaElement | null;
  if (cw) cw.classList.toggle('is-expanded', _cmExpanded);
  if (bx) {
    bx.classList.toggle('is-expanded', _cmExpanded);
    bx.classList.remove('is-full');
    bx.style.removeProperty('--cm-exp-h');
  }
  syncComposerViewport();
  if (cm && !_cmExpanded) {
    const m = measureCmHeight(cm, cm.value || '');
    cm.style.height = m.h + 'px';
    if (bx) bx.classList.toggle('is-at-cap', m.atCap);
  } else if (cm) {
    cm.style.height = '';
    if (bx) bx.classList.remove('is-at-cap');
  }
}
const LP_CACHE_K = 'wasla_lp_cache_v1';
const _lpMem = new Map<string, any>();
const _lpPending = new Set<string>();

function cpSafeWebUrl(raw: any): string {
  let u = String(raw || '').trim().replace(/[.,;:!?)\]»"']+$/g, '');
  if (!u) return '';
  if (/^www\./i.test(u)) u = 'https://' + u;
  try {
    const parsed = new URL(u);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return '';
    return parsed.href;
  } catch (e) { return ''; }
}
function cpExtractUrls(txt: any): string[] {
  const s = String(txt || '');
  const m = s.match(/(?:https?:\/\/|www\.)[^\s<>"{}|\\^`[\]]+/gi) || [];
  const out: string[] = [];
  m.forEach(raw => {
    const u = cpSafeWebUrl(raw);
    if (u && !out.includes(u)) out.push(u);
  });
  return out;
}
function cpYtId(u: string): string {
  const m = String(u || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/))([a-zA-Z0-9_-]{11})/i);
  return m ? m[1] : '';
}
function cpLoadLpLocal(url: string): any {
  if (_lpMem.has(url)) return _lpMem.get(url);
  try {
    const raw = store.get(LP_CACHE_K);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (obj && typeof obj === 'object' && obj[url]) {
      _lpMem.set(url, obj[url]);
      return obj[url];
    }
  } catch (e) {}
  return null;
}
function cpSaveLpLocal(url: string, data: any) {
  _lpMem.set(url, data);
  try {
    const obj = JSON.parse(store.get(LP_CACHE_K) || '{}') || {};
    const keys = Object.keys(obj);
    if (keys.length > 40) delete obj[keys[0]];
    obj[url] = data;
    store.set(LP_CACHE_K, JSON.stringify(obj));
  } catch (e) {}
}
function cpResolveLocalLink(url: string): any {
  try {
    const u = new URL(url);
    const sameApp = (u.origin === window.location.origin) || /wasla/i.test(u.hostname);
    if (sameApp && u.hash) {
      const rm = u.hash.match(/#req=([^&]+)/);
      if (rm) {
        const id = decodeURIComponent(rm[1]);
        const r = REQS.find(x => String(x.id) === id);
        return {
          kind: 'wasla-req',
          reqId: id,
          site: `${t('brand_name')} · ${t('share_req_tag')}`,
          title: r ? r.t : t('share_req_sub_def'),
          desc: r ? `${tCat(r.c)}${r.loc ? ' · ' + tLocText(r.loc) : ''} · ${tBud(r.bud)}` : t('share_req_sub_def'),
          img: r ? safeImgUrl(r.img || r.p || '') : '',
          icon: 'list',
          internalHash: '#req=' + encodeURIComponent(id)
        };
      }
      const pm = u.hash.match(/#prov=([^&]+)/);
      if (pm) {
        const uid = decodeURIComponent(pm[1]);
        const p = PROV.find(x => String(x.uid) === uid);
        return {
          kind: 'wasla-prov',
          provUid: uid,
          site: `${t('brand_name')} · ${t('share_prov_tag')}`,
          title: p ? `${p.n} — ${p.spec || tCat(p.c)}` : t('share_prov_tag'),
          desc: p ? `${tLocText(p.loc)} · ${p.rc > 0 ? p.r.toFixed(1) + ' ★' : t('new_badge')}` : t('share_prov_sub_def'),
          img: p ? safeImgUrl(p.photo || '') : '',
          icon: 'user',
          internalHash: '#prov=' + encodeURIComponent(uid)
        };
      }
    }
    const yt = cpYtId(url);
    const host = u.hostname.replace(/^www\./i, '').toLowerCase();
    const cached = cpLoadLpLocal(url);
    if (yt) {
      return {
        kind: 'youtube',
        site: 'YouTube',
        title: (cached && cached.title) || t('yt_watch_lbl'),
        desc: (cached && cached.desc) || host + u.pathname,
        img: (cached && cached.img) || `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`,
        icon: 'play',
        needFetch: !cached
      };
    }
    if (/maps\.google\.|google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl/i.test(url)) {
      return {
        kind: 'maps',
        site: 'Google Maps',
        title: (cached && cached.title) || t('maps_shared_lbl'),
        desc: (cached && cached.desc) || host + u.pathname,
        img: (cached && cached.img) || '',
        icon: 'pin',
        needFetch: !cached
      };
    }
    const brandMap: Array<[RegExp, string, string]> = [
      [/facebook\.com|fb\.watch|fb\.com/i, 'Facebook', '#1877F2'],
      [/instagram\.com|instagr\.am/i, 'Instagram', '#E1306C'],
      [/tiktok\.com/i, 'TikTok', '#111827'],
      [/x\.com|twitter\.com/i, 'X', '#0F172A'],
      [/t\.me|telegram\.me/i, 'Telegram', '#0088CC'],
      [/wa\.me|whatsapp\.com/i, 'WhatsApp', '#25D366'],
      [/linkedin\.com/i, 'LinkedIn', '#0A66C2']
    ];
    const br = brandMap.find(([re]) => re.test(host));
    if (cached) {
      return {
        kind: 'web',
        site: cached.site || (br ? br[1] : host),
        title: cached.title || host,
        desc: cached.desc || url.replace(/^https?:\/\//, ''),
        img: safeImgUrl(cached.img || '') || '',
        logo: safeImgUrl(cached.logo || '') || `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`,
        accent: br ? br[2] : ''
      };
    }
    return {
      kind: 'web',
      site: br ? br[1] : host,
      title: br ? t('share_from_lbl', { b: br[1] }) : host,
      desc: url.replace(/^https?:\/\//, '').slice(0, 88),
      img: '',
      logo: `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`,
      accent: br ? br[2] : '',
      needFetch: true
    };
  } catch (e) { return null; }
}
function cpParseDealMsg(txt: any): any {
  const s = String(txt || '').trim();
  if (!s.startsWith('[اتفاق وصلة]')) return null;
  const lines = s.split(/\r?\n/);
  const get = (prefix: string) => {
    const ln = lines.find(l => l.startsWith(prefix));
    return ln ? ln.slice(prefix.length).trim() : '';
  };
  let priceRaw = get('السعر:');
  const priceSecret = /\[مخفي\]$/.test(priceRaw);
  if (priceSecret) priceRaw = priceRaw.replace(/\s*\[مخفي\]$/, '').trim();
  if (!priceRaw || priceRaw === 'حسب الاتفاق' || priceRaw === 'حسب المعاينة') priceRaw = t('dl_open_price');
  const rawTitle = get('الخدمة:');
  const rawWhen = get('الموعد:');
  return {
    title: !rawTitle || rawTitle === 'اتفاق خدمة' ? t('dl_svc_def') : rawTitle,
    price: priceRaw,
    priceSecret,
    when: !rawWhen || rawWhen === 'قريباً' || rawWhen === 'بالتنسيق' ? t('dl_when_def') : rawWhen,
    note: get('ملاحظة:')
  };
}
function cpDealCardHtml(deal: any, dealTrId = '', dealTrp?: { show: boolean; on: boolean; disp: string[] }): string {
  const dispTitle = dealTrp ? dealTrp.disp[0] : deal.title;
  const dispWhen = dealTrp ? dealTrp.disp[1] : deal.when;
  const dispNote = dealTrp ? dealTrp.disp[2] : (deal.note || '');
  const priceHtml = deal.priceSecret
    ? cpSpoilerHtml(t('dl_reveal_hint'), 5, deal.price)
    : `<b class="dm-val">${esc(deal.price)}</b>`;
  const noteSuffix = dispNote ? ' — ' + dispNote : '';
  const rawText = t('dl_raw_fmt', { t: dispTitle, p: deal.price, w: dispWhen, n: noteSuffix });
  const trAttr = (idx: number) => (dealTrId ? ` class="tr-target" data-trid="${esc(dealTrId)}" data-tridx="${idx}"` : '');
  return `<div class="deal-msg">
    <div class="dm-ribbon">
      <span class="dm-brand">${ic('seal', 14)} ${esc(t('dl_brand'))}</span>
      <span class="dm-badge">${esc(t('dl_badge'))}</span>
    </div>
    <b class="dm-ttl">${dealTrId ? `<span${trAttr(0)}>${esc(dispTitle)}</span>` : esc(dispTitle)}</b>
    <div class="dm-grid">
      <div class="dm-box is-price">
        <small>${ic('calc', 12)} ${esc(t('dl_price_hdr'))}</small>
        <div class="dm-v">${priceHtml}</div>
      </div>
      <div class="dm-box is-time">
        <small>${ic('clock', 12)} ${esc(t('dl_when_hdr'))}</small>
        <div class="dm-v"><b class="dm-val">${dealTrId ? `<span${trAttr(1)}>${esc(dispWhen)}</span>` : esc(dispWhen)}</b></div>
      </div>
    </div>
    ${deal.note ? `<div class="dm-note">${ic('shieldCheck', 13)} <span${trAttr(2)}>${esc(dispNote)}</span></div>` : ''}
    <div class="dm-foot">
      ${dealTrId && dealTrp ? trBtnHtml(dealTrId, dealTrp, 'in-msg') : ''}
      <button class="dm-copy" type="button" data-a="copyDeal" data-copy="${esc(rawText)}">${ic('copy', 12)} ${esc(t('dl_copy_btn'))}</button>
    </div>
  </div>`;
}
function cpFormatMsgHtml(txt: string): string {
  const urls = cpExtractUrls(txt);
  if (!urls.length) return esc(txt);
  const re = /((?:https?:\/\/|www\.)[^\s<>"{}|\\^`[\]]+)/gi;
  let out = '';
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(txt)) !== null) {
    out += esc(txt.slice(lastIdx, match.index));
    const raw = match[0];
    const safe = cpSafeWebUrl(raw);
    if (safe) {
      const info = cpResolveLocalLink(safe);
      const disp = raw.length > 48 ? raw.slice(0, 45) + '…' : raw;
      if (info && info.internalHash) {
        out += `<a class="chat-link ltr" href="${esc(info.internalHash)}" data-a="openChatLink" data-url="${esc(safe)}" data-hash="${esc(info.internalHash)}">${esc(disp)}</a>`;
      } else {
        out += `<a class="chat-link ltr" href="${esc(safe)}" target="_blank" rel="noopener noreferrer" data-a="openChatLink" data-url="${esc(safe)}" data-ext-a="1">${esc(disp)}</a>`;
      }
    } else {
      out += esc(raw);
    }
    lastIdx = match.index + raw.length;
  }
  out += esc(txt.slice(lastIdx));
  return out;
}
function cpLinkCardHtml(url: string): string {
  const info = cpResolveLocalLink(url);
  if (!info) return '';
  const attrs = info.internalHash
    ? `data-a="openChatLink" data-url="${esc(url)}" data-hash="${esc(info.internalHash)}"`
    : `data-a="openChatLink" data-url="${esc(url)}" data-lp="${esc(url)}"`;
  const thumb = info.img
    ? `<div class="lp-img"><img src="${esc(info.img)}" alt="" loading="lazy" referrerpolicy="no-referrer">${info.kind === 'youtube' ? `<span class="lp-play">${ic('play', 20)}</span>` : ''}</div>`
    : '';
  const logoBadge = info.logo
    ? `<img class="lp-fav" src="${esc(info.logo)}" alt="" loading="lazy">`
    : `<span class="lp-fav-ic">${ic(info.icon || 'link', 13)}</span>`;
  return `<div class="lp-card${info.needFetch ? ' is-pending' : ''}${thumb ? ' has-img' : ''}" role="link" tabindex="0" ${attrs}>
    ${thumb}
    <div class="lp-body">
      <div class="lp-site">${logoBadge}<span>${esc(info.site)}</span>${ic('ext', 12)}</div>
      <b class="lp-ttl">${esc(info.title)}</b>
      ${info.desc ? `<small class="lp-desc">${esc(info.desc)}</small>` : ''}
    </div>
  </div>`;
}
function cpHydrateLinkCards() {
  const cards = $$('.lp-card.is-pending[data-lp]');
  cards.forEach(card => {
    const url = (card as HTMLElement).dataset.lp || '';
    if (!url || _lpPending.has(url)) return;
    const cached = cpLoadLpLocal(url);
    if (cached) {
      const fresh = document.createElement('div');
      fresh.innerHTML = cpLinkCardHtml(url);
      if (fresh.firstElementChild) card.replaceWith(fresh.firstElementChild);
      return;
    }
    _lpPending.add(url);
    fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`, { mode: 'cors' })
      .then(r => (r.ok ? r.json() : null))
      .then(res => {
        if (!res || res.status !== 'success' || !res.data) {
          cpSaveLpLocal(url, { site: new URL(url).hostname.replace(/^www\./, ''), title: new URL(url).hostname.replace(/^www\./, ''), desc: url.replace(/^https?:\/\//, ''), img: '', logo: '' });
          return;
        }
        const d = res.data;
        const img = safeImgUrl((d.image && d.image.url) || '') || '';
        const logo = safeImgUrl((d.logo && d.logo.url) || '') || '';
        const yt = cpYtId(url);
        cpSaveLpLocal(url, {
          site: String(d.publisher || new URL(url).hostname.replace(/^www\./, '')).slice(0, 40),
          title: String(d.title || new URL(url).hostname).slice(0, 120),
          desc: String(d.description || '').slice(0, 160),
          img: img || (yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : ''),
          logo
        });
        document.querySelectorAll('.lp-card[data-lp]').forEach(el => {
          if ((el as HTMLElement).dataset.lp === url) {
            const box = document.createElement('div');
            box.innerHTML = cpLinkCardHtml(url);
            if (box.firstElementChild) el.replaceWith(box.firstElementChild);
          }
        });
      })
      .catch(() => {})
      .finally(() => { _lpPending.delete(url); });
  });
}

const cpIsLocked = (c: any) => !!(c && c.cid && (cpLoad().locked || []).includes(c.cid));
const cpIsOpen = (c: any) => !cpIsLocked(c) || _cpUnlocked.has(c.cid);
const cpIsPinned = (c: any) => !!(c && c.cid && (c.pinned || (cpLoad().pinned || []).includes(c.cid)));
const cpPinnedMsgOf = (c: any) => (c && (c.pinnedMsg || (cpLoad().pinnedMsgs && cpLoad().pinnedMsgs[c.cid]))) || null;
const cpBlockedByMe = (c: any) => !!(c && user && (c.blockedBy || []).includes(user.uid));
const cpBlockedByOther = (c: any) => !!(c && user && (c.blockedBy || []).some((u: string) => u !== user.uid));
const cpHidden = (c: any) => !!(c && c.clearedAt && c.clearedAt >= (c.updatedAtMs || 0) && !(c.m && c.m.length));
const cpCanEditMsg = (m: any) => {
  if (!m || !m[0] || !m[1] || cpParseDealMsg(m[1])) return false;
  const d = m[5] || {};
  return !(d.audio || d.loc || m[3] || (Array.isArray(d.imgs) && d.imgs.length));
};
const cpHiddenMsgSet = (): Set<string> => new Set(Array.isArray(cpLoad().hiddenMsgs) ? cpLoad().hiddenMsgs : []);
function cpHideMsgLocal(id: string) {
  if (!id) return;
  const st = cpLoad();
  const list: string[] = Array.isArray(st.hiddenMsgs) ? st.hiddenMsgs : [];
  if (!list.includes(id)) {
    st.hiddenMsgs = [...list.slice(-400), id];
    cpSave(st);
  }
}
const fmtDur = (s: number) => { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const safeAudioUrl = (u: any) => { u = String(u || ''); return (/^https:\/\//.test(u) || /^data:audio\//.test(u)) ? u : ''; };
const numOk = (n: any, lim: number) => typeof n === 'number' && isFinite(n) && Math.abs(n) <= lim;

/* إخفاء الاسم/المحتوى بتأثير تليجرام الحقيقي (تلاشي ضبابي + جزيئات دقيقة أحادية اللون بدون ألوان) */
function cpMiniDustBurst(host: HTMLElement) {
  if (!host || (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  const r = host.getBoundingClientRect();
  if (!r.width || !r.height) return;
  const pad = 12;
  const w = Math.ceil(r.width + pad * 2);
  const h = Math.ceil(r.height + pad * 2);
  const cv = document.createElement('canvas');
  const dpr = Math.min(2, devicePixelRatio || 1);
  cv.width = Math.round(w * dpr);
  cv.height = Math.round(h * dpr);
  cv.style.cssText = `position:fixed;left:${Math.round(r.left - pad)}px;top:${Math.round(r.top - pad)}px;width:${w}px;height:${h}px;pointer-events:none;z-index:960`;
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  document.body.appendChild(cv);
  const cols = ['rgba(255,255,255,.95)', 'rgba(203,213,225,.9)', 'rgba(100,116,139,.85)', 'rgba(27,27,27,.72)'];
  const pts = Array.from({ length: 30 }, () => ({
    x: pad + Math.random() * r.width,
    y: pad + Math.random() * r.height,
    vx: (Math.random() - .5) * .65,
    vy: -(.25 + Math.random() * .9),
    rad: .75 + Math.random() * 1.4,
    col: cols[Math.floor(Math.random() * cols.length)],
    t: 0,
    life: 24 + Math.random() * 16
  }));
  const step = () => {
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of pts) {
      p.t++;
      if (p.t >= p.life) continue;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      ctx.globalAlpha = Math.max(0, 1 - p.t / p.life);
      ctx.fillStyle = p.col;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.rad, 0, Math.PI * 2);
      ctx.fill();
    }
    if (alive) requestAnimationFrame(step);
    else cv.remove();
  };
  requestAnimationFrame(step);
}
function cpSpoilerHtml(ariaLabel: string, units = 5, revealText = '', opts?: { cls?: string }) {
  const glyphs = ['سـتـ', 'خـفـ', 'مـقـ', 'بـيـ', 'نـصـ', 'عـبـ', 'رمـز', 'خـا'];
  const n = Math.max(3, Math.min(12, units));
  let dummy = '';
  for (let i = 0; i < n; i++) dummy += (i ? ' ' : '') + glyphs[i % glyphs.length] + 'ـ';
  const inner = `<span class="tg-spoiler-txt" aria-hidden="true">${dummy}</span><span class="tg-spoiler-dust" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>`;
  const extraCls = opts && opts.cls ? ' ' + esc(opts.cls) : '';
  if (revealText) {
    return `<button type="button" class="tg-spoiler is-tap${extraCls}" data-a="revealSpoiler" data-val="${esc(revealText)}" data-open="0" aria-label="${esc(ariaLabel)}" title="${esc(t('spoiler_tap'))}">${inner}</button>`;
  }
  return `<span class="tg-spoiler${extraCls}" aria-label="${esc(ariaLabel)}">${inner}</span>`;
}
function cpMaskNameHtml(fullName: string) {
  const fb = t('user_fallback');
  const parts = String(fullName || fb).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return esc(fb);
  if (parts.length === 1) {
    const w = parts[0];
    if (w.length <= 8) return esc(w);
    return `${esc(w.slice(0, 5))} ${cpSpoilerHtml(t('spoiler_hidden'), 3)}`;
  }
  return `${esc(parts[0])} ${cpSpoilerHtml(t('spoiler_hidden'), Math.min(7, parts.slice(1).length * 3 + 1))}`;
}

/* ====== محرك تحويل اللغة الكامل بنفس تفتيت مسح الرسالة (أبطأ) + طبقة نقط إخفاء التليجرام الداكنة وتفتيتها للكشف ====== */
let _langMorphBusy = false;
function buildLangFogVeil(): HTMLElement {
  const veil = document.createElement('div');
  veil.id = 'lang-fog-veil';
  veil.className = 'lang-fog-veil';
  veil.setAttribute('aria-hidden', 'true');
  const starCoords = [
    [9, 14, 0.1], [21, 22, 0.4], [35, 12, 0.8], [51, 19, 0.2], [68, 15, 1.0], [84, 21, 0.6],
    [14, 38, 0.5], [29, 44, 0.9], [46, 36, 0.3], [62, 42, 1.2], [78, 39, 0.7], [91, 47, 0.1],
    [11, 63, 0.8], [26, 68, 0.2], [42, 61, 1.1], [59, 66, 0.4], [74, 62, 0.9], [88, 70, 0.5],
    [17, 84, 0.3], [34, 88, 0.7], [53, 82, 1.0], [69, 86, 0.6], [85, 81, 0.2], [48, 28, 0.5]
  ];
  const starsHtml = starCoords
    .map(([x, y, d]) => `<i style="left:${x}%;top:${y}%;animation-delay:${d}s"></i>`)
    .join('');
  veil.innerHTML = `
    <div class="lang-fog-noise" aria-hidden="true"></div>
    <div class="lang-fog-stars" aria-hidden="true">${starsHtml}</div>`;
  return veil;
}

function applyLanguageLiveState(nextLang: LangCode) {
  setStoredLang(nextLang);
  const meta = getLangMeta(nextLang);
  try { if (auth) auth.languageCode = meta.fbCode; } catch {}
  try { rebuildReq(); } catch {}
  try { rebuildProv(); } catch {}
  try { rebuildSmartNotifs(); } catch {}
  try { syncShellChrome(); } catch {}
  try {
    document.querySelectorAll('.v-mic:not(.rec)').forEach(btn => {
      const ta = btn.parentElement?.querySelector('textarea');
      (btn as HTMLElement).innerHTML = micIdleHtml(!!ta);
      btn.setAttribute('aria-label', t('voice_aria'));
    });
  } catch {}
  try { refreshMe(); } catch {}
  if ($('#app')?.classList.contains('on')) {
    goTo(cur);
  } else if ($('#s1')?.classList.contains('on')) {
    syncPermCards();
  }
}

function runScreenDisintegrateWave(
  el: HTMLElement,
  ctx: CanvasRenderingContext2D,
  vw: number,
  vh: number,
  fromLeft: boolean,
  sliceMs: number,
  palette: string[],
  edgeColors: [string, string],
  phaseCurve: 'startSlow' | 'endSlow',
  sampleDomRects: boolean
): Promise<void> {
  return new Promise<void>(resolve => {
    const hitRects: Array<{ x: number; y: number; w: number; h: number; isInk: boolean }> = [];
    if (sampleDomRects) {
      const rawEls = Array.from(el.querySelectorAll(
        'header.top, .side, .tabs, .hero, .hero2, .card, .lang-card, .it, .row, .row2, .comp-bar, .bb, .btn, h1, h2, h3, .gp, .lk-card, .pfh, .cat'
      ));
      for (let i = 0; i < rawEls.length && hitRects.length < 100; i++) {
        const cr = (rawEls[i] as HTMLElement).getBoundingClientRect();
        if (cr.width > 12 && cr.height > 10 && cr.bottom > 0 && cr.top < vh && cr.right > 0 && cr.left < vw) {
          hitRects.push({
            x: Math.max(0, cr.left),
            y: Math.max(0, cr.top),
            w: Math.min(vw, cr.right) - Math.max(0, cr.left),
            h: Math.min(vh, cr.bottom) - Math.max(0, cr.top),
            isInk: i % 3 === 0
          });
        }
      }
    }

    const maxTotalMs = sliceMs + 360;
    const count = 720;
    const particles = Array.from({ length: count }, (_, idx) => {
      const useBox = hitRects.length > 0 && idx < Math.round(count * 0.62);
      const box = useBox ? hitRects[idx % hitRects.length] : null;
      const lx = box ? (box.x + Math.random() * Math.max(4, box.w)) : (Math.random() * vw);
      const ly = box ? (box.y + Math.random() * Math.max(4, box.h)) : (Math.random() * vh);
      const progressRatio = fromLeft ? (lx / Math.max(1, vw)) : (1 - lx / Math.max(1, vw));
      // عكس منحنى الزمن علشان توقيت الجزيئات يطابق موجة القص بدقة
      const normTrigger = phaseCurve === 'startSlow'
        ? Math.pow(Math.max(0, Math.min(1, progressRatio)), 0.72)
        : 1 - Math.pow(Math.max(0, 1 - progressRatio), 0.72);
      const triggerDt = normTrigger * sliceMs + (Math.random() - 0.5) * 90;
      const dirBias = fromLeft ? -1 : 1;
      return {
        x: lx,
        y: ly,
        vx: dirBias * (0.45 + Math.random() * 1.3) + (Math.random() - 0.5) * 0.65,
        vy: -(0.35 + Math.random() * 1.35),
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.14,
        size: 1.8 + Math.random() * 3.1,
        kind: Math.random() < 0.56 ? 'shard' : 'mote',
        phase: Math.random() * Math.PI * 2,
        delay: Math.max(0, triggerDt),
        life: 480 + Math.random() * 360,
        color: palette[idx % palette.length]
      };
    });

    const teethSeeds = Array.from({ length: 23 }, (_, k) => Math.sin(k * 2.17 + 0.7) * 3.6 + (k % 2 ? 2.3 : -2.3));
    const buildSlicePoly = (cutFrac: number, timeMs: number) => {
      const p = cutFrac * 100;
      const edgePts: string[] = [];
      for (let s = 0; s < teethSeeds.length; s++) {
        const yPct = Math.round((s / (teethSeeds.length - 1)) * 1000) / 10;
        const jitter = teethSeeds[s] + Math.sin(timeMs * 0.015 + s * 1.35) * 2.0;
        const rawX = fromLeft ? (p + jitter) : (100 - p + jitter);
        const xPct = Math.max(0, Math.min(100, rawX)).toFixed(1);
        edgePts.push(`${xPct}% ${yPct}%`);
      }
      if (fromLeft) {
        return `polygon(${edgePts.join(', ')}, 100% 100%, 100% 0%)`;
      }
      return `polygon(0% 0%, ${edgePts.join(', ')}, 0% 100%)`;
    };

    const t0 = performance.now();
    const tick = (now: number) => {
      const dt = now - t0;
      const lin = Math.min(1, dt / sliceMs);
      // إبطاء مقصود في بداية الإخفاء (startSlow) وإبطاء مريح في نهاية الإظهار (endSlow)
      const cutFrac = phaseCurve === 'startSlow'
        ? (lin * 0.34 + Math.pow(lin, 1.85) * 0.66)
        : (1 - Math.pow(1 - lin, 1.85)) * 0.66 + lin * 0.34;
      if (cutFrac >= 0.996 || lin >= 1) {
        el.style.opacity = '0';
        el.style.clipPath = fromLeft ? 'polygon(100% 0%, 100% 100%, 100% 100%)' : 'polygon(0% 0%, 0% 100%, 0% 100%)';
      } else {
        el.style.clipPath = buildSlicePoly(cutFrac, dt);
        if (lin > 0.85) el.style.opacity = String(Math.max(0, 1 - (lin - 0.85) / 0.15));
      }

      ctx.clearRect(0, 0, vw, vh);

      if (lin < 0.985) {
        const frontX = (fromLeft ? cutFrac : (1 - cutFrac)) * vw;
        for (let s = 0; s < 22; s++) {
          const sy = ((s + 0.5) / 22) * vh + Math.sin(dt * 0.025 + s) * 5;
          const sx = frontX + (Math.random() - 0.5) * 14;
          ctx.globalAlpha = 0.65 * (1 - lin * 0.25);
          ctx.fillStyle = s % 2 ? edgeColors[0] : edgeColors[1];
          ctx.fillRect(sx - 1.5, sy - 1.5, 3, 3);
        }
      }

      let alive = 0;
      for (const pt of particles) {
        if (dt < pt.delay) continue;
        const age = dt - pt.delay;
        if (age >= pt.life) continue;
        alive++;
        const prog = age / pt.life;
        const driftT = age * 0.056;
        const nx = pt.x + pt.vx * driftT + Math.sin(age * 0.015 + pt.phase) * 3.5;
        const ny = pt.y + pt.vy * driftT - Math.pow(prog, 1.4) * 14;
        const pop = prog < 0.14 ? (0.72 + prog * 3.2) : (1.16 - prog * 0.78);
        const s = Math.max(0.45, pt.size * pop);
        ctx.globalAlpha = Math.max(0, (1 - Math.pow(prog, 1.32)) * 0.96);
        ctx.fillStyle = pt.color;
        if (pt.kind === 'shard') {
          ctx.save();
          ctx.translate(nx, ny);
          ctx.rotate(pt.rot + age * pt.vRot * 0.16);
          ctx.fillRect(-s * 0.56, -s * 0.46, s * 1.12, s * 0.92);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(nx, ny, s * 0.58, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if ((alive > 0 || dt < sliceMs + 60) && dt < maxTotalMs) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, vw, vh);
        resolve();
      }
    };
    requestAnimationFrame(tick);
  });
}

async function switchLanguageWithMorph(nextLang: LangCode) {
  if (_langMorphBusy || !isValidLang(nextLang)) return;
  if (nextLang === curLang()) { closeModal(); return; }
  _langMorphBusy = true;
  closeModal();

  const waitMs = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
  const nextRaf = () => new Promise<void>(r => requestAnimationFrame(() => r()));

  const prevDir = document.documentElement.dir === 'ltr' ? 'ltr' : 'rtl';
  const activeScr = document.querySelector('.screen.on') as HTMLElement | null;
  const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const veil = buildLangFogVeil();
  document.body.appendChild(veil);

  let cv: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  const vw = Math.max(320, window.innerWidth || 1024);
  const vh = Math.max(400, window.innerHeight || 768);

  if (activeScr && !reduced) {
    activeScr.style.zIndex = '9992';
    activeScr.style.willChange = 'clip-path, opacity';

    cv = document.createElement('canvas');
    cv.className = 'lang-morph-canvas';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(vw * dpr);
    cv.height = Math.round(vh * dpr);
    cv.style.width = vw + 'px';
    cv.style.height = vh + 'px';
    document.body.appendChild(cv);
    ctx = cv.getContext('2d', { alpha: true, desynchronized: true } as any) as CanvasRenderingContext2D | null;
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  await nextRaf();
  veil.classList.add('is-solid');

  // المرحلة 1 (تبدأ ببطء ووضوح): تفتيت الموقع القديم وكشف طبقة الغبار الداكنة المزينة خلفه
  if (activeScr && !reduced && ctx) {
    const uiPalette = ['#FAF4EC', '#1B1B1B', '#4BD4BE', '#FFE26A', '#FA6B63', '#9C89FF', '#55B9DB', '#FFFDF9'];
    await runScreenDisintegrateWave(activeScr, ctx, vw, vh, prevDir === 'ltr', 1650, uiPalette, ['#4BD4BE', '#FFE26A'], 'startSlow', true);
  } else {
    await waitMs(180);
  }

  // تبديل فوري للواجهة الجديدة خلف الغبار بدون أي انتظار طويل في المنتصف
  veil.style.zIndex = '9993';
  if (activeScr) {
    activeScr.style.zIndex = '';
    activeScr.style.clipPath = '';
    activeScr.style.opacity = '1';
    activeScr.style.willChange = '';
  }

  applyLanguageLiveState(nextLang);
  await nextRaf();
  await waitMs(24);

  // المرحلة 2 (تتباطأ بجمال في النهاية): تفتيت طبقة الغبار للكشف التدريجي عن الموقع باللغة الجديدة
  const nextDir = getLangMeta(nextLang).dir;
  if (!reduced && ctx) {
    const veilPalette = ['#161B29', '#4BD4BE', '#55B9DB', '#FFE26A', '#9C89FF', '#FAF4EC', '#FFFFFF'];
    await runScreenDisintegrateWave(veil, ctx, vw, vh, nextDir === 'ltr', 1720, veilPalette, ['#9C89FF', '#4BD4BE'], 'endSlow', false);
  } else {
    veil.style.opacity = '0';
    await waitMs(180);
  }

  veil.remove();
  if (cv) cv.remove();
  _langMorphBusy = false;
  toast(`${getLangMeta(nextLang).nativeName} ✓`);
}

/* نافذة المشاركة المتطورة المنبثقة من أسفل الشاشة */
function closeShareSheet() {
  const el = $('#share-sheet');
  if (!el) return;
  el.classList.add('ss-out');
  setTimeout(() => el.remove(), 220);
}

function buildLocalizedShareBanner(d: any): string {
  try {
    const W = 1200, H = 630;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    if (!ctx) return '';
    const lang = curLang();
    const isRtl = getLangMeta(lang).dir === 'rtl';
    const ff = canvasFontStack(lang);

    ctx.fillStyle = '#FAF4EC';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(27,27,27,0.065)';
    for (let x = 28; x < W; x += 36) {
      for (let y = 28; y < H; y += 36) {
        ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
      }
    }

    ctx.fillStyle = '#4BD4BE';
    canvasRoundRect(ctx, isRtl ? -40 : W - 260, -40, 300, 300, 72); ctx.fill();
    ctx.fillStyle = '#FFE26A';
    canvasRoundRect(ctx, isRtl ? W - 220 : -40, H - 220, 260, 260, 64); ctx.fill();

    ctx.fillStyle = '#1B1B1B';
    canvasRoundRect(ctx, 64, 58, 1084, 522, 34); ctx.fill();
    ctx.fillStyle = '#FFFDF9';
    ctx.strokeStyle = '#1B1B1B'; ctx.lineWidth = 4.5;
    canvasRoundRect(ctx, 52, 46, 1084, 522, 34); ctx.fill(); ctx.stroke();

    const edge = isRtl ? 1080 : 108;
    ctx.direction = isRtl ? 'rtl' : 'ltr';
    ctx.textAlign = isRtl ? 'right' : 'left';

    ctx.fillStyle = '#FFF3DF';
    canvasRoundRect(ctx, 88, 82, 1012, 84, 22); ctx.fill();
    ctx.strokeStyle = '#1B1B1B'; ctx.lineWidth = 2.5; ctx.stroke();

    ctx.fillStyle = '#1B1B1B';
    ctx.font = `900 30px ${ff}`;
    ctx.fillText(t('story_brand_hdr'), edge, 134);

    const pillW = 300;
    const pillX = isRtl ? 108 : 1080 - pillW;
    ctx.fillStyle = '#FA6B63';
    canvasRoundRect(ctx, pillX, 98, pillW, 52, 999); ctx.fill();
    ctx.strokeStyle = '#1B1B1B'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.font = `800 20px ${ff}`;
    ctx.fillText(String(d?.tag || t('story_banner_pill')).slice(0, 22), pillX + pillW / 2, 132);

    ctx.textAlign = isRtl ? 'right' : 'left';
    ctx.fillStyle = '#1B1B1B';
    ctx.font = `900 46px ${ff}`;
    const nextY = drawCanvasWrapped(ctx, String(d?.title || t('share_app_title')), edge, 240, 960, 62, 2);

    if (d?.sub) {
      ctx.fillStyle = '#5E574F';
      ctx.font = `700 26px ${ff}`;
      drawCanvasWrapped(ctx, String(d.sub), edge, Math.max(nextY + 18, 368), 960, 38, 2);
    }

    ctx.fillStyle = '#E8F7F2';
    canvasRoundRect(ctx, 88, 462, 1012, 74, 20); ctx.fill();
    ctx.strokeStyle = '#1B1B1B'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.fillStyle = '#0F766E';
    ctx.textAlign = 'center';
    ctx.font = `800 26px ${ff}`;
    ctx.fillText(t('story_direct_cta'), 594, 509);

    return cv.toDataURL('image/png');
  } catch {
    return './assets/share-banner-v21.png';
  }
}

function openShareSheet(d: any) {
  closeShareSheet();
  _shareData = d;
  const targets = CHATS
    .map((c, i) => ({ c, i }))
    .filter(x => !cpHidden(x.c) && !cpBlockedByMe(x.c) && !cpBlockedByOther(x.c) && !cpIsLocked(x.c))
    .slice(0, 8);
  const encUrl = encodeURIComponent(d.url || '');
  const encTxt = encodeURIComponent(d.shareText || d.title || '');
  const shortUrl = String(d.url || '').replace(/^https?:\/\//, '');
  const hasPhoto = !!safeImgUrl(d.photo);
  const heroSrc = hasPhoto ? safeImgUrl(d.photo) : buildLocalizedShareBanner(d);
  const brand = t('brand_name');

  const sh = document.createElement('div');
  sh.id = 'share-sheet';
  sh.className = 'share-sheet';
  sh.innerHTML = `
    <div class="ss-bg" data-a="shareClose"></div>
    <div class="ss-card" role="dialog" aria-label="${esc(t('share_h'))}">
      <div class="ss-handle"></div>
      <div class="ss-head">
        <b>${esc(t('share_h'))}</b>
        <button class="ss-close" type="button" data-a="shareClose" aria-label="${esc(t('close'))}">${ic('x', 16)}</button>
      </div>
      <div class="ss-hero${hasPhoto ? ' has-photo' : ''}">
        <img class="ss-hero-img" src="${esc(heroSrc)}" alt="${esc(d.title || brand)}">
        <div class="ss-hero-bar">
          ${hasPhoto ? `<img class="ss-hero-logo" src="./assets/icon-192.png" alt="${esc(brand)}">` : ''}
          ${d.tag ? `<span class="tag st">${esc(d.tag)}</span>` : ''}
          ${d.loc ? `<span class="ss-hero-loc">${ic('pin', 11)} ${esc(d.loc)}</span>` : ''}
        </div>
      </div>
      <div class="ss-meta ss-meta-top">
        <b>${esc(d.title || '')}</b>
        ${d.sub ? `<small>${esc(d.sub)}</small>` : ''}
      </div>
      <div class="ss-url">
        <span class="ss-url-txt ltr" title="${esc(d.url || '')}">${esc(shortUrl)}</span>
        <button class="ss-copy" id="sh-copy-btn" type="button" data-a="shareCopy">${ic('copy', 14)} ${esc(t('copy_btn'))}</button>
      </div>
      ${targets.length ? `
        <div class="ss-sec">
          <small>${esc(t('share_in_app'))}</small>
          <div class="ss-chats">
            ${targets.map(({ c, i }) => `<button class="ss-chat" type="button" data-a="shareToChat" data-i="${i}">
              ${avH(42, { name: c.w, photo: c.photo })}
              <span>${esc(String(c.w || t('user_fallback')).split(' ')[0])}</span>
            </button>`).join('')}
          </div>
        </div>
      ` : ''}
      <div class="ss-grid">
        <a class="ss-act" href="https://wa.me/?text=${encTxt}" target="_blank" rel="noopener noreferrer"><i style="background:#DCF8C6;color:#128C7E">${ic('wa', 21)}</i><span>${esc(t('wa_lbl'))}</span></a>
        <a class="ss-act" href="https://t.me/share/url?url=${encUrl}&text=${encTxt}" target="_blank" rel="noopener noreferrer"><i style="background:#D8F0FC;color:#0088CC">${ic('tg', 21)}</i><span>${esc(t('tg_lbl'))}</span></a>
        <a class="ss-act" href="https://www.facebook.com/sharer/sharer.php?u=${encUrl}" target="_blank" rel="noopener noreferrer"><i style="background:#E7F0FF;color:#1877F2">${ic('share', 20)}</i><span>${esc(t('fb_lbl'))}</span></a>
        <button class="ss-act" type="button" data-a="shareCardPng"><i style="background:var(--sun);color:#1B1B1B">${ic('card', 20)}</i><span>${esc(t('story_lbl'))}</span></button>
        <button class="ss-act" type="button" data-a="shareNative"><i style="background:var(--lav);color:#1B1B1B">${ic('arrowup', 20)}</i><span>${esc(tView('المزيد'))}</span></button>
      </div>
    </div>
  `;
  document.body.appendChild(sh);
  requestAnimationFrame(() => sh.classList.add('ss-in'));
}

function cpPreview(m: any): string {
  if (!m) return '';
  const d = m[5] || {};
  const deal = cpParseDealMsg(m[1]);
  if (deal) return `🤝 ${deal.title} (${deal.price})`;
  if (m[1]) return m[1];
  if (d.audio) return '🎤 ' + t('msg_audio_lbl', { d: fmtDur(d.dur) });
  if (d.loc) return '📍 ' + t('msg_loc_lbl');
  if (m[3] || (d.imgs && d.imgs.length)) return '🖼 ' + t('msg_img_alt');
  return '';
}

function cpFindMsg(id: string): any {
  const c = CHATS[chat];
  if (!c || !id) return null;
  return (c.m || []).find((x: any) => x[4] === id) || null;
}

function cpLocHtml(lat: number, lng: number, timeHtml = '') {
  const zoom = 15;
  const n = 1 << zoom;
  const xFloat = ((lng + 180) / 360) * n;
  const rad = (lat * Math.PI) / 180;
  const yFloat = ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n;
  const tx = Math.floor(xFloat);
  const ty = Math.floor(yFloat);
  const fx = xFloat - tx;
  const fy = yFloat - ty;
  const x0 = fx < 0.5 ? tx - 1 : tx;
  const y0 = fy < 0.5 ? ty - 1 : ty;
  const mx = Math.round(((fx < 0.5 ? 1 + fx : fx)) * 256);
  const my = Math.round(((fy < 0.5 ? 1 + fy : fy)) * 256);
  const tiles = [
    [x0, y0], [x0 + 1, y0],
    [x0, y0 + 1], [x0 + 1, y0 + 1]
  ].map(([gx, gy]) => {
    const wx = ((gx % n) + n) % n;
    const wy = Math.max(0, Math.min(n - 1, gy));
    return `<img src="https://tile.openstreetmap.org/${zoom}/${wx}/${wy}.png" alt="" draggable="false" loading="lazy">`;
  }).join('');

  return `
    <div class="glow glow-silver">
      <div class="loc-map-box" data-a="openloc" data-lat="${lat}" data-lng="${lng}" title="${esc(t('msg_open_map'))}">
        <div class="loc-tiles" style="transform:translate(${-mx}px,${-my}px)">${tiles}</div>
        <div class="loc-pin-marker">${ic('pin', 34)}</div>
        ${timeHtml}
      </div>
    </div>
  `;
}

function cpMsgSig(m: any, idx = -1, chatObj?: any): string {
  const d = m[5] || {};
  const rx = d.reactions ? Object.entries(d.reactions).sort().map(([k, v]) => `${k}:${v}`).join(',') : '';
  const imgs = Array.isArray(d.imgs) ? d.imgs.length : (m[3] ? 1 : 0);
  const loc = d.loc ? `${Number(d.loc.lat).toFixed(5)},${Number(d.loc.lng).toFixed(5)}` : '';
  const seen = (chatObj && idx >= 0 && idx < (chatObj.otherSeenCount || 0)) ? 1 : 0;
  const ed = d.editedAt ? 1 : 0;
  return `${m[0] ? 1 : 0}|${m[1] || ''}|${m[2] || ''}|${imgs}|${d.audio ? d.dur || 1 : ''}|${loc}|${d.replyTo ? d.replyTo.id : ''}|${rx}|${seen}|${ed}`;
}

function cpReactChipsHtml(d: any): string {
  const reactObj = (d.reactions && typeof d.reactions === 'object') ? d.reactions as Record<string, string> : {};
  const rCounts: Record<string, number> = {};
  Object.values(reactObj).forEach((em: any) => { if (em) rCounts[String(em)] = (rCounts[String(em)] || 0) + 1; });
  const rKeys = Object.keys(rCounts);
  return rKeys.length
    ? `<div class="tg-reacts">${rKeys.map(em => `<span class="tg-rc">${em}${rCounts[em] > 1 ? `<b>${rCounts[em]}</b>` : ''}</span>`).join('')}</div>`
    : '';
}

function bubHtml(m: any, idx = -1, chatObj?: any) {
  const c = chatObj || CHATS[chat];
  const d = m[5] || {};
  const mine = !!m[0];
  const id = String(m[4] || '');
  const sig = esc(cpMsgSig(m, idx, c));
  const mAttr = (id ? ` data-mid="${esc(id)}" data-a="msgmenu"` : '') + ` data-sig="${sig}"`;
  const side = mine ? 'bm' : 'bt';
  const seen = mine && c && idx >= 0 && idx < (c.otherSeenCount || 0);
  const chk = mine ? `<span class="chk${seen ? ' seen' : ''}" title="${esc(t(seen ? 'msg_seen' : 'msg_sent'))}">${ic(seen ? 'checks' : 'check', 14)}</span>` : '';
  const ed = d.editedAt ? `<em class="ed-lbl">${esc(t('msg_edited'))}</em>` : '';
  const time = `<small class="mt">${ed}${esc(m[2] || '')}${chk}</small>`;
  const rqHtml = (quoteTxt?: string, trId = '', trIdx = 1) =>
    d.replyTo
      ? `<div class="rq" data-a="rqgo" data-mid="${esc(d.replyTo.id || '')}"><b>${esc(d.replyTo.name || '')}</b><span${trId ? ` class="tr-target" data-trid="${esc(trId)}" data-tridx="${trIdx}"` : ''}>${esc(quoteTxt !== undefined ? quoteTxt : (d.replyTo.text || ''))}</span></div>`
      : '';

  /* رسالة صوتية: حاوية بمقاس ثابت مدمج لا يتغير أبداً، والرد والتفاعلات خارج جسم الفقاعة */
  const au = safeAudioUrl(d.audio);
  if (au) {
    const rawPeaks: number[] = (Array.isArray(d.peaks) && d.peaks.length ? d.peaks : Array.from({ length: 34 }, (_, i) => 24 + ((i * 37) % 62)));
    const barsArr: number[] = [];
    for (let i = 0; i < 34; i++) {
      const pidx = Math.min(rawPeaks.length - 1, Math.floor((i * rawPeaks.length) / 34));
      barsArr.push(Math.max(16, Math.min(100, Number(rawPeaks[pidx]) || 16)));
    }
    const bars = barsArr.map(p => `<i style="height:${p}%"></i>`).join('');
    const rqV = rqHtml();
    return `<div class="mg mg-v ${side}"${mAttr}>
      ${rqV ? `<div class="vm-rq">${rqV}</div>` : ''}
      <div class="bb vm ${side}">
        <div class="vrow">
          <button class="vp" type="button" data-a="vplay" aria-label="${esc(t('msg_play_aria'))}"><span class="vp-in">${ic('play', 16)}</span></button>
          <div class="vcol"><div class="vw" data-a="vseek">${bars}</div><div class="vfoot"><span class="vd" data-dur="${Math.round(Number(d.dur) || 0)}">${fmtDur(d.dur)}</span><span class="v-eq" aria-hidden="true"><i></i><i></i><i></i></span><button class="vs" type="button" data-a="vspeed" aria-label="${esc(t('msg_speed_aria'))}">${_cpRate}x</button></div></div>
        </div>
        ${time}
      </div>
      ${cpReactChipsHtml(d)}
    </div>`;
  }

  /* موقع: إطار فضي متحرك بدون تفاعل وبدون كلام */
  if (d.loc && numOk(d.loc.lat, 90) && numOk(d.loc.lng, 180)) {
    const lat = d.loc.lat, lng = d.loc.lng;
    const mapTime = `<small class="gt">${esc(m[2] || '')}${chk}</small>`;
    return `<div class="mg ml ${side}"${mAttr}>${rqHtml()}
      ${cpLocHtml(lat, lng, mapTime)}
    </div>`;
  }
  /* صور: بدون فقاعة، حجم طبيعي، وإطار لامع متحرك */
  const imgs: string[] = ((Array.isArray(d.imgs) && d.imgs.length) ? d.imgs : (m[3] ? [m[3]] : []))
    .map((u: any) => safeImgUrl(u)).filter(Boolean).slice(0, 3);
  if (imgs.length) {
    const capId = `msg_${id || sig}_cap`;
    const capParts = m[1] ? (d.replyTo && d.replyTo.text ? [m[1], String(d.replyTo.text)] : [m[1]]) : [];
    const capTrp = capParts.length ? trPrep(capId, capParts) : { show: false, on: false, disp: [''] };
    const cap = m[1] ? `<div class="bb mcap ${side}"><span class="tr-target" data-trid="${esc(capId)}" data-tridx="0" data-tr-fmt="msg">${cpFormatMsgHtml(capTrp.disp[0])}</span><div class="tr-msg-foot">${trBtnHtml(capId, capTrp, 'in-msg')}${time}</div></div>` : '';
    return `<div class="mg ${side}"${mAttr}>${rqHtml(d.replyTo && d.replyTo.text && capParts.length > 1 ? capTrp.disp[1] : undefined, capParts.length > 1 ? capId : '', 1)}
      <div class="glow"><div class="gl gl${imgs.length}">${imgs.map(u => `<img src="${esc(u)}" alt="${esc(t('msg_img_alt'))}" data-a="zoom" loading="lazy">`).join('')}</div>
      ${m[1] ? '' : `<small class="gt">${esc(m[2] || '')}${chk}</small>`}</div>
      ${cap}${cpReactChipsHtml(d)}</div>`;
  }

  const deal = cpParseDealMsg(m[1]);
  if (deal) {
    const dealTrId = `deal_${id || sig}`;
    const dealTrp = trPrep(dealTrId, [deal.title, deal.when, deal.note || '']);
    return `<div class="bb bb-deal ${side}"${mAttr}>${rqHtml()}
      ${cpDealCardHtml(deal, dealTrId, dealTrp)}
      ${time}${cpReactChipsHtml(d)}
    </div>`;
  }

  const urls = m[1] ? cpExtractUrls(m[1]) : [];
  const lpHtml = urls.length ? cpLinkCardHtml(urls[0]) : '';
  const msgTrId = `msg_${id || sig}`;
  const msgParts = m[1] ? (d.replyTo && d.replyTo.text ? [m[1], String(d.replyTo.text)] : [m[1]]) : [];
  const msgTrp = msgParts.length ? trPrep(msgTrId, msgParts) : { show: false, on: false, disp: [''] };
  const rqDisp = rqHtml(d.replyTo && d.replyTo.text && msgParts.length > 1 ? msgTrp.disp[1] : undefined, msgParts.length > 1 ? msgTrId : '', 1);
  const isLong = !!(m[1] && cpIsLongMsg(msgTrp.disp[0]));
  const isOpen = isLong && !!id && _expandedMids.has(id);
  const bodyHtml = !m[1]
    ? ''
    : isLong
    ? `<div class="mtxt-wrap${isOpen ? ' is-open' : ''}">
        <div class="mtxt-in"${isOpen ? ' style="max-height:none"' : ''}><span class="mtxt tr-target" data-trid="${esc(msgTrId)}" data-tridx="0" data-tr-fmt="msg">${cpFormatMsgHtml(msgTrp.disp[0])}</span></div>
        <div class="mtxt-veil" aria-hidden="true"><span></span></div>
        <button class="mtxt-more" type="button" data-a="msgMore" data-mid="${esc(id)}"><span class="mtxt-m-ic">${ic('down', 12)}</span><span class="mtxt-m-lbl">${esc(t(isOpen ? 'msg_read_less' : 'msg_read_more'))}</span></button>
      </div>`
    : `<span class="mtxt tr-target" data-trid="${esc(msgTrId)}" data-tridx="0" data-tr-fmt="msg">${cpFormatMsgHtml(msgTrp.disp[0])}</span>`;
  return `<div class="bb ${side}${lpHtml ? ' has-lp' : ''}"${mAttr}>${rqDisp}
  ${bodyHtml}
  ${lpHtml}
  ${msgTrp.show ? `<div class="tr-msg-foot">${trBtnHtml(msgTrId, msgTrp, 'in-msg')}${time}</div>` : time}${cpReactChipsHtml(d)}
</div>`;
}

/* تفتيت النانو المتدرج (Telegram Nano-Slice Disintegration) بسرعة متوازنة وواضحة للعين */
function cpDisintegrateEl(el: HTMLElement, onDone: () => void) {
  if (!el || el.dataset.dissolving === '1') return;
  el.dataset.dissolving = '1';
  const r = el.getBoundingClientRect();
  if (!r.width || !r.height || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.classList.add('dissolve');
    setTimeout(onDone, 260);
    return;
  }
  const pad = 54;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cw = r.width + pad * 2;
  const ch = r.height + pad * 2;
  const cv = document.createElement('canvas');
  cv.className = 'tg-dust-cv';
  cv.width = Math.round(cw * dpr);
  cv.height = Math.round(ch * dpr);
  cv.style.left = (r.left - pad) + 'px';
  cv.style.top = (r.top - pad) + 'px';
  cv.style.width = cw + 'px';
  cv.style.height = ch + 'px';
  const ctx = cv.getContext('2d');
  if (!ctx) { el.classList.add('dissolve'); setTimeout(onDone, 880); return; }
  ctx.scale(dpr, dpr);
  document.body.appendChild(cv);

  const isMine = el.classList.contains('bm');
  const fromLeft = isMine;
  const cs = getComputedStyle(el);
  const bgCol = (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') ? cs.backgroundColor : (isMine ? '#d7f9e5' : '#fffdf9');
  const inkCol = cs.color || '#1b1b1b';
  const palette = isMine
    ? [bgCol, '#9ce8be', inkCol, '#4bd4be', '#ffffff', '#63c5da']
    : [bgCol, '#f3d85d', inkCol, '#ff8e72', '#ffffff', '#e6ddd1'];

  // التقاط مواضع النصوص والعناصر الداخلية علشان التفتيت يخرج من جسم الكلام والحدود نفسها
  const hitRects: Array<{ x: number; y: number; w: number; h: number; isInk: boolean }> = [];
  try {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let tn: Node | null;
    while ((tn = walker.nextNode()) && hitRects.length < 48) {
      if (!tn.textContent || !tn.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(tn);
      const rcList = range.getClientRects();
      for (let i = 0; i < rcList.length && hitRects.length < 48; i++) {
        const cr = rcList[i];
        if (cr.width > 2 && cr.height > 2) {
          hitRects.push({ x: cr.left - r.left, y: cr.top - r.top, w: cr.width, h: cr.height, isInk: true });
        }
      }
    }
  } catch {}
  el.querySelectorAll('img, .vp, .vw, .deal-msg, .mt').forEach((chEl: any) => {
    if (hitRects.length >= 64) return;
    const cr = chEl.getBoundingClientRect();
    if (cr.width > 4 && cr.height > 4) {
      hitRects.push({ x: cr.left - r.left, y: cr.top - r.top, w: cr.width, h: cr.height, isInk: false });
    }
  });

  const SLICE_MS = 820;
  const MAX_TOTAL_MS = 1320;
  const count = Math.min(620, Math.max(260, Math.round((r.width * r.height) / 17)));
  const particles = Array.from({ length: count }, (_, idx) => {
    const useContent = hitRects.length > 0 && idx < Math.round(count * 0.56);
    const box = useContent ? hitRects[idx % hitRects.length] : null;
    const lx = box ? (box.x + Math.random() * box.w) : (Math.random() * r.width);
    const ly = box ? (box.y + Math.random() * box.h) : (Math.random() * r.height);
    const progressRatio = fromLeft ? (lx / Math.max(1, r.width)) : (1 - lx / Math.max(1, r.width));
    const triggerDt = progressRatio * SLICE_MS + (Math.random() - 0.5) * 80;
    const col = box?.isInk && Math.random() < 0.65
      ? inkCol
      : palette[Math.floor(Math.random() * palette.length)];
    const dirBias = fromLeft ? -1 : 1;
    return {
      x: pad + lx,
      y: pad + ly,
      vx: dirBias * (0.28 + Math.random() * 0.92) + (Math.random() - 0.5) * 0.45,
      vy: -(0.28 + Math.random() * 1.15),
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.14,
      size: 1.5 + Math.random() * 2.7,
      kind: Math.random() < 0.62 ? 'shard' : 'mote',
      phase: Math.random() * Math.PI * 2,
      delay: Math.max(0, triggerDt),
      life: 480 + Math.random() * 340,
      color: col
    };
  });

  const teethSeeds = Array.from({ length: 19 }, (_, k) => Math.sin(k * 2.17 + 0.7) * 3.4 + (k % 2 ? 2.2 : -2.2));
  const buildSlicePoly = (cutFrac: number, timeMs: number) => {
    const p = cutFrac * 100;
    const edgePts: string[] = [];
    for (let s = 0; s < teethSeeds.length; s++) {
      const yPct = Math.round((s / (teethSeeds.length - 1)) * 1000) / 10;
      const jitter = teethSeeds[s] + Math.sin(timeMs * 0.016 + s * 1.4) * 1.9;
      const rawX = fromLeft ? (p + jitter) : (100 - p + jitter);
      const xPct = Math.max(0, Math.min(100, rawX)).toFixed(1);
      edgePts.push(`${xPct}% ${yPct}%`);
    }
    if (fromLeft) {
      return `polygon(${edgePts.join(', ')}, 100% 100%, 100% 0%)`;
    }
    return `polygon(0% 0%, ${edgePts.join(', ')}, 0% 100%)`;
  };

  el.style.transition = 'opacity .32s ease';
  el.style.willChange = 'clip-path, opacity';
  el.style.pointerEvents = 'none';

  const t0 = performance.now();
  const tick = (now: number) => {
    const dt = now - t0;
    const lin = Math.min(1, dt / SLICE_MS);
    // منحنى سرعة متوازن: يبدأ واضح، يقطع بنعومة في المنتصف، وينهي التلاشي بسلاسة
    const cutFrac = lin < 0.5 ? 2 * lin * lin : 1 - Math.pow(-2 * lin + 2, 2) / 2;
    if (cutFrac >= 0.995) {
      el.style.opacity = '0';
      el.style.clipPath = fromLeft ? 'polygon(100% 0%, 100% 100%, 100% 100%)' : 'polygon(0% 0%, 0% 100%, 0% 100%)';
    } else {
      el.style.clipPath = buildSlicePoly(cutFrac, dt);
      if (lin > 0.76) el.style.opacity = String(Math.max(0, 1 - (lin - 0.76) / 0.24));
    }

    ctx.clearRect(0, 0, cw, ch);

    // وميض حافة القص بالنانو أثناء عبور الموجة
    if (lin < 0.98) {
      const frontX = pad + (fromLeft ? cutFrac : (1 - cutFrac)) * r.width;
      for (let s = 0; s < 10; s++) {
        const sy = pad + ((s + 0.5) / 10) * r.height + Math.sin(dt * 0.03 + s) * 3;
        const sx = frontX + (Math.random() - 0.5) * 8;
        ctx.globalAlpha = 0.45 * (1 - lin * 0.35);
        ctx.fillStyle = s % 2 ? '#ffffff' : (isMine ? '#4bd4be' : '#f3d85d');
        ctx.fillRect(sx - 1.2, sy - 1.2, 2.4, 2.4);
      }
    }

    let alive = 0;
    for (const pt of particles) {
      if (dt < pt.delay) continue;
      const age = dt - pt.delay;
      if (age >= pt.life) continue;
      alive++;
      const prog = age / pt.life;
      const driftT = age * 0.055;
      const nx = pt.x + pt.vx * driftT + Math.sin(age * 0.015 + pt.phase) * 3.4;
      const ny = pt.y + pt.vy * driftT - Math.pow(prog, 1.4) * 14;
      const pop = prog < 0.14 ? (0.7 + prog * 3.2) : (1.15 - prog * 0.78);
      const s = Math.max(0.4, pt.size * pop);
      ctx.globalAlpha = Math.max(0, (1 - Math.pow(prog, 1.35)) * 0.95);
      ctx.fillStyle = pt.color;
      if (pt.kind === 'shard') {
        ctx.save();
        ctx.translate(nx, ny);
        ctx.rotate(pt.rot + age * pt.vRot * 0.16);
        ctx.fillRect(-s * 0.55, -s * 0.45, s * 1.1, s * 0.9);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(nx, ny, s * 0.58, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    if ((alive > 0 || dt < SLICE_MS + 120) && dt < MAX_TOTAL_MS) {
      requestAnimationFrame(tick);
    } else {
      cv.remove();
      const cs = window.getComputedStyle(el);
      const rowGap = parseFloat(window.getComputedStyle(el.parentElement || el).rowGap || '0') || 0;
      const h = el.getBoundingClientRect().height;
      const hasNext = !!el.nextElementSibling;
      const hasPrev = !!el.previousElementSibling;
      el.style.boxSizing = 'border-box';
      el.style.height = h + 'px';
      el.style.minHeight = '0px';
      el.style.maxHeight = h + 'px';
      el.style.paddingTop = cs.paddingTop;
      el.style.paddingBottom = cs.paddingBottom;
      el.style.borderTopWidth = cs.borderTopWidth;
      el.style.borderBottomWidth = cs.borderBottomWidth;
      el.style.marginTop = cs.marginTop;
      el.style.marginBottom = cs.marginBottom;
      el.style.overflow = 'hidden';
      void el.offsetHeight;
      el.style.transition = [
        'height .32s cubic-bezier(.22,1,.36,1)',
        'max-height .32s cubic-bezier(.22,1,.36,1)',
        'margin-top .32s cubic-bezier(.22,1,.36,1)',
        'margin-bottom .32s cubic-bezier(.22,1,.36,1)',
        'padding-top .32s cubic-bezier(.22,1,.36,1)',
        'padding-bottom .32s cubic-bezier(.22,1,.36,1)',
        'border-width .24s ease',
        'opacity .18s ease'
      ].join(', ');
      requestAnimationFrame(() => {
        el.style.height = '0px';
        el.style.maxHeight = '0px';
        el.style.paddingTop = '0px';
        el.style.paddingBottom = '0px';
        el.style.borderTopWidth = '0px';
        el.style.borderBottomWidth = '0px';
        el.style.opacity = '0';
        if (rowGap > 0) {
          if (hasNext) el.style.marginBottom = (-rowGap) + 'px';
          else if (hasPrev) el.style.marginTop = (-rowGap) + 'px';
        }
      });
      setTimeout(onDone, 340);
    }
  };
  requestAnimationFrame(tick);
}

/* تحديث واجهة مشغل الصوت لكل الفقاعات الظاهرة */
function cpAuSync() {
  document.querySelectorAll('#thr .vm, .vm[data-mid]').forEach((el: any) => {
    const wrap = (el.closest && el.closest('[data-mid]')) || el;
    const mid = (wrap && wrap.dataset && wrap.dataset.mid) || (el.dataset && el.dataset.mid) || '';
    const isCur = mid && mid === _cpAuId && _cpAu;
    const playing = !!(isCur && !_cpAu.paused);
    el.classList.toggle('is-playing', playing);
    const btn = el.querySelector('.vp') as HTMLElement | null;
    const btnIn = el.querySelector('.vp-in');
    if (btnIn) btnIn.innerHTML = ic(playing ? 'pause' : 'play', 16);
    else if (btn) btn.innerHTML = ic(playing ? 'pause' : 'play', 16);
    const bars = el.querySelectorAll('.vw i');
    const vd = el.querySelector('.vd');
    const total = Number(vd && vd.dataset.dur) || (isCur && isFinite(_cpAu.duration) ? _cpAu.duration : 0) || 0;
    const frac = isCur && total ? Math.min(1, _cpAu.currentTime / total) : 0;
    if (btn) btn.style.setProperty('--vprog', Math.round(frac * 100) + '%');
    const upto = Math.round(frac * bars.length);
    bars.forEach((b: any, i: number) => b.classList.toggle('on', i < upto));
    if (vd) vd.textContent = isCur && (playing || frac > 0) ? `${fmtDur(_cpAu.currentTime)} / ${fmtDur(total)}` : fmtDur(total);
    const sp = el.querySelector('.vs');
    if (sp) sp.textContent = _cpRate + 'x';
  });
}

/* شعار الأمان البيومتري المتطور 2026 للدردشة المقفولة وإعداد الرمز */
function cpVaultEmblemSvg(size = 64): string {
  return `<svg class="lk-emblem-svg" width="${size}" height="${size}" viewBox="0 0 72 72" fill="none" aria-hidden="true">
    <circle class="lk-orbit" cx="36" cy="36" r="33" stroke="#1B1B1B" stroke-opacity=".18" stroke-width="1.6" stroke-dasharray="5 5"/>
    <path d="M12 20V12h8M52 12h8v8M60 52v8h-8M20 60h-8v-8" stroke="#1B1B1B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M36 12L54 20v14c0 12.8-7.8 22.8-18 26-10.2-3.2-18-13.2-18-26V20l18-8Z" fill="#FFFDF9" stroke="#1B1B1B" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M36 17.5L49 23.3V33.6c0 9.4-5.4 17.1-13 20.1-7.6-3-13-10.7-13-20.1V23.3L36 17.5Z" fill="#E9FAF4"/>
    <g class="lk-scan-beam"><line x1="22" y1="34" x2="50" y2="34" stroke="#0EA5E9" stroke-width="2" stroke-linecap="round" stroke-opacity=".75"/></g>
    <circle cx="36" cy="34" r="9" fill="#4BD4BE" stroke="#1B1B1B" stroke-width="2.3"/>
    <circle cx="36" cy="34" r="3" fill="#1B1B1B"/>
    <circle cx="52" cy="19" r="3.2" fill="#F3D85D" stroke="#1B1B1B" stroke-width="1.8"/>
  </svg>`;
}

/* مصنف ومحرك البحث الذكي الفوري جوه المحادثة */
function cpClassifyMsg(m: any) {
  const d = (m && m[5]) || {};
  const raw = String((m && m[1]) || '').trim();
  const deal = cpParseDealMsg(raw);
  const urls = raw ? cpExtractUrls(raw) : [];
  if (safeAudioUrl(d.audio)) return { cat: 'audio' as const, badge: t('chat_bdg_audio'), preview: t('msg_audio_lbl', { d: fmtDur(d.dur) }), searchBlob: AN(`صوت فويس تسجيل صوتي voice audio ${fmtDur(d.dur)} ${raw}`) };
  if ((Array.isArray(d.imgs) && d.imgs.length) || m[3]) return { cat: 'img' as const, badge: t('chat_bdg_img'), preview: raw || t('msg_img_alt'), searchBlob: AN(`صورة صور شغلك مرفق لقطة photo img image ${raw}`) };
  if (d.loc || urls.length) return { cat: 'link' as const, badge: d.loc ? t('chat_bdg_loc') : t('chat_bdg_link'), preview: d.loc ? t('msg_loc_lbl') : (urls[0] || raw), searchBlob: AN(d.loc ? `موقع عنوان لوكيشن خريطة فين مكان location map ${raw}` : `رابط لينك link url ${urls.join(' ')} ${raw}`) };
  const hasPriceSignal = !!deal || /(?:\d+\s*(?:ج\.?م|جنيه|ريال|egp|\$)|\b(?:سعر|السعر|كام|تمن|فلوس|اتفاق|عرض|مبلغ|price|cost|quote|deal)\b)/i.test(raw);
  if (hasPriceSignal) return { cat: 'deal' as const, badge: t(deal ? 'chat_bdg_deal' : 'chat_bdg_price'), preview: deal ? `${deal.title} · ${deal.price}` : raw, searchBlob: AN(`${raw} ${deal ? `${deal.title} ${deal.price} ${deal.when} ${deal.note || ''}` : ''} سعر فلوس تمن اتفاق جنيه price deal`) };
  return { cat: 'text' as const, badge: t('chat_bdg_msg'), preview: raw || t('chat_bdg_msg'), searchBlob: AN(raw) };
}

function cpSmartSearchAnalyze(c: any, rawQ = _chSearchQ, cat = _chSearchCat) {
  const counts: Record<string, number> = { all: 0, text: 0, deal: 0, audio: 0, img: 0, link: 0 };
  const q = AN(rawQ || '');
  const qWords = q ? q.split(/\s+/).filter(Boolean) : [];
  const wantsDeal = /^(?:سع|فلو|تم|جن|مصا|كا|اتف|بكا|مبل|عر)/.test(q) || /\b(?:سعر|فلوس|تمن|كام|اتفاق|جنيه|price|cost|deal)\b/.test(q);
  const wantsLoc = /^(?:مكا|موق|عنو|لوك|خر|فين|منط)/.test(q) || /\b(?:موقع|مكان|عنوان|لوكيشن|فين|خريطة|map|loc)\b/.test(q);
  const wantsAudio = /^(?:صو|فوي|تسج|سمع|voice|audio)/.test(q);
  const wantsImg = /^(?:صور|شغل|فيدي|لقط|photo|img|pic)/.test(q);
  const wantsTime = /^(?:ميع|وقت|بكر|نهار|امتى|ساع|when|time)/.test(q);
  const items: Array<{ id: string; cat: string; badge: string; preview: string; time: string; mine: boolean }> = [];
  const msgs = (c && Array.isArray(c.m)) ? c.m : [];
  for (let i = 0; i < msgs.length; i++) {
    const m = msgs[i];
    const id = String(m[4] || '');
    if (!id) continue;
    const info = cpClassifyMsg(m);
    const raw = String(m[1] || '');
    const matchDirect = !qWords.length || qWords.every(w => info.searchBlob.includes(w));
    const matchIntent = !!q && (
      (wantsDeal && (info.cat === 'deal' || /\d/.test(raw))) ||
      (wantsLoc && (!!(m[5] && m[5].loc) || /شارع|ميدان|بجوار|منطقة|محافظة/.test(raw))) ||
      (wantsAudio && info.cat === 'audio') ||
      (wantsImg && info.cat === 'img') ||
      (wantsTime && /الساعة|مساء|صباح|بكرة|النهارده|غداً|موعد|اتفاق/.test(raw))
    );
    if (!matchDirect && !matchIntent) continue;
    counts.all++;
    counts[info.cat] = (counts[info.cat] || 0) + 1;
    if (cat !== 'all' && info.cat !== cat) continue;
    items.push({ id, cat: info.cat, badge: info.badge, preview: info.preview, time: String(m[2] || ''), mine: m[0] === 1 });
  }
  return { counts, items };
}

function cpChatDealStripHtml(c: any): string {
  if (!c || !c.uid) return '';
  const deals = getMutualDealsWithUser(c.uid);
  const d = deals.awaitingMyConfirm;
  if (d) {
    return `<div class="chat-deal-strip"><span>${ic('shieldCheck', 15)} ${esc(t('chat_deal_wait', { t: d.t }))}</span><button class="btn sm mint" type="button" data-a="${d.mine ? 'done' : 'provDone'}" data-i="${esc(d.id)}">${ic('check', 13)} ${esc(t('chat_deal_ok_btn'))}</button></div>`;
  }
  return '';
}

function cpFloatBarsHtml(c: any): string {
  if (!c || !cpIsOpen(c)) return '';
  const pin = cpPinnedMsgOf(c);
  const pinHtml = (!_chSearchOpen && pin && pin.id)
    ? `<div class="chat-pin-bar">
        <button class="chat-pin-go" type="button" data-a="pingo" data-mid="${esc(pin.id)}">
          ${ic('pinMsg', 15)}
          <span><b>${esc(t('pin_msg_lbl'))}</b><small>${esc(pin.preview || t('pin_jump_hint'))}</small></span>
        </button>
        <button class="chat-pin-x" type="button" data-a="mpinx" aria-label="${esc(t('ctx_unpin'))}">${ic('x', 13)}</button>
      </div>`
    : '';
  let srchPanelHtml = '';
  if (_chSearchOpen) {
    const res = cpSmartSearchAnalyze(c, _chSearchQ, _chSearchCat);
    const cats: Array<[string, string]> = [
      ['all', t('chat_srch_all', { n: res.counts.all })],
      ...(res.counts.deal ? [['deal', t('chat_srch_deal', { n: res.counts.deal })] as [string, string]] : []),
      ...(res.counts.text ? [['text', t('chat_srch_text', { n: res.counts.text })] as [string, string]] : []),
      ...(res.counts.img ? [['img', t('chat_srch_img', { n: res.counts.img })] as [string, string]] : []),
      ...(res.counts.audio ? [['audio', t('chat_srch_audio', { n: res.counts.audio })] as [string, string]] : []),
      ...(res.counts.link ? [['link', t('chat_srch_link', { n: res.counts.link })] as [string, string]] : [])
    ];
    const recentFirst = res.items.slice().reverse().slice(0, 14);
    const hasFilter = !!(_chSearchQ.trim() || _chSearchCat !== 'all');
    const previewRows = (hasFilter || recentFirst.length)
      ? `<div class="csp-list">
          ${recentFirst.length
            ? recentFirst.map(it => `<button class="csp-item" type="button" data-a="chSearchPick" data-mid="${esc(it.id)}">
                <span class="csp-badge cat-${it.cat}">${esc(it.badge)}</span>
                <span class="csp-txt"><b>${it.mine ? esc(t('msg_you')) : esc(c.w)}</b><small>${esc(it.preview)}</small></span>
                <em class="csp-tm">${esc(it.time)}</em>
              </button>`).join('')
            : `<div class="csp-empty">${esc(t('chat_srch_empty', { q: _chSearchQ }))}</div>`}
        </div>`
      : '';
    srchPanelHtml = `<div class="ch-smart-panel" id="ch-smart-panel">
      <div class="csp-cats">${cats.map(ct => `<button class="csp-chip${_chSearchCat === ct[0] ? ' on' : ''}" type="button" data-a="chSearchCat" data-cat="${ct[0]}">${esc(ct[1])}</button>`).join('')}</div>
      ${previewRows}
    </div>`;
  }
  return (pinHtml || srchPanelHtml) ? `<div class="chat-float-bars" id="chat-float-bars">${srchPanelHtml}${pinHtml}</div>` : '';
}

/* تحديث صندوق المحادثة بتوافق ذكي بدون وميض أو إعادة تحميل للصور والخرائط */
function cpRenderThread(c: any, removed: string[] = []) {
  const th = $('#thr');
  if (!th) return;

  if (removed.length) {
    removed.forEach(id => {
      const sel = `[data-mid="${(window as any).CSS && CSS.escape ? CSS.escape(id) : id}"]`;
      const el = th.querySelector(sel) as HTMLElement | null;
      if (el) cpDisintegrateEl(el, () => { if (el.parentNode === th) el.remove(); });
    });
  }

  const near = th.scrollHeight - th.scrollTop - th.clientHeight < 170;

  if (!c.m || !c.m.length) {
    const aliveDissolving = th.querySelector('[data-dissolving="1"]');
    if (!aliveDissolving) th.innerHTML = chatThreadInnerHtml(c);
    else setTimeout(() => { if ($('#thr') === th && (!c.m || !c.m.length)) th.innerHTML = chatThreadInnerHtml(c); }, 1550);
    return;
  }

  const hero = th.querySelector('.chero');
  if (hero) hero.remove();
  th.querySelectorAll(':scope > [data-sig]:not([data-mid])').forEach((n: any) => n.remove());

  const wc = getWarnCount(c.uid);
  const oldStrip = th.querySelector('.chat-warn-strip');
  if (wc >= 3 && !oldStrip) {
    th.insertAdjacentHTML('afterbegin', `<div class="chat-warn-strip"><span>${ic('warn', 15)} ${esc(t('warn_thread_strip', { p: warnPeopleTxt(wc) }))}</span><button class="btn sm white" type="button" data-a="prof" data-uid="${esc(c.uid)}" data-n="${esc(c.w)}">${esc(t('view_his_page'))}</button></div>`);
  } else if (wc < 3 && oldStrip) {
    oldStrip.remove();
  }

  const existing = new Map<string, HTMLElement>();
  th.querySelectorAll(':scope > [data-mid]').forEach((node: any) => {
    const mid = node.dataset.mid;
    if (mid && node.dataset.dissolving !== '1') existing.set(mid, node);
  });

  const keepIds = new Set<string>();
  const parser = document.createElement('div');
  const advanceCursor = (node: ChildNode | null): ChildNode | null => {
    let p: ChildNode | null = node;
    while (p && p instanceof HTMLElement && p.dataset.dissolving === '1') {
      p = p.nextSibling;
    }
    return p;
  };
  let cursor: ChildNode | null = advanceCursor(
    th.querySelector('.chat-deal-strip')?.nextSibling || th.querySelector('.chat-warn-strip')?.nextSibling || th.firstChild
  );

  for (let idx = 0; idx < c.m.length; idx++) {
    const m = c.m[idx];
    const id = String(m[4] || '');
    const sig = cpMsgSig(m, idx, c);
    if (id) keepIds.add(id);
    const curEl = id ? existing.get(id) : null;
    if (curEl && curEl.dataset.sig === sig) {
      curEl.classList.add('settled');
      cursor = advanceCursor(cursor);
      if (curEl !== cursor) th.insertBefore(curEl, cursor);
      cursor = advanceCursor(curEl.nextSibling);
    } else {
      parser.innerHTML = bubHtml(m, idx, c);
      const fresh = parser.firstElementChild as HTMLElement;
      if (fresh) {
        if (curEl) {
          fresh.classList.add('settled');
          th.replaceChild(fresh, curEl);
          cursor = advanceCursor(fresh.nextSibling);
        } else {
          cursor = advanceCursor(cursor);
          th.insertBefore(fresh, cursor);
        }
      }
    }
  }

  existing.forEach((node, id) => {
    if (!keepIds.has(id) && node.dataset.dissolving !== '1') node.remove();
  });

  if (near && !removed.length) th.scrollTop = th.scrollHeight;
  cpAuSync();
  cpHydrateLinkCards();
}

function cpComposerHtml(c: any) {
  if (cpBlockedByMe(c)) {
    return `<div class="cblocked"><span>${ic('block', 17)} ${esc(t('chat_you_blocked', { name: c.w }))}</span><button class="btn sm mint" type="button" data-a="chblock2" data-un="1">${esc(t('chat_unblock_btn'))}</button></div>`;
  }
  if (cpBlockedByOther(c)) {
    return `<div class="cblocked"><span>${ic('block', 17)} ${esc(t('chat_blocked_other'))}</span></div>`;
  }
  const ed = _cpEdit
    ? `<div class="rbar ebanner"><span class="rbx" style="background:var(--sun)">${ic('edit', 15)}</span><div><b>${esc(t('edit_btn'))}</b><small>${esc(_cpEdit.text)}</small></div><button type="button" class="cb" data-a="meditx" aria-label="${esc(t('cancel'))}">${ic('x', 14)}</button></div>`
    : '';
  const rp = (!_cpEdit && _cpReply)
    ? `<div class="rbar"><span class="rbx">${ic('reply', 16)}</span><div><b>${esc(_cpReply.name)}</b><small>${esc(_cpReply.text)}</small></div><button type="button" class="cb" data-a="creplyx" aria-label="${esc(t('cancel'))}">${ic('x', 14)}</button></div>`
    : '';
  return `${ed || rp}
    <div class="comp-bar${_cmExpanded ? ' is-expanded' : ''}" id="cbox">
      <div class="cm-exp-head" id="cm-exp-head">
        <button class="cm-min-btn" type="button" data-a="cmExpand" title="${esc(t('cm_minimize'))}" aria-label="${esc(t('cm_minimize'))}">
          <span class="cm-min-ic">${ic('compress', 14)}</span>
          <span>${esc(t('cm_minimize'))}</span>
        </button>
        <div class="cm-exp-meta">
          <span id="cm-words">${esc(t('cm_words_init'))}</span>
        </div>
      </div>
      <div class="cm-row">
        <button class="cb cb-img" type="button" data-a="cattach" aria-label="${esc(t('cm_attach'))}" title="${esc(t('cm_attach'))}">${ic('plus', 20)}</button>
        <div class="cm-inp-col">
          <div class="cm-mirror" id="cm-mirror" aria-hidden="true"></div>
          <textarea id="cm" rows="1" maxlength="${MSG_MAX_CHARS}" placeholder="${esc(_cpEdit ? t('cm_edit_ph') : t('cm_msg_ph'))}" autocomplete="off"></textarea>
        </div>
        <div class="cm-end-acts">
          <button class="cm-exp-btn" id="cm-exp-btn" type="button" data-a="cmExpand" title="${esc(t('cm_expand_aria'))}" aria-label="${esc(t('cm_expand_aria'))}">${ic('expand', 14)}</button>
          <span class="cm-cnt" id="cm-cnt" aria-live="polite"></span>
          <button class="csend c-act mode-mic" type="button" id="c-act" data-a="cact" aria-label="${esc(t('cm_mic_title'))}">${ic('mic', 20)}</button>
        </div>
      </div>
    </div>
    <div class="rec-bar" id="rec-bar">
      <button class="cb rec-x" type="button" data-a="vcancel" aria-label="${esc(t('cancel'))}" title="${esc(t('cancel'))}">${ic('trash', 18)}</button>
      <button class="cb rec-p" id="rec-p" type="button" data-a="vpause" aria-label="${esc(t('pause_lbl'))}" title="${esc(t('pause_lbl'))}">${ic('pause', 16)}</button>
      <span class="rec-dot"></span><span class="rec-t" id="rec-t">0:00</span>
      <div class="rec-w" id="rec-w">${'<i></i>'.repeat(44)}</div>
      <button class="csend rec-s" type="button" data-a="vsend" aria-label="${esc(t('cm_send_title'))}" title="${esc(t('cm_send_title'))}">${ic('arrowup', 19)}</button>
    </div>`;
}

function cpTopHtml(c: any) {
  if (!c || !cpIsOpen(c)) {
    return `<span class="tb-ico on" title="${esc(t('chat_locked_sub'))}" aria-hidden="true">${ic('shieldCheck', 18)}</span>`;
  }
  return `<button class="tb-ico${_chSearchOpen ? ' on' : ''}" type="button" data-a="chsearch" title="${esc(t('chat_search_title'))}" aria-label="${esc(t('chat_search_title'))}">${ic('search', 18)}</button>
    <button class="tb-ico tb-menu modern-gear" type="button" data-a="chmenu" title="${esc(t('chat_options'))}" aria-label="${esc(t('chat_options'))}">${ic('sliders', 19)}</button>`;
}

function cpSyncTopHeader(c: any) {
  const sh = $('#shell');
  const topEl = $('#shell .top');
  const ttl = $('#ttl');
  const topEx = $('#top-extra');
  const isChat = cur === 'محادثة' && !!c;
  const searchOn = !!(isChat && cpIsOpen(c) && _chSearchOpen);
  if (sh) sh.classList.toggle('chat-search-mode', searchOn);
  if (topEl) {
    let ts = $('#ch-top-search');
    if (searchOn) {
      topEl.classList.remove('top-hide');
      if (!ts) {
        ts = document.createElement('div');
        ts.id = 'ch-top-search';
        ts.className = 'top-smart-search';
        ts.innerHTML = `<button class="tss-bk" type="button" data-a="chsearch" aria-label="${esc(t('close_search'))}">${ic('back', 18)}</button>
          <span class="tss-ic" aria-hidden="true">${ic('search', 16)}</span>
          <input id="ch-search-in" value="${esc(_chSearchQ)}" placeholder="${esc(t('chat_search_ph'))}" autocomplete="off">
          <small id="ch-search-cnt" class="tss-cnt"></small>
          <button class="tss-clr" id="ch-search-clr" type="button" data-a="chSearchClr" aria-label="${esc(t('clear_search'))}" style="display:${_chSearchQ ? 'inline-flex' : 'none'}">${ic('x', 13)}</button>
          <div class="tss-nav">
            <button type="button" data-a="chSearchNav" data-d="-1" aria-label="${esc(t('prev_lbl'))}">${ic('chev', 14)}</button>
            <button type="button" data-a="chSearchNav" data-d="1" aria-label="${esc(t('next_lbl'))}" style="transform:rotate(180deg)">${ic('chev', 14)}</button>
          </div>`;
        topEl.appendChild(ts);
      } else {
        const clrBtn = $('#ch-search-clr') as HTMLElement | null;
        if (clrBtn) clrBtn.style.display = _chSearchQ ? 'inline-flex' : 'none';
      }
    } else if (ts) {
      ts.remove();
    }
  }
  if (!ttl || !isChat) return;
  if (!cpIsOpen(c)) {
    ttl.removeAttribute('data-a');
    delete ttl.dataset.uid; delete ttl.dataset.n; delete ttl.dataset.ph;
    ttl.className = 'chtt is-locked';
    ttl.innerHTML = `${avH(34, { name: c.w, photo: c.photo })}<span class="lk-head-wrap"><b>${ic('shieldCheck', 13)} ${cpMaskNameHtml(c.w)}</b><small class="lk-sub">${esc(t('chat_locked_sub'))}</small></span>`;
  } else {
    if (c.uid) {
      ttl.className = 'chtt who-link';
      ttl.dataset.a = 'prof';
      ttl.dataset.uid = c.uid;
      ttl.dataset.n = c.w || '';
      ttl.dataset.ph = c.photo || '';
    } else {
      ttl.removeAttribute('data-a');
      ttl.className = 'chtt';
    }
    ttl.innerHTML = `${avH(34, { name: c.w, photo: c.photo })}<span><b>${esc(c.w)}</b><small>${esc(t('chat_profile_hint'))}</small></span>`;
  }
  if (topEx) { topEx.style.display = 'flex'; topEx.innerHTML = cpTopHtml(c); }
}

function syncOtpMeter(row: HTMLElement | null) {
  if (!row) return;
  const boxes = Array.from(row.querySelectorAll('.otp-box')) as HTMLInputElement[];
  let filled = 0;
  boxes.forEach(b => {
    const has = (b.value || '').length === 1;
    b.classList.toggle('is-filled', has);
    if (has) filled++;
  });
  const meter = row.parentElement?.querySelector('.otp-meter') || $('#otp-meter');
  if (meter) {
    meter.querySelectorAll('.otp-pip').forEach((pip, idx) => {
      pip.classList.toggle('on', idx < filled);
    });
  }
}

function cpLockScreenHtml(c: any) {
  const tp = _otpReveal ? 'text' : 'password';
  const revCls = _otpReveal ? ' is-revealed' : '';
  const boxes = Array.from({ length: 6 }, (_, i) => `<input class="otp-box${revCls}" type="${tp}" maxlength="1" data-idx="${i}" data-a="otpkey" autocomplete="off" inputmode="text" aria-label="${esc(t('otp_box_aria', { n: i + 1 }))}">`).join('');
  const pips = Array.from({ length: 6 }, () => `<i class="otp-pip" aria-hidden="true"></i>`).join('');
  const visTxt = _otpReveal ? t('lock_hide') : t('lock_show');
  return `<div class="lockscr">
    <div class="lk-card">
      <div class="lk-peer">
        ${avH(36, { name: c.w, photo: c.photo })}
        <span class="lk-peer-name">${cpMaskNameHtml(c.w)}</span>
        <span class="lk-peer-shield" aria-hidden="true">${ic('shieldCheck', 13)}</span>
      </div>
      <div class="lk-ic lk-vault">${cpVaultEmblemSvg(68)}</div>
      <div class="otp-row" id="otp-row">${boxes}</div>
      <div class="otp-meter" id="otp-meter" aria-hidden="true">${pips}</div>
      <div class="lk-ctrls">
        <button class="otp-reveal-pill${_otpReveal ? ' on' : ''}" type="button" data-a="otpEye" title="${esc(visTxt)}" aria-label="${esc(t('otp_toggle_aria'))}" aria-pressed="${_otpReveal ? 'true' : 'false'}">
          <span class="orp-ic">${ic(_otpReveal ? 'eyeOff' : 'eye', 15)}</span>
          <span class="orp-lbl">${esc(visTxt)}</span>
          <span class="orp-dot" aria-hidden="true"></span>
        </button>
        <button class="btn mint otp-go" type="button" id="cpin-go" data-a="cunlock">${ic('shieldCheck', 16)} ${esc(t('lock_open'))}</button>
      </div>
      <small id="cpin-err" class="cpin-err"></small>
    </div>
  </div>`;
}

VIEWS['الرسائل'] = () => {
  if (!isIn()) return gatePanel(tView('الرسائل'), t('gate_msg_sub'));
  const shown = CHATS.map((c, i) => ({ c, i })).filter(x => !cpHidden(x.c))
    .sort((a, b) => (Number(cpIsPinned(b.c)) - Number(cpIsPinned(a.c))) || ((b.c.updatedAtMs || 0) - (a.c.updatedAtMs || 0)));
  const archN = shown.filter(x => x.c.archived).length;
  const rows = shown.filter(({ c }) => _cpShowArch ? !!c.archived : !c.archived);

  if (!shown.length) {
    return `<div class="empty2 chero">
      ${heroStage()}
      <h2>${esc(t('empty_chats_h'))}</h2>
      <p>${esc(t('empty_chats_p'))}</p>
      <button class="btn mint" type="button" data-a="tab" data-n="مقدمو الخدمة">${ic('search', 17)} ${esc(t('see_provs_btn'))}</button>
    </div>`;
  }

  const archBanner = (_cpShowArch || archN > 0)
    ? `<button class="arch-row${_cpShowArch ? ' active' : ''}" type="button" data-a="archview">
        <span class="arch-ic">${ic(_cpShowArch ? 'back' : 'archive', 18)}</span>
        <span class="arch-txt"><b>${esc(_cpShowArch ? t('chat_arch_back') : t('chat_arch_lbl'))}</b><small>${esc(_cpShowArch ? t('chat_arch_cnt', { n: archN }) : t('chat_arch_sub'))}</small></span>
        ${!_cpShowArch ? `<em class="arch-cnt">${archN}</em>` : ''}
      </button>`
    : '';

  const listHtml = rows.length
    ? rows.map(({ c, i }) => {
        const last = c.m[c.m.length - 1];
        const locked = !cpIsOpen(c);
        const pinned = cpIsPinned(c);
        const blocked = cpBlockedByMe(c);
        const wc = getWarnCount(c.uid);
        const draftTxt = !locked ? cpGetDraft(c.cid).trim() : '';
        const rawPreview = draftTxt ? draftTxt : (last ? cpPreview(last) : (c.lastText || t('start_talk_now')));
        const nameHtml = locked ? cpMaskNameHtml(c.w) : esc(c.w);
        const prevHtml = locked
          ? `<span class="lk-prev">${cpSpoilerHtml(t('spoiler_hidden'), 7)} <em>${esc(t('chat_locked_row'))}</em></span>`
          : (draftTxt ? `<em class="draft-tag">${esc(t('chat_draft_tag'))}</em> ${esc(rawPreview)}` : esc(rawPreview));
        const tm = locked ? '' : (last ? last[2] : (c.lastTime || ''));

        return `<button class="chrow${locked ? ' is-locked' : ''}" type="button" data-a="ch" data-i="${i}">
          <span class="chrow-av">${avH(46, { name: c.w, photo: c.photo })}${locked ? `<em class="chrow-lk">${ic('shieldCheck', 11)}</em>` : ''}</span>
          <span class="cht">
            <b>
              ${pinned ? `<span class="pin-dot" title="${esc(t('pinned_lbl'))}">${ic('pinMsg', 12)}</span>` : ''}
              ${nameHtml}
              ${blocked ? `<span class="tag cancelled" style="font-size:.66rem;padding:1px 6px">${esc(t('chat_blocked_tag'))}</span>` : ''}
              ${(!locked && wc >= 3) ? `<span class="tag warn" style="font-size:.66rem;padding:1px 6px">${esc(t('warn_tag_cnt', { n: wc }))}</span>` : ''}
            </b>
            <small>${prevHtml}</small>
          </span>
          <span class="chm">${esc(tm)}${(!locked && c.u > 0) ? `<em class="bdg">${c.u}</em>` : ''}</span>
        </button>`;
      }).join('')
    : `<div class="empty2" style="padding:36px 14px">${bear(64, 'lav')}<h3>${esc(_cpShowArch ? t('arch_empty') : t('arch_all'))}</h3>${!_cpShowArch && archN ? `<button class="btn sm white" type="button" data-a="archview">${esc(t('arch_open', { n: archN }))}</button>` : ''}</div>`;

  return `<div class="list single msg-list">${archBanner}${listHtml}</div>`;
};

function chatThreadInnerHtml(c) {
  const wc = getWarnCount(c.uid);
  const strip = wc >= 3
    ? `<div class="chat-warn-strip"><span>${ic('warn', 15)} ${esc(t('chat_warn_msg'))} (${warnPeopleTxt(wc)})</span><button class="btn sm white" type="button" data-a="prof" data-uid="${esc(c.uid)}" data-n="${esc(c.w)}">${esc(t('view_his_page'))}</button></div>`
    : '';
  const dealStrip = cpChatDealStripHtml(c);
  if (c.m.length) return strip + dealStrip + c.m.map((m, idx) => bubHtml(m, idx, c)).join('');
  return strip + dealStrip + `
    <div class="chero">
      ${heroStage()}
      <h2>${esc(t('chat_start_hi', { name: c.w }))}</h2>
      <p>${esc(t('chat_start_sub'))}</p>
      <div class="cqk">
        ${getQrChips().map(q => `<button class="qchip" type="button" data-a="qr" data-t="${esc(q[2])}">${ic(q[0], 15)} ${esc(q[1])}</button>`).join('')}
      </div>
    </div>
  `;
}

VIEWS['محادثة'] = () => {
  const c = CHATS[chat];
  if (!c) return VIEWS['الرسائل']();
  if (!cpIsOpen(c)) return cpLockScreenHtml(c);
  return `
    ${cpFloatBarsHtml(c)}
    <div class="thr" id="thr">
      ${chatThreadInnerHtml(c)}
    </div>
    <button id="thr-down" class="thr-down" type="button" data-a="thrDown" aria-label="${esc(t('thr_down_aria'))}" style="display:none">${ic('down', 18)}</button>
    <div class="cwrap" id="cwrap">${cpComposerHtml(c)}</div>
  `;
};

/* 6. المحفوظات + الإشعارات + حسابي + المزيد + طلب جديد */
VIEWS['المحفوظات'] = () => {
  const savedList = REQS.filter(r => SAVED_IDS.has(r.id));
  return savedList.length
    ? `<div class="list">${savedList.map(reqCard).join('')}</div>`
    : `<div class="empty2">${bear(72, 'sun')}<h3>${esc(t('saved_empty_h'))}</h3><p>${esc(t('saved_empty_p'))}</p></div>`;
};

VIEWS['الإشعارات'] = () => {
  if (!isIn()) return gatePanel(tView('الإشعارات'), t('gate_notifs_sub'));
  return NOTIFS.length
    ? `<div class="list single">${NOTIFS.map(n => `<button type="button" class="notif-row${n.read ? '' : ' unread'}" data-a="openNotif" data-id="${esc(n.id)}">
        <span class="notif-main">
          <i class="tile" style="background:${n.bg || 'var(--peach)'}">${ic(n.ico || 'bellring', 19)}</i>
          <span class="notif-txt">
            <b>${esc(n.txt)}</b>
            ${n.sub ? `<small>${esc(n.sub)}</small>` : ''}
          </span>
        </span>
        <span class="notif-meta">
          <small>${esc(n.ago)}</small>
          ${ic('chev', 15)}
        </span>
      </button>`).join('')}</div>`
    : `<div class="empty2">${bear(72, 'mint')}<h3>${esc(t('notif_empty_h'))}</h3><p>${esc(t('notif_empty_p'))}</p></div>`;
};

const tileHtml = (n, c) => `<i class="tile" style="background:${c}">${ic(n, 19)}</i>`;
const row2Html = (n: string, c: string, lbl: string, val: string, act?: string) =>
  `<${act ? 'button type="button"' : 'div'} class="row2"${act ? ` data-a="${act}"` : ''}>${tileHtml(n, c)}<span class="r2t"><small>${lbl}</small><b>${val}</b></span>${act ? ic('chev', 16) : ''}</${act ? 'button' : 'div'}>`;

VIEWS['حسابي'] = () => {
  if (!isIn()) return gatePanel(tView('حسابي'), t('gate_acc_sub'));
  const nm = myDisplayName();
  const myCount = REQS.filter(r => r.mine).length;
  return `<div class="pf">
    <div class="cover"></div>
    <div class="pfh">
      <div class="ring">${myAv(88)}<button class="cam" type="button" data-a="photo" aria-label="${esc(t('acc_cam_aria'))}">${ic('camera', 16)}</button></div>
      <h2>${esc(nm)}</h2>
      <small>${ic('pin', 13)} ${esc(tLocText(profile.city || ''))}${profile.gov ? ' · ' + esc(tLocText(profile.gov)) : ''}</small>
    </div>
    <div class="stats">
      <div><b>${myCount}</b><small>${esc(t('acc_reqs'))}</small></div>
      <div><b>${MY.on ? (MY.rc > 0 ? MY.r.toFixed(1) : esc(t('new_badge'))) : '—'}</b><small>${esc(t('acc_rate'))}</small></div>
      <div><b>${CHATS.length}</b><small>${esc(t('acc_chats'))}</small></div>
    </div>

    ${secH(t('acc_av_sec'))}
    <div class="pre">
      ${PRE.map((p, i) => `<button class="pa${profile.avatar === 'p' + i && !profile.photo ? ' on' : ''}" type="button" data-a="preset" data-i="${i}" aria-label="Avatar ${i + 1}">${avH(48, { preset: 'p' + i })}</button>`).join('')}
    </div>
    <div class="meta" style="margin-bottom:4px">
      <button class="btn sm mint" type="button" data-a="photo">${ic('camera', 15)} ${esc(t('acc_upload'))}</button>
      ${profile.photo ? `<button class="btn sm white" type="button" data-a="rmphoto">${ic('trash', 14)} ${esc(t('acc_use_google_av'))}</button>` : ''}
    </div>

    ${secH(t('acc_info_sec'))}
    <div class="grp">
      ${row2Html('phone', 'var(--mint)', esc(t('acc_phone')), profile.phone ? cpSpoilerHtml(t('spoiler_tap'), 6, profile.phone, { cls: 'ltr' }) : '<span class="ltr">—</span>')}
      ${row2Html('pin', 'var(--sun)', esc(t('acc_loc')), esc((tLocText(profile.city || '') || '—') + (profile.gov ? ' · ' + tLocText(profile.gov) : '')))}
      ${row2Html('seal', 'var(--lav)', esc(t('acc_role')), MY.on ? esc(t('acc_role_on', { n: MY.n })) : esc(t('acc_role_off')))}
    </div>

    ${secH(t('acc_ctrl_sec'))}
    <div class="grp">
      ${MY.on ? row2Html('lightning', MY.ok !== false ? 'var(--mint)' : 'var(--peach)', esc(t('acc_req_toggle_lbl')), MY.ok !== false ? esc(t('acc_avail_tog')) : esc(t('acc_busy_tog')), 'toggleAvail') : ''}
      ${row2Html('user', 'var(--sun)', esc(t('acc_pub_lbl')), MY.on ? esc(t('acc_pub_me')) : esc(t('acc_pub_usr')), 'myProf')}
      ${row2Html('edit', 'var(--sun)', esc(t('acc_name_ph_addr')), esc(t('acc_edit_row')), 'edit')}
      ${row2Html('seal', 'var(--mint)', esc(t('acc_work_lbl')), MY.on ? esc(t('acc_work_edit')) : esc(t('acc_work_reg')), 'bp')}
      ${row2Html('out', 'var(--coral)', esc(t('acc_hdr')), esc(t('logout_row')), 'out')}
    </div>


  </div>`;
};

const rqCatsHtml = () => `<div class="cats">${CATS.map((c, i) => `<button type="button" class="cat${RQ.c === i ? ' sel' : ''}" style="--c:${c[2]}" data-a="rcat" data-i="${i}"><span>${ic(c[1], 22)}</span>${esc(tCat(i))}</button>`).join('')}</div>`;
const rqSubsHtml = () => {
  if (RQ.c < 0) return `<small>${esc(t('pick_cat_first'))}</small>`;
  const baseSubs = SUBS[RQ.c] || [];
  const isCustom = RQ.sub === '__custom__';
  return `<div class="fq">${[...baseSubs.map(s => chipBtn(RQ.sub === s, 'rsub', esc(s), esc(tSub(RQ.c, s)))), chipBtn(isCustom, 'rsub', '__custom__', t('custom_sub_chip'))].join('')}</div>` +
    (isCustom ? `<div class="cust-sub-box"><small>${esc(t('custom_sub_lbl'))}</small><input id="rcust-sub" value="${esc(RQ.customSub || '')}" placeholder="${esc(t('custom_sub_ph'))}"></div>` : '');
};
const rqImgsHtml = () => RQ.imgs.map((d: any, i: number) => {
  const su = safeImgUrl(d);
  return su ? `<div class="th"><img src="${esc(su)}" alt=""><button type="button" data-a="rimgx" data-i="${i}" aria-label="${esc(t('del_btn'))}">${ic('x', 13)}</button></div>` : '';
}).join('') +
  (RQ.imgs.length < 3 ? `<button type="button" class="th add" data-a="rimg">${ic('camera', 22)}<small>${esc(t('add_photo_tile'))}</small></button>` : '');

VIEWS['طلب جديد'] = () => {
  if (!isIn()) return gatePanel(t('gate_post_title'), t('gate_post_sub'));
  if (!LOC.rq.c && profile.city) LOC.rq = { g: profile.gov || '', c: profile.city };
  return `<div class="form">
    <div class="assist-box">
      <div>${ic('sparkle', 20)}<b>${esc(t('assist_title'))}</b></div>
      <small>${esc(t('assist_sub'))}</small>
      <button class="btn sm white" type="button" data-a="smartAssist">${esc(t('assist_btn'))}</button>
    </div>
    <div class="field">
      <label for="rt">${esc(t('post_title_lbl'))}</label>
      <input id="rt" placeholder="${esc(t('post_title_ph'))}">
    </div>
    <div class="field">
      <label>${esc(t('post_cat_lbl'))}</label>
      <div id="rcats">${rqCatsHtml()}</div>
      <div id="rsubs" style="margin-top:6px">${rqSubsHtml()}</div>
    </div>
    <div class="field">
      <label for="rd">${esc(t('post_det_lbl'))}</label>
      <textarea id="rd" placeholder="${esc(t('post_det_ph'))}"></textarea>
    </div>
    <div class="field">
      <label>${esc(t('post_imgs_lbl'))}</label>
      <div class="imgs" id="rimgs">${rqImgsHtml()}</div>
    </div>
    <div class="field">
      <label>${esc(t('post_loc_lbl'))}</label>
      ${locBtn('rq')}
      <button type="button" class="btn sm white" id="rloc" data-a="rloc" style="align-self:flex-start">${ic('nav', 14)} ${esc(RQ.xy ? t('gps_ok') : t('gps_use'))}</button>
    </div>
    <div class="field">
      <label for="ra">${esc(t('post_area_lbl'))}</label>
      <input id="ra" value="${esc(profile.area || '')}" placeholder="${esc(t('street_ph'))}">
    </div>
    <div class="names" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      <div class="field">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
          <label for="rb">${esc(t('post_bud_lbl'))}</label>
          <button class="btn sm white" type="button" data-a="openEstimator" style="padding:3px 9px;font-size:.74rem">${ic('calc', 13)} ${esc(t('calc_btn'))}</button>
        </div>
        <input id="rb" type="number" inputmode="numeric" placeholder="${esc(t('post_bud_ph'))}">
      </div>
      <div class="field">
        <label for="rw">${esc(t('post_when_lbl'))}</label>
        <select id="rw">
          <option value="مستعجل النهاردة">${esc(t('need_urgent'))}</option>
          <option value="في أقرب وقت" selected>${esc(t('need_asap'))}</option>
          <option value="خلال يومين تلاتة">${esc(t('need_days'))}</option>
          <option value="وقتي مرن">${esc(t('need_flex'))}</option>
        </select>
      </div>
    </div>
    <button class="btn coral" type="button" data-a="post">${ic('plus', 17)} ${esc(t('post_submit'))}</button>
  </div>`;
};

/* ====== البحث الذكي والمزيد وصفحة اللغات المستقلة والبوابة ====== */
const NAV = [
  ['الرئيسية', 'home', 'var(--coral)'],
  ['طلبات قريبة', 'near', 'var(--mint)'],
  ['طلباتي', 'list', 'var(--sun)'],
  ['مقدمو الخدمة', 'star', 'var(--lav)'],
  ['الرسائل', 'mail', 'var(--mint)'],
  ['المحفوظات', 'bookmark', 'var(--sun)'],
  ['الإشعارات', 'bell', 'var(--peach)'],
  ['اللغة', 'globe', 'var(--sky)'],
  ['حسابي', 'user', 'var(--sky)']
];
const MAIN_TABS = ['الرئيسية', 'طلبات قريبة', 'طلباتي', 'بحث'];
const FULL_VIEWS = ['طلب جديد', 'محادثة', 'ملف مقدم الخدمة', 'اللغة'];
let cur = 'الرئيسية', backView = 'الرئيسية';
const _navStack: string[] = ['الرئيسية'];
let _langHubQ = '';

function renderLangCardsGrid(rawQ = _langHubQ): string {
  const q = String(rawQ || '').trim().toLowerCase();
  const curC = curLang();
  const filtered = LANGS.filter(l =>
    !q ||
    l.nativeName.toLowerCase().includes(q) ||
    l.regionLabel.toLowerCase().includes(q) ||
    l.cultureTitle.toLowerCase().includes(q) ||
    l.cultureSub.toLowerCase().includes(q) ||
    l.code.toLowerCase().includes(q) ||
    l.badge.toLowerCase().includes(q)
  );
  if (!filtered.length) {
    return `<div class="empty2" style="grid-column:1/-1">${bear(64, 'sky')}<h3>${esc(t('lang_empty_search'))}</h3></div>`;
  }
  return filtered.map(l => {
    const active = l.code === curC;
    const dirLbl = l.dir === 'rtl' ? t('lang_dir_rtl') : t('lang_dir_ltr');
    return `<button class="lang-card${active ? ' on' : ''}" type="button" data-a="pickLang" data-lang="${esc(l.code)}">
      <div class="lang-card-media">
        <img src="${esc(l.photoUrl)}" alt="${esc(l.nativeName)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
        <div class="lang-card-overlay">
          <div class="lang-card-top-tags">
            <span class="lang-code-badge">${esc(l.badge)}</span>
            <span class="lang-spk-pill">${ic('users', 12)} ${esc(l.speakersBadge)}</span>
          </div>
          <div class="lang-card-head-tx">
            <div>
              <b>${esc(l.nativeName)}</b>
              <div><small>${esc(l.regionLabel)}</small></div>
            </div>
            ${active ? `<span class="lang-check">${ic('check', 14)}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="lang-card-body">
        <div class="lang-culture-h">${esc(l.cultureTitle)}</div>
        <div class="lang-culture-p">${esc(l.cultureSub)}</div>
        <div class="lang-card-quote" dir="${l.dir}">«${esc(l.sampleGreeting)}»</div>
        <div class="lang-card-meta">
          <span class="lang-mini-tag">${ic('globe', 12)} ${esc(dirLbl)}</span>
          <span class="lang-mini-tag">${ic('mic', 12)} ${esc(t('lang_voice_ready'))} (${esc(l.speechLang)})</span>
        </div>
        <div class="lang-card-cta">
          ${active ? `${ic('check', 15)} <span>${esc(t('lang_active_badge'))}</span>` : `${ic('globe', 15)} <span>${esc(t('lang_select_btn'))}</span>`}
        </div>
      </div>
    </button>`;
  }).join('');
}

VIEWS['اللغة'] = () => {
  const curMeta = getLangMeta();
  return `<div class="lang-hub">
    <section class="lang-hero">
      <div class="lang-hero-top">
        <div class="lang-hero-title">
          <span class="lang-hero-orb">${ic('globe', 26)}</span>
          <div>
            <h2>${esc(t('lang_page_hero_h'))}</h2>
            <p>${esc(t('lang_page_hero_p'))}</p>
          </div>
        </div>
      </div>
      <div class="lang-hero-badges">
        <span class="lang-cap-chip mint">${ic('check', 14)} ${esc(curMeta.nativeName)} · ${esc(curMeta.regionLabel)}</span>
        <span class="lang-cap-chip sun">${ic('globe', 14)} ${esc(t('lang_stat_langs'))}</span>
        <span class="lang-cap-chip lav">${ic('pin', 14)} ${esc(t('lang_stat_govs'))}</span>
        <span class="lang-cap-chip">${ic('mic', 14)} ${esc(t('lang_voice_ready'))} (${esc(curMeta.speechLang)})</span>
      </div>
    </section>
    <div class="lang-search-wrap">
      ${ic('search', 18)}
      <input id="lang-q" type="search" value="${esc(_langHubQ)}" placeholder="${esc(t('lang_search_ph'))}" autocomplete="off">
    </div>
    <div class="lang-grid" id="lang-grid-host">
      ${renderLangCardsGrid(_langHubQ)}
    </div>
  </div>`;
};

function gatePanel(title, sub) {
  if (!authReady && store.get(SESSION_HINT_K) === '1') {
    return `<div class="list single">${reqSkels(2)}</div>`;
  }
  return `<div class="gp">
    <span class="gi">${bear(56, 'lav')}</span>
    <h3>${esc(title)}</h3>
    <p>${esc(sub)}</p>
    <button class="btn coral" type="button" data-a="gate">${esc(user ? t('gate_complete') : t('gate_google'))}</button>
  </div>`;
}

function startGate() {
  if (user) go('s1');
  else if (getSavedAccts().length) go('login');
  else gsign();
}
function gate(fn) {
  if (isIn()) return false;
  PEND = fn;
  startGate();
  return true;
}

VIEWS['المزيد'] = () => {
  const unreadChat = CHATS.reduce((s, c) => s + (c.u || 0), 0);
  const curMeta = getLangMeta();
  const items = NAV.filter(n => !['الرئيسية', 'طلبات قريبة', 'طلباتي'].includes(n[0]));
  return `<div class="list single">
    ${items.map(n => {
      const badge = n[0] === 'الإشعارات' && UNREAD ? `<em class="bdg">${UNREAD}</em>`
        : n[0] === 'الرسائل' && unreadChat ? `<em class="bdg">${unreadChat}</em>`
        : n[0] === 'المحفوظات' && SAVED_IDS.size ? `<em class="bdg" style="background:var(--sun)">${SAVED_IDS.size}</em>`
        : n[0] === 'اللغة' ? `<span class="lang-cur-pill">${esc(curMeta.nativeName)} · ${esc(curMeta.badge)}</span>` : '';
      return `<button class="row" type="button" data-a="tab" data-n="${n[0]}">
        <span style="display:flex;gap:12px;align-items:center"><i class="tile" style="background:${n[2]}">${ic(n[1], 19)}</i><span>${esc(tView(n[0]))}</span></span>
        <span style="display:flex;gap:8px;align-items:center">${badge}${ic('chev', 16)}</span>
      </button>`;
    }).join('')}
    <button class="row" type="button" data-a="shareApp">
      <span style="display:flex;gap:12px;align-items:center"><i class="tile" style="background:var(--sun)">${ic('share', 19)}</i><span>${esc(t('share_app_row'))}</span></span>
      ${ic('chev', 16)}
    </button>
    ${(user || isIn())
      ? `<button class="row" type="button" data-a="out"><span style="display:flex;gap:12px;align-items:center"><i class="tile" style="background:var(--coral)">${ic('out', 19)}</i><span>${esc(t('logout_row'))}</span></span>${ic('chev', 16)}</button>`
      : `<button class="row" type="button" data-a="gate"><span style="display:flex;gap:12px;align-items:center"><i class="tile" style="background:var(--mint)">${ic('user', 19)}</i><span>${esc(t('login_row'))}</span></span>${ic('chev', 16)}</button>`}
  </div>`;
};

/* البحث الذكي بالعربي والمرادفات المصرية وكل اللغات الـ 8 */
const AN = t => String(t || '').toLowerCase()
  .replace(/[\u064B-\u0652\u0640]/g, '')
  .replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
  .replace(/[^\u0600-\u06FFa-z0-9\u0400-\u04FF\u4E00-\u9FA5\s]/g, ' ').replace(/\s+/g, ' ').trim();
const stem = w => w.replace(/^(وال|بال|كال|ال|لل)/, '');
const lev1 = (a, b) => {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, e = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++e > 1) return false;
    if (a.length > b.length) i++; else if (a.length < b.length) j++; else { i++; j++; }
  }
  return e + (a.length - i) + (b.length - j) <= 1;
};
const CKW = CATS.map((c, i) => [...new Set(AN(c[0] + ' ' + KW[i][1] + ' ' + (SUBS[i] || []).join(' ')).split(' ').map(stem))].filter(w => w.length > 1));
const wm = (w, t) => w === t ? 3 : (t.length > 1 && w.startsWith(t)) ? 2 : (t.length > 2 && w.includes(t)) ? 1.5 : (t.length > 3 && w.length > 3 && lev1(w, t)) ? 1.2 : 0;

function smart(q) {
  const toks = AN(q).split(' ').map(stem).filter(Boolean);
  if (!toks.length) return { cats: [], provs: [], reqs: [] };
  const cs = CKW.map((ws, i) => {
    const locTerms = AN(tCat(i) + ' ' + (SUBS[i] || []).map(s => tSub(i, s)).join(' ')).split(' ').filter(Boolean);
    const allWs = [...ws, ...locTerms];
    return toks.reduce((a, tok) => a + Math.max(0, ...allWs.map(w => wm(w, tok))) / 3, 0);
  });
  const score = (blob, c) => {
    const ws = AN(blob).split(' ').map(stem);
    let s = 0;
    toks.forEach(tok => { s += Math.max(0, ...ws.map(w => wm(w, tok))); });
    return s + (c >= 0 ? cs[c] * 2.5 : 0);
  };
  const top = (arr, fn) => arr.map(x => ({ x, s: fn(x) })).filter(o => o.s >= 1.2).sort((a, b) => b.s - a.s).map(o => o.x);
  const topReqs = (arr, fn) =>
    arr.map(x => ({ x, s: fn(x) }))
      .filter(o => o.s >= 1.2)
      .sort((a, b) => (reqStatusRank(a.x) - reqStatusRank(b.x)) || (b.s - a.s) || ((b.x.ts || 0) - (a.x.ts || 0)))
      .map(o => o.x);
  return {
    cats: CATS.map((c, i) => i).filter(i => cs[i] >= 0.6 || score(CATS[i][0] + ' ' + tCat(i), -1) >= 2).slice(0, 3),
    provs: top(PROV.map((p, i) => ({ p, i })), o => score(o.p.n + ' ' + (o.p.spec || '') + ' ' + CATS[o.p.c][0] + ' ' + tCat(o.p.c) + ' ' + o.p.loc + ' ' + tLocText(o.p.loc) + ' ' + (o.p.bio || ''), o.p.c)).slice(0, 10),
    reqs: topReqs(REQS.filter(r => r.rawStatus !== 'cancelled'), r => score(r.t + ' ' + r.d + ' ' + (r.sub || '') + ' ' + tSub(r.c, r.sub || '') + ' ' + CATS[r.c][0] + ' ' + tCat(r.c) + ' ' + r.loc + ' ' + tLocText(r.loc), r.c)).slice(0, 10)
  };
}

let SEM: any = null;
const sRow = (ico, t, sub, a, att) => `<button type="button" data-a="${a}" ${att}>${ic(ico, 17)}<span>${esc(t)}</span><small>${esc(sub)}</small></button>`;
function suggestHTML(q) {
  const R = smart(q);
  return [
    ...R.cats.map(i => sRow(CATS[i][1], tCat(i), t('s_cat_sub'), 'cat', `data-i="${i}"`)),
    ...R.provs.slice(0, 3).map(o => sRow('user', o.p.n, tLocText(o.p.loc), 'prof', `data-uid="${esc(o.p.uid)}"`)),
    ...R.reqs.slice(0, 3).map(r => sRow('list', r.t, t('s_req_sub'), 'reqDet', `data-i="${esc(r.id)}"`))
  ].join('');
}
function resHTML() {
  if (!SQ) return `<div class="empty2">${bear(70, 'sun')}<p>${esc(t('search_empty_tip'))}</p></div>`;
  const R = smart(SQ);
  const xr = SEM && SEM.q === SQ ? REQS.filter(r => (SEM.reqs || []).includes(r.id) && !R.reqs.includes(r)) : [];
  const xp = SEM && SEM.q === SQ ? PROV.map((p, i) => ({ p, i })).filter(o => (SEM.provs || []).includes(o.p.uid) && !R.provs.some(q => q.p === o.p)) : [];
  if (!R.cats.length && !R.provs.length && !R.reqs.length && !xr.length && !xp.length) {
    return `<div class="empty2">${bear(72, 'lav')}<h3>${esc(t('search_no_res', { q: SQ }))}</h3><p>${esc(t('search_no_res_sub'))}</p><button class="btn coral" type="button" data-a="nw">${ic('plus', 16)} ${esc(t('new_req_top_btn'))}</button></div>`;
  }
  return (R.cats.length ? `<div class="fq">${R.cats.map(i => chipBtn(false, 'cat', i, cic(i) + ' ' + tCat(i))).join('')}</div>` : '') +
    ((R.provs.length || xp.length) ? secH(t('s_provs_h')) + `<div class="list">${[...R.provs, ...xp].map(o => provCard(o.p, o.i)).join('')}</div>` : '') +
    ((R.reqs.length || xr.length) ? secH(t('s_reqs_h')) + `<div class="list">${[...R.reqs, ...xr].sort((a, b) => reqStatusRank(a) - reqStatusRank(b)).map(reqCard).join('')}</div>` : '');
}
VIEWS['بحث'] = () => `<div class="hero2"><input id="hs" value="${esc(SQ)}" placeholder="${esc(t('search_page_ph'))}" autocomplete="off"><button class="btn coral" type="button" data-a="search" aria-label="${esc(t('search_btn'))}">${ic('search', 18)}</button></div><div id="sres">${resHTML()}</div>`;

/* ====== الدردشة الحقيقية 100% على Firestore (بدون أي ردود وهمية) ====== */
let _cUnsub: any = null, _mUnsubs: Record<string, any> = {};
const nowT = () => new Date().toLocaleTimeString(getLangMeta().timeLocale, { hour: '2-digit', minute: '2-digit' });

/* حفظ حالة قراءة الرسائل نهائياً لكل محادثة (علشان الرسالة المقروءة ما ترجعش غير مقروءة أبداً) */
const SEEN_CHATS_K = () => 'wasla_seen_chats_v1_' + ((user && user.uid) || 'guest');
function loadSeenChats() {
  try { return JSON.parse(store.get(SEEN_CHATS_K()) || '{}') || {}; } catch (e) { return {}; }
}
function saveSeenChats(map) {
  store.set(SEEN_CHATS_K(), JSON.stringify(map || {}));
}
function chatSigOf(c) {
  if (!c) return '';
  if (c.m && c.m.length) {
    const last = c.m[c.m.length - 1];
    return `${c.m.length}|${last[0]}|${last[4] || ''}|${String(last[1] || '').slice(0, 24)}`;
  }
  const fromMe = user && c.lastSender === user.uid ? 1 : 0;
  return `0|${fromMe}|${c.lastTime || ''}|${String(c.lastText || '').slice(0, 24)}`;
}
function markChatSeen(c) {
  if (!c || !c.cid) return;
  c.u = 0;
  const map = loadSeenChats();
  const prevCount = (map[c.cid] && Number(map[c.cid].count)) || 0;
  const newCount = Math.max(c.m ? c.m.length : 0, prevCount, Number(c.serverSeenCount) || 0);
  const sig = chatSigOf(c);
  map[c.cid] = { count: newCount, sig, ts: Date.now() };
  c.serverSeenCount = newCount;
  saveSeenChats(map);
  if (db && hasLiveAuth() && c.existsOnServer) {
    db.collection('conversations').doc(c.cid).set({
      seenCount: { [user.uid]: newCount },
      seenSig: { [user.uid]: sig }
    }, { merge: true }).catch(() => {});
  }
  syncDot();
  drawNav();
  rebuildSmartNotifs();
}
function computeUnreadForChat(c) {
  if (!c || !c.cid) return 0;
  if (cur === 'محادثة' && CHATS[chat] && CHATS[chat].cid === c.cid) {
    markChatSeen(c);
    return 0;
  }
  if (!c.m || !c.m.length) return 0;
  const last = c.m[c.m.length - 1];
  /* لو آخر رسالة أنا اللي باعتها، يبقى أكيد شايف المحادثة كلها */
  if (last[0] === 1) {
    const map = loadSeenChats();
    if (!map[c.cid] || (map[c.cid].count || 0) < c.m.length) {
      map[c.cid] = { count: c.m.length, sig: chatSigOf(c), ts: Date.now() };
      saveSeenChats(map);
    }
    return 0;
  }
  const map = loadSeenChats();
  const rec = map[c.cid] || {};
  if (rec.sig && rec.sig === chatSigOf(c)) return 0;
  const seenCount = Math.max(Number(rec.count) || 0, Number(c.serverSeenCount) || 0);
  if (c.m.length <= seenCount) return 0;
  return c.m.slice(seenCount).filter(m => m[0] === 0).length;
}

function stopConvs() {
  if (_cUnsub) { try { _cUnsub(); } catch (e) {} _cUnsub = null; }
  Object.values(_mUnsubs).forEach(u => { try { u(); } catch (e) {} });
  _mUnsubs = {};
}

function subscribeMsgs(c) {
  if (!db || !hasLiveAuth() || !c || !c.cid || !c.existsOnServer || _mUnsubs[c.cid]) return;
  try {
    _mUnsubs[c.cid] = db.collection('conversations').doc(c.cid).collection('messages')
      .orderBy('createdAt', 'asc').onSnapshot(sn => {
        let lastCreatedMs = c.updatedAtMs || 0;
        const prevIds = (c.m || []).map((x: any) => x[4]).filter(Boolean);
        const cl = c.clearedAt || 0;
        const localHidden = cpHiddenMsgSet();
        const rows: any[] = [];
        sn.docs.forEach((d: any) => {
          const x = d.data();
          const cms = tMillis(x.createdAt);
          if (cms > lastCreatedMs) lastCreatedMs = cms;
          if (localHidden.has(d.id)) return;
          if (Array.isArray(x.hiddenFor) && x.hiddenFor.includes(user.uid)) return;
          if (cl && cms && cms <= cl) return;
          rows.push([x.senderId === user.uid ? 1 : 0, x.text || '', x.time || '', x.img || (Array.isArray(x.imgs) && x.imgs[0]) || '', d.id, x]);
        });
        c.m = rows;
        const newIds = new Set(rows.map((r: any) => r[4]));
        const removed = prevIds.filter((id: string) => !newIds.has(id));
        if (lastCreatedMs) c.updatedAtMs = lastCreatedMs;
        if (cur === 'محادثة' && CHATS[chat] && CHATS[chat].cid === c.cid) {
          if (cpIsOpen(c)) {
            markChatSeen(c);
            cpRenderThread(c, removed);
          }
        } else {
          const nextU = computeUnreadForChat(c);
          if (c.u !== nextU) {
            c.u = nextU;
            syncDot();
            drawNav();
          }
          rebuildSmartNotifs();
          if (cur === 'الرسائل') softRender();
        }
      }, () => {});
  } catch (e) {}
}

function watchConvs() {
  if (!db || !hasLiveAuth() || _cUnsub) return;
  try {
    _cUnsub = db.collection('conversations').where('participants', 'array-contains', user.uid)
      .onSnapshot(sn => {
        sn.docs.forEach(d => {
          const x = d.data();
          const oid = (x.participants || []).find(id => id !== user.uid) || '';
          const nm = (x.names && x.names[oid]) || 'مستخدم';
          const ph = (x.photos && x.photos[oid]) || '';
          const srvSeen = (x.seenCount && Number(x.seenCount[user.uid])) || 0;
          const otherSeen = (oid && x.seenCount && Number(x.seenCount[oid])) || 0;
          const updMs = tMillis(x.updatedAt) || Date.now();
          cachePerson(oid, { name: nm, photo: ph });
          let c = CHATS.find(it => it.cid === d.id);
          if (!c) {
            c = {
              w: nm,
              photo: ph,
              m: [],
              u: 0,
              cid: d.id,
              uid: oid,
              lastText: x.lastText || '',
              lastTime: x.lastTime || '',
              lastSender: x.lastSender || '',
              updatedAtMs: updMs,
              serverSeenCount: srvSeen,
              otherSeenCount: otherSeen,
              pinned: !!((cpLoad().pinned || []).includes(d.id)),
              pinnedMsg: x.pinnedMsg || null,
              existsOnServer: true
            };
            CHATS.unshift(c);
          } else {
            if (nm && nm !== 'مستخدم') c.w = nm;
            if (ph) c.photo = ph;
            c.lastText = x.lastText || c.lastText;
            c.lastTime = x.lastTime || c.lastTime;
            c.lastSender = x.lastSender || c.lastSender;
            c.updatedAtMs = Math.max(c.updatedAtMs || 0, updMs);
            c.serverSeenCount = Math.max(c.serverSeenCount || 0, srvSeen);
            c.otherSeenCount = Math.max(c.otherSeenCount || 0, otherSeen);
            c.pinned = !!((cpLoad().pinned || []).includes(d.id));
            c.pinnedMsg = x.pinnedMsg || null;
            c.existsOnServer = true;
          }
          if (cur === 'محادثة' && CHATS[chat] && CHATS[chat].cid === c.cid) {
            const ttl = $('#ttl');
            const ttlSig = `${c.w}|${c.photo || ''}|${cpIsOpen(c) ? 1 : 0}`;
            if (ttl && ttl.classList.contains('chtt') && ttl.dataset.sig !== ttlSig) {
              ttl.dataset.sig = ttlSig;
              cpSyncTopHeader(c);
            }
            if (cpIsOpen(c)) cpRenderThread(c);
          }
          subscribeMsgs(c);
          c.blockedBy = Array.isArray(x.blockedBy) ? x.blockedBy : [];
          c.archived = Array.isArray(x.archivedBy) && x.archivedBy.includes(user.uid);
          c.clearedAt = Number(x.clearedAt && x.clearedAt[user.uid]) || 0;
          if (cur === 'محادثة' && CHATS[chat] && CHATS[chat].cid === c.cid) {
            const bsig = (c.blockedBy || []).join(',');
            if (c._bsig !== undefined && c._bsig !== bsig) cpRedrawComposer();
          }
          c._bsig = (c.blockedBy || []).join(',');
        });
        syncDot();
        drawNav();
        rebuildSmartNotifs();
        if (cur === 'الرسائل') softRender();
      }, () => {});
  } catch (e) {}
}

function openChatWith(name, otherUid, otherPhoto = '') {
  if (!otherUid) return toast('الحساب ده ملوش معرف مراسلة نشط.');
  if (user && otherUid === user.uid) return toast('ده حسابك إنت يا بطل!');
  cachePerson(otherUid, { name, photo: otherPhoto });
  const cid = [user.uid, otherUid].sort().join('_');
  let i = CHATS.findIndex(c => c.cid === cid);
  if (i < 0) {
    CHATS.unshift({ w: name || 'مستخدم', photo: otherPhoto, m: [], u: 0, cid, uid: otherUid, existsOnServer: false });
    i = 0;
  }
  chat = i;
  if (cpIsOpen(CHATS[i])) markChatSeen(CHATS[i]);
  if (CHATS[i].existsOnServer) subscribeMsgs(CHATS[i]);
  goTo('محادثة');
}

function blobToDataUrl(b: Blob): Promise<string> {
  return new Promise(res => { const r = new FileReader(); r.onload = () => res(String(r.result || '')); r.onerror = () => res(''); r.readAsDataURL(b); });
}

const CHAT_IMG_DAILY_MAX = 3;
const CHAT_VOICE_DAILY_MAX = 5;
const CHAT_QUOTA_WINDOW_MS = 24 * 60 * 60 * 1000;

function cqKey() {
  return 'wasla_cq_v1_' + ((user && user.uid) || 'guest');
}
function cqPrune(arr: any, now = Date.now()): number[] {
  if (!Array.isArray(arr)) return [];
  return arr
    .map(Number)
    .filter(ts => Number.isFinite(ts) && ts > 0 && (now - ts) < CHAT_QUOTA_WINDOW_MS)
    .sort((a, b) => a - b);
}
function cqLoad(): { img: number[]; voice: number[] } {
  const now = Date.now();
  let img: number[] = [];
  let voice: number[] = [];
  try {
    const raw = store.get(cqKey());
    if (raw) {
      const p = JSON.parse(raw);
      img = cqPrune(p.img, now);
      voice = cqPrune(p.voice, now);
    }
  } catch {}
  return { img, voice };
}
function cqSave(data: { img: number[]; voice: number[] }) {
  try {
    store.set(cqKey(), JSON.stringify({
      img: cqPrune(data.img),
      voice: cqPrune(data.voice)
    }));
  } catch {}
}
function getChatQuota(kind: 'img' | 'voice') {
  const now = Date.now();
  const limit = kind === 'img' ? CHAT_IMG_DAILY_MAX : CHAT_VOICE_DAILY_MAX;
  const data = cqLoad();
  const stamps = data[kind];
  const used = stamps.length;
  const remaining = Math.max(0, limit - used);
  const oldestBlockingIdx = stamps.length >= limit ? (stamps.length - limit) : -1;
  const nextFreeAt = oldestBlockingIdx >= 0 ? (stamps[oldestBlockingIdx] + CHAT_QUOTA_WINDOW_MS) : 0;
  const waitMs = nextFreeAt > now ? (nextFreeAt - now) : 0;
  return { limit, used, remaining, waitMs, nextFreeAt };
}
function recordChatQuota(kind: 'img' | 'voice', count = 1) {
  const n = Math.max(1, Math.round(count));
  const data = cqLoad();
  const now = Date.now();
  for (let i = 0; i < n; i++) data[kind].push(now + i);
  cqSave(data);
}
function fmtCountdownHms(ms: number): string {
  const secTotal = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(secTotal / 3600);
  const m = Math.floor((secTotal % 3600) / 60);
  const s = secTotal % 60;
  const p2 = (v: number) => String(v).padStart(2, '0');
  return `${p2(h)}:${p2(m)}:${p2(s)}`;
}
function showChatQuotaModal(kind: 'img' | 'voice') {
  const q = getChatQuota(kind);
  const isImg = kind === 'img';
  const segClass = isImg ? 's3' : 's5';
  const segIcon = ic(isImg ? 'image' : 'mic', 14);
  const segsHtml = Array.from({ length: q.limit }, (_, idx) => {
    const isUsed = idx < q.used;
    return `<div class="quota-seg${isUsed ? ' used' : ''}" aria-hidden="true">${segIcon}</div>`;
  }).join('');
  const titleKey = isImg ? 'quota_img_title' : 'quota_voice_title';
  const descKey = isImg ? 'quota_img_desc' : 'quota_voice_desc';
  const cdInit = q.waitMs > 0 ? fmtCountdownHms(q.waitMs) : '24:00:00';
  openModal(`
    <div class="quota-card${isImg ? '' : ' is-voice'}">
      <div class="quota-hero">
        <div class="quota-orb">${ic(isImg ? 'image' : 'mic', 26)}</div>
        <div class="quota-hero-tx">
          <b>${esc(t(titleKey))}</b>
          <span class="quota-pill-cnt">${q.used}/${q.limit} · 24h</span>
        </div>
      </div>
      <p class="quota-desc">${esc(t(descKey))}</p>
      <div class="quota-meter-wrap">
        <div class="quota-meter-top">
          <span>${esc(t('quota_meter_lbl'))}</span>
          <b>${q.used} / ${q.limit}</b>
        </div>
        <div class="quota-segs ${segClass}">${segsHtml}</div>
      </div>
      <div class="quota-cd-box">
        <span>${ic('clock', 15)} ${esc(t('quota_reset_lbl'))}</span>
        <strong class="quota-cd-val" id="quota-cd-val">${esc(cdInit)}</strong>
      </div>
      <div class="quota-tip">
        ${ic('shieldCheck', 16)}
        <span>${esc(t('quota_tip_txt'))}</span>
      </div>
      <button class="btn mint" type="button" data-a="x">${esc(t('quota_ok_btn'))}</button>
    </div>
  `);
  if (q.nextFreeAt > Date.now()) {
    _quotaCdTimer = setInterval(() => {
      const el = $('#quota-cd-val');
      if (!el) {
        clearInterval(_quotaCdTimer);
        _quotaCdTimer = null;
        return;
      }
      const left = q.nextFreeAt - Date.now();
      el.textContent = fmtCountdownHms(left);
      if (left <= 0) {
        clearInterval(_quotaCdTimer);
        _quotaCdTimer = null;
        closeModal();
        if (cur === 'محادثة') render(true);
      }
    }, 1000);
  }
}

async function sendMsg(o: any) {
  const c = CHATS[chat];
  if (!c) return;
  if (!c.uid && c.cid && user && user.uid) {
    c.uid = c.cid.split('_').find((x: string) => x && x !== user.uid) || '';
  }
  if (!db || !user || !user.uid || !c.uid) {
    toast('سجّل دخولك الأول علشان تبعت الرسالة.');
    return;
  }
  if (cpBlockedByMe(c)) return toast('انت حاظر الشخص ده — الغي الحظر الأول.');
  if (cpBlockedByOther(c)) return toast('مقدرتش تبعت رسائل في الدردشة دي.');
  if (!RateGuard.allow('msg', 18, 60000)) return toast('بتبعت رسائل بسرعة جداً — استنى ثواني وجرّب تاني.');
  const rawIn = String(o.t || '');
  if (rawIn.trim().length > MSG_MAX_CHARS) {
    toast(`الحد الأقصى للرسالة ${MSG_MAX_CHARS} حرف للحفاظ على سرعة السيرفر.`);
  }
  const cleanTxt = cleanInput(rawIn, MSG_MAX_CHARS);
  const imgsIn: string[] = Array.isArray(o.imgs) ? o.imgs.slice(0, CHAT_IMG_DAILY_MAX) : (o.img ? [o.img] : []);
  const hasLoc = !!(o.loc && numOk(o.loc.lat, 90) && numOk(o.loc.lng, 180));
  if (!cleanTxt && !imgsIn.length && !o.audioBlob && !hasLoc) return;

  if (imgsIn.length) {
    const iq = getChatQuota('img');
    if (iq.remaining < imgsIn.length) {
      showChatQuotaModal('img');
      return;
    }
  }
  if (o.audioBlob) {
    const vq = getChatQuota('voice');
    if (vq.remaining <= 0) {
      showChatQuotaModal('voice');
      return;
    }
  }

  /* تعديل الرسالة الكتابية فقط (الصور والموقع والصوت لا تقبل التعديل) */
  if (_cpEdit && cleanTxt && !imgsIn.length && !o.audioBlob && !hasLoc) {
    const editJob = _cpEdit;
    const m = cpFindMsg(editJob.id);
    _cpEdit = null;
    _cmExpanded = false;
    const inpE = $('#cm');
    if (inpE) { inpE.value = ''; inpE._typedByHand = false; cpSetDraft(c.cid, ''); if (typeof syncChatComposerUI === 'function') syncChatComposerUI(); }
    cpRedrawComposer();
    if (!m || !cpCanEditMsg(m)) return toast('تعديل النص متاح للرسائل الكتابية بتاعتك بس.');
    if (cleanTxt === m[1]) return;
    const prevTxt = m[1];
    m[1] = cleanTxt;
    m[5] = m[5] || {};
    m[5].editedAt = Date.now();
    cpRenderThread(c);
    try {
      const ref = db.collection('conversations').doc(c.cid);
      await ref.collection('messages').doc(editJob.id).update({ text: cleanTxt, editedAt: SVT() });
      const last = c.m[c.m.length - 1];
      if (last && last[4] === editJob.id) {
        c.lastText = cleanTxt.slice(0, 300);
        ref.set({ lastText: c.lastText }, { merge: true }).catch(() => {});
      }
      toast('اتعدّلت الرسالة ✓');
    } catch (e: any) {
      m[1] = prevTxt;
      cpRenderThread(c);
      toast(e?.code === 'permission-denied' ? t('msg_edit_fail_rules') : (tf('معرفناش نعدل الرسالة.') + ' (' + (e?.code || 'error') + ')'));
    }
    return;
  }
  const tm = nowT();
  const inp = $('#cm');
  if (!o.keepInput) {
    if (typeof stopVoice === 'function' && typeof _voiceEl !== 'undefined' && _voiceEl === inp) stopVoice();
    _cmExpanded = false;
    cpSetDraft(c.cid, '');
    if (inp) {
      inp.value = '';
      inp._typedByHand = false;
      cpApplyExpandedUI();
      if (typeof syncChatComposerUI === 'function') syncChatComposerUI();
      inp.focus();
    }
  }
  const reply = _cpReply;
  if (reply) { _cpReply = null; cpRedrawComposer(); }

  /* الصور والصوت بتتخزن كنص (base64) مباشرة داخل رسالة Firestore بدون Storage */
  let imgUrls: string[] = imgsIn.filter(u => /^data:image\//.test(u) || /^https:\/\//.test(u));
  if (imgUrls.some(u => u.length > 300000)) return toast('الصورة كبيرة قوي — جرّب صورة أصغر.');
  let audioUrl = '';
  if (o.audioBlob) {
    audioUrl = await blobToDataUrl(o.audioBlob);
    if (!/^data:audio\//.test(audioUrl) || audioUrl.length > 580000) return toast('التسجيل طويل قوي — سجّل رسالة أقصر.');
  }
  const data: any = {};
  if (imgUrls.length > 1) data.imgs = imgUrls;
  if (audioUrl) { data.audio = audioUrl; data.dur = Math.round(o.dur || 0); data.peaks = o.peaks || []; }
  if (hasLoc) data.loc = { lat: Number(o.loc.lat), lng: Number(o.loc.lng) };
  if (reply) data.replyTo = { id: reply.id, name: reply.name, text: reply.text };
  const single = imgUrls.length === 1 ? imgUrls[0] : '';

  /* عرض فوري للرسالة المرسلة دائماً عند الإرسال أو اختيار الأسئلة السريعة */
  const th = $('#thr');
  const shouldOpt = !c.existsOnServer || !(c.m && c.m.length);
  if (th) {
    const hero = th.querySelector('.chero');
    if (hero) hero.remove();
    if (shouldOpt) {
      th.insertAdjacentHTML('beforeend', bubHtml([1, cleanTxt, tm, single || imgUrls[0] || '', '', data]));
      th.scrollTop = th.scrollHeight;
    }
  }

  try {
    const ref = db.collection('conversations').doc(c.cid);
    const myPhoto = profile.photo || user.photoURL || '';
    const nextSeen = (c.m ? c.m.length : 0) + 1;
    const sortedParts = [user.uid, c.uid].sort();
    const prevText = cpPreview([1, cleanTxt, tm, imgUrls[0] || '', '', data]);
    const safeLast = (prevText || 'رسالة').slice(0, 300);
    const updatePayload: any = {
      [`names.${user.uid}`]: myDisplayName(),
      [`photos.${user.uid}`]: myPhoto,
      lastText: safeLast,
      lastTime: tm,
      lastSender: user.uid,
      [`seenCount.${user.uid}`]: nextSeen,
      updatedAt: SVT()
    };
    if (c.existsOnServer) {
      await ref.update(updatePayload);
    } else {
      try {
        await ref.set({
          participants: sortedParts,
          names: { [user.uid]: myDisplayName(), [c.uid]: c.w || 'مستخدم' },
          photos: { [user.uid]: myPhoto, [c.uid]: c.photo || '' },
          lastText: safeLast,
          lastTime: tm,
          lastSender: user.uid,
          seenCount: { [user.uid]: nextSeen },
          updatedAt: SVT()
        });
      } catch (crErr: any) {
        const code = String(crErr?.code || '');
        if (code === 'already-exists' || code === 'permission-denied') {
          await ref.update(updatePayload);
        } else {
          throw crErr;
        }
      }
      c.existsOnServer = true;
    }
    subscribeMsgs(c);
    await ref.collection('messages').add({
      senderId: user.uid,
      text: cleanTxt,
      img: single,
      ...data,
      time: tm,
      createdAt: SVT()
    });
    if (imgUrls.length) recordChatQuota('img', imgUrls.length);
    if (audioUrl) recordChatQuota('voice', 1);
    if (typeof syncChatComposerUI === 'function') syncChatComposerUI();
    markChatSeen(c);
  } catch (e: any) {
    console.error('sendMsg error:', e);
    toast('معرفناش نبعت الرسالة (' + (e?.code || 'تأكد من الاتصال') + ')');
  }
}

/* ====== التحميل التدريجي + أنيميشن الكروت الذكي (بدون أي شريط علوي ملون متحرك) ====== */
let _io: IntersectionObserver | null = null, _revIo: IntersectionObserver | null = null, _loadingMore: Record<string, boolean> = {};
function ensureScrollRail() {
  const r = $('#scroll-rail');
  if (r) r.remove();
}
function setupScrollObservers() {
  if (_io) { _io.disconnect(); _io = null; }
  if (_revIo) { _revIo.disconnect(); _revIo = null; }
  ensureScrollRail();
  if (typeof IntersectionObserver === 'undefined') return;

  const desktopMain = window.innerWidth >= 900 ? $('#shell .main') : null;

  // دخول متدرج خفيف للكروت عبر Web Animations API بدون تأثير على transform بعد الانتهاء
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vw = $('#view');
  if (!reduceMotion && vw && typeof Element !== 'undefined' && 'animate' in Element.prototype) {
    let batch = 0;
    let resetTimer: any = null;
    _revIo = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const target = en.target as HTMLElement;
        _revIo?.unobserve(target);
        if (target.dataset.animDone === '1') return;
        target.dataset.animDone = '1';
        const delay = Math.min(batch++, 5) * 36;
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => { batch = 0; }, 120);
        try {
          target.animate(
            [
              { opacity: 0.08, transform: 'translateY(14px) scale(0.985)' },
              { opacity: 1, transform: 'translateY(0) scale(1)' }
            ],
            { duration: 360, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }
          );
        } catch {}
      });
    }, { root: desktopMain, rootMargin: '40px 0px', threshold: 0.03 });
    vw.querySelectorAll('.it, .pc, .cat, .chrow, .rev-card').forEach(el => {
      const h = el as HTMLElement;
      if (h.dataset.animDone !== '1') _revIo?.observe(h);
    });
  }

  const watchMore = (id: string, key: string, isHoriz: boolean, step: number) => {
    const el = $('#' + id);
    if (!el || !_io) return;
    _io.observe(el);
    el._moreCfg = { id, key, isHoriz, step };
  };

  _io = new IntersectionObserver(entries => {
    entries.forEach((en: any) => {
      if (!en.isIntersecting) return;
      const cfg = en.target._moreCfg;
      if (!cfg || _loadingMore[cfg.key]) return;
      _loadingMore[cfg.key] = true;
      en.target.innerHTML = cfg.isHoriz ? provHorizSkels(2) : `<div class="list" style="margin-top:4px">${reqSkels(2)}</div>`;
      setTimeout(() => {
        _loadingMore[cfg.key] = false;
        if (cfg.key === 'homeReq') homeReqLim += cfg.step;
        else if (cfg.key === 'homeProv') homeProvLim += cfg.step;
        else if (cfg.key === 'nearReq') nearReqLim += cfg.step;
        else if (cfg.key === 'provPage') provPageLim += cfg.step;
        const mn = window.innerWidth >= 900 ? $('#shell .main') : null;
        const sc = mn ? mn.scrollTop : window.scrollY;
        const hs = $('#home-prov-hs');
        const hsLeft = hs ? hs.scrollLeft : 0;
        render(true);
        if (!cfg.isHoriz) {
          if (mn) mn.scrollTop = sc;
          else window.scrollTo(0, sc);
        } else if ($('#home-prov-hs')) {
          $('#home-prov-hs').scrollLeft = hsLeft;
        }
      }, 310);
    });
  }, { root: desktopMain, rootMargin: '140px' });

  watchMore('home-req-more', 'homeReq', false, 6);
  watchMore('home-prov-more', 'homeProv', true, 5);
  watchMore('near-req-more', 'nearReq', false, 8);
  watchMore('prov-page-more', 'provPage', false, 8);
}

/* ====== جميع الأوامر والتفاعلات (نشر، تعديل، إلغاء، مسح، شرط مقدم الخدمة، عروض، مشاركة) ====== */
function openOfferModal(rid) {
  const r = REQS.find(x => x.id === rid);
  if (!r) return;
  curReq = rid;
  openModal(`
    <h2>${esc(t('offer_h2'))}</h2>
    <p style="font-weight:700">${esc(r.t)}</p>
    <small>${esc(tLocText(r.loc))} · ${esc(t('bud_shown'))} ${esc(tBud(r.bud))}</small>
    <div class="field"><label for="op">${esc(t('offer_price_lbl'))}</label><input id="op" type="number" inputmode="numeric" placeholder="${esc(t('off_price_ph'))}"></div>
    <div class="field"><label for="ow">${esc(t('offer_when_lbl'))}</label><input id="ow" placeholder="${esc(t('off_when_ph'))}"></div>
    <div class="field"><label for="om">${esc(t('offer_msg_lbl'))}</label><textarea id="om" placeholder="${esc(t('off_msg_ph'))}"></textarea></div>
    ${mbtns('sendOffer', esc(t('offer_submit')))}
  `);
}

const A: any = {
  x: closeModal,
  gate: startGate,
  s1BrowseGuest() {
    closeModal();
    go('app');
  },
  async s1SwitchAcct() {
    closeModal();
    if (auth) { try { await auth.signOut(); } catch {} }
    user = null;
    profile = {};
    MY = { on: false };
    store.del(SESSION_HINT_K);
    store.del(SESSION_CACHE_K);
    go('login');
  },
  openNotif(b: any) {
    const id = b && b.dataset && b.dataset.id;
    const n = NOTIFS.find(x => x.id === id);
    if (!n) return;
    const rs = loadReadNotifs();
    if (!rs.has(n.id)) {
      rs.add(n.id);
      saveReadNotifs(rs);
    }
    n.read = true;
    if (n.kind === 'offer') {
      mineTab = 'all';
      goTo('طلباتي');
    } else if (n.kind === 'chat') {
      const idx = CHATS.findIndex(c => c.cid === n.cid);
      if (idx >= 0) {
        chat = idx;
        markChatSeen(CHATS[idx]);
        if (CHATS[idx].existsOnServer) subscribeMsgs(CHATS[idx]);
        goTo('محادثة');
      } else {
        goTo('الرسائل');
      }
    } else if (n.kind === 'review' && user && user.uid) {
      openProviderPage(user.uid);
    }
  },
  tab(b) { goTo(b.dataset.n); },
  pick(b) { pickLoc(b.dataset.k); },
  clr() { fG = ''; fC = ''; catF = -1; homeCatF = -1; qS = ''; saveNavState(); render(); },
  hcat(b) { homeCatF = +b.dataset.i; homeReqLim = 6; saveNavState(); render(true); },
  cat(b) { catF = +b.dataset.i; qS = ''; provPageLim = 8; goTo('مقدمو الخدمة'); },
  pf(b) { catF = +b.dataset.i; provPageLim = 8; saveNavState(); render(true); },
  mtab(b) { mineTab = b.dataset.i; saveNavState(); render(true); },
  moreOffers(b) { const id = b.dataset.i; if (!id) return; OFFER_LIM[id] = (OFFER_LIM[id] || 3) + 3; render(true); },
  lessOffers(b) { const id = b.dataset.i; if (!id) return; OFFER_LIM[id] = 3; render(true); },

  search() {
    SQ = (($('#hs') && $('#hs').value) || '').trim();
    const g = $('#sg'); if (g) g.remove();
    if (!SQ) return toast('اكتب الكلمة اللي بتدور عليها الأول.');
    goTo('بحث');
  },

  sideSearch() {
    const qEl = $('#q');
    const v = ((qEl && qEl.value) || '').trim();
    if (!v) return toast('قول أو اكتب اللي بتدور عليه الأول.');
    if (_voiceActive && _voiceEl === qEl) stopVoice();
    SQ = v;
    if (qEl) { qEl.value = ''; syncMicVisibility(qEl); }
    drawNav();
    goTo('بحث');
  },

  openExtBrowser() {
    closeModal();
    openInExternalChrome();
  },
  retryLoc() {
    closeModal();
    locateNow(_lastLocCb, false);
  },
  useCityLoc() {
    const g = (LOC.ob && LOC.ob.g) || (profile && profile.gov) || '';
    const c = (LOC.ob && LOC.ob.c) || (profile && profile.city) || '';
    if (!c) {
      closeModal();
      pickLoc('ob');
      toast('اختار محافظتك ومدينتك الأول وهنعتمد موقعها فوراً ✓');
      return;
    }
    const xy = xyOf(g, c) || [30.0444, 31.2357];
    closeModal();
    POS = { lat: xy[0], lng: xy[1], acc: 500, cityFallback: true };
    const now = Date.now();
    store.set('wasla_pos', JSON.stringify(POS));
    store.set('wasla_loc_ts', String(now));
    syncPermCards();
    toast('اتعتمد موقع مدينتك (' + c + ') بنجاح ✓');
    if (_lastLocCb) _lastLocCb(POS);
  },
  retryMic() {
    const target = _lastVoiceTarget;
    closeModal();
    if (target && document.body.contains(target)) {
      toggleVoice(target);
    }
  },

  nw() {
    if (gate(() => A.nw())) return;
    RQ = { c: -1, sub: '', customSub: '', imgs: [], xy: POS ? [POS.lat, POS.lng] : null, need: 'في أقرب وقت' };
    LOC.rq = { g: profile.gov || '', c: profile.city || '' };
    goTo('طلب جديد');
  },

  rcat(b) {
    RQ.c = +b.dataset.i;
    RQ.sub = '';
    $('#rcats').innerHTML = rqCatsHtml();
    $('#rsubs').innerHTML = rqSubsHtml();
    enhanceVoiceInputs($('#rsubs'));
  },
  rsub(b) {
    RQ.sub = b.dataset.i;
    $('#rsubs').innerHTML = rqSubsHtml();
    enhanceVoiceInputs($('#rsubs'));
    if (RQ.sub === '__custom__') {
      const inp = $('#rcust-sub');
      if (inp) inp.focus();
    }
  },
  rimg() { pickImg(900, false, d => { RQ.imgs.push(d); $('#rimgs').innerHTML = rqImgsHtml(); }); },
  rimgx(b) { RQ.imgs.splice(+b.dataset.i, 1); $('#rimgs').innerHTML = rqImgsHtml(); },
  rloc() {
    const done = () => {
      RQ.xy = [POS.lat, POS.lng];
      const b = $('#rloc');
      if (b) b.innerHTML = ic('nav', 14) + ' موقعك الدقيق متحدد ✓';
    };
    if (POS) done(); else locateNow(done, false);
  },

  smartAssist() {
    const t = ($('#rt') && $('#rt').value || '').trim();
    if (!t) return toast('اكتب عنوان الطلب الأول علشان نفهم إنت محتاج إيه.');
    const w = AN(t).split(/\s+/);
    let best = -1, sc = 0;
    KW.forEach(([i, k]) => {
      const kwList = AN(String(k)).split(' ');
      const n = w.filter(x => kwList.some(y => y.length > 2 && (x.includes(y) || y.includes(x)))).length;
      if (n > sc) { sc = n; best = Number(i); }
    });
    if (best < 0) best = 4;
    RQ.c = best;
    const matchedSub = (SUBS[best] || []).find(s => AN(t).includes(AN(s).split(' ')[0]));
    if (matchedSub) {
      RQ.sub = matchedSub;
    } else {
      RQ.sub = '__custom__';
      RQ.customSub = cleanInput(t, 60);
    }
    $('#rcats').innerHTML = rqCatsHtml();
    $('#rsubs').innerHTML = rqSubsHtml();
    enhanceVoiceInputs($('#rsubs'));
    const d = $('#rd');
    if (d && !d.value.trim()) {
      d.value = `محتاج ${t}. يا ريت في العرض توضحلي التكلفة النهائية وتقدر تيجي إمتى بالظبط.`;
    }
    toast('جهّزنالك القسم والوصف المبدئي — راجعهم وعدّل براحتك!');
  },

  /* نشر الطلب فعلياً على Firebase Firestore علشان يظهر لكل الحسابات التانية فوراً */
  async post() {
    if (gate(() => A.post())) return;
    if (!RateGuard.allow('post', 4, 60000)) return toast('استنى دقيقة قبل نشر طلب جديد تاني.');
    const t = cleanInput(($('#rt') && $('#rt').value) || '', 140);
    const d = cleanInput(($('#rd') && $('#rd').value) || '', 2000);
    const L = LOC.rq;
    if (!t || !d) return toast('اكتب عنوان الطلب وتفاصيله علشان الناس تفهم المطلوب.');
    if (RQ.c < 0) {
      const w = AN(t + ' ' + d).split(/\s+/);
      let best = 4, sc = 0;
      KW.forEach(([i, k]) => {
        const kwList = AN(String(k)).split(' ');
        const n = w.filter(x => kwList.some(y => y.length > 2 && (x.includes(y) || y.includes(x)))).length;
        if (n > sc) { sc = n; best = Number(i); }
      });
      RQ.c = best;
    }
    const custVal = cleanInput((($('#rcust-sub') && $('#rcust-sub').value) || RQ.customSub || ''), 80);
    const finalSub = RQ.sub === '__custom__' ? (custVal || cleanInput(t, 60)) : (RQ.sub || custVal || cleanInput(t, 60));
    if (!L.c) return toast('اختار المحافظة والمدينة.');

    const btn = $('[data-a="post"]');
    if (btn) { btn.disabled = true; btn.textContent = 'بننشر طلبك على وصلة...'; }
    try {
      const id = db.collection('requests').doc().id;
      const uid = user.uid;
      const urls: string[] = [];
      for (let i = 0; i < RQ.imgs.length; i++) {
        urls.push(await uploadImgSafe(`requests/${uid}/${id}_${i}.jpg`, RQ.imgs[i]));
      }
      const area = ($('#ra') && $('#ra').value || '').trim();
      const bd = ($('#rb') && $('#rb').value || '').trim();
      const need = ($('#rw') && $('#rw').value) || 'في أقرب وقت';
      const xy = RQ.xy || xyOf(L.g, L.c) || (POS ? [POS.lat, POS.lng] : null);

      await db.collection('requests').doc(id).set({
        title: t,
        description: d,
        category: RQ.c,
        sub: finalSub,
        budget: bd ? bd + ' ج' : 'مفتوحة',
        neededBy: need,
        locText: (area ? area + ' - ' : '') + L.c + ' · ' + L.g,
        gov: L.g,
        city: L.c,
        lat: xy ? xy[0] : null,
        lng: xy ? xy[1] : null,
        imgs: urls,
        ownerId: uid,
        ownerName: myDisplayName(),
        ownerPhoto: profile.photo || user.photoURL || '',
        ownerPreset: profile.avatar || '',
        status: 'new',
        createdAt: SVT()
      });
      toast('طلبك اتنشر على وصلة وبقى ظاهر للكل دلوقتي!');
      mineTab = 'all';
      goTo('طلباتي');
    } catch (e) {
      toast('حصلت مشكلة وإحنا بننشر الطلب (' + (e.code || 'خطأ') + ')');
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = ic('plus', 17) + ' انشر الطلب دلوقتي'; }
    }
  },

  /* تعديل الطلب لصاحبه */
  editReq(b) {
    const r = REQS.find(x => x.id === b.dataset.i);
    if (!r || !r.mine) return;
    editReqId = r.id;
    LOC.erq = { g: r.gov || govOf(r.city) || profile.gov || '', c: r.city || profile.city || '' };
    const numBud = parseInt(String(r.bud).replace(/[^\d]/g, ''), 10) || '';
    openModal(`
      <h2>${esc(t('req_edit_h2'))}</h2>
      <div class="field"><label for="ert">${esc(t('req_title_lbl'))}</label><input id="ert" value="${esc(r.t)}"></div>
      <div class="field"><label for="erd">${esc(t('req_det_lbl'))}</label><textarea id="erd">${esc(r.d || '')}</textarea></div>
      <div class="field"><label>${esc(t('acc_loc'))}</label>${locBtn('erq')}</div>
      <div class="field"><label for="erb">${esc(t('req_bud_lbl'))}</label><input id="erb" type="number" inputmode="numeric" value="${numBud}"></div>
      <div class="field"><label for="erw">${esc(t('req_when_lbl'))}</label>
        <select id="erw">
          ${['مستعجل النهاردة', 'في أقرب وقت', 'خلال يومين تلاتة', 'وقتي مرن'].map(o => `<option value="${esc(o)}"${r.need === o ? ' selected' : ''}>${esc(tNeed(o))}</option>`).join('')}
        </select>
      </div>
      ${mbtns('saveReqEdit', t('save_changes'))}
    `);
  },

  async saveReqEdit() {
    const r = REQS.find(x => x.id === editReqId);
    if (!r || !db) return;
    const t = cleanInput(($('#ert') && $('#ert').value) || '', 160);
    const d = cleanInput(($('#erd') && $('#erd').value) || '', 2500);
    const bd = cleanInput(($('#erb') && $('#erb').value) || '', 20).replace(/[^\d]/g, '');
    const need = cleanInput(($('#erw') && $('#erw').value) || 'في أقرب وقت', 60) || 'في أقرب وقت';
    if (t.length < 3 || d.length < 3) return toast('اكتب عنوان الطلب وتفاصيله بوضوح (3 حروف على الأقل).');
    const ref = db.collection('requests').doc(r.id);
    const L = LOC.erq;
    const baseData = {
      title: t,
      description: d,
      budget: bd ? bd + ' ج' : 'مفتوحة',
      neededBy: need,
      updatedAt: SVT()
    };
    try {
      if (L.c && (L.c !== r.city || L.g !== r.gov)) {
        const xy = xyOf(L.g, L.c);
        try {
          await ref.update({ ...baseData, gov: L.g, city: L.c, locText: L.c + ' · ' + L.g, lat: xy ? xy[0] : null, lng: xy ? xy[1] : null });
        } catch (ruleErr) {
          await ref.update(baseData); // توافق تلقائي لو القواعد المنشورة قديمة
        }
      } else {
        await ref.update(baseData);
      }
      closeModal();
      toast('اتعدّل طلبك بنجاح!');
    } catch (e) {
      toast('معرفناش نحفظ التعديل (' + (e.code || 'خطأ') + ')');
    }
  },

  /* إلغاء الطلب أو إعادة فتحه */
  async cancelReq(b) {
    const r = REQS.find(x => x.id === b.dataset.i);
    if (!r || !r.mine || !db) return;
    try {
      await db.collection('requests').doc(r.id).update({ status: 'cancelled', updatedAt: SVT() });
      toast('اتلغى الطلب ومبقاش بيستقبل عروض جديدة.');
    } catch (e) {
      toast('معرفناش نلغي الطلب (' + (e.code || 'خطأ') + ')');
    }
  },

  async reopenReq(b) {
    const r = REQS.find(x => x.id === b.dataset.i);
    if (!r || !r.mine || !db) return;
    try {
      await db.collection('requests').doc(r.id).update({ status: 'new', updatedAt: SVT() });
      toast('رجعنا فتحنا الطلب تاني للناس!');
    } catch (e) {
      toast('معرفناش نعيد فتح الطلب.');
    }
  },

  /* مسح الطلب نهائياً */
  delReq(b) {
    const r = REQS.find(x => x.id === b.dataset.i);
    if (!r || !r.mine) return;
    editReqId = r.id;
    openModal(`
      <h2>${esc(t('req_del_h2'))}</h2>
      <p>${esc(t('req_del_p', { t: r.t }))}</p>
      ${mbtns('delReqConfirm', t('req_del_btn'), 'danger')}
    `);
  },

  async delReqConfirm() {
    if (!editReqId || !db) return;
    const id = editReqId;
    const ref = db.collection('requests').doc(id);
    try {
      try {
        await ref.delete();
      } catch (ruleErr) {
        /* لو القواعد على السيرفر لسه ما اتحدثتش بأمر deploy بنخفيه فوراً بحالة deleted المسموحة */
        await ref.update({ status: 'deleted', updatedAt: SVT() });
      }
      RAWR = RAWR.filter(x => x.id !== id);
      rebuildReq();
      closeModal();
      toast('اتمسح الطلب خالص.');
    } catch (e) {
      toast('معرفناش نمسح الطلب (' + (e.code || 'خطأ') + ')');
    }
  },

  /* تفاصيل الطلب الكاملة */
  reqDet(b) {
    const r = REQS.find(x => x.id === b.dataset.i);
    if (!r) return;
    const stCls = r.rawStatus === 'cancelled' ? 'cancelled' : r.rawStatus === 'completed' ? 'mint' : 'st';
    const trId = `reqdet_${r.id}`;
    const trp = trPrep(trId, [r.t || '', r.d || '']);
    openModal(`
      ${whoHtml(r)}
      <div class="meta">
        <span class="tag" style="background:${(CATS[r.c] || CATS[0])[2]}">${cic(r.c)} ${esc(tCat(r.c))}</span>
        ${r.sub ? `<span class="tag">${esc(tSub(r.c, r.sub))}</span>` : ''}
        <span class="tag ${stCls}">${esc(tStatus(r.rawStatus))}</span>
        ${mutualBadgeHtml(r)}
        ${warnTagHtml(r.ownerId)}
      </div>
      <h2 class="tr-target" data-trid="${esc(trId)}" data-tridx="0" style="padding:0">${esc(trp.disp[0])}</h2>
      ${r.d ? `<p class="tr-target" data-trid="${esc(trId)}" data-tridx="1" style="color:var(--ink);white-space:pre-line">${esc(trp.disp[1])}</p>` : ''}
      ${rImgs(r)}
      <div class="meta">
        <span>${ic('pin', 14)} ${esc(tLocText(r.loc))}</span>
        <span>· ${ic('money', 14)} ${esc(t('budget_lbl'))} <b>${esc(tBud(r.bud))}</b></span>
        <span>· ${ic('clock', 14)} ${esc(tNeed(r.need))}</span>
      </div>
      <div class="meta" style="margin-top:6px">
        ${r.mine
          ? `${r.rawStatus !== 'cancelled' && r.rawStatus !== 'completed' ? `<button class="btn sm mint" type="button" data-a="done" data-i="${esc(r.id)}">${ic('check', 14)} ${esc(t('mark_done_btn'))}</button>` : ''}
             <button class="btn sm white" type="button" data-a="editReq" data-i="${esc(r.id)}">${ic('edit', 14)} ${esc(t('edit_btn'))}</button>
             <button class="btn sm danger" type="button" data-a="delReq" data-i="${esc(r.id)}">${ic('trash', 14)} ${esc(t('del_btn'))}</button>`
          : `${visitorOfferBtnHtml(r, true)}
             ${(!r.mine && user && isProviderLinkedToReq(r, user.uid) && !r.providerDone && (r.rawStatus === 'accepted' || r.rawStatus === 'completed'))
               ? `<button class="btn mint" type="button" data-a="provDone" data-i="${esc(r.id)}">${ic('shieldCheck', 15)} ${esc(t('confirm_job_btn'))}</button>` : ''}
             ${r.ownerId ? `<button class="btn white" type="button" data-a="prof" data-uid="${esc(r.ownerId)}" data-n="${esc(r.by)}" data-ph="${esc(r.ownerPhoto || '')}" data-pr="${esc(r.ownerPreset || '')}" data-loc="${esc(r.loc || '')}">${ic('user', 15)} ${esc(t('pro_his_page'))}</button>` : ''}
             ${r.ownerId && r.rawStatus !== 'completed' ? `<button class="btn white" type="button" data-a="chat" data-n="${esc(r.by)}" data-uid="${esc(r.ownerId)}">${esc(t('msg_him_btn'))}</button>` : ''}`}
        ${trBtnHtml(trId, trp)}
        <button class="btn sm white" type="button" data-a="shareReq" data-i="${esc(r.id)}">${ic('share', 14)} ${esc(t('share_btn_lbl'))}</button>
      </div>
    `);
  },

  /* شرط التسجيل كمقدم خدمة قبل تقديم أي عرض سعر! */
  offer(b) {
    const rid = b.dataset.i;
    if (gate(() => openOfferCheck(rid))) return;
    openOfferCheck(rid);
  },

  async sendOffer() {
    if (!curReq || !db || !user) return;
    if (!MY.on) return A.bp();
    if (!RateGuard.allow('offer', 8, 60000)) return toast('استنى لحظة قبل إرسال عروض إضافية.');
    const pr = Number(($('#op') && $('#op').value) || 0);
    const when = cleanInput(($('#ow') && $('#ow').value) || '', 120) || 'في أقرب وقت';
    const msg = cleanInput(($('#om') && $('#om').value) || '', 1200);
    if (!(pr > 0 && pr <= 5000000)) return toast('اكتب السعر المقترح بالجنيه بشكل منطقي الأول.');

    const btn = $('[data-a="sendOffer"]');
    if (btn) btn.disabled = true;
    try {
      await db.collection('requests').doc(curReq).collection('offers').doc(user.uid).set({
        providerId: user.uid,
        providerName: MY.n || myDisplayName(),
        providerPhoto: profile.photo || user.photoURL || '',
        providerPreset: profile.avatar || '',
        ratingAvg: MY.r || 0,
        price: pr,
        when,
        message: msg,
        status: 'pending',
        createdAt: SVT()
      });
      MY_SENT_OFFERS.add(curReq);
      const r = REQS.find(x => x.id === curReq);
      if (r) r.sent = true;
      closeModal();
      toast('وصل عرضك لصاحب الطلب تمام!');
      render(true);
    } catch (e) {
      toast('معرفناش نبعت العرض (' + (e.code === 'permission-denied' ? 'بعتّ عرض قبل كده على الطلب ده' : (e.code || 'خطأ')) + ')');
    } finally {
      if (btn) btn.disabled = false;
    }
  },

  async acc(b) {
    const rid = b.dataset.i, oid = b.dataset.oid;
    if (!db || !rid || !oid) return;
    try {
      await db.collection('requests').doc(rid).collection('offers').doc(oid).update({ status: 'accepted' });
      await db.collection('requests').doc(rid).update({ status: 'accepted', acceptedProviderId: oid, updatedAt: SVT() });
      const raw = RAWR.find((x: any) => x.id === rid);
      if (raw) { raw.status = 'accepted'; raw.acceptedProviderId = oid; rebuildReq(); }
      toast('مبروك الاتفاق! تقدر تراسله دلوقتي، ولما تخلصوا أكدوا الانتهاء انتم الاتنين.');
    } catch (e) {
      toast('معرفناش نأكد قبول العرض (' + (e.code || 'خطأ') + ')');
    }
  },

  async provDone(b: any) {
    const rid = b && b.dataset && b.dataset.i;
    const r = REQS.find(x => x.id === rid);
    if (!r || !db || !user) return;
    if (!isProviderLinkedToReq(r, user.uid)) return toast('مش محدد منفّذ للطلب ده.');
    if (r.providerDone) return toast('أكدت إنهاء الشغلانة دي بالفعل ✓');
    if (b) b.disabled = true;
    try {
      await db.collection('requests').doc(r.id).update({ providerDone: true, updatedAt: SVT() });
      const raw = RAWR.find((x: any) => x.id === r.id);
      if (raw) { raw.providerDone = true; rebuildReq(); }
      closeModal();
      toast('تمام! اتسجّل تأكيدك لإنهاء الشغلانة ✓');
      if (cur === 'محادثة') goTo('محادثة');
      else render(true);
    } catch (e: any) {
      toast('معرفناش نسجل تأكيدك (' + (e?.code || 'تأكد من نشر القواعد') + ')');
    } finally {
      if (b) b.disabled = false;
    }
  },

  async rej(b) {
    const rid = b.dataset.i, oid = b.dataset.oid;
    if (!db || !rid || !oid) return;
    try {
      await db.collection('requests').doc(rid).collection('offers').doc(oid).update({ status: 'rejected' });
      toast('اترفض العرض.');
    } catch (e) {
      toast('معرفناش نرفض العرض.');
    }
  },

  done(b) {
    const r = REQS.find(x => x.id === b.dataset.i);
    if (!r || !r.mine) return;
    rateId = r.id;
    doneStars = 5;
    const candMap = new Map();
    (r.offers || []).forEach(o => {
      if (o.providerId && o.s !== 2) candMap.set(o.providerId, { uid: o.providerId, name: o.p || 'مقدم خدمة', accepted: o.s === 1 });
    });
    CHATS.forEach(c => {
      if (c.uid && PROV.some(p => p.uid === c.uid) && !candMap.has(c.uid)) {
        candMap.set(c.uid, { uid: c.uid, name: c.w || 'مقدم خدمة', accepted: false });
      }
    });
    const cands = [...candMap.values()];
    const accCand = cands.find(x => x.accepted) || (r.offers && r.offers.length === 1 ? cands[0] : null);
    doneProvUid = accCand ? accCand.uid : '';

    openModal(`
      <h2>${esc(t('done_h2'))}</h2>
      <p style="font-size:.88rem;color:var(--muted)">${esc(t('done_p'))}</p>
      ${cands.length ? `
        <div class="field">
          <label for="done-prov-sel">${esc(t('done_prov_lbl'))}</label>
          <select id="done-prov-sel">
            <option value=""${!doneProvUid ? ' selected' : ''}>${esc(t('done_no_prov'))}</option>
            ${cands.map(c => `<option value="${esc(c.uid)}"${doneProvUid === c.uid ? ' selected' : ''}>${esc(c.name)}${c.accepted ? ` (${esc(t('offer_agreed_tag'))})` : ''}</option>`).join('')}
          </select>
        </div>
        <div id="done-rev-sec" style="display:${doneProvUid ? 'flex' : 'none'};flex-direction:column;gap:10px">
          <div id="done-stars-box">${starPickerHtml('pickDoneStar', doneStars)}</div>
          <div class="field">
            <label for="done-rev-txt">${esc(t('done_rev_lbl'))}</label>
            <textarea id="done-rev-txt" placeholder="${esc(t('done_rev_ph'))}"></textarea>
          </div>
        </div>
      ` : `<div class="ofr" style="background:var(--mint-soft);border-style:solid;font-size:.86rem">
        <span>${esc(t('done_banner_note'))}</span>
      </div>`}
      ${mbtns('submitDoneRev', t('done_submit_btn'))}
    `);
    const sel = $('#done-prov-sel');
    if (sel) {
      sel.onchange = () => {
        doneProvUid = sel.value || '';
        const sec = $('#done-rev-sec');
        if (sec) sec.style.display = doneProvUid ? 'flex' : 'none';
      };
    }
  },

  pickDoneStar(b) {
    doneStars = Math.max(1, Math.min(5, +b.dataset.i || 5));
    const bx = $('#done-stars-box');
    if (bx) bx.innerHTML = starPickerHtml('pickDoneStar', doneStars);
  },

  async submitDoneRev() {
    const r = REQS.find(x => x.id === rateId);
    if (!r || !db || !user) return;
    const comment = cleanInput(($('#done-rev-txt') && $('#done-rev-txt').value) || '', 1200);
    const selEl = $('#done-prov-sel');
    const chosenProv = selEl ? (selEl.value || '') : (doneProvUid || (((r.offers || []).find((o: any) => o.s === 1) || (r.offers || [])[0] || {}).providerId || ''));
    const btn = $('[data-a="submitDoneRev"]');
    if (btn) btn.disabled = true;
    try {
      const reqRef = db.collection('requests').doc(r.id);
      try {
        await reqRef.update({
          status: 'completed',
          completedProviderId: chosenProv || '',
          clientDone: true,
          updatedAt: SVT()
        });
      } catch {
        try {
          await reqRef.update({ status: 'completed', clientDone: true, updatedAt: SVT() });
        } catch {
          await reqRef.update({ status: 'completed', updatedAt: SVT() });
        }
      }
      const raw = RAWR.find((x: any) => x.id === r.id);
      if (raw) {
        raw.status = 'completed';
        raw.completedProviderId = chosenProv || '';
        raw.clientDone = true;
        rebuildReq();
      }

      let revWarn = false;
      if (chosenProv && chosenProv !== user.uid) {
        try {
          const starsNum = Math.max(1, Math.min(5, Math.round(doneStars || 5)));
          const existingRev = REVIEWS.find(rv => rv.id === r.id);
          const revPayload: any = {
            requestId: r.id,
            customerId: user.uid,
            customerName: myDisplayName(),
            customerPhoto: profile.photo || user.photoURL || '',
            customerPreset: profile.avatar || '',
            providerId: chosenProv,
            stars: starsNum,
            comment,
            verifiedDeal: true,
            updatedAt: SVT()
          };
          if (existingRev) {
            await db.collection('reviews').doc(r.id).update(revPayload);
          } else {
            await db.collection('reviews').doc(r.id).set({ ...revPayload, createdAt: SVT() });
          }
        } catch {
          revWarn = true;
        }
      }
      closeModal();
      if (chosenProv && chosenProv !== user.uid) {
        toast(revWarn ? t('done_rev_warn_msg') : t('done_rev_ok_msg', { n: doneStars }));
      } else {
        toast(t('done_ok_msg'));
      }
      if (cur === 'محادثة') goTo('محادثة');
      else render(true);
    } catch (e: any) {
      toast(t('done_fail_rules', { c: e?.code || 'error' }));
    } finally {
      if (btn) btn.disabled = false;
    }
  },

  /* التسجيل وتعديل ملف مقدم الخدمة (متاح لأي صنعة أو خدمة أو مهنة في مصر) */
  bp() {
    if (gate(() => A.bp())) return;
    LOC.pv = { g: MY.gov || profile.gov || '', c: MY.city || profile.city || '' };
    const initCat = MY.c || 0;
    const renderSpecChips = (catIdx: number) =>
      (SUBS[catIdx] || []).slice(0, 6).map(s => `<button type="button" class="chip" data-a="pspecPick" data-i="${esc(tSub(catIdx, s))}">${esc(tSub(catIdx, s))}</button>`).join('');
    openModal(`
      <h2>${esc(MY.on ? t('pro_edit_h2') : t('pro_reg_h2'))}</h2>
      <p style="font-size:.86rem;color:var(--muted)">${esc(t('pro_modal_sub'))}</p>
      <div class="field"><label for="pn">${esc(t('pro_name_lbl'))}</label><input id="pn" value="${esc(MY.n || myDisplayName())}" placeholder="${esc(t('pro_name_ph'))}"></div>
      <div class="field"><label for="pc">${esc(t('pro_cat_lbl'))}</label><select id="pc">${CATS.map((c, i) => `<option value="${i}"${i === initCat ? ' selected' : ''}>${esc(tCat(i))}</option>`).join('')}</select></div>
      <div class="field">
        <label for="pspec">${esc(t('pro_spec_lbl'))}</label>
        <input id="pspec" value="${esc(MY.spec || '')}" placeholder="${esc(t('pro_spec_ph'))}">
        <div class="fq" id="pspec-chips" style="margin-top:4px">${renderSpecChips(initCat)}</div>
      </div>
      <div class="field"><label>${esc(t('pro_loc_lbl'))}</label>${locBtn('pv')}</div>
      <div class="names" style="grid-template-columns:1fr 1fr">
        <div class="field"><label for="py">${esc(t('pro_years_lbl'))}</label><input id="py" type="number" inputmode="numeric" value="${MY.y || ''}" placeholder="7"></div>
        <div class="field"><label for="pok">${esc(t('pro_status_lbl'))}</label>
          <select id="pok">
            <option value="1"${MY.ok !== false ? ' selected' : ''}>${esc(t('avail_now'))}</option>
            <option value="0"${MY.ok === false ? ' selected' : ''}>${esc(t('busy_now'))}</option>
          </select>
        </div>
      </div>
      <div class="field"><label for="pbio">${esc(t('pro_bio_lbl'))}</label><textarea id="pbio" style="min-height:72px" placeholder="${esc(t('pro_bio_ph'))}">${esc(MY.bio || '')}</textarea></div>
      ${mbtns('savep', esc(MY.on ? t('pro_save_btn') : t('pro_act_btn')))}
    `);
    const pcEl = $('#pc');
    if (pcEl) {
      pcEl.onchange = () => {
        const ch = $('#pspec-chips');
        if (ch) ch.innerHTML = renderSpecChips(+pcEl.value || 0);
      };
    }
  },

  pspecPick(b) {
    const inp = $('#pspec');
    if (inp) {
      inp.value = b.dataset.i || '';
      syncMicVisibility(inp);
    }
  },

  async savep() {
    if (!db || !user) return;
    const n = cleanInput((($('#pn') && $('#pn').value) || ''), 90);
    if (!n) return toast('اكتب اسمك أو اسم النشاط الأول.');
    if (!LOC.pv.c) return toast('اختار المحافظة والمدينة.');
    const g = LOC.pv.g, c = LOC.pv.c;
    const cat = Math.max(0, Math.min(5, +$('#pc').value || 0));
    const spec = cleanInput((($('#pspec') && $('#pspec').value) || ''), 80);
    const years = Math.max(0, Math.min(60, parseInt($('#py').value || '0', 10) || 0));
    const available = $('#pok').value === '1';
    const bio = cleanInput((($('#pbio') && $('#pbio').value) || ''), 1200);
    const xy = POS ? [POS.lat, POS.lng] : xyOf(g, c);

    const btn = $('[data-a="savep"]');
    if (btn) btn.disabled = true;
    try {
      const ref = db.collection('providers').doc(user.uid);
      const data = {
        name: n,
        category: cat,
        specialty: spec,
        gov: g,
        city: c,
        years,
        available,
        bio,
        photoURL: profile.photo || user.photoURL || '',
        preset: profile.avatar || '',
        lat: xy ? xy[0] : null,
        lng: xy ? xy[1] : null,
        updatedAt: SVT()
      };
      const ex = await ref.get();
      if (ex.exists) await ref.update(data);
      else await ref.set({ ...data, ownerId: user.uid, verified: false, ratingAvg: 0, ratingCount: 0, createdAt: SVT() });

      MY = { on: true, n, c: cat, spec, gov: g, city: c, y: years, ok: available, bio, r: MY.r || 0, rc: MY.rc || 0 };
      persistSessionCache();
      await db.doc('users/' + user.uid).set({ roles: ['customer', 'provider'], updatedAt: SVT() }, { merge: true }).catch(() => {});
      closeModal();
      toast('ألف مبروك! اتفعّل حسابك كمقدم خدمة وتقدر تقدّم عروض دلوقتي.');
      render(true);
      if (PEND_OFFER) {
        const rid = PEND_OFFER;
        PEND_OFFER = '';
        setTimeout(() => openOfferModal(rid), 180);
      }
    } catch (e) {
      toast('معرفناش نحفظ ملف الخدمة (' + (e.code || 'خطأ') + ')');
    } finally {
      if (btn) btn.disabled = false;
    }
  },

  /* فتح الصفحة الشخصية ومعاملات أي شخص (سواء عميل أو مقدم خدمة) */
  prof(b) {
    const p = (b.dataset.uid && PROV.find(x => x.uid === b.dataset.uid)) || (b.dataset.i != null ? PROV[+b.dataset.i] : null);
    const uid = (p && p.uid) || b.dataset.uid || '';
    if (!uid) return;
    cachePerson(uid, {
      name: b.dataset.n || (p && p.n) || '',
      photo: b.dataset.ph || (p && p.photo) || '',
      preset: b.dataset.pr || (p && p.preset) || '',
      loc: b.dataset.loc || (p && p.loc) || ''
    });
    closeModal();
    const g = $('#sg'); if (g) g.remove();
    openProviderPage(uid);
  },

  myProf() {
    if (!user) return startGate();
    openProviderPage(user.uid);
  },

  /* نظام علامات التحذير المجتمعية (مرة واحدة لكل شخص + يظهر للعلن بداية من 3 أشخاص مختلفين + بوابة منع البلاغات الكيدية) */
  warnUser(b) {
    const uid = (b && b.dataset && b.dataset.uid) || curProvUid || '';
    const nm = (b && b.dataset && b.dataset.n) || (uid ? resolvePerson(uid).name : t('user_fallback'));
    if (!uid) return;
    if (gate(() => A.warnUser({ dataset: { uid, n: nm } }))) return;
    if (user && uid === user.uid) return toast('ده حسابك إنت!');

    if (hasMyWarn(uid)) {
      const cnt = getWarnCount(uid);
      openModal(`
        <h2>${esc(t('warn_prev_h'))}</h2>
        <p style="font-size:.9rem;line-height:1.7">${esc(t('warn_prev_p', { n: nm }))}</p>
        <div class="ofr" style="background:var(--bg);border-style:solid;font-size:.84rem">
          <span>${cnt >= 3
            ? esc(t('warn_prev_pub', { p: warnPeopleTxt(cnt) }))
            : esc(t('warn_prev_priv'))}</span>
        </div>
        <div class="meta"><button class="btn mint" style="flex:1" type="button" data-a="x">${esc(t('warn_understood_btn'))}</button></div>
      `);
      return;
    }

    const proof = getInteractionProof(uid);
    if (!proof) {
      const deals = getMutualDealsWithUser(uid);
      const mySideBtn = deals.awaitingMyConfirm
        ? (deals.awaitingMyConfirm.mine
            ? `<button class="btn mint" style="flex:1" type="button" data-a="done" data-i="${esc(deals.awaitingMyConfirm.id)}">${ic('check', 15)} ${esc(t('warn_confirm_my'))}</button>`
            : `<button class="btn mint" style="flex:1" type="button" data-a="provDone" data-i="${esc(deals.awaitingMyConfirm.id)}">${ic('shieldCheck', 15)} ${esc(t('warn_confirm_prov'))}</button>`)
        : '';
      const explain = deals.awaitingMyConfirm
        ? t('warn_gate_my', { t: deals.awaitingMyConfirm.t })
        : deals.awaitingOtherConfirm
        ? t('warn_gate_other', { t: deals.awaitingOtherConfirm.t })
        : t('warn_gate_none', { n: nm });
      openModal(`
        <h2>${ic('shieldCheck', 22)} ${esc(t('warn_gate_h'))}</h2>
        <p style="font-size:.9rem;line-height:1.7">${esc(explain)}</p>
        <div class="ofr" style="background:var(--sun);border-style:solid;font-size:.84rem">
          <span>${ic('warn', 14)} ${esc(t('warn_gate_note'))}</span>
        </div>
        <div class="meta">${mySideBtn}<button class="btn white" style="flex:1" type="button" data-a="x">${esc(t('warn_ok_btn'))}</button></div>
      `);
      return;
    }

    warnTargetUid = uid;
    warnTargetName = nm;
    warnReason = WARN_REASONS[0];
    openModal(`
      <h2>${esc(t('warn_form_h', { n: nm }))}</h2>
      <p style="font-size:.85rem;color:var(--muted);line-height:1.65">${esc(t('warn_form_p'))}</p>
      <div class="ofr" style="background:var(--mint-soft);border-style:solid;font-size:.82rem;padding:9px 12px">
        <span>${ic('check', 14)} ${esc(t('warn_proof_lbl', { l: proof.label }))}</span>
      </div>
      <div class="field">
        <label>${esc(t('warn_reason_lbl'))}</label>
        <div class="reason-grid" id="warn-reasons-box">
          ${WARN_REASONS.map((rs, idx) => `<button type="button" class="reason-opt${idx === 0 ? ' on' : ''}" data-a="pickWarnReason" data-r="${esc(rs)}">${ic('warn', 15)} <span>${esc(translateReasonText(rs))}</span></button>`).join('')}
        </div>
      </div>
      <div class="field">
        <label for="warn-details">${esc(t('warn_det_lbl'))}</label>
        <textarea id="warn-details" style="min-height:84px" placeholder="${esc(t('warn_det_ph'))}"></textarea>
      </div>
      <label class="pledge-box" for="warn-pledge">
        <input type="checkbox" id="warn-pledge">
        <span>${esc(t('warn_pledge_lbl'))}</span>
      </label>
      ${mbtns('submitWarn', t('warn_submit_btn'), 'coral')}
    `);
  },

  pickWarnReason(b) {
    warnReason = b.dataset.r || WARN_REASONS[0];
    $$('#warn-reasons-box .reason-opt').forEach(el => {
      el.classList.toggle('on', el.dataset.r === warnReason);
    });
  },

  async submitWarn() {
    if (!warnTargetUid || !user || !user.uid) return;
    if (warnTargetUid === user.uid) return;
    if (hasMyWarn(warnTargetUid)) return toast('سجّلت علامة تحذير على الحساب ده قبل كده.');
    const proof = getInteractionProof(warnTargetUid);
    if (!proof) return toast('لازم يكون فيه تعامل موثق بينكم الأول.');
    if (!RateGuard.allow('warn', 3, 60000)) return toast('استنى لحظة وجرّب تاني.');

    const details = cleanInput(($('#warn-details') && $('#warn-details').value) || '', 1200);
    const pledge = $('#warn-pledge') && $('#warn-pledge').checked;
    if (details.length < 20) return toast('اكتب تفاصيل الواقعة بوضوح (20 حرف على الأقل) لمنع البلاغات الكيدية.');
    if (!pledge) return toast('لازم تعلّم على إقرار المصداقية الأول.');

    const btn = $('[data-a="submitWarn"]');
    if (btn) btn.disabled = true;
    const wid = `${warnTargetUid}_${user.uid}`;
    const entry = {
      id: wid,
      targetId: warnTargetUid,
      targetName: warnTargetName,
      reporterId: user.uid,
      reporterName: myDisplayName(),
      reason: warnReason,
      details,
      proofType: proof.type,
      proofId: proof.id,
      createdAtMs: Date.now()
    };

    try {
      if (db) {
        await db.collection('warnings').doc(wid).set({
          targetId: warnTargetUid,
          targetName: warnTargetName,
          reporterId: user.uid,
          reporterName: myDisplayName(),
          reason: warnReason,
          details,
          proofType: proof.type,
          proofId: proof.id,
          createdAt: SVT()
        });
        db.collection('reports').doc(wid).set({
          targetId: warnTargetUid,
          reporterId: user.uid,
          reason: warnReason,
          details,
          proofType: proof.type,
          proofId: proof.id,
          createdAt: SVT()
        }).catch(() => {});
      }
      LOCAL_WARNS = LOCAL_WARNS.filter((x: any) => x && x.reporterId === user.uid && x.id !== wid);
      LOCAL_WARNS.push(entry);
      store.set(LOCAL_WARNS_K, JSON.stringify(LOCAL_WARNS));
      rebuildWarnings();
      closeModal();
      if (cur === 'محادثة') goTo('محادثة');
      else render(true);
      const cnt = getWarnCount(warnTargetUid);
      toast(cnt >= 3
        ? t('warn_done_pub_toast', { p: warnPeopleTxt(cnt) })
        : 'اتسجلت علامتك بأمان ✓ (تظهر للعلن لو أكّد عليها 3 أشخاص مختلفين)');
    } catch (e: any) {
      toast(e && e.code === 'permission-denied'
        ? 'لازم الطرفين يأكدوا انتهاء الشغلانة الأول (وتكون القواعد محدثة على Firebase) قبل الإبلاغ.'
        : ('معرفناش نحفظ علامة التحذير (' + (e?.code || 'تأكد من الاتصال') + ')'));
    } finally {
      if (btn) btn.disabled = false;
    }
  },

  pickRevStar(b: any) {
    revStars = Math.max(1, Math.min(5, +b.dataset.i || 5));
    const bx = $('#rev-stars-box');
    if (bx) bx.innerHTML = starPickerHtml('pickRevStar', revStars);
  },

  async postRev() {
    const targetUid = curProvUid;
    if (!targetUid) return;
    if (gate(() => A.postRev())) return;
    if (user.uid === targetUid) return toast('مينفعش تقيّم نفسك يا بطل!');
    if (!RateGuard.allow('review', 4, 60000)) return toast('استنى لحظة قبل إرسال تعديل تاني للتقييم.');

    /* بوابة التقييم الموثّق الصارمة: لا يقبل التقييم إلا لخدمة مكتملة فعلياً مع مقدم الخدمة */
    const completedDeals = getCompletedDealsWithProvider(targetUid);
    const existing = REVIEWS.find(rv => rv.providerId === targetUid && rv.customerId === user.uid && rv.verifiedDeal);
    if (!completedDeals.length && !existing) {
      const agreed = getAgreedDealWithProvider(targetUid);
      if (agreed) {
        A.done({ dataset: { i: agreed.id } });
        return;
      }
      return toast('التقييم متاح فقط بعد تنفيذ وإتمام طلب خدمة فعلي مع مقدم الخدمة ده.');
    }

    const comment = cleanInput(($('#rev-txt') && $('#rev-txt').value) || '', 1200);
    if (!comment) return toast('اكتب كلمة أو رأيك في الشغل (أو دوس ع المايك واتكلم) علشان التقييم يبقى مفيد.');

    const btn = $('[data-a="postRev"]');
    if (btn) btn.disabled = true;
    try {
      const payload = {
        customerId: user.uid,
        customerName: myDisplayName(),
        customerPhoto: profile.photo || user.photoURL || '',
        customerPreset: profile.avatar || '',
        providerId: targetUid,
        stars: Math.max(1, Math.min(5, Math.round(revStars || 5))),
        comment,
        verifiedDeal: true,
        updatedAt: SVT()
      };
      const unreviewedDeal = completedDeals.find(r => !REVIEWS.some(rv => rv.id === r.id));
      const targetDocId = existing ? existing.id : (unreviewedDeal ? unreviewedDeal.id : completedDeals[0].id);

      if (existing) {
        await db.collection('reviews').doc(existing.id).update(payload);
      } else {
        await db.collection('reviews').doc(targetDocId).set({
          ...payload,
          requestId: targetDocId,
          createdAt: SVT()
        });
      }
      if (typeof stopVoice === 'function') stopVoice();
      toast('تسلم! اتنشر تقييمك الموثّق على صفحة مقدم الخدمة ✓');
      render(true);
    } catch (e: any) {
      toast('معرفناش ننشر التقييم (' + (e.code || 'تأكد من إتمام الخدمة أولاً') + ')');
    } finally {
      if (btn) btn.disabled = false;
    }
  },

  async delMyRev(b) {
    const id = b.dataset.i;
    if (!id || !db || !user) return;
    try {
      await db.collection('reviews').doc(id).delete();
      const txt = $('#rev-txt');
      if (txt) { txt.value = ''; txt._typedByHand = false; }
      toast('اتمسح تقييمك.');
    } catch (e) {
      toast('معرفناش نمسح التقييم حالياً.');
    }
  },

  addWork() {
    if (!user || !MY.on) return A.bp();
    pickImg(900, false, (dataUrl: string) => {
      const safeData = safeImgUrl(dataUrl);
      if (!safeData) return toast('ملف الصورة غير مدعوم.');
      _pendWorkImg = safeData;
      openModal(`
        <h2>${esc(t('work_add_h2'))}</h2>
        <img src="${esc(safeData)}" alt="" style="width:100%;max-height:220px;object-fit:cover;border-radius:14px;border:var(--b-sm)">
        <div class="field">
          <label for="wk-title">${esc(t('work_cap_lbl'))}</label>
          <input id="wk-title" placeholder="${esc(t('work_cap_ph'))}">
        </div>
        ${mbtns('saveWork', t('work_save_btn'))}
      `);
    });
  },

  async saveWork() {
    if (!db || !user || !_pendWorkImg) return;
    if (!RateGuard.allow('work', 6, 60000)) return toast('استنى لحظة قبل رفع صورة تانية.');
    const btn = $('[data-a="saveWork"]');
    if (btn) btn.disabled = true;
    try {
      const wid = db.collection('providers').doc(user.uid).collection('works').doc().id;
      const url = await uploadImgSafe(`works/${user.uid}/work_${wid}.jpg`, _pendWorkImg, `requests/${user.uid}/work_${wid}.jpg`);
      const title = cleanInput(($('#wk-title') && $('#wk-title').value) || '', 160);
      await db.collection('providers').doc(user.uid).collection('works').doc(wid).set({
        img: url,
        title,
        createdAt: SVT()
      });
      _pendWorkImg = '';
      closeModal();
      toast('اتضافت الصورة لمعرض شغلك ✓');
    } catch (e: any) {
      toast('معرفناش نرفع الصورة (' + (e.code || 'خطأ') + ')');
    } finally {
      if (btn) btn.disabled = false;
    }
  },

  async delWork(b) {
    if (!db || !user || !b.dataset.i) return;
    try {
      await db.collection('providers').doc(user.uid).collection('works').doc(b.dataset.i).delete();
      toast('اتمسحت الصورة من معرض شغلك.');
    } catch (e) {
      toast('معرفناش نمسح الصورة.');
    }
  },

  shareProv(b) {
    const uid = b.dataset.uid || curProvUid;
    if (!uid) return;
    const person = resolvePerson(uid);
    const p = person.prov;
    const url = location.origin + location.pathname + '#prov=' + encodeURIComponent(uid);
    const locDisp = person.loc ? tLocText(person.loc) : t('share_loc_def');
    openShareSheet({
      kind: 'prov',
      tag: p ? tCat(p.c) : t('share_prov_tag'),
      title: person.name || t('user_fallback'),
      sub: p ? (p.spec || p.bio || t('share_prov_sub_def')) : t('share_user_sub_def'),
      loc: locDisp,
      url,
      photo: person.photo || '',
      shareText: t('share_prov_text', {
        n: person.name || t('user_fallback'),
        loc: person.loc ? ' (' + locDisp + ')' : '',
        u: url
      })
    });
  },

  shareApp() {
    const url = location.origin + location.pathname;
    const myLocRaw = profile.city ? profile.city + (profile.gov ? ' · ' + profile.gov : '') : '';
    openShareSheet({
      kind: 'app',
      tag: t('share_app_tag'),
      title: t('share_app_title'),
      sub: t('share_app_sub'),
      loc: myLocRaw ? tLocText(myLocRaw) : t('share_all_loc'),
      url,
      photo: '',
      shareText: t('share_app_text', { u: url })
    });
  },

  shareClose() { closeShareSheet(); },

  async shareCopy() {
    if (!_shareData) return;
    try {
      await navigator.clipboard.writeText(_shareData.url);
      const btn = $('#sh-copy-btn');
      if (btn) {
        btn.classList.add('copied');
        btn.innerHTML = `${ic('check', 14)} ${esc(t('copied_btn'))}`;
        setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = `${ic('copy', 14)} ${esc(t('copy_btn'))}`; }, 1800);
      }
      toast('اتنسخ الرابط المختصر ✓');
    } catch { toast(_shareData.url); }
  },

  shareNative() {
    if (!_shareData) return;
    if (navigator.share) {
      navigator.share({ title: _shareData.title, text: _shareData.sub + (_shareData.loc ? ' · ' + _shareData.loc : ''), url: _shareData.url }).catch(() => {});
    } else {
      A.shareCopy();
    }
  },

  async shareToChat(b: any) {
    if (!_shareData) return;
    const idx = Number(b.dataset.i);
    const c = CHATS[idx];
    if (!c || !db || !user || !c.uid) return;
    if (cpBlockedByMe(c) || cpBlockedByOther(c)) return toast('الدردشة دي محظورة.');
    const txt = `${_shareData.title}${_shareData.loc ? ' (' + _shareData.loc + ')' : ''}\n${_shareData.url}`;
    const tm = nowT();
    try {
      const ref = db.collection('conversations').doc(c.cid);
      const myPhoto = profile.photo || user.photoURL || '';
      await ref.set({
        participants: [user.uid, c.uid].sort(),
        names: { [user.uid]: myDisplayName(), [c.uid]: c.w || 'مستخدم' },
        photos: { [user.uid]: myPhoto, [c.uid]: c.photo || '' },
        lastText: _shareData.title.slice(0, 120),
        lastTime: tm,
        lastSender: user.uid,
        updatedAt: SVT()
      }, { merge: true });
      await ref.collection('messages').add({ senderId: user.uid, text: txt.slice(0, 1500), img: '', time: tm, createdAt: SVT() });
      closeShareSheet();
      toast(`اتبعت إلى ${c.w} ✓`);
    } catch {
      toast('معرفناش نبعت للمحادثة دي دلوقتي.');
    }
  },

  async shareCardPng() {
    if (!_shareData) return;
    const d = _shareData;
    const lang = curLang();
    const isRtl = getLangMeta(lang).dir === 'rtl';
    const ff = canvasFontStack(lang);
    const genBannerUrl = buildLocalizedShareBanner(d);
    const loadImg = (src: string): Promise<HTMLImageElement | null> => new Promise(res => {
      if (!src) return res(null);
      const im = new Image();
      if (!src.startsWith('./') && !src.startsWith('/') && !src.startsWith('data:')) im.crossOrigin = 'anonymous';
      im.onload = () => res(im);
      im.onerror = () => res(null);
      im.src = src;
    });
    const [iconIm, rawBanner, fallbackBanner] = await Promise.all([
      loadImg('./assets/icon-192.png'),
      loadImg(safeImgUrl(d.photo) || genBannerUrl),
      loadImg(genBannerUrl)
    ]);
    const heroIm = rawBanner || fallbackBanner;
    const W = 1080, H = 1920;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    /* خلفية استوديو ورقية متكيفة باللغة 9:16 */
    ctx.fillStyle = '#FAF4EC';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#4BD4BE';
    canvasRoundRect(ctx, -90, 120, 320, 320, 76); ctx.fill();
    ctx.fillStyle = '#FFE26A';
    canvasRoundRect(ctx, W - 260, H - 480, 340, 340, 88); ctx.fill();
    ctx.fillStyle = 'rgba(27, 27, 27, .07)';
    for (let gx = 40; gx < W; gx += 42) {
      for (let gy = 40; gy < H; gy += 42) {
        ctx.beginPath(); ctx.arc(gx, gy, 1.5, 0, Math.PI * 2); ctx.fill();
      }
    }

    /* كارت الستوري الأساسي بظل حاد */
    ctx.fillStyle = '#1B1B1B';
    canvasRoundRect(ctx, 74, 88, 948, 1756, 46); ctx.fill();
    ctx.fillStyle = '#FFFDF9';
    ctx.strokeStyle = '#1B1B1B';
    ctx.lineWidth = 5;
    canvasRoundRect(ctx, 62, 74, 948, 1756, 46); ctx.fill(); ctx.stroke();

    /* شريط البراند العلوي + التاج */
    ctx.fillStyle = '#FFF3DF';
    canvasRoundRect(ctx, 96, 110, 880, 108, 28); ctx.fill();
    ctx.strokeStyle = '#1B1B1B'; ctx.lineWidth = 3; ctx.stroke();
    const iconX = isRtl ? 892 : 118;
    if (iconIm) {
      ctx.save();
      canvasRoundRect(ctx, iconX, 130, 68, 68, 18); ctx.clip();
      ctx.drawImage(iconIm, iconX, 130, 68, 68);
      ctx.restore();
    }
    ctx.direction = isRtl ? 'rtl' : 'ltr';
    ctx.textAlign = isRtl ? 'right' : 'left';
    ctx.fillStyle = '#1B1B1B'; ctx.font = `900 30px ${ff}`;
    ctx.fillText(t('story_brand_hdr'), isRtl ? 872 : 204, 176);

    const tagW = 266;
    const tagX = isRtl ? 116 : 956 - tagW;
    ctx.fillStyle = '#FA6B63';
    canvasRoundRect(ctx, tagX, 136, tagW, 56, 999); ctx.fill();
    ctx.strokeStyle = '#1B1B1B'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.fillStyle = '#FFFFFF'; ctx.textAlign = 'center'; ctx.font = `800 22px ${ff}`;
    ctx.fillText(String(d.tag || t('share_req_tag')).slice(0, 18), tagX + tagW / 2, 172);

    /* نافذة الصورة / البوستر */
    const bx = 96, by = 250, bw = 880, bh = 540;
    const drawCover = (im: HTMLImageElement) => {
      ctx.save();
      canvasRoundRect(ctx, bx, by, bw, bh, 32); ctx.clip();
      const sc = Math.max(bw / im.naturalWidth, bh / im.naturalHeight);
      const dw = im.naturalWidth * sc, dh = im.naturalHeight * sc;
      ctx.drawImage(im, bx + (bw - dw) / 2, by + (bh - dh) / 2, dw, dh);
      ctx.restore();
      ctx.strokeStyle = '#1B1B1B'; ctx.lineWidth = 4;
      canvasRoundRect(ctx, bx, by, bw, bh, 32); ctx.stroke();
    };
    if (heroIm) {
      try {
        drawCover(heroIm);
        cv.toDataURL();
      } catch {
        ctx.fillStyle = '#FFFDF9';
        canvasRoundRect(ctx, bx, by, bw, bh, 32); ctx.fill();
        if (fallbackBanner) drawCover(fallbackBanner);
      }
    }

    /* العنوان والوصف بخط متكيف ومغلف بالمساحة لجميع اللغات */
    const textEdge = isRtl ? 970 : 102;
    ctx.direction = isRtl ? 'rtl' : 'ltr';
    ctx.textAlign = isRtl ? 'right' : 'left';
    ctx.fillStyle = '#1B1B1B'; ctx.font = `900 46px ${ff}`;
    const afterTitleY = drawCanvasWrapped(ctx, String(d.title || t('share_app_title')), textEdge, 868, 860, 64, 3);
    if (d.sub) {
      ctx.fillStyle = '#5E574F'; ctx.font = `700 28px ${ff}`;
      drawCanvasWrapped(ctx, String(d.sub), textEdge, Math.max(afterTitleY + 14, 1028), 860, 42, 2);
    }

    /* 3 مزايا مميزة باللغة المختارة */
    const hls: Array<[string, string]> = [
      [t('story_hl_1'), '#E8F7F2'],
      [t('story_hl_2'), '#FFF3B0'],
      [t('story_hl_3'), '#E7F0FF']
    ];
    hls.forEach(([lbl, bg], idx) => {
      const cw = 280, gap = 20;
      const cx = 96 + idx * (cw + gap), cy = 1170, ch = 120;
      ctx.fillStyle = bg;
      canvasRoundRect(ctx, cx, cy, cw, ch, 24); ctx.fill();
      ctx.strokeStyle = '#1B1B1B'; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = '#1B1B1B'; ctx.textAlign = 'center'; ctx.font = `800 22px ${ff}`;
      drawCanvasWrapped(ctx, lbl, cx + cw / 2, cy + 54, cw - 28, 30, 2);
    });

    /* شرائح المكان والتواصل المباشر */
    ctx.fillStyle = '#E8F7F2';
    canvasRoundRect(ctx, 550, 1326, 426, 82, 22); ctx.fill();
    ctx.strokeStyle = '#1B1B1B'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#0F766E'; ctx.textAlign = 'center'; ctx.font = `800 24px ${ff}`;
    ctx.fillText('📍 ' + String(d.loc || t('share_all_loc')).slice(0, 24), 763, 1376);

    ctx.fillStyle = '#FFF3B0';
    canvasRoundRect(ctx, 96, 1326, 430, 82, 22); ctx.fill();
    ctx.strokeStyle = '#1B1B1B'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#1B1B1B'; ctx.textAlign = 'center'; ctx.font = `800 24px ${ff}`;
    ctx.fillText(t('story_direct_cta').slice(0, 28), 311, 1376);

    /* حوض الرابط + كود مسح بصري */
    ctx.fillStyle = '#161B29';
    canvasRoundRect(ctx, 96, 1444, 880, 326, 32); ctx.fill();

    const qx = isRtl ? 132 : 748, qy = 1484, qs = 220;
    ctx.fillStyle = '#FFFFFF';
    canvasRoundRect(ctx, qx, qy, qs, qs, 22); ctx.fill();
    const gridN = 9, cell = 18, pad = (qs - gridN * cell) / 2;
    const rawUrlStr = String(d.url || location.href);
    let seed = 2166136261;
    for (let i = 0; i < rawUrlStr.length; i++) seed = ((seed ^ rawUrlStr.charCodeAt(i)) * 16777619) >>> 0;
    ctx.fillStyle = '#161B29';
    const isFinder = (r: number, c: number) =>
      (r < 3 && c < 3) || (r < 3 && c >= gridN - 3) || (r >= gridN - 3 && c < 3);
    for (let r = 0; r < gridN; r++) {
      for (let col = 0; col < gridN; col++) {
        let on = false;
        if (isFinder(r, col)) on = !(r === 1 && col === 1) && !(r === 1 && col === gridN - 2) && !(r === gridN - 2 && col === 1);
        else {
          seed = (seed * 1664525 + 1013904223) >>> 0;
          on = (seed >>> 29) > 3;
        }
        if (on) ctx.fillRect(qx + pad + col * cell, qy + pad + r * cell, cell - 3, cell - 3);
      }
    }
    ctx.fillStyle = '#4BD4BE'; ctx.textAlign = 'center'; ctx.font = `800 18px ${ff}`;
    ctx.fillText(t('story_scan_hint').slice(0, 24), qx + qs / 2, qy + qs + 28);

    const footEdge = isRtl ? 934 : 136;
    ctx.direction = isRtl ? 'rtl' : 'ltr';
    ctx.textAlign = isRtl ? 'right' : 'left';
    ctx.fillStyle = '#4BD4BE'; ctx.font = `900 28px ${ff}`;
    drawCanvasWrapped(ctx, t('story_footer_cta'), footEdge, 1528, 560, 42, 3);
    ctx.direction = 'ltr'; ctx.textAlign = isRtl ? 'right' : 'left';
    ctx.fillStyle = '#FFFDF9'; ctx.font = '700 22px monospace';
    ctx.fillText(rawUrlStr.replace(/^https?:\/\//, '').slice(0, 44), footEdge, 1692);

    cv.toBlob(async blob => {
      if (!blob) return;
      const file = new File([blob], 'wasla-story.png', { type: 'image/png' });
      const nav: any = navigator;
      if (nav.canShare && nav.canShare({ files: [file] })) {
        try { await nav.share({ files: [file], title: d.title, text: d.shareText }); return; } catch {}
      }
      const u = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = u; a.download = 'wasla-story.png'; a.click();
      setTimeout(() => URL.revokeObjectURL(u), 2000);
      toast(t('story_ready_toast'));
    }, 'image/png');
  },

  chat(b) {
    const n = (b.dataset && b.dataset.n) || 'مستخدم';
    const uid = (b.dataset && b.dataset.uid) || '';
    const pObj = PROV.find(x => x.uid === uid);
    const rObj = REQS.find(x => x.ownerId === uid);
    const ph = (pObj && pObj.photo) || (rObj && rObj.ownerPhoto) || '';
    closeModal();
    if (gate(() => openChatWith(n, uid, ph))) return;
    openChatWith(n, uid, ph);
  },

  ch(b) {
    const idx = +b.dataset.i;
    if (!CHATS[idx]) return;
    chat = idx;
    markChatSeen(CHATS[idx]);
    if (CHATS[idx].existsOnServer) subscribeMsgs(CHATS[idx]);
    goTo('محادثة');
  },
  send() {
    if (gate(() => A.send())) return;
    const t = (($('#cm') && $('#cm').value) || '').trim();
    if (t) sendMsg({ t });
  },
  /* زر واتساب الموحد في الدردشة: لو فيه نص بيبعت فوراً، ولو فاضي بيفتح/يقفل الكتابة بالصوت */
  cact() {
    const inp = $('#cm');
    if (!inp) return;
    const t = (inp.value || '').trim();
    if (t) {
      if (_voiceActive && _voiceEl === inp) stopVoice();
      A.send();
    } else {
      if (getChatQuota('voice').remaining <= 0) {
        showChatQuotaModal('voice');
        return;
      }
      if (gate(() => cpStartRec())) return;
      cpStartRec();
    }
  },
  cimg() { A.cgallery(); },
  async qr(b: any) {
    const t = (b && b.dataset && b.dataset.t) || '';
    if (!t) return;
    if (gate(() => { sendMsg({ t }); })) return;
    b.disabled = true;
    b.classList.add('is-sending');
    try { await sendMsg({ t }); }
    finally { b.disabled = false; b.classList.remove('is-sending'); }
  },
  msgMore(b: any) {
    const bb = b?.closest?.('.bb[data-mid]') as HTMLElement | null;
    const wrap = b?.closest?.('.mtxt-wrap') as HTMLElement | null;
    if (!wrap) return;
    const mid = bb?.dataset?.mid || b?.dataset?.mid || '';
    if (wrap.classList.contains('is-open')) {
      cpCollapseExpandedMsg(wrap);
      return;
    }
    document.querySelectorAll('#thr .mtxt-wrap.is-open').forEach((other: any) => {
      if (other !== wrap) cpCollapseExpandedMsg(other);
    });
    const inEl = wrap.querySelector('.mtxt-in') as HTMLElement | null;
    const lbl = wrap.querySelector('.mtxt-m-lbl');
    if (mid) _expandedMids.add(mid);
    if (inEl) {
      const startH = inEl.getBoundingClientRect().height;
      inEl.style.maxHeight = startH + 'px';
      void inEl.offsetHeight;
      wrap.classList.add('is-open');
      const targetH = inEl.scrollHeight;
      inEl.style.maxHeight = targetH + 'px';
      setTimeout(() => { if (wrap.classList.contains('is-open')) inEl.style.maxHeight = 'none'; }, 540);
    } else {
      wrap.classList.add('is-open');
    }
    if (lbl) lbl.textContent = t('msg_read_less');
  },
  cmExpand() {
    _cmExpanded = !_cmExpanded;
    cpApplyExpandedUI();
    syncChatComposerUI();
    const cm = $('#cm') as HTMLTextAreaElement | null;
    if (cm) { try { cm.focus({ preventScroll: true }); } catch { cm.focus(); } }
  },
  trInline(b: any) {
    if (b) void trToggleInline(b);
  },
  mtranslate(b: any) {
    const mid = b && b.dataset && b.dataset.mid;
    const m = mid ? cpFindMsg(mid) : null;
    cpCloseCtx(); closeModal();
    if (!mid || !m) return;
    const box = Array.from(document.querySelectorAll('#thr [data-mid]')).find(
      n => (n as HTMLElement).dataset.mid === mid
    ) as HTMLElement | undefined;
    const deal = cpParseDealMsg(m[1]);
    let trId = '';
    if (deal) {
      trId = `deal_${mid}`;
      if (!_trRaw.has(trId)) trPrep(trId, [deal.title, deal.when, deal.note || '']);
    } else if (box && (box.matches('.mg') || box.querySelector('.mcap'))) {
      trId = `msg_${mid}_cap`;
      if (!_trRaw.has(trId)) {
        const capParts = m[1] ? ((m[5]?.replyTo?.text) ? [m[1], String(m[5].replyTo.text)] : [m[1]]) : [];
        if (capParts.length) trPrep(trId, capParts);
      }
    } else {
      trId = `msg_${mid}`;
      if (!_trRaw.has(trId)) {
        const msgParts = m[1] ? ((m[5]?.replyTo?.text) ? [m[1], String(m[5].replyTo.text)] : [m[1]]) : [];
        if (msgParts.length) trPrep(trId, msgParts);
      }
    }
    if (trId && _trRaw.has(trId)) void trRunById(trId, null, { force: true, mid });
  },

  saveReq(b) {
    toggleSaveId(b.dataset.i);
    toast(SAVED_IDS.has(b.dataset.i) ? 'اتحفظ الطلب في المحفوظات ✓' : 'اتشال من المحفوظات');
    render(true);
  },
  shareReq(b) {
    const r = REQS.find(x => x.id === b.dataset.i);
    if (!r) return;
    const url = location.origin + location.pathname + '#req=' + encodeURIComponent(r.id);
    const locDisp = r.loc ? tLocText(r.loc) : t('share_loc_def');
    openShareSheet({
      kind: 'req',
      tag: r.sub ? `${tCat(r.c)} · ${tSub(r.c, r.sub)}` : tCat(r.c),
      title: r.t,
      sub: r.bud && r.bud !== 'مفتوحة' ? t('share_bud_fmt', { b: tBud(r.bud) }) : (r.d || t('share_req_sub_def')),
      loc: locDisp,
      url,
      photo: (r.imgs && r.imgs[0]) || '',
      shareText: t('share_req_text', {
        t: r.t,
        loc: r.loc ? ' (' + locDisp + ')' : '',
        u: url
      })
    });
  },
  zoom(b: any) {
    const safeSrc = safeImgUrl(b && b.src);
    if (!safeSrc) return;
    cpOpenViewer(safeSrc, b);
  },
  ivclose() { cpCloseViewer(); },

  photo() {
    if (gate(() => A.photo())) return;
    pickImg(280, true, async d => {
      const url = await uploadImgSafe(`avatars/${user.uid}/avatar_${Date.now()}.jpg`, d);
      profile.photo = url;
      await saveProfileToFirebase().catch(() => {});
      if (MY.on && db) db.doc('providers/' + user.uid).update({ photoURL: url, updatedAt: SVT() }).catch(() => {});
      refreshMe();
      toast('اتحدّثت صورتك الشخصية!');
    });
  },
  async rmphoto() {
    profile.photo = '';
    await saveProfileToFirebase().catch(() => {});
    refreshMe();
  },
  async preset(b) {
    profile.avatar = 'p' + b.dataset.i;
    profile.photo = '';
    await saveProfileToFirebase().catch(() => {});
    if (MY.on && db) db.doc('providers/' + user.uid).update({ preset: profile.avatar, photoURL: '', updatedAt: SVT() }).catch(() => {});
    refreshMe();
  },

  edit() {
    LOC.pe = { g: profile.gov || '', c: profile.city || '' };
    openModal(`
      <h2>${esc(t('edit_modal_h2'))}</h2>
      <div class="names">
        <div class="field"><label for="pe1">${esc(t('first_nm'))}</label><input id="pe1" value="${esc(profile.first || '')}"></div>
        <div class="field"><label for="pe2">${esc(t('second_nm'))}</label><input id="pe2" value="${esc(profile.second || '')}"></div>
        <div class="field"><label for="pe3">${esc(t('last_nm'))}</label><input id="pe3" value="${esc(profile.third || '')}"></div>
      </div>
      <div class="field"><label for="pep">${esc(t('acc_phone'))}</label><input id="pep" class="ltr" type="tel" value="${esc(profile.phone || '')}" placeholder="01012345678"></div>
      <div class="field"><label>${esc(t('acc_loc'))}</label>${locBtn('pe')}</div>
      ${mbtns('saveedit', esc(t('save_changes')))}
    `);
    ['pe1', 'pe2', 'pe3', 'pep'].forEach(id => {
      const el = $('#' + id);
      if (el) el.addEventListener('input', () => el.classList.remove('bad'));
    });
  },
  async saveedit() {
    const a = cleanInput(($('#pe1') && $('#pe1').value) || '', 60);
    const b = cleanInput(($('#pe2') && $('#pe2').value) || '', 60);
    const c = cleanInput(($('#pe3') && $('#pe3').value) || '', 60);
    if (!a || !c) {
      if (!a && $('#pe1')) $('#pe1').classList.add('bad');
      if (!c && $('#pe3')) $('#pe3').classList.add('bad');
      return toast('اكتب الاسم الأول واللقب على الأقل.');
    }
    const normPh = normalizeEgyptPhone(($('#pep') && $('#pep').value) || '');
    if (!normPh) {
      if ($('#pep')) $('#pep').classList.add('bad');
      return toast('اكتب رقم موبايل مصري مظبوط، زي: 01012345678');
    }
    profile.first = a; profile.second = b; profile.third = c;
    profile.phone = normPh;
    if (LOC.pe.c) { profile.gov = LOC.pe.g; profile.city = LOC.pe.c; }
    closeModal();
    await saveProfileToFirebase().catch(() => toast('معرفناش نحفظ التعديل.'));
    refreshMe();
    toast('اتحفظت بياناتك تمام!');
  },

  out() {
    if (!user && !isIn()) return startGate();
    openModal(`<h2>${esc(t('logout_h2'))}</h2><p>${esc(t('logout_p'))}</p>${mbtns('out2', esc(t('logout_go')), 'coral')}`);
  },
  async out2() {
    closeModal();
    stopConvs();
    Object.values(_offerUnsubs).forEach(u => { try { u(); } catch (e) {} });
    _offerUnsubs = {};
    if (_notifUnsub) { try { _notifUnsub(); } catch (e) {} _notifUnsub = null; }
    if (auth) try { await auth.signOut(); } catch (e) {}
    user = null; profile = {}; MY = { on: false }; CHATS = []; NOTIFS = []; SERVER_NOTIFS = []; UNREAD = 0;
    MY_SENT_OFFERS.clear();
    clearNavState();
    rebuildReq(); rebuildProv();
    cur = 'الرئيسية';
    go('intro');
  }
};

/* ================== معالجات الدردشة المتطورة ================== */
let _cpLoc: any = null, _cpClickX = 0, _pinFails = 0, _pinUntil = 0;
document.addEventListener('click', (e: any) => { _cpClickX = e.clientX || 0; }, true);

const cpMi = (act: string, icon: string, label: string, cls = '', extra = '') =>
  `<button class="cpmi ${cls}" type="button" data-a="${act}" ${extra}>${ic(icon, 18)}<span>${label}</span></button>`;

function cpRedrawComposer() {
  const c = CHATS[chat];
  const cw = $('#cwrap');
  if (!cw || !c) return;
  const v = ($('#cm') || {}).value || '';
  cw.innerHTML = cpComposerHtml(c);
  bindChatComposer();
  const i = $('#cm');
  if (i) { i.value = v; syncChatComposerUI(); }
}

/* ===== Telegram-style Context Menu ===== */
const TG_REACTS = ['❤️','😂','😮','😢','👍','🔥'];
let _ctxEl: any = null;

/* تفاعل مع تبديل (اضغط نفس الإيموجي تاني يتشال) + أنيميشن طاير */
function cpReact(mid: string, em: string, anchor?: any) {
  (A as any)._dblHit = true;
  clearTimeout((A as any)._mmT);
  const c = CHATS[chat];
  if (!c || !mid || !db || !hasLiveAuth()) return;
  const m = cpFindMsg(mid);
  if (m && m[5] && m[5].loc) return;
  const curRx = m && m[5] && m[5].reactions && m[5].reactions[user.uid];
  const removing = curRx === em;
  const el = anchor || document.querySelector(`#thr [data-mid="${CSS.escape(mid)}"]`);
  if (el && !removing) {
    const r = el.getBoundingClientRect();
    const fly = document.createElement('div');
    fly.className = 'tg-fly';
    fly.textContent = em;
    fly.style.left = (r.left + r.width / 2) + 'px';
    fly.style.top = (r.top + r.height / 2) + 'px';
    document.body.appendChild(fly);
    setTimeout(() => fly.remove(), 900);
  }
  const prevMap = m && m[5] && m[5].reactions ? { ...m[5].reactions } : {};
  if (m) {
    m[5] = m[5] || {};
    m[5].reactions = { ...prevMap };
    if (removing) delete m[5].reactions[user.uid];
    else m[5].reactions[user.uid] = em;
    cpRenderThread(c);
  }
  const FV = firebase.firestore.FieldValue;
  db.collection('conversations').doc(c.cid).collection('messages').doc(mid)
    .update({ ['reactions.' + user.uid]: removing ? FV.delete() : em })
    .catch((e: any) => {
      if (m) { m[5].reactions = prevMap; cpRenderThread(c); }
      toast(e && e.code === 'permission-denied' ? t('react_fail_rules') : (t('tr_fail') || 'Error'));
    });
}
function cpCloseCtx() {
  const old = $('#tg-ctx');
  if (old) { old.classList.add('ctx-out'); setTimeout(() => old.remove(), 200); }
  _ctxEl = null;
}

function cpOpenCtx(id: string, m: any, anchor: any) {
  cpCloseCtx();
  const ex = `data-mid="${esc(id)}"`;
  const mine = !!m[0];
  const d = m[5] || {};
  const isLoc = !!(d.loc || (anchor && anchor.classList && anchor.classList.contains('ml')));
  const isVoice = !!safeAudioUrl(d.audio);
  const curR = d.reactions && d.reactions[user.uid];

  const reacts = isLoc ? '' : TG_REACTS.map((em, i) =>
    `<button class="tg-rb${curR === em ? ' on' : ''}" type="button" data-a="ctxreact" data-mid="${esc(id)}" data-em="${em}" style="animation-delay:${i * 30}ms"><span>${em}</span></button>`
  ).join('');

  const delBtns = [
    `<button class="tg-delbtn" type="button" data-a="mdelme" ${ex}>${ic('eyeOff', 16)}<span>${esc(t('ctx_del_me'))}</span></button>`,
    mine ? `<button class="tg-delbtn danger" type="button" data-a="mdelall" ${ex}>${ic('trash', 16)}<span>${esc(t('ctx_del_all'))}</span></button>` : ''
  ].filter(Boolean).join('');

  const c = CHATS[chat];
  const curPin = cpPinnedMsgOf(c);
  const isThisPinned = !!(curPin && curPin.id === id);
  const subItems = isLoc ? '' : [
    `<button class="tg-subbtn" type="button" data-a="mreply" ${ex}>${ic('reply', 17)}<span>${esc(t('ctx_reply'))}</span></button>`,
    cpCanEditMsg(m) ? `<button class="tg-subbtn" type="button" data-a="medit" ${ex}>${ic('edit', 17)}<span>${esc(t('edit_btn'))}</span></button>` : '',
    m[1] ? `<button class="tg-subbtn" type="button" data-a="mcopy" ${ex}>${ic('copy', 17)}<span>${esc(t('ctx_copy'))}</span></button>` : '',
    m[1] && !isVoice ? `<button class="tg-subbtn" type="button" data-a="mtranslate" ${ex}>${ic('translate', 17)}<span>${esc(t('ctx_translate'))}</span></button>` : '',
    `<button class="tg-subbtn" type="button" data-a="${isThisPinned ? 'mpinx' : 'mpin'}" ${ex}>${ic('pinMsg', 17)}<span>${esc(t(isThisPinned ? 'ctx_unpin' : 'ctx_pin'))}</span></button>`
  ].filter(Boolean).join('');

  const ctx = document.createElement('div');
  ctx.className = 'tg-ctx';
  ctx.id = 'tg-ctx';
  ctx.innerHTML = `<div class="tg-ctx-bg" data-a="ctxclose"></div>
    <div class="tg-ctx-top">
      ${reacts ? `<div class="tg-rbar">${reacts}</div>` : ''}
      <div class="tg-delbar">${delBtns}</div>
    </div>
    ${subItems ? `<div class="tg-ctx-bot"><div class="tg-subbar">${subItems}</div></div>` : ''}`;

  /* تثبيت القائمة فوق وتحت الفقاعة مع منع أي خروج عن حدود الشاشة يمين أو شمال */
  document.body.appendChild(ctx);
  requestAnimationFrame(() => {
    ctx.classList.add('ctx-in');
    const topTray = ctx.querySelector('.tg-ctx-top') as HTMLElement | null;
    const botTray = ctx.querySelector('.tg-ctx-bot') as HTMLElement | null;
    if (!anchor) return;
    const r = anchor.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cx = r.left + r.width / 2;
    const clampLeft = (w: number) => Math.max(12, Math.min(vw - w - 12, cx - w / 2));

    let topY = 14;
    if (topTray) {
      topTray.style.right = 'auto';
      const tw = topTray.offsetWidth;
      const th = topTray.offsetHeight;
      topY = Math.max(12, Math.min(vh - th - (botTray ? 72 : 14), r.top - th - 10));
      topTray.style.left = clampLeft(tw) + 'px';
      topTray.style.top = topY + 'px';
      const tr = topTray.getBoundingClientRect();
      if (tr.right > vw - 12) topTray.style.left = Math.max(12, vw - tr.width - 12) + 'px';
      if (tr.left < 12) topTray.style.left = '12px';
    }
    if (botTray) {
      botTray.style.right = 'auto';
      const bw = botTray.offsetWidth;
      const bh = botTray.offsetHeight;
      const minBotY = topTray ? topY + topTray.offsetHeight + 8 : 12;
      const botY = Math.min(vh - bh - 14, Math.max(minBotY, r.bottom + 10));
      botTray.style.left = clampLeft(bw) + 'px';
      botTray.style.top = botY + 'px';
      const br = botTray.getBoundingClientRect();
      if (br.right > vw - 12) botTray.style.left = Math.max(12, vw - br.width - 12) + 'px';
      if (br.left < 12) botTray.style.left = '12px';
    }
  });
  _ctxEl = ctx;
}

/* ===== Full-screen Image Viewer ===== */
function cpOpenViewer(src: string, imgEl?: any) {
  cpCloseViewer();
  const mid = imgEl && imgEl.closest && imgEl.closest('[data-mid]');
  const midVal = mid ? mid.dataset.mid : '';
  const m = midVal ? cpFindMsg(midVal) : null;
  const d = m && m[5] || {};

  const rObj = d.reactions || {};
  const rCounts: Record<string,number> = {};
  Object.values(rObj).forEach((em: any) => { if (em) rCounts[String(em)] = (rCounts[String(em)] || 0) + 1; });
  const chips = Object.entries(rCounts).map(([em, n]) => `<span class="tg-rc lg">${em}${n > 1 ? `<b>${n}</b>` : ''}</span>`).join('');

  const reacts = midVal ? `<div class="tg-rbar vr">${TG_REACTS.map(em =>
    `<button class="tg-rb" type="button" data-a="msgreact" data-mid="${esc(midVal)}" data-em="${em}"><span>${em}</span></button>`
  ).join('')}</div>` : '';

  const v = document.createElement('div');
  v.className = 'tg-viewer';
  v.id = 'tg-viewer';
  v.innerHTML = `<div class="tg-vbg" data-a="ivclose"></div>
    <button class="tg-vback" type="button" data-a="ivclose" aria-label="${esc(t('back'))}" title="${esc(t('back'))}">${ic('back', 18)}<span>${esc(t('back'))}</span></button>
    <div class="tg-vbody">
      <img src="${esc(src)}" alt="" draggable="false">
      <div class="tg-vfoot">
        ${reacts}
        ${chips ? `<div class="tg-vchips">${chips}</div>` : ''}
        <div class="tg-vacts">
          <a class="tg-vbtn" href="${esc(src)}" download="wasla-photo.jpg">${ic('arrowup', 18)} ${esc(t('msg_dl_photo'))}</a>
        </div>
      </div>
    </div>`;
  v.addEventListener('click', e => { if (e.target === v || (e.target as HTMLElement).classList.contains('tg-vbg')) cpCloseViewer(); });
  document.body.appendChild(v);
  requestAnimationFrame(() => v.classList.add('tg-vin'));
}

function cpCloseViewer() {
  const v = $('#tg-viewer');
  if (v) { v.classList.add('tg-vout'); setTimeout(() => v.remove(), 280); }
}

function cpRedrawTop() {
  const c = CHATS[chat];
  if (c && cur === 'محادثة') cpSyncTopHeader(c);
}

function cpClearChatSearchMarks() {
  document.querySelectorAll('#thr .msg-hit, #thr .msg-hit-cur').forEach((el: any) => {
    el.classList.remove('msg-hit', 'msg-hit-cur');
  });
}

function cpApplyChatSearch(scroll = true) {
  cpClearChatSearchMarks();
  const c = CHATS[chat];
  const cnt = $('#ch-search-cnt');
  const qRaw = (_chSearchQ || '').trim();
  const hasFilter = !!(qRaw || _chSearchCat !== 'all');
  if (!c || !hasFilter) {
    if (cnt) cnt.textContent = '';
    return;
  }
  const res = cpSmartSearchAnalyze(c, qRaw, _chSearchCat);
  const hits: HTMLElement[] = [];
  res.items.forEach(it => {
    const sel = `#thr [data-mid="${(window as any).CSS && CSS.escape ? CSS.escape(it.id) : it.id}"]`;
    const el = document.querySelector(sel) as HTMLElement | null;
    if (el) {
      el.classList.add('msg-hit');
      hits.push(el);
    }
  });
  if (!hits.length) {
    _chSearchIdx = 0;
    if (cnt) cnt.textContent = '0/0';
    return;
  }
  if (_chSearchIdx < 0) _chSearchIdx = hits.length - 1;
  if (_chSearchIdx >= hits.length) _chSearchIdx = 0;
  const curEl = hits[_chSearchIdx];
  curEl.classList.add('msg-hit-cur');
  if (cnt) cnt.textContent = `${_chSearchIdx + 1}/${hits.length}`;
  if (scroll) curEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

function cpRefreshFloatBars(focusInput = true) {
  const c = CHATS[chat];
  if (!c || cur !== 'محادثة') return;
  const old = $('#chat-float-bars');
  const html = cpFloatBarsHtml(c);
  if (html) {
    if (old) old.outerHTML = html;
    else {
      const th = $('#thr');
      if (th) th.insertAdjacentHTML('beforebegin', html);
    }
    if (focusInput) {
      const si = $('#ch-search-in') as HTMLInputElement | null;
      if (si && document.activeElement !== si) {
        si.focus();
        try { si.setSelectionRange(si.value.length, si.value.length); } catch {}
      }
    }
    cpApplyChatSearch(false);
  } else if (old) {
    old.remove();
    cpClearChatSearchMarks();
  }
}

function cpSeekVoiceAt(vwEl: any, clientX: number) {
  const el = vwEl && vwEl.closest ? vwEl.closest('.vm') : null;
  const wrap = el && ((el.dataset && el.dataset.mid) ? el : (el.closest ? el.closest('[data-mid]') : null));
  const id = wrap && wrap.dataset && wrap.dataset.mid;
  if (!id) return;
  const rect = vwEl.getBoundingClientRect();
  const frac = Math.max(0, Math.min(1, (clientX - rect.left) / Math.max(1, rect.width)));
  if (_cpAuId !== id) A.vplay(el.querySelector('.vp'));
  const vd = el.querySelector('.vd');
  const total = Number(vd && vd.dataset.dur) || (_cpAu && isFinite(_cpAu.duration) ? _cpAu.duration : 0) || 0;
  if (_cpAu && total) {
    try { _cpAu.currentTime = frac * total; } catch (e) {}
    cpAuSync();
  }
}

async function cpConvSet(c: any, patch: any, create = false): Promise<boolean> {
  if (!db || !hasLiveAuth() || !c || !c.cid) return false;
  if (!c.existsOnServer && !create) return true;
  const ref = db.collection('conversations').doc(c.cid);
  try {
    if (!c.existsOnServer) {
      patch = {
        participants: [user.uid, c.uid].sort(),
        names: { [user.uid]: myDisplayName(), [c.uid]: c.w },
        photos: { [user.uid]: profile.photo || user.photoURL || '', [c.uid]: c.photo || '' },
        updatedAt: SVT(),
        ...patch
      };
    }
    await ref.set(patch, { merge: true });
    if (!c.existsOnServer) { c.existsOnServer = true; subscribeMsgs(c); }
    return true;
  } catch (e) {
    toast('معرفناش ننفذ العملية (' + (e.code || 'تأكد من الاتصال') + ')');
    return false;
  }
}

async function cpHash(pin: string, salt: string) {
  const b = new TextEncoder().encode(salt + ':' + pin);
  const h = await crypto.subtle.digest('SHA-256', b);
  return Array.from(new Uint8Array(h)).map(x => x.toString(16).padStart(2, '0')).join('');
}

let _pinTargetCid = '';
let _pinSetupMode: 'lock' | 'change' = 'lock';

function cpPinSetup(targetCid = '', mode: 'lock' | 'change' = 'lock') {
  _pinTargetCid = targetCid;
  _pinSetupMode = mode;
  _otpReveal = false;
  const mkOtp = (id: string, label: string) => {
    const bx = Array.from({ length: 6 }, (_, i) => `<input class="otp-box" type="password" maxlength="1" data-grp="${id}" data-idx="${i}" data-a="otpkey" autocomplete="off" inputmode="text" aria-label="${label} ${i + 1}">`).join('');
    return `<label class="otp-label">${label}</label><div class="otp-row" data-grp="${id}">${bx}</div>`;
  };
  openModal(`<h2 style="display:flex;align-items:center;gap:10px">${cpVaultEmblemSvg(34)} ${esc(t(mode === 'change' ? 'pin_setup_chg' : 'pin_setup_new_t'))}</h2>
    ${mkOtp('cpin-a', t('pin_inp_new'))}
    ${mkOtp('cpin-b', t('pin_inp_conf'))}
    <div style="display:flex;justify-content:center;margin:10px 0 4px">
      <button class="otp-reveal-pill" type="button" data-a="otpEye" title="${esc(tf('إظهار'))}" aria-label="${esc(tf('إظهار'))}" aria-pressed="false">
        <span class="orp-ic">${ic('eye', 15)}</span>
        <span class="orp-lbl">${esc(tf('إظهار'))}</span>
        <span class="orp-dot" aria-hidden="true"></span>
      </button>
    </div>
    <div class="meta" style="margin-top:10px"><button class="btn mint" style="flex:1" type="button" id="cpin-go" data-a="cpinset">${ic('shieldCheck', 16)} ${esc(t(mode === 'change' ? 'pin_save_btn' : 'pin_enable_btn'))}</button><button class="btn white" type="button" data-a="x">${esc(t('cancel_btn'))}</button></div>`);
  setTimeout(() => {
    const first = document.querySelector('#md .otp-box') as HTMLInputElement | null;
    if (first) first.focus();
  }, 40);
}

function cpLockNow(c: any, silent = false) {
  if (!c || !c.cid) return;
  const st = cpLoad();
  st.locked = Array.from(new Set([...(st.locked || []), c.cid]));
  cpSave(st);
  _cpUnlocked.delete(c.cid);
  _otpReveal = false;
  cpRedrawTop();
  render();
  if (!silent) toast('اتقفلت الدردشة 🔒');
}

/* ===== تسجيل الصوت ===== */
async function cpStartRec() {
  const c = CHATS[chat];
  if (_rec || !c || cpBlockedByMe(c) || cpBlockedByOther(c)) return;
  if (getChatQuota('voice').remaining <= 0) {
    showChatQuotaModal('voice');
    return;
  }
  if (!navigator.mediaDevices || !(window as any).MediaRecorder) return toast('المتصفح ده مش بيدعم التسجيل الصوتي.');
  let stream: MediaStream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch (e) { return toast('محتاج تسمح باستخدام الميكروفون علشان تسجل رسالة صوتية.'); }
  const MR: any = (window as any).MediaRecorder;
  const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'].find(t => MR.isTypeSupported(t)) || '';
  let mr: any;
  try { mr = new MR(stream, mime ? { mimeType: mime, audioBitsPerSecond: 24000 } : { audioBitsPerSecond: 24000 }); }
  catch (e) { stream.getTracks().forEach(t => t.stop()); return toast('معرفناش نبدأ التسجيل.'); }
  const r: any = { mr, stream, chunks: [], t0: Date.now(), paused: false, pausedAt: 0, pausedTotal: 0, peaks: [], live: [], mime: mr.mimeType || mime || 'audio/webm', send: false };
  mr.ondataavailable = (e: any) => { if (e.data && e.data.size) r.chunks.push(e.data); };
  mr.onstop = () => cpRecFinish(r);
  try {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    r.ctx = new AC();
    const src = r.ctx.createMediaStreamSource(stream);
    r.an = r.ctx.createAnalyser();
    r.an.fftSize = 256;
    src.connect(r.an);
    r.buf = new Uint8Array(r.an.fftSize);
  } catch (e) {}
  _rec = r;
  mr.start(250);
  const cw = $('#cwrap');
  if (cw) { cw.classList.add('recording'); cw.classList.remove('is-paused'); }
  const rt = $('#rec-t');
  if (rt) rt.textContent = '0:00';
  const rp = $('#rec-p');
  if (rp) { rp.classList.remove('paused'); rp.innerHTML = ic('pause', 16); }
  document.querySelectorAll('#rec-w i').forEach((b: any) => { b.style.height = '12%'; });
  r.tick = setInterval(() => cpRecTick(r), 90);
}

function cpRecTick(r: any) {
  if (!r || r.paused) return;
  const sec = Math.max(0, (Date.now() - r.t0 - (r.pausedTotal || 0)) / 1000);
  let lvl = 0.12 + Math.random() * 0.1;
  if (r.an) {
    r.an.getByteTimeDomainData(r.buf);
    let s = 0;
    for (let i = 0; i < r.buf.length; i++) { const v = (r.buf[i] - 128) / 128; s += v * v; }
    lvl = Math.min(1, Math.sqrt(s / r.buf.length) * 4);
  }
  r.peaks.push(lvl);
  r.live.push(lvl);
  if (r.live.length > 44) r.live.shift();
  const t = $('#rec-t');
  if (t) t.textContent = fmtDur(sec);
  const bars = document.querySelectorAll('#rec-w i');
  bars.forEach((b: any, i: number) => {
    const v = r.live[r.live.length - bars.length + i];
    b.style.height = Math.max(10, Math.round((v || 0) * 100)) + '%';
  });
  if (sec >= 120) cpStopRec(true);
}

function cpStopRec(send: boolean) {
  const r = _rec;
  if (!r) return;
  _rec = null;
  r.send = send;
  if (r.paused && r.pausedAt) { r.pausedTotal += Date.now() - r.pausedAt; r.paused = false; }
  clearInterval(r.tick);
  const cw = $('#cwrap');
  if (cw) cw.classList.remove('is-paused');
  try {
    if (r.mr.state === 'paused' && typeof r.mr.resume === 'function') { try { r.mr.resume(); } catch {} }
    if (r.mr.state !== 'inactive') r.mr.stop();
    else cpRecFinish(r);
  } catch (e) { cpRecFinish(r); }
}
function cpCancelRec() { if (_rec) cpStopRec(false); }

function cpRecFinish(r: any) {
  try { r.stream.getTracks().forEach((t: any) => t.stop()); } catch (e) {}
  try { if (r.ctx) r.ctx.close(); } catch (e) {}
  const cw = $('#cwrap');
  if (cw) { cw.classList.remove('recording'); cw.classList.remove('is-paused'); }
  if (!r.send) return;
  const dur = Math.max(0, (Date.now() - r.t0 - (r.pausedTotal || 0)) / 1000);
  if (dur < 0.8 || !r.chunks.length) return toast('التسجيل قصير جداً — اضغط مطولاً وكمّل كلامك.');
  if (getChatQuota('voice').remaining <= 0) {
    showChatQuotaModal('voice');
    return;
  }
  const blob = new Blob(r.chunks, { type: String(r.mime).split(';')[0] || 'audio/webm' });
  const N = 40, src = r.peaks.length ? r.peaks : [0.3];
  const peaks: number[] = [];
  for (let i = 0; i < N; i++) {
    const a = Math.floor(i * src.length / N), b = Math.max(a + 1, Math.floor((i + 1) * src.length / N));
    let m = 0;
    for (let j = a; j < b && j < src.length; j++) m = Math.max(m, src[j]);
    peaks.push(Math.max(12, Math.round(m * 100)));
  }
  sendMsg({ audioBlob: blob, dur, peaks, keepInput: true });
}

/* ===== اختيار وضغط الصور (حتى 3 صور في المرة) ===== */
function cpCompress(f: File, max: number): Promise<string> {
  return new Promise(res => {
    const r = new FileReader();
    r.onload = () => {
      const im = new Image();
      im.onload = () => {
        const c = document.createElement('canvas');
        const k = Math.min(1, max / Math.max(im.width, im.height));
        c.width = Math.round(im.width * k);
        c.height = Math.round(im.height * k);
        c.getContext('2d')!.drawImage(im, 0, 0, c.width, c.height);
        let q = 0.72, out = c.toDataURL('image/jpeg', q);
        while (out.length > 250000 && q > 0.35) { q -= 0.1; out = c.toDataURL('image/jpeg', q); }
        res(out);
      };
      im.onerror = () => res('');
      im.src = String(r.result || '');
    };
    r.onerror = () => res('');
    r.readAsDataURL(f);
  });
}
function cpPickFiles(capture: boolean) {
  const iq = getChatQuota('img');
  if (iq.remaining <= 0) {
    showChatQuotaModal('img');
    return;
  }
  const i: any = document.createElement('input');
  i.type = 'file';
  i.accept = 'image/*';
  if (capture) i.capture = 'environment'; else i.multiple = iq.remaining > 1;
  i.onchange = async () => {
    const all: File[] = Array.from(i.files || []);
    if (!all.length) return;
    const iqNow = getChatQuota('img');
    if (iqNow.remaining <= 0) {
      showChatQuotaModal('img');
      return;
    }
    const capN = Math.min(CHAT_IMG_DAILY_MAX, iqNow.remaining);
    const urls = (await Promise.all(all.slice(0, capN).map(f => cpCompress(f, 880)))).filter(Boolean);
    if (!urls.length) return toast('معرفناش نقرأ الصورة.');
    const wasCapped = all.length > capN;
    if (wasCapped) toast(t('quota_partial_warn', { n: urls.length }));
    _cpPend = urls;
    openModal(`<h2>${esc(urls.length > 1 ? t('img_send_multi', { n: urls.length }) : t('img_send_one'))}</h2>
      <div class="pvg pv${urls.length}">${urls.map(u => `<img src="${esc(u)}" alt="">`).join('')}</div>
      <p class="lc-note" style="margin:8px 0 0;font-size:.76rem;color:${wasCapped ? 'var(--coral)' : 'var(--muted)'}">${esc(wasCapped ? t('quota_partial_warn', { n: urls.length }) : t('quota_max_3_note'))}</p>
      <input id="cap-in" class="cpinp" style="letter-spacing:0;text-align:start" placeholder="${esc(t('img_cap_ph'))}" maxlength="300" autocomplete="off">
      ${mbtns('cimgsend', t('send_btn'), 'mint')}`);
  };
  i.click();
}

Object.assign(A, {
  /* Context menu actions */
  ctxclose() { cpCloseCtx(); },
  ctxreact(b: any) {
    const mid = b.dataset.mid;
    const emoji = b.dataset.em;
    cpCloseCtx();
    if (!mid || !emoji) return;
    cpReact(mid, emoji);
  },
  otpkey(b: any) {
    try { b.focus(); } catch {}
  },
  otpEye() {
    _otpReveal = !_otpReveal;
    document.querySelectorAll('.otp-box').forEach((inp: any) => {
      inp.type = _otpReveal ? 'text' : 'password';
      inp.classList.toggle('is-revealed', _otpReveal);
    });
    document.querySelectorAll('.otp-eye, .otp-reveal-pill').forEach((btn: any) => {
      btn.title = _otpReveal ? tf('إخفاء') : tf('إظهار');
      btn.classList.toggle('on', _otpReveal);
      btn.setAttribute('aria-pressed', _otpReveal ? 'true' : 'false');
      const icBox = btn.querySelector('.orp-ic');
      const lbl = btn.querySelector('.orp-lbl');
      if (icBox) icBox.innerHTML = ic(_otpReveal ? 'eyeOff' : 'eye', 15);
      else btn.innerHTML = ic(_otpReveal ? 'eyeOff' : 'eye', 18);
      if (lbl) lbl.textContent = _otpReveal ? tf('إخفاء') : tf('إظهار');
    });
  },
  revealSpoiler(b: any) {
    if (!b || !b.dataset) return;
    if (b.dataset.open !== '1') {
      if (!b.dataset.veilHtml) b.dataset.veilHtml = b.innerHTML;
      b.dataset.open = '1';
      cpMiniDustBurst(b);
      b.classList.add('is-revealed');
      b.innerHTML = `<span class="tg-rev-val">${esc(b.dataset.val || '')}</span>`;
      b.title = t('reveal_hide_tip');
    } else {
      b.dataset.open = '0';
      b.classList.remove('is-revealed');
      if (b.dataset.veilHtml) b.innerHTML = b.dataset.veilHtml;
      b.title = t('reveal_show_tip');
    }
  },
  async copyDeal(b: any) {
    const txt = b?.dataset?.copy || '';
    if (!txt) return;
    try { await navigator.clipboard.writeText(txt); toast('اتنسخت تفاصيل الاتفاق ✓'); }
    catch { toast('انسخ الاتفاق من الشات.'); }
  },
  openSide() {
    $('#shell')?.classList.remove('closed');
  },
  /* ===== ريأكشن على الرسائل ===== */
  msgreact(b: any) {
    const mid = b.dataset.mid;
    const emoji = b.dataset.em;
    if (!mid || !emoji) return;
    cpCloseCtx();
    cpReact(mid, emoji);
    const vb = b.closest && b.closest('.tg-rbar.vr');
    if (vb) {
      vb.querySelectorAll('.tg-rb').forEach((x: any) => x.classList.toggle('on', x === b && !x.classList.contains('on')));
      const m = cpFindMsg(mid);
      const foot = vb.closest('.tg-vfoot');
      if (m && foot) {
        const rObj = (m[5] && m[5].reactions) || {};
        const rCounts: Record<string, number> = {};
        Object.values(rObj).forEach((em: any) => { if (em) rCounts[String(em)] = (rCounts[String(em)] || 0) + 1; });
        const chipsHtml = Object.entries(rCounts).map(([em, n]) => `<span class="tg-rc lg">${em}${n > 1 ? `<b>${n}</b>` : ''}</span>`).join('');
        let vc = foot.querySelector('.tg-vchips');
        if (!vc && chipsHtml) { vc = document.createElement('div'); vc.className = 'tg-vchips'; vb.after(vc); }
        if (vc) vc.innerHTML = chipsHtml;
      }
    }
  },
  cattach() {
    const c = CHATS[chat];
    if (!c || cpBlockedByMe(c) || cpBlockedByOther(c)) return;
    const iq = getChatQuota('img');
    const cappedCls = iq.remaining <= 0 ? ' is-capped' : '';
    const qTagHtml = `<small class="att-qtag">${esc(iq.remaining <= 0 ? t('quota_img_zero') : t('quota_img_left', { r: iq.remaining }))}</small>`;
    openModal(`<h2>${esc(t('att_title'))}</h2><div class="attgrid">
      <button class="attb${cappedCls}" type="button" data-a="cgallery"><i style="background:var(--sky)">${ic('imgPlus', 24)}</i><span>${esc(t('att_photos'))}</span>${qTagHtml}</button>
      <button class="attb${cappedCls}" type="button" data-a="ccam"><i style="background:var(--mint)">${ic('camera', 24)}</i><span>${esc(t('att_cam'))}</span>${qTagHtml}</button>
      <button class="attb" type="button" data-a="cloc"><i style="background:var(--coral)">${ic('pin', 24)}</i><span>${esc(t('att_loc'))}</span></button>
      <button class="attb" type="button" data-a="dealCardOpen"><i style="background:var(--sun)">${ic('deal', 24)}</i><span>${esc(t('att_deal'))}</span></button>
    </div>`);
  },
  cgallery() { closeModal(); if (getChatQuota('img').remaining <= 0) { showChatQuotaModal('img'); return; } if (gate(() => A.cgallery())) return; cpPickFiles(false); },
  ccam() { closeModal(); if (getChatQuota('img').remaining <= 0) { showChatQuotaModal('img'); return; } if (gate(() => A.ccam())) return; cpPickFiles(true); },
  cimgsend() {
    const cap = ($('#cap-in') || {}).value || '';
    const imgs = _cpPend; _cpPend = [];
    closeModal();
    if (imgs.length) sendMsg({ imgs, t: cap, keepInput: true });
  },
  cloc() {
    closeModal();
    if (gate(() => A.cloc())) return;
    if (!navigator.geolocation) return toast('المتصفح ده مش بيدعم تحديد الموقع.');
    toast('بنحدد موقعك بدقة GPS...');
    navigator.geolocation.getCurrentPosition(p => {
      const lat = p.coords.latitude, lng = p.coords.longitude;
      _cpLoc = { lat, lng };
      openModal(`
        <h2>${ic('pin', 22)} ${esc(t('loc_share_h2'))}</h2>
        <div class="loc-modal-preview">
          ${cpLocHtml(lat, lng, '')}
        </div>
        <p class="lc-note" style="margin-top:8px;font-size:.8rem;color:var(--muted)">${ic('near', 13)} ${esc(t('loc_acc_note', { m: Math.round(p.coords.accuracy || 10) }))}</p>
        <div class="meta" style="margin-top:12px">
          <button class="btn mint" style="flex:1" type="button" data-a="locsend">${ic('near', 16)} ${esc(t('loc_send_btn'))}</button>
          <button class="btn white" type="button" data-a="x">${esc(t('cancel_btn'))}</button>
        </div>
      `);
    }, err => {
      toast(err && err.code === 1 ? 'محتاج تسمح للمتصفح بالوصول للموقع من الإعدادات.' : 'معرفناش نحدد موقعك — تأكد من تشغيل الـ GPS.');
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
  },
  locsend() { const l = _cpLoc; _cpLoc = null; closeModal(); if (l) sendMsg({ loc: l, keepInput: true }); },
  openloc(b: any) {
    const lat = Number(b.dataset.lat), lng = Number(b.dataset.lng);
    if (!numOk(lat, 90) || !numOk(lng, 180)) return;
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank', 'noopener,noreferrer');
  },

  /* تسجيل صوتي */
  vsend() { if (_rec) cpStopRec(true); },
  vcancel() { cpCancelRec(); },
  vpause() {
    const r = _rec;
    if (!r) return;
    const cw = $('#cwrap');
    const btn = $('#rec-p');
    if (!r.paused) {
      r.paused = true;
      r.pausedAt = Date.now();
      try { if (r.mr.state === 'recording' && typeof r.mr.pause === 'function') r.mr.pause(); } catch {}
      if (cw) cw.classList.add('is-paused');
      if (btn) { btn.classList.add('paused'); btn.innerHTML = ic('play', 16); btn.title = t('resume_rec_lbl'); }
    } else {
      r.pausedTotal += Date.now() - (r.pausedAt || Date.now());
      r.paused = false;
      r.pausedAt = 0;
      try { if (r.mr.state === 'paused' && typeof r.mr.resume === 'function') r.mr.resume(); } catch {}
      if (cw) cw.classList.remove('is-paused');
      if (btn) { btn.classList.remove('paused'); btn.innerHTML = ic('pause', 16); btn.title = t('pause_rec_lbl'); }
    }
  },

  /* مشغل الصوت */
  vplay(b: any) {
    const el = b.closest('[data-mid]');
    const id = el && el.dataset.mid;
    const m = cpFindMsg(id);
    const src = m && m[5] && safeAudioUrl(m[5].audio);
    if (!src) return;
    if (_cpAu && _cpAuId === id) {
      if (_cpAu.paused) _cpAu.play().catch(() => {}); else _cpAu.pause();
      return cpAuSync();
    }
    if (_cpAu) { try { _cpAu.pause(); } catch (e) {} }
    _cpAu = new Audio(src);
    _cpAuId = id;
    _cpAu.playbackRate = _cpRate;
    _cpAu.ontimeupdate = cpAuSync;
    _cpAu.onplay = cpAuSync;
    _cpAu.onpause = cpAuSync;
    _cpAu.onended = () => { if (_cpAu) _cpAu.currentTime = 0; cpAuSync(); };
    _cpAu.play().catch(() => toast('معرفناش نشغل التسجيل ده.'));
    cpAuSync();
  },
  vseek(b: any) {
    cpSeekVoiceAt(b, _cpClickX);
  },
  vspeed() {
    const rates = [1, 1.5, 2];
    _cpRate = rates[(rates.indexOf(_cpRate) + 1) % rates.length];
    if (_cpAu) _cpAu.playbackRate = _cpRate;
    cpAuSync();
  },
  medit(b: any) {
    const m = cpFindMsg(b.dataset.mid);
    cpCloseCtx(); closeModal();
    if (!m || !cpCanEditMsg(m)) return toast('تعديل النصوص متاح لرسائلك النصية بس.');
    _cpReply = null;
    _cpEdit = { id: m[4], text: m[1] };
    cpRedrawComposer();
    const i = $('#cm') as HTMLInputElement | null;
    if (i) {
      i.value = m[1];
      syncChatComposerUI();
      i.focus();
      try { i.setSelectionRange(i.value.length, i.value.length); } catch {}
    }
  },
  meditx() {
    _cpEdit = null;
    cpRedrawComposer();
    const i = $('#cm') as HTMLInputElement | null;
    if (i) { i.value = ''; syncChatComposerUI(); }
  },
  async mpin(b: any) {
    const c = CHATS[chat];
    const m = cpFindMsg(b.dataset.mid);
    cpCloseCtx(); closeModal();
    if (!c || !m) return;
    const pinObj = { id: m[4], preview: cpPreview(m).slice(0, 120), by: (user && user.uid) || '' };
    const st = cpLoad();
    st.pinnedMsgs = st.pinnedMsgs || {};
    st.pinnedMsgs[c.cid] = pinObj;
    cpSave(st);
    c.pinnedMsg = pinObj;
    await cpConvSet(c, { pinnedMsg: pinObj, pinnedBy: (user && user.uid) || '' });
    cpRefreshFloatBars();
    toast('اتثبتت الرسالة 📌');
  },
  async mpinx() {
    const c = CHATS[chat];
    cpCloseCtx(); closeModal();
    if (!c) return;
    const st = cpLoad();
    if (st.pinnedMsgs) { delete st.pinnedMsgs[c.cid]; cpSave(st); }
    c.pinnedMsg = null;
    await cpConvSet(c, { pinnedMsg: firebase.firestore.FieldValue.delete(), pinnedBy: '' });
    cpRefreshFloatBars();
    toast('اتشال تثبيت الرسالة');
  },
  pingo(b: any) { A.rqgo(b); },
  chsearch() {
    const c = CHATS[chat];
    if (!c || !cpIsOpen(c)) return;
    _chSearchOpen = !_chSearchOpen;
    if (!_chSearchOpen) { _chSearchQ = ''; _chSearchIdx = 0; _chSearchCat = 'all'; }
    cpRedrawTop();
    cpRefreshFloatBars(true);
  },
  chSearchNav(b: any) {
    _chSearchIdx += Number(b.dataset.d || 1);
    cpApplyChatSearch(true);
  },
  chSearchCat(b: any) {
    const cat = (b?.dataset?.cat || 'all') as any;
    _chSearchCat = ['all', 'text', 'deal', 'audio', 'img', 'link'].includes(cat) ? cat : 'all';
    _chSearchIdx = 0;
    cpRefreshFloatBars(false);
    cpApplyChatSearch(true);
  },
  chSearchPick(b: any) {
    const mid = b?.dataset?.mid || '';
    if (!mid) return;
    const sel = `#thr [data-mid="${(window as any).CSS && CSS.escape ? CSS.escape(mid) : mid}"]`;
    const el = document.querySelector(sel) as HTMLElement | null;
    if (!el) return;
    document.querySelectorAll('#thr .msg-hit-cur').forEach((n: any) => n.classList.remove('msg-hit-cur'));
    el.classList.add('msg-hit-cur', 'flash');
    setTimeout(() => el.classList.remove('flash'), 1200);
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  },
  chSearchClr() {
    _chSearchQ = '';
    _chSearchIdx = 0;
    const si = $('#ch-search-in') as HTMLInputElement | null;
    if (si) { si.value = ''; si.focus(); }
    const clrBtn = $('#ch-search-clr') as HTMLElement | null;
    if (clrBtn) clrBtn.style.display = 'none';
    cpRefreshFloatBars(false);
  },
  thrDown() {
    const th = $('#thr');
    if (th) th.scrollTo({ top: th.scrollHeight, behavior: 'smooth' });
  },

  /* قائمة الرسالة — تليجرام ستايل */
  msgmenu(b: any, force?: boolean) {
    const el = b.closest("[data-mid]") || b;
    const id = el.dataset.mid || b.dataset.mid;
    const m = cpFindMsg(id);
    if (!m) return;
    if (!force && el.classList.contains('ml')) return;
    if (!force) {
      /* على الموبايل: الضغطة العادية مش بتفتح القائمة — الضغط المطوّل بس */
      if (Date.now() - _lastTouchTs < 900) return;
      const sel = window.getSelection && String(window.getSelection());
      if (sel && sel.length > 0) return;
      clearTimeout((A as any)._mmT);
      (A as any)._mmT = setTimeout(() => { if (!(A as any)._dblHit) cpOpenCtx(id, m, el); (A as any)._dblHit = false; }, 260);
      return;
    }
    cpOpenCtx(id, m, el);
  },
  mreply(b: any) {
    const c = CHATS[chat];
    const m = cpFindMsg(b.dataset.mid);
    cpCloseCtx(); closeModal();
    if (!c || !m || cpBlockedByMe(c) || cpBlockedByOther(c)) return;
    _cpReply = { id: m[4], name: m[0] ? t('msg_you') : c.w, text: cpPreview(m).slice(0, 90) };
    cpRedrawComposer();
    const i = $('#cm'); if (i) i.focus();
  },
  mcopy(b: any) {
    const m = cpFindMsg(b.dataset.mid);
    cpCloseCtx(); closeModal();
    if (m && m[1] && navigator.clipboard) navigator.clipboard.writeText(m[1]).then(() => toast('اتنسخ النص ✓')).catch(() => {});
  },
  creplyx() { _cpReply = null; cpRedrawComposer(); },
  rqgo(b: any) {
    const id = b.dataset.mid;
    const th = $('#thr');
    if (!th || !id) return;
    const el = th.querySelector(`[data-mid="${CSS.escape(id)}"]`);
    if (!el) return toast('الرسالة الأصلية اتحذفت.');
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 1400);
  },
  async mdelme(b: any) {
    const c = CHATS[chat];
    const id = b.dataset.mid;
    cpCloseCtx(); closeModal();
    if (!c || !id || !hasLiveAuth()) return;
    cpHideMsgLocal(id);
    c.m = (c.m || []).filter((x: any) => x[4] !== id);
    cpRenderThread(c, [id]);
    if (db) {
      db.collection('conversations').doc(c.cid).collection('messages').doc(id)
        .update({ hiddenFor: firebase.firestore.FieldValue.arrayUnion(user.uid) })
        .catch(() => {});
    }
  },
  async mdelall(b: any) {
    const c = CHATS[chat];
    const id = b.dataset.mid;
    const m = cpFindMsg(id);
    cpCloseCtx(); closeModal();
    if (!c || !m || !m[0] || !db || !hasLiveAuth()) return;
    const wasLast = c.m[c.m.length - 1] === m;
    try {
      await db.collection('conversations').doc(c.cid).collection('messages').doc(id).delete();
      if (wasLast) {
        const rest = (c.m || []).filter((x: any) => x[4] !== id);
        const last = rest[rest.length - 1];
        db.collection('conversations').doc(c.cid).set({
          lastText: last ? cpPreview(last).slice(0, 300) : '',
          lastTime: last ? last[2] : ''
        }, { merge: true }).catch(() => {});
      }
    } catch (e: any) {
      toast(e && e.code === 'permission-denied' ? t('msg_del_fail_rules') : (tf('معرفناش نحذف الرسالة للجميع') + ' (' + (e?.code || 'error') + ')'));
    }
  },

  /* قائمة الدردشة الحديثة 2026 (بدون بحث جواها لأن البحث له أيقونة مستقلة فوق) */
  chmenu() {
    const c = CHATS[chat];
    if (!c) return;
    if (!cpIsOpen(c)) return toast('افتح الدردشة بالرمز الأول.');
    const st = cpLoad();
    const locked = cpIsLocked(c);
    const pinned = cpIsPinned(c);
    const blocked = cpBlockedByMe(c);
    const warned = c.uid && hasMyWarn(c.uid);
    const tile = (act: string, icon: string, title: string, sub: string, grad: string, cls = '', ex = '') =>
      `<button class="cset-item ${cls}" type="button" data-a="${act}" ${ex}><span class="cset-ic" style="background:${grad}">${ic(icon, 18)}</span><span class="cset-txt"><b>${title}</b><small>${sub}</small></span>${ic('chev', 15)}</button>`;

    openModal(`
      <div class="cset-sheet">
        <div class="cset-head">
          ${avH(50, { name: c.w, photo: c.photo })}
          <div class="cset-meta">
            <b>${esc(c.w)}</b>
            <small>${esc(t(blocked ? 'cset_blocked_sub' : locked ? 'cset_locked_sub' : 'cset_safe_sub'))}</small>
          </div>
          ${c.uid ? `<button class="btn sm white" type="button" data-a="prof" data-uid="${esc(c.uid)}" data-n="${esc(c.w)}" data-ph="${esc(c.photo || '')}">${ic('user', 14)} ${esc(t('pro_his_page'))}</button>` : ''}
        </div>
        <div class="cset-grid">
          <button class="cset-q" type="button" data-a="chMedia"><span class="cset-qic" style="background:linear-gradient(135deg,#BBE0EC,#60A5FA)">${ic('gallery', 19)}</span><b>${esc(t('cset_media_t'))}</b><small>${esc(t('cset_media_s'))}</small></button>
          <button class="cset-q" type="button" data-a="dealCardOpen"><span class="cset-qic" style="background:linear-gradient(135deg,#F3D85D,#F59E0B)">${ic('deal', 19)}</span><b>${esc(t('cset_deal_t'))}</b><small>${esc(t('cset_deal_s'))}</small></button>
          <button class="cset-q" type="button" data-a="chpin"><span class="cset-qic" style="background:linear-gradient(135deg,#D8CEF2,#8B5CF6)">${ic('pinMsg', 19)}</span><b>${esc(t(pinned ? 'cset_unpin_t' : 'cset_pin_t'))}</b><small>${esc(t(pinned ? 'cset_pin_on_s' : 'cset_pin_off_s'))}</small></button>
        </div>
        <div class="cset-list">
          ${tile('chlockset', 'lock', esc(t(locked ? 'cset_unlock_t' : 'cset_lock_t')), esc(t(locked ? 'cset_unlock_s' : 'cset_lock_s')), 'linear-gradient(135deg,#AEE3CD,#10B981)')}
          ${st.pin ? tile('pinChange', 'shieldCheck', esc(t('cset_chpin_t')), esc(t('cset_chpin_s')), 'linear-gradient(135deg,#CFE7FF,#3B82F6)') : ''}
          ${tile('charch', 'archive', esc(t(c.archived ? 'cset_unarch_t' : 'cset_arch_t')), esc(t(c.archived ? 'cset_unarch_s' : 'cset_arch_s')), 'linear-gradient(135deg,#E2E8F0,#64748B)')}
          ${c.uid && (!user || c.uid !== user.uid) ? tile('warnUser', 'warn', esc(t(warned ? 'cset_warned_t' : 'cset_warn_t')), esc(t('cset_warn_s')), 'linear-gradient(135deg,#FCD5B5,#F97316)', '', `data-uid="${esc(c.uid)}" data-n="${esc(c.w)}"`) : ''}
          ${tile('chblock', 'block', esc(t(blocked ? 'cset_unblock_t' : 'cset_block_t')), esc(t(blocked ? 'cset_unblock_s' : 'cset_block_s')), 'linear-gradient(135deg,#FCA5A5,#EF4444)', 'danger')}
          ${tile('chdel', 'trash', esc(t('cset_del_t')), esc(t('cset_del_s')), 'linear-gradient(135deg,#FECACA,#DC2626)', 'danger')}
        </div>
      </div>
    `);
  },
  chlock() {
    const c = CHATS[chat];
    if (!c) return;
    if (!cpIsLocked(c)) { if (!cpLoad().pin) cpPinSetup(c.cid, 'lock'); else cpLockNow(c); return; }
    if (_cpUnlocked.has(c.cid)) {
      _cpUnlocked.delete(c.cid);
      _otpReveal = false;
      cpSyncTopHeader(c);
      render();
      toast('اتقفلت الدردشة 🔒');
    } else {
      const i = $('#otp-row .otp-box') as HTMLInputElement | null;
      if (i) i.focus();
    }
  },
  chlockset() {
    const c = CHATS[chat];
    closeModal();
    if (!c) return;
    if (cpIsLocked(c)) {
      const st = cpLoad();
      st.locked = (st.locked || []).filter((x: string) => x !== c.cid);
      cpSave(st);
      cpRedrawTop();
      toast('اتشال قفل الدردشة ✓');
    } else {
      if (!cpLoad().pin) cpPinSetup(c.cid, 'lock'); else cpLockNow(c);
    }
  },
  async cpinset() {
    const a = Array.from(document.querySelectorAll('[data-grp="cpin-a"]')).map((e: any) => e.value || '').join('');
    const b = Array.from(document.querySelectorAll('[data-grp="cpin-b"]')).map((e: any) => e.value || '').join('');
    if (a.length !== 6) return toast('الرمز لازم يكون 6 خانات بالظبط.');
    if (a !== b) return toast('الرمزين مش متطابقين.');
    const salt = Array.from(crypto.getRandomValues(new Uint8Array(12))).map(x => x.toString(16).padStart(2, '0')).join('');
    const st = cpLoad();
    st.salt = salt;
    st.pin = await cpHash(a, salt);
    cpSave(st);
    const targetCid = _pinTargetCid;
    const mode = _pinSetupMode;
    _pinTargetCid = '';
    _pinSetupMode = 'lock';
    _otpReveal = false;
    closeModal();
    const targetChat = targetCid ? CHATS.find((x: any) => x.cid === targetCid) : (cur === 'محادثة' ? CHATS[chat] : null);
    if (mode !== 'change' && targetChat) {
      cpLockNow(targetChat);
    } else {
      toast('اتحفظ رمز القفل بنجاح ✓');
      render(true);
    }
  },
  async cunlock() {
    const c = CHATS[chat];
    const rowEl = $('#otp-row') as HTMLElement | null;
    const boxes = document.querySelectorAll('#otp-row .otp-box');
    const pinVal = Array.from(boxes).map((e: any) => e.value || '').join('');
    const err = $('#cpin-err');
    if (!c || !boxes.length) return;
    if (pinVal.length < 6) {
      if (err) err.textContent = t('pin_err_incomplete');
      if (rowEl) { rowEl.classList.remove('err-shake'); void rowEl.offsetWidth; rowEl.classList.add('err-shake'); }
      const emptyBox = Array.from(boxes).find((b: any) => !b.value) as HTMLInputElement | undefined;
      if (emptyBox) emptyBox.focus();
      return;
    }
    if (Date.now() < _pinUntil) { if (err) err.textContent = t('pin_err_wait'); return; }
    const st = cpLoad();
    const h = await cpHash(pinVal.trim(), st.salt || '');
    if (h === st.pin) {
      _pinFails = 0;
      _otpReveal = false;
      _cpUnlocked.add(c.cid);
      cpSyncTopHeader(c);
      render();
      markChatSeen(c);
    } else {
      _pinFails++;
      if (_pinFails >= 5) { _pinUntil = Date.now() + 30000; _pinFails = 0; }
      if (err) err.textContent = t('pin_err_wrong');
      if (rowEl) { rowEl.classList.remove('err-shake'); void rowEl.offsetWidth; rowEl.classList.add('err-shake'); }
      boxes.forEach((b: any) => { b.value = ''; });
      syncOtpMeter(rowEl);
      const fb = boxes[0] as HTMLInputElement | undefined;
      if (fb) fb.focus();
    }
  },
  async charch() {
    const c = CHATS[chat];
    closeModal();
    if (!c) return;
    const on = !c.archived;
    const FV = firebase.firestore.FieldValue;
    if (await cpConvSet(c, { archivedBy: on ? FV.arrayUnion(user.uid) : FV.arrayRemove(user.uid) })) {
      c.archived = on;
      toast(on ? 'اتأرشفت الدردشة ✓' : 'رجعت الدردشة من الأرشيف ✓');
      goTo('الرسائل');
    }
  },
  chblock() {
    const c = CHATS[chat];
    closeModal();
    if (!c) return;
    if (cpBlockedByMe(c)) return A.chblock2({ dataset: { un: '1' } });
    openModal(`<h2>${esc(t('chblock_h', { n: c.w }))}</h2><p>${esc(t('chblock_p'))}</p>${mbtns('chblock2', t('chblock_btn'), 'coral')}`);
  },
  async chblock2(b: any) {
    const c = CHATS[chat];
    closeModal();
    if (!c) return;
    const un = !!(b.dataset && b.dataset.un);
    const FV = firebase.firestore.FieldValue;
    if (await cpConvSet(c, { blockedBy: un ? FV.arrayRemove(user.uid) : FV.arrayUnion(user.uid) }, true)) {
      const set = new Set(c.blockedBy || []);
      if (un) set.delete(user.uid); else set.add(user.uid);
      c.blockedBy = Array.from(set);
      cpRedrawComposer();
      toast(un ? 'اتلغى الحظر ✓' : 'اتحظر المستخدم ✓');
    }
  },
  chdel() {
    const c = CHATS[chat];
    closeModal();
    if (!c) return;
    openModal(`<h2>${esc(t('chdel_h'))}</h2><p>${esc(t('chdel_p', { n: c.w }))}</p>${mbtns('chdel2', t('chdel_btn'), 'coral')}`);
  },
  async chdel2() {
    const c = CHATS[chat];
    closeModal();
    if (!c) return;
    const cl = Math.max(Date.now(), (c.updatedAtMs || 0) + 1);
    if (await cpConvSet(c, { clearedAt: { [user.uid]: cl } })) {
      c.clearedAt = cl;
      c.m = [];
      c.lastText = '';
      toast('اتحذفت الدردشة من عندك ✓');
      goTo('الرسائل');
    }
  },
  chpin() {
    const c = CHATS[chat];
    closeModal();
    if (!c || !c.cid) return;
    const st = cpLoad();
    const list = new Set<string>(st.pinned || []);
    const on = !list.has(c.cid);
    if (on) list.add(c.cid); else list.delete(c.cid);
    st.pinned = Array.from(list);
    cpSave(st);
    c.pinned = on;
    toast(on ? 'اتثبتت المحادثة فوق 📌' : 'اتشال التثبيت');
  },
  pinChange() {
    closeModal();
    cpPinSetup('', cpLoad().pin ? 'change' : 'lock');
  },
  archview() { _cpShowArch = !_cpShowArch; render(true); },
  chMedia() {
    const c = CHATS[chat];
    if (!c) return;
    const msgs = c.m || [];
    const imgs: Array<{ u: string; t: string }> = [];
    const links: Array<{ u: string; t: string }> = [];
    const locs: Array<{ lat: number; lng: number; t: string }> = [];
    const audios: Array<{ id: string; dur: number; t: string }> = [];
    msgs.forEach((m: any) => {
      const d = m[5] || {};
      const arr = ((Array.isArray(d.imgs) && d.imgs.length) ? d.imgs : (m[3] ? [m[3]] : [])).map((u: any) => safeImgUrl(u)).filter(Boolean);
      arr.forEach((u: string) => imgs.push({ u, t: m[2] || '' }));
      if (m[1]) cpExtractUrls(m[1]).forEach(u => { if (!links.some(x => x.u === u)) links.push({ u, t: m[2] || '' }); });
      if (d.loc && numOk(d.loc.lat, 90) && numOk(d.loc.lng, 180)) locs.push({ lat: d.loc.lat, lng: d.loc.lng, t: m[2] || '' });
      if (safeAudioUrl(d.audio)) audios.push({ id: String(m[4] || ''), dur: Number(d.dur) || 0, t: m[2] || '' });
    });
    const show = (k: string) => _mvTab === 'all' || _mvTab === k;
    const total = imgs.length + links.length + locs.length + audios.length;
    const bodyHtml = !total
      ? `<div class="empty2" style="padding:26px 10px">${bear(56, 'sky')}<p>${esc(t('mv_empty'))}</p></div>`
      : `
        ${show('img') && imgs.length ? `<div class="mv-sec"><b>${ic('gallery', 14)} ${esc(t('mv_imgs_h', { n: imgs.length }))}</b><div class="mv-imgs">${imgs.slice().reverse().map(x => `<img src="${esc(x.u)}" alt="" data-a="zoom" loading="lazy">`).join('')}</div></div>` : ''}
        ${show('link') && links.length ? `<div class="mv-sec"><b>${ic('link', 14)} ${esc(t('mv_links_h', { n: links.length }))}</b><div class="mv-links">${links.slice().reverse().map(x => cpLinkCardHtml(x.u)).join('')}</div></div>` : ''}
        ${show('loc') && locs.length ? `<div class="mv-sec"><b>${ic('pin', 14)} ${esc(t('mv_locs_h', { n: locs.length }))}</b><div class="mv-list">${locs.slice().reverse().map(x => `<button class="mv-row" type="button" data-a="openloc" data-lat="${x.lat}" data-lng="${x.lng}">${ic('pin', 16)}<span>${esc(t('mv_loc_row', { lat: x.lat.toFixed(4), lng: x.lng.toFixed(4) }))}</span><small>${esc(x.t)}</small></button>`).join('')}</div></div>` : ''}
        ${show('audio') && audios.length ? `<div class="mv-sec"><b>${ic('mic', 14)} ${esc(t('mv_audios_h', { n: audios.length }))}</b><div class="mv-list">${audios.slice().reverse().map(x => `<button class="mv-row" type="button" data-a="rqgo" data-mid="${esc(x.id)}">${ic('play', 15)}<span>${esc(t('mv_audio_row', { d: fmtDur(x.dur) }))}</span><small>${esc(x.t)}</small></button>`).join('')}</div></div>` : ''}
      `;
    openModal(`
      <h2>${ic('gallery', 20)} ${esc(t('mv_title'))}</h2>
      <div class="mv-tabs">
        ${chipBtn(_mvTab === 'all', 'mvTab', 'all', esc(t('chat_srch_all', { n: total })))}
        ${imgs.length ? chipBtn(_mvTab === 'img', 'mvTab', 'img', esc(t('chat_srch_img', { n: imgs.length }))) : ''}
        ${links.length ? chipBtn(_mvTab === 'link', 'mvTab', 'link', esc(t('chat_srch_link', { n: links.length }))) : ''}
        ${locs.length ? chipBtn(_mvTab === 'loc', 'mvTab', 'loc', esc(t('mv_locs_h', { n: locs.length }))) : ''}
        ${audios.length ? chipBtn(_mvTab === 'audio', 'mvTab', 'audio', esc(t('chat_srch_audio', { n: audios.length }))) : ''}
      </div>
      <div class="mv-body" id="mv-body">${bodyHtml}</div>
    `);
    cpHydrateLinkCards();
  },
  mvTab(b: any) { _mvTab = (b.dataset.i || 'all') as any; A.chMedia(); },
  dealCardOpen() {
    closeModal();
    const c = CHATS[chat];
    if (!c || cpBlockedByMe(c) || cpBlockedByOther(c)) return;
    openModal(`
      <h2>${ic('deal', 20)} ${esc(t('dl_modal_h'))}</h2>
      <p style="font-size:.82rem;color:var(--muted)">${esc(t('dl_modal_p'))}</p>
      <div class="field"><label for="dl-t">${esc(t('dl_svc_lbl'))}</label><input id="dl-t" placeholder="${esc(t('dl_svc_ph'))}"></div>
      <div class="names" style="grid-template-columns:1fr 1fr">
        <div class="field"><label for="dl-p">${esc(t('dl_price_lbl'))}</label><input id="dl-p" type="number" inputmode="numeric" placeholder="350"></div>
        <div class="field"><label for="dl-w">${esc(t('dl_when_lbl'))}</label><input id="dl-w" placeholder="${esc(t('dl_when_ph'))}"></div>
      </div>
      <div class="field"><label for="dl-n">${esc(t('dl_note_lbl'))}</label><input id="dl-n" placeholder="${esc(t('dl_note_ph'))}"></div>
      <label class="dl-sec-chk"><input type="checkbox" id="dl-sp"> <span>${esc(t('dl_hide_chk'))}</span></label>
      <div class="meta" style="margin-top:10px">
        <button class="btn mint" style="flex:1" type="button" data-a="sendDealCard">${ic('check', 16)} ${esc(t('dl_send_btn'))}</button>
        <button class="btn white" type="button" data-a="x">${esc(t('cancel_btn'))}</button>
      </div>
    `);
  },
  async sendDealCard() {
    const title = cleanInput((($('#dl-t') as any)?.value || ''), 120);
    const priceNum = cleanInput((($('#dl-p') as any)?.value || ''), 40);
    const when = cleanInput((($('#dl-w') as any)?.value || ''), 80) || 'بالتنسيق';
    const note = cleanInput((($('#dl-n') as any)?.value || ''), 180);
    const hidePrice = !!((($('#dl-sp') as any)?.checked));
    if (!title) return toast('اكتب اسم الخدمة المتفق عليها الأول.');
    const price = (priceNum ? `${priceNum} ج.م` : 'حسب المعاينة') + (hidePrice ? ' [مخفي]' : '');
    const body = `[اتفاق وصلة]\nالخدمة: ${title}\nالسعر: ${price}\nالموعد: ${when}${note ? `\nملاحظة: ${note}` : ''}`;
    closeModal();
    await sendMsg({ t: body, keepInput: true });
  },
  openChatLink(b: any) {
    if (b.dataset.extA === '1') return;
    const hash = b.dataset.hash || '';
    const url = b.dataset.url || '';
    if (hash.startsWith('#req=')) {
      closeModal();
      const rid = decodeURIComponent(hash.slice(5));
      A.reqDet({ dataset: { i: rid } });
      return;
    }
    if (hash.startsWith('#prov=')) {
      closeModal();
      const uid = decodeURIComponent(hash.slice(6));
      openProviderPage(uid);
      return;
    }
    const safe = cpSafeWebUrl(url);
    if (safe) window.open(safe, '_blank', 'noopener,noreferrer');
  },
  async toggleAvail() {
    if (!MY.on || !db || !user) return toast('سجّل كمقدم خدمة الأول.');
    const nextOk = MY.ok === false;
    try {
      await db.collection('providers').doc(user.uid).update({ available: nextOk, updatedAt: SVT() });
      MY.ok = nextOk;
      persistSessionCache();
      toast(nextOk ? 'حالتك الآن: متاح للشغل 🟢' : 'حالتك الآن: مشغول مؤقتاً 🟠');
      render(true);
    } catch (e: any) {
      toast('معرفناش نحدّث الحالة (' + (e?.code || 'خطأ') + ')');
    }
  },
  openLangPicker() {
    closeModal();
    if (cur !== 'اللغة') backView = cur;
    goTo('اللغة');
  },
  pickLang(b: any) {
    const code = String(b?.dataset?.lang || '');
    if (!isValidLang(code)) return;
    switchLanguageWithMorph(code);
  },
  openRadar() {
    const openReqs = byNearReqs(REQS.filter(r => r.rawStatus !== 'cancelled' && r.rawStatus !== 'completed')).slice(0, 6);
    const readyProvs = byNear(PROV.filter(p => p.ok)).slice(0, 6);
    openModal(`
      <h2><span class="radar-ping-ic">${ic('radar', 21)}</span> ${esc(t('radar_h2'))}</h2>
      <p style="font-size:.82rem;color:var(--muted)">${esc(t('radar_sub'))}</p>
      <div class="radar-pop">
        <b>${esc(t('radar_r_sec', { n: openReqs.length }))}</b>
        ${openReqs.length ? openReqs.map(r => {
          const d = dist(r);
          return `<button class="radar-row" type="button" data-a="reqDet" data-i="${esc(r.id)}">
            <span class="rr-ic" style="background:${(CATS[r.c] || CATS[0])[2]}">${ic((CATS[r.c] || CATS[0])[1], 16)}</span>
            <span class="rr-txt"><b>${esc(r.t)}</b><small>${esc(tLocText(r.loc))}${d < 9000 ? ' · ' + esc(kmTxt(d)) : ''} · ${esc(tBud(r.bud))}</small></span>
            ${ic('chev', 15)}
          </button>`;
        }).join('') : `<small class="muted">${esc(t('radar_empty_reqs'))}</small>`}
        <b style="margin-top:10px;display:block">${esc(t('radar_p_sec', { n: readyProvs.length }))}</b>
        ${readyProvs.length ? readyProvs.map(p => {
          const d = dist(p);
          return `<button class="radar-row" type="button" data-a="prof" data-uid="${esc(p.uid)}">
            ${avH(34, { name: p.n, photo: p.photo, preset: p.preset })}
            <span class="rr-txt"><b>${esc(p.n)}</b><small>${esc(p.spec || tCat(p.c))}${d < 9000 ? ' · ' + esc(kmTxt(d)) : ''}</small></span>
            ${p.rc > 0 ? `<span class="tag st">${p.r.toFixed(1)}★</span>` : `<span class="tag mint">${esc(t('avail_tag'))}</span>`}
          </button>`;
        }).join('') : `<small class="muted">${esc(t('radar_empty_provs'))}</small>`}
      </div>
    `);
  },
  openEstimator(idx = 0) {
    const ranges: Array<[number, number]> = [[180, 450], [200, 500], [300, 700], [450, 1400], [900, 2500], [250, 650]];
    const textGuides = EST_GUIDES_I18N[curLang()] || EST_GUIDES_I18N.ar;
    const guides = ranges.map(([min, max], k) => ({
      n: (textGuides[k] && textGuides[k].n) || EST_GUIDES_I18N.ar[k].n,
      tip: (textGuides[k] && textGuides[k].tip) || EST_GUIDES_I18N.ar[k].tip,
      min, max
    }));
    const selIdx = typeof idx === 'number' ? idx : 0;
    const g = guides[selIdx] || guides[0];
    const mid = Math.round((g.min + g.max) / 2);
    const labor = Math.round(mid * 0.72);
    const mats = Math.max(0, mid - labor);
    const unit = t('egp');
    openModal(`
      <h2>${ic('calc', 21)} ${esc(t('est_h2'))}</h2>
      <p style="font-size:.82rem;color:var(--muted)">${esc(t('est_sub'))}</p>
      <div class="est-chips">
        ${guides.map((x, k) => `<button class="c${k === selIdx ? ' on' : ''}" type="button" data-a="estPick" data-i="${k}">${esc(x.n)}</button>`).join('')}
      </div>
      <div class="est-box" id="est-box">
        <small>${esc(g.n)}</small>
        <b id="est-cur">${mid} ${esc(unit)}</b>
        <span class="est-range-lbl">${g.min} — ${g.max} ${esc(unit)} · ${esc(g.tip)}</span>
        <div class="est-slider-wrap">
          <input id="est-slider" class="est-slider" type="range" min="${g.min}" max="${g.max}" step="10" value="${mid}" aria-label="${esc(t('est_slider_aria'))}">
        </div>
        <div class="est-split" aria-hidden="true"><i class="es-labor"></i><i class="es-mats"></i></div>
        <div class="est-split-meta">
          <span>${esc(t('est_labor'))} <b id="est-labor">${labor} ${esc(unit)}</b></span>
          <span>${esc(t('est_mats'))} <b id="est-mats">${mats} ${esc(unit)}</b></span>
        </div>
      </div>
      <div class="meta" style="margin-top:10px">
        <button class="btn coral" style="flex:1" id="est-use-btn" type="button" data-a="estUse" data-v="${mid}" data-t="${esc(g.n)}">${ic('plus', 15)} ${esc(t('est_use_pre'))}<span id="est-use-v">${mid}</span>${esc(t('est_use_post'))}</button>
        <button class="btn white" type="button" data-a="x">${esc(t('close'))}</button>
      </div>
    `);
  },
  estPick(b: any) { A.openEstimator(Number(b.dataset.i) || 0); },
  estSlide(inp: HTMLInputElement) {
    const val = Number(inp?.value || 0);
    if (!val) return;
    const labor = Math.round(val * 0.72);
    const mats = Math.max(0, val - labor);
    const unit = t('egp');
    const curEl = $('#est-cur'), lEl = $('#est-labor'), mEl = $('#est-mats'), uvEl = $('#est-use-v'), ub = $('#est-use-btn') as HTMLElement | null;
    if (curEl) curEl.textContent = `${val} ${unit}`;
    if (lEl) lEl.textContent = `${labor} ${unit}`;
    if (mEl) mEl.textContent = `${mats} ${unit}`;
    if (uvEl) uvEl.textContent = String(val);
    if (ub) ub.dataset.v = String(val);
  },
  cmdHub() {
    openModal(`
      <div class="cmd-hub">
        <div class="cmd-head">
          <span class="cmd-ic">${ic('lightning', 18)}</span>
          <input id="cmd-q" placeholder="${esc(t('cmd_ph'))}" autocomplete="off" aria-label="${esc(t('cmd_ph'))}">
          <kbd class="cmd-kbd">ESC</kbd>
        </div>
        <div class="cmd-list" id="cmd-list"></div>
      </div>
    `);
    renderCmdHubList('');
    setTimeout(() => { $('#cmd-q')?.focus(); }, 30);
  },
  cmdGo(b: any) {
    const n = b?.dataset?.n;
    closeModal();
    if (n) goTo(n);
  },
  cmdTool(b: any) {
    const t = b?.dataset?.t;
    closeModal();
    if (t === 'nw') goTo('طلب جديد');
    else if (t === 'radar') A.openRadar();
    else if (t === 'est') A.openEstimator();
    else if (t === 'near') A.nearestJump();
  },
  cmdReq(b: any) {
    const id = b?.dataset?.i;
    closeModal();
    if (id) A.reqDet({ dataset: { i: id } });
  },
  cmdProv(b: any) {
    const uid = b?.dataset?.uid;
    closeModal();
    if (uid) openProviderPage(uid);
  },
  estUse(b: any) {
    const val = b.dataset.v || '';
    const title = b.dataset.t || '';
    closeModal();
    if (cur !== 'طلب جديد') goTo('طلب جديد');
    setTimeout(() => {
      const rb = $('#rb') as HTMLInputElement | null;
      const rt = $('#rt') as HTMLInputElement | null;
      if (rb && val) rb.value = val;
      if (rt && title && !rt.value) rt.value = title;
      toast(tf(`اتحدد متوسط الميزانية ${val} ج.م ✓`));
    }, 100);
  },
  nearestJump() {
    const list = byNearReqs(REQS.filter(r => r.rawStatus !== 'cancelled' && r.rawStatus !== 'completed'));
    if (!list.length) return toast('مفيش طلبات متاحة دلوقتي.');
    A.reqDet({ dataset: { i: list[0].id } });
  },
  compareOffers(b: any) {
    const rid = b.dataset.i;
    const r = REQS.find(x => x.id === rid);
    if (!r || !r.offers.length) return;
    const active = r.offers.filter((o: any) => o.pr > 0);
    const minPr = active.length ? Math.min(...active.map((o: any) => o.pr)) : 0;
    const maxRt = Math.max(...r.offers.map((o: any) => {
      const pL = o.providerId && PROV.find((x: any) => x.uid === o.providerId);
      return pL ? pL.r : (o.r || 0);
    }));
    const unit = t('egp');
    openModal(`
      <h2>${ic('lightning', 20)} ${esc(t('cmp_title', { t: r.t }))}</h2>
      <div class="cmp-tbl">
        ${r.offers.map((o: any) => {
          const pL = o.providerId && PROV.find((x: any) => x.uid === o.providerId);
          const rv = pL ? pL.r : (o.r || 0);
          const isBestP = minPr > 0 && o.pr === minPr;
          const isBestR = maxRt > 0 && rv === maxRt;
          return `<div class="cmp-card${isBestP || isBestR ? ' best' : ''}">
            <div class="cmp-top">
              ${avH(36, { name: o.p, photo: o.photo, preset: o.preset })}
              <div><b>${esc(o.p)} ${pL && pL.v ? ic('seal', 14) : ''}</b><small>${rv > 0 ? `${rv.toFixed(1)} ★` : esc(t('new_badge'))}</small></div>
              <span class="cmp-price">${o.pr} ${esc(unit)}</span>
            </div>
            <div class="cmp-badges">
              ${isBestP ? `<span class="tag mint">${esc(t('lowest_price'))} ⚡</span>` : ''}
              ${isBestR ? `<span class="tag st">${esc(t('top_rating'))}</span>` : ''}
              <span class="tag">${esc(tNeed(o.when || 'وقتي مرن'))}</span>
            </div>
            ${o.msg ? (() => {
              const cmpTrId = `cmp_${rid}_${o.oid || ''}`;
              const cmpTrp = trPrep(cmpTrId, [o.msg]);
              return `<p class="cmp-msg tr-target" data-trid="${esc(cmpTrId)}" data-tridx="0">${esc(cmpTrp.disp[0])}</p>${cmpTrp.show ? trBtnHtml(cmpTrId, cmpTrp) : ''}`;
            })() : ''}
            <div class="meta">
              ${o.s === 0 && (r.rawStatus === 'new' || r.rawStatus === 'open') ? `<button class="btn sm mint" type="button" data-a="acc" data-i="${esc(r.id)}" data-oid="${esc(o.oid)}">${esc(t('accept_offer'))}</button>` : ''}
              ${o.providerId ? `<button class="btn sm white" type="button" data-a="chat" data-n="${esc(o.p)}" data-uid="${esc(o.providerId)}">${esc(t('msg_him_btn'))}</button>` : ''}
            </div>
          </div>`;
        }).join('')}
      </div>
    `);
  }
});

function openOfferCheck(rid) {
  const r = REQS.find(x => x.id === rid);
  if (!r) return;
  if (user && r.ownerId === user.uid) return toast('ده طلبك إنت!');
  if (r.rawStatus === 'completed') return toast('الطلب ده تم ومكتمل خلاص ✓');
  if (r.rawStatus === 'accepted') return toast('صاحب الطلب اتفق خلاص على تنفيذ الطلب ✓');
  if (!MY.on) {
    PEND_OFFER = rid;
    openModal(`
      <h2>${esc(t('need_pro_h2'))}</h2>
      <p>${esc(t('need_pro_p'))}</p>
      <div class="meta" style="margin-top:6px">
        <button class="btn mint" style="flex:1" type="button" data-a="bp">${ic('seal', 16)} ${esc(t('need_pro_btn'))}</button>
        <button class="btn white" type="button" data-a="x">${esc(t('cancel_btn'))}</button>
      </div>
    `);
    return;
  }
  openOfferModal(rid);
}

/* ====== التنقل، المؤشر الزجاجي، وتحديث الواجهة ====== */
function pillMove() {
  const b = $('#tabs button.on:not(.fab)'), p = $('#pill');
  if (!p) return;
  if (!b || !b.offsetWidth) { p.style.opacity = '0'; return; }
  p.style.opacity = '1';
  p.style.width = b.offsetWidth + 'px';
  p.style.height = b.offsetHeight + 'px';
  p.style.top = b.offsetTop + 'px';
  p.style.transform = `translateX(${b.offsetLeft}px)`;
}

function syncDot() {
  const unreadChat = CHATS.reduce((s, c) => s + (c.u || 0), 0);
  const b = $('#tabs [data-n="المزيد"]');
  if (b) b.classList.toggle('dot', (UNREAD + unreadChat) > 0);
}

function openProviderPage(uid) {
  if (!uid) return;
  curProvUid = uid;
  const myExisting = user ? REVIEWS.find(rv => rv.providerId === uid && rv.customerId === user.uid) : null;
  revStars = myExisting ? myExisting.stars : 5;
  watchProvWorks(uid);
  if (cur !== 'ملف مقدم الخدمة') backView = cur;
  goTo('ملف مقدم الخدمة');
}

/* مرادفات مصرية لأقسام القايمة علشان البحث بالصوت والكتابة يفهم الكلام العادي */
const NAV_ALIASES: Record<string, string> = {
  'الرئيسية': 'رئيسيه الصفحه الاولي البدايه هوم',
  'طلبات قريبة': 'قريبه جنبي حواليا حوالي قريب منطقتي',
  'طلباتي': 'طلبي عروضي طلبات بتاعتي',
  'مقدمو الخدمة': 'مقدمين الخدمه صنايعيه صنايعي فنيين فني عمال مقدم',
  'الرسائل': 'رسايل رساله شات محادثات محادثه دردشه مسدجات',
  'المحفوظات': 'محفوظه محفوظ مفضله مفضلات حفظ',
  'الإشعارات': 'اشعارات اشعار تنبيهات تنبيه نوتيفيكيشن',
  'اللغة': 'لغه اللغات ترجمه انجليزي عربي صيني الماني روسي فرنسي تركي اسباني language lang',
  'حسابي': 'ملفي بروفايل صفحتي اعدادات حساب'
};
const NAV_STOP = new Set(['في', 'من', 'على', 'علي', 'عن', 'الى', 'الي', 'يا', 'افتح', 'وريني', 'روح', 'عايز', 'عاوز', 'صفحه', 'قسم']);
function navMatches(q) {
  const qn = AN(q);
  if (!qn) return NAV.slice();
  const words = qn.split(' ').filter(w => w && !NAV_STOP.has(w)).map(stem).filter(w => w.length >= 2);
  return NAV.filter(n => {
    const hay = AN(n[0] + ' ' + tView(n[0]) + ' ' + (NAV_ALIASES[n[0]] || ''));
    if (hay.includes(qn)) return true;
    if (!words.length) return false;
    const hw = hay.split(' ').map(stem);
    return words.some(w => hw.some(h => h.length >= 2 && (h.includes(w) || w.includes(h))));
  });
}

function renderCmdHubList(rawQ: string) {
  const host = $('#cmd-list');
  if (!host) return;
  const q = AN(rawQ || '');
  const tools = [
    { key: 'nw', label: t('cmd_tool_nw'), icon: 'plus', sub: t('cmd_tool_nw_s') },
    { key: 'radar', label: t('radar_btn'), icon: 'radar', sub: t('cmd_tool_rad_s') },
    { key: 'est', label: t('calc_btn'), icon: 'calc', sub: t('cmd_tool_est_s') },
    { key: 'near', label: t('cmd_tool_near'), icon: 'lightning', sub: t('cmd_tool_near_s') }
  ].filter(tl => !q || AN(tl.label + ' ' + tl.sub).includes(q));
  const navs = NAV.filter(n => !q || AN(n[0] + ' ' + tView(n[0]) + ' ' + (NAV_ALIASES[n[0]] || '')).includes(q)).slice(0, 6);
  const matchedReqs = q ? REQS.filter(r => r.rawStatus !== 'cancelled' && AN(r.t + ' ' + r.loc + ' ' + tLocText(r.loc)).includes(q)).slice(0, 4) : [];
  const matchedProvs = q ? PROV.filter(p => AN(p.n + ' ' + (p.spec || '') + ' ' + p.loc + ' ' + tLocText(p.loc)).includes(q)).slice(0, 4) : [];

  const rows: string[] = [];
  if (tools.length) {
    rows.push(`<div class="cmd-grp">${esc(t('cmd_tools'))}</div>` + tools.map(tl => `<button class="cmd-item" type="button" data-a="cmdTool" data-t="${tl.key}"><span class="cmd-badge">${ic(tl.icon, 15)}</span><b>${esc(tl.label)}</b><small>${esc(tl.sub)}</small></button>`).join(''));
  }
  if (navs.length) {
    rows.push(`<div class="cmd-grp">${esc(t('cmd_secs'))}</div>` + navs.map(n => `<button class="cmd-item" type="button" data-a="cmdGo" data-n="${esc(n[0])}"><span class="cmd-badge" style="background:${n[2]}">${ic(n[1], 15)}</span><b>${esc(tView(n[0]))}</b><small>${esc(t('cmd_go'))}</small></button>`).join(''));
  }
  if (matchedReqs.length) {
    rows.push(`<div class="cmd-grp">${esc(t('cmd_reqs_grp'))}</div>` + matchedReqs.map(r => `<button class="cmd-item" type="button" data-a="cmdReq" data-i="${esc(r.id)}"><span class="cmd-badge">${ic('list', 15)}</span><b>${esc(r.t)}</b><small>${esc(tBud(r.bud))}</small></button>`).join(''));
  }
  if (matchedProvs.length) {
    rows.push(`<div class="cmd-grp">${esc(t('s_provs_h'))}</div>` + matchedProvs.map(p => `<button class="cmd-item" type="button" data-a="cmdProv" data-uid="${esc(p.uid)}"><span class="cmd-badge">${ic('user', 15)}</span><b>${esc(p.n)}</b><small>${esc(p.spec || tLocText(p.loc))}</small></button>`).join(''));
  }
  host.innerHTML = rows.length ? rows.join('') : `<div class="cmd-empty">${esc(t('cmd_no_res', { q: rawQ }))}</div>`;
}

function drawNav() {
  const q = (($('#q') && $('#q').value) || '').trim();
  const activeKey = cur === 'محادثة' ? 'الرسائل' : cur === 'ملف مقدم الخدمة' ? 'مقدمو الخدمة' : cur;
  const unreadChat = CHATS.reduce((s, c) => s + (c.u || 0), 0);
  const curBadge = getLangMeta().badge;
  const list = navMatches(q);
  $('#nav').innerHTML = list.length ? list.map(n => {
    const bdg = n[0] === 'الإشعارات' && UNREAD ? `<em class="bdg" style="margin-inline-start:auto">${UNREAD}</em>`
      : n[0] === 'الرسائل' && unreadChat ? `<em class="bdg" style="margin-inline-start:auto">${unreadChat}</em>`
      : n[0] === 'اللغة' ? `<span class="lang-cur-pill" style="margin-inline-start:auto">${esc(curBadge)}</span>` : '';
    return `<button class="${n[0] === activeKey ? 'on' : ''}" type="button" data-n="${n[0]}"><i class="nav-ic" style="background:${n[2]}">${ic2(n[1], 17)}</i><span>${esc(tView(n[0]))}</span>${bdg}</button>`;
  }).join('') : `<div class="nav-go"><span>${esc(t('nav_no_match'))}</span><button type="button" data-a="sideSearch">${ic('search', 15)}<span>${esc(t('nav_search_site', { q }))}</span></button></div>`;
  $$('#nav button[data-n]').forEach(b => { b.onclick = () => { if ($('#q') && $('#q').value) { $('#q').value = ''; syncMicVisibility($('#q')); } goTo(b.dataset.n); }; });

  const sp = $('#side-pulse');
  if (sp) {
    const openR = REQS.filter(r => r.rawStatus !== 'cancelled' && r.rawStatus !== 'completed').length;
    const readyP = PROV.filter(p => p.ok).length;
    sp.innerHTML = `
      <div class="sp-row">
        <span class="sp-live"><i></i> ${esc(t('live'))}</span>
        <small>${t('side_pulse_cnt', { r: openR, p: readyP })}</small>
      </div>
      <div class="sp-tools">
        <button class="sp-btn" type="button" data-a="openRadar">${ic('radar', 14)} ${esc(t('radar_short'))}</button>
        <button class="sp-btn" type="button" data-a="openEstimator">${ic('calc', 14)} ${esc(t('calc_short'))}</button>
        <button class="sp-btn sp-btn-cmd" type="button" data-a="cmdHub" title="${esc(t('cmd_ph'))}" aria-label="${esc(t('cmd_ph'))}">${ic('lightning', 14)}</button>
      </div>
    `;
  }
}

function mountProviderReactSection() {
  const host = document.getElementById('react-verified-reviews-root');
  if (cur !== 'ملف مقدم الخدمة' || !curProvUid || !host) {
    unmountVerifiedReviewSection();
    return;
  }
  const person = resolvePerson(curProvUid);
  const p = person.prov;
  if (!p) {
    unmountVerifiedReviewSection();
    return;
  }
  const pRevs = REVIEWS.filter(x => x.providerId === curProvUid);
  const totalRevs = pRevs.length;
  const avgVal = totalRevs ? (pRevs.reduce((s, x) => s + x.stars, 0) / totalRevs) : p.r;
  const shownCount = totalRevs || p.rc;
  const myRev = user ? (pRevs.find(x => x.customerId === user.uid) || null) : null;
  const completedDeals = getCompletedDealsWithProvider(curProvUid).map(r => ({ id: r.id, title: r.t }));
  const agreedRaw = getAgreedDealWithProvider(curProvUid);
  const agreedDeal = agreedRaw ? { id: agreedRaw.id, title: agreedRaw.t } : null;

  mountVerifiedReviewSection(host, {
    providerUid: curProvUid,
    providerName: person.name,
    isMe: person.isMe,
    isSignedIn: isIn(),
    avgVal,
    shownCount,
    reviews: pRevs,
    myRev,
    initialStars: revStars,
    completedDeals,
    agreedDeal,
    onStarChange: s => { revStars = s; },
    onReadyForVoice: el => { if (el) enhanceVoiceInputs(el); }
  });
}

/* سجل التنقل الذكي علشان زر الرجوع يرجع المستخدم للصفحة اللي كان فيها بالضبط */
function goBackView() {
  while (_navStack.length) {
    const prev = _navStack.pop()!;
    if (prev && prev !== cur && VIEWS[prev]) {
      backView = _navStack[_navStack.length - 1] || 'الرئيسية';
      goTo(prev, true);
      return;
    }
  }
  const fallback = (backView && backView !== cur && VIEWS[backView]) ? backView : 'الرئيسية';
  goTo(fallback, true);
}

function render(keepAnim = false) {
  const v = $('#view');
  if (!v) return;
  const sh = $('#shell');
  if (sh) {
    const isSub = FULL_VIEWS.includes(cur);
    const hideTopDesktop = cur === 'المزيد';
    const hideTopMob = ['الرئيسية', 'طلبات قريبة', 'طلباتي', 'المزيد'].includes(cur);
    const showBackBtn = cur !== 'الرئيسية' && cur !== 'المزيد';
    sh.classList.toggle('full', isSub);
    sh.classList.toggle('chat-mode', cur === 'محادثة');
    sh.classList.toggle('hide-top', hideTopDesktop);
    sh.classList.toggle('hide-top-mob', hideTopMob);
    if (cur !== 'محادثة') {
      sh.classList.remove('chat-search-mode');
      $('#ch-top-search')?.remove();
    }
    const bkBtn = $('#bk');
    if (bkBtn) {
      bkBtn.style.display = showBackBtn ? '' : 'none';
      bkBtn.setAttribute('aria-label', t('back_aria'));
      bkBtn.title = t('back');
    }
  }
  if (!keepAnim) $('#shell .top')?.classList.remove('top-hide');
  unmountVerifiedReviewSection();
  const h = VIEWS[cur] ? VIEWS[cur]() : '';
  if (!keepAnim) { v.classList.remove('on'); void v.offsetWidth; }
  v.innerHTML = h;
  v.classList.add('on');
  v.classList.toggle('chatv', cur === 'محادثة');
  const th = $('#thr');
  if (th) {
    th.scrollTop = th.scrollHeight;
    /* إخفاء الشريط العلوي عند التمرير لأسفل وإظهاره عند التمرير لأعلى + زر النزول لآخر الرسائل */
    if (!th._scrollBound) {
      th._scrollBound = true;
      let lastY = th.scrollTop;
      th.addEventListener("scroll", () => {
        const topH = $("#shell .top");
        const y = th.scrollTop;
        if (topH) {
          if (_chSearchOpen) topH.classList.remove("top-hide");
          else if (y <= 16) topH.classList.remove("top-hide");
          else if (y > lastY + 8 && y > 56) topH.classList.add("top-hide");
          else if (y < lastY - 4) topH.classList.remove("top-hide");
        }
        const downBtn = $('#thr-down');
        if (downBtn) {
          const dist = th.scrollHeight - y - th.clientHeight;
          (downBtn as HTMLElement).style.display = dist > 220 ? 'flex' : 'none';
        }
        lastY = y;
      }, { passive: true });
    }
  }
  if (cur === 'محادثة' && CHATS[chat]) {
    if (!cpIsOpen(CHATS[chat])) {
      setTimeout(() => {
        const ob = $('#otp-row .otp-box') as HTMLInputElement | null;
        if (ob && (!document.activeElement || !document.activeElement.classList.contains('otp-box'))) ob.focus();
      }, 60);
    } else {
      if (_chSearchOpen) { cpSyncTopHeader(CHATS[chat]); cpApplyChatSearch(false); }
      cpHydrateLinkCards();
    }
  }
  mountProviderReactSection();
  setupScrollObservers();
  enhanceVoiceInputs(v);
}

const softRender = () => {
  if (!$('#app').classList.contains('on')) return;
  if (_voiceActive) return;
  if (['طلب جديد', 'محادثة'].includes(cur)) return;
  if (/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '')) return;
  render(true);
};

function goTo(n: string, fromBack = false) {
  if (typeof stopVoice === 'function') stopVoice();
  cpCancelRec();
  if (n !== 'محادثة') {
    _cpUnlocked.clear();
    _cpReply = null;
    _cpEdit = null;
    _chSearchOpen = false;
    _chSearchQ = '';
    _chSearchIdx = 0;
    _chSearchCat = 'all';
    _cmExpanded = false;
    _expandedMids.clear();
    $('#shell')?.classList.remove('chat-search-mode');
    $('#ch-top-search')?.remove();
    _otpReveal = false;
    if (_cpAu) { try { _cpAu.pause(); } catch (e) {} _cpAu = null; _cpAuId = ''; }
  }
  if (n !== 'الرسائل') {
    _cpShowArch = false;
  }
  if (n === 'محادثة' && !CHATS[chat]) n = 'الرسائل';
  if (n !== cur) {
    if (!fromBack && cur && VIEWS[cur]) {
      if (_navStack[_navStack.length - 1] !== cur) _navStack.push(cur);
      if (_navStack.length > 16) _navStack.shift();
      backView = cur;
    }
    if (n === 'محادثة') backView = 'الرسائل';
  }
  if (n === 'الإشعارات' && user && user.uid) {
    const rs = loadReadNotifs();
    let changed = false;
    NOTIFS.forEach(x => {
      if (!rs.has(x.id)) { rs.add(x.id); changed = true; }
      if (!x.read && x.isServer && x.rawId && db && hasLiveAuth()) {
        db.collection('notifications').doc(user.uid).collection('items').doc(x.rawId).update({ read: true }).catch(() => {});
      }
      x.read = true;
    });
    if (changed) saveReadNotifs(rs);
    UNREAD = 0;
  }
  cur = n;
  const ttl = $('#ttl');
  const topEx = $('#top-extra');
  const isSub = FULL_VIEWS.includes(n);

  const clearTtlLink = () => {
    ttl.removeAttribute('data-a');
    delete ttl.dataset.uid;
    delete ttl.dataset.n;
    delete ttl.dataset.ph;
  };

  if (n === 'محادثة' && CHATS[chat]) {
    const c = CHATS[chat];
    _cpEdit = null;
    _chSearchOpen = false;
    _chSearchQ = '';
    _chSearchIdx = 0;
    _otpReveal = false;
    if (cpIsOpen(c)) markChatSeen(c);
    cpSyncTopHeader(c);
  } else if (n === 'ملف مقدم الخدمة') {
    clearTtlLink();
    if (topEx) { topEx.style.display = 'none'; topEx.innerHTML = ''; }
    const person = resolvePerson(curProvUid);
    ttl.className = '';
    ttl.textContent = person.name || tView('ملف مقدم الخدمة');
  } else {
    clearTtlLink();
    if (topEx) { topEx.style.display = 'none'; topEx.innerHTML = ''; }
    ttl.className = '';
    ttl.textContent = tView(n);
  }

  const sh = $('#shell');
  const hideTopDesktop = n === 'المزيد';
  const hideTopMob = ['الرئيسية', 'طلبات قريبة', 'طلباتي', 'المزيد'].includes(n);
  const showBackBtn = n !== 'الرئيسية' && n !== 'المزيد';
  sh.classList.toggle('full', isSub);
  sh.classList.toggle('chat-mode', n === 'محادثة');
  sh.classList.toggle('hide-top', hideTopDesktop);
  sh.classList.toggle('hide-top-mob', hideTopMob);
  $('#bk').style.display = showBackBtn ? '' : 'none';
  $('#bk').setAttribute('aria-label', t('back_aria'));
  $('#bk').title = t('back');
  const topNw = $('#shell .top-nw') || document.querySelector('.top-nw');
  if (topNw) {
    const showNw = ['الرئيسية', 'طلبات قريبة', 'طلباتي', 'مقدمو الخدمة', 'المحفوظات'].includes(n);
    (topNw as HTMLElement).style.display = showNw ? '' : 'none';
  }
  const topHeader = $('#shell .top');
  if (topHeader) topHeader.classList.remove('top-hide');

  drawNav();
  render();
  if (n !== 'محادثة') {
    window.scrollTo(0, 0);
    const mn = $('#shell .main');
    if (mn) mn.scrollTop = 0;
  }

  $$('#tabs [data-n]').forEach(b => {
    const active = b.dataset.n === n || (b.dataset.n === 'المزيد' && !MAIN_TABS.includes(n) && !FULL_VIEWS.includes(n));
    b.classList.toggle('on', active);
  });
  syncDot();
  requestAnimationFrame(pillMove);
  if ($('#app').classList.contains('on')) saveNavState('app');
  if (typeof syncBackTrap === 'function') syncBackTrap();
}

function refreshMe() {
  $('#nm').textContent = myDisplayName();
  $('#em').textContent = (user && user.email) || (user ? '' : t('browsing_guest_short'));
  $('#av').innerHTML = myAv(38);
  $('#out').innerHTML = (user || isIn()) ? ic('out', 15) + ' ' + esc(t('sign_out_btn')) : ic('user', 15) + ' ' + esc(t('sign_in_btn'));
  render(true);
}

function initApp() {
  loadSaved();
  $('#nm').textContent = myDisplayName();
  $('#em').textContent = (user && user.email) || (user ? '' : t('browsing_guest_short'));
  $('#av').innerHTML = myAv(38);
  $('#out').innerHTML = (user || isIn()) ? ic('out', 15) + ' ' + esc(t('sign_out_btn')) : ic('user', 15) + ' ' + esc(t('sign_in_btn'));
  if (hasLiveAuth()) {
    watchConvs();
    watchNotifs();
    checkWeeklyLocSync();
  }
  goTo(cur);
}

/* فتح رابط طلب مباشر (#req=...) أو صفحة شخصية لأي مستخدم (#prov=...) مع تنظيف الهاش حتى لا يعلق التحديث */
let _deepOpened = false;
function clearConsumedHash() {
  try {
    if (location.hash.startsWith('#req=') || location.hash.startsWith('#prov=')) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  } catch (e) {}
}
function checkDeepLink() {
  if (_deepOpened) return;
  if (location.hash.startsWith('#req=')) {
    const rid = decodeURIComponent(location.hash.slice(5));
    const r = REQS.find(x => x.id === rid);
    if (r) {
      _deepOpened = true;
      clearConsumedHash();
      if (!$('#app').classList.contains('on')) go('app');
      setTimeout(() => A.reqDet({ dataset: { i: rid } }), 150);
    }
  } else if (location.hash.startsWith('#prov=')) {
    const uid = decodeURIComponent(location.hash.slice(6));
    if (uid && (liveProvsReady || liveReqsReady || PROV.some(x => x.uid === uid) || REQS.some(x => x.ownerId === uid))) {
      _deepOpened = true;
      clearConsumedHash();
      if (!$('#app').classList.contains('on')) go('app');
      setTimeout(() => openProviderPage(uid), 120);
    }
  }
}

/* ====== نظام الكتابة التلقائية بالصوت + زر واتساب المدمج في الدردشة ====== */
const SR_CLS = window.SpeechRecognition || window.webkitSpeechRecognition || null;
const SKIP_VOICE_TYPES = new Set(['file', 'hidden', 'checkbox', 'radio', 'number', 'tel', 'password', 'submit', 'button', 'range', 'color']);
let _voiceActive = false, _voiceEl: any = null, _voiceRec: any = null, _voiceBase = '';

const micIdleHtml = isTA => isTA ? `${ic('mic', 15)}<span>${esc(t('voice_btn'))}</span>` : ic('mic', 16);
const micRecHtml = () => `<span class="v-orb">${ic('voiceOrb', 16)}</span><span>${esc(t('voice_rec'))}</span>`;

function syncChatComposerUI() {
  const cm = $('#cm') as any;
  const act = $('#c-act');
  const stopBtn = $('#c-vstop');
  const bx = $('#cbox');
  const cnt = $('#cm-cnt');
  const wordsEl = $('#cm-words');
  if (!cm || !act) return;
  let val = String(cm.value || '');
  if (val.length > MSG_MAX_CHARS) {
    val = val.slice(0, MSG_MAX_CHARS);
    cm.value = val;
    const nowMs = Date.now();
    if (nowMs - _lastLimitToast > 2200) {
      _lastLimitToast = nowMs;
      toast(tf(`الحد الأقصى للرسالة ${MSG_MAX_CHARS} حرف.`));
    }
  }
  const hasText = !!val.trim();
  const isRec = !!(_voiceActive && _voiceEl === cm);
  const len = val.length;
  const m = measureCmHeight(cm, val);
  const targetH = m.h;
  if (!_cmExpanded) {
    const nextH = targetH + 'px';
    const prevH = cm.style.height;
    if (prevH !== nextH) {
      cm.style.height = nextH;
      const th = $('#thr') as HTMLElement | null;
      if (th && (th.scrollHeight - th.scrollTop - th.clientHeight < 100)) {
        requestAnimationFrame(() => { th.scrollTop = th.scrollHeight; });
      }
    }
  } else if (cm.style.height) {
    cm.style.height = '';
  }
  const isMulti = _cmExpanded || val.includes('\n') || targetH > 42 || len >= 52;
  if (bx) {
    bx.classList.toggle('has', hasText);
    bx.classList.toggle('is-multi', isMulti);
    bx.classList.toggle('is-at-cap', !_cmExpanded && m.atCap);
  }
  if (cnt) {
    const showCnt = _cmExpanded || len >= 200;
    cnt.textContent = showCnt ? `${len}/${MSG_MAX_CHARS}` : '';
    cnt.classList.toggle('is-vis', showCnt);
    cnt.classList.toggle('is-warn', len >= Math.round(MSG_MAX_CHARS * 0.82) && len < MSG_MAX_CHARS);
    cnt.classList.toggle('is-max', len >= MSG_MAX_CHARS);
  }
  if (wordsEl) {
    const wc = val.trim() ? val.trim().split(/\s+/).length : 0;
    wordsEl.textContent = t('cm_words_fmt', { w: wc, c: len, m: MSG_MAX_CHARS });
  }
  if (stopBtn) stopBtn.style.display = (isRec && hasText) ? 'grid' : 'none';

  act.classList.remove('mode-mic', 'mode-rec', 'mode-send', 'is-capped');
  if (hasText) {
    act.classList.add('mode-send');
    act.innerHTML = ic('arrowup', 19);
    act.title = t('cm_send_title');
    act.setAttribute('aria-label', t('cm_send_title'));
    if (!_cmWasSend) {
      _cmWasSend = true;
      act.classList.remove('is-pop');
      void act.offsetWidth;
      act.classList.add('is-pop');
    }
  } else if (isRec) {
    _cmWasSend = false;
    act.classList.remove('is-pop');
    act.classList.add('mode-rec');
    act.innerHTML = `<span class="v-orb">${ic('voiceOrb', 19)}</span>`;
    act.title = t('cm_rec_title');
    act.setAttribute('aria-label', t('cm_rec_title'));
  } else {
    _cmWasSend = false;
    act.classList.remove('is-pop');
    act.classList.add('mode-mic');
    const vq = getChatQuota('voice');
    act.classList.toggle('is-capped', vq.remaining <= 0);
    const micLbl = vq.remaining <= 0 ? t('quota_voice_title') : t('quota_voice_left', { r: vq.remaining });
    act.innerHTML = ic('mic', 20);
    act.title = micLbl;
    act.setAttribute('aria-label', micLbl);
  }
}

function bindChatComposer(root: any = document) {
  if (!root || !root.querySelector) return;
  const cm = root.querySelector('#cm');
  if (!cm || cm._chatBound) return;
  cm._chatBound = true;
  cm._vBound = true;

  const curChat = CHATS[chat];
  if (!_cpEdit && curChat && curChat.cid && !cm.value) {
    const savedDraft = cpGetDraft(curChat.cid);
    if (savedDraft) cm.value = savedDraft.slice(0, MSG_MAX_CHARS);
  }

  if (window.visualViewport && !(window as any)._cmVvBound) {
    (window as any)._cmVvBound = true;
    window.visualViewport.addEventListener('resize', syncComposerViewport, { passive: true });
    window.visualViewport.addEventListener('scroll', syncComposerViewport, { passive: true });
  }

  const stopBtn = root.querySelector('#c-vstop');
  if (stopBtn) {
    stopBtn.addEventListener('mousedown', e => e.preventDefault());
    stopBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      stopVoice();
      toast('وقفنا التسجيل الصوتي — راجع النص أو دوس إرسال ✓');
    });
  }

  cm.addEventListener('input', () => {
    if (!cm._fromVoice && _voiceActive && _voiceEl === cm) {
      stopVoice();
    }
    const curC = CHATS[chat];
    if (!_cpEdit && curC && curC.cid) cpSetDraft(curC.cid, cm.value || '');
    const bx = $('#cbox');
    if (bx && !_cmExpanded) {
      bx.classList.add('is-typing');
      clearTimeout(_cmTypePulseTimer);
      _cmTypePulseTimer = setTimeout(() => { bx.classList.remove('is-typing'); }, 220);
    }
    syncChatComposerUI();
  });

  cpApplyExpandedUI();
  syncChatComposerUI();
}

function syncMicVisibility(el) {
  if (el && el.id === 'cm') {
    syncChatComposerUI();
    return;
  }
  if (!el || !el._vBtn) return;
  const btn = el._vBtn, wrap = el._vWrap;
  const isTA = el.tagName === 'TEXTAREA';
  if (_voiceActive && _voiceEl === el) {
    btn.classList.add('rec');
    btn.classList.remove('v-hidden');
    btn.innerHTML = micRecHtml();
    btn.title = 'اضغط لإيقاف التسجيل الصوتي';
    if (wrap) { wrap.classList.add('v-rec'); wrap.classList.remove('v-hide'); }
    return;
  }
  btn.classList.remove('rec');
  btn.innerHTML = micIdleHtml(isTA);
  btn.title = 'اضغط واتكلم وهيكتب كلامك تلقائي';
  if (wrap) wrap.classList.remove('v-rec');

  const hasVal = !!String(el.value || '').trim();
  if (!hasVal) el._typedByHand = false;
  const hideNow = hasVal && !!el._typedByHand;
  btn.classList.toggle('v-hidden', hideNow);
  if (wrap) wrap.classList.toggle('v-hide', hideNow);
}

function stopVoice() {
  const prevEl = _voiceEl;
  _voiceActive = false;
  _voiceEl = null;
  if (_voiceRec) {
    try { _voiceRec.onend = null; _voiceRec.onresult = null; _voiceRec.onerror = null; _voiceRec.stop(); } catch (e) {}
    _voiceRec = null;
  }
  if (prevEl) syncMicVisibility(prevEl);
  syncChatComposerUI();
}

function toggleVoice(el) {
  if (!el) return;
  _lastVoiceTarget = el;
  if (_voiceActive && _voiceEl === el) {
    stopVoice();
    toast('وقفنا الكتابة بالصوت ✓');
    return;
  }
  if (_voiceActive) stopVoice();

  if (typeof window !== 'undefined' && !window.isSecureContext && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    showPermHelpModal('mic');
    return;
  }

  if (isInAppBrowser() && !SR_CLS) {
    showPermHelpModal('mic');
    return;
  }

  if (!SR_CLS) {
    el.focus && el.focus();
    showPermHelpModal('speech-service');
    return;
  }

  _voiceActive = true;
  _voiceEl = el;
  el._typedByHand = false;
  // خانات البحث: كل مرة تتكلم بيبدأ بحث جديد نظيف بدل ما يلزق الكلام الجديد على القديم
  const isSearchEl = (el.getAttribute && (el.getAttribute('type') || '').toLowerCase() === 'search') || ['q', 'ps-q', 'hs', 'pq'].includes(el.id);
  if (isSearchEl && String(el.value || '').trim()) {
    el._fromVoice = true;
    el.value = '';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el._fromVoice = false;
  }
  _voiceBase = isSearchEl ? '' : String(el.value || '').trim();
  syncMicVisibility(el);

  const startUtterance = () => {
    if (!_voiceActive || _voiceEl !== el || !document.body.contains(el)) {
      stopVoice();
      return;
    }
    try {
      const rec = new SR_CLS();
      _voiceRec = rec;
      rec.lang = getLangMeta().speechLang;
      rec.interimResults = true;
      rec.continuous = false;
      rec.maxAlternatives = 1;

      rec.onresult = ev => {
        if (!_voiceActive || _voiceEl !== el) return;
        let seg = '';
        for (let i = 0; i < ev.results.length; i++) {
          seg += ev.results[i][0].transcript;
        }
        const rawSeg = seg.trim();
        const cleanSeg = isSearchEl ? rawSeg.replace(/[.,،؟?!]+$/g, '').trim() : rawSeg;
        el._fromVoice = true;
        el.value = (_voiceBase ? _voiceBase + ' ' : '') + cleanSeg;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el._fromVoice = false;
        if (el.tagName === 'TEXTAREA') el.scrollTop = el.scrollHeight;
        syncMicVisibility(el);
      };

      rec.onerror = ev => {
        if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') {
          _micPrimed = false;
          stopVoice();
          showPermHelpModal(ev.error === 'service-not-allowed' ? 'speech-service' : 'mic');
        } else if (ev.error === 'audio-capture') {
          stopVoice();
          toast('مفيش مايكروفون متوصل بالجهاز حالياً.');
        } else if (ev.error === 'network') {
          stopVoice();
          toast('الكتابة بالصوت محتاجة اتصال بالإنترنت.');
        }
      };

      rec.onend = () => {
        if (!_voiceActive || _voiceEl !== el || !document.body.contains(el)) {
          stopVoice();
          return;
        }
        _voiceBase = String(el.value || '').trim();
        // في خانات البحث: جملة واحدة كفاية، نقفل المايك ونسيب النتيجة قدامك
        if (isSearchEl && _voiceBase) {
          stopVoice();
          if (el.id === 'q') drawNav();
          return;
        }
        setTimeout(() => {
          if (_voiceActive && _voiceEl === el) startUtterance();
        }, 120);
      };

      rec.start();
    } catch (e) {
      stopVoice();
      showPermHelpModal('mic');
    }
  };

  // طلب إذن المايكروفون الأصلي من المتصفح أولاً على الموبايل علشان تظهر نافذة (سماح / حظر) فوراً وبشكل مضمون
  if (!_micPrimed && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
    const t0 = Date.now();
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        try { stream.getTracks().forEach(tr => tr.stop()); } catch {}
        _micPrimed = true;
        setTimeout(() => {
          if (_voiceActive && _voiceEl === el) startUtterance();
        }, 60);
      })
      .catch(err => {
        stopVoice();
        const nm = String((err && err.name) || '');
        if (nm === 'NotFoundError' || nm === 'DevicesNotFoundError') {
          toast('مفيش مايكروفون متوصل بالجهاز حالياً.');
          return;
        }
        if (Date.now() - t0 < 420 || isInAppBrowser()) {
          showPermHelpModal('mic');
        } else {
          toast('اضغط «سماح / Allow» على رسالة المايكروفون علشان تكتب بصوتك.');
        }
      });
    return;
  }

  startUtterance();
}

function attachVoiceEvents(el, btn, wrap) {
  if (el._vBound) return;
  el._vBound = true;
  el._vBtn = btn;
  el._vWrap = wrap;
  el._typedByHand = false;

  btn.addEventListener('mousedown', e => e.preventDefault());
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    toggleVoice(el);
  });

  el.addEventListener('input', () => {
    if (el._fromVoice) {
      el._typedByHand = false;
      syncMicVisibility(el);
      return;
    }
    if (_voiceActive && _voiceEl === el) stopVoice();
    el._typedByHand = !!String(el.value || '').trim();
    syncMicVisibility(el);
  });

  el.addEventListener('focus', () => syncMicVisibility(el));
  el.addEventListener('blur', () => {
    if (el.tagName === 'TEXTAREA' && !_voiceActive) {
      el._typedByHand = false;
      syncMicVisibility(el);
    }
  });

  syncMicVisibility(el);
}

function enhanceVoiceInputs(root: any = document) {
  if (!root) return;
  bindChatComposer(root);

  const fields = root.querySelectorAll ? root.querySelectorAll('input, textarea') : [];
  fields.forEach((el: any) => {
    if (el._vBound || el.id === 'cm' || el.id === 'ch-search-in' || (el.classList && el.classList.contains('otp-box'))) return;
    if (el.readOnly || el.disabled) return;
    if (el.tagName === 'INPUT') {
      const tp = (el.getAttribute('type') || 'text').toLowerCase();
      if (SKIP_VOICE_TYPES.has(tp)) return;
    }
    if (el.closest('.v-wrap')) return;

    const isTA = el.tagName === 'TEXTAREA';
    const wrap = document.createElement('div');
    wrap.className = 'v-wrap' + (isTA ? ' for-ta' : '');
    el.parentNode.insertBefore(wrap, el);
    wrap.appendChild(el);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'v-mic';
    btn.tabIndex = -1;
    btn.setAttribute('aria-label', t('voice_aria'));
    btn.innerHTML = micIdleHtml(isTA);
    wrap.appendChild(btn);

    attachVoiceEvents(el, btn, wrap);
  });
}

/* الشريط السفلي والروابط الثابتة */
syncTabsBar();

$('#bk').onclick = () => goBackView();
$('#tg').onclick = () => $('#shell').classList.toggle('closed');
if (!$('#side-peek')) {
  const sp = document.createElement('button');
  sp.id = 'side-peek';
  sp.className = 'side-peek';
  sp.type = 'button';
  sp.dataset.a = 'openSide';
  sp.title = t('side_show');
  sp.setAttribute('aria-label', t('side_show'));
  sp.innerHTML = ic('menu', 18);
  $('.main')?.appendChild(sp);
}
$('#out').onclick = () => A.out();
$('#q').oninput = drawNav;
addEventListener('resize', pillMove);
addEventListener('hashchange', () => { _deepOpened = false; checkDeepLink(); });
enhanceVoiceInputs(document.body);

/* Long press (موبايل) + كليك يمين / دبل كليك (كمبيوتر) + دبل تاب ❤️ + سحب موجة الصوت + تحديد الدردشات مطولاً */
let _lpTimer: any = null, _lpTarget: any = null, _lpFired = false, _lastTouchTs = 0, _lastTap: any = { id: '', ts: 0 };
let _vwScrubEl: any = null;
function spawnTapSpark(x: number, y: number) {
  if (!x && !y) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sp = document.createElement('i');
  sp.className = 'tap-spark';
  sp.style.left = x + 'px';
  sp.style.top = y + 'px';
  document.body.appendChild(sp);
  setTimeout(() => { sp.remove(); }, 380);
}
document.addEventListener('pointerdown', (e: any) => {
  const vw = e.target?.closest?.('.vw');
  if (vw) {
    _vwScrubEl = vw;
    cpSeekVoiceAt(vw, e.clientX || 0);
  }
  const hit = e.target?.closest?.('.btn, .cat, .chip, .qchip, .tabs button, .chrow, .ss-act i, .sp-btn');
  if (hit && !hit.disabled) spawnTapSpark(e.clientX || 0, e.clientY || 0);
});
document.addEventListener('pointermove', (e: any) => {
  if (_vwScrubEl) cpSeekVoiceAt(_vwScrubEl, e.clientX || 0);
});
document.addEventListener('pointerup', () => { _vwScrubEl = null; });
document.addEventListener('pointercancel', () => { _vwScrubEl = null; });

document.addEventListener('touchstart', (e: any) => {
  _lastTouchTs = Date.now();
  _lpFired = false;
  const bb = e.target?.closest?.('#thr [data-mid]');
  if (bb && !e.target?.closest?.('button, a, .vw, .vrow, .vs, .tr-btn, [data-a="trInline"]')) {
    _lpTarget = bb;
    bb.classList.add('lp-press');
    _lpTimer = setTimeout(() => {
      if (_lpTarget === bb) {
        _lpFired = true;
        bb.classList.remove('lp-press');
        try { if (navigator.vibrate) navigator.vibrate(12); } catch (er) {}
        A.msgmenu(bb, true);
      }
      _lpTarget = null;
    }, 450);
    return;
  }
}, { passive: true });
document.addEventListener('touchend', (e: any) => {
  clearTimeout(_lpTimer);
  if (_lpTarget) _lpTarget.classList.remove('lp-press');
  _lastTouchTs = Date.now();
  if (_lpFired) { e.preventDefault(); _lpFired = false; _lpTarget = null; return; }
  const bb = _lpTarget;
  _lpTarget = null;
  if (bb && bb.matches && bb.matches('#thr [data-mid]') && !bb.classList.contains('ml') && !e.target?.closest?.('button,a,img,.vw,.tr-btn,[data-a="trInline"]')) {
    const id = bb.dataset.mid, now = Date.now();
    if (_lastTap.id === id && now - _lastTap.ts < 320) { cpReact(id, '❤️', bb); _lastTap = { id: '', ts: 0 }; }
    else _lastTap = { id, ts: now };
  }
}, { passive: false });
document.addEventListener('touchmove', () => { clearTimeout(_lpTimer); if (_lpTarget) _lpTarget.classList.remove('lp-press'); _lpTarget = null; }, { passive: true });
document.addEventListener('contextmenu', (e: any) => {
  const bb = e.target?.closest?.('#thr [data-mid]');
  if (!bb || Date.now() - _lastTouchTs < 900) { if (bb) e.preventDefault(); return; }
  e.preventDefault();
  A.msgmenu(bb, true);
});
document.addEventListener('dblclick', (e: any) => {
  if (Date.now() - _lastTouchTs < 900) return;
  const bb = e.target?.closest?.('#thr [data-mid]');
  if (!bb || bb.classList.contains('ml') || e.target?.closest?.('button,a,img,.vw,.tr-btn,[data-a="trInline"]')) return;
  try { const s = window.getSelection(); if (s) s.removeAllRanges(); } catch (er) {}
  cpCloseCtx();
  cpReact(bb.dataset.mid, '❤️', bb);
});
document.addEventListener('click', (e: any) => {
  const sg = $('#sg');
  if (sg && !e.target?.closest?.('#sg') && !e.target?.closest?.('.hero2')) {
    sg.remove();
  }
  if (_chSearchOpen && cur === 'محادثة') {
    if (!e.target?.closest?.('#ch-top-search, #ch-smart-panel, [data-a="chsearch"], .bb.msg-hit, .bb.msg-hit-cur')) {
      _chSearchOpen = false;
      _chSearchQ = '';
      _chSearchIdx = 0;
      _chSearchCat = 'all';
      cpRedrawTop();
      cpRefreshFloatBars(false);
      cpClearChatSearchMarks();
    }
  }
  if (!e.target?.closest?.('#ctx, #md, [data-a="msgMore"]')) {
    document.querySelectorAll('#thr .mtxt-wrap.is-open').forEach((wrap: any) => {
      const openBb = wrap.closest('.bb');
      if (!openBb || !openBb.contains(e.target)) cpCollapseExpandedMsg(wrap);
    });
  }
  const b = e.target?.closest?.('[data-a]');
  if (b && A[b.dataset.a]) A[b.dataset.a](b);
});
document.addEventListener('keydown', (e: any) => {
  if ((e.ctrlKey || e.metaKey) && String(e.key || '').toLowerCase() === 'k') {
    e.preventDefault();
    if (cur === 'محادثة') { A.chsearch(); }
    else { A.cmdHub(); }
    return;
  }
  if (e.key === 'Escape') {
    if (_cmExpanded && cur === 'محادثة') {
      _cmExpanded = false;
      cpApplyExpandedUI(); syncChatComposerUI();
      $('#cm')?.focus();
      return;
    }
    if (_chSearchOpen && cur === 'محادثة') {
      _chSearchOpen = false; _chSearchQ = ''; _chSearchIdx = 0; _chSearchCat = 'all';
      cpRedrawTop(); cpRefreshFloatBars(false); cpClearChatSearchMarks();
      return;
    }
    const sg = $('#sg');
    if (sg) sg.remove();
    const pk = $('#pk');
    if (pk) { if (typeof stopVoice === 'function') stopVoice(); pk.remove(); }
    closeShareSheet();
    closeModal();
  }
  const otpEl = e.target && e.target.classList && e.target.classList.contains('otp-box') ? (e.target as HTMLInputElement) : null;
  if (otpEl) {
    const row = otpEl.closest('.otp-row') as HTMLElement | null;
    if (row) {
      const all = Array.from(row.querySelectorAll('.otp-box')) as HTMLInputElement[];
      const idx = all.indexOf(otpEl);
      if (e.key === 'Backspace') {
        if (!otpEl.value && idx > 0) {
          e.preventDefault();
          all[idx - 1].value = '';
          all[idx - 1].focus();
        }
        setTimeout(() => syncOtpMeter(row), 0);
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault(); all[idx - 1].focus();
      } else if (e.key === 'ArrowRight' && idx + 1 < all.length) {
        e.preventDefault(); all[idx + 1].focus();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const g = $('#cpin-go'); if (g) g.click();
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && otpEl.value) {
        otpEl.value = '';
      }
    }
    return;
  }
  if (e.key === 'Enter' && e.target?.id === 'cm') {
    if (_cmExpanded) {
      if (e.ctrlKey || e.metaKey) { e.preventDefault(); A.send(); }
    } else if (!e.shiftKey) {
      e.preventDefault(); A.send();
    }
  }
  if (e.key === 'Enter' && e.target?.id === 'ch-search-in') { e.preventDefault(); _chSearchIdx += (e.shiftKey ? -1 : 1); cpApplyChatSearch(true); }
  if (e.key === 'Enter' && e.target?.id && String(e.target.id).startsWith('cpin')) { e.preventDefault(); const g = $('#cpin-go'); if (g) g.click(); }
  if (e.key === 'Enter' && e.target?.id === 'hs') { e.preventDefault(); A.search(); }
  if (e.key === 'Enter' && e.target?.id === 'q') {
    e.preventDefault();
    const qv = (e.target.value || '').trim();
    if (!qv) return;
    const hits = navMatches(qv);
    if (hits.length) { e.target.value = ''; syncMicVisibility(e.target); goTo(hits[0][0]); drawNav(); }
    else A.sideSearch();
  }
});
document.addEventListener('paste', (e: any) => {
  const inp = e.target && e.target.classList && e.target.classList.contains('otp-box') ? (e.target as HTMLInputElement) : null;
  if (!inp) return;
  const txt = String(e.clipboardData?.getData('text') || '').trim();
  if (!txt) return;
  e.preventDefault();
  const row = inp.closest('.otp-row') as HTMLElement | null;
  if (!row) return;
  const all = Array.from(row.querySelectorAll('.otp-box')) as HTMLInputElement[];
  const idx = Math.max(0, all.indexOf(inp));
  const chars = Array.from(txt);
  for (let k = 0; k < chars.length && idx + k < all.length; k++) all[idx + k].value = chars[k];
  syncOtpMeter(row);
  const nextIdx = Math.min(all.length - 1, idx + chars.length);
  if (all[nextIdx]) all[nextIdx].focus();
  if (row.id === 'otp-row' && all.length === 6 && all.every(x => (x.value || '').length === 1)) {
    setTimeout(() => { A.cunlock(); }, 20);
  }
});

/* دعم زر الرجوع الأصلي في الموبايل (Hardware Back Button / السحب للرجوع) بدون الخروج المفاجئ من الموقع */
let _bootDone = false, _backTrapArmed = false, _handlingPopState = false;
function isBackClosableState(): boolean {
  if ($('#pk') || $('#md')) return true;
  const scrEl = $('.screen.on');
  const scr = scrEl ? scrEl.id : 'intro';
  if (scr === 'login' || scr === 's1') return true;
  if (scr === 'app' && typeof cur !== 'undefined' && cur !== 'الرئيسية') return true;
  return false;
}
function syncBackTrap() {
  if (!_bootDone || _handlingPopState) return;
  if (isBackClosableState() && !_backTrapArmed) {
    try {
      history.pushState({ waslaBackTrap: 1 }, '', location.href);
      _backTrapArmed = true;
    } catch {}
  }
}
window.addEventListener('popstate', () => {
  if (location.hash.startsWith('#req=') || location.hash.startsWith('#prov=')) return;
  _backTrapArmed = false;
  if (!_bootDone) return;
  _handlingPopState = true;
  try {
    const pk = $('#pk');
    if (pk) {
      if (typeof stopVoice === 'function') stopVoice();
      pk.remove();
    } else if ($('#md')) {
      closeModal();
    } else if ($('#s1') && $('#s1').classList.contains('on')) {
      handleS1Back();
    } else if ($('#login') && $('#login').classList.contains('on')) {
      go(store.get(VISITED_APP_K) === '1' ? 'app' : 'intro');
    } else if ($('#app') && $('#app').classList.contains('on') && cur !== 'الرئيسية') {
      goBackView();
    }
  } finally {
    _handlingPopState = false;
    syncBackTrap();
  }
});
document.addEventListener('input', (e: any) => {
  if (e.target && e.target.classList && e.target.classList.contains('otp-box')) {
    const inp = e.target as HTMLInputElement;
    const row = inp.closest('.otp-row') as HTMLElement | null;
    if (!row) return;
    const all = Array.from(row.querySelectorAll('.otp-box')) as HTMLInputElement[];
    const idx = all.indexOf(inp);
    const v = String(inp.value || '');
    if (v.length > 1) {
      const chars = Array.from(v);
      for (let k = 0; k < chars.length && idx + k < all.length; k++) all[idx + k].value = chars[k];
      const nextIdx = Math.min(all.length - 1, idx + chars.length);
      if (all[nextIdx]) all[nextIdx].focus();
    } else if (v.length === 1) {
      if (idx >= 0 && idx + 1 < all.length) {
        all[idx + 1].focus();
      } else if (idx === all.length - 1 && row.dataset.grp === 'cpin-a') {
        const nextBox = document.querySelector('#md [data-grp="cpin-b"][data-idx="0"]') as HTMLInputElement | null;
        if (nextBox) nextBox.focus();
      }
    }
    syncOtpMeter(row);
    if (row.id === 'otp-row' && all.length === 6 && all.every(x => (x.value || '').length === 1)) {
      setTimeout(() => { A.cunlock(); }, 20);
    }
    return;
  }
  if (e.target?.id === 'est-slider') {
    A.estSlide(e.target);
    return;
  }
  if (e.target?.id === 'cmd-q') {
    renderCmdHubList(e.target.value || '');
    return;
  }
  if (e.target?.id === 'lang-q') {
    const host = $('#lang-grid-host');
    if (host) host.innerHTML = renderLangCardsGrid(e.target.value || '');
    return;
  }
  if (e.target?.id === 'ch-search-in') {
    _chSearchQ = e.target.value || '';
    _chSearchIdx = 0;
    const clrBtn = $('#ch-search-clr') as HTMLElement | null;
    if (clrBtn) clrBtn.style.display = _chSearchQ ? 'inline-flex' : 'none';
    cpRefreshFloatBars(false);
    cpApplyChatSearch(true);
    return;
  }
  if (e.target?.id === 'rcust-sub') {
    RQ.customSub = e.target.value;
    return;
  }
  if (e.target?.id === 'cm') {
    syncChatComposerUI();
    return;
  }
  if (e.target?.id === 'ps-q') {
    qS = e.target.value;
    provPageLim = 8;
    const rw = $('#prov-res-wrap');
    if (rw) { rw.innerHTML = provResultsHtml(); setupScrollObservers(); }
    return;
  }
  if (e.target?.id === 'hs') {
    const v = e.target.value.trim();
    if (cur === 'بحث') { SQ = v; saveNavState(); $('#sres').innerHTML = resHTML(); return; }
    let g = $('#sg');
    if (!v) { if (g) g.remove(); return; }
    if (!g) { g = document.createElement('div'); g.className = 'sg'; g.id = 'sg'; e.target.closest('.hero2').after(g); }
    const h = suggestHTML(v);
    g.innerHTML = h || `<button type="button" data-a="search">${ic('search', 17)}<span>${esc(t('search_do_lbl', { q: v }))}</span></button>`;
  }
});

/* الشريط العلوي المتطور: يختفي بنعومة عند النزول لأسفل، ويظهر فوراً بمجرد الطلوع لأعلى شوية + حفظ موضع التمرير */
let _restoringScroll = false;
(function setupSmartTopBar() {
  const mainEl = $('#shell .main');
  let lastWinY = 0;
  let lastMainY = 0;
  let ticking = false;
  let _topToggleLockUntil = 0;

  function onScroll(fromMain: boolean) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const topEl = $('#shell .top');
      if (!topEl || !$('#app').classList.contains('on')) return;
      const isDesktopScroll = window.innerWidth >= 900 && !!mainEl;
      if (fromMain !== isDesktopScroll) return;
      if (!_restoringScroll) saveScrollPos();
      if (cur === 'محادثة') return;

      const y = Math.max(0, isDesktopScroll ? mainEl.scrollTop : (window.scrollY || document.documentElement.scrollTop || 0));
      const prev = isDesktopScroll ? lastMainY : lastWinY;
      const dy = y - prev;
      if (isDesktopScroll) lastMainY = y;
      else lastWinY = y;

      const now = performance.now();
      if (y <= 36) {
        if (topEl.classList.contains('top-hide')) {
          topEl.classList.remove('top-hide');
          _topToggleLockUntil = now + 260;
        }
      } else if (now >= _topToggleLockUntil) {
        if (dy >= 12 && y > 72 && !topEl.classList.contains('top-hide')) {
          topEl.classList.add('top-hide');
          _topToggleLockUntil = now + 320;
        } else if (dy <= -10 && topEl.classList.contains('top-hide')) {
          topEl.classList.remove('top-hide');
          _topToggleLockUntil = now + 320;
        }
      }
    });
  }

  window.addEventListener('scroll', () => onScroll(false), { passive: true });
  if (mainEl) mainEl.addEventListener('scroll', () => onScroll(true), { passive: true });
  window.addEventListener('pagehide', () => { if (!_restoringScroll) saveScrollPos(); });
})();

/* تطبيق وصلة (PWA) + إشعار التثبيت المتوسط القابل للسحب في كل زيارة */
(function setupPwaInstallBanner() {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).then(reg => { reg.update().catch(() => {}); }).catch(() => {});
  }

  const bar = $('#pwa-bar');
  const installBtn = $('#pwa-install-btn');
  const closeBtn = $('#pwa-close-btn');
  if (!bar || !installBtn || !closeBtn) return;

  const isStandalone = () =>
    !!((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
      (window.matchMedia && window.matchMedia('(display-mode: fullscreen)').matches) ||
      (navigator as any).standalone === true);

  if (isStandalone()) return;

  let autoTimer: any = null;
  let showTimer: any = null;
  let dismissedThisVisit = false;

  const clearTimers = () => {
    clearTimeout(autoTimer);
    clearTimeout(showTimer);
  };

  const hideBar = (dx = 0, dy = -220) => {
    dismissedThisVisit = true;
    clearTimers();
    bar.classList.remove('dragging', 'on');
    bar.setAttribute('aria-hidden', 'true');
    if (dx !== 0 || dy !== -220) {
      bar.style.transform = `translate(calc(-50% + ${dx}px), ${dy}px)`;
      bar.style.opacity = '0';
      setTimeout(() => {
        bar.style.transform = '';
        bar.style.opacity = '';
      }, 300);
    } else {
      bar.style.transform = '';
      bar.style.opacity = '';
    }
  };

  const armAutoHide = (ms = 9000) => {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => {
      if (!dismissedThisVisit) hideBar(0, -220);
    }, ms);
  };

  const showBar = () => {
    if (dismissedThisVisit || isStandalone()) return;
    bar.style.transform = '';
    bar.style.opacity = '';
    bar.classList.add('on');
    bar.setAttribute('aria-hidden', 'false');
    armAutoHide(9000);
  };

  showTimer = setTimeout(showBar, 750);

  closeBtn.addEventListener('click', (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    hideBar(0, -220);
  });

  installBtn.addEventListener('click', async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    hideBar(0, -220);
    if (_deferredPwaPrompt) {
      const promptEv = _deferredPwaPrompt;
      _deferredPwaPrompt = null;
      try {
        await promptEv.prompt();
        const choice = await promptEv.userChoice;
        if (choice && choice.outcome === 'accepted') {
          toast('جاري تثبيت تطبيق وصلة على جهازك ✓');
        }
      } catch {}
      return;
    }
    if (isInAppBrowser()) {
      openModal(`
        <h2>${esc(t('pwa_ext_h2'))}</h2>
        <p style="font-size:.88rem;line-height:1.65">${esc(t('pwa_ext_p'))}</p>
        <div class="meta" style="margin-top:8px">
          <button class="btn mint" style="flex:1" type="button" data-a="openExtBrowser">${ic('share', 15)} ${esc(t('pwa_ext_btn'))}</button>
          <button class="btn white" type="button" data-a="x">${esc(t('close'))}</button>
        </div>
      `);
      return;
    }
    const isIOS = /iPad|iPhone|iPod/i.test(String(navigator.userAgent || '')) || ((navigator as any).platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    openModal(`
      <div style="display:flex;align-items:center;gap:11px;padding-inline-start:38px">
        <img src="./assets/icon-192.png" width="44" height="44" alt="Wasla" style="border-radius:12px;border:1.5px solid var(--ink);box-shadow:1.5px 1.5px 0 var(--ink)">
        <div>
          <h2 style="padding:0;font-size:1.08rem">${esc(t('pwa_h2'))}</h2>
          <small style="color:var(--muted)">${esc(t('pwa_sub'))}</small>
        </div>
      </div>
      <div class="perm-steps">
        ${isIOS
          ? `<div class="perm-step"><b class="st-num">1</b><span>${esc(t('pwa_ios_1'))}</span></div>
             <div class="perm-step"><b class="st-num">2</b><span>${esc(t('pwa_ios_2'))}</span></div>`
          : `<div class="perm-step"><b class="st-num">1</b><span>${esc(t('pwa_and_1'))}</span></div>
             <div class="perm-step"><b class="st-num">2</b><span>${esc(t('pwa_and_2'))}</span></div>`}
      </div>
      <div class="meta" style="margin-top:6px"><button class="btn mint" style="flex:1" type="button" data-a="x">${esc(t('ok_done'))}</button></div>
    `);
  });

  /* سحب الإشعار للإخفاء (لأعلى أو يمين أو شمال) مثل إشعارات المتصفح والنظام */
  let pDown = false, dragging = false, startX = 0, startY = 0, curX = 0, curY = 0, activePid = -1;
  bar.addEventListener('pointerdown', (ev: any) => {
    if (!bar.classList.contains('on')) return;
    pDown = true;
    dragging = false;
    activePid = ev.pointerId;
    startX = ev.clientX;
    startY = ev.clientY;
    curX = 0;
    curY = 0;
    clearTimeout(autoTimer);
  });
  bar.addEventListener('pointermove', (ev: any) => {
    if (!pDown || ev.pointerId !== activePid) return;
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    if (!dragging && Math.hypot(dx, dy) > 7) {
      dragging = true;
      bar.classList.add('dragging');
      try { bar.setPointerCapture(ev.pointerId); } catch {}
    }
    if (!dragging) return;
    curX = dx;
    curY = dy < 0 ? dy : dy * 0.22;
    const distFade = Math.min(0.75, (Math.abs(curX) / 180) + (Math.abs(Math.min(0, curY)) / 90));
    bar.style.transform = `translate(calc(-50% + ${curX}px), ${curY}px)`;
    bar.style.opacity = String(Math.max(0.2, 1 - distFade));
  });
  const finishDrag = (ev: any) => {
    if (!pDown || (activePid !== -1 && ev.pointerId !== activePid)) return;
    pDown = false;
    activePid = -1;
    if (!dragging) {
      if (!dismissedThisVisit && bar.classList.contains('on')) armAutoHide(5000);
      return;
    }
    dragging = false;
    bar.classList.remove('dragging');
    try { bar.releasePointerCapture(ev.pointerId); } catch {}
    if (curY < -24 || Math.abs(curX) > 54) {
      const exitX = Math.abs(curX) > 54 ? (curX > 0 ? 260 : -260) : curX;
      const exitY = curY < -24 ? -220 : curY;
      hideBar(exitX, exitY);
    } else {
      bar.style.transform = '';
      bar.style.opacity = '';
      armAutoHide(5000);
    }
  };
  bar.addEventListener('pointerup', finishDrag);
  bar.addEventListener('pointercancel', finishDrag);

  window.addEventListener('appinstalled', () => {
    _deferredPwaPrompt = null;
    hideBar(0, -220);
    toast('اتثبّت تطبيق وصلة على جهازك بنجاح ✓');
  });
})();

/* استرجاع نفس الجلسة والصفحة وموضع التمرير فوراً عند عمل تحديث (Refresh / Pull-to-Refresh) بدون أي رجوع للبداية */
startLive();
(function restorePlaceOnRefresh() {
  const hasDeepHash = location.hash.startsWith('#req=') || location.hash.startsWith('#prov=');
  const saved = loadNavState();
  const targetScreen = (saved && saved.screen && saved.screen !== 'intro')
    ? saved.screen
    : (hasDeepHash || isIn() || store.get(VISITED_APP_K) === '1') ? 'app' : 'intro';

  if (targetScreen === 'intro') return;

  if (saved) {
    if (!hasDeepHash && saved.cur && VIEWS[saved.cur]) cur = saved.cur;
    if (saved.backView && VIEWS[saved.backView]) backView = saved.backView;
    if (saved.curProvUid) curProvUid = saved.curProvUid;
    if (saved.mineTab) mineTab = saved.mineTab;
    if (typeof saved.catF === 'number') catF = saved.catF;
    if (typeof saved.homeCatF === 'number') homeCatF = saved.homeCatF;
    if (saved.SQ) SQ = saved.SQ;
    if (cur === 'محادثة' && saved.chatCid && saved.chatUid) {
      CHATS = [{
        w: saved.chatName || 'مستخدم',
        photo: saved.chatPhoto || '',
        m: [],
        u: 0,
        cid: saved.chatCid,
        uid: saved.chatUid,
        existsOnServer: true
      }];
      chat = 0;
    }
  }

  const savedY = (!hasDeepHash && targetScreen === 'app') ? readSavedScrollPos(cur) : 0;
  if (savedY > 0) _restoringScroll = true;

  if (targetScreen === 'app' && cur === 'ملف مقدم الخدمة' && curProvUid) {
    watchProvWorks(curProvUid);
  }
  go(targetScreen);

  if (savedY > 0) {
    let userTouched = false;
    const stopRestore = () => { userTouched = true; _restoringScroll = false; };
    window.addEventListener('touchstart', stopRestore, { once: true, passive: true });
    window.addEventListener('wheel', stopRestore, { once: true, passive: true });
    const applyY = () => {
      if (userTouched || !$('#app').classList.contains('on')) return;
      const mn = window.innerWidth >= 900 ? $('#shell .main') : null;
      if (mn) mn.scrollTop = savedY;
      else window.scrollTo(0, savedY);
    };
    requestAnimationFrame(applyY);
    setTimeout(applyY, 320);
    setTimeout(() => { applyY(); _restoringScroll = false; }, 900);
  }
})();
_bootDone = true;
syncBackTrap();

if (auth) {
  auth.onAuthStateChanged(async u => {
    if (!u) {
      user = null;
      profile = {};
      MY = { on: false };
      store.del(SESSION_HINT_K);
      store.del(SESSION_CACHE_K);
      authReady = true;
      if ($('#app').classList.contains('on')) {
        rebuildReq();
        rebuildProv();
        refreshMe();
        drawNav();
      }
      return;
    }

    const prevUid = user && user.uid;
    user = u;
    if (prevUid && prevUid !== u.uid) {
      profile = {};
      MY = { on: false };
    }

    const res = await loadProfileResilient(u);
    authReady = true;

    if (res.status === 'ok' && res.data) {
      profile = res.data;
      persistSessionCache();
    } else if (res.status === 'error' && profile && profile.first) {
      /* انقطاع لحظي في الشبكة أثناء السحب للتحديث — نحتفظ بجلسة المستخدم الموقّعة بدون خروجه */
      persistSessionCache();
    } else {
      profile = {};
      store.del(SESSION_HINT_K);
      store.del(SESSION_CACHE_K);
    }

    if (profile && profile.first) {
      loadSaved();
      rebuildReq();
      rebuildProv();
      rebuildSmartNotifs();
      checkWeeklyLocSync();
      if ($('#intro').classList.contains('on')) {
        go('app');
      } else if ($('#app').classList.contains('on')) {
        watchConvs();
        watchNotifs();
        if (cur === 'محادثة' && CHATS[chat] && CHATS[chat].existsOnServer) {
          subscribeMsgs(CHATS[chat]);
        }
        refreshMe();
        syncDot();
        drawNav();
      }
    } else {
      if ($('#s1').classList.contains('on')) {
        prefillOnboardingFromGoogle();
      } else if ($('#intro').classList.contains('on') && (location.hash.startsWith('#req=') || location.hash.startsWith('#prov='))) {
        go('app');
      } else if ($('#app').classList.contains('on')) {
        refreshMe();
      }
    }
  });
}
}
