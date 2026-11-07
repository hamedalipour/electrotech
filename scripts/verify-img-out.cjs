/** تأیید خروجی تصاویر بلاگ */
const fs = require('fs');
const files = fs.readdirSync('out/images/blog').filter((f) => {
  try { return fs.statSync('out/images/blog/' + f).isFile(); } catch { return false; }
});
console.log('out/images/blog:', files.join(' | '));
const t = fs.readFileSync('out/blog/fridge-not-cooling/index.html', 'utf8');
const src = (t.match(/srcset="[^"]+"/) || [''])[0].slice(0, 260);
console.log('srcset sample:', src);
console.log('dims:', (t.match(/width="\d+" height="\d+"/) || [''])[0]);
