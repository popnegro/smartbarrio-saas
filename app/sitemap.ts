import type { MetadataRoute } from 'next';
import { DEMO_BUSINESSES } from '@/data/demo';
import { CATEGORY_CONFIG } from '@/lib/categories';
import { slugify } from '@/lib/slug';

const SITE_URL = 'https://smartbarrio.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const businesses = DEMO_BUSINESSES.map((business) => ({
    url: `${SITE_URL}/${CATEGORY_CONFIG[business.key].publicSlug}/${slugify(business.name)}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categories = Object.values(CATEGORY_CONFIG).map((category) => ({
    url: `${SITE_URL}/${category.publicSlug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    ...categories,
    ...businesses,
  ];
}
