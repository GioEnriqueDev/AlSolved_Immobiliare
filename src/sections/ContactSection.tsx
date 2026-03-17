import { useState, type FormEvent } from 'react';
import { ArrowRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { contact, routes, seller, type FormField } from '../data/siteContent';
import MagneticButton from '../components/custom/MagneticButton';

type SellerFormValues = {
  name: string;
  email: string;
  phone: string;
  squareMeters: string;
  address: string;
  floor: string;
  condition: string;
  notes: string;
};

const initialFormValues: SellerFormValues = {
  name: '',
  email: '',
  phone: '',
  squareMeters: '',
  address: '',
  floor: '',
  condition: '',
  notes: '',
};

const fieldClassName =
  'mt-2 w-full rounded-2xl border border-white/10 bg-charcoal-900 px-4 py-3 text-white outline-none ring-gold-400 focus-visible:ring-2';

const ContactSection = () => {
  const [formValues, setFormValues] = useState<SellerFormValues>(initialFormValues);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const isValid =
      formValues.name.trim() &&
      formValues.email.trim() &&
      formValues.phone.trim() &&
      formValues.squareMeters.trim() &&
      formValues.address.trim() &&
      formValues.floor.trim() &&
      formValues.condition.trim();

    setStatus(isValid ? 'success' : 'error');

    if (isValid) {
      setFormValues(initialFormValues);
    }
  };

  const renderField = (fieldId: keyof SellerFormValues, field: FormField) => {
    if (field.type === 'textarea') {
      return (
        <textarea
          id={fieldId}
          rows={4}
          value={formValues[fieldId]}
          placeholder={field.placeholder}
          className={fieldClassName}
          onChange={(event) => setFormValues((current) => ({ ...current, [fieldId]: event.target.value }))}
          required={field.required}
        />
      );
    }

    if (field.type === 'select') {
      return (
        <select
          id={fieldId}
          value={formValues[fieldId]}
          className={fieldClassName}
          onChange={(event) => setFormValues((current) => ({ ...current, [fieldId]: event.target.value }))}
          required={field.required}
        >
          <option value="">{field.placeholder}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={fieldId}
        type={field.type}
        value={formValues[fieldId]}
        placeholder={field.placeholder}
        className={fieldClassName}
        onChange={(event) => setFormValues((current) => ({ ...current, [fieldId]: event.target.value }))}
        required={field.required}
      />
    );
  };

  return (
    <section className="bg-black px-6 py-24 sm:px-12 lg:px-24" id={seller.id}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 xl:grid-cols-[0.92fr,1.08fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.26em] text-gold-300">{seller.badge}</p>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">{seller.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal-300">{seller.subtitle}</p>
            <p className="mt-4 text-base leading-relaxed text-charcoal-400">{seller.description}</p>

            <div className="mt-8 rounded-[2rem] border border-gold-500/20 bg-gold-500/10 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500 text-charcoal-950">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold-200">Valutazione rapida</p>
                  <p className="mt-1 text-lg font-semibold text-white">Risposta entro 24 ore</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-200">
                Il form e pensato per raccogliere subito le informazioni chiave e accelerare la valutazione preliminare dell immobile.
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              {seller.offers.map((offer) => (
                <div key={offer.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-gold-300">{offer.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-300">{offer.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-charcoal-900/75 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-300">Il nostro impegno</p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-400">{seller.campaignNote}</p>
            </div>

            <div className="mt-8 space-y-4">
              <a
                href={`tel:${contact.details.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 text-charcoal-200 transition-colors hover:text-white"
                aria-label={`Chiama ${contact.details.phone}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Phone className="h-4 w-4" />
                </span>
                <span>{contact.details.phone}</span>
              </a>

              <a
                href={`mailto:${contact.details.email}`}
                className="flex items-center gap-3 text-charcoal-200 transition-colors hover:text-white"
                aria-label={`Scrivi a ${contact.details.email}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Mail className="h-4 w-4" />
                </span>
                <span>{contact.details.email}</span>
              </a>

              <p className="flex items-start gap-3 text-charcoal-200">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <MapPin className="h-4 w-4" />
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
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
            noValidate
          >
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold text-white">{seller.form.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-400">
                  Compila il form con i dati essenziali del tuo immobile: ti ricontatteremo con una prima valutazione e la soluzione piu adatta.
                </p>
              </div>
              <MagneticButton
                href={routes.home}
                className="inline-flex rounded-full border border-white/10 bg-black/30 px-5 py-2.5 text-sm text-white"
                aria-label="Torna all inizio della pagina"
              >
                Torna su
              </MagneticButton>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {(Object.entries(seller.form.fields) as Array<[keyof SellerFormValues, FormField]>).map(([fieldId, field]) => (
                <label
                  key={fieldId}
                  className={`block text-sm ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}
                  htmlFor={fieldId}
                >
                  <span className="text-charcoal-300">{field.label}</span>
                  {renderField(fieldId, field)}
                </label>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-charcoal-900/70 p-5">
              <p className="text-sm leading-relaxed text-charcoal-300">
                Compilando il form potremo analizzare il profilo dell immobile e indicarti con chiarezza il percorso piu adatto tra acquisto, vendita o valorizzazione.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-500 px-6 py-3 font-semibold text-charcoal-950 transition hover:shadow-glow"
              >
                {seller.form.button}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p
                className={`text-sm ${
                  status === 'success'
                    ? 'text-green-400'
                    : status === 'error'
                      ? 'text-red-400'
                      : 'text-charcoal-400'
                }`}
                role="status"
              >
                {status === 'success'
                  ? 'Richiesta inviata. Ti contatteremo entro 24 ore con una prima valutazione.'
                  : status === 'error'
                    ? 'Compila tutti i campi obbligatori per inviare la richiesta.'
                    : 'I dati vengono utilizzati solo per la valutazione dell immobile e il successivo ricontatto.'}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
