'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function ApplicationTrackerView() {
  const [docUploaded, setDocUploaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'action' | 'approved'>('all');

  return (
    <div className="w-full flex flex-col">
      {/* Top Global Alerts Bar (High Priority Action Required from Stitch) */}
      {!docUploaded ? (
        <div className="w-full bg-secondary-container text-on-secondary px-margin lg:px-gutter-desktop py-space-xs shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm font-label-md text-label-md">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-base">error</span>
              <span className="font-bold tracking-wide uppercase">Action Required for Application #KCC-UP-99214:</span>
              <span className="opacity-95">Revenue Officer requested clear re-scan of Land Mutation (Khatauni) Certificate.</span>
            </div>
            <button
              type="button"
              onClick={() => setDocUploaded(true)}
              className="inline-flex items-center gap-1 bg-surface-container-lowest text-secondary px-2.5 py-1 rounded font-bold hover:bg-surface-bright transition-colors shadow-sm text-xs"
            >
              <span>Upload Document Now</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full bg-tertiary-container text-tertiary-fixed px-margin lg:px-gutter-desktop py-space-xs font-label-md text-label-md flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>Khatauni Certificate submitted successfully. Tehsildar review estimated in 3 business days.</span>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-margin lg:px-gutter-desktop py-space-lg flex flex-col gap-space-xl">
        {/* SECTION 1: Citizen Profile Authority Card & Fast Metrics */}
        <section className="flex flex-col gap-space-md">
          {/* Profile Identification Header with hotlinked image from Stitch */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm p-space-lg border border-surface-container">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
              <div className="flex items-start gap-space-md">
                <div className="relative shrink-0">
                  {/* Hotlinked Portrait of Sunita Sharma from Stitch HTML */}
                  <img
                    alt="Portrait of Sunita Sharma"
                    className="w-20 h-20 rounded-xl object-cover shadow-sm ring-2 ring-surface-variant"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlv-AtVkYDm0HNkCBk_zd6Kyqn65vIxEGlHMsbOug-rbiUb80e8FOwdfM9GhyXwKLwUT89P-pUG6FeIl9Hi9gUWz25PhpvMkp11xCZQiK-yDJbOySQJR7W6TxCWwFzkoONj-zYRXllE20yvxeSwHoM2PqyJI93DmnZM-vrfSe-MFShnlsRnr90TGhzZlwfKxxUIy2QInx7nkwspDX0uPruPMwvx_mgj3f6xUBeoYI"
                  />
                  <div
                    className="absolute -bottom-1 -right-1 bg-tertiary-container text-on-tertiary-container p-1 rounded-full flex items-center justify-center shadow-sm"
                    title="Aadhaar Biometric e-KYC Verified"
                  >
                    <span className="material-symbols-outlined text-sm">verified</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-space-xs mb-1">
                    <span className="font-headline-md text-headline-md font-bold text-on-surface">
                      Welcome back, Sunita Sharma
                    </span>
                    <span className="bg-primary-container text-surface-container-lowest font-label-md text-label-md px-2 py-0.5 rounded font-bold">
                      श्रीमती सुनीता शर्मा
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 font-body-sm text-body-sm text-on-surface-variant">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base text-primary">badge</span>
                      <span>Beneficiary ID:</span>
                      <span className="font-label-lg text-label-lg font-bold text-on-surface font-mono">
                        SS-IND-2024-883921
                      </span>
                    </div>
                    <span className="hidden sm:inline text-outline-variant">•</span>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base text-on-tertiary-container">check_circle</span>
                      <span className="font-label-md text-label-md text-on-tertiary-container font-bold bg-surface-container-high px-2 py-0.5 rounded">
                        Aadhaar eKYC Verified
                      </span>
                    </div>
                    <span className="hidden sm:inline text-outline-variant">•</span>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base text-secondary">location_on</span>
                      <span className="text-on-surface font-medium">Uttar Pradesh (Varanasi District)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Utility Quick Links */}
              <div className="flex items-center gap-space-xs shrink-0 self-start lg:self-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1 bg-surface-container text-primary hover:bg-surface-container-high font-label-lg text-label-lg px-3 py-2 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">print</span>
                  <span>Citizen Dossier</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('DigiLocker synchronization confirmed: Land Khatauni & Ration Card active.')}
                  className="inline-flex items-center gap-1 bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg px-4 py-2 rounded-lg shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">sync</span>
                  <span>Sync DigiLocker</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bento Bar from Stitch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Metric 1 */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                  Active Applications
                </span>
                <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">pending_actions</span>
                </div>
              </div>
              <div>
                <div className="font-tabular-amount text-tabular-amount font-bold text-primary">3 In-Progress</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">2 central, 1 state scheme</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                  Approved &amp; Disbursed
                </span>
                <div className="w-8 h-8 rounded-lg bg-surface-container text-on-tertiary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                </div>
              </div>
              <div>
                <div className="font-tabular-amount text-tabular-amount font-bold text-on-tertiary-container">
                  ₹28,000
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Received YTD via DBT Bharat</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                  Saved Schemes
                </span>
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">bookmark</span>
                </div>
              </div>
              <div>
                <div className="font-tabular-amount text-tabular-amount font-bold text-primary">5 Saved</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Ready for document check</p>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
                  Primary DBT Account
                </span>
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">assured_workload</span>
                </div>
              </div>
              <div>
                <div className="font-label-lg text-label-lg font-bold text-primary flex items-center gap-1">
                  <span>SBI •••• 4192</span>
                  <span className="material-symbols-outlined text-sm text-on-tertiary-container">check_circle</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Aadhaar Seeding: Active</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Active Applications with 5-Step Desktop Stepper Pipeline */}
        <section className="flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-space-xs">
                <span>Active Benefit Applications</span>
                <span className="bg-surface-container px-2 py-0.5 rounded-full font-label-md text-label-md font-bold text-primary">
                  Live Status
                </span>
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Direct departmental tracking connected via PFMS &amp; National e-Governance Division (NeGD)
              </p>
            </div>

            <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg border border-surface-container font-label-md text-label-md">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'all' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                All Applications (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('action')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'action' ? 'bg-secondary text-on-secondary font-bold' : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                Action Required (1)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('approved')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'approved' ? 'bg-tertiary-container text-tertiary-fixed font-bold' : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                Active / Disbursing (2)
              </button>
            </div>
          </div>

          {/* APPLICATION 1: PM KISAN SAMMAN NIDHI WITH 5-STEP PIPELINE */}
          {(activeTab === 'all' || activeTab === 'action') && (
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-lg border border-surface-container">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-sm border-b border-surface-container">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="bg-primary text-on-primary font-label-md text-label-md px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Central Sector Scheme
                    </span>
                    <span className="bg-surface-container-highest text-primary font-label-md text-label-md px-2 py-0.5 rounded font-semibold">
                      Ministry of Agriculture &amp; Farmers Welfare
                    </span>
                    <span className="bg-secondary-fixed text-secondary font-label-md text-label-md px-2 py-0.5 rounded font-bold">
                      {docUploaded ? 'Review in Progress' : 'Action Needed'}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm font-bold text-primary mt-1">
                    PM Kisan Samman Nidhi Yojana (₹6,000 / Year)
                  </h3>

                  <div className="flex flex-wrap items-center gap-space-md font-body-sm text-body-sm text-on-surface-variant">
                    <span>
                      Application Ref: <strong className="text-on-surface font-label-lg text-label-lg font-mono">#KCC-UP-99214</strong>
                    </span>
                    <span>•</span>
                    <span>Lodged via: <strong>CSC Center - Shivpur Varanasi</strong></span>
                    <span>•</span>
                    <span>Filing Date: <strong>12 Oct 2024</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs self-start md:self-center shrink-0">
                  <a
                    href="https://pmkisan.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-surface-container text-primary hover:bg-surface-container-high font-label-lg text-label-lg px-3.5 py-2.5 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">description</span>
                    <span>Acknowledgement Slip (PDF)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setDocUploaded(!docUploaded)}
                    className="inline-flex items-center gap-1.5 bg-secondary text-on-secondary hover:bg-secondary-container font-label-lg text-label-lg px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-lg">upload_file</span>
                    <span>{docUploaded ? 'Document Uploaded ✓' : 'Submit Mutation Doc'}</span>
                  </button>
                </div>
              </div>

              {/* 5-Step Desktop Stepper Pipeline from Stitch */}
              <div className="w-full py-space-sm px-2">
                <div className="relative">
                  {/* Connecting Pipeline Bar */}
                  <div className="absolute top-5 left-10 right-10 h-1 bg-surface-container rounded-full hidden md:block">
                    <div
                      className="h-full bg-tertiary-container rounded-full transition-all duration-500"
                      style={{ width: docUploaded ? '60%' : '50%' }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-space-md relative z-10">
                    {/* Stepper Point 1: Done */}
                    <div className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-space-sm group">
                      <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-lg">check</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-bold text-on-surface">1. Submission</span>
                        <span className="font-body-sm text-body-sm text-tertiary-container font-semibold">Completed</span>
                        <span className="font-label-md text-label-md text-on-surface-variant">12 Oct 2024</span>
                      </div>
                    </div>

                    {/* Stepper Point 2: Done */}
                    <div className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-space-sm group">
                      <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-lg">check</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-bold text-on-surface">2. Land Verification</span>
                        <span className="font-body-sm text-body-sm text-tertiary-container font-semibold">Tehsildar &amp; Patwari</span>
                        <span className="font-label-md text-label-md text-on-surface-variant">24 Oct 2024</span>
                      </div>
                    </div>

                    {/* Stepper Point 3: Active / In Review */}
                    <div className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-space-sm group">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-surface-container-lowest flex items-center justify-center shrink-0 shadow-md">
                        <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-bold text-primary">3. District Approval</span>
                        <span className="font-body-sm text-body-sm text-secondary font-bold">
                          {docUploaded ? 'In Verification' : 'Pending Document'}
                        </span>
                        <span className="font-label-md text-label-md text-on-surface-variant">Officer: DWO Varanasi</span>
                      </div>
                    </div>

                    {/* Stepper Point 4: Upcoming */}
                    <div className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-space-sm group opacity-60">
                      <div className="w-10 h-10 rounded-full bg-surface-container text-outline flex items-center justify-center shrink-0">
                        <span className="font-label-md text-label-md font-bold">4</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-bold text-on-surface">4. PFMS Validation</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">DBT Bank Linking</span>
                        <span className="font-label-md text-label-md text-outline">Upcoming</span>
                      </div>
                    </div>

                    {/* Stepper Point 5: Upcoming */}
                    <div className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-space-sm group opacity-60">
                      <div className="w-10 h-10 rounded-full bg-surface-container text-outline flex items-center justify-center shrink-0">
                        <span className="font-label-md text-label-md font-bold">5</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-bold text-on-surface">5. Credit Installment</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">₹2,000 / Quarter</span>
                        <span className="font-label-md text-label-md text-outline">Stage Final</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footnote Status Tracker */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-sm bg-surface-container-high/40 p-space-md rounded-lg font-body-sm text-body-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">hourglass_top</span>
                  <span className="text-on-surface">
                    Estimated Resolution Time: <strong className="text-primary font-bold">7 Business Days</strong> (upon document upload verification)
                  </span>
                </div>
                <div className="flex items-center gap-space-md text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-on-tertiary-container">verified</span> Aadhaar Seeding OK
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-on-tertiary-container">verified</span> NPCI Mapping Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* APPLICATION 2: AYUSHMAN BHARAT GOLDEN CARD */}
          {(activeTab === 'all' || activeTab === 'approved') && (
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-surface-container">
              <div className="flex items-start gap-space-md">
                <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-on-tertiary-container shrink-0">
                  <span className="material-symbols-outlined text-3xl">medical_services</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="bg-tertiary-container text-tertiary-fixed font-label-md text-label-md px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Active &amp; Approved
                    </span>
                    <span className="text-on-surface-variant font-label-md text-label-md">PM-JAY #8821-4920</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-primary mt-1">
                    Ayushman Bharat Pradhan Mantri Jan Arogya Yojana
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Universal cashless healthcare coverage up to <strong>₹5,00,000 / year</strong> for secondary and tertiary hospitalization across 28,000+ empaneled hospitals.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-space-xs shrink-0 self-start md:self-center">
                <a
                  href="https://pmjay.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  <span>Download Ayushman Card (PDF)</span>
                </a>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 3: DBT Payout Schedule & Payment Audit Table */}
        <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg border border-surface-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-md pb-space-xs border-b border-surface-container">
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-primary">
                Direct Benefit Transfer (DBT) Payout Audit
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Official transaction ledger settled via Public Financial Management System (PFMS)
              </p>
            </div>
            <span className="font-label-md text-label-md font-semibold text-on-tertiary-container bg-surface-container px-3 py-1 rounded-full border border-surface-container-high self-start sm:self-auto">
              Bank Account: •••• 4192 (State Bank of India)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm border-collapse">
              <thead>
                <tr className="border-b border-surface-container bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Installment Ref</th>
                  <th className="py-3 px-4 font-bold">Scheme Name</th>
                  <th className="py-3 px-4 font-bold">Disbursed Amount</th>
                  <th className="py-3 px-4 font-bold">Settlement Date</th>
                  <th className="py-3 px-4 font-bold">PFMS UTR Code</th>
                  <th className="py-3 px-4 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-on-surface">17th Installment</td>
                  <td className="py-3.5 px-4 font-medium text-on-surface">PM-KISAN Samman Nidhi</td>
                  <td className="py-3.5 px-4 font-tabular-amount text-tabular-amount font-bold text-on-tertiary-container">₹2,000.00</td>
                  <td className="py-3.5 px-4 text-on-surface-variant">18 Jun 2024</td>
                  <td className="py-3.5 px-4 font-mono text-on-surface-variant">RBI24061899201</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="bg-surface-container text-on-tertiary-container font-label-md text-label-md px-2.5 py-1 rounded font-bold">
                      Credited ✓
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-on-surface">16th Installment</td>
                  <td className="py-3.5 px-4 font-medium text-on-surface">PM-KISAN Samman Nidhi</td>
                  <td className="py-3.5 px-4 font-tabular-amount text-tabular-amount font-bold text-on-tertiary-container">₹2,000.00</td>
                  <td className="py-3.5 px-4 text-on-surface-variant">28 Feb 2024</td>
                  <td className="py-3.5 px-4 font-mono text-on-surface-variant">RBI24022831094</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="bg-surface-container text-on-tertiary-container font-label-md text-label-md px-2.5 py-1 rounded font-bold">
                      Credited ✓
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-on-surface">15th Installment</td>
                  <td className="py-3.5 px-4 font-medium text-on-surface">PM-KISAN Samman Nidhi</td>
                  <td className="py-3.5 px-4 font-tabular-amount text-tabular-amount font-bold text-on-tertiary-container">₹2,000.00</td>
                  <td className="py-3.5 px-4 text-on-surface-variant">15 Nov 2023</td>
                  <td className="py-3.5 px-4 font-mono text-on-surface-variant">RBI23111578320</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="bg-surface-container text-on-tertiary-container font-label-md text-label-md px-2.5 py-1 rounded font-bold">
                      Credited ✓
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-sm border-t border-surface-container font-label-lg text-label-lg">
          <Link
            href="/wizard"
            className="font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors"
          >
            ← Check Eligibility for More Schemes
          </Link>
          <Link
            href="/results"
            className="font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors"
          >
            Browse All 2,800+ Welfare Directory →
          </Link>
        </div>
      </div>
    </div>
  );
}
