import { SCHEMES } from '@/lib/schemes';
import { Scheme } from '@/types/scheme';

/**
 * Civic Welfare Data Service
 * Provides an asynchronous data access boundary for scheme retrieval.
 */

export function serializeScheme(scheme: Scheme): Scheme {
  return {
    ...scheme,
    eligibilityConditions: scheme.eligibilityConditions.map((cond) => ({
      id: cond.id,
      label: cond.label,
      checkKey: cond.checkKey,
      failReason: cond.failReason,
      unknownReason: cond.unknownReason,
      passReason: cond.passReason,
    })),
  };
}

export async function getAllSchemes(): Promise<Scheme[]> {
  // Simulates asynchronous I/O or database query
  return Promise.resolve(SCHEMES);
}

export async function getSerializableSchemes(): Promise<Scheme[]> {
  return Promise.resolve(SCHEMES.map(serializeScheme));
}

export async function getSchemeById(id: string): Promise<Scheme | null> {
  const scheme = SCHEMES.find((s) => s.id === id);
  return Promise.resolve(scheme || null);
}

export async function searchSchemes(params: {
  query?: string;
  scope?: string;
  sector?: string;
}): Promise<Scheme[]> {
  const { query, scope, sector } = params;

  return SCHEMES.filter((scheme) => {
    if (query) {
      const q = query.toLowerCase();
      const matches =
        scheme.name.toLowerCase().includes(q) ||
        scheme.department.toLowerCase().includes(q) ||
        scheme.benefitSummary.toLowerCase().includes(q) ||
        scheme.tags.some((t) => t.toLowerCase().includes(q));
      if (!matches) return false;
    }

    if (scope && scope !== 'all') {
      if (scheme.scope !== scope) return false;
    }

    if (sector && sector !== 'all') {
      if (!scheme.tags.includes(sector)) return false;
    }

    return true;
  });
}
