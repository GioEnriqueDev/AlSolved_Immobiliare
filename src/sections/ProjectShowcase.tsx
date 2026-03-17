import { motion } from 'framer-motion';
import { ArrowRight, Building2, CalendarRange, MapPin, TrendingUp } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import { projectSection, projects } from '../data/siteContent';

const ProjectShowcase = () => {
  return (
    <section className="relative bg-charcoal-950 px-6 py-24 sm:px-12 lg:px-24">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-8 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-gold-500/5 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.26em] text-gold-300">{projectSection.badge}</p>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {projectSection.title} <span className="text-gradient">{projectSection.highlight}</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-charcoal-300">{projectSection.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 rounded-[2rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold-300">{projectSection.boardTitle}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-white">Tabella numerica in evidenza</h3>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-charcoal-400">{projectSection.boardDescription}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {projectSection.boardMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-charcoal-900/80 p-6"
              >
                <div className="text-3xl font-display font-bold text-gold-400">{metric.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.18em] text-charcoal-300">{metric.label}</div>
                {metric.detail && <p className="mt-3 text-sm leading-relaxed text-charcoal-500">{metric.detail}</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.75, delay: index * 0.08 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
            >
              <div className="grid gap-3 border-b border-white/10 bg-charcoal-900/60 p-4 sm:grid-cols-2">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={project.beforeImage}
                    alt={`${project.title} stato iniziale`}
                    loading="lazy"
                    className="h-56 w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white">
                    Prima
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={project.afterImage}
                    alt={`${project.title} stato finale`}
                    loading="lazy"
                    className="h-56 w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-gold-500/20 bg-gold-500/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gold-200">
                    Dopo
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-gold-200">
                    {project.status}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-charcoal-300">
                    {project.assetType}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{project.title}</h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-charcoal-400">
                  <MapPin className="h-4 w-4 text-gold-400" />
                  <span>{project.location}</span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-charcoal-300">{project.description}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4">
                    <div className="mb-2 flex items-center gap-2 text-charcoal-500">
                      <Building2 className="h-4 w-4 text-gold-400" />
                      <span className="text-xs uppercase tracking-[0.18em]">Investimento</span>
                    </div>
                    <div className="text-xl font-display font-bold text-white">{project.investment}</div>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4">
                    <div className="mb-2 flex items-center gap-2 text-charcoal-500">
                      <TrendingUp className="h-4 w-4 text-gold-400" />
                      <span className="text-xs uppercase tracking-[0.18em]">ROI</span>
                    </div>
                    <div className="text-xl font-display font-bold text-gold-400">{project.roi}</div>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4">
                    <div className="mb-2 flex items-center gap-2 text-charcoal-500">
                      <CalendarRange className="h-4 w-4 text-gold-400" />
                      <span className="text-xs uppercase tracking-[0.18em]">Durata</span>
                    </div>
                    <div className="text-xl font-display font-bold text-white">{project.timeline}</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-charcoal-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="mt-12 flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="max-w-3xl">
            <p className="text-sm leading-relaxed text-charcoal-300">{projectSection.portfolioNote}</p>
          </div>
          <MagneticButton
            href={projectSection.showcaseCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3 font-semibold text-charcoal-950"
            aria-label={projectSection.showcaseCta.label}
          >
            <span className="flex items-center gap-2">
              {projectSection.showcaseCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
