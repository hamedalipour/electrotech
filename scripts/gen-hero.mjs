/**
 * تولید بنر هیرو جدید (سه‌گانه لوازم household) → src/assets/hero-banner.webp
 * ابعاد همان نسخه قبلی: 1280×722 — سبک روشن مطابق پس‌زمینه سفید هیرو.
 * اجرا: node scripts/gen-hero.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const W = 1280, H = 722;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f5f9ff"/>
      <stop offset="0.6" stop-color="#eaf2fd"/>
      <stop offset="1" stop-color="#e2ecfb"/>
    </linearGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#dbe6f4"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#e7f0fb"/>
    </linearGradient>
    <linearGradient id="amber" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fbbf24"/>
      <stop offset="1" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- لکه‌های نرم رنگی پس‌زمینه -->
  <circle cx="1090" cy="120" r="190" fill="#bcd7fe" opacity="0.55"/>
  <circle cx="150" cy="640" r="160" fill="#fcd34d" opacity="0.35"/>
  <circle cx="640" cy="60" r="90" fill="#3371f6" opacity="0.12"/>

  <!-- لوی لوگوی الکتروتچ -->
  <g transform="translate(84 64)">
    <rect x="0" y="0" width="96" height="96" rx="24" fill="#173fd8"/>
    <g transform="translate(30 8) scale(1.0)">
      <path d="M0 0 H18 L8 22 H16 L-4 56 L2 30 H-6 Z"
            fill="url(#amber)" stroke="#0a1428" stroke-width="2.5" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- (مهر گارانتی حذف شد — کارت گارانتی React روی تصویر قرار می‌گیرد) -->

  <!-- ===== یخچال دوقلو (سمت چپ) ===== -->
  <g transform="translate(80 170)">
    <rect x="0" y="480" width="70" height="26" rx="10" fill="#93a8c8"/>
    <rect x="330" y="480" width="70" height="26" rx="10" fill="#93a8c8"/>
    <!-- سایه محو پشت -->
    <rect x="14" y="16" width="440" height="480" rx="26" fill="#0f1f3d" opacity="0.10"/>
    <rect x="0" y="0" width="440" height="480" rx="26" fill="url(#steel)" stroke="#a8bdd9" stroke-width="4"/>
    <line x1="222" y1="10" x2="222" y2="470" stroke="#8ea4c6" stroke-width="4"/>
    <!-- در چپ: فریزر بالا + یخچال -->
    <rect x="22" y="34" width="178" height="150" rx="16" fill="#e9f1fb" stroke="#c3d2e6" stroke-width="3"/>
    <circle cx="150" cy="70" r="7" fill="#5997fa"/>
    <rect x="196" y="90" width="12" height="330" rx="6" fill="#5997fa"/>
    <rect x="36" y="210" width="164" height="246" rx="16" fill="#e9f1fb" stroke="#c3d2e6" stroke-width="3"/>
    <!-- در راست با دیسپنسر -->
    <rect x="240" y="34" width="178" height="200" rx="16" fill="#e9f1fb" stroke="#c3d2e6" stroke-width="3"/>
    <rect x="266" y="60" width="72" height="112" rx="14" fill="#0f1f3d"/>
    <rect x="292" y="96" width="20" height="30" rx="5" fill="#9ff2c8"/>
    <rect x="404" y="90" width="12" height="330" rx="6" fill="#5997fa"/>
    <rect x="240" y="260" width="178" height="196" rx="16" fill="#e9f1fb" stroke="#c3d2e6" stroke-width="3"/>
  </g>

  <!-- ===== ماشین لباسشویی (روبه‌رو راست، اصلی) ===== -->
  <g transform="translate(640 130)">
    <rect x="0" y="500" width="80" height="30" rx="12" fill="#93a8c8"/>
    <rect x="400" y="500" width="80" height="30" rx="12" fill="#93a8c8"/>
    <rect x="30" y="16" width="500" height="530" rx="30" fill="#0f1f3d" opacity="0.10"/>
    <rect x="0" y="0" width="500" height="530" rx="30" fill="url(#glass)" stroke="#a8bdd9" stroke-width="4"/>
    <!-- پنل -->
    <rect x="34" y="38" width="432" height="104" rx="22" fill="#0f1f3d"/>
    <circle cx="404" cy="90" r="30" fill="url(#amber)"/>
    <path d="M404 66 l16 26 h-16 l12 24 l-32 -34 h12 z" fill="#0a1428"/>
    <rect x="62" y="70" width="150" height="14" rx="7" fill="#3371f6" opacity="0.95"/>
    <rect x="62" y="100" width="96" height="14" rx="7" fill="#5997fa" opacity="0.75"/>
    <!-- درام بزرگ -->
    <circle cx="250" cy="330" r="158" fill="#eaf2fd" stroke="#aabdd8" stroke-width="6"/>
    <circle cx="250" cy="330" r="120" fill="#ffffff" stroke="#c3d2e6" stroke-width="5"/>
    <circle cx="250" cy="330" r="84" fill="#d9e8fe"/>
    <path d="M175 305 q75 -62 150 0" fill="none" stroke="#8ebdfd" stroke-width="7" stroke-linecap="round" opacity="0.9"/>
    <path d="M188 352 q62 -42 124 0" fill="none" stroke="#8ebdfd" stroke-width="7" stroke-linecap="round" opacity="0.65"/>
  </g>

  <!-- ===== ظرفشویی باز (لبه پایین وسط) ===== -->
  <g transform="translate(400 480)">
    <rect x="0" y="0" width="260" height="200" rx="24" fill="url(#glass)" stroke="#a8bdd9" stroke-width="4"/>
    <rect x="24" y="26" width="212" height="120" rx="16" fill="#0f1f3d"/>
    <rect x="44" y="120" width="0" height="0"/>
    <circle cx="204" cy="52" r="16" fill="url(#amber)"/>
    <rect x="44" y="52" width="90" height="10" rx="5" fill="#5997fa" opacity="0.8"/>
    <rect x="44" y="74" width="60" height="10" rx="5" fill="#8ebdfd" opacity="0.7"/>
    <!-- در بازه‌شده -->
    <rect x="60" y="200" width="200" height="86" rx="16" fill="#e9f1fb" stroke="#a8bdd9" stroke-width="4"/>
    <rect x="84" y="228" width="110" height="12" rx="6" fill="#aabdd8"/>
    <rect x="84" y="252" width="70" height="12" rx="6" fill="#aabdd8"/>
  </g>

  <!-- مولتی‌متر کوچک -->
  <g transform="translate(1120 470) rotate(10)">
    <rect x="0" y="0" width="84" height="122" rx="18" fill="#173fd8" stroke="#0a1428" stroke-width="4"/>
    <rect x="16" y="16" width="52" height="36" rx="8" fill="#9ff2c8"/>
    <circle cx="42" cy="82" r="20" fill="#fcd34d"/>
    <rect x="6" y="116" width="9" height="46" rx="4" fill="#d97706"/>
    <rect x="70" y="116" width="9" height="46" rx="4" fill="#e63946"/>
  </g>

  <!-- ستاره براق -->
  <g fill="#fbbf24" transform="translate(1180 200)">
    <path d="M0 -38 L10 -10 L38 0 L10 10 L0 38 L-10 10 L-38 0 L-10 -10 Z"/>
  </g>
  <g fill="#5997fa" transform="translate(540 90)">
    <path d="M0 -24 L6 -6 L24 0 L6 6 L0 24 L-6 6 L-24 0 L-6 -6 Z"/>
  </g>
</svg>
`;

const out = join('src', 'assets', 'hero-banner.webp');
const buf = Buffer.from(svg);
await sharp(buf).webp({ quality: 90 }).toFile(out);

writeFileSync(join('scripts', 'hero-banner.svg'), svg, 'utf8');
console.log('hero-banner.webp ساخته شد (1280×722)');
