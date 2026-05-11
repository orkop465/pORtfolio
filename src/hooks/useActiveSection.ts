import { useEffect, useState } from 'react';

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (ids.length === 0) return;
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            visible.set(e.target.id, e.intersectionRatio);
          } else {
            visible.delete(e.target.id);
          }
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) { best = id; bestRatio = ratio; }
        }
        if (best) setActive(best);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5, 0.8, 1] }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
