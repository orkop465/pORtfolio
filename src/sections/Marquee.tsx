import { useEffect, useRef } from 'react';

type Props = { items: string[]; speed?: number };

export function Marquee({ items, speed = 32 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    let raf = 0;
    let offset = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      offset -= speed * dt;
      const el = ref.current;
      if (el) {
        const w = el.scrollWidth / 2;
        if (offset < -w) offset += w;
        el.style.transform = `translate3d(${offset}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div ref={ref} className="marquee-track">
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
