'use strict';

const { getGallery, invalidateCache } = require('../services/galleryService');

function getGalleryData(req, res) {
  try {
    let data = getGallery();
    const { region, site, type, search } = req.query;

    if (region) {
      data = data.filter(d => d.region.toLowerCase().includes(region.toLowerCase()));
    }
    if (site) {
      data = data.filter(d => d.site.toLowerCase().includes(site.toLowerCase()));
    }
    if (type) {
      data = data.map(d => ({ ...d, files: d.files.filter(f => f.type === type) }))
        .filter(d => d.files.length > 0);
    }
    if (search) {
      const q = search.toLowerCase();
      data = data.map(d => ({
        ...d,
        files: d.files.filter(f =>
          f.metadata.species.toLowerCase().includes(q) ||
          f.metadata.location.toLowerCase().includes(q) ||
          f.metadata.photographer.toLowerCase().includes(q) ||
          f.filename.toLowerCase().includes(q)
        )
      })).filter(d => d.files.length > 0);
    }

    res.json(data);
  } catch (err) {
    console.error('[api/gallery]', err);
    res.status(500).json({ error: 'Failed to scan gallery', detail: err.message });
  }
}

function getGalleryMeta(req, res) {
  try {
    const data = getGallery();
    const regions = [...new Set(data.map(d => d.region))].sort();
    const sites = [...new Set(data.map(d => d.site))].sort();
    const total = data.reduce((n, d) => n + d.files.length, 0);
    const images = data.reduce((n, d) => n + d.files.filter(f => f.type === 'image').length, 0);
    const videos = data.reduce((n, d) => n + d.files.filter(f => f.type === 'video').length, 0);
    res.json({ regions, sites, total, images, videos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function refreshCache(req, res) {
  invalidateCache();
  res.json({ ok: true, message: 'Cache cleared — next request will rescan.' });
}

module.exports = {
  getGalleryData,
  getGalleryMeta,
  refreshCache
};
