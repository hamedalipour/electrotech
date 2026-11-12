import { services } from '@/data/services';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/Cards';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'خدمات تعمیر لوازم خانگی در تهران',
  description:
    'فهرست کامل خدمات تعمیر لوازم خانگی در تهران: لباسشویی، یخچال، ظرفشویی، خشک‌کن، اجاق گاز، تعمیر برد، شارژ گاز و کمپرسور در محل با گارانتی کتبی.',
  path: '/services/',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="خدمات تعمیرات تخصصی لوازم خانگی"
        description="صفحه اختصاصی هر خدمت شامل علائم خرابی، مراحل کار، بازه هزینه و سوالات متداول است. از تعمیر برد و شارژ گاز یخچال تا سرویس لباسشویی و صفحات تخصصی برندها."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
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