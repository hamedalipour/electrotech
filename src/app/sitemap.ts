import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { services, servicePriority } from '@/data/services';
import { brands, featuredBrandSlugs } from '@/data/brands';
import { areas } from '@/data/areas';
import { posts } from '@/data/posts';

/** برای سازگاری با output: 'export' */
export const dynamic = 'force-static';

/**
 * حالت تمرکز نقشه سایت — غیرفعال.
 *
 * وقتی FOCUS_MODE=true باشد فقط صفحات پول‌ساز در sitemap می‌آیند و بقیه از
 * هاب‌های داخلی کشف می‌شوند. این حالت برای دامنه‌ی خیلی تازه با بودجه‌ی خزش نزدیک
 * به صفر طراحی شده بود. اکنون که کتابخانه محتوا کامل شده، همه‌ی URLها باید در
 * نقشه‌ی سایت باشند تا گوگل همه را سریع‌تر کشف و ایندکس کند. برای بازگردانی حالت
 * تمرکز فقط همین مقدار را true کنید.
 */
const FOCUS_MODE = false;

/** صفحات ثابتی که در حالت تمرکز باقی می‌مانند */
const FOCUS_STATIC = new Set([
  '',
  'services/',
  'prices/',
  'areas/',
  'brands/',
  'blog/',
  'contact/',
  'about/',
  'faq/',
]);

/** خدمت‌هایی با بالاترین اولویت تجاری (۱۰ صفحه‌ی پول‌ساز + ۳ خدمت پرتقاضا) */
const FOCUS_SERVICES = new Set([
  'washer',
  'refrigerator',
  'dishwasher',
  'board',
  'gas-charge',
  'compressor',
  'washer-lg',
  'washer-samsung',
  'washer-service',
]);

/** برند، منطقه و مقاله‌ای که گوگل از قبل می‌شناسد — نقطه‌ی شروع برای اعتبار داخلی */
const FOCUS_BRANDS = new Set(['daewoo', 'snowa']);
const FOCUS_AREAS = new Set(['tajrish']);
const FOCUS_POSTS = new Set(['washer-lg-oe-error']);

/**
 * lastmod صفحات ایستا (خدمات، برندها، مناطق، صفحات ثابت).
 *
 * قبلاً این تاریخ هاردکد بود و با تغییر محتوا به‌روز نمی‌شد؛ یعنی lastmod دروغ می‌گفت
 * و Google آن را نادیده می‌گرفت. حالا از جدیدترین تاریخ به‌روزرسانی مقالات
 * (content/posts.json) خوانده می‌شود تا هر بار که محتوا دست بخورد، سیگنال واقعی بدهد.
 */
const STATIC_BASELINE = new Date('2026-09-26T12:00:00.000Z');

/** جدیدترین تاریخ به‌روزرسانی بین همه مقالات — مبنای lastmod صفحات ایستا */
const latestPostUpdate = posts
  .map((p) => p.dateUpdated ?? p.isoDate)
  .sort()
  .at(-1);

const CONTENT_LAST_MODIFIED = new Date(
  Math.max(
    STATIC_BASELINE.getTime(),
    new Date(latestPostUpdate ?? STATIC_BASELINE).getTime(),
  ),
);

/** نگه‌داشتن یک آیتم فقط اگر در حالت تمرکز مجاز باشد */
function keep(set: Set<string>, value: string): boolean {
  return !FOCUS_MODE || set.has(value);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: 'services/', priority: 0.9, changeFrequency: 'monthly' },
    { path: 'brands/', priority: 0.8, changeFrequency: 'monthly' },
    { path: 'areas/', priority: 0.8, changeFrequency: 'monthly' },
    { path: 'prices/', priority: 0.9, changeFrequency: 'monthly' },
    { path: 'blog/', priority: 0.8, changeFrequency: 'weekly' },
    { path: 'faq/', priority: 0.6, changeFrequency: 'monthly' },
    { path: 'about/', priority: 0.5, changeFrequency: 'yearly' },
    { path: 'contact/', priority: 0.7, changeFrequency: 'yearly' },
    { path: 'terms/', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return [
    ...staticEntries(),
    ...services
      .filter((s) => keep(FOCUS_SERVICES, s.slug))
      .map((s) =>
        entry(`/services/${s.slug}/`, servicePriority[s.slug] ?? 0.7, CONTENT_LAST_MODIFIED),
      ),
    // برندهای تخصصی سایت (دوو و اسنوا) اولویت بالاتری در نقشه سایت دارند
    ...brands
      .filter((b) => keep(FOCUS_BRANDS, b.slug))
      .map((b) =>
        entry(
          `/brands/${b.slug}/`,
          featuredBrandSlugs.includes(b.slug) ? 0.9 : 0.7,
          CONTENT_LAST_MODIFIED,
        ),
      ),
    ...areas
      .filter((a) => keep(FOCUS_AREAS, a.slug))
      .map((a) => entry(`/areas/${a.slug}/`, 0.8, CONTENT_LAST_MODIFIED)),
    ...posts
      .filter((p) => keep(FOCUS_POSTS, p.slug))
      .map((p) => entry(`/blog/${p.slug}/`, 0.6, new Date(p.dateUpdated ?? p.isoDate))),
  ];

  function entry(path: string, priority: number, lastModified: Date = CONTENT_LAST_MODIFIED) {
    return {
      url: `${siteConfig.url}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
    };
  }

  function staticEntries() {
    return staticPages
      .filter((p) => keep(FOCUS_STATIC, p.path))
      .map((p) => ({
        url: `${siteConfig.url}/${p.path}`,
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: p.changeFrequency,
        priority: p.priority,
      }));
  }
}
