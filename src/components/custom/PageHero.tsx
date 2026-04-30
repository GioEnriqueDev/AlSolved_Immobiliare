import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageHeroProps {
  badge: string;
  title: string;
  description: string;
  aside?: ReactNode;
}

const PageHero = ({ badge, title, description, aside, centered = false }: PageHeroProps & { centered?: boolean }) => {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 px-6 pb-20 pt-32 sm:px-12 sm:pb-28 sm:pt-48 lg:px-24">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-24 h-96 w-96 rounded-full bg-gold-500/5 blur-[180px]" />
        <div className="absolute right-0 top-10 h-[32rem] w-[32rem] rounded-full bg-gold-500/5 blur-[220px]" />
      </div>

      <div className={`relative mx-auto grid max-w-7xl gap-12 ${centered ? 'text-center flex flex-col items-center' : 'lg:grid-cols-[1.1fr,0.9fr] lg:items-end'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={centered ? 'max-w-4xl' : ''}
        >
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400">{badge}</p>
          <h1 className="font-display text-5xl font-bold leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl">{title}</h1>
          <p className={`mt-8 text-lg leading-relaxed text-charcoal-300 sm:text-xl ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{description}</p>
        </motion.div>

        {aside && !centered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2.5rem] border border-white/5 bg-white/5 p-8 backdrop-blur-3xl sm:p-10"
          >
            {aside}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
