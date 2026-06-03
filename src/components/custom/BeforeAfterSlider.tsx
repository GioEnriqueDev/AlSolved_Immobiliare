import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MoveHorizontal, Sparkles } from 'lucide-react';
import { useIsTouch } from '../../hooks/use-mobile';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  status?: string;
  aspectRatio?: 'aspect-[4/5]' | 'aspect-[16/9]' | 'aspect-video' | 'aspect-square';
  className?: string;
}

const DEFAULT_REVEAL = 50;

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  title,
  status,
  aspectRatio = 'aspect-[16/9]',
  className = '',
}: BeforeAfterSliderProps) => {
  const isTouch = useIsTouch();
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [touchReveal, setTouchReveal] = useState(DEFAULT_REVEAL);

  // Motion values used only on desktop (clip-path approach)
  const revealValue = useMotionValue(DEFAULT_REVEAL);
  const revealSpring = useSpring(revealValue, { stiffness: 220, damping: 28, mass: 0.4 });
  const revealPercentage = useTransform(revealSpring, (value) => `${value}%`);
  const afterClipPath = useTransform(
    revealSpring,
    (value) => `inset(0 ${100 - value}% 0 0 round 1.5rem)`
  );

  const updateReveal = (clientX: number, currentTarget: HTMLElement) => {
    const bounds = currentTarget.getBoundingClientRect();
    const next = Math.min(95, Math.max(5, ((clientX - bounds.left) / bounds.width) * 100));
    if (isTouch) {
      setTouchReveal(next);
    } else {
      revealValue.set(next);
    }
  };

  const stopScrubbing = (event?: React.PointerEvent<HTMLDivElement>) => {
    if (event?.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsScrubbing(false);
  };

  // Mobile: width-based reveal — no clip-path, fully safe on iOS Safari
  if (isTouch) {
    return (
      <div
        className={`group relative ${aspectRatio} overflow-hidden rounded-[1.6rem] bg-charcoal-900 select-none ${className}`}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setIsScrubbing(true);
          updateReveal(event.clientX, event.currentTarget);
        }}
        onPointerMove={(event) => {
          if (isScrubbing) updateReveal(event.clientX, event.currentTarget);
        }}
        onPointerUp={stopScrubbing}
        onPointerCancel={stopScrubbing}
      >
        {/* Before image — full width background */}
        <img
          src={beforeImage}
          alt={`${title} prima`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* After image — revealed by width, no clip-path */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${touchReveal}%`, transition: isScrubbing ? 'none' : 'width 0.1s ease-out' }}
        >
          {status === 'In corso' ? (
            <div className="relative h-full bg-charcoal-900" style={{ width: `${100 / (touchReveal / 100)}%` }}>
              <img src={beforeImage} alt={title} className="h-full w-full object-cover opacity-20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                <Sparkles className="h-8 w-8 text-gold-400" />
                <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.4em] text-gold-300">Cantiere Attivo</p>
              </div>
            </div>
          ) : (
            <img
              src={afterImage}
              alt={`${title} dopo`}
              className="h-full object-cover"
              style={{ width: `${10000 / touchReveal}%`, maxWidth: 'none' }}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        {/* Divider line */}
        <div
          className="absolute inset-y-0 z-30 w-px bg-white/60"
          style={{ left: `${touchReveal}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-charcoal-950/90 text-white shadow-xl">
            <MoveHorizontal className="h-4 w-4" />
          </div>
        </div>

        <div className="absolute left-4 top-4 z-40 rounded-full border border-white/10 bg-charcoal-950/80 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white">
          Prima
        </div>
        <div className="absolute right-4 top-4 z-40 rounded-full border border-gold-500/20 bg-gold-900/80 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-gold-200">
          Dopo
        </div>
      </div>
    );
  }

  // Desktop: clip-path based scrubber (no iOS issues on desktop browsers)
  return (
    <div
      className={`group relative ${aspectRatio} overflow-hidden rounded-[1.6rem] bg-charcoal-900 select-none touch-none ${
        isScrubbing ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsScrubbing(true);
        updateReveal(event.clientX, event.currentTarget);
      }}
      onPointerMove={(event) => {
        if (isScrubbing) updateReveal(event.clientX, event.currentTarget);
      }}
      onPointerUp={stopScrubbing}
      onPointerCancel={stopScrubbing}
    >
      <img
        src={beforeImage}
        alt={`${title} prima`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />

      <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: afterClipPath }}>
        {status === 'In corso' ? (
          <div className="relative h-full w-full bg-charcoal-900">
            <img src={beforeImage} alt={title} className="h-full w-full object-cover opacity-20 blur-md scale-110" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/5"
              >
                <Sparkles className="h-8 w-8 text-gold-400 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
              </motion.div>
              <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.4em] text-gold-300">Cantiere Attivo</p>
            </div>
          </div>
        ) : (
          <img
            src={afterImage}
            alt={`${title} dopo`}
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
          className={`absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-charcoal-950/90 text-white shadow-xl transition-all duration-300 ${
            isScrubbing ? 'scale-110 border-gold-400/50' : 'hover:scale-105'
          }`}
        >
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </motion.div>

      <div className="absolute left-4 top-4 z-40 rounded-full border border-white/10 bg-charcoal-950/80 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white">
        Prima
      </div>
      <div className="absolute right-4 top-4 z-40 rounded-full border border-gold-500/20 bg-gold-900/80 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-gold-200">
        Dopo
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
