'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserProfile } from '@/lib/schemes';

export default function WizardPage() {
  const router = useRouter();

  // Wizard State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [occupation, setOccupation] = useState<UserProfile['occupation']>('farmer');
  const [income, setIncome] = useState<number>(180000); // In rupees
  const [landholding, setLandholding] = useState<'small_agri' | 'large_agri' | 'tenant' | 'urban'>('small_agri');
  const [stateName, setStateName] = useState<string>('Uttar Pradesh');
  const [category, setCategory] = useState<UserProfile['category']>('obc');
  const [rationCardType, setRationCardType] = useState<UserProfile['rationCardType']>('bpl');
  const [hasRationCard, setHasRationCard] = useState<boolean>(true);
  const [age, setAge] = useState<number>(38);
  const [gender, setGender] = useState<UserProfile['gender']>('female');

  // Submit profile to results
  const handleSubmit = () => {
    const profile: UserProfile = {
      occupation,
      annualIncomeLakhsRs: Number((income / 100000).toFixed(2)),
      landHoldingAcres: landholding === 'small_agri' ? 2.5 : landholding === 'large_agri' ? 6.0 : 0,
      state: stateName,
      category,
      rationCardType: hasRationCard ? rationCardType : undefined,
      hasRationCard,
      age,
      gender,
    };

    const encoded = encodeURIComponent(JSON.stringify(profile));
    router.push(`/results?profile=${encoded}`);
  };

  const formattedIncome = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(income);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Top Progress & Context Hero Area from Stitch */}
      <div className="relative overflow-hidden bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#e6eeff]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1 rounded-full text-[#a83900] text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Algorithmic Civic Welfare Engine 3.2</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#001428] tracking-tight">
              Personalized Scheme Eligibility Assessment
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Answer a few simple questions. Our deterministic rules engine will match you with 100% verified Central &amp; State benefits you qualify for.
            </p>
          </div>

          {/* Trust Mini Chip */}
          <div className="hidden sm:flex items-center gap-3 bg-[#f8f9ff] px-4 py-3 rounded-xl border border-slate-200 shrink-0">
            <span className="material-symbols-outlined text-[#00897b] text-2xl">verified</span>
            <div>
              <div className="text-xs font-bold text-[#001428]">10+ Verified Welfare Rules</div>
              <div className="text-[11px] text-slate-500">Real-time ministry sync</div>
            </div>
          </div>
        </div>

        {/* Stepper Track */}
        <div className="w-full pt-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Step 1: Active/Done */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                currentStep === 1
                  ? 'bg-[#eff4ff] border border-[#d5e3fd] ring-1 ring-[#001428]'
                  : 'bg-white border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  currentStep > 1
                    ? 'bg-[#00897b] text-white'
                    : 'bg-[#a83900] text-white shadow-sm'
                }`}
              >
                {currentStep > 1 ? '✓' : '1'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-500">Step 1</span>
                <span className="text-xs font-bold text-[#001428] truncate">Livelihood &amp; Income</span>
              </div>
            </button>

            {/* Step 2: Demographics */}
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                currentStep === 2
                  ? 'bg-[#eff4ff] border border-[#d5e3fd] ring-1 ring-[#001428]'
                  : 'bg-white border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  currentStep > 2
                    ? 'bg-[#00897b] text-white'
                    : currentStep === 2
                    ? 'bg-[#a83900] text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {currentStep > 2 ? '✓' : '2'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-500">Step 2</span>
                <span className="text-xs font-bold text-[#001428] truncate">Land &amp; Housing</span>
              </div>
            </button>

            {/* Step 3: Verification */}
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                currentStep === 3
                  ? 'bg-[#eff4ff] border border-[#d5e3fd] ring-1 ring-[#001428]'
                  : 'bg-white border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  currentStep === 3
                    ? 'bg-[#a83900] text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                3
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-500">Step 3</span>
                <span className="text-xs font-bold text-[#001428] truncate">Social Category &amp; State</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* QUESTIONNAIRE BODY */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 flex flex-col gap-8">
        {/* STEP 1: OCCUPATION & INCOME */}
        {currentStep === 1 && (
          <div className="space-y-8">
            {/* Question 1: Occupation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-lg font-bold text-[#001428] flex items-center gap-2">
                  <span>1. Primary Occupation &amp; Source of Livelihood</span>
                  <span className="text-rose-600 font-bold">*</span>
                </label>
                <span className="text-xs text-slate-400">Select one</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Welfare schemes, agricultural subsidies, and pension grants are tailored based on livelihood category.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    id: 'farmer',
                    title: 'Farmer / Cultivator',
                    desc: 'Smallholder, marginal or large farm owner',
                    icon: 'agriculture',
                  },
                  {
                    id: 'agricultural-labourer',
                    title: 'Agricultural Labourer',
                    desc: 'Daily wage worker in fields or rural allied work',
                    icon: 'construction',
                  },
                  {
                    id: 'self-employed',
                    title: 'Micro-entrepreneur / Artisan',
                    desc: 'Street vendor, retail trader, craft worker',
                    icon: 'storefront',
                  },
                  {
                    id: 'student',
                    title: 'Student / Job Aspirant',
                    desc: 'Enrolled in school, college or skilling program',
                    icon: 'school',
                  },
                  {
                    id: 'unemployed',
                    title: 'Homemaker / Unemployed',
                    desc: 'Women empowerment & livelihood missions',
                    icon: 'family_restroom',
                  },
                  {
                    id: 'salaried',
                    title: 'Senior Citizen / Retired',
                    desc: 'Old-age pensions & healthcare coverage',
                    icon: 'elderly',
                  },
                ].map((item) => {
                  const isSelected = occupation === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOccupation(item.id as UserProfile['occupation'])}
                      className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#001428] bg-[#eff4ff] ring-2 ring-[#001428]'
                          : 'border-slate-200 bg-[#f8f9ff] hover:bg-slate-100'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[#001428] text-2xl p-2 rounded-lg bg-white shadow-sm shrink-0">
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-[#001428]">{item.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-snug">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Income Range & Interactive Slider */}
            <div className="p-6 bg-[#eff4ff] rounded-2xl border border-[#d5e3fd]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <label htmlFor="income-slider" className="text-base font-bold text-[#001428] flex items-center gap-1.5">
                    <span>2. Estimated Total Annual Household Income</span>
                    <span className="text-rose-600 font-bold">*</span>
                  </label>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Combined gross earnings of all adult family members residing in household
                  </p>
                </div>

                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 self-start sm:self-auto flex items-center gap-2">
                  <span className="text-xl font-extrabold text-[#a83900] font-mono tabular-nums">
                    {formattedIncome}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ year</span>
                </div>
              </div>

              {/* Slider Control */}
              <div className="py-4">
                <input
                  id="income-slider"
                  type="range"
                  min="0"
                  max="1200000"
                  step="25000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-[#a83900]"
                />

                {/* Threshold Markers */}
                <div className="grid grid-cols-4 text-center mt-3 gap-1 text-xs">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-bold text-[#001428]">₹0</span>
                    <span className="text-[10px] text-[#00897b] font-bold bg-white px-1.5 py-0.5 rounded shadow-sm mt-0.5">
                      Antyodaya / BPL
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-[#001428]">₹1.5 Lakh</span>
                    <span className="text-[10px] text-slate-600 mt-0.5">State DBT Threshold</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-[#001428]">₹2.5 Lakh</span>
                    <span className="text-[10px] text-[#a83900] font-bold mt-0.5">Lower-Middle Cap</span>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="font-bold text-[#001428]">₹8.0 Lakh+</span>
                    <span className="text-[10px] text-slate-600 mt-0.5">EWS Upper Ceiling</span>
                  </div>
                </div>
              </div>

              {/* Explainability Callout */}
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl mt-3 text-xs text-slate-700 border border-slate-200">
                <span className="material-symbols-outlined text-[#a83900] text-lg shrink-0">info</span>
                <span>
                  Incomes under <strong>₹2.50 Lakh</strong> automatically unlock 100% sponsored Central Health Covers (Ayushman Bharat) and Food Security rations.
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-xl bg-[#001428] hover:bg-[#0f2942] text-white font-bold text-xs shadow-sm flex items-center gap-2"
              >
                <span>Continue to Step 2 (Land &amp; Housing)</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LANDHOLDING & HOUSING */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div>
              <label className="text-lg font-bold text-[#001428] flex items-center gap-2 mb-1">
                <span>3. Landholding &amp; Housing Status</span>
                <span className="text-rose-600 font-bold">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-5">
                Government schemes strictly differentiate between landholding farmers, landless tenants, and urban dwellers.
              </p>

              <div className="space-y-3">
                {[
                  {
                    id: 'small_agri',
                    title: 'Own agricultural land (< 2 hectares / 5 acres)',
                    subtitle: 'Eligible for PM-Kisan Samman Nidhi (₹6,000/yr) & Subsidized Crop Insurance',
                    badge: 'High Match',
                  },
                  {
                    id: 'large_agri',
                    title: 'Own agricultural land (> 2 hectares / 5 acres)',
                    subtitle: 'Eligible for Farm Mechanization & Solar Pump Subsidies',
                  },
                  {
                    id: 'tenant',
                    title: 'Landless agricultural tenant / Rural artisan',
                    subtitle: 'Qualifies for MNREGA 100-day wage guarantee & Livelihood Missions',
                  },
                  {
                    id: 'urban',
                    title: 'Urban dwelling / Rented accommodation',
                    subtitle: 'Eligible for PM Awas Yojana (Urban) interest subsidy & skill grants',
                  },
                ].map((opt) => {
                  const isChecked = landholding === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#001428] bg-[#eff4ff] ring-2 ring-[#001428]'
                          : 'border-slate-200 bg-[#f8f9ff] hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="landholding"
                          checked={isChecked}
                          onChange={() => setLandholding(opt.id as typeof landholding)}
                          className="w-4 h-4 text-[#001428] accent-[#001428]"
                        />
                        <div>
                          <span className="text-sm font-bold text-[#001428] block">{opt.title}</span>
                          <span className="text-xs text-slate-500 mt-0.5 block">{opt.subtitle}</span>
                        </div>
                      </div>

                      {opt.badge && (
                        <span className="hidden sm:inline-block text-xs font-bold text-[#00897b] bg-white px-2.5 py-1 rounded-full border border-[#a7f3d0]">
                          {opt.badge}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-[#f8f9ff] rounded-2xl border border-slate-200">
              <div>
                <label htmlFor="age-input" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Applicant Age (Complete Years)
                </label>
                <input
                  id="age-input"
                  type="number"
                  min="0"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-[#001428]"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  e.g. Sukanya Samriddhi requires age ≤ 10; NSAP Pension requires age ≥ 60.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['female', 'male', 'prefer-not-to-say'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`p-3 rounded-xl border text-xs font-bold capitalize transition-all ${
                        gender === g
                          ? 'border-[#001428] bg-[#001428] text-white'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {g === 'prefer-not-to-say' ? 'Other' : g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl bg-[#001428] hover:bg-[#0f2942] text-white font-bold text-xs shadow-sm flex items-center gap-2"
              >
                <span>Continue to Step 3 (State &amp; Category)</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: STATE & RATION CARD & CATEGORY */}
        {currentStep === 3 && (
          <div className="space-y-8">
            {/* State selection */}
            <div>
              <label htmlFor="state-select" className="text-base font-bold text-[#001428] flex items-center gap-2 mb-1">
                <span>4. Permanent Residence State / UT</span>
                <span className="text-rose-600 font-bold">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Used to filter state-specific welfare rules and top-up pension grants.
              </p>

              <select
                id="state-select"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="w-full p-3.5 bg-[#f8f9ff] border border-slate-300 rounded-xl text-sm font-semibold text-[#001428] focus:border-[#001428]"
              >
                {[
                  'Uttar Pradesh',
                  'Maharashtra',
                  'Bihar',
                  'Madhya Pradesh',
                  'Rajasthan',
                  'West Bengal',
                  'Tamil Nadu',
                  'Karnataka',
                  'Gujarat',
                  'Andhra Pradesh',
                  'Odisha',
                  'Punjab',
                  'Haryana',
                  'Assam',
                  'Delhi',
                ].map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Social Category */}
            <div>
              <label className="text-base font-bold text-[#001428] flex items-center gap-2 mb-1">
                <span>5. Social Reservation Category (Optional)</span>
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Many scholarship and entrepreneurship subsidies (PMEGP) offer higher capital grant rates for reserved groups.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'general', label: 'General / EWS' },
                  { id: 'obc', label: 'OBC' },
                  { id: 'sc', label: 'SC' },
                  { id: 'st', label: 'ST' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id as UserProfile['category'])}
                    className={`p-3.5 rounded-xl border text-xs font-bold transition-all ${
                      category === cat.id
                        ? 'border-[#001428] bg-[#001428] text-white shadow-sm'
                        : 'border-slate-200 bg-[#f8f9ff] text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ration Card */}
            <div className="p-6 bg-[#eff4ff] rounded-2xl border border-[#d5e3fd]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-bold text-[#001428]">Ration Card Status</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Required for NFSA Food Security &amp; Ayushman Bharat</p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasRationCard}
                    onChange={(e) => setHasRationCard(e.target.checked)}
                    className="w-4 h-4 accent-[#001428] rounded cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#001428]">Hold Ration Card</span>
                </label>
              </div>

              {hasRationCard && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { id: 'bpl', label: 'BPL Card (Below Poverty Line)' },
                    { id: 'antyodaya', label: 'AAY (Antyodaya Anna Yojana)' },
                    { id: 'apl', label: 'APL / Non-Priority' },
                  ].map((rc) => (
                    <button
                      key={rc.id}
                      type="button"
                      onClick={() => setRationCardType(rc.id as UserProfile['rationCardType'])}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        rationCardType === rc.id
                          ? 'border-[#00897b] bg-[#ecfdf5] text-[#065f46] font-bold ring-1 ring-[#00897b]'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {rc.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3.5 rounded-xl bg-[#a83900] hover:bg-[#fc6018] text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Evaluate My Scheme Matches</span>
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trust & Zero-Persistence Guarantee from Stitch */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-[#00897b]">lock</span>
          <span>Zero-Knowledge Privacy: Demographics are kept purely in your browser session.</span>
        </div>

        <Link href="/about#privacy" className="text-[#001428] font-semibold hover:underline">
          Privacy Architecture Documentation →
        </Link>
      </div>
    </div>
  );
}
