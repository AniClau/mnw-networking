import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  // Configurable phone number. Since user said "te lo dare mas adelante", 
  // we use a placeholder or empty target for now.
  const phoneNumber = "522461422563"; // Placeholder Mexican number
  const message = encodeURIComponent("Hola, me interesa conocer más sobre MNW Marca Networking.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#1b3d2b] hover:bg-[#12281c] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#1b3d2b] opacity-40 animate-ping group-hover:animate-none pointer-events-none" />

      {/* WhatsApp SVG Icon */}
      <svg
        className="w-7 h-7 relative z-10 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.734-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.8.001-2.605-1.01-5.057-2.85-6.897-1.84-1.84-4.29-2.853-6.897-2.854-5.407 0-9.81 4.403-9.813 9.809-.001 1.735.454 3.428 1.319 4.925l-.993 3.627 3.713-.974zm11.002-5.093c-.3-.15-1.772-.875-2.046-.975-.276-.1-.477-.15-.676.15-.199.3-.772.975-.946 1.175-.174.2-.349.225-.649.075-.3-.15-1.266-.467-2.41-1.486-.89-.795-1.492-1.775-1.667-2.075-.175-.3-.019-.463.13-.612.134-.133.3-.349.449-.524.15-.174.2-.299.3-.5.1-.2.05-.375-.025-.524-.075-.15-.676-1.625-.926-2.225-.244-.589-.492-.51-.676-.51-.174-.007-.373-.007-.573-.007-.199 0-.523.075-.797.375-.274.3-1.047 1.025-1.047 2.5 0 1.475 1.072 2.9 1.222 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.272.495 1.706.633.717.228 1.369.196 1.884.119.574-.085 1.772-.725 2.022-1.425.25-.7.25-1.299.174-1.424-.075-.125-.274-.2-.574-.35z" />
      </svg>
    </motion.a>
  );
}
