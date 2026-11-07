import { siteConfig } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { HomeHero } from '@/components/HomeHero';
import { HomeSections } from '@/components/HomeSections';
import { HomeMore } from '@/components/HomeMore';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'تعمیر لوازم خانگی در تهران | اعزام تکنسین کمتر از ۲ ساعت',
  description: siteConfig.description,
  path: '/',
  keywords: [
    'تعمیر لوازم خانگی تهران',
    'تعمیر لوازم خانگی در محل',
    'تعمیر یخچال',
    'تعمیر ماشین لباسشویی',
    'تعمیر ماشین ظرفشویی',
    'تعمیر مایکروفر',
    'تعمیر لوازم خانگی دوو',
    'تعمیر لوازم خانگی اسنوا',
    'تعمیر لوازم خانگی در تهران',
    'تکنسین لوازم خانگی در محل',
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