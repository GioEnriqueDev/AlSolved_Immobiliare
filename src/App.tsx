import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useLenis from './hooks/useLenis';
import CursorGlow from './components/custom/CursorGlow';
import Navigation from './components/custom/Navigation';
import Hero from './sections/Hero';
import ROICalculator from './sections/ROICalculator';
import ProjectShowcase from './sections/ProjectShowcase';
import './App.css';

function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  // Preload fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-charcoal-950 text-white overflow-x-hidden">
      {/* Custom Cursor Glow */}
      <CursorGlow />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* ROI Calculator Section */}
        <section id="calculator">
          <ROICalculator />
        </section>

        {/* Project Showcase Section */}
        <section id="projects">
          <ProjectShowcase />
        </section>

        {/* Footer */}
        <footer className="relative py-24 px-6 sm:px-12 lg:px-24 bg-charcoal-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-glow">
                    <span className="text-charcoal-950 font-display font-bold text-xl">L</span>
                  </div>
                  <span className="font-serif text-2xl text-white">Leone Group</span>
                </div>
                <p className="text-charcoal-400 max-w-md mb-6">
                  Trasformiamo il mercato immobiliare attraverso investimenti strategici
                  e riqualificazioni innovative. Costruiamo il futuro degli spazi abitativi premium.
                </p>
                <div className="flex gap-4">
                  {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="w-10 h-10 glass rounded-xl flex items-center justify-center text-charcoal-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-xs">{social[0]}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-medium mb-6">Link Rapidi</h4>
                <ul className="space-y-3">
                  {['Chi Siamo', 'I Nostri Progetti', 'Calcolatore Investimenti', 'Contatti'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-charcoal-400 hover:text-gold-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-medium mb-6">Contatti</h4>
                <ul className="space-y-3 text-charcoal-400">
                  <li>info@leonegroup.it</li>
                  <li>+39 02 1234 5678</li>
                  <li>Via Roma, 123<br />20121 Milano, Italia</li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-charcoal-500 text-sm">
                © 2024 Leone Group Immobiliare. Tutti i diritti riservati.
              </p>
              <div className="flex gap-6 text-sm text-charcoal-500">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Termini di Servizio</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
