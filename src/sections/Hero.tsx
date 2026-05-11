import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/portfolio';

export function Hero() {
  const reduced = useReducedMotion();

  const stagger = (i: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.2 : 0.8,
      delay: 0.08 + i * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section className="section section--hero" id="top" aria-labelledby="hero-title">
      <motion.p className="eyebrow" {...stagger(0)}>// 00 · index</motion.p>
      <motion.h1 className="display hero__title" id="hero-title" {...stagger(1)}>
        {profile.tagline}
      </motion.h1>
      <motion.p className="lede hero__lede" {...stagger(2)}>
        {profile.bio[0]}
      </motion.p>
      <motion.p className="lede hero__lede" {...stagger(3)}>
        {profile.bio[1]}
      </motion.p>
      <motion.p className="hero__meta mono" {...stagger(4)}>
        <a href="#projects" className="link">selected work</a>
        <span aria-hidden="true">·</span>
        <a href="#experience" className="link">experience</a>
        <span aria-hidden="true">·</span>
        <a href="#contact" className="link">contact</a>
      </motion.p>
    </section>
  );
}
