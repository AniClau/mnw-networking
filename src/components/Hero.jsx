import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col lg:flex-row bg-brand-cream overflow-hidden">
      {/* Left Content Column */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-32 lg:py-30 z-10 max-w-2xl lg:max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Subtitle */}
          <span className="block font-sans text-xs sm:text-sm font-bold tracking-widest text-brand-accent uppercase">
            Marca Registrada
          </span>

          {/* Heading */} 
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-dark leading-[1.1] tracking-tight">
            Networking <br />
            <span className="italic font-medium text-brand-accent-dark">Estructurado</span> <br />
            con Resultados
          </h1>

          {/* Description */}
          <p className="font-sans text-base sm:text-lg text-brand-dark/70 leading-relaxed max-w-lg">
            Somos una marca nacional registrada que conecta empresarios serios a través de un sistema de networking con método, comunidad y crecimiento real.
          </p>

          {/* Call to Actions */}
          <div className="flex items-center gap-4 pt-4">
            <a
              href="#contacto"
              className="px-8 py-4 bg-brand-dark hover:bg-brand-accent-dark text-brand-cream hover:text-white font-sans text-xs font-bold tracking-widest uppercase rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Quiero ser miembro
            </a>
            
            <a
              href="#que-es-mnw"
              className="p-4 border border-brand-dark/30 hover:border-brand-dark hover:bg-brand-dark/5 text-brand-dark rounded-sm transition-all duration-300"
              aria-label="Saber más"
            >
              <ArrowDown size={18} className="animate-bounce" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right Image Column */}
      <div className="flex-1 relative min-h-[40vh] lg:min-h-screen">
        <div className="absolute inset-0 bg-brand-dark/10 z-10" />
        <img
          src="/images/hero_meeting.png"
          alt="Reunión empresarial de networking MNW"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        {/* Decorative subtle gradient overlay for smooth layout blending */}
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-cream via-transparent to-transparent z-20 pointer-events-none lg:w-32 lg:h-full" />
      </div>
    </section>
  );
}
