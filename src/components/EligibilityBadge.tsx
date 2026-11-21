import React from 'react';
import { EligibilityStatus } from '@/lib/schemes';

interface EligibilityBadgeProps {
  status: EligibilityStatus;
  label?: string;
  className?: string;
}

export function EligibilityBadge({ status, label, className = '' }: EligibilityBadgeProps) {
  if (status === 'pass') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] ${className}`}
        aria-label={`Criterion met: ${label || 'Meets checked criteria'}`}
      >
        <svg
          className="w-3.5 h-3.5 flex-shrink-0 text-[#065f46]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
        </svg>
        <span>{label || 'Meets checked criterion'}</span>
      </span>
    );
  }

  if (status === 'fail') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] ${className}`}
        aria-label={`Criterion not met: ${label || 'Does not match checked criterion'}`}
      >
        <svg
          className="w-3.5 h-3.5 flex-shrink-0 text-[#991b1b]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>{label || 'Does not match checked criterion'}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#fef3c7] text-[#92400e] border border-[#fde68a] ${className}`}
      aria-label={`Criterion requires more information: ${label || 'More information needed'}`}
    >
      <svg
        className="w-3.5 h-3.5 flex-shrink-0 text-[#92400e]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01"
        />
      </svg>
      <span>{label || 'More information needed'}</span>
    </span>
  );
}
