import type { ReactNode } from 'react';

/**
 * آیکون‌های SVG اختصاصی خدمات لوازم خانگی — سبک خطی یکدست (stroke)
 * که با رنگ قالب هماهنگ می‌شود.
 */

const L = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const serviceIcons: Record<string, ReactNode> = {
  /* لباسشویی — درام و پخش کنترل */
  washer: (
    <>
      <rect x="3.5" y="3" width="17" height="18" rx="2.5" />
      <circle cx="12" cy="13" r="4.5" />
      <path d="M8.6 12.2c2.2 1 4.6 1 6.8 0" />
      <circle cx="7" cy="6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="10" cy="6" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  /* یخچال — بدنه بلند با درب دوردار */
  refrigerator: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2" />
      <path d="M6 10.5h12" />
      <path d="M9 5.5v2.5M9 13v2.5" />
    </>
  ),
  /* ظرفشویی — با سبد و افشان */
  dishwasher: (
    <>
      <rect x="3.5" y="3" width="17" height="18" rx="2.5" />
      <path d="M7 6.5h10" />
      <path d="M6.5 11h11M6.5 15.5h11" />
      <path d="M14 3v2" />
    </>
  ),
  /* آبگرمکن — حذف شد (خدمت دیگر ارائه نمی‌شود) */
  /* خشک‌کن — درام با جریان هوا */
  dryer: (
    <>
      <rect x="3.5" y="3" width="17" height="18" rx="2.5" />
      <circle cx="12" cy="13" r="4.5" />
      <path d="M8.5 13.5c1.4-1.4 4.6-1.4 6 0" />
    </>
  ),
  /* اجاق گاز — پانل با شعله */
  oven: (
    <>
      <rect x="3.5" y="3" width="17" height="18" rx="2.5" />
      <path d="M6.5 10.5h11" />
      <circle cx="7.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <path d="M8 14.5c1.4 1.2 2.6 1.2 4 0s2.6-1.2 4 0" />
    </>
  ),
  /* مایکروفر — درب با کنترل */
  microwave: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <rect x="6" y="7.5" width="9" height="9" rx="1" />
      <path d="M17.5 8v1M17.5 11v1M17.5 15.5h1.5" />
    </>
  ),
  /* جاروبرقی — بدنه با خرطومی */
  vacuum: (
    <>
      <path d="M20 12.5a8 8 0 1 1-8-8h3.5a2.5 2.5 0 0 1 2.5 2.5v2" />
      <path d="M13 15.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="currentColor" stroke="none" />
      <path d="M4.5 20.5h11" />
    </>
  ),
};

/** آیکون‌های بخش «چرا ما» — به‌جای ایموجی */
const featureIcons: Record<string, ReactNode> = {
  /* اعزام سریع */
  zap: <path d="M13 2.5 5.5 13h5.8l-1.1 8.5L18.5 10h-5.8l1.6-7.5z" />,
  /* گارانتی کتبی */
  shield: (
    <>
      <path d="M12 3l7 2.8v5.4c0 4.6-3 7.9-7 9.8-4-1.9-7-5.2-7-9.8V5.8z" />
      <path d="M9 11.8l2.1 2.1 4-4.2" />
    </>
  ),
  /* عیب‌یابی شفاف */
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.8 15.8 20.5 20.5" />
      <path d="M8.8 11.2l1.7 1.7 3.2-3.4" />
    </>
  ),
  /* قطعات اورجینال */
  box: (
    <>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5z" />
      <path d="M3 8l9 5 9-5" />
      <path d="M12 13v8" />
    </>
  ),
  /* تماس تلفنی */
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.62 3h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  /* پیام‌رسان بله */
  chat: (
    <>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L3 21l1.95-5.6A8.5 8.5 0 1 1 21 11.5z" />
      <circle cx="8.5" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  /* تأیید */
  check: <path d="M4.5 12.5l4.7 4.7L19.5 6.9" />,
};

export function FeatureIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...L}>
      {featureIcons[name] ?? featureIcons.zap}
    </svg>
  );
}

export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...L}>
      {serviceIcons[slug] ?? serviceIcons.washer}
    </svg>
  );
}