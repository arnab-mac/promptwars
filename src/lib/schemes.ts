export type EligibilityStatus = 'pass' | 'fail' | 'unknown';

export interface EligibilityCondition {
  id: string;
  label: string;
  checkKey: keyof UserProfile | null;
  evaluate: (profile: UserProfile) => EligibilityStatus;
  failReason: string;
  unknownReason: string;
  passReason: string;
}

export interface Scheme {
  id: string;
  name: string;
  department: string;
  scope: 'central' | 'state';
  stateCode?: string;
  benefitSummary: string;
  benefitAmount?: string;
  eligibilityConditions: EligibilityCondition[];
  uncheckedRequirements: string[];
  officialUrl: string;
  sourceCheckDate: string;
  documentsRequired?: string[];
  applicationGuidance?: string;
  tags: string[];
}

export interface UserProfile {
  age?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  state?: string;
  annualIncomeLakhsRs?: number;
  occupation?: 'farmer' | 'agricultural-labourer' | 'student' | 'unemployed' | 'salaried' | 'self-employed' | 'other' | 'prefer-not-to-say';
  landHoldingAcres?: number;
  category?: 'general' | 'obc' | 'sc' | 'st' | 'prefer-not-to-say';
  isWidow?: boolean;
  isDisabled?: boolean;
  hasRationCard?: boolean;
  rationCardType?: 'bpl' | 'apl' | 'antyodaya';
}

export const SCHEMES: Scheme[] = [
  // 1. PM-KISAN
  {
    id: 'pm-kisan',
    name: 'PM Kisan Samman Nidhi (PM-KISAN)',
    department: 'Ministry of Agriculture & Farmers Welfare',
    scope: 'central',
    benefitSummary:
      'Provides income support of ₹6,000 per year to all land-holding farmer families. The benefit is paid in three equal instalments of ₹2,000 directly into the farmer\'s bank account.',
    benefitAmount: '₹6,000/year in 3 instalments of ₹2,000',
    eligibilityConditions: [
      {
        id: 'pm-kisan-farmer',
        label: 'Must be a farmer (cultivator) or agricultural labourer with land holding',
        checkKey: 'occupation',
        evaluate: (p) => {
          if (p.occupation === undefined) return 'unknown';
          return p.occupation === 'farmer' ? 'pass' : 'fail';
        },
        failReason: 'Your occupation is not listed as farmer.',
        unknownReason: 'Occupation not provided.',
        passReason: 'You are listed as a farmer.',
      },
      {
        id: 'pm-kisan-land',
        label: 'Must own cultivable land (any size)',
        checkKey: 'landHoldingAcres',
        evaluate: (p) => {
          if (p.landHoldingAcres === undefined) return 'unknown';
          return p.landHoldingAcres > 0 ? 'pass' : 'fail';
        },
        failReason: 'No land holding recorded.',
        unknownReason: 'Land holding not provided.',
        passReason: 'You have a recorded land holding.',
      },
      {
        id: 'pm-kisan-income',
        label: 'Annual family income must be below ₹2 lakh (income-tax exemption limit applies)',
        checkKey: 'annualIncomeLakhsRs',
        evaluate: (p) => {
          if (p.annualIncomeLakhsRs === undefined) return 'unknown';
          return p.annualIncomeLakhsRs < 2 ? 'pass' : 'fail';
        },
        failReason: 'Your annual income meets or exceeds the ₹2 lakh threshold that disqualifies income-tax payers.',
        unknownReason: 'Annual income not provided.',
        passReason: 'Your income is below the ₹2 lakh disqualification threshold.',
      },
    ],
    uncheckedRequirements: [
      'Must have valid Aadhaar-linked bank account',
      'Land records must be in applicant\'s name in state revenue records',
      'Institutional land-holders (temples, trusts, etc.) are excluded',
      'Former/current holders of constitutional posts and their families are excluded',
      'Retired pensioners receiving ≥₹10,000/month are excluded',
    ],
    officialUrl: 'https://pmkisan.gov.in/',
    sourceCheckDate: '2024-11-21',
    documentsRequired: [
      'Aadhaar card',
      'Land ownership documents / Khasra-Khatauni',
      'Bank passbook (Aadhaar-linked account)',
      'Mobile number',
    ],
    applicationGuidance:
      'Apply online at pmkisan.gov.in or visit your nearest Common Service Centre (CSC) or Patwari/Lekhpal office. Self-registration is available on the PM-KISAN portal.',
    tags: ['agriculture', 'farmer', 'income-support', 'central', 'land'],
  },

  // 2. PMAY-G
  {
    id: 'pmay-g',
    name: 'Pradhan Mantri Awas Yojana – Gramin (PMAY-G)',
    department: 'Ministry of Rural Development',
    scope: 'central',
    benefitSummary:
      'Provides financial assistance to rural households who are homeless or living in kutcha / dilapidated houses. Beneficiaries receive a grant to construct a pucca house with basic amenities.',
    benefitAmount: '₹1,20,000 (plain areas) or ₹1,30,000 (hilly/difficult areas)',
    eligibilityConditions: [
      {
        id: 'pmay-g-ration',
        label: 'Must hold a BPL or Antyodaya ration card (SECC 2011 priority list)',
        checkKey: 'rationCardType',
        evaluate: (p) => {
          if (p.rationCardType === undefined) {
            if (p.hasRationCard === false) return 'fail';
            return 'unknown';
          }
          return p.rationCardType === 'bpl' || p.rationCardType === 'antyodaya' ? 'pass' : 'fail';
        },
        failReason: 'Your ration card type is not BPL or Antyodaya.',
        unknownReason: 'Ration card type not provided.',
        passReason: 'Your BPL/Antyodaya ration card makes you priority-eligible.',
      },
      {
        id: 'pmay-g-homeless',
        label: 'Must be homeless or living in a kutcha (mud/thatch) or one-room house',
        checkKey: null,
        evaluate: () => 'unknown',
        failReason: 'You have adequate housing.',
        unknownReason: 'Current housing condition cannot be assessed from the profile.',
        passReason: 'You are recorded as homeless or living in inadequate housing.',
      },
    ],
    uncheckedRequirements: [
      'Must be listed in SECC 2011 Socio-Economic Caste Census data',
      'Must reside in a rural area (not in a municipality/town)',
      'Must not already own a pucca house anywhere in India',
      'Priority given to SC/ST, minorities, ex-servicemen, persons with disability',
    ],
    officialUrl: 'https://pmayg.nic.in/',
    sourceCheckDate: '2024-11-21',
    documentsRequired: [
      'Aadhaar card',
      'BPL/Antyodaya ration card',
      'Bank account details',
      'SECC-2011 reference number (provided by Gram Panchayat)',
      'Job Card under MGNREGS (if applicable)',
    ],
    applicationGuidance:
      'Selection is primarily from the SECC-2011 waiting list managed by the Gram Panchayat. Contact your Gram Panchayat Pradhan or Block Development Officer (BDO) to verify if your name appears on the PMAY-G priority list.',
    tags: ['housing', 'rural', 'bpl', 'construction', 'central'],
  },

  // 3. PM Jan Dhan Yojana
  {
    id: 'pmjdy',
    name: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
    department: 'Ministry of Finance, Department of Financial Services',
    scope: 'central',
    benefitSummary:
      'Ensures access to financial services — savings accounts, remittance, credit, insurance, and pension — for every unbanked household. Account holders get a RuPay debit card and an overdraft facility up to ₹10,000.',
    benefitAmount: '₹10,000 overdraft facility + ₹2 lakh accident insurance cover (RuPay card)',
    eligibilityConditions: [
      {
        id: 'pmjdy-age',
        label: 'Must be 10 years of age or older',
        checkKey: 'age',
        evaluate: (p) => {
          if (p.age === undefined) return 'unknown';
          return p.age >= 10 ? 'pass' : 'fail';
        },
        failReason: 'You must be at least 10 years old to open a PMJDY account.',
        unknownReason: 'Age not provided.',
        passReason: 'You meet the minimum age requirement of 10 years.',
      },
    ],
    uncheckedRequirements: [
      'Must not already have a savings bank account (PMJDY targets unbanked individuals)',
      'Must be an Indian resident',
      'Zero balance account — no minimum balance required',
      'Overdraft facility available after satisfactory operation for 6 months (up to ₹10,000)',
    ],
    officialUrl: 'https://pmjdy.gov.in/',
    sourceCheckDate: '2024-11-21',
    documentsRequired: [
      'Aadhaar card (or any valid identity proof)',
      'Passport-size photograph',
    ],
    applicationGuidance:
      'Visit any bank branch or Business Correspondent (BC) agent and fill out the account opening form. For small accounts, simplified KYC (self-certification) is accepted.',
    tags: ['banking', 'financial-inclusion', 'insurance', 'central', 'universal'],
  },

  // 4. Sukanya Samriddhi Yojana
  {
    id: 'ssy',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    department: 'Ministry of Finance',
    scope: 'central',
    benefitSummary:
      'A government-backed savings scheme for the girl child, offering one of the highest interest rates among small savings schemes. Deposits grow tax-free and the account matures when the girl turns 21 or upon her marriage after age 18.',
    benefitAmount: 'High interest rate (8.2% p.a. as of Q3 FY2024-25); tax-free returns under Section 80C',
    eligibilityConditions: [
      {
        id: 'ssy-gender',
        label: 'Must be female (girl child)',
        checkKey: 'gender',
        evaluate: (p) => {
          if (p.gender === undefined || p.gender === 'prefer-not-to-say') return 'unknown';
          return p.gender === 'female' ? 'pass' : 'fail';
        },
        failReason: 'SSY is exclusively for the girl child.',
        unknownReason: 'Gender not provided.',
        passReason: 'You are female, meeting the gender criterion.',
      },
      {
        id: 'ssy-age',
        label: 'Must be below 10 years of age at the time of account opening',
        checkKey: 'age',
        evaluate: (p) => {
          if (p.age === undefined) return 'unknown';
          return p.age <= 10 ? 'pass' : 'fail';
        },
        failReason: 'SSY accounts can only be opened for girls aged 10 or below.',
        unknownReason: 'Age not provided.',
        passReason: 'You are within the eligible age range (10 years or below).',
      },
    ],
    uncheckedRequirements: [
      'Account must be opened in the name of the girl child by her parent or guardian',
      'Maximum two SSY accounts per family (one per girl child)',
      'Minimum deposit ₹250 per year; maximum ₹1.5 lakh per year',
      'Must be an Indian resident',
    ],
    officialUrl: 'https://www.indiapost.gov.in/Financial/pages/Content/SukanyaSamriddhiYojana.aspx',
    sourceCheckDate: '2024-11-21',
    documentsRequired: [
      'Birth certificate of the girl child',
      'Aadhaar card of parent/guardian',
      'Identity and address proof of parent/guardian',
      'Passport-size photograph of girl child and guardian',
    ],
    applicationGuidance:
      'Open an SSY account at any post office or authorised bank branch. The parent/guardian fills out the account opening form with the girl child\'s birth certificate.',
    tags: ['girl-child', 'savings', 'education', 'women', 'central'],
  },

  // 5. Ayushman Bharat PM-JAY
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat – PM Jan Arogya Yojana (PM-JAY)',
    department: 'Ministry of Health and Family Welfare / National Health Authority',
    scope: 'central',
    benefitSummary:
      'Provides health cover of up to ₹5 lakh per family per year for secondary and tertiary hospitalisation. Covers pre-existing diseases from day one, with cashless treatment at empanelled government and private hospitals.',
    benefitAmount: '₹5 lakh/year health cover per family (cashless)',
    eligibilityConditions: [
      {
        id: 'ab-pmjay-ration',
        label: 'Must hold a BPL or Antyodaya ration card, or be listed in SECC 2011',
        checkKey: 'rationCardType',
        evaluate: (p) => {
          if (p.rationCardType === undefined) {
            if (p.hasRationCard === false) return 'fail';
            return 'unknown';
          }
          return p.rationCardType === 'bpl' || p.rationCardType === 'antyodaya' ? 'pass' : 'fail';
        },
        failReason: 'You need a BPL/Antyodaya ration card or SECC 2011 listing for PM-JAY.',
        unknownReason: 'Ration card status not provided.',
        passReason: 'Your BPL/Antyodaya ration card makes you eligible.',
      },
      {
        id: 'ab-pmjay-income',
        label: 'Family should belong to lower-income / deprived household category',
        checkKey: 'annualIncomeLakhsRs',
        evaluate: (p) => {
          if (p.annualIncomeLakhsRs === undefined) return 'unknown';
          return p.annualIncomeLakhsRs <= 2.5 ? 'pass' : 'fail';
        },
        failReason: 'Your income suggests you may not fall in the deprived household category.',
        unknownReason: 'Annual income not provided.',
        passReason: 'Your income level is consistent with PM-JAY eligibility criteria.',
      },
    ],
    uncheckedRequirements: [
      'Must be listed in the SECC 2011 database or AB PM-JAY beneficiary list',
      'No cap on family size',
      'Pre-existing diseases covered from day one',
      'Valid Ayushman Card (AB Health Account) required at empanelled hospitals',
    ],
    officialUrl: 'https://pmjay.gov.in/',
    sourceCheckDate: '2024-11-21',
    documentsRequired: [
      'Aadhaar card',
      'Ration card (BPL/Antyodaya)',
      'Mobile number for OTP verification',
    ],
    applicationGuidance:
      'Check eligibility at mera.pmjay.gov.in by entering your mobile number or ration card number. If eligible, download the Ayushman App or visit a Common Service Centre or empanelled hospital to generate your Ayushman Card.',
    tags: ['health', 'insurance', 'bpl', 'hospitalisation', 'central', 'family'],
  },

  // 6. NSAP
  {
    id: 'nsap',
    name: 'National Social Assistance Programme (NSAP)',
    department: 'Ministry of Rural Development',
    scope: 'central',
    benefitSummary:
      'Provides monthly pension to elderly, widows, and persons with disabilities who belong to BPL households. The central contribution ranges from ₹200–₹500/month, with states often topping up the amount.',
    benefitAmount: '₹200–₹500/month (central component) + state top-up varies',
    eligibilityConditions: [
      {
        id: 'nsap-bpl',
        label: 'Must belong to a Below Poverty Line (BPL) household',
        checkKey: 'rationCardType',
        evaluate: (p) => {
          if (p.rationCardType === undefined) {
            if (p.hasRationCard === false) return 'fail';
            return 'unknown';
          }
          return p.rationCardType === 'bpl' || p.rationCardType === 'antyodaya' ? 'pass' : 'fail';
        },
        failReason: 'You need to be from a BPL household for NSAP.',
        unknownReason: 'Ration card type not provided.',
        passReason: 'Your BPL/Antyodaya card confirms BPL household status.',
      },
      {
        id: 'nsap-category',
        label: 'Must be: (a) aged 60+ (Indira Gandhi National Old Age Pension), or (b) a widow aged 40–79, or (c) a person with disability aged 18–79',
        checkKey: 'age',
        evaluate: (p) => {
          const age = p.age;
          const isWidow = p.isWidow;
          const isDisabled = p.isDisabled;
          if (age === undefined) return 'unknown';
          if (age >= 60) return 'pass';
          if (isWidow === true && age >= 40 && age <= 79) return 'pass';
          if (isDisabled === true && age >= 18 && age <= 79) return 'pass';
          if (isWidow === undefined && isDisabled === undefined) return 'unknown';
          return 'fail';
        },
        failReason: 'You do not currently fall in the NSAP eligible categories (elderly 60+, widow 40-79, or person with disability 18-79).',
        unknownReason: 'Insufficient information to check age/widow/disability criteria.',
        passReason: 'You meet the age or disability/widow criterion for NSAP pension.',
      },
    ],
    uncheckedRequirements: [
      'Must be listed in SECC 2011 / BPL list of the state',
      'Cannot receive another central pension simultaneously',
      'State-level implementation varies; check your state\'s Social Welfare department',
    ],
    officialUrl: 'https://nsap.nic.in/',
    sourceCheckDate: '2024-11-21',
    documentsRequired: [
      'Aadhaar card',
      'BPL/Antyodaya ration card',
      'Age proof (birth certificate, school leaving certificate)',
      'Bank account passbook',
      'Disability certificate (if applicable, issued by CMO)',
      'Death certificate of husband (for widow pension)',
    ],
    applicationGuidance:
      'Apply through your Gram Panchayat or Urban Local Body. Forms are also available at the District Social Welfare Office.',
    tags: ['pension', 'elderly', 'widow', 'disability', 'bpl', 'central'],
  },

  // 7. PMEGP
  {
    id: 'pmegp',
    name: 'PM Employment Generation Programme (PMEGP)',
    department: 'Ministry of MSME / KVIC',
    scope: 'central',
    benefitSummary:
      'Provides margin money (subsidy) to set up new micro-enterprises in manufacturing or service sectors. Subsidy is 15–35% of the project cost depending on category and location, to promote self-employment.',
    benefitAmount: '15–35% subsidy on project cost (up to ₹50 lakh manufacturing / ₹20 lakh service)',
    eligibilityConditions: [
      {
        id: 'pmegp-age',
        label: 'Must be at least 18 years old',
        checkKey: 'age',
        evaluate: (p) => {
          if (p.age === undefined) return 'unknown';
          return p.age >= 18 ? 'pass' : 'fail';
        },
        failReason: 'You must be at least 18 years old to apply for PMEGP.',
        unknownReason: 'Age not provided.',
        passReason: 'You meet the minimum age requirement of 18 years.',
      },
      {
        id: 'pmegp-occupation',
        label: 'Must be unemployed, self-employed (starting a new venture), or a traditional artisan',
        checkKey: 'occupation',
        evaluate: (p) => {
          if (p.occupation === undefined) return 'unknown';
          if (p.occupation === 'unemployed' || p.occupation === 'self-employed') return 'pass';
          if (p.occupation === 'farmer' || p.occupation === 'agricultural-labourer') return 'pass';
          return 'unknown';
        },
        failReason: 'PMEGP is for those starting a new micro-enterprise, not existing salaried employees.',
        unknownReason: 'Occupation status does not clearly indicate eligibility.',
        passReason: 'Your occupation status is consistent with PMEGP applicants.',
      },
    ],
    uncheckedRequirements: [
      'For projects above ₹10 lakh (manufacturing) or ₹5 lakh (service), must have passed VIII standard',
      'Self-Help Groups (SHGs) also eligible',
      'Existing units or units availing other government subsidies are not eligible',
      'Only new units; second loan not available until first is closed',
      'Higher subsidy (25–35%) for special categories: SC/ST, women, minorities, ex-servicemen, differently abled, NER/hilly areas',
    ],
    officialUrl: 'https://www.kviconline.gov.in/pmegpeportal/',
    sourceCheckDate: '2024-11-21',
    documentsRequired: [
      'Aadhaar card',
      'Educational certificates',
      'Project report / Business plan',
      'Caste certificate (if applicable)',
      'Special category certificate (if applicable)',
    ],
    applicationGuidance:
      'Apply online at the PMEGP e-Portal (kviconline.gov.in). District Industries Centre (DIC), KVIC, or KVIB offices process the applications.',
    tags: ['entrepreneurship', 'self-employment', 'msme', 'subsidy', 'central', 'startup'],
  },

  // 8. PMSS (PM Scholarship Scheme)
  {
    id: 'pmss',
    name: 'Pradhan Mantri Scholarship Scheme (PMSS)',
    department: 'Department of Ex-Servicemen Welfare, Ministry of Defence',
    scope: 'central',
    benefitSummary:
      'Provides scholarships to dependent wards and widows of ex-servicemen/coast guard personnel for professional degree courses. Aimed at encouraging higher technical and professional education.',
    benefitAmount: '₹3,000/month (boys) | ₹3,500/month (girls) for first-degree professional courses',
    eligibilityConditions: [
      {
        id: 'pmss-student',
        label: 'Must be a student pursuing a first professional degree',
        checkKey: 'occupation',
        evaluate: (p) => {
          if (p.occupation === undefined) return 'unknown';
          return p.occupation === 'student' ? 'pass' : 'fail';
        },
        failReason: 'You must be a student to apply for PMSS.',
        unknownReason: 'Occupation not provided.',
        passReason: 'You are a student, meeting the occupation criterion.',
      },
      {
        id: 'pmss-age',
        label: 'Must be between 18 and 25 years of age',
        checkKey: 'age',
        evaluate: (p) => {
          if (p.age === undefined) return 'unknown';
          return p.age >= 18 && p.age <= 25 ? 'pass' : 'fail';
        },
        failReason: 'Your age is outside the 18–25 year eligibility range.',
        unknownReason: 'Age not provided.',
        passReason: 'Your age is within the 18–25 year eligibility range.',
      },
    ],
    uncheckedRequirements: [
      'Must be a dependent ward or widow of an ex-serviceman, ex-coast guard, or state/central police officer killed in action',
      'Must have scored at least 60% in Class 12 (10+2)',
      'Must be enrolled in a first-year professional degree course (Engineering, MBA, MCA, Medicine, Dental, etc.)',
      'Not applicable for distance education courses',
      'Only 55,000 scholarships awarded per year (merit-based)',
    ],
    officialUrl: 'https://ksb.gov.in/prime-ministers-scholarship-scheme.htm',
    sourceCheckDate: '2024-11-21',
    documentsRequired: [
      'Aadhaar card',
      'Ex-serviceman certificate of parent/guardian (PPO, discharge book)',
      'Class 12 mark sheet',
      'College admission letter/enrollment certificate',
      'Bank account details',
    ],
    applicationGuidance:
      'Apply through the National Scholarship Portal (scholarships.gov.in) during the application window (usually August–October each year).',
    tags: ['scholarship', 'education', 'student', 'ex-servicemen', 'central'],
  },

  // 9. NSP Pre-Matric Scholarship
  {
    id: 'nsp-pre-matric',
    name: 'National Scholarship Portal – Pre-Matric Scholarships (SC/ST/OBC/Minorities)',
    department: 'Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs / Ministry of Minority Affairs',
    scope: 'central',
    benefitSummary:
      'Pre-matric scholarships for students from SC, ST, OBC, and minority communities studying in Class 1–10. Covers tuition fees, maintenance allowance, and book grants to prevent school dropout.',
    benefitAmount: '₹1,000–₹3,500/year (varies by class and category)',
    eligibilityConditions: [
      {
        id: 'nsp-pre-matric-category',
        label: 'Must belong to SC, ST, OBC, or minority community',
        checkKey: 'category',
        evaluate: (p) => {
          if (p.category === undefined || p.category === 'prefer-not-to-say') return 'unknown';
          if (p.category === 'sc' || p.category === 'st' || p.category === 'obc') return 'pass';
          return 'fail';
        },
        failReason: 'NSP Pre-Matric scholarships are for SC, ST, OBC, and minority community students.',
        unknownReason: 'Category not provided.',
        passReason: 'Your category (SC/ST/OBC) makes you eligible.',
      },
      {
        id: 'nsp-pre-matric-age',
        label: 'Must be studying in Class 1 to Class 10 (typically age 6–16)',
        checkKey: 'age',
        evaluate: (p) => {
          if (p.age === undefined) return 'unknown';
          return p.age >= 6 && p.age <= 16 ? 'pass' : 'fail';
        },
        failReason: 'Your age suggests you are beyond the pre-matric schooling stage.',
        unknownReason: 'Age not provided.',
        passReason: 'Your age is consistent with pre-matric (Class 1–10) schooling.',
      },
      {
        id: 'nsp-pre-matric-income',
        label: 'Family annual income must be below ₹2.5 lakh (for SC/ST: ₹2.5 lakh; OBC/minorities: ₹1–2.5 lakh depending on scheme)',
        checkKey: 'annualIncomeLakhsRs',
        evaluate: (p) => {
          if (p.annualIncomeLakhsRs === undefined) return 'unknown';
          return p.annualIncomeLakhsRs <= 2.5 ? 'pass' : 'fail';
        },
        failReason: 'Your family income exceeds the ₹2.5 lakh ceiling for most pre-matric scholarships.',
        unknownReason: 'Annual income not provided.',
        passReason: 'Your family income is within the eligibility limit.',
      },
    ],
    uncheckedRequirements: [
      'Must be a regular student (not distance/open school)',
      'Caste/community certificate required',
      'Students should not be receiving any other central scholarship simultaneously',
      'Minority community students require additional community proof',
    ],
    officialUrl: 'https://scholarships.gov.in/',
    sourceCheckDate: '2024-11-21',
    documentsRequired: [
      'Aadhaar card',
      'Caste/community certificate',
      'Income certificate from competent authority',
      'Previous class mark sheet',
      'Bank account details',
      'School enrollment/bonafide certificate',
    ],
    applicationGuidance:
      'Apply online at the National Scholarship Portal (scholarships.gov.in) during the scholarship window, typically September–November each year.',
    tags: ['scholarship', 'education', 'sc', 'st', 'obc', 'minority', 'pre-matric', 'central'],
  },

  // 10. Soil Health Card Scheme
  {
    id: 'soil-health-card',
    name: 'Soil Health Card (SHC) Scheme',
    department: 'Ministry of Agriculture & Farmers Welfare',
    scope: 'central',
    benefitSummary:
      'Provides farmers with a Soil Health Card every two years containing crop-wise nutrient recommendations for their land. Helps optimise fertiliser use, reduce input costs, and improve soil fertility and crop yield.',
    benefitAmount: 'Free soil testing + personalised crop-wise fertiliser recommendations',
    eligibilityConditions: [
      {
        id: 'shc-farmer',
        label: 'Must be a farmer with cultivable land',
        checkKey: 'occupation',
        evaluate: (p) => {
          if (p.occupation === undefined) return 'unknown';
          return p.occupation === 'farmer' ? 'pass' : 'fail';
        },
        failReason: 'You must be a farmer to receive a Soil Health Card.',
        unknownReason: 'Occupation not provided.',
        passReason: 'You are a farmer and eligible for a Soil Health Card.',
      },
      {
        id: 'shc-land',
        label: 'Must own or cultivate land',
        checkKey: 'landHoldingAcres',
        evaluate: (p) => {
          if (p.landHoldingAcres === undefined) return 'unknown';
          return p.landHoldingAcres > 0 ? 'pass' : 'fail';
        },
        failReason: 'No cultivable land holding recorded.',
        unknownReason: 'Land holding not provided.',
        passReason: 'You have land to cultivate, so a soil health card can be issued.',
      },
    ],
    uncheckedRequirements: [
      'Soil samples collected by state agriculture department; farmer must facilitate access',
      'Card valid for 2 years; re-testing required after that',
      'Some states require registration with state agriculture portal',
    ],
    officialUrl: 'https://soilhealth.dac.gov.in/',
    sourceCheckDate: '2024-11-21',
    documentsRequired: [
      'Aadhaar card',
      'Land ownership or tenancy documents',
      'Mobile number for receiving SHC via SMS',
    ],
    applicationGuidance:
      'Contact your nearest Krishi Vigyan Kendra (KVK), block agriculture office, or state soil testing laboratory. Soil samples are collected from your field and tested; the card is issued in 3–4 weeks.',
    tags: ['agriculture', 'farmer', 'soil', 'subsidy', 'central', 'fertiliser'],
  },
];
