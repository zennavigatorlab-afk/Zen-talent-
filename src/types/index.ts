/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'admin' | 'teacher' | 'student' | 'public_verifier';

export type Language = 'en' | 'ta';

export interface TalentCategory {
  id: string;
  name_en: string;
  name_ta: string;
  description_en: string;
  description_ta: string;
  iconName: string;
  color: string;
  sampleSkills: string[];
}

export interface School {
  id: string;
  udise_code: string;
  name: string;
  name_ta: string;
  district: string;
  district_ta: string;
  state: string;
  board: 'Tamil Nadu State Board' | 'CBSE' | 'ICSE' | 'Matriculation';
  school_type: 'Government' | 'Government Aided' | 'Matriculation' | 'Private';
  verified: boolean;
  principal_name: string;
  email: string;
  phone: string;
  pilot_phase: 1 | 2 | 3 | 4;
  created_at: string;
}

export interface Classroom {
  id: string;
  school_id: string;
  standard: number; // 6 to 12
  section: string; // 'A', 'B', 'CS', 'Bio', etc.
  academic_year: string;
  class_teacher_id: string;
  class_teacher_name: string;
  assigned_teacher_ids: string[];
  joining_code: string;
  code_expires_at: string;
  code_active: boolean;
  max_capacity: number;
  student_count: number;
}

export interface TeacherProfile {
  id: string;
  school_id: string;
  name: string;
  name_ta?: string;
  email: string;
  subject: string;
  subject_ta?: string;
  status: 'approved' | 'pending' | 'rejected';
  assigned_classroom_ids: string[];
  phone: string;
  created_at: string;
}

export interface StudentProfile {
  id: string;
  school_id: string;
  school_name: string;
  classroom_id: string;
  standard: number;
  section: string;
  admission_no: string;
  name: string;
  name_ta?: string;
  guardian_name: string;
  guardian_phone: string; // masked in UI for child privacy
  guardian_consent_given: boolean;
  guardian_consent_date: string;
  privacy_public_passport: boolean;
  passport_id: string; // e.g. ZT-TN-2026-STU-4821
  created_at: string;
}

export interface ClassroomMembership {
  id: string;
  classroom_id: string;
  student_id: string;
  student_name: string;
  admission_no: string;
  status: 'approved' | 'pending' | 'rejected';
  enrolled_at: string;
}

export interface RubricCriterion {
  name: string;
  name_ta?: string;
  max_points: number;
  description: string;
}

export interface Challenge {
  id: string;
  school_id: string;
  classroom_id?: string; // empty means school-wide
  title: string;
  title_ta: string;
  description: string;
  description_ta: string;
  talent_category_id: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  eligible_grades: number[]; // e.g. [6, 7, 8] or [9, 10, 11, 12]
  deadline: string;
  rubric: RubricCriterion[];
  is_team_allowed: boolean;
  max_team_size: number;
  created_by_teacher_id: string;
  created_by_name: string;
  submission_count: number;
  created_at: string;
}

export interface EvidenceItem {
  id: string;
  type: 'document' | 'video' | 'link' | 'code' | 'photo';
  title: string;
  url: string;
  notes?: string;
}

export interface Submission {
  id: string;
  challenge_id: string;
  challenge_title: string;
  student_id: string;
  student_name: string;
  classroom_id: string;
  talent_category_id: string;
  title: string;
  description: string;
  is_team: boolean;
  team_members?: string[];
  evidence: EvidenceItem[];
  reflection: string;
  status: 'submitted' | 'under_review' | 'verified' | 'revision_requested';
  submitted_at: string;
  evaluation?: Evaluation;
}

export interface Evaluation {
  id: string;
  submission_id: string;
  teacher_id: string;
  teacher_name: string;
  criteria_scores: { [criterionName: string]: number };
  total_score: number;
  max_possible: number;
  constructive_feedback: string;
  constructive_feedback_ta?: string;
  verified_skills: string[];
  certificate_id?: string;
  evaluated_at: string;
}

export interface Certificate {
  id: string;
  certificate_number: string; // e.g. CERT-ZT-2026-9842
  student_id: string;
  student_name: string;
  school_id: string;
  school_name: string;
  challenge_id: string;
  challenge_title: string;
  talent_category_id: string;
  talent_category_name: string;
  type: 'zen_talent_school' | 'official_third_party';
  issuer_authority: string;
  verification_hash: string;
  issued_at: string;
  distinction_level: 'Excellence' | 'Innovation' | 'Merit' | 'Participation';
  official_accreditation?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  title_ta: string;
  organiser: string;
  type: 'scholarship' | 'competition' | 'olympiad' | 'fair' | 'innovation_programme' | 'skill_development';
  talent_category_ids: string[];
  eligible_grades: number[];
  deadline: string;
  official_url: string;
  last_verified_date: string;
  award_details: string;
  award_details_ta: string;
  eligibility_criteria: string;
  eligibility_criteria_ta: string;
  is_government_scheme: boolean;
  location_scope: 'Tamil Nadu' | 'National (India)' | 'International';
}

export interface TalentAssessmentQuestion {
  id: string;
  category_id: string;
  question_en: string;
  question_ta: string;
  options: {
    label_en: string;
    label_ta: string;
    points: number;
    skill_indicator: string;
  }[];
}
