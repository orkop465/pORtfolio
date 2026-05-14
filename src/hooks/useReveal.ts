import { useEffect } from 'react';

export function useReveal(selector = '.section, .contact') {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(selector);
    if (targets.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [selector]);
}
