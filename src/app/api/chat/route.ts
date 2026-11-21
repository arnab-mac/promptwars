import { NextRequest, NextResponse } from 'next/server';
import { getAssistantResponse } from '@/lib/ai-adapter';
import { SCHEMES, UserProfile } from '@/lib/schemes';
import { evaluateAllSchemes } from '@/lib/eligibility-engine';
import { 
  detectAndRedactPII, 
  detectPromptInjection, 
  sanitizeInput, 
  checkRateLimit 
} from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
               req.headers.get('x-real-ip') || 
               'anonymous-client';
               
    const rateLimit = checkRateLimit(ip, 20, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please wait a minute before sending another query to conserve public civic resources.',
          retryAfterMs: rateLimit.resetTimeMs,
        },
        { 
          status: 429,
          headers: { 'Retry-After': String(Math.ceil(rateLimit.resetTimeMs / 1000)) } 
        }
      );
    }

    // 2. Content Type Validation
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected application/json.' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { message, conversationHistory = [], profile = {} } = body;

    // 3. Input Validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Field "message" is required and must be a string.' },
        { status: 400 }
      );
    }

    const cleanedMessage = sanitizeInput(message);
    if (cleanedMessage.length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    if (cleanedMessage.length > 1000) {
      return NextResponse.json(
        { error: 'Message exceeds maximum length of 1000 characters.' },
        { status: 400 }
      );
    }

    // 4. Adversarial Prompt Injection Guard
    const injectionCheck = detectPromptInjection(cleanedMessage);
    if (injectionCheck.isSuspicious) {
      return NextResponse.json({
        reply: `🛡️ **SchemeSaathi Civic Security Alert**\n\nYour message was intercepted by our integrity guard because it contained patterns attempting to manipulate system instructions or force eligibility outcomes (*${injectionCheck.matchedPatterns.join(', ')}*).\n\nSchemeSaathi evaluates government welfare eligibility strictly through verified deterministic rules, never arbitrary AI claims. If you wish to check your eligibility, please update your profile details in the Wizard or inspect the official scheme criteria directly.`,
        isAIAvailable: true,
        securityAlert: {
          type: 'prompt_injection_blocked',
          patterns: injectionCheck.matchedPatterns,
        },
      });
    }

    // 5. Zero-Knowledge PII Interception & Redaction
    const piiCheck = detectAndRedactPII(cleanedMessage);
    const safeMessageForAI = piiCheck.sanitizedText;

    // 6. Evaluate current profile against all schemes to create deterministic context
    const cleanProfile: UserProfile = profile && typeof profile === 'object' ? profile : {};
    const evaluationResults = evaluateAllSchemes(SCHEMES, cleanProfile);

    // Format compact context for AI grounding
    const schemeContextSummary = evaluationResults
      .slice(0, 8)
      .map((r) => ({
        id: r.scheme.id,
        name: r.scheme.name,
        department: r.scheme.department,
        scope: r.scheme.scope,
        benefit: r.scheme.benefitSummary,
        overallStatus: r.overallLabel,
        conditions: r.conditionResults.map((c) => ({
          label: c.label,
          status: c.status,
          reason: c.reason,
        })),
        unchecked: r.scheme.uncheckedRequirements,
      }));

    // 7. Call Grounded AI Model
    const response = await getAssistantResponse(
      safeMessageForAI,
      Array.isArray(conversationHistory) ? conversationHistory.slice(-6) : [],
      JSON.stringify(schemeContextSummary)
    );

    // Prepend PII safety warning if sensitive data was intercepted
    let finalReply = response.content;
    if (piiCheck.hasPII) {
      finalReply = `⚠️ *Notice: ${piiCheck.warnings[0]}*\n\n${finalReply}`;
    }

    return NextResponse.json({
      reply: finalReply,
      isAIAvailable: response.isAIAvailable,
      error: response.error,
      piiRedacted: piiCheck.hasPII ? piiCheck.detectedTypes : undefined,
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      {
        error: 'The assistant service encountered an unexpected error. Please check official portals.',
        details: process.env.NODE_ENV === 'development' ? errMsg : undefined,
      },
      { status: 500 }
    );
  }
}
