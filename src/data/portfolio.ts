export type Project = {
  slug: string;
  name: string;
  year: string;
  role: string;
  tag: string;
  stack: string[];
  blurb: string;
  href?: string;
};

export type Experience = {
  id: string;
  date: string;
  role: string;
  company: string;
  location: string;
  blurb: string;
  tags?: string[];
  href?: string;
};

export type NowItem = { date: string; body: string };
export type NowCardRow = { k: string; v: string };
export type SocialLink = { label: string; href: string };
export type ToolkitCategory = { label: string; tags: string[] };
export type Stat = { label: string; value: number | '∞'; suffix?: string };

export const profile = {
  name: 'or.kop',
  initials: 'OK',
  role: 'Software Development Engineer',
  company: 'Amazon',
  tagline: 'Software with purpose.',
  pullQuote: 'The best systems explain themselves at 3am, when you are tired and something is broken.',
  location: 'Boulder, CO.',
  timezone: 'America/Denver',
  timezoneLabel: 'MT',
  bio: [
    'Versatile software engineer jumping between systems, tooling, infrastructure, and whatever else needs to get built.',
    'Fast to adapt, comfortable in unfamiliar territory, and usually happiest somewhere near the messy parts.',
    'Passionate about building software that has a positive impact on the world, whether that’s through work, open source, or side projects.',
  ],
  phrases: [
    'tools that earn their keep',
    'systems that explain themselves',
    'the boring parts',
    'whatever needs to get built',
    'code that reads like prose',
  ],
  email: 'hello@orkop.dev',
};

export const marqueeItems: string[] = [
  'Open to interesting problems · 2026',
  'Distributed systems',
  'Tools that earn their keep',
  'Mentorship',
  'Open source',
  'Coffee, mostly',
];

export const nowCardRows: NowCardRow[] = [
  { k: 'building', v: 'Auth platform, Amazon' },
  { k: 'reading', v: '"A Memory Called Empire"' },
  { k: 'writing', v: 'notes on retry-loop shapes' },
  { k: 'listening', v: 'Nils Frahm — Says' },
  { k: 'status', v: 'Open to roles ✦' },
];

export const experience: Experience[] = [
  {
    id: 'exp-amazon',
    date: 'June 2026 — Present',
    role: 'Software Development Engineer',
    company: 'Amazon',
    location: 'Boulder, CO',
    blurb: 'Placeholder.',
    tags: ['Auth', 'AWS', 'Distributed Systems'],
  },
  {
    id: 'exp-amazon-2',
    date: 'May 2025 — August 2025',
    role: 'Software Development Engineer Intern',
    company: 'Amazon',
    location: 'NYC',
    blurb: 'Developed & managed the SDLC of a prod-grade agentic GenAI internal ticket resolution system. Ticket resolution times slashed by over 85%.',
    tags: ['Python', 'GenAI', 'Agentic'],
  },
  {
    id: 'exp-cyto',
    date: 'January 2024 — January 2025',
    role: 'Software Development Engineer Intern',
    company: 'CytoCybernetics',
    location: 'Buffalo, NY',
    blurb: 'Developed & managed the SDLC of a prod-grade agentic GenAI internal ticket resolution system. Ticket resolution times slashed by over 85%.',
    tags: ['Python', 'C++', 'Hardware'],
  },
  {
    id: 'exp-idf',
    date: 'February 2019 — November 2021',
    role: 'Software Engineer',
    company: 'IDF, Ground Forces R&D, Robotics & Autonomy Branch',
    location: 'Tel Aviv, IL',
    blurb: 'Placeholder. Service notes. Replace in src/data/portfolio.ts.',
    tags: ['Systems', 'Robotics', 'Linux'],
  },
];

export const education: Experience[] = [
  {
    id: 'edu-ub',
    date: '2023 — 2026',
    role: 'BSc, Computer Science, Mathematics minor',
    company: 'University at Buffalo',
    location: 'Buffalo, NY',
    blurb: 'Member of the University Honors College. Graduated Summa Cum Laude. Provost Scholarship recipient.',
    tags: ['CS', 'Math'],
  },
];

export const projects: Project[] = [
  {
    slug: 'maakavoda',
    name: 'Maakavoda',
    year: '2026',
    role: 'Solo',
    tag: 'Open source',
    stack: ['React', 'Postgres', 'TypeScript'],
    blurb: 'Analytics driven scrum board for job application tracking',
    href: 'https://maakavoda.com/',
  },
  {
    slug: 'mosaic-challenge',
    name: 'Mobile Standoff Autonomous Indoor Capabilities (MoSAIC) Challenge',
    year: '2020',
    role: 'Lead engineer',
    tag: 'Robotics',
    stack: ['Python', 'Graph DB', 'NLP'],
    blurb: 'Built the simulation platform for a $600k+ global autonomous robotics competition run by the IDF and U.S. Department of Defense, supporting 39+ concurrent teams testing indoor navigation algorithms.',
    href: 'https://mosaichallenge.com/',
  },
  {
    slug: '716-simulator',
    name: '716 Simulator',
    year: '2025',
    role: 'Software engineer',
    tag: 'Tooling',
    stack: ['Rust', 'WASM'],
    blurb: 'Placeholder. Replace in src/data/portfolio.ts.',
    href: '#',
  },
  {
    slug: 'terminal-typewriter',
    name: 'A typewriter for the terminal',
    year: '2023',
    role: 'Solo',
    tag: 'Side project',
    stack: ['Go', 'TTY'],
    blurb: 'Placeholder. Replace in src/data/portfolio.ts.',
    href: '#',
  },
  {
    slug: 'satellite-pipe',
    name: 'Satellite telemetry pipeline',
    year: '2022',
    role: 'Engineer',
    tag: 'Pipeline',
    stack: ['Python', 'Kafka', 'AWS'],
    blurb: 'Placeholder. Replace in src/data/portfolio.ts.',
    href: '#',
  },
  {
    slug: 'low-latency-bot',
    name: 'A very low-latency bot',
    year: '2022',
    role: 'Solo',
    tag: 'Performance',
    stack: ['Rust', 'WebSockets'],
    blurb: 'Placeholder. Replace in src/data/portfolio.ts.',
    href: '#',
  },
];

export const toolkit: ToolkitCategory[] = [
  { label: 'languages', tags: ['typescript', 'python', 'rust', 'go', 'glsl'] },
  { label: 'runtime',   tags: ['node', 'bun', 'deno', 'docker', 'kubernetes'] },
  { label: 'data',      tags: ['postgres', 'redis', 'duckdb', 'parquet', 'kafka'] },
  { label: 'cloud',     tags: ['aws', 'gcp']},
  { label: 'front',     tags: ['react', 'three.js', 'vite', 'framer-motion'] },
  { label: 'design',    tags: ['figma', 'blender', 'ableton'] },
];

export const nowItems: NowItem[] = [
  { date: '2026 — now', body: 'Shipping something small and sharp. Replace in src/data/portfolio.ts.' },
  { date: '2026 — Q2',  body: 'Reading: placeholder book. Listening: placeholder record.' },
  { date: '2025 — Q4',  body: 'Built and broke things. Mostly built.' },
];

export const stats: Stat[] = [
  { label: 'Years shipping', value: new Date().getFullYear() - 2019, suffix: '+' },
  { label: 'Roles held', value: experience.length },
  { label: 'Projects in the open', value: projects.length },
  { label: 'Side experiments', value: '∞' },
];

export const socials: SocialLink[] = [
  { label: 'github',   href: 'https://github.com/orkop465' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/or-kop' },
  { label: 'email',    href: 'mailto:hello@orkop.dev' },
];

export const resumeHref = '/resume.pdf';
