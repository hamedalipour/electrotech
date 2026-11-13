import Link from 'next/link';
import { services } from '@/data/services';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/Cards';
import { FaqAccordion } from '@/components/FaqAccordion';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'خدمات تعمیر لوازم خانگی در تهران',
  description:
    'فهرست کامل خدمات تعمیر لوازم خانگی در تهران: لباسشویی، یخچال، ظرفشویی، خشک‌کن، اجاق گاز، تعمیر برد، شارژ گاز و کمپرسور در محل با گارانتی کتبی.',
  path: '/services/',
});

const hubFaqs = [
  {
    q: 'هزینه عیب‌یابی چقدر است و چه زمانی کسر می‌شود؟',
    a: 'عیب‌یابی بازه مشخصی دارد و در صورت انجام تعمیر، از مبلغ نهایی کسر می‌شود. مبلغ پیش از شروع کار اعلام و با تأیید شما نهایی می‌شود.',
  },
  {
    q: 'همه خدمات در محل انجام می‌شود؟',
    a: 'بیشتر تعمیرها در محل انجام می‌شود. کارهای سنگین مثل تعویض بلبرینگ یا برخی تعمیرهای برد به کارگاه نیاز دارد؛ در این حالت دستگاه بسته‌بندی و پس از تعمیر با گارانتی تحویل داده می‌شود.',
  },
  {
    q: 'گارانتی تعمیرات چند ماه است؟',
    a: 'همه تعمیرات با فاکتور رسمی و ۳ ماه گارانتی کتبی انجام می‌شود. اگر مشکل در این بازه برگردد، بررسی مجدد رایگان است.',
  },
  {
    q: 'اگر ندانم دستگاه چه مشکلی دارد چه کنم؟',
    a: 'نیازی نیست نوع خرابی را بدانید. مدل دستگاه و علامتی که مشاهده می‌کنید را بگویید؛ تکنسین در بازدید علت را تست و هزینه را شفاف اعلام می‌کند.',
  },
];

export default function ServicesPage() {
  const mainServices = services.slice(0, 7);
  const specialized = services.slice(7);

  return (
    <>
      <PageHero
        title="خدمات تعمیرات تخصصی لوازم خانگی"
        description="صفحه اختصاصی هر خدمت شامل علائم خرابی، مراحل کار، بازه هزینه و سوالات متداول است. از تعمیر برد و شارژ گاز یخچال تا سرویس لباسشویی و صفحات تخصصی برندها."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="max-w-3xl leading-8 text-slate-600">
          تعمیر لوازم خانگی وقتی درست انجام می‌شود که اول علت خرابی تست شود، بعد قطعه تعویض گردد. در
          الکتروتچ هر خدمت مسیر مشخصی دارد: عیب‌یابی در محل، اعلام هزینه قطعی، تعمیر با قطعه سازگار و
          تحویل با گارانتی کتبی. اگر نمی‌دانید مشکل دستگاه شما جزو کدام دسته است، از{' '}
          <Link href="/services/washer/" className="font-bold text-brand-700 underline decoration-accent-400 underline-offset-4">
            تعمیر لباسشویی
          </Link>{' '}
          یا{' '}
          <Link href="/services/refrigerator/" className="font-bold text-brand-700 underline decoration-accent-400 underline-offset-4">
            تعمیر یخچال
          </Link>{' '}
          شروع کنید؛ صفحات تخصصی‌تر مثل{' '}
          <Link href="/services/board/" className="font-bold text-brand-700 underline decoration-accent-400 underline-offset-4">
            تعمیر برد
          </Link>{' '}
          و{' '}
          <Link href="/services/gas-charge/" className="font-bold text-brand-700 underline decoration-accent-400 underline-offset-4">
            شارژ گاز یخچال
          </Link>{' '}
          هم جزئیات و بازه هزینه را نشان می‌دهند.
        </p>

        <h2 className="mt-10 text-xl font-extrabold text-brand-950">خدمات اصلی</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mainServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>

        <h2 className="mt-12 text-xl font-extrabold text-brand-950">خدمات تخصصی و برندمحور</h2>
        <p className="mt-3 max-w-3xl leading-8 text-slate-600">
          این صفحات برای خرابی‌های مشخص و مدل‌های پرتقاضا نوشته شده‌اند: تعمیر برد در سطح قطعه، شارژ
          گاز با نشتی‌یابی، تعمیر کمپرسور و سرویس تخصصی لباسشویی برندهای ال جی، سامسونگ، بوش و پاکشوما.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialized.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>

        <h2 className="mt-12 text-xl font-extrabold text-brand-950">سوالات متداول خدمات</h2>
        <div className="mt-6">
          <FaqAccordion faqs={hubFaqs} withSchema title="سوالات متداول خدمات الکتروتچ" />
        </div>
      </section>
      <div className="pb-16">
        <CTASection
          title="نمی‌دانید مشکل از کجاست؟ عیب‌یابی می‌کنیم"
          description="نیازی نیست نوع خرابی را بدانید؛ تکنسین با تجهیزات تست، علت واقعی را مشخص و هزینه را شفاف اعلام می‌کند."
        />
      </div>
    </>
  );
}
