'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserProfile } from '@/types/scheme';

export function WizardForm() {
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
    <div className="w-full max-w-7xl mx-auto px-margin lg:px-gutter-desktop py-space-lg flex flex-col gap-space-lg">
      {/* Top Progress & Context Hero Area from Stitch */}
      <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-surface-container">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-surface-container/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-surface-container-low px-3 py-1 rounded-full text-secondary text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Algorithmic Civic Welfare Engine 3.2</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg lg:text-display lg:font-display text-primary tracking-tight">
              Personalized Scheme Eligibility Assessment
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Answer a few simple questions. Our deterministic rules engine will match you with 100% verified Central &amp; State benefits you qualify for.
            </p>
          </div>

          {/* Trust Mini Chip */}
          <div className="hidden sm:flex items-center gap-3 bg-surface px-4 py-3 rounded-xl border border-surface-container shrink-0">
            <span className="material-symbols-outlined text-on-tertiary-container text-2xl">verified</span>
            <div>
              <div className="text-xs font-bold text-primary">10+ Verified Welfare Rules</div>
              <div className="text-[11px] text-on-surface-variant">Real-time ministry sync</div>
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
                  ? 'bg-surface-container-low border border-surface-container-highest ring-1 ring-primary'
                  : 'bg-surface-container-lowest border border-surface-container hover:bg-surface'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  currentStep > 1
                    ? 'bg-tertiary-container text-tertiary-fixed'
                    : 'bg-secondary text-on-secondary shadow-sm'
                }`}
              >
                {currentStep > 1 ? '✓' : '1'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-[10px] uppercase font-bold text-on-surface-variant">Step 1</span>
                <span className="font-label-lg text-xs font-bold text-primary truncate">Livelihood &amp; Income</span>
              </div>
            </button>

            {/* Step 2: Demographics */}
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                currentStep === 2
                  ? 'bg-surface-container-low border border-surface-container-highest ring-1 ring-primary'
                  : 'bg-surface-container-lowest border border-surface-container hover:bg-surface'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  currentStep > 2
                    ? 'bg-tertiary-container text-tertiary-fixed'
                    : currentStep === 2
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {currentStep > 2 ? '✓' : '2'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-[10px] uppercase font-bold text-on-surface-variant">Step 2</span>
                <span className="font-label-lg text-xs font-bold text-primary truncate">Land &amp; Housing</span>
              </div>
            </button>

            {/* Step 3: Verification */}
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                currentStep === 3
                  ? 'bg-surface-container-low border border-surface-container-highest ring-1 ring-primary'
                  : 'bg-surface-container-lowest border border-surface-container hover:bg-surface'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  currentStep === 3
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                3
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-[10px] uppercase font-bold text-on-surface-variant">Step 3</span>
                <span className="font-label-lg text-xs font-bold text-primary truncate">Social Category &amp; State</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* QUESTIONNAIRE BODY */}
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm p-6 sm:p-10 flex flex-col gap-8">
        {/* STEP 1: OCCUPATION & INCOME */}
        {currentStep === 1 && (
          <div className="space-y-8">
            {/* Question 1: Occupation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-headline-sm text-lg font-bold text-primary flex items-center gap-2">
                  <span>1. Primary Occupation &amp; Source of Livelihood</span>
                  <span className="text-error font-bold">*</span>
                </label>
                <span className="font-label-md text-xs text-outline">Select one</span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant mb-4">
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
                          ? 'border-primary bg-surface-container-low ring-2 ring-primary'
                          : 'border-surface-container bg-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <span className="material-symbols-outlined text-primary text-2xl p-2 rounded-lg bg-surface-container-lowest shadow-sm shrink-0">
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="font-headline-sm text-sm font-bold text-primary">{item.title}</div>
                        <div className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-snug">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Income Range & Interactive Slider */}
            <div className="p-6 bg-surface-container-low rounded-2xl border border-surface-container-highest">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <label htmlFor="income-slider" className="font-headline-sm text-base font-bold text-primary flex items-center gap-1.5">
                    <span>2. Estimated Total Annual Household Income</span>
                    <span className="text-error font-bold">*</span>
                  </label>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Combined gross earnings of all adult family members residing in household
                  </p>
                </div>

                <div className="bg-surface-container-lowest px-4 py-2 rounded-xl shadow-sm border border-surface-container self-start sm:self-auto flex items-center gap-2">
                  <span className="font-tabular-amount text-xl font-extrabold text-secondary font-mono tabular-nums">
                    {formattedIncome}
                  </span>
                  <span className="font-label-md text-xs text-on-surface-variant font-medium">/ year</span>
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
                  className="w-full h-3 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary"
                />

                {/* Threshold Markers */}
                <div className="grid grid-cols-4 text-center mt-3 gap-1 font-label-md text-xs">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-bold text-primary">₹0</span>
                    <span className="text-[10px] text-tertiary-fixed-dim font-bold bg-surface-container-lowest px-1.5 py-0.5 rounded shadow-sm mt-0.5">
                      Antyodaya / BPL
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-primary">₹1.5 Lakh</span>
                    <span className="text-[10px] text-on-surface-variant mt-0.5">State DBT Threshold</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-primary">₹2.5 Lakh</span>
                    <span className="text-[10px] text-secondary font-bold mt-0.5">Lower-Middle Cap</span>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="font-bold text-primary">₹8.0 Lakh+</span>
                    <span className="text-[10px] text-on-surface-variant mt-0.5">EWS Upper Ceiling</span>
                  </div>
                </div>
              </div>

              {/* Explainability Callout */}
              <div className="flex items-center gap-2 bg-surface-container-lowest p-3 rounded-xl mt-3 text-xs text-on-surface border border-surface-container">
                <span className="material-symbols-outlined text-secondary text-lg shrink-0">info</span>
                <span>
                  Incomes under <strong>₹2.50 Lakh</strong> automatically unlock 100% sponsored Central Health Covers (Ayushman Bharat) and Food Security rations.
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-surface-container">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold font-label-md text-xs shadow-sm flex items-center gap-2 transition-colors"
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
              <label className="font-headline-sm text-lg font-bold text-primary flex items-center gap-2 mb-1">
                <span>3. Landholding &amp; Housing Status</span>
                <span className="text-error font-bold">*</span>
              </label>
              <p className="font-body-sm text-xs text-on-surface-variant mb-5">
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
                          ? 'border-primary bg-surface-container-low ring-2 ring-primary'
                          : 'border-surface-container bg-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="landholding"
                          checked={isChecked}
                          onChange={() => setLandholding(opt.id as typeof landholding)}
                          className="w-4 h-4 text-primary accent-primary"
                        />
                        <div>
                          <span className="font-headline-sm text-sm font-bold text-primary block">{opt.title}</span>
                          <span className="font-body-sm text-xs text-on-surface-variant mt-0.5 block">{opt.subtitle}</span>
                        </div>
                      </div>

                      {opt.badge && (
                        <span className="hidden sm:inline-block font-label-md text-xs font-bold text-tertiary-fixed bg-tertiary-container px-2.5 py-1 rounded-full border border-tertiary-fixed-dim">
                          {opt.badge}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-surface rounded-2xl border border-surface-container">
              <div>
                <label htmlFor="age-input" className="block font-label-md text-xs font-bold text-primary uppercase mb-1">
                  Applicant Age (Complete Years)
                </label>
                <input
                  id="age-input"
                  type="number"
                  min="0"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-label-md text-sm font-bold text-primary"
                />
                <span className="font-body-sm text-[11px] text-on-surface-variant mt-1 block">
                  e.g. Sukanya Samriddhi requires age ≤ 10; NSAP Pension requires age ≥ 60.
                </span>
              </div>

              <div>
                <label className="block font-label-md text-xs font-bold text-primary uppercase mb-1">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['female', 'male', 'prefer-not-to-say'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`p-3 rounded-xl border font-label-md text-xs font-bold capitalize transition-all ${
                        gender === g
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface'
                      }`}
                    >
                      {g === 'prefer-not-to-say' ? 'Other' : g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-surface-container">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl border border-outline-variant text-xs font-bold font-label-md text-on-surface hover:bg-surface"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold font-label-md text-xs shadow-sm flex items-center gap-2 transition-colors"
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
              <label htmlFor="state-select" className="font-headline-sm text-base font-bold text-primary flex items-center gap-2 mb-1">
                <span>4. Permanent Residence State / UT</span>
                <span className="text-error font-bold">*</span>
              </label>
              <p className="font-body-sm text-xs text-on-surface-variant mb-3">
                Used to filter state-specific welfare rules and top-up pension grants.
              </p>

              <select
                id="state-select"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="w-full p-3.5 bg-surface border border-outline-variant rounded-xl font-label-md text-sm font-semibold text-primary focus:border-primary"
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
              <label className="font-headline-sm text-base font-bold text-primary flex items-center gap-2 mb-1">
                <span>5. Social Reservation Category (Optional)</span>
              </label>
              <p className="font-body-sm text-xs text-on-surface-variant mb-3">
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
                    className={`p-3.5 rounded-xl border font-label-md text-xs font-bold transition-all ${
                      category === cat.id
                        ? 'border-primary bg-primary text-on-primary shadow-sm'
                        : 'border-surface-container bg-surface text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ration Card */}
            <div className="p-6 bg-surface-container-low rounded-2xl border border-surface-container-highest">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-headline-sm text-sm font-bold text-primary">Ration Card Status</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">Required for NFSA Food Security &amp; Ayushman Bharat</p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasRationCard}
                    onChange={(e) => setHasRationCard(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                  <span className="font-label-md text-xs font-bold text-primary">Hold Ration Card</span>
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
                      className={`p-3 rounded-xl border font-label-md text-xs font-semibold text-center transition-all ${
                        rationCardType === rc.id
                          ? 'border-tertiary-fixed bg-tertiary-container text-tertiary-fixed font-bold ring-1 ring-tertiary-fixed'
                          : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface'
                      }`}
                    >
                      {rc.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-surface-container">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl border border-outline-variant text-xs font-bold font-label-md text-on-surface hover:bg-surface"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3.5 rounded-xl bg-secondary hover:bg-secondary-container text-on-secondary font-extrabold font-label-lg text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Evaluate My Scheme Matches</span>
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trust & Zero-Persistence Guarantee from Stitch */}
      <div className="flex items-center justify-between font-body-sm text-xs text-on-surface-variant px-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-tertiary-fixed-dim">lock</span>
          <span>Zero-Knowledge Privacy: Demographics are kept purely in your browser session.</span>
        </div>

        <Link href="/about#privacy" className="text-primary font-semibold hover:underline">
          Privacy Architecture Documentation →
        </Link>
      </div>
    </div>
  );
}
