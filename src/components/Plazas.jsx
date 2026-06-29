import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Calendar, X, Clock, Mail } from 'lucide-react';

const plazasData = [
  {
    image: '/images/tlaxcala_4.jpg',
    title: 'Tlaxcala',
    label: 'PLAZA ACTIVA MNW',
    description:
      'Plaza Tlaxcala es el núcleo original de MNW Marca Networking. Reúne a empresarios líderes de la región con un compromiso inquebrantable con el crecimiento mutuo y el desarrollo económico regional.',
    members: '60 dueños de negocio y directores',
    since: 2024,
    schedule: 'Miércoles 9:00 AM',
    contact: 'ellalovr@hotmail.com',
    gallery: [
      { src: '/images/tlaxcala_1.jpg', caption: 'Reunión de miembros MNW Tlaxcala' },
      { src: '/images/tlaxcala_2.jpg', caption: 'Sesión semanal de networking estructurado' },
      { src: '/images/tlaxcala_3.jpg', caption: 'Presentación de miembro ante la plaza' },
      { src: '/images/tlaxcala_4.jpg', caption: 'Evento especial — Plaza Tlaxcala' },
      { src: '/images/tlaxcala_5.jpg', caption: 'Comunidad empresarial MNW Tlaxcala' },
    ],
  },
  {
    image: '/images/plaza_puebla.jpeg',
    title: 'Puebla',
    label: 'PLAZA ACTIVA MNW',
    description:
      'Networking estructurado con la fuerza empresarial poblana. Una comunidad de líderes comprometidos con el crecimiento colectivo y las alianzas estratégicas.',
    members: '50 dueños de negocio y directores',
    since: 2025,
    schedule: 'Miércoles 9:00 AM',
    contact: 'ellalovr@hotmail.com',
    gallery: [
      { src: '/images/puebla_1.jpeg'},
      { src: '/images/puebla_2.jpeg'},
      { src: '/images/puebla_3.jpeg'},
      { src: '/images/puebla_4.jpeg'},
      { src: '/images/puebla_5.jpeg'},
    ],
  },
  {
    image: '/images/plaza_irapuato.jpeg',
    title: 'Irapuato',
    label: 'PLAZA ACTIVA MNW',
    description:
      'Conectando el potencial empresarial del Bajío. MNW Irapuato es la puerta de entrada al networking estructurado en el corazón industrial de México.',
    members: '25 dueños de negocio y directores',
    since: 2026,
    schedule: 'Viernes 9:00 AM',
    contact: 'guzmand.manuel@gmail.com',
    gallery: [
      { src: '/images/irapuato_1.jpeg'},
      { src: '/images/irapuato_2.jpeg'},
      { src: '/images/irapuato_3.jpeg'},
      { src: '/images/irapuato_4.jpeg'},
      { src: '/images/irapuato_5.jpeg'},
    ],
  },
  {
    image: '/images/plaza_aguascalientes.jpeg',
    title: 'Aguascalientes',
    label: 'PLAZA ACTIVA MNW',
    description:
      'La nueva plaza que crece con energía y visión. MNW Aguascalientes representa la expansión de la red empresarial más sólida del centro de México.',
    members: '25 dueños de negocio y directores',
    since: 2026,
    schedule: 'Viernes 7:30 AM',
    contact: 'EDUARDOMIRANDA.AROMATEX@GMAIL.COM',
    gallery: [
      { src: '/images/aguascalientes_1.jpeg'},
      { src: '/images/aguascalientes_2.jpeg'},
      { src: '/images/aguascalientes_3.jpeg'},
      { src: '/images/aguascalientes_4.jpeg'},
    ],
  },
];

// ── Modal de plaza ──────────────────────────────────────────────────────────────
function PlazaModal({ plaza, onClose }) {
  const [slide, setSlide] = useState(0);
  const total = plaza.gallery.length;

  const prev = useCallback(() => setSlide(s => (s - 1 + total) % total), [total]);
  const next = useCallback(() => setSlide(s => (s + 1) % total), [total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* LEFT: Carrusel */}
        <div className="relative w-full sm:w-[55%] bg-black flex-shrink-0" style={{ minHeight: '240px' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={slide}
              src={plaza.gallery[slide].src}
              alt={plaza.gallery[slide].caption}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.28 }}
              className="w-full h-full object-cover absolute inset-0"
            />
          </AnimatePresence>

          {total > 1 && (
            <>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all z-10" aria-label="Anterior">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all z-10" aria-label="Siguiente">
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {plaza.gallery.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)}
                  className={`rounded-full transition-all duration-300 ${i === slide ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Info */}
        <div className="flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-all z-10" aria-label="Cerrar">
            <X size={16} />
          </button>

          <div className="space-y-5">
            <div>
              <p className="font-sans text-xs font-bold tracking-widest text-brand-accent uppercase mb-2">{plaza.label}</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark leading-tight">MNW {plaza.title}</h2>
              <p className="font-sans text-sm text-brand-dark/60 leading-relaxed mt-3">{plaza.description}</p>
            </div>

            <div className="space-y-10 border-t border-gray-50 pt-5">
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-brand-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-sans text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">Horario de Sesiones</p>
                  <p className="font-sans text-sm text-brand-dark font-medium">{plaza.schedule}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users size={16} className="text-brand-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-sans text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">Miembros Activos</p>
                  <p className="font-sans text-sm text-brand-dark font-medium">{plaza.members}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-brand-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-sans text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">Fundada</p>
                  <p className="font-sans text-sm text-brand-dark font-medium">{plaza.since}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-brand-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-sans text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">Contacto</p>
                  <p className="font-sans text-sm text-brand-dark font-medium">{plaza.contact}</p>
                </div>
              </div>
            </div>
          </div>

          <a href="#contacto" onClick={onClose}
            className="mt-6 block w-full text-center py-4 bg-brand-dark hover:bg-brand-accent transition-colors duration-300 text-white font-sans text-xs font-bold tracking-widest uppercase rounded-lg">
            Solicitar Invitación a Sesión
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Componente Principal con slider ────────────────────────────────────────────
export default function Plazas() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [selectedPlaza, setSelectedPlaza] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedPlaza ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedPlaza]);

  const maxIndex = Math.max(0, plazasData.length - itemsToShow);
  const prevSlide = () => setCurrentIndex(prev => Math.max(0, prev - 1));
  const nextSlide = () => setCurrentIndex(prev => Math.min(maxIndex, prev + 1));

  // Card width as % of the slider track
  const cardWidthPct = 100 / plazasData.length;
  const gapPx = 24;

  return (
    <>
      <section id="plazas" className="bg-brand-dark py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden relative">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-4 text-left">
              <span className="inline-block px-4 py-1.5 border border-brand-accent/30 text-brand-accent font-sans text-xs font-semibold tracking-wider rounded-full uppercase">
                Plazas MNW
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl">
                Presentes en el centro de México, en expansión
              </h2>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={prevSlide} disabled={currentIndex === 0}
                className={`p-3 rounded-full border transition-all duration-300 ${currentIndex === 0 ? 'border-white/10 text-white/20 cursor-not-allowed' : 'border-white/25 text-white hover:border-white hover:bg-white/10'}`}
                aria-label="Anterior">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} disabled={currentIndex >= maxIndex}
                className={`p-3 rounded-full border transition-all duration-300 ${currentIndex >= maxIndex ? 'border-white/10 text-white/20 cursor-not-allowed' : 'border-white/25 text-white hover:border-white hover:bg-white/10'}`}
                aria-label="Siguiente">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Slider track */}
          <div className="relative overflow-hidden" ref={containerRef}>
            <motion.div
              className="flex"
              style={{ gap: `${gapPx}px` }}
              animate={{ x: `calc(-${currentIndex} * (100% + ${gapPx}px) / ${itemsToShow})` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {plazasData.map((plaza, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPlaza(plaza)}
                  className="group text-left focus:outline-none flex-shrink-0"
                  style={{ width: `calc((100% - (${gapPx}px * (${itemsToShow} - 1))) / ${itemsToShow})` }}
                  aria-label={`Ver plaza ${plaza.title}`}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden rounded-lg relative bg-brand-dark-deep mb-4">
                    <img
                      src={plaza.image}
                      alt={plaza.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/5 transition-colors duration-300" />
                  </div>

                  {/* Text */}
                  <div className="space-y-2 px-1">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-brand-accent-light transition-colors">
                      {plaza.title}
                    </h3>
                    <p className="font-sans text-sm text-brand-cream/70 leading-relaxed line-clamp-2">
                      {plaza.description}
                    </p>
                    <div className="flex items-center gap-4 pt-1 font-sans text-xs text-brand-cream/40">
                      <span className="flex items-center gap-1.5">
                        <Users size={14} className="text-brand-accent-light" />
                        {plaza.members.split(' ')[0]} miembros
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-brand-accent-light" />
                        Desde {plaza.since}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedPlaza && (
          <PlazaModal plaza={selectedPlaza} onClose={() => setSelectedPlaza(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
