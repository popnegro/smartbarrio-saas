export const LEAD_STATUSES = ['new', 'contacted', 'interested', 'customer', 'lost'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

const TRANSITIONS: Record<LeadStatus, readonly LeadStatus[]> = {
  new: ['contacted', 'lost'],
  contacted: ['interested', 'lost'],
  interested: ['customer', 'lost'],
  customer: ['lost'],
  lost: ['new'],
};

export function canTransitionLead(from: LeadStatus, to: LeadStatus): boolean {
  return from === to || TRANSITIONS[from].includes(to);
}

export function assertLeadTransition(from: LeadStatus, to: LeadStatus): void {
  if (!canTransitionLead(from, to)) {
    throw new Error(`Invalid lead transition: ${from} -> ${to}`);
  }
}
