import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MoveHorizontal, Sparkles } from 'lucide-react';

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
    (value) => `inset(0 ${100 - value}% 0 0 round 1.5rem)`
  );

  const updateReveal = (clientX: number, currentTarget: HTMLElement) => {
    const bounds = currentTarget.getBoundingClientRect();
    const nextValue = ((clientX - bounds.left) / bounds.width) * 100;
    revealValue.set(Math.min(95, Math.max(5, nextValue)));
  };

  const startScrubbing = (
    event: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsScrubbing(true);
    updateReveal(event.clientX, event.currentTarget);
  };

  const stopScrubbing = (event?: React.PointerEvent<HTMLDivElement>) => {
    if (event?.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsScrubbing(false);
  };

  return (
    <div
      className={`group relative ${aspectRatio} overflow-hidden rounded-[1.6rem] bg-charcoal-900 select-none touch-none ${
        isScrubbing ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
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
      {/* Before Image */}
      <img
        src={beforeImage}
        alt={`${title} prima`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />

      {/* After Image (Clipped) */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: afterClipPath }}>
        {status === 'In corso' ? (
          <div className="relative h-full w-full bg-charcoal-900">
            <img
              src={beforeImage}
              alt={title}
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
                className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/5"
              >
                <div className="absolute inset-0 rounded-full border border-gold-500/20 shadow-[0_0_60px_rgba(212,175,55,0.1)]" />
                <Sparkles className="h-8 w-8 text-gold-400 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
              </motion.div>
              <div className="mt-4 text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold-300">Cantiere Attivo</p>
              </div>
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

      {/* Scrub Bar */}
      <motion.div
        className="absolute inset-y-0 z-30 w-px bg-white/50 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
        style={{ left: revealPercentage }}
      >
        <div
          className={`absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-charcoal-950/90 text-white shadow-xl transition-all duration-300 sm:backdrop-blur-2xl ${
            isScrubbing ? 'scale-110 border-gold-400/50' : 'hover:scale-105'
          }`}
        >
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute left-4 top-4 z-40 rounded-full border border-white/10 bg-charcoal-950/80 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white sm:backdrop-blur-md">
        Prima
      </div>
      <div className="absolute right-4 top-4 z-40 rounded-full border border-gold-500/20 bg-gold-900/80 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-gold-200 sm:backdrop-blur-md">
        Dopo
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
