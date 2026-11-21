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
      ? 'border-l-4 border-l-[#00897b]'
      : overallMatch === 'more-info-needed'
      ? 'border-l-4 border-l-[#a83900]'
      : 'border-l-4 border-l-slate-300';

  return (
    <article
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all ${cardBorderClass} overflow-hidden`}
    >
      <div className="p-6 sm:p-7">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                scheme.scope === 'central'
                  ? 'bg-[#001428] text-white'
                  : 'bg-[#e6eeff] text-[#001428] border border-[#d5e3fd]'
              }`}
            >
              {scheme.scope === 'central' ? 'Central Sector Scheme' : `State: ${scheme.stateCode || 'Regional'}`}
            </span>
            <span className="text-xs text-slate-500 font-semibold truncate max-w-[240px] sm:max-w-md">
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
            <h3 className="text-lg sm:text-xl font-bold text-[#001428] leading-tight">
              <Link
                href={`/schemes/${scheme.id}`}
                className="hover:text-[#a83900] transition-colors focus:ring-2 focus:ring-[#fc6018] rounded"
              >
                {scheme.name}
              </Link>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              {scheme.benefitSummary}
            </p>
          </div>

          {scheme.benefitAmount && (
            <div className="flex-shrink-0 bg-[#e6f4ea] border border-[#a7f3d0] rounded-xl p-3 sm:p-3.5 text-right sm:min-w-[190px]">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#065f46]">
                Direct Benefit Transfer
              </span>
              <span className="block text-base sm:text-lg font-extrabold text-[#065f46] tabular-nums mt-0.5 font-mono">
                {scheme.benefitAmount}
              </span>
            </div>
          )}
        </div>

        {/* Criteria Tags / Pills from Stitch */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {scheme.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[#f8f9ff] text-slate-700 font-medium px-2.5 py-0.5 rounded-full border border-slate-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Condition Summary Counts */}
        <div className="bg-[#f8f9ff] border border-slate-200 rounded-xl p-3 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-slate-700">
            <span className="inline-flex items-center gap-1">
              <strong className="text-[#065f46] font-bold">{passCount}</strong> met
            </span>
            <span className="inline-flex items-center gap-1">
              <strong className="text-[#991b1b] font-bold">{failCount}</strong> unmet
            </span>
            <span className="inline-flex items-center gap-1">
              <strong className="text-[#a83900] font-bold">{unknownCount}</strong> needing info
            </span>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="text-xs font-bold text-[#001428] hover:text-[#a83900] flex items-center gap-1 focus:ring-2 focus:ring-[#fc6018] rounded px-1.5 py-0.5"
          >
            <span>{expanded ? 'Hide rule criteria' : 'View verified criteria'}</span>
            <span
              className={`material-symbols-outlined text-base transition-transform ${
                expanded ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
        </div>

        {/* Expandable Criteria Breakdown */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Evaluated Rule Criteria:
            </h4>
            <div className="space-y-2">
              {conditionResults.map((c) => (
                <div
                  key={c.conditionId}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex-1">
                    <span className="font-bold text-slate-900 block">{c.label}</span>
                    <span className="text-slate-500 block mt-0.5">{c.reason}</span>
                  </div>
                  <EligibilityBadge status={c.status} />
                </div>
              ))}
            </div>

            {scheme.uncheckedRequirements && scheme.uncheckedRequirements.length > 0 && (
              <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900">
                <span className="font-bold block mb-1">
                  ⚠️ Unchecked Departmental Requirements (Confirm before applying):
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                  {scheme.uncheckedRequirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Card Action Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link
              href={`/schemes/${scheme.id}`}
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold rounded-xl bg-[#001428] text-white hover:bg-[#0f2942] transition-colors focus:ring-2 focus:ring-[#fc6018]"
            >
              Scheme Guidelines &amp; Next Steps
            </Link>

            {onAskScheme && (
              <button
                type="button"
                onClick={() => onAskScheme(scheme.name)}
                className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl bg-white text-[#001428] border border-slate-300 hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-[#fc6018]"
              >
                <span className="material-symbols-outlined text-sm text-[#00897b]">smart_toy</span>
                <span>Ask Assistant</span>
              </button>
            )}
          </div>

          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-slate-600 hover:text-[#001428] inline-flex items-center gap-1 focus:ring-2 focus:ring-[#fc6018] rounded"
          >
            <span>Official Ministry Portal</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    </article>
  );
}
