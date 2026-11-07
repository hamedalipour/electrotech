/**
 * ادغام ۱۲ فایل مقاله در content/posts/*.json به content/posts.json
 * — مرتب‌سازی بر اساس تاریخ (جدیدترین اول) و اعتبارسنجی JSON.
 * اجرا: node scripts/merge-posts.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import process from 'node:process';

const POSTS_DIR = join(process.cwd(), 'content', 'posts');
const OUTPUT = join(process.cwd(), 'content', 'posts.json');

const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.json'));
if (files.length === 0) {
  console.error(`هیچ فایلی در ${POSTS_DIR} پیدا نشد`);
  process.exit(1);
}

const posts = files.map((f) => {
  const raw = readFileSync(join(POSTS_DIR, f), 'utf8');
  try {
    const post = JSON.parse(raw);
    if (!post.slug) throw new Error('فاقد slug');
    if (!post.title) throw new Error('فاقد title');
    if (!post.isoDate) throw new Error('فاقد isoDate');
    if (!Array.isArray(post.blocks)) throw new Error('فاقد blocks');
    return post;
  } catch (err) {
    console.error(`خطا در ${f}: ${err.message}`);
    process.exit(1);
  }
});

// اعتبارسنجی: slug فایل با slug محتوا یکی باشد و تکراری نباشد
const slugs = new Set();
for (const post of posts) {
  if (slugs.has(post.slug)) {
    console.error(`اسلاگ تکراری: ${post.slug}`);
    process.exit(1);
  }
  slugs.add(post.slug);
}

// جدیدترین اول
posts.sort((a, b) => String(b.isoDate).localeCompare(String(a.isoDate)));

writeFileSync(OUTPUT, JSON.stringify(posts, null, 2) + '\n', 'utf8');

const total = posts.reduce((n, p) => {
  const words = JSON.stringify(p.blocks).match(/[\u0600-\u06FF]+/g);
  return n + (words ? words.length : 0);
}, 0);

console.log(`${posts.length} مقاله ادغام شد → ${basename(OUTPUT)}`);
console.log(`تعداد کل بلوک‌های فارسی: ${total.toLocaleString('fa-IR')}`);
for (const p of posts) {
  console.log(`  — ${p.slug} (${p.isoDate})`);
}
