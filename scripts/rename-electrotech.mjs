/**
 * تغییر نام برند و واژه‌های قدیمی در سراسر پروژه:
 *  الکتروتچ → الکتروتچ
 *  قطعات هیتر و المنت → قطعات هیتر و المنت / هیتر → هیتر
 * اجرا: node scripts/rename-electrotech.mjs
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const SKIP = new Set(['node_modules', '.next', 'out', '.git']);
const EXT = /\.(tsx?|json|md|mjs|html|css|txt|xml|svg)$/;
const REPLACEMENTS = [
  ['الکتروتچ', 'الکتروتچ'],
  ['قطعات هیتر و المنت', 'قطعات هیتر و المنت'],
  ['هیتر', 'هیتر'],
];

let changed = 0;
function walk(dir) {
  for (const f of readdirSync(dir)) {
    if (SKIP.has(f)) continue;
    const p = join(dir, f);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) { walk(p); continue; }
    if (!EXT.test(f)) continue;
    const t = readFileSync(p, 'utf8');
    let next = t;
    for (const [from, to] of REPLACEMENTS) next = next.split(from).join(to);
    if (next !== t) {
      writeFileSync(p, next, 'utf8');
      process.stdout.write('✓ ' + p + '\n');
      changed++;
    }
  }
}

walk('.');
console.log(`فایل‌ها: ${changed}`);
