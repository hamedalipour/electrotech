/**
 * تبدیل هویت پیش‌فرض «الکتروتچ (تعمیر لوازم خانگی)» به «الکتروتچ (تعمیر لوازم خانگی)»
 * روی فایل‌های src، content و admin — فقط حدود مشخص که با متن‌های تازه بازنویسی نمی‌شوند.
 */
import { readFileSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'); // handle windows path

const TARGETS = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (['node_modules', '.next', 'out', '.git'].includes(name)) continue;
      walk(full);
    } else if (['.tsx', '.ts', '.json', '.html', '.md', '.mjs'].includes(extname(name))) {
      if (name === 'package-lock.json' || name === 'package.json') continue;
      TARGETS.push(full);
    }
  }
}

walk(join(ROOT, 'src'));
walk(join(ROOT, 'content'));
walk(join(ROOT, 'admin'));
walk(join(ROOT, 'scripts'));

const extra = [
  join(ROOT, 'README.md'),
  join(ROOT, 'server.mjs'),
  join(ROOT, 'next.config.mjs'),
  join(ROOT, 'railway.json'),
];
TARGETS.push(...extra.filter((f) => { try { return statSync(f).isFile(); } catch { return false; } }));

/** ترتیب مهم است: عبارت‌های طولانی‌تر اول */
const rules = [
  ['تعمیر تخصصی لوازم خانگی ال‌جی و اسنوا', 'تعمیر تخصصی لوازم خانگی ال‌جی و اسنوا'],
  ['تعمیر لوازم خانگی ال‌جی و اسنوا', 'تعمیر لوازم خانگی ال‌جی و اسنوا'],
  ['لوازم خانگی‌های ال‌جی و اسنوا', 'لوازم خانگی‌های ال‌جی و اسنوا'],
  ['ال‌جی و اسنوا', 'ال‌جی و اسنوا'],
  ['لوازم خانگی ال‌جی', 'لوازم خانگی ال‌جی'],
  ['ال‌جی', 'ال‌جی'],
  ['تعویض هیتر', 'تعویض هیتر'],
  ['تعویض هیتر', 'تعویض هیتر'],
  ['هیتر', 'هیتر'],
  ['هیتر', 'هیتر'],
  ['لوازم خانگی', 'لوازم خانگی'],
  ['تعمیر بردهای لوازم خانگی', 'تعمیر بردهای لوازم خانگی'],
  ['برد کنترل', 'برد کنترل'],
  ['الکتروتچ', 'الکتروتچ'],
  ['الکتروتچ', 'الکتروتچ'],
  ['electrotechco.ir', 'electrotechco.ir'],
  ['electrotechco', 'electrotechco'],
  ['برند دستگاه', 'برند دستگاه'],
  ['مدل دستگاه', 'مدل دستگاه'],
  ['مشکل دستگاه', 'مشکل دستگاه'],
  ['مشکل دستگاه‌تان', 'مشکل دستگاه‌تان'],
];

let changed = [];
for (const file of TARGETS) {
  let text = readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of rules) text = text.split(from).join(to);
  if (text !== before) {
    writeFileSync(file, text, 'utf8');
    changed.push(file);
  }
}

console.log(`Changed ${changed.length} files:`);
for (const f of changed) console.log(' -', f.replace(ROOT, ''));