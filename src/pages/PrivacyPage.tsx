import PageHero from '../components/custom/PageHero';
import SiteShell from '../components/layout/SiteShell';
import { brand, routes } from '../data/siteContent';

const PrivacyPage = () => {
  return (
    <SiteShell currentPath={routes.privacy}>
      <PageHero
        badge="Documentazione Legale"
        title="Privacy Policy"
        description={`Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) per i servizi di ${brand.name}.`}
      />
      
      <section className="bg-charcoal-950 px-6 py-24 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-invert prose-gold max-w-none space-y-12">
            <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-8 sm:p-12">
              <h2 className="font-display text-2xl font-bold text-white mb-6">1. Titolare del Trattamento</h2>
              <p className="text-charcoal-300 leading-relaxed">
                Il Titolare del trattamento è <strong>{brand.legalName}</strong>, con sede legale in {brand.address}. 
                Per qualsiasi richiesta relativa alla privacy è possibile contattare il Titolare all'indirizzo email: 
                <a href="mailto:leonegroupimmobiliare@gmail.com" className="text-gold-400 hover:text-gold-300 ml-1">leonegroupimmobiliare@gmail.com</a>.
              </p>
            </div>

            <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-8 sm:p-12">
              <h2 className="font-display text-2xl font-bold text-white mb-6">2. Tipologia di Dati Raccolti</h2>
              <p className="text-charcoal-300 leading-relaxed mb-4">
                I dati raccolti tramite questo sito web includono:
              </p>
              <ul className="list-disc list-inside space-y-3 text-charcoal-300">
                <li>Dati identificativi (nome, cognome)</li>
                <li>Dati di contatto (email, numero di telefono)</li>
                <li>Dati relativi all'immobile (indirizzo, metratura, stato conservativo)</li>
                <li>Eventuali messaggi o note inserite nei form di contatto</li>
              </ul>
            </div>

            <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-8 sm:p-12">
              <h2 className="font-display text-2xl font-bold text-white mb-6">3. Finalità del Trattamento</h2>
              <p className="text-charcoal-300 leading-relaxed">
                I dati vengono raccolti esclusivamente per le seguenti finalità:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-3 text-charcoal-300">
                <li>Fornire la valutazione immobiliare richiesta dall'utente.</li>
                <li>Rispondere a quesiti riguardanti gli investimenti immobiliari.</li>
                <li>Gestire la relazione con il cliente in fase pre-contrattuale.</li>
                <li>Adempiere ad obblighi di legge o richieste delle autorità.</li>
              </ul>
            </div>

            <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-8 sm:p-12">
              <h2 className="font-display text-2xl font-bold text-white mb-6">4. Base Giuridica</h2>
              <p className="text-charcoal-300 leading-relaxed">
                Il trattamento si basa sul consenso dell'interessato (espresso tramite l'invio dei form) e sulla necessità di eseguire misure pre-contrattuali adottate su richiesta dello stesso.
              </p>
            </div>

            <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-8 sm:p-12">
              <h2 className="font-display text-2xl font-bold text-white mb-6">5. Diritti dell'Interessato</h2>
              <p className="text-charcoal-300 leading-relaxed">
                Ai sensi del GDPR, l'utente ha il diritto di accedere ai propri dati, richiederne la rettifica, la cancellazione o la limitazione del trattamento. Può inoltre opporsi al trattamento e richiedere la portabilità dei dati. Le richieste vanno indirizzate a <span className="text-gold-400">leonegroupimmobiliare@gmail.com</span>.
              </p>
            </div>
            
            <p className="text-xs text-charcoal-500 text-center pt-8">
              Ultimo aggiornamento: Maggio 2026
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
};

export default PrivacyPage;
