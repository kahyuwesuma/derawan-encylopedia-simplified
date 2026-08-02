'use strict';

const fs = require('fs');
const path = require('path');
const { STATIC_JSON_PATH } = require('../../../config/constants');
const { slugify, parseFilename, VIDEO_EXT } = require('../filenameParser');
const { getDriveClient } = require('./gdriveAuth');
const { syncState, saveStatus, addLog, getSyncStatus } = require('./gdriveStatus');
const { scanDriveHierarchy } = require('./gdriveScanner');
const { downloadDriveFiles } = require('./gdriveDownloader');

const PUBLIC_API_DIR = path.dirname(STATIC_JSON_PATH);

function buildGalleryArray(allDriveFiles) {
  const groupsMap = new Map();
  const seenFilesPerGroup = new Map();

  for (const item of allDriveFiles) {
    const regionSlug = slugify(item.regionFolder);
    const siteSlug = slugify(item.siteFolder);
    const key = `${regionSlug}:::${siteSlug}`;

    if (!groupsMap.has(key)) {
      groupsMap.set(key, {
        region: regionSlug,
        regionRaw: item.regionFolder,
        site: siteSlug,
        siteRaw: item.siteFolder,
        files: []
      });
      seenFilesPerGroup.set(key, new Set());
    }

    const group = groupsMap.get(key);
    const seenSet = seenFilesPerGroup.get(key);

    const safeFilename = item.name.replace(/[\/\\]/g, '-');
    if (seenSet.has(safeFilename.toLowerCase())) continue;
    seenSet.add(safeFilename.toLowerCase());

    const ext = path.extname(item.name).toLowerCase();
    const isVideo = VIDEO_EXT.has(ext);
    const metadata = parseFilename(item.name, regionSlug, siteSlug);

    const localUrl = `/assets/api/${item.regionFolder}/${item.siteFolder}/${safeFilename}`;

    group.files.push({
      filename: safeFilename,
      url: localUrl,
      type: isVideo ? 'video' : 'image',
      metadata
    });
  }

  return Array.from(groupsMap.values());
}

function buildAndSaveGalleryJson(allDriveFiles) {
  const galleryData = buildGalleryArray(allDriveFiles);
  try {
    if (!fs.existsSync(PUBLIC_API_DIR)) {
      fs.mkdirSync(PUBLIC_API_DIR, { recursive: true });
    }
    fs.writeFileSync(STATIC_JSON_PATH, JSON.stringify(galleryData, null, 2), 'utf-8');
  } catch (e) {
    console.error('[gdriveSync] Failed to write gallery.json:', e);
  }
  return galleryData;
}

async function runSync() {
  if (syncState.status === 'syncing') {
    // If stuck for more than 5 minutes since sync started, force reset
    const startedMs = syncState.syncStartedAt ? new Date(syncState.syncStartedAt).getTime() : 0;
    if (startedMs > 0 && Date.now() - startedMs > 300_000) {
      addLog('Resetting stuck syncing state (exceeded 5 minutes timeout)...');
      syncState.status = 'idle';
    } else {
      return { success: false, message: 'Sync sedang berjalan. Silakan tunggu.' };
    }
  }

  const folderId = process.env.GDRIVE_FOLDER_ID;
  const drive = getDriveClient(addLog);

  syncState.status = 'syncing';
  syncState.syncStartedAt = new Date().toISOString();
  syncState.message = 'Scanning Google Drive hierarchy...';
  syncState.progress = { phase: 'scanning', total: syncState.progress.total || 0, current: 0, downloaded: 0, skipped: 0, scannedFolders: 0, totalFolders: 0 };
  saveStatus();
  addLog('Starting sync job...');

  if (!folderId) {
    syncState.status = 'error';
    syncState.message = 'GDRIVE_FOLDER_ID tidak ada di environment variable (.env)';
    addLog(syncState.message);
    saveStatus();
    return { success: false, message: syncState.message };
  }

  if (!drive) {
    syncState.status = 'error';
    syncState.message = 'Credential Google Drive tidak valid/tidak ditemukan.';
    addLog(syncState.message);
    saveStatus();
    return { success: false, message: syncState.message };
  }

  try {
    const newWarnings = [];
    const allDriveFiles = await scanDriveHierarchy(drive, folderId, addLog, newWarnings, syncState, saveStatus);
    syncState.warnings = newWarnings;
    syncState.progress.total = allDriveFiles.length;
    addLog(`Scanning selesai. Ditemukan ${allDriveFiles.length} file.`);

    addLog('Mendownload & menyinkronkan file aset fisik...');
    await downloadDriveFiles(drive, allDriveFiles, syncState, saveStatus, addLog);

    addLog('Memperbarui manifest public/api/gallery.json...');
    buildAndSaveGalleryJson(allDriveFiles);

    syncState.status = 'success';
    syncState.lastSyncTime = new Date().toISOString();
    syncState.message = `Sync selesai! ${allDriveFiles.length} file di-index. Warning: ${syncState.warnings.length}`;
    addLog(syncState.message);
    saveStatus();

    return { success: true, message: syncState.message, warnings: syncState.warnings };
  } catch (err) {
    syncState.status = 'error';
    syncState.message = `Sync gagal: ${err.message}`;
    addLog(syncState.message);
    saveStatus();
    return { success: false, message: syncState.message };
  }
}

module.exports = {
  buildGalleryArray,
  runSync,
  getSyncStatus
};
