import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Euro,
  FileText,
  Percent,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import { calculator, invest } from '../data/siteContent';
import { useIsMobile } from '../hooks/use-mobile';

const ROICalculator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();

  const [investment, setInvestment] = useState(500000);
  const [years, setYears] = useState(4);
  const [roiRate, setRoiRate] = useState(30);
  const [investorForm, setInvestorForm] = useState({
    name: '',
    email: '',
    phone: '',
    capital: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const projectedValue = investment * Math.pow(1 + roiRate / 100, years);
  const totalReturn = projectedValue - investment;

  const animatedInvestment = useSpring(investment, { stiffness: 100, damping: 30 });
  const animatedProjected = useSpring(projectedValue, { stiffness: 100, damping: 30 });
  const animatedReturn = useSpring(totalReturn, { stiffness: 100, damping: 30 });

  useEffect(() => {
    animatedInvestment.set(investment);
    animatedProjected.set(projectedValue);
    animatedReturn.set(totalReturn);
  }, [investment, projectedValue, totalReturn, animatedInvestment, animatedProjected, animatedReturn]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const formattedInvestment = useTransform(animatedInvestment, formatCurrency);
  const formattedProjected = useTransform(animatedProjected, formatCurrency);
  const formattedReturn = useTransform(animatedReturn, (value) => `+${formatCurrency(value)}`);

  const chartData = useMemo(
    () =>
      Array.from({ length: years + 1 }, (_, index) => ({
        year: index,
        value: investment * Math.pow(1 + roiRate / 100, index),
      })),
    [investment, roiRate, years]
  );

  const maxValue = useMemo(() => Math.max(...chartData.map((point) => point.value)), [chartData]);

  const chartPath = useMemo(
    () =>
      chartData
        .map((point, index) => {
          const x = chartData.length === 1 ? 0 : (index / (chartData.length - 1)) * 100;
          const y = 100 - (point.value / maxValue) * 78 - 10;
          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        })
        .join(' '),
    [chartData, maxValue]
  );

  const areaPath = `${chartPath} L 100 100 L 0 100 Z`;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const isValid =
      investorForm.name.trim() &&
      investorForm.email.trim() &&
      investorForm.capital.trim() &&
      investorForm.message.trim();

    setStatus(isValid ? 'success' : 'error');

    if (isValid) {
      setInvestorForm({
        name: '',
        email: '',
        phone: '',
        capital: '',
        message: '',
      });
    }
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-charcoal-950 px-6 py-24 sm:px-12 lg:px-24">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-gold-500/5 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-gold-500/5 blur-[170px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-4xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.26em] text-gold-300">{invest.badge}</p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">{invest.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal-300 sm:mt-6 sm:text-lg">{invest.intro}</p>
          <p className="mt-4 text-base leading-relaxed text-charcoal-400">{invest.description}</p>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[0.92fr,1.08fr]">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid gap-4 md:grid-cols-3 xl:grid-cols-1"
            >
              {invest.pillars.map((pillar, index) => {
                const Icon = [ShieldCheck, BarChart3, FileText][index] ?? ShieldCheck;

                return (
                  <div key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500/15">
                      <Icon className="h-5 w-5 text-gold-400" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-white">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal-400">{pillar.text}</p>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-[2rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-gold-300">{invest.operatingTitle}</p>
              <div className="mt-6 space-y-4">
                {invest.operatingSteps.map((step, index) => (
                  <div key={step} className="grid gap-3 rounded-2xl border border-white/5 bg-charcoal-900/75 p-4 sm:grid-cols-[56px,1fr]">
                    <div className="font-display text-2xl font-bold text-gold-400">{`0${index + 1}`}</div>
                    <p className="text-sm leading-relaxed text-charcoal-300">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-[2rem] border border-white/10 bg-charcoal-900/70 p-6 sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-gold-300">{invest.advantagesTitle}</p>
              <div className="mt-6 grid gap-3">
                {invest.advantages.map((advantage) => (
                  <div key={advantage} className="flex gap-3 rounded-2xl border border-white/5 bg-white/5 p-4">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gold-400" />
                    <p className="text-sm leading-relaxed text-charcoal-300">{advantage}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="rounded-[2rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl sm:p-8"
            >
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2">
                  <TrendingUp className="h-4 w-4 text-gold-400" />
                  <span className="text-xs uppercase tracking-[0.2em] text-gold-300">{calculator.badge}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-white sm:text-4xl">
                  {calculator.title} <span className="text-gradient">{calculator.titleAccent}</span>
                </h3>
                <p className="mt-4 text-base leading-relaxed text-charcoal-300">{calculator.description}</p>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-400">{calculator.subtitle}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-charcoal-500">{calculator.guidance}</p>
              </div>

              <div className="grid gap-5">
                <div className="rounded-3xl border border-white/10 bg-charcoal-900/70 p-5">
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15">
                        <Euro className="h-5 w-5 text-gold-400" />
                      </div>
                      <div>
                        <label htmlFor="investment" className="font-medium text-white">
                          {calculator.labels.amount.label}
                        </label>
                        <p className="text-sm text-charcoal-400">{calculator.labels.amount.description}</p>
                      </div>
                    </div>
                    <motion.span className="text-xl font-display font-bold text-gold-400 sm:text-2xl">{formattedInvestment}</motion.span>
                  </div>
                  <input
                    id="investment"
                    type="range"
                    min={calculator.labels.amount.format.min}
                    max={calculator.labels.amount.format.max}
                    step="50000"
                    value={investment}
                    onChange={(event) => setInvestment(Number(event.target.value))}
                    className="w-full"
                    aria-label="Regola l importo dell investimento"
                  />
                  <div className="mt-2 flex justify-between text-xs text-charcoal-500">
                    <span>{calculator.labels.amount.minLabel}</span>
                    <span>{calculator.labels.amount.maxLabel}</span>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-charcoal-900/70 p-5">
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15">
                        <Calendar className="h-5 w-5 text-gold-400" />
                      </div>
                      <div>
                        <label htmlFor="years" className="font-medium text-white">
                          {calculator.labels.years.label}
                        </label>
                        <p className="text-sm text-charcoal-400">{calculator.labels.years.description}</p>
                      </div>
                    </div>
                    <span className="text-xl font-display font-bold text-gold-400 sm:text-2xl">{years} anni</span>
                  </div>
                  <input
                    id="years"
                    type="range"
                    min={calculator.labels.years.format.min}
                    max={calculator.labels.years.format.max}
                    step="1"
                    value={years}
                    onChange={(event) => setYears(Number(event.target.value))}
                    className="w-full"
                    aria-label="Regola l orizzonte temporale"
                  />
                  <div className="mt-2 flex justify-between text-xs text-charcoal-500">
                    <span>{calculator.labels.years.minLabel}</span>
                    <span>{calculator.labels.years.maxLabel}</span>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-charcoal-900/70 p-5">
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15">
                        <Percent className="h-5 w-5 text-gold-400" />
                      </div>
                      <div>
                        <label htmlFor="roi" className="font-medium text-white">
                          {calculator.labels.roi.label}
                        </label>
                        <p className="text-sm text-charcoal-400">{calculator.labels.roi.description}</p>
                      </div>
                    </div>
                    <span className="text-xl font-display font-bold text-gold-400 sm:text-2xl">{roiRate}%</span>
                  </div>
                  <input
                    id="roi"
                    type="range"
                    min={calculator.labels.roi.format.min}
                    max={calculator.labels.roi.format.max}
                    step="2"
                    value={roiRate}
                    onChange={(event) => setRoiRate(Number(event.target.value))}
                    className="w-full"
                    aria-label="Regola il ROI previsto"
                  />
                  <div className="mt-2 flex justify-between text-xs text-charcoal-500">
                    <span>{calculator.labels.roi.minLabel}</span>
                    <span>{calculator.labels.roi.maxLabel}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center gap-2 text-charcoal-400">
                    <TrendingUp className="h-4 w-4 text-gold-400" />
                    <span className="text-sm">Valore proiettato</span>
                  </div>
                  <motion.div className="text-2xl font-display font-bold text-white sm:text-3xl">{formattedProjected}</motion.div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-2 flex items-center gap-2 text-charcoal-400">
                    <Euro className="h-4 w-4 text-gold-400" />
                    <span className="text-sm">Rendimento totale</span>
                  </div>
                  <motion.div className="text-2xl font-display font-bold text-gold-400 sm:text-3xl">{formattedReturn}</motion.div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-charcoal-900/75 p-5">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="text-lg font-medium text-white">Proiezione di crescita</h4>
                  <div className="flex items-center gap-2 text-sm text-charcoal-400">
                    <div className="h-3 w-3 rounded-full bg-gold-500" />
                    <span>Valore</span>
                  </div>
                </div>

                <div className="relative h-56 w-full sm:h-64">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                    <defs>
                      <linearGradient id="investChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c9902e" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#c9902e" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {[0, 25, 50, 75, 100].map((line) => (
                      <line
                        key={line}
                        x1="0"
                        y1={line}
                        x2="100"
                        y2={line}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="0.6"
                      />
                    ))}

                    <motion.path
                      d={areaPath}
                      fill="url(#investChartGradient)"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : undefined}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />

                    <motion.path
                      d={chartPath}
                      fill="none"
                      stroke="#c9902e"
                      strokeWidth="0.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : undefined}
                      transition={{ duration: 1.2, delay: 0.25, ease: 'easeInOut' }}
                    />

                    {chartData.map((point, index) => {
                      const x = chartData.length === 1 ? 0 : (index / (chartData.length - 1)) * 100;
                      const y = 100 - (point.value / maxValue) * 78 - 10;

                      return (
                        <motion.circle
                          key={`${point.year}-${point.value}`}
                          cx={x}
                          cy={y}
                          r="1.6"
                          fill="#f2e0b0"
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : undefined}
                          transition={{ duration: 0.25, delay: 0.45 + index * 0.08 }}
                        />
                      );
                    })}
                  </svg>

                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[11px] text-charcoal-500 sm:text-xs">
                    {chartData.map((point, index) => (
                      <span
                        key={point.year}
                        className={isMobile && index !== 0 && index !== chartData.length - 1 && index % 2 !== 0 ? 'hidden' : ''}
                      >
                        {`Anno ${point.year}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <MagneticButton
                  href="#investor-name"
                  className="group w-full rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 py-4 font-semibold text-charcoal-950"
                  aria-label="Prenota una call con il team"
                >
                  <span className="flex items-center justify-center gap-2">
                    {calculator.ctaLabel}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </MagneticButton>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.22 }}
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
              noValidate
            >
              <h3 className="font-display text-2xl font-bold text-white">{invest.formTitle}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-400">{invest.formDescription}</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="block text-sm" htmlFor="investor-name">
                  <span className="text-charcoal-300">Nome e cognome</span>
                  <input
                    id="investor-name"
                    type="text"
                    value={investorForm.name}
                    placeholder="Es. Mario Bianchi"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-charcoal-900 px-4 py-3 text-white outline-none ring-gold-400 focus-visible:ring-2"
                    onChange={(event) => setInvestorForm((current) => ({ ...current, name: event.target.value }))}
                    required
                  />
                </label>

                <label className="block text-sm" htmlFor="investor-email">
                  <span className="text-charcoal-300">Email</span>
                  <input
                    id="investor-email"
                    type="email"
                    value={investorForm.email}
                    placeholder="nome@email.it"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-charcoal-900 px-4 py-3 text-white outline-none ring-gold-400 focus-visible:ring-2"
                    onChange={(event) => setInvestorForm((current) => ({ ...current, email: event.target.value }))}
                    required
                  />
                </label>

                <label className="block text-sm" htmlFor="investor-phone">
                  <span className="text-charcoal-300">Telefono</span>
                  <input
                    id="investor-phone"
                    type="tel"
                    value={investorForm.phone}
                    placeholder="+39 333 1234567"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-charcoal-900 px-4 py-3 text-white outline-none ring-gold-400 focus-visible:ring-2"
                    onChange={(event) => setInvestorForm((current) => ({ ...current, phone: event.target.value }))}
                  />
                </label>

                <label className="block text-sm" htmlFor="investor-capital">
                  <span className="text-charcoal-300">Capitale indicativo</span>
                  <input
                    id="investor-capital"
                    type="text"
                    value={investorForm.capital}
                    placeholder="Es. EUR 250.000"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-charcoal-900 px-4 py-3 text-white outline-none ring-gold-400 focus-visible:ring-2"
                    onChange={(event) => setInvestorForm((current) => ({ ...current, capital: event.target.value }))}
                    required
                  />
                </label>
              </div>

              <label className="mt-4 block text-sm" htmlFor="investor-message">
                <span className="text-charcoal-300">Messaggio</span>
                <textarea
                  id="investor-message"
                  rows={4}
                  value={investorForm.message}
                  placeholder="Indicaci il tuo profilo, l orizzonte temporale e il tipo di operazioni che ti interessano."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-charcoal-900 px-4 py-3 text-white outline-none ring-gold-400 focus-visible:ring-2"
                  onChange={(event) => setInvestorForm((current) => ({ ...current, message: event.target.value }))}
                  required
                />
              </label>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="rounded-2xl bg-gold-500 px-6 py-3 font-semibold text-charcoal-950 transition hover:shadow-glow"
                >
                  Ricevi il dossier
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
                    ? 'Richiesta inviata. Ti ricontatteremo con una prima presentazione riservata.'
                    : status === 'error'
                      ? 'Compila almeno nome, email, capitale indicativo e messaggio.'
                      : 'I dati sono utilizzati esclusivamente per ricontattarti in merito alle opportunita di investimento.'}
                </p>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
