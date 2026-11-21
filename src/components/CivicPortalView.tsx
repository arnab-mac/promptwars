'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Scheme } from '@/types/scheme';
import { AssistantPanel } from '@/components/AssistantPanel';

interface CivicPortalViewProps {
  initialSchemes: Scheme[];
}

export function CivicPortalView({ initialSchemes }: CivicPortalViewProps) {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedGovBody, setSelectedGovBody] = useState<string>('all');
  const [selectedIncomeBand, setSelectedIncomeBand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [pwdOnly, setPwdOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevant');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['pm-kisan']));

  // Handle Bookmarks
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filter Logic
  const filteredSchemes = useMemo(() => {
    return initialSchemes
      .filter((scheme) => {
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesQuery =
            scheme.name.toLowerCase().includes(q) ||
            scheme.department.toLowerCase().includes(q) ||
            scheme.benefitSummary.toLowerCase().includes(q) ||
            scheme.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchesQuery) return false;
        }

        // Governing body
        if (selectedGovBody === 'central' && scheme.scope !== 'central') return false;
        if (selectedGovBody === 'state' && scheme.scope !== 'state') return false;

        // Sector Filter
        if (selectedSector !== 'all' && !scheme.tags.includes(selectedSector)) {
          return false;
        }

        // PwD Filter
        if (pwdOnly && scheme.id !== 'nsap') {
          return false;
        }

        // Income Filter
        if (selectedIncomeBand === 'bpl') {
          const isBPLApplicable =
            scheme.tags.includes('bpl') ||
            scheme.id === 'pmjay' ||
            scheme.id === 'nsap' ||
            scheme.id === 'pmay-g';
          if (!isBPLApplicable) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [initialSchemes, searchQuery, selectedGovBody, selectedSector, pwdOnly, selectedIncomeBand, sortBy]);

  // Sector Counts
  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ['agriculture', 'healthcare', 'education', 'women', 'housing', 'business', 'social'].forEach((cat) => {
      counts[cat] = initialSchemes.filter((s) => s.tags.includes(cat)).length;
    });
    return counts;
  }, [initialSchemes]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedState('all');
    setSelectedBeneficiary('all');
    setSelectedSector('all');
    setSelectedGovBody('all');
    setSelectedIncomeBand('all');
    setSelectedCategory('all');
    setPwdOnly(false);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. TOP AMBIENT BANNER STRIP WITH SMART SEARCH */}
      <section className="relative w-full bg-surface-container-low overflow-hidden pb-space-xl pt-space-lg">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-surface-variant/40 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-32 w-80 h-80 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop relative z-10 flex flex-col gap-space-lg">
          {/* Breadcrumb & Status Marker */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
              <Link className="hover:text-primary transition-colors flex items-center gap-1" href="/">
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
              <span className="font-label-md text-label-md text-on-surface">Data synced with DBT Bharat Portal: Today, 08:30 AM</span>
            </div>
          </div>

          {/* Main Headline & Subhead */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
            <div className="max-w-3xl flex flex-col gap-space-xs">
              <div className="inline-flex items-center gap-2 text-secondary font-label-lg text-label-lg tracking-wide uppercase font-semibold">
                <span className="material-symbols-outlined text-base">account_balance</span>
                Universal Citizen Benefit Registry
              </div>
              <h1 className="font-headline-lg text-headline-lg lg:text-display lg:font-display text-primary tracking-tight">
                Discover Welfare Schemes Tailored for You &amp; Your Family
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Explore 2,800+ Central and State Government schemes with verified eligibility, direct cash benefits (DBT), educational grants, and welfare subsidies.
              </p>
            </div>

            {/* Quick Summary Stats Card */}
            <div className="hidden xl:flex items-center gap-space-lg bg-surface-container-lowest p-space-md rounded-xl shadow-sm shrink-0">
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

          {/* Multi-Faceted Smart Search Box */}
          <div className="bg-surface-container-lowest p-space-sm sm:p-3 rounded-2xl shadow-md flex flex-col gap-space-xs">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
              {/* Text Input with voice icon */}
              <div className="relative flex-1 flex items-center min-w-0 bg-surface-container-low rounded-xl px-3 py-2">
                <span className="material-symbols-outlined text-outline text-xl mr-2 shrink-0">search</span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none placeholder:text-outline"
                  placeholder="Search by keyword, scheme name, subsidy, or ministry (e.g. Kisan, Scholarship, Housing)..."
                  type="text"
                />
                <button className="p-1 hover:text-secondary text-outline transition-colors" title="Voice Search (Hindi / English)" type="button">
                  <span className="material-symbols-outlined text-xl">mic</span>
                </button>
              </div>

              {/* State Selector */}
              <div className="w-full lg:w-56 flex items-center bg-surface-container-low rounded-xl px-3 py-2">
                <span className="material-symbols-outlined text-outline text-lg mr-2 shrink-0">location_on</span>
                <div className="flex-1 flex flex-col justify-center">
                  <span className="font-label-md text-[10px] text-outline uppercase tracking-wider leading-none">Jurisdiction</span>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-transparent font-label-lg text-label-lg text-primary outline-none cursor-pointer"
                  >
                    <option value="all">All India (Central)</option>
                    <option value="mh">Maharashtra</option>
                    <option value="up">Uttar Pradesh</option>
                    <option value="ka">Karnataka</option>
                    <option value="tn">Tamil Nadu</option>
                    <option value="rj">Rajasthan</option>
                    <option value="wb">West Bengal</option>
                    <option value="gj">Gujarat</option>
                    <option value="bihar">Bihar</option>
                  </select>
                </div>
              </div>

              {/* Target Beneficiary Selector */}
              <div className="w-full lg:w-60 flex items-center bg-surface-container-low rounded-xl px-3 py-2">
                <span className="material-symbols-outlined text-outline text-lg mr-2 shrink-0">group</span>
                <div className="flex-1 flex flex-col justify-center">
                  <span className="font-label-md text-[10px] text-outline uppercase tracking-wider leading-none">Target Group</span>
                  <select
                    value={selectedBeneficiary}
                    onChange={(e) => setSelectedBeneficiary(e.target.value)}
                    className="w-full bg-transparent font-label-lg text-label-lg text-primary outline-none cursor-pointer"
                  >
                    <option value="all">All Beneficiaries</option>
                    <option value="farmers">Farmers &amp; Agribusiness</option>
                    <option value="women">Women &amp; Self Help Groups</option>
                    <option value="students">Students &amp; Youths</option>
                    <option value="seniors">Senior Citizens (60+)</option>
                    <option value="msme">MSME &amp; Artisans</option>
                    <option value="differently_abled">Divyangjan (Persons with Disability)</option>
                  </select>
                </div>
              </div>

              {/* Primary Search Button */}
              <button
                className="bg-primary hover:bg-primary-container text-on-primary px-space-lg py-3 rounded-xl flex items-center justify-center gap-2 font-label-lg text-label-lg font-bold shadow-sm transition-all duration-200 active:scale-95 shrink-0"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">travel_explore</span>
                <span>Search Schemes</span>
              </button>
            </div>

            {/* Trending Suggestions / Fast Filters */}
            <div className="flex flex-wrap items-center gap-space-xs pt-1 px-1">
              <span className="font-label-md text-label-md text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-secondary">trending_up</span> Trending:
              </span>
              {['PM Kisan Samman Nidhi', 'Ayushman Bharat', 'Sukanya Samriddhi', 'Jan Dhan', 'Soil Health Card'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSearchQuery(t)}
                  className="bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface px-2.5 py-1 rounded-full transition-colors"
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT SPLIT WORKSPACE */}
      <section className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop py-space-xl w-full">
        <div className="flex flex-col lg:flex-row gap-gutter items-start">
          {/* LEFT SIDEBAR: Filter & Demographic Selection Rail (w-80) */}
          <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-md">
              {/* Header with Active Filters & Reset */}
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">tune</span>
                  <h2 className="font-headline-sm text-headline-sm text-primary font-bold">Filters</h2>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="font-label-md text-label-md text-secondary hover:underline font-bold"
                  type="button"
                >
                  Clear All
                </button>
              </div>

              {/* Active Filter Badges */}
              <div className="flex flex-wrap gap-1.5 p-space-xs bg-surface-container-low rounded-lg">
                <span className="inline-flex items-center gap-1 bg-surface-container-lowest px-2 py-0.5 rounded text-xs font-medium text-primary">
                  Direct Benefit Transfer
                </span>
                <span className="inline-flex items-center gap-1 bg-surface-container-lowest px-2 py-0.5 rounded text-xs font-medium text-primary">
                  All Central
                </span>
                {selectedSector !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-surface-container-lowest px-2 py-0.5 rounded text-xs font-medium text-primary">
                    {selectedSector}
                    <button onClick={() => setSelectedSector('all')} className="hover:text-error leading-none">×</button>
                  </span>
                )}
              </div>

              {/* Filter Section 1: Authority / Sponsorship */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-lg text-label-lg text-primary uppercase tracking-wider text-xs font-bold">Governing Body</span>
                <label className="flex items-center justify-between p-2 rounded hover:bg-surface-container-low cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="govBody"
                      checked={selectedGovBody === 'all'}
                      onChange={() => setSelectedGovBody('all')}
                      className="w-4 h-4 accent-primary cursor-pointer"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface">All Programs</span>
                  </div>
                  <span className="font-label-md text-label-md text-outline">{initialSchemes.length}</span>
                </label>
                <label className="flex items-center justify-between p-2 rounded hover:bg-surface-container-low cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="govBody"
                      checked={selectedGovBody === 'central'}
                      onChange={() => setSelectedGovBody('central')}
                      className="w-4 h-4 accent-primary cursor-pointer"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface">Central Sector DBT</span>
                  </div>
                  <span className="font-label-md text-label-md text-outline">
                    {initialSchemes.filter((s) => s.scope === 'central').length}
                  </span>
                </label>
              </div>

              <div className="w-full h-px bg-surface-container-high" />

              {/* Filter Section 2: Sector & Category */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-lg text-label-lg text-primary uppercase tracking-wider text-xs font-bold">Sector &amp; Category</span>
                {[
                  { id: 'agriculture', name: 'Agriculture & Farming', icon: 'agriculture', count: sectorCounts['agriculture'] || 2 },
                  { id: 'healthcare', name: 'Healthcare & Wellness', icon: 'health_and_safety', count: sectorCounts['healthcare'] || 1 },
                  { id: 'education', name: 'Education & Skilling', icon: 'school', count: sectorCounts['education'] || 2 },
                  { id: 'women', name: 'Women & Child Welfare', icon: 'female', count: sectorCounts['women'] || 1 },
                  { id: 'housing', name: 'Housing & Shelter', icon: 'cottage', count: sectorCounts['housing'] || 1 },
                  { id: 'business', name: 'Business & Micro-Credit', icon: 'storefront', count: sectorCounts['business'] || 1 },
                  { id: 'social', name: 'Social Security & Pension', icon: 'elderly', count: sectorCounts['social'] || 2 },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSector(selectedSector === sec.id ? 'all' : sec.id)}
                    className={`flex items-center justify-between p-2 rounded text-left transition-colors ${
                      selectedSector === sec.id
                        ? 'bg-surface-container font-semibold text-primary'
                        : 'hover:bg-surface-container-low text-on-surface'
                    }`}
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-sm ${selectedSector === sec.id ? 'text-secondary' : 'text-on-surface-variant'}`}>
                        {sec.icon}
                      </span>
                      <span className="font-body-sm text-body-sm">{sec.name}</span>
                    </div>
                    <span className="font-label-md text-label-md bg-surface-container-highest px-1.5 py-0.5 rounded text-primary">
                      {sec.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="w-full h-px bg-surface-container-high" />

              {/* Filter Section 3: Citizen Demographics */}
              <div className="flex flex-col gap-space-sm">
                <span className="font-label-lg text-label-lg text-primary uppercase tracking-wider text-xs font-bold">Citizen Demographics</span>
                {/* Income Range Radio Buttons */}
                <div className="flex flex-col gap-1">
                  <span className="font-label-md text-label-md text-outline">Annual Family Income</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'bpl', label: '< ₹1.5 Lakh/yr' },
                      { id: 'all', label: 'All Incomes' },
                    ].map((inc) => (
                      <button
                        key={inc.id}
                        onClick={() => setSelectedIncomeBand(inc.id)}
                        className={`px-2 py-1.5 text-xs font-medium rounded text-left transition-colors ${
                          selectedIncomeBand === inc.id
                            ? 'bg-primary text-on-primary font-bold'
                            : 'bg-surface-container text-primary hover:bg-surface-container-high'
                        }`}
                        type="button"
                      >
                        {inc.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Social Category / Reservation */}
                <div className="flex flex-col gap-1">
                  <span className="font-label-md text-label-md text-outline">Category / Reservation</span>
                  <div className="flex flex-wrap gap-1">
                    {['General', 'OBC', 'SC', 'ST', 'EWS'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? 'all' : cat)}
                        className={`px-2 py-1 rounded font-label-md text-label-md cursor-pointer transition-colors ${
                          selectedCategory === cat
                            ? 'bg-surface-container font-bold text-primary ring-1 ring-primary'
                            : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface'
                        }`}
                        type="button"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Disability Checkbox */}
                <label className="flex items-center gap-2 p-1.5 bg-surface-container-low rounded cursor-pointer mt-1">
                  <input
                    checked={pwdOnly}
                    onChange={(e) => setPwdOnly(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                    type="checkbox"
                  />
                  <span className="font-label-md text-label-md text-on-surface">Divyangjan / PwD Specific (40%+)</span>
                </label>
              </div>

              {/* Fast Eligibility Quiz CTA Box */}
              <div className="mt-2 p-space-sm bg-gradient-to-br from-primary-container to-primary text-on-primary rounded-xl flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-xl">psychology_alt</span>
                  <span className="font-headline-sm text-sm font-bold">Unsure which you qualify for?</span>
                </div>
                <p className="font-body-sm text-xs text-surface-variant">
                  Answer 4 simple questions about landholding, income, and state to instantly match.
                </p>
                <Link
                  href="/wizard"
                  className="mt-1 bg-secondary hover:bg-secondary-container text-on-secondary px-3 py-1.5 rounded-lg text-center font-label-md text-label-md font-bold transition-colors"
                >
                  Take 2-Min Eligibility Quiz
                </Link>
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN RESULTS FEED (flex-1) */}
          <main className="flex-1 w-full flex flex-col gap-space-md">
            {/* Results Summary Bar */}
            <div className="bg-surface-container-lowest p-space-sm sm:px-space-md sm:py-3 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
              <div className="flex items-baseline gap-2">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  Showing {filteredSchemes.length} Verified Schemes
                </span>
                <span className="font-label-md text-label-md text-outline">(Filtered for Direct Benefit &amp; Under ₹3L)</span>
              </div>

              {/* Controls: Sort By & View Switcher */}
              <div className="flex items-center gap-space-md">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md text-on-surface-variant">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-surface-container-low text-primary font-label-md text-label-md py-1 px-2.5 rounded-lg outline-none cursor-pointer"
                  >
                    <option value="relevant">Most Relevant</option>
                    <option value="name">Scheme Name (A-Z)</option>
                  </select>
                </div>

                {/* View Switcher */}
                <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1 rounded transition-colors ${viewMode === 'grid' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-outline hover:text-primary'}`}
                    title="Grid View"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg leading-none">grid_view</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1 rounded transition-colors ${viewMode === 'list' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-outline hover:text-primary'}`}
                    title="List View"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg leading-none">format_list_bulleted</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scheme Cards Grid (3 Columns Desktop) */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter items-stretch' : 'flex flex-col gap-space-md'}>
              {filteredSchemes.map((scheme: Scheme) => {
                const isBookmarked = bookmarkedIds.has(scheme.id);
                return (
                  <article
                    key={scheme.id}
                    className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group relative border border-surface-container"
                  >
                    <div className="flex flex-col gap-space-sm">
                      {/* Meta Badges Bar */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded text-xs font-semibold text-primary">
                          <span className="material-symbols-outlined text-xs">account_balance</span> {scheme.scope === 'central' ? 'Central Govt' : 'State Govt'}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-tertiary-container text-tertiary-fixed px-2 py-0.5 rounded text-xs font-bold">
                          <span className="material-symbols-outlined text-xs">verified</span> Direct DBT
                        </span>
                      </div>

                      {/* Ministry & Title */}
                      <div className="flex flex-col">
                        <span className="font-label-md text-[11px] text-outline uppercase tracking-wider">{scheme.department}</span>
                        <Link href={`/schemes/${scheme.id}`}>
                          <h3 className="font-headline-sm text-headline-sm font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 mt-0.5">
                            {scheme.name}
                          </h3>
                        </Link>
                      </div>

                      {/* Benefit Callout Highlight Box */}
                      <div className="bg-surface-container-low p-space-sm rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-secondary text-2xl">payments</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-[11px] text-on-surface-variant font-medium">Financial Assistance</span>
                          <span className="font-tabular-amount text-tabular-amount text-primary font-bold">{scheme.benefitAmount || scheme.benefitSummary}</span>
                          <span className="font-body-sm text-[11px] text-outline">Direct Bank Transfer or Institutional Subsidy</span>
                        </div>
                      </div>

                      {/* Eligibility Snapshot */}
                      <div className="flex flex-col gap-1.5">
                        <span className="font-label-md text-xs font-semibold text-on-surface">Eligibility Criteria:</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                          {scheme.benefitSummary}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {scheme.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="font-label-md text-[11px] bg-surface-container-high px-2 py-0.5 rounded text-on-surface capitalize">
                              {tag}
                            </span>
                          ))}
                          <span className="font-label-md text-[11px] bg-surface-container-high px-2 py-0.5 rounded text-on-surface">
                            Aadhaar Linked
                          </span>
                        </div>
                      </div>

                      {/* Key Milestone / Alert Tag */}
                      <div className="flex items-center gap-1.5 text-xs text-secondary font-semibold bg-secondary-fixed/30 px-2.5 py-1 rounded-lg">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span>Verified Active • {scheme.sourceCheckDate}</span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center gap-2 pt-space-md mt-space-sm border-t border-surface-container">
                      <Link
                        href={`/wizard?scheme=${scheme.id}`}
                        className="flex-1 bg-primary hover:bg-primary-container text-on-primary py-2.5 rounded-lg font-label-md text-label-md font-bold transition-colors text-center"
                      >
                        Check Eligibility
                      </Link>
                      <button
                        onClick={() => toggleBookmark(scheme.id)}
                        className={`p-2 hover:bg-surface-container rounded-lg transition-colors ${isBookmarked ? 'text-secondary' : 'text-primary'}`}
                        title="Bookmark Scheme"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-xl">
                          {isBookmarked ? 'bookmark' : 'bookmark_border'}
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination & Page Controls */}
            <div className="bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md mt-space-sm border border-surface-container">
              <div className="font-body-sm text-body-sm text-on-surface-variant">
                Showing <span className="font-bold text-primary">1 - {filteredSchemes.length}</span> of <span className="font-bold text-primary">{filteredSchemes.length}</span> matching initiatives
              </div>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 rounded-lg bg-surface-container-low text-outline cursor-not-allowed font-label-md text-label-md flex items-center gap-1" disabled type="button">
                  <span className="material-symbols-outlined text-sm">chevron_left</span> Prev
                </button>
                <button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold" type="button">1</button>
                <button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-variant text-primary font-label-md text-label-md font-semibold transition-colors flex items-center gap-1" type="button">
                  Next <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Citizen Help & CSC Locator Strip */}
            <div className="bg-gradient-to-r from-primary to-primary-container p-space-md lg:p-space-lg rounded-2xl text-on-primary shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-3xl">contact_support</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-headline-sm font-bold text-surface-container-lowest">
                    Need help finding or applying?
                  </h3>
                  <p className="font-body-sm text-body-sm text-surface-variant max-w-xl">
                    Call national toll-free <strong className="text-secondary-fixed">14443</strong> or visit your nearest Common Service Centre (CSC / Jan Seva Kendra) with your Aadhaar and Ration Card.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm shrink-0 w-full md:w-auto">
                <a
                  className="w-full md:w-auto bg-surface-container-lowest hover:bg-surface-bright text-primary px-space-md py-2.5 rounded-xl font-label-lg text-label-lg font-bold text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  href="https://findmycsc.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-base">near_me</span>
                  <span>Find Nearest CSC (4.2 Lakh+ Centres)</span>
                </a>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* Grounded AI Assistant Drawer */}
      <AssistantPanel currentProfile={{}} />
    </div>
  );
}
