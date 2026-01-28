import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const CursorGlow = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Check if device has coarse pointer (touch)
    const hasTouch = window.matchMedia('(pointer: coarse)').matches;
    if (hasTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed w-[400px] h-[400px] rounded-full z-[9999] mix-blend-screen"
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
