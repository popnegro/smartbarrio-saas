export const CATEGORY_KEYS = [
  'kiosco',
  'taller',
  'tallerAutos',
  'repuestos',
  'cerrajeria',
  'ferreteria',
  'pintureria',
  'minimercado',
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export type BusinessStatus = 'draft' | 'active' | 'suspended';

export interface DemoBusiness {
  key: CategoryKey;
  name: string;
  category: string;
  description: string;
  phone: string;
  wa: string;
  address: string;
  accent: string;
  hours: string;
  products: string[];
  services: string[];
  special?: string;
  promos?: string[];
}

export interface BusinessIdentity {
  id: string;
  tenantId: string;
  categoryKey: CategoryKey;
  name: string;
  slug: string;
  status: BusinessStatus;
}

export interface TenantIdentity {
  id: string;
  name: string;
  slug: string;
}
