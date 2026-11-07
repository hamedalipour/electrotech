/** بررسی خروجی build */
const fs = require('fs');
const checks = [
  ['out/blog/dishwasher-e24/index.html', 'خطای E24', true],
  ['out/blog/appliance-repair-prices-tehran/index.html', 'تعرفه تعمیر لوازم خانگی در تهران', true],
  ['out/blog/appliance-repair-prices-tehran/index.html', '/prices/', true],
  ['out/blog/dishwasher-e24/index.html', 'appliance-technician.webp', false],
  ['out/blog/dishwasher-e24/index.html', 'dishwasher-service.webp', true],
  ['out/robots.txt', 'electrotechco.ir', true],
];
let fail = 0;
for (const [f, n, w] of checks) {
  let found = false;
  try { found = fs.readFileSync(f, 'utf8').includes(n); } catch { }
  const ok = found === w;
  if (!ok) fail++;
  console.log((ok ? 'OK  ' : 'FAIL') + '  ' + f + '  ' + (w ? 'have' : 'NOT have') + ' `' + n + '`, found=' + found);
}
const text = fs.readFileSync('out/sitemap.xml', 'utf8');
console.log('sitemap blog entries:', (text.match(/\/blog\//g) || []).length);
const oldPhone = ['out/sitemap.xml', 'out/index.html', 'out/about/index.html', 'out/faq/index.html'].reduce((n, f) => {
  try { return n + (fs.readFileSync(f, 'utf8').includes('09352111146') ? 1 : 0); } catch { return n; }
}, 0);
console.log('old phone leftovers:', oldPhone);
process.exit(fail ? 1 : 0);
