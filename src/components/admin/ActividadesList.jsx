import { useState } from 'react';
import { Trash2, Pencil, Star, CalendarDays, Tag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ActividadesList({ actividades, onEdit, onDelete }) {
  const { token } = useAuth();
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:3001/api/actividades/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        onDelete(id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  if (actividades.length === 0) {
    return (
      <div className="text-center py-16 text-white/30 font-sans">
        <p className="text-4xl mb-3">📷</p>
        <p className="text-base">Aún no hay actividades publicadas.</p>
        <p className="text-sm mt-1">Usa el formulario de arriba para agregar la primera.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {actividades.map(act => (
        <div
          key={act.id}
          className="flex items-center gap-4 bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl p-4 transition-all group"
        >
          {/* Thumbnail */}
          <div className="w-20 h-14 rounded-lg overflow-hidden bg-white/5 shrink-0">
            {act.imagen ? (
              <img
                src={`http://localhost:3001${act.imagen}`}
                alt={act.titulo}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 text-2xl">🖼️</div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              {act.destacada && (
                <Star size={12} className="text-yellow-400 shrink-0" fill="currentColor" />
              )}
              <h3 className="font-serif text-white text-base font-semibold truncate">
                {act.titulo}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/40 font-sans">
              <span className="flex items-center gap-1">
                <Tag size={11} /> {act.tipo}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays size={11} /> {act.fecha}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onEdit(act)}
              className="p-2 rounded-lg text-white/30 hover:text-brand-accent-light hover:bg-white/10 transition-all"
              title="Editar"
            >
              <Pencil size={16} />
            </button>

            {confirmId === act.id ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-400 font-sans">¿Eliminar?</span>
                <button
                  onClick={() => handleDelete(act.id)}
                  disabled={deletingId === act.id}
                  className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs font-sans rounded-lg transition-all disabled:opacity-50"
                >
                  {deletingId === act.id ? '...' : 'Sí'}
                </button>
                <button
                  onClick={() => setConfirmId(null)}
                  className="px-3 py-1 border border-white/10 text-white/40 text-xs font-sans rounded-lg hover:text-white hover:border-white/30 transition-all"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmId(act.id)}
                className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                title="Eliminar"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
