import PageHero from '../components/custom/PageHero';
import SiteShell from '../components/layout/SiteShell';
import ProjectShowcase from '../sections/ProjectShowcase';
import { pageHeaders, routes } from '../data/siteContent';

const ProjectsPage = () => {
  return (
    <SiteShell currentPath={routes.projects}>
      <PageHero
        badge={pageHeaders.projects.badge}
        title={pageHeaders.projects.title}
        description={pageHeaders.projects.description}
        aside={
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold-300">Valori distintivi</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Numeri chiari, risultati leggibili e impostazione professionale.
              </div>
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Operazioni concluse, in corso e in pipeline presentate con coerenza.
              </div>
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Focus su credibilita, trasparenza e track record.
              </div>
            </div>
          </div>
        }
      />
      <ProjectShowcase />
    </SiteShell>
  );
};

export default ProjectsPage;
