import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const CursorGlow = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const hasTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hasTouch || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  // Don't render on touch devices or when motion should be reduced.
  if (
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  ) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] h-[320px] w-[320px] rounded-full mix-blend-screen xl:h-[400px] xl:w-[400px]"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(201, 144, 46, 0.12) 0%, rgba(201, 144, 46, 0.05) 40%, transparent 70%)',
      }}
    />
  );
};

export default CursorGlow;
