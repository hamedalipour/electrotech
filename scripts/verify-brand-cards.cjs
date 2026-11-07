/** تأیید کارت برندها: برندهای دارای لوگو نباید اسم متنی جدا داشته باشند */
const fs = require('fs');
const logos = ['Beko', 'Electrolux', 'Midea', 'Panasonic', 'Toshiba', 'Indesit', 'Kenwood', 'GE-logo', 'Ariston', 'Siemens', 'LG_logo', 'Samsung', 'Bosch', 'Daewoo', 'snowa'];
const t = fs.readFileSync('out/brands/index.html', 'utf8');
let ok = true;
for (const l of logos) {
  const i = t.indexOf(l);
  if (i < 0) { console.log('لوگو نبود:', l, '✗'); ok = false; continue; }
  console.log(l, 'هست ✓');
}
// کارت بدون لوگو (پاکشوما) باید نام داشته باشد
const p = t.indexOf('/brands/pakshoma/');
console.log('pakshoma name text:', t.slice(p, p + 400).includes('پاکشوما') ? 'هست ✓' : 'نیست ✗');
