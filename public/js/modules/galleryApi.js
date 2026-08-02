'use strict';

window.applyWatermark = function() {};

const API_BASE = '/api/gallery.json';
const FALLBACK_DATA = [
  {cat:'underwater',src:'assets/img/aset_001.jpg',label:'Coral Reef',meta:null},
  {cat:'underwater',src:'assets/img/aset_002.jpg',label:'Soft Coral',meta:null},
  {cat:'underwater',src:'assets/img/aset_003.jpg',label:'Table Coral',meta:null},
  {cat:'underwater',src:'assets/img/aset_009.jpg',label:'Coral Garden',meta:null},
  {cat:'underwater',src:'assets/img/aset_010.jpg',label:'Reef Landscape',meta:null},
  {cat:'underwater',src:'assets/img/aset_011.jpg',label:'Colourful Reef',meta:null},
  {cat:'underwater',src:'assets/img/aset_012.jpg',label:'Soft Coral Colony',meta:null},
  {cat:'underwater',src:'assets/img/aset_013.jpg',label:'Green Coral',meta:null},
  {cat:'underwater',src:'assets/img/aset_014.jpg',label:'Coral Diversity',meta:null},
  {cat:'underwater',src:'assets/img/aset_018.jpg',label:'Diver & Coral',meta:null},
  {cat:'underwater',src:'assets/img/aset_019.jpg',label:'Scuba Diver',meta:null},
  {cat:'underwater',src:'assets/img/aset_027.jpeg',label:'Wall Dive',meta:null},
  {cat:'underwater',src:'assets/img/aset_030.jpeg',label:'Sea Floor',meta:null},
  {cat:'underwater',src:'assets/img/aset_031.jpeg',label:'Starfish & Coral',meta:null},
  {cat:'underwater',src:'assets/img/aset_032.jpeg',label:'Schooling Fish',meta:null},
  {cat:'underwater',src:'assets/img/aset_033.jpeg',label:'Sea Fan',meta:null},
  {cat:'underwater',src:'assets/img/aset_034.jpeg',label:'Coral Wall',meta:null},
  {cat:'underwater',src:'assets/img/aset_038.jpeg',label:'Reef Colour',meta:null},
  {cat:'underwater',src:'assets/img/aset_039.jpeg',label:'Reef Fish',meta:null},
  {cat:'underwater',src:'assets/img/aset_040.jpeg',label:'Deep Coral Garden',meta:null},
  {cat:'underwater',src:'assets/img/aset_043.jpeg',label:'Underwater Vista',meta:null},
  {cat:'underwater',src:'assets/img/aset_044.jpeg',label:'Coral Formation',meta:null},
  {cat:'underwater',src:'assets/img/aset_045.jpeg',label:'Blue Water Dive',meta:null},
  {cat:'underwater',src:'assets/img/aset_046.jpeg',label:'Coral Close-Up',meta:null},
  {cat:'underwater',src:'assets/img/aset_047.jpeg',label:'Reef Detail',meta:null},
  {cat:'underwater',src:'assets/img/aset_048.jpeg',label:'Deep Reef',meta:null},
  {cat:'underwater',src:'assets/img/aset_049.jpeg',label:'Reef Panorama',meta:null},
  {cat:'underwater',src:'assets/img/aset_050.jpeg',label:'Coral Structure',meta:null},
  {cat:'underwater',src:'assets/img/aset_051.jpeg',label:'Marine Scene',meta:null},
  {cat:'underwater',src:'assets/img/aset_052.jpeg',label:'Reef Life',meta:null},
  {cat:'underwater',src:'assets/img/aset_053.jpeg',label:'Underwater World',meta:null},
  {cat:'wildlife',src:'assets/img/aset_004.jpg',label:'Shark — Sangalaki',meta:null},
  {cat:'wildlife',src:'assets/img/aset_005.jpg',label:'Sea Turtle',meta:null},
  {cat:'wildlife',src:'assets/img/aset_006.jpg',label:'Manta Ray',meta:null},
  {cat:'wildlife',src:'assets/img/aset_007.jpg',label:'Manta Ray Duo',meta:null},
  {cat:'wildlife',src:'assets/img/aset_015.jpg',label:'Marine Life',meta:null},
  {cat:'wildlife',src:'assets/img/aset_016.jpg',label:'Giant Manta Ray',meta:null},
  {cat:'wildlife',src:'assets/img/aset_021.jpeg',label:'Dolphin',meta:null},
  {cat:'wildlife',src:'assets/img/aset_022.jpeg',label:'Open Water Dolphin',meta:null},
  {cat:'wildlife',src:'assets/img/aset_023.jpeg',label:'Reef Shark',meta:null},
  {cat:'wildlife',src:'assets/img/aset_024.jpeg',label:'Pelagic Fish',meta:null},
  {cat:'wildlife',src:'assets/img/aset_025.jpeg',label:'Starfish',meta:null},
  {cat:'wildlife',src:'assets/img/aset_026.jpeg',label:'Scorpionfish',meta:null},
  {cat:'wildlife',src:'assets/img/aset_028.jpeg',label:'Solitary Manta',meta:null},
  {cat:'wildlife',src:'assets/img/aset_029.jpeg',label:'Manta Ray — Sangalaki',meta:null},
  {cat:'wildlife',src:'assets/img/aset_035.jpeg',label:'Deep Manta Ray',meta:null},
  {cat:'wildlife',src:'assets/img/aset_036.jpeg',label:'Manta & Diver',meta:null},
  {cat:'wildlife',src:'assets/img/aset_041.jpeg',label:'Hammerhead Shark',meta:null},
  {cat:'wildlife',src:'assets/img/aset_042.jpeg',label:'Bottlenose Dolphin',meta:null},
  {cat:'landscape',src:'assets/img/aset_008.jpg',label:'Sea Fan — Kakaban',meta:null},
  {cat:'landscape',src:'assets/img/aset_017.jpg',label:'Blue Wall',meta:null},
  {cat:'landscape',src:'assets/img/aset_037.jpeg',label:'Deep Blue',meta:null},
];

window.galleryItems = [];
window.allFetched = [];
window.usingAPI = false;
window.activeFilter = 'all';

const REGION_CAT = {
  'maratua': 'underwater',
  'kakaban': 'underwater',
  'derawan': 'landscape',
  'sangalaki': 'wildlife',
  'karang muaras': 'wildlife'
};

function regionToCat(region, site, species) {
  const r = (region || '').toLowerCase();
  const s = (site || '').toLowerCase();
  const sp = (species || '').toLowerCase();

  if (sp.includes('turtle') || sp.includes('shark') || sp.includes('manta') || sp.includes('dolphin') || sp.includes('fish') || sp.includes('crab') || sp.includes('eel') || sp.includes('sea slug') || sp.includes('barracuda')) {
    return 'wildlife';
  }
  if (r.includes('sangalaki')) return 'wildlife';
  if (r.includes('kakaban')) return 'underwater';
  if (r.includes('maratua')) return 'underwater';
  if (r.includes('derawan')) return 'landscape';
  return 'underwater';
}

async function fetchFromAPI() {
  try {
    let r = await fetch(API_BASE);
    if (!r.ok) {
      // Fallback to Express endpoint if static file route failed
      r = await fetch('/api/gallery');
    }
    if (!r.ok) throw new Error('API ' + r.status);
    const groups = await r.json();
    if (!Array.isArray(groups) || groups.length === 0) {
      throw new Error('Empty gallery response');
    }

    const flat = [];
    const seenImageKeys = new Set();

    groups.forEach(group => {
      group.files.forEach(f => {
        let gridSrc = f.url;
        let fullSrc = f.url;

        // Deduplicate identical images across groups/sites
        const dedupeKey = (f.filename || f.url || '').toLowerCase().trim();
        if (seenImageKeys.has(dedupeKey)) return;
        seenImageKeys.add(dedupeKey);

        flat.push({
          src: gridSrc,
          fullSrc: fullSrc,
          label: f.metadata.species || group.site,
          cat: regionToCat(group.region, group.site, f.metadata.species),
          meta: {
            species: f.metadata.species || '',
            location: f.metadata.location || '',
            date: f.metadata.date || '',
            photographer: f.metadata.photographer || '',
            filename: f.filename || ''
          },
          site: group.site,
          region: group.region
        });
      });
    });

    if (flat.length === 0) throw new Error('No items in gallery API');
    window.usingAPI = true;
    return flat;
  } catch (e) {
    console.warn('[gallery] fetchFromAPI error, using FALLBACK_DATA:', e.message);
    window.usingAPI = false;
    return FALLBACK_DATA;
  }
}

function setStatus(text, live) {
  const el = document.getElementById('galleryStatus');
  if (!el) return;
  el.innerHTML = live ? `<span class="live-dot"></span>${text}` : `${text}`;
}

function parseDateFromFilename(src, filename) {
  const raw = filename || (src || '').split('/').pop();
  let base = raw.replace(/\.(jpg|jpeg|png|gif|webp|mp4|mov|avi)$/i, '');
  base = base.replace(/(jpg|jpeg|png|gif|webp)$/i, '');

  const parts = base.split(/_+/);
  for (let j = parts.length - 1; j >= 0; j--) {
    const m = parts[j].match(/^(\d{1,2})[-/.=](\d{1,2})[-/.=](\d{2,4})$/);
    if (m) {
      const [, d, mon, y] = m;
      const yr = y.length === 2 ? '20' + y : y;
      return `${d.padStart(2, '0')}-${mon.padStart(2, '0')}-${yr}`;
    }
  }

  let db = [], i = parts.length - 1;
  if (i >= 0 && !/^\d+$/.test(parts[i])) i--;
  while (i >= 0 && /^\d{1,4}$/.test(parts[i]) && db.length < 3) {
    db.unshift(parts[i]);
    i--;
  }
  if (db.length === 3) {
    const yr = db[2].length === 2 ? '20' + db[2] : db[2];
    return db[0].padStart(2, '0') + '-' + db[1].padStart(2, '0') + '-' + yr;
  }
  return '';
}

function wmLine(item) {
  const m = item.meta;
  let species = m?.species && m.species !== 'Unknown' ? m.species : (item.label && item.label !== 'Unknown' ? item.label : '');
  if (!species && m?.filename) {
    const rawName = m.filename.split(/_+/)[0].replace(/\.[^.]+$/, '');
    species = rawName.replace(/-/g, ' ');
  }
  const loc = [item.site, item.region].filter(Boolean).join(' · ');
  const photographer = m?.photographer && m.photographer !== 'Unknown' ? m.photographer : '';
  const date = (m?.date && m.date.trim()) || parseDateFromFilename(item.src, m?.filename);
  const creditParts = [];
  if (photographer) creditParts.push('© ' + photographer);
  if (date) creditParts.push(date);
  return { species, loc, credit: creditParts.join('  ·  '), photographer, date };
}

const DELAYS = ['d1', 'd2', 'd3'];

function renderGallery(items) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  if (!items.length) {
    grid.innerHTML = '<p class="gallery-empty">No photos found in this category.</p>';
    return;
  }
  grid.innerHTML = items.map((item, i) => {
    const { species, loc, credit } = wmLine(item);
    const alt = species || item.label || '';
    return `<div class="gallery-item sr is-loaded ${DELAYS[i % 3]}" data-idx="${i}" tabindex="0" role="button" aria-label="${alt}">
      <img src="${item.src}" alt="${alt}" decoding="async" class="loaded">
      <div class="g-overlay">
        <i class="ph ph-arrows-out g-expand"></i>
        ${species ? `<span class="g-species">${species}</span>` : ''}
        ${loc ? `<span class="g-location">${loc}</span>` : ''}
        ${credit ? `<span class="g-rule"></span><span class="g-credit">${credit}</span>` : ''}
        <span class="g-brand">derawanencyclopedia.id</span>
      </div></div>`;
  }).join('');
  if (window.observeSR) window.observeSR();
  grid.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', () => {
      if (window.openLB) window.openLB(parseInt(el.dataset.idx));
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' && window.openLB) window.openLB(parseInt(el.dataset.idx));
    });
  });
}

function applyFilter() {
  window.galleryItems = window.activeFilter === 'all'
    ? window.allFetched
    : window.allFetched.filter(i => i.cat === window.activeFilter);
  renderGallery(window.galleryItems);
}

async function initGallery() {
  setStatus('Loading…', false);
  window.allFetched = await fetchFromAPI();
  window.galleryItems = window.allFetched;
  applyFilter();
  if (window.usingAPI) {
    setStatus(`${window.allFetched.length} files from archive`, true);
  } else {
    setStatus(`Showing ${window.allFetched.length} sample photos`, false);
  }
}

window.applyFilter = applyFilter;
window.initGallery = initGallery;

// Attach click listeners for filter buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.activeFilter = btn.dataset.cat || 'all';
      applyFilter();
    });
  });
});
