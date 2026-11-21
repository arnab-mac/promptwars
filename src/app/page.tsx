import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Banner Strip with Smart Search from Stitch */}
      <section className="relative w-full bg-surface-container-low overflow-hidden pb-space-xl pt-space-lg border-b border-surface-container">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-surface-variant/40 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-32 w-80 h-80 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop relative z-10 flex flex-col gap-space-lg">
          {/* Breadcrumb & Live Sync Marker */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">home</span> Home
              </Link>
              <span className="material-symbols-outlined text-xs text-outline">chevron_right</span>
              <span className="text-primary font-bold">Find Schemes</span>
              <span className="material-symbols-outlined text-xs text-outline">chevron_right</span>
              <span className="bg-surface-container px-2 py-0.5 rounded-full text-xs font-semibold text-primary">
                All India DBT Catalog
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-surface-container-lowest px-3 py-1 rounded-full shadow-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Data synced with DBT Bharat Portal: Today, 08:30 AM
              </span>
            </div>
          </div>

          {/* Main Headline & Subhead */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
            <div className="max-w-3xl flex flex-col gap-space-xs">
              <div className="inline-flex items-center gap-2 text-secondary font-label-lg text-label-lg tracking-wide uppercase font-bold">
                <span className="material-symbols-outlined text-base">account_balance</span>
                Universal Citizen Benefit Registry
              </div>
              <h1 className="font-headline-lg text-headline-lg lg:text-display lg:font-display text-primary tracking-tight">
                Discover Welfare Schemes Tailored for You &amp; Your Family
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
                Explore 2,800+ Central and State Government schemes with verified eligibility, direct cash benefits (DBT), educational grants, and welfare subsidies.
              </p>
            </div>

            {/* Quick Summary Stats Card from Stitch */}
            <div className="hidden xl:flex items-center gap-space-lg bg-surface-container-lowest p-space-md rounded-xl shadow-sm shrink-0 border border-surface-container">
              <div className="flex flex-col">
                <span className="font-tabular-amount text-tabular-amount text-primary">2,842</span>
                <span className="font-label-md text-label-md text-on-surface-variant">Active Schemes</span>
              </div>
              <div className="w-px h-8 bg-surface-variant" />
              <div className="flex flex-col">
                <span className="font-tabular-amount text-tabular-amount text-secondary">₹4.8L Cr</span>
                <span className="font-label-md text-label-md text-on-surface-variant">DBT Disbursed</span>
              </div>
              <div className="w-px h-8 bg-surface-variant" />
              <div className="flex flex-col">
                <span className="font-tabular-amount text-tabular-amount text-on-tertiary-container">98.4%</span>
                <span className="font-label-md text-label-md text-on-surface-variant">Aadhaar Linked</span>
              </div>
            </div>
          </div>

          {/* Multi-Faceted Smart Search Box from Stitch */}
          <div className="bg-surface-container-lowest p-space-sm sm:p-3 rounded-2xl shadow-md border border-surface-container flex flex-col gap-space-xs">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
              <div className="flex-1 relative flex items-center">
                <span className="material-symbols-outlined text-outline absolute left-3.5 text-xl">search</span>
                <input
                  type="text"
                  placeholder="Search by scheme name, keyword (e.g., 'farmer', 'solar', 'scholarship', 'pension')..."
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant/60 rounded-xl font-body-sm text-body-sm text-on-surface focus:border-primary focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/wizard"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-base">tune</span>
                  <span>Check Eligibility</span>
                </Link>

                <Link
                  href="/results"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-secondary-container text-on-secondary font-label-lg text-label-lg font-bold shadow-sm transition-colors"
                >
                  <span>Browse Schemes</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Quick Trending Searches from Stitch */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-surface-container text-xs">
              <span className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wide">
                Trending Schemes:
              </span>
              <Link
                href="/schemes/pm-kisan"
                className="bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface px-2.5 py-1 rounded-full transition-colors font-medium"
              >
                🌾 PM-KISAN
              </Link>
              <Link
                href="/schemes/ayushman-bharat"
                className="bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface px-2.5 py-1 rounded-full transition-colors font-medium"
              >
                🏥 Ayushman Bharat (₹5 Lakh)
              </Link>
              <Link
                href="/results"
                className="bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface px-2.5 py-1 rounded-full transition-colors font-medium"
              >
                Lakhpati Didi
              </Link>
              <Link
                href="/results"
                className="bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface px-2.5 py-1 rounded-full transition-colors font-medium"
              >
                Post-Matric Scholarship
              </Link>
              <Link
                href="/results"
                className="bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface px-2.5 py-1 rounded-full transition-colors font-medium"
              >
                PM Surya Ghar Muft Bijli
              </Link>
              <Link
                href="/results"
                className="bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface px-2.5 py-1 rounded-full transition-colors font-medium"
              >
                Ujjwala 2.0
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CORE BENEFIT DOMAINS GRID */}
      <section className="py-space-xl px-margin lg:px-gutter-desktop max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm mb-space-lg">
          <div>
            <div className="inline-flex items-center gap-1.5 font-label-md text-label-md font-bold uppercase tracking-wider text-secondary mb-1">
              <span className="material-symbols-outlined text-base">category</span>
              <span>Categorized Public Services</span>
            </div>
            <h2 className="font-headline-md text-headline-md font-bold text-primary">
              Browse Schemes by Citizen Domain
            </h2>
          </div>

          <Link
            href="/results"
            className="font-label-lg text-label-lg font-bold text-secondary hover:underline flex items-center gap-1"
          >
            <span>View all 10 verified catalog schemes</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Domain 1: Agriculture */}
          <Link
            href="/results"
            className="group bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container shadow-sm hover:shadow-md hover:border-primary transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">agriculture</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-primary group-hover:text-secondary transition-colors">
                Agriculture &amp; Farmers
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                Direct income support, crop insurance, fertilizer grants, and modern irrigation equipment subsidies.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between font-label-md text-label-md font-semibold text-on-surface-variant">
              <span className="text-on-tertiary-container font-bold">3 Verified Schemes</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>

          {/* Domain 2: Health */}
          <Link
            href="/results"
            className="group bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container shadow-sm hover:shadow-md hover:border-primary transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container text-tertiary-container flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">medical_services</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-primary group-hover:text-secondary transition-colors">
                Healthcare &amp; Wellness
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                Hospital cashless coverage up to ₹5 Lakh/yr, maternity assistance, and subsidized generic medicines.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between font-label-md text-label-md font-semibold text-on-surface-variant">
              <span className="text-on-tertiary-container font-bold">Cashless Hospital DBT</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>

          {/* Domain 3: Education */}
          <Link
            href="/results"
            className="group bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container shadow-sm hover:shadow-md hover:border-primary transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-primary group-hover:text-secondary transition-colors">
                Education &amp; Scholarships
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                Pre-matric and post-matric fee reimbursements, merit grants, and technical skilling fellowships.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between font-label-md text-label-md font-semibold text-on-surface-variant">
              <span className="text-on-tertiary-container font-bold">Direct Student DBT</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>

          {/* Domain 4: Social Security */}
          <Link
            href="/results"
            className="group bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container shadow-sm hover:shadow-md hover:border-primary transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">family_restroom</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-primary group-hover:text-secondary transition-colors">
                Social Welfare &amp; Housing
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                PMAY rural and urban pucca housing subsidies, senior citizen pensions, and widow assistance.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between font-label-md text-label-md font-semibold text-on-surface-variant">
              <span className="text-on-tertiary-container font-bold">Monthly Pension</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* THREE-STEP CIVIC WELFARE ENGINE EXPLAINER */}
      <section className="bg-surface-container-low py-space-xl px-margin lg:px-gutter-desktop border-y border-surface-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-space-lg">
            <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-secondary">
              Transparent Civic Engine
            </span>
            <h2 className="font-headline-lg text-headline-lg font-extrabold text-primary mt-1">
              How SchemeSaathi Determines Your Entitlements
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              No black-box percentages. You receive clear deterministic explanations for every condition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-primary text-on-primary font-extrabold text-xl flex items-center justify-center mb-5">
                1
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-primary mb-2">
                Answer Contextual Profile Questions
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Only questions relevant to active scheme rules are requested. Income units and age limits are explicit. Skip options ensure privacy for sensitive data.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-secondary text-on-secondary font-extrabold text-xl flex items-center justify-center mb-5">
                2
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-primary mb-2">
                Deterministic Rule Matching
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Each rule is tested as <strong className="text-tertiary-container font-semibold">Pass</strong>, <strong className="text-error font-semibold">Fail</strong>, or <strong className="text-secondary font-semibold">Unknown</strong>. Unchecked requirements remain prominently highlighted.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container text-tertiary-fixed font-extrabold text-xl flex items-center justify-center mb-5">
                3
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-primary mb-2">
                Track Application to Disbursement
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Connect your Beneficiary ID to review departmental approvals, revenue officer verification, Aadhaar seeding, and Direct Benefit Transfer (DBT) credit milestones.
              </p>
            </div>
          </div>

          <div className="mt-space-lg text-center">
            <Link
              href="/wizard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary hover:bg-secondary-container text-on-secondary font-label-lg text-label-lg font-bold shadow-md transition-all hover:shadow-lg"
            >
              <span>Launch Algorithmic Welfare Assessment</span>
              <span className="material-symbols-outlined text-lg">bolt</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
