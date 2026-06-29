import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// ── Contenido legal ─────────────────────────────────────────────────────────────
const legalContent = {
  privacidad: {
    title: 'Aviso de Privacidad',
    updated: '29 de junio de 2025',
    sections: [
      {
        heading: '1. Responsable del tratamiento de datos',
        text: 'MNW Marca Networking (en adelante "MNW"), con domicilio en el Estado de Tlaxcala, México, es responsable del tratamiento de sus datos personales conforme a lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.',
      },
      {
        heading: '2. Datos personales que recabamos',
        text: 'Para las finalidades señaladas en este aviso recabamos los siguientes datos personales: nombre completo, correo electrónico, número de teléfono o celular, empresa o giro comercial, cargo o puesto, y cualquier dato adicional que usted nos proporcione voluntariamente a través de los formularios de contacto de nuestro sitio web.',
      },
      {
        heading: '3. Finalidades del tratamiento',
        text: 'Sus datos serán utilizados para: (a) atender su solicitud de información o invitación a sesión; (b) enviarle comunicaciones informativas sobre actividades, eventos y novedades de MNW; (c) mantener el contacto necesario para la gestión de su membresía; (d) dar cumplimiento a obligaciones legales aplicables.',
      },
      {
        heading: '4. Transferencia de datos',
        text: 'MNW no vende, renta ni cede sus datos personales a terceros sin su consentimiento, salvo cuando sea requerido por autoridad competente o sea necesario para el cumplimiento de las finalidades descritas, siempre con las medidas de protección adecuadas.',
      },
      {
        heading: '5. Derechos ARCO',
        text: 'Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (derechos ARCO) al tratamiento de sus datos personales. Para ejercer estos derechos, envíe su solicitud al correo electrónico: privacidad@mnwnetworking.com, indicando su nombre completo, datos de contacto y el derecho que desea ejercer.',
      },
      {
        heading: '6. Uso de cookies',
        text: 'Este sitio web puede utilizar cookies y tecnologías similares para mejorar su experiencia de navegación, analizar el tráfico y personalizar el contenido. Puede configurar su navegador para rechazar cookies; sin embargo, algunas funciones del sitio podrían verse afectadas.',
      },
      {
        heading: '7. Cambios al aviso de privacidad',
        text: 'MNW se reserva el derecho de modificar el presente Aviso de Privacidad en cualquier momento. Las actualizaciones se publicarán en este sitio web. El uso continuado del sitio después de dichos cambios constituye su aceptación de las nuevas condiciones.',
      },
      {
        heading: '8. Contacto',
        text: 'Para cualquier duda o aclaración relacionada con este Aviso de Privacidad, puede contactarnos en: privacidad@mnwnetworking.com',
      },
    ],
  },
  terminos: {
    title: 'Términos de Servicio',
    updated: '29 de junio de 2025',
    sections: [
      {
        heading: '1. Aceptación de los términos',
        text: 'Al acceder y utilizar el sitio web de MNW Marca Networking, usted acepta estar sujeto a los presentes Términos de Servicio. Si no está de acuerdo con alguno de estos términos, le pedimos que no utilice nuestro sitio.',
      },
      {
        heading: '2. Descripción del servicio',
        text: 'MNW Marca Networking es un sistema de networking empresarial estructurado diseñado para dueños de negocios y directores que buscan crear alianzas estratégicas, generar referencias comerciales y crecer de forma colaborativa. Los servicios incluyen sesiones presenciales semanales, capacitación en el método MNW, y acceso a la comunidad de miembros.',
      },
      {
        heading: '3. Membresía y acceso',
        text: 'El acceso a las sesiones y beneficios de MNW requiere una solicitud formal de invitación y la aceptación por parte de la plaza correspondiente. La membresía es personal e intransferible. MNW se reserva el derecho de aceptar o rechazar solicitudes de membresía.',
      },
      {
        heading: '4. Conducta del usuario',
        text: 'Los miembros y visitantes del sitio se comprometen a: (a) no utilizar el contenido del sitio con fines comerciales no autorizados; (b) no reproducir, distribuir o modificar el contenido sin autorización escrita de MNW; (c) actuar con respeto y profesionalismo en cualquier interacción dentro de la comunidad MNW.',
      },
      {
        heading: '5. Propiedad intelectual',
        text: 'Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos, diseños y el método MNW, son propiedad exclusiva de MNW Marca Networking y están protegidos por las leyes de propiedad intelectual mexicanas e internacionales. Queda prohibida su reproducción sin autorización.',
      },
      {
        heading: '6. Limitación de responsabilidad',
        text: 'MNW no garantiza resultados específicos de negocio derivados de la membresía o participación en sesiones. Los resultados dependen del compromiso, esfuerzo y condiciones particulares de cada miembro. MNW no será responsable por daños indirectos, incidentales o consecuentes derivados del uso del sitio o de los servicios.',
      },
      {
        heading: '7. Modificaciones al servicio',
        text: 'MNW se reserva el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento, con o sin previo aviso. Los presentes Términos de Servicio también podrán ser actualizados periódicamente.',
      },
      {
        heading: '8. Legislación aplicable',
        text: 'Los presentes Términos de Servicio se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia derivada del uso de este sitio, las partes se someten a la jurisdicción de los tribunales competentes del Estado de Tlaxcala, México.',
      },
      {
        heading: '9. Contacto',
        text: 'Para cualquier consulta sobre estos Términos de Servicio, contáctenos en: legal@mnwnetworking.com',
      },
    ],
  },
};

// ── Componente Modal Legal ──────────────────────────────────────────────────────
export default function LegalModal({ type, onClose }) {
  const content = legalContent[type];

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!content) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header sticky */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-7 py-5 flex items-start justify-between gap-4 z-10">
            <div>
              <p className="font-sans text-[10px] font-bold tracking-widest text-brand-accent uppercase mb-1">
                MNW Marca Networking
              </p>
              <h2 className="font-serif text-2xl font-bold text-brand-dark">{content.title}</h2>
              <p className="font-sans text-xs text-brand-dark/40 mt-0.5">Última actualización: {content.updated}</p>
            </div>
            <button
              onClick={onClose}
              className="mt-1 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-all shrink-0"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto px-7 py-6 space-y-6">
            {content.sections.map((section, i) => (
              <div key={i} className="space-y-2">
                <h3 className="font-sans text-sm font-bold text-brand-dark">{section.heading}</h3>
                <p className="font-sans text-sm text-brand-dark/60 leading-relaxed">{section.text}</p>
              </div>
            ))}

            {/* Divider + close */}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full py-3 bg-brand-dark hover:bg-brand-accent text-white font-sans text-xs font-bold uppercase tracking-widest rounded-lg transition-colors duration-300"
              >
                Entendido, cerrar
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
