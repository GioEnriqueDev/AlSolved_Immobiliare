import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { navLinks, brand, routes } from '../../data/siteContent';

interface NavigationProps {
  currentPath: string;
}

const Navigation = ({ currentPath }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = 'mobile-navigation-menu';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        role="navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'border-b border-white/5 bg-charcoal-950/85 py-4 backdrop-blur-xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
          <div className="flex items-center justify-between gap-6">
            <motion.a
              href={routes.home}
              className="flex items-center gap-3"
              aria-label={`Torna alla home di ${brand.name}`}
              whileHover={{ scale: 1.01 }}
            >
              <div className="rounded-2xl border border-white/10 bg-charcoal-900/90 p-1.5 shadow-glow overflow-hidden">
                <img src={brand.logoSrc} alt={brand.logoAlt} className="h-10 w-auto rounded-xl object-contain sm:h-12" />
              </div>
              <div className="hidden sm:block">
                <p className="font-serif text-lg text-white">{brand.shortName}</p>
                <p className="text-xs uppercase tracking-[0.22em] text-charcoal-400">Immobiliare</p>
              </div>
            </motion.a>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => {
                const isActive = link.href === currentPath;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className={`group relative text-sm transition-colors ${
                      isActive ? 'text-white' : 'text-charcoal-300 hover:text-white'
                    }`}
                    aria-label={`Vai a ${link.label}`}
                    whileHover={{ y: -2 }}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-gold-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </motion.a>
                );
              })}
            </div>

            <div className="hidden md:block">
              <MagneticButton
                href={routes.sell}
                className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-charcoal-950 transition-all duration-300 hover:shadow-glow"
                aria-label="Vai alla sezione per vendere il tuo immobile"
              >
                Richiedi valutazione
              </MagneticButton>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileMenuId}
              aria-label={isMobileMenuOpen ? 'Chiudi menu navigazione' : 'Apri menu navigazione'}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id={mobileMenuId}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 bg-charcoal-950/95 backdrop-blur-xl" />
            <div className="relative flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  aria-label={`Vai a ${link.label}`}
                  className="font-display text-2xl text-white"
                  onClick={closeMenu}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <MagneticButton
                  href={routes.sell}
                  className="rounded-full bg-gold-500 px-8 py-3 font-semibold text-charcoal-950"
                  aria-label="Vai alla sezione per vendere il tuo immobile"
                  onClick={closeMenu}
                >
                  Richiedi valutazione
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
