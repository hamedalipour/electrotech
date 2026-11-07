/**
 * ساخت واریانت‌های ۷۶۸ و ۱۰۸۰ از عکس‌های واقعی جدید بلاگ (از فایل پایه)
 * اجرا: node scripts/gen-blog-variants.mjs
 */
import sharp from 'sharp';
import { existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'public/images/blog';
const canons = ['appliance-technician.webp', 'fridge-repair-service.webp', 'dishwasher-service.webp'];

// فایل‌های زائد (نام غلط / دانلود قدیمی)
const junk = ['fridge-repair-service-10801.webp', 'Max_a__img_sizes=_(max-wid (4)_11zon.webp', 'appliance-technician-1080-768.webp'];
for (const f of junk) {
  const p = join(DIR, f);
  if (existsSync(p)) { unlinkSync(p); console.log('حذف شد ✓', f); }
}

for (const file of canons) {
  const base = join(DIR, file);
  const name = file.replace('.webp', '');
  const meta = await sharp(base).metadata();
  const fig = (w) => w >= meta.width ? { width: meta.width } : { width: w };
  for (const w of [768, 1080]) {
    const out = join(DIR, `${name}-${w}.webp`);
    const opts = fig(w);
    await sharp(base).resize({ ...opts, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    const om = await sharp(out).metadata();
    console.log(`${name}-${w}.webp`, `${om.width}x${om.height}`, `${Math.round(om.size / 1024)}KB`);
  }
  console.log(`پایه ${file}: ${meta.width}x${meta.height}`);
}
