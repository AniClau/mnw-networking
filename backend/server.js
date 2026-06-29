require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { UPLOADS_DIR } = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Serve uploaded images as static files
app.use('/uploads', express.static(UPLOADS_DIR));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/actividades', require('./routes/actividades'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message || 'Error interno del servidor' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor MNW corriendo en http://localhost:${PORT}`);
  console.log(`📁 Imágenes guardadas en: ${UPLOADS_DIR}`);
  console.log(`👤 Admin: ${process.env.ADMIN_USERNAME}`);
  console.log(`\n✅ Listo para recibir solicitudes del frontend...\n`);
});
