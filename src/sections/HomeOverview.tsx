import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import { homeOverview } from '../data/siteContent';

const HomeOverview = () => {
  return (
    <section className="relative bg-charcoal-950 px-6 py-24 sm:px-12 lg:px-24">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-gold-500/5 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-4xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.26em] text-gold-300">{homeOverview.badge}</p>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">{homeOverview.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-charcoal-300">{homeOverview.description}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {homeOverview.cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-gold-300">Approfondimento</p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">{card.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-400">{card.description}</p>
              <div className="mt-8">
                <MagneticButton
                  href={card.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-6 py-3 text-white"
                  aria-label={card.label}
                >
                  <span className="flex items-center gap-2">
                    {card.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </MagneticButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeOverview;
