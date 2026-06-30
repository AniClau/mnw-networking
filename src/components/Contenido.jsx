import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;

export default function Contenido() {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/actividades`)
      .then(r => r.json())
      .then(data => {
        setActividades(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Split into featured (big left card) and the rest (right column)
  const featured = actividades.find(a => a.destacada) || actividades[0] || null;
  const rest = actividades.filter(a => a.id !== featured?.id).slice(0, 2);

  if (loading) {
    return (
      <section id="contenido" className="bg-brand-cream py-24 sm:py-32 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-brand-dark leading-tight">
              Cada semana <br />
              hay <span className="italic font-semibold text-brand-accent-dark">actividad MNW</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            <div className="lg:col-span-5 bg-brand-cream-dark/50 rounded-lg animate-pulse min-h-[450px]" />
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-brand-cream-dark/50 rounded-lg animate-pulse min-h-[220px]" />
              <div className="bg-brand-cream-dark/50 rounded-lg animate-pulse min-h-[220px]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || actividades.length === 0) {
    return (
      <section id="contenido" className="bg-brand-cream py-24 sm:py-32 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-brand-dark leading-tight">
              Cada semana <br />
              hay <span className="italic font-semibold text-brand-accent-dark">actividad MNW</span>
            </h2>
          </div>
          <p className="text-center font-sans text-brand-dark/40 text-sm">
            {error
              ? 'No se pudo conectar con el servidor.'
              : 'Pronto habrá actividades publicadas aquí. ¡Vuelve pronto!'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contenido" className="bg-brand-cream py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-brand-cream-dark/50">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-brand-dark leading-tight">
            Cada semana <br />
            hay <span className="italic font-semibold text-brand-accent-dark">actividad MNW</span>
          </h2>
        </div>

        {/* Layout Grid (Featured 3 items) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">

          {/* Left — Large featured card */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300 min-h-[450px] flex flex-col justify-end"
            >
              {featured.imagen && (
                <img
                  src={`${API}${featured.imagen}`}
                  alt={featured.titulo}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-deep/90 via-brand-dark-deep/40 to-transparent" />
              <div className="relative p-6 sm:p-8 space-y-3 text-left">
                <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest rounded-full uppercase">
                  {featured.tipo}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {featured.titulo}
                </h3>
                <p className="font-sans text-xs text-brand-cream/60">{featured.fecha}</p>
              </div>
            </motion.div>
          )}

          {/* Right — Stacked cards */}
          {rest.length > 0 && (
            <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
              {rest.map((act, i) => (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300 min-h-[220px] flex flex-col justify-end"
                >
                  {act.imagen && (
                    <img
                      src={`${API}${act.imagen}`}
                      alt={act.titulo}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-deep/90 via-brand-dark-deep/40 to-transparent" />
                  <div className="relative p-6 sm:p-8 space-y-2 text-left">
                    <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest rounded-full uppercase">
                      {act.tipo}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                      {act.titulo}
                    </h3>
                    <p className="font-sans text-xs text-brand-cream/60">{act.fecha}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
