import type { CategoryKey } from '@/types/business';

export type CategoryModule =
  | 'products'
  | 'services'
  | 'promotions'
  | 'gallery'
  | 'hours'
  | 'whatsapp'
  | 'leads'
  | 'vehicles';

export interface CategoryConfig {
  key: CategoryKey;
  label: string;
  pluralLabel: string;
  publicSlug: string;
  modules: readonly CategoryModule[];
}

export const CATEGORY_CONFIG: Record<CategoryKey, CategoryConfig> = {
  kiosco: { key: 'kiosco', label: 'Kiosco', pluralLabel: 'Kioscos', publicSlug: 'kioscos', modules: ['products', 'promotions', 'hours', 'whatsapp', 'leads'] },
  taller: { key: 'taller', label: 'Taller mecánico', pluralLabel: 'Talleres mecánicos', publicSlug: 'talleres-mecanicos', modules: ['products', 'services', 'gallery', 'hours', 'whatsapp', 'leads'] },
  tallerAutos: { key: 'tallerAutos', label: 'Taller + compra/venta', pluralLabel: 'Talleres + compra/venta', publicSlug: 'talleres-compra-venta', modules: ['products', 'services', 'vehicles', 'gallery', 'hours', 'whatsapp', 'leads'] },
  repuestos: { key: 'repuestos', label: 'Casa de repuestos', pluralLabel: 'Casas de repuestos', publicSlug: 'casas-de-repuestos', modules: ['products', 'services', 'gallery', 'hours', 'whatsapp', 'leads'] },
  cerrajeria: { key: 'cerrajeria', label: 'Cerrajería', pluralLabel: 'Cerrajerías', publicSlug: 'cerrajerias', modules: ['services', 'gallery', 'hours', 'whatsapp', 'leads'] },
  ferreteria: { key: 'ferreteria', label: 'Ferretería', pluralLabel: 'Ferreterías', publicSlug: 'ferreterias', modules: ['products', 'services', 'promotions', 'gallery', 'hours', 'whatsapp', 'leads'] },
  pintureria: { key: 'pintureria', label: 'Pinturería', pluralLabel: 'Pinturerías', publicSlug: 'pinturerias', modules: ['products', 'services', 'promotions', 'gallery', 'hours', 'whatsapp', 'leads'] },
  minimercado: { key: 'minimercado', label: 'Minimercado', pluralLabel: 'Minimercados', publicSlug: 'minimercados', modules: ['products', 'promotions', 'gallery', 'hours', 'whatsapp', 'leads'] },
};

export function getCategoryByPublicSlug(slug: string): CategoryConfig | undefined {
  return Object.values(CATEGORY_CONFIG).find((category) => category.publicSlug === slug);
}
