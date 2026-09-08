import { SubdomainDetail } from '../types';
import { VLSI_SUBDOMAINS } from './subdomains/vlsiSubdomains';
import { EMBEDDED_SUBDOMAINS } from './subdomains/embeddedSubdomains';

export const MASTER_SUBDOMAINS: SubdomainDetail[] = [
  ...VLSI_SUBDOMAINS,
  ...EMBEDDED_SUBDOMAINS
];

export const ALL_SUBDOMAINS = MASTER_SUBDOMAINS;

// Helper to filter subdomains by superdomain
export function getSubdomainsBySuperDomain(superDomainId: string): SubdomainDetail[] {
  if (superDomainId === 'all') return MASTER_SUBDOMAINS;
  return MASTER_SUBDOMAINS.filter(sd => sd.domainId === superDomainId);
}

// Helper to find subdomain by ID
export function getSubdomainById(id: string): SubdomainDetail | undefined {
  return MASTER_SUBDOMAINS.find(sd => sd.id === id);
}

// Summary stats of the entire classification matrix
export function getClassificationSummaryStats() {
  let totalJobs = 0;
  let totalSkills = 0;
  let totalKnowledge = 0;

  MASTER_SUBDOMAINS.forEach(sub => {
    totalJobs += sub.jobs.length;
    totalSkills += sub.skills.length;
    totalKnowledge += sub.knowledge.length;
  });

  return {
    totalSubdomains: MASTER_SUBDOMAINS.length,
    totalJobs,
    totalSkills,
    totalKnowledge
  };
}
