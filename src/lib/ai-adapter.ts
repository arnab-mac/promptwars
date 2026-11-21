// This module is server-side ONLY — never import in client components

export interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AssistantResponse {
  content: string;
  error?: string;
  isAIAvailable: boolean;
}

const NVIDIA_NIM_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'meta/llama-3.3-70b-instruct';
const TIMEOUT_MS = 10_000;

function getApiKey(): string {
  const key = process.env.NVIDIA_API_KEY;
  if (!key) {
    throw new Error('NVIDIA_API_KEY is not set in environment variables.');
  }
  return key;
}

function sanitizeInput(input: string): string {
  // Strip anything that looks like a system-role injection attempt
  const stripped = input
    .replace(/<\|system\|>/gi, '')
    .replace(/\[INST\]/gi, '')
    .replace(/\[\/INST\]/gi, '')
    .replace(/<<SYS>>/gi, '')
    .replace(/<</gi, '')
    .replace(/>>/gi, '')
    .trim();

  // Limit to 1000 chars
  return stripped.slice(0, 1000);
}

function buildSystemPrompt(schemeContext: string): string {
  return `You are SchemeSaathi Assistant, a helpful guide that explains Indian government welfare schemes.

IMPORTANT RULES:
1. Ground all responses in the scheme context provided below. Do not invent scheme details.
2. Never override the eligibility rule engine results shown to the user. You may explain WHY criteria pass or fail.
3. Always remind users that this is NOT an official government service and results are preliminary.
4. If a user mentions personal details (income, age, caste, etc.) in conversation, ask for explicit confirmation before using that data to explain eligibility.
5. Keep responses concise, friendly, and jargon-free.
6. If asked about schemes not in the context, say you have information about the schemes listed and suggest they check official government portals.

SCHEME CONTEXT (from the user's eligibility check):
${schemeContext}

Remember: You are a civic prototype tool. Encourage users to verify all details on official government websites before applying for any scheme.`;
}

export async function getAssistantResponse(
  userMessage: string,
  conversationHistory: AssistantMessage[],
  schemeContext: string
): Promise<AssistantResponse> {
  let apiKey: string;
  try {
    apiKey = getApiKey();
  } catch {
    return {
      content: '',
      error: 'AI assistant is not configured.',
      isAIAvailable: false,
    };
  }

  const sanitized = sanitizeInput(userMessage);

  const messages = [
    { role: 'system', content: buildSystemPrompt(schemeContext) },
    // Include conversation history (capped at 10 turns = 20 messages)
    ...conversationHistory.slice(-20),
    { role: 'user', content: sanitized },
  ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(NVIDIA_NIM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 512,
        temperature: 0.3,
        top_p: 0.9,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 429) {
      return {
        content: '',
        error: 'AI service is busy. Please try again in a moment.',
        isAIAvailable: false,
      };
    }

    if (response.status === 503) {
      return {
        content: '',
        error: 'AI service is temporarily unavailable.',
        isAIAvailable: false,
      };
    }

    if (!response.ok) {
      return {
        content: '',
        error: 'AI service returned an error. Please try again.',
        isAIAvailable: false,
      };
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      return {
        content: '',
        error: 'AI service returned an unexpected response.',
        isAIAvailable: false,
      };
    }

    // Validate structure
    if (
      typeof data !== 'object' ||
      data === null ||
      !('choices' in data) ||
      !Array.isArray((data as Record<string, unknown>).choices) ||
      (data as { choices: unknown[] }).choices.length === 0
    ) {
      return {
        content: '',
        error: 'AI service returned an unexpected format.',
        isAIAvailable: false,
      };
    }

    const choices = (data as { choices: unknown[] }).choices;
    const firstChoice = choices[0];

    if (
      typeof firstChoice !== 'object' ||
      firstChoice === null ||
      !('message' in firstChoice) ||
      typeof (firstChoice as Record<string, unknown>).message !== 'object'
    ) {
      return {
        content: '',
        error: 'AI service returned an unexpected response format.',
        isAIAvailable: false,
      };
    }

    const message = (firstChoice as { message: unknown }).message as Record<string, unknown>;
    const content = typeof message.content === 'string' ? message.content : '';

    return {
      content,
      isAIAvailable: true,
    };
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === 'AbortError') {
      return {
        content: '',
        error: 'AI assistant timed out. Please try again.',
        isAIAvailable: false,
      };
    }

    return {
      content: '',
      error: 'Could not reach the AI service.',
      isAIAvailable: false,
    };
  }
}
