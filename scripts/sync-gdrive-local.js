'use strict';

/**
 * Script Sync Google Drive Lokal
 * Men-download file dari Google Drive ke public/assets/api/
 * Dan menghasilkan file JSON statis di public/api/gallery.json
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { getDriveClient } = require('../src/services/gdrive/gdriveAuth');
const { scanDriveHierarchy } = require('../src/services/gdrive/gdriveScanner');
const { downloadDriveFiles } = require('../src/services/gdrive/gdriveDownloader');
const { buildGalleryArray } = require('../src/services/gdrive/gdriveSync');

const LOCAL_ASSETS_ROOT = path.resolve(__dirname, '../public/assets/api');
const PUBLIC_API_DIR = path.resolve(__dirname, '../public/api');
const GALLERY_JSON_PATH = path.resolve(PUBLIC_API_DIR, 'gallery.json');

function addLog(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

async function runLocalSync() {
  addLog('=== Starting Local Google Drive Sync ===');
  const folderId = process.env.GDRIVE_FOLDER_ID;
  if (!folderId) {
    console.error('❌ GDRIVE_FOLDER_ID tidak ditemukan di environment (.env)');
    process.exit(1);
  }

  const drive = getDriveClient(addLog);
  if (!drive) {
    console.error('❌ Autentikasi Google Drive gagal! Pastikan gdrive-credentials.json atau GDRIVE_SERVICE_ACCOUNT_JSON/GDRIVE_API_KEY tersedia.');
    process.exit(1);
  }

  const warnings = [];
  try {
    const allDriveFiles = await scanDriveHierarchy(drive, folderId, addLog, warnings);
    addLog(`Ditemukan ${allDriveFiles.length} file di Google Drive.`);

    const dummySyncState = { progress: { current: 0, downloaded: 0, skipped: 0 }, message: '' };
    const dummySaveStatus = () => {};

    addLog('Mengunduh & menyelaraskan file fisik ke public/assets/api/...');
    await downloadDriveFiles(drive, allDriveFiles, dummySyncState, dummySaveStatus, addLog);

    addLog('Membuat public/api/gallery.json...');
    const galleryData = buildGalleryArray(allDriveFiles);

    if (!fs.existsSync(PUBLIC_API_DIR)) {
      fs.mkdirSync(PUBLIC_API_DIR, { recursive: true });
    }

    fs.writeFileSync(GALLERY_JSON_PATH, JSON.stringify(galleryData, null, 2), 'utf-8');

    const STATUS_FILE = path.resolve(__dirname, '../public/sync-status.json');
    const syncStatusData = {
      status: 'success',
      lastSyncTime: new Date().toISOString(),
      message: `Sync selesai. ${allDriveFiles.length} file di-index, ${warnings.length} warning.`,
      progress: { total: allDriveFiles.length, current: allDriveFiles.length, downloaded: dummySyncState.progress.downloaded, skipped: dummySyncState.progress.skipped },
      warnings: warnings,
      logs: [
        `[${new Date().toLocaleTimeString()}] Local sync completed successfully.`,
        ...warnings.map(w => `[WARNING] [${w.location}] ${w.name}: ${w.issue}`)
      ]
    };

    fs.writeFileSync(STATUS_FILE, JSON.stringify(syncStatusData, null, 2), 'utf-8');
    addLog(`✅ Selesai! File gallery.json dan sync-status.json berhasil diperbarui dengan ${allDriveFiles.length} item & ${warnings.length} warning.`);

    if (warnings.length > 0) {
      addLog(`⚠️ Perhatian: Terdapat ${warnings.length} peringatan file:`);
      warnings.forEach(w => console.warn(`   - [${w.location}] ${w.name}: ${w.issue}`));
    }
  } catch (err) {
    console.error('❌ Sync gagal:', err);
    process.exit(1);
  }
}

runLocalSync();
