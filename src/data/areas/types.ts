/**
 * مناطق تحت پوشش تهران — هر منطقه یک صفحه اختصاصی برای سئوی محلی
 * مسیر خروجی: /areas/[slug]/
 */

export type AreaFaq = { q: string; a: string };

export type Area = {
  slug: string;
  name: string;
  /** منطقه شهرداری */
  district: string;
  /** زمان تقریبی اعزام تکنسین */
  arrival: string;
  /** دو پاراگراف یکتا برای هر منطقه */
  intro: string[];
  /** مناطق نزدیک برای لینک‌سازی داخلی */
  nearby: string[];
  seoTitle: string;
  seoDescription: string;
  /** نکته دسترسی یا بافت محلی — از details.ts ادغام می‌شود */
  localNote?: string;
  /** خرابی‌های پرتکرار همان محدوده */
  localIssues?: string[];
  /** اسلاگ خدمات پرتقاضای همان محدوده */
  topServices?: string[];
  /** سوالات متداول اختصاصی منطقه */
  faqs?: AreaFaq[];
};

export type AreaGroup = {
  title: string;
  areas: Area[];
};