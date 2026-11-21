'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '@/types/scheme';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AssistantPanelProps {
  currentProfile?: UserProfile;
  initialPrompt?: string;
}

export function AssistantPanel({ currentProfile = {}, initialPrompt }: AssistantPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Namaste! I am your SchemeSaathi Civic Assistant. You can ask me questions about government scheme rules, required documents, or how your profile affects your eligibility.',
    },
  ]);
  const [input, setInput] = useState('');
  const [prevPrompt, setPrevPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (initialPrompt && initialPrompt.trim() !== '' && initialPrompt !== prevPrompt) {
    setPrevPrompt(initialPrompt);
    setInput(initialPrompt);
    setIsOpen(true);
  }

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userQuestion = input.trim();
    setInput('');
    setErrorMsg(null);

    // Optimistically append user message
    const updatedMessages: Message[] = [...messages, { role: 'user', content: userQuestion }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userQuestion,
          profile: currentProfile,
          conversationHistory: updatedMessages.slice(-6),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reach SchemeSaathi Assistant.');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.answer || 'I am sorry, but I could not formulate an answer based on official scheme rules.',
        },
      ]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setErrorMsg(message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Unable to process your request right now. Please verify official rules directly on scheme pages.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      aria-label="SchemeSaathi AI Assistant"
      className="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm overflow-hidden"
    >
      {/* Header Toggle */}
      <div className="bg-primary-container text-on-primary p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-tertiary-container text-tertiary-fixed flex items-center justify-center font-bold text-xs">
            AI
          </div>
          <div>
            <h3 className="font-headline-sm text-sm font-bold leading-tight flex items-center gap-1.5">
              <span>SchemeSaathi Smart Assistant</span>
              <span className="bg-tertiary-container text-tertiary-fixed text-[10px] px-1.5 py-0.5 rounded font-normal">
                Grounded
              </span>
            </h3>
            <p className="font-body-sm text-[11px] text-surface-container-highest leading-none">
              Answers grounded exclusively in official scheme catalog rules
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="assistant-body"
          className="font-label-md text-xs font-semibold px-2.5 py-1 rounded-lg bg-primary hover:bg-primary/80 text-on-primary transition-colors focus:ring-2 focus:ring-secondary"
        >
          {isOpen ? 'Minimize' : 'Open Assistant'}
        </button>
      </div>

      {isOpen && (
        <div id="assistant-body" className="p-4 flex flex-col h-[400px]">
          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 font-body-sm text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface text-on-surface border border-surface-container'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-on-surface-variant">
                    {m.role === 'user' ? 'You' : 'SchemeSaathi Assistant'}
                  </span>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface border border-surface-container rounded-xl p-3 text-on-surface-variant flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                  <span>Checking rules and generating grounded answer...</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-2 bg-error-container text-on-error-container rounded-lg text-[11px]">
                {errorMsg}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Assistant Boundary Disclaimer */}
          <div className="py-2 text-[10px] text-on-surface-variant border-t border-surface-container flex items-center justify-between">
            <span>Model: Llama 3.3 70B (NVIDIA NIM) • Rule outcomes are strictly deterministic</span>
            <span>Do not enter Aadhaar/OTP</span>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-surface-container">
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
              className="flex-1 px-3 py-2 text-xs border border-outline-variant rounded-xl bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-xl hover:bg-primary-container disabled:opacity-50 transition-colors focus:ring-2 focus:ring-secondary"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
