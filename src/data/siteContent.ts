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
  detail?: string;
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
  status: string;
  assetType: string;
  beforeImage: string;
  afterImage: string;
  investment: string;
  roi: string;
  timeline: string;
  description: string;
  highlights: string[];
}

export interface FieldOption {
  label: string;
  value: string;
}

export interface FormField {
  label: string;
  placeholder: string;
  required?: boolean;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  options?: FieldOption[];
}

export interface OverviewCard {
  title: string;
  description: string;
  href: string;
  label: string;
}

export const brand = {
  name: 'Leone Group Immobiliare',
  shortName: 'Leone Group',
  legalName: 'Leone Group Immobiliare',
  tagline: 'Sviluppo immobiliare, riqualificazione urbana e valorizzazione di immobili residenziali e direzionali.',
  description:
    'Rigeneriamo immobili datati, sottoutilizzati o non piu in linea con il mercato, trasformandoli in asset moderni, funzionali e ad alto valore aggiunto.',
  logoSrc: './leone-luxury-logo.png',
  logoAlt: 'Logo Leone Group Immobiliare',
  year: new Date().getFullYear(),
};

export const routes = {
  home: './',
  about: './chi-siamo.html',
  projects: './progetti.html',
  invest: './investi-con-noi.html',
  sell: './vendi-il-tuo-immobile.html',
};

export const navLinks: NavItem[] = [
  { label: 'Chi Siamo', href: routes.about },
  { label: 'Progetti', href: routes.projects },
  { label: 'Investi con Noi', href: routes.invest },
  { label: 'Vendi il tuo immobile', href: routes.sell },
];

export const hero = {
  badge: 'Sviluppo immobiliare e rigenerazione urbana',
  brandLine: 'Leone Group Immobiliare',
  titlePrimary: 'Rigeneriamo immobili',
  titleHighlight: 'e creiamo nuovo valore',
  subtitle:
    'Operiamo nel settore degli investimenti, della riqualificazione e della valorizzazione di immobili residenziali e direzionali con un approccio imprenditoriale, sostenibile e orientato ai risultati.',
  backgroundImage:
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80',
  commitments: [
    'Riqualificazione urbana invece di nuova cementificazione.',
    'Controllo diretto di analisi, progettazione, lavori e vendita.',
    'Immobili moderni, efficienti e pensati per le nuove esigenze del mercato.',
  ],
  stats: [
    { value: '30%', label: 'ROI medio', detail: 'Track record sintetico sulle operazioni tipo.' },
    { value: '6M+', label: 'Euro investiti', detail: 'Capitale attivato in operazioni di sviluppo.' },
    { value: '50+', label: 'Appartamenti realizzati', detail: 'Unita create o riqualificate.' },
    { value: '5.000+', label: 'Metri cubi riqualificati', detail: 'Volumi recuperati e ripensati.' },
  ] as StatItem[],
  ctas: {
    primary: {
      label: 'Scopri i progetti',
      href: routes.projects,
    },
    secondary: {
      label: 'Investi con noi',
      href: routes.invest,
    },
  },
  scrollHint: 'Scorri',
};

export const homeOverview = {
  badge: 'Le nostre aree',
  title: 'Sviluppo, investimento e valorizzazione immobiliare.',
  description:
    'Leone Group Immobiliare affianca proprietari e investitori con un approccio integrato, orientato alla riqualificazione del patrimonio esistente e alla creazione di nuovo valore.',
  cards: [
    {
      title: 'Chi Siamo',
      description:
        'Scopri la nostra identita, la visione imprenditoriale e il metodo con cui analizziamo e sviluppiamo ogni operazione.',
      href: routes.about,
      label: 'Scopri di piu',
    },
    {
      title: 'Progetti',
      description:
        'Una panoramica delle operazioni, dei numeri chiave e dell approccio con cui trasformiamo immobili in nuove opportunita.',
      href: routes.projects,
      label: 'Scopri i progetti',
    },
    {
      title: 'Investi con Noi',
      description:
        'Un area dedicata a chi desidera valutare opportunita strutturate, con informazioni chiare, simulatore indicativo e contatto diretto.',
      href: routes.invest,
      label: 'Approfondisci',
    },
    {
      title: 'Vendi il tuo immobile',
      description:
        'Un servizio pensato per proprietari che desiderano ricevere una valutazione rapida e capire il percorso migliore per il proprio immobile.',
      href: routes.sell,
      label: 'Richiedi valutazione',
    },
  ] as OverviewCard[],
};

export const pageHeaders = {
  about: {
    badge: 'Leone Group Immobiliare',
    title: 'Chi Siamo',
    description:
      'Identita, metodo di lavoro, solidita operativa e visione strategica della Leone Group Immobiliare.',
  },
  projects: {
    badge: 'Operazioni immobiliari',
    title: 'Progetti',
    description:
      'Una selezione di operazioni, numeri e risultati per raccontare in modo chiaro l approccio e la credibilita del gruppo.',
  },
  invest: {
    badge: 'Investimenti immobiliari',
    title: 'Investi con Noi',
    description:
      'Un percorso dedicato a chi desidera valutare opportunita immobiliari con un approccio strutturato, trasparente e orientato al risultato.',
  },
  sell: {
    badge: 'Valutazione immobiliare',
    title: 'Vendi il tuo immobile',
    description:
      'Una sezione dedicata ai proprietari che desiderano ricevere una prima valutazione e comprendere la soluzione piu adatta al proprio immobile.',
  },
};

export const about = {
  eyebrow: 'Chi siamo',
  title: 'Una societa di sviluppo immobiliare che trasforma il patrimonio esistente in valore concreto.',
  intro:
    'Leone Group Immobiliare opera nel settore degli investimenti, della riqualificazione e della valorizzazione di immobili residenziali e direzionali.',
  body: [
    'Il nostro focus e rigenerare immobili datati, sottoutilizzati o non piu in linea con le esigenze attuali del mercato, trasformandoli in abitazioni moderne, funzionali e di design.',
    'Crediamo in un modello di crescita sostenibile e intelligente che metta al centro la riqualificazione urbana anziche il consumo di nuovo suolo. Per questo sviluppiamo interventi mirati di ristrutturazione, frazionamento, cambio di destinazione d uso e ripensamento degli spazi.',
    'Ogni operazione nasce da un attenta analisi tecnica, economica e urbanistica e si sviluppa attraverso un processo integrato che ci consente di controllare qualita, tempi e costi, garantendo risultati concreti per chi abita e per chi investe.',
  ],
  pillars: [
    {
      title: 'Mission',
      text: 'Creare immobili nuovi per concezione, con architettura contemporanea, comfort abitativo ed efficienza energetica.',
    },
    {
      title: 'Posizionamento',
      text: 'Lavoriamo su residenziale e direzionale con operazioni selettive, orientate alla valorizzazione e alla liquidita finale.',
    },
    {
      title: 'Controllo',
      text: 'Gestiamo in modo integrato acquisizione, progettazione, lavori e dismissione per mantenere una governance completa del processo.',
    },
  ],
  processTitle: 'Come lavoriamo',
  process: [
    {
      step: '01',
      title: 'Analisi preliminare',
      text: 'Due diligence tecnica, urbanistica ed economico-finanziaria per misurare potenziale, costi, margini e rischi.',
    },
    {
      step: '02',
      title: 'Pianificazione',
      text: 'Definiamo layout, piano lavori, cronoprogramma e business plan dettagliato prima di ogni esecuzione.',
    },
    {
      step: '03',
      title: 'Esecuzione interna',
      text: 'Coordiniamo sviluppo, riqualificazione e valorizzazione con controllo costante su tempi, qualita e budget.',
    },
    {
      step: '04',
      title: 'Uscita e reporting',
      text: 'Monitoriamo stato avanzamento, vendita finale e rendicontazione periodica con la massima trasparenza.',
    },
  ],
  closing:
    'Il nostro obiettivo e migliorare la qualita della vita di chi abita gli spazi che realizziamo e generare valore solido per chi investe.',
};

export const projectSection = {
  badge: 'Progetti',
  title: 'Track record',
  highlight: 'e trasparenza',
  description:
    'Selezioniamo operazioni con potenziale di rivalutazione, pubblichiamo i risultati essenziali e lavoriamo su interventi misurabili per credibilita, solidita e continuita.',
  boardTitle: 'Numeri in evidenza',
  boardDescription:
    'Un quadro sintetico del posizionamento operativo, utile per comunicare subito scala, risultati e focus del gruppo.',
  boardMetrics: [
    { value: '30%', label: 'ROI medio', detail: 'Operazioni selezionate con margini sostenibili.' },
    { value: '6M+', label: 'Euro investiti', detail: 'Capitale movimentato nelle operazioni concluse e in corso.' },
    { value: '50+', label: 'Appartamenti realizzati', detail: 'Rigenerazioni, frazionamenti e riconversioni concluse.' },
    { value: '5.000+', label: 'Metri cubi riqualificati', detail: 'Recupero volumetrico e nuova qualita degli spazi.' },
  ] as StatItem[],
  portfolioNote:
    'Su richiesta condividiamo maggiori dettagli sulle operazioni concluse, sui progetti in corso e sulle opportunita attualmente in valutazione.',
  showcaseCta: {
    label: 'Richiedi portfolio e documentazione',
    href: routes.invest,
  },
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Frazionamento residenziale Porta Romana',
    location: 'Milano',
    status: 'Concluso',
    assetType: 'Residenziale',
    beforeImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    investment: 'EUR 1,4M',
    roi: '31%',
    timeline: '11 mesi',
    description:
      'Acquisizione di un grande appartamento da riorganizzare, riprogettato in piu unita moderne con efficientamento impiantistico e posizionamento commerciale mirato.',
    highlights: ['6 unita finali', 'Upgrade energetico', 'Vendita integrale al termine lavori'],
  },
  {
    id: 2,
    title: 'Riconversione direzionale Citta Studi',
    location: 'Milano',
    status: 'In corso',
    assetType: 'Direzionale > Residenziale',
    beforeImage: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
    investment: 'EUR 2,1M',
    roi: '28%',
    timeline: '14 mesi',
    description:
      'Conversione di spazi non piu allineati al mercato in nuove soluzioni abitative, con analisi urbanistica, ridefinizione dei layout e valorizzazione finale.',
    highlights: ['Cambio di destinazione d uso', 'Nuovo mix abitativo', 'Business plan con scenari di uscita'],
  },
  {
    id: 3,
    title: 'Riqualificazione residenziale San Siro',
    location: 'Milano',
    status: 'Concluso',
    assetType: 'Residenziale',
    beforeImage: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80',
    investment: 'EUR 950K',
    roi: '33%',
    timeline: '9 mesi',
    description:
      'Intervento su immobile da ristrutturare con ripensamento distributivo, restyling completo e messa a reddito attraverso una strategia commerciale calibrata.',
    highlights: ['Taglio moderno degli spazi', 'Capex sotto controllo', 'Forte appetibilita commerciale'],
  },
  {
    id: 4,
    title: 'Palazzina da valorizzare zona Washington',
    location: 'Milano',
    status: 'Pipeline',
    assetType: 'Intero stabile',
    beforeImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80',
    investment: 'EUR 3,2M',
    roi: 'Target 30%',
    timeline: '16 mesi',
    description:
      'Operazione in fase di studio su immobile di ampia metratura con potenziale di frazionamento, upgrade energetico e miglioramento del valore di mercato.',
    highlights: ['Analisi di fattibilita', 'Scenario buy-renovate-sell', 'Forte potenziale di rivalutazione'],
  },
];

export const invest = {
  badge: 'Investi con noi',
  title: 'Operazioni immobiliari strutturate, trasparenti e orientate alla creazione di valore reale.',
  intro:
    'Investire nella Leone Group Immobiliare significa partecipare a operazioni immobiliari basate su analisi approfondite, controllo diretto dei processi e strategie di valorizzazione concrete.',
  description:
    'Selezioniamo immobili con elevato potenziale di rivalutazione e sviluppiamo progetti di riqualificazione, frazionamento e riconversione con l obiettivo di generare rendimenti interessanti e sostenibili, mantenendo elevato il controllo sul rischio.',
  pillars: [
    {
      title: 'Selezione rigorosa',
      text: 'Ogni operazione nasce da un analisi tecnica, urbanistica ed economico-finanziaria approfondita.',
    },
    {
      title: 'Gestione chiavi in mano',
      text: 'Seguiamo acquisizione, progettazione, lavori e vendita finale per una governance completa.',
    },
    {
      title: 'Misurabilita',
      text: 'L investitore valuta tempi, costi, margini attesi e scenari con documentazione chiara e leggibile.',
    },
  ],
  operatingTitle: 'Modalita operative',
  operatingSteps: [
    'Analisi dell immobile e studio di fattibilita tecnica e urbanistica.',
    'Predisposizione di business plan dettagliato, cronoprogramma e conto economico previsionale.',
    'Gestione interna del progetto dalla fase di acquisizione fino alla vendita finale.',
    'Report periodici sull andamento dell operazione con aggiornamenti su tempi, costi e stato avanzamento.',
  ],
  advantagesTitle: 'Vantaggi per chi investe',
  advantages: [
    'Accesso a operazioni selezionate normalmente riservate a operatori del settore.',
    'Gestione completa senza impegno operativo diretto.',
    'Business plan chiari, dettagliati e verificabili.',
    'Controllo diretto di tempi, costi e qualita esecutiva.',
    'Allineamento di interessi grazie alla partecipazione diretta del gruppo nelle operazioni.',
    'Track record misurabile e relazioni costruite su trasparenza, affidabilita e risultati.',
  ],
  formTitle: 'Richiedi il dossier investitore',
  formDescription:
    'Lascia i tuoi riferimenti per ricevere una prima presentazione riservata e valutare insieme il profilo di investimento piu adatto.',
};

export const calculator = {
  badge: 'Simulatore rendimento',
  title: 'Simula',
  titleAccent: 'il potenziale',
  description:
    'Uno strumento indicativo per visualizzare come puo evolvere un investimento immobiliare strutturato nel tempo.',
  subtitle:
    'Modifica capitale, durata e ROI atteso per confrontare scenari diversi e preparare una prima valutazione.',
  guidance:
    'Simulazione illustrativa a scopo informativo, non sostituisce consulenza finanziaria o documentazione di progetto.',
  labels: {
    amount: {
      label: 'Importo investibile',
      description: 'Capitale iniziale disponibile',
      minLabel: 'EUR 100K',
      maxLabel: 'EUR 2M',
      format: {
        min: 100000,
        max: 2000000,
      },
    },
    years: {
      label: 'Orizzonte temporale',
      description: 'Durata stimata dell investimento',
      minLabel: '1 anno',
      maxLabel: '10 anni',
      format: {
        min: 1,
        max: 10,
      },
    },
    roi: {
      label: 'ROI previsto',
      description: 'Rendimento medio annuo stimato',
      minLabel: '10%',
      maxLabel: '40%',
      format: {
        min: 10,
        max: 40,
      },
    },
  },
  ctaLabel: 'Prenota una call con il team',
};

export const seller = {
  id: 'sell',
  badge: 'Vendi il tuo immobile',
  title: 'Ricevi una valutazione entro 24 ore.',
  subtitle:
    'Un servizio dedicato ai proprietari che desiderano vendere, valorizzare o comprendere meglio il potenziale del proprio immobile.',
  description:
    'Valutiamo immobili di grande metratura o con potenziale di riqualificazione, frazionamento e riposizionamento sul mercato. Possiamo intervenire con acquisto diretto, vendita tramite i nostri canali o valorizzazione mirata.',
  offers: [
    {
      title: 'Acquisto diretto',
      text: 'Quando l immobile rientra nel nostro target, possiamo formulare una proposta di acquisto in tempi rapidi.',
    },
    {
      title: 'Vendita gratuita',
      text: 'Mettiamo a disposizione i nostri canali e il nostro network per massimizzare la visibilita dell immobile.',
    },
    {
      title: 'Valorizzazione mirata',
      text: 'Studiamo gli interventi necessari per riallineare il bene al mercato e migliorarne il potenziale economico.',
    },
  ],
  campaignNote:
    'Ogni richiesta viene analizzata con attenzione per offrire una risposta rapida, riservata e coerente con le caratteristiche dell immobile.',
  form: {
    title: 'Richiedi la tua valutazione',
    button: 'Invia richiesta di valutazione',
    fields: {
      name: {
        label: 'Nome e cognome',
        placeholder: 'Es. Mario Bianchi',
        type: 'text',
        required: true,
      } as FormField,
      email: {
        label: 'Email',
        placeholder: 'nome@email.it',
        type: 'email',
        required: true,
      } as FormField,
      phone: {
        label: 'Telefono',
        placeholder: '+39 333 1234567',
        type: 'tel',
        required: true,
      } as FormField,
      squareMeters: {
        label: 'Metri quadri',
        placeholder: 'Es. 180',
        type: 'text',
        required: true,
      } as FormField,
      address: {
        label: 'Via e numero civico',
        placeholder: 'Es. Via Roma 25, Milano',
        type: 'text',
        required: true,
      } as FormField,
      floor: {
        label: 'Piano',
        placeholder: 'Es. 3',
        type: 'text',
        required: true,
      } as FormField,
      condition: {
        label: 'Stato dell immobile',
        placeholder: 'Seleziona uno stato',
        type: 'select',
        required: true,
        options: [
          { label: 'Da ristrutturare', value: 'da-ristrutturare' },
          { label: 'Buono stato', value: 'buono-stato' },
        ],
      } as FormField,
      notes: {
        label: 'Note aggiuntive',
        placeholder: 'Indicaci dettagli utili come presenza di terrazzi, doppia esposizione o altre caratteristiche.',
        type: 'textarea',
      } as FormField,
    },
  },
};

export const contact = {
  details: {
    email: 'info@leonegroup.it',
    phone: '+39 02 1234 5678',
    addressLine1: 'Milano',
    addressLine2: 'Ricevimento su appuntamento',
  } as ContactInfo,
};

export const socialLinks: SocialLink[] = [];

export const footer = {
  quickLinks: [
    { label: 'Home', href: routes.home },
    { label: 'Chi Siamo', href: routes.about },
    { label: 'Progetti', href: routes.projects },
    { label: 'Investi con Noi', href: routes.invest },
    { label: 'Vendi il tuo immobile', href: routes.sell },
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
    text: 'Le informazioni inserite nei form sono utilizzate esclusivamente per ricontattare l utente in relazione ai servizi richiesti.',
  },
  terms: {
    title: 'Termini di Servizio',
    text: 'I contenuti di simulazione e le schede progetto hanno finalita illustrative fino al caricamento dei dati operativi definitivi.',
  },
};
