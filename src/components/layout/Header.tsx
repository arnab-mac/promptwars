'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const navItems = [
    { label: 'Find Schemes', href: '/' },
    { label: 'Check Eligibility Quiz', href: '/wizard' },
    { label: 'Track Application', href: '/tracker' },
    { label: 'Security & Shield', href: '/security' },
    { label: 'About & Verification', href: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest shadow-ambient border-b border-surface-container">
      {/* Top Tier: Civic Authority Strip */}
      <div className="bg-primary text-on-primary">
        <div className="max-w-7xl mx-auto px-margin lg:px-gutter-desktop h-10 flex items-center justify-between font-label-md text-xs">
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
              <span className="text-xs text-on-primary-container">Text:</span>
              <button className="px-1 text-xs hover:text-surface-variant font-bold" type="button">A-</button>
              <button className="px-1 text-xs hover:text-surface-variant font-bold" type="button">A</button>
              <button className="px-1 text-xs hover:text-surface-variant font-extrabold" type="button">A+</button>
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
            <span className="font-label-md text-xs text-on-surface-variant tracking-normal">Empowering Every Citizen</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-space-sm font-label-lg text-sm" aria-label="Primary Navigation">
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
              className="w-full bg-surface-container-low text-xs text-on-surface rounded-lg pl-8 pr-10 py-1.5 outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
              placeholder="Search schemes..."
              type="text"
            />
            <span className="absolute right-space-xs top-2 text-[10px] bg-surface-container-high text-on-surface-variant px-1 rounded font-mono font-bold">⌘K</span>
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
              <span className="text-xs font-bold text-on-surface leading-tight">Sunita Sharma</span>
              <span className="text-[11px] text-on-tertiary-container font-semibold leading-tight">Verified Citizen</span>
            </div>
            <span className="material-symbols-outlined text-outline text-base">expand_more</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
