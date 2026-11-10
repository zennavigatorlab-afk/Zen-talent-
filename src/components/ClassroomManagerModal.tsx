/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Classroom, TeacherProfile, Language } from '../types';
import { translations } from '../i18n';
import { School, X, Plus, KeyRound } from 'lucide-react';

interface ClassroomManagerModalProps {
  teachers: TeacherProfile[];
  schoolId: string;
  language: Language;
  onAddClassroom: (classroom: Omit<Classroom, 'id' | 'joining_code' | 'student_count'>) => void;
  onClose: () => void;
}

export const ClassroomManagerModal: React.FC<ClassroomManagerModalProps> = ({
  teachers,
  schoolId,
  language,
  onAddClassroom,
  onClose
}) => {
  const t = translations[language];

  const [standard, setStandard] = useState<number>(9);
  const [section, setSection] = useState<string>('C');
  const [academicYear, setAcademicYear] = useState<string>('2026-2027');
  const [classTeacherId, setClassTeacherId] = useState<string>(teachers[0]?.id || '');
  const [capacity, setCapacity] = useState<number>(45);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teachers.find(t => t.id === classTeacherId);

    onAddClassroom({
      school_id: schoolId,
      standard,
      section: section.trim().toUpperCase(),
      academic_year: academicYear,
      class_teacher_id: classTeacherId,
      class_teacher_name: teacher?.name || 'Assigned Teacher',
      assigned_teacher_ids: [classTeacherId],
      code_expires_at: '2026-12-31T23:59:59Z',
      code_active: true,
      max_capacity: capacity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-medium">
              <School className="w-4 h-4" />
              <span>Classroom Administration</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Add New Classroom Section
            </h2>
            <p className="text-xs text-slate-500">
              Classes 6 through 12, section letters or vocational streams (e.g. 9-C, 11-Vocational).
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Standard / Grade
              </label>
              <select
                value={standard}
                onChange={(e) => setStandard(Number(e.target.value))}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {[6, 7, 8, 9, 10, 11, 12].map(num => (
                  <option key={num} value={num}>Class {num}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Section / Stream
              </label>
              <input
                type="text"
                required
                placeholder="e.g. C or CS or Bio"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase font-bold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Designated Class Teacher
            </label>
            <select
              value={classTeacherId}
              onChange={(e) => setClassTeacherId(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {teachers.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.subject})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Max Student Capacity
              </label>
              <input
                type="number"
                min={20}
                max={60}
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Academic Year
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="p-3 bg-sky-50 dark:bg-sky-950/30 rounded-lg border border-sky-200 dark:border-sky-900/50 text-xs text-sky-800 dark:text-sky-300">
            A unique, secure 8-character joining code (e.g. TN-{standard}{section || 'A'}-XXXX) will automatically be generated and activated.
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
              Create Classroom & Generate Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
