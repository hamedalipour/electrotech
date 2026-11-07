/** تأیید کامل هیرو: فایل ارجاع‌شده در out موجود است؟ */
const fs = require('fs');
const t = fs.readFileSync('out/index.html', 'utf8');
const refs = [...new Set([...t.matchAll(/\/_next\/static\/media\/hero-banner\.[a-z0-9]+\.(webp|png)/g)].map((m) => m[0]))];
let ok = true;
for (const r of refs) {
  const p = 'out' + r;
  const exists = fs.existsSync(p);
  console.log(r, exists ? `(${Math.round(fs.statSync(p).size / 1024)}KB) ✓` : 'موجود نیست ✗');
  if (!exists) ok = false;
}
console.log('media dir:', fs.readdirSync('out/_next/static/media').filter((f) => f.startsWith('hero-banner')).join(', '));
if (t.includes('hero-banner.d5aaf623')) console.log('هشدار: ارجاع هش قدیمی مانده');
console.log(ok ? 'HERO OK ✓' : 'HERO BROKEN ✗');
