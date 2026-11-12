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
  Wand2
} from 'lucide-react';

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
// TYPES & INTERFACES
// ==========================================
type CategoryType = 'Classes & Courses' | 'Seminars & Workshops' | 'Mentorship & Resources';

interface StatItem {
  id: string;
  value: string;
  label: string;
}

interface SocialLinks {
  facebook: string;
  whatsapp: string;
  youtube: string;
  linkedin: string;
  instagram: string;
}

interface ProfileData {
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
  portraitShape: 'arch' | 'circle';
  portraitZoom: number;
  portraitOffsetY: number;
  stats: StatItem[];
  socials: SocialLinks;
}

interface WorkItem {
  id: string;
  title: string;
  category: CategoryType;
  schedule: string;
  description: string;
  images: string[];
}

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  approved: boolean;
  date: string;
}

interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

interface PortfolioStore {
  adminPin: string;
  profile: ProfileData;
  categories: CategoryType[];
  works: WorkItem[];
  reviews: ReviewItem[];
  messages: ContactMessage[];
}

// ==========================================
// CONSTANTS & DEFAULT DATA
// ==========================================
const STORAGE_KEY = 'saduni_ranasinghe_portfolio_v1';

const DEFAULT_DATA: PortfolioStore = {
  adminPin: '1234',
  categories: ['Classes & Courses', 'Seminars & Workshops', 'Mentorship & Resources'],
  profile: {
    name: 'Saduni Ranasinghe',
    tagline: 'Dedicated Educator & Academic Mentor',
    roles: [
      'Dedicated Educator',
      'Academic Mentor',
      'Curriculum Specialist',
      'Student Success Coach'
    ],
    heroBio:
      'Empowering students with structured learning methodologies, conceptual clarity, and exam-focused mentorship designed to unlock their highest academic potential.',
    aboutBio:
      'With a deep passion for transformative education, I believe every student excels when complex theories are distilled into structured, relatable frameworks. My classes blend interactive conceptual teaching, continuous unit revisions, and personalized paper clinics—ensuring every learner builds lasting academic confidence and exceptional examination results.',
    location: 'Colombo, Sri Lanka • Islandwide & Online',
    phoneDisplay: '077 123 4567',
    whatsappNumber: '+94771234567',
    email: 'saduni.ranasinghe@example.com',
    portraitUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    portraitShape: 'arch',
    portraitZoom: 100,
    portraitOffsetY: 0,
    stats: [
      { id: '1', value: '8+ Yrs', label: 'Teaching' },
      { id: '2', value: '1,500+', label: 'Students Guided' },
      { id: '3', value: '99%', label: 'Pass Rate' },
      { id: '4', value: '50+', label: 'Seminars Hosted' }
    ],
    socials: {
      facebook: 'https://facebook.com/',
      whatsapp: 'https://wa.me/94771234567',
      youtube: 'https://youtube.com/',
      linkedin: 'https://linkedin.com/',
      instagram: 'https://instagram.com/'
    }
  },
  works: [
    {
      id: 'w1',
      title: '2026 / 2027 Theory & Revision Masterclass',
      category: 'Classes & Courses',
      schedule: 'Saturdays & Sundays • 8:30 AM – 12:30 PM (Physical & Online)',
      description:
        'Complete syllabus mastery featuring structured printed study packs, unit-by-unit past paper discussions, and monthly timed mock examinations with personalized marking feedback.',
      images: [
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    {
      id: 'w2',
      title: 'Intensive Exam Target Paper Clinic & Seminar Series',
      category: 'Seminars & Workshops',
      schedule: 'Monthly Intensive Sessions • Colombo & Islandwide Zoom Live',
      description:
        'High-impact exam-technique workshops covering time management, official marking-scheme analysis, and high-probability structured essay questions to maximize final grades.',
      images: [
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    {
      id: 'w3',
      title: '1-on-1 Academic Mentorship & Study Pack Portal',
      category: 'Mentorship & Resources',
      schedule: 'Flexible Weekday Slots • Personalized Study Roadmaps',
      description:
        'Tailored individual guidance for students seeking targeted academic breakthroughs, complete with curated summary mind-maps, recorded lesson archives, and weekly progress tracking.',
      images: [
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1000&q=80'
      ]
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
        'Hello Miss, I would like to know how to register for the upcoming Sunday online revision intake and receive the printed tute pack.',
      date: '2026-11-10 14:30',
      read: false
    }
  ]
};

// ==========================================
// HELPER UTILITIES
// ==========================================

/**
 * Resolves Sri Lankan local numbers (07XXXXXXXX or 7XXXXXXXX) and international numbers
 * into clean digits suitable for https://wa.me/ links.
 */
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

/**
 * Checks if a phone string looks like a local Sri Lankan format that can be normalized to +94
 */
function needsSriLankanNormalization(raw: string): boolean {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, '');
  return (
    (digits.startsWith('0') && digits.length === 10) ||
    (digits.length === 9 && digits.startsWith('7')) ||
    (digits.startsWith('94') && !trimmed.startsWith('+'))
  );
}

function formatNormalizedSriLankanPhone(raw: string): string {
  const clean = sanitizeWhatsAppNumber(raw);
  return clean ? `+${clean}` : raw;
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
  if (!/^[+\d\s\-()]+$/.test(trimmed)) return false;
  const digitCount = trimmed.replace(/\D/g, '').length;
  return digitCount >= 9 && digitCount <= 15;
}

/**
 * Compresses an uploaded image file on an HTML5 Canvas (max 1000px, JPEG 0.75)
 * so multiple high-res photos fit comfortably inside browser localStorage.
 */
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

// ==========================================
// MAIN PORTFOLIO & ADMIN COMPONENT
// ==========================================
export default function App() {
  // Persistent Store in localStorage
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
            socials: {
              ...DEFAULT_DATA.profile.socials,
              ...(parsed.profile?.socials || {})
            }
          }
        };
      }
    } catch (err) {
      console.error('Failed to read localStorage:', err);
    }
    return DEFAULT_DATA;
  });

  const [storageWarning, setStorageWarning] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      setStorageWarning(null);
    } catch (err) {
      console.error('localStorage quota exceeded:', err);
      setStorageWarning(
        'Browser storage limit reached. Try removing unused high-res photos or exporting a backup.'
      );
    }
  }, [store]);

  // Toast Notification Helper
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const triggerToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast((current) => (current?.text === text ? null : current));
    }, 3500);
  };

  // Custom Confirmation Modal State
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    confirmLabel: string;
    onConfirm: () => void;
  } | null>(null);

  // Mobile Navbar State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Typewriter Animated Roles Effect
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles =
      store.profile.roles && store.profile.roles.length > 0
        ? store.profile.roles
        : ['Dedicated Educator'];
    const currentRole = roles[roleIndex % roles.length];
    const speed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          currentRole.substring(0, displayText.length + (isDeleting ? -1 : 1))
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, store.profile.roles]);

  // Work & Category Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cardCarouselIndex, setCardCarouselIndex] = useState<Record<string, number>>({});
  const [activeWorkModal, setActiveWorkModal] = useState<WorkItem | null>(null);
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0);

  // Public Submit Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [publicRevName, setPublicRevName] = useState('');
  const [publicRevRole, setPublicRevRole] = useState('');
  const [publicRevRating, setPublicRevRating] = useState(5);
  const [publicRevText, setPublicRevText] = useState('');
  const [publicRevSuccess, setPublicRevSuccess] = useState(false);

  // Public Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmittedAttempt, setContactSubmittedAttempt] = useState(false);
  const [contactSentSuccess, setContactSentSuccess] = useState(false);

  // Hidden Admin Gate & Dashboard State
  const [showPinModal, setShowPinModal] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPinChars, setShowPinChars] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [adminTab, setAdminTab] = useState<
    'profile' | 'works' | 'reviews' | 'messages' | 'settings'
  >('profile');

  // Admin Profile Role Input
  const [newRoleInput, setNewRoleInput] = useState('');

  // Admin Works CRUD State
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [workTitle, setWorkTitle] = useState('');
  const [workCategory, setWorkCategory] = useState<CategoryType>('Classes & Courses');
  const [workSchedule, setWorkSchedule] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [workImages, setWorkImages] = useState<string[]>([]);
  const [workImageUrlInput, setWorkImageUrlInput] = useState('');
  const [isUploadingWorkImgs, setIsUploadingWorkImgs] = useState(false);

  // Admin Reviews Filter & Manual Add State
  const [reviewFilter, setReviewFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [manualRevName, setManualRevName] = useState('');
  const [manualRevRole, setManualRevRole] = useState('');
  const [manualRevRating, setManualRevRating] = useState(5);
  const [manualRevText, setManualRevText] = useState('');

  // Admin Settings PIN & Backup State
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');
  const fileImportRef = useRef<HTMLInputElement | null>(null);

  // Check URL (`/admin`, `/#admin`, `?admin=true`) & Secret Keyboard Shortcut (`Ctrl + Shift + A`)
  useEffect(() => {
    const checkUrlForAdmin = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        path === '/admin' ||
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
          setIsAdminUnlocked(false);
        } else {
          setShowPinModal(true);
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

  // Derived Collections
  const filteredWorks = useMemo(() => {
    if (selectedCategory === 'All') return store.works;
    return store.works.filter((w) => w.category === selectedCategory);
  }, [store.works, selectedCategory]);

  const approvedReviews = useMemo(
    () => store.reviews.filter((r) => r.approved),
    [store.reviews]
  );

  const pendingReviewsCount = useMemo(
    () => store.reviews.filter((r) => !r.approved).length,
    [store.reviews]
  );

  const unreadMessagesCount = useMemo(
    () => store.messages.filter((m) => !m.read).length,
    [store.messages]
  );

  const sanitizedClientWhatsApp = useMemo(
    () => sanitizeWhatsAppNumber(store.profile.whatsappNumber),
    [store.profile.whatsappNumber]
  );

  // Smooth Scroll Navigation
  const scrollToSection = (sectionId: string, prefillSubject?: string) => {
    setMobileMenuOpen(false);
    if (prefillSubject) {
      setContactSubject(`Inquiry: ${prefillSubject}`);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ==========================================
  // PUBLIC INTERACTION HANDLERS
  // ==========================================
  const cycleCardPhoto = (workId: string, total: number, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardCarouselIndex((prev) => {
      const current = prev[workId] || 0;
      const next = (current + delta + total) % total;
      return { ...prev, [workId]: next };
    });
  };

  const handlePublicContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmittedAttempt(true);

    if (!contactName.trim() || !isValidPhone(contactPhone) || !contactMessage.trim()) {
      return;
    }

    const newEntry: ContactMessage = {
      id: 'msg_' + Date.now(),
      name: contactName.trim(),
      phone: contactPhone.trim(),
      subject: contactSubject.trim() || 'General Academic Inquiry',
      message: contactMessage.trim(),
      date: new Date().toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      read: false
    };

    setStore((prev) => ({
      ...prev,
      messages: [newEntry, ...prev.messages]
    }));

    setContactName('');
    setContactPhone('');
    setContactSubject('');
    setContactMessage('');
    setContactSubmittedAttempt(false);
    setContactSentSuccess(true);
    setTimeout(() => setContactSentSuccess(false), 5000);
  };

  const handlePublicReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicRevName.trim() || !publicRevText.trim()) return;

    const newRev: ReviewItem = {
      id: 'rev_' + Date.now(),
      name: publicRevName.trim(),
      role: publicRevRole.trim() || 'Student',
      rating: publicRevRating,
      text: publicRevText.trim(),
      approved: false,
      date: new Date().toISOString().split('T')[0]
    };

    setStore((prev) => ({
      ...prev,
      reviews: [newRev, ...prev.reviews]
    }));

    setPublicRevName('');
    setPublicRevRole('');
    setPublicRevRating(5);
    setPublicRevText('');
    setPublicRevSuccess(true);
    setTimeout(() => {
      setPublicRevSuccess(false);
      setReviewModalOpen(false);
    }, 2200);
  };

  // ==========================================
  // ADMIN HANDLERS
  // ==========================================
  const handlePinUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === store.adminPin) {
      setIsAdminUnlocked(true);
      setShowPinModal(false);
      setPinInput('');
      setPinError(false);
      triggerToast('Welcome to Saduni Ranasinghe Admin Studio');
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 600);
    }
  };

  const updateProfileField = <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    setStore((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value
      }
    }));
  };

  const updateSocialField = (key: keyof SocialLinks, value: string) => {
    setStore((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        socials: {
          ...prev.profile.socials,
          [key]: value
        }
      }
    }));
  };

  const handlePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 900, 0.8);
      updateProfileField('portraitUrl', compressed);
      triggerToast('Portrait photo updated & compressed');
    } catch {
      triggerToast('Could not process image file', 'error');
    }
  };

  const handleAddRole = () => {
    const trimmed = newRoleInput.trim();
    if (!trimmed) return;
    updateProfileField('roles', [...store.profile.roles, trimmed]);
    setNewRoleInput('');
  };

  const handleRemoveRole = (idx: number) => {
    if (store.profile.roles.length <= 1) {
      triggerToast('Keep at least one animated role', 'error');
      return;
    }
    updateProfileField(
      'roles',
      store.profile.roles.filter((_, i) => i !== idx)
    );
  };

  const handleStatChange = (id: string, field: 'value' | 'label', val: string) => {
    setStore((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        stats: prev.profile.stats.map((s) => (s.id === id ? { ...s, [field]: val } : s))
      }
    }));
  };

  // Admin Works CRUD
  const resetWorkForm = () => {
    setEditingWorkId(null);
    setWorkTitle('');
    setWorkCategory('Classes & Courses');
    setWorkSchedule('');
    setWorkDescription('');
    setWorkImages([]);
    setWorkImageUrlInput('');
  };

  const loadWorkForEdit = (item: WorkItem) => {
    setEditingWorkId(item.id);
    setWorkTitle(item.title);
    setWorkCategory(item.category);
    setWorkSchedule(item.schedule);
    setWorkDescription(item.description);
    setWorkImages([...item.images]);
    setWorkImageUrlInput('');
  };

  const handleWorkMultiImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingWorkImgs(true);
    const results: string[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImageFile(files[i], 1000, 0.75);
        results.push(compressed);
      } catch (err) {
        console.error('Error compressing image:', err);
      }
    }
    setWorkImages((prev) => [...prev, ...results]);
    setIsUploadingWorkImgs(false);
    e.target.value = '';
    triggerToast(`${results.length} photo(s) compressed & added`);
  };

  const handleAddFallbackImageUrl = () => {
    const url = ensureHttps(workImageUrlInput);
    if (!url) return;
    setWorkImages((prev) => [...prev, url]);
    setWorkImageUrlInput('');
  };

  const handleSetPrimaryWorkImage = (index: number) => {
    setWorkImages((prev) => {
      const next = [...prev];
      const [chosen] = next.splice(index, 1);
      return [chosen, ...next];
    });
  };

  const handleRemoveWorkImage = (index: number) => {
    setWorkImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveWorkItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workTitle.trim()) {
      triggerToast('Please enter a class or program title', 'error');
      return;
    }

    const finalImages =
      workImages.length > 0
        ? workImages
        : [
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80'
          ];

    if (editingWorkId) {
      setStore((prev) => ({
        ...prev,
        works: prev.works.map((w) =>
          w.id === editingWorkId
            ? {
                ...w,
                title: workTitle.trim(),
                category: workCategory,
                schedule: workSchedule.trim() || 'Flexible Schedule',
                description: workDescription.trim(),
                images: finalImages
              }
            : w
        )
      }));
      triggerToast('Class / Portfolio item updated');
    } else {
      const newItem: WorkItem = {
        id: 'w_' + Date.now(),
        title: workTitle.trim(),
        category: workCategory,
        schedule: workSchedule.trim() || 'Flexible Schedule',
        description: workDescription.trim(),
        images: finalImages
      };
      setStore((prev) => ({
        ...prev,
        works: [newItem, ...prev.works]
      }));
      triggerToast('New Class / Portfolio item published');
    }
    resetWorkForm();
  };

  const handleDeleteWorkItem = (item: WorkItem) => {
    setConfirmDialog({
      title: 'Delete Class / Work Item?',
      message: `Are you sure you want to permanently remove "${item.title}" from the portfolio?`,
      confirmLabel: 'Yes, Delete Item',
      onConfirm: () => {
        setStore((prev) => ({
          ...prev,
          works: prev.works.filter((w) => w.id !== item.id)
        }));
        if (editingWorkId === item.id) resetWorkForm();
        setConfirmDialog(null);
        triggerToast('Item deleted');
      }
    });
  };

  // Admin Reviews CRUD
  const handleToggleApproveReview = (id: string) => {
    setStore((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r))
    }));
    triggerToast('Review visibility updated');
  };

  const handleAddManualReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualRevName.trim() || !manualRevText.trim()) return;
    const item: ReviewItem = {
      id: 'rev_' + Date.now(),
      name: manualRevName.trim(),
      role: manualRevRole.trim() || 'Student',
      rating: manualRevRating,
      text: manualRevText.trim(),
      approved: true,
      date: new Date().toISOString().split('T')[0]
    };
    setStore((prev) => ({
      ...prev,
      reviews: [item, ...prev.reviews]
    }));
    setManualRevName('');
    setManualRevRole('');
    setManualRevRating(5);
    setManualRevText('');
    triggerToast('Testimonial published live');
  };

  const handleDeleteReview = (rev: ReviewItem) => {
    setConfirmDialog({
      title: 'Delete Testimonial?',
      message: `Remove the review submitted by ${rev.name}?`,
      confirmLabel: 'Delete Review',
      onConfirm: () => {
        setStore((prev) => ({
          ...prev,
          reviews: prev.reviews.filter((r) => r.id !== rev.id)
        }));
        setConfirmDialog(null);
        triggerToast('Review deleted');
      }
    });
  };

  // Admin Messages Inbox
  const handleToggleMessageRead = (id: string) => {
    setStore((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
    }));
  };

  const handleDeleteMessage = (msg: ContactMessage) => {
    setConfirmDialog({
      title: 'Delete Inquiry Message?',
      message: `Remove the inquiry from ${msg.name} (${msg.subject})?`,
      confirmLabel: 'Delete Message',
      onConfirm: () => {
        setStore((prev) => ({
          ...prev,
          messages: prev.messages.filter((m) => m.id !== msg.id)
        }));
        setConfirmDialog(null);
        triggerToast('Message deleted');
      }
    });
  };

  // Admin Settings: Change Security PIN & Backup
  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      triggerToast('PIN must be at least 4 characters', 'error');
      return;
    }
    if (newPin !== confirmNewPin) {
      triggerToast('New PIN and confirmation do not match', 'error');
      return;
    }
    setStore((prev) => ({
      ...prev,
      adminPin: newPin.trim()
    }));
    setNewPin('');
    setConfirmNewPin('');
    triggerToast('Admin Security PIN updated successfully!');
  };

  const handleExportBackup = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(store, null, 2));
    const anchor = document.createElement('a');
    anchor.setAttribute('href', dataStr);
    anchor.setAttribute(
      'download',
      `saduni_ranasinghe_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    triggerToast('Portfolio JSON backup downloaded');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (parsed && parsed.profile && Array.isArray(parsed.works)) {
          setStore(parsed);
          triggerToast('Backup imported successfully!');
        } else {
          triggerToast('Invalid backup JSON file structure', 'error');
        }
      } catch {
        triggerToast('Failed to parse JSON file', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetDemoData = () => {
    setConfirmDialog({
      title: 'Reset to Default Demo Data?',
      message:
        'This will restore Saduni Ranasinghe’s original demo profile, classes, reviews, and reset the Admin PIN to 1234. All custom edits will be overwritten.',
      confirmLabel: 'Reset Everything',
      onConfirm: () => {
        setStore(DEFAULT_DATA);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
        setConfirmDialog(null);
        triggerToast('Restored default Educator portfolio data');
      }
    });
  };

  // Phone validation states for public contact form
  const phoneDirty = contactPhone.trim().length > 0;
  const phoneValid = isValidPhone(contactPhone);

  return (
    <div className="min-h-screen bg-[#120f1a] text-[#fdf2f8] font-sans selection:bg-[#f472b6]/30 selection:text-[#f472b6] overflow-x-hidden">
      {/* ==========================================
          FLOATING TOAST NOTIFICATION
      ========================================== */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 bg-[#262135]/95 border-[#f472b6]/40 text-white">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#f472b6] shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.text}</span>
        </div>
      )}

      {/* ==========================================
          CUSTOM CONFIRMATION DIALOG
      ========================================== */}
      {confirmDialog && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#262135] border border-[#f472b6]/30 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{confirmDialog.title}</h3>
            </div>
            <p className="text-sm text-[#cbd5e1] leading-relaxed mb-6">
              {confirmDialog.message}
            </p>
            <div className="flex items-center justify-end gap-3">
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
                {confirmDialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          1. PUBLIC NAVBAR (NO VISIBLE ADMIN BUTTONS)
      ========================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#120f1a]/85 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Monogram & Name */}
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#f472b6]/20 to-[#c084fc]/20 border border-[#f472b6]/40 flex items-center justify-center shadow-[0_0_25px_rgba(244,114,182,0.15)] group-hover:border-[#f472b6] transition">
              <span className="text-lg font-extrabold tracking-tight text-[#f472b6]">
                SR.
              </span>
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#f472b6] transition">
                {store.profile.name}
              </span>
              <span className="block text-xs text-[#94a3b8]">
                {store.profile.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#cbd5e1]">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="hover:text-[#f472b6] transition"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="hover:text-[#f472b6] transition"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('classes')}
              className="hover:text-[#f472b6] transition"
            >
              Classes &amp; Work
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('reviews')}
              className="hover:text-[#f472b6] transition"
            >
              Reviews
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#f472b6] transition"
            >
              Contact
            </button>
          </nav>

          {/* CTA Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-semibold text-sm shadow-[0_0_25px_rgba(244,114,182,0.28)] hover:opacity-95 hover:scale-[1.02] active:scale-[0.99] transition"
            >
              Join a Class
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#262135] border border-white/10 text-slate-200 hover:text-[#f472b6]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a1625] border-b border-white/10 px-6 py-5 space-y-3">
            {[
              { label: 'Home', id: 'home' },
              { label: 'About', id: 'about' },
              { label: 'Classes & Work', id: 'classes' },
              { label: 'Reviews', id: 'reviews' },
              { label: 'Contact', id: 'contact' }
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
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm text-center shadow-lg"
            >
              Join a Class
            </button>
          </div>
        )}
      </header>

      {/* ==========================================
          2. HERO SECTION
      ========================================== */}
      <section
        id="home"
        className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Subtle Low Glow (Warm Ambient Rose/Lavender Aura) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#f472b6]/[0.08] blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#c084fc]/[0.08] blur-[120px]"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#262135] border border-[#f472b6]/30 text-[#f472b6] text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-[#c084fc]" />
              <span>Inspiring Minds • Shaping Futures</span>
            </div>

            <div className="space-y-2">
              <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-[#cbd5e1] font-medium">
                Hello, I&apos;m
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                <span className="bg-gradient-to-r from-white via-[#f472b6] to-[#c084fc] bg-clip-text text-transparent">
                  {store.profile.name}
                </span>
              </h1>
            </div>

            {/* Animated Typewriter Role */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#f472b6] to-[#c084fc] bg-clip-text text-transparent">
                {displayText}
              </span>
              <span className="ml-1 inline-block w-0.5 h-7 sm:h-8 bg-[#f472b6] animate-pulse" />
            </div>

            <p className="text-base sm:text-lg text-[#cbd5e1] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {store.profile.heroBio}
            </p>

            {/* Location Pill */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-[#f472b6] shrink-0" />
              <span>{store.profile.location}</span>
            </div>

            {/* Verified External Social Buttons */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
              {store.profile.socials.facebook && (
                <a
                  href={ensureHttps(store.profile.socials.facebook)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-11 h-11 rounded-full bg-[#262135] border border-white/10 hover:border-[#f472b6] text-slate-200 hover:text-[#f472b6] flex items-center justify-center transition hover:-translate-y-0.5 shadow-md"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {(store.profile.socials.whatsapp || sanitizedClientWhatsApp) && (
                <a
                  href={
                    store.profile.socials.whatsapp
                      ? ensureHttps(store.profile.socials.whatsapp)
                      : `https://wa.me/${sanitizedClientWhatsApp}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-11 h-11 rounded-full bg-[#262135] border border-white/10 hover:border-[#f472b6] text-slate-200 hover:text-[#f472b6] flex items-center justify-center transition hover:-translate-y-0.5 shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
              {store.profile.socials.youtube && (
                <a
                  href={ensureHttps(store.profile.socials.youtube)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-11 h-11 rounded-full bg-[#262135] border border-white/10 hover:border-[#f472b6] text-slate-200 hover:text-[#f472b6] flex items-center justify-center transition hover:-translate-y-0.5 shadow-md"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {store.profile.socials.linkedin && (
                <a
                  href={ensureHttps(store.profile.socials.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-full bg-[#262135] border border-white/10 hover:border-[#f472b6] text-slate-200 hover:text-[#f472b6] flex items-center justify-center transition hover:-translate-y-0.5 shadow-md"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {store.profile.socials.instagram && (
                <a
                  href={ensureHttps(store.profile.socials.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-full bg-[#262135] border border-white/10 hover:border-[#f472b6] text-slate-200 hover:text-[#f472b6] flex items-center justify-center transition hover:-translate-y-0.5 shadow-md"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                type="button"
                onClick={() => scrollToSection('classes')}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm sm:text-base shadow-[0_10px_30px_rgba(244,114,182,0.25)] hover:opacity-95 hover:-translate-y-0.5 transition flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Classes</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="px-7 py-3.5 rounded-full bg-[#262135] hover:bg-[#262135]/80 text-white border border-[#f472b6]/40 font-semibold text-sm sm:text-base transition hover:-translate-y-0.5"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Soft Arch / Circle Portrait */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative group">
              {/* Subtle Ambient Rose/Lavender Glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#f472b6]/20 via-[#c084fc]/15 to-transparent blur-2xl opacity-80"
              />

              {/* Thin Offset Editorial Border Frame */}
              <div
                className={`relative p-2.5 border border-[#f472b6]/45 bg-[#1a1625]/70 shadow-[0_0_50px_rgba(244,114,182,0.14)] ${
                  store.profile.portraitShape === 'arch'
                    ? 'rounded-t-full rounded-b-3xl w-72 h-88 sm:w-80 sm:h-[400px]'
                    : 'rounded-full w-72 h-72 sm:w-80 sm:h-80'
                }`}
              >
                <div
                  className={`w-full h-full overflow-hidden bg-[#262135] relative ${
                    store.profile.portraitShape === 'arch'
                      ? 'rounded-t-full rounded-b-2xl'
                      : 'rounded-full'
                  }`}
                >
                  <img
                    src={store.profile.portraitUrl}
                    alt={store.profile.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{
                      transform: `scale(${store.profile.portraitZoom / 100}) translateY(${store.profile.portraitOffsetY}%)`
                    }}
                  />
                </div>

                {/* Floating Credential Badge */}
                <div className="absolute -bottom-4 -right-3 sm:right-2 px-4 py-2.5 rounded-2xl bg-[#262135]/95 backdrop-blur-md border border-[#c084fc]/40 shadow-xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#f472b6]/20 flex items-center justify-center text-[#f472b6]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white leading-none">
                      Verified Educator
                    </p>
                    <p className="text-[11px] text-[#cbd5e1] mt-0.5">
                      Mentorship &amp; Exams
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. ABOUT SECTION & 4 EDUCATOR METRIC CARDS
      ========================================== */}
      <section id="about" className="py-20 bg-[#1a1625] border-y border-white/[0.06] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
              Academic Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Structured Learning Designed for Lasting Excellence
            </h2>
            <p className="text-base sm:text-lg text-[#cbd5e1] leading-relaxed">
              {store.profile.aboutBio}
            </p>
          </div>

          {/* 4 High-Impact Stats / Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {store.profile.stats.map((stat, idx) => {
              const icons = [BookOpen, Users, Award, GraduationCap];
              const IconComp = icons[idx % icons.length];
              return (
                <div
                  key={stat.id}
                  className="p-6 sm:p-7 rounded-3xl bg-[#262135] border border-white/[0.07] hover:border-[#f472b6]/40 transition group shadow-lg text-center sm:text-left"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#f472b6]/15 border border-[#f472b6]/30 flex items-center justify-center text-[#f472b6] mb-4 mx-auto sm:mx-0 group-hover:scale-105 transition">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-white via-[#f472b6] to-[#c084fc] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#cbd5e1] mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. CLASSES / PORTFOLIO / SERVICES SECTION
      ========================================== */}
      <section id="classes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
              Academic Programs &amp; Resources
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Classes, Seminars &amp; Mentorship
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', ...store.categories].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                    active
                      ? 'bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] shadow-[0_0_20px_rgba(244,114,182,0.3)]'
                      : 'bg-[#262135] text-[#cbd5e1] hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Work / Classes Cards Grid */}
        {filteredWorks.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#262135]/60 border border-white/10 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-[#f472b6] mx-auto opacity-80" />
            <p className="text-lg font-semibold text-white">
              No programs found in this category yet.
            </p>
            <p className="text-sm text-[#cbd5e1]">
              Select &ldquo;All&rdquo; to view all available classes and mentorship programs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredWorks.map((work) => {
              const images =
                work.images && work.images.length > 0
                  ? work.images
                  : [
                      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80'
                    ];
              const currentIdx = (cardCarouselIndex[work.id] || 0) % images.length;

              return (
                <div
                  key={work.id}
                  className="rounded-3xl bg-[#262135] border border-white/[0.08] hover:border-[#f472b6]/40 overflow-hidden flex flex-col justify-between transition duration-300 hover:-translate-y-1 shadow-xl group"
                >
                  <div>
                    {/* Multi-Image Interactive Carousel Header */}
                    <div
                      onClick={() => {
                        setActiveWorkModal(work);
                        setModalPhotoIndex(currentIdx);
                      }}
                      className="relative h-56 w-full bg-[#1a1625] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={images[currentIdx]}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#262135] via-transparent to-black/30" />

                      {/* Category Badge */}
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#120f1a]/85 backdrop-blur-md border border-[#f472b6]/40 text-[#f472b6] text-xs font-semibold">
                        {work.category}
                      </span>

                      {/* Image Counter Badge */}
                      <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-[#120f1a]/85 backdrop-blur-md text-white text-xs font-medium">
                        📷 {currentIdx + 1}/{images.length}
                      </span>

                      {/* Left / Right Arrows (if multiple photos) */}
                      {images.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => cycleCardPhoto(work.id, images.length, -1, e)}
                            aria-label="Previous image"
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#120f1a]/80 hover:bg-[#f472b6] text-white hover:text-[#120f1a] flex items-center justify-center transition"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => cycleCardPhoto(work.id, images.length, 1, e)}
                            aria-label="Next image"
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#120f1a]/80 hover:bg-[#f472b6] text-white hover:text-[#120f1a] flex items-center justify-center transition"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          {/* Dot Indicators */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                            {images.map((_, dotIdx) => (
                              <span
                                key={dotIdx}
                                className={`h-1.5 rounded-full transition-all ${
                                  dotIdx === currentIdx
                                    ? 'w-5 bg-[#f472b6]'
                                    : 'w-1.5 bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#c084fc]">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{work.schedule}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white leading-snug">
                        {work.title}
                      </h3>
                      <p className="text-sm text-[#cbd5e1] line-clamp-3 leading-relaxed">
                        {work.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Buttons */}
                  <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveWorkModal(work);
                        setModalPhotoIndex(currentIdx);
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#1a1625] hover:bg-[#120f1a] text-xs sm:text-sm font-semibold text-slate-200 border border-white/10 transition"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('contact', work.title)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] text-xs sm:text-sm font-bold hover:opacity-95 transition shadow-md"
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ==========================================
          5. STUDENT & PARENT REVIEWS SECTION
      ========================================== */}
      <section
        id="reviews"
        className="py-20 bg-[#1a1625] border-y border-white/[0.06] px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
                Student &amp; Parent Reflections
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Trusted by Aspiring Achievers
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setReviewModalOpen(true)}
              className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-[#262135] hover:bg-[#262135]/80 border border-[#f472b6]/40 text-sm font-semibold text-[#f472b6] flex items-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Submit a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 sm:p-7 rounded-3xl bg-[#262135] border border-white/[0.07] flex flex-col justify-between space-y-5 shadow-lg"
              >
                <div className="space-y-4">
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
                  <p className="text-sm sm:text-base text-[#fdf2f8]/90 italic leading-relaxed">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold flex items-center justify-center text-sm">
                    {rev.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                    <p className="text-xs text-[#cbd5e1]">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          6. CONTACT SECTION (CLICKABLE CARDS + VALIDATED FORM)
      ========================================== */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Clickable Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f472b6]">
                Get in Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Enroll or Ask About Upcoming Intakes
              </h2>
              <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
                Have a question about class schedules, revision study packs, or individual
                mentoring? Reach out directly via WhatsApp or send an inquiry message.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Direct WhatsApp Clickable Card */}
              <a
                href={`https://wa.me/${sanitizedClientWhatsApp}?text=${encodeURIComponent(
                  `Hello ${store.profile.name}, I would like to inquire about your classes.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-[#262135] border border-white/[0.08] hover:border-[#f472b6] transition group shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#f472b6]/15 border border-[#f472b6]/30 flex items-center justify-center text-[#f472b6] group-hover:scale-105 transition">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-[#cbd5e1]">
                    WhatsApp Direct Chat
                  </p>
                  <p className="text-base font-bold text-white group-hover:text-[#f472b6] transition">
                    {store.profile.phoneDisplay || store.profile.whatsappNumber}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#f472b6]" />
              </a>

              {/* Email Clickable Card */}
              <a
                href={`mailto:${store.profile.email}`}
                className="flex items-center gap-4 p-5 rounded-2xl bg-[#262135] border border-white/[0.08] hover:border-[#f472b6] transition group shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#c084fc]/15 border border-[#c084fc]/30 flex items-center justify-center text-[#c084fc] group-hover:scale-105 transition">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[#cbd5e1]">
                    Email Address
                  </p>
                  <p className="text-sm sm:text-base font-bold text-white truncate group-hover:text-[#c084fc] transition">
                    {store.profile.email}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#c084fc]" />
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#262135] border border-white/[0.08] shadow-md">
                <div className="w-12 h-12 rounded-2xl bg-[#f472b6]/15 border border-[#f472b6]/30 flex items-center justify-center text-[#f472b6]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#cbd5e1]">
                    Location &amp; Mode
                  </p>
                  <p className="text-sm sm:text-base font-bold text-white">
                    {store.profile.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handlePublicContactSubmit}
              noValidate
              className="p-6 sm:p-8 rounded-3xl bg-[#262135] border border-white/[0.08] shadow-2xl space-y-5"
            >
              <h3 className="text-xl font-bold text-white">Send a Direct Inquiry</h3>

              {contactSentSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    Thank you! Your inquiry has been received in {store.profile.name}&apos;s inbox.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#cbd5e1] mb-2">
                    Student / Parent Name *
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Kavindi Perera"
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1625] border border-white/10 focus:border-[#f472b6] focus:outline-none text-sm text-white"
                  />
                  {contactSubmittedAttempt && !contactName.trim() && (
                    <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Please enter your name.
                    </p>
                  )}
                </div>

                {/* Validated Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#cbd5e1] mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. 077 123 4567"
                      className={`w-full pl-4 pr-10 py-3 rounded-xl bg-[#1a1625] border focus:outline-none text-sm text-white ${
                        phoneDirty
                          ? phoneValid
                            ? 'border-emerald-500/60'
                            : 'border-rose-500/70'
                          : 'border-white/10 focus:border-[#f472b6]'
                      }`}
                    />
                    {phoneDirty && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2">
                        {phoneValid ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </span>
                    )}
                  </div>
                  {(contactSubmittedAttempt || phoneDirty) && !phoneValid && (
                    <p className="text-xs text-rose-400 mt-1.5">
                      Enter a valid phone number (minimum 9 digits, numbers/+ only).
                    </p>
                  )}
                  {phoneDirty && phoneValid && (
                    <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Valid contact format
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#cbd5e1] mb-2">
                  Class / Inquiry Subject
                </label>
                <input
                  type="text"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  placeholder="e.g. 2026 Theory & Revision Masterclass"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1625] border border-white/10 focus:border-[#f472b6] focus:outline-none text-sm text-white"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#cbd5e1] mb-2">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Write your batch year, preferred class mode, or question..."
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1625] border border-white/10 focus:border-[#f472b6] focus:outline-none text-sm text-white"
                />
                {contactSubmittedAttempt && !contactMessage.trim() && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Please enter your inquiry message.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm sm:text-base shadow-[0_10px_25px_rgba(244,114,182,0.25)] hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. FOOTER
      ========================================== */}
      <footer className="bg-[#1a1625] border-t border-white/[0.07] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#94a3b8]">
          <p
            onDoubleClick={() => setShowPinModal(true)}
            title="Double-click for Admin Studio"
            className="select-none cursor-default"
          >
            Copyright © {new Date().getFullYear()} {store.profile.name}. All Rights Reserved.
          </p>
          <p className="font-medium text-[#cbd5e1]">
            Developed by{' '}
            <span className="text-[#f472b6] font-semibold">Helanutsproductions_OL</span>
          </p>
        </div>
      </footer>

      {/* ==========================================
          MODAL: WORK DETAILS & FULL PHOTO VIEWER
      ========================================== */}
      {activeWorkModal && (
        <div
          onClick={() => setActiveWorkModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#262135] border border-[#f472b6]/30 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-8"
          >
            {/* Large Viewer */}
            <div className="relative h-72 sm:h-96 bg-[#120f1a]">
              <img
                src={
                  activeWorkModal.images[modalPhotoIndex] || activeWorkModal.images[0]
                }
                alt={activeWorkModal.title}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setActiveWorkModal(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#120f1a]/80 text-white hover:text-[#f472b6] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              {activeWorkModal.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setModalPhotoIndex(
                        (modalPhotoIndex - 1 + activeWorkModal.images.length) %
                          activeWorkModal.images.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#120f1a]/80 text-white hover:bg-[#f472b6] hover:text-[#120f1a] flex items-center justify-center"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setModalPhotoIndex(
                        (modalPhotoIndex + 1) % activeWorkModal.images.length
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#120f1a]/80 text-white hover:bg-[#f472b6] hover:text-[#120f1a] flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {activeWorkModal.images.length > 1 && (
              <div className="px-6 py-3 bg-[#1a1625] flex items-center gap-2.5 overflow-x-auto">
                {activeWorkModal.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setModalPhotoIndex(i)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                      i === modalPhotoIndex
                        ? 'border-[#f472b6] scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Text Details */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3.5 py-1 rounded-full bg-[#f472b6]/15 border border-[#f472b6]/40 text-[#f472b6] text-xs font-bold">
                  {activeWorkModal.category}
                </span>
                <span className="text-xs sm:text-sm text-[#c084fc] font-medium flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {activeWorkModal.schedule}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">{activeWorkModal.title}</h3>
              <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed whitespace-pre-line">
                {activeWorkModal.description}
              </p>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveWorkModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#1a1625] text-slate-300 text-sm font-medium"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = activeWorkModal.title;
                    setActiveWorkModal(null);
                    scrollToSection('contact', title);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm"
                >
                  Inquire About This Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: PUBLIC SUBMIT A REVIEW
      ========================================== */}
      {reviewModalOpen && (
        <div
          onClick={() => setReviewModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#262135] border border-[#f472b6]/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Share Your Class Experience</h3>
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {publicRevSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-base font-bold text-white">Thank You for Your Review!</p>
                <p className="text-xs text-[#cbd5e1]">
                  Your testimonial has been submitted to the educator review queue.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePublicReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#cbd5e1] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={publicRevName}
                    onChange={(e) => setPublicRevName(e.target.value)}
                    placeholder="e.g. Nethmi Wijesinghe"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white focus:border-[#f472b6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#cbd5e1] mb-1.5">
                    Batch / Role (e.g. 2026 Batch Student or Parent)
                  </label>
                  <input
                    type="text"
                    value={publicRevRole}
                    onChange={(e) => setPublicRevRole(e.target.value)}
                    placeholder="e.g. 2026 Revision Student"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white focus:border-[#f472b6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#cbd5e1] mb-1.5">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setPublicRevRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= publicRevRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#cbd5e1] mb-1.5">
                    Your Testimonial *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={publicRevText}
                    onChange={(e) => setPublicRevText(e.target.value)}
                    placeholder="How have Miss Saduni's classes helped your studies?"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white focus:border-[#f472b6] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          HIDDEN ADMIN PIN SECURITY MODAL
      ========================================== */}
      {showPinModal && !isAdminUnlocked && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
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
                onClick={() => {
                  setShowPinModal(false);
                  setPinInput('');
                }}
                className="text-slate-400 hover:text-white"
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
                <p className="text-xs text-rose-400 text-center">
                  Invalid Security PIN. Please try again.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          3. HIDDEN ADMIN CRUD DASHBOARD OVERLAY
      ========================================== */}
      {isAdminUnlocked && (
        <div className="fixed inset-0 z-50 bg-[#120f1a] overflow-y-auto text-slate-100">
          {/* Top Admin Bar */}
          <div className="sticky top-0 z-20 bg-[#1a1625]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f472b6] to-[#c084fc] text-[#120f1a] flex items-center justify-center font-extrabold">
                SR
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Saduni Ranasinghe • Admin CRUD Studio</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Unlocked
                  </span>
                </h2>
                <p className="text-xs text-[#94a3b8]">
                  Changes auto-save immediately to browser storage ({STORAGE_KEY})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAdminUnlocked(false);
                if (window.location.hash.includes('admin')) {
                  window.history.replaceState(null, '', window.location.pathname);
                }
              }}
              className="px-4 py-2 rounded-xl bg-[#262135] hover:bg-rose-500/20 border border-white/10 hover:border-rose-400 text-xs sm:text-sm font-semibold text-white flex items-center gap-2 transition"
            >
              <X className="w-4 h-4" />
              <span>Exit to Public Website</span>
            </button>
          </div>

          {storageWarning && (
            <div className="max-w-7xl mx-auto mt-4 px-4 sm:px-8">
              <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs sm:text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{storageWarning}</span>
              </div>
            </div>
          )}

          {/* Admin Navigation Tabs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
              {[
                { id: 'profile', label: '1. Profile & Photo', icon: User },
                {
                  id: 'works',
                  label: `2. Classes & Works (${store.works.length})`,
                  icon: Briefcase
                },
                {
                  id: 'reviews',
                  label: `3. Reviews (${store.reviews.length})`,
                  badge: pendingReviewsCount,
                  icon: Star
                },
                {
                  id: 'messages',
                  label: `4. Messages Inbox (${store.messages.length})`,
                  badge: unreadMessagesCount,
                  icon: Inbox
                },
                { id: 'settings', label: '5. Settings & PIN', icon: SettingsIcon }
              ].map((t) => {
                const Icon = t.icon;
                const active = adminTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() =>
                      setAdminTab(
                        t.id as 'profile' | 'works' | 'reviews' | 'messages' | 'settings'
                      )
                    }
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition ${
                      active
                        ? 'bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] shadow-lg'
                        : 'bg-[#262135] text-[#cbd5e1] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t.label}</span>
                    {t.badge ? (
                      <span className="px-2 py-0.5 rounded-full text-[11px] bg-rose-500 text-white font-bold">
                        {t.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Admin Tab Content Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            {/* ==========================================
                TAB 1: PROFILE & PHOTO
            ========================================== */}
            {adminTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Portrait Uploader, Shape Toggle & Sliders */}
                <div className="lg:col-span-5 bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-6 h-fit">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Camera className="w-5 h-5 text-[#f472b6]" />
                      <span>Portrait &amp; Frame Studio</span>
                    </h3>
                  </div>

                  {/* Live Frame Preview */}
                  <div className="flex justify-center py-2">
                    <div
                      className={`p-2 border border-[#f472b6]/50 bg-[#1a1625] ${
                        store.profile.portraitShape === 'arch'
                          ? 'rounded-t-full rounded-b-3xl w-52 h-64'
                          : 'rounded-full w-56 h-56'
                      }`}
                    >
                      <div
                        className={`w-full h-full overflow-hidden bg-[#120f1a] ${
                          store.profile.portraitShape === 'arch'
                            ? 'rounded-t-full rounded-b-2xl'
                            : 'rounded-full'
                        }`}
                      >
                        <img
                          src={store.profile.portraitUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          style={{
                            transform: `scale(${store.profile.portraitZoom / 100}) translateY(${store.profile.portraitOffsetY}%)`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Portrait Shape Selector (Soft Arch vs Circle) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#cbd5e1] mb-2">
                      Portrait Frame Shape
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => updateProfileField('portraitShape', 'arch')}
                        className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition ${
                          store.profile.portraitShape === 'arch'
                            ? 'bg-[#f472b6]/20 border-[#f472b6] text-[#f472b6]'
                            : 'bg-[#1a1625] border-white/10 text-slate-300'
                        }`}
                      >
                        Soft Arch (Editorial)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateProfileField('portraitShape', 'circle')}
                        className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition ${
                          store.profile.portraitShape === 'circle'
                            ? 'bg-[#f472b6]/20 border-[#f472b6] text-[#f472b6]'
                            : 'bg-[#1a1625] border-white/10 text-slate-300'
                        }`}
                      >
                        Circle Frame
                      </button>
                    </div>
                  </div>

                  {/* Upload from Device */}
                  <div className="space-y-3">
                    <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-xs sm:text-sm cursor-pointer hover:opacity-95 transition">
                      <Upload className="w-4 h-4" />
                      <span>Upload Portrait from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePortraitUpload}
                        className="hidden"
                      />
                    </label>

                    <div>
                      <label className="block text-xs text-[#cbd5e1] mb-1">
                        Or Paste Direct Image URL
                      </label>
                      <input
                        type="text"
                        value={store.profile.portraitUrl}
                        onChange={(e) => updateProfileField('portraitUrl', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Zoom & Vertical Offset Sliders */}
                  <div className="space-y-4 pt-2 border-t border-white/10">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#cbd5e1] flex items-center gap-1">
                          <Sliders className="w-3.5 h-3.5 text-[#f472b6]" /> Zoom Level
                        </span>
                        <span className="font-bold text-[#f472b6]">
                          {store.profile.portraitZoom}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={200}
                        value={store.profile.portraitZoom}
                        onChange={(e) =>
                          updateProfileField('portraitZoom', Number(e.target.value))
                        }
                        className="w-full accent-[#f472b6]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#cbd5e1]">Vertical Offset</span>
                        <span className="font-bold text-[#c084fc]">
                          {store.profile.portraitOffsetY}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={-50}
                        max={50}
                        value={store.profile.portraitOffsetY}
                        onChange={(e) =>
                          updateProfileField('portraitOffsetY', Number(e.target.value))
                        }
                        className="w-full accent-[#c084fc]"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Bio, Typewriter Roles, Stats, WhatsApp Normalizer & Socials */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Core Identity */}
                  <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      Educator Identity &amp; Biographies
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                          Client Full Name
                        </label>
                        <input
                          type="text"
                          value={store.profile.name}
                          onChange={(e) => updateProfileField('name', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                          Profession / Navbar Tagline
                        </label>
                        <input
                          type="text"
                          value={store.profile.tagline}
                          onChange={(e) => updateProfileField('tagline', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                        />
                      </div>
                    </div>

                    {/* Typewriter Roles Manager */}
                    <div>
                      <label className="block text-xs font-semibold text-[#cbd5e1] mb-2">
                        Animated Typewriter Roles
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2.5">
                        {store.profile.roles.map((role, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a1625] border border-[#f472b6]/40 text-xs text-white"
                          >
                            {role}
                            <button
                              type="button"
                              onClick={() => handleRemoveRole(idx)}
                              className="text-slate-400 hover:text-rose-400"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newRoleInput}
                          onChange={(e) => setNewRoleInput(e.target.value)}
                          placeholder="Add another role (e.g. Exam Coach)"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddRole}
                          className="px-4 py-2 rounded-xl bg-[#f472b6] text-[#120f1a] font-bold text-xs"
                        >
                          + Add Role
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                        Hero Short Bio
                      </label>
                      <textarea
                        rows={2}
                        value={store.profile.heroBio}
                        onChange={(e) => updateProfileField('heroBio', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                        Detailed About / Teaching Philosophy
                      </label>
                      <textarea
                        rows={4}
                        value={store.profile.aboutBio}
                        onChange={(e) => updateProfileField('aboutBio', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                      />
                    </div>
                  </div>

                  {/* 4 Metric Stats Cards Editor */}
                  <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      4 High-Impact Educator Metrics
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {store.profile.stats.map((st) => (
                        <div
                          key={st.id}
                          className="p-3.5 rounded-2xl bg-[#1a1625] border border-white/10 flex gap-3"
                        >
                          <div className="w-1/3">
                            <label className="block text-[10px] uppercase text-[#94a3b8]">
                              Metric
                            </label>
                            <input
                              type="text"
                              value={st.value}
                              onChange={(e) =>
                                handleStatChange(st.id, 'value', e.target.value)
                              }
                              className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-[#262135] text-xs font-bold text-[#f472b6]"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-[10px] uppercase text-[#94a3b8]">
                              Label
                            </label>
                            <input
                              type="text"
                              value={st.label}
                              onChange={(e) =>
                                handleStatChange(st.id, 'label', e.target.value)
                              }
                              className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-[#262135] text-xs text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact & Sri Lankan WhatsApp Normalizer */}
                  <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      Contact Details &amp; WhatsApp Normalizer
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                          Display Phone Number
                        </label>
                        <input
                          type="text"
                          value={store.profile.phoneDisplay}
                          onChange={(e) => updateProfileField('phoneDisplay', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                          WhatsApp Number (with Country Code)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={store.profile.whatsappNumber}
                            onChange={(e) =>
                              updateProfileField('whatsappNumber', e.target.value)
                            }
                            placeholder="+94771234567"
                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                          />
                          {needsSriLankanNormalization(store.profile.whatsappNumber) && (
                            <button
                              type="button"
                              onClick={() => {
                                const fixed = formatNormalizedSriLankanPhone(
                                  store.profile.whatsappNumber
                                );
                                updateProfileField('whatsappNumber', fixed);
                                triggerToast(`Normalized to ${fixed}`);
                              }}
                              className="px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold flex items-center gap-1 shrink-0"
                            >
                              <Wand2 className="w-3.5 h-3.5" />
                              <span>Auto-fix to +94</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Live WhatsApp Chat Link Preview */}
                    <div className="p-3.5 rounded-2xl bg-[#1a1625] border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-[#cbd5e1] truncate">
                        Live Link:{' '}
                        <strong className="text-[#f472b6]">
                          https://wa.me/{sanitizedClientWhatsApp}
                        </strong>
                      </span>
                      <a
                        href={`https://wa.me/${sanitizedClientWhatsApp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#262135] hover:bg-[#f472b6] text-white hover:text-[#120f1a] font-semibold transition inline-flex items-center gap-1"
                      >
                        <span>Test Chat ↗</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={store.profile.email}
                          onChange={(e) => updateProfileField('email', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                          Location Display
                        </label>
                        <input
                          type="text"
                          value={store.profile.location}
                          onChange={(e) => updateProfileField('location', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links Manager */}
                  <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">
                      Social Media Links Manager
                    </h3>
                    {(
                      [
                        { key: 'facebook', label: 'Facebook URL' },
                        { key: 'whatsapp', label: 'WhatsApp Direct URL' },
                        { key: 'youtube', label: 'YouTube Channel URL' },
                        { key: 'linkedin', label: 'LinkedIn Profile URL' },
                        { key: 'instagram', label: 'Instagram URL' }
                      ] as { key: keyof SocialLinks; label: string }[]
                    ).map((item) => (
                      <div key={item.key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className="w-40 text-xs font-semibold text-[#cbd5e1]">
                          {item.label}
                        </label>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={store.profile.socials[item.key]}
                            onChange={(e) => updateSocialField(item.key, e.target.value)}
                            onBlur={(e) =>
                              updateSocialField(item.key, ensureHttps(e.target.value))
                            }
                            placeholder="https://..."
                            className="flex-1 px-3.5 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                          />
                          {store.profile.socials[item.key] && (
                            <a
                              href={ensureHttps(store.profile.socials[item.key])}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-xl bg-[#1a1625] hover:bg-[#f472b6] text-xs text-slate-200 hover:text-[#120f1a] font-semibold shrink-0 transition"
                            >
                              Test Link ↗
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================
                TAB 2: CLASSES & WORKS CRUD
            ========================================== */}
            {adminTab === 'works' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Add / Edit Work Form */}
                <form
                  onSubmit={handleSaveWorkItem}
                  className="lg:col-span-5 bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-4 h-fit"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      {editingWorkId ? 'Edit Class / Program' : 'Add New Class / Program'}
                    </h3>
                    {editingWorkId && (
                      <button
                        type="button"
                        onClick={resetWorkForm}
                        className="text-xs text-[#f472b6] hover:underline"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={workTitle}
                      onChange={(e) => setWorkTitle(e.target.value)}
                      placeholder="e.g. 2027 Theory & Revision Masterclass"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                      Category
                    </label>
                    <select
                      value={workCategory}
                      onChange={(e) => setWorkCategory(e.target.value as CategoryType)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    >
                      {store.categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                      Schedule / Subtitle
                    </label>
                    <input
                      type="text"
                      value={workSchedule}
                      onChange={(e) => setWorkSchedule(e.target.value)}
                      placeholder="e.g. Saturdays 8:30 AM – 12:30 PM (Online & Physical)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                      Detailed Description
                    </label>
                    <textarea
                      rows={4}
                      value={workDescription}
                      onChange={(e) => setWorkDescription(e.target.value)}
                      placeholder="Describe syllabus coverage, study packs, and mock exams..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>

                  {/* Multi-Image Device Upload with Canvas Compression */}
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <label className="block text-xs font-semibold text-[#cbd5e1]">
                      Gallery Photos (Auto-Compressed to ~70KB)
                    </label>
                    <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#1a1625] hover:bg-[#120f1a] border border-dashed border-[#f472b6]/50 text-xs font-semibold text-[#f472b6] cursor-pointer transition">
                      <Upload className="w-4 h-4" />
                      <span>
                        {isUploadingWorkImgs
                          ? 'Compressing Photos...'
                          : 'Upload Multiple Photos from Device'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleWorkMultiImageUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Image URL Fallback */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={workImageUrlInput}
                        onChange={(e) => setWorkImageUrlInput(e.target.value)}
                        placeholder="Or paste image URL..."
                        className="flex-1 px-3 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddFallbackImageUrl}
                        className="px-3 py-2 rounded-xl bg-[#1a1625] border border-white/15 text-xs font-semibold text-white hover:border-[#f472b6]"
                      >
                        Add URL
                      </button>
                    </div>

                    {/* Thumbnail Manager */}
                    {workImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-2.5 pt-2">
                        {workImages.map((img, idx) => (
                          <div
                            key={idx}
                            className={`relative rounded-xl overflow-hidden border-2 h-24 bg-[#1a1625] ${
                              idx === 0 ? 'border-[#f472b6]' : 'border-white/10'
                            }`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            {idx === 0 ? (
                              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#f472b6] text-[#120f1a] text-[10px] font-bold">
                                Cover
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryWorkImage(idx)}
                                className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/75 text-white text-[10px] hover:bg-[#f472b6] hover:text-[#120f1a]"
                              >
                                Make Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveWorkImage(idx)}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingWorkId ? 'Update Item' : 'Publish Item'}</span>
                  </button>
                </form>

                {/* Right Column: Existing Works List */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-lg font-bold text-white">
                    Published Classes &amp; Portfolio Items ({store.works.length})
                  </h3>

                  {store.works.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#262135] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-20 h-16 rounded-xl object-cover bg-[#1a1625] shrink-0"
                        />
                        <div>
                          <span className="text-[11px] font-bold text-[#f472b6]">
                            {item.category} • {item.images.length} photo(s)
                          </span>
                          <h4 className="text-base font-bold text-white">{item.title}</h4>
                          <p className="text-xs text-[#cbd5e1]">{item.schedule}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => loadWorkForEdit(item)}
                          className="px-3 py-2 rounded-xl bg-[#1a1625] hover:bg-[#f472b6]/20 text-xs font-semibold text-slate-200 hover:text-[#f472b6] flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteWorkItem(item)}
                          className="p-2 rounded-xl bg-[#1a1625] hover:bg-rose-500/20 text-slate-300 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================
                TAB 3: REVIEWS MANAGER
            ========================================== */}
            {adminTab === 'reviews' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Manual Testimonial Form */}
                <form
                  onSubmit={handleAddManualReview}
                  className="lg:col-span-5 bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-4 h-fit"
                >
                  <h3 className="text-lg font-bold text-white">
                    Add Manual Student Testimonial
                  </h3>
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                      Student / Parent Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={manualRevName}
                      onChange={(e) => setManualRevName(e.target.value)}
                      placeholder="e.g. Kasuni Rathnayake"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                      Batch / Tagline
                    </label>
                    <input
                      type="text"
                      value={manualRevRole}
                      onChange={(e) => setManualRevRole(e.target.value)}
                      placeholder="e.g. 2025 Island Ranker"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                      Star Rating
                    </label>
                    <select
                      value={manualRevRating}
                      onChange={(e) => setManualRevRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>
                          {r} Stars
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                      Review Quote *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={manualRevText}
                      onChange={(e) => setManualRevText(e.target.value)}
                      placeholder="Paste student feedback..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm"
                  >
                    + Publish Testimonial
                  </button>
                </form>

                {/* Right Column: Review Moderation Queue */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-white">
                      Student Reviews Moderation
                    </h3>
                    <div className="flex gap-2">
                      {(['all', 'pending', 'approved'] as const).map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setReviewFilter(f)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize ${
                            reviewFilter === f
                              ? 'bg-[#f472b6] text-[#120f1a]'
                              : 'bg-[#262135] text-slate-300'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {store.reviews
                    .filter((r) =>
                      reviewFilter === 'all'
                        ? true
                        : reviewFilter === 'pending'
                        ? !r.approved
                        : r.approved
                    )
                    .map((rev) => (
                      <div
                        key={rev.id}
                        className="p-5 rounded-2xl bg-[#262135] border border-white/10 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-white text-sm">{rev.name}</h4>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  rev.approved
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-amber-500/20 text-amber-300'
                                }`}
                              >
                                {rev.approved ? 'Approved & Live' : 'Pending Approval'}
                              </span>
                            </div>
                            <p className="text-xs text-[#cbd5e1]">
                              {rev.role} • {rev.date}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleApproveReview(rev.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                                rev.approved
                                  ? 'bg-[#1a1625] text-slate-300 hover:text-amber-300'
                                  : 'bg-emerald-500 text-[#120f1a]'
                              }`}
                            >
                              {rev.approved ? 'Hide' : 'Approve'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteReview(rev)}
                              className="p-2 rounded-xl bg-[#1a1625] text-slate-400 hover:text-rose-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-200 italic">&ldquo;{rev.text}&rdquo;</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* ==========================================
                TAB 4: MESSAGES INBOX
            ========================================== */}
            {adminTab === 'messages' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">
                    Student &amp; Parent Inquiry Inbox ({store.messages.length})
                  </h3>
                </div>

                {store.messages.length === 0 ? (
                  <div className="p-12 rounded-3xl bg-[#262135] border border-white/10 text-center text-[#cbd5e1]">
                    Your inquiry inbox is currently empty.
                  </div>
                ) : (
                  store.messages.map((msg) => {
                    const cleanReplyPhone = sanitizeWhatsAppNumber(msg.phone);
                    const whatsappReplyUrl = `https://wa.me/${cleanReplyPhone}?text=${encodeURIComponent(
                      `Hello ${msg.name}, thank you for contacting ${store.profile.name} regarding "${msg.subject}".`
                    )}`;

                    return (
                      <div
                        key={msg.id}
                        className={`p-6 rounded-3xl border transition ${
                          msg.read
                            ? 'bg-[#262135]/70 border-white/10'
                            : 'bg-[#262135] border-[#f472b6]/50 shadow-lg'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2.5">
                              {!msg.read && (
                                <span className="px-2.5 py-0.5 rounded-full bg-[#f472b6] text-[#120f1a] text-[10px] font-extrabold uppercase">
                                  New
                                </span>
                              )}
                              <h4 className="text-base font-bold text-white">{msg.name}</h4>
                              <span className="text-xs text-[#c084fc] font-semibold">
                                {msg.phone}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-[#f472b6]">
                              {msg.subject}
                            </p>
                            <p className="text-[11px] text-[#94a3b8]">{msg.date}</p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {cleanReplyPhone && (
                              <a
                                href={whatsappReplyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-[#120f1a] border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Reply on WhatsApp</span>
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => handleToggleMessageRead(msg.id)}
                              className="px-3 py-2 rounded-xl bg-[#1a1625] text-xs font-semibold text-slate-300 hover:text-white"
                            >
                              {msg.read ? 'Mark Unread' : 'Mark Read'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMessage(msg)}
                              className="p-2 rounded-xl bg-[#1a1625] text-slate-400 hover:text-rose-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-200 bg-[#1a1625] p-4 rounded-2xl border border-white/5">
                          {msg.message}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* ==========================================
                TAB 5: SETTINGS (ADMIN PIN & BACKUP)
            ========================================== */}
            {adminTab === 'settings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Change Security PIN Card */}
                <form
                  onSubmit={handleUpdatePin}
                  className="bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-4 h-fit"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#f472b6]/20 flex items-center justify-center text-[#f472b6]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        Change Admin Security PIN
                      </h3>
                      <p className="text-xs text-[#cbd5e1]">
                        Current active PIN:{' '}
                        <span className="text-[#f472b6] font-mono font-bold">
                          {store.adminPin}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                      New Security PIN
                    </label>
                    <input
                      type="password"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="Enter new 4+ digit PIN"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                      Confirm New PIN
                    </label>
                    <input
                      type="password"
                      value={confirmNewPin}
                      onChange={(e) => setConfirmNewPin(e.target.value)}
                      placeholder="Re-enter new PIN"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1625] border border-white/10 text-sm text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#c084fc] text-[#120f1a] font-bold text-sm"
                  >
                    Save New Admin PIN
                  </button>
                </form>

                {/* Backup & Reset Card */}
                <div className="bg-[#262135] border border-white/10 rounded-3xl p-6 space-y-5 h-fit">
                  <h3 className="text-lg font-bold text-white">
                    Backup, Restore &amp; Demo Reset
                  </h3>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    Export your entire portfolio data (including compressed photos, classes,
                    reviews, and inquiries) as a portable JSON file or restore to factory
                    defaults.
                  </p>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleExportBackup}
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
                      onChange={handleImportBackup}
                      className="hidden"
                    />

                    <div className="pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={handleResetDemoData}
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