# SchemeSaathi Design System & Token Mapping

*Authoritative Source: Google Stitch Project `5931807678822391870` ("SchemeSaathi Civic Infrastructure")*

## 1. Color Tokens (`src/styles/design-tokens.css`)

All colors reference CSS custom properties mapped through Tailwind CSS v4 `@theme`:

| Token Name | Hex Value | Semantic Civic Role |
|---|---|---|
| `var(--color-primary)` | `#001428` | Sovereign Deep Navy — Base headers, brand text, primary action buttons |
| `var(--color-primary-container)` | `#0f2942` | Institutional Container — Header sub-bars, selected states |
| `var(--color-on-primary)` | `#ffffff` | Contrast text on primary elements |
| `var(--color-secondary)` | `#a83900` | Saffron Amber — Attention milestones, vernacular tags, urgent prompts |
| `var(--color-secondary-container)`| `#fc6018` | Alert Badges — High-priority notification bars |
| `var(--color-on-secondary)` | `#ffffff` | Contrast text on secondary buttons |
| `var(--color-secondary-fixed)` | `#ffdbcf` | Soft saffron tint for badge backgrounds |
| `var(--color-tertiary)` | `#001714` | Dark emerald — Deep verification indicators |
| `var(--color-tertiary-container)` | `#002e28` | Verified Emerald — Direct Benefit Transfer (DBT) confirmed |
| `var(--color-on-tertiary-container)`| `#2f9f90` | High-visibility status label on dark containers |
| `var(--color-surface)` | `#f8f9ff` | Crisp base surface background |
| `var(--color-surface-container-lowest)`| `#ffffff` | Elevated scheme card, bento tile, and form container surface |
| `var(--color-surface-container-low)` | `#eff4ff` | Subtle grouping background, search input track |
| `var(--color-surface-container)` | `#e6eeff` | Divider lines, chip backgrounds, soft outlines |
| `var(--color-on-surface)` | `#0d1c2f` | Primary body typography (high WCAG AAA contrast) |
| `var(--color-on-surface-variant)` | `#43474d` | Secondary descriptive text, captions, subtitles |
| `var(--color-outline)` | `#74777e` | Form input borders and idle icon colors |
| `var(--color-error)` | `#ba1a1a` | Critical disqualifications and validation errors |

---

## 2. Typography Tokens

Configured via `next/font/google` in `src/app/layout.tsx`:

* **Display & Headlines (`var(--font-display)`):** `Plus Jakarta Sans`, weights 600, 700, 800.
* **Body & Labels (`var(--font-body)`):** `Inter`, weights 400, 500, 600, 700.
* **Tabular Figures (`.font-tabular-amount`):** `Inter` with `font-variant-numeric: tabular-nums` for non-shifting currency alignment (e.g., `₹6,000 / year`).

---

## 3. Radii & Shape Rules

* **Default (`--radius-default` / `rounded`):** `0.25rem` (4px) for formal civic competence.
* **Large (`--radius-lg` / `rounded-lg`):** `0.5rem` (8px) for buttons and inputs.
* **Extra Large (`--radius-xl` / `rounded-xl`):** `0.75rem` (12px) for metric bento cards.
* **Full (`--radius-full` / `rounded-full`):** `9999px` for status badges and chips.

---

## 4. Elevation & Shadows

* **Card Elevation (`--shadow-sm`):** `0 1px 3px rgba(15, 41, 66, 0.05)`
* **Hover State (`--shadow-md`):** `0 4px 6px -1px rgba(15, 41, 66, 0.07)`
* **Modal & Drawer (`--shadow-lg`):** `0 8px 24px -4px rgba(15, 41, 66, 0.10)`
* **Ambient Header (`--shadow-ambient`):** `0 1px 8px rgba(15, 41, 66, 0.06)`

---

## 5. Architectural Server/Client Split

* **Server Components (`page.tsx`):** Render static layouts, fetch scheme definitions from `src/services/` and `src/lib/`, ensuring high performance, zero hydration overhead, and SEO accessibility.
* **Client Components (`"use client"`):** Isolate interactive controls (search filters, questionnaire sliders, drawer state, bookmark toggles) into modular leaf components in `src/components/`.
* **Zero Hardcoded Values:** Every CSS class uses mapped Tailwind semantic utilities (`bg-primary`, `text-on-surface`, `rounded-xl`, etc.) or `var(--color-*)` properties.
