import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { contact } from '../data/siteContent';
import MagneticButton from '../components/custom/MagneticButton';

const ContactSection = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const messageSent = formValues.name.trim() && formValues.email.trim() && formValues.message.trim();
    setStatus(messageSent ? 'success' : 'error');

    if (messageSent) {
      setFormValues({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }
  };

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-black" id={contact.id}>
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-gold-300 text-xs tracking-[0.2em] uppercase mb-4">Contatti</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">{contact.title}</h2>
            <p className="text-charcoal-300 text-lg mb-4">{contact.subtitle}</p>
            <p className="text-charcoal-400 mb-10">{contact.description}</p>

            <a
              href={`mailto:${contact.details.email}`}
              id="contact-mail"
              className="inline-flex items-center gap-3 text-gold-300 font-medium mb-8 underline underline-offset-4"
              aria-label={`Scrivi direttamente a ${contact.details.email}`}
            >
              <Mail className="w-4 h-4" />
              {contact.ctaSecondary.label}
            </a>

            <div className="space-y-4">
              <a
                href={`tel:${contact.details.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 text-charcoal-200 hover:text-white"
                aria-label={`Chiama ${contact.details.phone}`}
              >
                <span className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </span>
                <span>{contact.details.phone}</span>
              </a>

              <a
                href={`mailto:${contact.details.email}`}
                className="flex items-center gap-3 text-charcoal-200 hover:text-white"
                aria-label={`Scrivi un'e-mail a ${contact.details.email}`}
              >
                <span className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </span>
                <span>{contact.details.email}</span>
              </a>

              <p className="flex items-start gap-3 text-charcoal-200">
                <span className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <span>
                  {contact.details.addressLine1}
                  <br />
                  {contact.details.addressLine2}
                </span>
              </p>
            </div>
          </div>

          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="glass border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5"
            noValidate
            aria-live="polite"
          >
            <h3 className="text-white text-2xl font-display font-bold">{contact.form.title}</h3>

            <label className="block text-sm" htmlFor="contact-name">
              <span className="text-charcoal-300">{contact.form.fields.name.label}</span>
              <input
                id="contact-name"
                name="contact-name"
                type="text"
                value={formValues.name}
                placeholder={contact.form.fields.name.placeholder}
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-white/10 bg-charcoal-900 px-4 py-3 text-white outline-none focus-visible:ring-2 ring-gold-400"
                onChange={(event) => setFormValues((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </label>

            <label className="block text-sm" htmlFor="contact-email">
              <span className="text-charcoal-300">{contact.form.fields.email.label}</span>
              <input
                id="contact-email"
                name="contact-email"
                type="email"
                value={formValues.email}
                placeholder={contact.form.fields.email.placeholder}
                autoComplete="email"
                inputMode="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-charcoal-900 px-4 py-3 text-white outline-none focus-visible:ring-2 ring-gold-400"
                onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
            </label>

            <label className="block text-sm" htmlFor="contact-phone">
              <span className="text-charcoal-300">{contact.form.fields.phone.label}</span>
              <input
                id="contact-phone"
                name="contact-phone"
                type="tel"
                value={formValues.phone}
                placeholder={contact.form.fields.phone.placeholder}
                autoComplete="tel"
                inputMode="tel"
                className="mt-2 w-full rounded-xl border border-white/10 bg-charcoal-900 px-4 py-3 text-white outline-none focus-visible:ring-2 ring-gold-400"
                onChange={(event) => setFormValues((prev) => ({ ...prev, phone: event.target.value }))}
              />
            </label>

            <label className="block text-sm" htmlFor="contact-message">
              <span className="text-charcoal-300">{contact.form.fields.message.label}</span>
              <textarea
                id="contact-message"
                name="contact-message"
                value={formValues.message}
                placeholder={contact.form.fields.message.placeholder}
                rows={4}
                className="mt-2 w-full rounded-xl border border-white/10 bg-charcoal-900 px-4 py-3 text-white outline-none focus-visible:ring-2 ring-gold-400 resize-y"
                onChange={(event) => setFormValues((prev) => ({ ...prev, message: event.target.value }))}
                required
              />
            </label>

            <MagneticButton
              type="submit"
              className="w-full group bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl py-3 text-charcoal-950 font-semibold"
              aria-label="Invia la tua richiesta"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {contact.form.button}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </MagneticButton>

            <p
              className={`text-sm ${status === 'success' ? 'text-green-400' : status === 'error' ? 'text-red-400' : 'text-charcoal-400'}`}
              role="status"
              aria-live="polite"
            >
              {status === 'success'
                ? 'Grazie, abbiamo ricevuto la tua richiesta. Ti contatteremo al più presto.'
                : status === 'error'
                  ? 'Compila almeno nome, email e messaggio per inviare la richiesta.'
                  : 'I dati vengono trattati per contattarci con te in merito alla tua richiesta.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;


