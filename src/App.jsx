import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Benefits from './components/Benefits';
import Plazas from './components/Plazas';
import Contenido from './components/Contenido';
import Contacto from './components/Contacto';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import Admin from './pages/Admin';

function LandingPage() {
  return (
    <div className="bg-brand-cream min-h-screen text-brand-dark antialiased font-sans selection:bg-brand-accent selection:text-white">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <Benefits />
        <Plazas />
        <Contenido />
        <Contacto />
      </main>

      {/* Footer & Floating CTAs */}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
