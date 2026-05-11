import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SHAPES_BY_INDEX, type ArtefactShape } from './shapes';
import { useReducedMotion } from '../hooks/useReducedMotion';

const Artefact = lazy(() => import('./Artefact').then((m) => ({ default: m.Artefact })));

const UNMOUNT_DEBOUNCE = 260;
const PORTAL_W = 280;
const PORTAL_GAP = 32;

type ActiveRow = { el: HTMLElement; shape: ArtefactShape } | null;

export function ArtefactHover({ enabled }: { enabled: boolean }) {
  const [active, setActive] = useState<ActiveRow>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const debounceRef = useRef<number | undefined>(undefined);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) return;
    const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-artefact-row]'));
    if (rows.length === 0) return;

    const onEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const idx = Number(target.dataset.idx ?? '0');
      const shape = SHAPES_BY_INDEX[idx % SHAPES_BY_INDEX.length];
      window.clearTimeout(debounceRef.current);
      const rect = target.getBoundingClientRect();
      const top = Math.max(80, rect.top + rect.height / 2 - PORTAL_W / 2);
      const left = Math.min(window.innerWidth - PORTAL_W - PORTAL_GAP, rect.right + PORTAL_GAP);
      setPos({ top, left });
      setActive({ el: target, shape });
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
        <Artefact shape={active.shape} />
      </Suspense>
    </div>,
    document.body
  );
}
