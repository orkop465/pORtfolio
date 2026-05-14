import { useEffect, useState } from 'react';

const NAV = [
  { id: 'about', label: 'about', cursor: 'read' },
  { id: 'work', label: 'work', cursor: 'see' },
  { id: 'projects', label: 'projects', cursor: 'see' },
  { id: 'toolkit', label: 'toolkit', cursor: 'see' },
  { id: 'contact', label: 'contact', cursor: 'hi' },
];

export function Topbar() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const targets = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    targets.forEach((t) => io.observe(t));

    const firstSection = document.getElementById(NAV[0].id);
    const clearIfAboveFirst = () => {
      if (!firstSection) return;
      const top = firstSection.getBoundingClientRect().top;
      if (top > window.innerHeight * 0.4) setActive('');
    };
    clearIfAboveFirst();
    window.addEventListener('scroll', clearIfAboveFirst, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', clearIfAboveFirst);
    };
  }, []);

  function scrollTop(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }

  return (
    <header className="topbar">
      <a className="brand" href="#top" onClick={scrollTop} data-cursor="top" aria-label="Back to top">
        <span className="brand-mark" aria-hidden="true" />
        orkop.dev
        <span className="brand-sub">/ a portfolio · 2026</span>
      </a>
      <nav className="nav-links" aria-label="Primary">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            data-cursor={n.cursor}
            className={active === n.id ? 'is-active' : ''}
          >
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
