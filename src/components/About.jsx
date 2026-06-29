import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="que-es-mnw"
      className="bg-brand-dark py-24 sm:py-32 px-6 sm:px-12 flex flex-col items-center justify-center text-center relative overflow-hidden"
    >
      {/* Subtle background glow decorative elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-brand-accent-light/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-8 z-10">
        {/* Section Tag */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="block font-sans text-xs sm:text-sm font-bold tracking-widest text-brand-accent uppercase"
        >
          ¿Qué es MNW?
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          Una marca registrada que transforma contactos en negocios
        </motion.h2>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-20 h-[2px] bg-brand-accent mx-auto origin-center"
        />

        {/* Paragraph Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-base sm:text-lg text-brand-cream/80 leading-relaxed"
        >
          MNW Marca Networking opera un sistema empresarial serio donde los contactos no quedan en tarjetas olvidadas. Cada plaza funciona con una estructura clara, sesiones semanales de networking y un método que genera referidos calificados, alianzas estratégicas y crecimiento real para tu empresa.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          <a
            href="#beneficios"
            className="w-full sm:w-auto px-8 py-4 bg-brand-cream hover:bg-brand-cream-dark text-brand-dark font-sans text-xs font-bold tracking-widest uppercase rounded-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Descubrir Beneficios
          </a>
          
          <a
            href="#plazas"
            className="w-full sm:w-auto px-8 py-4 border border-white/30 hover:border-white hover:bg-white/5 text-white font-sans text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Ver Plazas Activas
          </a>
        </motion.div>
      </div>
    </section>
  );
}
