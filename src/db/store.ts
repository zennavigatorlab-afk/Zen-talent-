/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  School,
  Classroom,
  TeacherProfile,
  StudentProfile,
  TalentCategory,
  Challenge,
  Submission,
  Evaluation,
  Certificate,
  Opportunity,
  ClassroomMembership,
  TalentAssessmentQuestion
} from '../types';

export const TALENT_CATEGORIES: TalentCategory[] = [
  {
    id: 'science_research',
    name_en: 'Science & Research',
    name_ta: 'அறிவியல் & ஆராய்ச்சி',
    description_en: 'Scientific inquiry, laboratory experimentation, environmental observation, and data-driven hypothesising.',
    description_ta: 'அறிவியல் ஆய்வு, ஆய்வக பரிசோதனைகள், சுற்றுச்சூழல் கவனிப்பு மற்றும் தரவு சார்ந்த அனுமானங்கள்.',
    iconName: 'Microscope',
    color: '#0284c7', // Sky-600
    sampleSkills: ['Experimental Design', 'Environmental Science', 'Data Analysis', 'Hypothesis Testing']
  },
  {
    id: 'tech_coding_ai',
    name_en: 'Technology, Coding & AI',
    name_ta: 'தொழில்நுட்பம், நிரலாக்கம் & AI',
    description_en: 'Algorithm design, software development, robotics, electronics, IoT hardware, and artificial intelligence.',
    description_ta: 'அல்காரிதம் வடிவமைப்பு, மென்பொருள் மேம்பாடு, ரோபாட்டிக்ஸ், எலக்ட்ரானிக்ஸ் மற்றும் செயற்கை நுண்ணறிவு.',
    iconName: 'Code',
    color: '#2563eb', // Blue-600
    sampleSkills: ['Python & JavaScript', 'Robotics & Microcontrollers', 'App Building', 'Machine Learning Basics']
  },
  {
    id: 'math_logical',
    name_en: 'Mathematics & Logical Thinking',
    name_ta: 'கணிதம் & தர்க்க சிந்தனை',
    description_en: 'Mathematical modelling, combinatorial puzzles, pattern recognition, strategic games, and rigorous logic.',
    description_ta: 'கணித மாதிரிகள், புதிர்கள் தீர்வு, அமைப்பு அங்கீகாரம், உத்தி விளையாட்டுகள் மற்றும் தர்க்க சிந்தனை.',
    iconName: 'Binary',
    color: '#7c3aed', // Violet-600
    sampleSkills: ['Number Theory', 'Logical Deduction', 'Geometry & Origami', 'Algorithmic Problem Solving']
  },
  {
    id: 'innovation_entrepreneurship',
    name_en: 'Innovation & Entrepreneurship',
    name_ta: 'புதுமை & தொழில்முனைவு',
    description_en: 'Identifying market and civic needs, frugal prototyping, resource budgeting, and pitch communication.',
    description_ta: 'சந்தை மற்றும் சமூக தேவைகளை அறிதல், மாதிரி தயாரிப்பு, வள மேலாண்மை மற்றும் விளக்கக்காட்சி.',
    iconName: 'Lightbulb',
    color: '#d97706', // Amber-600
    sampleSkills: ['Frugal Engineering', 'Business Model Canvas', 'Design Thinking', 'Pitch Presentation']
  },
  {
    id: 'arts_music_creativity',
    name_en: 'Arts, Music & Creativity',
    name_ta: 'கலை, இசை & படைப்பாற்றல்',
    description_en: 'Visual arts, traditional and contemporary music, animation, design, filmmaking, and aesthetic expression.',
    description_ta: 'காட்சிக் கலைகள், மரபு மற்றும் நவீன இசை, அனிமேஷன், வடிவமைப்பு, திரைப்பட உருவாக்கம்.',
    iconName: 'Palette',
    color: '#db2777', // Pink-600
    sampleSkills: ['Carnatic & Folk Music', 'Digital Illustration', 'Visual Storytelling', 'Sculpting & Crafts']
  },
  {
    id: 'sports_physical',
    name_en: 'Sports & Physical Skills',
    name_ta: 'விளையாட்டு & உடல்திறன்',
    description_en: 'Athletics, Silambam, Kabaddi, badminton, chess, endurance, spatial coordination, and sportsmanship.',
    description_ta: 'தடகளம், சிலம்பம், கபடி, பூப்பந்து, சதுரங்கம், உடல் சகிப்புத்தன்மை மற்றும் விளையாட்டு ஒழுக்கம்.',
    iconName: 'Trophy',
    color: '#16a34a', // Emerald-600
    sampleSkills: ['Silambam Martial Arts', 'Endurance Training', 'Tactical Sports Coordination', 'Team Strategy']
  },
  {
    id: 'communication_languages',
    name_en: 'Communication & Languages',
    name_ta: 'தொடர்பாடல் & மொழிகள்',
    description_en: 'Debate, creative writing in Tamil & English, public speaking, poetry, translation, and media journalism.',
    description_ta: 'விவாதம், தமிழ் மற்றும் ஆங்கிலத்தில் படைப்பிலக்கியம், மேடைப்பேச்சு, கவிதை மற்றும் மொழிபெயர்ப்பு.',
    iconName: 'MessageSquare',
    color: '#0d9488', // Teal-600
    sampleSkills: ['Tamil Kavithai & Oratory', 'Bilingual Translation', 'Podcasting & Interviewing', 'Technical Writing']
  },
  {
    id: 'leadership_teamwork',
    name_en: 'Leadership & Teamwork',
    name_ta: 'தலைமைத்துவம் & குழுப்பணி',
    description_en: 'Peer mentorship, team facilitation, conflict resolution, project management, and collective organisation.',
    description_ta: 'சக மாணவர் வழிகாட்டுதல், குழு ஒருங்கமைவு, திட்ட மேலாண்மை மற்றும் கூட்டுப்பணி.',
    iconName: 'Users',
    color: '#4f46e5', // Indigo-600
    sampleSkills: ['Delegation & Planning', 'Peer Mentoring', 'Consensus Building', 'Event Coordination']
  },
  {
    id: 'social_problem_solving',
    name_en: 'Social Problem-Solving',
    name_ta: 'சமூக பிரச்சனை தீர்வு',
    description_en: 'Community service, ecological conservation, civic accessibility, rural development, and social advocacy.',
    description_ta: 'சமூக சேவை, சுற்றுச்சூழல் பாதுகாப்பு, கிராமப்புற வளர்ச்சி மற்றும் பொதுநல திட்டங்கள்.',
    iconName: 'HeartHandshake',
    color: '#ea580c', // Orange-600
    sampleSkills: ['Water Conservation Audits', 'E-Waste Awareness', 'Rural Accessibility Solutions', 'Civic Action']
  },
  {
    id: 'practical_technical',
    name_en: 'Practical & Technical Skills',
    name_ta: 'நடைமுறை & தொழிற்திறன்கள்',
    description_en: 'Woodworking, electrical wiring, mechanical repairs, agricultural cultivation, and artisanal fabrication.',
    description_ta: 'மரவேலைப்பாடு, மின்சார இணைப்புகள், இயந்திர பழுதுபார்த்தல், வேளாண்மை மற்றும் கைவினைப் பணிகள்.',
    iconName: 'Wrench',
    color: '#475569', // Slate-600
    sampleSkills: ['Solar Panel Assembly', 'Organic Farming Techniques', 'Circuit Soldering', 'Carpentry & Modeling']
  }
];

export const INITIAL_SCHOOL: School = {
  id: 'school-tn-01',
  udise_code: '33020701501',
  name: 'Government Model Higher Secondary School, Anna Nagar',
  name_ta: 'அரசு மாதிரி மேல்நிலைப் பள்ளி, அண்ணா நகர்',
  district: 'Chennai',
  district_ta: 'சென்னை',
  state: 'Tamil Nadu',
  board: 'Tamil Nadu State Board',
  school_type: 'Government',
  verified: true,
  principal_name: 'Dr. S. Kulanthaivelu, M.Sc., M.Ed., Ph.D.',
  email: 'principal.annagarmodel@tnschools.gov.in',
  phone: '+91 44 2621 4489',
  pilot_phase: 1,
  created_at: '2026-01-10T09:00:00Z'
};

export const INITIAL_PILOT_DISTRICTS = [
  { name: 'Chennai', name_ta: 'சென்னை', schoolsCount: 12, studentsCount: 4850, phase: 'Phase 1 Active' },
  { name: 'Coimbatore', name_ta: 'கோயம்புத்தூர்', schoolsCount: 8, studentsCount: 3120, phase: 'Phase 1 Active' },
  { name: 'Madurai', name_ta: 'மதுரை', schoolsCount: 9, studentsCount: 3640, phase: 'Phase 1 Active' },
  { name: 'Tiruchirappalli', name_ta: 'திருச்சிராப்பள்ளி', schoolsCount: 6, studentsCount: 2200, phase: 'Phase 2 Pilot' },
  { name: 'Salem', name_ta: 'சேலம்', schoolsCount: 5, studentsCount: 1950, phase: 'Phase 2 Pilot' },
  { name: 'Tirunelveli', name_ta: 'திருநெல்வேலி', schoolsCount: 5, studentsCount: 1800, phase: 'Phase 2 Pilot' },
  { name: 'Thanjavur', name_ta: 'தஞ்சாவூர்', schoolsCount: 4, studentsCount: 1540, phase: 'Phase 2 Pilot' },
  { name: 'Vellore', name_ta: 'வேலூர்', schoolsCount: 4, studentsCount: 1420, phase: 'Phase 2 Pilot' },
  { name: 'Kanchipuram', name_ta: 'காஞ்சிபுரம்', schoolsCount: 4, studentsCount: 1390, phase: 'Phase 2 Pilot' }
];

export const INITIAL_TEACHERS: TeacherProfile[] = [
  {
    id: 'teacher-01',
    school_id: 'school-tn-01',
    name: 'Mrs. Sundari Ramanathan',
    name_ta: 'திருமதி சுந்தரி ராமநாதன்',
    email: 'sundari.r@tnschools.gov.in',
    subject: 'Computer Science & STEM',
    subject_ta: 'கணினி அறிவியல் & அறிவியல்',
    status: 'approved',
    assigned_classroom_ids: ['class-9A', 'class-10A', 'class-11CS'],
    phone: '+91 98401 23456',
    created_at: '2026-01-15T08:00:00Z'
  },
  {
    id: 'teacher-02',
    school_id: 'school-tn-01',
    name: 'Mr. A. Venkatesan',
    name_ta: 'திரு ஏ. வெங்கடேசன்',
    email: 'venkatesan.a@tnschools.gov.in',
    subject: 'Tamil Literature & Creative Arts',
    subject_ta: 'தமிழ் இலக்கியம் & கலை',
    status: 'approved',
    assigned_classroom_ids: ['class-8A', 'class-9A', 'class-9B'],
    phone: '+91 94440 98765',
    created_at: '2026-01-15T08:30:00Z'
  },
  {
    id: 'teacher-03',
    school_id: 'school-tn-01',
    name: 'Dr. Priya Chandran',
    name_ta: 'முனைவர் பிரியா சந்திரன்',
    email: 'priya.c@tnschools.gov.in',
    subject: 'Physical Sciences & Atal Tinkering Lab Mentor',
    subject_ta: 'இயற்பியல் & ATL வழிகாட்டி',
    status: 'approved',
    assigned_classroom_ids: ['class-9B', 'class-10B', 'class-12Bio'],
    phone: '+91 97910 11223',
    created_at: '2026-01-18T09:00:00Z'
  },
  {
    id: 'teacher-04',
    school_id: 'school-tn-01',
    name: 'Coach R. Karthik',
    name_ta: 'பயிற்சியாளர் ஆர். கார்த்திக்',
    email: 'karthik.r@tnschools.gov.in',
    subject: 'Physical Education & Traditional Sports',
    subject_ta: 'உடற்கல்வி & பாரம்பரிய விளையாட்டுகள்',
    status: 'approved',
    assigned_classroom_ids: ['class-6A', 'class-7A', 'class-9A'],
    phone: '+91 98840 55443',
    created_at: '2026-01-20T10:00:00Z'
  }
];

export const INITIAL_CLASSROOMS: Classroom[] = [
  // Class 6
  {
    id: 'class-6A',
    school_id: 'school-tn-01',
    standard: 6,
    section: 'A',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-04',
    class_teacher_name: 'Coach R. Karthik',
    assigned_teacher_ids: ['teacher-04'],
    joining_code: 'TN-6A-7821',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 45,
    student_count: 38
  },
  {
    id: 'class-6B',
    school_id: 'school-tn-01',
    standard: 6,
    section: 'B',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-02',
    class_teacher_name: 'Mr. A. Venkatesan',
    assigned_teacher_ids: ['teacher-02'],
    joining_code: 'TN-6B-4190',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 45,
    student_count: 36
  },
  // Class 7
  {
    id: 'class-7A',
    school_id: 'school-tn-01',
    standard: 7,
    section: 'A',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-04',
    class_teacher_name: 'Coach R. Karthik',
    assigned_teacher_ids: ['teacher-04'],
    joining_code: 'TN-7A-5529',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 45,
    student_count: 40
  },
  {
    id: 'class-7B',
    school_id: 'school-tn-01',
    standard: 7,
    section: 'B',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-02',
    class_teacher_name: 'Mr. A. Venkatesan',
    assigned_teacher_ids: ['teacher-02'],
    joining_code: 'TN-7B-8102',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 45,
    student_count: 39
  },
  // Class 8
  {
    id: 'class-8A',
    school_id: 'school-tn-01',
    standard: 8,
    section: 'A',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-02',
    class_teacher_name: 'Mr. A. Venkatesan',
    assigned_teacher_ids: ['teacher-02'],
    joining_code: 'TN-8A-9321',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 45,
    student_count: 42
  },
  {
    id: 'class-8B',
    school_id: 'school-tn-01',
    standard: 8,
    section: 'B',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-03',
    class_teacher_name: 'Dr. Priya Chandran',
    assigned_teacher_ids: ['teacher-03'],
    joining_code: 'TN-8B-3419',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 45,
    student_count: 41
  },
  // Class 9 (Focus classroom)
  {
    id: 'class-9A',
    school_id: 'school-tn-01',
    standard: 9,
    section: 'A',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-01',
    class_teacher_name: 'Mrs. Sundari Ramanathan',
    assigned_teacher_ids: ['teacher-01', 'teacher-02', 'teacher-04'],
    joining_code: 'TN-9A-4819',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 45,
    student_count: 43
  },
  {
    id: 'class-9B',
    school_id: 'school-tn-01',
    standard: 9,
    section: 'B',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-03',
    class_teacher_name: 'Dr. Priya Chandran',
    assigned_teacher_ids: ['teacher-03', 'teacher-02'],
    joining_code: 'TN-9B-6712',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 45,
    student_count: 40
  },
  // Class 10
  {
    id: 'class-10A',
    school_id: 'school-tn-01',
    standard: 10,
    section: 'A',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-01',
    class_teacher_name: 'Mrs. Sundari Ramanathan',
    assigned_teacher_ids: ['teacher-01'],
    joining_code: 'TN-10A-1102',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 45,
    student_count: 44
  },
  {
    id: 'class-10B',
    school_id: 'school-tn-01',
    standard: 10,
    section: 'B',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-03',
    class_teacher_name: 'Dr. Priya Chandran',
    assigned_teacher_ids: ['teacher-03'],
    joining_code: 'TN-10B-2294',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 45,
    student_count: 42
  },
  // Class 11
  {
    id: 'class-11CS',
    school_id: 'school-tn-01',
    standard: 11,
    section: 'CS (Computer Science)',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-01',
    class_teacher_name: 'Mrs. Sundari Ramanathan',
    assigned_teacher_ids: ['teacher-01', 'teacher-03'],
    joining_code: 'TN-11CS-9014',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 40,
    student_count: 36
  },
  {
    id: 'class-11Bio',
    school_id: 'school-tn-01',
    standard: 11,
    section: 'Bio (Biology & Maths)',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-03',
    class_teacher_name: 'Dr. Priya Chandran',
    assigned_teacher_ids: ['teacher-03'],
    joining_code: 'TN-11BIO-8342',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 40,
    student_count: 38
  },
  // Class 12
  {
    id: 'class-12CS',
    school_id: 'school-tn-01',
    standard: 12,
    section: 'CS (Computer Science)',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-01',
    class_teacher_name: 'Mrs. Sundari Ramanathan',
    assigned_teacher_ids: ['teacher-01'],
    joining_code: 'TN-12CS-7651',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 40,
    student_count: 35
  },
  {
    id: 'class-12Bio',
    school_id: 'school-tn-01',
    standard: 12,
    section: 'Bio (Biology & Maths)',
    academic_year: '2026-2027',
    class_teacher_id: 'teacher-03',
    class_teacher_name: 'Dr. Priya Chandran',
    assigned_teacher_ids: ['teacher-03'],
    joining_code: 'TN-12BIO-4412',
    code_expires_at: '2026-12-31T23:59:59Z',
    code_active: true,
    max_capacity: 40,
    student_count: 37
  }
];

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'student-01',
    school_id: 'school-tn-01',
    school_name: 'Government Model Higher Secondary School, Anna Nagar',
    classroom_id: 'class-9A',
    standard: 9,
    section: 'A',
    admission_no: 'TN-2026-0914',
    name: 'Kavin Selvan',
    name_ta: 'கவின் செல்வன்',
    guardian_name: 'Mr. R. Selvanathan',
    guardian_phone: '+91 9840X XXX82', // Masked for privacy
    guardian_consent_given: true,
    guardian_consent_date: '2026-01-20T11:00:00Z',
    privacy_public_passport: true,
    passport_id: 'ZT-TN-2026-STU-4821',
    created_at: '2026-01-20T11:00:00Z'
  },
  {
    id: 'student-02',
    school_id: 'school-tn-01',
    school_name: 'Government Model Higher Secondary School, Anna Nagar',
    classroom_id: 'class-9A',
    standard: 9,
    section: 'A',
    admission_no: 'TN-2026-0922',
    name: 'Priya Natarajan',
    name_ta: 'பிரியா நடராஜன்',
    guardian_name: 'Mrs. V. Natarajan',
    guardian_phone: '+91 9444X XXX19',
    guardian_consent_given: true,
    guardian_consent_date: '2026-01-21T10:15:00Z',
    privacy_public_passport: true,
    passport_id: 'ZT-TN-2026-STU-4822',
    created_at: '2026-01-21T10:15:00Z'
  },
  {
    id: 'student-03',
    school_id: 'school-tn-01',
    school_name: 'Government Model Higher Secondary School, Anna Nagar',
    classroom_id: 'class-9A',
    standard: 9,
    section: 'A',
    admission_no: 'TN-2026-0935',
    name: 'Vignesh Balaji',
    name_ta: 'விக்னேஷ் பாலாஜி',
    guardian_name: 'Mr. S. Balaji',
    guardian_phone: '+91 9790X XXX54',
    guardian_consent_given: true,
    guardian_consent_date: '2026-01-22T09:30:00Z',
    privacy_public_passport: false,
    passport_id: 'ZT-TN-2026-STU-4823',
    created_at: '2026-01-22T09:30:00Z'
  },
  {
    id: 'student-04',
    school_id: 'school-tn-01',
    school_name: 'Government Model Higher Secondary School, Anna Nagar',
    classroom_id: 'class-9A',
    standard: 9,
    section: 'A',
    admission_no: 'TN-2026-0941',
    name: 'Keerthana Meenakshi',
    name_ta: 'கீர்த்தனா மீனாட்சி',
    guardian_name: 'Mrs. M. Sundararajan',
    guardian_phone: '+91 9884X XXX90',
    guardian_consent_given: true,
    guardian_consent_date: '2026-01-22T14:00:00Z',
    privacy_public_passport: true,
    passport_id: 'ZT-TN-2026-STU-4824',
    created_at: '2026-01-22T14:00:00Z'
  }
];

export const INITIAL_MEMBERSHIPS: ClassroomMembership[] = [
  {
    id: 'mem-01',
    classroom_id: 'class-9A',
    student_id: 'student-01',
    student_name: 'Kavin Selvan',
    admission_no: 'TN-2026-0914',
    status: 'approved',
    enrolled_at: '2026-01-20T11:00:00Z'
  },
  {
    id: 'mem-02',
    classroom_id: 'class-9A',
    student_id: 'student-02',
    student_name: 'Priya Natarajan',
    admission_no: 'TN-2026-0922',
    status: 'approved',
    enrolled_at: '2026-01-21T10:15:00Z'
  },
  {
    id: 'mem-03',
    classroom_id: 'class-9A',
    student_id: 'student-03',
    student_name: 'Vignesh Balaji',
    admission_no: 'TN-2026-0935',
    status: 'approved',
    enrolled_at: '2026-01-22T09:30:00Z'
  },
  {
    id: 'mem-04',
    classroom_id: 'class-9A',
    student_id: 'student-04',
    student_name: 'Keerthana Meenakshi',
    admission_no: 'TN-2026-0941',
    status: 'pending',
    enrolled_at: '2026-02-01T08:00:00Z'
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'chal-01',
    school_id: 'school-tn-01',
    classroom_id: 'class-9A',
    title: 'Smart Soil & Irrigation Monitor for Thanjavur Delta Farms',
    title_ta: 'தஞ்சை டெல்டா விவசாயத்திற்கான ஸ்மார்ட் மண் மற்றும் நீர்ப்பாசன கருவி',
    description: 'Design a low-cost IoT sensor prototype or algorithmic simulator that helps local farmers prevent water wastage and measure soil moisture in paddy cultivation.',
    description_ta: 'குறைந்த விலையிலான IoT உணரி அல்லது கணினி மாதிரி மூலம் நெல் விவசாயத்தில் நீர் விரயத்தைத் தடுத்து மண் ஈரப்பதத்தைக் கணக்கிடும் செயல்முறை.',
    talent_category_id: 'tech_coding_ai',
    difficulty: 'Intermediate',
    eligible_grades: [8, 9, 10, 11, 12],
    deadline: '2026-11-30T23:59:59Z',
    rubric: [
      { name: 'Problem Understanding & Civic Empathy', name_ta: 'பிரச்சனை புரிதல் மற்றும் சமூக அக்கறை', max_points: 25, description: 'Clear analysis of farmer pain points and water scarcity in Tamil Nadu.' },
      { name: 'Technical Execution & Prototyping', name_ta: 'தொழில்நுட்ப செயல்பாடு மற்றும் மாதிரி தயாரிப்பு', max_points: 30, description: 'Working code, hardware schematic, or interactive simulation.' },
      { name: 'Cost Effectiveness & Practical Feasibility', name_ta: 'சிக்கன செலவு மற்றும் நடைமுறை சாத்தியக்கூறு', max_points: 25, description: 'Can this realistically be adopted in a rural agricultural cluster?' },
      { name: 'Documentation & Evidence Presentation', name_ta: 'ஆவணப்படுத்தல் மற்றும் சான்றுகள்', max_points: 20, description: 'Thorough project report, photos/diagrams, and self-reflection.' }
    ],
    is_team_allowed: true,
    max_team_size: 3,
    created_by_teacher_id: 'teacher-01',
    created_by_name: 'Mrs. Sundari Ramanathan',
    submission_count: 5,
    created_at: '2026-02-01T09:00:00Z'
  },
  {
    id: 'chal-02',
    school_id: 'school-tn-01',
    title: 'Biodiversity & Heritage Tree Mapping in Anna Nagar',
    title_ta: 'அண்ணா நகர் பாரம்பரிய மரங்கள் மற்றும் பல்லுயிர் வரைபட உருவாக்கம்',
    description: 'Conduct a field survey documenting 10 local botanical species, estimate carbon sequestration, and prepare an interactive botanical field guide for the community.',
    description_ta: 'உள்ளூர் 10 தாவர வகைகளை கள ஆய்வு செய்து, கார்பன் சேமிப்பை மதிப்பீடு செய்து மக்களுக்கான தாவர வழிகாட்டியை உருவாக்குதல்.',
    talent_category_id: 'science_research',
    difficulty: 'Beginner',
    eligible_grades: [6, 7, 8, 9],
    deadline: '2026-12-15T23:59:59Z',
    rubric: [
      { name: 'Scientific Accuracy & Identification', max_points: 30, description: 'Botanical taxonomy, leaf morphology, and native status.' },
      { name: 'Field Observation & Data Gathering', max_points: 30, description: 'Geolocation, height estimation, and health diagnostics.' },
      { name: 'Community Utility & Conservation Reflection', max_points: 40, description: 'Conservation recommendations presented to neighborhood welfare group.' }
    ],
    is_team_allowed: true,
    max_team_size: 4,
    created_by_teacher_id: 'teacher-03',
    created_by_name: 'Dr. Priya Chandran',
    submission_count: 3,
    created_at: '2026-02-05T10:00:00Z'
  },
  {
    id: 'chal-03',
    school_id: 'school-tn-01',
    title: 'Ramanujan Mathematical Sequence & Tessellation Discovery',
    title_ta: 'ராமானுஜன் எண் வரிசைகள் மற்றும் வடிவியல் கோலக் கட்டமைப்பு',
    description: 'Investigate mathematical patterns inspired by Srinivasa Ramanujan mock theta functions or traditional Tamil Kolam symmetry using computational geometry.',
    description_ta: 'ஸ்ரீனிவாச ராமானுஜனின் கணித அமைப்புகள் அல்லது பாரம்பரிய தமிழ் கோலங்களின் வடிவியல் சமச்சீர் தன்மையை ஆய்வு செய்தல்.',
    talent_category_id: 'math_logical',
    difficulty: 'Advanced',
    eligible_grades: [9, 10, 11, 12],
    deadline: '2026-12-22T23:59:59Z',
    rubric: [
      { name: 'Mathematical Rigour & Proof', max_points: 35, description: 'Correct formula derivation and pattern identification.' },
      { name: 'Creative Geometric Visualisation', max_points: 35, description: 'Visual elegance and symmetry classification.' },
      { name: 'Analytical Clarity', max_points: 30, description: 'Clear presentation of findings.' }
    ],
    is_team_allowed: false,
    max_team_size: 1,
    created_by_teacher_id: 'teacher-01',
    created_by_name: 'Mrs. Sundari Ramanathan',
    submission_count: 2,
    created_at: '2026-02-10T11:00:00Z'
  },
  {
    id: 'chal-04',
    school_id: 'school-tn-01',
    title: 'Kavithai & Tamil Folk Storytelling Audio Docuseries',
    title_ta: 'தமிழ் நாட்டுப்புற கதைசொல்லல் & கவிதை ஆவண ஒலிப்பேழை',
    description: 'Record an audio docuseries interviewing elderly community artisans or narrating classical Sangam Tamil poetry in contemporary idioms for youth.',
    description_ta: 'பாரம்பரிய கைவினைஞர்களை பேட்டி கண்டு அல்லது சங்க கால கவிதைகளை இன்றைய இளைஞர்களுக்கான நடையில் ஒலிப்பேழையாக உருவாக்குதல்.',
    talent_category_id: 'communication_languages',
    difficulty: 'Intermediate',
    eligible_grades: [7, 8, 9, 10, 11, 12],
    deadline: '2026-12-28T23:59:59Z',
    rubric: [
      { name: 'Linguistic Artistry & Pronunciation', max_points: 35, description: 'Depth of Tamil vocabulary, poetic meter, and vocal clarity.' },
      { name: 'Cultural Research & Authenticity', max_points: 35, description: 'Historical context and oral history preservation.' },
      { name: 'Audio Production & Delivery', max_points: 30, description: 'Sound balance, pacing, and emotional engagement.' }
    ],
    is_team_allowed: true,
    max_team_size: 2,
    created_by_teacher_id: 'teacher-02',
    created_by_name: 'Mr. A. Venkatesan',
    submission_count: 4,
    created_at: '2026-02-12T14:30:00Z'
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-01',
    challenge_id: 'chal-01',
    challenge_title: 'Smart Soil & Irrigation Monitor for Thanjavur Delta Farms',
    student_id: 'student-01',
    student_name: 'Kavin Selvan',
    classroom_id: 'class-9A',
    talent_category_id: 'tech_coding_ai',
    title: 'Automated Soil Moisture Sensor using Arduino & LoRa for Paddy Fields',
    description: 'Built a solar-powered soil moisture telemetry node tested on a rooftop testbed. The system reads capacitive soil moisture every 30 minutes and transmits data via 433MHz LoRa to an LCD receiver box, saving up to 35% irrigation water.',
    is_team: false,
    evidence: [
      {
        id: 'ev-01',
        type: 'code',
        title: 'Arduino C++ Firmware & Sensor Calibration GitHub',
        url: 'https://github.com/tamilnadu-schools/kavin-soil-lora-node'
      },
      {
        id: 'ev-02',
        type: 'photo',
        title: 'Breadboard Circuit & Waterproof Enclosure Photos',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'ev-03',
        type: 'document',
        title: 'Calibration Log Sheet (14-day paddy moisture study)',
        url: 'https://drive.google.com/sample-soil-moisture-calibration-log.pdf'
      }
    ],
    reflection: 'I learned how environmental humidity affects cheap resistive sensors, which is why I switched to a corrosion-resistant capacitive probe. In the future, I want to add GSM SMS alerts in Tamil so my grandfather in Thanjavur can receive pump switch-off alerts directly.',
    status: 'verified',
    submitted_at: '2026-02-14T16:20:00Z',
    evaluation: {
      id: 'eval-01',
      submission_id: 'sub-01',
      teacher_id: 'teacher-01',
      teacher_name: 'Mrs. Sundari Ramanathan',
      criteria_scores: {
        'Problem Understanding & Civic Empathy': 24,
        'Technical Execution & Prototyping': 29,
        'Cost Effectiveness & Practical Feasibility': 24,
        'Documentation & Evidence Presentation': 19
      },
      total_score: 96,
      max_possible: 100,
      constructive_feedback: 'Outstanding technical execution Kavin! Your decision to switch to a capacitive probe shows genuine engineering maturity. Your documentation is exemplary. You should definitely submit this project to the INSPIRE Awards - MANAK scheme.',
      constructive_feedback_ta: 'சிறந்த தொழில்நுட்ப செயல்பாடு கவின்! மின்தேக்கி உணரியைப் பயன்படுத்திய விதம் உங்கள் பொறியியல் சிந்தனையைக் காட்டுகிறது. இதை நீங்கள் இன்ஸ்பயர் மனாக் விருதுக்கு சமர்ப்பிக்க வேண்டும்.',
      verified_skills: ['Microcontroller Programming', 'IoT Sensor Telemetry', 'Circuit Troubleshooting', 'Empirical Data Logging'],
      certificate_id: 'cert-01',
      evaluated_at: '2026-02-16T11:45:00Z'
    }
  },
  {
    id: 'sub-02',
    challenge_id: 'chal-01',
    challenge_title: 'Smart Soil & Irrigation Monitor for Thanjavur Delta Farms',
    student_id: 'student-02',
    student_name: 'Priya Natarajan',
    classroom_id: 'class-9A',
    talent_category_id: 'tech_coding_ai',
    title: 'Rainwater Retention & Drip Sensor Logic Simulator',
    description: 'Designed a browser-based algorithmic model that calculates optimal drip irrigation schedules based on weather forecasts from the Regional Meteorological Centre Chennai.',
    is_team: false,
    evidence: [
      {
        id: 'ev-04',
        type: 'code',
        title: 'Interactive Drip Irrigation Calculator (HTML/Canvas)',
        url: 'https://priya-irrigation-sim.web.app'
      },
      {
        id: 'ev-05',
        type: 'document',
        title: 'Research Whitepaper: Evapotranspiration in Cauvery Delta',
        url: 'https://zen-talent.edu/evidence/cauvery-delta-evapotranspiration.pdf'
      }
    ],
    reflection: 'I realised math formulas become much more alive when they solve food and water problems for our state farmers.',
    status: 'under_review',
    submitted_at: '2026-02-18T10:10:00Z'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-01',
    certificate_number: 'CERT-ZT-2026-9842',
    student_id: 'student-01',
    student_name: 'Kavin Selvan',
    school_id: 'school-tn-01',
    school_name: 'Government Model Higher Secondary School, Anna Nagar, Chennai',
    challenge_id: 'chal-01',
    challenge_title: 'Smart Soil & Irrigation Monitor for Thanjavur Delta Farms',
    talent_category_id: 'tech_coding_ai',
    talent_category_name: 'Technology, Coding & AI',
    type: 'zen_talent_school',
    issuer_authority: 'Mrs. Sundari Ramanathan (STEM Lead) & Dr. S. Kulanthaivelu (Principal)',
    verification_hash: 'sha256-e9b42a98f12a870d44081c7e6358cfa99147e8bb64f20819fa001e',
    issued_at: '2026-02-16T12:00:00Z',
    distinction_level: 'Excellence',
    official_accreditation: 'Tamil Nadu School Education Department Pilot Verification Protocol v2.4'
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-01',
    title: 'INSPIRE Awards - MANAK (Million Minds Augmenting National Aspiration and Knowledge)',
    title_ta: 'இன்ஸ்பயர் மனாக் விருதுகள் (அறிவியல் மற்றும் தொழில்நுட்பத் துறை)',
    organiser: 'Department of Science and Technology (DST), Govt. of India & National Innovation Foundation (NIF)',
    type: 'scholarship',
    talent_category_ids: ['science_research', 'tech_coding_ai', 'innovation_entrepreneurship'],
    eligible_grades: [6, 7, 8, 9, 10],
    deadline: '2026-10-15',
    official_url: 'https://www.inspireawards-dst.gov.in',
    last_verified_date: '2026-11-01',
    award_details: '₹10,000 direct bank transfer to develop project prototype + participation in District & National Science Exhibition.',
    award_details_ta: 'திட்ட மாதிரி தயாரிப்புக்கு ₹10,000 நேரடி வங்கிப் பரிமாற்றம் + மாவட்ட & தேசிய அறிவியல் கண்காட்சியில் பங்கேற்பு.',
    eligibility_criteria: 'Students aged 10-15 studying in Classes 6 to 10 nominated by their school principal with an original innovative idea.',
    eligibility_criteria_ta: 'வகுப்பு 6 முதல் 10 வரை பயிலும் 10-15 வயதுடைய பள்ளி மாணவர்களின் புதிய அறிவியல் கண்டுபிடிப்பு யோசனைகள்.',
    is_government_scheme: true,
    location_scope: 'National (India)'
  },
  {
    id: 'opp-02',
    title: 'Tamil Nadu Student Innovators (TNSI) — School Edition',
    title_ta: 'தமிழ்நாடு மாணவர் கண்டுபிடிப்பாளர் திட்டம் (EDII-TN)',
    organiser: 'Entrepreneurship Development and Innovation Institute (EDII-TN), Govt. of Tamil Nadu',
    type: 'innovation_programme',
    talent_category_ids: ['innovation_entrepreneurship', 'practical_technical', 'social_problem_solving'],
    eligible_grades: [9, 10, 11, 12],
    deadline: '2026-12-05',
    official_url: 'https://editn.in/tnsi',
    last_verified_date: '2026-11-05',
    award_details: 'Incubation grant up to ₹1,00,000 for top school prototypes, bootcamps at IIT Madras Research Park, and mentorship from startup founders.',
    award_details_ta: 'ரூ. 1,00,000 வரை மாதிரி தயாரிப்பு மானியம், ஐஐடி மெட்ராஸ் ஆராய்ச்சி பூங்காவில் பயிற்சி மற்றும் வழிகாட்டுதல்.',
    eligibility_criteria: 'Students in Classes 9-12 from Tamil Nadu schools with working models addressing local agricultural, civic, or healthcare challenges.',
    eligibility_criteria_ta: 'தமிழகத்தின் விவசாயம், சுகாதாரம், நகர்ப்புற பிரச்சனைகளுக்கு தீர்வு காணும் மாதிரி உருவாக்கிய 9-12 வகுப்பு மாணவர்கள்.',
    is_government_scheme: true,
    location_scope: 'Tamil Nadu'
  },
  {
    id: 'opp-03',
    title: 'Vidyarthi Vigyan Manthan (VVM) — India’s Largest Science Talent Search',
    title_ta: 'வித்யார்த்தி விஞ்ஞான் மந்தன் (தேசிய அறிவியல் திறன் தேடல்)',
    organiser: 'Vijnana Bharati (VIBHA) in association with Vigyan Prasar & NCERT',
    type: 'olympiad',
    talent_category_ids: ['science_research', 'math_logical'],
    eligible_grades: [6, 7, 8, 9, 10, 11],
    deadline: '2026-09-30',
    official_url: 'https://vvm.org.in',
    last_verified_date: '2026-10-20',
    award_details: 'National winners receive Bhaskara Scholarships (₹2,000/month for 1 year), internship visits to CSIR, ISRO, and DRDO labs.',
    award_details_ta: 'பாஸ்கரா உதவித்தொகை (மாதம் ₹2,000 ஒரு வருடத்திற்கு), ISRO மற்றும் CSIR ஆய்வகங்களுக்கான நேரடி கல்விப் பயணம்.',
    eligibility_criteria: 'Open to students of classes 6 to 11 studying under State Board, CBSE, ICSE in English or Tamil mediums.',
    eligibility_criteria_ta: 'வகுப்பு 6 முதல் 11 வரை பயிலும் மாணவர்கள் தமிழ் அல்லது ஆங்கில வழியில் எழுதலாம்.',
    is_government_scheme: true,
    location_scope: 'National (India)'
  },
  {
    id: 'opp-04',
    title: 'National Talent Search Examination (NTSE / NMMS)',
    title_ta: 'தேசிய வருவாய் வழி மற்றும் திறன் படிப்புதவித் தொகை திட்டம் (NMMS)',
    organiser: 'State Council of Educational Research and Training (SCERT-TN) & NCERT',
    type: 'scholarship',
    talent_category_ids: ['math_logical', 'science_research', 'communication_languages'],
    eligible_grades: [8, 10],
    deadline: '2026-11-20',
    official_url: 'https://dge.tn.gov.in',
    last_verified_date: '2026-11-04',
    award_details: 'Scholarship of ₹12,000 per annum (₹1,000/month) from Class 9 to Class 12 to support higher secondary education.',
    award_details_ta: 'வகுப்பு 9 முதல் 12 வரை ஆண்டுக்கு ₹12,000 (மாதம் ₹1,000) கல்வி உதவித்தொகை.',
    eligibility_criteria: 'Class 8 students studying in Tamil Nadu Government and Govt-Aided schools with parental income below ₹3.5 Lakhs.',
    eligibility_criteria_ta: 'அரசு மற்றும் அரசு உதவிபெறும் பள்ளி 8-ஆம் வகுப்பு மாணவர்கள், குடும்ப ஆண்டு வருமானம் 3.5 லட்சத்திற்குள் இருக்க வேண்டும்.',
    is_government_scheme: true,
    location_scope: 'Tamil Nadu'
  },
  {
    id: 'opp-05',
    title: 'Homi Bhabha National Science & Mathematics Olympiad',
    title_ta: 'ஹோமி பாபா தேசிய அறிவியல் மற்றும் கணித ஒலிம்பியாட்',
    organiser: 'Homi Bhabha Centre for Science Education (HBCSE - TIFR)',
    type: 'olympiad',
    talent_category_ids: ['science_research', 'math_logical'],
    eligible_grades: [8, 9, 10, 11, 12],
    deadline: '2026-10-31',
    official_url: 'https://olympiads.hbcse.tifr.res.in',
    last_verified_date: '2026-10-25',
    award_details: 'Selection for Indian International Olympiad teams, training camps at TIFR Mumbai, and prestigious national badges.',
    award_details_ta: 'சர்வதேச ஒலிம்பியாட் இந்திய அணிக்கு தேர்வு, TIFR மும்பையில் சிறப்பு பயிற்சி மற்றும் தேசிய அங்கீகாரம்.',
    eligibility_criteria: 'Recognised students with high aptitude in Physics, Chemistry, Biology, Astronomy, and Mathematics.',
    eligibility_criteria_ta: 'இயற்பியல், வேதியியல், உயிரியல் மற்றும் கணிதத்தில் சிறந்த நுண்ணறிவு கொண்ட மாணவர்கள்.',
    is_government_scheme: true,
    location_scope: 'National (India)'
  },
  {
    id: 'opp-06',
    title: 'Smart India Hackathon (SIH) — Junior Edition',
    title_ta: 'ஸ்மார்ட் இந்தியா ஹேக்கத்தான் — ஜூனியர் பிரிவு',
    organiser: 'Ministry of Education Innovation Cell (MIC) & AICTE',
    type: 'competition',
    talent_category_ids: ['tech_coding_ai', 'innovation_entrepreneurship', 'social_problem_solving'],
    eligible_grades: [6, 7, 8, 9, 10, 11, 12],
    deadline: '2026-09-15',
    official_url: 'https://sih.gov.in',
    last_verified_date: '2026-09-10',
    award_details: '₹25,000 to ₹1,00,000 cash prizes per winning problem statement + national recognition by Union Ministers.',
    award_details_ta: 'வெற்றி பெறும் அணிகளுக்கு ₹25,000 முதல் ₹1,00,000 வரை ரொக்கப் பரிசு மற்றும் தேசிய அங்கீகாரம்.',
    eligibility_criteria: 'Teams of 6 students from Classes 6 to 12 guided by a school teacher with software/hardware solutions to real ministry problems.',
    eligibility_criteria_ta: 'ஆசிரியர் வழிகாட்டுதலுடன் 6 மாணவர்கள் கொண்ட குழு, அரசு துறைகளின் பிரச்சனைகளுக்கு டிஜிட்டல் தீர்வு காணுதல்.',
    is_government_scheme: true,
    location_scope: 'National (India)'
  },
  {
    id: 'opp-07',
    title: 'ISRO Young Scientist Programme (YUVIKA 2027)',
    title_ta: 'இஸ்ரோ இளம் விஞ்ஞானி திட்டம் (யுவிகா)',
    organiser: 'Indian Space Research Organisation (ISRO), Dept. of Space',
    type: 'skill_development',
    talent_category_ids: ['science_research', 'tech_coding_ai', 'practical_technical'],
    eligible_grades: [9],
    deadline: '2026-03-20',
    official_url: 'https://www.isro.gov.in/YUVIKA.html',
    last_verified_date: '2026-11-02',
    award_details: 'Fully sponsored 2-week residential aerospace workshop at ISRO centres (VSSC Thiruvananthapuram / SDSC Sriharikota).',
    award_details_ta: 'இஸ்ரோ விண்வெளி மையங்களில் 2 வார கால முழு நிதியுதவியுடன் கூடிய நேரடி வான்வெளி பயிற்சி முகாம்.',
    eligibility_criteria: 'Students who have finished Class 8 and currently studying in Class 9, with preference for rural and government school students.',
    eligibility_criteria_ta: '8-ஆம் வகுப்பு முடித்து 9-ஆம் வகுப்பில் பயிலும் மாணவர்கள். கிராமப்புற மாணவர்களுக்கு சிறப்பு முன்னுரிமை.',
    is_government_scheme: true,
    location_scope: 'National (India)'
  },
  {
    id: 'opp-08',
    title: 'Tamil Nadu State Silambam & Traditional Martial Arts Championship',
    title_ta: 'தமிழ்நாடு மாநில சிலம்பம் & பாரம்பரிய வீரக்கலைகள் சாம்பியன்ஷிப்',
    organiser: 'Sports Development Authority of Tamil Nadu (SDAT)',
    type: 'competition',
    talent_category_ids: ['sports_physical', 'leadership_teamwork'],
    eligible_grades: [6, 7, 8, 9, 10, 11, 12],
    deadline: '2026-11-25',
    official_url: 'https://www.sdat.tn.gov.in',
    last_verified_date: '2026-11-01',
    award_details: 'State sports certificates eligible for 3% sports quota in professional engineering and medical college admissions in TN.',
    award_details_ta: 'தமிழக உயர்கல்வி சேர்க்கையில் 3% விளையாட்டு ஒதுக்கீட்டுக்கு தகுதியான மாநில விளையாட்டு சான்றிதழ்.',
    eligibility_criteria: 'School students enrolled in registered Tamil Nadu schools competing in Sub-Junior and Junior Silambam categories.',
    eligibility_criteria_ta: 'சப்-ஜூனியர் மற்றும் ஜூனியர் பிரிவுகளில் சிலம்பம் பயிலும் தமிழ்நாடு பள்ளி மாணவர்கள்.',
    is_government_scheme: true,
    location_scope: 'Tamil Nadu'
  }
];

export const TALENT_DISCOVERY_QUESTIONS: TalentAssessmentQuestion[] = [
  {
    id: 'q-01',
    category_id: 'science_research',
    question_en: 'When you observe an unusual natural phenomenon (e.g. dying pond fish or leaves turning yellow in a specific pattern), what is your first impulse?',
    question_ta: 'ஒரு அசாதாரண இயற்கை நிகழ்வைக் காணும்போது (எ.கா: குளத்தில் மீன்கள் இறப்பது அல்லது இலைகள் மஞ்சள் நிறமாக மாறுவது), உங்கள் முதல் செயல் என்னவாக இருக்கும்?',
    options: [
      {
        label_en: 'Take water/soil samples, formulate a hypothesis, and look up scientific papers or test pH levels.',
        label_ta: 'மண் அல்லது நீர் மாதிரிகளை சேகரித்து, pH பரிசோதனை செய்து அறிவியல் காரணங்களை ஆராய்வது.',
        points: 15,
        skill_indicator: 'Scientific Inquiry & Environmental Observation'
      },
      {
        label_en: 'Think of an automated sensor system that could continuously alert authorities.',
        label_ta: 'அதிகாரிகளுக்கு தானாக எச்சரிக்கை அனுப்பும் உணரி முறையை உருவாக்குவது பற்றி சிந்திப்பது.',
        points: 10,
        skill_indicator: 'Technological Automation'
      },
      {
        label_en: 'Organise students to clean the area and create public awareness posters.',
        label_ta: 'மாணவர்களை ஒன்றுதிரட்டி பகுதியை தூய்மைப்படுத்தி விழிப்புணர்வு பலகைகளை வைப்பது.',
        points: 8,
        skill_indicator: 'Civic Mobilisation'
      }
    ]
  },
  {
    id: 'q-02',
    category_id: 'tech_coding_ai',
    question_en: 'How do you approach solving a repetitive, time-consuming task at school or home?',
    question_ta: 'பள்ளியிலோ வீட்டிலோ நேரம் எடுக்கும் ஒரு சலிப்பான வேலையை எப்படி எளிதாக்குவீர்கள்?',
    options: [
      {
        label_en: 'Write a small script, build a spreadsheet formula, or construct a simple mechanical rig to automate it.',
        label_ta: 'ஒரு சிறிய நிரல் (script), எக்செல் சூத்திரம் அல்லது எளிய கருவி மூலம் அதை தானியங்குபடுத்துவேன்.',
        points: 15,
        skill_indicator: 'Algorithmic Thinking & Automation'
      },
      {
        label_en: 'Divide the work into a structured timetable with classmates and lead the effort.',
        label_ta: 'வேலையை வகுப்பறை நண்பர்களுடன் பகிர்ந்து திட்டமிட்டு வழிநடத்துவேன்.',
        points: 10,
        skill_indicator: 'Leadership & Delegation'
      },
      {
        label_en: 'Use the extra time to sketch illustrations or write about the experience.',
        label_ta: 'அனுபவங்களை விவரித்து சித்திரம் வரைவேன் அல்லது எழுதுவேன்.',
        points: 5,
        skill_indicator: 'Creative Expression'
      }
    ]
  },
  {
    id: 'q-03',
    category_id: 'innovation_entrepreneurship',
    question_en: 'If you had ₹1,000 to solve a visible problem in your local neighbourhood, what would you create?',
    question_ta: 'உங்கள் ஊரில் உள்ள ஒரு பொது பிரச்சனையை தீர்க்க ₹1,000 கிடைத்தால், நீங்கள் என்ன செய்வீர்கள்?',
    options: [
      {
        label_en: 'Source local scrap materials to construct a working prototype (e.g. low-cost pest trap or solar battery charger).',
        label_ta: 'உள்ளூர் கழிவுப் பொருட்களைக் கொண்டு சிக்கனமான மாதிரி கருவி (எ.கா: சூரியசக்தி சார்ஜர், பூச்சிப் பொறி) உருவாக்குவேன்.',
        points: 15,
        skill_indicator: 'Frugal Innovation & Rapid Prototyping'
      },
      {
        label_en: 'Start a micro-enterprise recycling coconut shells into artisanal nursery pots and re-invest the earnings.',
        label_ta: 'தேங்காய் சிரட்டைகளை அழகுச் செடி தொட்டிகளாக மாற்றி சிறு விற்பனை செய்து நிதியை பெருக்குவேன்.',
        points: 14,
        skill_indicator: 'Entrepreneurial Mindset'
      },
      {
        label_en: 'Write a detailed petition letter and present it to the local panchayat / ward councillor.',
        label_ta: 'விரிவான மனு தயாரித்து வார்டு உறுப்பினர் அல்லது பஞ்சாயத்து தலைவரிடம் சமர்ப்பிப்பேன்.',
        points: 8,
        skill_indicator: 'Civic Advocacy'
      }
    ]
  },
  {
    id: 'q-04',
    category_id: 'arts_music_creativity',
    question_en: 'During school cultural celebrations or annual day exhibitions, where do you find the most joy?',
    question_ta: 'பள்ளி ஆண்டு விழா அல்லது பண்பாட்டு கொண்டாட்டங்களின் போது, உங்களுக்கு எதில் அதிக மகிழ்ச்சி கிடைக்கிறது?',
    options: [
      {
        label_en: 'Designing stage sets, painting traditional murals, digital poster animation, or performing music.',
        label_ta: 'மேடை அலங்காரம், பாரம்பரிய ஓவியங்கள், அனிமேஷன் சுவரொட்டி அல்லது இசை நிகழ்ச்சியில் பங்கேற்பது.',
        points: 15,
        skill_indicator: 'Aesthetic Expression & Multimedia Arts'
      },
      {
        label_en: 'Managing backstage logistics, lighting timers, and audio microphone routing.',
        label_ta: 'மேடைக்கு பின்னால் ஒலிபெருக்கி, மின் விளக்குகள் மற்றும் நேர மேலாண்மை செய்வது.',
        points: 10,
        skill_indicator: 'Practical Technical Production'
      },
      {
        label_en: 'Delivering the keynote welcome speech or compering in eloquent Tamil and English.',
        label_ta: 'தமிழ் மற்றும் ஆங்கிலத்தில் சிறப்பான வரவேற்புரை அல்லது நிகழ்ச்சியை தொகுத்து வழங்குவது.',
        points: 12,
        skill_indicator: 'Linguistic Eloquence'
      }
    ]
  },
  {
    id: 'q-05',
    category_id: 'practical_technical',
    question_en: 'When a bicycle, desk fan, or electrical water heater stops working at home or school:',
    question_ta: 'வீட்டிலோ பள்ளியிலோ சைக்கிள், மின்விசிறி அல்லது சுவிட்ச் பழுதாகிவிட்டால் உங்கள் அணுகுமுறை என்ன?',
    options: [
      {
        label_en: 'Fetch the toolbox, inspect gears, test continuity with a multimeter, and try to safely fix it myself.',
        label_ta: 'கருவிப் பெட்டியை எடுத்து, கியர் அல்லது வயரிங்கை பரிசோதித்து பாதுகாப்பாக சரிசெய்ய முயற்சிப்பேன்.',
        points: 15,
        skill_indicator: 'Mechanical & Electrical Hands-on Troubleshooting'
      },
      {
        label_en: 'Look up the patent diagrams, electrical theory, and physics behind how the motor works.',
        label_ta: 'மோட்டாரின் இயற்பியல் கோட்பாடுகள் மற்றும் வரைபடங்களை இணையத்தில் தேடி படிப்பேன்.',
        points: 11,
        skill_indicator: 'Theoretical Physics Understanding'
      },
      {
        label_en: 'Call a local repair technician and observe closely how they replace the worn components.',
        label_ta: 'தொழில்நுட்ப வல்லுநரை அழைத்து, அவர் பழுதுபார்ப்பதை உன்னிப்பாக கவனிப்பேன்.',
        points: 8,
        skill_indicator: 'Apprenticeship Mindset'
      }
    ]
  }
];

// Helper for persistent local storage in browser
const STORAGE_PREFIX = 'zen_talent_v1_';

function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export class ZenTalentStore {
  private static instance: ZenTalentStore;

  schools: School[];
  classrooms: Classroom[];
  teachers: TeacherProfile[];
  students: StudentProfile[];
  memberships: ClassroomMembership[];
  challenges: Challenge[];
  submissions: Submission[];
  certificates: Certificate[];
  opportunities: Opportunity[];

  private constructor() {
    this.schools = getStoredItem<School[]>('schools', [INITIAL_SCHOOL]);
    this.classrooms = getStoredItem<Classroom[]>('classrooms', INITIAL_CLASSROOMS);
    this.teachers = getStoredItem<TeacherProfile[]>('teachers', INITIAL_TEACHERS);
    this.students = getStoredItem<StudentProfile[]>('students', INITIAL_STUDENTS);
    this.memberships = getStoredItem<ClassroomMembership[]>('memberships', INITIAL_MEMBERSHIPS);
    this.challenges = getStoredItem<Challenge[]>('challenges', INITIAL_CHALLENGES);
    this.submissions = getStoredItem<Submission[]>('submissions', INITIAL_SUBMISSIONS);
    this.certificates = getStoredItem<Certificate[]>('certificates', INITIAL_CERTIFICATES);
    this.opportunities = getStoredItem<Opportunity[]>('opportunities', INITIAL_OPPORTUNITIES);
  }

  public static getInstance(): ZenTalentStore {
    if (!ZenTalentStore.instance) {
      ZenTalentStore.instance = new ZenTalentStore();
    }
    return ZenTalentStore.instance;
  }

  private save(): void {
    setStoredItem('schools', this.schools);
    setStoredItem('classrooms', this.classrooms);
    setStoredItem('teachers', this.teachers);
    setStoredItem('students', this.students);
    setStoredItem('memberships', this.memberships);
    setStoredItem('challenges', this.challenges);
    setStoredItem('submissions', this.submissions);
    setStoredItem('certificates', this.certificates);
    setStoredItem('opportunities', this.opportunities);
  }

  // Classroom management
  public addClassroom(classroom: Omit<Classroom, 'id' | 'joining_code' | 'student_count'>): Classroom {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const newClassroom: Classroom = {
      ...classroom,
      id: `class-${classroom.standard}${classroom.section.replace(/\s+/g, '')}-${Date.now().toString().slice(-4)}`,
      joining_code: `TN-${classroom.standard}${classroom.section.slice(0, 2).toUpperCase()}-${randomHex}`,
      student_count: 0
    };
    this.classrooms.unshift(newClassroom);
    this.save();
    return newClassroom;
  }

  public toggleJoiningCode(classroomId: string, active: boolean): void {
    const classroom = this.classrooms.find(c => c.id === classroomId);
    if (classroom) {
      classroom.code_active = active;
      this.save();
    }
  }

  public regenerateJoiningCode(classroomId: string): string {
    const classroom = this.classrooms.find(c => c.id === classroomId);
    if (classroom) {
      const randomHex = Math.floor(1000 + Math.random() * 9000);
      classroom.joining_code = `TN-${classroom.standard}${classroom.section.slice(0, 2).toUpperCase()}-${randomHex}`;
      classroom.code_active = true;
      this.save();
      return classroom.joining_code;
    }
    return '';
  }

  // Student joining classroom
  public joinClassroomByCode(studentId: string, code: string): { success: boolean; message: string; classroom?: Classroom } {
    const cleanCode = code.trim().toUpperCase();
    const classroom = this.classrooms.find(c => c.joining_code.toUpperCase() === cleanCode);
    
    if (!classroom) {
      return { success: false, message: 'Invalid classroom joining code. Please verify with your teacher.' };
    }

    if (!classroom.code_active) {
      return { success: false, message: 'This joining code has been revoked or expired by the teacher.' };
    }

    const student = this.students.find(s => s.id === studentId);
    if (!student) {
      return { success: false, message: 'Student profile not found.' };
    }

    // Check existing membership
    const existing = this.memberships.find(m => m.classroom_id === classroom.id && m.student_id === studentId);
    if (existing) {
      return { success: false, message: `You already have an enrolment record for Class ${classroom.standard}-${classroom.section} (${existing.status}).` };
    }

    // Add membership
    const newMembership: ClassroomMembership = {
      id: `mem-${Date.now()}`,
      classroom_id: classroom.id,
      student_id: student.id,
      student_name: student.name,
      admission_no: student.admission_no,
      status: 'approved', // Auto-approved via valid teacher code
      enrolled_at: new Date().toISOString()
    };
    this.memberships.push(newMembership);

    // Update student's primary classroom
    student.classroom_id = classroom.id;
    student.standard = classroom.standard;
    student.section = classroom.section;
    classroom.student_count = (classroom.student_count || 0) + 1;

    this.save();
    return { success: true, message: `Successfully enrolled into Class ${classroom.standard}-${classroom.section}!`, classroom };
  }

  // Challenges & Submissions
  public createChallenge(challenge: Omit<Challenge, 'id' | 'submission_count' | 'created_at'>): Challenge {
    const newChallenge: Challenge = {
      ...challenge,
      id: `chal-${Date.now().toString().slice(-6)}`,
      submission_count: 0,
      created_at: new Date().toISOString()
    };
    this.challenges.unshift(newChallenge);
    this.save();
    return newChallenge;
  }

  public submitProject(submission: Omit<Submission, 'id' | 'submitted_at' | 'status'>): Submission {
    const newSubmission: Submission = {
      ...submission,
      id: `sub-${Date.now().toString().slice(-6)}`,
      status: 'submitted',
      submitted_at: new Date().toISOString()
    };
    this.submissions.unshift(newSubmission);

    const challenge = this.challenges.find(c => c.id === submission.challenge_id);
    if (challenge) {
      challenge.submission_count = (challenge.submission_count || 0) + 1;
    }

    this.save();
    return newSubmission;
  }

  public evaluateSubmission(
    submissionId: string,
    evalData: Omit<Evaluation, 'id' | 'submission_id' | 'evaluated_at'>,
    issueCertificate: boolean
  ): Evaluation {
    const submission = this.submissions.find(s => s.id === submissionId);
    if (!submission) {
      throw new Error('Submission not found');
    }

    let certificateId: string | undefined = undefined;

    if (issueCertificate) {
      const certNo = `CERT-ZT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const certId = `cert-${Date.now()}`;
      const newCert: Certificate = {
        id: certId,
        certificate_number: certNo,
        student_id: submission.student_id,
        student_name: submission.student_name,
        school_id: 'school-tn-01',
        school_name: INITIAL_SCHOOL.name,
        challenge_id: submission.challenge_id,
        challenge_title: submission.challenge_title,
        talent_category_id: submission.talent_category_id,
        talent_category_name: TALENT_CATEGORIES.find(c => c.id === submission.talent_category_id)?.name_en || 'General Talent',
        type: 'zen_talent_school',
        issuer_authority: `${evalData.teacher_name} & ${INITIAL_SCHOOL.principal_name}`,
        verification_hash: `sha256-${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`,
        issued_at: new Date().toISOString(),
        distinction_level: evalData.total_score >= 90 ? 'Excellence' : evalData.total_score >= 75 ? 'Innovation' : 'Merit',
        official_accreditation: 'Tamil Nadu School Education Department Pilot Verification Protocol v2.4'
      };
      this.certificates.unshift(newCert);
      certificateId = certId;
    }

    const evaluation: Evaluation = {
      ...evalData,
      id: `eval-${Date.now()}`,
      submission_id: submissionId,
      certificate_id: certificateId,
      evaluated_at: new Date().toISOString()
    };

    submission.evaluation = evaluation;
    submission.status = 'verified';

    this.save();
    return evaluation;
  }

  // Update student privacy
  public updateStudentPassportPrivacy(studentId: string, isPublic: boolean): void {
    const student = this.students.find(s => s.id === studentId);
    if (student) {
      student.privacy_public_passport = isPublic;
      this.save();
    }
  }

  // Reset to initial seed state
  public resetData(): void {
    localStorage.removeItem(STORAGE_PREFIX + 'schools');
    localStorage.removeItem(STORAGE_PREFIX + 'classrooms');
    localStorage.removeItem(STORAGE_PREFIX + 'teachers');
    localStorage.removeItem(STORAGE_PREFIX + 'students');
    localStorage.removeItem(STORAGE_PREFIX + 'memberships');
    localStorage.removeItem(STORAGE_PREFIX + 'challenges');
    localStorage.removeItem(STORAGE_PREFIX + 'submissions');
    localStorage.removeItem(STORAGE_PREFIX + 'certificates');
    localStorage.removeItem(STORAGE_PREFIX + 'opportunities');

    this.schools = [INITIAL_SCHOOL];
    this.classrooms = INITIAL_CLASSROOMS;
    this.teachers = INITIAL_TEACHERS;
    this.students = INITIAL_STUDENTS;
    this.memberships = INITIAL_MEMBERSHIPS;
    this.challenges = INITIAL_CHALLENGES;
    this.submissions = INITIAL_SUBMISSIONS;
    this.certificates = INITIAL_CERTIFICATES;
    this.opportunities = INITIAL_OPPORTUNITIES;
    this.save();
  }
}
