/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Submission,
  Challenge,
  Evaluation,
  Language
} from '../types';
import { translations } from '../i18n';
import { TALENT_CATEGORIES } from '../db/store';
import {
  Award,
  CheckCircle2,
  X,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface EvaluationModalProps {
  submission: Submission;
  challenge: Challenge;
  teacherName: string;
  teacherId: string;
  language: Language;
  onSaveEvaluation: (
    submissionId: string,
    evalData: Omit<Evaluation, 'id' | 'submission_id' | 'evaluated_at'>,
    issueCertificate: boolean
  ) => void;
  onClose: () => void;
}

export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  submission,
  challenge,
  teacherName,
  teacherId,
  language,
  onSaveEvaluation,
  onClose
}) => {
  const t = translations[language];

  // Initialize criterion scores
  const [scores, setScores] = useState<{ [criterionName: string]: number }>(() => {
    if (submission.evaluation) {
      return { ...submission.evaluation.criteria_scores };
    }
    const initial: { [key: string]: number } = {};
    challenge.rubric.forEach(c => {
      // Default to 80% of max
      initial[c.name] = Math.round(c.max_points * 0.85);
    });
    return initial;
  });

  const [feedback, setFeedback] = useState(
    submission.evaluation?.constructive_feedback ||
    'Great initiative! The project demonstrates clear problem understanding and sound execution.'
  );

  const [feedbackTa, setFeedbackTa] = useState(
    submission.evaluation?.constructive_feedback_ta ||
    'சிறப்பான முயற்சி! சிக்கலை தெளிவாகப் புரிந்து கொண்டு வடிவமைக்கப்பட்ட அருமையான திட்டம்.'
  );

  const category = TALENT_CATEGORIES.find(c => c.id === submission.talent_category_id);
  const sampleSkills = category?.sampleSkills || ['Problem Solving', 'Design Thinking'];

  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    submission.evaluation?.verified_skills || sampleSkills.slice(0, 3)
  );

  const [issueCertificate, setIssueCertificate] = useState(
    Boolean(submission.evaluation?.certificate_id || true)
  );

  const totalScore = Object.values(scores).reduce((a, b) => a + Number(b), 0);
  const maxPossible = challenge.rubric.reduce((a, b) => a + b.max_points, 0);

  const handleScoreChange = (criterionName: string, val: number, max: number) => {
    const clamped = Math.max(0, Math.min(max, val));
    setScores(prev => ({ ...prev, [criterionName]: clamped }));
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveEvaluation(
      submission.id,
      {
        teacher_id: teacherId,
        teacher_name: teacherName,
        criteria_scores: scores,
        total_score: totalScore,
        max_possible: maxPossible,
        constructive_feedback: feedback,
        constructive_feedback_ta: feedbackTa,
        verified_skills: selectedSkills
      },
      issueCertificate
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-medium">
              <Award className="w-4 h-4" />
              <span>Project Review & Competency Verification</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {submission.title}
            </h2>
            <p className="text-xs text-slate-500">
              Student: {submission.student_name} · Challenge: {challenge.title}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Evidence review summary */}
        {submission.evidence.length > 0 && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs space-y-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Submitted Student Evidence:
            </span>
            <div className="flex flex-wrap gap-2">
              {submission.evidence.map(ev => (
                <a
                  key={ev.id}
                  href={ev.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sky-600 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="truncate max-w-[200px]">{ev.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rubric Criteria Evaluation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Evaluation Rubrics
              </h3>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Total: {totalScore} / {maxPossible} Points
              </div>
            </div>

            <div className="space-y-3">
              {challenge.rubric.map(cr => (
                <div
                  key={cr.name}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">
                        {cr.name}
                      </span>
                      <p className="text-[11px] text-slate-500">{cr.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <input
                        type="number"
                        min={0}
                        max={cr.max_points}
                        value={scores[cr.name] ?? 0}
                        onChange={(e) => handleScoreChange(cr.name, Number(e.target.value), cr.max_points)}
                        className="w-16 px-2 py-1 text-xs font-bold text-center rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                      <span className="text-xs text-slate-400">/ {cr.max_points}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Constructive Feedback Input */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Constructive Teacher Feedback (English & Tamil)
            </h3>
            <div className="space-y-2">
              <textarea
                rows={2}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write actionable, encouraging feedback in English..."
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
              <textarea
                rows={2}
                value={feedbackTa}
                onChange={(e) => setFeedbackTa(e.target.value)}
                placeholder="தமிழில் ஆசிரியர் ஊக்கக் குறிப்பு..."
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Endorse Verified Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Endorse Demonstrated Competency Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {sampleSkills.map(skill => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Issue Certificate Checkbox */}
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Issue ZEN TALENT School-Verified Certificate
              </span>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                Generates a unique certificate number with tamper-proof cryptographic verification hash.
              </p>
            </div>
            <input
              type="checkbox"
              checked={issueCertificate}
              onChange={(e) => setIssueCertificate(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {t.action_cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors shadow-xs"
            >
              Save Evaluation & Verify Achievement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
