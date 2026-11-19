import type { ReactNode } from 'react';

/**
 * اسکرول-ریویل کاملاً با CSS (animation-timeline: view()).
 *
 * چرا بدون جاوااسکریپت: نسخه قبلی یک کامپوننت کلاینت با IntersectionObserver
 * بود که برای هر کارت صفحه یک observer جدا می‌ساخت (حدود ۱۰۰ عدد در صفحه اصلی)
 * و کل زیردرخت فرزندان را به‌عنوان پراپ کامپوننت کلاینت سریالایز می‌کرد.
 * حالا هیچ هیدریشنی لازم نیست: انیمیشن به موقعیت اسکرول گره می‌خورد.
 *
 * در مرورگری که از animation-timeline پشتیبانی نمی‌کند (یا کاربر
 * «کاهش حرکت» را روشن کرده) محتوا ساده و بدون انیمیشن دیده می‌شود — نه مخفی.
 */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={['reveal', className].filter(Boolean).join(' ')}>{children}</div>;
}
