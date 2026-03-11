export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  shortLabel: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
}

export interface Project {
  id: number;
  title: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  investment: string;
  roi: string;
  timeline: string;
  description: string;
}

export interface FormField {
  label: string;
  placeholder: string;
  required?: boolean;
  type: 'text' | 'email' | 'tel' | 'textarea';
}

export const brand = {
  name: 'Leone Group',
  legalName: 'Leone Group Immobiliare',
  tagline: 'Investiamo in immobili premium e li trasformiamo in opportunità reali.',
  description:
    'Trasformiamo immobili sottovalutati in asset premium attraverso riqualificazioni strategiche, sviluppo territoriale e investimenti con visione di lungo periodo.',
  year: new Date().getFullYear(),
};

export const navLinks: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Chi Siamo', href: '#about' },
  { label: 'Calcolatore', href: '#calculator' },
  { label: 'Progetti', href: '#projects' },
  { label: 'Contatti', href: '#contact' },
];

export const hero = {
  badge: 'Investimenti Immobiliari di Prestigio',
  brand: 'Leone Group',
  titlePrimary: 'Investiamo nel',
  titleHighlight: "Futuro dell'Immobiliare",
  subtitle:
    'Trasformiamo immobili sottovalutati in asset premium tramite riqualificazioni strategiche, soluzioni finanziarie avanzate e partnership proprietarie.',
  backgroundImage:
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
  stats: [
    { value: '€500M+', label: 'Asset in gestione' },
    { value: '150+', label: 'Proprietà trasformate' },
    { value: '35%', label: 'ROI medio' },
    { value: '25', label: 'Anni di esperienza' },
  ] as StatItem[],
  ctas: {
    primary: {
      label: 'Contattaci ora',
      href: '#contact',
    },
    secondary: {
      label: 'Richiedi il nostro documento',
      href: '#contact',
    },
  },
  scrollHint: 'Scorri',
};

export const about = {
  headline: 'La nostra filosofia',
  title: 'Innoviamo il modo di vivere e investire nel patrimonio immobiliare.',
  intro:
    'Dal 2020 accompagniamo investitori e istituzioni nella trasformazione di asset immobiliari con criteri di sostenibilità, performance operative e design esclusivo.',
  highlights: [
    'Processo selettivo: due diligence tecnica e normativa rigorosa.',
    'Strategia integrata: acquisizione, riqualificazione, valorizzazione e dismissione.',
    'Reporting trasparente: rendicontazione periodica con metriche operative e di valore.',
  ] as string[],
  closing:
    'Il nostro obiettivo è generare valore duraturo, combinando rigore finanziario e identità architettonica.',
};

export const calculator = {
  badge: 'Calcolatore Investimenti',
  title: 'Calcola i tuoi',
  titleAccent: 'rendimenti',
  description: 'Scopri come può crescere il tuo investimento con la nostra strategia di riqualificazione.',
  subtitle:
    'Modifica i parametri per confrontare scenari realistici e pianificare il tuo ingresso nel portfolio.',
  guidance:
    'Simulazione indicativa a scopo informativo, non sostituisce consulenza finanziaria personalizzata.',
  labels: {
    amount: {
      label: 'Importo investibile',
      description: 'Capitale iniziale',
      minLabel: '€100K',
      maxLabel: '€2M',
      format: {
        min: 100000,
        max: 2000000,
      },
    },
    years: {
      label: 'Periodo investimento',
      description: "Anni fino all'uscita",
      minLabel: '1 anno',
      maxLabel: '10 anni',
      format: {
        min: 1,
        max: 10,
      },
    },
    roi: {
      label: 'ROI previsto',
      description: 'Tasso di rendimento annuo',
      minLabel: '10%',
      maxLabel: '50%',
      format: {
        min: 10,
        max: 50,
      },
    },
  },
  ctaLabel: 'Prenota una call',
};

export const projects = [
  {
    id: 1,
    title: 'Residenze Metropolitane',
    location: 'Milano, Lombardia',
    beforeImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    investment: '€12,5M',
    roi: '42%',
    timeline: '18 mesi',
    description:
      'Trasformazione completa di un magazzino storico in 24 unità residenziali di lusso, con nuovi spazi comuni e impianti efficienti.',
  },
  {
    id: 2,
    title: 'Torri Marina Bay',
    location: 'Napoli, Campania',
    beforeImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    investment: '€28M',
    roi: '38%',
    timeline: '24 mesi',
    description:
      'Riqualificazione fronte mare con servizi premium e tecnologia smart home per una nuova tipologia residenziale ad alta domanda.',
  },
  {
    id: 3,
    title: 'Collezione Heritage',
    location: 'Firenze, Toscana',
    beforeImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    investment: '€8,5M',
    roi: '45%',
    timeline: '14 mesi',
    description:
      'Restauro di palazzi storici con recupero architettonico e impianti moderni per mantenere heritage e aumentare l’attrattiva abitativa.',
  },
  {
    id: 4,
    title: 'Tenuta Colline Dorate',
    location: 'Roma, Lazio',
    beforeImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    investment: '€35M',
    roi: '33%',
    timeline: '30 mesi',
    description:
      'Sviluppo multi-fase di 12 ville esclusive con paesaggi collinari e servizi premium, ad alto potenziale turistico e residenziale.',
  },
] as Project[];

export const projectSection = {
  badge: 'Portfolio',
  title: 'Progetti',
  highlight: 'in evidenza',
  description:
    'Esplora i nostri casi trasformativi: dal concept alla riqualificazione, con risultati misurabili in performance e valore patrimoniale.',
  showcaseCta: {
    label: 'Richiedi portfolio e documentazione',
    href: '#contact',
  },
};

export const contact = {
  id: 'contact',
  title: 'Contattaci',
  subtitle: 'Parliamo della tua prossima opportunità immobiliare.',
  description:
    'Compila il form o contattaci direttamente per una call conoscitiva e una prima valutazione del tuo obiettivo.',
  ctaPrimary: {
    label: 'Prenota una call privata',
    href: '#contact-form',
  },
  ctaSecondary: {
    label: 'Scrivici una email',
  },
  details: {
    email: 'info@leonegroup.it',
    phone: '+39 02 1234 5678',
    addressLine1: 'Via Roma, 123',
    addressLine2: '20121 Milano, Italia',
  } as ContactInfo,
  form: {
    title: 'Richiedi una valutazione iniziale',
    fields: {
      name: {
        label: 'Nome e cognome',
        placeholder: 'Es. Mario Bianchi',
      } as FormField,
      email: {
        label: 'Email',
        placeholder: 'nome@azienda.it',
        type: 'email',
        required: true,
      } as FormField,
      phone: {
        label: 'Telefono',
        placeholder: '+39 333 1234567',
        type: 'tel',
      } as FormField,
      message: {
        label: 'Messaggio',
        placeholder: 'Dimmi in breve quale progetto ti interessa.',
        type: 'textarea',
        required: true,
      } as FormField,
    },
    button: 'Invia la tua richiesta',
  },
};

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', shortLabel: 'in', href: 'https://www.linkedin.com' },
  { label: 'Instagram', shortLabel: 'IG', href: 'https://www.instagram.com' },
  { label: 'YouTube', shortLabel: 'YT', href: 'https://www.youtube.com' },
];

export const footer = {
  quickLinks: [
    { label: 'Chi Siamo', href: '#about' },
    { label: 'I Nostri Progetti', href: '#projects' },
    { label: 'Calcolatore Investimenti', href: '#calculator' },
    { label: 'Contatti', href: '#contact' },
  ] as NavItem[],
  legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Termini di Servizio', href: '#terms' },
  ],
  footerCopy: 'Tutti i diritti riservati.',
};

export const footerInfoSection = {
  privacy: {
    title: 'Privacy Policy',
    text: 'Le informazioni inserite nei form sono utilizzate esclusivamente per richieste e attività informative relative ai nostri servizi.',
  },
  terms: {
    title: 'Termini di Servizio',
    text: 'I contenuti sono a scopo dimostrativo e possono includere valori indicativi e simulazioni.',
  },
};
