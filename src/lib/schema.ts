import { siteConfig, absoluteUrl } from '@/data/site';
import { services } from '@/data/services';
import { areaGroups } from '@/data/areas';
import { testimonials } from '@/data/testimonials';
import { priceCategories } from '@/data/prices';

/**
 * میانگین و تعداد نظراتی که واقعاً در صفحه رندر می‌شوند.
 * قبلاً reviewCount از تنظیمات (۲۱۸) خوانده می‌شد در حالی که فقط ۵ Review
 * در اسکیما بود؛ این ناسازگاری ریسک اسپم برای ریچ‌ریزالت دارد.
 */
const reviewCount = testimonials.length;
const reviewAverage = reviewCount
  ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / reviewCount).toFixed(1)
  : siteConfig.rating.value;

/** اسکیمای LocalBusiness (ریشه سئوی محلی) */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#business`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: `+98${siteConfig.phone.replace(/^0/, '')}`,
    email: siteConfig.email,
    image: absoluteUrl('/og-default.png'),
    logo: absoluteUrl('/logo.png'),
    priceRange: siteConfig.priceRange,
    currenciesAccepted: 'IRR',
    paymentAccepted: 'نقدی، کارت بانکی',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.province,
      postalCode: siteConfig.address.postalCode,
      addressCountry: 'IR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'تهران' },
      ...areaGroups.flatMap((g) =>
        g.areas.map((a) => ({ '@type': 'Place', name: `${a.name}، تهران` })),
      ),
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewAverage,
      reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: { '@type': 'Rating', ratingValue: String(t.rating), bestRating: '5' },
      reviewBody: t.text,
      datePublished: t.isoDate,
    })),
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات تعمیرات لوازم خانگی',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.navLabel,
          url: absoluteUrl(`/services/${s.slug}/`),
          description: s.excerpt,
          areaServed: 'تهران',
        },
      })),
    },
    foundingDate: siteConfig.foundedDate,
    slogan: siteConfig.tagline,
    knowsAbout: [
      'تعمیر ماشین لباسشویی',
      'تعمیر یخچال و فریزر',
      'تعمیر ماشین ظرفشویی',
      'تعمیر مایکروفر',
      'تعمیر اجاق گاز',
    ],
  };
}

/** اسکیمای WebSite با جست‌وجوی داخلی */
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    inLanguage: 'fa-IR',
    publisher: { '@id': `${siteConfig.url}/#organization` },
  };
}

/** اسکیمای Organization */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl('/logo.png'),
    telephone: `+98${siteConfig.phone.replace(/^0/, '')}`,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: 'IR',
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

/** اسکیمای Service برای صفحات خدمت */
export function getServiceSchema(opts: {
  name: string;
  description: string;
  path: string;
  faqs?: { q: string; a: string }[];
}) {
  const { name, description, path, faqs } = opts;
  const schema: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      url: absoluteUrl(path),
      serviceType: name,
      image: absoluteUrl('/og-default.png'),
      provider: { '@id': `${siteConfig.url}/#business` },
      areaServed: [
        { '@type': 'City', name: 'تهران' },
        ...areaGroups.flatMap((g) =>
          g.areas.map((a) => ({ '@type': 'Place', name: `${a.name}، تهران` })),
        ),
      ],
      availableChannel: {
        '@type': 'ServiceChannel',
        servicePhone: `+98${siteConfig.phone.replace(/^0/, '')}`,
        serviceUrl: absoluteUrl('/contact/'),
      },
      offers: {
        '@type': 'Offer',
        url: absoluteUrl('/prices/'),
        priceCurrency: 'IRR',
        availability: 'https://schema.org/InStock',
      },
    },
  ];
  if (faqs?.length) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return schema;
}

/** اسکیمای HowTo برای راهنماهای مرحله‌به‌مرحله */
export function getHowToSchema(opts: {
  name: string;
  description?: string;
  totalTime?: string;
  path: string;
  image?: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description ?? opts.name,
    url: absoluteUrl(opts.path),
    inLanguage: 'fa-IR',
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** اسکیمای Person برای نویسنده/تکنسین مقاله — CTE E-E-A-T */
export function getPersonSchema(opts: {
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  telephone?: string;
  email?: string;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: opts.name,
    ...(opts.url ? { url: absoluteUrl(opts.url) } : {}),
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    ...(opts.jobTitle ? { jobTitle: opts.jobTitle } : {}),
    ...(opts.telephone ? { telephone: opts.telephone } : {}),
    ...(opts.email ? { email: opts.email } : {}),
    ...(opts.sameAs?.length ? { sameAs: opts.sameAs } : {}),
  };
}

/** اسکیمای BlogPosting برای مقالات */
export function getBlogPostSchema(opts: {
  title: string;
  description: string;
  path: string;
  isoDate: string;
  /** تاریخ بازنگری — اگر مقاله‌ای بازنگری شده، dateModified همین است */
  updated?: string;
  keywords: string[];
  /** تصویر اصلی مقاله — مسیر نسبی از ریشه سایت */
  image?: string;
  /** نویسنده Person — اگر داده باشد، به جوار Organization هم اضافه می‌شود */
  author?: {
    name: string;
    url?: string;
    image?: string;
    jobTitle?: string;
    telephone?: string;
    email?: string;
    sameAs?: string[];
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    datePublished: opts.isoDate,
    dateModified: opts.updated ?? opts.isoDate,
    inLanguage: 'fa-IR',
    keywords: opts.keywords.join(', '),
    author: [
      ...(opts.author
        ? [getPersonSchema(opts.author)]
        : [{ '@id': `${siteConfig.url}/#organization` }]),
    ],
    publisher: { '@id': `${siteConfig.url}/#organization` },
    mainEntityOfPage: absoluteUrl(opts.path),
    image: absoluteUrl(opts.image ?? '/og-default.png'),
  };
}

/** اسکیمای Service مخصوص صفحات محله/منطقه — با areaServed مشخص */
export function getAreaServiceSchema(opts: {
  areaName: string;
  district: string;
  arrival: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `تعمیر لوازم خانگی در ${opts.areaName}`,
    description: `اعزام تکنسین تعمیر لوازم خانگی به ${opts.areaName} (${opts.district}) در ${opts.arrival}؛ یخچال، لباسشویی، ظرفشویی و اجاق گاز در محل با گارانتی کتبی.`,
    url: absoluteUrl(opts.path),
    serviceType: 'تعمیر لوازم خانگی',
    image: absoluteUrl('/og-default.png'),
    provider: { '@id': `${siteConfig.url}/#business` },
    areaServed: { '@type': 'Place', name: `${opts.areaName}، ${opts.district}` },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: `+98${siteConfig.phone.replace(/^0/, '')}`,
      serviceUrl: absoluteUrl('/contact/'),
    },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl('/prices/'),
      priceCurrency: 'IRR',
      availability: 'https://schema.org/InStock',
    },
  };
}

/** اسکیمای OfferCatalog برای صفحه تعرفه‌ها — بازه قیمت هر خدمت */
export function getPricesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'تعرفه تعمیر لوازم خانگی در تهران ۱۴۰۵',
    url: absoluteUrl('/prices/'),
    itemListElement: priceCategories.flatMap((cat) =>
      cat.rows.map((row) => ({
        '@type': 'Offer',
        name: row.service,
        priceCurrency: 'IRR',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'IRR',
          minPrice: row.from,
          maxPrice: row.to,
          unitText: row.unit ?? 'دستگاه',
        },
      })),
    ),
  };
}