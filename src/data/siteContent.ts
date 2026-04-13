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
  description: string;
  metrics: Array<{
    label: string;
    value: string;
    accent?: boolean;
  }>;
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

export interface TransformationProject {
  id: number;
  title: string;
  location: string;
  status: string;
  yearLabel: string;
  assetType: string;
  summary: string;
  insight: string;
  metrics: string[];
  beforeImage: string;
  afterImage: string;
}

export const brand = {
  name: 'Leone Group Immobiliare',
  shortName: 'Leone Group',
  legalName: 'Leone Group Immobiliare',
  tagline:
    'Sviluppo immobiliare a Roma per trasformare immobili datati in spazi piu belli, piu attuali e piu richiesti dal mercato.',
  description:
    'Selezioniamo, ripensiamo e valorizziamo immobili a Roma con un approccio che unisce visione, cura progettuale e attenzione al risultato finale.',
  logoSrc: './leone-group-logo.png',
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
  badge: 'Sviluppo immobiliare a Roma e rigenerazione urbana',
  brandLine: 'Leone Group Immobiliare',
  titlePrimary: 'Trasformiamo immobili',
  titleHighlight: 'in opportunita ad alto valore',
  subtitle:
    'Operiamo a Roma su immobili residenziali e direzionali con un metodo chiaro: analizziamo il potenziale, ripensiamo gli spazi e realizziamo trasformazioni capaci di aumentare attrattiva, qualita percepita e valore finale.',
  backgroundImage:
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80',
  commitments: [
    'Rigeneriamo immobili esistenti invece di consumare nuovo suolo.',
    'Seguiamo internamente analisi, progetto, lavori e strategia di uscita.',
    'Creiamo prodotti immobiliari piu forti sul mercato, piu credibili e piu desiderabili.',
  ],
  stats: [
    { value: '30%', label: 'ROI medio', detail: 'Media indicativa delle operazioni completate.' },
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
  title: 'Diamo nuova forza a immobili, capitali e opportunita immobiliari a Roma.',
  description:
    'Affianchiamo proprietari e investitori con un percorso semplice e concreto: partiamo dal potenziale dell immobile, ne miglioriamo qualita e appeal e lo riportiamo sul mercato con piu forza.',
  cards: [
    {
      title: 'Chi Siamo',
      description:
        'Scopri il metodo, la visione e la struttura operativa con cui trasformiamo ogni operazione in un progetto leggibile, controllato e orientato al risultato.',
      href: routes.about,
      label: 'Scopri di piu',
    },
    {
      title: 'Progetti',
      description:
        'Guarda i nostri interventi conclusi con foto prima e dopo e scopri come cambia la percezione di un immobile quando il progetto e costruito bene.',
      href: routes.projects,
      label: 'Scopri i progetti',
    },
    {
      title: 'Investi con Noi',
      description:
        'Una proposta dedicata a chi cerca operazioni immobiliari strutturate, trasparenti e gestite con controllo diretto su tempi, costi e strategia.',
      href: routes.invest,
      label: 'Approfondisci',
    },
    {
      title: 'Vendi il tuo immobile',
      description:
        'Un servizio per proprietari che vogliono capire subito come vendere meglio, valorizzare di piu o ricevere una proposta concreta.',
      href: routes.sell,
      label: 'Richiedi valutazione',
    },
  ] as OverviewCard[],
};

export const transformationPortfolio = {
  badge: 'Progetti prima e dopo',
  title: 'Prima e dopo',
  titleAccent: 'in movimento',
  description:
    'Una selezione ordinata di interventi conclusi a Roma, pensata per aiutare il cliente a capire subito il risultato della trasformazione e il valore creato.',
  stageLabel: 'Tieni premuto e scorri per confrontare il prima e il dopo',
  cardEyebrow: 'Progetto selezionato',
  progressBadge: 'Intervento realizzato',
  teaserTitle: 'Cantiere attivo',
  teaserDescription:
    'Accanto agli interventi completati, mostriamo anche una lavorazione in corso per raccontare continuita, ritmo operativo e pipeline reale.',
  teaserImage: './portfolio/eroi-in-corso.jpeg',
  teaserImageAlt: 'Cantiere immobiliare in corso Leone Group',
};

export const transformationProjects: TransformationProject[] = [
  {
    id: 1,
    title: 'Calabritto',
    location: 'Roma',
    status: 'Concluso',
    yearLabel: 'Repositioning residenziale',
    assetType: 'Frazionamento e restyling',
    summary:
      'Un intervento che ha ripensato distribuzione, materiali e percezione generale dell immobile per presentarlo al mercato con un immagine piu pulita, piu elegante e piu forte.',
    insight: 'Il risultato finale rende l immobile piu chiaro, piu elegante e immediatamente piu convincente.',
    metrics: ['Nuovo layout abitativo', 'Upgrade percezione premium', 'Commercializzazione ottimizzata'],
    beforeImage: './portfolio/calabritto-prima.jpeg',
    afterImage: './portfolio/calabritto-dopo.jpeg',
  },
  {
    id: 2,
    title: 'Graf',
    location: 'Roma',
    status: 'Concluso',
    yearLabel: 'Valorizzazione residenziale',
    assetType: 'Riqualificazione completa',
    summary:
      'Un progetto costruito per migliorare comfort, atmosfera e leggibilita degli spazi, con una trasformazione capace di alzare la qualita percepita dell immobile.',
    insight: 'Quando il progetto e coerente, la differenza non si vede soltanto: si sente subito.',
    metrics: ['Mood contemporaneo', 'Spazi piu leggibili', 'Aumento desiderabilita finale'],
    beforeImage: './portfolio/graf-prima.jpeg',
    afterImage: './portfolio/graf-dopo.jpeg',
  },
  {
    id: 3,
    title: 'Monte Gennaro',
    location: 'Roma',
    status: 'Concluso',
    yearLabel: 'Rigenerazione architettonica',
    assetType: 'Re-design distributivo',
    summary:
      'Una riqualificazione orientata a restituire ordine visivo, modernita e una nuova qualita abitativa, valorizzando luce, equilibrio e funzionalita.',
    insight: 'Il prima e dopo racconta un salto netto verso una casa piu attuale e piu desiderabile.',
    metrics: ['Spazi razionalizzati', 'Impatto visivo piu forte', 'Migliore leggibilita del prodotto'],
    beforeImage: './portfolio/monte-gennaro-prima.jpeg',
    afterImage: './portfolio/monte-gennaro-dopo.jpeg',
  },
  {
    id: 4,
    title: 'Universita',
    location: 'Roma',
    status: 'Concluso',
    yearLabel: 'Reframe verticale',
    assetType: 'Upgrade residenziale',
    summary:
      'Un intervento che ha riallineato immagine, funzionalita e percezione complessiva dell immobile, trasformandolo in un prodotto piu coerente con le aspettative del mercato.',
    insight: 'Qui il valore si legge nella pulizia del risultato e nella forza della nuova identita della casa.',
    metrics: ['Nuova identita del bene', 'Linguaggio piu pulito', 'Valore percepito piu alto'],
    beforeImage: './portfolio/universita-prima.jpeg',
    afterImage: './portfolio/universita-dopo.jpeg',
  },
];

export const pageHeaders = {
  about: {
    badge: 'Leone Group Immobiliare',
    title: 'Chi Siamo',
    description:
      'Identita, metodo di lavoro, solidita operativa e visione strategica di Leone Group Immobiliare nel settore dello sviluppo immobiliare a Roma.',
  },
  projects: {
    badge: 'Progetti conclusi',
    title: 'Progetti',
    description:
      'Una selezione di progetti conclusi a Roma con foto prima e dopo, pensati per mostrare in modo diretto il risultato del nostro lavoro e il valore creato.',
  },
  invest: {
    badge: 'Investimenti immobiliari',
    title: 'Investi con Noi',
    description:
      'Un percorso dedicato a chi desidera investire in operazioni immobiliari a Roma con un approccio strutturato, trasparente e orientato al risultato.',
  },
  sell: {
    badge: 'Valutazione immobiliare',
    title: 'Vendi il tuo immobile',
    description:
      'Una sezione dedicata ai proprietari che desiderano ricevere una valutazione immobiliare rapida e capire la soluzione piu adatta tra vendita, valorizzazione o acquisto diretto.',
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
  badge: 'Progetti realizzati',
  title: 'Interventi conclusi',
  highlight: 'prima e dopo',
  description:
    'Ogni progetto racconta una trasformazione reale a Roma: partiamo da un immobile con potenziale inespresso e lo restituiamo al mercato con una nuova identita, piu forte e piu attrattiva.',
  boardTitle: 'Alcuni numeri',
  boardDescription:
    'Un quadro sintetico che aiuta a leggere esperienza, continuita operativa e capacita di trasformare immobili con criterio.',
  boardMetrics: [
    { value: '30%', label: 'ROI medio', detail: 'Operazioni selezionate con margini sostenibili.' },
    { value: '6M+', label: 'Euro investiti', detail: 'Capitale movimentato nelle operazioni concluse e in corso.' },
    { value: '50+', label: 'Appartamenti realizzati', detail: 'Rigenerazioni, frazionamenti e riconversioni concluse.' },
    { value: '5.000+', label: 'Metri cubi riqualificati', detail: 'Recupero volumetrico e nuova qualita degli spazi.' },
  ] as StatItem[],
  portfolioNote:
    'Su richiesta condividiamo approfondimenti sui progetti conclusi, sul nostro metodo di analisi e sulle opportunita attualmente in valutazione.',
  showcaseCta: {
    label: 'Richiedi maggiori informazioni',
    href: routes.invest,
  },
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Calabritto',
    location: 'Roma',
    status: 'Concluso',
    assetType: 'Riqualificazione residenziale',
    beforeImage: './portfolio/calabritto-prima.jpeg',
    afterImage: './portfolio/calabritto-dopo.jpeg',
    description:
      'Un intervento pensato per riscrivere il carattere dell immobile, migliorarne la leggibilita e presentarlo sul mercato con una presenza piu pulita, piu elegante e piu convincente.',
    metrics: [
      { label: 'Intervento', value: 'Frazionamento e restyling' },
      { label: 'Durata', value: '11 mesi' },
      { label: 'Esito', value: 'Concluso', accent: true },
    ],
    highlights: ['Spazi ridefiniti', 'Immagine piu contemporanea', 'Maggiore appetibilita commerciale'],
  },
  {
    id: 2,
    title: 'Graf',
    location: 'Roma',
    status: 'Concluso',
    assetType: 'Valorizzazione residenziale',
    beforeImage: './portfolio/graf-prima.jpeg',
    afterImage: './portfolio/graf-dopo.jpeg',
    description:
      'Un progetto di valorizzazione in cui materiali, atmosfera e distribuzione lavorano insieme per aumentare qualita percepita, desiderabilita e forza commerciale del bene.',
    metrics: [
      { label: 'Intervento', value: 'Riqualificazione completa' },
      { label: 'Durata', value: '9 mesi' },
      { label: 'Esito', value: 'Concluso', accent: true },
    ],
    highlights: ['Look piu premium', 'Maggiore chiarezza distributiva', 'Prodotto finale piu competitivo'],
  },
  {
    id: 3,
    title: 'Monte Gennaro',
    location: 'Roma',
    status: 'Concluso',
    assetType: 'Rigenerazione architettonica',
    beforeImage: './portfolio/monte-gennaro-prima.jpeg',
    afterImage: './portfolio/monte-gennaro-dopo.jpeg',
    description:
      'Una trasformazione costruita per restituire all immobile un immagine piu netta, ordinata e contemporanea, capace di comunicarne meglio il valore fin dal primo sguardo.',
    metrics: [
      { label: 'Intervento', value: 'Re-design distributivo' },
      { label: 'Durata', value: '10 mesi' },
      { label: 'Esito', value: 'Concluso', accent: true },
    ],
    highlights: ['Spazi razionalizzati', 'Percezione di maggiore qualita', 'Nuovo posizionamento sul mercato'],
  },
  {
    id: 4,
    title: 'Universita',
    location: 'Roma',
    status: 'Concluso',
    assetType: 'Upgrade residenziale',
    beforeImage: './portfolio/universita-prima.jpeg',
    afterImage: './portfolio/universita-dopo.jpeg',
    description:
      'Un intervento di upgrade che ha reso l immobile piu pulito, piu coerente e piu competitivo, avvicinandolo con decisione agli standard richiesti dal mercato attuale.',
    metrics: [
      { label: 'Intervento', value: 'Restyling e valorizzazione' },
      { label: 'Durata', value: '8 mesi' },
      { label: 'Esito', value: 'Concluso', accent: true },
    ],
    highlights: ['Immagine piu pulita', 'Migliore esperienza spaziale', 'Valore percepito piu alto'],
  },
];

export const invest = {
  badge: 'Investi con noi',
  title: 'Operazioni immobiliari strutturate, trasparenti e orientate alla creazione di valore reale.',
  intro:
    'Investire con Leone Group Immobiliare significa accedere a operazioni selezionate con criterio, seguite con attenzione e costruite per generare valore reale.',
  description:
    'Selezioniamo immobili con potenziale di rivalutazione, sviluppiamo progetti di riqualificazione, frazionamento e riconversione e presidiamo ogni fase per ridurre dispersioni e aumentare la qualita dell esecuzione.',
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
    'Accesso a opportunita selezionate normalmente riservate a operatori del settore.',
    'Gestione completa senza impegno operativo diretto.',
    'Business plan chiari, dettagliati e verificabili.',
    'Controllo diretto di tempi, costi e qualita esecutiva.',
    'Allineamento di interessi grazie alla partecipazione diretta del gruppo nelle operazioni.',
    'Esperienza concreta e relazioni costruite su trasparenza, affidabilita e risultati.',
  ],
  formTitle: 'Richiedi il dossier investitore',
  formDescription:
    'Lascia i tuoi riferimenti per ricevere una prima presentazione riservata, conoscere il nostro approccio operativo e valutare il profilo di investimento piu adatto.',
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
    'Un servizio dedicato ai proprietari che vogliono capire velocemente come vendere meglio, valorizzare di piu o attivare una trattativa concreta sul proprio immobile a Roma.',
  description:
    'Analizziamo immobili di grande metratura o con potenziale di riqualificazione, frazionamento e riposizionamento sul mercato. A seconda del caso possiamo proporre acquisto diretto, vendita tramite i nostri canali o un percorso di valorizzazione mirata.',
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
    'Ogni richiesta viene analizzata con attenzione per offrire una risposta rapida, riservata e coerente con le caratteristiche dell immobile e con il suo reale potenziale di valorizzazione.',
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
        placeholder: 'Es. Via Roma 25, Roma',
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
    addressLine1: 'Roma',
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
