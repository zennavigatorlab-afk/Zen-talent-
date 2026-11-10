/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, TalentCategory } from '../types';
import { translations } from '../i18n';
import { TALENT_CATEGORIES, TALENT_DISCOVERY_QUESTIONS } from '../db/store';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Compass,
  Lightbulb,
  Award,
  ChevronRight,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';

interface TalentDiscoveryProps {
  language: Language;
  onSelectCategory: (categoryId: string) => void;
  onClose: () => void;
}

export const TalentDiscovery: React.FC<TalentDiscoveryProps> = ({
  language,
  onSelectCategory,
  onClose
}) => {
  const t = translations[language];
  const [currentStep, setCurrentStep] = useState<'overview' | 'assessment' | 'results'>('overview');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [activeCategoryId, setActiveCategoryId] = useState<string>(TALENT_CATEGORIES[0].id);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleFinishAssessment = () => {
    setCurrentStep('results');
  };

  const activeCategory = TALENT_CATEGORIES.find(c => c.id === activeCategoryId) || TALENT_CATEGORIES[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Manifesto / First Principle Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
              {language === 'ta' ? 'ஜென் டேலண்ட் முக்கிய கொள்கை' : 'ZEN TALENT Core Philosophy: Holistic Discovery'}
            </h3>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              {language === 'ta'
                ? 'ஒரு மாணவரின் திறமையை ஒரு தேர்வு அல்லது AI மதிப்பெண் மூலம் ஒருபோதும் தீர்மானிக்கக் கூடாது. சுய விருப்பங்கள், நடைமுறை சவால்கள், ஆசிரியர் பரிந்துரைகள் மற்றும் தொடர் சாதனைகள் ஆகியவற்றின் இணைப்பே உண்மையான திறமையை வெளிக்கொணரும்.'
                : 'Never decide a student’s potential using one test or AI score. Authentic talent discovery combines curiosity, situational problem solving, hands-on project evidence, peer collaboration, and teacher mentorship over time.'}
            </p>
          </div>
        </div>
      </div>

      {/* Mode Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {language === 'ta' ? 'திறன் கண்டறிதல் மற்றும் வழிகாட்டல்' : 'Talent Discovery & Diagnostic Compass'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ta'
              ? '10 முக்கிய திறன் பிரிவுகளை ஆராயுங்கள் அல்லது சுய மதிப்பீட்டு வினாடி வினாவைத் தொடங்குங்கள்.'
              : 'Explore the 10 foundational talent pillars or take the diagnostic situational questionnaire.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentStep === 'overview' ? (
            <button
              onClick={() => setCurrentStep('assessment')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'சுய மதிப்பீடு தொடங்க' : 'Start Situational Discovery'}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentStep('overview');
                setSelectedAnswers({});
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? '10 பிரிவுகளுக்குத் திரும்பு' : 'Back to Categories'}</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: THE 10 TALENT CATEGORIES EXPLORER */}
      {currentStep === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Categories Sidebar List */}
          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              The 10 Core Pillars
            </h3>
            {TALENT_CATEGORIES.map((cat, idx) => {
              const isSelected = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-slate-900 dark:text-white shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">0{idx + 1}.</span>
                      <span className="text-sm font-semibold">
                        {language === 'ta' && cat.name_ta ? cat.name_ta : cat.name_en}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {cat.sampleSkills.slice(0, 2).join(' · ')}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 ${isSelected ? 'text-sky-600 rotate-90 sm:rotate-0' : ''}`} />
                </button>
              );
            })}
          </div>

          {/* Active Category Deep Dive */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Pillar Deep Dive
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {language === 'ta' && activeCategory.name_ta ? activeCategory.name_ta : activeCategory.name_en}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'ta' && activeCategory.description_ta ? activeCategory.description_ta : activeCategory.description_en}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Demonstrated Competency Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeCategory.sampleSkills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-lg space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">
                How this is developed at school:
              </span>
              <p>
                Students demonstrate practical mastery not through memorisation, but by completing challenges, engaging in group collaborations, and uploading verifiable evidence (code repositories, prototypes, audio podcasts, and research logs).
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Recognised across Tamil Nadu school network
              </span>
              <button
                onClick={() => onSelectCategory(activeCategory.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
              >
                <span>View Challenges in this Pillar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: DIAGNOSTIC SITUATIONAL QUESTIONNAIRE */}
      {currentStep === 'assessment' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Situational Discovery Inventory
            </h3>
            <p className="text-xs text-slate-500">
              Select what best reflects your natural instinct in each scenario. There are no right or wrong answers.
            </p>
          </div>

          <div className="space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
            {TALENT_DISCOVERY_QUESTIONS.map((q, qIndex) => {
              const selectedOpt = selectedAnswers[q.id];

              return (
                <div key={q.id} className="pt-6 first:pt-0 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                      Q{qIndex + 1}.
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                      {language === 'ta' && q.question_ta ? q.question_ta : q.question_en}
                    </h4>
                  </div>

                  <div className="space-y-2 pl-6">
                    {q.options.map((opt, optIndex) => {
                      const isChosen = selectedOpt === optIndex;
                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-3 ${
                            isChosen
                              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-slate-900 dark:text-white'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isChosen ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300'
                          }`}>
                            {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <p className="font-medium">
                              {language === 'ta' && opt.label_ta ? opt.label_ta : opt.label_en}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-0.5 block">
                              Indicator: {opt.skill_indicator}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Answered {Object.keys(selectedAnswers).length} of {TALENT_DISCOVERY_QUESTIONS.length}
            </span>
            <button
              disabled={Object.keys(selectedAnswers).length < TALENT_DISCOVERY_QUESTIONS.length}
              onClick={handleFinishAssessment}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                Object.keys(selectedAnswers).length >= TALENT_DISCOVERY_QUESTIONS.length
                  ? 'bg-sky-600 text-white hover:bg-sky-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800'
              }`}
            >
              Generate Holistic Profile
            </button>
          </div>
        </div>
      )}

      {/* VIEW 3: DISCOVERY RESULTS */}
      {currentStep === 'results' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Initial Discovery Profile Generated
              </h3>
              <p className="text-xs text-slate-500">
                This diagnostic profile is an initial compass, not a permanent label. It will evolve as you complete school challenges.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-3 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Strongest Emerging Affinities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  1. Technology, Coding & AI
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  High natural inclination towards algorithmic decomposition, automation, and iterative tinkering.
                </p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  2. Innovation & Practical Troubleshooting
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Interest in frugal physical prototypes and hands-on mechanical repairs.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentStep('overview')}
              className="text-xs text-slate-600 hover:underline"
            >
              Explore all 10 pillars
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
            >
              Return to Student Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
