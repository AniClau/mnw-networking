import { motion } from 'framer-motion';
import { Users, ClipboardList, Handshake, BookOpen, Volume2, Calendar } from 'lucide-react';

const benefitsList = [
  {
    icon: Users,
    title: 'Comunidad Activa',
    subtitle: 'Red de confianza',
    description: 'Forma parte de una red curada de empresarios comprometidos con el crecimiento mutuo. Conoce personas que realmente hacen negocios.',
  },
  {
    icon: ClipboardList,
    title: 'Método Probado',
    subtitle: 'Estructura clara',
    description: 'Sigue un sistema de networking con agenda, formatos y seguimiento. Cada sesión tiene objetivos claros y resultados medibles.',
  },
  {
    icon: Handshake,
    title: 'Referidos Calificados',
    subtitle: 'Oportunidades reales',
    description: 'Recibe y da referidos de negocio dentro de un círculo de confianza. Las recomendaciones son de calidad porque conocemos a los miembros.',
  },
  {
    icon: BookOpen,
    title: 'Capacitación Continua',
    subtitle: 'Siempre aprendiendo',
    description: 'Accede a talleres, mentorías y contenido exclusivo diseñado para potenciar tus habilidades de negocio y liderazgo.',
  },
  {
    icon: Volume2,
    title: 'Exposición de Marca',
    subtitle: 'Visibilidad empresarial',
    description: 'Presenta tu empresa ante otros empresarios activos. Cada sesión incluye espacio para que tu marca sea conocida.',
  },
  {
    icon: Calendar,
    title: 'Eventos Exclusivos',
    subtitle: 'Experiencias MNW',
    description: 'Participa en eventos especiales, cenas de negocios y actividades fuera de la rutina que fortalecen los lazos entre miembros.',
  },
];

export default function Benefits() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="beneficios" className="bg-brand-cream py-24 sm:py-32 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-left space-y-4 max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-brand-cream-dark text-brand-accent-dark font-sans text-xs font-semibold tracking-wider rounded-full uppercase">
            Beneficios
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight">
            ¿Por qué los empresarios eligen MNW?
          </h2>
        </div>

        {/* Benefit Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefitsList.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-white p-8 rounded-md shadow-[0_4px_20px_rgba(140,98,57,0.04)] border border-brand-cream-dark/30 hover:border-brand-accent/20 hover:shadow-[0_10px_30px_rgba(140,98,57,0.08)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Icon Wrapper */}
                  <div className="w-14 h-14 rounded-full bg-brand-accent/5 group-hover:bg-brand-accent/10 flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-6 h-6 text-brand-accent" strokeWidth={1.5} />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-brand-dark group-hover:text-brand-accent-dark transition-colors duration-350">
                      {benefit.title}
                    </h3>
                    <span className="block font-sans text-xs font-semibold text-brand-accent tracking-wider uppercase">
                      {benefit.subtitle}
                    </span>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-brand-dark/70 leading-relaxed">
                    "{benefit.description}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
