import { NextRequest, NextResponse } from 'next/server';
import { getAssistantResponse } from '@/lib/ai-adapter';
import { SCHEMES, UserProfile } from '@/lib/schemes';
import { evaluateAllSchemes } from '@/lib/eligibility-engine';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected application/json.' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { message, conversationHistory = [], profile = {} } = body;

    // Validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Field "message" is required and must be a string.' },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message exceeds maximum length of 1000 characters.' },
        { status: 400 }
      );
    }

    // Evaluate current profile against all schemes to create deterministic context
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

    const response = await getAssistantResponse(
      message,
      Array.isArray(conversationHistory) ? conversationHistory.slice(-6) : [],
      JSON.stringify(schemeContextSummary)
    );

    return NextResponse.json({
      reply: response.content,
      isAIAvailable: response.isAIAvailable,
      error: response.error,
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
