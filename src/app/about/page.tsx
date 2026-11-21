import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Civic Transparency, Decision Logic & Privacy Architecture | SchemeSaathi',
  description:
    'An open civic initiative dedicated to simplifying welfare discovery, removing administrative ambiguity, and upholding citizen privacy.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-margin lg:px-gutter-desktop py-space-xl">
      <header className="mb-10 text-center sm:text-left border-b border-surface-container pb-8">
        <span className="font-label-md text-xs font-bold uppercase tracking-wider text-on-tertiary-container">
          Civic Transparency &amp; Methodology
        </span>
        <h1 className="font-headline-lg text-3xl sm:text-4xl font-extrabold text-primary mt-1">
          About SchemeSaathi
        </h1>
        <p className="mt-3 font-body-md text-base text-on-surface-variant max-w-2xl">
          An open civic initiative dedicated to simplifying welfare discovery, removing administrative ambiguity, and upholding citizen privacy.
        </p>
      </header>

      <div className="space-y-10 font-body-md text-sm text-on-surface leading-relaxed">
        {/* Problem Statement */}
        <section>
          <h2 className="font-headline-sm text-xl font-bold text-primary mb-3">
            1. Problem Statement
          </h2>
          <p>
            The Government of India and State Governments run hundreds of welfare schemes offering cash transfers, housing grants, healthcare coverage, and enterprise subsidies. However, eligibility rules are scattered across various portals, written in complex administrative language, and frequently change.
          </p>
          <p className="mt-2">
            Consequently, millions of eligible citizens—especially smallholder farmers, rural women, students, and low-income workers—miss out on life-changing benefits. SchemeSaathi was built to provide an instant, explainable, and accessible discovery interface that translates complex gazette rules into clear personal criteria.
          </p>
        </section>

        {/* Logical Decision Engine */}
        <section>
          <h2 className="font-headline-sm text-xl font-bold text-primary mb-3">
            2. Decision Logic &amp; Rule Architecture
          </h2>
          <p>
            Unlike opaque recommendation engines that give arbitrary &ldquo;87% match&rdquo; scores, SchemeSaathi employs a <strong>deterministic, tri-state evaluation model</strong>:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside font-body-sm text-xs sm:text-sm text-on-surface">
            <li>
              <strong>Pass:</strong> The user&apos;s answer meets the checked criterion (e.g., age within the specified range).
            </li>
            <li>
              <strong>Fail:</strong> The user&apos;s answer violates a mandatory exclusion (e.g., annual income exceeds scheme ceiling).
            </li>
            <li>
              <strong>Unknown:</strong> The citizen skipped the question or chose &ldquo;Prefer not to say&rdquo; / &ldquo;I don&apos;t know&rdquo;.
            </li>
          </ul>
          <p className="mt-3 text-xs bg-surface-container-low p-3 rounded-xl border border-surface-container">
            <strong>Rule:</strong> Missing answers are treated as <em>unknown</em>—never false. Any failed condition places the scheme in &ldquo;Does not match a checked criterion&rdquo;, while schemes with only passes and unknowns are marked &ldquo;More information needed&rdquo;.
          </p>
        </section>

        {/* AI Integration */}
        <section>
          <h2 className="font-headline-sm text-xl font-bold text-primary mb-3">
            3. AI Assistant &amp; Safety Boundaries
          </h2>
          <p>
            SchemeSaathi includes a conversational assistant powered by <strong>NVIDIA NIM (meta/llama-3.3-70b-instruct)</strong>. To protect citizens from AI hallucinations:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside font-body-sm text-xs sm:text-sm text-on-surface">
            <li>
              The AI model is strictly grounded in the catalog rules and deterministic evaluation results passed to it via server-side context.
            </li>
            <li>
              The AI is explicitly forbidden from overriding rule outcomes or claiming that an application has been approved.
            </li>
            <li>
              Private API credentials remain strictly server-side and are never exposed in browser bundles or client requests.
            </li>
            <li>
              If the AI service experiences a timeout or outage, the application degrades gracefully to the deterministic rule wizard without any loss of functionality.
            </li>
          </ul>
        </section>

        {/* Privacy Safeguards */}
        <section id="privacy" className="bg-surface-container-low p-6 rounded-2xl border border-surface-container-highest">
          <h2 className="font-headline-sm text-xl font-bold text-primary mb-3">
            4. Privacy &amp; Data Ethics Policy
          </h2>
          <p className="text-on-surface">
            SchemeSaathi was designed with strict zero-knowledge civic privacy principles:
          </p>
          <ul className="mt-3 space-y-1.5 list-disc list-inside font-body-sm text-xs sm:text-sm text-on-surface">
            <li>We do not request Aadhaar numbers, PAN, bank accounts, or phone numbers.</li>
            <li>Profile answers reside purely in memory and the URL query parameters during your session.</li>
            <li>No database or persistent tracking cookies are utilized.</li>
            <li>Clicking &ldquo;Reset All Answers&rdquo; completely purges your demographic context.</li>
          </ul>
        </section>

        {/* Verified Portals & Sources */}
        <section>
          <h2 className="font-headline-sm text-xl font-bold text-primary mb-3">
            5. Government Data Sources &amp; Verification
          </h2>
          <p>
            All 10 initial welfare programs in SchemeSaathi have been audited and verified against official Ministry guidelines as of <strong>November 21, 2024</strong>:
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 font-body-sm text-xs">
            <div className="p-3 bg-surface-container-lowest border border-surface-container rounded-xl">
              <strong>PM-KISAN:</strong> Ministry of Agriculture &amp; Farmers Welfare (pmkisan.gov.in)
            </div>
            <div className="p-3 bg-surface-container-lowest border border-surface-container rounded-xl">
              <strong>Ayushman Bharat PM-JAY:</strong> National Health Authority (pmjay.gov.in)
            </div>
            <div className="p-3 bg-surface-container-lowest border border-surface-container rounded-xl">
              <strong>PMAY-G:</strong> Ministry of Rural Development (pmayg.nic.in)
            </div>
            <div className="p-3 bg-surface-container-lowest border border-surface-container rounded-xl">
              <strong>Sukanya Samriddhi Yojana:</strong> National Savings Institute (nsiindia.gov.in)
            </div>
            <div className="p-3 bg-surface-container-lowest border border-surface-container rounded-xl">
              <strong>PM Jan Dhan Yojana:</strong> Dept of Financial Services (pmjdy.gov.in)
            </div>
            <div className="p-3 bg-surface-container-lowest border border-surface-container rounded-xl">
              <strong>PMEGP:</strong> KVIC / Ministry of MSME (kviconline.gov.in)
            </div>
          </div>
        </section>

        {/* Non-Governmental Disclaimer */}
        <section className="p-5 bg-secondary-fixed/20 border border-secondary-fixed rounded-xl text-on-secondary-container font-body-sm text-xs leading-relaxed">
          <strong>Important Public Disclaimer:</strong> SchemeSaathi is an independent hackathon civic technology project. It is not affiliated with, endorsed by, or operated on behalf of the Government of India or any State Government. Welfare eligibility is governed by official departmental orders, state quotas, and biometric KYC verification.
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-surface-container text-center">
        <Link
          href="/wizard"
          className="inline-block px-6 py-3 bg-secondary hover:bg-secondary-container text-on-secondary font-label-md font-bold text-xs rounded-xl transition-colors shadow-sm"
        >
          Start Scheme Eligibility Check →
        </Link>
      </div>
    </div>
  );
}
