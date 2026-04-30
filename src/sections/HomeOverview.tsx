import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import { homeOverview } from '../data/siteContent';

const HomeOverview = () => {
  return (
    <section className="relative bg-charcoal-950 px-6 py-40 sm:px-12 sm:py-56 lg:px-24">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gold-500/5 blur-[250px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 max-w-4xl sm:mb-32"
        >
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-gold-400"
          >
            {homeOverview.badge}
          </motion.p>
          <h2 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-7xl lg:text-8xl">
            {homeOverview.title}
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 max-w-2xl text-xl leading-relaxed text-charcoal-400 sm:text-2xl"
          >
            {homeOverview.description}
          </motion.p>
        </motion.div>

        <div className="grid gap-16 md:grid-cols-2 lg:gap-24">
          {homeOverview.cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-white/5 p-10 transition-all duration-700 hover:border-gold-500/20 hover:bg-white/[0.08] sm:p-16">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/5 blur-[100px] transition-all duration-700 group-hover:bg-gold-500/10" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="h-px w-8 bg-gold-500/40 transition-all duration-700 group-hover:w-16 group-hover:bg-gold-500" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500/60 transition-colors group-hover:text-gold-400">
                      Discovery
                    </span>
                  </div>
                  
                  <h3 className="mt-10 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    {card.title}
                  </h3>
                  
                  <p className="mt-8 text-lg leading-relaxed text-charcoal-400 transition-colors group-hover:text-charcoal-300">
                    {card.description}
                  </p>
                  
                  <div className="mt-14">
                    <MagneticButton
                      href={card.href}
                      className="group/btn relative flex items-center gap-4 overflow-hidden rounded-full border border-white/10 bg-white/5 px-10 py-5 text-sm font-bold tracking-widest text-white transition-all hover:border-gold-500/50 hover:bg-gold-500 hover:text-charcoal-950"
                      aria-label={card.label}
                    >
                      <span className="relative z-10 uppercase">{card.label}</span>
                      <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-500 group-hover/btn:translate-x-2" />
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeOverview;
