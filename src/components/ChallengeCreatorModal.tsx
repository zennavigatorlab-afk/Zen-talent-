/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Challenge, Classroom, Language, RubricCriterion } from '../types';
import { translations } from '../i18n';
import { TALENT_CATEGORIES } from '../db/store';
import { Plus, X, Trash2, Award } from 'lucide-react';

interface ChallengeCreatorModalProps {
  teacherId: string;
  teacherName: string;
  classrooms: Classroom[];
  language: Language;
  onCreateChallenge: (challenge: Omit<Challenge, 'id' | 'submission_count' | 'created_at'>) => void;
  onClose: () => void;
}

export const ChallengeCreatorModal: React.FC<ChallengeCreatorModalProps> = ({
  teacherId,
  teacherName,
  classrooms,
  language,
  onCreateChallenge,
  onClose
}) => {
  const t = translations[language];

  const [title, setTitle] = useState('');
  const [titleTa, setTitleTa] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionTa, setDescriptionTa] = useState('');
  const [talentCategoryId, setTalentCategoryId] = useState(TALENT_CATEGORIES[0].id);
  const [difficulty, setDifficulty] = useState<Challenge['difficulty']>('Intermediate');
  const [selectedGrades, setSelectedGrades] = useState<number[]>([8, 9, 10]);
  const [deadline, setDeadline] = useState('2026-12-31');
  const [isTeamAllowed, setIsTeamAllowed] = useState(true);
  const [maxTeamSize, setMaxTeamSize] = useState(3);
  const [classroomId, setClassroomId] = useState<string>(''); // empty = school-wide

  const [rubric, setRubric] = useState<RubricCriterion[]>([
    { name: 'Problem Understanding & Civic Need', max_points: 25, description: 'Analysis of local challenges' },
    { name: 'Technical Execution & Prototyping', max_points: 30, description: 'Working hardware, code, or model' },
    { name: 'Practical Feasibility & Cost', max_points: 25, description: 'Realistic rural or school adoption' },
    { name: 'Documentation & Evidence', max_points: 20, description: 'Complete logs, photos, and reflections' }
  ]);

  const toggleGrade = (grade: number) => {
    if (selectedGrades.includes(grade)) {
      setSelectedGrades(selectedGrades.filter(g => g !== grade));
    } else {
      setSelectedGrades([...selectedGrades, grade]);
    }
  };

  const handleRubricChange = (idx: number, field: keyof RubricCriterion, val: string | number) => {
    const updated = [...rubric];
    updated[idx] = { ...updated[idx], [field]: val };
    setRubric(updated);
  };

  const addRubricCriterion = () => {
    setRubric([...rubric, { name: 'New Criterion', max_points: 20, description: 'Evaluation guidance' }]);
  };

  const removeRubricCriterion = (idx: number) => {
    setRubric(rubric.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onCreateChallenge({
      school_id: 'school-tn-01',
      classroom_id: classroomId || undefined,
      title: title.trim(),
      title_ta: titleTa.trim() || title.trim(),
      description: description.trim(),
      description_ta: descriptionTa.trim() || description.trim(),
      talent_category_id: talentCategoryId,
      difficulty,
      eligible_grades: selectedGrades.length > 0 ? selectedGrades : [6, 7, 8, 9, 10, 11, 12],
      deadline: new Date(deadline).toISOString(),
      rubric,
      is_team_allowed: isTeamAllowed,
      max_team_size: isTeamAllowed ? maxTeamSize : 1,
      created_by_teacher_id: teacherId,
      created_by_name: teacherName
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8 space-y-6">
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-medium">
              <Award className="w-4 h-4" />
              <span>Challenge Creator</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Create Practical School Challenge
            </h2>
            <p className="text-xs text-slate-500">
              Set clear objectives, eligible classes, and evaluation rubrics across the 10 talent pillars.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title EN & TA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Challenge Title (English)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Eco-Friendly Bio-Plastic from Coconut Coir"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                சவால் தலைப்பு (தமிழ்)
              </label>
              <input
                type="text"
                placeholder="எ.கா. தேங்காய் நாரில் இருந்து இயற்கை பிளாஸ்டிக்"
                value={titleTa}
                onChange={(e) => setTitleTa(e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Challenge Brief & Objectives
            </label>
            <textarea
              required
              rows={2}
              placeholder="Describe the expected task, evidence required (code, prototype, report), and real-world connection..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Category, Difficulty & Scope */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Talent Category
              </label>
              <select
                value={talentCategoryId}
                onChange={(e) => setTalentCategoryId(e.target.value)}
                className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {TALENT_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name_en}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Challenge['difficulty'])}
                className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Beginner">Beginner (Class 6-8)</option>
                <option value="Intermediate">Intermediate (Class 8-10)</option>
                <option value="Advanced">Advanced (Class 10-12)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Eligible Grades */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Eligible Classes
            </label>
            <div className="flex flex-wrap gap-2">
              {[6, 7, 8, 9, 10, 11, 12].map(g => {
                const active = selectedGrades.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGrade(g)}
                    className={`px-3 py-1 text-xs rounded font-medium border transition-colors ${
                      active
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Class {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rubric Definition */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Evaluation Rubrics ({rubric.reduce((a, b) => a + Number(b.max_points), 0)} Total Points)
              </label>
              <button
                type="button"
                onClick={addRubricCriterion}
                className="text-xs text-sky-600 hover:underline inline-flex items-center gap-1 font-medium"
              >
                <Plus className="w-3 h-3" />
                <span>Add Criterion</span>
              </button>
            </div>

            <div className="space-y-2">
              {rubric.map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={r.name}
                    onChange={(e) => handleRubricChange(i, 'name', e.target.value)}
                    className="p-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white flex-2"
                  />
                  <input
                    type="number"
                    min={5}
                    max={50}
                    value={r.max_points}
                    onChange={(e) => handleRubricChange(i, 'max_points', Number(e.target.value))}
                    className="w-16 p-1.5 text-xs text-center rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <span className="text-xs text-slate-400">pts</span>
                  {rubric.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRubricCriterion(i)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              {t.action_cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white"
            >
              Publish School Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
