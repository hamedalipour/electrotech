/** افزودن فیلد logo به برندهای موجود با لوگو در پوشه */
const fs = require('fs');
const logos = {
  daewoo: 'Daewoo-logo.svg',
  snowa: 'snowa-logo_2.jpg',
  lg: 'LG_logo.svg',
  samsung: 'Samsung_Logo_2.svg',
  bosch: 'Bosch-Logo.svg',
};
for (const [slug, f] of Object.entries(logos)) {
  const p = 'src/data/brands/' + slug + '.ts';
  let t = fs.readFileSync(p, 'utf8');
  if (t.includes('logo:')) { console.log('has logo', slug); continue; }
  const re = /(nameEn: '[^']+',\n)/;
  if (!re.test(t)) { console.log('MISS', slug); continue; }
  t = t.replace(re, `$1  logo: '/images/brand/${f}',\n`);
  fs.writeFileSync(p, t, 'utf8');
  console.log('ok', slug);
}
// بنر دوو (خدمات پس از فروش دوو)
{
  const p = 'src/data/brands/daewoo.ts';
  let t = fs.readFileSync(p, 'utf8');
  if (!t.includes('banner:')) {
    t = t.replace(/(logo: '[^']+',\n)/, `$1  banner: '/images/brand/خدمات-پس-از-فروش-دوو-r8xyqia3cm8a3t52v5q70rd2m1czy7uue6u16pgbfe.webp',\n`);
    fs.writeFileSync(p, t, 'utf8');
    console.log('ok daewoo banner');
  }
}
