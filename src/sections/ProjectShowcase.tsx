import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin, Eye } from 'lucide-react';
import MagneticButton from '../components/custom/MagneticButton';
import SpotlightCard from '../components/custom/SpotlightCard';
import TextReveal from '../components/custom/TextReveal';
import { projectSection, projects, type Project } from '../data/siteContent';

interface ProjectCardProps {
  project: Project;
  index: number;
  disableTilt: boolean;
}

const ProjectCard = ({ project, index, disableTilt }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showAfter, setShowAfter] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableTilt || !cardRef.current) return;

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
          rotateX: disableTilt ? 0 : rotateX,
          rotateY: disableTilt ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image Container */}
        <div className="relative h-[400px] md:h-[450px] overflow-hidden">
          <motion.div className="absolute inset-0" animate={{ opacity: showAfter ? 0 : 1 }} transition={{ duration: 0.5 }}>
            <img
              src={project.beforeImage}
              alt={`${project.title}: stato iniziale del progetto`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full">
              <span className="text-xs text-white uppercase tracking-wider">Prima</span>
            </div>
          </motion.div>

          <motion.div className="absolute inset-0" animate={{ opacity: showAfter ? 1 : 0 }} transition={{ duration: 0.5 }}>
            <img
              src={project.afterImage}
              alt={`${project.title}: stato dopo la riqualificazione`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full bg-gold-500/20">
              <span className="text-xs text-gold-300 uppercase tracking-wider">Dopo</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 0.9 : 0.6 }}
          />

          <motion.button
            type="button"
            className="absolute top-4 right-4 w-12 h-12 glass rounded-full flex items-center justify-center border border-white/20"
            onClick={() => setShowAfter(!showAfter)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Alterna stato prima/dopo per ${project.title}`}
          >
            <Eye className="w-5 h-5 text-white" aria-hidden="true" />
          </motion.button>

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
              <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">{project.title}</h3>
              <div className="flex items-center gap-2 text-charcoal-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{project.location}</span>
              </div>
            </div>
          </div>

          <p className="text-charcoal-300 text-sm mb-6 line-clamp-2">{project.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <SpotlightCard className="glass rounded-xl p-3 border border-white/5">
              <div className="text-gold-400 text-lg font-display font-bold">{project.investment}</div>
              <div className="text-charcoal-500 text-xs uppercase tracking-wider">Investimento</div>
            </SpotlightCard>
            <SpotlightCard className="glass rounded-xl p-3 border border-white/5">
              <div className="text-green-400 text-lg font-display font-bold">{project.roi}</div>
              <div className="text-charcoal-500 text-xs uppercase tracking-wider">ROI</div>
            </SpotlightCard>
            <SpotlightCard className="glass rounded-xl p-3 border border-white/5">
              <div className="text-white text-lg font-display font-bold">{project.timeline}</div>
              <div className="text-charcoal-500 text-xs uppercase tracking-wider">Durata</div>
            </SpotlightCard>
          </div>

          <MagneticButton
            href="#contact"
            className="w-full group py-3 glass rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300 border border-white/10"
            aria-label={`Richiedi il case study completo di ${project.title}`}
          >
            <span className="flex items-center justify-center gap-2">
              Vedi Case Study Completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
  const prefersReducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(() => (typeof window === 'undefined' ? false : window.matchMedia('(pointer: coarse)').matches));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');

    const handlePointerChange = (event: MediaQueryListEvent) => setIsTouchDevice(event.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handlePointerChange);
    } else {
      mediaQuery.addListener(handlePointerChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handlePointerChange);
      } else {
        mediaQuery.removeListener(handlePointerChange);
      }
    };
  }, []);

  const disableHorizontalMotion = prefersReducedMotion || isTouchDevice;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', disableHorizontalMotion ? '0%' : '-75%']);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-charcoal-950">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[150px]" />
        </div>

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
                  <span className="text-gold-300 text-xs tracking-[0.2em] uppercase">{projectSection.badge}</span>
                </div>
                <TextReveal>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                    {projectSection.title} <span className="text-gradient">{projectSection.highlight}</span>
                  </h2>
                </TextReveal>
              </div>
              <p className="text-charcoal-300 text-lg max-w-md">{projectSection.description}</p>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <motion.div
            ref={scrollRef}
            className="flex gap-6 md:gap-8 pl-6 sm:pl-12 lg:pl-24 pr-24"
            style={{ x: springX }}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} disableTilt={disableHorizontalMotion} />
            ))}

            <motion.a
              href={projectSection.showcaseCta.href}
              aria-label={projectSection.showcaseCta.label}
              className="flex-shrink-0 w-[300px] md:w-[400px] h-[500px] md:h-[600px] flex items-center justify-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-3xl"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ scale: disableHorizontalMotion ? 1 : 1.02 }}
            >
              <div>
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 rounded-full glass flex items-center justify-center border border-white/10"
                  whileHover={disableHorizontalMotion ? {} : { scale: 1.1, backgroundColor: 'rgba(201, 144, 46, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  aria-hidden="true"
                >
                  <ArrowRight className="w-8 h-8 text-gold-400" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {projectSection.showcaseCta.label}
                </h3>
                <p className="text-charcoal-400">Scopri il percorso completo dei risultati disponibili</p>
              </div>
            </motion.a>
          </motion.div>
        </div>

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
