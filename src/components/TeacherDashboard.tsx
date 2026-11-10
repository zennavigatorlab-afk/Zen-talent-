/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  TeacherProfile,
  Classroom,
  Challenge,
  Submission,
  StudentProfile,
  Language,
  TalentCategory
} from '../types';
import { translations } from '../i18n';
import { TALENT_CATEGORIES } from '../db/store';
import {
  Plus,
  CheckCircle2,
  Clock,
  KeyRound,
  RefreshCw,
  ExternalLink,
  Award,
  Users,
  Sparkles,
  Search,
  BookOpen,
  Filter
} from 'lucide-react';

interface TeacherDashboardProps {
  teacher: TeacherProfile;
  classrooms: Classroom[];
  challenges: Challenge[];
  submissions: Submission[];
  students: StudentProfile[];
  language: Language;
  onOpenCreateChallenge: () => void;
  onOpenEvaluation: (sub: Submission) => void;
  onRegenerateCode: (classroomId: string) => void;
  onToggleCode: (classroomId: string, active: boolean) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacher,
  classrooms,
  challenges,
  submissions,
  students,
  language,
  onOpenCreateChallenge,
  onOpenEvaluation,
  onRegenerateCode,
  onToggleCode
}) => {
  const t = translations[language];
  const [selectedClassroomId, setSelectedClassroomId] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'submissions' | 'classrooms' | 'challenges'>('submissions');
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'pending' | 'verified'>('pending');

  const myClassrooms = classrooms.filter(c => teacher.assigned_classroom_ids.includes(c.id));
  const myClassroomIds = myClassrooms.map(c => c.id);

  // Submissions for this teacher's classes or challenges created by this teacher
  const relevantSubmissions = submissions.filter(s =>
    myClassroomIds.includes(s.classroom_id) ||
    challenges.find(c => c.id === s.challenge_id)?.created_by_teacher_id === teacher.id
  );

  const filteredSubmissions = relevantSubmissions.filter(sub => {
    if (selectedClassroomId !== 'all' && sub.classroom_id !== selectedClassroomId) return false;
    if (submissionFilter === 'pending') return sub.status === 'submitted' || sub.status === 'under_review';
    if (submissionFilter === 'verified') return sub.status === 'verified';
    return true;
  });

  const pendingCount = relevantSubmissions.filter(s => s.status === 'submitted' || s.status === 'under_review').length;
  const verifiedCount = relevantSubmissions.filter(s => s.status === 'verified').length;

  return (
    <div className="space-y-8 pb-12">
      {/* Teacher Welcome Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {language === 'ta' ? 'ஆசிரியர் பணித்தளம்' : 'Teacher Workspace'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs text-slate-500">
                {language === 'ta' && teacher.subject_ta ? teacher.subject_ta : teacher.subject}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {language === 'ta' ? `வணக்கம், ${teacher.name_ta || teacher.name}` : `Welcome, ${teacher.name}`}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              {language === 'ta'
                ? 'உங்கள் மாணவர்களின் திறமைகளை மதிப்பாய்வு செய்யுங்கள், வழிகாட்டுதல் வழங்குங்கள் மற்றும் அதிகாரப்பூர்வ சான்றிதழ்களை வழங்குங்கள்.'
                : 'Review student project evidence, evaluate rubrics with constructive feedback, and endorse skills across the 10 talent categories.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCreateChallenge}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{t.create_challenge}</span>
            </button>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta' ? 'ஒதுக்கப்பட்ட வகுப்புகள்' : 'Assigned Classrooms'}
            </div>
            <div className="text-base font-semibold text-slate-900 dark:text-white mt-0.5">
              {myClassrooms.length} {language === 'ta' ? 'வகுப்புகள்' : 'Sections'}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta' ? 'நிலுவையில் உள்ள மதிப்பீடுகள்' : 'Pending Evaluations'}
            </div>
            <div className="text-base font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
              {pendingCount} {language === 'ta' ? 'திட்டங்கள்' : 'Submissions'}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta' ? 'சரிபார்க்கப்பட்ட திட்டங்கள்' : 'Verified Achievements'}
            </div>
            <div className="text-base font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {verifiedCount} {language === 'ta' ? 'சான்றிதழ்கள்' : 'Completed'}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ta' ? 'செயலில் உள்ள சவால்கள்' : 'Active Challenges'}
            </div>
            <div className="text-base font-semibold text-sky-600 dark:text-sky-400 mt-0.5">
              {challenges.filter(c => c.created_by_teacher_id === teacher.id).length} Created
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'submissions'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-semibold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'ta' ? `சமர்ப்பிப்புகள் (${relevantSubmissions.length})` : `Project Submissions & Reviews (${relevantSubmissions.length})`}
        </button>
        <button
          onClick={() => setActiveTab('classrooms')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'classrooms'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-semibold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'ta' ? `எனது வகுப்பறைகள் (${myClassrooms.length})` : `My Classrooms & Codes (${myClassrooms.length})`}
        </button>
        <button
          onClick={() => setActiveTab('challenges')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'challenges'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-semibold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'ta' ? 'பள்ளி சவால்கள்' : 'All School Challenges'}
        </button>
      </div>

      {/* TAB 1: SUBMISSIONS & REVIEW QUEUE */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium">Status:</span>
              <div className="inline-flex p-0.5 bg-slate-200/60 dark:bg-slate-800 rounded-md">
                <button
                  onClick={() => setSubmissionFilter('pending')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    submissionFilter === 'pending'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Pending Review ({pendingCount})
                </button>
                <button
                  onClick={() => setSubmissionFilter('verified')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    submissionFilter === 'verified'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Verified ({verifiedCount})
                </button>
                <button
                  onClick={() => setSubmissionFilter('all')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    submissionFilter === 'all'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  All ({relevantSubmissions.length})
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Classroom:</span>
              <select
                value={selectedClassroomId}
                onChange={(e) => setSelectedClassroomId(e.target.value)}
                className="px-2.5 py-1 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                <option value="all">All My Classes</option>
                {myClassrooms.map(c => (
                  <option key={c.id} value={c.id}>
                    Class {c.standard}-{c.section}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submissions List */}
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட பிரிவில் சமர்ப்பிப்புகள் எதுவும் இல்லை.' : 'No submissions found for the selected filter.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredSubmissions.map((sub) => {
                const cat = TALENT_CATEGORIES.find(c => c.id === sub.talent_category_id);
                const isPending = sub.status === 'submitted' || sub.status === 'under_review';

                return (
                  <div
                    key={sub.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {sub.student_name}
                          </span>
                          <span>·</span>
                          <span className="text-sky-600 dark:text-sky-400 font-medium">
                            {language === 'ta' && cat?.name_ta ? cat.name_ta : cat?.name_en}
                          </span>
                          <span>·</span>
                          <span>{new Date(sub.submitted_at).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                          {sub.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Challenge: {sub.challenge_title}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isPending ? (
                          <button
                            onClick={() => onOpenEvaluation(sub)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors shadow-xs"
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span>{language === 'ta' ? 'மதிப்பாய்வு செய் & சான்றிதழ்' : 'Evaluate & Verify'}</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Verified ({sub.evaluation?.total_score}/{sub.evaluation?.max_possible})</span>
                            </span>
                            <button
                              onClick={() => onOpenEvaluation(sub)}
                              className="text-xs text-slate-600 dark:text-slate-400 hover:text-sky-600 underline"
                            >
                              Edit Evaluation
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {sub.description}
                    </p>

                    {/* Student Reflection */}
                    {sub.reflection && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs text-slate-700 dark:text-slate-300">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Student Self-Reflection:{' '}
                        </span>
                        {sub.reflection}
                      </div>
                    )}

                    {/* Evidence links */}
                    {sub.evidence.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                        {sub.evidence.map(ev => (
                          <a
                            key={ev.id}
                            href={ev.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-600 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span className="truncate max-w-[220px]">{ev.title}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MY CLASSROOMS & JOINING CODES */}
      {activeTab === 'classrooms' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myClassrooms.map(c => (
              <div
                key={c.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Class {c.standard}-{c.section}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {c.academic_year} · Class Teacher: {c.class_teacher_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">Students</span>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">
                      {c.student_count}/{c.max_capacity}
                    </p>
                  </div>
                </div>

                {/* Joining code card */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-2 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5" />
                      Classroom Joining Code
                    </span>
                    <span className={c.code_active ? 'text-emerald-600 font-medium' : 'text-rose-600 font-medium'}>
                      {c.code_active ? 'Active' : 'Revoked'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-mono font-bold tracking-widest text-slate-900 dark:text-white">
                      {c.joining_code}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onRegenerateCode(c.id)}
                        className="p-1.5 text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                        title="Regenerate unique code"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onToggleCode(c.id, !c.code_active)}
                        className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
                          c.code_active
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {c.code_active ? 'Revoke' : 'Activate'}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    Share this code with students in Class {c.standard}-{c.section} to enrol.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CHALLENGES LIST */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              School Challenges Catalog ({challenges.length})
            </h2>
            <button
              onClick={onOpenCreateChallenge}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Challenge</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map(chal => {
              const cat = TALENT_CATEGORIES.find(c => c.id === chal.talent_category_id);
              return (
                <div
                  key={chal.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-sky-600 dark:text-sky-400">
                      {language === 'ta' && cat?.name_ta ? cat.name_ta : cat?.name_en}
                    </span>
                    <span>Deadline: {new Date(chal.deadline).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {language === 'ta' && chal.title_ta ? chal.title_ta : chal.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {language === 'ta' && chal.description_ta ? chal.description_ta : chal.description}
                  </p>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <span>{chal.submission_count} Submissions received</span>
                    <span>Grades {chal.eligible_grades.join(', ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
