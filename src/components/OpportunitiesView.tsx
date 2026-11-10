/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Opportunity, Language } from '../types';
import { translations } from '../i18n';
import { TALENT_CATEGORIES } from '../db/store';
import {
  ExternalLink,
  Search,
  Calendar,
  ShieldCheck,
  Award,
  BookOpen,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Landmark
} from 'lucide-react';

interface OpportunitiesViewProps {
  opportunities: Opportunity[];
  language: Language;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  opportunities,
  language
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedScope, setSelectedScope] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');

  const filtered = opportunities.filter(opp => {
    if (selectedType !== 'all' && opp.type !== selectedType) return false;
    if (selectedScope !== 'all' && opp.location_scope !== selectedScope) return false;
    if (selectedGrade !== 'all' && !opp.eligible_grades.includes(selectedGrade)) return false;

    if (searchQuery) {
      const matchTitle = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (opp.title_ta && opp.title_ta.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchOrganiser = opp.organiser.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTitle || matchOrganiser;
    }

    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட வாய்ப்புகள்' : 'Genuine Opportunities Directory'}
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Direct Official Portals Only
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {language === 'ta' ? 'மாணவர் வாய்ப்புகள் & கல்வி உதவித்தொகைகள்' : 'State & National Student Opportunities'}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {language === 'ta'
              ? 'ஒவ்வொரு வாய்ப்பும் அதிகாரப்பூர்வ அரசாங்க தளம், கடைசி சரிபார்ப்பு தேதி மற்றும் தகுதி விதிகளுடன் நேரடியாக இணைக்கப்பட்டுள்ளது. போலியான அல்லது காலாவதியான விளம்பரங்கள் எதுவும் இங்கு இல்லை.'
              : 'Every opportunity is curated with its authentic official source portal, exact eligibility criteria, deadlines, and verified audit date. No advertisements, intermediaries, or speculative claims.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search schemes, olympiads, hackathons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            />
          </div>

          {/* Scope Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Scope:</span>
            <select
              value={selectedScope}
              onChange={(e) => setSelectedScope(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Scopes</option>
              <option value="Tamil Nadu">Tamil Nadu Only</option>
              <option value="National (India)">National (India)</option>
            </select>
          </div>

          {/* Grade Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Class:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="px-2.5 py-1.5 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="all">Classes 6 to 12</option>
              <option value={6}>Class 6</option>
              <option value={7}>Class 7</option>
              <option value={8}>Class 8</option>
              <option value={9}>Class 9</option>
              <option value={10}>Class 10</option>
              <option value={11}>Class 11</option>
              <option value={12}>Class 12</option>
            </select>
          </div>
        </div>

        {/* Opportunity Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            All Opportunities ({opportunities.length})
          </button>
          <button
            onClick={() => setSelectedType('scholarship')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'scholarship'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Scholarships & Grants
          </button>
          <button
            onClick={() => setSelectedType('olympiad')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'olympiad'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Olympiads & Science Fairs
          </button>
          <button
            onClick={() => setSelectedType('innovation_programme')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'innovation_programme'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Innovation & Incubation
          </button>
          <button
            onClick={() => setSelectedType('competition')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'competition'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Competitions & Sports
          </button>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(opp => (
          <div
            key={opp.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3">
              {/* Scope & Government Scheme Badge */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  {opp.is_government_scheme && (
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
                      <Landmark className="w-3.5 h-3.5" />
                      Government Scheme
                    </span>
                  )}
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {opp.location_scope}
                  </span>
                </div>

                <span className="text-slate-400 text-[11px]">
                  Verified {opp.last_verified_date}
                </span>
              </div>

              {/* Title & Organiser */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {language === 'ta' && opp.title_ta ? opp.title_ta : opp.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Organised by: {opp.organiser}
                </p>
              </div>

              {/* Award Details Box */}
              <div className="p-3 bg-sky-50 dark:bg-sky-950/30 rounded-lg border border-sky-100 dark:border-sky-900/40 text-xs">
                <span className="font-semibold text-sky-900 dark:text-sky-300 block mb-0.5">
                  Award & Benefits:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  {language === 'ta' && opp.award_details_ta ? opp.award_details_ta : opp.award_details}
                </p>
              </div>

              {/* Eligibility & Grade Requirement */}
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Eligibility:
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {language === 'ta' && opp.eligibility_criteria_ta ? opp.eligibility_criteria_ta : opp.eligibility_criteria}
                </p>
                <div className="text-slate-500 pt-1">
                  Eligible Standards: Classes {opp.eligible_grades.join(', ')}
                </div>
              </div>
            </div>

            {/* Bottom: Deadline & Official Link */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>
              </div>

              <a
                href={opp.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
              >
                <span>{t.opp_official_portal}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
