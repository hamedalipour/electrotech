/** یافتن فایل‌های دارای mojibake (دوبار انکود شده) */
const fs = require('fs');
let n = 0;
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    if (['node_modules', '.next', 'out', '.git'].includes(f)) continue;
    const p = dir + '/' + f;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(tsx?|json|md|mjs|html|css|txt|xml)$/.test(f)) {
      const t = fs.readFileSync(p, 'utf8');
      if (/(Ù|â€|ÛŒ|Øª)/.test(t.slice(0, 4000))) {
        n++;
        console.log('SUSPECT:', p);
      }
    }
  }
}
walk('src');
walk('content');
if (fs.existsSync('app')) walk('app');
walk('scripts');
if (fs.existsSync('components')) walk('components');
if (fs.existsSync('lib')) walk('lib');
if (fs.existsSync('admin')) walk('admin');
console.log('total suspects:', n);
