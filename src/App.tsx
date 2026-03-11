import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useLenis from './hooks/useLenis';
import CursorGlow from './components/custom/CursorGlow';
import Navigation from './components/custom/Navigation';
import Hero from './sections/Hero';
import AboutSection from './sections/AboutSection';
import ROICalculator from './sections/ROICalculator';
import ProjectShowcase from './sections/ProjectShowcase';
import ContactSection from './sections/ContactSection';
import { brand, footer, socialLinks, footerInfoSection, contact } from './data/siteContent';
import './App.css';

function App() {
  useLenis();

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-charcoal-950 text-white overflow-x-hidden">
      <CursorGlow />
      <Navigation />

      <main className="relative">
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="calculator">
          <ROICalculator />
        </section>

        <section id="projects">
          <ProjectShowcase />
        </section>

        <ContactSection />

        <footer className="relative py-24 px-6 sm:px-12 lg:px-24 bg-charcoal-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-glow">
                    <span className="text-charcoal-950 font-display font-bold text-xl">L</span>
                  </div>
                  <span className="font-serif text-2xl text-white">{brand.name}</span>
                </div>
                <p className="text-charcoal-400 max-w-md mb-6">{brand.description}</p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 glass rounded-xl flex items-center justify-center text-charcoal-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Apri profilo ${social.label}`}
                    >
                      <span className="text-xs font-medium">{social.shortLabel}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-6">Link Rapidi</h4>
                <ul className="space-y-3">
                  {footer.quickLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-charcoal-400 hover:text-gold-400 transition-colors"
                        aria-label={`Vai a ${link.label}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-6">Contatti</h4>
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

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-charcoal-500 text-sm">© {brand.year} {brand.legalName}. {footer.footerCopy}
              </p>
              <div className="flex gap-6 text-sm text-charcoal-500">
                {footer.legal.map((link) => (
                  <a key={link.label} href={link.href} className="hover:text-white transition-colors" aria-label={`Leggi ${link.label}`}>
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


