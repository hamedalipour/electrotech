import { buildMetadata } from '@/lib/seo';
import { HomeHero } from '@/components/HomeHero';
import { HomeSections } from '@/components/HomeSections';
import { HomeMore } from '@/components/HomeMore';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'تعمیر لوازم خانگی در تهران | اعزام تکنسین در محل زیر ۲ ساعت',
  description:
    'تعمیر تخصصی لوازم خانگی در تهران با اعزام تکنسین کمتر از ۲ ساعت. تعمیر یخچال، لباسشویی، ظرفشویی، خشک‌کن و مایکروفر دوو، اسنوا و برندهای رایج در محل با گارانتی کتبی ۳ ماهه و فاکتور رسمی.',
  path: '/',
  keywords: [
    'تعمیر لوازم خانگی تهران',
    'تعمیر لوازم خانگی در محل',
    'تعمیر لوازم خانگی در تهران',
    'تعمیر یخچال در محل',
    'تعمیر یخچال تهران',
    'تعمیر ماشین لباسشویی در محل',
    'تعمیر ماشین لباسشویی تهران',
    'تعمیر ماشین ظرفشویی',
    'تعمیر خشک‌کن',
    'تعمیر مایکروفر',
    'تعمیر لوازم خانگی دوو',
    'تعمیر لوازم خانگی اسنوا',
    'تکنسین لوازم خانگی در محل',
    'تعمیرکار لوازم خانگی تهران',
    'اعزام تکنسین لوازم خانگی',
    'تعمیر برد لوازم خانگی',
  ],
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeSections />
      <HomeMore />
      <div className="py-16">
        <CTASection />
      </div>
    </>
  );
}