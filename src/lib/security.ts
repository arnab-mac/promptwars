/**
 * SchemeSaathi Civic Security & Zero-Knowledge Privacy Engine
 * 
 * Implements:
 * 1. PII Detection & Real-time Redaction (Aadhaar, PAN, Bank Accounts, IFSC, Phone)
 * 2. Prompt Injection & Adversarial Jailbreak Interception
 * 3. In-Memory Sliding-Window Rate Limiting
 * 4. Input Sanitization & HTML/Script Stripping
 * 5. Architectural Compliance & Privacy Guardrails
 */

export interface PIIAnalysisResult {
  hasPII: boolean;
  sanitizedText: string;
  detectedTypes: string[];
  warnings: string[];
}

export interface PromptInjectionResult {
  isSuspicious: boolean;
  threatLevel: 'low' | 'medium' | 'high';
  matchedPatterns: string[];
  explanation?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTimeMs: number;
}

// ==========================================
// 1. PII DETECTORS (INDIA SPECIFIC)
// ==========================================

// Aadhaar: 12 digits, cannot start with 0 or 1, formatted as 4-4-4 or raw 12 digits
const AADHAAR_REGEX = /\b[2-9]\d{3}[\s-]?\d{4}[\s-]?\d{4}\b/g;

// PAN (Permanent Account Number): 5 letters + 4 digits + 1 letter (e.g. ABCDE1234F)
const PAN_REGEX = /\b[A-Za-z]{5}\d{4}[A-Za-z]{1}\b/g;

// Indian Bank Account numbers: 11-18 digits standalone, or 9-18 digits preceded by account keywords
const BANK_ACCOUNT_REGEX = /\b(?:(?:ac|a\/c|account|acct|acc\.?)\s*[:#.-]?\s*\d{9,18}|\d{11,18})\b/gi;

// Indian Financial System Code (IFSC): 4 alphabetic characters + '0' + 6 alphanumeric characters
const IFSC_REGEX = /\b[A-Za-z]{4}0[A-Za-z0-9]{6}\b/g;

// Indian Mobile numbers: 10 digits starting with 6, 7, 8, or 9 (with optional +91 or 0 prefix)
const PHONE_REGEX = /(?:(?:\+91[\s-]?)|\b0?)[6-9]\d{9}\b/g;

// Email addresses
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

/**
 * Scans citizen input for sensitive identifiers and redacts them.
 * Never persists or forwards raw identity documents to AI models or logs.
 */
export function detectAndRedactPII(input: string): PIIAnalysisResult {
  if (!input || typeof input !== 'string') {
    return {
      hasPII: false,
      sanitizedText: '',
      detectedTypes: [],
      warnings: [],
    };
  }

  let sanitized = input;
  const detectedTypes: string[] = [];
  const warnings: string[] = [];

  // 1. Aadhaar Check (12 digits)
  if (AADHAAR_REGEX.test(sanitized)) {
    detectedTypes.push('Aadhaar Number');
    warnings.push('Aadhaar number detected and redacted. SchemeSaathi is a zero-knowledge tool and never requires Aadhaar numbers.');
    sanitized = sanitized.replace(AADHAAR_REGEX, '[REDACTED_AADHAAR]');
  }

  // 2. PAN Check (5 alpha + 4 num + 1 alpha)
  if (PAN_REGEX.test(sanitized)) {
    detectedTypes.push('PAN Card Number');
    warnings.push('PAN card number detected and redacted. Tax identity numbers are not stored or sent.');
    sanitized = sanitized.replace(PAN_REGEX, '[REDACTED_PAN]');
  }

  // 3. Phone Check (runs before bank accounts to prevent 10-digit mobile collisions)
  if (PHONE_REGEX.test(sanitized)) {
    detectedTypes.push('Mobile Phone Number');
    warnings.push('Personal phone number detected and redacted to preserve anonymity.');
    sanitized = sanitized.replace(PHONE_REGEX, '[REDACTED_PHONE]');
  }

  // 4. IFSC Check
  if (IFSC_REGEX.test(sanitized)) {
    detectedTypes.push('Bank IFSC Code');
    warnings.push('Bank IFSC code detected and redacted. Banking routing codes are not collected.');
    sanitized = sanitized.replace(IFSC_REGEX, '[REDACTED_IFSC]');
  }

  // 5. Bank Account Check
  if (BANK_ACCOUNT_REGEX.test(sanitized)) {
    detectedTypes.push('Bank Account Number');
    warnings.push('Potential bank account number detected and redacted. Banking details are never needed for discovery.');
    sanitized = sanitized.replace(BANK_ACCOUNT_REGEX, '[REDACTED_BANK_ACCOUNT]');
  }

  // 6. Email Check
  if (EMAIL_REGEX.test(sanitized)) {
    detectedTypes.push('Email Address');
    warnings.push('Email address detected and redacted.');
    sanitized = sanitized.replace(EMAIL_REGEX, '[REDACTED_EMAIL]');
  }

  return {
    hasPII: detectedTypes.length > 0,
    sanitizedText: sanitized,
    detectedTypes,
    warnings,
  };
}

// ==========================================
// 2. ADVERSARIAL PROMPT INJECTION DEFENSE
// ==========================================

const PROMPT_INJECTION_PATTERNS = [
  {
    regex: /(?:ignore|disregard|forget|override|cancel)\s+(?:all\s+)?(?:previous|past|above|system)\s+(?:instructions|rules|prompts|directives|commands)/i,
    label: 'Instruction Override / Jailbreak attempt',
  },
  {
    regex: /(?:you are now|pretend you are|act as|roleplay as)\s+(?:an administrator|god mode|DAN|unrestricted|developer mode|root)/i,
    label: 'Persona Hijack / Developer Mode exploit',
  },
  {
    regex: /(?:bypass|override|disable|skip)\s+(?:eligibility|rules|criteria|conditions|checks)/i,
    label: 'Rule Bypass request',
  },
  {
    regex: /(?:mark|set|force|declare)\s+(?:me|my profile|applicant|status)\s+(?:as\s+)?(?:eligible|approved|pass|verified)/i,
    label: 'Forced Eligibility falsification',
  },
  {
    regex: /(?:reveal|show|print|leak|output|dump)\s+(?:the\s+)?(?:system\s+prompt|developer\s+instructions|api\s+key|secret|token)/i,
    label: 'Secret / System Prompt extraction attempt',
  },
  {
    regex: /<script[\s\S]*?>[\s\S]*?<\/script>/i,
    label: 'Cross-Site Scripting (XSS) payload',
  },
  {
    regex: /(?:javascript:|data:text\/html)/i,
    label: 'URI Scheme Injection attempt',
  },
];

/**
 * Validates text against adversarial prompts and attempts to manipulate welfare eligibility.
 */
export function detectPromptInjection(input: string): PromptInjectionResult {
  if (!input || typeof input !== 'string') {
    return { isSuspicious: false, threatLevel: 'low', matchedPatterns: [] };
  }

  const matchedPatterns: string[] = [];

  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.regex.test(input)) {
      matchedPatterns.push(pattern.label);
    }
  }

  const isSuspicious = matchedPatterns.length > 0;
  const threatLevel: 'low' | 'medium' | 'high' = 
    matchedPatterns.length >= 2 ? 'high' : (matchedPatterns.length === 1 ? 'medium' : 'low');

  return {
    isSuspicious,
    threatLevel,
    matchedPatterns,
    explanation: isSuspicious
      ? `Input blocked by SchemeSaathi Security Guard: Detected ${matchedPatterns.join(', ')}. Eligibility calculations are deterministic and cannot be modified via conversation.`
      : undefined,
  };
}

// ==========================================
// 3. INPUT SANITIZATION
// ==========================================

/**
 * Strips HTML tags, control characters, and normalizes unicode whitespace.
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';

  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, '') // Strip control chars
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

// ==========================================
// 4. IN-MEMORY SLIDING WINDOW RATE LIMITER
// ==========================================

interface RateLimitBucket {
  count: number;
  expiresAt: number;
}

const rateLimitStore = new Map<string, RateLimitBucket>();

/**
 * Sliding window rate limiter for API endpoints to prevent denial of service
 * and token depletion attacks.
 * 
 * Default: 20 requests per 60 seconds per IP or client identifier.
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 20,
  windowMs: number = 60000
): RateLimitResult {
  const now = Date.now();
  const bucket = rateLimitStore.get(identifier);

  if (!bucket || now > bucket.expiresAt) {
    rateLimitStore.set(identifier, {
      count: 1,
      expiresAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTimeMs: windowMs,
    };
  }

  if (bucket.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTimeMs: Math.max(0, bucket.expiresAt - now),
    };
  }

  bucket.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - bucket.count,
    resetTimeMs: Math.max(0, bucket.expiresAt - now),
  };
}

// Clean up expired buckets periodically (in-memory GC)
if (typeof setInterval !== 'undefined') {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of rateLimitStore.entries()) {
      if (now > bucket.expiresAt) {
        rateLimitStore.delete(key);
      }
    }
  }, 300000); // Clean every 5 minutes
  if (timer && typeof timer.unref === 'function') {
    timer.unref();
  }
}

// ==========================================
// 5. SECURITY ARCHITECTURE REPORT
// ==========================================

export function getSecurityPostureSummary() {
  return {
    architecture: 'Zero-Knowledge Civic Discovery',
    complianceStandard: 'Digital Personal Data Protection (DPDP) Act 2023 Principles',
    activeDefenses: [
      {
        name: 'Client & Server PII Redaction',
        description: 'Automatic regex-based detection and masking of Aadhaar (12-digit), PAN, IFSC, bank account numbers, and phone numbers before any network dispatch.',
        status: 'Active',
      },
      {
        name: 'Adversarial Prompt Guard',
        description: 'Interception of instruction override, jailbreak, persona hijacking, and forced eligibility falsification.',
        status: 'Active',
      },
      {
        name: 'Rate Limiting & Anti-DDoS',
        description: 'Sliding-window quota of 20 requests per minute per IP address on LLM proxy endpoints.',
        status: 'Active',
      },
      {
        name: 'Deterministic Rule Isolation',
        description: 'LLM responses cannot override, alter, or synthesize scheme eligibility verdicts. The engine runs deterministic boolean evaluators.',
        status: 'Active',
      },
      {
        name: 'Zero Citizen Data Persistence',
        description: 'No database storage of citizen profiles. Questionnaire answers exist ephemerally in client memory and can be cleared with one click.',
        status: 'Active',
      },
      {
        name: 'Server-Side Credential Isolation',
        description: 'NVIDIA NIM API keys remain strictly in server environment variables and are never bundled into client JS assets.',
        status: 'Active',
      },
    ],
  };
}
