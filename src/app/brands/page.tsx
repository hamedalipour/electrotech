import Link from 'next/link';
import { brands } from '@/data/brands';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/SectionHeading';
import { BrandCard } from '@/components/Cards';
import { CTASection } from '@/components/CTASection';

const brandServiceLinks = [
  { label: 'تعمیر لباسشویی ال جی', href: '/services/washer-lg/' },
  { label: 'تعمیر لباسشویی سامسونگ', href: '/services/washer-samsung/' },
  { label: 'تعمیر لباسشویی بوش', href: '/services/washer-bosch/' },
  { label: 'تعمیر لباسشویی پاکشوما', href: '/services/washer-pakshoma/' },
  { label: 'تعمیر برد لوازم خانگی', href: '/services/board/' },
  { label: 'شارژ گاز یخچال', href: '/services/gas-charge/' },
  { label: 'تعمیر کمپرسور یخچال', href: '/services/compressor/' },
];

export const metadata = buildMetadata({
  title: 'تعمیر لوازم خانگی همه برندها در تهران',
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
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl bg-slate-50 p-6 sm:p-8">
          <h2 className="text-lg font-extrabold text-brand-950">تعمیر برندمحور یا تعمیر عمومی؟</h2>
          <p className="mt-3 max-w-3xl leading-8 text-slate-600">
            بعضی خرابی‌ها الگوی برند دارند: کدهای خطای ال جی و سامسونگ، حساسیت برد بوش و زیمنس، یا
            قطعات فراوان پاکشوما و اسنوا. صفحه هر برند ایرادهای رایج همان دستگاه را نشان می‌دهد؛ اگر
            مشکل شما مشخص است، از صفحات تخصصی زیر مستقیم‌تر شروع کنید.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {brandServiceLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="pb-16">
        <CTASection title="برند دستگاه شما در لیست نیست؟" description="برای همه برندهای رایج و حتی کمتر شناخته‌شده بازار ایران خدمات داریم؛ مدل را در بله بفرستید تا بررسی کنیم." />
      </div>
    </>
  );
}