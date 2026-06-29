const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'actividades.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure directories exist
function ensureDirs() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

function readDB() {
  ensureDirs();
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function writeDB(data) {
  ensureDirs();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

const db = {
  getAll() {
    return readDB().sort((a, b) => new Date(b.creadaEn || 0) - new Date(a.creadaEn || 0));
  },

  getById(id) {
    return readDB().find(item => item.id === id) || null;
  },

  create(actividad) {
    const data = readDB();
    data.push(actividad);
    writeDB(data);
    return actividad;
  },

  update(id, updates) {
    const data = readDB();
    const idx = data.findIndex(item => item.id === id);
    if (idx === -1) return null;
    data[idx] = { ...data[idx], ...updates };
    writeDB(data);
    return data[idx];
  },

  delete(id) {
    const data = readDB();
    const idx = data.findIndex(item => item.id === id);
    if (idx === -1) return null;
    const deleted = data[idx];
    data.splice(idx, 1);
    writeDB(data);
    return deleted;
  }
};

module.exports = { db, UPLOADS_DIR };
