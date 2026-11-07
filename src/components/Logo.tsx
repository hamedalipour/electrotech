/**
 * لوگوی الکتروتچ: نشان «ال» با آذرخش — SVG سبک بدون فایل خارجی
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="10" fill="#0f1f3d" />
      <path
        d="M26.5 8 15 26h7.5l-2.3 14 14-18.5h-7.4L31 8z"
        fill="#fbbf24"
        stroke="#fbbf24"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}