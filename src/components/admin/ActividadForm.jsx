import { useState, useRef } from 'react';
import { Upload, X, CalendarDays, Tag, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TIPOS = ['Foto', 'Video', 'Evento'];

export default function ActividadForm({ existing, onSuccess, onCancel }) {
  const { token } = useAuth();
  const fileRef = useRef();

  const [form, setForm] = useState({
    titulo: existing?.titulo || '',
    tipo: existing?.tipo || 'Foto',
    fecha: existing?.fecha || '',
    destacada: existing?.destacada || false,
  });
  const [preview, setPreview] = useState(existing?.imagen ? `http://localhost:3001${existing.imagen}` : null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!existing && !file) {
      setError('Debes seleccionar una imagen.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('titulo', form.titulo);
      formData.append('tipo', form.tipo);
      formData.append('fecha', form.fecha);
      formData.append('destacada', String(form.destacada));
      if (file) formData.append('imagen', file);

      const url = existing
        ? `http://localhost:3001/api/actividades/${existing.id}`
        : 'http://localhost:3001/api/actividades';

      const res = await fetch(url, {
        method: existing ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Error al guardar');
      } else {
        onSuccess(data);
      }
    } catch {
      setError('No se puede conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-sans px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Image Upload Zone */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider font-sans">
          Imagen
        </label>
        <div
          onClick={() => fileRef.current.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="relative border-2 border-dashed border-white/10 hover:border-brand-accent-light/50 rounded-xl overflow-hidden cursor-pointer transition-colors group"
          style={{ minHeight: preview ? 'auto' : '160px' }}
        >
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Vista previa" className="w-full max-h-64 object-cover rounded-xl" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                <p className="text-white text-sm font-sans font-semibold">Haz clic para cambiar</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-white/30">
              <Upload size={32} className="mb-2" />
              <p className="text-sm font-sans">Arrastra una imagen o <span className="text-brand-accent-light">haz clic aquí</span></p>
              <p className="text-xs mt-1">JPG, PNG o WebP · Máx. 10 MB</p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider font-sans">
          Título
        </label>
        <input
          type="text"
          required
          value={form.titulo}
          onChange={e => setForm(p => ({ ...p, titulo: e.target.value }))}
          placeholder="Ej. Workshop: Cierre de Negocios"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-sans placeholder-white/20 focus:outline-none focus:border-brand-accent-light transition-colors"
        />
      </div>

      {/* Tipo + Fecha */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider font-sans">
            <Tag size={12} /> Tipo
          </label>
          <select
            value={form.tipo}
            onChange={e => setForm(p => ({ ...p, tipo: e.target.value }))}
            className="w-full bg-brand-dark-deep border border-white/10 rounded-lg px-4 py-3 text-white font-sans focus:outline-none focus:border-brand-accent-light transition-colors appearance-none cursor-pointer"
          >
            {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider font-sans">
            <CalendarDays size={12} /> Fecha
          </label>
          <input
            type="text"
            required
            value={form.fecha}
            onChange={e => setForm(p => ({ ...p, fecha: e.target.value }))}
            placeholder="14 mayo 2026"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-sans placeholder-white/20 focus:outline-none focus:border-brand-accent-light transition-colors"
          />
        </div>
      </div>

      {/* Destacada toggle */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <div
          onClick={() => setForm(p => ({ ...p, destacada: !p.destacada }))}
          className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${form.destacada ? 'bg-brand-accent' : 'bg-white/10'}`}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${form.destacada ? 'left-7' : 'left-1'}`} />
        </div>
        <div className="flex items-center gap-2">
          <Star size={14} className={form.destacada ? 'text-yellow-400' : 'text-white/30'} />
          <span className="font-sans text-sm text-white/70 group-hover:text-white transition-colors">
            Tarjeta destacada (aparece grande a la izquierda)
          </span>
        </div>
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3.5 bg-brand-accent hover:bg-brand-accent-dark text-white font-sans text-sm font-bold tracking-wider uppercase rounded-lg transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : existing ? 'Guardar cambios' : 'Publicar actividad'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3.5 border border-white/10 hover:border-white/30 text-white/50 hover:text-white font-sans text-sm rounded-lg transition-all"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
