import { renderOgImage, ogSize, ogContentType } from '@/lib/og';
import { brands, getBrand } from '@/data/brands';

export const size = ogSize;
export const contentType = ogContentType;

/** برای سازگاری با output: 'export' */
export const dynamic = 'force-static';

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

/** تصویر OG اختصاصی هر برند — «تعمیر لوازم خانگی {نام برند}» */
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrand(slug);
  return renderOgImage(
    `تعمیر لوازم خانگی ${brand?.name ?? ''} در تهران`,
    brand?.excerpt ?? 'تعمیر تخصصی لوازم خانگی در تهران با گارانتی کتبی',
  );
}
