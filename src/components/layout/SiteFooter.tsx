import { brand, contact, footer, footerInfoSection } from '../../data/siteContent';

const SiteFooter = () => {
  return (
    <footer className="relative border-t border-white/5 bg-charcoal-950 px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="./" className="mb-6 flex w-fit items-center gap-6" aria-label={`Torna alla home di ${brand.name}`}>
              <img src={brand.logoSrc} alt={brand.logoAlt} className="h-24 w-auto object-contain" />
              <div>
                <p className="font-serif text-2xl text-white">{brand.shortName}</p>
                <p className="text-sm text-charcoal-400">{brand.tagline}</p>
              </div>
            </a>

            <p className="mb-6 max-w-xl text-charcoal-400">{brand.description}</p>
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
                <a href={`mailto:${contact.details.email}`} aria-label={`Scrivi a ${contact.details.email}`} className="transition-colors hover:text-white">
                  {contact.details.email}
                </a>
              </li>
              <li>
                {brand.address}
                <br />
                {contact.details.addressLine2}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <div className="space-y-1">
            <p className="text-sm text-charcoal-500">
              &copy; {brand.year} {brand.legalName}. {footer.footerCopy}
            </p>
            <p className="text-[10px] text-charcoal-600">
              {brand.vat} — {brand.cf} — {brand.address}
            </p>
          </div>
          
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex gap-6 text-sm text-charcoal-500">
              {footer.legal.map((link) => (
                <a key={link.label} href={link.href} className="transition-colors hover:text-white" aria-label={`Leggi ${link.label}`}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="h-px w-8 bg-white/5 hidden md:block" />
            <p className="text-[10px] uppercase tracking-widest text-charcoal-600">
              Created by <span className="text-charcoal-400">Alsolved</span>
            </p>
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
  );
};

export default SiteFooter;
