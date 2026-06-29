import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO', href: '#inicio' },
    { name: 'QUÉ ES MNW', href: '#que-es-mnw' },
    { name: 'BENEFICIOS', href: '#beneficios' },
    { name: 'PLAZAS', href: '#plazas' },
    { name: 'CONTENIDO', href: '#contenido' },
    { name: 'CONTACTO', href: '#contacto' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-light shadow-md py-4 border-b border-brand-cream-dark/20'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full px-6 sm:px-12 lg:px-20 flex justify-between items-center">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="MNW Tu Familia Empresarial"
            className="h-24 w-auto transition-transform group-hover:scale-102"
          />
        </a>

        {/* Desktop Links */}
        <div className="mobile-hide lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-sans text-xs font-semibold tracking-widest hover:text-brand-accent transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-accent after:transition-all hover:after:w-full ${
                scrolled ? 'text-brand-dark' : 'text-brand-dark'
              }`}
              style={{
                textShadow: scrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-md transition-colors ${
            scrolled ? 'text-brand-dark hover:bg-brand-cream-dark/50' : 'text-brand-dark hover:bg-brand-cream-dark/20'
          }`}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Links */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 w-64 bg-brand-cream shadow-2xl z-40 transition-all duration-300 ease-in-out border-l border-brand-cream-dark/30 ${
          mobileMenuOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col h-full justify-between p-8">
          <div className="space-y-8 mt-16">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-sans text-sm font-semibold tracking-widest text-brand-dark hover:text-brand-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="border-t border-brand-cream-dark/50 pt-6">
            <p className="text-xs text-brand-dark/50 font-sans tracking-wide">
              MNW © 2026. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-opacity"
        />
      )}
    </nav>
  );
}
