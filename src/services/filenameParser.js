'use strict';

const path = require('path');
const { SUPPORTED_EXT, VIDEO_EXT, IMAGE_EXT } = require('../../config/constants');

function slugify(name) {
  if (!name || typeof name !== 'string') return '';
  return name.replace(/^\d+_/, '').trim();
}

function parseFilename(filename, regionHint = '', siteHint = '') {
  // Clean file extensions (including JPG, JPEG, PNG, etc., dot or no dot)
  let cleanName = (filename || '').replace(/\.(jpg|jpeg|png|gif|webp|mp4|mov|avi)$/i, '');
  cleanName = cleanName.replace(/(jpg|jpeg|png|gif|webp|mp4|mov|avi)$/i, '');

  const parts = cleanName.split(/_+/).map(s => s.trim()).filter(Boolean);

  let species = '';
  let siteParts = [];
  let dateStr = '';
  let photographer = '';

  let remaining = [...parts];

  // 1. Photographer (last token if not a numeric date)
  if (remaining.length > 0) {
    const last = remaining[remaining.length - 1];
    if (!/^\d{1,2}[-/.=]\d{1,2}[-/.=]\d{2,4}$/.test(last) && !/^\d+$/.test(last)) {
      photographer = remaining.pop();
    }
  }

  // 2. Date parsing (single token DD-MM-YY / DD-MM-YYYY)
  if (remaining.length > 0) {
    const last = remaining[remaining.length - 1];
    const dateMatch = last.match(/^(\d{1,2})[-/.=](\d{1,2})[-/.=](\d{2,4})$/);
    if (dateMatch) {
      const [, d, m, y] = dateMatch;
      const year = y.length === 2 ? '20' + y : y;
      dateStr = `${d.padStart(2, '0')}-${m.padStart(2, '0')}-${year}`;
      remaining.pop();
    }
  }

  // 3. Fallback: 3 separate numeric date tokens (e.g. 15_05_26)
  if (!dateStr && remaining.length >= 3) {
    const p3 = remaining[remaining.length - 1];
    const p2 = remaining[remaining.length - 2];
    const p1 = remaining[remaining.length - 3];
    if (/^\d{1,4}$/.test(p1) && /^\d{1,4}$/.test(p2) && /^\d{1,4}$/.test(p3)) {
      const year = p3.length === 2 ? '20' + p3 : p3;
      dateStr = `${p1.padStart(2, '0')}-${p2.padStart(2, '0')}-${year}`;
      remaining.splice(-3);
    }
  }

  // First token is species
  if (remaining.length > 0) {
    species = remaining.shift();
  }

  // Remaining middle tokens are site
  siteParts = remaining;

  const cap = s => {
    if (!s) return '';
    let str = s.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '').replace(/(jpg|jpeg|png|gif|webp)$/i, '');
    return str.split(/[\s-]+/).map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '').join(' ');
  };

  const siteFromFile = siteParts.map(cap).join(' ');
  const cleanSiteHint = cap(slugify(siteHint));
  const cleanRegionHint = cap(slugify(regionHint));

  let locationParts = [];
  if (siteFromFile) locationParts.push(siteFromFile);
  else if (cleanSiteHint) locationParts.push(cleanSiteHint);
  if (cleanRegionHint) locationParts.push(cleanRegionHint);

  return {
    species: cap(species),
    location: locationParts.join(' · '),
    date: dateStr,
    photographer: cap(photographer),
  };
}

module.exports = {
  slugify,
  parseFilename,
  SUPPORTED_EXT,
  VIDEO_EXT,
  IMAGE_EXT,
};
