import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageHeroProps {
  badge: string;
  title: string;
  description: string;
  aside?: ReactNode;
}

const PageHero = ({ badge, title, description, aside }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 px-6 pb-16 pt-32 sm:px-12 lg:px-24">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-gold-500/6 blur-[150px]" />
        <div className="absolute right-0 top-10 h-[24rem] w-[24rem] rounded-full bg-gold-500/5 blur-[180px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-gold-300">{badge}</p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.96] text-white sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-300">{description}</p>
        </motion.div>

        {aside && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
          >
            {aside}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
