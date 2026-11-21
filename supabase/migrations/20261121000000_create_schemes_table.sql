-- ==============================================================================
-- SchemeSaathi - Supabase Schema Migration: public.schemes
-- Resolves: "Could not find the table 'public.schemes' in the schema cache"
-- ==============================================================================

-- 1. Create table public.schemes if it does not exist
CREATE TABLE IF NOT EXISTS public.schemes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    ministry TEXT,
    governing_body TEXT NOT NULL DEFAULT 'central',
    scope TEXT NOT NULL DEFAULT 'central',
    state_code TEXT,
    sector TEXT NOT NULL DEFAULT 'social',
    benefit_summary TEXT NOT NULL,
    benefit_amount TEXT,
    benefit_type TEXT NOT NULL DEFAULT 'dbt',
    eligibility_conditions JSONB DEFAULT '[]'::jsonb,
    unchecked_requirements JSONB DEFAULT '[]'::jsonb,
    documents_required JSONB DEFAULT '[]'::jsonb,
    official_url TEXT NOT NULL,
    source_check_date TEXT NOT NULL DEFAULT CURRENT_DATE::text,
    application_guidance TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS) and grant public read access
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'schemes' AND policyname = 'Public read access for schemes'
    ) THEN
        CREATE POLICY "Public read access for schemes" 
        ON public.schemes FOR SELECT 
        USING (true);
    END IF;
END $$;

-- 3. Grant table permissions to public roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.schemes TO anon, authenticated;

-- 4. Seed Essential Indian Welfare Schemes
INSERT INTO public.schemes (
    id, name, department, ministry, governing_body, scope, sector, 
    benefit_summary, benefit_amount, benefit_type, official_url, 
    documents_required, unchecked_requirements, tags
) VALUES
(
    'pm-kisan',
    'PM Kisan Samman Nidhi (PM-KISAN)',
    'Ministry of Agriculture & Farmers Welfare',
    'Ministry of Agriculture & Farmers Welfare',
    'central',
    'central',
    'agriculture',
    'Provides income support of ₹6,000 per year to all land-holding farmer families in 3 equal instalments.',
    '₹6,000/year in 3 instalments of ₹2,000',
    'dbt',
    'https://pmkisan.gov.in',
    '["Aadhaar Card", "Land ownership documentation (Khata/Khasra)", "Bank account linked with Aadhaar"]'::jsonb,
    '["Verification of land records with state revenue database", "Exclusion check: Institutional land holders", "Exclusion check: Constitutional post holders / Income tax payees"]'::jsonb,
    '["agriculture", "farmer", "dbt", "cash-transfer", "central"]'::jsonb
),
(
    'pmjay',
    'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    'National Health Authority, Ministry of Health and Family Welfare',
    'Ministry of Health and Family Welfare',
    'central',
    'central',
    'healthcare',
    'Health cover of ₹5,00,000 per family per year for secondary and tertiary care hospitalization to over 12 crore poor and vulnerable families.',
    '₹5,00,000/family/year cashless coverage',
    'service',
    'https://pmjay.gov.in',
    '["Aadhaar card or Ration card", "Mobile number for OTP verification", "SECC verification document / PM-JAY letter"]'::jsonb,
    '["SECC 2011 deprivation and occupational criteria confirmation", "State health card linkage status"]'::jsonb,
    '["healthcare", "insurance", "hospitalisation", "bpl", "cashless"]'::jsonb
),
(
    'pmay-g',
    'Pradhan Mantri Awaas Yojana - Gramin (PMAY-G)',
    'Ministry of Rural Development',
    'Ministry of Rural Development',
    'central',
    'central',
    'housing',
    'Financial assistance of ₹1,20,000 (plains) to ₹1,30,000 (hilly/difficult areas) for construction of a permanent pucca house with basic amenities.',
    '₹1,20,000 to ₹1,30,000 direct transfer in tranches',
    'dbt',
    'https://pmayg.nic.in',
    '["Aadhaar card", "Bank account details linked to Aadhaar", "MGNREGA job card number", "Swachh Bharat Mission registration number"]'::jsonb,
    '["Gram Sabha approval and geo-tagging of existing kutcha house", "Verification that no family member owns a pucca house nationwide", "Exclusion check: Two/three/four-wheeler ownership, motorized fishing boat"]'::jsonb,
    '["housing", "rural", "shelter", "bpl", "pucca-house", "dbt"]'::jsonb
),
(
    'sukanya-samriddhi',
    'Sukanya Samriddhi Yojana (SSY)',
    'Ministry of Finance / Department of Posts',
    'Ministry of Finance',
    'central',
    'central',
    'women',
    'Government-backed savings scheme for the girl child offering high interest rates (8.2% p.a.). Matures at age 21.',
    'High interest rate (8.2% p.a.) with Section 80C tax exemption',
    'subsidy',
    'https://www.indiapost.gov.in',
    '["Birth certificate of the girl child", "Identity and address proof of guardian (Aadhaar, Voter ID)", "Photographs of child and parent"]'::jsonb,
    '["Maximum of two girl child accounts per family (with twins/triplets exception)", "Account opened before girl turns 10"]'::jsonb,
    '["women", "girl-child", "savings", "education", "marriage", "tax-benefit"]'::jsonb
),
(
    'pm-mudra',
    'Pradhan Mantri MUDRA Yojana (PMMY)',
    'Department of Financial Services, Ministry of Finance',
    'Ministry of Finance',
    'central',
    'central',
    'business',
    'Collateral-free loans up to ₹20,00,000 for micro and small enterprises across Shishu, Kishore, and Tarun categories.',
    'Collateral-free business loan up to ₹20,00,000',
    'subsidy',
    'https://www.mudra.org.in',
    '["Business identity / registration proof", "Applicant Aadhaar & PAN card", "Last 6 months bank statement", "Quotations for machinery/items to be purchased"]'::jsonb,
    '["Satisfactory credit score and absence of loan defaults in any bank", "Viable business proposal or operational track record"]'::jsonb,
    '["business", "micro-enterprise", "loan", "entrepreneurship", "collateral-free"]'::jsonb
),
(
    'nsap',
    'National Social Assistance Programme (NSAP) - IGNOAPS',
    'Ministry of Rural Development',
    'Ministry of Rural Development',
    'central',
    'central',
    'social',
    'Monthly pension of ₹200/month (60-79 years) and ₹500/month (80+ years) supplemented by State contributions for elderly BPL citizens.',
    '₹200 - ₹1,000+/month depending on state top-up',
    'dbt',
    'https://nsap.nic.in',
    '["Aadhaar card", "Age proof certificate", "BPL ration card or BPL survey confirmation", "Bank or post office passbook"]'::jsonb,
    '["Verification of name in BPL list by local Panchayat or municipal body", "Proof of age verification through medical board if birth certificate unavailable"]'::jsonb,
    '["social", "senior-citizen", "pension", "bpl", "elderly", "dbt"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    department = EXCLUDED.department,
    ministry = EXCLUDED.ministry,
    governing_body = EXCLUDED.governing_body,
    scope = EXCLUDED.scope,
    sector = EXCLUDED.sector,
    benefit_summary = EXCLUDED.benefit_summary,
    benefit_amount = EXCLUDED.benefit_amount,
    benefit_type = EXCLUDED.benefit_type,
    official_url = EXCLUDED.official_url,
    documents_required = EXCLUDED.documents_required,
    unchecked_requirements = EXCLUDED.unchecked_requirements,
    tags = EXCLUDED.tags,
    updated_at = NOW();

-- 5. Force PostgREST to reload its schema cache immediately
NOTIFY pgrst, 'reload schema';
