/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserRole, Language, StudentProfile, TeacherProfile, School } from '../types';
import { translations } from '../i18n';
import { ShieldCheck, School as SchoolIcon, UserCheck, GraduationCap } from 'lucide-react';

interface RoleBannerProps {
  currentRole: UserRole;
  language: Language;
  student: StudentProfile;
  teacher: TeacherProfile;
  school: School;
}

export const RoleBanner: React.FC<RoleBannerProps> = ({
  currentRole,
  language,
  student,
  teacher,
  school
}) => {
  const t = translations[language];

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* User Identity info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
            {currentRole === 'student' && (
              <>
                <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>
                  {language === 'ta' && student.name_ta ? student.name_ta : student.name}
                </span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-slate-500 dark:text-slate-400">
                  {language === 'ta' ? `வகுப்பு ${student.standard}-${student.section}` : `Class ${student.standard}-${student.section}`}
                </span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="font-mono text-slate-500">{student.passport_id}</span>
              </>
            )}

            {currentRole === 'teacher' && (
              <>
                <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {language === 'ta' && teacher.name_ta ? teacher.name_ta : teacher.name}
                </span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-slate-500 dark:text-slate-400">
                  {language === 'ta' && teacher.subject_ta ? teacher.subject_ta : teacher.subject}
                </span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட ஆசிரியர்' : 'Verified Faculty'}
                </span>
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <SchoolIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>{school.principal_name} (Principal)</span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-slate-500 dark:text-slate-400">UDISE+ {school.udise_code}</span>
              </>
            )}

            {currentRole === 'public_verifier' && (
              <>
                <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Public Achievement Verification Portal</span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-slate-500 dark:text-slate-400">External Evaluator / Institution</span>
              </>
            )}
          </div>
        </div>

        {/* School affiliation & Privacy badge */}
        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <div className="hidden sm:flex items-center gap-1.5">
            <SchoolIcon className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-xs">
              {language === 'ta' && school.name_ta ? school.name_ta : school.name}
            </span>
          </div>

          {currentRole === 'student' && student.guardian_consent_given && (
            <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.guardian_consent_verified}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
