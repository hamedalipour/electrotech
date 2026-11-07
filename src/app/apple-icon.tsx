import { ImageResponse } from 'next/og';

export const alt = 'لوگوی الکتروتچ — تعمیر تخصصی لوازم خانگی';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** برای سازگاری با output: 'export' */
export const dynamic = 'force-static';

/**
 * آیکون اپل (apple-touch-icon) — در زمان بیلد رندر و به‌صورت فایل استاتیک /apple-icon در خروجی export ساخته می‌شود.
 * فقط از اشکال برند (آذرخش) استفاده شده تا به فونت خاصی وابسته نباشد.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f1f3d',
          position: 'relative',
        }}
      >
        {/* هاله پشت آذرخش */}
        <div
          style={{
            position: 'absolute',
            top: -30,
            left: -30,
            width: 240,
            height: 240,
            borderRadius: 9999,
            backgroundColor: 'rgba(51,113,246,0.18)',
          }}
        />
        {/* آذرخش با دو میله مورب */}
        <div style={{ display: 'flex', position: 'relative' }}>
          <div
            style={{
              width: 96,
              height: 30,
              borderRadius: 12,
              backgroundColor: '#fbbf24',
              transform: 'translate(6px, -26px) rotate(-56deg)',
            }}
          />
          <div
            style={{
              width: 88,
              height: 30,
              borderRadius: 12,
              backgroundColor: '#fbbf24',
              transform: 'translate(-52px, 26px) rotate(-56deg)',
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}