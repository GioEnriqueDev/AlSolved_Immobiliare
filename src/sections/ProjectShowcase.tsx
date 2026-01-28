import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, MapPin, Eye } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import SpotlightCard from '../components/custom/SpotlightCard';
import TextReveal from '../components/custom/TextReveal';

interface Project {
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

const projects: Project[] = [
  {
    id: 1,
    title: 'Residenze Metropolitane',
    location: 'Milano, Lombardia',
    beforeImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    investment: '€12,5M',
    roi: '42%',
    timeline: '18 mesi',
    description: 'Trasformazione completa di un magazzino storico in 24 unità residenziali di lusso.',
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
    description: 'Riqualificazione fronte mare con servizi premium e tecnologia smart home.',
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
    description: 'Restauro di palazzi storici preservando il patrimonio architettonico con lusso moderno.',
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
    description: 'Sviluppo multi-fase di 12 ville esclusive con vista panoramica sulla città.',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showAfter, setShowAfter] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(rotation.x, springConfig);
  const rotateY = useSpring(rotation.y, springConfig);

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[85vw] md:w-[600px] lg:w-[700px] perspective-1000"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full glass rounded-3xl overflow-hidden preserve-3d border border-white/10"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image Container */}
        <div className="relative h-[400px] md:h-[450px] overflow-hidden">
          {/* Before Image */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: showAfter ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={project.beforeImage}
              alt={`${project.title} - Prima`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full">
              <span className="text-xs text-white uppercase tracking-wider">Prima</span>
            </div>
          </motion.div>

          {/* After Image */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: showAfter ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={project.afterImage}
              alt={`${project.title} - Dopo`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full bg-gold-500/20">
              <span className="text-xs text-gold-300 uppercase tracking-wider">Dopo</span>
            </div>
          </motion.div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 0.9 : 0.6 }}
          />

          {/* Toggle Button */}
          <motion.button
            className="absolute top-4 right-4 w-12 h-12 glass rounded-full flex items-center justify-center border border-white/20"
            onClick={() => setShowAfter(!showAfter)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-5 h-5 text-white" />
          </motion.button>

          {/* View Case Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-gold-500 flex items-center justify-center cursor-pointer shadow-glow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-charcoal-950 text-sm font-semibold">Vedi Case</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-charcoal-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{project.location}</span>
              </div>
            </div>
          </div>

          <p className="text-charcoal-300 text-sm mb-6 line-clamp-2">
            {project.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <SpotlightCard className="glass rounded-xl p-3 border border-white/5">
              <div className="text-gold-400 text-lg font-display font-bold">
                {project.investment}
              </div>
              <div className="text-charcoal-500 text-xs uppercase tracking-wider">Investimento</div>
            </SpotlightCard>
            <SpotlightCard className="glass rounded-xl p-3 border border-white/5">
              <div className="text-green-400 text-lg font-display font-bold">
                {project.roi}
              </div>
              <div className="text-charcoal-500 text-xs uppercase tracking-wider">ROI</div>
            </SpotlightCard>
            <SpotlightCard className="glass rounded-xl p-3 border border-white/5">
              <div className="text-white text-lg font-display font-bold">
                {project.timeline}
              </div>
              <div className="text-charcoal-500 text-xs uppercase tracking-wider">Durata</div>
            </SpotlightCard>
          </div>

          {/* CTA */}
          <MagneticButton
            className="w-full group py-3 glass rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            <span className="flex items-center justify-center gap-2">
              Vedi Case Study Completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </MagneticButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-charcoal-950"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[150px]" />
        </div>

        {/* Header */}
        <div className="relative z-10 pt-24 px-6 sm:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 border border-gold-500/20">
                  <span className="text-gold-300 text-xs tracking-[0.2em] uppercase">Portfolio</span>
                </div>

                <TextReveal>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                    Progetti{' '}
                    <span className="text-gradient">in Evidenza</span>
                  </h2>
                </TextReveal>
              </div>

              <p className="text-charcoal-300 text-lg max-w-md">
                Esplora i nostri progetti di riqualificazione trasformativa che hanno
                ridefinito il concetto di abitare di lusso e consegnato rendimenti eccezionali.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Scroll */}
        <div className="relative z-10 h-full flex items-center">
          <motion.div
            ref={scrollRef}
            className="flex gap-6 md:gap-8 pl-6 sm:pl-12 lg:pl-24 pr-24"
            style={{ x: springX }}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}

            {/* View All Card */}
            <motion.div
              className="flex-shrink-0 w-[300px] md:w-[400px] h-[500px] md:h-[600px] flex items-center justify-center"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 rounded-full glass flex items-center justify-center cursor-pointer border border-white/10"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(201, 144, 46, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-8 h-8 text-gold-400" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Vedi Tutti i Progetti
                </h3>
                <p className="text-charcoal-400">
                  Scopri il nostro portfolio completo
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <div className="w-48 h-1 bg-charcoal-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
