import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SchemeSaathi — Citizen Welfare & Scheme Discovery Portal",
  description: "Official Digital Public Good for discovering 2,800+ Central and State welfare programs, subsidies, and Direct Benefit Transfer (DBT) grants.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
        {/* EXACT STITCH HEADER: Tier 1 & Tier 2 */}
        <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(15,41,66,0.06)]">
          {/* Tier 1: Top Civic Authority Strip */}
          <div className="bg-primary text-on-primary">
            <div className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop h-10 flex items-center justify-between font-label-md text-label-md">
              <div className="flex items-center gap-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary-fixed text-base">verified</span>
                  <span className="font-medium text-surface-variant">
                    Government of India • Citizen Welfare Portal Initiative
                  </span>
                </div>
                <span className="hidden md:inline-block w-px h-3 bg-outline" />
                <span className="hidden md:inline-block text-surface-container-high">
                  Official Digital Public Good
                </span>
              </div>

              <div className="flex items-center gap-space-md">
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">translate</span>
                  <span>English / हिंदी</span>
                </button>
                <div className="hidden sm:flex items-center gap-1">
                  <button type="button" className="px-1.5 py-0.5 rounded hover:bg-primary-container text-xs">
                    A-
                  </button>
                  <button type="button" className="px-1.5 py-0.5 rounded hover:bg-primary-container text-xs font-bold">
                    A
                  </button>
                  <button type="button" className="px-1.5 py-0.5 rounded hover:bg-primary-container text-xs">
                    A+
                  </button>
                </div>
                <div className="hidden md:flex items-center gap-1 text-surface-variant font-medium">
                  <span className="material-symbols-outlined text-sm">support_agent</span>
                  <span>Helpline: 1800-115-555</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 2: Main Navigation Header */}
          <div className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop h-20 flex items-center justify-between gap-space-md">
            {/* Logo & Emblems */}
            <div className="flex items-center gap-space-md">
              <Link href="/" className="flex items-center gap-space-xs">
                {/* Hotlinked GoI National Emblem from Stitch */}
                <img
                  alt="Government Emblem"
                  className="h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida/ALJJyrCRux_ZDiL-x_rNUOumc0PjQ_U9TBalugi6WDHkbiv2_KxJzCQZ2yiho-rcwUvefGRXUmyoaeutsiJTxei61wIWAzBEDKYRmJkpLOZaGvwfz1unscRSNR237GCGxlRz-bVKj2vAgoVT8C2auLHvd2n7_atyDSh9ws-Xf8F_H8A2kg9QFvmhKXhMVVnFkd5Er0f1-C1s7aopQ6lYLG7B1smTlCusmiaeLiOb55jsebb6"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline-sm text-headline-sm font-extrabold text-primary tracking-tight">
                      Scheme<span className="text-secondary">Saathi</span>
                    </span>
                    <span className="bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                      DBT
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant leading-none">
                    National Welfare &amp; Direct Benefit Finder
                  </span>
                </div>
              </Link>

              {/* Main Nav Items */}
              <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-space-xs pl-space-md border-l border-surface-container">
                <Link
                  href="/"
                  className="px-3 py-2 rounded-lg font-label-lg text-label-lg text-primary hover:bg-surface-container-low transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/results"
                  className="px-3 py-2 rounded-lg font-label-lg text-label-lg text-primary hover:bg-surface-container-low transition-colors"
                >
                  Find Schemes
                </Link>
                <Link
                  href="/wizard"
                  className="px-3 py-2 rounded-lg font-label-lg text-label-lg text-secondary bg-secondary-fixed/50 hover:bg-secondary-fixed transition-colors font-bold"
                >
                  Check Eligibility
                </Link>
                <Link
                  href="/tracker"
                  className="px-3 py-2 rounded-lg font-label-lg text-label-lg text-primary hover:bg-surface-container-low transition-colors flex items-center gap-1"
                >
                  <span>Application Tracker</span>
                  <span className="w-2 h-2 rounded-full bg-secondary-container" />
                </Link>
                <Link
                  href="/about"
                  className="px-3 py-2 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
                >
                  About &amp; Verification
                </Link>
                <Link
                  href="/security"
                  className="px-3 py-2 rounded-lg font-label-lg text-label-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1 font-semibold"
                >
                  <span className="material-symbols-outlined text-sm text-emerald-600">verified_user</span>
                  <span>Security</span>
                </Link>
              </nav>
            </div>

            {/* Right Action Icons & Citizen Avatar */}
            <div className="flex items-center gap-space-xs sm:gap-space-sm">
              <Link
                href="/results"
                className="hidden md:flex relative items-center text-on-surface-variant hover:text-on-surface bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-1.5"
              >
                <span className="material-symbols-outlined text-lg mr-2 text-outline">search</span>
                <span className="text-xs text-outline pr-8">Search schemes...</span>
                <span className="absolute right-space-xs top-2 font-label-md text-label-md bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded font-mono font-bold text-[10px]">
                  ⌘K
                </span>
              </Link>

              <Link
                href="/tracker"
                aria-label="Notifications"
                className="relative p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary-container rounded-full" />
              </Link>

              {/* Hotlinked Sunita Sharma Avatar from Stitch */}
              <Link
                href="/tracker"
                className="flex items-center gap-space-xs pl-space-xs border-l border-surface-container hover:opacity-90 transition-opacity"
              >
                <img
                  alt="Profile Sunita Sharma"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-surface-variant"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdLmklXprchi_T9J6oAYLoTwIStBuFCI78UnfROC64oYWGC3CrTwVYgRZU081ZOMAhzrw1g_WUooFr9JoqT_045hZJImGs-hLOZ6evEGiqYBmRXw7wh99sC1QNhwi5qkpO3XxjNLMm6kjYS7aNumVm9nIEdMwfNgXvMIrmTtRBRYu9X2qyEiOMMRGgyFyVavI0sZK8UkrqlVL6tG-RwbN6qKKvgDOjRVINPlevMUY"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-label-md text-label-md font-bold text-on-surface leading-tight">
                    Sunita Sharma
                  </span>
                  <span className="font-label-md text-label-md text-on-tertiary-container font-semibold leading-tight flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    <span>Verified Citizen</span>
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline text-base">expand_more</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Body offset by header height */}
        <main id="main-content" className="w-full pt-[7.5rem] bg-surface min-h-[calc(100vh-16rem)] flex-1">
          {children}
        </main>

        {/* Civic Footer from Stitch */}
        <footer className="bg-primary text-on-primary border-t border-outline/20 mt-auto">
          <div className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop py-space-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg mb-space-lg">
              <div className="md:col-span-2 flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <img
                    alt="Government Emblem"
                    className="h-10 w-auto object-contain brightness-0 invert"
                    src="https://lh3.googleusercontent.com/aida/ALJJyrCRux_ZDiL-x_rNUOumc0PjQ_U9TBalugi6WDHkbiv2_KxJzCQZ2yiho-rcwUvefGRXUmyoaeutsiJTxei61wIWAzBEDKYRmJkpLOZaGvwfz1unscRSNR237GCGxlRz-bVKj2vAgoVT8C2auLHvd2n7_atyDSh9ws-Xf8F_H8A2kg9QFvmhKXhMVVnFkd5Er0f1-C1s7aopQ6lYLG7B1smTlCusmiaeLiOb55jsebb6"
                  />
                  <div>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-primary">
                      SchemeSaathi
                    </span>
                    <span className="font-label-md text-label-md text-surface-variant block">
                      Universal Citizen Benefit Registry &amp; Discovery
                    </span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-surface-variant max-w-md mt-2 leading-relaxed">
                  SchemeSaathi is an open civic digital public good created to eliminate bureaucratic friction and assist 1.4 billion citizens in discovering and claiming welfare schemes they are legally entitled to.
                </p>
                <div className="mt-3 p-3 bg-surface-container-lowest/10 border border-surface-container/20 rounded-xl font-body-sm text-body-sm text-surface-variant max-w-md">
                  <strong>Notice:</strong> Independent prototype for national hackathons. Direct welfare benefits and direct DBT transfers are disbursed exclusively via official State &amp; Union Ministry portals.
                </div>
              </div>

              <div className="flex flex-col gap-space-xs">
                <h2 className="font-label-lg text-label-lg font-bold uppercase tracking-wider text-surface-variant mb-2">
                  Portal Navigation
                </h2>
                <ul className="space-y-2 font-body-sm text-body-sm text-surface-variant">
                  <li>
                    <Link href="/results" className="hover:text-on-primary transition-colors flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">chevron_right</span>
                      All Central &amp; State Schemes
                    </Link>
                  </li>
                  <li>
                    <Link href="/wizard" className="hover:text-on-primary transition-colors flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">chevron_right</span>
                      Eligibility Assessment Wizard
                    </Link>
                  </li>
                  <li>
                    <Link href="/tracker" className="hover:text-on-primary transition-colors flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">chevron_right</span>
                      Citizen Application Tracker
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-on-primary transition-colors flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">chevron_right</span>
                      Rule Verification &amp; Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/security" className="hover:text-on-primary transition-colors flex items-center gap-1 text-emerald-300">
                      <span className="material-symbols-outlined text-xs">verified_user</span>
                      Security &amp; Zero-Knowledge Shield
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-space-xs">
                <h2 className="font-label-lg text-label-lg font-bold uppercase tracking-wider text-surface-variant mb-2">
                  Integrated Portals
                </h2>
                <ul className="space-y-2 font-body-sm text-body-sm text-surface-variant">
                  <li>
                    <a
                      href="https://pmkisan.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-on-primary transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                      PM-KISAN Samman Nidhi
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pmjay.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-on-primary transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                      Ayushman Bharat PM-JAY
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dbtbharat.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-on-primary transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                      DBT Bharat National Portal
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://myscheme.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-on-primary transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                      myScheme Government Platform
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-space-md border-t border-outline/20 flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-md text-label-md text-surface-variant">
              <span>© 2024 SchemeSaathi. Open Civic Good. Built for citizen empowerment.</span>
              <div className="flex items-center gap-space-md">
                <span>WCAG 2.1 AAA Compliant</span>
                <span>•</span>
                <span>Zero-Knowledge Privacy</span>
                <span>•</span>
                <span>Verified: Nov 2024</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
