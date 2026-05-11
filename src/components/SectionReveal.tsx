import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2, delay } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
