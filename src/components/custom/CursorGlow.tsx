import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useIsTouch, usePrefersReducedMotion } from '../../hooks/use-mobile';

const CursorGlow = () => {
  const isTouch = useIsTouch();
  const prefersReduced = usePrefersReducedMotion();

  // Early return BEFORE any hooks that create springs/animations
  // This prevents framer-motion from allocating GPU resources on mobile
  if (isTouch || prefersReduced) {
    return null;
  }

  return <CursorGlowInner />;
};

/** Only mounted on desktop with pointer:fine and no reduced-motion preference */
const CursorGlowInner = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

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
