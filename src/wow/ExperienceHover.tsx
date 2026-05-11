import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { LogoKind } from './logos';
import { useReducedMotion } from '../hooks/useReducedMotion';

const Logo = lazy(() => import('./Logo').then((m) => ({ default: m.Logo })));

const UNMOUNT_DEBOUNCE = 260;
const PORTAL_W = 280;
const PORTAL_GAP = 32;

const KNOWN: LogoKind[] = ['amazon', 'idf-hatal', 'ub-v1', 'ub-v2', 'generic'];

function asLogo(v: string | undefined): LogoKind {
  return KNOWN.includes(v as LogoKind) ? (v as LogoKind) : 'generic';
}

export function ExperienceHover({ enabled }: { enabled: boolean }) {
  const [active, setActive] = useState<{ kind: LogoKind } | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const debounceRef = useRef<number | undefined>(undefined);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) return;
    const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-exp-row]'));
    if (rows.length === 0) return;

    const onEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const kind = asLogo(target.dataset.logo);
      window.clearTimeout(debounceRef.current);
      const rect = target.getBoundingClientRect();
      const top = Math.max(80, rect.top + rect.height / 2 - PORTAL_W / 2);
      const left = Math.min(window.innerWidth - PORTAL_W - PORTAL_GAP, rect.right + PORTAL_GAP);
      setPos({ top, left });
      setActive({ kind });
    };
    const onLeave = () => {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => setActive(null), UNMOUNT_DEBOUNCE);
    };

    rows.forEach((r) => {
      r.addEventListener('mouseenter', onEnter);
      r.addEventListener('mouseleave', onLeave);
      r.addEventListener('focusin', onEnter);
      r.addEventListener('focusout', onLeave);
    });
    return () => {
      window.clearTimeout(debounceRef.current);
      rows.forEach((r) => {
        r.removeEventListener('mouseenter', onEnter);
        r.removeEventListener('mouseleave', onLeave);
        r.removeEventListener('focusin', onEnter);
        r.removeEventListener('focusout', onLeave);
      });
    };
  }, [enabled, reduced]);

  if (!enabled || reduced || !active || !pos) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="artefact-portal"
      style={{ top: pos.top, left: pos.left }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Logo kind={active.kind} />
      </Suspense>
    </div>,
    document.body
  );
}
