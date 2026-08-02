'use strict';

const path = require('path');
const { DEFAULT_ADMIN_PASSWORD } = require('../../config/constants');
const { runSync, getSyncStatus } = require('../services/gdrive/gdriveSync');
const { invalidateCache } = require('../services/galleryService');
const { verifyAdminPassword } = require('../middlewares/authMiddleware');

function getAdminPage(req, res) {
  res.sendFile(path.join(__dirname, '../../public/admin/index.html'));
}

function loginAdmin(req, res) {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

  if (verifyAdminPassword(password)) {
    res.json({
      success: true,
      token: Buffer.from(adminPassword).toString('base64'),
      message: 'Login berhasil'
    });
  } else {
    res.status(401).json({ success: false, message: 'Password salah' });
  }
}

function getStatus(req, res) {
  res.json({ authenticated: true, ...getSyncStatus() });
}

function triggerSync(req, res) {
  const currentStatus = getSyncStatus();
  if (currentStatus.status === 'syncing') {
    return res.status(409).json({ success: false, message: 'Sync sedang berjalan. Silakan tunggu hingga selesai.' });
  }

  runSync().then(result => {
    invalidateCache();
  }).catch(err => {
    console.error('[admin/sync] Error:', err);
  });

  res.json({ success: true, message: 'Sync process started in background' });
}

async function triggerCronSync(req, res) {
  console.log('[cron-api] Vercel Cron Job triggered');
  try {
    const result = await runSync();
    invalidateCache();
    res.json({ success: true, message: result.message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  getAdminPage,
  loginAdmin,
  getStatus,
  triggerSync,
  triggerCronSync
};
