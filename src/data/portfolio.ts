export type Project = {
  slug: string;
  name: string;
  year: string;
  role: string;
  blurb: string;
  href?: string;
};

export type LogoKind =
  | 'amazon'
  | 'idf-hatal'
  | 'ub-v1'
  | 'ub-v2'
  | 'generic';

export type Experience = {
  id: string;
  date: string;
  role: string;
  company: string;
  blurb: string;
  href?: string;
  logo?: LogoKind;
};

export type NowItem = { date: string; body: string };
export type SocialLink = { label: string; href: string };
export type ToolkitCategory = { label: string; tags: string[] };

export const profile = {
  name: 'or.kop',
  initials: 'OK',
  role: 'Software engineer',
  tagline: 'Tools, systems, type.',
  location: 'Earth, mostly.',
  bio: [
    'Software engineer. I build small, sharp tools — observability, data plumbing, the occasional shader.',
    'Currently somewhere between systems work and design. Replace this paragraph in src/data/portfolio.ts.',
  ],
  email: 'hello@orkop.dev',
};

export const experience: Experience[] = [
  {
    id: 'exp-amazon',
    date: '2024 — now',
    role: 'Software engineer',
    company: 'Amazon',
    blurb: 'Placeholder. What you do at Amazon. Two sentences. Replace in src/data/portfolio.ts.',
    logo: 'amazon',
  },
  {
    id: 'exp-idf',
    date: '2022 — 2024',
    role: 'Engineer',
    company: 'IDF',
    blurb: 'Placeholder. Service notes. Replace in src/data/portfolio.ts.',
    logo: 'idf-hatal',
  },
  {
    id: 'exp-ub',
    date: '2018 — 2022',
    role: 'BSc, Computer Science',
    company: 'University at Buffalo',
    blurb: 'Placeholder. Coursework, projects, anything notable. Replace in src/data/portfolio.ts.',
    logo: 'ub-v1',
  },
];

export const projects: Project[] = [
  {
    slug: 'analytics-engine',
    name: 'A real-time analytics engine',
    year: '2024',
    role: 'Lead',
    blurb: 'Placeholder. One sentence on the project, the constraint, the result.',
    href: '#',
  },
  {
    slug: 'graph-db-poems',
    name: 'A graph DB for poems',
    year: '2024',
    role: 'Solo',
    blurb: 'Placeholder. Replace in src/data/portfolio.ts.',
    href: '#',
  },
  {
    slug: 'distributed-cron',
    name: 'Distributed cron, weekend edition',
    year: '2023',
    role: 'Co-author',
    blurb: 'Placeholder. Replace in src/data/portfolio.ts.',
    href: '#',
  },
  {
    slug: 'terminal-typewriter',
    name: 'A typewriter for the terminal',
    year: '2023',
    role: 'Solo',
    blurb: 'Placeholder. Replace in src/data/portfolio.ts.',
    href: '#',
  },
  {
    slug: 'satellite-pipe',
    name: 'Satellite telemetry pipeline',
    year: '2022',
    role: 'Engineer',
    blurb: 'Placeholder. Replace in src/data/portfolio.ts.',
    href: '#',
  },
  {
    slug: 'low-latency-bot',
    name: 'A very low-latency bot',
    year: '2022',
    role: 'Solo',
    blurb: 'Placeholder. Replace in src/data/portfolio.ts.',
    href: '#',
  },
];

export const toolkit: ToolkitCategory[] = [
  { label: 'languages', tags: ['typescript', 'python', 'rust', 'go', 'glsl'] },
  { label: 'runtime',   tags: ['node', 'bun', 'deno', 'docker', 'kubernetes'] },
  { label: 'data',      tags: ['postgres', 'redis', 'duckdb', 'parquet', 'kafka'] },
  { label: 'front',     tags: ['react', 'three.js', 'vite', 'framer-motion'] },
  { label: 'design',    tags: ['figma', 'blender', 'ableton'] },
];

export const nowItems: NowItem[] = [
  { date: '2026 — now', body: 'Shipping something small and sharp. Replace in src/data/portfolio.ts.' },
  { date: '2026 — Q2',  body: 'Reading: placeholder book. Listening: placeholder record.' },
  { date: '2025 — Q4',  body: 'Built and broke things. Mostly built.' },
];

export const socials: SocialLink[] = [
  { label: 'github',   href: 'https://github.com/orkop' },
  { label: 'linkedin', href: 'https://www.linkedin.com/' },
  { label: 'email',    href: 'mailto:hello@orkop.dev' },
];

export const resumeHref = '/resume.pdf';
