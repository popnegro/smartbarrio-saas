import type { CategoryKey } from '@/types/business';

export interface Product {
  id: string;
  businessId: string;
  name: string;
  slug: string;
  description: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  brand?: string;
  featured: boolean;
  active: boolean;
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  slug: string;
  description: string;
  priceFrom?: number;
  featured: boolean;
  active: boolean;
}

export interface Vehicle {
  id: string;
  businessId: string;
  title: string;
  make: string;
  model: string;
  year?: number;
  mileageKm?: number;
  price?: number;
  fuel?: string;
  transmission?: string;
  imageUrl?: string;
  status: 'available' | 'reserved' | 'sold';
}

export interface Lead {
  id: string;
  businessId: string;
  name: string;
  phone: string;
  message: string;
  source: 'form' | 'whatsapp' | 'phone' | 'map' | 'other';
  status: 'new' | 'contacted' | 'interested' | 'client' | 'lost';
  notes?: string;
  createdAt: string;
}

export interface BusinessContentSummary {
  businessId: string;
  categoryKey: CategoryKey;
  products: Product[];
  services: Service[];
  vehicles: Vehicle[];
  leads: Lead[];
}
