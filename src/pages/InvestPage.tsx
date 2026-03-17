import PageHero from '../components/custom/PageHero';
import SiteShell from '../components/layout/SiteShell';
import ROICalculator from '../sections/ROICalculator';
import { pageHeaders, routes } from '../data/siteContent';

const InvestPage = () => {
  return (
    <SiteShell currentPath={routes.invest}>
      <PageHero
        badge={pageHeaders.invest.badge}
        title={pageHeaders.invest.title}
        description={pageHeaders.invest.description}
        aside={
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold-300">Per investitori</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Modello di business spiegato in modo diretto e istituzionale.
              </div>
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Simulatore indicativo per una prima lettura del potenziale.
              </div>
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Form dedicato per dossier, contatto e opportunita selezionate.
              </div>
            </div>
          </div>
        }
      />
      <ROICalculator />
    </SiteShell>
  );
};

export default InvestPage;
