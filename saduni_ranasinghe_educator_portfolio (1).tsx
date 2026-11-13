import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  GraduationCap,
  Award,
  Users,
  Star,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Lock,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  ExternalLink,
  Check,
  Sparkles,
  Calendar,
  Settings as SettingsIcon,
  Inbox,
  User,
  Briefcase,
  MessageSquare,
  RotateCcw,
  Camera,
  ShieldCheck,
  Menu,
  Download,
  FileUp,
  Sliders,
  Wand2,
  FileText,
  Target,
  TrendingUp,
  Compass,
  MoveUp,
  MoveDown,
  Quote
} from 'lucide-react';
import {
  storePdfToDB,
  getPdfFromDB,
  deletePdfFromDB,
  hasPdfInDB,
  downloadPdfByKey,
  openPdfByKeyInNewTab
} from './pdfStore';

// ==========================================
// INLINE SOCIAL SVG ICONS
// ==========================================
const Facebook = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Linkedin = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Youtube = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const Instagram = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// ==========================================
// TYPES & DATA STRUCTURES
// ==========================================
export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface SocialLinks {
  facebook: string;
  whatsapp: string;
  youtube: string;
  linkedin: string;
  instagram: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  roles: string[];
  heroBio: string;
  aboutBio: string;
  location: string;
  phoneDisplay: string;
  whatsappNumber: string;
  email: string;
  portraitUrl: string;
  portraitShape: 'circle' | 'arch';
  portraitZoom: number;
  portraitOffsetY: number;
  stats: StatItem[];
  socials: SocialLinks;
}

export interface PillarItem {
  id: string;
  title: string;
  description: string;
  iconName: 'BookOpen' | 'Target' | 'Sparkles' | 'GraduationCap' | 'Award' | 'Compass';
}

export interface PhilosophyData {
  title: string;
  subtitle: string;
  quote: string;
  quoteAuthor: string;
  approach: string;
  pillars: PillarItem[];
  photos: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  institution: string;
  period: string;
  location: string;
  bullets: string[];
  images: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  schedule: string;
  description: string;
  images: string[];
}

export interface ResearchProposalData {
  title: string;
  authors: string;
  institution: string;
  category: string;
  year: string;
  fileSize: string;
  abstract: string;
  methodology: string;
  findings: string[];
}

export interface SwotData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface ArtifactItem {
  id: string;
  title: string;
  category: string;
  description: string;
  previewImage: string;
  pdfKey: string;
  fileName: string;
  fileSize: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  approved: boolean;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface PortfolioStore {
  adminPin: string;
  profile: ProfileData;
  philosophy: PhilosophyData;
  experiences: ExperienceItem[];
  categories: string[];
  works: WorkItem[];
  research: ResearchProposalData;
  swot: SwotData;
  artifacts: ArtifactItem[];
  reviews: ReviewItem[];
  messages: ContactMessage[];
}

// ==========================================
// DEFAULT DEMO DATA
// ==========================================
const STORAGE_KEY = 'saduni_ranasinghe_portfolio_v2';

const DEFAULT_DATA: PortfolioStore = {
  adminPin: '1234',
  profile: {
    name: 'Saduni Ranasinghe',
    tagline: 'Senior Educator, Academic Mentor & Curriculum Specialist',
    roles: [
      'Dedicated Educator',
      'Academic Mentor',
      'Curriculum Specialist',
      'Student Success Coach'
    ],
    heroBio:
      'Empowering students with structured learning methodologies, conceptual clarity, and exam-focused mentorship designed to unlock their highest academic potential.',
    aboutBio:
      'With over a decade of transformative educational leadership, I specialize in bridging complex theoretical concepts with intuitive, real-world analytical frameworks. Having mentored thousands of students across secondary and tertiary levels, my pedagogy focuses on active inquiry, continuous diagnostic paper clinics, and individualized student confidence building. Every curriculum is custom-engineered to ensure academic excellence, critical cognitive growth, and top-tier examination results.',
    location: 'Colombo, Sri Lanka • Islandwide & Online',
    phoneDisplay: '077 123 4567',
    whatsappNumber: '+94771234567',
    email: 'saduni.ranasinghe@example.com',
    portraitUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    portraitShape: 'circle',
    portraitZoom: 100,
    portraitOffsetY: 0,
    stats: [
      { id: '1', value: '6,500+', label: 'Students Guided' },
      { id: '2', value: '99.2%', label: 'Pass Rate' },
      { id: '3', value: '10+ Yrs', label: 'Teaching Experience' },
      { id: '4', value: '150+', label: 'Seminars Hosted' }
    ],
    socials: {
      facebook: 'https://facebook.com/',
      whatsapp: 'https://wa.me/94771234567',
      youtube: 'https://youtube.com/',
      linkedin: 'https://linkedin.com/',
      instagram: 'https://instagram.com/'
    }
  },
  philosophy: {
    title: 'Pedagogical Philosophy & Core Teaching Doctrine',
    subtitle: 'Cultivating Critical Thinking, Deep Conceptual Mastery, and Academic Resilience',
    quote:
      'True education is not the mechanical memorization of facts, but the ignition of intellectual curiosity and the discipline to think independently.',
    quoteAuthor: 'Saduni Ranasinghe',
    approach:
      'My pedagogical framework integrates cognitive scaffolding with active student dialogue. Rather than passive lecture delivery, every module is structured around deductive problem-solving, structured unit-by-unit revisions, and personalized paper clinics. Students develop not just examination mastery, but the lifelong analytical confidence required for university and professional success.',
    pillars: [
      {
        id: 'p1',
        title: 'Conceptual Clarity & Active Inquiry',
        description:
          'Deconstructing abstract theoretical concepts into visual, logical schemas that encourage interactive questioning and deep retention.',
        iconName: 'BookOpen'
      },
      {
        id: 'p2',
        title: 'Personalized Diagnostic Paper Clinics',
        description:
          'Continuous unit assessments with line-by-line marking feedback against official marking rubrics to eliminate repetitive errors.',
        iconName: 'Target'
      },
      {
        id: 'p3',
        title: 'Holistic Academic Discipline & Mentorship',
        description:
          'Nurturing student mindset, time-management protocols, stress resilience, and self-directed academic drive.',
        iconName: 'Sparkles'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  experiences: [
    {
      id: 'exp1',
      role: 'Senior Academic Lecturer & Curriculum Specialist',
      institution: 'Apex Institute of Advanced Education',
      period: '2020 – Present',
      location: 'Colombo, Sri Lanka',
      bullets: [
        'Spearheaded advanced theory programs for 2,000+ enrolled students annually with islandwide top rankings.',
        'Developed standardized modular lecture tutorials, past paper analytical matrices, and multimedia teaching aids.',
        'Led monthly regional teacher training symposiums on innovative pedagogical delivery and student engagement.'
      ],
      images: [
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'exp2',
      role: 'Visiting Faculty & Paper Clinic Director',
      institution: 'Metropolitan Higher Education Center',
      period: '2016 – 2020',
      location: 'Kandy & Online',
      bullets: [
        'Directed intensive examination booster seminars and targeted essay clinics across Western and Central provinces.',
        'Pioneered interactive digital whiteboard lecture recordings and hybrid blended learning pipelines during islandwide transition.',
        'Coached student delegates for national academic competitions with outstanding merit achievements.'
      ],
      images: [
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'exp3',
      role: 'Lead Academic Mentor & Curriculum Developer',
      institution: 'National Youth Academic Foundation',
      period: '2014 – 2016',
      location: 'Colombo, Sri Lanka',
      bullets: [
        'Designed comprehensive foundation coursework tailored for underprivileged high-achieving scholarship recipients.',
        'Facilitated career counseling, academic roadmap planning, and university transition advisory sessions.'
      ],
      images: [
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
      ]
    }
  ],
  categories: ['All', 'Theory Batches', 'Paper Revision', 'Seminars', 'Mentorship'],
  works: [
    {
      id: 'w1',
      title: '2026 / 2027 Comprehensive Theory Masterclass',
      category: 'Theory Batches',
      schedule: 'Saturdays & Sundays • 8:30 AM – 12:30 PM (Physical & Live Online Zoom)',
      description:
        'Exhaustive syllabus coverage featuring illustrated color study packs, unit-by-unit past paper discussions, and monthly diagnostic mock exams with individual grading clinics.',
      images: [
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    {
      id: 'w2',
      title: 'Target Paper Clinic & Fast-Track Revision Series',
      category: 'Paper Revision',
      schedule: 'Wednesdays & Fridays • 4:00 PM – 7:00 PM',
      description:
        'Time-pressured simulation tests, marking scheme deconstructions, model structured essay blueprints, and personalized weakness correction sheets.',
      images: [
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    {
      id: 'w3',
      title: 'National Exam Strategy & Motivational Seminars',
      category: 'Seminars',
      schedule: 'Monthly Islandwide Weekend Sessions • Colombo, Kandy, Galle & Zoom',
      description:
        'High-impact auditorium sessions addressing examination psychology, memory consolidation techniques, time distribution strategies, and high-probability question forecasts.',
      images: [
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    {
      id: 'w4',
      title: '1-on-1 Academic Mentorship & Resource Portal',
      category: 'Mentorship',
      schedule: 'Flexible Individual Appointments • Dedicated LMS Portal',
      description:
        'Customized developmental coaching, recorded lesson vault access, question bank clearance, and parent-student academic milestone reviews.',
      images: [
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1000&q=80'
      ]
    }
  ],
  research: {
    title:
      'Cognitive Scaffolding & Diagnostic Paper Clinics: Enhancing Abstract Conceptual Retention in Pre-University Learners',
    authors: 'Saduni Ranasinghe (Lead Author & Principal Investigator)',
    institution: 'Department of Education & Curriculum Studies',
    category: 'Applied Pedagogical Research & Curriculum Design',
    year: '2025 – 2026',
    fileSize: 'PDF • 2.8 MB',
    abstract:
      'This empirical investigation assesses the efficacy of iterative diagnostic paper clinics coupled with visual cognitive scaffolding frameworks in secondary and pre-university learning cohorts. Analyzing longitudinal performance data across 1,200 participating students, the study demonstrates statistically significant gains in higher-order analytical problem solving compared to conventional rote instruction models.',
    methodology:
      'Mixed-method quantitative cohort tracking combined with qualitative student cognitive self-efficacy assessments. Longitudinal trials utilized double-blind rubric evaluation, biometric response markers during timed examinations, and structured formative diagnostic tracking across 12-month instructional cycles.',
    findings: [
      '34.8% measured improvement in structured essay question analytical depth among intervention cohorts.',
      'Statistically significant reduction in student exam anxiety indices through periodic simulated test conditions.',
      '92.4% transfer rate of core diagnostic correction protocols into self-regulated independent study habits.',
      'Standardized rubric adoption resulted in a 41% decrease in recurring misconception errors during final revisions.'
    ]
  },
  swot: {
    strengths: [
      '10+ years of proven academic excellence with consistent islandwide top rankers',
      'Proprietary structured study packs, past paper matrices, and visual mind maps',
      'High student retention and 99.2% overall batch examination pass rate',
      'Personalized diagnostic feedback system addressing individual conceptual gaps'
    ],
    weaknesses: [
      'High demand limits available physical seating slots for localized auditorium sessions',
      'Time-intensive personalized paper marking requiring extensive schedule allocation',
      'Geographical travel constraints for in-person outer-province seminar requests'
    ],
    opportunities: [
      'Expansion of AI-assisted diagnostic student progress dashboards on digital LMS',
      'Islandwide hybrid revision franchises in major educational hubs (Kandy, Galle, Kurunegala)',
      'Publication of standardized secondary school study guides and problem workbooks',
      'Institutional partnerships with international colleges and scholarship foundations'
    ],
    threats: [
      'Unpredictable national examination schedule shifts and sudden syllabus revisions',
      'Digital access disparities and internet bandwidth variations for remote rural students',
      'Proliferation of unverified, low-quality commercial revision content across social media'
    ]
  },
  artifacts: [
    {
      id: 'art1',
      title: 'Modular Lesson Plan: High-Order Cognitive Scaffolding',
      category: 'Instructional Blueprint',
      description:
        'A structured 4-phase pedagogical lesson architecture detailing inquiry prompts, cooperative group problem analysis, guided paper writing, and formative diagnostic assessment checkpoints.',
      previewImage:
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
      pdfKey: 'pdf_artifact_art1',
      fileName: 'Lesson_Plan_Cognitive_Scaffolding.pdf',
      fileSize: 'PDF • 1.4 MB'
    },
    {
      id: 'art2',
      title: 'Comprehensive Exam Paper Marking & Diagnostic Rubric',
      category: 'Assessment Framework',
      description:
        'The official multi-tier diagnostic grading rubric utilized during paper clinics to provide actionable point-by-point feedback across conceptual understanding, structure, and execution.',
      previewImage:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      pdfKey: 'pdf_artifact_art2',
      fileName: 'Diagnostic_Assessment_Rubric.pdf',
      fileSize: 'PDF • 1.1 MB'
    },
    {
      id: 'art3',
      title: 'Student Independent Revision & Time Allocation Matrix',
      category: 'Mentorship Tool',
      description:
        'An adaptable 16-week study schedule and active recall planner designed to optimize student revision cycles, past paper timed practice, and cognitive recovery periods.',
      previewImage:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
      pdfKey: 'pdf_artifact_art3',
      fileName: 'Revision_Time_Allocation_Matrix.pdf',
      fileSize: 'PDF • 950 KB'
    }
  ],
  reviews: [
    {
      id: 'r1',
      name: 'Kavindi Perera',
      role: '2025 Batch Student (District Ranker)',
      rating: 5,
      text: 'Miss Saduni explains even the most complex lessons in a calm, logical way. Her short-note booklets and weekly paper discussions completely transformed my confidence before the final exam!',
      approved: true,
      date: '2026-09-18'
    },
    {
      id: 'r2',
      name: 'Nethmi Wijesinghe',
      role: 'Online Revision Student',
      rating: 5,
      text: 'The most organized online classes I have ever attended. Every session is interactive, clear, and the individual feedback on mock papers helped me jump from a C to an A.',
      approved: true,
      date: '2026-10-05'
    },
    {
      id: 'r3',
      name: 'Mrs. Dilani Jayawardena',
      role: 'Parent of 2026 Batch Student',
      rating: 5,
      text: 'A truly dedicated educator who genuinely cares about her students’ discipline and academic growth. Highly recommended for both theory and revision classes.',
      approved: true,
      date: '2026-10-29'
    }
  ],
  messages: [
    {
      id: 'm1',
      name: 'Tharushi Silva',
      phone: '+94 71 234 5678',
      subject: 'Inquiry: 2026 / 2027 Theory & Revision Masterclass',
      message:
        'Hello Miss, I would like to know how to register for the upcoming Sunday online revision intake and receive the printed study pack.',
      date: '2026-11-10 14:30',
      read: false
    }
  ]
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function sanitizeWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0') && digits.length === 10) {
    return '94' + digits.slice(1);
  }
  if (digits.length === 9 && digits.startsWith('7')) {
    return '94' + digits;
  }
  return digits;
}

function ensureHttps(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return false;
  const digitCount = trimmed.replace(/\D/g, '').length;
  return digitCount >= 9 && digitCount <= 15;
}

function renderPillarIcon(iconName: string, className = 'w-6 h-6 text-[#f472b6]') {
  switch (iconName) {
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Target':
      return <Target className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Compass':
    default:
      return <Compass className={className} />;
  }
}

async function compressImageFile(file: File, maxWidth = 1000, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function App() {
  // ----------------------------------------
  // Persistent Store
  // ----------------------------------------
  const [store, setStore] = useState<PortfolioStore>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_DATA,
          ...parsed,
          profile: {
            ...DEFAULT_DATA.profile,
            ...(parsed.profile || {}),
            stats: parsed.profile?.stats || DEFAULT_DATA.profile.stats,
            socials: {
              ...DEFAULT_DATA.profile.socials,
              ...(parsed.profile?.socials || {})
            }
          },
          philosophy: {
            ...DEFAULT_DATA.philosophy,
            ...(parsed.philosophy || {})
          },
          experiences: parsed.experiences || DEFAULT_DATA.experiences,
          works: parsed.works || DEFAULT_DATA.works,
          research: {
            ...DEFAULT_DATA.research,
            ...(parsed.research || {})
          },
          swot: {
            ...DEFAULT_DATA.swot,
            ...(parsed.swot || {})
          },
          artifacts: parsed.artifacts || DEFAULT_DATA.artifacts,
          reviews: parsed.reviews || DEFAULT_DATA.reviews,
          messages: parsed.messages || DEFAULT_DATA.messages
        };
      }
    } catch (err) {
      console.error('Failed to read localStorage:', err);
    }
    return DEFAULT_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (err) {
      console.error('localStorage write failed:', err);
    }
  }, [store]);

  // ----------------------------------------
  // Toast Notifications
  // ----------------------------------------
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const triggerToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ----------------------------------------
  // Hidden Admin Gate State
  // ----------------------------------------
  const [showPinModal, setShowPinModal] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showPinChars, setShowPinChars] = useState(false);

  type AdminTab =
    | 'profile'
    | 'philosophy'
    | 'experience'
    | 'works'
    | 'research'
    | 'swot'
    | 'artifacts'
    | 'reviews'
    | 'messages'
    | 'settings';
  const [adminTab, setAdminTab] = useState<AdminTab>('profile');

  // Secret shortcut & URL routes for admin: /admin, /#admin, ?admin=true, Ctrl+Shift+A
  useEffect(() => {
    const checkUrlForAdmin = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        path === '/admin' ||
        path.endsWith('/admin') ||
        hash === '#admin' ||
        hash === '#/admin' ||
        search.includes('admin=true')
      ) {
        if (!isAdminUnlocked) {
          setShowPinModal(true);
        }
      }
    };

    checkUrlForAdmin();
    window.addEventListener('hashchange', checkUrlForAdmin);
    window.addEventListener('popstate', checkUrlForAdmin);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminUnlocked) {
          exitAdminStudio();
        } else {
          openAdminStudio();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkUrlForAdmin);
      window.removeEventListener('popstate', checkUrlForAdmin);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminUnlocked]);

  const openAdminStudio = () => {
    window.history.pushState(null, '', '#admin');
    if (!isAdminUnlocked) {
      setShowPinModal(true);
    }
  };

  const exitAdminStudio = () => {
    setIsAdminUnlocked(false);
    setShowPinModal(false);
    setPinInput('');
    setPinError(false);
    if (window.location.hash.includes('admin') || window.location.pathname.includes('/admin')) {
      const cleanPath = window.location.pathname.replace(/\/admin\/?$/i, '') || '/';
      window.history.pushState(null, '', cleanPath);
    }
  };

  const handlePinUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === store.adminPin) {
      setIsAdminUnlocked(true);
      setShowPinModal(false);
      setPinInput('');
      setPinError(false);
      window.history.replaceState(null, '', '#admin');
      triggerToast('Welcome to Saduni Ranasinghe Admin Studio');
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 600);
      triggerToast('Incorrect Admin PIN', 'error');
    }
  };

  // ----------------------------------------
  // Typewriter Hook for Hero Roles
  // ----------------------------------------
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = store.profile.roles && store.profile.roles.length > 0
      ? store.profile.roles
      : ['Dedicated Educator', 'Academic Mentor', 'Curriculum Specialist', 'Student Success Coach'];

    const fullRole = roles[currentRoleIndex % roles.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (currentText.length < fullRole.length) {
        timer = setTimeout(() => {
          setCurrentText(fullRole.slice(0, currentText.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullRole.slice(0, currentText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, store.profile.roles]);

  // ----------------------------------------
  // Navigation & Scroll
  // ----------------------------------------
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // ----------------------------------------
  // PDF Download & Read Online Actions
  // ----------------------------------------
  const handleDownloadCv = async () => {
    await downloadPdfByKey('pdf_cv', `${store.profile.name.replace(/\s+/g, '_')}_CV.pdf`, {
      title: `${store.profile.name} - Curriculum Vitae`,
      subtitle: `${store.profile.tagline} • ${store.profile.location}`,
      lines: [
        `Email: ${store.profile.email} | Phone: ${store.profile.phoneDisplay}`,
        '',
        'CAREER SUMMARY:',
        store.profile.aboutBio.slice(0, 320) + '...',
        '',
        'KEY ACADEMIC HIGHLIGHTS:',
        ...store.profile.stats.map((s) => `* ${s.label}: ${s.value}`),
        '',
        'TEACHING PHILOSOPHY:',
        store.philosophy.quote,
        '',
        'Verified Educator Credentials'
      ]
    });
    triggerToast('CV PDF Download Initiated');
  };

  const handleDownloadResearch = async () => {
    await downloadPdfByKey('pdf_research', 'Saduni_Ranasinghe_Research_Proposal.pdf', {
      title: store.research.title,
      subtitle: `${store.research.authors} • ${store.research.institution} (${store.research.year})`,
      lines: [
        `Category: ${store.research.category}`,
        '',
        'ABSTRACT:',
        store.research.abstract.slice(0, 320) + '...',
        '',
        'METHODOLOGY:',
        store.research.methodology.slice(0, 280) + '...',
        '',
        'KEY FINDINGS:',
        ...store.research.findings.map((f) => `* ${f}`)
      ]
    });
    triggerToast('Research Proposal PDF Downloaded');
  };

  const handleReadResearchOnline = async () => {
    await openPdfByKeyInNewTab('pdf_research', {
      title: store.research.title,
      subtitle: `${store.research.authors} • ${store.research.institution} (${store.research.year})`,
      lines: [
        `Category: ${store.research.category}`,
        '',
        'ABSTRACT:',
        store.research.abstract,
        '',
        'METHODOLOGY:',
        store.research.methodology,
        '',
        'KEY FINDINGS:',
        ...store.research.findings.map((f) => `* ${f}`)
      ]
    });
  };

  const handleDownloadArtifact = async (artifact: ArtifactItem) => {
    await downloadPdfByKey(artifact.pdfKey, artifact.fileName || `${artifact.title.replace(/\s+/g, '_')}.pdf`, {
      title: artifact.title,
      subtitle: `${artifact.category} • Designed by ${store.profile.name}`,
      lines: [
        'PEDAGOGICAL INSTRUCTIONAL BLUEPRINT',
        '',
        'Description & Implementation Framework:',
        artifact.description,
        '',
        'Pedagogical Doctrine: Conceptual Clarity, Continuous Feedback, and Academic Mastery.',
        `Institution: ${store.profile.location}`
      ]
    });
    triggerToast(`Downloaded ${artifact.title} PDF`);
  };

  // ----------------------------------------
  // Philosophy Photo Carousel State
  // ----------------------------------------
  const [philosophyIndex, setPhilosophyIndex] = useState(0);

  // ----------------------------------------
  // Works & Classes Carousel and Filters
  // ----------------------------------------
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [workCardIndices, setWorkCardIndices] = useState<Record<string, number>>({});
  const [activeWorkModal, setActiveWorkModal] = useState<WorkItem | null>(null);
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0);

  const filteredWorks = useMemo(() => {
    if (selectedCategory === 'All') return store.works;
    return store.works.filter((w) => w.category === selectedCategory);
  }, [store.works, selectedCategory]);

  const handleWorkPrevPhoto = (workId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWorkCardIndices((prev) => ({
      ...prev,
      [workId]: ((prev[workId] || 0) - 1 + max) % max
    }));
  };

  const handleWorkNextPhoto = (workId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWorkCardIndices((prev) => ({
      ...prev,
      [workId]: ((prev[workId] || 0) + 1) % max
    }));
  };

  // ----------------------------------------
  // Image Viewer Modal for any image
  // ----------------------------------------
  const [zoomImageModal, setZoomImageModal] = useState<{ src: string; caption?: string } | null>(null);

  // ----------------------------------------
  // Public Submit Review Modal
  // ----------------------------------------
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [revName, setRevName] = useState('');
  const [revRole, setRevRole] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revText, setRevText] = useState('');
  const [revSubmitted, setRevSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revText.trim()) return;

    const newRev: ReviewItem = {
      id: 'rev_' + Date.now(),
      name: revName.trim(),
      role: revRole.trim() || 'Student / Parent',
      rating: revRating,
      text: revText.trim(),
      approved: false, // goes to admin review queue
      date: new Date().toISOString().split('T')[0]
    };

    setStore((prev) => ({
      ...prev,
      reviews: [newRev, ...prev.reviews]
    }));

    setRevSubmitted(true);
    triggerToast('Review submitted for verification. Thank you!');
    setTimeout(() => {
      setRevName('');
      setRevRole('');
      setRevRating(5);
      setRevText('');
      setRevSubmitted(false);
      setReviewModalOpen(false);
    }, 2000);
  };

  const approvedReviews = useMemo(() => {
    return store.reviews.filter((r) => r.approved);
  }, [store.reviews]);

  // ----------------------------------------
  // Contact Form State
  // ----------------------------------------
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const phoneValid = isValidPhone(contactPhone);
  const phoneDirty = contactPhone.trim().length > 0;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    if (!contactName.trim() || !phoneValid || !contactMsg.trim()) {
      triggerToast('Please complete all required fields correctly', 'error');
      return;
    }

    const newMessage: ContactMessage = {
      id: 'msg_' + Date.now(),
      name: contactName.trim(),
      phone: contactPhone.trim(),
      subject: contactSubject.trim() || 'General Inquiry',
      message: contactMsg.trim(),
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      read: false
    };

    setStore((prev) => ({
      ...prev,
      messages: [newMessage, ...prev.messages]
    }));

    triggerToast('Message received! We will be in touch shortly.');
    setContactName('');
    setContactPhone('');
    setContactSubject('');
    setContactMsg('');
    setContactSubmitted(false);
  };

  const handleInquireNow = (classTitle: string) => {
    setContactSubject(`Inquiry: ${classTitle}`);
    scrollToSection('contact');
  };

  // ----------------------------------------
  // Admin State Helpers
  // ----------------------------------------
  const fileImportRef = useRef<HTMLInputElement | null>(null);
  const [newAdminPin, setNewAdminPin] = useState('');
  const [newAdminPinConfirm, setNewAdminPinConfirm] = useState('');
  const [cvPdfStatus, setCvPdfStatus] = useState<string>('Checking...');
  const [researchPdfStatus, setResearchPdfStatus] = useState<string>('Checking...');

  useEffect(() => {
    if (isAdminUnlocked) {
      hasPdfInDB('pdf_cv').then((has) => {
        setCvPdfStatus(has ? 'Custom Device PDF Active' : 'Default PDF Active');
      });
      hasPdfInDB('pdf_research').then((has) => {
        setResearchPdfStatus(has ? 'Custom Device PDF Active' : 'Default PDF Active');
      });
    }
  }, [isAdminUnlocked]);

  // ----------------------------------------
  // Confirmation Dialog
  // ----------------------------------------
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
  } | null>(null);

  return (
    <div className="min-h-screen bg-[#120f1a] text-[#fdf2f8] font-sans selection:bg-[#f472b6]/30 selection:text-[#f472b6] overflow-x-hidden">
      {/* ==========================================
          TOAST NOTIFICATION
      ========================================== */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md bg-[#262135]/95 border-[#f472b6]/40 text-white animate-fade-in">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#f472b6] shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.text}</span>
        </div>
      )}

      {/* ==========================================
          GENERIC CONFIRMATION DIALOG
      ========================================== */}
      {confirmDialog && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#262135] border border-white/15 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">{confirmDialog.title}</h3>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">{confirmDialog.message}</p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2.5 rounded-xl bg-[#1a1625] hover:bg-[#120f1a] text-sm font-medium text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDialog.onConfirm}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-[#f472b6] hover:opacity-95 text-sm font-semibold text-white shadow-lg transition"
              >
                {confirmDialog.confirmLabel || 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          1. NAVBAR & HEADER (NO VISIBLE ADMIN BUTTON)
      ========================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#120f1a]/90 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Client Monogram & Name */}
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#f472b6]/20 to-[#c084fc]/20 border border-[#f472b6]/40 flex items-center justify-center shadow-[0_0_25px_rgba(244,114,182,0.15)] group-hover:border-[#f472b6] transition">
              <span className="text-lg font-extrabold tracking-tight text-[#f472b6]">SR.</span>
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#f472b6] transition">
                {store.profile.name}
              </span>
              <span className="block text-xs text-[#94a3b8]">{store.profile.tagline}</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs xl:text-sm font-medium text-[#cbd5e1]">
            <button type="button" onClick={() => scrollToSection('home')} className="hover:text-[#f472b6] transition">
              Home
            </button>
            <button type="button" onClick={() => scrollToSection('philosophy')} className="hover:text-[#f472b6] transition">
              Philosophy
            </button>
            <button type="button" onClick={() => scrollToSection('about')} className="hover:text-[#f472b6] transition">
              About
            </button>
            <button type="button" onClick={() => scrollToSection('experience')} className="hover:text-[#f472b6] transition">
              Experience
            </button>
            <button type="button" onClick={() => scrollToSection('classes')} className="hover:text-[#f472b6] transition">
              Classes/Work
            </button>
            <button type="button" onClick={() => scrollToSection('research')} className="hover:text-[#f472b6] transition">
              Research
            </button>
            <button type="button" onClick={() => scrollToSection('reviews')} className="hover:text-[#f472b6] transition">
              Reviews
            </button>
            <button type="button" onClick={() => scrollToSection('swot')} className="hover:text-[#f472b6] transition">
              SWOT
            </button>
            <button type="button" onClick={() => scrollToSection('artifacts')} className="hover:text-[#f472b6] transition">
              Artifacts
            </button>
            <button type="button" onClick={() => scrollToSection('contact')} className="hover:text-[#f472b6] transition">
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadCv}
              className="px-4 py-2 rounded-full bg-[#1a1625] hover:bg-[#262135] border border-white/10 hover:border-[#f472b6]/50 text-slate-200 hover:text-[#f472b6] text-xs font-semibold flex items-center gap-1.5 transition"
              title="Download Educator Curriculum Vitae"
            >
              <Download className="w-3.5 h-3.5 text-[#f472b6]" />
              <span>Download CV</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-xs shadow-[0_0_25px_rgba(244,114,182,0.28)] hover:opacity-95 hover:scale-[1.02] active:scale-[0.99] transition"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#262135] border border-white/10 text-slate-200 hover:text-[#f472b6]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Responsive Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1a1625] border-b border-white/10 px-6 py-5 space-y-3">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Teaching Philosophy', id: 'philosophy' },
              { label: 'About Me & Stats', id: 'about' },
              { label: 'Academic & Professional Experience', id: 'experience' },
              { label: 'Work & Classes', id: 'classes' },
              { label: 'Research Proposal', id: 'research' },
              { label: 'Student Reviews', id: 'reviews' },
              { label: 'SWOT Analysis', id: 'swot' },
              { label: 'Pedagogical Artifacts', id: 'artifacts' },
              { label: 'Contact Me', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-[#f472b6] transition"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={handleDownloadCv}
                className="w-full py-3 rounded-xl bg-[#262135] hover:bg-[#262135]/80 text-white font-semibold text-sm flex items-center justify-center gap-2 border border-white/10"
              >
                <Download className="w-4 h-4 text-[#f472b6]" />
                <span>Download Official CV (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm text-center shadow-lg"
              >
                Let's Talk
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ==========================================
          2. HERO SECTION
      ========================================== */}
      <section id="home" className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#f472b6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#c084fc]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Greeting & Info */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#262135] border border-[#f472b6]/30 text-[#f472b6] text-xs sm:text-sm font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Academic Educator &amp; Mentor</span>
              </div>

              <div>
                <p className="text-base sm:text-lg uppercase tracking-[0.25em] text-[#cbd5e1] font-semibold">
                  Hello, It's Me
                </p>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mt-2">
                  {store.profile.name}
                </h1>
              </div>

              {/* Animated Typewriter Cycling 4 Roles */}
              <div className="flex items-center justify-center lg:justify-start gap-2 min-h-[40px]">
                <span className="text-lg sm:text-2xl text-[#cbd5e1] font-medium">I am a</span>
                <span className="text-xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#f472b6] to-[#c084fc] bg-clip-text text-transparent">
                  {currentText}
                </span>
                <span className="w-0.5 h-7 bg-[#f472b6] animate-pulse inline-block" />
              </div>

              <p className="text-base sm:text-lg text-[#cbd5e1] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {store.profile.heroBio}
              </p>

              {/* Social Media Buttons */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                {store.profile.socials.facebook && (
                  <a
                    href={ensureHttps(store.profile.socials.facebook)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-xl bg-[#262135] hover:bg-[#f472b6]/20 border border-white/10 hover:border-[#f472b6] text-slate-300 hover:text-[#f472b6] flex items-center justify-center transition shadow-sm"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {store.profile.whatsappNumber && (
                  <a
                    href={`https://wa.me/${sanitizeWhatsAppNumber(store.profile.whatsappNumber)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="w-10 h-10 rounded-xl bg-[#262135] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition shadow-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                )}
                {store.profile.socials.youtube && (
                  <a
                    href={ensureHttps(store.profile.socials.youtube)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="w-10 h-10 rounded-xl bg-[#262135] hover:bg-rose-500/20 border border-white/10 hover:border-rose-400 text-slate-300 hover:text-rose-400 flex items-center justify-center transition shadow-sm"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
                {store.profile.socials.linkedin && (
                  <a
                    href={ensureHttps(store.profile.socials.linkedin)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-xl bg-[#262135] hover:bg-[#c084fc]/20 border border-white/10 hover:border-[#c084fc] text-slate-300 hover:text-[#c084fc] flex items-center justify-center transition shadow-sm"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {store.profile.socials.instagram && (
                  <a
                    href={ensureHttps(store.profile.socials.instagram)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-xl bg-[#262135] hover:bg-pink-500/20 border border-white/10 hover:border-pink-400 text-slate-300 hover:text-pink-400 flex items-center justify-center transition shadow-sm"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('philosophy')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm sm:text-base shadow-[0_10px_30px_rgba(244,114,182,0.25)] hover:opacity-95 hover:-translate-y-0.5 transition flex items-center justify-center gap-2"
                >
                  <span>View Teaching Philosophy</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#262135] hover:bg-[#262135]/80 text-white border border-[#f472b6]/40 font-semibold text-sm sm:text-base transition hover:-translate-y-0.5"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Right Column: Circular Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#f472b6] via-[#c084fc] to-indigo-500 rounded-full blur-2xl opacity-40 animate-pulse" />

                {/* Circular Portrait Frame */}
                <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full p-2 bg-gradient-to-b from-[#f472b6]/50 via-white/10 to-[#c084fc]/50 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#1a1625] relative">
                    <img
                      src={store.profile.portraitUrl}
                      alt={store.profile.name}
                      style={{
                        transform: `scale(${store.profile.portraitZoom / 100}) translateY(${store.profile.portraitOffsetY}px)`
                      }}
                      className="w-full h-full object-cover transition-transform duration-200"
                    />
                  </div>
                </div>

                {/* Floating Metric Badge */}
                <div className="absolute -bottom-4 -left-4 sm:left-0 bg-[#262135]/95 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f472b6] to-[#c084fc] flex items-center justify-center text-[#120f1a] font-black">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#cbd5e1] font-medium">Islandwide Merit</p>
                    <p className="text-sm font-bold text-white">Top Exam Results</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. SECTION 1 — TEACHING PHILOSOPHY (PLACED FIRST)
      ========================================== */}
      <section id="philosophy" className="py-20 lg:py-28 bg-[#1a1625]/60 border-y border-white/[0.07] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
              Pedagogical Doctrine
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {store.philosophy.title}
            </h2>
            <p className="text-base sm:text-lg text-[#cbd5e1]">
              {store.philosophy.subtitle}
            </p>
          </div>

          {/* Quotation Highlight Card */}
          <div className="mt-12 bg-gradient-to-r from-[#262135] via-[#2a223e] to-[#262135] border border-[#f472b6]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <Quote className="absolute right-6 bottom-4 w-24 h-24 text-white/[0.04] pointer-events-none" />
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#f472b6]/20 border border-[#f472b6]/40 text-[#f472b6] flex items-center justify-center mx-auto">
                <Quote className="w-6 h-6" />
              </div>
              <blockquote className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
                "{store.philosophy.quote}"
              </blockquote>
              <p className="text-sm font-semibold text-[#f472b6] tracking-wider uppercase">
                — {store.philosophy.quoteAuthor}
              </p>
            </div>
          </div>

          {/* Pedagogical Approach Statement */}
          <div className="mt-8 bg-[#262135]/60 border border-white/10 rounded-2xl p-6 sm:p-8 text-[#cbd5e1] leading-relaxed text-base sm:text-lg text-center max-w-4xl mx-auto">
            {store.philosophy.approach}
          </div>

          {/* 3 Core Pedagogical Pillars */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {store.philosophy.pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-[#262135] border border-white/10 hover:border-[#f472b6]/40 rounded-3xl p-7 space-y-4 transition hover:-translate-y-1 shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f472b6]/20 to-[#c084fc]/20 border border-[#f472b6]/40 flex items-center justify-center text-[#f472b6]">
                  {renderPillarIcon(pillar.iconName)}
                </div>
                <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                <p className="text-sm text-[#cbd5e1] leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* 2-3 Teaching Photographs Carousel with Fullscreen Zoom */}
          {store.philosophy.photos && store.philosophy.photos.length > 0 && (
            <div className="mt-14 max-w-4xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden bg-[#262135] border border-white/10 shadow-2xl group">
                <div
                  className="relative h-72 sm:h-96 w-full cursor-zoom-in"
                  onClick={() =>
                    setZoomImageModal({
                      src: store.philosophy.photos[philosophyIndex],
                      caption: `Teaching & Classroom Methodology — Slide ${philosophyIndex + 1}`
                    })
                  }
                >
                  <img
                    src={store.philosophy.photos[philosophyIndex]}
                    alt={`Teaching Philosophy photo ${philosophyIndex + 1}`}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                    <p className="text-sm font-semibold text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#f472b6]" />
                      <span>Classroom Environment &amp; Interactive Learning • Click to Zoom</span>
                    </p>
                  </div>
                </div>

                {/* Controls */}
                {store.philosophy.photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setPhilosophyIndex(
                          (prev) => (prev - 1 + store.philosophy.photos.length) % store.philosophy.photos.length
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#f472b6] text-white flex items-center justify-center backdrop-blur-md transition"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPhilosophyIndex((prev) => (prev + 1) % store.philosophy.photos.length)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#f472b6] text-white flex items-center justify-center backdrop-blur-md transition"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 right-6 flex items-center gap-2">
                      {store.philosophy.photos.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setPhilosophyIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition ${
                            idx === philosophyIndex ? 'bg-[#f472b6] w-6' : 'bg-white/40'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          4. SECTION 2 — ABOUT ME & KEY STATS
      ========================================== */}
      <section id="about" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
                Academic Biography
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Dedicated to Educational Excellence &amp; Transformative Learning
              </h2>
              <div className="space-y-4 text-[#cbd5e1] text-base leading-relaxed">
                <p>{store.profile.aboutBio}</p>
                <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-[#f472b6]">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <MapPin className="w-4 h-4" />
                    {store.profile.location}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Mail className="w-4 h-4" />
                    {store.profile.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 4 Highlight Metric Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {store.profile.stats.map((stat, idx) => (
                <div
                  key={stat.id || idx}
                  className="bg-[#262135] border border-white/10 hover:border-[#f472b6]/40 rounded-3xl p-6 text-center shadow-lg transition hover:-translate-y-1"
                >
                  <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-[#f472b6] to-[#c084fc] bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-[#cbd5e1] mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. SECTION 3 — ACADEMIC & PROFESSIONAL EXPERIENCE
      ========================================== */}
      <section id="experience" className="py-20 lg:py-28 bg-[#1a1625]/60 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
              Career Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Academic &amp; Professional Experience
            </h2>
            <p className="text-base text-[#cbd5e1]">
              A timeline of leadership roles, lectureships, and curriculum modernization appointments.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="mt-16 max-w-4xl mx-auto relative">
            <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#f472b6] via-[#c084fc] to-transparent -translate-x-1/2 hidden sm:block" />

            <div className="space-y-12">
              {store.experiences.map((exp, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={exp.id}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    } gap-8`}
                  >
                    {/* Center Node */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#120f1a] border-2 border-[#f472b6] items-center justify-center z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f472b6]" />
                    </div>

                    {/* Timeline Card */}
                    <div className="sm:w-1/2 w-full">
                      <div className="bg-[#262135] border border-white/10 hover:border-[#f472b6]/40 rounded-3xl p-6 sm:p-7 shadow-xl space-y-3 transition hover:-translate-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#f472b6]/15 border border-[#f472b6]/30 text-[#f472b6] text-xs font-bold">
                            {exp.period}
                          </span>
                          <span className="text-xs text-[#94a3b8] flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#f472b6]" />
                            {exp.location}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                        <p className="text-sm font-semibold text-[#c084fc]">{exp.institution}</p>

                        {/* Bullet Points */}
                        <ul className="space-y-2 pt-2 text-xs sm:text-sm text-[#cbd5e1]">
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6] mt-2 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Attached Photos */}
                        {exp.images && exp.images.length > 0 && (
                          <div className="pt-3 border-t border-white/10 flex items-center gap-2 overflow-x-auto">
                            {exp.images.map((img, imgIdx) => (
                              <button
                                key={imgIdx}
                                type="button"
                                onClick={() =>
                                  setZoomImageModal({
                                    src: img,
                                    caption: `${exp.role} — ${exp.institution}`
                                  })
                                }
                                className="w-16 h-12 rounded-lg overflow-hidden border border-white/10 hover:border-[#f472b6] shrink-0"
                              >
                                <img src={img} alt="Event" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. SECTION 4 — WORK & CLASSES
      ========================================== */}
      <section id="classes" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
              Academic Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Work, Classes &amp; Special Courses
            </h2>
            <p className="text-base text-[#cbd5e1]">
              Explore structured theory masterclasses, target paper booster clinics, and seminar schedules.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {store.categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] shadow-lg'
                    : 'bg-[#262135] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Work Cards Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredWorks.map((work) => {
              const currentPhotoIdx = workCardIndices[work.id] || 0;
              const photoCount = work.images?.length || 0;
              const currentImg =
                photoCount > 0 ? work.images[currentPhotoIdx] : 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80';

              return (
                <div
                  key={work.id}
                  className="bg-[#262135] border border-white/10 hover:border-[#f472b6]/40 rounded-3xl overflow-hidden shadow-xl flex flex-col group transition hover:-translate-y-1"
                >
                  {/* Photo Carousel Header */}
                  <div
                    className="relative h-64 sm:h-72 w-full bg-[#1a1625] cursor-pointer"
                    onClick={() => {
                      setActiveWorkModal(work);
                      setModalPhotoIndex(currentPhotoIdx);
                    }}
                  >
                    <img
                      src={currentImg}
                      alt={work.title}
                      className="w-full h-full object-cover transition group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#262135] via-transparent to-black/30" />

                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#120f1a]/80 backdrop-blur-md border border-white/15 text-xs font-bold text-[#f472b6]">
                      {work.category}
                    </span>

                    {/* Photo Counter Badge */}
                    {photoCount > 1 && (
                      <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono font-bold text-white flex items-center gap-1">
                        📷 {currentPhotoIdx + 1}/{photoCount}
                      </span>
                    )}

                    {/* Prev / Next Buttons */}
                    {photoCount > 1 && (
                      <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                        <button
                          type="button"
                          onClick={(e) => handleWorkPrevPhoto(work.id, photoCount, e)}
                          className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#f472b6] text-white flex items-center justify-center backdrop-blur-md pointer-events-auto transition"
                          aria-label="Previous Photo"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleWorkNextPhoto(work.id, photoCount, e)}
                          className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#f472b6] text-white flex items-center justify-center backdrop-blur-md pointer-events-auto transition"
                          aria-label="Next Photo"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs text-[#f472b6] font-semibold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {work.schedule}
                      </p>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#f472b6] transition">
                        {work.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed line-clamp-3">
                        {work.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveWorkModal(work);
                          setModalPhotoIndex(currentPhotoIdx);
                        }}
                        className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4 text-[#c084fc]" />
                        <span>View Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInquireNow(work.title)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-xs sm:text-sm hover:opacity-95 shadow transition"
                      >
                        Inquire Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          7. SECTION 5 — RESEARCH PROPOSAL
      ========================================== */}
      <section id="research" className="py-20 lg:py-28 bg-[#1a1625]/60 border-y border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
              Academic Inquiry
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Pedagogical Research Proposal
            </h2>
            <p className="text-base text-[#cbd5e1]">
              Empirical investigation into cognitive scaffolding models and diagnostic essay marking rubrics.
            </p>
          </div>

          <div className="mt-12 bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 max-w-5xl mx-auto">
            {/* Header Meta */}
            <div className="space-y-3 border-b border-white/10 pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#f472b6]/15 border border-[#f472b6]/30 text-xs font-bold text-[#f472b6]">
                  {store.research.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-slate-200">
                  Published: {store.research.year}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {store.research.title}
              </h3>
              <p className="text-sm font-semibold text-[#c084fc]">
                {store.research.authors} • {store.research.institution}
              </p>
            </div>

            {/* Abstract & Methodology Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a1625] border border-white/10 rounded-2xl p-6 space-y-3">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#f472b6]" />
                  <span>Abstract</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                  {store.research.abstract}
                </p>
              </div>

              <div className="bg-[#1a1625] border border-white/10 rounded-2xl p-6 space-y-3">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#c084fc]" />
                  <span>Research Methodology</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                  {store.research.methodology}
                </p>
              </div>
            </div>

            {/* Key Findings & Impact Grid */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#f472b6]" />
                <span>Key Research Findings &amp; Measured Impact</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {store.research.findings.map((finding, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#1a1625] border border-white/10 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">{finding}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Download & Read Online Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1a1625] to-[#262135] border border-[#f472b6]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#f472b6]/20 border border-[#f472b6]/40 flex items-center justify-center text-[#f472b6]">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">Full Research Proposal Document</p>
                  <p className="text-xs text-[#94a3b8]">{store.research.fileSize || 'PDF • 2.8 MB'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleReadResearchOnline}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#262135] hover:bg-[#1a1625] border border-white/10 text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-1.5 transition"
                >
                  <ExternalLink className="w-4 h-4 text-[#c084fc]" />
                  <span>Read Online</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadResearch}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-lg transition hover:opacity-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Proposal (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          8. SECTION 6 — STUDENT REVIEWS & TESTIMONIALS
      ========================================== */}
      <section id="reviews" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
                Student Success Stories
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Verified Reviews &amp; Testimonials
              </h2>
              <p className="text-base text-[#cbd5e1] max-w-2xl">
                Read direct feedback from high-ranking exam batches, revision participants, and proud parents.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setReviewModalOpen(true)}
              className="px-6 py-3 rounded-full bg-[#262135] hover:bg-[#262135]/80 border border-[#f472b6]/40 text-white font-semibold text-sm flex items-center gap-2 self-start md:self-auto transition shadow-lg"
            >
              <Star className="w-4 h-4 text-[#f472b6] fill-[#f472b6]" />
              <span>Submit a Review</span>
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#262135] border border-white/10 hover:border-[#f472b6]/30 rounded-3xl p-7 shadow-lg flex flex-col justify-between space-y-4 transition hover:-translate-y-1"
              >
                <div className="space-y-3">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#cbd5e1] leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                    <p className="text-xs text-[#94a3b8]">{rev.role}</p>
                  </div>
                  <span className="text-[11px] text-[#f472b6] font-medium">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          9. SECTION 7 — SWOT ANALYSIS (PLACED JUST BEFORE ARTIFACTS)
      ========================================== */}
      <section id="swot" className="py-20 lg:py-28 bg-[#1a1625]/60 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
              Strategic Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Pedagogical SWOT Analysis Matrix
            </h2>
            <p className="text-base text-[#cbd5e1]">
              A strategic evaluation of teaching competencies, operational challenges, future pathways, and mitigation doctrines.
            </p>
          </div>

          {/* 4-Quadrant Matrix */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* STRENGTHS (Emerald) */}
            <div className="bg-[#262135] border border-emerald-500/30 rounded-3xl p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold">
                  S
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Strengths</h3>
                  <p className="text-xs text-emerald-400 font-medium">Core Pedagogical Assets</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#cbd5e1]">
                {store.swot.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WEAKNESSES (Amber) */}
            <div className="bg-[#262135] border border-amber-500/30 rounded-3xl p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold">
                  W
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Weaknesses</h3>
                  <p className="text-xs text-amber-400 font-medium">Capacity &amp; Scaling Constraints</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#cbd5e1]">
                {store.swot.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* OPPORTUNITIES (Cyan) */}
            <div className="bg-[#262135] border border-cyan-500/30 rounded-3xl p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold">
                  O
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Opportunities</h3>
                  <p className="text-xs text-cyan-400 font-medium">Technological &amp; Regional Horizons</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#cbd5e1]">
                {store.swot.opportunities.map((o, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* THREATS (Rose) */}
            <div className="bg-[#262135] border border-rose-500/30 rounded-3xl p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-center font-bold">
                  T
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Threats</h3>
                  <p className="text-xs text-rose-400 font-medium">Macro Shifts &amp; Disparities</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#cbd5e1]">
                {store.swot.threats.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          10. SECTION 8 — PEDAGOGICAL ARTIFACTS (BEFORE CONTACT)
      ========================================== */}
      <section id="artifacts" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
              Teaching Frameworks
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Pedagogical Artifacts &amp; Blueprints
            </h2>
            <p className="text-base text-[#cbd5e1]">
              Download and inspect authentic lesson architectures, marking schemas, and student revision planners.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {store.artifacts.map((artifact) => (
              <div
                key={artifact.id}
                className="bg-[#262135] border border-white/10 hover:border-[#f472b6]/40 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition hover:-translate-y-1"
              >
                <div>
                  {/* Preview Image with zoom */}
                  <div
                    className="relative h-48 w-full bg-[#1a1625] cursor-zoom-in"
                    onClick={() =>
                      setZoomImageModal({
                        src: artifact.previewImage,
                        caption: artifact.title
                      })
                    }
                  >
                    <img
                      src={artifact.previewImage}
                      alt={artifact.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#262135] via-transparent to-transparent" />
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#120f1a]/80 backdrop-blur-md text-[11px] font-bold text-[#f472b6] border border-white/15">
                      {artifact.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-white">{artifact.title}</h3>
                    <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                      {artifact.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => handleDownloadArtifact(artifact)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f472b6]/20 to-[#c084fc]/20 hover:from-[#f472b6] hover:to-[#c084fc] border border-[#f472b6]/40 text-xs sm:text-sm font-bold text-white hover:text-[#120f1a] flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <Download className="w-4 h-4 text-[#f472b6] group-hover:text-[#120f1a]" />
                    <span>Download Lesson Plan (PDF)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          11. SECTION 9 — CONTACT ME
      ========================================== */}
      <section id="contact" className="py-20 lg:py-28 bg-[#1a1625]/60 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Connect &amp; Enroll
            </h2>
            <p className="text-base text-[#cbd5e1]">
              Reach out directly for class enrollment inquiries, paper revision booster admissions, or academic seminars.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-4">
              <a
                href={`https://wa.me/${sanitizeWhatsAppNumber(store.profile.whatsappNumber)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#262135] border border-white/10 hover:border-emerald-400 rounded-3xl p-6 flex items-center gap-4 transition shadow-lg group block"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Direct WhatsApp</p>
                  <p className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                    {store.profile.whatsappNumber}
                  </p>
                  <p className="text-xs text-[#94a3b8]">Instant inquiry &amp; quick answers</p>
                </div>
              </a>

              <a
                href={`mailto:${store.profile.email}`}
                className="bg-[#262135] border border-white/10 hover:border-[#f472b6] rounded-3xl p-6 flex items-center gap-4 transition shadow-lg group block"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#f472b6]/20 text-[#f472b6] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#f472b6] uppercase tracking-wider">Email Inquiry</p>
                  <p className="text-base font-bold text-white group-hover:text-[#f472b6] transition">
                    {store.profile.email}
                  </p>
                  <p className="text-xs text-[#94a3b8]">Official academic communications</p>
                </div>
              </a>

              <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 flex items-center gap-4 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-[#c084fc]/20 text-[#c084fc] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#c084fc] uppercase tracking-wider">Service Location</p>
                  <p className="text-base font-bold text-white">{store.profile.location}</p>
                  <p className="text-xs text-[#94a3b8]">Physical audit halls &amp; interactive Zoom Live</p>
                </div>
              </div>
            </div>

            {/* Right: Validated Contact Form */}
            <div className="lg:col-span-7 bg-[#262135] border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl">
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Kasun Silva"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1625] border border-white/10 text-white placeholder-slate-500 focus:border-[#f472b6] focus:outline-none text-sm transition"
                  />
                  {contactSubmitted && !contactName.trim() && (
                    <p className="text-xs text-rose-400 mt-1">Please enter your name.</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#cbd5e1]">
                      Phone / WhatsApp Number *
                    </label>
                    {phoneDirty && (
                      <span
                        className={`text-xs font-medium flex items-center gap-1 ${
                          phoneValid ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {phoneValid ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Valid phone number
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5" /> Minimum 9 digits required
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="e.g. 077 123 4567 or +94771234567"
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-[#1a1625] border text-white placeholder-slate-500 text-sm focus:outline-none transition ${
                      phoneDirty
                        ? phoneValid
                          ? 'border-emerald-500/60 focus:border-emerald-400'
                          : 'border-rose-500/70 focus:border-rose-400'
                        : 'border-white/10 focus:border-[#f472b6]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">
                    Subject / Batch Selection
                  </label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="e.g. 2026 Theory Masterclass Intake"
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1625] border border-white/10 text-white placeholder-slate-500 focus:border-[#f472b6] focus:outline-none text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">
                    Your Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Tell us about your learning goals or questions..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1625] border border-white/10 text-white placeholder-slate-500 focus:border-[#f472b6] focus:outline-none text-sm transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm shadow-[0_10px_30px_rgba(244,114,182,0.25)] hover:opacity-95 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          12. FOOTER (NO THIRD-PARTY DEVELOPER CREDITS, NO VISIBLE ADMIN BUTTON)
      ========================================== */}
      <footer className="bg-[#1a1625] border-t border-white/[0.07] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#94a3b8]">
          <p
            onDoubleClick={openAdminStudio}
            title="Educational Studio"
            className="select-none cursor-default"
          >
            Copyright © {new Date().getFullYear()} {store.profile.name}. All Rights Reserved.
          </p>
          <p className="font-medium text-[#cbd5e1]">
            Colombo • Kandy • Gampaha • Online Islandwide
          </p>
        </div>
      </footer>

      {/* ==========================================
          MODAL: WORK DETAILS & FULL GALLERY VIEWER
      ========================================== */}
      {activeWorkModal && (
        <div
          onClick={() => setActiveWorkModal(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#262135] border border-[#f472b6]/30 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-8 space-y-6 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-[#f472b6] uppercase tracking-wider">
                  {activeWorkModal.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activeWorkModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveWorkModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Gallery Image Display */}
            {activeWorkModal.images && activeWorkModal.images.length > 0 && (
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-black/50">
                <img
                  src={activeWorkModal.images[modalPhotoIndex] || activeWorkModal.images[0]}
                  alt="Class preview"
                  className="w-full h-full object-cover"
                />
                {activeWorkModal.images.length > 1 && (
                  <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setModalPhotoIndex(
                          (prev) => (prev - 1 + activeWorkModal.images.length) % activeWorkModal.images.length
                        )
                      }
                      className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#f472b6] text-white flex items-center justify-center backdrop-blur-md transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setModalPhotoIndex((prev) => (prev + 1) % activeWorkModal.images.length)
                      }
                      className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#f472b6] text-white flex items-center justify-center backdrop-blur-md transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3">
              <p className="text-xs text-[#f472b6] font-semibold flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {activeWorkModal.schedule}
              </p>
              <p className="text-sm text-[#cbd5e1] leading-relaxed">
                {activeWorkModal.description}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveWorkModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#1a1625] text-slate-300 hover:text-white text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleInquireNow(activeWorkModal.title);
                  setActiveWorkModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] text-xs font-bold shadow transition hover:opacity-95"
              >
                Inquire for This Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: SUBMIT STUDENT REVIEW
      ========================================== */}
      {reviewModalOpen && (
        <div
          onClick={() => setReviewModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#262135] border border-[#f472b6]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Submit a Student Review</h3>
                <p className="text-xs text-[#cbd5e1]">Your feedback helps future students choose with confidence.</p>
              </div>
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {revSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Review Received!</h4>
                <p className="text-xs text-[#cbd5e1]">Thank you! Your feedback will appear after educator verification.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={revName}
                    onChange={(e) => setRevName(e.target.value)}
                    placeholder="e.g. Kavindi Perera"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white focus:border-[#f472b6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Exam Batch / Role</label>
                  <input
                    type="text"
                    value={revRole}
                    onChange={(e) => setRevRole(e.target.value)}
                    placeholder="e.g. 2026 Batch Student / Online Revision"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white focus:border-[#f472b6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRevRating(star)}
                        className="text-amber-400 hover:scale-110 transition"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= revRating ? 'fill-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#f472b6] ml-2">{revRating} of 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">Review Comments *</label>
                  <textarea
                    rows={4}
                    value={revText}
                    onChange={(e) => setRevText(e.target.value)}
                    placeholder="How have Miss Saduni's classes or methods helped you?"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white focus:border-[#f472b6] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm shadow transition hover:opacity-95"
                >
                  Submit for Approval
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: FULLSCREEN IMAGE ZOOM
      ========================================== */}
      {zoomImageModal && (
        <div
          onClick={() => setZoomImageModal(null)}
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#1a1625] border border-white/15 rounded-3xl overflow-hidden shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-xs font-medium text-slate-300">
                {zoomImageModal.caption || 'Image Viewer'}
              </span>
              <button
                type="button"
                onClick={() => setZoomImageModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 sm:p-4 max-h-[80vh] flex items-center justify-center overflow-hidden">
              <img
                src={zoomImageModal.src}
                alt="Enlarged"
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          HIDDEN ADMIN PIN SECURITY MODAL
      ========================================== */}
      {showPinModal && !isAdminUnlocked && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className={`bg-[#262135] border border-[#f472b6]/40 rounded-3xl max-w-sm w-full p-7 shadow-2xl space-y-5 transition-transform ${
              pinError ? 'translate-x-2 border-rose-500' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#f472b6]/20 border border-[#f472b6]/40 flex items-center justify-center text-[#f472b6]">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Admin Studio Access</h3>
                  <p className="text-xs text-[#cbd5e1]">Enter security PIN to unlock</p>
                </div>
              </div>
              <button
                type="button"
                onClick={exitAdminStudio}
                className="text-slate-400 hover:text-white"
                title="Return to Public Website"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePinUnlock} className="space-y-4">
              <div className="relative">
                <input
                  type={showPinChars ? 'text' : 'password'}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Admin PIN"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1625] border border-white/15 text-white text-center tracking-[0.3em] font-bold focus:border-[#f472b6] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPinChars(!showPinChars)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPinChars ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {pinError && (
                <p className="text-xs text-rose-400 text-center font-medium">
                  Invalid Security PIN. Please try again.
                </p>
              )}

              <p className="text-[11px] text-[#94a3b8] text-center">
                Default PIN: <code className="text-[#f472b6] font-mono font-bold">1234</code>
              </p>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm hover:opacity-95 transition shadow-lg"
              >
                Unlock Dashboard
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={exitAdminStudio}
                  className="text-xs text-slate-400 hover:text-[#f472b6] transition underline underline-offset-4"
                >
                  ← Return to Public Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          HIDDEN ADMIN CRUD DASHBOARD OVERLAY (10 TABS)
      ========================================== */}
      {isAdminUnlocked && (
        <div className="fixed inset-0 z-50 bg-[#120f1a] overflow-y-auto text-slate-100">
          {/* Top Admin Bar */}
          <div className="sticky top-0 z-20 bg-[#1a1625]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f472b6] to-[#c084fc] text-[#120f1a] flex items-center justify-center font-extrabold text-base">
                SR
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Saduni Ranasinghe • Admin Studio</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Unlocked
                  </span>
                </h2>
                <p className="text-xs text-[#94a3b8]">
                  Auto-saved to localStorage • Accessible via <span className="text-[#f472b6]">/#admin</span> or <span className="text-[#f472b6]">Ctrl+Shift+A</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={exitAdminStudio}
              className="px-4 py-2 rounded-xl bg-[#262135] hover:bg-rose-500/20 border border-white/10 hover:border-rose-400 text-xs sm:text-sm font-semibold text-white flex items-center gap-2 transition"
            >
              <X className="w-4 h-4" />
              <span>Exit to Public Website</span>
            </button>
          </div>

          {/* Admin Navigation Tabs (10 Tabs) */}
          <div className="bg-[#1a1625] border-b border-white/10 px-4 sm:px-8 overflow-x-auto">
            <div className="flex items-center gap-2 py-2 min-w-max">
              {[
                { id: 'profile', label: '1. Profile & CV' },
                { id: 'philosophy', label: '2. Philosophy' },
                { id: 'experience', label: '3. Experience' },
                { id: 'works', label: '4. Classes & Works' },
                { id: 'research', label: '5. Research Proposal' },
                { id: 'swot', label: '6. SWOT Matrix' },
                { id: 'artifacts', label: '7. Artifacts' },
                { id: 'reviews', label: '8. Reviews' },
                { id: 'messages', label: '9. Inbox & Inquiries' },
                { id: 'settings', label: '10. Settings & Backup' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setAdminTab(t.id as AdminTab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    adminTab === t.id
                      ? 'bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Admin Tab Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            {/* ----------------------------------------
                TAB 1: PROFILE & CV
            ---------------------------------------- */}
            {adminTab === 'profile' && (
              <div className="space-y-8">
                {/* Portrait Uploader & Sliders */}
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Camera className="w-5 h-5 text-[#f472b6]" />
                    <span>Educator Portrait &amp; Framing</span>
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="w-40 h-40 rounded-full overflow-hidden bg-black/40 border-2 border-[#f472b6]/40 relative shrink-0">
                      <img
                        src={store.profile.portraitUrl}
                        alt="Preview"
                        style={{
                          transform: `scale(${store.profile.portraitZoom / 100}) translateY(${store.profile.portraitOffsetY}px)`
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-4 w-full">
                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                          Upload New Portrait Image from Device
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const compressed = await compressImageFile(file, 800, 0.85);
                            setStore((prev) => ({
                              ...prev,
                              profile: { ...prev.profile, portraitUrl: compressed }
                            }));
                            triggerToast('Portrait photo updated');
                          }}
                          className="text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#f472b6]/20 file:text-[#f472b6] hover:file:bg-[#f472b6]/30 cursor-pointer"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-[#cbd5e1] mb-1">
                            Zoom: {store.profile.portraitZoom}%
                          </label>
                          <input
                            type="range"
                            min="75"
                            max="200"
                            value={store.profile.portraitZoom}
                            onChange={(e) =>
                              setStore((prev) => ({
                                ...prev,
                                profile: { ...prev.profile, portraitZoom: Number(e.target.value) }
                              }))
                            }
                            className="w-full accent-[#f472b6]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#cbd5e1] mb-1">
                            Vertical Offset: {store.profile.portraitOffsetY}px
                          </label>
                          <input
                            type="range"
                            min="-50"
                            max="50"
                            value={store.profile.portraitOffsetY}
                            onChange={(e) =>
                              setStore((prev) => ({
                                ...prev,
                                profile: { ...prev.profile, portraitOffsetY: Number(e.target.value) }
                              }))
                            }
                            className="w-full accent-[#f472b6]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Device CV PDF Manager (IndexedDB) */}
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Download className="w-5 h-5 text-[#f472b6]" />
                      <span>Device CV PDF Manager (IndexedDB Native)</span>
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-[#f472b6]/20 text-[#f472b6] text-xs font-bold">
                      {cvPdfStatus}
                    </span>
                  </div>

                  <p className="text-xs text-[#cbd5e1]">
                    Upload your official Curriculum Vitae PDF directly from your device (PC or Phone). It is securely stored inside browser IndexedDB and immediately served when students click "Download CV".
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const dataUrl = await readFileAsDataUrl(file);
                        await storePdfToDB('pdf_cv', dataUrl, file.name);
                        setCvPdfStatus('Custom Device PDF Active');
                        triggerToast(`CV PDF "${file.name}" saved to device storage`);
                      }}
                      className="text-xs text-slate-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gradient-to-r file:from-[#f472b6] file:to-[#c084fc] file:text-[#120f1a] cursor-pointer"
                    />

                    <button
                      type="button"
                      onClick={handleDownloadCv}
                      className="px-4 py-2.5 rounded-xl bg-[#1a1625] hover:bg-white/5 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition"
                    >
                      <Download className="w-4 h-4 text-[#f472b6]" />
                      <span>Test Download CV</span>
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        await deletePdfFromDB('pdf_cv');
                        setCvPdfStatus('Default PDF Active');
                        triggerToast('Reverted to default generated CV PDF');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-semibold text-rose-300 transition"
                    >
                      Reset to Default CV
                    </button>
                  </div>
                </div>

                {/* General Bio & Typewriter Roles */}
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
                  <h3 className="text-lg font-bold text-white">Identity &amp; Biographies</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#cbd5e1] mb-1">Full Name</label>
                      <input
                        type="text"
                        value={store.profile.name}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            profile: { ...prev.profile, name: e.target.value }
                          }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#cbd5e1] mb-1">Tagline</label>
                      <input
                        type="text"
                        value={store.profile.tagline}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            profile: { ...prev.profile, tagline: e.target.value }
                          }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                      />
                    </div>
                  </div>

                  {/* 4 Animated Typewriter Roles */}
                  <div>
                    <label className="block text-xs text-[#cbd5e1] mb-2 font-semibold">
                      Animated Typewriter Roles (Displayed cycling in Hero)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {store.profile.roles.map((role, rIdx) => (
                        <div key={rIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={role}
                            onChange={(e) => {
                              const newRoles = [...store.profile.roles];
                              newRoles[rIdx] = e.target.value;
                              setStore((prev) => ({
                                ...prev,
                                profile: { ...prev.profile, roles: newRoles }
                              }));
                            }}
                            className="flex-1 px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                          />
                          {store.profile.roles.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newRoles = store.profile.roles.filter((_, i) => i !== rIdx);
                                setStore((prev) => ({
                                  ...prev,
                                  profile: { ...prev.profile, roles: newRoles }
                                }));
                              }}
                              className="p-2 text-rose-400 hover:text-rose-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {store.profile.roles.length < 6 && (
                      <button
                        type="button"
                        onClick={() => {
                          setStore((prev) => ({
                            ...prev,
                            profile: {
                              ...prev.profile,
                              roles: [...prev.profile.roles, 'New Professional Role']
                            }
                          }));
                        }}
                        className="mt-2 text-xs text-[#f472b6] font-semibold flex items-center gap-1 hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Role
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-[#cbd5e1] mb-1">Short Hero Bio</label>
                    <textarea
                      rows={2}
                      value={store.profile.heroBio}
                      onChange={(e) =>
                        setStore((prev) => ({
                          ...prev,
                          profile: { ...prev.profile, heroBio: e.target.value }
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#cbd5e1] mb-1">Detailed About Me Bio</label>
                    <textarea
                      rows={4}
                      value={store.profile.aboutBio}
                      onChange={(e) =>
                        setStore((prev) => ({
                          ...prev,
                          profile: { ...prev.profile, aboutBio: e.target.value }
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>
                </div>

                {/* 4 Key Stats Counters Manager */}
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-bold text-white">4 Highlight Metric Counters</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {store.profile.stats.map((stat, sIdx) => (
                      <div key={stat.id || sIdx} className="p-4 bg-[#1a1625] rounded-2xl border border-white/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#f472b6]">Metric 0{sIdx + 1}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] text-[#cbd5e1] block mb-1">Value / Number</label>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => {
                                const newStats = [...store.profile.stats];
                                newStats[sIdx] = { ...newStats[sIdx], value: e.target.value };
                                setStore((prev) => ({
                                  ...prev,
                                  profile: { ...prev.profile, stats: newStats }
                                }));
                              }}
                              className="w-full px-3 py-1.5 rounded-lg bg-[#262135] border border-white/10 text-xs text-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-[#cbd5e1] block mb-1">Metric Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => {
                                const newStats = [...store.profile.stats];
                                newStats[sIdx] = { ...newStats[sIdx], label: e.target.value };
                                setStore((prev) => ({
                                  ...prev,
                                  profile: { ...prev.profile, stats: newStats }
                                }));
                              }}
                              className="w-full px-3 py-1.5 rounded-lg bg-[#262135] border border-white/10 text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact & Social Links */}
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-bold text-white">Contact &amp; Social Links</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-[#cbd5e1] mb-1">Location</label>
                      <input
                        type="text"
                        value={store.profile.location}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            profile: { ...prev.profile, location: e.target.value }
                          }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#cbd5e1] mb-1">Email</label>
                      <input
                        type="email"
                        value={store.profile.email}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            profile: { ...prev.profile, email: e.target.value }
                          }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#cbd5e1] mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        value={store.profile.whatsappNumber}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            profile: { ...prev.profile, whatsappNumber: e.target.value }
                          }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {(
                      [
                        { key: 'facebook', label: 'Facebook URL' },
                        { key: 'whatsapp', label: 'WhatsApp Link' },
                        { key: 'youtube', label: 'YouTube Channel URL' },
                        { key: 'linkedin', label: 'LinkedIn Profile URL' },
                        { key: 'instagram', label: 'Instagram Profile URL' }
                      ] as const
                    ).map(({ key, label }) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs text-[#cbd5e1]">{label}</label>
                          {store.profile.socials[key] && (
                            <a
                              href={ensureHttps(store.profile.socials[key])}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-[#f472b6] hover:underline flex items-center gap-1"
                            >
                              Test Link ↗
                            </a>
                          )}
                        </div>
                        <input
                          type="text"
                          value={store.profile.socials[key]}
                          onChange={(e) =>
                            setStore((prev) => ({
                              ...prev,
                              profile: {
                                ...prev.profile,
                                socials: {
                                  ...prev.profile.socials,
                                  [key]: e.target.value
                                }
                              }
                            }))
                          }
                          className="w-full px-4 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------
                TAB 2: PHILOSOPHY
            ---------------------------------------- */}
            {adminTab === 'philosophy' && (
              <div className="space-y-6">
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-bold text-white">Philosophy Content</h3>
                  <div>
                    <label className="block text-xs text-[#cbd5e1] mb-1">Section Title</label>
                    <input
                      type="text"
                      value={store.philosophy.title}
                      onChange={(e) =>
                        setStore((prev) => ({
                          ...prev,
                          philosophy: { ...prev.philosophy, title: e.target.value }
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#cbd5e1] mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={store.philosophy.subtitle}
                      onChange={(e) =>
                        setStore((prev) => ({
                          ...prev,
                          philosophy: { ...prev.philosophy, subtitle: e.target.value }
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#cbd5e1] mb-1">Quote</label>
                      <textarea
                        rows={3}
                        value={store.philosophy.quote}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            philosophy: { ...prev.philosophy, quote: e.target.value }
                          }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#cbd5e1] mb-1">Quote Author</label>
                      <input
                        type="text"
                        value={store.philosophy.quoteAuthor}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            philosophy: { ...prev.philosophy, quoteAuthor: e.target.value }
                          }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#cbd5e1] mb-1">Pedagogical Approach</label>
                    <textarea
                      rows={3}
                      value={store.philosophy.approach}
                      onChange={(e) =>
                        setStore((prev) => ({
                          ...prev,
                          philosophy: { ...prev.philosophy, approach: e.target.value }
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>
                </div>

                {/* 3 Pillars */}
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-bold text-white">3 Core Pillars</h3>
                  <div className="space-y-4">
                    {store.philosophy.pillars.map((pillar, pIdx) => (
                      <div key={pillar.id} className="p-4 bg-[#1a1625] rounded-2xl border border-white/10 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-[#cbd5e1] block mb-1">Pillar Title</label>
                            <input
                              type="text"
                              value={pillar.title}
                              onChange={(e) => {
                                const newPillars = [...store.philosophy.pillars];
                                newPillars[pIdx] = { ...newPillars[pIdx], title: e.target.value };
                                setStore((prev) => ({
                                  ...prev,
                                  philosophy: { ...prev.philosophy, pillars: newPillars }
                                }));
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-[#262135] border border-white/10 text-xs text-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-[#cbd5e1] block mb-1">Icon Type</label>
                            <select
                              value={pillar.iconName}
                              onChange={(e) => {
                                const newPillars = [...store.philosophy.pillars];
                                newPillars[pIdx] = {
                                  ...newPillars[pIdx],
                                  iconName: e.target.value as any
                                };
                                setStore((prev) => ({
                                  ...prev,
                                  philosophy: { ...prev.philosophy, pillars: newPillars }
                                }));
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-[#262135] border border-white/10 text-xs text-white"
                            >
                              <option value="BookOpen">BookOpen (Conceptual Clarity)</option>
                              <option value="Target">Target (Diagnostic Clinics)</option>
                              <option value="Sparkles">Sparkles (Mentorship & Mindset)</option>
                              <option value="GraduationCap">GraduationCap (Academic Rigor)</option>
                              <option value="Award">Award (Achievement)</option>
                              <option value="Compass">Compass (Navigation)</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-[#cbd5e1] block mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={pillar.description}
                            onChange={(e) => {
                              const newPillars = [...store.philosophy.pillars];
                              newPillars[pIdx] = { ...newPillars[pIdx], description: e.target.value };
                              setStore((prev) => ({
                                ...prev,
                                philosophy: { ...prev.philosophy, pillars: newPillars }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#262135] border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2-3 Carousel Photos Manager */}
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-bold text-white">Philosophy Carousel Photos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {store.philosophy.photos.map((ph, phIdx) => (
                      <div key={phIdx} className="bg-[#1a1625] rounded-2xl border border-white/10 p-3 space-y-2">
                        <div className="h-32 w-full rounded-xl overflow-hidden bg-black/40">
                          <img src={ph} alt="Slide" className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newPhotos = store.philosophy.photos.filter((_, i) => i !== phIdx);
                            setStore((prev) => ({
                              ...prev,
                              philosophy: { ...prev.philosophy, photos: newPhotos }
                            }));
                          }}
                          className="w-full py-1.5 rounded-lg bg-rose-500/20 text-rose-300 text-xs font-semibold hover:bg-rose-500/30"
                        >
                          Remove Photo
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs text-[#cbd5e1] mb-1">
                      Upload and add photo from device (auto-compressed)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const compressed = await compressImageFile(file, 1000, 0.75);
                        setStore((prev) => ({
                          ...prev,
                          philosophy: {
                            ...prev.philosophy,
                            photos: [...prev.philosophy.photos, compressed]
                          }
                        }));
                        triggerToast('Teaching photo added to carousel');
                      }}
                      className="text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#f472b6]/20 file:text-[#f472b6] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------
                TAB 3: EXPERIENCE CRUD
            ---------------------------------------- */}
            {adminTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Experience Timeline Entries</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newExp: ExperienceItem = {
                        id: 'exp_' + Date.now(),
                        role: 'New Academic Appointment',
                        institution: 'Higher Education Institution',
                        period: '2024 – Present',
                        location: 'Colombo, Sri Lanka',
                        bullets: ['Spearheaded academic course development.'],
                        images: []
                      };
                      setStore((prev) => ({
                        ...prev,
                        experiences: [newExp, ...prev.experiences]
                      }));
                      triggerToast('New experience entry created');
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                </div>

                <div className="space-y-6">
                  {store.experiences.map((exp, eIdx) => (
                    <div key={exp.id} className="bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#f472b6]">Entry #{eIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setStore((prev) => ({
                              ...prev,
                              experiences: prev.experiences.filter((x) => x.id !== exp.id)
                            }));
                            triggerToast('Experience entry deleted');
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-semibold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[#cbd5e1] block mb-1">Role Title</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const newArr = [...store.experiences];
                              newArr[eIdx] = { ...newArr[eIdx], role: e.target.value };
                              setStore((prev) => ({ ...prev, experiences: newArr }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[#cbd5e1] block mb-1">Institution</label>
                          <input
                            type="text"
                            value={exp.institution}
                            onChange={(e) => {
                              const newArr = [...store.experiences];
                              newArr[eIdx] = { ...newArr[eIdx], institution: e.target.value };
                              setStore((prev) => ({ ...prev, experiences: newArr }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[#cbd5e1] block mb-1">Period (e.g. 2020 – Present)</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => {
                              const newArr = [...store.experiences];
                              newArr[eIdx] = { ...newArr[eIdx], period: e.target.value };
                              setStore((prev) => ({ ...prev, experiences: newArr }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[#cbd5e1] block mb-1">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => {
                              const newArr = [...store.experiences];
                              newArr[eIdx] = { ...newArr[eIdx], location: e.target.value };
                              setStore((prev) => ({ ...prev, experiences: newArr }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Description Bullets */}
                      <div>
                        <label className="text-xs text-[#cbd5e1] block mb-2 font-semibold">
                          Description Bullet Points
                        </label>
                        <div className="space-y-2">
                          {exp.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={bullet}
                                onChange={(e) => {
                                  const newArr = [...store.experiences];
                                  const newBullets = [...newArr[eIdx].bullets];
                                  newBullets[bIdx] = e.target.value;
                                  newArr[eIdx] = { ...newArr[eIdx], bullets: newBullets };
                                  setStore((prev) => ({ ...prev, experiences: newArr }));
                                }}
                                className="flex-1 px-3 py-1.5 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newArr = [...store.experiences];
                                  newArr[eIdx].bullets = newArr[eIdx].bullets.filter((_, i) => i !== bIdx);
                                  setStore((prev) => ({ ...prev, experiences: newArr }));
                                }}
                                className="text-rose-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newArr = [...store.experiences];
                            newArr[eIdx].bullets = [...newArr[eIdx].bullets, 'New milestone bullet point'];
                            setStore((prev) => ({ ...prev, experiences: newArr }));
                          }}
                          className="mt-2 text-xs text-[#f472b6] font-semibold flex items-center gap-1 hover:underline"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Bullet Point
                        </button>
                      </div>

                      {/* Photos */}
                      <div>
                        <label className="text-xs text-[#cbd5e1] block mb-2">Attached Event Photos</label>
                        <div className="flex flex-wrap items-center gap-3">
                          {exp.images.map((img, imgIdx) => (
                            <div key={imgIdx} className="relative w-20 h-16 rounded-xl overflow-hidden border border-white/15">
                              <img src={img} alt="Event" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => {
                                  const newArr = [...store.experiences];
                                  newArr[eIdx].images = newArr[eIdx].images.filter((_, i) => i !== imgIdx);
                                  setStore((prev) => ({ ...prev, experiences: newArr }));
                                }}
                                className="absolute top-1 right-1 bg-black/70 text-rose-400 rounded-full p-0.5"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}

                          <label className="w-20 h-16 rounded-xl border border-dashed border-white/20 hover:border-[#f472b6] flex flex-col items-center justify-center text-[10px] text-slate-400 cursor-pointer transition">
                            <Plus className="w-4 h-4 text-[#f472b6]" />
                            <span>Add Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const comp = await compressImageFile(file, 800, 0.75);
                                const newArr = [...store.experiences];
                                newArr[eIdx].images = [...newArr[eIdx].images, comp];
                                setStore((prev) => ({ ...prev, experiences: newArr }));
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------
                TAB 4: CLASSES & WORKS CRUD
            ---------------------------------------- */}
            {adminTab === 'works' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Class Offerings &amp; Courses</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newWork: WorkItem = {
                        id: 'w_' + Date.now(),
                        title: 'New Theory Batch Offering',
                        category: 'Theory Batches',
                        schedule: 'Weekends • 8:30 AM – 12:30 PM',
                        description: 'Detailed curriculum coverage with practice paper packs.',
                        images: [
                          'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80'
                        ]
                      };
                      setStore((prev) => ({
                        ...prev,
                        works: [newWork, ...prev.works]
                      }));
                      triggerToast('New class offering created');
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" /> Add Class
                  </button>
                </div>

                <div className="space-y-6">
                  {store.works.map((work, wIdx) => (
                    <div key={work.id} className="bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={wIdx === 0}
                            onClick={() => {
                              const newArr = [...store.works];
                              const temp = newArr[wIdx - 1];
                              newArr[wIdx - 1] = newArr[wIdx];
                              newArr[wIdx] = temp;
                              setStore((prev) => ({ ...prev, works: newArr }));
                            }}
                            className="p-1 rounded bg-[#1a1625] text-slate-300 disabled:opacity-30"
                            title="Move Up"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={wIdx === store.works.length - 1}
                            onClick={() => {
                              const newArr = [...store.works];
                              const temp = newArr[wIdx + 1];
                              newArr[wIdx + 1] = newArr[wIdx];
                              newArr[wIdx] = temp;
                              setStore((prev) => ({ ...prev, works: newArr }));
                            }}
                            className="p-1 rounded bg-[#1a1625] text-slate-300 disabled:opacity-30"
                            title="Move Down"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-[#f472b6]">Class #{wIdx + 1}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setStore((prev) => ({
                              ...prev,
                              works: prev.works.filter((w) => w.id !== work.id)
                            }));
                            triggerToast('Class deleted');
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-semibold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="text-xs text-[#cbd5e1] block mb-1">Class Title</label>
                          <input
                            type="text"
                            value={work.title}
                            onChange={(e) => {
                              const newArr = [...store.works];
                              newArr[wIdx] = { ...newArr[wIdx], title: e.target.value };
                              setStore((prev) => ({ ...prev, works: newArr }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[#cbd5e1] block mb-1">Category</label>
                          <input
                            type="text"
                            value={work.category}
                            onChange={(e) => {
                              const newArr = [...store.works];
                              newArr[wIdx] = { ...newArr[wIdx], category: e.target.value };
                              setStore((prev) => ({ ...prev, works: newArr }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-[#cbd5e1] block mb-1">Schedule &amp; Times</label>
                        <input
                          type="text"
                          value={work.schedule}
                          onChange={(e) => {
                            const newArr = [...store.works];
                            newArr[wIdx] = { ...newArr[wIdx], schedule: e.target.value };
                            setStore((prev) => ({ ...prev, works: newArr }));
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-[#cbd5e1] block mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={work.description}
                          onChange={(e) => {
                            const newArr = [...store.works];
                            newArr[wIdx] = { ...newArr[wIdx], description: e.target.value };
                            setStore((prev) => ({ ...prev, works: newArr }));
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                        />
                      </div>

                      {/* Multi-Image Carousel Manager */}
                      <div>
                        <label className="text-xs text-[#cbd5e1] block mb-2">
                          Card Carousel Photos (Upload from device with auto-compression)
                        </label>
                        <div className="flex flex-wrap items-center gap-3">
                          {work.images.map((img, imgIdx) => (
                            <div key={imgIdx} className="relative w-24 h-16 rounded-xl overflow-hidden border border-white/15">
                              <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => {
                                  const newArr = [...store.works];
                                  newArr[wIdx].images = newArr[wIdx].images.filter((_, i) => i !== imgIdx);
                                  setStore((prev) => ({ ...prev, works: newArr }));
                                }}
                                className="absolute top-1 right-1 bg-black/70 text-rose-400 rounded-full p-0.5"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}

                          <label className="w-24 h-16 rounded-xl border border-dashed border-white/20 hover:border-[#f472b6] flex flex-col items-center justify-center text-[10px] text-slate-400 cursor-pointer transition">
                            <Plus className="w-4 h-4 text-[#f472b6]" />
                            <span>Add Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const comp = await compressImageFile(file, 1000, 0.75);
                                const newArr = [...store.works];
                                newArr[wIdx].images = [...newArr[wIdx].images, comp];
                                setStore((prev) => ({ ...prev, works: newArr }));
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------
                TAB 5: RESEARCH PROPOSAL MANAGER
            ---------------------------------------- */}
            {adminTab === 'research' && (
              <div className="space-y-6">
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#f472b6]" />
                      <span>Device Research Proposal PDF Manager</span>
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-[#f472b6]/20 text-[#f472b6] text-xs font-bold">
                      {researchPdfStatus}
                    </span>
                  </div>

                  <p className="text-xs text-[#cbd5e1]">
                    Upload your official Research Proposal PDF from your device. It is stored inside browser IndexedDB and linked to "Download Proposal (PDF)" and "Read Online".
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const dataUrl = await readFileAsDataUrl(file);
                        await storePdfToDB('pdf_research', dataUrl, file.name);
                        setResearchPdfStatus('Custom Device PDF Active');
                        triggerToast(`Research Proposal PDF "${file.name}" saved to device storage`);
                      }}
                      className="text-xs text-slate-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gradient-to-r file:from-[#f472b6] file:to-[#c084fc] file:text-[#120f1a] cursor-pointer"
                    />

                    <button
                      type="button"
                      onClick={handleDownloadResearch}
                      className="px-4 py-2.5 rounded-xl bg-[#1a1625] hover:bg-white/5 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition"
                    >
                      <Download className="w-4 h-4 text-[#f472b6]" />
                      <span>Test Download</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReadResearchOnline}
                      className="px-4 py-2.5 rounded-xl bg-[#1a1625] hover:bg-white/5 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition"
                    >
                      <ExternalLink className="w-4 h-4 text-[#c084fc]" />
                      <span>Test Read Online</span>
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        await deletePdfFromDB('pdf_research');
                        setResearchPdfStatus('Default PDF Active');
                        triggerToast('Reverted to default generated Research Proposal PDF');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-semibold text-rose-300 transition"
                    >
                      Reset to Default
                    </button>
                  </div>
                </div>

                {/* Metadata & Texts */}
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-bold text-white">Proposal Details &amp; Meta</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs text-[#cbd5e1] block mb-1">Proposal Title</label>
                      <input
                        type="text"
                        value={store.research.title}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            research: { ...prev.research, title: e.target.value }
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#cbd5e1] block mb-1">Lead Authors &amp; Credits</label>
                      <input
                        type="text"
                        value={store.research.authors}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            research: { ...prev.research, authors: e.target.value }
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#cbd5e1] block mb-1">Institution</label>
                      <input
                        type="text"
                        value={store.research.institution}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            research: { ...prev.research, institution: e.target.value }
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#cbd5e1] block mb-1">Category</label>
                      <input
                        type="text"
                        value={store.research.category}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            research: { ...prev.research, category: e.target.value }
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#cbd5e1] block mb-1">Year</label>
                      <input
                        type="text"
                        value={store.research.year}
                        onChange={(e) =>
                          setStore((prev) => ({
                            ...prev,
                            research: { ...prev.research, year: e.target.value }
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#cbd5e1] block mb-1">Abstract</label>
                    <textarea
                      rows={3}
                      value={store.research.abstract}
                      onChange={(e) =>
                        setStore((prev) => ({
                          ...prev,
                          research: { ...prev.research, abstract: e.target.value }
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#cbd5e1] block mb-1">Methodology</label>
                    <textarea
                      rows={3}
                      value={store.research.methodology}
                      onChange={(e) =>
                        setStore((prev) => ({
                          ...prev,
                          research: { ...prev.research, methodology: e.target.value }
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                    />
                  </div>

                  {/* Findings */}
                  <div>
                    <label className="text-xs text-[#cbd5e1] block mb-2 font-semibold">
                      Key Research Findings Bullets
                    </label>
                    <div className="space-y-2">
                      {store.research.findings.map((finding, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={finding}
                            onChange={(e) => {
                              const newFindings = [...store.research.findings];
                              newFindings[fIdx] = e.target.value;
                              setStore((prev) => ({
                                ...prev,
                                research: { ...prev.research, findings: newFindings }
                              }));
                            }}
                            className="flex-1 px-3 py-1.5 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newFindings = store.research.findings.filter((_, i) => i !== fIdx);
                              setStore((prev) => ({
                                ...prev,
                                research: { ...prev.research, findings: newFindings }
                              }));
                            }}
                            className="text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setStore((prev) => ({
                          ...prev,
                          research: {
                            ...prev.research,
                            findings: [...prev.research.findings, 'New research finding outcome']
                          }
                        }));
                      }}
                      className="mt-2 text-xs text-[#f472b6] font-semibold flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Finding
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------
                TAB 6: SWOT ANALYSIS MANAGER
            ---------------------------------------- */}
            {adminTab === 'swot' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">4-Quadrant SWOT Matrix Manager</h3>

                {(
                  [
                    { key: 'strengths', label: 'Strengths (Emerald)', color: 'text-emerald-400' },
                    { key: 'weaknesses', label: 'Weaknesses (Amber)', color: 'text-amber-400' },
                    { key: 'opportunities', label: 'Opportunities (Cyan)', color: 'text-cyan-400' },
                    { key: 'threats', label: 'Threats (Rose)', color: 'text-rose-400' }
                  ] as const
                ).map(({ key, label, color }) => (
                  <div key={key} className="bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${color}`}>{label}</h4>
                      <button
                        type="button"
                        onClick={() => {
                          setStore((prev) => ({
                            ...prev,
                            swot: {
                              ...prev.swot,
                              [key]: [...prev.swot[key], 'New matrix bullet point']
                            }
                          }));
                        }}
                        className="text-xs text-[#f472b6] font-semibold flex items-center gap-1 hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Point
                      </button>
                    </div>

                    <div className="space-y-2">
                      {store.swot[key].map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const newArr = [...store.swot[key]];
                              newArr[itemIdx] = e.target.value;
                              setStore((prev) => ({
                                ...prev,
                                swot: { ...prev.swot, [key]: newArr }
                              }));
                            }}
                            className="flex-1 px-3 py-1.5 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newArr = store.swot[key].filter((_, i) => i !== itemIdx);
                              setStore((prev) => ({
                                ...prev,
                                swot: { ...prev.swot, [key]: newArr }
                              }));
                            }}
                            className="text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ----------------------------------------
                TAB 7: PEDAGOGICAL ARTIFACTS CRUD
            ---------------------------------------- */}
            {adminTab === 'artifacts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Teaching Artifacts &amp; Blueprints</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const id = 'art_' + Date.now();
                      const newArt: ArtifactItem = {
                        id,
                        title: 'New Lesson Plan Blueprint',
                        category: 'Instructional Framework',
                        description: 'Detailed modular structure for active conceptual mastery.',
                        previewImage:
                          'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
                        pdfKey: `pdf_artifact_${id}`,
                        fileName: 'Lesson_Plan_Blueprint.pdf',
                        fileSize: 'PDF • 1.2 MB'
                      };
                      setStore((prev) => ({
                        ...prev,
                        artifacts: [newArt, ...prev.artifacts]
                      }));
                      triggerToast('New artifact created');
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" /> Add Artifact
                  </button>
                </div>

                <div className="space-y-6">
                  {store.artifacts.map((art, aIdx) => (
                    <div key={art.id} className="bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#f472b6]">Artifact #{aIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setStore((prev) => ({
                              ...prev,
                              artifacts: prev.artifacts.filter((a) => a.id !== art.id)
                            }));
                            triggerToast('Artifact deleted');
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-semibold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[#cbd5e1] block mb-1">Title</label>
                          <input
                            type="text"
                            value={art.title}
                            onChange={(e) => {
                              const newArr = [...store.artifacts];
                              newArr[aIdx] = { ...newArr[aIdx], title: e.target.value };
                              setStore((prev) => ({ ...prev, artifacts: newArr }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[#cbd5e1] block mb-1">Category</label>
                          <input
                            type="text"
                            value={art.category}
                            onChange={(e) => {
                              const newArr = [...store.artifacts];
                              newArr[aIdx] = { ...newArr[aIdx], category: e.target.value };
                              setStore((prev) => ({ ...prev, artifacts: newArr }));
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-[#cbd5e1] block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={art.description}
                          onChange={(e) => {
                            const newArr = [...store.artifacts];
                            newArr[aIdx] = { ...newArr[aIdx], description: e.target.value };
                            setStore((prev) => ({ ...prev, artifacts: newArr }));
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                        />
                      </div>

                      {/* Device PDF Uploader for this artifact */}
                      <div className="p-4 bg-[#1a1625] rounded-2xl border border-white/10 space-y-2">
                        <label className="text-xs font-bold text-white block">
                          Upload Custom PDF for this Lesson Plan (IndexedDB)
                        </label>
                        <div className="flex flex-wrap items-center gap-3">
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const dataUrl = await readFileAsDataUrl(file);
                              await storePdfToDB(art.pdfKey, dataUrl, file.name);
                              const newArr = [...store.artifacts];
                              newArr[aIdx] = {
                                ...newArr[aIdx],
                                fileName: file.name,
                                fileSize: `PDF • ${(file.size / (1024 * 1024)).toFixed(1)} MB`
                              };
                              setStore((prev) => ({ ...prev, artifacts: newArr }));
                              triggerToast(`Uploaded ${file.name} for ${art.title}`);
                            }}
                            className="text-xs text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#f472b6]/20 file:text-[#f472b6]"
                          />

                          <button
                            type="button"
                            onClick={() => handleDownloadArtifact(art)}
                            className="px-3 py-1.5 rounded-lg bg-[#262135] text-xs font-semibold text-white flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5 text-[#f472b6]" />
                            <span>Test Download</span>
                          </button>
                        </div>
                      </div>

                      {/* Preview Image uploader */}
                      <div>
                        <label className="text-xs text-[#cbd5e1] block mb-1">Preview Image</label>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                            <img src={art.previewImage} alt="Thumb" className="w-full h-full object-cover" />
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const comp = await compressImageFile(file, 800, 0.75);
                              const newArr = [...store.artifacts];
                              newArr[aIdx] = { ...newArr[aIdx], previewImage: comp };
                              setStore((prev) => ({ ...prev, artifacts: newArr }));
                            }}
                            className="text-xs text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------
                TAB 8: REVIEWS MANAGER
            ---------------------------------------- */}
            {adminTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Student Testimonials &amp; Approvals</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newRev: ReviewItem = {
                        id: 'rev_' + Date.now(),
                        name: 'New Verified Student',
                        role: 'Exam Candidate',
                        rating: 5,
                        text: 'Exceptional teaching methods that unlocked my subject clarity.',
                        approved: true,
                        date: new Date().toISOString().split('T')[0]
                      };
                      setStore((prev) => ({
                        ...prev,
                        reviews: [newRev, ...prev.reviews]
                      }));
                      triggerToast('New verified review added');
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" /> Add Verified Review
                  </button>
                </div>

                <div className="space-y-4">
                  {store.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-[#262135] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{rev.name}</h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              rev.approved
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {rev.approved ? 'Live on Site' : 'Pending Verification'}
                          </span>
                        </div>
                        <p className="text-xs text-[#94a3b8]">{rev.role} • {rev.rating} Stars</p>
                        <p className="text-xs text-[#cbd5e1] italic">"{rev.text}"</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setStore((prev) => ({
                              ...prev,
                              reviews: prev.reviews.map((r) =>
                                r.id === rev.id ? { ...r, approved: !r.approved } : r
                              )
                            }));
                            triggerToast(
                              rev.approved ? 'Review moved to pending' : 'Review approved and published'
                            );
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                            rev.approved
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {rev.approved ? 'Unpublish' : 'Approve & Publish'}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setStore((prev) => ({
                              ...prev,
                              reviews: prev.reviews.filter((r) => r.id !== rev.id)
                            }));
                            triggerToast('Review deleted');
                          }}
                          className="p-1.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------
                TAB 9: INBOX & INQUIRIES
            ---------------------------------------- */}
            {adminTab === 'messages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Student &amp; Parent Inquiries Inbox</h3>
                  <span className="text-xs text-[#f472b6] font-semibold">
                    {store.messages.length} Total Received
                  </span>
                </div>

                {store.messages.length === 0 ? (
                  <div className="bg-[#262135] border border-white/10 rounded-3xl p-12 text-center text-[#94a3b8] text-sm">
                    No contact form inquiries yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {store.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`bg-[#262135] border rounded-2xl p-5 space-y-3 transition ${
                          msg.read ? 'border-white/10' : 'border-[#f472b6]/50 bg-[#2a223e]'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {!msg.read && (
                              <span className="px-2 py-0.5 rounded-full bg-[#f472b6] text-[#120f1a] text-[10px] font-extrabold uppercase">
                                New
                              </span>
                            )}
                            <h4 className="font-bold text-white text-sm">{msg.name}</h4>
                            <span className="text-xs text-[#c084fc] font-semibold">{msg.phone}</span>
                          </div>
                          <span className="text-[11px] text-[#94a3b8]">{msg.date}</span>
                        </div>

                        <p className="text-xs font-semibold text-[#f472b6]">{msg.subject}</p>
                        <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed bg-[#1a1625] p-3 rounded-xl border border-white/5">
                          {msg.message}
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <a
                            href={`https://wa.me/${sanitizeWhatsAppNumber(msg.phone)}?text=${encodeURIComponent(
                              `Hello ${msg.name}, thank you for reaching out regarding ${msg.subject}. How may I help you?`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-[#120f1a] border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Reply on WhatsApp</span>
                          </a>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setStore((prev) => ({
                                  ...prev,
                                  messages: prev.messages.map((m) =>
                                    m.id === msg.id ? { ...m, read: !m.read } : m
                                  )
                                }));
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[#1a1625] text-xs text-slate-300 hover:text-white"
                            >
                              {msg.read ? 'Mark Unread' : 'Mark Read'}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setStore((prev) => ({
                                  ...prev,
                                  messages: prev.messages.filter((m) => m.id !== msg.id)
                                }));
                                triggerToast('Inquiry message deleted');
                              }}
                              className="p-1.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ----------------------------------------
                TAB 10: SETTINGS (ADMIN PIN & BACKUP)
            ---------------------------------------- */}
            {adminTab === 'settings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Change PIN Card */}
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#f472b6]" />
                    <span>Change Admin Security PIN</span>
                  </h3>
                  <p className="text-xs text-[#cbd5e1]">
                    Current Security PIN: <code className="text-[#f472b6] font-mono font-bold">{store.adminPin}</code>
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-[#cbd5e1] block mb-1">New Security PIN</label>
                      <input
                        type="password"
                        value={newAdminPin}
                        onChange={(e) => setNewAdminPin(e.target.value)}
                        placeholder="Enter 4-8 digit PIN"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#cbd5e1] block mb-1">Confirm New PIN</label>
                      <input
                        type="password"
                        value={newAdminPinConfirm}
                        onChange={(e) => setNewAdminPinConfirm(e.target.value)}
                        placeholder="Confirm PIN"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!newAdminPin || newAdminPin.length < 4) {
                          triggerToast('PIN must be at least 4 digits', 'error');
                          return;
                        }
                        if (newAdminPin !== newAdminPinConfirm) {
                          triggerToast('PINs do not match', 'error');
                          return;
                        }
                        setStore((prev) => ({ ...prev, adminPin: newAdminPin }));
                        setNewAdminPin('');
                        setNewAdminPinConfirm('');
                        triggerToast('Admin Security PIN updated successfully!');
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm shadow transition hover:opacity-95"
                    >
                      Save New Admin PIN
                    </button>
                  </div>
                </div>

                {/* Backup & Restore Card */}
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
                  <h3 className="text-lg font-bold text-white">Backup &amp; Reset Studio</h3>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    Export your complete educator portfolio data as a portable JSON file, restore from a previous JSON backup, or reset to original factory demo data.
                  </p>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(store, null, 2)], {
                          type: 'application/json'
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `saduni_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        URL.revokeObjectURL(url);
                        triggerToast('Portfolio JSON backup downloaded');
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-[#1a1625] hover:bg-[#f472b6]/20 border border-white/10 hover:border-[#f472b6] text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-2 transition"
                    >
                      <Download className="w-4 h-4 text-[#f472b6]" />
                      <span>Export Portfolio JSON Backup</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileImportRef.current?.click()}
                      className="w-full py-3 px-4 rounded-xl bg-[#1a1625] hover:bg-[#c084fc]/20 border border-white/10 hover:border-[#c084fc] text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-2 transition"
                    >
                      <FileUp className="w-4 h-4 text-[#c084fc]" />
                      <span>Import Portfolio JSON Backup</span>
                    </button>
                    <input
                      ref={fileImportRef}
                      type="file"
                      accept=".json,application/json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          try {
                            const parsed = JSON.parse(ev.target?.result as string);
                            if (parsed && parsed.profile) {
                              setStore(parsed);
                              triggerToast('Portfolio backup restored successfully!');
                            } else {
                              triggerToast('Invalid backup JSON structure', 'error');
                            }
                          } catch {
                            triggerToast('Failed to parse JSON file', 'error');
                          }
                        };
                        reader.readAsText(file);
                        e.target.value = '';
                      }}
                      className="hidden"
                    />

                    <div className="pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmDialog({
                            title: 'Reset to Factory Demo Data?',
                            message:
                              'This will reset all educator profile info, teaching philosophy, experience, classes, research, reviews, and reset Admin PIN to 1234.',
                            confirmLabel: 'Reset Everything',
                            onConfirm: () => {
                              setStore(DEFAULT_DATA);
                              localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
                              setConfirmDialog(null);
                              triggerToast('Restored default Educator portfolio data');
                            }
                          });
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-xs sm:text-sm font-bold text-rose-300 flex items-center justify-center gap-2 transition"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset to Default Demo Data</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
