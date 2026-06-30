import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/admin/LoginForm';
import ActividadForm from '../components/admin/ActividadForm';
import ActividadesList from '../components/admin/ActividadesList';
import { LogOut, Plus, X, LayoutDashboard } from 'lucide-react';

export default function Admin() {
  const { isLoggedIn, loading, logout, admin } = useAuth();
  const [actividades, setActividades] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (isLoggedIn) loadActividades();
  }, [isLoggedIn]);

  const loadActividades = async () => {
    setFetching(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/actividades`);
      const data = await res.json();
      setActividades(data);
    } catch {
      console.error('No se pudo cargar actividades');
    } finally {
      setFetching(false);
    }
  };

  const handleSuccess = (saved) => {
    if (editingItem) {
      setActividades(prev => prev.map(a => a.id === saved.id ? saved : a));
    } else {
      setActividades(prev => [saved, ...prev]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    setActividades(prev => prev.filter(a => a.id !== id));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-white/40 font-sans text-sm animate-pulse">Verificando sesión...</div>
      </div>
    );
  }

  if (!isLoggedIn) return <LoginForm />;

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Top Navbar */}
      <header className="bg-brand-dark-deep border-b border-white/5 px-6 sm:px-10 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <img src="/images/logo.png" alt="MNW" className="h-12 brightness-0 invert" />
          <div className="flex items-center gap-2 text-white/60 font-sans text-sm">
            <LayoutDashboard size={16} />
            <span>Panel Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-xs text-white/30 font-sans">
            Sesión: <span className="text-white/60">{admin?.username}</span>
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-red-500/40 text-white/40 hover:text-red-400 rounded-lg font-sans text-xs transition-all"
          >
            <LogOut size={14} /> Cerrar sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-10 space-y-10">

        {/* Section: Form Panel */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-white">
                {showForm
                  ? editingItem ? 'Editar Actividad' : 'Nueva Actividad'
                  : 'Actividades Semanales'}
              </h2>
              <p className="font-sans text-sm text-white/40 mt-1">
                {showForm
                  ? 'Completa los campos y guarda los cambios.'
                  : 'Gestiona el contenido de "Cada semana hay actividad MNW".'}
              </p>
            </div>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-5 py-3 bg-brand-accent hover:bg-brand-accent-dark text-white font-sans text-sm font-bold tracking-wider uppercase rounded-lg transition-all"
              >
                <Plus size={16} /> Agregar
              </button>
            ) : (
              <button
                onClick={handleCancel}
                className="p-2 text-white/30 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {showForm && (
            <ActividadForm
              existing={editingItem}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          )}
        </div>

        {/* Section: Activities List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl text-white font-semibold">
              Publicadas ({actividades.length})
            </h3>
            <button
              onClick={loadActividades}
              className="text-xs text-white/30 hover:text-white font-sans transition-colors"
            >
              ↺ Actualizar
            </button>
          </div>

          {fetching ? (
            <div className="text-center py-12 text-white/30 font-sans text-sm animate-pulse">
              Cargando actividades...
            </div>
          ) : (
            <ActividadesList
              actividades={actividades}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        {/* Footer hint */}
        <div className="text-center pb-6">
          <a
            href="/"
            target="_blank"
            className="text-xs text-white/20 hover:text-brand-accent-light font-sans transition-colors"
          >
            ↗ Ver sitio público
          </a>
        </div>
      </main>
    </div>
  );
}
