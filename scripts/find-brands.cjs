/** یافتن اشاره‌های برندهای حذف‌شدنی */
const fs = require('fs');
const marks = ['siemens', 'ariston', "pam'", 'gplus', 'زیمنس', 'آریستون', 'جی\u200cپلاس', 'جی پلاس'];
const out = [];
function check(p, t) {
  t.split('\n').forEach((l, i) => {
    for (const m of marks) {
      if (l.includes(m)) {
        out.push(p + ':' + (i + 1) + ': ' + l.trim().slice(0, 140));
        break;
      }
    }
  });
}
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    if (['node_modules', '.next', 'out', '.git'].includes(f)) continue;
    const p = dir + '/' + f;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(tsx?|json|md|mjs|html)$/.test(f)) check(p, fs.readFileSync(p, 'utf8'));
  }
}
for (const d of ['src', 'content']) walk(d);
for (const f of ['admin/index.html', 'server.mjs', 'README.md']) check(f, fs.readFileSync(f, 'utf8'));
console.log(out.slice(0, 80).join('\n') || 'CLEAN');
console.log('lines:', out.length);
