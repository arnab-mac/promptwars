export type EligibilityStatus = 'pass' | 'fail' | 'unknown';

export interface EligibilityCondition {
  id: string;
  label: string;
  checkKey: keyof UserProfile | null;
  evaluate?: (profile: UserProfile) => EligibilityStatus;
  failReason: string;
  unknownReason: string;
  passReason: string;
}

export interface Scheme {
  id: string;
  name: string;
  department: string;
  scope: 'central' | 'state';
  stateCode?: string;
  benefitSummary: string;
  benefitAmount?: string;
  eligibilityConditions: EligibilityCondition[];
  uncheckedRequirements: string[];
  officialUrl: string;
  sourceCheckDate: string;
  documentsRequired?: string[];
  applicationGuidance?: string;
  tags: string[];
}

export interface UserProfile {
  age?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  state?: string;
  annualIncomeLakhsRs?: number;
  occupation?: 'farmer' | 'agricultural-labourer' | 'student' | 'unemployed' | 'salaried' | 'self-employed' | 'other' | 'prefer-not-to-say';
  landHoldingAcres?: number;
  category?: 'general' | 'obc' | 'sc' | 'st' | 'prefer-not-to-say';
  isWidow?: boolean;
  isDisabled?: boolean;
  hasRationCard?: boolean;
  rationCardType?: 'bpl' | 'apl' | 'antyodaya';
}
