/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  School,
  Classroom,
  TeacherProfile,
  StudentProfile,
  ClassroomMembership,
  Language,
  TalentCategory
} from '../types';
import { translations } from '../i18n';
import { TALENT_CATEGORIES, INITIAL_PILOT_DISTRICTS } from '../db/store';
import {
  School as SchoolIcon,
  Plus,
  Users,
  Award,
  ShieldCheck,
  KeyRound,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  BarChart3,
  MapPin,
  FileSpreadsheet
} from 'lucide-react';

interface AdminDashboardProps {
  school: School;
  classrooms: Classroom[];
  teachers: TeacherProfile[];
  students: StudentProfile[];
  memberships: ClassroomMembership[];
  language: Language;
  onOpenAddClassroom: () => void;
  onRegenerateCode: (classroomId: string) => void;
  onToggleCode: (classroomId: string, active: boolean) => void;
  onApproveMembership: (memId: string) => void;
  onRejectMembership: (memId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  school,
  classrooms,
  teachers,
  students,
  memberships,
  language,
  onOpenAddClassroom,
  onRegenerateCode,
  onToggleCode,
  onApproveMembership,
  onRejectMembership
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'classrooms' | 'teachers' | 'approvals' | 'analytics'>('classrooms');
  const [standardFilter, setStandardFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const pendingMemberships = memberships.filter(m => m.status === 'pending');

  const filteredClassrooms = classrooms.filter(c => {
    if (standardFilter !== 'all' && c.standard !== standardFilter) return false;
    if (searchQuery) {
      const matchSection = c.section.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTeacher = c.class_teacher_name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSection || matchTeacher;
    }
    return true;
  });

  const totalStudentsEnrolled = classrooms.reduce((acc, c) => acc + (c.student_count || 0), 0);

  return (
    <div className="space-y-8 pb-12">
      {/* School Registry Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {language === 'ta' ? 'பள்ளி நிர்வாக தளம்' : 'School Administration Portal'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                UDISE+ Verified ({school.udise_code})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {language === 'ta' && school.name_ta ? school.name_ta : school.name}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {school.district}, {school.state} · {school.board} · Principal: {school.principal_name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAddClassroom}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{t.add_classroom}</span>
            </button>
          </div>
        </div>

        {/* School-Wide Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t.total_classrooms} (Classes 6-12)
            </div>
            <div className="text-base font-semibold text-slate-900 dark:text-white mt-0.5">
              {classrooms.length} Active Sections
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t.total_students}
            </div>
            <div className="text-base font-semibold text-sky-600 dark:text-sky-400 mt-0.5">
              {totalStudentsEnrolled} Students
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t.verified_teachers}
            </div>
            <div className="text-base font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {teachers.filter(t => t.status === 'approved').length} Faculty Members
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Enrolment Approvals
            </div>
            <div className="text-base font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
              {pendingMemberships.length} Pending
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab('classrooms')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'classrooms'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-semibold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'ta' ? `வகுப்பறைகள் (${classrooms.length})` : `Classrooms (${classrooms.length})`}
        </button>
        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'approvals'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-semibold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'ta' ? `சேர்க்கை ஒப்புதல்கள் (${pendingMemberships.length})` : `Student Enrolment Approvals (${pendingMemberships.length})`}
        </button>
        <button
          onClick={() => setActiveTab('teachers')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'teachers'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-semibold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'ta' ? `ஆசிரியர்கள் (${teachers.length})` : `Faculty Directory (${teachers.length})`}
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'analytics'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-semibold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'ta' ? 'திறன் பகுப்பாய்வு & தமிழ்நாடு வரைபடம்' : 'Talent Analytics & Pilot Network'}
        </button>
      </div>

      {/* TAB 1: CLASSROOM MANAGEMENT */}
      {activeTab === 'classrooms' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-500 font-medium">Standard:</span>
              <button
                onClick={() => setStandardFilter('all')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  standardFilter === 'all'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                All (6-12)
              </button>
              {[6, 7, 8, 9, 10, 11, 12].map(std => (
                <button
                  key={std}
                  onClick={() => setStandardFilter(std)}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    standardFilter === std
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  Class {std}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search section or teacher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2.5 py-1 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Classrooms Grid (Supports 24+ classrooms!) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClassrooms.map(c => (
              <div
                key={c.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Class {c.standard}-{c.section}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Class Teacher: {c.class_teacher_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">Enrolled</span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {c.student_count} / {c.max_capacity}
                    </p>
                  </div>
                </div>

                {/* Joining Code & Controls */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-2 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5" />
                      Joining Code
                    </span>
                    <span className={c.code_active ? 'text-emerald-600 font-medium' : 'text-rose-600 font-medium'}>
                      {c.code_active ? 'Active' : 'Revoked'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold tracking-wider text-slate-900 dark:text-white">
                      {c.joining_code}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onRegenerateCode(c.id)}
                        className="p-1 text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 rounded transition-colors"
                        title="Regenerate code"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onToggleCode(c.id, !c.code_active)}
                        className={`text-xs px-2 py-0.5 rounded font-medium ${
                          c.code_active
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {c.code_active ? 'Revoke' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ENROLMENT APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Student Enrolment Queue ({pendingMemberships.length} Pending)
            </h2>
          </div>

          {pendingMemberships.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                All student memberships have been reviewed and approved!
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {pendingMemberships.map(mem => (
                <div key={mem.id} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {mem.student_name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Admission No: {mem.admission_no} · Applied: {new Date(mem.enrolled_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onApproveMembership(mem.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => onRejectMembership(mem.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FACULTY DIRECTORY */}
      {activeTab === 'teachers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teachers.map(t => (
              <div
                key={t.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {language === 'ta' && t.name_ta ? t.name_ta : t.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {language === 'ta' && t.subject_ta ? t.subject_ta : t.subject}
                    </p>
                  </div>
                  <span className="text-xs text-emerald-600 font-medium">
                    Verified
                  </span>
                </div>

                <div className="text-xs text-slate-500 space-y-1">
                  <div>Email: {t.email}</div>
                  <div>Phone: {t.phone}</div>
                  <div>Assigned Classes: {t.assigned_classroom_ids.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TALENT ANALYTICS & PILOT NETWORK */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              School-Wide Distribution Across 10 Talent Pillars
            </h3>
            <p className="text-xs text-slate-500">
              Real-time student participation and demonstrated competencies beyond academic marks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {TALENT_CATEGORIES.map(cat => {
                // mock percentage based on index for representative distribution
                const pct = [78, 85, 64, 72, 91, 80, 88, 70, 75, 68][
                  TALENT_CATEGORIES.indexOf(cat)
                ] || 70;

                return (
                  <div key={cat.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {language === 'ta' && cat.name_ta ? cat.name_ta : cat.name_en}
                      </span>
                      <span className="text-slate-500 font-mono">{pct}% Active</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-sky-600 h-full rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-400">
                      {cat.sampleSkills.slice(0, 2).join(' · ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Statewide Network Pilot Progress */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tamil Nadu Statewide Pilot Status (38 Districts)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {INITIAL_PILOT_DISTRICTS.slice(0, 6).map(dist => (
                <div key={dist.name} className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {language === 'ta' ? dist.name_ta : dist.name}
                    </span>
                    <span className="text-xs font-medium text-sky-600">{dist.phase}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {dist.schoolsCount} Schools · {dist.studentsCount} Students Enrolled
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
