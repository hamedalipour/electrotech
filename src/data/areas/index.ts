import { westArea } from './west';
import { northArea } from './north';
import { centralArea } from './central';
import { eastArea } from './east';
import { southArea } from './south';
import { neighborhoods } from './neighborhoods';
import type { Area, AreaGroup } from './types';

/** مناطق اصلی (۵ ناحیه کلان شرق/غرب/شمال/مرکز/جنوب) */
export const mainAreas: Area[] = [westArea, northArea, centralArea, eastArea, southArea];

/** چینش گروه‌ها مطابق الگوی مرجع: مناطق اصلی + ۳ خوشه محله‌ای */
export const areaGroups: AreaGroup[] = [
  { title: 'مناطق اصلی تهران', areas: mainAreas },
  { title: 'شمال و غرب تهران', areas: neighborhoods.filter((n) => ['saadat-abad', 'ponak', 'shahrak-gharb', 'jordan', 'vanak', 'tajrish'].includes(n.slug)) },
  { title: 'غرب و مرکز تهران', areas: neighborhoods.filter((n) => ['yousef-abad', 'gisha', 'sadeghieh', 'azadi', 'shahran', 'ekbatan'].includes(n.slug)) },
  { title: 'شرق و جنوب تهران', areas: neighborhoods.filter((n) => ['tehranpars', 'narmak', 'majidiyeh', 'dolat-abad', 'afsarieh', 'ray', 'pirouzi'].includes(n.slug)) },
];

/** همه مناطق تحت پوشش: ۵ ناحیه اصلی + ۱۹ محله */
export const areas: Area[] = [...mainAreas, ...neighborhoods];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

/** مناطق مجاور برای لینک‌سازی داخلی (به ترتیب لیست nearby) */
export function getNearbyAreas(area: Area): Area[] {
  return area.nearby
    .map((slug) => areas.find((a) => a.slug === slug))
    .filter((a): a is Area => Boolean(a));
}

export type { Area, AreaGroup } from './types';
