/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { INITIAL_PILOT_DISTRICTS } from '../db/store';
import {
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  Building,
  GraduationCap,
  Globe
} from 'lucide-react';

interface ExpansionRoadmapModalProps {
  language: Language;
  onClose: () => void;
}

export const ExpansionRoadmapModal: React.FC<ExpansionRoadmapModalProps> = ({
  language,
  onClose
}) => {
  const phases = [
    {
      num: 1,
      title: 'Pilot in Selected Tamil Nadu Schools',
      title_ta: 'தேர்ந்தெடுக்கப்பட்ட தமிழ்நாடு பள்ளிகளில் முன்னோடி திட்டம்',
      status: 'Active Now (2026)',
      status_type: 'current',
      details: 'Launched in Chennai, Coimbatore, and Madurai model higher secondary schools. Focused on refining classroom joining workflows, teacher rubric evaluation, and initial Talent Passport issuance.',
      districts: 'Chennai, Coimbatore, Madurai'
    },
    {
      num: 2,
      title: 'Expand Across 38 Tamil Nadu Districts',
      title_ta: '38 தமிழ்நாடு மாவட்டங்களில் விரிவாக்கம்',
      status: 'Q3 2026 - Q1 2027',
      status_type: 'next',
      details: 'Onboarding Government Model Schools, Matriculation institutions, and Kendriya Vidyalayas across Tiruchirappalli, Salem, Tirunelveli, Thanjavur, and Vellore.',
      districts: '38 Districts statewide'
    },
    {
      num: 3,
      title: 'Connect Participating Schools Statewide',
      title_ta: 'மாநில அளவிலான ஒருங்கிணைந்த வாய்ப்பு கட்டமைப்பு',
      status: '2027',
      status_type: 'future',
      details: 'Unifying inter-school competitions, state science fairs (SCERT/DST), student talent exchange, and direct corporate / incubation linkages with IIT Madras Research Park.',
      districts: '5,000+ High & Higher Secondary Schools'
    },
    {
      num: 4,
      title: 'Pan-India Nationwide Expansion',
      title_ta: 'அகில இந்திய அளவிலான விரிவாக்கம்',
      status: '2028 Horizon',
      status_type: 'future',
      details: 'Expanding the ZEN TALENT passport standard across Indian states in collaboration with national education boards (CBSE, ICSE, NIOS).',
      districts: 'All Indian States & UTs'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl my-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
              <MapPin className="w-4 h-4" />
              <span>Statewide Growth & System Expansion</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              ZEN TALENT: Tamil Nadu to Pan-India Roadmap
            </h2>
            <p className="text-xs text-slate-500">
              Transforming talent identification from localized school projects to statewide institutional recognition.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Phases Timeline */}
        <div className="space-y-4">
          {phases.map(phase => (
            <div
              key={phase.num}
              className={`p-4 rounded-xl border transition-all space-y-2 ${
                phase.status_type === 'current'
                  ? 'border-sky-500 bg-sky-50/40 dark:bg-sky-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    phase.status_type === 'current'
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {phase.num}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {language === 'ta' && phase.title_ta ? phase.title_ta : phase.title}
                  </h3>
                </div>

                <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                  phase.status_type === 'current'
                    ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {phase.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 pl-8 leading-relaxed">
                {phase.details}
              </p>
              <div className="text-[11px] text-slate-400 pl-8">
                Scope: {phase.districts}
              </div>
            </div>
          ))}
        </div>

        {/* Pilot District Directory Snapshot */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-2 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-900 dark:text-white block">
            Tamil Nadu Pilot District Cohorts (Phase 1 & 2):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs text-slate-600 dark:text-slate-300">
            {INITIAL_PILOT_DISTRICTS.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{d.name} ({d.schoolsCount} schools)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
