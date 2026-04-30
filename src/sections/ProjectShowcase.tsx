import { motion } from 'framer-motion';
import { ArrowRight, Building2, CalendarRange, MapPin, TrendingUp } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import { projectSection, projects } from '../data/siteContent';

const ProjectShowcase = () => {
  const getMetricIcon = (label: string, accent?: boolean) => {
    if (accent) return TrendingUp;
    if (label.toLowerCase().includes('durata')) return CalendarRange;
    return Building2;
  };

  return (
    <section className="relative bg-charcoal-950 px-6 py-32 sm:px-12 sm:py-40 lg:px-24">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-20 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gold-500/5 blur-[250px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col gap-6 lg:mb-24 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="max-w-2xl">
            <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.4em] text-gold-400">{projectSection.badge}</p>
            <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
              {projectSection.title} <span className="text-gradient">{projectSection.highlight}</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-charcoal-400 sm:text-lg">{projectSection.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 rounded-[3rem] border border-white/5 bg-white/5 p-8 backdrop-blur-3xl sm:p-12"
        >
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-gold-500/50" />
              <h3 className="font-display text-3xl font-bold text-white tracking-tight">Performance Hub</h3>
            </div>
            <p className="max-w-xl text-base text-charcoal-400">{projectSection.boardDescription}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {projectSection.boardMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group rounded-[2rem] border border-white/5 bg-charcoal-900/40 p-8 transition-all duration-500 hover:border-gold-500/20 hover:bg-charcoal-900/60"
              >
                <div className="text-4xl font-display font-bold text-gold-400 transition-transform duration-500 group-hover:scale-110 group-hover:origin-left">{metric.value}</div>
                <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal-300">{metric.label}</div>
                {metric.detail && <p className="mt-4 text-sm leading-relaxed text-charcoal-500 opacity-80">{metric.detail}</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-12 sm:gap-16">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 xl:grid xl:grid-cols-[1.2fr,0.8fr] transition-all duration-700 hover:border-white/10 hover:bg-white/[0.08]"
            >
              <div className="grid gap-3 border-b border-white/5 bg-charcoal-900/40 p-4 sm:grid-cols-2 xl:border-b-0 xl:border-r xl:p-6">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <img
                    src={project.beforeImage}
                    alt={project.title}
                    className="h-64 w-full object-cover sm:h-80 xl:h-full xl:min-h-[30rem] transition-transform duration-1000 group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-md">
                    Legacy
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <img
                    src={project.afterImage}
                    alt={project.title}
                    className="h-64 w-full object-cover sm:h-80 xl:h-full xl:min-h-[30rem] transition-transform duration-1000 group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gold-200 backdrop-blur-md">
                    Vision
                  </span>
                </div>
              </div>

              <div className="p-8 sm:p-10 xl:flex xl:flex-col xl:justify-between xl:p-14">
                <div>
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-gold-500/10 bg-gold-500/5 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-gold-400">
                      {project.status}
                    </span>
                    <span className="rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-charcoal-400">
                      {project.assetType}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{project.title}</h3>

                  <div className="mt-4 flex items-center gap-3 text-sm font-medium text-charcoal-400">
                    <MapPin className="h-4 w-4 text-gold-500" />
                    <span>{project.location}</span>
                  </div>

                  <p className="mt-8 text-lg leading-relaxed text-charcoal-300 xl:max-w-xl">{project.description}</p>

                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {project.metrics.map((metric) => {
                      const Icon = getMetricIcon(metric.label, metric.accent);

                      return (
                        <div key={`${project.id}-${metric.label}`} className="rounded-2xl border border-white/5 bg-charcoal-900/60 p-5 transition-colors group-hover:bg-charcoal-900/80">
                          <div className="mb-3 flex items-center gap-2.5">
                            <Icon className="h-4 w-4 text-gold-500" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-charcoal-500">{metric.label}</span>
                          </div>
                          <div className={`text-xl font-display font-bold ${metric.accent ? 'text-gold-400' : 'text-white'}`}>
                            {metric.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-2.5">
                  {project.highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/5 bg-white/5 px-4 py-2 text-xs font-medium text-charcoal-400 transition-colors group-hover:text-charcoal-200"
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 flex flex-col gap-8 rounded-[2.5rem] border border-white/5 bg-white/5 p-10 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:p-14"
        >
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-charcoal-300">{projectSection.portfolioNote}</p>
          </div>
          <MagneticButton
            href={projectSection.showcaseCta.href}
            className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-gold-500 px-10 py-5 text-sm font-bold tracking-widest text-charcoal-950 transition-all hover:shadow-glow-xl"
            aria-label={projectSection.showcaseCta.label}
          >
            <span className="uppercase">{projectSection.showcaseCta.label}</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
      </div>
    </section>
  );
};

export default ProjectShowcase;
