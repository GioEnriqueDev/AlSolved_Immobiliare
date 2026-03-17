import { motion } from 'framer-motion';
import useLenis from './hooks/useLenis';
import CursorGlow from './components/custom/CursorGlow';
import Navigation from './components/custom/Navigation';
import Hero from './sections/Hero';
import AboutSection from './sections/AboutSection';
import ProjectShowcase from './sections/ProjectShowcase';
import ROICalculator from './sections/ROICalculator';
import ContactSection from './sections/ContactSection';
import { brand, footer, socialLinks, footerInfoSection, contact } from './data/siteContent';
import './App.css';

function App() {
  useLenis();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-charcoal-950 text-white">
      <CursorGlow />
      <Navigation />

      <main className="relative">
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="projects">
          <ProjectShowcase />
        </section>

        <section id="invest">
          <ROICalculator />
        </section>

        <ContactSection />

        <footer className="relative border-t border-white/5 bg-charcoal-950 px-6 py-24 sm:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 grid gap-12 md:grid-cols-4">
              <div className="md:col-span-2">
                <a href="#hero" className="mb-6 flex w-fit items-center gap-4" aria-label={`Torna alla home di ${brand.name}`}>
                  <div className="rounded-2xl border border-white/10 bg-charcoal-900/80 p-2 shadow-glow">
                    <img src={brand.logoSrc} alt={brand.logoAlt} className="h-14 w-auto rounded-xl object-contain" />
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-white">{brand.shortName}</p>
                    <p className="text-sm text-charcoal-400">{brand.tagline}</p>
                  </div>
                </a>

                <p className="mb-6 max-w-xl text-charcoal-400">{brand.description}</p>

                {socialLinks.length > 0 && (
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-charcoal-400 transition-all hover:bg-white/10 hover:text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Apri profilo ${social.label}`}
                      >
                        <span className="text-xs font-medium">{social.shortLabel}</span>
                      </motion.a>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h4 className="mb-6 text-white">Navigazione</h4>
                <ul className="space-y-3">
                  {footer.quickLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-charcoal-400 transition-colors hover:text-gold-400" aria-label={`Vai a ${link.label}`}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-6 text-white">Contatti</h4>
                <ul className="space-y-3 text-charcoal-400">
                  <li>
                    <a href={`mailto:${contact.details.email}`} aria-label={`Scrivi a ${contact.details.email}`}>
                      {contact.details.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${contact.details.phone.replace(/\s+/g, '')}`} aria-label={`Chiama ${contact.details.phone}`}>
                      {contact.details.phone}
                    </a>
                  </li>
                  <li>
                    {contact.details.addressLine1}
                    <br />
                    {contact.details.addressLine2}
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center">
              <p className="text-sm text-charcoal-500">
                &copy; {brand.year} {brand.legalName}. {footer.footerCopy}
              </p>
              <div className="flex gap-6 text-sm text-charcoal-500">
                {footer.legal.map((link) => (
                  <a key={link.label} href={link.href} className="transition-colors hover:text-white" aria-label={`Leggi ${link.label}`}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <section id="privacy" className="sr-only">
            <h2>{footerInfoSection.privacy.title}</h2>
            <p>{footerInfoSection.privacy.text}</p>
          </section>
          <section id="terms" className="sr-only">
            <h2>{footerInfoSection.terms.title}</h2>
            <p>{footerInfoSection.terms.text}</p>
          </section>
        </footer>
      </main>
    </div>
  );
}

export default App;
