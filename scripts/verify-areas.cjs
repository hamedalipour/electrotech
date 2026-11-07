/** تأیید خروجی مناطق */
const fs = require('fs');
const dirs = fs.readdirSync('out/areas').filter((d) => {
  try { return fs.statSync('out/areas/' + d).isDirectory(); } catch { return false; }
});
console.log('area pages:', dirs.length);
console.log(dirs.join(', '));
const t = fs.readFileSync('out/areas/index.html', 'utf8');
console.log('dup bug (تعمیر در تعمیر):', t.includes('تعمیر لوازم خانگی در تعمیر'));
const d2 = t.match(/<meta name="description" content="([^"]+)"/);
console.log('desc:', d2 ? d2[1].slice(0, 90) : '');
const sm = fs.readFileSync('out/sitemap.xml', 'utf8');
console.log('sitemap area entries:', (sm.match(/\/areas\/[a-z-]+\/<\/loc>/g) || []).length);
// نمونه محله
const s = fs.readFileSync('out/areas/saadat-abad/index.html', 'utf8');
const ti = (s.match(/<title>([^<]+)<\/title>/) || [])[1];
console.log('saadat-abad title:', ti);
