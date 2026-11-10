/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Challenge, Submission, EvidenceItem, Language } from '../types';
import { translations } from '../i18n';
import { TALENT_CATEGORIES } from '../db/store';
import {
  Upload,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';

interface ProjectSubmissionModalProps {
  challenges: Challenge[];
  preSelectedChallenge?: Challenge;
  studentId: string;
  studentName: string;
  classroomId: string;
  language: Language;
  onSubmit: (submission: Omit<Submission, 'id' | 'submitted_at' | 'status'>) => void;
  onClose: () => void;
}

export const ProjectSubmissionModal: React.FC<ProjectSubmissionModalProps> = ({
  challenges,
  preSelectedChallenge,
  studentId,
  studentName,
  classroomId,
  language,
  onSubmit,
  onClose
}) => {
  const t = translations[language];

  const [challengeId, setChallengeId] = useState<string>(
    preSelectedChallenge?.id || (challenges[0]?.id || '')
  );

  const selectedChal = challenges.find(c => c.id === challengeId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reflection, setReflection] = useState('');
  const [isTeam, setIsTeam] = useState(false);
  const [teamMembers, setTeamMembers] = useState('');
  const [categoryId, setCategoryId] = useState<string>(
    selectedChal?.talent_category_id || TALENT_CATEGORIES[0].id
  );

  // Evidence list
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([
    {
      id: 'ev-init-1',
      type: 'code',
      title: 'Project Code Repository / Simulation Link',
      url: 'https://github.com/my-student-project'
    }
  ]);

  const [newEvidenceTitle, setNewEvidenceTitle] = useState('');
  const [newEvidenceUrl, setNewEvidenceUrl] = useState('');
  const [newEvidenceType, setNewEvidenceType] = useState<EvidenceItem['type']>('document');

  const handleAddEvidence = () => {
    if (!newEvidenceTitle.trim() || !newEvidenceUrl.trim()) return;
    setEvidenceList(prev => [
      ...prev,
      {
        id: `ev-${Date.now()}`,
        title: newEvidenceTitle.trim(),
        url: newEvidenceUrl.trim(),
        type: newEvidenceType
      }
    ]);
    setNewEvidenceTitle('');
    setNewEvidenceUrl('');
  };

  const handleRemoveEvidence = (id: string) => {
    setEvidenceList(prev => prev.filter(e => e.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onSubmit({
      challenge_id: challengeId,
      challenge_title: selectedChal?.title || 'General Challenge',
      student_id: studentId,
      student_name: studentName,
      classroom_id: classroomId,
      talent_category_id: categoryId,
      title: title.trim(),
      description: description.trim(),
      is_team: isTeam,
      team_members: isTeam && teamMembers ? teamMembers.split(',').map(s => s.trim()) : undefined,
      evidence: evidenceList,
      reflection: reflection.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8 space-y-6">
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-medium">
              <Upload className="w-4 h-4" />
              <span>Project & Challenge Submission</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Submit Your Demonstrated Project
            </h2>
            <p className="text-xs text-slate-500">
              Evidence-based submissions allow teachers to verify skills and award official certificates.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Challenge Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Select School Challenge
            </label>
            <select
              value={challengeId}
              onChange={(e) => {
                setChallengeId(e.target.value);
                const chal = challenges.find(c => c.id === e.target.value);
                if (chal) setCategoryId(chal.talent_category_id);
              }}
              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            >
              {challenges.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* Project Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Project Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Solar-Powered Smart Water Filter for Thanjavur Farmland"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            />
          </div>

          {/* Talent Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Primary Talent Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            >
              {TALENT_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {language === 'ta' && cat.name_ta ? cat.name_ta : cat.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Project Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Project Summary & Technical Description
            </label>
            <textarea
              required
              rows={3}
              placeholder="Explain how your project works, what tools or scientific methods you used, and the real-world outcome..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            />
          </div>

          {/* Student Self-Reflection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Student Reflection: What did you learn and overcome?
            </label>
            <textarea
              rows={2}
              placeholder="Reflect on errors you debugged, key insights gained, or future improvements..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            />
          </div>

          {/* Evidence Uploads / Links */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Evidence Links (Code, Google Drive, Video, Photos)
              </label>
              <span className="text-[11px] text-slate-400">
                {evidenceList.length} Attached
              </span>
            </div>

            {/* List of current evidence */}
            <div className="space-y-2">
              {evidenceList.map(ev => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="uppercase text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {ev.type}
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white truncate">
                      {ev.title}
                    </span>
                    <span className="text-slate-400 truncate max-w-[200px]">({ev.url})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveEvidence(ev.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new evidence row */}
            <div className="p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Evidence Title (e.g. Testbed Video)"
                  value={newEvidenceTitle}
                  onChange={(e) => setNewEvidenceTitle(e.target.value)}
                  className="p-2 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="url"
                  placeholder="URL link (Drive, YouTube, GitHub)"
                  value={newEvidenceUrl}
                  onChange={(e) => setNewEvidenceUrl(e.target.value)}
                  className="p-2 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <div className="flex gap-2">
                  <select
                    value={newEvidenceType}
                    onChange={(e) => setNewEvidenceType(e.target.value as EvidenceItem['type'])}
                    className="p-2 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white flex-1"
                  >
                    <option value="code">Code / Repo</option>
                    <option value="document">Document / PDF</option>
                    <option value="video">Video Demo</option>
                    <option value="photo">Photo / Circuit</option>
                    <option value="link">Interactive Web</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddEvidence}
                    className="px-3 py-2 text-xs font-semibold rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900 shrink-0"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
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
              Submit Project for Faculty Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
