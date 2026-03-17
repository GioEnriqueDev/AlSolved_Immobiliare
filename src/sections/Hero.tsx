import { useMemo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import { brand, hero } from '../data/siteContent';

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
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-16 pt-28 sm:px-12 lg:px-24"
        style={{ opacity: springOpacity }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-white/5 px-5 py-2"
            >
              <span className="text-xs uppercase tracking-[0.28em] text-gold-300">{hero.badge}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="rounded-[1.75rem] border border-white/10 bg-charcoal-900/90 p-3 shadow-glow">
                <img src={brand.logoSrc} alt={brand.logoAlt} className="h-16 w-auto rounded-2xl object-contain sm:h-20" />
              </div>
              <div>
                <p className="font-serif text-2xl text-white sm:text-3xl">{hero.brandLine}</p>
                <p className="text-sm uppercase tracking-[0.24em] text-charcoal-400">Investimenti e valorizzazione</p>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 max-w-4xl font-display text-5xl font-bold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {hero.titlePrimary}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 max-w-4xl font-display text-5xl font-bold leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="text-gradient">{hero.titleHighlight}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-10 max-w-2xl text-base leading-relaxed text-charcoal-300 sm:text-lg"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-start gap-4 sm:flex-row"
            >
              <MagneticButton
                href={hero.ctas.primary.href}
                className="group rounded-full bg-gold-500 px-8 py-4 font-semibold text-charcoal-950 transition-all duration-300 hover:shadow-glow-lg"
                aria-label={hero.ctas.primary.label}
              >
                <span className="flex items-center gap-2">
                  {hero.ctas.primary.label}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </MagneticButton>

              <MagneticButton
                href={hero.ctas.secondary.href}
                className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-white/10"
                aria-label={hero.ctas.secondary.label}
              >
                {hero.ctas.secondary.label}
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="rounded-[2rem] border border-white/10 bg-black/25 p-8 backdrop-blur-xl"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-gold-300">Perche Leone Group</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">Il nostro approccio</h3>
              </div>
              <div className="rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold-300">
                Valore concreto
              </div>
            </div>

            <div className="space-y-4">
              {hero.commitments.map((commitment) => (
                <div key={commitment} className="flex gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                  <p className="text-sm leading-relaxed text-charcoal-200">{commitment}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/5 bg-charcoal-900/80 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-charcoal-500">Visione</p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-300">
                Una narrazione istituzionale, solida e contemporanea, pensata per parlare insieme a proprietari, investitori e partner.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
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
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
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
