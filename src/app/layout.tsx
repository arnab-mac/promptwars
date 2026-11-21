'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const navItems = [
    { label: 'Find Schemes', href: '/' },
    { label: 'Check Eligibility Quiz', href: '/wizard' },
    { label: 'Track Application', href: '/tracker' },
    { label: 'Security & Shield', href: '/security' },
    { label: 'About & Verification', href: '/about' },
  ];

  return (
    <html lang="en" className={fontSizeLevel === 'large' ? 'text-[17px]' : fontSizeLevel === 'xlarge' ? 'text-[18px]' : ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SchemeSaathi (योजना साथी) — National Welfare &amp; Direct Benefit Finder</title>
        <meta name="description" content="Discover 2,800+ Central and State Government welfare schemes with verified deterministic eligibility, direct cash benefits (DBT), and zero-knowledge privacy." />
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
      <body className="bg-surface font-body-md text-on-surface antialiased">
        {/* FIXED HEADER */}
        <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(15,41,66,0.06)]">
          {/* Top Tier: Civic Authority Strip */}
          <div className="bg-primary text-on-primary">
            <div className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop h-10 flex items-center justify-between font-label-md text-label-md">
              <div className="flex items-center gap-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary-fixed text-base">verified</span>
                  <span className="font-medium text-surface-variant">Government of India • Citizen Welfare Portal Initiative</span>
                </div>
                <span className="hidden md:inline-block w-px h-3 bg-outline" />
                <span className="hidden md:inline-block text-surface-container-high">Official Digital Public Good</span>
              </div>
              <div className="flex items-center gap-space-md">
                <button
                  className="hover:text-surface-container transition-colors flex items-center gap-space-xs"
                  title="Screen Reader Access"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">record_voice_over</span>
                  <span className="hidden sm:inline">Screen Reader</span>
                </button>
                <div className="flex items-center gap-space-xs bg-primary-container px-space-xs py-0.5 rounded">
                  <span className="text-xs text-on-primary-container">Text Size:</span>
                  <button
                    onClick={() => setFontSizeLevel('normal')}
                    className={`px-1 text-xs hover:text-surface-variant ${fontSizeLevel === 'normal' ? 'font-bold underline' : ''}`}
                    type="button"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSizeLevel('large')}
                    className={`px-1 text-xs hover:text-surface-variant ${fontSizeLevel === 'large' ? 'font-bold underline' : ''}`}
                    type="button"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSizeLevel('xlarge')}
                    className={`px-1 text-xs hover:text-surface-variant ${fontSizeLevel === 'xlarge' ? 'font-extrabold underline' : ''}`}
                    type="button"
                  >
                    A+
                  </button>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-sm text-surface-container-high">translate</span>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-primary-container text-on-primary text-xs py-1 px-space-xs rounded outline-none cursor-pointer"
                  >
                    <option value="English">English</option>
                    <option value="हिन्दी">हिन्दी (Hindi)</option>
                    <option value="தமிழ்">தமிழ் (Tamil)</option>
                    <option value="বাংলা">বাংলা (Bengali)</option>
                    <option value="తెలుగు">తెలుగు (Telugu)</option>
                    <option value="मराठी">मराठी (Marathi)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Tier: Logo, Navigation, Search, Profile */}
          <div className="h-20 max-w-7xl mx-auto px-margin lg:px-gutter-desktop flex items-center justify-between gap-space-md">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-space-md shrink-0">
              <img
                alt="National Emblem of India"
                className="h-9 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/ALJJyrCRux_ZDiL-x_rNUOumc0PjQ_U9TBalugi6WDHkbiv2_KxJzCQZ2yiho-rcwUvefGRXUmyoaeutsiJTxei61wIWAzBEDKYRmJkpLOZaGvwfz1unscRSNR237GCGxlRz-bVKj2vAgoVT8C2auLHvd2n7_atyDSh9ws-Xf8F_H8A2kg9QFvmhKXhMVVnFkd5Er0f1-C1s7aopQ6lYLG7B1smTlCusmiaeLiOb55jsebb6"
              />
              <div className="flex flex-col">
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">SchemeSaathi</span>
                  <span className="font-label-md text-label-md text-secondary font-semibold">(योजना साथी)</span>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant tracking-normal">Empowering Every Citizen</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-space-sm font-label-lg text-label-lg" aria-label="Primary Navigation">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors px-space-sm py-1.5 rounded-lg ${
                      isActive
                        ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Search, Notifications & Citizen Avatar */}
            <div className="flex items-center gap-space-sm shrink-0">
              <div className="relative hidden xl:block w-48">
                <span className="material-symbols-outlined absolute left-space-xs top-2.5 text-outline text-lg">search</span>
                <input
                  className="w-full bg-surface-container-low font-body-sm text-body-sm text-on-surface rounded-lg pl-8 pr-10 py-1.5 outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Search schemes..."
                  type="text"
                />
                <span className="absolute right-space-xs top-2 font-label-md text-label-md bg-surface-container-high text-on-surface-variant px-1 rounded">⌘K</span>
              </div>
              <button
                aria-label="Notifications"
                className="relative p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary-container rounded-full" />
              </button>
              <Link href="/tracker" className="flex items-center gap-space-xs pl-space-xs group">
                <img
                  alt="Verified Citizen Sunita Sharma"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary transition-all"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdLmklXprchi_T9J6oAYLoTwIStBuFCI78UnfROC64oYWGC3CrTwVYgRZU081ZOMAhzrw1g_WUooFr9JoqT_045hZJImGs-hLOZ6evEGiqYBmRXw7wh99sC1QNhwi5qkpO3XxjNLMm6kjYS7aNumVm9nIEdMwfNgXvMIrmTtRBRYu9X2qyEiOMMRGgyFyVavI0sZK8UkrqlVL6tG-RwbN6qKKvgDOjRVINPlevMUY"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-label-md text-label-md font-bold text-on-surface leading-tight">Sunita Sharma</span>
                  <span className="font-label-md text-label-md text-on-tertiary-container font-semibold leading-tight">Verified Citizen</span>
                </div>
                <span className="material-symbols-outlined text-outline text-base">expand_more</span>
              </Link>
            </div>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <main className="w-full pt-[7.5rem] bg-surface min-h-[calc(100vh-16rem)]">
          {children}
        </main>

        {/* STITCH CIVIC FOOTER */}
        <footer className="w-full bg-primary text-on-primary mt-space-xl shadow-[0_-1px_12px_rgba(0,20,40,0.08)]">
          <div className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop py-space-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter">
              {/* Col 1 & 2: Brand & Helpline */}
              <div className="lg:col-span-2 flex flex-col gap-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm font-bold text-surface-container-lowest tracking-tight">SchemeSaathi</span>
                  <span className="font-label-md text-label-md text-secondary-fixed">(योजना साथी)</span>
                </div>
                <p className="font-body-sm text-body-sm text-surface-variant max-w-sm">
                  Unified Civic Welfare &amp; Direct Benefit Transfer discovery platform connecting rural and urban citizens with 2,400+ Central and State welfare initiatives.
                </p>
                <div className="flex items-center gap-space-md pt-space-xs">
                  <div className="flex items-center gap-space-xs bg-primary-container px-space-sm py-1 rounded">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg">support_agent</span>
                    <div>
                      <span className="block font-label-md text-label-md text-on-primary-container">Citizen Helpline (Toll-Free)</span>
                      <span className="font-tabular-amount text-sm text-on-primary font-bold">1800-11-7788</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 3: Quick Access */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-lg text-label-lg font-bold text-surface-container-high tracking-wider uppercase mb-space-xs">Quick Access</span>
                <a className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="https://india.gov.in" target="_blank" rel="noopener noreferrer">National Portal of India</a>
                <a className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer">Digital India Initiatives</a>
                <a className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="https://dbtbharat.gov.in" target="_blank" rel="noopener noreferrer">DBT Bharat Mission</a>
                <a className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="https://mygov.in" target="_blank" rel="noopener noreferrer">MyGov Citizen Engagement</a>
                <Link className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="/tracker">Application Status Tracker</Link>
              </div>

              {/* Col 4: Legal & Redressal */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-lg text-label-lg font-bold text-surface-container-high tracking-wider uppercase mb-space-xs">Legal &amp; Redressal</span>
                <a className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer">Public Grievance Portal (CPGRAMS)</a>
                <Link className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="/security">Security &amp; Zero-Knowledge Shield</Link>
                <Link className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="/about">Citizen Charter &amp; FAQ</Link>
                <Link className="font-body-sm text-body-sm text-surface-variant hover:text-surface-container-lowest transition-colors" href="/about">Data Protection &amp; DPDP Policy</Link>
              </div>

              {/* Col 5: Civic Verification */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-lg text-label-lg font-bold text-surface-container-high tracking-wider uppercase mb-space-xs">Civic Verification</span>
                <div className="bg-primary-container p-space-sm rounded flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-tertiary-fixed text-base">verified_user</span>
                    <span className="font-label-md text-label-md font-bold text-on-primary">STQC Certified Web Portal</span>
                  </div>
                  <p className="font-label-md text-label-md text-on-primary-container">
                    Compliant with GIGW (Guidelines for Indian Government Websites) 3.0 &amp; WCAG 2.1 AA.
                  </p>
                </div>
              </div>
            </div>

            {/* Copyright & Maintenance Strip */}
            <div className="mt-space-xl pt-space-md bg-primary-container/40 rounded flex flex-col sm:flex-row items-center justify-between gap-space-sm px-space-md py-space-sm text-surface-variant font-label-md text-label-md">
              <div>© 2025 SchemeSaathi • Ministry of Electronics &amp; IT (MeitY), Government of India. All rights reserved.</div>
              <div>Designed &amp; Maintained by National Informatics Centre (NIC)</div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
