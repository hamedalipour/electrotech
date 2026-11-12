import { washerService } from './washer';
import { refrigeratorService } from './refrigerator';
import { dishwasherService } from './dishwasher';
import { dryerService } from './dryer';
import { ovenService } from './oven';
import { microwaveService } from './microwave';
import { vacuumService } from './vacuum';
import { boardService } from './board';
import { gasChargeService } from './gas-charge';
import { compressorService } from './compressor';
import { twinTubService } from './twin-tub';
import { counterOvenService } from './counter-oven';
import { washerMaintenanceService } from './washer-service';
import { washerLgService } from './washer-lg';
import { washerSamsungService } from './washer-samsung';
import { washerPakshomaService } from './washer-pakshoma';
import { washerBoschService } from './washer-bosch';
import type { Service } from './types';

/**
 * ترتیب لیست = ترتیب اولویت.
 *
 * مبنای اولویت‌بندی: پرتقاضاترین خدمات تعمیرات لوازم خانگی در تهران.
 * لباسشویی و یخچال بالاترین اولویت‌اند و روی صفحه اصلی (services.slice(0, 6))،
 * صفحه خدمات، اسکیمای OfferCatalog و نقشه سایت اثر می‌گذارد.
 */
export const services: Service[] = [
  washerService,
  refrigeratorService,
  dishwasherService,
  dryerService,
  ovenService,
  microwaveService,
  vacuumService,
  // صفحات تخصصی و پول‌ساز (P1) — بعد از ۷ خدمت اصلی اضافه شده‌اند تا
  // ترتیب کارت‌های صفحه اصلی (services.slice(0, 6)) تغییر نکند.
  boardService,
  gasChargeService,
  compressorService,
  twinTubService,
  counterOvenService,
  washerMaintenanceService,
  washerLgService,
  washerSamsungService,
  washerPakshomaService,
  washerBoschService,
];

/**
 * اولویت سئوی هر خدمت (۱ = بالاترین) — برای priority نقشه سایت.
 */
export const servicePriority: Record<string, number> = {
  washer: 1,
  refrigerator: 0.95,
  dishwasher: 0.95,
  dryer: 0.8,
  oven: 0.75,
  microwave: 0.7,
  vacuum: 0.6,
  // صفحات پول‌ساز P1
  board: 0.9,
  'gas-charge': 0.9,
  compressor: 0.85,
  'washer-service': 0.75,
  'twin-tub': 0.7,
  'counter-oven': 0.7,
  'washer-lg': 0.8,
  'washer-samsung': 0.8,
  'washer-pakshoma': 0.75,
  'washer-bosch': 0.75,
};

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** گزینه‌های خدمات برای منو، فرم و فوتر */
export const serviceOptions = services.map((s) => ({
  slug: s.slug,
  label: s.navLabel,
}));

/**
 * خدمات منتخب فوتر — ترکیب پرتقاضاترین خدمات با صفحات پول‌ساز P1.
 * فوتر فقط ۸ لینک نشان می‌دهد تا ستون خدمات کوتاه و خوانا بماند؛
 * لینک «همه خدمات» بقیه صفحات را پوشش می‌دهد.
 */
export const footerServiceOptions = [
  'washer',
  'refrigerator',
  'board',
  'gas-charge',
  'compressor',
  'washer-lg',
  'washer-samsung',
  'dishwasher',
]
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s): s is Service => Boolean(s))
  .map((s) => ({ slug: s.slug, label: s.navLabel }));

export type { Service, ServiceFaq } from './types';