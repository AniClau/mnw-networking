const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { db, UPLOADS_DIR } = require('../database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `actividad_${uuidv4()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Solo se permiten imágenes JPG, PNG o WebP'));
  },
});

// ─── PUBLIC ROUTE ─────────────────────────────────────────────────────────────

// GET /api/actividades — All activities (public, for frontend)
router.get('/', (req, res) => {
  try {
    const actividades = db.getAll();
    res.json(actividades);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
});

// ─── PROTECTED ROUTES ─────────────────────────────────────────────────────────

// POST /api/actividades — Create new activity (admin only)
router.post('/', authMiddleware, upload.single('imagen'), (req, res) => {
  try {
    const { titulo, tipo, fecha, destacada } = req.body;

    if (!titulo || !tipo || !fecha) {
      // Delete uploaded file if validation fails
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Título, tipo y fecha son requeridos' });
    }

    const actividad = {
      id: uuidv4(),
      titulo,
      tipo,        // "Foto" | "Video" | "Evento"
      fecha,
      destacada: destacada === 'true' || destacada === true,
      imagen: req.file ? `/uploads/${req.file.filename}` : null,
      creadaEn: new Date().toISOString(),
    };

    const created = db.create(actividad);
    res.status(201).json(created);
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: 'Error al crear actividad' });
  }
});

// PUT /api/actividades/:id — Update activity (admin only)
router.put('/:id', authMiddleware, upload.single('imagen'), (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.getById(id);

    if (!existing) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    const updates = {};
    if (req.body.titulo) updates.titulo = req.body.titulo;
    if (req.body.tipo) updates.tipo = req.body.tipo;
    if (req.body.fecha) updates.fecha = req.body.fecha;
    if (req.body.destacada !== undefined) {
      updates.destacada = req.body.destacada === 'true' || req.body.destacada === true;
    }

    // If a new image was uploaded, replace the old one
    if (req.file) {
      if (existing.imagen) {
        const oldPath = path.join(UPLOADS_DIR, path.basename(existing.imagen));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updates.imagen = `/uploads/${req.file.filename}`;
    }

    const updated = db.update(id, updates);
    res.json(updated);
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: 'Error al actualizar actividad' });
  }
});

// DELETE /api/actividades/:id — Delete activity (admin only)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    // Delete image file too
    if (deleted.imagen) {
      const imgPath = path.join(UPLOADS_DIR, path.basename(deleted.imagen));
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: 'Actividad eliminada', deleted });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar actividad' });
  }
});

module.exports = router;
