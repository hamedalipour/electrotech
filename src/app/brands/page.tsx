import { brands } from '@/data/brands';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/SectionHeading';
import { BrandCard } from '@/components/Cards';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'تعمیر لوازم خانگی دوو و اسنوا در تهران | سایر برندها',
  description:
    'تعمیر تخصصی لوازم خانگی دوو و اسنوا در تهران با گارانتی کتبی؛ به‌همراه هایسنس، ال‌جی، سامسونگ، بوش، آریستون، زیمنس، پاکشوما، جی‌پلاس، بکو و سایر برندها.',
  path: '/brands/',
  keywords: [
    'تعمیر لوازم خانگی دوو',
    'تعمیر لوازم خانگی اسنوا',
    'تعمیر لوازم خانگی هایسنس',
    'تعمیر لوازم خانگی دوو و اسنوا',
    'تعمیر لوازم خانگی دوو و اسنوا در تهران',
  ],
});

export default function BrandsPage() {
  return (
    <>
      <PageHero
        title="تعمیر تخصصی لوازم خانگی دوو و اسنوا"
        description="دوو و اسنوا تخصص اصلی کارگاه ما هستند؛ ایرادهای رایج و هزینه تعمیر هر برند را در صفحه خودش ببینید. سایر برندها هم با همان تجهیزات و گارانتی پوشش داده می‌شوند."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((b) => (
            <BrandCard key={b.slug} brand={b} />
          ))}
        </div>
      </section>
      <div className="pb-16">
        <CTASection title="برند دستگاه شما در لیست نیست؟" description="برای همه برندهای رایج و حتی کمتر شناخته‌شده بازار ایران خدمات داریم؛ مدل را در بله بفرستید تا بررسی کنیم." />
      </div>
    </>
  );
}