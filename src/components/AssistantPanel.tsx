'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '@/lib/schemes';

interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AssistantPanelProps {
  currentProfile?: UserProfile;
  initialQuery?: string;
  isOpenDefault?: boolean;
}

export function AssistantPanel({ currentProfile, initialQuery, isOpenDefault = false }: AssistantPanelProps) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      role: 'assistant',
      content:
        'Namaste! I am your SchemeSaathi Assistant. I can help clarify scheme rules, document requirements, and next steps based on your answers. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState(initialQuery || '');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      setInput(initialQuery);
      setIsOpen(true);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || loading) return;

    if (query.length > 500) {
      setErrorMsg('Message is too long (limit 500 characters).');
      return;
    }

    setErrorMsg(null);
    const newMessages: AssistantMessage[] = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory: newMessages.slice(-6),
          profile: currentProfile || {},
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Unable to connect to assistant service.');
      }

      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: data.reply || 'I could not generate an answer. Please review the official scheme page directly.',
        },
      ]);
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : 'Assistant service temporarily unavailable.';
      setErrorMsg(errText);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            '⚠️ Note: The conversational AI assistant is running in fallback mode or temporarily unavailable. The deterministic eligibility wizard and rule checks above remain 100% active and verified.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      aria-label="SchemeSaathi AI Assistant"
      className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden"
    >
      {/* Header Toggle */}
      <div className="bg-[#0f2942] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#00897b] flex items-center justify-center font-bold text-white text-xs">
            AI
          </div>
          <div>
            <h3 className="text-sm font-bold leading-tight flex items-center gap-1.5">
              <span>SchemeSaathi Smart Assistant</span>
              <span className="bg-[#00897b] text-white text-[10px] px-1.5 py-0.2 rounded font-normal">
                Grounded
              </span>
            </h3>
            <p className="text-[11px] text-slate-300 leading-none">
              Answers grounded exclusively in official scheme catalog rules
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="assistant-body"
          className="text-xs font-semibold px-2.5 py-1 rounded bg-[#1a3d5c] hover:bg-[#254d73] text-white transition-colors focus:ring-2 focus:ring-[#e65100]"
        >
          {isOpen ? 'Minimize' : 'Open Assistant'}
        </button>
      </div>

      {isOpen && (
        <div id="assistant-body" className="p-4 flex flex-col h-[400px]">
          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded p-3 leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#0f2942] text-white'
                      : 'bg-[#f8f9ff] text-[#0d1c2f] border border-slate-200'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-slate-400">
                    {m.role === 'user' ? 'You' : 'SchemeSaathi Assistant'}
                  </span>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#f8f9ff] border border-slate-200 rounded p-3 text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00897b] animate-ping" />
                  <span>Checking rules and generating grounded answer...</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-2 bg-amber-50 border border-amber-200 rounded text-amber-800 text-[11px]">
                {errorMsg}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Assistant Boundary Disclaimer */}
          <div className="py-2 text-[10px] text-slate-500 border-t border-slate-100 flex items-center justify-between">
            <span>Model: Llama 3.3 70B (NVIDIA NIM) • Rule outcomes are strictly deterministic</span>
            <span>Do not enter Aadhaar/OTP</span>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-slate-200">
            <label htmlFor="assistant-input" className="sr-only">
              Ask SchemeSaathi Assistant
            </label>
            <input
              id="assistant-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Can a tenant farmer apply for PM-KISAN?"
              maxLength={500}
              disabled={loading}
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#0f2942] focus:ring-1 focus:ring-[#0f2942] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2 bg-[#0f2942] text-white text-xs font-bold rounded hover:bg-[#1a3d5c] disabled:opacity-50 transition-colors focus:ring-2 focus:ring-[#e65100]"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
