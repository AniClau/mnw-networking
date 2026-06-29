import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correo: '',
    telefono: '',
    ciudadInteres: '',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefono') {
      // Solo permite dígitos numéricos y un máximo de 10
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.telefono.length !== 10) {
      alert("El teléfono debe tener exactamente 10 dígitos.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/ellalovr@hotmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Nombre: formData.nombreCompleto,
          Email: formData.correo,
          Telefono: formData.telefono,
          Plaza: formData.ciudadInteres,
          Mensaje: formData.mensaje,
          _subject: `Nueva solicitud de contacto de ${formData.nombreCompleto} (Plaza ${formData.ciudadInteres})`,
        })
      });

      const json = await response.json();
      if (json.success === "true" || json.success === true) {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({
          nombreCompleto: '',
          correo: '',
          telefono: '',
          ciudadInteres: '',
          mensaje: '',
        });
      } else {
        alert("Ocurrió un error al enviar el formulario. Por favor, inténtelo de nuevo.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form to FormSubmit:", error);
      alert("Error de conexión. Por favor, intente más tarde.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="bg-brand-dark py-24 sm:py-32 px-6 sm:px-12 lg:px-20 relative">
      {/* Background Decorative Gradient Blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
        
        {/* Left Column: Contact Info */}
        <div className="flex-1 space-y-8 text-left self-center">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 border border-brand-accent/30 text-brand-accent font-sans text-xs font-semibold tracking-wider rounded-full uppercase">
              Contacto
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              ¿Listo para expandir tu red de negocios?
            </h2>
            <p className="font-sans text-base sm:text-lg text-brand-cream/75 leading-relaxed max-w-lg">
              Únete a un círculo de empresarios comprometidos. Completa el formulario y un director de plaza se pondrá en contacto contigo para agendar una sesión informativa.
            </p>
          </div>

          <div className="space-y-6 pt-4 font-sans text-brand-cream/80">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-accent border border-white/10">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-brand-cream/40 uppercase font-semibold tracking-wider">Correo Electrónico</p>
                <a href="mailto:ellalovr@hotmail.com" className="hover:text-white transition-colors">ellalovr@hotmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-accent border border-white/10">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-brand-cream/40 uppercase font-semibold tracking-wider">Teléfono de Atención</p>
                <a href="tel:+524421234567" className="hover:text-white transition-colors">+52 (246) 142 2563</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-accent border border-white/10">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-brand-cream/40 uppercase font-semibold tracking-wider">Oficina Central</p>
                <p className="text-brand-cream/80">Tlaxcala, México</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="flex-1 bg-brand-dark-deep p-8 sm:p-12 rounded-lg border border-white/5 shadow-2xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="inline-flex w-16 h-16 rounded-full bg-brand-accent/20 text-brand-accent items-center justify-center mb-2">
                <CheckCircle size={36} />
              </div>
              <h3 className="font-serif text-3xl font-bold text-white">¡Gracias por tu interés!</h3>
              <p className="font-sans text-brand-cream/70 max-w-md mx-auto leading-relaxed">
                Hemos recibido tus datos con éxito. Un representante de MNW se pondrá en contacto contigo en las próximas 24 horas hábiles para coordinar tu asistencia.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-3 bg-brand-cream hover:bg-brand-cream-dark text-brand-dark text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-300"
              >
                Enviar otro formulario
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {/* Nombre Completo */}
              <div className="space-y-2">
                <label htmlFor="nombreCompleto" className="block font-sans text-xs font-semibold text-brand-cream/60 uppercase tracking-wider">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nombreCompleto"
                  name="nombreCompleto"
                  required
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez González"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3.5 text-white font-sans placeholder-white/20 focus:outline-none focus:border-brand-accent transition-all duration-300"
                />
              </div>

              {/* Correo */}
              <div className="space-y-2">
                <label htmlFor="correo" className="block font-sans text-xs font-semibold text-brand-cream/60 uppercase tracking-wider">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  required
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="ejemplo@empresa.com"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3.5 text-white font-sans placeholder-white/20 focus:outline-none focus:border-brand-accent transition-all duration-300"
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <label htmlFor="telefono" className="block font-sans text-xs font-semibold text-brand-cream/60 uppercase tracking-wider">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  minLength={10}
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="10 dígitos (ej. 2461234567)"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3.5 text-white font-sans placeholder-white/20 focus:outline-none focus:border-brand-accent transition-all duration-300"
                />
              </div>

              {/* Ciudad de interés */}
              <div className="space-y-2">
                <label htmlFor="ciudadInteres" className="block font-sans text-xs font-semibold text-brand-cream/60 uppercase tracking-wider">
                  Ciudad de Interés
                </label>
                <div className="relative">
                  <select
                    id="ciudadInteres"
                    name="ciudadInteres"
                    required
                    value={formData.ciudadInteres}
                    onChange={handleChange}
                    className="w-full bg-brand-dark-deep border border-white/10 rounded-sm px-4 py-3.5 text-white font-sans focus:outline-none focus:border-brand-accent transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-white/20">Selecciona una ciudad</option>
                    <option value="Tlaxcala" className="text-white">Tlaxcala</option>
                    <option value="Puebla" className="text-white">Puebla</option>
                    <option value="Irapuato" className="text-white">Irapuato</option>
                    <option value="Aguascalientes" className="text-white">Aguascalientes</option>
                  </select>
                  {/* Select custom arrow */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-brand-cream/40">
                    <span className="text-xs">▼</span>
                  </div>
                </div>
              </div>

              {/* Mensaje */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="mensaje" className="block font-sans text-xs font-semibold text-brand-cream/60 uppercase tracking-wider">
                    Mensaje
                  </label>
                  <span className="text-[10px] text-brand-cream/30 uppercase font-sans">Opcional</span>
                </div>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="4"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos un poco sobre tu empresa o sector..."
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3.5 text-white font-sans placeholder-white/20 focus:outline-none focus:border-brand-accent transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-cream hover:bg-brand-cream-dark text-brand-dark font-sans text-xs font-bold tracking-widest uppercase rounded-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Enviando...</span>
                ) : (
                  <>
                    <span>Enviar solicitud</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
