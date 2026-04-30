import { useEffect, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MoveHorizontal,
  Sparkles,
} from 'lucide-react';
import { transformationPortfolio, transformationProjects } from '../data/siteContent';
import { useIsMobile } from '../hooks/use-mobile';

const AUTOPLAY_DELAY = 9500;
const DEFAULT_REVEAL = 56;

const TransformationPortfolio = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const revealValue = useMotionValue(DEFAULT_REVEAL);
  const revealSpring = useSpring(revealValue, {
    stiffness: 220,
    damping: 28,
    mass: 0.4,
  });

  const revealPercentage = useTransform(revealSpring, (value) => `${value}%`);
  const afterClipPath = useTransform(
    revealSpring,
    (value) => `inset(0 ${100 - value}% 0 0 round 2rem)`
  );

  const activeProject = transformationProjects[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion || isMobile || isPaused || transformationProjects.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % transformationProjects.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [isMobile, isPaused, prefersReducedMotion]);

  useEffect(() => {
    const controls = animate(
      revealValue,
      prefersReducedMotion ? DEFAULT_REVEAL : [42, 68, DEFAULT_REVEAL],
      {
        duration: prefersReducedMotion ? 0 : 1,
        ease: 'easeInOut',
      }
    );

    return () => controls.stop();
  }, [activeIndex, prefersReducedMotion, revealValue]);

  const updateReveal = (clientX: number, currentTarget: HTMLDivElement) => {
    const bounds = currentTarget.getBoundingClientRect();
    const nextValue = ((clientX - bounds.left) / bounds.width) * 100;
    revealValue.set(Math.min(88, Math.max(12, nextValue)));
  };

  const startScrubbing = (
    event: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsPaused(true);
    setIsScrubbing(true);
    updateReveal(event.clientX, event.currentTarget);
  };

  const stopScrubbing = (event?: React.PointerEvent<HTMLDivElement>) => {
    if (event?.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsScrubbing(false);
    setIsPaused(false);
  };

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? transformationProjects.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % transformationProjects.length);
  };

  return (
    <section className="relative overflow-hidden bg-charcoal-950 px-6 py-24 sm:px-12 lg:px-24">
      <div className="absolute inset-0">
        <div className="absolute left-[-6rem] top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-[140px]" />
        <div className="absolute right-[-8rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-[180px]" />
        <div className="absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full bg-white/5 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-w-4xl sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-5 py-2">
            <Sparkles className="h-4 w-4 text-gold-300" />
            <span className="text-xs uppercase tracking-[0.24em] text-gold-200">
              {transformationPortfolio.badge}
            </span>
          </div>

          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl">
            {transformationPortfolio.title}{' '}
            <span className="text-gradient">{transformationPortfolio.titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-charcoal-300 sm:mt-6 sm:text-lg">
            {transformationPortfolio.description}
          </p>
        </motion.div>

        <div
          className="grid gap-10 xl:grid-cols-[1.25fr,0.75fr] xl:items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 p-1.5 shadow-2xl backdrop-blur-3xl sm:p-2.5"
          >
            <div
              className={`group relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-charcoal-900 select-none touch-none sm:aspect-[16/9] ${
                isScrubbing ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                startScrubbing(event);
              }}
              onPointerMove={(event) => {
                if (isScrubbing) {
                  updateReveal(event.clientX, event.currentTarget);
                }
              }}
              onPointerUp={stopScrubbing}
              onPointerCancel={stopScrubbing}
            >
              <img
                src={activeProject.beforeImage}
                alt={activeProject.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: afterClipPath }}>
                {activeProject.status === 'In corso' ? (
                  <div className="relative h-full w-full bg-charcoal-900">
                    <img
                      src={activeProject.beforeImage}
                      alt={activeProject.title}
                      className="h-full w-full object-cover opacity-20 blur-md scale-110"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="relative flex h-32 w-32 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/5"
                      >
                        <div className="absolute inset-0 rounded-full border border-gold-500/20 shadow-[0_0_60px_rgba(212,175,55,0.1)]" />
                        <Sparkles className="h-10 w-10 text-gold-400 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-center"
                      >
                        <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-gold-300">Future Creation</p>
                        <p className="mt-1.5 text-[9px] uppercase tracking-[0.2em] text-gold-500/50">Work in Progress</p>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={activeProject.afterImage}
                    alt={activeProject.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </motion.div>

              <motion.div
                className="absolute inset-y-0 z-30 w-px bg-white/50 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                style={{ left: revealPercentage }}
              >
                <div
                  className={`absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-charcoal-950/90 text-white shadow-xl backdrop-blur-2xl transition-all duration-300 ${
                    isScrubbing ? 'scale-110 border-gold-400/50' : 'hover:scale-105'
                  }`}
                >
                  <MoveHorizontal className="h-4 w-4" />
                </div>
              </motion.div>

              <div className="absolute left-5 top-5 z-40 rounded-full border border-white/10 bg-charcoal-950/60 px-4 py-2 text-[9px] uppercase tracking-[0.3em] text-white backdrop-blur-md">
                Legacy
              </div>
              <div className="absolute right-5 top-5 z-40 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2 text-[9px] uppercase tracking-[0.3em] text-gold-200 backdrop-blur-md">
                Vision
              </div>

              <div className="absolute inset-x-5 bottom-5 z-40 rounded-[1.5rem] border border-white/5 bg-charcoal-950/50 p-5 backdrop-blur-2xl sm:max-w-sm">
                <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {activeProject.title}
                </h3>
                <div className="mt-2 flex items-center gap-2.5">
                  <span className="h-px w-6 bg-gold-500/40" />
                  <p className="text-xs font-medium tracking-wide text-charcoal-200">
                    {activeProject.location} — {activeProject.assetType}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white transition-all hover:border-gold-500/30 hover:bg-gold-500/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white transition-all hover:border-gold-500/30 hover:bg-gold-500/10"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gold-400">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.article
              key={activeProject.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[2rem] border border-white/5 bg-black/40 p-7 backdrop-blur-2xl sm:p-9"
            >
              <div className="space-y-5">
                <div>
                  <span className={`inline-block rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] ${
                    activeProject.status === 'Concluso' ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' : 'bg-white/5 text-charcoal-400 border border-white/10'
                  }`}>
                    {activeProject.status}
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-white">
                    {activeProject.title}
                  </h3>
                </div>

                <p className="text-base leading-relaxed text-charcoal-300">
                  {activeProject.summary}
                </p>

                <div className="grid gap-3 pt-2">
                  {activeProject.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-5 py-3.5 text-sm font-medium text-charcoal-200 transition-colors hover:bg-white/10"
                    >
                      <div className="h-1 w-1 rounded-full bg-gold-500 shadow-[0_0_6px_rgba(212,175,55,0.6)]" />
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>

            <div className="grid grid-cols-3 gap-3">
              {transformationProjects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                      isActive ? 'bg-gold-500 w-full' : 'bg-white/10 w-full hover:bg-white/20'
                    }`}
                    aria-label={`Vai al progetto ${project.title}`}
                  >
                    {isActive && !prefersReducedMotion && !isMobile && !isPaused && (
                      <motion.div
                        className="h-full bg-white"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: AUTOPLAY_DELAY / 1000, ease: 'linear' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationPortfolio;
