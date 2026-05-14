import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(mq.matches && !reduced.matches);
    const handler = () => setEnabled(mq.matches && !reduced.matches);
    mq.addEventListener('change', handler);
    reduced.addEventListener('change', handler);
    return () => {
      mq.removeEventListener('change', handler);
      reduced.removeEventListener('change', handler);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const HOVER_SELECTORS =
      '.nav-links a, .now-card, .exp-entry, .proj, .skill-col li, .btn, .aside-link';
    const last = { x: 0, y: 0, has: false };
    let currentHover: Element | null = null;
    const evalAt = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y) as Element | null;
      const labelEl = el?.closest?.('[data-cursor]') as HTMLElement | null;
      setLabel(labelEl ? labelEl.getAttribute('data-cursor') ?? '' : '');
      const hoverEl = el?.closest?.(HOVER_SELECTORS) as Element | null;
      if (hoverEl !== currentHover) {
        currentHover?.classList.remove('is-hover');
        hoverEl?.classList.add('is-hover');
        currentHover = hoverEl;
      }
    };
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      last.x = e.clientX;
      last.y = e.clientY;
      last.has = true;
      evalAt(e.clientX, e.clientY);
    };
    const onScroll = () => {
      setLabel('');
      if (currentHover) {
        currentHover.classList.remove('is-hover');
        currentHover = null;
      }
    };
    const onLeave = () => {
      last.has = false;
      setLabel('');
      currentHover?.classList.remove('is-hover');
      currentHover = null;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    document.addEventListener('mouseleave', onLeave);
    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      currentHover?.classList.remove('is-hover');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll, { capture: true } as EventListenerOptions);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ref} className={'cursor' + (label ? ' hover-link' : '')} data-label={label} aria-hidden="true" />;
}
