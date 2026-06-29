import { useState } from 'react';
import { Link } from 'react-router-dom';
import LegalModal from './LegalModal';

export default function Footer() {
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: '¿Qué es MNW?', href: '#que-es-mnw' },
    { name: 'Beneficios', href: '#beneficios' },
    { name: 'Plazas', href: '#plazas' },
    { name: 'Contenido', href: '#contenido' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <footer className="bg-brand-dark-deep text-brand-cream/60 py-16 px-6 sm:px-12 lg:px-20 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        {/* Brand Information */}
        <div className="space-y-6 text-left">
          <a href="#inicio" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="MNW Tu Familia Empresarial"
              className="h-16 w-auto brightness-0 invert"
            />
          </a>
          <p className="text-sm leading-relaxed max-w-sm">
            MNW Marca Networking es un sistema empresarial serio diseñado para dueños de empresas que buscan generar alianzas estratégicas y crecimiento real a través de un método de trabajo estructurado.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-left space-y-4 md:pl-12">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Enlaces Rápidos</h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-brand-accent transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer / Hours */}
        <div className="text-left space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Horario de Sesiones</h4>
          <p className="text-sm leading-relaxed">
            Nuestras sesiones presenciales se realizan de manera semanal, típicamente cada 15 días **Miercoles a las 9:00 AM**.
          </p>
          <p className="text-xs text-brand-cream/40">
            * Se requiere registro previo en el formulario y invitación formal para asistir a las sesiones ordinarias.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>
          © {currentYear} MNW Marca Networking. Todos los derechos reservados. Marca Registrada
          <Link
            to="/admin"
            className="text-brand-cream/60 hover:text-brand-cream/60 cursor-default select-none transition-none"
          >
            .
          </Link>
        </p>
        <div className="flex gap-6">
          <button
            onClick={() => setActiveLegalModal('privacidad')}
            className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer font-sans text-xs text-brand-cream/60"
          >
            Aviso de Privacidad
          </button>
          <button
            onClick={() => setActiveLegalModal('terminos')}
            className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer font-sans text-xs text-brand-cream/60"
          >
            Términos de Servicio
          </button>
        </div>
      </div>

      {activeLegalModal && (
        <LegalModal type={activeLegalModal} onClose={() => setActiveLegalModal(null)} />
      )}
    </footer>
  );
}
