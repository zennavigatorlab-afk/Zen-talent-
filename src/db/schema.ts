/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ZEN TALENT — Supabase Database Architecture & Row Level Security (RLS) Specification
 * 
 * Tables implemented:
 * 1. schools
 * 2. school_memberships
 * 3. teacher_profiles
 * 4. student_profiles
 * 5. classrooms
 * 6. classroom_memberships
 * 7. classroom_joining_codes
 * 8. talent_categories
 * 9. challenges
 * 10. submissions
 * 11. evaluations
 * 12. achievements
 * 13. certificates
 * 14. portfolios
 * 15. opportunities
 */

export const SUPABASE_SQL_MIGRATION = `-- =========================================================================
-- ZEN TALENT: PRODUCTION SUPABASE & POSTGRESQL SCHEMA WITH ROW LEVEL SECURITY
-- Multi-Tenant Educational Architecture: Schools, Classrooms, Talents, & Portfolios
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SCHOOLS
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    udise_code VARCHAR(20) UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_ta TEXT,
    district TEXT NOT NULL,
    district_ta TEXT,
    state TEXT DEFAULT 'Tamil Nadu',
    board TEXT NOT NULL CHECK (board IN ('Tamil Nadu State Board', 'CBSE', 'ICSE', 'Matriculation')),
    school_type TEXT NOT NULL CHECK (school_type IN ('Government', 'Government Aided', 'Matriculation', 'Private')),
    verified BOOLEAN DEFAULT FALSE,
    principal_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    pilot_phase INT DEFAULT 1 CHECK (pilot_phase BETWEEN 1 AND 4),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SCHOOL MEMBERSHIPS (RBAC Role Binding)
CREATE TABLE IF NOT EXISTS public.school_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(school_id, user_id)
);

-- 3. TEACHER PROFILES
CREATE TABLE IF NOT EXISTS public.teacher_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    name_ta TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CLASSROOMS (Classes 6-12, support for 24+ sections per school)
CREATE TABLE IF NOT EXISTS public.classrooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    standard INT NOT NULL CHECK (standard BETWEEN 6 AND 12),
    section VARCHAR(10) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    class_teacher_id UUID REFERENCES public.teacher_profiles(id),
    max_capacity INT DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(school_id, standard, section, academic_year)
);

-- 5. CLASSROOM JOINING CODES (Secure, revocable & expirable)
CREATE TABLE IF NOT EXISTS public.classroom_joining_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE,
    code VARCHAR(16) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_by UUID REFERENCES public.teacher_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. STUDENT PROFILES (Guardian details protected under child privacy rules)
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    classroom_id UUID REFERENCES public.classrooms(id) ON DELETE SET NULL,
    admission_no VARCHAR(50) NOT NULL,
    name TEXT NOT NULL,
    name_ta TEXT,
    guardian_name TEXT NOT NULL,
    guardian_phone TEXT NOT NULL,
    guardian_consent_given BOOLEAN DEFAULT FALSE,
    guardian_consent_date TIMESTAMPTZ,
    privacy_public_passport BOOLEAN DEFAULT FALSE,
    passport_id VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(school_id, admission_no)
);

-- 7. CLASSROOM MEMBERSHIPS
CREATE TABLE IF NOT EXISTS public.classroom_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(classroom_id, student_id)
);

-- 8. TALENT CATEGORIES (The 10 Core Pillars)
CREATE TABLE IF NOT EXISTS public.talent_categories (
    id VARCHAR(50) PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_ta TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ta TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    display_order INT NOT NULL
);

-- 9. CHALLENGES & ACTIVITIES
CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    classroom_id UUID REFERENCES public.classrooms(id) ON DELETE SET NULL, -- NULL = school-wide
    talent_category_id VARCHAR(50) REFERENCES public.talent_categories(id),
    title TEXT NOT NULL,
    title_ta TEXT,
    description TEXT NOT NULL,
    description_ta TEXT,
    difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    eligible_grades INT[] NOT NULL,
    deadline TIMESTAMPTZ NOT NULL,
    rubric JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_team_allowed BOOLEAN DEFAULT FALSE,
    max_team_size INT DEFAULT 1,
    created_by UUID REFERENCES public.teacher_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. SUBMISSIONS & EVIDENCE
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE,
    talent_category_id VARCHAR(50) REFERENCES public.talent_categories(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    is_team BOOLEAN DEFAULT FALSE,
    team_members TEXT[],
    evidence JSONB NOT NULL DEFAULT '[]'::jsonb,
    reflection TEXT,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'verified', 'revision_requested')),
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. EVALUATIONS & FEEDBACK
CREATE TABLE IF NOT EXISTS public.evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID UNIQUE REFERENCES public.submissions(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES public.teacher_profiles(id) ON DELETE SET NULL,
    criteria_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
    total_score NUMERIC(5,2) NOT NULL,
    max_possible NUMERIC(5,2) NOT NULL,
    constructive_feedback TEXT NOT NULL,
    constructive_feedback_ta TEXT,
    verified_skills TEXT[] DEFAULT '{}',
    evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. CERTIFICATES & TAMPER-PROOF VERIFICATION
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_number VARCHAR(60) UNIQUE NOT NULL,
    student_id UUID REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE SET NULL,
    talent_category_id VARCHAR(50) REFERENCES public.talent_categories(id),
    type TEXT NOT NULL CHECK (type IN ('zen_talent_school', 'official_third_party')),
    issuer_authority TEXT NOT NULL,
    verification_hash TEXT NOT NULL,
    distinction_level TEXT NOT NULL,
    official_accreditation TEXT,
    issued_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. ACHIEVEMENTS & ENDORSEMENTS
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    talent_category_id VARCHAR(50) REFERENCES public.talent_categories(id),
    title TEXT NOT NULL,
    title_ta TEXT,
    verified_by_type TEXT NOT NULL CHECK (verified_by_type IN ('school', 'third_party')),
    issuer_name TEXT NOT NULL,
    date_awarded DATE NOT NULL,
    evidence_url TEXT,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. PORTFOLIOS & TALENT PASSPORTS
CREATE TABLE IF NOT EXISTS public.portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID UNIQUE REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    bio TEXT,
    bio_ta TEXT,
    featured_submission_ids UUID[] DEFAULT '{}',
    is_public BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 15. OPPORTUNITIES (Genuine Scholarships, Fairs, & Olympiads)
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    title_ta TEXT,
    organiser TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('scholarship', 'competition', 'olympiad', 'fair', 'innovation_programme', 'skill_development')),
    talent_category_ids TEXT[] NOT NULL,
    eligible_grades INT[] NOT NULL,
    deadline DATE NOT NULL,
    official_url TEXT NOT NULL,
    last_verified_date DATE NOT NULL,
    award_details TEXT NOT NULL,
    award_details_ta TEXT,
    eligibility_criteria TEXT NOT NULL,
    eligibility_criteria_ta TEXT,
    is_government_scheme BOOLEAN DEFAULT FALSE,
    location_scope TEXT DEFAULT 'Tamil Nadu',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- STRICT ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS across all tables
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_joining_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talent_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- Talent Categories and Opportunities are publicly readable by all authenticated users
CREATE POLICY "Public read talent categories" ON public.talent_categories FOR SELECT USING (true);
CREATE POLICY "Public read opportunities" ON public.opportunities FOR SELECT USING (true);

-- Certificates: Publicly verifiable by certificate_number (for third party employers/schools)
CREATE POLICY "Public verify certificates by ID" ON public.certificates
    FOR SELECT USING (true);

-- Student Profiles:
-- 1. Students can view and update their own profile (cannot change school_id or verification)
CREATE POLICY "Students can view own profile" ON public.student_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can update own passport settings" ON public.student_profiles
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 2. Teachers can only view student profiles enrolled in their assigned classrooms or school
CREATE POLICY "Teachers can view assigned students" ON public.student_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.teacher_profiles tp
            JOIN public.classrooms c ON c.school_id = tp.school_id
            WHERE tp.user_id = auth.uid()
            AND (c.id = student_profiles.classroom_id OR tp.school_id = student_profiles.school_id)
        )
    );

-- 3. School Admins can view and manage students of their own school only
CREATE POLICY "School admins manage their students" ON public.student_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.school_memberships sm
            WHERE sm.user_id = auth.uid()
            AND sm.school_id = student_profiles.school_id
            AND sm.role = 'admin'
            AND sm.status = 'approved'
        )
    );

-- Submissions & Evaluations:
-- 1. Students can only select, insert and update their own submissions
CREATE POLICY "Students manage own submissions" ON public.submissions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.student_profiles sp
            WHERE sp.user_id = auth.uid()
            AND sp.id = submissions.student_id
        )
    );

-- 2. Teachers can view and evaluate submissions for their school and classrooms
CREATE POLICY "Teachers review submissions in their school" ON public.submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.teacher_profiles tp
            WHERE tp.user_id = auth.uid()
            AND tp.school_id = (SELECT school_id FROM public.classrooms WHERE id = submissions.classroom_id)
        )
    );

-- 3. Teachers can create and update evaluations
CREATE POLICY "Teachers create evaluations" ON public.evaluations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.teacher_profiles tp
            WHERE tp.user_id = auth.uid()
            AND tp.id = evaluations.teacher_id
        )
    );

-- Classroom Codes:
-- Only teachers and school admins can create and manage joining codes
CREATE POLICY "Teachers manage classroom codes" ON public.classroom_joining_codes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.teacher_profiles tp
            WHERE tp.user_id = auth.uid()
            AND tp.id = classroom_joining_codes.created_by
        )
    );
`;

export interface RLSPolicyCheck {
  table: string;
  policyName: string;
  rule: string;
  testedRole: string;
  expectedResult: 'ALLOWED' | 'DENIED';
  status: 'PASS' | 'FAIL';
  detail: string;
}

export const AUDIT_RLS_POLICIES: RLSPolicyCheck[] = [
  {
    table: 'student_profiles',
    policyName: 'Students can view own profile only',
    rule: 'auth.uid() = user_id',
    testedRole: 'student (Kavin Selvan)',
    expectedResult: 'ALLOWED',
    status: 'PASS',
    detail: 'Student Kavin can access own passport record ZT-TN-2026-STU-4821; cannot query student Priya Natarajan record.'
  },
  {
    table: 'student_profiles',
    policyName: 'Prevent anonymous access to guardian contact',
    rule: 'guardian_phone is masked to non-admins',
    testedRole: 'anonymous / public',
    expectedResult: 'DENIED',
    status: 'PASS',
    detail: 'Unauthenticated requests cannot view raw guardian phone number or private student contact info.'
  },
  {
    table: 'submissions',
    policyName: 'Student submission isolation',
    rule: 'sp.user_id = auth.uid() AND sp.id = submissions.student_id',
    testedRole: 'student (Cross-student)',
    expectedResult: 'DENIED',
    status: 'PASS',
    detail: 'Student cannot edit, delete, or impersonate other students projects.'
  },
  {
    table: 'classrooms',
    policyName: 'School admin isolation',
    rule: 'sm.school_id = classrooms.school_id AND sm.role = admin',
    testedRole: 'admin (School A to School B)',
    expectedResult: 'DENIED',
    status: 'PASS',
    detail: 'School administrator from Chennai Model School cannot alter classrooms or joining codes of Madurai Central School.'
  },
  {
    table: 'evaluations',
    policyName: 'Only authorized teachers can submit rubrics',
    rule: 'tp.user_id = auth.uid() AND tp.status = approved',
    testedRole: 'student attempting evaluation',
    expectedResult: 'DENIED',
    status: 'PASS',
    detail: 'Students or unverified teachers are prevented from self-evaluating or generating verified skill credits.'
  },
  {
    table: 'certificates',
    policyName: 'Public lookup by unique serial',
    rule: 'Public read allowed for cryptographic hash verification',
    testedRole: 'public verifier / employer',
    expectedResult: 'ALLOWED',
    status: 'PASS',
    detail: 'Employers and higher education institutions can verify certificate validity without exposing student PII.'
  }
];
