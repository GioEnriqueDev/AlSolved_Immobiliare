import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import { homeOverview } from '../data/siteContent';

const HomeOverview = () => {
  return (
    <section className="relative bg-charcoal-950 px-6 py-32 sm:px-12 sm:py-40 lg:px-24">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gold-500/5 blur-[220px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-4xl sm:mb-24"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold-300">{homeOverview.badge}</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-6xl">{homeOverview.title}</h2>
          <p className="mt-8 text-lg leading-relaxed text-charcoal-300 sm:text-xl">{homeOverview.description}</p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 lg:gap-12">
          {homeOverview.cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group rounded-[2.5rem] border border-white/5 bg-white/5 p-8 transition-all duration-500 hover:border-gold-500/20 hover:bg-white/[0.07] sm:p-12"
            >
              <div className="h-px w-12 bg-gold-500/30 transition-all duration-500 group-hover:w-20 group-hover:bg-gold-500" />
              <h3 className="mt-8 font-display text-3xl font-semibold text-white">{card.title}</h3>
              <p className="mt-6 text-base leading-relaxed text-charcoal-400">{card.description}</p>
              <div className="mt-10">
                <MagneticButton
                  href={card.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-8 py-4 text-white transition-all hover:bg-gold-500 hover:text-charcoal-950"
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
