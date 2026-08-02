'use strict';

const fs = require('fs');
const path = require('path');
const { ASSETS_ROOT, STATIC_JSON_PATH } = require('../config/constants');
const { slugify, parseFilename, IMAGE_EXT } = require('../src/services/filenameParser');

function scan() {
  const result = [];

  if (!fs.existsSync(ASSETS_ROOT)) return result;

  const regions = fs.readdirSync(ASSETS_ROOT);

  for (const region of regions) {
    const regionPath = path.join(ASSETS_ROOT, region);
    if (!fs.statSync(regionPath).isDirectory()) continue;

    const sites = fs.readdirSync(regionPath);

    for (const site of sites) {
      const sitePath = path.join(regionPath, site);
      if (!fs.statSync(sitePath).isDirectory()) continue;

      const files = fs.readdirSync(sitePath);

      const seenNames = new Set();
      const fileItems = [];
      for (const f of files) {
        const ext = path.extname(f).toLowerCase();
        if (!IMAGE_EXT.has(ext)) continue;
        if (seenNames.has(f.toLowerCase())) continue;
        seenNames.add(f.toLowerCase());

        fileItems.push({
          url: `/assets/api/${region}/${site}/${f}`,
          filename: f,
          type: 'image',
          metadata: parseFilename(f, region, site)
        });
      }

      // skip kalau kosong
      if (fileItems.length === 0) continue;

      result.push({
        region: slugify(region),
        site: slugify(site),
        files: fileItems
      });
    }
  }

  return result;
}

const output = scan();

const dir = path.dirname(STATIC_JSON_PATH);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(STATIC_JSON_PATH, JSON.stringify(output, null, 2));

console.log(`✅ gallery.json generated (${output.length} sites)`);