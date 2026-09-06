import { CATEGORY_CONFIG } from '@/lib/categories';
import { businessPath, slugify } from '@/lib/slug';
import { DEMO_BUSINESSES } from '@/data/demo';
import type { CategoryKey, DemoBusiness } from '@/types/business';

export const DEMO_BASE_URL = 'https://smartbarrio.vercel.app';

export function getDemoByKey(key: CategoryKey): DemoBusiness {
  const business = DEMO_BUSINESSES.find((item) => item.key === key);
  if (!business) throw new Error(`Unknown demo business: ${key}`);
  return business;
}

export function getDemoCategorySlug(key: CategoryKey): string {
  return CATEGORY_CONFIG[key].publicSlug;
}

export function getDemoPath(key: CategoryKey): string {
  const business = getDemoByKey(key);
  return `/${getDemoCategorySlug(key)}/${slugify(business.name)}`;
}

export function getDemoUrl(key: CategoryKey): string {
  return `${DEMO_BASE_URL}${getDemoPath(key)}`;
}

export function getAllDemoRoutes(): Array<{ key: CategoryKey; path: string; url: string; business: DemoBusiness }> {
  return DEMO_BUSINESSES.map((business) => ({
    key: business.key,
    path: getDemoPath(business.key),
    url: getDemoUrl(business.key),
    business,
  }));
}

export { businessPath };
