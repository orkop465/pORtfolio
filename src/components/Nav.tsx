import { Wordmark } from './Wordmark';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTIONS: { id: string; label: string }[] = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'resume',     label: 'Résumé' },
  { id: 'now',        label: 'Now' },
  { id: 'contact',    label: 'Contact' },
];

// Tracking 'top' (the hero) means observer picks it at the top of the page;
// since 'top' isn't a link, no nav item highlights.
const TRACKED_IDS = ['top', ...SECTIONS.map((s) => s.id)];

export function Nav() {
  const active = useActiveSection(TRACKED_IDS);

  return (
    <header className="nav" role="banner">
      <Wordmark />
      <nav className="nav__links" aria-label="Sections">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? 'page' : undefined}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
