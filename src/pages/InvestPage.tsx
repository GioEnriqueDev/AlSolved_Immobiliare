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
            <p className="text-xs uppercase tracking-[0.24em] text-gold-300">Per chi investe</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Un approccio spiegato in modo chiaro, diretto e comprensibile.
              </div>
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Uno strumento semplice per farsi un idea del potenziale dell investimento.
              </div>
              <div className="rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 text-sm leading-relaxed text-charcoal-300">
                Un contatto diretto per ricevere informazioni, materiali e approfondimenti.
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
