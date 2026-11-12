import Link from 'next/link';
import { PriceTable } from '@/components/PriceTable';
import { buildMetadata } from '@/lib/seo';
import { PageHero, SectionHeading } from '@/components/SectionHeading';
import { CTASection } from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { getPricesSchema } from '@/lib/schema';
import { allFaqs } from '@/data/faqs';

export const metadata = buildMetadata({
  title: 'هزینه تعمیر لوازم خانگی ۱۴۰۵ — جدول قیمت',
  description:
    'هزینه تعمیر لوازم خانگی در تهران ۱۴۰۵ به تومان — پمپ تخلیه و ترموستات از ۹۰۰ هزار، برد و هیتر تا چند میلیون؛ قیمت قطعی بعد از عیب‌یابی.',
  keywords: ['هزینه تعمیر لوازم خانگی', 'قیمت تعمیر لوازم خانگی', 'تعرفه تعمیرات لوازم خانگی', 'هزینه تعمیر لباسشویی'],
  path: '/prices/',
});

export default function PricesPage() {
  return (
    <>
      <JsonLd data={getPricesSchema()} />
      <PageHero
        title="هزینه تعمیر لوازم خانگی در ۱۴۰۵"
        description="بازه‌های قیمت سال ۱۴۰۵ به تومان. قیمت قطعی پس از عیب‌یابی و قبل از شروع تعمیر، با تأیید شما نهایی می‌شود؛ هیچ هزینه پنهانی وجود ندارد."
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <PriceTable />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-extrabold text-brand-950">هزینه تعمیر لباسشویی و ظرفشویی در ۱۴۰۵</h2>
          <p className="mt-3 text-sm leading-8 text-slate-600">
            پرتکرارترین تعمیرها: پمپ تخلیه و رشته کربنی لباسشویی از حدود ۹۰۰ هزار تومان، هیتر ظرفشویی
            و ترموستات از حدود ۱.۱ میلیون تومان، برد کنترل و بلبرینگ لباسشویی در بازه ۲ تا ۴ میلیون.
            اگر مشکل الکترونیک‌تر باشد (سنسور، برد)، تعمیر برد از تعویض کامل ارزان‌تر است —
            تست دستگاه در محل مشخص می‌کند کدام مورد است.
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm font-bold text-brand-700">
            <li><Link href="/blog/appliance-repair-prices-tehran/" className="underline decoration-accent-400 underline-offset-4">جدول تعرفه تعمیر لوازم خانگی در تهران ۱۴۰۵</Link></li>
            <li><Link href="/blog/washer-no-drain/" className="underline decoration-accent-400 underline-offset-4">لباسشویی آب را تخلیه نمی‌کند؛ ۵ علت شایع</Link></li>
            <li><Link href="/services/washer/" className="underline decoration-accent-400 underline-offset-4">خدمت تعمیر ماشین لباسشویی در محل</Link></li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <SectionHeading eyebrow="سوالات هزینه" title="پرسش‌های رایج درباره هزینه‌ها" />
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
          <ul className="flex flex-col gap-5">
            {allFaqs.slice(5, 9).map((f) => (
              <li key={f.q} className="border-b border-slate-100 pb-4 last:border-0">
                <h3 className="font-extrabold text-brand-950">{f.q}</h3>
                <p className="mt-2 text-sm leading-8 text-slate-600">{f.a}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/faq/" className="font-bold text-brand-600">همه سوالات متداول ←</Link>
        </p>
      </section>

      <div className="pb-16">
        <CTASection title="قیمت دقیق تعمیر لوازم خانگی خود را همین حالا بگیرید" />
      </div>
    </>
  );
}