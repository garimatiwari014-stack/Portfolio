export const APP_NAME = import.meta.env.VITE_APP_NAME || 'My Portfolio';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SKILLS: '/skills',
  EXPERIENCE: '/experience',
  PROJECTS: '/projects',
  ACHIEVEMENTS: '/achievements',
  CERTIFICATIONS: '/certifications',
  CODING_PROFILES: '/coding-profiles',
  RESUME: '/resume',
  CONTACT: '/contact',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_SKILLS: '/admin/skills',
  ADMIN_EXPERIENCE: '/admin/experience',
  ADMIN_ACHIEVEMENTS: '/admin/achievements',
  ADMIN_CERTIFICATIONS: '/admin/certifications',
  ADMIN_MESSAGES: '/admin/messages',
  ADMIN_SETTINGS: '/admin/settings',
};

export const SOCIAL_ICONS = {
  GitHub: 'FaGithub',
  LinkedIn: 'FaLinkedin',
  LeetCode: 'SiLeetcode',
  Twitter: 'FaTwitter',
  Instagram: 'FaInstagram',
  Facebook: 'FaFacebook',
  YouTube: 'FaYoutube',
  Medium: 'FaMedium',
  'Dev.to': 'FaDev',
};

export const SKILL_CATEGORIES = [
  'All',
  'Languages',
  'Frontend',
  'Backend',
  'Database',
  'Tools',
  'Other'
];

export const PROJECT_CATEGORIES = [
  'All',
  'Web Development',
  'Mobile Development',
  'AI/ML',
  'Full Stack',
  'Backend',
  'Frontend',
  'Other'
];

export const ACHIEVEMENT_CATEGORIES = [
  'All',
  'Hackathon',
  'Competition',
  'Award',
  'Recognition',
  'Other'
];

export const TYPEWRITER_ROLES = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'Java Developer',
  'AI Enthusiast',
  'Problem Solver'
];

export const STATS = [
  { label: 'LeetCode Problems', value: 250, suffix: '+' },
  { label: 'Major Projects', value: 4, suffix: '+' },
  { label: 'Internships', value: 2, suffix: '+' },
  { label: 'Hackathons', value: 3, suffix: '+' }
];
