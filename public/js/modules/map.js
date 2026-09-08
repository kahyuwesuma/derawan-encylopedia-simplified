'use strict';

/* ══════════════════════════════════════════════════════════════════════
   DATA: 5 REGIONS & DIVE SITES (LOADED FROM /data/coordinates.js)
   ══════════════════════════════════════════════════════════════════════ */
const ISLANDS = (typeof window !== 'undefined' && window.DIVE_SITES_DATA) 
  ? window.DIVE_SITES_DATA 
  : [];

/* ─── MAP SNACKBAR NOTIFICATION ─── */
let snackbarTimer = null;
function showMapSnackbar(msg) {
  const sb = document.getElementById('map-snackbar');
  const txt = document.getElementById('map-snackbar-text');
  if (!sb || !txt) return;

  txt.textContent = msg;
  sb.classList.add('show');

  if (snackbarTimer) clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() => {
    sb.classList.remove('show');
  }, 3200);
}
window.showMapSnackbar = showMapSnackbar;


/* ══════════════════════════════════════════════════════════════════════
   NATURAL PSEUDO-RANDOM COORDINATE DISTRIBUTION (ORGANIC SEED-BASED)
   ══════════════════════════════════════════════════════════════════════ */
function _strHash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) + str.charCodeAt(i);
  }
  return Math.abs(h);
}

function _prng(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Maratua island crescent backbone coordinates
const MARATUA_SPINE = [
  { lat: 2.115, lng: 118.605 },
  { lat: 2.140, lng: 118.625 },
  { lat: 2.170, lng: 118.620 },
  { lat: 2.205, lng: 118.635 },
  { lat: 2.235, lng: 118.650 },
  { lat: 2.255, lng: 118.620 },
  { lat: 2.270, lng: 118.580 },
  { lat: 2.278, lng: 118.555 }
];

// Kakaban elongated spine
const KAKABAN_SPINE = [
  { lat: 2.120, lng: 118.490 },
  { lat: 2.135, lng: 118.505 },
  { lat: 2.145, lng: 118.520 },
  { lat: 2.155, lng: 118.540 }
];

function assignDummyCoordinates() {
  ISLANDS.forEach(island => {
    const sites = island.diveSites;
    const total = sites.length;

    sites.forEach((site, index) => {
      // If site already has explicit real GPS coordinates, preserve them
      if (site.lat !== undefined && site.lng !== undefined && site.lat !== null) {
        return;
      }

      const h = _strHash(site.name + '_' + island.id + '_' + index);

      if (island.id === 'maratua') {
        // Natural distribution along Maratua's horseshoe atoll reef
        const t = (index / total + _prng(h) * 0.18) % 1;
        const seg = t * (MARATUA_SPINE.length - 1);
        const idx = Math.min(Math.floor(seg), MARATUA_SPINE.length - 2);
        const frac = seg - idx;
        const p1 = MARATUA_SPINE[idx];
        const p2 = MARATUA_SPINE[idx + 1];

        const baseLat = p1.lat + (p2.lat - p1.lat) * frac;
        const baseLng = p1.lng + (p2.lng - p1.lng) * frac;

        // Organic offset in the water/slope surrounding the atoll
        const offsetLat = (_prng(h + 2) - 0.5) * 0.016;
        const offsetLng = (_prng(h + 3) - 0.5) * 0.018;

        site.lat = Number((baseLat + offsetLat).toFixed(7));
        site.lng = Number((baseLng + offsetLng).toFixed(7));
      } else if (island.id === 'kakaban') {
        // Natural distribution along Kakaban's oblong reef contour
        const t = (index / total + _prng(h) * 0.2) % 1;
        const seg = t * (KAKABAN_SPINE.length - 1);
        const idx = Math.min(Math.floor(seg), KAKABAN_SPINE.length - 2);
        const frac = seg - idx;
        const p1 = KAKABAN_SPINE[idx];
        const p2 = KAKABAN_SPINE[idx + 1];

        const baseLat = p1.lat + (p2.lat - p1.lat) * frac;
        const baseLng = p1.lng + (p2.lng - p1.lng) * frac;

        const offsetLat = (_prng(h + 2) - 0.5) * 0.012;
        const offsetLng = (_prng(h + 3) - 0.5) * 0.014;

        site.lat = Number((baseLat + offsetLat).toFixed(7));
        site.lng = Number((baseLng + offsetLng).toFixed(7));
      } else if (island.id === 'derawan') {
        // Natural scattering in reef slope waters around Pulau Derawan
        const rDist = 0.005 + _prng(h) * 0.012;
        const angle = _prng(h + 1) * Math.PI * 2;
        site.lat = Number((island.lat + rDist * Math.sin(angle)).toFixed(7));
        site.lng = Number((island.lng + rDist * 1.25 * Math.cos(angle)).toFixed(7));
      } else if (island.id === 'sangalaki') {
        // Natural scattering in shallow cleaning reefs around Sangalaki
        const rDist = 0.006 + _prng(h) * 0.014;
        const angle = _prng(h + 1) * Math.PI * 2;
        site.lat = Number((island.lat + rDist * Math.sin(angle)).toFixed(7));
        site.lng = Number((island.lng + rDist * 1.3 * Math.cos(angle)).toFixed(7));
      } else {
        // Muaras / other
        const rDist = 0.008 + _prng(h) * 0.016;
        const angle = _prng(h + 1) * Math.PI * 2;
        site.lat = Number((island.lat + rDist * Math.sin(angle)).toFixed(7));
        site.lng = Number((island.lng + rDist * 1.2 * Math.cos(angle)).toFixed(7));
      }
    });

    island.diveCount = island.diveSites.length;
  });
}
assignDummyCoordinates();

/* ══════════════════════════════════════════════════════════════════════
   HELPERS & STRING NORMALIZATION
   ══════════════════════════════════════════════════════════════════════ */
function dc(d) {
  return d === 'Pemula' ? '#4dd9e8' : d === 'Menengah' ? '#f0c060' : '#f07c6e';
}

function hi(h) {
  const m = {
    Nudibranch: '🐛', 'Giant Frogfish': '🐸', Orca: '🐋', Turtle: '🐢',
    Barracuda: '🐟', 'Moray Eel': '🐍', 'Orangutan Crab': '🦀',
    'Devil Ray': '🐠', Cave: '🕳️', 'Garden Eel': '🐍',
    'Schooling Jack Fish': '🐟', 'Hard Coral': '🪸',
    'Tiger Shark': '🦈', Hiu: '🦈', 'Reef Shark': '🦈',
    'Manta Ray': '🌊', 'Stingless Jellyfish': '🪼', Gorgonian: '🪸',
    'Macro Life': '🔍', 'Drift Dive': '💨', Wreck: '⚓',
    'Nurse Shark & Penyu Hijau': '🦈'
  };
  return m[h] || '✦';
}

function _siteLabel(site, island) {
  return site.name + '  ·  ' + island.name;
}

function normalizeRegion(s) {
  const str = (s || '').toLowerCase();
  if (str.includes('derawan')) return 'derawan';
  if (str.includes('maratua')) return 'maratua';
  if (str.includes('kakaban')) return 'kakaban';
  if (str.includes('sangalaki')) return 'sangalaki';
  if (str.includes('muaras')) return 'muaras';
  return str;
}

function normalizeSite(s) {
  return (s || '')
    .toLowerCase()
    .replace(/^(\d+[\s_-]+)/, '') // Strip leading folder numbers like '01_', '01-'
    .replace(/[^a-z0-9]/g, '');   // Keep alphanumeric only
}

/* ══════════════════════════════════════════════════════════════════════
   SYNC DIVE SITE PHOTOS WITH GOOGLE DRIVE / GALLERY MANIFEST
   ══════════════════════════════════════════════════════════════════════ */
async function syncDiveSitePhotos() {
  let galleryData = null;

  try {
    const res = await fetch('/api/gallery');
    if (res.ok) galleryData = await res.json();
  } catch (e) { }

  if (!galleryData || !galleryData.length) {
    try {
      const res = await fetch('/api/gallery.json');
      if (res.ok) galleryData = await res.json();
    } catch (e) { }
  }

  if (!galleryData || !galleryData.length) {
    try {
      const res = await fetch('/gallery.json');
      if (res.ok) galleryData = await res.json();
    } catch (e) { }
  }

  const galleryMap = new Map();
  if (Array.isArray(galleryData)) {
    galleryData.forEach(group => {
      const rKey = normalizeRegion(group.region || group.regionRaw);
      const sKey = normalizeSite(group.site || group.siteRaw);
      const key = `${rKey}:::${sKey}`;
      const validFiles = (group.files || []).filter(f => f.type === 'image' || !f.type);
      if (!galleryMap.has(key)) {
        galleryMap.set(key, validFiles);
      } else {
        galleryMap.set(key, galleryMap.get(key).concat(validFiles));
      }
    });
  }

  // Hydrate all dive sites with real Google Drive photos
  ISLANDS.forEach(island => {
    const rKey = island.id;
    island.diveSites.forEach((site, idx) => {
      const sKey = normalizeSite(site.name);
      const driveFiles = galleryMap.get(`${rKey}:::${sKey}`);

      if (driveFiles && driveFiles.length > 0) {
        site.photos = driveFiles.map(f => {
          let label = site.name;
          if (f.metadata && f.metadata.species && f.metadata.species !== 'Unknown') {
            label = `${f.metadata.species} — ${f.metadata.location || site.name}`;
          } else if (f.filename) {
            label = f.filename.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
          }
          return {
            src: f.url,
            caption: label,
            meta: f.metadata || {}
          };
        });
      } else {
        // Strictly empty if no photos in Google Drive
        site.photos = [];
      }
    });
  });

  // Re-render map markers if map is initialized
  if (map) {
    if (lvl === 1) {
      renderIslands();
    } else if (lvl === 2 && activeIsland) {
      showIslandPanel(activeIsland);
    }
  }
}

/* ══════════════════════════════════════════════════════════════════════
   MAP INIT AND CONTROLS
   ══════════════════════════════════════════════════════════════════════ */
let map, lvl = 1, activeIsland = null, islandMks = [], diveMks = [];

function initAtlasMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  // Center coordinate covers all 5 islands from Derawan down to Karang Muaras
  map = L.map('map', {
    center: [2.12, 118.48],
    zoom: 9.6,
    zoomControl: false,
    attributionControl: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    className: 'map-tiles'
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.control.attribution({ position: 'bottomleft', prefix: '© OpenStreetMap' }).addTo(map);

  renderIslands();
  syncDiveSitePhotos();
}

function mkIslandIcon() {
  return L.divIcon({
    className: '',
    iconSize: [46, 46],
    iconAnchor: [23, 23],
    popupAnchor: [0, -28],
    html: `<div class="mk-island"><div class="mk-ring2"></div><div class="mk-ring"></div>
      <div class="mk-core">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22c4.97-5.5 8-9.5 8-13A8 8 0 0 0 4 9c0 3.5 3.03 7.5 8 13z"/>
          <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none"/>
        </svg>
      </div></div>`
  });
}

function mkDiveIcon() {
  return L.divIcon({
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -18],
    html: `<div class="mk-dive"><div class="mk-dive-ring"></div><div class="mk-dive-dot"></div></div>`
  });
}

function clrM(arr) {
  arr.forEach(m => m.remove());
  arr.length = 0;
}

function renderIslands() {
  clrM(islandMks);
  clrM(diveMks);

  ISLANDS.forEach(island => {
    const cover = island.diveSites.find(s => s.photos?.length)?.photos[0].src || '';
    const coverHTML = cover
      ? `<div class="island-ph"><img src="${cover}" alt="${island.name}" class="no-wm" onerror="this.closest('.island-ph').style.display='none'"><div class="island-ph-grad"></div></div>`
      : '';
    const html = `<div class="popup-card">${coverHTML}<div class="pp-body">
      <div class="pp-tag">Pulau / Region Utama</div>
      <div class="pp-name">${island.name}</div>
      <div class="pp-desc">${island.desc}</div>
      <div style="display:flex;gap:10px;margin-top:7px;padding-top:7px;border-top:1px solid rgba(255,255,255,.05)">
        <div style="font-size:8.5px;color:var(--sand-ghost)">Sites: <span style="color:var(--teal)">${island.diveCount}</span></div>
        <div style="font-size:8.5px;color:var(--sand-ghost)">Area: <span style="color:var(--teal)">${island.area}</span></div>
      </div>
      <button class="pp-cta" onclick="zoomToIsland('${island.id}')">Jelajahi Dive Sites →</button>
    </div></div>`;

    const mk = L.marker([island.lat, island.lng], { icon: mkIslandIcon() });
    mk.bindPopup(html, { maxWidth: 266 });
    mk.on('click', () => mk.openPopup());
    mk.addTo(map);
    islandMks.push(mk);
  });
}

function zoomToIsland(id) {
  const island = ISLANDS.find(i => i.id === id);
  if (!island) return;

  activeIsland = island;
  lvl = 2;
  map.closePopup();
  clrM(islandMks);

  const targetZoom = island.id === 'maratua' ? 12.3 : (island.id === 'muaras' ? 12.5 : 13);
  map.flyTo([island.lat, island.lng], targetZoom, { duration: 1.2, easeLinearity: 0.5 });

  setTimeout(() => {
    clrM(diveMks);
    island.diveSites.forEach((site, i) => {
      setTimeout(() => {
        if (site.lat === null || site.lat === undefined) return;
        const mk = L.marker([site.lat, site.lng], { icon: mkDiveIcon() });
        mk.siteName = site.name;
        const col = dc(site.difficulty);
        const cover = site.photos?.length ? site.photos[0].src : '';
        const pCount = site.photos?.length || 0;
        const photoBlock = cover
          ? `<div class="pp-photo"><img src="${cover}" alt="${site.name}" class="no-wm" onerror="this.closest('.pp-photo').style.display='none'">
             <div class="pp-grad"></div>
             <div class="pp-badge" style="color:${col}">${site.difficulty}</div></div>`
          : `<div class="pp-photo pp-empty-ph" style="height:36px;background:rgba(255,255,255,0.03);display:flex;align-items:center;padding:0 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><div class="pp-badge" style="position:static;color:${col}">${site.difficulty}</div></div>`;

        const actionBtn = pCount > 0
          ? `<button class="pp-action-btn" onclick="window.openCinematicFromPopup('${island.id}', '${site.name.replace(/'/g, "\\'")}')">
              Jelajahi Rute →
            </button>`
          : `<button class="pp-action-btn" style="opacity:0.7;cursor:pointer;" onclick="showMapSnackbar('Dokumentasi foto untuk titik ${site.name.replace(/'/g, "\\'")} belum tersedia.')">
              Jelajahi Rute →
            </button>`;

        const photoMeta = pCount > 0 ? ` · ${pCount} Foto` : ' · 0 Foto';

        const html = `<div class="popup-card">${photoBlock}<div class="pp-body">
          <div class="pp-tag" style="color:${col}">${site.difficulty}${site.depth !== '—' ? ' · ' + site.depth : ''}${photoMeta}</div>
          <div class="pp-name">${site.name}</div>
          <div class="pp-desc">${site.desc}</div>
          ${site.highlight && site.highlight !== '—'
            ? `<div class="pp-hi"><span class="pp-hi-icon">${hi(site.highlight)}</span><span class="pp-hi-txt">${site.highlight}</span></div>`
            : ''}
          ${actionBtn}
        </div></div>`;

        mk.bindPopup(html, { maxWidth: 266 });
        mk.addTo(map);
        diveMks.push(mk);
      }, i * 40);
    });
  }, 750);

  showIslandPanel(island);
}

function showIslandPanel(island) {
  const backBtn = document.getElementById('btn-back');
  if (backBtn) backBtn.classList.add('on');

  const eyEl = document.getElementById('ih-ey');
  if (eyEl) eyEl.textContent = 'Pulau / Region Terpilih';

  const ttlEl = document.getElementById('ih-ttl');
  if (ttlEl) ttlEl.textContent = island.name;

  const cover = island.diveSites.find(s => s.photos?.length)?.photos[0].src || '';
  const ihImg = document.getElementById('ih-img');
  const ihEl = document.getElementById('island-hero');

  if (ihEl) ihEl.classList.remove('loaded');

  if (cover && ihImg && ihEl) {
    ihImg.classList.remove('no-wm');
    ihImg.src = '';
    ihImg.onload = function () {
      ihEl.classList.add('loaded');
      if (window.applyWatermark) {
        window.applyWatermark(ihImg, { locationLine: island.name + '  ·  Kepulauan Derawan' });
      }
    };
    ihImg.src = cover;
  }

  const descEl = document.getElementById('ib-desc');
  if (descEl) descEl.textContent = island.desc;

  const countEl = document.getElementById('ib-count');
  if (countEl) countEl.textContent = island.diveCount;

  const statsEl = document.getElementById('ib-stats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="ist"><div class="ist-val">${island.diveCount}</div><div class="ist-lbl">Dive Sites</div></div>
      <div class="ist"><div class="ist-val">${island.depth}</div><div class="ist-lbl">Kedalaman</div></div>
      <div class="ist"><div class="ist-val">${island.area}</div><div class="ist-lbl">Luas Area</div></div>`;
  }

  const listEl = document.getElementById('ib-list');
  if (listEl) {
    listEl.innerHTML = island.diveSites.map(s => {
      const cover = s.photos?.length ? s.photos[0].src : '';
      const col = dc(s.difficulty);
      const pCount = s.photos?.length || 0;
      return `<div class="site-row ${pCount === 0 ? 'site-row-empty' : ''}" onclick="onSiteRowClick('${island.id}','${s.name.replace(/'/g, "\\'")}')">
        <div class="site-row-thumb">${cover ? `<img src="${cover}" class="no-wm" onerror="this.parentElement.innerHTML=''">` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:9.5px;color:var(--sand-ghost);background:rgba(255,255,255,0.03);">0</div>'}</div>
        <div class="site-row-info">
          <div class="site-row-name">${s.name}</div>
          <div class="site-row-meta" style="color:${col}">${s.difficulty}${s.depth !== '—' ? ' · ' + s.depth : ''} · <span style="${pCount === 0 ? 'color:var(--sand-ghost)' : 'color:var(--teal)'}">${pCount} foto</span></div>
        </div>
        <svg class="site-row-arr" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </div>`;
    }).join('');
  }

  const panel = document.getElementById('island-panel');
  if (panel) {
    panel.classList.remove('collapsed');
    panel.classList.add('on');
  }
}

function onSiteRowClick(islandId, siteName) {
  try {
    const island = ISLANDS.find(i => i.id === islandId);
    if (!island) return;
    const site = island.diveSites.find(s => s.name === siteName);
    if (!site) return;

    if (site.lat !== null && site.lat !== undefined) {
      let foundMk = null;
      diveMks.forEach(m => {
        if (m.siteName === site.name) foundMk = m;
      });
      if (foundMk) {
        map.panTo([site.lat, site.lng], { animate: true, duration: 0.6 });
        foundMk.fire('click');
      } else {
        openCinematic(site, island);
      }
    } else {
      openCinematic(site, island);
    }
  } catch (err) {
    console.error('Error in onSiteRowClick:', err);
  }
}

function openCinematicFromPopup(islandId, siteName) {
  const island = ISLANDS.find(i => i.id === islandId);
  if (!island) return;
  const site = island.diveSites.find(s => s.name === siteName);
  if (!site) return;
  openCinematic(site, island);
}

function goBack() {
  if (lvl === 1) return;
  lvl = 1;
  activeIsland = null;
  clrM(diveMks);
  if (map) map.closePopup();
  closeCinematic();

  if (map) {
    map.flyTo([2.12, 118.48], 9.6, { duration: 1.2, easeLinearity: 0.5 });
  }
  setTimeout(() => renderIslands(), 600);

  const backBtn = document.getElementById('btn-back');
  if (backBtn) backBtn.classList.remove('on');

  const panel = document.getElementById('island-panel');
  if (panel) panel.classList.remove('on');
}

/* ══════════════════════════════════════════════════════════════════════
   CINEMATIC TAKEOVER
   ══════════════════════════════════════════════════════════════════════ */
let cinPhotos = [], cinIdx = 0, cinSite = null, cinIsland = null;

function openCinematic(site, island) {
  cinSite = site;
  cinIsland = island;
  cinPhotos = site.photos || [];
  cinIdx = 0;
  if (!cinPhotos.length) {
    showMapSnackbar(`Dokumentasi foto untuk titik ${site.name} belum tersedia.`);
    return;
  }

  buildCinTrack();
  fillCinInfo();
  buildFilmstrip();
  buildCinDots();

  const cin = document.getElementById('cinematic');
  if (cin) {
    cin.classList.add('open');
    cin.style.pointerEvents = 'all';
  }
  document.body.classList.add('cinematic-open');

  const label = _siteLabel(site, island);
  setTimeout(() => {
    document.querySelectorAll('#cin-track img, #cin-filmstrip img').forEach(img => {
      if (!img.classList.contains('no-wm') && window.applyWatermark) {
        window.applyWatermark(img, { locationLine: label });
      }
    });
  }, 280);
}

function closeCinematic() {
  const cin = document.getElementById('cinematic');
  if (cin) {
    cin.classList.remove('open');
    cin.style.pointerEvents = 'none';
  }
  document.body.classList.remove('cinematic-open');
  if (map) {
    map.closePopup();
  }
}

function buildCinTrack() {
  const track = document.getElementById('cin-track');
  if (!track) return;
  track.innerHTML = cinPhotos.map((p, i) => `
    <div class="cin-slide${i === 0 ? ' cur' : ''}">
      <img src="${p.src}" alt="${p.caption || ''}" loading="eager" onerror="this.closest('.cin-slide').style.display='none'">
      <div class="cin-grad"></div>
    </div>`).join('');
  track.style.transform = 'translateX(0)';
}

function toggleSidebar() {
  const panel = document.getElementById('island-panel');
  if (panel) {
    panel.classList.toggle('collapsed');
  }
}

function fillCinInfo() {
  const s = cinSite, isl = cinIsland;
  const col = dc(s.difficulty);

  const islLbl = document.getElementById('cin-island-lbl');
  if (islLbl) islLbl.textContent = isl ? isl.name : '—';

  const siteIdx = (isl ? isl.diveSites.findIndex(x => x.name === s.name) : 0) + 1;
  const total = isl ? isl.diveSites.length : 1;

  const numEl = document.getElementById('cin-site-num');
  if (numEl) numEl.textContent = `Site ${String(siteIdx).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  const diffEl = document.getElementById('cin-diff');
  if (diffEl) diffEl.style.color = col;

  const diffDot = document.getElementById('cin-diff-dot');
  if (diffDot) diffDot.style.background = col;

  const diffTxt = document.getElementById('cin-diff-txt');
  if (diffTxt) diffTxt.textContent = s.difficulty;

  const titleEl = document.getElementById('cin-title');
  if (titleEl) titleEl.textContent = s.name;

  const ruleN = document.getElementById('cin-rule-n');
  if (ruleN) ruleN.textContent = String(siteIdx).padStart(2, '0');

  const descEl = document.getElementById('cin-desc');
  if (descEl) descEl.textContent = s.desc;

  const topLbl = document.getElementById('cin-top-label');
  if (topLbl) topLbl.textContent = s.name;

  const stats = [];
  if (s.depth && s.depth !== '—') stats.push({ v: s.depth, l: 'Kedalaman' });
  stats.push({ v: s.difficulty, l: 'Level', col });
  if (cinPhotos.length > 1) stats.push({ v: cinPhotos.length, l: 'Foto' });

  const statsEl = document.getElementById('cin-stats');
  if (statsEl) {
    statsEl.innerHTML = stats.map(st => `
      <div class="cin-stat">
        <div class="cin-stat-v" style="${st.col ? 'color:' + st.col : ''}">${st.v}</div>
        <div class="cin-stat-l">${st.l}</div>
      </div>`).join('');
  }

  const hiEl = document.getElementById('cin-highlight');
  if (hiEl) {
    if (s.highlight && s.highlight !== '—') {
      const iconEl = document.getElementById('cin-hi-icon');
      if (iconEl) iconEl.textContent = hi(s.highlight);
      const lblEl = document.getElementById('cin-hi-label');
      if (lblEl) lblEl.textContent = s.highlight;
      hiEl.style.display = 'flex';
    } else {
      hiEl.style.display = 'none';
    }
  }

  updateCinCaption();
}

function buildFilmstrip() {
  const fs = document.getElementById('cin-filmstrip');
  if (!fs) return;
  fs.innerHTML = cinPhotos.map((p, i) => `
    <div class="cin-film-thumb${i === 0 ? ' cur' : ''}" onclick="goToCin(${i})">
      <img src="${p.src}" alt="" loading="lazy" onerror="this.closest('.cin-film-thumb').style.display='none'">
      <div class="cin-film-label">${p.caption || ''}</div>
    </div>`).join('');
  const show = cinPhotos.length > 1;
  fs.style.display = show ? 'flex' : 'none';

  const counterEl = document.getElementById('cin-counter');
  if (counterEl) counterEl.style.display = show ? 'block' : 'none';

  document.querySelectorAll('.cin-arrow').forEach(a => a.style.display = show ? 'flex' : 'none');
  updateCinCount();
}

function buildCinDots() {
  const d = document.getElementById('cin-dots');
  if (!d) return;
  if (cinPhotos.length <= 1 || cinPhotos.length > 8) {
    d.style.display = 'none';
    return;
  }
  d.style.display = 'flex';
  d.innerHTML = cinPhotos.map((_, i) =>
    `<div class="cin-dot${i === 0 ? ' cur' : ''}" onclick="goToCin(${i})"></div>`).join('');
}

function goToCin(n) {
  if (n === cinIdx) return;
  const slides = document.querySelectorAll('.cin-slide');
  const thumbs = document.querySelectorAll('.cin-film-thumb');
  const dots = document.querySelectorAll('.cin-dot');
  slides[cinIdx]?.classList.remove('cur');
  thumbs[cinIdx]?.classList.remove('cur');
  dots[cinIdx]?.classList.remove('cur');

  cinIdx = ((n % cinPhotos.length) + cinPhotos.length) % cinPhotos.length;
  slides[cinIdx]?.classList.add('cur');
  thumbs[cinIdx]?.classList.add('cur');
  dots[cinIdx]?.classList.add('cur');

  const track = document.getElementById('cin-track');
  if (track) track.style.transform = `translateX(-${cinIdx * 100}vw)`;

  updateCinCaption();
  updateCinCount();
  thumbs[cinIdx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function cinNav(dir) {
  goToCin(cinIdx + dir);
}

function updateCinCaption() {
  const p = cinPhotos[cinIdx];
  const capEl = document.getElementById('cin-caption');
  if (capEl) capEl.textContent = p?.caption || '';

  const curEl = document.getElementById('cin-cur');
  if (curEl) curEl.textContent = `${cinIdx + 1}/${cinPhotos.length}`;
}

function updateCinCount() {
  const curEl = document.getElementById('cin-cur');
  if (curEl) curEl.textContent = `${cinIdx + 1}/${cinPhotos.length}`;
}

/* ══════════════════════════════════════════════════════════════════════
   GALLERY LIGHTBOX INTEGRATION
   ══════════════════════════════════════════════════════════════════════ */
function openGalleryLightbox() {
  if (!cinSite || !cinPhotos.length) return;

  const formattedItems = cinPhotos.map(p => ({
    src: p.src,
    fullSrc: p.src,
    label: p.caption,
    site: cinSite.name,
    region: cinIsland ? cinIsland.name : '',
    meta: p.meta || {
      species: p.caption,
      photographer: 'Derawan Encyclopedia',
      date: ''
    }
  }));

  window._galleryBackup = window.galleryItems;
  window.galleryItems = formattedItems;

  setupLightboxOverride();

  if (window.openLB) {
    window.openLB(cinIdx);
  }
}

function setupLightboxOverride() {
  if (window.closeLB && !window.closeLB._isOverridden) {
    const origCloseLB = window.closeLB;
    window.closeLB = function () {
      if (window._galleryBackup) {
        window.galleryItems = window._galleryBackup;
        window._galleryBackup = null;
      }
      origCloseLB();
    };
    window.closeLB._isOverridden = true;
  }
}

/* ══════════════════════════════════════════════════════════════════════
   GLOBAL COMPATIBILITY BINDINGS
   ══════════════════════════════════════════════════════════════════════ */
window.zoomToIsland = zoomToIsland;
window.goBack = goBack;
window.onSiteRowClick = onSiteRowClick;
window.openCinematic = openCinematic;
window.closeCinematic = closeCinematic;
window.goToCin = goToCin;
window.cinNav = cinNav;
window.openGalleryLightbox = openGalleryLightbox;
window.toggleSidebar = toggleSidebar;
window.openCinematicFromPopup = openCinematicFromPopup;
window.syncDiveSitePhotos = syncDiveSitePhotos;

const startMap = () => {
  if (!map) {
    initAtlasMap();
  } else {
    syncDiveSitePhotos();
  }

  const cinEl = document.getElementById('cinematic');
  if (cinEl && !cinEl.dataset.swipeBound) {
    cinEl.dataset.swipeBound = 'true';
    cinEl.addEventListener('touchstart', e => {
      e.currentTarget._tx = e.touches[0].clientX;
    }, { passive: true });
    cinEl.addEventListener('touchend', e => {
      const d = e.currentTarget._tx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 60) cinNav(d > 0 ? 1 : -1);
    }, { passive: true });
  }
};

document.addEventListener('DOMContentLoaded', startMap);
document.addEventListener('includes:loaded', startMap);
