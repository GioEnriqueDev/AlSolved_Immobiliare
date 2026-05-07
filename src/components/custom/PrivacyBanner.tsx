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
          className="fixed bottom-6 left-6 right-6 z-[100] mx-auto max-w-4xl"
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-charcoal-900/80 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4 md:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white">Privacy & Cookie Policy</h4>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-300">
                    Utilizziamo i cookie per migliorare la tua esperienza su {brand.name}. 
                    Proseguendo la navigazione accetti la nostra informativa sulla privacy.
                    <a href={routes.privacy} className="ml-2 text-gold-400 underline-offset-4 hover:underline">
                      Leggi di più
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <button
                  onClick={handleAccept}
                  className="rounded-xl bg-gold-500 px-6 py-2.5 text-sm font-bold text-charcoal-950 transition hover:bg-gold-400 hover:shadow-glow"
                >
                  Accetta tutto
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-charcoal-400 transition hover:bg-white/10 hover:text-white"
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
