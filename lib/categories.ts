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
  modules: readonly CategoryModule[];
}

export const CATEGORY_CONFIG: Record<CategoryKey, CategoryConfig> = {
  kiosco: {
    key: 'kiosco',
    label: 'Kiosco',
    pluralLabel: 'Kioscos',
    modules: ['products', 'promotions', 'hours', 'whatsapp', 'leads'],
  },
  taller: {
    key: 'taller',
    label: 'Taller mecánico',
    pluralLabel: 'Talleres mecánicos',
    modules: ['products', 'services', 'gallery', 'hours', 'whatsapp', 'leads'],
  },
  tallerAutos: {
    key: 'tallerAutos',
    label: 'Taller + compra/venta',
    pluralLabel: 'Talleres + compra/venta',
    modules: ['products', 'services', 'vehicles', 'gallery', 'hours', 'whatsapp', 'leads'],
  },
  repuestos: {
    key: 'repuestos',
    label: 'Casa de repuestos',
    pluralLabel: 'Casas de repuestos',
    modules: ['products', 'services', 'gallery', 'hours', 'whatsapp', 'leads'],
  },
  cerrajeria: {
    key: 'cerrajeria',
    label: 'Cerrajería',
    pluralLabel: 'Cerrajerías',
    modules: ['services', 'gallery', 'hours', 'whatsapp', 'leads'],
  },
  ferreteria: {
    key: 'ferreteria',
    label: 'Ferretería',
    pluralLabel: 'Ferreterías',
    modules: ['products', 'services', 'promotions', 'gallery', 'hours', 'whatsapp', 'leads'],
  },
  pintureria: {
    key: 'pintureria',
    label: 'Pinturería',
    pluralLabel: 'Pinturerías',
    modules: ['products', 'services', 'promotions', 'gallery', 'hours', 'whatsapp', 'leads'],
  },
  minimercado: {
    key: 'minimercado',
    label: 'Minimercado',
    pluralLabel: 'Minimercados',
    modules: ['products', 'promotions', 'gallery', 'hours', 'whatsapp', 'leads'],
  },
};
