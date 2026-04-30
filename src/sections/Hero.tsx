import { useMemo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import { hero } from '../data/siteContent';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '22%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, prefersReducedMotion ? 1 : 0.1]);
  const springBackgroundY = useSpring(backgroundY, { stiffness: 70, damping: 20 });
  const springOpacity = useSpring(contentOpacity, { stiffness: 90, damping: 20 });

  const decorativeDots = useMemo(
    () =>
      [...Array(12)].map((_, index) => (
        <div
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-gold-400/30"
          style={{
            left: `${10 + ((index * 7) % 80)}%`,
            top: `${12 + ((index * 11) % 70)}%`,
          }}
        />
      )),
    []
  );

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-charcoal-950">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950" />

      <motion.div className="absolute inset-0 will-change-transform" style={{ y: springBackgroundY }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${hero.backgroundImage}')` }}
          role="img"
          aria-label="Edificio residenziale riqualificato"
        />
        <div className="absolute inset-0 bg-charcoal-950/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/78 to-charcoal-950/55" />
      </motion.div>

      <div className="absolute inset-0">
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gold-500/10 blur-[160px]" />
        <div className="absolute inset-0 opacity-60">{decorativeDots}</div>
      </div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 pb-20 pt-32 text-center sm:px-12 sm:pb-24 sm:pt-40 lg:px-24"
        style={{ opacity: springOpacity }}
      >
        <div className="flex flex-col items-center gap-10 sm:gap-12">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-gold-500/20 bg-white/5 px-6 py-2.5 sm:mb-12 sm:px-7"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-300 sm:text-xs sm:tracking-[0.35em]">{hero.badge}</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-8 flex flex-col items-center gap-2 sm:mb-10"
            >
              <p className="font-serif text-2xl text-white sm:text-4xl">{hero.brandLine}</p>
              <div className="h-px w-12 bg-gold-500/40" />
              <p className="text-xs uppercase tracking-[0.25em] text-charcoal-400 sm:text-sm sm:tracking-[0.3em]">Investimenti e valorizzazione</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 font-display text-5xl font-bold leading-[0.9] tracking-tight text-white sm:mb-6 sm:text-7xl lg:text-8xl"
            >
              {hero.titlePrimary}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-10 font-display text-5xl font-bold leading-[0.9] tracking-tight sm:mb-12 sm:text-7xl lg:text-8xl"
            >
              <span className="text-gradient">{hero.titleHighlight}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mb-12 max-w-3xl text-base leading-relaxed text-charcoal-300 sm:mb-16 sm:text-xl"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            >
              <MagneticButton
                href={hero.ctas.primary.href}
                className="group w-full rounded-full bg-gold-500 px-8 py-5 text-center font-bold text-charcoal-950 transition-all duration-300 hover:shadow-glow-xl sm:w-auto sm:px-12"
                aria-label={hero.ctas.primary.label}
              >
                <span className="flex items-center gap-2">
                  {hero.ctas.primary.label}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </MagneticButton>

              <MagneticButton
                href={hero.ctas.secondary.href}
                className="w-full rounded-full border border-white/20 bg-white/5 px-8 py-5 text-center font-semibold text-white transition-all duration-300 hover:bg-white/10 sm:w-auto sm:px-12"
                aria-label={hero.ctas.secondary.label}
              >
                {hero.ctas.secondary.label}
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {hero.stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
              <div className="text-3xl font-display font-bold text-gold-400">{stat.value}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.18em] text-charcoal-300">{stat.label}</div>
              {stat.detail && <p className="mt-3 text-sm leading-relaxed text-charcoal-500">{stat.detail}</p>}
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-charcoal-400"
        >
          <span className="text-xs uppercase tracking-[0.25em]">{hero.scrollHint}</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
