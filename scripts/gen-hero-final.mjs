/**
 * ساخت هیرو یکتا (بایت‌های متفاوت از عکس بلاگ برای پرهیز از تداخل هش Next)
 * اجرا: node scripts/gen-hero-final.mjs
 */
import sharp from 'sharp';

const out = await sharp('public/images/blog/appliance-technician.webp')
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 86 })
  .toFile('src/assets/hero-banner-new.webp');

console.log('نیو هیرو:', out.width + 'x' + out.height, `${Math.round(out.size / 1024)}KB`);
