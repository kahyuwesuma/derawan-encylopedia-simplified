'use strict';

/**
 * DERAWAN ENCYCLOPEDIA — GALLERY API SERVER v2
 * Express backend architecture
 */

require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const galleryRoutes = require('./routes/gallery');
const adminRoutes = require('./routes/admin');
const { initWatcher } = require('./src/services/galleryService');
const { PORT } = require('./config/constants');

const app = express();

/* ─── MIDDLEWARE ──────────────────────────────────────── */
app.use(cors());
app.use(express.json());

// Serve static assets (images/videos)
app.use('/assets', express.static(path.join(__dirname, 'public/assets'), {
  maxAge: '1h',
  etag: true,
}));

/* ─── ROUTES ──────────────────────────────────────────── */
app.use('/api', galleryRoutes);
app.use('/', adminRoutes);

/* ─── STATIC & FRONTEND FALLBACK ──────────────────────── */
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

/* ─── START SERVER & SERVICES ─────────────────────────── */
initWatcher();

app.listen(PORT, () => {
  console.log(`\n  ┌─────────────────────────────────────────┐`);
  console.log(`  │  DERAWAN GALLERY API                    │`);
  console.log(`  │  http://localhost:${PORT}                  │`);
  console.log(`  │  Admin: http://localhost:${PORT}/admin      │`);
  console.log(`  │  API:   http://localhost:${PORT}/api/gallery │`);
  console.log(`  └─────────────────────────────────────────┘\n`);
});

module.exports = app;
