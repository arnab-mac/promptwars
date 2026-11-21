import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-primary text-on-primary mt-space-xl shadow-lg border-t border-primary-container">
      <div className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter">
          {/* Col 1 & 2: Brand & Helpline */}
          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm font-bold text-surface-container-lowest tracking-tight">SchemeSaathi</span>
              <span className="font-label-md text-label-md text-secondary-fixed">(योजना साथी)</span>
            </div>
            <p className="font-body-sm text-body-sm text-surface-variant max-w-sm">
              Unified Civic Welfare &amp; Direct Benefit Transfer discovery platform connecting rural and urban citizens with 2,400+ Central and State welfare initiatives.
            </p>
            <div className="flex items-center gap-space-md pt-space-xs">
              <div className="flex items-center gap-space-xs bg-primary-container px-space-sm py-1 rounded">
                <span className="material-symbols-outlined text-secondary-fixed text-lg">support_agent</span>
                <div>
                  <span className="block font-label-md text-label-md text-on-primary-container">Citizen Helpline (Toll-Free)</span>
                  <span className="font-tabular-amount text-sm text-on-primary font-bold">1800-11-7788</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Access */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-lg text-label-lg font-bold text-surface-container-high tracking-wider uppercase mb-space-xs text-xs">Quick Access</span>
            <a className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="https://india.gov.in" target="_blank" rel="noopener noreferrer">National Portal of India</a>
            <a className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer">Digital India Initiatives</a>
            <a className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="https://dbtbharat.gov.in" target="_blank" rel="noopener noreferrer">DBT Bharat Mission</a>
            <a className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="https://mygov.in" target="_blank" rel="noopener noreferrer">MyGov Citizen Engagement</a>
            <Link className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="/tracker">Application Status Tracker</Link>
          </div>

          {/* Col 4: Legal & Redressal */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-lg text-label-lg font-bold text-surface-container-high tracking-wider uppercase mb-space-xs text-xs">Legal &amp; Redressal</span>
            <a className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer">Public Grievance Portal (CPGRAMS)</a>
            <Link className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="/security">Security &amp; Zero-Knowledge Shield</Link>
            <Link className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="/about">Citizen Charter &amp; FAQ</Link>
            <Link className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="/about">Data Protection &amp; DPDP Policy</Link>
          </div>

          {/* Col 5: Civic Verification */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-lg text-label-lg font-bold text-surface-container-high tracking-wider uppercase mb-space-xs text-xs">Civic Verification</span>
            <div className="bg-primary-container p-space-sm rounded flex flex-col gap-space-xs border border-primary-container">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-tertiary-fixed text-base">verified_user</span>
                <span className="font-label-md text-label-md font-bold text-on-primary">STQC Certified Web Portal</span>
              </div>
              <p className="font-label-md text-label-md text-on-primary-container text-xs">
                Compliant with GIGW (Guidelines for Indian Government Websites) 3.0 &amp; WCAG 2.1 AA.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Maintenance Strip */}
        <div className="mt-space-xl pt-space-md bg-primary-container/40 rounded flex flex-col sm:flex-row items-center justify-between gap-space-sm px-space-md py-space-sm text-surface-variant font-label-md text-xs">
          <div>© 2025 SchemeSaathi • Ministry of Electronics &amp; IT (MeitY), Government of India. All rights reserved.</div>
          <div>Designed &amp; Maintained by National Informatics Centre (NIC)</div>
        </div>
      </div>
    </footer>
  );
}
