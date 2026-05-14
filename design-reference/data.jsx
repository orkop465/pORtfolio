// Shared placeholder content for all three directions.
// Or can swap real copy in here later — every artboard reads from one source.

const PORTFOLIO = {
  name: "Or Kop",
  role: "Software Development Engineer",
  company: "Amazon",
  location: "Tel Aviv · GMT+3",
  tagline: "I build the boring, reliable infrastructure underneath products you use every day — currently payments at Amazon.",
  bioShort: "I'm a software engineer who's spent five years quietly making systems more trustworthy. I care about clarity, about durability, and about leaving things better than I found them.",
  bioLong: [
    "I never set out to work on payments. I set out to work on things that mattered, and payments — boring as they sound — turn out to matter a lot. Today I'm a Software Development Engineer at Amazon, working on the authorization platform that decides, thousands of times a second, whether your card actually goes through.",
    "Before Amazon I worked on industrial ML, where the cost of a bad deploy was measured in barrels of crude oil. Before that, two years in the army taught me how to write software that genuinely cannot fail. Both lessons are still with me.",
    "Outside of work I climb (badly), tinker with modular synths, over-engineer my home network, and read more sci-fi than my partner thinks is healthy. If you're working on something interesting — say hi."
  ],
  email: "hi@orkop.dev",
  links: {
    github: { label: "github.com/orkop465", href: "https://github.com/orkop465" },
    linkedin: { label: "linkedin.com/in/or-kop", href: "https://www.linkedin.com/in/or-kop/" },
    email: { label: "hi@orkop.dev", href: "mailto:hi@orkop.dev" },
    resume: { label: "Download CV", href: "#" }
  },
  stats: [
    { value: "5+", label: "Years shipping" },
    { value: "11", label: "Production services" },
    { value: "∞", label: "Cups of coffee" }
  ],
  experience: [
    {
      year: "2024 —",
      company: "Amazon",
      role: "Software Development Engineer II",
      team: "Payments · Authorization Platform",
      location: "Tel Aviv",
      summary: "Lead engineer on a high-throughput authorization service handling 30k TPS at p99 < 40ms. Drove the migration from a monolith to event-sourced workflows, reducing on-call pages 6×.",
      tags: ["Java", "DynamoDB", "Step Functions", "Kafka"]
    },
    {
      year: "2022 — 24",
      company: "Amazon",
      role: "Software Development Engineer",
      team: "Selling Partner Experience",
      location: "Tel Aviv",
      summary: "Owned the seller onboarding API end-to-end. Cut median signup completion time by 38% and built the experimentation framework now used across the org.",
      tags: ["TypeScript", "AWS Lambda", "RDS", "React"]
    },
    {
      year: "2020 — 22",
      company: "Imubit",
      role: "Backend Engineer",
      team: "Industrial ML Platform",
      location: "Tel Aviv",
      summary: "Built the data ingestion layer for closed-loop optimization at oil refineries — millions of sensor points per minute, written once, queried always.",
      tags: ["Go", "TimescaleDB", "Kubernetes"]
    },
    {
      year: "2019 — 20",
      company: "IDF · Unit 81",
      role: "Software Developer",
      team: "Signals R&D",
      location: "Classified",
      summary: "Two years of intensive systems work. Specifics under NDA; the lessons in writing software that cannot fail came home with me.",
      tags: ["C++", "Linux", "Networking"]
    }
  ],
  projects: [
    {
      n: "01",
      name: "Driftwood",
      tag: "Open source · 1.2k ★",
      year: "2025",
      blurb: "A tiny, dependency-free queue for Postgres. Built to replace the four background-job libraries I kept stitching together. Visible jobs, honest retries, no magic.",
      stack: ["Postgres", "Go", "CLI"],
      href: "#"
    },
    {
      n: "02",
      name: "Mile",
      tag: "iOS · App Store",
      year: "2024",
      blurb: "A running journal for people who hate running journals. One swipe to log, one tap to see the year. Built solo on weekends; ~4k weekly active runners.",
      stack: ["Swift", "SwiftUI", "CloudKit"],
      href: "#"
    },
    {
      n: "03",
      name: "Lattice",
      tag: "Internal tool",
      year: "2024",
      blurb: "A visual query builder for our team's data warehouse. Three hundred engineers stopped asking analysts for basic numbers. The analysts sent thank-you cards.",
      stack: ["TypeScript", "React", "DuckDB"],
      href: "#"
    },
    {
      n: "04",
      name: "Quietfeed",
      tag: "Side project",
      year: "2023",
      blurb: "An RSS reader that respects your time. No infinite scroll, no engagement metrics, no notifications — just the things you asked for, the moment they appear.",
      stack: ["Rust", "SQLite", "htmx"],
      href: "#"
    },
    {
      n: "05",
      name: "Field Recordings",
      tag: "Writing series",
      year: "2022 —",
      blurb: "An ongoing essay collection about distributed systems told through stories. Recommended reading at three companies I don't work at.",
      stack: ["Words"],
      href: "#"
    },
    {
      n: "06",
      name: "Slate",
      tag: "Design system",
      year: "2022",
      blurb: "A typographic component library for internal tools. Solved the 'every dashboard looks different' problem at my last role. Sundowned, then revived as OSS.",
      stack: ["React", "CSS", "Storybook"],
      href: "#"
    }
  ],
  skills: {
    "Languages": ["TypeScript", "Go", "Python", "Java", "Rust", "Swift", "SQL"],
    "Systems": ["Postgres", "DynamoDB", "Kafka", "Redis", "Kubernetes", "AWS"],
    "Frontend": ["React", "SwiftUI", "Web Components", "Three.js", "Tailwind"],
    "Practices": ["Distributed systems", "Observability", "DX", "Performance", "Mentorship"]
  },
  writing: [
    { date: "Apr 2026", title: "On idempotency keys, and why they fail in the boring way", read: "8 min" },
    { date: "Feb 2026", title: "The seven shapes of a retry loop", read: "12 min" },
    { date: "Nov 2025", title: "What I learned from one year of code reviews", read: "6 min" },
    { date: "Aug 2025", title: "Postgres is the queue you already have", read: "10 min" },
    { date: "Mar 2025", title: "How to write a runbook nobody hates", read: "5 min" }
  ]
};

window.PORTFOLIO = PORTFOLIO;
