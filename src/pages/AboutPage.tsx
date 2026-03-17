import PageHero from '../components/custom/PageHero';
import SiteShell from '../components/layout/SiteShell';
import AboutSection from '../sections/AboutSection';
import { pageHeaders, routes } from '../data/siteContent';

const AboutPage = () => {
  return (
    <SiteShell currentPath={routes.about}>
      <PageHero
        badge={pageHeaders.about.badge}
        title={pageHeaders.about.title}
        description={pageHeaders.about.description}
        aside={
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold-300">Focus</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Autorevolezza, solidita e professionalita.
              </div>
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Racconto chiaro della mission e del posizionamento.
              </div>
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Valorizzazione del metodo e dell esperienza maturata.
              </div>
            </div>
          </div>
        }
      />
      <AboutSection />
    </SiteShell>
  );
};

export default AboutPage;
