import Link from 'next/link';
import { areaGroups, areas } from '@/data/areas';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/SectionHeading';
import { AreaCard } from '@/components/Cards';
import { FaqAccordion } from '@/components/FaqAccordion';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'مناطق تحت پوشش تعمیر لوازم خانگی در تهران',
  description: `${areas.length.toLocaleString('fa-IR')} محله و منطقه تهران تحت پوشش اعزام تکنسین تعمیرات لوازم خانگی؛ با زمان اعزام مشخص و گارانتی کتبی.`,
  path: '/areas/',
});

const areaFaqs = [
  {
    q: 'زمان اعزام تکنسین چقدر است؟',
    a: 'بسته به منطقه و ترافیک، معمولاً بین ۳۰ دقیقه تا ۲ ساعت. زمان تقریبی هنگام ثبت درخواست و بر اساس نشانی شما اعلام می‌شود.',
  },
  {
    q: 'در همه محله‌های تهران خدمات می‌دهید؟',
    a: 'پوشش اصلی روی مناطق ۱ تا ۱۵ و محله‌های پرتراکم است. برای نقاط دیگر تهران هم با هماهنگی قبلی اعزام انجام می‌شود.',
  },
  {
    q: 'تعمیر در مجتمع‌ها و برج‌ها هم انجام می‌شود؟',
    a: 'بله؛ فقط هنگام ثبت درخواست شماره بلوک و محدودیت ورود به مجتمع یا پارکینگ را اعلام کنید تا هماهنگی درب انجام شود.',
  },
  {
    q: 'هزینه اعزام جدا از تعمیر است؟',
    a: 'هزینه اعزام و عیب‌یابی پیش از مراجعه اعلام می‌شود و در صورت انجام تعمیر، از مبلغ نهایی کسر می‌گردد.',
  },
];

export default function AreasPage() {
  return (
    <>
      <PageHero
        title="مناطق تحت پوشش تعمیر لوازم خانگی در تهران"
        description="تکنسین‌های ما در همه مناطق تهران اعزام دارند؛ زمان اعزام هر منطقه را در صفحه اختصاصی آن ببینید و درخواست را در چند ثانیه ثبت کنید."
      />
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12">
        <p className="max-w-3xl leading-8 text-slate-600">
          زمان رسیدن تکنسین به نوع دستگاه و ترافیک مسیر بستگی دارد، اما نزدیکی مرکز خدمات به غرب تهران
          باعث شده محله‌هایی مثل{' '}
          <Link href="/areas/gisha/" className="font-bold text-brand-700 underline decoration-accent-400 underline-offset-4">
            گیشا
          </Link>
          ،{' '}
          <Link href="/areas/ponak/" className="font-bold text-brand-700 underline decoration-accent-400 underline-offset-4">
            پونک
          </Link>{' '}
          و{' '}
          <Link href="/areas/saadat-abad/" className="font-bold text-brand-700 underline decoration-accent-400 underline-offset-4">
            سعادت‌آباد
          </Link>{' '}
          در کوتاه‌ترین بازه پوشش داده شوند. برای محله‌های شمال و شرق تهران، زمان تقریبی هنگام ثبت
          درخواست اعلام می‌شود. در صفحه هر منطقه، خرابی‌های پرتکرار همان محدوده و نکته دسترسی آن آمده
          است.
        </p>

        {areaGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-6 flex items-center gap-3 text-xl font-extrabold text-brand-950">
              <span aria-hidden="true" className="h-6 w-1.5 rounded-full bg-accent-500" />
              {group.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.areas.map((a) => (
                <AreaCard key={a.slug} area={a} />
              ))}
            </div>
          </div>
        ))}

        <div>
          <h2 className="text-xl font-extrabold text-brand-950">سوالات متداول درباره پوشش مناطق</h2>
          <div className="mt-6">
            <FaqAccordion faqs={areaFaqs} withSchema title="سوالات متداول پوشش مناطق تهران" />
          </div>
        </div>
      </section>
      <div className="pb-16">
        <CTASection title="منطقه شما در لیست نیست؟" description="برای نقاط خاص تهران هم با هماهنگی قبلی اعزام داریم؛ آدرس خود را در بله بفرستید." />
      </div>
    </>
  );
}
