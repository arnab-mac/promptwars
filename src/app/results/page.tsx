'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SCHEMES, UserProfile } from '@/lib/schemes';
import { evaluateAllSchemes, SchemeResult } from '@/lib/eligibility-engine';
import { SchemeCard } from '@/components/SchemeCard';
import { AssistantPanel } from '@/components/AssistantPanel';

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile>({});
  const [filterMatch, setFilterMatch] = useState<'all' | 'matches-checked-criteria' | 'more-info-needed'>('all');
  const [filterScope, setFilterScope] = useState<'all' | 'central' | 'state'>('all');
  const [filterSector, setFilterSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [assistantPrompt, setAssistantPrompt] = useState<string>('');

  // Hydrate profile from URL query parameters
  useEffect(() => {
    const raw = searchParams.get('profile');
    if (raw) {
      try {
        const parsed = JSON.parse(decodeURIComponent(raw));
        if (parsed && typeof parsed === 'object') {
          setProfile(parsed);
        }
      } catch (e) {
        console.error('Failed to parse profile params', e);
      }
    }
  }, [searchParams]);

  // Evaluate schemes against profile deterministically
  const results: SchemeResult[] = useMemo(() => {
    return evaluateAllSchemes(SCHEMES, profile);
  }, [profile]);

  // Filter & Search
  const filteredResults = useMemo(() => {
    return results.filter((r) => {
      if (filterMatch !== 'all' && r.overallMatch !== filterMatch) {
        return false;
      }
      if (filterScope !== 'all' && r.scheme.scope !== filterScope) {
        return false;
      }
      if (filterSector !== 'all') {
        const matchesTag = r.scheme.tags.some((t) => t.toLowerCase().includes(filterSector));
        if (!matchesTag) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.scheme.name.toLowerCase().includes(q);
        const matchesDept = r.scheme.department.toLowerCase().includes(q);
        const matchesTags = r.scheme.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDept && !matchesTags) return false;
      }
      return true;
    });
  }, [results, filterMatch, filterScope, filterSector, searchQuery]);

  // Counts
  const matchCount = results.filter((r) => r.overallMatch === 'matches-checked-criteria').length;
  const infoCount = results.filter((r) => r.overallMatch === 'more-info-needed').length;
  const noMatchCount = results.filter((r) => r.overallMatch === 'does-not-match').length;

  const handleResetProfile = () => {
    setProfile({});
    router.push('/wizard');
  };

  return (
    <div className="w-full">
      {/* Top Breadcrumb & Live Context Banner */}
      <section className="bg-[#eff4ff] border-b border-[#d5e3fd] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="material-symbols-outlined text-sm">home</span>
              <Link href="/" className="hover:text-[#001428]">Portal Home</Link>
              <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
              <span className="text-[#001428] font-bold">Welfare Directory</span>
              <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
              <span className="bg-[#e6eeff] px-2.5 py-0.5 rounded-full font-bold text-[#001428]">
                Matched Directory ({results.length} Schemes)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/wizard"
                className="px-4 py-2 text-xs font-bold rounded-xl bg-[#001428] text-white hover:bg-[#0f2942] transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                <span>Edit Profile Answers</span>
              </Link>
              <button
                type="button"
                onClick={handleResetProfile}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#001428] tracking-tight">
                Citizens Welfare Scheme Directory
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {Object.keys(profile).length > 0
                  ? 'Showing verified welfare schemes filtered by your personalized eligibility criteria.'
                  : 'Showing all 10 verified welfare programs. Take the quick 2-minute assessment to unlock customized matches.'}
              </p>
            </div>

            {/* Match Tally Pill */}
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00897b]" />
                <span className="font-bold text-[#001428]">{matchCount} Eligible</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a83900]" />
                <span className="font-bold text-[#001428]">{infoCount} In Review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Split Workspace from Stitch */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT SIDEBAR: Filter & Demographic Selection Rail (w-80) */}
          <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
            {/* Filter Card Container */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
              {/* Header with Active Filters & Reset */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#001428] text-xl">tune</span>
                  <h2 className="text-base font-bold text-[#001428]">Filters</h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFilterMatch('all');
                    setFilterScope('all');
                    setFilterSector('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-bold text-[#a83900] hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Active Filter Badges Container from Stitch */}
              <div className="flex flex-wrap gap-1.5 p-2 bg-[#eff4ff] rounded-xl">
                <span className="inline-flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#001428] shadow-sm">
                  Direct Benefit Transfer (DBT)
                </span>
                {filterMatch !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#00897b] shadow-sm">
                    {filterMatch === 'matches-checked-criteria' ? 'Meets Criteria' : 'Needs Info'}
                    <button onClick={() => setFilterMatch('all')} className="hover:text-rose-600 font-bold ml-1">×</button>
                  </span>
                )}
                {filterScope !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#a83900] shadow-sm capitalize">
                    {filterScope} Scope
                    <button onClick={() => setFilterScope('all')} className="hover:text-rose-600 font-bold ml-1">×</button>
                  </span>
                )}
              </div>

              {/* Keyword Search Field */}
              <div>
                <label htmlFor="search-field" className="block text-xs font-bold text-[#001428] uppercase tracking-wider mb-1.5">
                  Search Schemes
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined text-slate-400 absolute left-3 top-2.5 text-base">search</span>
                  <input
                    id="search-field"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Kisan, Awas, Health"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#f8f9ff] border border-slate-300 rounded-xl focus:border-[#001428] focus:ring-1 focus:ring-[#001428]"
                  />
                </div>
              </div>

              {/* Filter Section 1: Authority / Sponsorship */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[#001428] uppercase tracking-wider">
                  Governing Jurisdiction
                </span>
                <div className="space-y-1 text-xs">
                  {[
                    { id: 'all', label: 'All Jurisdictions', count: results.length },
                    { id: 'central', label: 'Central Government (Direct DBT)', count: results.filter(r => r.scheme.scope === 'central').length },
                    { id: 'state', label: 'State Government Programs', count: results.filter(r => r.scheme.scope === 'state').length },
                  ].map((gov) => (
                    <label
                      key={gov.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="govScope"
                          checked={filterScope === gov.id}
                          onChange={() => setFilterScope(gov.id as typeof filterScope)}
                          className="w-4 h-4 accent-[#001428] cursor-pointer"
                        />
                        <span className="text-slate-800 font-medium">{gov.label}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-bold">{gov.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Section 2: Sector & Category */}
              <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-[#001428] uppercase tracking-wider">
                  Sector &amp; Category
                </span>
                <div className="space-y-1 text-xs">
                  {[
                    { id: 'all', label: 'All Sectors', icon: 'apps' },
                    { id: 'agri', label: 'Agriculture & Farming', icon: 'agriculture' },
                    { id: 'health', label: 'Healthcare & Wellness', icon: 'medical_services' },
                    { id: 'scholarship', label: 'Education & Skilling', icon: 'school' },
                    { id: 'pension', label: 'Social Welfare & Pensions', icon: 'family_restroom' },
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setFilterSector(sec.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors text-left ${
                        filterSector === sec.id
                          ? 'bg-[#eff4ff] text-[#001428] font-bold border border-[#d5e3fd]'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#a83900]">{sec.icon}</span>
                        <span>{sec.label}</span>
                      </div>
                      {filterSector === sec.id && (
                        <span className="material-symbols-outlined text-sm text-[#00897b]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Smart AI Assistant Panel */}
            <AssistantPanel
              currentProfile={profile}
              initialQuery={assistantPrompt}
              isOpenDefault={false}
            />
          </aside>

          {/* RIGHT SCHEME STREAM: High-Information-Density Scheme Cards */}
          <div className="flex-1 w-full space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>
                Displaying <strong>{filteredResults.length}</strong> verified government programs
              </span>
              <span className="hidden sm:inline text-slate-400">
                Sorted by: Direct Match &amp; DBT Value
              </span>
            </div>

            {filteredResults.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-3xl">search_off</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">No schemes match your selected filters</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try broadening your search query or clicking &ldquo;Clear All&rdquo; to review all 10 welfare programs.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFilterMatch('all');
                    setFilterScope('all');
                    setFilterSector('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-5 py-2.5 text-xs font-bold rounded-xl bg-[#001428] text-white hover:bg-[#0f2942] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredResults.map((res) => (
                <SchemeCard
                  key={res.scheme.id}
                  result={res}
                  onAskScheme={(schemeName) => {
                    setAssistantPrompt(`What documents are required to apply for ${schemeName}?`);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto p-16 text-center text-sm text-slate-500">
          Loading verified welfare schemes...
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
