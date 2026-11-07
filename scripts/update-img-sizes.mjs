/** به‌روزرسانی src/data/imageSizes.json برای تصاویر جدید بلاگ (ابعاد واقعی از sharp) */
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'public/images/blog';
const OUT = 'src/data/imageSizes.json';
const canons = ['appliance-technician.webp', 'fridge-repair-service.webp', 'dishwasher-service.webp'];

const map = JSON.parse(readFileSync(OUT, 'utf8'));
// حذف ورودی‌های قدیمی بک‌لایت
for (const key of Object.keys(map)) {
  if (!existsSync(join('public', key))) delete map[key];
}

for (const file of canons) {
  const src = '/images/blog/' + file;
  const meta = await sharp(join(DIR, file)).metadata();
  map[src] = { width: meta.width, height: meta.height, variants: [768, 1080] };
  console.log(src, `${meta.width}x${meta.height}`);
}
writeFileSync(OUT, JSON.stringify(map, null, 2) + '\n');
console.log('wrote', OUT, 'entries:', Object.keys(map).length);
