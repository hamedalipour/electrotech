import { posts } from '@/data/posts';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/SectionHeading';
import { BlogCard } from '@/components/Cards';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'وبلاگ تعمیرات لوازم خانگی | راهنماها و نکات نگهداری',
  description:
    'مقالات و راهنماهای تعمیر لوازم خانگی: علت روشن نشدن، هزینه تعمیر، خرابی هیتر و برد کنترل و نکات افزایش عمر لوازم خانگی.',
  path: '/blog/',
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="وبلاگ تعمیرات لوازم خانگی"
        description="راهنماهای عملی برای شناخت علائم خرابی، تصمیم درست درباره تعمیر و نگهداری بهتر لوازم خانگی — نوشته تکنسین‌های کارگاه الکتروتچ."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
      <div className="pb-16">
        <CTASection title="مشکل دستگاه‌تان را در مقاله‌ها پیدا نکردید؟" description="با یک پیام در بله، عکس یا ویدیوی مشکل را بفرستید؛ تکنسین ما همان‌جا راهنمایی می‌کند." />
      </div>
    </>
  );
}