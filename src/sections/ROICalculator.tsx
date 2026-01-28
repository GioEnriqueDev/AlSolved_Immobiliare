import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, DollarSign, Percent, Calendar, ArrowRight, Sparkles, Euro } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import SpotlightCard from '../components/custom/SpotlightCard';
import GlowingBorder from '../components/custom/GlowingBorder';
import TextReveal from '../components/custom/TextReveal';

const ROICalculator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const [investment, setInvestment] = useState(500000);
  const [years, setYears] = useState(5);
  const [roiRate, setRoiRate] = useState(35);

  // Calculate projections
  const projectedValue = investment * Math.pow(1 + roiRate / 100, years);
  const totalReturn = projectedValue - investment;

  // Animated values
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

  // Generate chart data points
  const generateChartData = () => {
    const points = [];
    for (let i = 0; i <= years; i++) {
      const value = investment * Math.pow(1 + roiRate / 100, i);
      points.push({ year: i, value });
    }
    return points;
  };

  const chartData = generateChartData();
  const maxValue = Math.max(...chartData.map(d => d.value));

  // SVG chart path
  const chartPath = chartData.map((point, index) => {
    const x = (index / (chartData.length - 1)) * 100;
    const y = 100 - (point.value / maxValue) * 80 - 10;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Area path for gradient fill
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
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-gold-500/20">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-gold-300 text-xs tracking-[0.2em] uppercase">Calcolatore Investimenti</span>
          </div>

          <TextReveal delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Calcola i Tuoi{' '}
              <span className="text-gradient">Rendimenti</span>
            </h2>
          </TextReveal>

          <p className="text-charcoal-300 text-lg max-w-2xl mx-auto">
            Scopri come cresce il tuo investimento con la nostra strategia di riqualificazione.
            Regola i parametri per esplorare diversi scenari.
          </p>
        </motion.div>

        {/* Calculator Grid */}
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
                      <label className="text-white font-medium">Importo Investimento</label>
                      <p className="text-charcoal-400 text-sm">Capitale iniziale</p>
                    </div>
                  </div>
                  <motion.span
                    className="text-2xl font-display font-bold text-gold-400"
                  >
                    {useTransform(animatedInvestment, v => formatCurrency(v))}
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="50000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-charcoal-500 mt-2">
                  <span>€100K</span>
                  <span>€2M</span>
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
                      <label className="text-white font-medium">Periodo Investimento</label>
                      <p className="text-charcoal-400 text-sm">Anni fino all'uscita</p>
                    </div>
                  </div>
                  <span className="text-2xl font-display font-bold text-gold-400">
                    {years} anni
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-charcoal-500 mt-2">
                  <span>1 anno</span>
                  <span>10 anni</span>
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
                      <label className="text-white font-medium">ROI Previsto</label>
                      <p className="text-charcoal-400 text-sm">Tasso di rendimento annuo</p>
                    </div>
                  </div>
                  <span className="text-2xl font-display font-bold text-gold-400">
                    {roiRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={roiRate}
                  onChange={(e) => setRoiRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-charcoal-500 mt-2">
                  <span>10%</span>
                  <span>50%</span>
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
            {/* Results Cards */}
            <div className="grid grid-cols-2 gap-4">
              <GlowingBorder className="glass rounded-2xl p-6" borderRadius="1rem">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-gold-400" />
                  <span className="text-charcoal-400 text-sm">Valore Proiettato</span>
                </div>
                <motion.div className="text-2xl md:text-3xl font-display font-bold text-white">
                  {useTransform(animatedProjected, v => formatCurrency(v))}
                </motion.div>
              </GlowingBorder>

              <SpotlightCard className="glass rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Euro className="w-4 h-4 text-green-400" />
                  <span className="text-charcoal-400 text-sm">Rendimento Totale</span>
                </div>
                <motion.div className="text-2xl md:text-3xl font-display font-bold text-green-400">
                  {useTransform(animatedReturn, v => `+${formatCurrency(v)}`)}
                </motion.div>
              </SpotlightCard>
            </div>

            {/* Chart */}
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
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c9902e" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#c9902e" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
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

                    {/* Area fill */}
                    <motion.path
                      d={areaPath}
                      fill="url(#chartGradient)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />

                    {/* Line */}
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

                    {/* Data points */}
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

                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-charcoal-500">
                    {chartData.filter((_, i) => i % 2 === 0).map((point, index) => (
                      <span key={index}>Anno {point.year}</span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <MagneticButton
                className="w-full group relative py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-950 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Inizia il Tuo Percorso di Investimento
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
