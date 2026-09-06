import type { BusinessStatus } from '@/types/business';
import type { Lead } from '@/types/catalog';

export const LEAD_STATUS_ORDER: Lead['status'][] = [
  'new',
  'contacted',
  'interested',
  'client',
  'lost',
];

export function canTransitionLead(
  from: Lead['status'],
  to: Lead['status'],
): boolean {
  if (from === to) return true;
  if (to === 'lost') return true;
  if (from === 'lost') return false;
  return LEAD_STATUS_ORDER.indexOf(to) > LEAD_STATUS_ORDER.indexOf(from);
}

export function isPublicBusinessStatus(status: BusinessStatus): boolean {
  return status === 'active';
}

export function belongsToBusiness(
  businessId: string,
  resourceBusinessId: string,
): boolean {
  return Boolean(businessId) && businessId === resourceBusinessId;
}
