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

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? transformationProjects.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % transformationProjects.length);
  };

  return (
    <section className="relative overflow-hidden bg-charcoal-950 px-6 py-28 sm:px-12 lg:px-24">
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
          className="mb-14 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-5 py-2">
            <Sparkles className="h-4 w-4 text-gold-300" />
            <span className="text-xs uppercase tracking-[0.24em] text-gold-200">
              {transformationPortfolio.badge}
            </span>
          </div>

          <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {transformationPortfolio.title}{' '}
            <span className="text-gradient">{transformationPortfolio.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-charcoal-300">
            {transformationPortfolio.description}
          </p>
        </motion.div>

        <div
          className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-4"
          >
            <div
              className="group relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-charcoal-900"
              onMouseMove={(event) => updateReveal(event.clientX, event.currentTarget)}
              onMouseLeave={() => revealValue.set(DEFAULT_REVEAL)}
              onPointerDown={(event) => updateReveal(event.clientX, event.currentTarget)}
              onPointerMove={(event) => {
                if (event.pressure > 0 || event.pointerType === 'mouse') {
                  updateReveal(event.clientX, event.currentTarget);
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
                <img
                  src={activeProject.afterImage}
                  alt={`${activeProject.title} dopo l intervento`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-charcoal-950/35 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-charcoal-950/35 to-transparent" />

              <motion.div
                className="absolute inset-y-0 z-20 w-px bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.45)]"
                style={{ left: revealPercentage }}
              >
                <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-charcoal-950/85 text-white shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                  <MoveHorizontal className="h-5 w-5" />
                </div>
              </motion.div>

              <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-charcoal-950/70 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white backdrop-blur-xl">
                Prima
              </div>
              <div className="absolute right-5 top-5 rounded-full border border-gold-500/20 bg-gold-500/15 px-4 py-2 text-xs uppercase tracking-[0.22em] text-gold-100 backdrop-blur-xl">
                Dopo
              </div>

              <div className="absolute bottom-5 left-5 max-w-xs rounded-[1.5rem] border border-white/10 bg-charcoal-950/75 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.22em] text-gold-300">
                  {transformationPortfolio.cardEyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                  {activeProject.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal-300">
                  {activeProject.location} / {activeProject.assetType}
                </p>
              </div>

              <div className="absolute bottom-5 right-5 hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-right backdrop-blur-xl sm:block">
                <p className="text-xs uppercase tracking-[0.22em] text-charcoal-400">
                  {transformationPortfolio.progressBadge}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{activeProject.status}</p>
                <p className="mt-1 text-sm text-charcoal-400">{activeProject.yearLabel}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-charcoal-950/75 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
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
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gold-300 sm:flex">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.article
              key={activeProject.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="rounded-[2rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl sm:p-7"
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

              <p className="mt-5 text-sm leading-relaxed text-charcoal-300">
                {activeProject.summary}
              </p>

              <div className="mt-6 grid gap-3">
                {activeProject.metrics.map((metric) => (
                  <div
                    key={metric}
                    className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-charcoal-200"
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
                    className={`relative overflow-hidden rounded-[1.6rem] border p-4 text-left transition-all duration-300 ${
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
                        <h4 className="mt-3 text-lg font-semibold text-white">{project.title}</h4>
                        <p className="mt-2 text-sm text-charcoal-400">{project.assetType}</p>
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

            <motion.article
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={transformationPortfolio.teaserImage}
                  alt={transformationPortfolio.teaserImageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/35 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-gold-500/20 bg-gold-500/15 px-4 py-2 text-xs uppercase tracking-[0.22em] text-gold-100">
                  {transformationPortfolio.teaserTitle}
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-charcoal-300">
                  {transformationPortfolio.teaserDescription}
                </p>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationPortfolio;
