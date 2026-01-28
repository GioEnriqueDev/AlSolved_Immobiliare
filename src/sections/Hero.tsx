import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Play, ChevronRight } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import Aurora from '../components/custom/Aurora';
import TextReveal, { SplitText, CountUp } from '../components/custom/TextReveal';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-charcoal-950"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 opacity-60">
        <Aurora
          colorStops={["#c9902e", "#e8c978", "#dbad4a", "#0d0d0d", "#1a1a1a"]}
          amplitude={0.8}
          blend={0.4}
          time={0.15}
        />
      </div>

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: springY, scale }}
      >
        {/* Video/Image Background with Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')`,
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(1.1)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-charcoal-950/60 to-charcoal-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 via-transparent to-charcoal-950/80" />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -150, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg className="w-full h-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24"
        style={{ opacity: springOpacity }}
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute top-8 left-1/2 -translate-x-1/2"
        >
          <div className="glass px-6 py-2 rounded-full border border-gold-500/20">
            <span className="text-gold-300 text-xs tracking-[0.3em] uppercase font-medium">
              Investimenti Immobiliari di Prestigio
            </span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="text-center max-w-6xl mx-auto">
          {/* Logo/Brand */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-8"
          >
            <span className="font-serif text-gold-400 text-2xl md:text-3xl tracking-wider">
              Leone Group
            </span>
          </motion.div>

          {/* Main Headline */}
          <TextReveal delay={0.3} className="mb-4">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight">
              Investiamo nel
            </h1>
          </TextReveal>

          <TextReveal delay={0.5} className="mb-12">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
              <span className="text-gradient">Futuro dell'Immobiliare</span>
            </h1>
          </TextReveal>

          {/* Subheadline */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <SplitText
              text="Trasformiamo immobili sottovalutati in asset premium attraverso riqualificazioni strategiche e soluzioni di investimento innovative."
              className="text-charcoal-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed justify-center"
              delay={0.6}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticButton
              className="group relative px-8 py-4 bg-gold-500 text-charcoal-950 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-glow-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Scopri i Nostri Progetti
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </MagneticButton>

            <MagneticButton
              className="group px-8 py-4 glass text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <span className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </span>
                Guarda la Nostra Storia
              </span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-24 left-0 right-0 px-6 sm:px-12 lg:px-24"
        >
          <div className="max-w-6xl mx-auto">
            <div className="glass-dark rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border border-white/5">
              {[
                { value: 500, prefix: '€', suffix: 'M+', label: 'Asset in Gestione' },
                { value: 150, suffix: '+', label: 'Proprietà Trasformate' },
                { value: 35, suffix: '%', label: 'ROI Medio' },
                { value: 25, suffix: '', label: 'Anni di Eccellenza' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-display font-bold text-gold-400 mb-1">
                    <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-charcoal-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-charcoal-400"
          >
            <span className="text-xs uppercase tracking-widest">Scorri</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
