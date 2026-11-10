/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  School,
  Classroom,
  TeacherProfile,
  StudentProfile,
  Challenge,
  Submission,
  Certificate,
  Opportunity,
  ClassroomMembership,
  Evaluation
} from './types';
import { translations } from './i18n';
import { ZenTalentStore, TALENT_CATEGORIES } from './db/store';
import { Header } from './components/Header';
import { RoleBanner } from './components/RoleBanner';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { TalentPassport } from './components/TalentPassport';
import { TalentDiscovery } from './components/TalentDiscovery';
import { OpportunitiesView } from './components/OpportunitiesView';
import { ProjectSubmissionModal } from './components/ProjectSubmissionModal';
import { EvaluationModal } from './components/EvaluationModal';
import { CertificateVerificationModal } from './components/CertificateVerificationModal';
import { SecurityInspectorModal } from './components/SecurityInspectorModal';
import { ExpansionRoadmapModal } from './components/ExpansionRoadmapModal';
import { ClassroomManagerModal } from './components/ClassroomManagerModal';
import { ChallengeCreatorModal } from './components/ChallengeCreatorModal';
import { Award, Compass, Sparkles, BookOpen, ShieldCheck, MapPin } from 'lucide-react';

export default function App() {
  const store = ZenTalentStore.getInstance();

  // App State
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [language, setLanguage] = useState<Language>('en');
  const [isDark, setIsDark] = useState<boolean>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Data reactive state
  const [schools, setSchools] = useState<School[]>(store.schools);
  const [classrooms, setClassrooms] = useState<Classroom[]>(store.classrooms);
  const [teachers, setTeachers] = useState<TeacherProfile[]>(store.teachers);
  const [students, setStudents] = useState<StudentProfile[]>(store.students);
  const [memberships, setMemberships] = useState<ClassroomMembership[]>(store.memberships);
  const [challenges, setChallenges] = useState<Challenge[]>(store.challenges);
  const [submissions, setSubmissions] = useState<Submission[]>(store.submissions);
  const [certificates, setCertificates] = useState<Certificate[]>(store.certificates);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(store.opportunities);

  // Active view states
  const [activeMainView, setActiveMainView] = useState<'dashboard' | 'passport' | 'discovery' | 'opportunities'>('dashboard');

  // Modal dialog states
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isVerifierOpen, setIsVerifierOpen] = useState(false);
  const [isAddClassroomOpen, setIsAddClassroomOpen] = useState(false);
  const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);
  const [submittingChallenge, setSubmittingChallenge] = useState<Challenge | null | undefined>(null);
  const [evaluatingSubmission, setEvaluatingSubmission] = useState<Submission | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Dark mode effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Sync state helper
  const syncStateFromStore = () => {
    setSchools([...store.schools]);
    setClassrooms([...store.classrooms]);
    setTeachers([...store.teachers]);
    setStudents([...store.students]);
    setMemberships([...store.memberships]);
    setChallenges([...store.challenges]);
    setSubmissions([...store.submissions]);
    setCertificates([...store.certificates]);
    setOpportunities([...store.opportunities]);
  };

  // Primary active records
  const currentSchool = schools[0];
  const currentTeacher = teachers[0]; // Mrs. Sundari Ramanathan
  const currentStudent = students[0]; // Kavin Selvan
  const currentClassroom = classrooms.find(c => c.id === currentStudent.classroom_id) || classrooms[6]; // Class 9-A

  // Handlers
  const handleJoinClassroom = (code: string) => {
    const res = store.joinClassroomByCode(currentStudent.id, code);
    syncStateFromStore();
    showToast(res.message);
  };

  const handleRegenerateCode = (classroomId: string) => {
    const newCode = store.regenerateJoiningCode(classroomId);
    syncStateFromStore();
    showToast(`New joining code generated: ${newCode}`);
  };

  const handleToggleCode = (classroomId: string, active: boolean) => {
    store.toggleJoiningCode(classroomId, active);
    syncStateFromStore();
    showToast(`Classroom code is now ${active ? 'Active' : 'Revoked'}`);
  };

  const handleApproveMembership = (memId: string) => {
    const mem = store.memberships.find(m => m.id === memId);
    if (mem) {
      mem.status = 'approved';
      syncStateFromStore();
      showToast(`Student enrolment for ${mem.student_name} approved!`);
    }
  };

  const handleRejectMembership = (memId: string) => {
    const mem = store.memberships.find(m => m.id === memId);
    if (mem) {
      mem.status = 'rejected';
      syncStateFromStore();
      showToast(`Student enrolment for ${mem.student_name} rejected.`);
    }
  };

  const handleAddClassroom = (classroomData: Omit<Classroom, 'id' | 'joining_code' | 'student_count'>) => {
    const created = store.addClassroom(classroomData);
    syncStateFromStore();
    showToast(`Classroom ${created.standard}-${created.section} created with code ${created.joining_code}!`);
  };

  const handleCreateChallenge = (challengeData: Omit<Challenge, 'id' | 'submission_count' | 'created_at'>) => {
    const created = store.createChallenge(challengeData);
    syncStateFromStore();
    showToast(`Challenge "${created.title}" published successfully!`);
  };

  const handleSubmitProject = (submissionData: Omit<Submission, 'id' | 'submitted_at' | 'status'>) => {
    const created = store.submitProject(submissionData);
    syncStateFromStore();
    setSubmittingChallenge(null);
    showToast(`Project "${created.title}" submitted for teacher review!`);
  };

  const handleSaveEvaluation = (
    submissionId: string,
    evalData: Omit<Evaluation, 'id' | 'submission_id' | 'evaluated_at'>,
    issueCertificate: boolean
  ) => {
    store.evaluateSubmission(submissionId, evalData, issueCertificate);
    syncStateFromStore();
    setEvaluatingSubmission(null);
    showToast(`Submission evaluated and verified!`);
  };

  const handleUpdateStudentPrivacy = (isPublic: boolean) => {
    store.updateStudentPassportPrivacy(currentStudent.id, isPublic);
    syncStateFromStore();
    showToast(`Passport privacy set to ${isPublic ? 'Publicly Verifiable' : 'Private to School'}`);
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role === 'public_verifier') {
            setIsVerifierOpen(true);
          }
        }}
        language={language}
        onLanguageChange={setLanguage}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        onOpenSecurity={() => setIsSecurityOpen(true)}
        onOpenRoadmap={() => setIsRoadmapOpen(true)}
        onOpenVerifier={() => setIsVerifierOpen(true)}
      />

      {/* Role Banner */}
      <RoleBanner
        currentRole={currentRole}
        language={language}
        student={currentStudent}
        teacher={currentTeacher}
        school={currentSchool}
      />

      {/* Main App Navigation for Student & Teacher */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2">
            <button
              onClick={() => setActiveMainView('dashboard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeMainView === 'dashboard'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.nav_overview}
            </button>
            <button
              onClick={() => setActiveMainView('discovery')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeMainView === 'discovery'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.nav_discovery}
            </button>
            <button
              onClick={() => setActiveMainView('passport')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeMainView === 'passport'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.nav_passport}
            </button>
            <button
              onClick={() => setActiveMainView('opportunities')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeMainView === 'opportunities'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.nav_opportunities} ({opportunities.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-xl text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-4 h-4 text-sky-400 dark:text-sky-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* View Routing */}
        {activeMainView === 'passport' && (
          <TalentPassport
            student={currentStudent}
            school={currentSchool}
            submissions={submissions}
            certificates={certificates}
            language={language}
            onUpdatePrivacy={handleUpdateStudentPrivacy}
            onClose={() => setActiveMainView('dashboard')}
          />
        )}

        {activeMainView === 'discovery' && (
          <TalentDiscovery
            language={language}
            onSelectCategory={(catId) => {
              setActiveMainView('dashboard');
            }}
            onClose={() => setActiveMainView('dashboard')}
          />
        )}

        {activeMainView === 'opportunities' && (
          <OpportunitiesView
            opportunities={opportunities}
            language={language}
          />
        )}

        {activeMainView === 'dashboard' && (
          <>
            {currentRole === 'student' && (
              <StudentDashboard
                student={currentStudent}
                classroom={currentClassroom}
                challenges={challenges}
                submissions={submissions}
                certificates={certificates}
                language={language}
                onJoinClassroom={handleJoinClassroom}
                onSubmitProjectClick={(chal) => setSubmittingChallenge(chal)}
                onViewPassport={() => setActiveMainView('passport')}
                onViewDiscovery={() => setActiveMainView('discovery')}
                onViewOpportunities={() => setActiveMainView('opportunities')}
                onViewCertificate={(cert) => {
                  setSelectedCertificate(cert);
                  setIsVerifierOpen(true);
                }}
              />
            )}

            {currentRole === 'teacher' && (
              <TeacherDashboard
                teacher={currentTeacher}
                classrooms={classrooms}
                challenges={challenges}
                submissions={submissions}
                students={students}
                language={language}
                onOpenCreateChallenge={() => setIsCreateChallengeOpen(true)}
                onOpenEvaluation={(sub) => setEvaluatingSubmission(sub)}
                onRegenerateCode={handleRegenerateCode}
                onToggleCode={handleToggleCode}
              />
            )}

            {currentRole === 'admin' && (
              <AdminDashboard
                school={currentSchool}
                classrooms={classrooms}
                teachers={teachers}
                students={students}
                memberships={memberships}
                language={language}
                onOpenAddClassroom={() => setIsAddClassroomOpen(true)}
                onRegenerateCode={handleRegenerateCode}
                onToggleCode={handleToggleCode}
                onApproveMembership={handleApproveMembership}
                onRejectMembership={handleRejectMembership}
              />
            )}

            {currentRole === 'public_verifier' && (
              <div className="space-y-6 max-w-3xl mx-auto py-8">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-4 shadow-sm text-center">
                  <Award className="w-12 h-12 text-sky-600 mx-auto" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Public Achievement Verification Portal
                  </h2>
                  <p className="text-xs text-slate-500 max-w-lg mx-auto">
                    Verify credentials presented by students to universities, internships, and scholarships. All credentials are cryptographically authenticated against registered Tamil Nadu school records.
                  </p>
                  <button
                    onClick={() => setIsVerifierOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow-xs"
                  >
                    <span>Launch Certificate Search</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">ZEN TALENT</span>
            <span>·</span>
            <span>{t.tagline}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSecurityOpen(true)}
              className="text-slate-600 dark:text-slate-400 hover:underline inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Supabase RLS Security</span>
            </button>
            <button
              onClick={() => setIsRoadmapOpen(true)}
              className="text-slate-600 dark:text-slate-400 hover:underline inline-flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Tamil Nadu Pilot Network</span>
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {isSecurityOpen && (
        <SecurityInspectorModal
          language={language}
          onClose={() => setIsSecurityOpen(false)}
        />
      )}

      {isRoadmapOpen && (
        <ExpansionRoadmapModal
          language={language}
          onClose={() => setIsRoadmapOpen(false)}
        />
      )}

      {isVerifierOpen && (
        <CertificateVerificationModal
          certificates={certificates}
          initialCertificate={selectedCertificate || undefined}
          language={language}
          onClose={() => {
            setIsVerifierOpen(false);
            setSelectedCertificate(null);
          }}
        />
      )}

      {isAddClassroomOpen && (
        <ClassroomManagerModal
          teachers={teachers}
          schoolId={currentSchool.id}
          language={language}
          onAddClassroom={handleAddClassroom}
          onClose={() => setIsAddClassroomOpen(false)}
        />
      )}

      {isCreateChallengeOpen && (
        <ChallengeCreatorModal
          teacherId={currentTeacher.id}
          teacherName={currentTeacher.name}
          classrooms={classrooms}
          language={language}
          onCreateChallenge={handleCreateChallenge}
          onClose={() => setIsCreateChallengeOpen(false)}
        />
      )}

      {submittingChallenge !== null && (
        <ProjectSubmissionModal
          challenges={challenges}
          preSelectedChallenge={submittingChallenge || undefined}
          studentId={currentStudent.id}
          studentName={currentStudent.name}
          classroomId={currentStudent.classroom_id}
          language={language}
          onSubmit={handleSubmitProject}
          onClose={() => setSubmittingChallenge(null)}
        />
      )}

      {evaluatingSubmission && (
        <EvaluationModal
          submission={evaluatingSubmission}
          challenge={challenges.find(c => c.id === evaluatingSubmission.challenge_id) || challenges[0]}
          teacherName={currentTeacher.name}
          teacherId={currentTeacher.id}
          language={language}
          onSaveEvaluation={handleSaveEvaluation}
          onClose={() => setEvaluatingSubmission(null)}
        />
      )}
    </div>
  );
}
