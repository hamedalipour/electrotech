/**
 * تولید تصاویر بلاگ به‌صورت وکتور برندشده (SVG → WebP با sharp)
 * — جایگزین محلی برای تولید تصویر هوش مصنوعی؛ در صورت تمدید اعتبار
 *   می‌توان بعداً با عکس واقعی جایگزین کرد (همین نام فایل‌ها حفظ شود).
 * اجرا: node scripts/gen-blog-images.mjs
 */
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'images', 'blog');
mkdirSync(outDir, { recursive: true });

const W = 1600, H = 900;

/** زمینه مشترک: گرادیان سرمه‌ای + شبکه نقطه‌ای ظریف */
const base = (inner) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f1f3d"/>
      <stop offset="0.55" stop-color="#152a52"/>
      <stop offset="1" stop-color="#0a1428"/>
    </linearGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f8fbff"/>
      <stop offset="1" stop-color="#cdd8ea"/>
    </linearGradient>
    <linearGradient id="amber" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fbbf24"/>
      <stop offset="1" stop-color="#f59e0b"/>
    </linearGradient>
    <pattern id="dots" width="46" height="46" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="#3b5b96" opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  ${inner}
</svg>`;

/** آذرخش کهربایی (مونوگرام الکتروتچ) */
const bolt = (x, y, s) => `
<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M0 0 H16 L6 20 H14 L-6 52 L0 28 H-8 Z"
        fill="url(#amber)" stroke="#0a1428" stroke-width="2" stroke-linejoin="round"/>
</g>`;

const circleBg = (cx, cy, r) => `
<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1d3a6b" opacity="0.55"/>
<circle cx="${cx}" cy="${cy}" r="${r + 26}" fill="none" stroke="#3371f6" stroke-opacity="0.35" stroke-width="3" stroke-dasharray="14 18"/>`;

const badge = (x, y) => `
<g transform="translate(${x} ${y})">
  <rect x="0" y="0" width="120" height="120" rx="30" fill="#173fd8"/>
  ${bolt(52, 10, 1.15)}
</g>`;

/** یک: ماشین لباسشویی + تکنسین (چراغ‌قوه نداریم؛ مولتی‌متر) */
const washerSVG = base(`
  ${circleBg(1075, 470, 330)}
  ${badge(120, 130)}

  <!-- بدنه لباسشویی -->
  <g transform="translate(760 180)">
    <rect x="0" y="0" width="570" height="600" rx="38" fill="url(#steel)"/>
    <rect x="0" y="0" width="570" height="600" rx="38" fill="none" stroke="#9fb3d0" stroke-width="4"/>
    <rect x="40" y="42" width="490" height="120" rx="22" fill="#0f1f3d"/>
    <circle cx="472" cy="102" r="34" fill="url(#amber)"/>
    <path d="M472 78 l16 26 h-16 l12 24 l-32 -34 h12 z" fill="#0a1428"/>
    <rect x="70" y="76" width="180" height="14" rx="7" fill="#3371f6" opacity="0.9"/>
    <rect x="70" y="108" width="110" height="14" rx="7" fill="#5997fa" opacity="0.7"/>
    <!-- درام -->
    <circle cx="285" cy="400" r="170" fill="#e9eff7" stroke="#aabdd8" stroke-width="6"/>
    <circle cx="285" cy="400" r="128" fill="#ffffff" stroke="#c3d2e6" stroke-width="5"/>
    <circle cx="285" cy="400" r="92" fill="#d9e8fe"/>
    <path d="M200 372 q85 -70 170 0" fill="none" stroke="#8ebdfd" stroke-width="7" stroke-linecap="round" opacity="0.85"/>
    <path d="M214 420 q70 -48 142 0" fill="none" stroke="#8ebdfd" stroke-width="7" stroke-linecap="round" opacity="0.6"/>
    <!-- پنل‌کشی و پایه -->
    <rect x="150" y="600" width="26" height="52" rx="10" fill="#7c92b4"/>
    <rect x="394" y="600" width="26" height="52" rx="10" fill="#7c92b4"/>
  </g>

  <!-- مولتی‌متر -->
  <g transform="translate(1382 640) rotate(8)">
    <rect x="0" y="0" width="96" height="140" rx="20" fill="#173fd8" stroke="#0a1428" stroke-width="5"/>
    <rect x="18" y="18" width="60" height="42" rx="9" fill="#9ff2c8"/>
    <circle cx="48" cy="96" r="24" fill="#fcd34d"/>
    <rect x="4" y="132" width="10" height="52" rx="5" fill="#d97706"/>
    <rect x="82" y="132" width="10" height="52" rx="5" fill="#e63946"/>
  </g>

  <!-- آچار و پیچ‌گوشتی متقاطع -->
  <g transform="translate(660 700) rotate(-18)">
    <rect x="0" y="0" width="230" height="26" rx="13" fill="#f8fbff" stroke="#90a6c6" stroke-width="3"/>
    <rect x="30" y="-20" width="34" height="66" rx="10" fill="url(#amber)"/>
  </g>
  <g transform="translate(560 640) rotate(-25)">
    <rect x="0" y="0" width="240" height="24" rx="12" fill="#e63946"/>
    <rect x="0" y="-16" width="66" height="56" rx="12" fill="#0f1f3d"/>
  </g>
`);

/** دو: یخچال ساید بای ساید */
const fridgeSVG = base(`
  ${circleBg(1035, 480, 320)}
  ${badge(120, 130)}

  <g transform="translate(720 120)">
    <rect x="0" y="0" width="480" height="720" rx="30" fill="url(#steel)" stroke="#9fb3d0" stroke-width="4"/>
    <line x1="240" y1="14" x2="240" y2="706" stroke="#8ea4c6" stroke-width="4"/>
    <!-- در چپ -->
    <rect x="26" y="60" width="188" height="180" rx="16" fill="#e5edf8" stroke="#c3d2e6" stroke-width="3"/>
    <rect x="52" y="86" width="136" height="92" rx="10" fill="#0f1f3d" opacity="0.08"/>
    <rect x="196" y="150" width="10" height="150" rx="5" fill="#3371f6"/>
    <!-- دستگیره در چپ -->
    <rect x="206" y="120" width="14" height="230" rx="7" fill="#5997fa"/>
    <!-- در راست با دیسپنسر -->
    <rect x="266" y="60" width="188" height="300" rx="16" fill="#e5edf8" stroke="#c3d2e6" stroke-width="3"/>
    <rect x="296" y="96" width="76" height="120" rx="14" fill="#0f1f3d"/>
    <rect x="322" y="140" width="24" height="34" rx="6" fill="#9ff2c8"/>
    <rect x="344" y="90" width="14" height="230" rx="7" fill="#5997fa"/>
    <!-- بخش پایین -->
    <rect x="26" y="382" width="428" height="318" rx="20" fill="#e9eff7" stroke="#c3d2e6" stroke-width="3"/>
    <rect x="206" y="420" width="14" height="250" rx="7" fill="#5997fa"/>
  </g>

  <!-- جیج فشار گاز -->
  <g transform="translate(1300 240) rotate(10)">
    <circle cx="0" cy="0" r="86" fill="#f8fbff" stroke="#90a6c6" stroke-width="6"/>
    <path d="M0 0 L52 -34" stroke="#e63946" stroke-width="9" stroke-linecap="round"/>
    <circle cx="0" cy="0" r="12" fill="#0f1f3d"/>
    <circle cx="0" cy="0" r="96" fill="none" stroke="#fbbf24" stroke-width="5" opacity="0"/>
    <rect x="-18" y="86" width="36" height="88" rx="14" fill="#173fd8" stroke="#0a1428" stroke-width="4"/>
  </g>

  <!-- اسپارک مشعل -->
  <g transform="translate(1250 660)">
    ${bolt(0, 0, 1.6)}
  </g>

  <!-- جعبه‌چوب‌جهت: کادر پر کاربرد -->
  <g transform="translate(560 620)">
    <rect x="0" y="0" width="180" height="120" rx="20" fill="#173fd8"/>
    <path d="M52 22 c0 20 14 34 34 34 s34 -14 34 -34 z" fill="#d9e8fe"/>
    <rect x="64" y="56" width="52" height="30" rx="8" fill="#fbbf24"/>
  </g>
`);

/** سه: ظرفشویی با در باز */
const dishwasherSVG = base(`
  ${circleBg(1090, 470, 330)}
  ${badge(120, 130)}

  <!-- بازوی اسپری چرخان -->
  <g transform="translate(1080 250)">
    <circle cx="0" cy="0" r="54" fill="#0f1f3d"/>
    <g stroke="#8ebdfd" stroke-width="10" stroke-linecap="round">
      <line x1="0" y1="0" x2="150" y2="0"/>
      <line x1="0" y1="0" x2="-150" y2="0"/>
    </g>
    <circle cx="0" cy="0" r="18" fill="url(#amber)"/>
    <circle cx="150" cy="0" r="11" fill="#5997fa"/>
    <circle cx="-150" cy="0" r="11" fill="#5997fa"/>
  </g>

  <!-- بدنه و در باز ظرفشویی -->
  <g transform="translate(700 320)">
    <rect x="0" y="0" width="600" height="520" rx="30" fill="url(#steel)" stroke="#9fb3d0" stroke-width="4"/>
    <rect x="46" y="70" width="508" height="330" rx="20" fill="#0f1f3d"/>
    <circle cx="502" cy="120" r="34" fill="url(#amber)"/>
    <path d="M502 96 l16 26 h-16 l12 24 l-32 -34 h12 z" fill="#0a1428"/>
    <rect x="86" y="94" width="150" height="14" rx="7" fill="#3371f6" opacity="0.9"/>
    <rect x="86" y="126" width="100" height="14" rx="7" fill="#5997fa" opacity="0.7"/>
    <!-- ظروف داخل -->
    <g fill="#d9e8fe">
      <rect x="90" y="240" width="180" height="20" rx="10"/>
      <rect x="240" y="272" width="150" height="20" rx="10"/>
      <circle cx="470" cy="260" r="38" stroke="#8ebdfd" stroke-width="10" fill="none"/>
      <circle cx="360" cy="330" r="30" stroke="#8ebdfd" stroke-width="10" fill="none"/>
      <rect x="120" y="330" width="120" height="20" rx="10"/>
    </g>
    <!-- در بازه‌شده پایین -->
    <rect x="100" y="520" width="400" height="120" rx="18" fill="#e5edf8" stroke="#9fb3d0" stroke-width="4"/>
    <rect x="140" y="560" width="200" height="16" rx="8" fill="#aabdd8"/>
    <rect x="140" y="588" width="130" height="16" rx="8" fill="#aabdd8"/>
  </g>

  <!-- ستاره درخشش (تمیزی) -->
  <g fill="url(#amber)" transform="translate(560 300)">
    <path d="M0 -46 L12 -12 L46 0 L12 12 L0 46 L-12 12 L-46 0 L-12 -12 Z"/>
  </g>
  <g fill="#fcd34d" transform="translate(640 430)">
    <path d="M0 -28 L8 -8 L28 0 L8 8 L0 28 L-8 8 L-28 0 L-8 -8 Z"/>
  </g>

  <!-- نمک/قرص جلا -->
  <g transform="translate(1420 660)">
    <rect x="0" y="0" width="120" height="120" rx="26" fill="#173fd8" stroke="#0a1428" stroke-width="4"/>
    <circle cx="60" cy="60" r="30" fill="#f8fbff"/>
    <circle cx="60" cy="60" r="14" fill="#8ebdfd"/>
  </g>
`);

const jobs = [
  ['appliance-technician', washerSVG],
  ['fridge-repair-service', fridgeSVG],
  ['dishwasher-service', dishwasherSVG],
];

for (const [name, svg] of jobs) {
  const buf = Buffer.from(svg);
  await sharp(buf).webp({ quality: 88 }).toFile(join(outDir, `${name}.webp`));
  await sharp(buf).resize(1080).webp({ quality: 82 }).toFile(join(outDir, `${name}-1080.webp`));
  await sharp(buf).resize(768).webp({ quality: 80 }).toFile(join(outDir, `${name}-768.webp`));
  console.log(`${name}.webp (+1080, +768) ساخته شد`);
}
