import { motion } from 'framer-motion';
import { about } from '../data/siteContent';

const AboutSection = () => {
  return (
    <section className="relative bg-charcoal-950 px-6 py-24 sm:px-12 lg:px-24">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-gold-500/5 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gold-500/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="grid gap-14 lg:grid-cols-[1.05fr,0.95fr]"
        >
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.26em] text-gold-300">{about.eyebrow}</p>
            <h2 className="max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {about.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-300">{about.intro}</p>

            <div className="mt-10 space-y-5">
              {about.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-charcoal-400">
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="mt-8 max-w-2xl border-l-2 border-gold-500/40 pl-5 text-sm uppercase tracking-[0.14em] text-charcoal-300">
              {about.closing}
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {about.pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-300">{pillar.title}</p>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal-300">{pillar.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-300">{about.processTitle}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-white">Processo integrato</h3>
                </div>
                <div className="text-sm text-charcoal-500">Qualita, tempi, costi</div>
              </div>

              <div className="space-y-4">
                {about.process.map((item) => (
                  <div key={item.step} className="grid gap-3 rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 sm:grid-cols-[72px,1fr]">
                    <div className="font-display text-3xl font-bold text-gold-400">{item.step}</div>
                    <div>
                      <h4 className="text-lg font-medium text-white">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
