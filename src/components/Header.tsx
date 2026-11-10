/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserRole, Language } from '../types';
import { translations } from '../i18n';
import {
  Sparkles,
  ShieldCheck,
  Compass,
  MapPin,
  Moon,
  Sun,
  Award,
  Globe,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenSecurity: () => void;
  onOpenRoadmap: () => void;
  onOpenVerifier: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  language,
  onLanguageChange,
  isDark,
  onToggleDark,
  onOpenSecurity,
  onOpenRoadmap,
  onOpenVerifier
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 border-b transition-colors bg-white/95 dark:bg-slate-900/95 backdrop-blur border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-sky-600 dark:bg-sky-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              ZT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                  ZEN TALENT
                </span>
                <span className="hidden md:inline text-xs text-sky-700 dark:text-sky-400 font-medium">
                  {language === 'ta' ? 'தமிழ்நாடு முன்னோடி திட்டம்' : 'Tamil Nadu Pilot'}
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 truncate max-w-sm">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Controls: Role Switcher, Verifier, Security, Lang, Theme */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Actions */}
            <button
              onClick={onOpenVerifier}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={t.nav_verify}
            >
              <Award className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span className="hidden lg:inline">{t.nav_verify}</span>
            </button>

            <button
              onClick={onOpenSecurity}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={t.nav_security}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden lg:inline">{t.nav_security}</span>
            </button>

            <button
              onClick={onOpenRoadmap}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={t.nav_network}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden xl:inline">{t.nav_network}</span>
            </button>

            {/* Language Switcher */}
            <div className="inline-flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ta')}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  language === 'ta'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDark}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Role Switcher Pill Container */}
            <div className="flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-700">
              <div className="relative">
                <select
                  value={currentRole}
                  onChange={(e) => onRoleChange(e.target.value as UserRole)}
                  className="text-xs font-medium bg-sky-50 dark:bg-sky-950 text-sky-800 dark:text-sky-200 border border-sky-200 dark:border-sky-800 rounded-md py-1.5 pl-2.5 pr-7 focus:ring-2 focus:ring-sky-500 focus:outline-hidden cursor-pointer"
                >
                  <option value="student">{t.role_student} (Kavin)</option>
                  <option value="teacher">{t.role_teacher} (Mrs. Sundari)</option>
                  <option value="admin">{t.role_admin} (Principal)</option>
                  <option value="public_verifier">{t.role_verifier}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
