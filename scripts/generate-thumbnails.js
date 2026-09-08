'use strict';

/**
 * GENERATE THUMBNAILS SCRIPT
 * Mengompresi seluruh gambar di public/assets/api/ menjadi WebP ringan (~100-200 KB)
 * untuk thumbnail galeri di public/assets/thumbs/
 *
 * Cara pakai:
 *   npm run thumbnails
 *   atau: node scripts/generate-thumbnails.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ASSETS_API_DIR = path.resolve(__dirname, '../public/assets/api');
const THUMBS_DIR = path.resolve(__dirname, '../public/assets/thumbs');
const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

const HAS_CWEBP = (() => {
  try {
    execSync('which cwebp', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

const HAS_SIPS = (() => {
  try {
    execSync('which sips', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function convertToWebp(srcPath, destWebpPath) {
  if (HAS_CWEBP) {
    try {
      // Resize lebar maks 800px, quality 80% (turun dari ~8MB ke ~100-150KB)
      execSync(`cwebp -q 80 -resize 800 0 "${srcPath}" -o "${destWebpPath}"`, { stdio: 'ignore' });
      return true;
    } catch (err) {
      // fallback
    }
  }

  // Fallback macOS sips
  if (HAS_SIPS) {
    try {
      const tempJpg = destWebpPath.replace(/\.webp$/i, '.temp.jpg');
      execSync(`sips -Z 800 -s format jpeg -s formatOptions 80 "${srcPath}" --out "${tempJpg}"`, { stdio: 'ignore' });
      if (fs.existsSync(tempJpg)) {
        fs.renameSync(tempJpg, destWebpPath);
        return true;
      }
    } catch (err) {
      // fallback
    }
  }

  try {
    fs.copyFileSync(srcPath, destWebpPath);
    return true;
  } catch {
    return false;
  }
}

function processDirectory(currentSrcDir, currentDestDir) {
  ensureDir(currentDestDir);
  const entries = fs.readdirSync(currentSrcDir, { withFileTypes: true });

  let processed = 0;
  let skipped = 0;

  for (const entry of entries) {
    const srcPath = path.join(currentSrcDir, entry.name);

    if (entry.isDirectory()) {
      const nextDestDir = path.join(currentDestDir, entry.name);
      const sub = processDirectory(srcPath, nextDestDir);
      processed += sub.processed;
      skipped += sub.skipped;
    } else if (entry.isFile()) {
      const rawExt = path.extname(entry.name);
      const ext = rawExt.toLowerCase();
      if (!SUPPORTED_EXTS.has(ext)) continue;

      const baseName = path.basename(entry.name, rawExt);
      const destWebpPath = path.join(currentDestDir, `${baseName}.webp`);

      if (fs.existsSync(destWebpPath)) {
        const srcStat = fs.statSync(srcPath);
        const destStat = fs.statSync(destWebpPath);
        if (destStat.mtimeMs >= srcStat.mtimeMs) {
          skipped++;
          continue;
        }
      }

      const success = convertToWebp(srcPath, destWebpPath);
      if (success) {
        processed++;
        const originalSize = (fs.statSync(srcPath).size / (1024 * 1024)).toFixed(1);
        const thumbSize = (fs.statSync(destWebpPath).size / 1024).toFixed(0);
        console.log(`[Thumbnail] ${entry.name}: ${originalSize} MB -> ${thumbSize} KB`);
      }
    }
  }

  return { processed, skipped };
}

function main() {
  console.log('🚀 Memulai pembuatan thumbnail WebP ringan...');
  console.log(`Sumber: ${ASSETS_API_DIR}`);
  console.log(`Output: ${THUMBS_DIR}`);
  console.log(`Tool kompresi: ${HAS_CWEBP ? 'cwebp (WebP kompresi tinggi)' : HAS_SIPS ? 'sips (macOS native)' : 'standard copy'}\n`);

  if (!fs.existsSync(ASSETS_API_DIR)) {
    console.error('❌ Folder public/assets/api tidak ditemukan!');
    process.exit(1);
  }

  const startTime = Date.now();
  const { processed, skipped } = processDirectory(ASSETS_API_DIR, THUMBS_DIR);
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n✅ Selesai dalam ${duration} detik!`);
  console.log(`- Diproses baru/diperbarui: ${processed} gambar`);
  console.log(`- Dilewati (sudah up-to-date): ${skipped} gambar`);
}

main();
