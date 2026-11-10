/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  StudentProfile,
  Classroom,
  Challenge,
  Submission,
  Certificate,
  Language,
  TalentCategory
} from '../types';
import { translations } from '../i18n';
import { TALENT_CATEGORIES } from '../db/store';
import {
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  KeyRound,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  Upload,
  BookOpen,
  Eye,
  GraduationCap
} from 'lucide-react';

interface StudentDashboardProps {
  student: StudentProfile;
  classroom?: Classroom;
  challenges: Challenge[];
  submissions: Submission[];
  certificates: Certificate[];
  language: Language;
  onJoinClassroom: (code: string) => void;
  onSubmitProjectClick: (challenge?: Challenge) => void;
  onViewPassport: () => void;
  onViewDiscovery: () => void;
  onViewOpportunities: () => void;
  onViewCertificate: (cert: Certificate) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  classroom,
  challenges,
  submissions,
  certificates,
  language,
  onJoinClassroom,
  onSubmitProjectClick,
  onViewPassport,
  onViewDiscovery,
  onViewOpportunities,
  onViewCertificate
}) => {
  const t = translations[language];
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinError, setJoinError] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) {
      setJoinError('Please enter a classroom code');
      return;
    }
    setJoinError('');
    onJoinClassroom(joinCodeInput.trim());
    setJoinCodeInput('');
  };

  const mySubmissions = submissions.filter(s => s.student_id === student.id);
  const verifiedCount = mySubmissions.filter(s => s.status === 'verified').length;

  const filteredChallenges = selectedCategoryFilter === 'all'
    ? challenges
    : challenges.filter(c => c.talent_category_id === selectedCategoryFilter);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome & Classroom Status */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                {language === 'ta' ? 'மாணவர் தளம்' : 'Student Talent Portal'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs text-slate-500">
                {language === 'ta' ? 'அண்ணா நகர் மாதிரி பள்ளி' : 'Anna Nagar Model School'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {language === 'ta' ? `வணக்கம், ${student.name_ta || student.name}!` : `Welcome, ${student.name}!`}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              {language === 'ta'
                ? 'உங்கள் தனித்துவமான திறமைகளைக் கண்டறியுங்கள், பள்ளி சவால்களில் பங்கேற்று சான்றளிக்கப்பட்ட திறன் கடவுச்சீட்டை உருவாக்குங்கள்.'
                : 'Discover your unique abilities beyond academic marks. Take on real challenges, build verified projects, and discover state scholarships.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onViewPassport}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>{t.nav_passport}</span>
            </button>
            <button
              onClick={onViewDiscovery}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.nav_discovery}</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta' ? 'செயலில் உள்ள வகுப்பறை' : 'Class & Section'}
            </div>
            <div className="text-base font-semibold text-slate-900 dark:text-white mt-0.5">
              Class {student.standard}-{student.section}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta' ? 'சரிபார்க்கப்பட்ட திட்டங்கள்' : 'Verified Projects'}
            </div>
            <div className="text-base font-semibold text-slate-900 dark:text-white mt-0.5">
              {verifiedCount} {language === 'ta' ? 'திட்டங்கள்' : 'Submitted'}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta' ? 'சான்றிதழ்கள்' : 'Certificates Earned'}
            </div>
            <div className="text-base font-semibold text-slate-900 dark:text-white mt-0.5">
              {certificates.filter(c => c.student_id === student.id).length} {language === 'ta' ? 'பெறப்பட்டது' : 'Issued'}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta' ? 'கடவுச்சீட்டு நிலை' : 'Passport Privacy'}
            </div>
            <div className="text-base font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {student.privacy_public_passport ? 'Publicly Verifiable' : 'Private to School'}
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Enrolment / Join by Code Section */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium text-sm">
              <KeyRound className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{t.join_with_code}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.join_code_help}
            </p>
          </div>

          <form onSubmit={handleJoinSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. TN-9A-4819"
              value={joinCodeInput}
              onChange={(e) => setJoinCodeInput(e.target.value)}
              className="px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase tracking-wider focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
            >
              {t.action_join}
            </button>
          </form>
        </div>
        {joinError && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{joinError}</p>}
      </div>

      {/* My Submissions & Evaluations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'ta' ? 'எனது சமர்ப்பிப்புகள் & ஆசிரியர் கருத்துக்கள்' : 'My Project Submissions & Teacher Feedback'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta'
                ? 'ஆசிரியர்களால் மதிப்பாய்வு செய்யப்பட்டு சரிபார்க்கப்பட்ட உங்கள் படைப்புகள்.'
                : 'Projects reviewed with rubric scores, verified skill endorsements, and issued certificates.'}
            </p>
          </div>
          <button
            onClick={() => onSubmitProjectClick()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'புதிய திட்டம் சமர்ப்பிக்க' : 'Submit Project'}</span>
          </button>
        </div>

        {mySubmissions.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {language === 'ta' ? 'இன்னும் திட்டங்கள் எதுவும் சமர்ப்பிக்கப்படவில்லை.' : 'No submissions yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {mySubmissions.map((sub) => {
              const cat = TALENT_CATEGORIES.find(c => c.id === sub.talent_category_id);
              return (
                <div
                  key={sub.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-sky-600 dark:text-sky-400">
                          {language === 'ta' && cat?.name_ta ? cat.name_ta : cat?.name_en}
                        </span>
                        <span>·</span>
                        <span>{new Date(sub.submitted_at).toLocaleDateString()}</span>
                        <span>·</span>
                        <span className={
                          sub.status === 'verified'
                            ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                            : 'text-amber-600 dark:text-amber-400 font-medium'
                        }>
                          {sub.status === 'verified' ? t.status_verified : t.status_under_review}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {sub.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {sub.challenge_title}
                      </p>
                    </div>

                    {sub.evaluation && (
                      <div className="text-right sm:text-right">
                        <div className="text-xl font-bold text-slate-900 dark:text-white">
                          {sub.evaluation.total_score}
                          <span className="text-xs font-normal text-slate-500">/{sub.evaluation.max_possible}</span>
                        </div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 justify-end">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{language === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified'}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {sub.description}
                  </p>

                  {/* Evidence links */}
                  {sub.evidence.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {language === 'ta' ? 'இணைக்கப்பட்ட சான்றுகள்:' : 'Submitted Evidence:'}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sub.evidence.map((ev) => (
                          <a
                            key={ev.id}
                            href={ev.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-600 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span className="truncate max-w-[200px]">{ev.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Teacher Feedback & Verified Skills */}
                  {sub.evaluation && (
                    <div className="p-3.5 rounded-lg bg-sky-50/50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {language === 'ta' ? 'ஆசிரியர் கருத்துரை:' : 'Teacher Feedback:'}{' '}
                          <span className="font-normal text-slate-600 dark:text-slate-400">{sub.evaluation.teacher_name}</span>
                        </span>
                        <span className="text-slate-400">
                          {new Date(sub.evaluation.evaluated_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                        "{language === 'ta' && sub.evaluation.constructive_feedback_ta ? sub.evaluation.constructive_feedback_ta : sub.evaluation.constructive_feedback}"
                      </p>

                      {sub.evaluation.verified_skills.length > 0 && (
                        <div className="pt-2 flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                            {language === 'ta' ? 'சான்றளிக்கப்பட்ட திறன்கள்:' : 'Endorsed Skills:'}
                          </span>
                          <span className="text-xs text-sky-700 dark:text-sky-300 font-medium">
                            {sub.evaluation.verified_skills.join(' · ')}
                          </span>
                        </div>
                      )}

                      {sub.evaluation.certificate_id && (
                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            <span>{language === 'ta' ? 'அதிகாரப்பூர்வ சான்றிதழ் வழங்கப்பட்டது' : 'Official School Certificate Awarded'}</span>
                          </span>
                          <button
                            onClick={() => {
                              const cert = certificates.find(c => c.id === sub.evaluation?.certificate_id);
                              if (cert) onViewCertificate(cert);
                            }}
                            className="text-xs text-sky-600 dark:text-sky-400 font-medium hover:underline inline-flex items-center gap-1"
                          >
                            <span>{language === 'ta' ? 'சான்றிதழைப் பார்' : 'View Certificate'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Available Challenges Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'ta' ? 'பள்ளி மற்றும் வகுப்பறை சவால்கள்' : 'Active School & Classroom Challenges'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta'
                ? 'உங்கள் ஆர்வத்திற்கு ஏற்ற சவாலை தேர்ந்தெடுத்து உங்கள் படைப்பை சமர்ப்பியுங்கள்.'
                : 'Select an authentic challenge aligned with your talents to demonstrate real-world skills.'}
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategoryFilter === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {language === 'ta' ? 'அனைத்து பிரிவுகளும்' : 'All Categories'}
            </button>
            {TALENT_CATEGORIES.slice(0, 4).map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {language === 'ta' ? cat.name_ta : cat.name_en}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredChallenges.map(chal => {
            const cat = TALENT_CATEGORIES.find(c => c.id === chal.talent_category_id);
            const alreadySubmitted = mySubmissions.some(s => s.challenge_id === chal.id);

            return (
              <div
                key={chal.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-sky-300 dark:hover:border-sky-800 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-sky-600 dark:text-sky-400">
                      {language === 'ta' && cat?.name_ta ? cat.name_ta : cat?.name_en}
                    </span>
                    <span>
                      {language === 'ta' ? 'கடைசி தேதி:' : 'Deadline:'} {new Date(chal.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
                    {language === 'ta' && chal.title_ta ? chal.title_ta : chal.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {language === 'ta' && chal.description_ta ? chal.description_ta : chal.description}
                  </p>

                  <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
                    <span>{chal.difficulty}</span>
                    <span>·</span>
                    <span>Grades {chal.eligible_grades.join(', ')}</span>
                    <span>·</span>
                    <span>{chal.is_team_allowed ? `Teams up to ${chal.max_team_size}` : 'Individual'}</span>
                    <span>·</span>
                    <span>Mentor: {chal.created_by_name}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {chal.rubric.length} Evaluation Criteria
                  </span>
                  {alreadySubmitted ? (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'ta' ? 'சமர்ப்பிக்கப்பட்டது' : 'Project Submitted'}</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => onSubmitProjectClick(chal)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
                    >
                      {language === 'ta' ? 'திட்டம் சமர்ப்பிக்க' : 'Submit Project'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
