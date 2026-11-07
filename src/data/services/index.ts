import { washerService } from './washer';
import { refrigeratorService } from './refrigerator';
import { dishwasherService } from './dishwasher';
import { dryerService } from './dryer';
import { ovenService } from './oven';
import { microwaveService } from './microwave';
import { vacuumService } from './vacuum';
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
};

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** گزینه‌های خدمات برای منو، فرم و فوتر */
export const serviceOptions = services.map((s) => ({
  slug: s.slug,
  label: s.navLabel,
}));

export type { Service, ServiceFaq } from './types';