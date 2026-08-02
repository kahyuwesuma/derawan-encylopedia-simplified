'use strict';

const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const { IS_VERCEL, STATIC_JSON_PATH, ASSETS_ROOT } = require('../../config/constants');
const { slugify, parseFilename, SUPPORTED_EXT, VIDEO_EXT } = require('./filenameParser');

let galleryCache = null;
let cacheTime = 0;
const CACHE_TTL = 30_000; // 30s

function scanAssets() {
  const results = [];

  if (!fs.existsSync(ASSETS_ROOT)) return results;

  const regionDirs = fs.readdirSync(ASSETS_ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const regionEntry of regionDirs) {
    const regionName = slugify(regionEntry.name);
    const regionPath = path.join(ASSETS_ROOT, regionEntry.name);

    const siteDirs = fs.readdirSync(regionPath, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const siteEntry of siteDirs) {
      const siteName = slugify(siteEntry.name);
      const sitePath = path.join(regionPath, siteEntry.name);

      let files;
      try {
        files = fs.readdirSync(sitePath, { withFileTypes: true });
      } catch { continue; }

      const fileItems = [];

      for (const fileEntry of files) {
        if (!fileEntry.isFile()) continue;
        const ext = path.extname(fileEntry.name).toLowerCase();
        if (!SUPPORTED_EXT.has(ext)) continue;

        const isVideo = VIDEO_EXT.has(ext);
        const metadata = parseFilename(fileEntry.name, regionName, siteName);

        const relPath = path.join(
          regionEntry.name,
          siteEntry.name,
          fileEntry.name
        ).replace(/\\/g, '/');

        fileItems.push({
          filename: fileEntry.name,
          url: '/assets/api/' + relPath,
          type: isVideo ? 'video' : 'image',
          metadata,
        });
      }

      if (fileItems.length > 0) {
        results.push({
          region: regionName,
          regionRaw: regionEntry.name,
          site: siteName,
          siteRaw: siteEntry.name,
          files: fileItems,
        });
      }
    }
  }

  return results;
}

function getGallery() {
  if (fs.existsSync(STATIC_JSON_PATH)) {
    try {
      const raw = fs.readFileSync(STATIC_JSON_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (err) {
      console.error('[gallery] failed to read gallery.json', err);
    }
  }

  const now = Date.now();
  if (galleryCache && (now - cacheTime) < CACHE_TTL) return galleryCache;

  galleryCache = scanAssets();
  cacheTime = now;
  return galleryCache;
}

function invalidateCache() {
  galleryCache = null;
  console.log('[gallery] cache invalidated — rescanning on next request');
}

function initWatcher() {
  if (!IS_VERCEL && fs.existsSync(ASSETS_ROOT)) {
    const watcher = chokidar.watch(ASSETS_ROOT, {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: { stabilityThreshold: 800, pollInterval: 100 },
    });
    watcher.on('add', invalidateCache);
    watcher.on('unlink', invalidateCache);
    watcher.on('addDir', invalidateCache);
    watcher.on('unlinkDir', invalidateCache);
    console.log(`[gallery] watching ${ASSETS_ROOT} for changes…`);
  }
}

module.exports = {
  getGallery,
  invalidateCache,
  initWatcher,
};
