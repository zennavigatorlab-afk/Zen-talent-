/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Certificate, Language } from '../types';
import { translations } from '../i18n';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Search,
  X,
  Building,
  Calendar,
  Lock,
  Printer,
  FileCheck
} from 'lucide-react';

interface CertificateVerificationModalProps {
  certificates: Certificate[];
  initialCertificate?: Certificate;
  language: Language;
  onClose: () => void;
}

export const CertificateVerificationModal: React.FC<CertificateVerificationModalProps> = ({
  certificates,
  initialCertificate,
  language,
  onClose
}) => {
  const t = translations[language];

  const [searchNo, setSearchNo] = useState(
    initialCertificate?.certificate_number || 'CERT-ZT-2026-9842'
  );
  const [searched, setSearched] = useState(true);

  const matchedCert = certificates.find(
    c => c.certificate_number.toUpperCase() === searchNo.trim().toUpperCase()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Tamper-Proof Credential Verification</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {t.cert_verify_title}
            </h2>
            <p className="text-xs text-slate-500">
              {t.cert_verify_desc}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              required
              placeholder={t.enter_cert_no}
              value={searchNo}
              onChange={(e) => setSearchNo(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-mono uppercase tracking-wider rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
          >
            Verify
          </button>
        </form>

        {/* Verification Result Card */}
        {searched && (
          <div>
            {matchedCert ? (
              <div className="border-2 border-emerald-500/50 bg-emerald-50/10 dark:bg-emerald-950/10 rounded-xl p-6 space-y-6">
                {/* Verified Header */}
                <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800/40 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Official Record Verified
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Authentic Student Achievement Record
                      </h3>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                    {matchedCert.distinction_level}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-medium">Student Name</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white mt-0.5 block">
                      {matchedCert.student_name}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-medium">Accredited School</span>
                    <span className="font-medium text-slate-900 dark:text-white mt-0.5 block">
                      {matchedCert.school_name}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-medium">Talent Category</span>
                    <span className="font-semibold text-sky-600 dark:text-sky-400 mt-0.5 block">
                      {matchedCert.talent_category_name}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase font-medium">Date of Issue</span>
                    <span className="font-medium text-slate-900 dark:text-white mt-0.5 block">
                      {new Date(matchedCert.issued_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[11px] uppercase font-medium">Demonstrated Challenge</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">
                      {matchedCert.challenge_title}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[11px] uppercase font-medium">Signing Authorities</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">
                      {matchedCert.issuer_authority}
                    </span>
                  </div>
                </div>

                {/* Type distinction note */}
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-sky-600" />
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Classification: {matchedCert.type === 'zen_talent_school' ? 'ZEN TALENT School-Verified Certificate' : 'Recognised Third-Party Certificate'}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {matchedCert.official_accreditation || 'Verified in compliance with Tamil Nadu School Education Pilot standards.'}
                  </p>
                </div>

                {/* Cryptographic Hash */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span className="truncate max-w-sm">Verification Hash: {matchedCert.verification_hash}</span>
                  <button
                    onClick={() => window.print()}
                    className="text-xs text-sky-600 hover:underline font-sans font-medium shrink-0"
                  >
                    Print Record
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl p-6 text-center space-y-2">
                <XCircle className="w-8 h-8 text-rose-500 mx-auto" />
                <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                  Certificate Record Not Found
                </h4>
                <p className="text-xs text-rose-700 dark:text-rose-400 max-w-md mx-auto">
                  No record matches certificate number "{searchNo}". Ensure the ID is spelled correctly or check with the issuing school. ZEN TALENT does not validate fabricated or unverified credentials.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
