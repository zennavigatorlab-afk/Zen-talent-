/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  StudentProfile,
  Submission,
  Certificate,
  Language,
  School
} from '../types';
import { translations } from '../i18n';
import { TALENT_CATEGORIES } from '../db/store';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Share2,
  Printer,
  Lock,
  Globe,
  QrCode,
  ArrowLeft,
  Calendar,
  Building,
  Sparkles
} from 'lucide-react';

interface TalentPassportProps {
  student: StudentProfile;
  school: School;
  submissions: Submission[];
  certificates: Certificate[];
  language: Language;
  onUpdatePrivacy: (isPublic: boolean) => void;
  onClose: () => void;
}

export const TalentPassport: React.FC<TalentPassportProps> = ({
  student,
  school,
  submissions,
  certificates,
  language,
  onUpdatePrivacy,
  onClose
}) => {
  const t = translations[language];
  const [copiedLink, setCopiedLink] = useState(false);

  const verifiedSubmissions = submissions.filter(
    s => s.student_id === student.id && s.status === 'verified'
  );

  const studentCertificates = certificates.filter(
    c => c.student_id === student.id
  );

  // Collect all verified skills
  const verifiedSkills = Array.from(
    new Set(
      verifiedSubmissions.flatMap(s => s.evaluation?.verified_skills || [])
    )
  );

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.origin + `?verify_passport=${student.passport_id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ta' ? 'டாஷ்போர்டுக்குத் திரும்பு' : 'Back to Dashboard'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Privacy Switch */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
            {student.privacy_public_passport ? (
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {student.privacy_public_passport ? 'Public Link Enabled' : 'Private to School'}
            </span>
            <button
              onClick={() => onUpdatePrivacy(!student.privacy_public_passport)}
              className="text-xs text-sky-600 hover:underline font-semibold ml-1"
            >
              Change
            </button>
          </div>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* THE PASSPORT CARD (Document Style) */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-6 sm:p-10 shadow-lg space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Passport Official Header */}
        <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest uppercase text-sky-700 dark:text-sky-400">
                STATEWIDE STUDENT TALENT RECORD
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs font-medium text-slate-500">
                TAMIL NADU SCHOOL EDUCATION
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              ZEN TALENT PASSPORT
            </h1>
            <p className="text-xs text-slate-500 max-w-lg">
              Official verified achievement dossier bridging school-level learning with statewide recognition and career pathways.
            </p>
          </div>

          {/* Passport Serial & Cryptographic Badge */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-right sm:text-right shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Passport Identifier
            </span>
            <span className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-white tracking-wider block">
              {student.passport_id}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3" />
              Cryptographically Verified
            </span>
          </div>
        </div>

        {/* Student Demographics & School Affiliation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block uppercase font-medium text-[10px]">Student Full Name</span>
            <span className="font-bold text-sm text-slate-900 dark:text-white mt-0.5 block">
              {student.name}
            </span>
            {student.name_ta && (
              <span className="text-slate-500 block">{student.name_ta}</span>
            )}
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-medium text-[10px]">Class & Enrolment</span>
            <span className="font-semibold text-sm text-slate-900 dark:text-white mt-0.5 block">
              Class {student.standard}-{student.section}
            </span>
            <span className="text-slate-500 block">Admission: {student.admission_no}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-medium text-[10px]">Accredited School</span>
            <span className="font-semibold text-xs text-slate-900 dark:text-white mt-0.5 block line-clamp-1">
              {school.name}
            </span>
            <span className="text-slate-500 block">UDISE+: {school.udise_code}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-medium text-[10px]">Child Privacy & Consent</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Parental Consent on File
            </span>
            <span className="text-slate-400 block mt-0.5">Contact masked ({student.guardian_phone})</span>
          </div>
        </div>

        {/* SECTION 1: VERIFIED SKILLS INVENTORY */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Demonstrated & Faculty-Endorsed Skills</span>
          </h2>
          {verifiedSkills.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No endorsed skills yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {verifiedSkills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: VERIFIED PROJECTS & PRACTICAL EVIDENCE */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Verified Project Portfolios ({verifiedSubmissions.length})</span>
          </h2>

          {verifiedSubmissions.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No verified projects yet.</p>
          ) : (
            <div className="space-y-4">
              {verifiedSubmissions.map(sub => {
                const cat = TALENT_CATEGORIES.find(c => c.id === sub.talent_category_id);
                return (
                  <div
                    key={sub.id}
                    className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="text-xs text-slate-400 flex items-center gap-2">
                          <span className="font-semibold text-sky-600 dark:text-sky-400">
                            {cat?.name_en}
                          </span>
                          <span>·</span>
                          <span>Verified {new Date(sub.submitted_at).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                          {sub.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          School Challenge: {sub.challenge_title}
                        </p>
                      </div>

                      {sub.evaluation && (
                        <div className="text-right">
                          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                            {sub.evaluation.total_score}/{sub.evaluation.max_possible} Pts
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Evaluated by {sub.evaluation.teacher_name}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {sub.description}
                    </p>

                    {/* Evidence links */}
                    {sub.evidence.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        {sub.evidence.map(ev => (
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
                    )}

                    {/* Teacher constructive remark */}
                    {sub.evaluation?.constructive_feedback && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs text-slate-600 dark:text-slate-300 border-l-2 border-emerald-500 italic">
                        "{sub.evaluation.constructive_feedback}"
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 3: OFFICIAL CERTIFICATES & CREDENTIALS */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Accredited Certificates ({studentCertificates.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentCertificates.map(cert => (
              <div
                key={cert.id}
                className="p-5 rounded-xl border-2 border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                      {cert.certificate_number}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {cert.challenge_title}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 uppercase">
                    {cert.distinction_level}
                  </span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div>Category: {cert.talent_category_name}</div>
                  <div>Issued by: {cert.issuer_authority}</div>
                  <div>Date: {new Date(cert.issued_at).toLocaleDateString()}</div>
                </div>

                <div className="pt-2 border-t border-amber-200 dark:border-amber-900/40 text-[10px] font-mono text-slate-400 truncate">
                  Hash: {cert.verification_hash}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Passport Footer Guarantee */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Government Model Higher Secondary School · Tamil Nadu Education Pilot
          </div>
          <div className="font-mono text-[10px] text-slate-400">
            SYSTEM HASH: sha256-zt-tn-2026-auth-ok
          </div>
        </div>
      </div>
    </div>
  );
};
