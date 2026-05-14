// Direction G — "Cadence"
// Editorial-elegance + considered motion design. Every transition shares one
// easing curve (easeOutExpo) and one stagger (60ms). Choreographed entrances,
// custom cursor, split-text section headings, animated rules, count-up stats.
//
// Palette: warm mushroom paper (no cream, no AI-trope warm-cream), ink, cobalt.
// Type: Newsreader display + Space Grotesk + JetBrains Mono.

const cadenceStyles = `
  .cadence {
    --paper: #ecebe5;
    --paper-2: #e0ded6;
    --paper-3: #f3f1eb;
    --ink: #14141a;
    --ink-2: #4a4a52;
    --ink-3: #87858d;
    --rule: #cfcdc6;
    --accent: #2347ef;
    --accent-2: #ff6b3d;
    --hi: rgba(35, 71, 239, 0.08);
    background: var(--paper);
    color: var(--ink);
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 400;
    width: 100%;
    overflow: hidden;
    position: relative;
    cursor: none;
  }
  .cadence .serif { font-family: 'Newsreader', serif; font-weight: 300; }
  .cadence .mono {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-2);
  }
  .cadence a { color: var(--ink); text-decoration: none; }
  .cadence button { font-family: inherit; }

  /* CUSTOM CURSOR */
  .cadence .cursor {
    position: fixed;
    top: 0; left: 0;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--ink);
    pointer-events: none;
    z-index: 1000;
    transform: translate(-50%, -50%);
    transition: width 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                height 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                background 0.2s, mix-blend-mode 0.2s;
    mix-blend-mode: difference;
  }
  .cadence .cursor.hover-link {
    width: 56px;
    height: 56px;
    background: var(--accent);
    mix-blend-mode: normal;
  }
  .cadence .cursor.hover-link::after {
    content: attr(data-label);
    position: absolute;
    inset: 0;
    color: var(--paper);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* TOP BAR */
  .cadence .topbar {
    position: relative;
    z-index: 4;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    padding: 24px 40px;
    border-bottom: 1px solid var(--rule);
  }
  .cadence .brand { display: flex; align-items: center; gap: 14px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; letter-spacing: -0.01em; }
  .cadence .brand-mark {
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--ink);
    position: relative;
    overflow: hidden;
  }
  .cadence .brand-mark::after {
    content: "";
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: var(--accent);
    animation: cad-orbit 6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
  }
  @keyframes cad-orbit {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(2px, -2px); }
    50% { transform: translate(0, -3px); }
    75% { transform: translate(-2px, -2px); }
  }
  .cadence .nav-links { display: flex; gap: 28px; justify-content: center; }
  .cadence .nav-links a {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--ink-2);
    letter-spacing: 0.04em;
    transition: color 0.2s;
    position: relative;
  }
  .cadence .nav-links a::after {
    content: "";
    position: absolute;
    left: 0; right: 0;
    bottom: -4px;
    height: 1px;
    background: var(--ink);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cadence .nav-links a:hover { color: var(--ink); }
  .cadence .nav-links a:hover::after { transform: scaleX(1); }
  .cadence .top-meta { text-align: right; }

  /* HERO */
  .cadence .hero {
    position: relative;
    padding: 80px 48px 56px;
    overflow: hidden;
  }
  .cadence .hero-eyebrow {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 48px;
  }
  .cadence .hero-eyebrow .pip {
    display: inline-block;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent);
    margin-right: 12px;
    vertical-align: 1px;
    animation: cad-pulse 2.2s ease-in-out infinite;
  }
  @keyframes cad-pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(35, 71, 239, 0.4); }
    50% { opacity: 0.6; box-shadow: 0 0 0 6px rgba(35, 71, 239, 0); }
  }

  .cadence .hero-name {
    font-family: 'Newsreader', serif;
    font-weight: 200;
    font-size: clamp(140px, 19vw, 280px);
    line-height: 0.88;
    letter-spacing: -0.045em;
    margin: 0;
    /* split text container */
    display: block;
    overflow: hidden;
    color: var(--ink);
  }
  .cadence .hero-name .row {
    display: block;
    overflow: hidden;
  }
  .cadence .hero-name .ch {
    display: inline-block;
    transform: translateY(110%) rotate(8deg);
    opacity: 0;
    will-change: transform, opacity;
  }
  .cadence .hero-name .ch.in {
    transform: translateY(0) rotate(0);
    opacity: 1;
    transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1),
                opacity 0.6s ease-out;
  }
  .cadence .hero-name em {
    font-style: italic;
    color: var(--accent);
  }

  /* Below name — split row: tagline + "now" widget */
  .cadence .hero-bottom {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 80px;
    align-items: end;
    margin-top: 56px;
    padding-top: 32px;
    border-top: 1px solid var(--rule);
  }
  .cadence .hero-tagline {
    font-family: 'Newsreader', serif;
    font-size: 26px;
    line-height: 1.4;
    font-weight: 300;
    max-width: 580px;
    text-wrap: pretty;
  }
  .cadence .hero-tagline em { font-style: italic; color: var(--accent); }
  .cadence .hero-tagline .rotator {
    display: inline-block;
    color: var(--accent);
    font-style: italic;
    position: relative;
    vertical-align: baseline;
    min-width: 12ch;
  }
  .cadence .hero-tagline .rotator span {
    display: inline-block;
    will-change: transform, opacity;
  }

  /* NOW widget */
  .cadence .now-card {
    border: 1px solid var(--ink);
    background: var(--paper-3);
    padding: 18px 20px;
    position: relative;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cadence .now-card:hover { transform: translate(-3px, -3px); box-shadow: 4px 4px 0 var(--ink); }
  .cadence .now-card .now-head {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 14px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--rule);
  }
  .cadence .now-card .now-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
  }
  .cadence .now-card .now-title .dot {
    width: 7px; height: 7px;
    background: var(--accent);
    border-radius: 50%;
  }
  .cadence .now-card .now-time {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--ink-3);
  }
  .cadence .now-card .now-list {
    display: flex; flex-direction: column; gap: 8px;
  }
  .cadence .now-card .now-row {
    display: grid;
    grid-template-columns: 70px 1fr;
    gap: 12px;
    align-items: baseline;
  }
  .cadence .now-card .now-row .k {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-3);
  }
  .cadence .now-card .now-row .v {
    font-family: 'Newsreader', serif;
    font-size: 15px;
    line-height: 1.3;
    font-style: italic;
    color: var(--ink);
  }

  /* STATS RIBBON below hero */
  .cadence .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
  }
  .cadence .stat {
    padding: 32px 40px;
    border-right: 1px solid var(--rule);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .cadence .stat:last-child { border-right: 0; }
  .cadence .stat-v {
    font-family: 'Newsreader', serif;
    font-weight: 200;
    font-size: 80px;
    line-height: 0.95;
    letter-spacing: -0.04em;
    font-variant-numeric: tabular-nums;
    color: var(--ink);
  }
  .cadence .stat-v em { font-style: italic; color: var(--accent); }
  .cadence .stat-l {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-3);
  }

  /* SECTIONS */
  .cadence .section {
    padding: 120px 48px;
    border-top: 1px solid var(--rule);
    position: relative;
  }
  .cadence .section-head {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    gap: 60px;
    margin-bottom: 80px;
    align-items: baseline;
  }
  .cadence .section-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-3);
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cadence .section-tag .num { color: var(--accent); }
  .cadence .section-tag .dash {
    flex: 0 0 40px;
    height: 1px;
    background: var(--ink-3);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
  }
  .cadence .section.in .section-tag .dash { transform: scaleX(1); }

  .cadence .section-title {
    font-family: 'Newsreader', serif;
    font-weight: 200;
    font-size: 76px;
    line-height: 0.95;
    letter-spacing: -0.035em;
    margin: 0;
    overflow: hidden;
  }
  .cadence .section-title .ch {
    display: inline-block;
    transform: translateY(110%);
    opacity: 0;
    will-change: transform;
  }
  .cadence .section.in .section-title .ch {
    transform: translateY(0);
    opacity: 1;
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                opacity 0.5s ease-out;
  }
  .cadence .section-title em {
    font-style: italic;
    color: var(--accent);
  }
  .cadence .section-blurb {
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-2);
    max-width: 380px;
    justify-self: end;
    text-wrap: pretty;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s ease-out 0.3s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
  }
  .cadence .section.in .section-blurb { opacity: 1; transform: translateY(0); }

  /* ABOUT */
  .cadence .about {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    gap: 60px;
  }
  .cadence .about .pull {
    font-family: 'Newsreader', serif;
    font-size: 24px;
    font-style: italic;
    line-height: 1.35;
    color: var(--ink);
    padding-left: 16px;
    border-left: 2px solid var(--accent);
    margin-top: 8px;
    text-wrap: pretty;
  }
  .cadence .about p {
    font-family: 'Newsreader', serif;
    font-size: 19px;
    line-height: 1.55;
    margin: 0 0 18px;
    font-weight: 300;
    color: var(--ink);
    text-wrap: pretty;
  }
  .cadence .about .col-2 p { color: var(--ink-2); }

  /* EXPERIENCE — pinned cards */
  .cadence .exp {
    display: flex;
    flex-direction: column;
  }
  .cadence .exp-entry {
    display: grid;
    grid-template-columns: 200px 1fr 1.6fr 200px;
    gap: 60px;
    padding: 40px 0;
    border-top: 1px solid var(--rule);
    align-items: baseline;
    transition: padding-left 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    cursor: pointer;
    position: relative;
  }
  .cadence .exp-entry:last-child { border-bottom: 1px solid var(--rule); }
  .cadence .exp-entry::before {
    content: "";
    position: absolute;
    left: -16px;
    top: 50%;
    width: 4px;
    height: 0;
    background: var(--accent);
    transform: translateY(-50%);
    transition: height 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cadence .exp-entry:hover { padding-left: 24px; }
  .cadence .exp-entry:hover::before { height: 70%; }
  .cadence .exp-year { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--accent); }
  .cadence .exp-co {
    font-family: 'Newsreader', serif;
    font-size: 40px;
    font-weight: 300;
    font-style: italic;
    letter-spacing: -0.025em;
    line-height: 1;
    margin: 0;
  }
  .cadence .exp-role {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--ink-2);
    margin-top: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .cadence .exp-team {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--ink-3);
    margin-top: 4px;
  }
  .cadence .exp-summary {
    font-family: 'Newsreader', serif;
    font-size: 17px;
    line-height: 1.55;
    color: var(--ink-2);
    font-weight: 300;
    text-wrap: pretty;
  }
  .cadence .exp-tags { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
  .cadence .exp-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    padding: 4px 10px;
    border: 1px solid var(--rule);
    border-radius: 999px;
    color: var(--ink-2);
  }

  /* PROJECTS — magazine grid */
  .cadence .proj-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0;
    border-top: 1px solid var(--rule);
  }
  .cadence .proj {
    grid-column: span 3;
    padding: 40px;
    border-right: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-height: 360px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cadence .proj:nth-child(6n+3),
  .cadence .proj:nth-child(6n) { border-right: 0; }
  .cadence .proj:hover { background: var(--paper-3); }
  .cadence .proj::after {
    content: "";
    position: absolute;
    left: 0; right: 0;
    bottom: 0;
    height: 2px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cadence .proj:hover::after { transform: scaleX(1); }
  .cadence .proj-row { display: flex; justify-content: space-between; align-items: baseline; }
  .cadence .proj-n { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--ink-3); letter-spacing: 0.04em; }
  .cadence .proj-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 999px;
    background: var(--hi);
    color: var(--accent);
  }
  .cadence .proj-name {
    font-family: 'Newsreader', serif;
    font-size: 56px;
    font-weight: 200;
    letter-spacing: -0.035em;
    line-height: 1;
    margin: 8px 0 0;
  }
  .cadence .proj-name em { font-style: italic; color: var(--accent); }
  .cadence .proj-blurb {
    font-family: 'Newsreader', serif;
    font-size: 17px;
    line-height: 1.5;
    color: var(--ink-2);
    flex: 1;
    font-weight: 300;
    text-wrap: pretty;
  }
  .cadence .proj-foot {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
  }
  .cadence .proj-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--ink-3);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .cadence .proj-stack span { padding: 3px 8px; border: 1px solid var(--rule); border-radius: 4px; }
  .cadence .proj-cta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink);
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .cadence .proj-cta .arrow { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
  .cadence .proj:hover .proj-cta .arrow { transform: translateX(6px); }

  /* MARQUEE between sections */
  .cadence .marquee {
    overflow: hidden;
    padding: 28px 0;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    background: var(--paper);
  }
  .cadence .marquee-track {
    display: flex;
    gap: 56px;
    white-space: nowrap;
    will-change: transform;
    font-family: 'Newsreader', serif;
    font-weight: 200;
    font-style: italic;
    font-size: 56px;
    letter-spacing: -0.02em;
    line-height: 1;
  }
  .cadence .marquee-track .sep { color: var(--accent); margin: 0 12px; font-style: normal; }

  /* SKILLS — magazine columns */
  .cadence .skills {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
  .cadence .skill-col h4 {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    margin: 0 0 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--rule);
  }
  .cadence .skill-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
  .cadence .skill-col li {
    font-family: 'Newsreader', serif;
    font-size: 22px;
    font-weight: 300;
    letter-spacing: -0.015em;
    line-height: 1.35;
    transition: color 0.2s, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    cursor: default;
  }
  .cadence .skill-col li:hover {
    color: var(--accent);
    font-style: italic;
    transform: translateX(8px);
  }

  /* WRITING */
  .cadence .writing { display: flex; flex-direction: column; }
  .cadence .writing-row {
    display: grid;
    grid-template-columns: 200px 1fr 100px 40px;
    gap: 40px;
    padding: 28px 0;
    border-top: 1px solid var(--rule);
    align-items: center;
    cursor: pointer;
    transition: padding-left 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    position: relative;
  }
  .cadence .writing-row:last-child { border-bottom: 1px solid var(--rule); }
  .cadence .writing-row:hover { padding-left: 24px; }
  .cadence .writing-row:hover .writing-title { color: var(--accent); }
  .cadence .writing-row:hover .writing-arrow .a { transform: translateX(8px); }
  .cadence .writing-date { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-3); letter-spacing: 0.04em; }
  .cadence .writing-title {
    font-family: 'Newsreader', serif;
    font-size: 26px;
    font-weight: 300;
    letter-spacing: -0.02em;
    line-height: 1.2;
    transition: color 0.3s;
    text-wrap: pretty;
  }
  .cadence .writing-read { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--ink-3); text-align: right; }
  .cadence .writing-arrow { font-family: 'JetBrains Mono', monospace; }
  .cadence .writing-arrow .a { display: inline-block; transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }

  /* CONTACT */
  .cadence .contact {
    padding: 160px 48px;
    text-align: left;
    border-top: 1px solid var(--rule);
    position: relative;
    background: var(--paper);
  }
  .cadence .contact-head {
    margin-bottom: 80px;
  }
  .cadence .contact-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 24px; }
  .cadence .contact-title {
    font-family: 'Newsreader', serif;
    font-weight: 200;
    font-size: clamp(96px, 13vw, 200px);
    line-height: 0.9;
    letter-spacing: -0.045em;
    margin: 0;
    overflow: hidden;
  }
  .cadence .contact-title .ch {
    display: inline-block;
    transform: translateY(110%);
    opacity: 0;
  }
  .cadence .contact.in .contact-title .ch {
    transform: translateY(0);
    opacity: 1;
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s;
  }
  .cadence .contact-title em { font-style: italic; color: var(--accent); }
  .cadence .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    border-top: 1px solid var(--rule);
    padding-top: 40px;
  }
  .cadence .contact-card {
    padding: 24px;
    border: 1px solid var(--rule);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 160px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    background: var(--paper);
  }
  .cadence .contact-card:hover {
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);
    transform: translateY(-4px);
  }
  .cadence .contact-card:hover .ck { color: rgba(236, 235, 229, 0.5); }
  .cadence .contact-card:hover .ca { background: var(--accent); color: var(--paper); }
  .cadence .contact-card .ck {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-3);
    transition: color 0.3s;
  }
  .cadence .contact-card .cv {
    font-family: 'Newsreader', serif;
    font-size: 28px;
    font-weight: 300;
    letter-spacing: -0.025em;
    line-height: 1.1;
    margin: 12px 0;
    text-wrap: pretty;
  }
  .cadence .contact-card .ca {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    align-self: flex-start;
    padding: 4px 10px;
    background: var(--hi);
    color: var(--accent);
    border-radius: 999px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: all 0.3s;
  }

  /* COLOPHON */
  .cadence .colophon {
    padding: 28px 48px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--rule);
    color: var(--ink-3);
  }
`;

// ─── Custom cursor ───
function CadenceCursor() {
  const ref = React.useRef(null);
  const labelRef = React.useRef("");
  const targetRef = React.useRef({ x: 0, y: 0 });
  const cursorRef = React.useRef({ x: 0, y: 0 });
  const [hoverLabel, setHoverLabel] = React.useState("");

  React.useEffect(() => {
    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        setHoverLabel(t.getAttribute('data-cursor') || "•");
      } else {
        setHoverLabel("");
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    let raf;
    const tick = () => {
      cursorRef.current.x += (targetRef.current.x - cursorRef.current.x) * 0.22;
      cursorRef.current.y += (targetRef.current.y - cursorRef.current.y) * 0.22;
      if (ref.current) {
        ref.current.style.transform = `translate(${cursorRef.current.x}px, ${cursorRef.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={"cursor" + (hoverLabel ? " hover-link" : "")}
      data-label={hoverLabel}
    />
  );
}

// ─── SplitText helper — render each character in a span so we can animate ───
function SplitText({ text, className = "" }) {
  // preserve whitespace; render <br/> for newlines
  const parts = [];
  let idx = 0;
  text.split('\n').forEach((line, lineIdx) => {
    if (lineIdx > 0) parts.push(<br key={`br${idx++}`} />);
    line.split('').forEach((c) => {
      if (c === ' ') {
        parts.push(<span key={idx++} className="ch" style={{ width: '0.3em' }}>&nbsp;</span>);
      } else {
        parts.push(<span key={idx++} className="ch">{c}</span>);
      }
    });
  });
  return <span className={className}>{parts}</span>;
}

// ─── IntersectionObserver: add .in to elements when they scroll into view.
//     Also stagger child .ch character spans so split-text animates per-letter.
function useReveal(rootRef) {
  React.useEffect(() => {
    if (!rootRef.current) return;
    const root = rootRef.current;
    const targets = root.querySelectorAll('.section, .contact');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('in');
          // stagger chars
          el.querySelectorAll('.section-title .ch, .contact-title .ch').forEach((ch, i) => {
            ch.style.transitionDelay = (i * 35) + 'ms';
          });
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, [rootRef]);
}

// ─── Animated count-up (runs once when on screen) ───
function CountUp({ to, suffix = "", duration = 1500 }) {
  const [v, setV] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf, start;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const step = (t) => {
          if (!start) start = t;
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setV(Math.floor(eased * to));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [to, duration]);
  return <span ref={ref}>{v}{suffix}</span>;
}

// ─── Hero name letter-by-letter resolve ───
function HeroName() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const chars = ref.current.querySelectorAll('.ch');
    chars.forEach((ch, i) => {
      setTimeout(() => ch.classList.add('in'), 200 + i * 60);
    });
  }, []);
  return (
    <h1 ref={ref} className="hero-name">
      <span className="row">
        <SplitText text="Or" />
      </span>
      <span className="row">
        <SplitText text="Kop." />
      </span>
    </h1>
  );
}

// ─── Phrase rotator — swaps phrases on a timer with letter slide ───
function Rotator({ phrases, interval = 2800 }) {
  const [idx, setIdx] = React.useState(0);
  const [animKey, setAnimKey] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setIdx(i => (i + 1) % phrases.length);
      setAnimKey(k => k + 1);
    }, interval);
    return () => clearInterval(id);
  }, [phrases.length, interval]);
  const current = phrases[idx];
  return (
    <span className="rotator">
      <span
        key={animKey}
        style={{
          display: 'inline-block',
          animation: 'cad-rot-in 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {current}
      </span>
      <style>{`
        @keyframes cad-rot-in {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </span>
  );
}

// ─── "Now" widget ───
function NowCard() {
  const [time, setTime] = React.useState("");
  React.useEffect(() => {
    const upd = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Jerusalem' }));
    };
    upd();
    const id = setInterval(upd, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="now-card">
      <div className="now-head">
        <span className="now-title"><span className="dot" /> Now</span>
        <span className="now-time">{time} · Tel Aviv</span>
      </div>
      <div className="now-list">
        <div className="now-row"><span className="k">Building</span><span className="v">Authorization Platform, Amazon</span></div>
        <div className="now-row"><span className="k">Reading</span><span className="v">"A Memory Called Empire"</span></div>
        <div className="now-row"><span className="k">Writing</span><span className="v">essay on retry-loop shapes</span></div>
        <div className="now-row"><span className="k">Listening</span><span className="v">Nils Frahm — Says</span></div>
        <div className="now-row"><span className="k">Status</span><span className="v" style={{ color: 'var(--accent)' }}>Open to roles ✦</span></div>
      </div>
    </div>
  );
}

// ─── Auto-marquee strip ───
function Marquee({ items, speed = 32 }) {
  const trackRef = React.useRef(null);
  React.useEffect(() => {
    let raf;
    let offset = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      offset -= speed * dt;
      if (trackRef.current) {
        const w = trackRef.current.scrollWidth / 2;
        if (offset < -w) offset += w;
        trackRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div ref={trackRef} className="marquee-track">
        {doubled.map((it, i) => (
          <span key={i}>
            {it}
            <span className="sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Cadence() {
  const p = window.PORTFOLIO;
  const rootRef = React.useRef(null);
  useReveal(rootRef);

  const [time, setTime] = React.useState("");
  React.useEffect(() => {
    const upd = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jerusalem' }));
    };
    upd();
    const id = setInterval(upd, 30000);
    return () => clearInterval(id);
  }, []);

  const phrases = [
    "the boring parts",
    "trustworthy systems",
    "what no one notices",
    "the slow craft",
    "code that explains itself",
  ];

  return (
    <div className="cadence" ref={rootRef} data-screen-label="G · Cadence">
      <style>{cadenceStyles}</style>
      <CadenceCursor />

      <div className="topbar">
        <div className="brand">
          <span className="brand-mark" />
          orkop.dev
          <span style={{ color: 'var(--ink-3)', fontWeight: 400, marginLeft: 4 }}>/ a portfolio · 2026</span>
        </div>
        <div className="nav-links">
          <a href="#work" data-cursor="open">work</a>
          <a href="#projects" data-cursor="open">projects</a>
          <a href="#writing" data-cursor="read">writing</a>
          <a href="#contact" data-cursor="hi">contact</a>
        </div>
        <div className="top-meta mono">{time} TLV · ● open to roles</div>
      </div>

      <section className="hero">
        <div className="hero-eyebrow">
          <span className="mono"><span className="pip" />Software Development Engineer · Amazon</span>
          <span className="mono">Vol. V · MMXXVI</span>
        </div>

        <HeroName />

        <div className="hero-bottom">
          <p className="hero-tagline">
            I'm Or — a software engineer at Amazon working on payments authorization.
            I spend most days on <Rotator phrases={phrases} />.
            <br/>This portfolio is one of the more visible things I've made.
          </p>
          <NowCard />
        </div>
      </section>

      <div className="stats">
        <div className="stat">
          <span className="stat-v"><CountUp to={5} suffix="+" /></span>
          <span className="stat-l">Years shipping</span>
        </div>
        <div className="stat">
          <span className="stat-v"><CountUp to={11} /></span>
          <span className="stat-l">Production services</span>
        </div>
        <div className="stat">
          <span className="stat-v"><CountUp to={30} suffix="k" /></span>
          <span className="stat-l">TPS · p99 &lt; 40ms</span>
        </div>
        <div className="stat">
          <span className="stat-v"><em>∞</em></span>
          <span className="stat-l">Cups of coffee</span>
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <div className="section-tag"><span className="num">01</span><span className="dash" /><span>About</span></div>
          <h2 className="section-title"><SplitText text="Quietly" /><br/><SplitText text="reliable." /></h2>
          <p className="section-blurb">A short introduction, in three paragraphs and one pull quote.</p>
        </div>
        <div className="about">
          <div className="pull">"The best systems explain themselves at 3am, when you're tired and something is broken."</div>
          <div>
            <p>{p.bioLong[0]}</p>
            <p>{p.bioLong[1]}</p>
          </div>
          <div className="col-2">
            <p>{p.bioLong[2]}</p>
          </div>
        </div>
      </section>

      <Marquee items={["Available for new roles · 2026", "Distributed systems", "Payments at scale", "Mentorship", "Open source", "Writing", "Speaking", "Coffee in Tel Aviv"]} speed={32} />

      <section className="section" id="work">
        <div className="section-head">
          <div className="section-tag"><span className="num">02</span><span className="dash" /><span>Experience</span></div>
          <h2 className="section-title"><SplitText text="A short" /><br/><em><SplitText text="career," /></em><br/><SplitText text="so far." /></h2>
          <p className="section-blurb">Five years, four roles, one persistent obsession with making systems explain themselves at 3am.</p>
        </div>
        <div className="exp">
          {p.experience.map((e, i) => (
            <div key={i} className="exp-entry" data-cursor="more">
              <div>
                <div className="exp-year">{e.year}</div>
                <div className="exp-team" style={{ marginTop: 8 }}>{e.location}</div>
              </div>
              <div>
                <h3 className="exp-co">{e.company}</h3>
                <div className="exp-role">{e.role}</div>
                <div className="exp-team" style={{ color: 'var(--accent)' }}>{e.team}</div>
              </div>
              <div className="exp-summary">{e.summary}</div>
              <div className="exp-tags">
                {e.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-head">
          <div className="section-tag"><span className="num">03</span><span className="dash" /><span>Projects</span></div>
          <h2 className="section-title"><SplitText text="Selected" /><br/><em><SplitText text="work." /></em></h2>
          <p className="section-blurb">Side projects, open source, internal tools. The work that doesn't fit on a resume.</p>
        </div>
        <div className="proj-grid">
          {p.projects.map((proj, i) => (
            <div key={i} className="proj" data-cursor="open">
              <div className="proj-row">
                <span className="proj-n">№ {proj.n} · {proj.year}</span>
                <span className="proj-tag">{proj.tag}</span>
              </div>
              <h3 className="proj-name">{proj.name}<em>.</em></h3>
              <p className="proj-blurb">{proj.blurb}</p>
              <div className="proj-foot">
                <div className="proj-stack">
                  {proj.stack.map(s => <span key={s}>{s}</span>)}
                </div>
                <span className="proj-cta">Read more <span className="arrow">→</span></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div className="section-tag"><span className="num">04</span><span className="dash" /><span>Toolkit</span></div>
          <h2 className="section-title"><SplitText text="The" /> <em><SplitText text="stack." /></em></h2>
          <p className="section-blurb">Daily, comfortable, learning — in that order. Optimizing for boring technology, except where boring doesn't move fast enough.</p>
        </div>
        <div className="skills">
          {Object.entries(p.skills).map(([cat, items]) => (
            <div key={cat} className="skill-col">
              <h4>{cat}</h4>
              <ul>{items.map(s => <li key={s}>{s}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="writing">
        <div className="section-head">
          <div className="section-tag"><span className="num">05</span><span className="dash" /><span>Writing</span></div>
          <h2 className="section-title"><SplitText text="Recent" /><br/><em><SplitText text="essays." /></em></h2>
          <p className="section-blurb">Long-form notes about distributed systems, on-call, and the slow work of making software trustworthy.</p>
        </div>
        <div className="writing">
          {p.writing.map((w, i) => (
            <div key={i} className="writing-row" data-cursor="read">
              <span className="writing-date">{w.date}</span>
              <span className="writing-title">{w.title}</span>
              <span className="writing-read">{w.read}</span>
              <span className="writing-arrow"><span className="a">→</span></span>
            </div>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-head">
          <div className="contact-eyebrow">— § 06 — Contact</div>
          <h1 className="contact-title">
            <SplitText text="Let's" /><br/>
            <em><SplitText text="talk." /></em>
          </h1>
        </div>
        <div className="contact-grid">
          <a className="contact-card" href={p.links.email.href} data-cursor="email">
            <span className="ck">Email · preferred</span>
            <span className="cv">{p.links.email.label}</span>
            <span className="ca">Reply within 24h →</span>
          </a>
          <a className="contact-card" href={p.links.github.href} target="_blank" rel="noreferrer" data-cursor="github">
            <span className="ck">GitHub</span>
            <span className="cv">/orkop465</span>
            <span className="ca">Follow ↗</span>
          </a>
          <a className="contact-card" href={p.links.linkedin.href} target="_blank" rel="noreferrer" data-cursor="linkedin">
            <span className="ck">LinkedIn</span>
            <span className="cv">/in/or-kop</span>
            <span className="ca">Connect ↗</span>
          </a>
          <a className="contact-card" href={p.links.resume.href} data-cursor="cv">
            <span className="ck">CV · PDF · 84KB</span>
            <span className="cv">Download</span>
            <span className="ca">Latest ↓</span>
          </a>
        </div>
      </section>

      <div className="colophon mono">
        <span>orkop.dev · vol. v · 2026 · set in Newsreader, Space Grotesk &amp; JetBrains Mono</span>
        <span>handcoded · no analytics · responds within 24h</span>
      </div>
    </div>
  );
}

window.Cadence = Cadence;
