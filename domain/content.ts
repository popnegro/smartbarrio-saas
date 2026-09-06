export interface BusinessContent {
  businessId: string;
  tenantId: string;
  name: string;
  slug: string;
  categoryKey: string;
  description: string;
  phone: string;
  whatsapp: string;
  address: string;
  status: 'draft' | 'active' | 'suspended';
}

export interface ProductContent {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  active: boolean;
}

export interface ServiceContent {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  active: boolean;
}

export interface LeadContent {
  id: string;
  businessId: string;
  name: string;
  phone: string;
  message: string;
  source: 'whatsapp' | 'form' | 'phone' | 'map' | 'other';
  status: 'new' | 'contacted' | 'interested' | 'customer' | 'lost';
  notes?: string;
}
