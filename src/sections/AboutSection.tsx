import { about } from '../data/siteContent';

const AboutSection = () => {
  return (
    <section className="relative py-24 px-6 sm:px-12 lg:px-24 bg-charcoal-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr,1fr] gap-12 items-start">
          <div>
            <p className="text-gold-300 text-xs tracking-[0.2em] uppercase mb-4">{about.headline}</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">{about.title}</h2>
            <p className="text-charcoal-300 text-lg leading-relaxed">{about.intro}</p>
          </div>

          <div className="space-y-4">
            {about.highlights.map((highlight) => (
              <div key={highlight} className="glass rounded-2xl p-6 border border-white/10">
                <p className="text-charcoal-200">{highlight}</p>
              </div>
            ))}

            <p className="text-charcoal-400 text-sm">{about.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
