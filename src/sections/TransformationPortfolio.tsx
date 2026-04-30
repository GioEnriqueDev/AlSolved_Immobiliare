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
          className="grid gap-8 xl:grid-cols-[1.15fr,0.85fr] xl:items-start"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-4 xl:p-5"
          >
            <div
              className={`group relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-charcoal-900 select-none touch-none sm:aspect-[5/4] md:aspect-[16/11] xl:aspect-[16/10] ${
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
              onPointerLeave={(event) => {
                if (isScrubbing && event.pointerType !== 'mouse') {
                  stopScrubbing(event);
                }
              }}
            >
              <img
                src={activeProject.beforeImage}
                alt={`${activeProject.title} prima dell intervento`}
                className="h-full w-full object-cover"
                loading="lazy"
              />

              <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: afterClipPath }}>
                {activeProject.status === 'In corso' ? (
                  <div className="relative h-full w-full bg-charcoal-900">
                    <img
                      src={activeProject.beforeImage}
                      alt={`${activeProject.title} in corso`}
                      className="h-full w-full object-cover opacity-40 blur-sm"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="relative flex h-32 w-32 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10"
                      >
                        <div className="absolute inset-0 rounded-full border border-gold-500/20 shadow-[0_0_50px_rgba(212,175,55,0.2)]" />
                        <Sparkles className="h-10 w-10 text-gold-400" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-center"
                      >
                        <p className="text-sm uppercase tracking-[0.4em] text-gold-300">In Progress</p>
                        <div className="mt-2 flex gap-1 justify-center">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                              className="h-1 w-1 rounded-full bg-gold-400"
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={activeProject.afterImage}
                    alt={`${activeProject.title} dopo l intervento`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
              </motion.div>

              <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-charcoal-950/35 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-charcoal-950/35 to-transparent" />

              <motion.div
                className="absolute inset-y-0 z-20 w-px bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.45)]"
                style={{ left: revealPercentage }}
              >
                <div
                  className={`absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-white shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition sm:h-14 sm:w-14 ${
                    isScrubbing
                      ? 'border-gold-400/60 bg-gold-500/20'
                      : 'border-white/20 bg-charcoal-950/85'
                  }`}
                >
                  <MoveHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </motion.div>

              <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-charcoal-950/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-xl sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.22em]">
                Prima
              </div>
              <div className="absolute right-3 top-3 rounded-full border border-gold-500/20 bg-gold-500/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-gold-100 backdrop-blur-xl sm:right-5 sm:top-5 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.22em]">
                Dopo
              </div>

              <div className="absolute inset-x-3 bottom-3 rounded-[1.5rem] border border-white/10 bg-charcoal-950/75 p-4 backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-sm sm:p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-gold-300">
                  {transformationPortfolio.cardEyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                  {activeProject.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal-300">
                  {activeProject.location} / {activeProject.assetType}
                </p>
              </div>

              <div className="absolute bottom-5 right-5 hidden min-w-[12rem] rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-right backdrop-blur-xl lg:block">
                <p className="text-xs uppercase tracking-[0.22em] text-charcoal-400">
                  {transformationPortfolio.progressBadge}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{activeProject.status}</p>
                <p className="mt-1 text-sm text-charcoal-400">{activeProject.yearLabel}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-charcoal-950/75 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.22em] text-gold-300">
                  {transformationPortfolio.stageLabel}
                </p>
                <p className="mt-2 text-sm text-charcoal-400">{activeProject.insight}</p>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-gold-500/30 hover:bg-white/10"
                  aria-label="Mostra il progetto precedente"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-gold-500/30 hover:bg-white/10"
                  aria-label="Mostra il progetto successivo"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gold-300 lg:flex">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-5 xl:pt-1">
            <motion.article
              key={activeProject.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="rounded-[2rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl sm:p-7 xl:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-300">
                    {activeProject.status}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-white">
                    {activeProject.title}
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-charcoal-300">
                  {activeProject.location}
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-charcoal-300">
                {activeProject.summary}
              </p>

              <div className="mt-6 grid gap-3">
                {activeProject.metrics.map((metric) => (
                  <div
                    key={metric}
                    className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm leading-relaxed text-charcoal-200"
                  >
                    {metric}
                  </div>
                ))}
              </div>
            </motion.article>

            <div className="grid gap-3">
              {transformationProjects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.65, delay: index * 0.08 }}
                    className={`relative overflow-hidden rounded-[1.6rem] border px-4 py-4 text-left transition-all duration-300 sm:px-5 sm:py-5 ${
                      isActive
                        ? 'border-gold-500/30 bg-gold-500/10 shadow-glow'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gold-300">
                          {project.status}
                        </p>
                        <h4 className="mt-3 text-lg font-semibold text-white sm:text-xl">{project.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-charcoal-400">{project.assetType}</p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-charcoal-950/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-charcoal-300">
                        {project.location}
                      </div>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                      {isActive ? (
                        !prefersReducedMotion && !isMobile && !isPaused ? (
                          <motion.div
                            key={`${project.id}-${activeIndex}`}
                            className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{
                              duration: AUTOPLAY_DELAY / 1000,
                              ease: 'linear',
                            }}
                          />
                        ) : (
                          <div className="h-full w-full rounded-full bg-gradient-to-r from-gold-300/80 via-gold-400/80 to-gold-600/80" />
                        )
                      ) : (
                        <div className="h-full w-0" />
                      )}
                    </div>
                  </motion.button>
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
