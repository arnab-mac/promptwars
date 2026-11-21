# SchemeSaathi (स्कीम साथी) — Citizen Welfare Discovery & Eligibility Engine

> **A Civic Digital Prototype Built for Hackathons & Public Welfare Good**
> **Vertical:** Public Services, Civic Technology & Digital Inclusion
> **Target Audience:** Indian citizens, grassroots Common Service Center (CSC) operators, rural field workers, and low-income families discovering government welfare programs.

---

## 1. Problem Statement

Across central and state governments, India operates hundreds of vital welfare initiatives encompassing direct benefit cash transfers (DBT), healthcare coverage, housing subsidies, scholarship programs, and micro-enterprise loans.

Despite high budgetary allocations, millions of deserving citizens—particularly smallholder farmers, landless agricultural labourers, rural women, senior citizens, and students—remain unaware of the benefits they are entitled to. The existing discovery journey suffers from:
1. **Administrative Jargon:** Schemes are framed in dense bureaucratic terminology.
2. **Fragmented Portals:** Eligibility criteria are dispersed across dozens of departmental silos.
3. **Opaque Eligibility:** Citizens are forced through tedious application processes only to be rejected late in the cycle due to fine-print disqualifications.
4. **Intrusive Data Demands:** Many private platforms demand Aadhaar numbers, OTPs, or phone numbers just to view eligibility.

---

## 2. What SchemeSaathi Does

**SchemeSaathi** bridges the citizen-to-welfare divide through a modern, transparent civic web application:
- **Guided Eligibility Wizard:** Asks simple, non-invasive questions about personal circumstances (occupation, landholding, income bracket, state).
- **Deterministic Tri-State Decision Engine:** Evaluates every scheme criterion as **Pass**, **Fail**, or **Unknown**. We explicitly reject arbitrary percentages or black-box predictions.
- **Transparent Classification:**
  - *Matches the checked criteria* (all evaluated conditions satisfied)
  - *More information needed* (missing details, not assumed false)
  - *Does not match a checked criterion* (at least one explicit exclusion met)
- **Grounded AI Assistant:** Powered by **NVIDIA NIM (`meta/llama-3.3-70b-instruct`)**, answering citizen inquiries strictly within the context of verified scheme catalog rules.
- **Privacy by Design:** Zero Aadhaar, zero bank account data, zero persistent profile storage. Resetting the session immediately purges all answers.

---

## 3. Technology Stack & Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Next.js 16 (App Router)                   │
├──────────────────────────────┬──────────────────────────────┤
│       Frontend (Client)      │       Backend (Server API)   │
│  - React 19 Client Components│  - Next.js Route Handlers    │
│  - Stitch Civic Design System│  - NVIDIA NIM AI Proxy       │
│  - Tailwind CSS 4            │  - Strict Server Env Secrets │
│  - URL-Param State Transfer  │  - Deterministic Context Gen │
└──────────────┬───────────────┴──────────────┬───────────────┘
               │                              │
               ▼                              ▼
  ┌────────────────────────┐      ┌───────────────────────────┐
  │  Eligibility Engine    │      │  NVIDIA NIM API           │
  │  (lib/eligibility-     │      │  (Llama 3.3 70B Instruct) │
  │   engine.ts)           │      │  https://integrate.       │
  │  Deterministic Rules   │      │  api.nvidia.com/v1        │
  └────────────────────────┘      └───────────────────────────┘
```

- **Framework:** Next.js 16.4 (App Router) with React 19 and TypeScript 5
- **Styling:** Tailwind CSS 4 utilizing the Google Stitch *Civic Infrastructure* palette:
  - Deep Sovereign Navy (`#0F2942`)
  - Saffron Amber (`#E65100`)
  - Verified Emerald (`#00897B`)
- **AI Model:** Llama 3.3 70B Instruct hosted via NVIDIA NIM (OpenAI-compatible chat completions)
- **State Management:** URL search parameters (ephemeral, zero server persistence)
- **Testing:** Native Node.js test runner (`node:test`, `node:assert/strict`)

---

## 4. Verified Welfare Schemes in Catalog

All 10 initial welfare programs have been cross-verified against official ministry guidelines as of **November 21, 2024**:

| Scheme Name | Department / Ministry | Scope | Primary Benefit | Official Source |
|---|---|---|---|---|
| **PM-KISAN** | Ministry of Agriculture | Central | ₹6,000/yr in 3 installments | [pmkisan.gov.in](https://pmkisan.gov.in) |
| **Ayushman Bharat PM-JAY** | National Health Authority | Central | ₹5 Lakh/yr secondary/tertiary hospital cover | [pmjay.gov.in](https://pmjay.gov.in) |
| **PMAY-G** | Ministry of Rural Development | Central | ₹1.20L - ₹1.30L pucca house grant | [pmayg.nic.in](https://pmayg.nic.in) |
| **Sukanya Samriddhi Yojana** | National Savings Institute / MoF | Central | High-interest savings for girl child (0-10 yrs) | [nsiindia.gov.in](https://nsiindia.gov.in) |
| **PM Jan Dhan Yojana** | Dept of Financial Services | Central | Zero-balance bank account with ₹10,000 OD | [pmjdy.gov.in](https://pmjdy.gov.in) |
| **NSAP Pension Scheme** | Ministry of Rural Development | Central | Monthly pension for BPL seniors, widows & PwD | [nsap.nic.in](https://nsap.nic.in) |
| **PMEGP Enterprise Subsidy** | Ministry of MSME / KVIC | Central | 15% - 35% capital subsidy for new businesses | [kviconline.gov.in](https://kviconline.gov.in) |
| **PM Scholarship Scheme** | Dept of Ex-Servicemen Welfare | Central | ₹30,000 - ₹36,000/yr for wards of ex-servicemen | [desw.gov.in](https://desw.gov.in) |
| **National Scholarship (Pre-Matric)** | Ministry of Social Justice / MoMA | Central | Tuition and maintenance allowance for SC/ST/OBC | [scholarships.gov.in](https://scholarships.gov.in) |
| **Soil Health Card Scheme** | Ministry of Agriculture | Central | Free periodic soil nutrient testing & advice | [soilhealth.dac.gov.in](https://soilhealth.dac.gov.in) |

---

## 5. Local Setup & Execution

### Prerequisites
- Node.js 20+ (tested on Node.js v26.13.1)
- npm 10+

### Installation & Run
```bash
# 1. Clone repository
git clone https://github.com/<your-username>/SchemeSaathi.git
cd SchemeSaathi

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local and add your NVIDIA NIM API Key

# 4. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view SchemeSaathi.

---

## 6. Environment Variables

Create `.env.local` for local development. Never commit `.env.local` to Git.

```env
# NVIDIA NIM API (OpenAI-compatible endpoint)
NVIDIA_API_KEY=nvapi-YOUR_KEY_HERE
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_MODEL=meta/llama-3.3-70b-instruct
```

---

## 7. Running Automated Tests

Run the full automated test suite verifying deterministic rule evaluations, boundary conditions, and state resets:

```bash
npm test
```

Expected output:
```
✔ SchemeSaathi Decision Engine Tests
  ✔ 1. PM-KISAN: eligible farmer with land holding and low income passes
  ✔ 2. PM-KISAN: high-income person (> ₹10L/year) fails exclusion criterion
  ✔ 3. Missing answers result in "more-info-needed", never assumed false
  ✔ 4. Ayushman Bharat PM-JAY: BPL ration card holder matches checked criteria
  ✔ 5. Sukanya Samriddhi: girl child age boundary (age <= 10 passes, > 10 fails)
  ✔ 6. NSAP Senior Citizen Pension: exact boundary age 60 passes
  ✔ 7. Empty or Reset profile marks all conditional schemes as more-info-needed
  ✔ 8. Sorting: getTopMatches orders matches first, then more-info-needed
ℹ tests 8
ℹ pass 8
```

---

## 8. Assumptions & Limitations

1. **Discovery, Not Approval:** SchemeSaathi is a discovery and matching prototype. Official entitlement requires direct departmental verification, document submission, and biometric authentication.
2. **Quota Dependencies:** Some state-specific schemes operate under finite annual budget caps or district targets that cannot be queried programmatically without government intranet access.
3. **Data Verification Currency:** Scheme parameters are accurate as of November 2024. Budget revisions, income threshold shifts, or procedural changes by ministries must be confirmed on official portals.
4. **AI Availability:** Conversational features require an active NVIDIA NIM key. If the AI service is unreachable, the deterministic rule engine continues to function without interruption.

---

## 9. Security & Civic Privacy Safeguards

- **Zero PII Collection:** No Aadhaar numbers, PAN cards, bank account digits, or telephone numbers are ever requested.
- **No Database Persistence:** User demographics are transferred via ephemeral URL query parameters during the session and are completely purged when the user clicks "Reset".
- **Server-Side Credentials:** All AI API credentials stay strictly server-side in Next.js Route Handlers.
- **Accessible & Transparent:** Meets WCAG standards with text-backed status indicators (never relying on color alone), high-contrast palettes, and full keyboard navigation.
