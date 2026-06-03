import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { routes, brand } from '../../data/siteContent';

const PrivacyBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('privacyAccepted');
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacyAccepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-4xl sm:bottom-6 sm:left-6 sm:right-6"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-charcoal-900/95 p-4 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:rounded-3xl sm:p-6">
            <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3 sm:gap-4 md:items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-white sm:text-lg">Privacy & Cookie Policy</h4>
                  <p className="mt-1 text-xs leading-relaxed text-charcoal-300 sm:text-sm">
                    Utilizziamo i cookie per migliorare la tua esperienza su {brand.name}. 
                    Proseguendo la navigazione accetti la nostra informativa sulla privacy.
                    <a href={routes.privacy} className="ml-1 text-gold-400 underline-offset-4 hover:underline sm:ml-2">
                      Leggi di più
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <button
                  onClick={handleAccept}
                  className="flex-1 rounded-xl bg-gold-500 px-4 py-2.5 text-sm font-bold text-charcoal-950 transition hover:bg-gold-400 sm:flex-none sm:px-6"
                >
                  Accetta
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-charcoal-300 transition hover:bg-white/10 hover:text-white sm:flex-none sm:px-6"
                >
                  Rifiuta
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-charcoal-400 transition hover:bg-white/10 hover:text-white md:hidden"
                  aria-label="Chiudi"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyBanner;
