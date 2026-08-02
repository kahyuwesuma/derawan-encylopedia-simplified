'use strict';

const fs = require('fs');
const path = require('path');
const { ASSETS_ROOT } = require('../../../config/constants');

async function downloadDriveFiles(drive, allDriveFiles, syncState, saveStatus, addLog) {
  const validLocalRelativePaths = new Set();

  for (let i = 0; i < allDriveFiles.length; i++) {
    const item = allDriveFiles[i];
    syncState.progress.current = i + 1;
    syncState.message = `Processing (${i + 1}/${allDriveFiles.length}): ${item.name}`;
    saveStatus();

    const destDir = path.join(ASSETS_ROOT, item.regionFolder, item.siteFolder);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const safeFilename = item.name.replace(/[\/\\]/g, '-');
    const destPath = path.join(destDir, safeFilename);

    const relPathNorm = path.relative(ASSETS_ROOT, destPath).replace(/\\/g, '/');
    validLocalRelativePaths.add(relPathNorm);

    // Smart check: Check if file already exists with same size
    if (fs.existsSync(destPath)) {
      const stat = fs.statSync(destPath);
      if (stat.size === item.size) {
        syncState.progress.skipped++;
        continue;
      }
    }

    // Download file from Drive
    try {
      addLog(`Downloading: ${safeFilename} -> ${item.regionFolder}/${item.siteFolder}`);
      const downloadRes = await drive.files.get(
        { fileId: item.id, alt: 'media' },
        { responseType: 'stream' }
      );

      await new Promise((resolve, reject) => {
        const destStream = fs.createWriteStream(destPath);
        destStream.on('error', err => reject(err));
        downloadRes.data
          .on('end', () => resolve())
          .on('error', err => reject(err))
          .pipe(destStream);
      });

      syncState.progress.downloaded++;
    } catch (err) {
      addLog(`Error downloading ${item.name}: ${err.message}`);
    }
  }

  // Cleanup orphan files
  const pruned = cleanOrphans(ASSETS_ROOT, validLocalRelativePaths);
  if (pruned > 0) {
    addLog(`Selesai menghapus ${pruned} file usang dari lokal.`);
  }
}

function cleanOrphans(dir, validLocalRelativePaths) {
  let prunedCount = 0;
  if (!fs.existsSync(dir)) return prunedCount;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      prunedCount += cleanOrphans(fullPath, validLocalRelativePaths);
      try {
        if (fs.readdirSync(fullPath).length === 0) {
          fs.rmdirSync(fullPath);
        }
      } catch (e) {}
    } else if (entry.isFile()) {
      const relPathNorm = path.relative(ASSETS_ROOT, fullPath).replace(/\\/g, '/');
      if (!validLocalRelativePaths.has(relPathNorm)) {
        try {
          fs.unlinkSync(fullPath);
          prunedCount++;
        } catch (e) {}
      }
    }
  }
  return prunedCount;
}

module.exports = {
  downloadDriveFiles,
  cleanOrphans
};
