import React from 'react';
import { EligibilityStatus } from '@/types/scheme';

interface EligibilityBadgeProps {
  status: EligibilityStatus;
  label?: string;
  className?: string;
}

export function EligibilityBadge({ status, label, className = '' }: EligibilityBadgeProps) {
  if (status === 'pass') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-tertiary-container text-tertiary-fixed border border-on-tertiary-container/30 ${className}`}
        aria-label={`Criterion met: ${label || 'Meets checked criteria'}`}
      >
        <svg
          className="w-3.5 h-3.5 shrink-0 text-tertiary-fixed"
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
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-error-container text-on-error-container border border-error/30 ${className}`}
        aria-label={`Criterion not met: ${label || 'Does not match checked criterion'}`}
      >
        <svg
          className="w-3.5 h-3.5 shrink-0 text-on-error-container"
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
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-fixed text-on-secondary-fixed border border-secondary-fixed-dim ${className}`}
      aria-label={`Criterion requires more information: ${label || 'More information needed'}`}
    >
      <svg
        className="w-3.5 h-3.5 shrink-0 text-on-secondary-fixed"
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
