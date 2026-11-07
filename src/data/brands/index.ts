import { daewooBrand } from './daewoo';
import { snowaBrand } from './snowa';
import { hisenseBrand } from './hisense';
import { lgBrand } from './lg';
import { samsungBrand } from './samsung';
import { boschBrand } from './bosch';
import { aristonBrand } from './ariston';
import { siemensBrand } from './siemens';
import { pakshomaBrand } from './pakshoma';
import { gplusBrand } from './gplus';
import { bekoBrand } from './beko';
import { electroluxBrand } from './electrolux';
import { mideaBrand } from './midea';
import { panasonicBrand } from './panasonic';
import { toshibaBrand } from './toshiba';
import { indesitBrand } from './indesit';
import { kenwoodBrand } from './kenwood';
import { geBrand } from './ge';
import { xvizionBrand } from './xvizion';
import type { Brand } from './types';

/** برندهای بازار لوازم خانگی تهران — ترتیب لیست = ترتیب اولویت سئو */
export const brands: Brand[] = [
  daewooBrand,
  snowaBrand,
  hisenseBrand,
  lgBrand,
  samsungBrand,
  boschBrand,
  aristonBrand,
  siemensBrand,
  pakshomaBrand,
  gplusBrand,
  bekoBrand,
  electroluxBrand,
  mideaBrand,
  panasonicBrand,
  toshibaBrand,
  indesitBrand,
  kenwoodBrand,
  geBrand,
  xvizionBrand,
];

/** تخصص اصلی الکتروتچ: دوو و اسنوا — نمایش ویژه در صفحه اصلی و اولویت sitemap */
export const featuredBrandSlugs = ['daewoo', 'snowa'];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

/** سوالات متداول برند — اختصاصی اگر تعریف شده باشد، وگرنه جنریک با نام برند */
export function getBrandFaqs(brand: Brand): { q: string; a: string }[] {
  if (brand.faqs?.length) return brand.faqs;
  return [
    {
      q: `هزینه تعمیر لوازم خانگی ${brand.name} چقدر است؟`,
      a: 'هزینه بسته به نوع خرابی و دستگاه متفاوت است؛ تعمیر قطعات ساده مثل پمپ تخلیه و ترموستات از حدود ۸۰۰ هزار تومان و ترمیم برد کنترل از ۱.۵ میلیون تومان شروع می‌شود. هزینه قطعی پس از عیب‌یابی و با تأیید شما نهایی می‌شود.',
    },
    {
      q: `تعمیر ${brand.name} در محل انجام می‌شود؟`,
      a: `بله؛ تکنسین با تجهیزات تست به خانه شما اعزام می‌شود و بیشتر تعمیرات — از تعمیر برد و پمپ تا تعویض هیتر و المنت — همان‌جا انجام می‌شود و دستگاه جابه‌جا نمی‌شود.`,
    },
    {
      q: `برای ${brand.name} گارانتی می‌دهید؟`,
      a: 'بله؛ همه تعمیرات با گارانتی کتبی ۳ ماهه و فاکتور رسمی تحویل می‌شود و اگر همان مشکل برگردد، مجدد رایگان رفع می‌شود.',
    },
  ];
}

export type { Brand } from './types';
