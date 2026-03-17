import PageHero from '../components/custom/PageHero';
import SiteShell from '../components/layout/SiteShell';
import ContactSection from '../sections/ContactSection';
import { pageHeaders, routes } from '../data/siteContent';

const SellPage = () => {
  return (
    <SiteShell currentPath={routes.sell}>
      <PageHero
        badge={pageHeaders.sell.badge}
        title={pageHeaders.sell.title}
        description={pageHeaders.sell.description}
        aside={
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold-300">Obiettivo</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Landing pensata per campagne Ads e sponsorizzate mirate.
              </div>
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Form strutturato con i dati corretti per la prima valutazione.
              </div>
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Lead generation orientata a immobili di grande metratura e operazioni di valorizzazione.
              </div>
            </div>
          </div>
        }
      />
      <ContactSection />
    </SiteShell>
  );
};

export default SellPage;
