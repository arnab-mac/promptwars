import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSchemeById, getAllSchemes } from '@/services/scheme-service';

interface SchemeDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const schemes = await getAllSchemes();
  return schemes.map((scheme) => ({
    id: scheme.id,
  }));
}

export default async function SchemeDetailPage({ params }: SchemeDetailPageProps) {
  const { id } = await params;
  const scheme = await getSchemeById(id);

  if (!scheme) {
    notFound();
  }

  // Scheme Icon mapping
  const schemeIcon =
    scheme.tags.includes('agriculture') || scheme.tags.includes('farmer')
      ? 'agriculture'
      : scheme.tags.includes('health')
      ? 'medical_services'
      : scheme.tags.includes('scholarship') || scheme.tags.includes('student')
      ? 'school'
      : scheme.tags.includes('housing')
      ? 'cottage'
      : 'account_balance';

  return (
    <div className="w-full flex flex-col">
      {/* Breadcrumb Navigation Bar from Stitch */}
      <div className="w-full bg-surface-container-low shadow-sm">
        <div className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop py-space-sm">
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-base">home</span>
              <span>Portal Home</span>
            </Link>
            <span className="material-symbols-outlined text-xs text-outline">chevron_right</span>
            <Link href="/results" className="hover:text-primary transition-colors">
              All Schemes Catalog
            </Link>
            <span className="material-symbols-outlined text-xs text-outline">chevron_right</span>
            <span className="font-bold text-on-surface truncate max-w-xs">{scheme.name}</span>
            <span className="ml-auto hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container text-tertiary-fixed font-label-md text-label-md">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-ping" />
              Active Welfare Scheme • FY 2024-25
            </span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop py-space-lg w-full flex flex-col gap-space-lg">
        {/* Scheme Header Hero Card from Stitch */}
        <section className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-md border border-surface-container">
          {/* Top Civic Authority Bar */}
          <div className="bg-primary text-on-primary px-space-lg py-space-sm flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary-fixed text-lg">assured_workload</span>
                <span className="font-label-lg text-label-lg font-semibold tracking-wide uppercase text-surface-bright">
                  {scheme.department}
                </span>
              </div>
              <span className="h-3 w-px bg-outline hidden sm:inline-block" />
              <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-md text-label-md font-bold tracking-wider uppercase">
                {scheme.scope === 'central'
                  ? 'Central Sector Scheme (100% GoI Funded)'
                  : `State Scheme (${scheme.stateCode || 'Regional'})`}
              </span>
            </div>
            <div className="flex items-center gap-space-xs text-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-sm text-tertiary-fixed">verified</span>
              <span>PFMS / DBT Integrated Portal</span>
            </div>
          </div>

          {/* Main Banner Header */}
          <div className="p-space-lg lg:p-space-xl flex flex-col lg:flex-row lg:items-start justify-between gap-space-xl">
            <div className="flex items-start gap-space-lg max-w-3xl">
              <div className="w-20 h-20 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 shadow-sm text-primary">
                <span className="material-symbols-outlined text-4xl font-bold">{schemeIcon}</span>
              </div>

              <div className="flex flex-col gap-space-xs">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold">
                    Direct Benefit Transfer (DBT)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-md text-label-md font-mono">
                    ID: {scheme.id.toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
                    Source Verified: {scheme.sourceCheckDate}
                  </span>
                </div>

                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-extrabold mt-1">
                  {scheme.name}
                </h1>

                <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                  {scheme.benefitSummary}
                </p>
              </div>
            </div>

            {/* Action Control Center from Stitch */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-space-sm shrink-0 w-full lg:w-72">
              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold rounded-lg flex items-center justify-center gap-space-sm shadow-md transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-lg">open_in_new</span>
                <span>Apply via CSC / Official Portal</span>
              </a>

              <Link
                href="/wizard"
                className="w-full h-12 bg-secondary hover:bg-secondary-container text-on-secondary font-label-lg text-label-lg font-bold rounded-lg flex items-center justify-center gap-space-sm shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-lg">fingerprint</span>
                <span>Check Your Eligibility</span>
              </Link>

              <div className="grid grid-cols-2 gap-space-xs">
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span>Guidelines</span>
                </a>
                <Link
                  href="/tracker"
                  className="h-10 bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">bookmark</span>
                  <span>Track Status</span>
                </Link>
              </div>
            </div>
          </div>

          {/* High-Impact Value Highlight Ribbon from Stitch */}
          <div className="bg-surface-container-low p-space-md lg:px-space-xl lg:py-space-md border-t border-surface-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {/* Metric 1 */}
              <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">payments</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase font-medium">Direct Benefit</span>
                  <span className="font-tabular-amount text-tabular-amount text-secondary font-extrabold font-mono">
                    {scheme.benefitAmount || 'In-Kind Benefit'}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Direct Bank Credit (DBT)</span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container">
                <div className="w-12 h-12 rounded-lg bg-tertiary-container text-tertiary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">group</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase font-medium">Beneficiary Reach</span>
                  <span className="font-tabular-amount text-tabular-amount text-on-tertiary-container font-extrabold">
                    All Qualified
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Pan-India citizen coverage</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">schedule</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase font-medium">Payment Cycle</span>
                  <span className="font-tabular-amount text-tabular-amount text-primary font-extrabold">Regular Tranches</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Public Financial System (PFMS)</span>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container">
                <div className="w-12 h-12 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">account_balance</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase font-medium">Funding Ratio</span>
                  <span className="font-tabular-amount text-tabular-amount text-primary font-extrabold">100% Central</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Zero state match required</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Column Content Area from Stitch (8 cols Main / 4 cols Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            {/* Hotlinked Visual Storytelling Hero Card from Stitch */}
            <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm bg-primary-container">
              <img
                alt="Indian Farmer inspecting crops in agricultural field"
                className="w-full h-full object-cover mix-blend-overlay opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUAYI1Zw46AA2rdh7Mr2OWP92OjegsfRfAjm8g3l6fDaIQyl8WkZO3shUt-QxFCgPaA5RQ_pQla_Jq6je0A15kFTf_mqjRzsDhE9JZyWD0qr31jF2VNsNA3-c74aZnhn-TqkLJWxJAe_Zn7-BLoKnsJBzqk6LyZm9rLDCZAYx0fAzIJrHxZ0IXHvsf1w9aAr_9DndB0tIoyfYBctPP0C0kX94-pe9Odt2VXKND5jo"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent p-space-lg flex flex-col justify-end text-on-primary">
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary-fixed font-bold">
                  Direct Citizen Welfare
                </span>
                <h2 className="font-headline-md text-headline-md font-bold leading-tight">
                  Safeguarding Citizen Entitlements Through Transparent Digital Transfers
                </h2>
                <p className="font-body-sm text-body-sm text-surface-variant mt-1 max-w-xl">
                  {scheme.benefitSummary}
                </p>
              </div>
            </div>

            {/* Supported Eligibility Rules Checked */}
            <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                  <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                    Evaluated Eligibility Criteria
                  </h2>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant">Deterministic Rules</span>
              </div>

              <div className="space-y-3">
                {scheme.eligibilityConditions.map((cond) => (
                  <div
                    key={cond.id}
                    className="p-4 rounded-xl border border-surface-container bg-surface-container-low flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-label-lg font-bold text-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-on-tertiary-container">check_circle</span>
                        <span>{cond.label}</span>
                      </span>
                      <span className="font-label-md text-label-md font-mono text-outline">Check ID: {cond.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body-sm text-body-sm pt-2 border-t border-surface-container">
                      <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-container">
                        <strong className="text-on-tertiary-container font-label-md text-label-md block mb-1">
                          ✓ Condition Pass Rule:
                        </strong>
                        <span className="text-on-surface-variant">{cond.passReason}</span>
                      </div>
                      <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-container">
                        <strong className="text-error font-label-md text-label-md block mb-1">
                          ✕ Condition Fail Rule:
                        </strong>
                        <span className="text-on-surface-variant">{cond.failReason}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Unchecked Requirements from Stitch */}
            {scheme.uncheckedRequirements && scheme.uncheckedRequirements.length > 0 && (
              <section className="bg-secondary-fixed/20 rounded-xl border border-secondary-fixed p-space-lg shadow-sm">
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-2xl shrink-0">warning</span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-secondary-container">
                      Departmental Requirements Not Checked by Discovery Engine
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-secondary-container/90 mt-1 mb-3">
                      SchemeSaathi does not access private land registries, biometric Aadhaar e-KYC databases, or local revenue records. Confirm these requirements with your local authority before applying:
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-body-sm text-body-sm text-on-secondary-container">
                      {scheme.uncheckedRequirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="material-symbols-outlined text-sm text-secondary shrink-0 mt-0.5">arrow_right</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar Column (4 cols) from Stitch */}
          <aside className="lg:col-span-4 flex flex-col gap-space-lg">
            {/* Document Checklist */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container flex flex-col gap-space-md">
              <div className="flex items-center gap-space-xs pb-space-xs border-b border-surface-container">
                <span className="material-symbols-outlined text-primary text-xl">description</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
                  Required Documents
                </h3>
              </div>

              {scheme.documentsRequired && scheme.documentsRequired.length > 0 ? (
                <ul className="space-y-2.5 font-body-sm text-body-sm text-on-surface">
                  {scheme.documentsRequired.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-surface-container-low border border-surface-container">
                      <span className="material-symbols-outlined text-base text-on-tertiary-container shrink-0 mt-0.5">
                        verified
                      </span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Standard KYC documents (Aadhaar &amp; Bank Account) apply.
                </p>
              )}
            </div>

            {/* Official Guidance & CSC Center Locator */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container flex flex-col gap-space-md">
              <div className="flex items-center gap-space-xs pb-space-xs border-b border-surface-container">
                <span className="material-symbols-outlined text-secondary text-xl">storefront</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
                  How &amp; Where to Apply
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {scheme.applicationGuidance ||
                  'Apply online via the ministry portal or visit your nearest Common Service Center (CSC) with your identity documents and land revenue records.'}
              </p>

              <div className="pt-space-xs border-t border-surface-container flex flex-col gap-2">
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-lg text-label-lg py-2.5 rounded-lg hover:bg-primary-container transition-colors shadow-sm"
                >
                  <span>Open Official Ministry Portal</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
                <Link
                  href="/tracker"
                  className="w-full inline-flex items-center justify-center gap-2 bg-surface-container text-primary font-label-lg text-label-lg py-2 rounded-lg hover:bg-surface-container-high transition-colors"
                >
                  <span>Track Application Status</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex items-center justify-between pt-space-md border-t border-surface-container font-label-lg text-label-lg">
          <Link
            href="/results"
            className="font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors"
          >
            ← Back to All Schemes Directory
          </Link>
          <Link
            href="/wizard"
            className="font-bold text-secondary hover:underline transition-colors"
          >
            Retake Eligibility Questionnaire →
          </Link>
        </div>
      </div>
    </div>
  );
}
