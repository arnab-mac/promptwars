'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SchemeResult } from '@/lib/eligibility-engine';
import { EligibilityBadge } from './EligibilityBadge';

interface SchemeCardProps {
  result: SchemeResult;
  onAskScheme?: (schemeName: string) => void;
}

export function SchemeCard({ result, onAskScheme }: SchemeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { scheme, overallMatch, overallLabel, conditionResults, passCount, failCount, unknownCount } = result;

  const cardBorderClass =
    overallMatch === 'matches-checked-criteria'
      ? 'border-l-4 border-l-tertiary-container'
      : overallMatch === 'more-info-needed'
      ? 'border-l-4 border-l-secondary'
      : 'border-l-4 border-l-outline-variant';

  return (
    <article
      className={`bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm hover:shadow-md transition-all ${cardBorderClass} overflow-hidden`}
    >
      <div className="p-6 sm:p-7">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                scheme.scope === 'central'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-primary border border-surface-container-highest'
              }`}
            >
              {scheme.scope === 'central' ? 'Central Sector Scheme' : `State: ${scheme.stateCode || 'Regional'}`}
            </span>
            <span className="text-xs text-on-surface-variant font-semibold truncate max-w-[240px] sm:max-w-md">
              {scheme.department}
            </span>
          </div>

          <EligibilityBadge
            status={
              overallMatch === 'matches-checked-criteria'
                ? 'pass'
                : overallMatch === 'does-not-match'
                ? 'fail'
                : 'unknown'
            }
            label={overallLabel}
          />
        </div>

        {/* Title & Monetary Benefit Callout */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            <Link
              href={`/schemes/${scheme.id}`}
              className="text-lg sm:text-xl font-bold text-primary hover:text-secondary transition-colors"
            >
              {scheme.name}
            </Link>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              {scheme.benefitSummary}
            </p>
          </div>

          {scheme.benefitAmount && (
            <div className="bg-surface-container-low px-4 py-2.5 rounded-xl border border-surface-container-highest text-right shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                Primary Benefit
              </span>
              <span className="font-tabular-amount text-sm sm:text-base font-extrabold text-secondary">
                {scheme.benefitAmount}
              </span>
            </div>
          )}
        </div>

        {/* Condition Chips */}
        <div className="flex flex-wrap items-center gap-2 py-3 border-t border-b border-surface-container my-3">
          <span className="text-xs font-bold text-on-surface mr-1">Evaluated Conditions:</span>

          {passCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tertiary-container/10 text-tertiary border border-tertiary-container/30">
              <span className="material-symbols-outlined text-xs">check</span>
              <span>{passCount} Satisfied</span>
            </span>
          )}

          {failCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-error-container text-on-error-container border border-error/20">
              <span className="material-symbols-outlined text-xs">close</span>
              <span>{failCount} Unmet</span>
            </span>
          )}

          {unknownCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary-fixed/50 text-on-secondary-fixed border border-secondary/20">
              <span className="material-symbols-outlined text-xs">help_outline</span>
              <span>{unknownCount} Missing info</span>
            </span>
          )}
        </div>

        {/* Expandable Breakdown Drawer */}
        {expanded && (
          <div className="mt-4 pt-3 space-y-3 bg-surface-container-low p-4 rounded-xl border border-surface-container">
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
              Detailed Rule Assessment
            </h4>
            <ul className="space-y-2">
              {conditionResults.map((c) => (
                <li key={c.conditionId} className="flex items-start gap-2 text-xs">
                  <span
                    className={`material-symbols-outlined text-sm mt-0.5 shrink-0 ${
                      c.status === 'pass'
                        ? 'text-tertiary'
                        : c.status === 'fail'
                        ? 'text-error'
                        : 'text-secondary'
                    }`}
                  >
                    {c.status === 'pass' ? 'check_circle' : c.status === 'fail' ? 'cancel' : 'help'}
                  </span>
                  <div>
                    <span className="font-bold text-on-surface">{c.label}: </span>
                    <span className="text-on-surface-variant">{c.reason}</span>
                  </div>
                </li>
              ))}
            </ul>

            {scheme.uncheckedRequirements && scheme.uncheckedRequirements.length > 0 && (
              <div className="pt-2 border-t border-surface-container-highest">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary block mb-1">
                  Additional Unchecked Requirements (Verify on Official Portal)
                </span>
                <ul className="list-disc list-inside text-xs text-on-surface-variant space-y-1">
                  {scheme.uncheckedRequirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Card Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-1">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors"
          >
            <span>{expanded ? 'Hide condition breakdown' : 'Show full criteria breakdown'}</span>
            <span className="material-symbols-outlined text-sm">
              {expanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          <div className="flex items-center gap-2">
            {onAskScheme && (
              <button
                type="button"
                onClick={() => onAskScheme(scheme.name)}
                className="px-3 py-1.5 rounded-lg border border-surface-container-highest text-xs font-semibold text-primary hover:bg-surface-container-low transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm text-secondary">psychology_alt</span>
                <span>Ask AI</span>
              </button>
            )}

            <Link
              href={`/schemes/${scheme.id}`}
              className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-sm transition-all flex items-center gap-1"
            >
              <span>View Details</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
