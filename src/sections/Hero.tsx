import { useRef, useEffect, useState, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { ArrowDown, Play, ChevronRight } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import { hero } from '../data/siteContent';

const Particle = ({ index, enableMotion }: { index: number; enableMotion: boolean }) => {
  const style = useMemo(
    () => ({
      left: `${(index * 17) % 100}%`,
      top: `${(index * 23) % 100}%`,
    }),
    [index]
  );

  if (!enableMotion) {
    return <div className="absolute w-1 h-1 bg-gold-400/20 rounded-full" style={style} />;
  }

  return (
    <motion.div
      className="absolute w-1 h-1 bg-gold-400/30 rounded-full"
      style={style}
      animate={{
        y: [0, -100, 0],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 6 + (index % 4),
        repeat: Infinity,
        delay: index * 0.5,
        ease: 'easeInOut',
      }}
    />
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(
    () => (typeof window === 'undefined' ? false : window.matchMedia('(pointer: coarse)').matches)
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const isInteractive = !prefersReducedMotion && !isTouchDevice;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', isInteractive ? '30%' : '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, isInteractive ? 0 : 1]);

  const springY = useSpring(y, { stiffness: 50, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');

    const handlePointerChange = (event: MediaQueryListEvent) => {
      setIsTouchDevice(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handlePointerChange);
    } else {
      mediaQuery.addListener(handlePointerChange);
    }

    let rafId: number | undefined;
    const handleMouseMoveRaf = (event: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (event.clientX / window.innerWidth - 0.5) * 15,
          y: (event.clientY / window.innerHeight - 0.5) * 15,
        });
      });
    };

    if (isInteractive) {
      window.addEventListener('mousemove', handleMouseMoveRaf, { passive: true });
    }

    return () => {
      if (isInteractive) {
        window.removeEventListener('mousemove', handleMouseMoveRaf);
      }
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handlePointerChange);
      } else {
        mediaQuery.removeListener(handlePointerChange);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isInteractive]);

  const particles = useMemo(
    () => [...Array(10)].map((_, i) => <Particle key={i} index={i} enableMotion={isInteractive} />),
    [isInteractive]
  );

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-charcoal-950">
      {/* Simple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950" />

      {/* Animated Glow */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[150px]"
        animate={isInteractive ? { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] } : { scale: 1, opacity: 0.35 }}
        transition={isInteractive ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
      />

      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: springY }}>
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${hero.backgroundImage}')`,
              transform: isInteractive
                ? `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) scale(1.05)`
                : 'scale(1.05)',
            }}
            role="img"
            aria-label="Progetto immobiliare di lusso illuminato da luce soffusa"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/90 via-charcoal-950/70 to-charcoal-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/60 via-transparent to-charcoal-950/60" />
        </div>

        {/* Optimized Particles - reduced count */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24 pt-20 pb-40"
        style={{ opacity: springOpacity }}
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <div className="glass px-6 py-2 rounded-full border border-gold-500/20">
            <span className="text-gold-300 text-xs tracking-[0.3em] uppercase font-medium">{hero.badge}</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6"
          >
            <span className="font-serif text-gold-400 text-2xl md:text-3xl tracking-wider">{hero.brand}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-4"
          >
            {hero.titlePrimary}
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
          >
            <span className="text-gradient">{hero.titleHighlight}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-charcoal-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <MagneticButton
              href={hero.ctas.primary.href}
              className="group relative px-8 py-4 bg-gold-500 text-charcoal-950 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-glow-lg"
              aria-label={hero.ctas.primary.label}
            >
              <span className="relative z-10 flex items-center gap-2">
                {hero.ctas.primary.label}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </MagneticButton>

            <MagneticButton
              href={hero.ctas.secondary.href}
              className="group px-8 py-4 glass text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 border border-white/10"
              aria-label={hero.ctas.secondary.label}
            >
              <span className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </span>
                {hero.ctas.secondary.label}
              </span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Stats Row - Fixed positioning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="glass-dark rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border border-white/10">
            {hero.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl md:text-2xl font-display font-bold text-gold-400 mb-1">{stat.value}</div>
                <div className="text-xs text-charcoal-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={isInteractive ? { y: [0, 8, 0] } : { y: 0 }}
          transition={isInteractive ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
          className="flex flex-col items-center gap-2 text-charcoal-400"
        >
          <span className="text-xs uppercase tracking-widest">{hero.scrollHint}</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
