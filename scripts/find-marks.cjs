/** فهرست فایل‌های دارای هرکدام از نشانه‌های هدف */
const fs = require('fs');
const marks = ['الکتروتک', 'قطعه گرمایی', 'قطعات گرمایی', 'آبگرمکن', 'پکیج', 'water-heater'];
const out = {};
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    if (['node_modules', '.next', 'out', '.git'].includes(f)) continue;
    const p = dir + '/' + f;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(tsx?|json|md|mjs|html|css|txt|xml|webmanifest)$/.test(f)) {
      const t = fs.readFileSync(p, 'utf8');
      const hits = marks.filter((m) => t.includes(m) || (m === 'water-heater' && t.includes('water_heater')));
      if (hits.length) out[p] = hits;
    }
  }
}
walk('src');
walk('content');
if (fs.existsSync('app')) walk('app');
walk('scripts');
walk('admin');
walk('.'); // فایل‌های ریشه
delete out['./'];
console.log(JSON.stringify(out, null, 1).slice(0, 6000));
console.log('files:', Object.keys(out).length);
