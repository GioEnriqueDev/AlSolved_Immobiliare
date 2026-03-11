import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, Percent, Calendar, ArrowRight, Sparkles, Euro } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import SpotlightCard from '../components/custom/SpotlightCard';
import GlowingBorder from '../components/custom/GlowingBorder';
import TextReveal from '../components/custom/TextReveal';
import { calculator } from '../data/siteContent';

const ROICalculator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const [investment, setInvestment] = useState(500000);
  const [years, setYears] = useState(5);
  const [roiRate, setRoiRate] = useState(35);

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartData = useMemo(() => {
    const points = [];
    for (let i = 0; i <= years; i++) {
      const value = investment * Math.pow(1 + roiRate / 100, i);
      points.push({ year: i, value });
    }
    return points;
  }, [investment, roiRate, years]);

  const maxValue = useMemo(() => Math.max(...chartData.map((d) => d.value)), [chartData]);

  const chartPath = useMemo(
    () =>
      chartData
        .map((point, index) => {
          const x = (index / (chartData.length - 1)) * 100;
          const y = 100 - (point.value / maxValue) * 80 - 10;
          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        })
        .join(' '),
    [chartData, maxValue]
  );

  const areaPath = `${chartPath} L 100 100 L 0 100 Z`;

  const sliderVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.15,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full py-24 px-6 sm:px-12 lg:px-24 bg-charcoal-950 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-gold-500/20">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-gold-300 text-xs tracking-[0.2em] uppercase">{calculator.badge}</span>
          </div>

          <TextReveal delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {calculator.title} <span className="text-gradient">{calculator.titleAccent}</span>
            </h2>
          </TextReveal>

          <p className="text-charcoal-300 text-lg max-w-2xl mx-auto mb-3">{calculator.description}</p>
          <p className="text-charcoal-400 text-sm max-w-2xl mx-auto">{calculator.subtitle}</p>
          <p className="text-charcoal-500 text-xs uppercase tracking-[0.18em] mt-4">{calculator.guidance}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Controls */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Investment Amount Slider */}
            <motion.div
              custom={0}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={sliderVariants}
            >
              <SpotlightCard className="glass rounded-2xl p-6 md:p-8 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                      <Euro className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <label htmlFor="investment" className="text-white font-medium">
                        {calculator.labels.amount.label}
                      </label>
                      <p className="text-charcoal-400 text-sm">{calculator.labels.amount.description}</p>
                    </div>
                  </div>
                  <motion.span className="text-2xl font-display font-bold text-gold-400">
                    {useTransform(animatedInvestment, (v) => formatCurrency(v))}
                  </motion.span>
                </div>
                <input
                  id="investment"
                  type="range"
                  min={calculator.labels.amount.format.min}
                  max={calculator.labels.amount.format.max}
                  step="50000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full"
                  aria-label="Regola l'importo dell'investimento"
                />
                <div className="flex justify-between text-xs text-charcoal-500 mt-2">
                  <span>{calculator.labels.amount.minLabel}</span>
                  <span>{calculator.labels.amount.maxLabel}</span>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Investment Period Slider */}
            <motion.div
              custom={1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={sliderVariants}
            >
              <SpotlightCard className="glass rounded-2xl p-6 md:p-8 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <label htmlFor="years" className="text-white font-medium">
                        {calculator.labels.years.label}
                      </label>
                      <p className="text-charcoal-400 text-sm">{calculator.labels.years.description}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-display font-bold text-gold-400">{years} anni</span>
                </div>
                <input
                  id="years"
                  type="range"
                  min={calculator.labels.years.format.min}
                  max={calculator.labels.years.format.max}
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full"
                  aria-label="Regola la durata dell'investimento"
                />
                <div className="flex justify-between text-xs text-charcoal-500 mt-2">
                  <span>{calculator.labels.years.minLabel}</span>
                  <span>{calculator.labels.years.maxLabel}</span>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* ROI Rate Slider */}
            <motion.div
              custom={2}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={sliderVariants}
            >
              <SpotlightCard className="glass rounded-2xl p-6 md:p-8 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                      <Percent className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <label htmlFor="roi" className="text-white font-medium">
                        {calculator.labels.roi.label}
                      </label>
                      <p className="text-charcoal-400 text-sm">{calculator.labels.roi.description}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-display font-bold text-gold-400">{roiRate}%</span>
                </div>
                <input
                  id="roi"
                  type="range"
                  min={calculator.labels.roi.format.min}
                  max={calculator.labels.roi.format.max}
                  step="5"
                  value={roiRate}
                  onChange={(e) => setRoiRate(Number(e.target.value))}
                  className="w-full"
                  aria-label="Regola il ROI previsto"
                />
                <div className="flex justify-between text-xs text-charcoal-500 mt-2">
                  <span>{calculator.labels.roi.minLabel}</span>
                  <span>{calculator.labels.roi.maxLabel}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>

          {/* Right: Results & Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <GlowingBorder className="glass rounded-2xl p-6" borderRadius="1rem">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-gold-400" />
                  <span className="text-charcoal-400 text-sm">Valore Proiettato</span>
                </div>
                <motion.div className="text-2xl md:text-3xl font-display font-bold text-white">
                  {useTransform(animatedProjected, (v) => formatCurrency(v))}
                </motion.div>
              </GlowingBorder>

              <SpotlightCard className="glass rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Euro className="w-4 h-4 text-green-400" />
                  <span className="text-charcoal-400 text-sm">Rendimento Totale</span>
                </div>
                <motion.div className="text-2xl md:text-3xl font-display font-bold text-green-400">
                  {useTransform(animatedReturn, (v) => `+${formatCurrency(v)}`)}
                </motion.div>
              </SpotlightCard>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <SpotlightCard className="glass rounded-2xl p-6 md:p-8 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-medium">Proiezione di Crescita</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gold-500" />
                    <span className="text-charcoal-400 text-sm">Valore</span>
                  </div>
                </div>

                <div className="relative h-64 w-full">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c9902e" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#c9902e" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {[0, 25, 50, 75, 100].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="100"
                        y2={y}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="0.5"
                      />
                    ))}

                    <motion.path
                      d={areaPath}
                      fill="url(#chartGradient)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />

                    <motion.path
                      d={chartPath}
                      fill="none"
                      stroke="#c9902e"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
                    />

                    {chartData.map((point, index) => {
                      const x = (index / (chartData.length - 1)) * 100;
                      const y = 100 - (point.value / maxValue) * 80 - 10;
                      return (
                        <motion.circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="1.5"
                          fill="#c9902e"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                        />
                      );
                    })}
                  </svg>

                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-charcoal-500">
                    {chartData
                      .filter((_, i) => i % 2 === 0)
                      .map((point, index) => (
                        <span key={index}>Anno {point.year}</span>
                      ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <MagneticButton
                href="#contact"
                className="w-full group relative py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-950 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow"
                aria-label="Prenota una chiamata con i nostri consulenti"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {calculator.ctaLabel}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
