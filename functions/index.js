/* وصلة: فهرسة الكلمات المفتاحية للطلبات ومقدمي الخدمات في Firestore لتحسين البحث والفلترة. */
const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

initializeApp();

const CATEGORIES = [
  'النقل والشحن',
  'الصيانة والحرفيون',
  'التعليم',
  'البيع والشراء',
  'الشركات والخدمات',
  'التجارة والجملة'
];

function extractKeywords(parts) {
  const joined = parts
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ');
  const tokens = joined
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length >= 2);
  return Array.from(new Set(tokens)).slice(0, 48);
}

exports.indexRequest = onDocumentWritten('requests/{id}', async (ev) => {
  const snap = ev.data && ev.data.after;
  if (!snap || !snap.exists) return;
  const d = snap.data() || {};
  const sig = [d.title, d.description, d.sub, d.category, d.locText].join('|');
  if (d.indexSig === sig) return;
  const keywords = extractKeywords([
    d.title,
    d.description,
    d.sub,
    CATEGORIES[d.category | 0],
    d.locText
  ]);
  await snap.ref.update({
    keywords,
    indexSig: sig,
    indexedAt: FieldValue.serverTimestamp()
  });
});

exports.indexProvider = onDocumentWritten('providers/{id}', async (ev) => {
  const snap = ev.data && ev.data.after;
  if (!snap || !snap.exists) return;
  const d = snap.data() || {};
  const sig = [d.name, d.category, d.city, d.gov].join('|');
  if (d.indexSig === sig) return;
  const keywords = extractKeywords([
    d.name,
    CATEGORIES[d.category | 0],
    d.city,
    d.gov
  ]);
  await snap.ref.update({
    keywords,
    indexSig: sig,
    indexedAt: FieldValue.serverTimestamp()
  });
});
