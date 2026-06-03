import { useEffect, useState } from 'react';
import {
  animate,
  motion,
  type MotionValue,
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
import { transformationPortfolio, transformationProjects, routes } from '../data/siteContent';
import { useIsMobile } from '../hooks/use-mobile';

const AUTOPLAY_DELAY = 9500;
const DEFAULT_REVEAL = 56;

// Mobile-safe static image viewer — no clip-path, no springs, no GPU pressure
const MobileSlider = ({ activeProject }: { activeProject: typeof transformationProjects[0] }) => (
  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-charcoal-900">
    {activeProject.status === 'In corso' ? (
      <div className="relative h-full w-full bg-charcoal-900">
        <img
          src={activeProject.beforeImage}
          alt={activeProject.title}
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
          <Sparkles className="h-10 w-10 text-gold-400" />
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.3em] text-gold-300">Work in Progress</p>
        </div>
      </div>
    ) : (
      <img
        src={activeProject.afterImage}
        alt={`${activeProject.title} — dopo`}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    )}
    <div className="absolute left-3 top-3 z-10 rounded-full border border-white/10 bg-charcoal-950/80 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-white">
      Vision
    </div>
    <div className="absolute inset-x-3 bottom-3 z-10 rounded-2xl bg-charcoal-950/80 p-4">
      <h3 className="font-display text-xl font-bold tracking-tight text-white">{activeProject.title}</h3>
      <p className="mt-1 text-xs text-charcoal-200">{activeProject.location} — {activeProject.assetType}</p>
    </div>
  </div>
);

// Desktop-only before/after scrubber with clip-path and springs
const DesktopSlider = ({
  activeProject,
  isScrubbing,
  revealPercentage,
  afterClipPath,
  startScrubbing,
  updateReveal,
  stopScrubbing,
}: {
  activeProject: typeof transformationProjects[0];
  isScrubbing: boolean;
  revealPercentage: MotionValue<string>;
  afterClipPath: MotionValue<string>;
  startScrubbing: (e: React.PointerEvent<HTMLDivElement>) => void;
  updateReveal: (clientX: number, target: HTMLDivElement) => void;
  stopScrubbing: (e?: React.PointerEvent<HTMLDivElement>) => void;
}) => (
  <div
    className={`group relative aspect-[16/9] overflow-hidden rounded-[1.6rem] bg-charcoal-900 select-none touch-none ${
      isScrubbing ? 'cursor-grabbing' : 'cursor-grab'
    }`}
    onPointerDown={(event) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      startScrubbing(event);
    }}
    onPointerMove={(event) => {
      if (isScrubbing) updateReveal(event.clientX, event.currentTarget);
    }}
    onPointerUp={stopScrubbing}
    onPointerCancel={stopScrubbing}
  >
    <img
      src={activeProject.beforeImage}
      alt={activeProject.title}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
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
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex h-32 w-32 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/5"
            >
              <Sparkles className="h-10 w-10 text-gold-400 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
            </motion.div>
            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.5em] text-gold-300">Future Creation</p>
          </div>
        </div>
      ) : (
        <img
          src={activeProject.afterImage}
          alt={activeProject.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      )}
    </motion.div>

    <motion.div
      className="absolute inset-y-0 z-30 w-px bg-white/50 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
      style={{ left: revealPercentage }}
    >
      <div
        className={`absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-charcoal-950/90 text-white shadow-xl transition-all duration-300 ${
          isScrubbing ? 'scale-110 border-gold-400/50' : 'hover:scale-105'
        }`}
      >
        <MoveHorizontal className="h-4 w-4" />
      </div>
    </motion.div>

    <div className="absolute left-5 top-5 z-40 rounded-full border border-white/10 bg-charcoal-950/60 px-4 py-2 text-[9px] uppercase tracking-[0.3em] text-white">
      Legacy
    </div>
    <div className="absolute right-5 top-5 z-40 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2 text-[9px] uppercase tracking-[0.3em] text-gold-200">
      Vision
    </div>

    <div className="absolute inset-x-5 bottom-5 z-40 rounded-[1.5rem] border border-white/5 bg-charcoal-950/70 p-5 sm:max-w-sm">
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
);

const TransformationPortfolio = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const projectsToShow = transformationProjects.filter(p => p.status === 'Concluso');

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // These motion values are only used by DesktopSlider — kept at module level to
  // satisfy the Rules of Hooks, but have no effect on mobile rendering.
  const revealValue = useMotionValue(DEFAULT_REVEAL);
  const revealSpring = useSpring(revealValue, { stiffness: 220, damping: 28, mass: 0.4 });
  const revealPercentage = useTransform(revealSpring, (value) => `${value}%`);
  const afterClipPath = useTransform(
    revealSpring,
    (value) => `inset(0 ${100 - value}% 0 0 round 2rem)`
  );

  const activeProject = projectsToShow[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion || isMobile || isPaused || projectsToShow.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projectsToShow.length);
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [isMobile, isPaused, prefersReducedMotion, projectsToShow.length]);

  useEffect(() => {
    // Skip animation entirely on mobile to avoid triggering GPU-expensive clip-path
    if (isMobile) return;
    const controls = animate(
      revealValue,
      prefersReducedMotion ? DEFAULT_REVEAL : [42, 68, DEFAULT_REVEAL],
      { duration: prefersReducedMotion ? 0 : 1, ease: 'easeInOut' }
    );
    return () => controls.stop();
  }, [activeIndex, isMobile, prefersReducedMotion, revealValue]);

  const updateReveal = (clientX: number, currentTarget: HTMLDivElement) => {
    const bounds = currentTarget.getBoundingClientRect();
    revealValue.set(Math.min(88, Math.max(12, ((clientX - bounds.left) / bounds.width) * 100)));
  };

  const startScrubbing = (event: React.PointerEvent<HTMLDivElement>) => {
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
    setActiveIndex((current) => (current === 0 ? projectsToShow.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % projectsToShow.length);
  };

  return (
    <section className="relative bg-charcoal-950 px-6 py-24 sm:overflow-hidden sm:px-12 lg:px-24">
      {/* Decorative blurs — hidden on mobile to prevent GPU saturation */}
      <div className="absolute inset-0 hidden sm:block" aria-hidden="true">
        <div className="absolute left-[-6rem] top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-[140px]" />
        <div className="absolute right-[-8rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-[180px]" />
        <div className="absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full bg-white/5 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
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
          onMouseEnter={() => !isMobile && setIsPaused(true)}
          onMouseLeave={() => !isMobile && setIsPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[2rem] border border-white/5 bg-charcoal-900/90 p-1.5 shadow-2xl sm:overflow-hidden sm:bg-white/5 sm:p-2.5"
          >
            {isMobile ? (
              <MobileSlider activeProject={activeProject} />
            ) : (
              <DesktopSlider
                activeProject={activeProject}
                isScrubbing={isScrubbing}
                revealPercentage={revealPercentage}
                afterClipPath={afterClipPath}
                startScrubbing={startScrubbing}
                updateReveal={updateReveal}
                stopScrubbing={stopScrubbing}
              />
            )}

            <div className="mt-5 flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white transition-all hover:border-gold-500/30 hover:bg-gold-500/10"
                  aria-label="Progetto precedente"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white transition-all hover:border-gold-500/30 hover:bg-gold-500/10"
                  aria-label="Progetto successivo"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <a
                href={`${routes.projects}#project-${activeProject.id}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gold-400 transition-all hover:border-gold-500/30 hover:bg-gold-500/10"
                aria-label={`Vedi dettagli del progetto ${activeProject.title}`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <div className="space-y-5">
            <article
              key={activeProject.id}
              className="rounded-[2rem] border border-white/5 bg-charcoal-900/90 p-7 sm:bg-black/40 sm:p-9"
            >
              <div className="space-y-5">
                <div>
                  <span className={`inline-block rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] ${
                    activeProject.status === 'Concluso'
                      ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                      : 'bg-white/5 text-charcoal-400 border border-white/10'
                  }`}>
                    {activeProject.status}
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-white">
                    {activeProject.title}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-charcoal-300">{activeProject.summary}</p>
                <div className="grid gap-3 pt-2">
                  {activeProject.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-5 py-3.5 text-sm font-medium text-charcoal-200"
                    >
                      <div className="h-1 w-1 rounded-full bg-gold-500" />
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <div className="flex gap-3">
              {projectsToShow.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 flex-1 overflow-hidden rounded-full transition-all duration-500 ${
                      isActive ? 'bg-gold-500' : 'bg-white/10 hover:bg-white/20'
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
