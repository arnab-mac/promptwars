import { Scheme, UserProfile, EligibilityStatus } from './schemes';

export type OverallMatch = 'matches-checked-criteria' | 'more-info-needed' | 'does-not-match';

export interface SchemeResult {
  scheme: Scheme;
  overallMatch: OverallMatch;
  overallLabel: string;
  conditionResults: ConditionResult[];
  passCount: number;
  failCount: number;
  unknownCount: number;
}

export interface ConditionResult {
  conditionId: string;
  label: string;
  status: EligibilityStatus;
  reason: string;
}

export function evaluateScheme(scheme: Scheme, profile: UserProfile): SchemeResult {
  const conditionResults: ConditionResult[] = scheme.eligibilityConditions.map((condition) => {
    const status = condition.evaluate(profile);
    let reason: string;
    if (status === 'pass') {
      reason = condition.passReason;
    } else if (status === 'fail') {
      reason = condition.failReason;
    } else {
      reason = condition.unknownReason;
    }
    return {
      conditionId: condition.id,
      label: condition.label,
      status,
      reason,
    };
  });

  const passCount = conditionResults.filter((r) => r.status === 'pass').length;
  const failCount = conditionResults.filter((r) => r.status === 'fail').length;
  const unknownCount = conditionResults.filter((r) => r.status === 'unknown').length;

  let overallMatch: OverallMatch;
  let overallLabel: string;

  if (failCount > 0) {
    overallMatch = 'does-not-match';
    overallLabel = 'Does not meet checked criteria';
  } else if (unknownCount > 0) {
    overallMatch = 'more-info-needed';
    overallLabel = 'More information needed';
  } else {
    overallMatch = 'matches-checked-criteria';
    overallLabel = 'Meets all checked criteria';
  }

  return {
    scheme,
    overallMatch,
    overallLabel,
    conditionResults,
    passCount,
    failCount,
    unknownCount,
  };
}

export function evaluateAllSchemes(schemes: Scheme[], profile: UserProfile): SchemeResult[] {
  return schemes.map((scheme) => evaluateScheme(scheme, profile));
}

const MATCH_ORDER: Record<OverallMatch, number> = {
  'matches-checked-criteria': 0,
  'more-info-needed': 1,
  'does-not-match': 2,
};

export function getTopMatches(results: SchemeResult[], limit?: number): SchemeResult[] {
  const sorted = [...results].sort(
    (a, b) => MATCH_ORDER[a.overallMatch] - MATCH_ORDER[b.overallMatch]
  );
  return limit !== undefined ? sorted.slice(0, limit) : sorted;
}
