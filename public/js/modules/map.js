'use strict';

/* ══════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════ */
const ISLANDS = [
  {
    id:'derawan',name:'Pulau Derawan',lat:2.2833,lng:118.2500,
    desc:'Pulau terbesar dan paling berkembang di kepulauan ini. Dikenal sebagai surga penyu hijau dan terumbu karang dangkal yang memukau.',
    area:'5.2 km²',depth:'5–25 m',diveCount:2,
    diveSites:[
      {name:'Antennarius Commerson',lat:2.2810347,lng:118.2462734,desc:'Habitat Giant Frogfish (Antennarius commerson) yang berkamuflase sempurna di antara karang dan spons laut.',difficulty:'Pemula',depth:'—',highlight:'Giant Frogfish',
        photos:[{src:'assets/img/underwater/gambar_025.jpeg',caption:'Giant Frogfish — kamuflase di karang'},{src:'assets/img/underwater/gambar_024.jpeg',caption:'Detail tekstur spons inang'},{src:'assets/img/underwater/gambar_023.jpeg',caption:'Habitat hard coral sekitar'}]},
      {name:'Nudibranch',lat:2.285821,lng:118.251912,desc:'Keanekaragaman nudibranch yang tinggi ditemukan di slope karang dangkal Derawan.',difficulty:'Pemula',depth:'—',highlight:'Nudibranch',
        photos:[{src:'assets/img/underwater/gambar_019.jpeg',caption:'Nudibranch Chromodoris — biru & putih'},{src:'assets/img/underwater/gambar_020.jpeg',caption:'Nudibranch Flabellina — sirip merah'},{src:'assets/img/underwater/gambar_021.jpeg',caption:'Nudibranch Hypselodoris'}]},
    ]
  },
  {
    id:'maratua',name:'Pulau Maratua',lat:2.2167,lng:118.6167,
    desc:'Atol berbentuk tapal kuda dengan laguna biru zamrud di tengahnya. Salah satu titik selam terbaik di Kalimantan Timur.',
    area:'38.6 km²',depth:'5–40 m',diveCount:11,
    diveSites:[
      {name:'Turtle Traffic (1)',lat:2.142634,lng:118.6312693,desc:'Migrasi Orca tercatat di titik ini. Kedalaman ekstrem dengan arus kuat — khusus penyelam berpengalaman.',difficulty:'Mahir',depth:'>40 m',highlight:'Orca',
        photos:[{src:'assets/img/underwater/gambar_009.jpeg',caption:'Orca melintas di kolom air dalam'},{src:'assets/img/underwater/gambar_003.jpg',caption:'Permukaan perairan Turtle Traffic'}]},
      {name:'Turtle Traffic (2)',lat:2.152814,lng:118.627914,desc:'Jalur lintasan penyu yang aktif di perairan dangkal Maratua. Spot terbaik untuk snorkeling bersama penyu hijau.',difficulty:'Pemula',depth:'—',highlight:'Turtle',
        photos:[{src:'assets/img/underwater/gambar_003.jpg',caption:'Penyu hijau melintas'},{src:'assets/img/underwater/gambar_004.jpg',caption:'Penyu beristirahat di karang'}]},
      {name:'Tanjung Kelapa',lat:2.112948,lng:118.601834,desc:'Tanjung dengan arus kuat, titik pertemuan tiger shark musiman di perairan biru Maratua.',difficulty:'Menengah',depth:'40 m',highlight:'Tiger Shark',
        photos:[{src:'assets/img/underwater/gambar_026.jpeg',caption:'Tiger shark di perairan biru Maratua'}]},
      {name:'Ell Garden',lat:2.272796,lng:118.556238,desc:'Hamparan garden eel di dasar berpasir kedalaman 25 meter. Pendekatan harus perlahan agar eel tidak bersembunyi.',difficulty:'Pemula',depth:'25 m',highlight:'Garden Eel',
        photos:[{src:'assets/img/underwater/gambar_010.jpeg',caption:'Garden eel di dasar pasir'},{src:'assets/img/underwater/gambar_011.jpeg',caption:'Eel colony dari jarak dekat'},{src:'assets/img/underwater/gambar_012.jpeg',caption:'Dasar pasir putih sekitar lokasi'}]},
      {name:'Channel',lat:2.256366,lng:118.64242,desc:'Selat berarus dengan keanekaragaman nudibranch tinggi di dinding karang. Terbaik saat slack tide.',difficulty:'Menengah',depth:'40 m',highlight:'Nudibranch',
        photos:[{src:'assets/img/underwater/gambar_011.jpeg',caption:'Nudibranch di dinding Channel'},{src:'assets/img/underwater/gambar_019.jpeg',caption:'Chromodoris — warna khas Channel'},{src:'assets/img/underwater/gambar_022.jpeg',caption:'Soft coral dinding karang'},{src:'assets/img/underwater/gambar_023.jpeg',caption:'Tutupan hard coral Channel'}]},
      {name:'Site Maratua 6',lat:2.2036958,lng:118.5888022,desc:'Terumbu karang di kedalaman 20 meter dengan kepadatan ikan karang yang tinggi dan warna-warni karang keras.',difficulty:'Pemula',depth:'20 m',highlight:'—',
        photos:[{src:'assets/img/underwater/gambar_001.jpg',caption:'Terumbu karang Maratua 6'},{src:'assets/img/underwater/gambar_005.jpg',caption:'Ikan karang beraneka warna'}]},
      {name:'Site Maratua 7',lat:2.2037813,lng:118.5896179,desc:'Slope karang yang landai dengan tutupan soft coral yang rapat, ideal untuk penyelaman santai.',difficulty:'Pemula',depth:'—',highlight:'—',
        photos:[{src:'assets/img/underwater/gambar_005.jpg',caption:'Slope karang Site 7'}]},
      {name:'Halo Tabung Cave',lat:2.1845733,lng:118.6172276,desc:'Gua tabung unik dengan formasi karang dan sponge di dinding gua. Cahaya biru masuk dari mulut gua.',difficulty:'Pemula',depth:'—',highlight:'Cave',
        photos:[{src:'assets/img/underwater/gambar_007.jpeg',caption:'Cahaya biru dari mulut gua'},{src:'assets/img/underwater/gambar_008.jpeg',caption:'Formasi sponge di dinding gua'}]},
      {name:'Hiu',lat:2.2094453,lng:118.6750138,desc:'Titik observasi hiu di perairan dalam Maratua dengan visibilitas luar biasa.',difficulty:'Pemula',depth:'—',highlight:'Hiu',
        photos:[{src:'assets/img/underwater/gambar_008.jpeg',caption:'Hiu karang melintas'},{src:'assets/img/underwater/gambar_009.jpeg',caption:'Kolom air visibilitas tinggi'}]},
      {name:'Belut Moray, Honeycomb',lat:2.2824475,lng:118.5593123,desc:'Habitat belut moray honeycomb (Gymnothorax favagineus) — salah satu moray terbesar di Indo-Pasifik.',difficulty:'Pemula',depth:'—',highlight:'Moray Eel',
        photos:[{src:'assets/img/underwater/gambar_013.jpeg',caption:'Moray honeycomb keluar dari celah'},{src:'assets/img/underwater/gambar_014.jpeg',caption:'Detail pola honeycomb'},{src:'assets/img/underwater/gambar_015.jpeg',caption:'Ukuran moray dibanding penyelam'}]},
      {name:'Baracuda',lat:2.1946869,lng:118.6802106,desc:'Schooling baracuda dalam jumlah besar berputar membentuk tornado di kolom air terbuka.',difficulty:'Pemula',depth:'—',highlight:'Barracuda',
        photos:[{src:'assets/img/underwater/gambar_013.jpeg',caption:'Tornado schooling barracuda'},{src:'assets/img/underwater/gambar_016.jpeg',caption:'Barracuda close-up'}]},
    ]
  },
  {
    id:'kakaban',name:'Pulau Kakaban',lat:2.1500,lng:118.4833,
    desc:'Fenomena alam langka — danau air laut purba yang terkurung daratan dan dihuni ubur-ubur tanpa sengat.',
    area:'7.7 km²',depth:'2–35 m',diveCount:6,
    diveSites:[
      {name:'Nudibranch',lat:2.1515642,lng:118.5407622,desc:'Dinding karang Kakaban yang kaya akan nudibranch beraneka ragam warna dan bentuk.',difficulty:'Menengah',depth:'—',highlight:'Nudibranch',
        photos:[{src:'assets/img/underwater/gambar_019.jpeg',caption:'Nudibranch Chromodoris Kakaban'},{src:'assets/img/underwater/gambar_020.jpeg',caption:'Nudibranch Flabellina — sirip merah'},{src:'assets/img/underwater/gambar_021.jpeg',caption:'Nudibranch Hypselodoris di soft coral'}]},
      {name:'Orangutan Crab',lat:2.136094,lng:118.508518,desc:'Kepiting orangutan (Achaeus japonicus) bersembunyi di antara tentakel soft coral dan anemon.',difficulty:'Pemula',depth:'—',highlight:'Orangutan Crab',
        photos:[{src:'assets/img/underwater/gambar_020.jpeg',caption:'Orangutan crab di bubble coral'},{src:'assets/img/underwater/gambar_021.jpeg',caption:'Detail rambut oranye kepiting'},{src:'assets/img/underwater/gambar_022.jpeg',caption:'Soft coral inang'}]},
      {name:'Deviray',lat:2.1172189,lng:118.560872,desc:'Area observasi ikan pari setan (devil ray) yang melintas di atas reef Kakaban.',difficulty:'Pemula',depth:'—',highlight:'Devil Ray',
        photos:[{src:'assets/img/underwater/gambar_002.jpg',caption:'Devil ray melintas di atas reef'},{src:'assets/img/underwater/gambar_003.jpg',caption:'Siluet devil ray dari bawah'}]},
      {name:'Hiu',lat:2.1176809,lng:118.5599041,desc:'Titik observasi hiu karang di sisi timur Kakaban dengan terumbu yang masih sangat prima.',difficulty:'Pemula',depth:'—',highlight:'Reef Shark',
        photos:[{src:'assets/img/underwater/gambar_026.jpeg',caption:'Reef shark di terumbu timur Kakaban'},{src:'assets/img/underwater/gambar_008.jpeg',caption:'Hiu berenang di kolom air'}]},
      {name:'Schooling Jack Fish',lat:2.1380554,lng:118.5051203,desc:'Ribuan ikan jack membentuk schooling masif yang berputar-putar membentuk dinding ikan yang menakjubkan.',difficulty:'Pemula',depth:'—',highlight:'Schooling Jack Fish',
        photos:[{src:'assets/img/underwater/gambar_012.jpeg',caption:'Schooling jack fish — dinding ikan'},{src:'assets/img/underwater/gambar_013.jpeg',caption:'Tornado jack fish dari bawah'}]},
      {name:'Terumbu Karang',lat:2.1548811,lng:118.5108653,desc:'Terumbu karang Kakaban dengan tutupan hard coral yang sangat tinggi dan warna-warni yang menakjubkan.',difficulty:'Pemula',depth:'—',highlight:'Hard Coral',
        photos:[{src:'assets/img/underwater/gambar_023.jpeg',caption:'Hard coral Kakaban'},{src:'assets/img/underwater/gambar_024.jpeg',caption:'Warna-warni karang'},{src:'assets/img/underwater/gambar_025.jpeg',caption:'Ikan karang di antara hard coral'}]},
    ]
  },
  {
    id:'sangalaki',name:'Pulau Sangalaki',lat:2.0833,lng:118.3667,
    desc:'Pulau kecil yang menjadi surga manta ray dan penyu. Dikenal memiliki cleaning station manta ray aktif.',
    area:'1.7 km²',depth:'5–30 m',diveCount:1,
    diveSites:[
      {name:'Nudibranch',lat:2.093739,lng:118.4013775,desc:'Nudibranch beragam ditemukan di karang-karang dangkal sekitar Sangalaki, bersama schooling fish kecil.',difficulty:'Menengah',depth:'—',highlight:'Nudibranch',
        photos:[{src:'assets/img/underwater/gambar_022.jpeg',caption:'Nudibranch Sangalaki'},{src:'assets/img/underwater/gambar_019.jpeg',caption:'Chromodoris di soft coral'},{src:'assets/img/underwater/gambar_021.jpeg',caption:'Hypselodoris — detail warna'}]},
    ]
  },
];

// Preprocess photo paths to map dummy assets to real assets
ISLANDS.forEach(island => {
  island.diveSites.forEach(site => {
    if (site.photos) {
      site.photos.forEach(photo => {
        if (photo.src.includes('assets/img/underwater/gambar_')) {
          const match = photo.src.match(/gambar_(\d+)\.(jpeg|jpg)/);
          if (match) {
            const num = match[1];
            if (num === '020') {
              photo.src = 'assets/img/aset_021.jpeg';
            } else {
              const jpegs = ['021', '022', '023', '024', '025', '026', '027', '028', '029', '030', '031', '032', '033', '034', '035', '036', '037', '038', '039', '040', '041', '042', '043', '044', '045', '046', '047', '048', '049', '050', '051', '052', '053'];
              const ext = jpegs.includes(num) ? 'jpeg' : 'jpg';
              photo.src = `assets/img/aset_${num}.${ext}`;
            }
          }
        }
      });
    }
  });
});

/* ══════════════════════════════════
   HELPERS
   ══════════════════════════════════ */
function dc(d) {
  return d === 'Pemula' ? '#4dd9e8' : d === 'Menengah' ? '#f0c060' : '#f07c6e';
}
function hi(h) {
  const m = {
    Nudibranch:'🐛','Giant Frogfish':'🐸',Orca:'🐋',Turtle:'🐢',
    Barracuda:'🐟','Moray Eel':'🐍','Orangutan Crab':'🦀',
    'Devil Ray':'🐠',Cave:'🕳️','Garden Eel':'🐍',
    'Schooling Jack Fish':'🐟','Hard Coral':'🪸',
    'Tiger Shark':'🦈',Hiu:'🦈','Reef Shark':'🦈'
  };
  return m[h] || '✦';
}

function _siteLabel(site, island) {
  return site.name + '  ·  ' + island.name;
}

/* ══════════════════════════════════
   MAP INIT AND CONTROLS
   ══════════════════════════════════ */
let map, lvl = 1, activeIsland = null, islandMks = [], diveMks = [];

function initAtlasMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  map = L.map('map', {
    center: [2.18, 118.45], zoom: 10,
    zoomControl: false, attributionControl: false
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, className: 'map-tiles'
  }).addTo(map);
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.control.attribution({ position: 'bottomleft', prefix: '© OpenStreetMap' }).addTo(map);
  renderIslands();
}

function mkIslandIcon() {
  return L.divIcon({
    className: '', iconSize: [46, 46], iconAnchor: [23, 23], popupAnchor: [0, -28],
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
    className: '', iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -18],
    html: `<div class="mk-dive"><div class="mk-dive-ring"></div><div class="mk-dive-dot"></div></div>`
  });
}

function clrM(arr) { arr.forEach(m => m.remove()); arr.length = 0; }

function renderIslands() {
  clrM(diveMks);
  ISLANDS.forEach(island => {
    const cover = island.diveSites.find(s => s.photos?.length)?.photos[0].src || '';
    const coverHTML = cover
      ? `<div class="island-ph"><img src="${cover}" alt="${island.name}" class="no-wm" onerror="this.closest('.island-ph').style.display='none'"><div class="island-ph-grad"></div></div>` : '';
    const html = `<div class="popup-card">${coverHTML}<div class="pp-body">
      <div class="pp-tag">Pulau Utama</div>
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
  activeIsland = island; lvl = 2;
  map.closePopup();
  islandMks.forEach(m => m.remove()); islandMks = [];
  map.flyTo([island.lat, island.lng], 13, { duration: 1.2, easeLinearity: .5 });

  setTimeout(() => {
    clrM(diveMks);
    island.diveSites.forEach((site, i) => {
      setTimeout(() => {
        if (site.lat === null) return;
        const mk = L.marker([site.lat, site.lng], { icon: mkDiveIcon() });
        mk.siteName = site.name;
        const col = dc(site.difficulty);
        const cover = site.photos?.length ? site.photos[0].src : '';
        const pCount = site.photos?.length || 0;
        const photoBlock = cover
          ? `<div class="pp-photo"><img src="${cover}" alt="${site.name}" class="no-wm" onerror="this.closest('.pp-photo').style.display='none'">
             <div class="pp-grad"></div>
             <div class="pp-badge" style="color:${col}">${site.difficulty}</div>
             ${pCount > 1 ? `<div class="pp-count">${pCount} foto</div>` : ''}</div>` : '';
        const html = `<div class="popup-card">${photoBlock}<div class="pp-body">
          <div class="pp-tag" style="color:${col}">${site.difficulty}${site.depth !== '—' ? ' · ' + site.depth : ''}</div>
          <div class="pp-name">${site.name}</div>
          <div class="pp-desc">${site.desc}</div>
          ${site.highlight && site.highlight !== '—'
            ? `<div class="pp-hi"><span class="pp-hi-icon">${hi(site.highlight)}</span><span class="pp-hi-txt">${site.highlight}</span></div>` : ''}
          <button class="pp-action-btn" onclick="window.openCinematicFromPopup('${island.id}', '${site.name.replace(/'/g, "\\'")}')">
            Jelajahi Rute & Galeri →
          </button>
        </div></div>`;
        mk.bindPopup(html, { maxWidth: 266 });
        mk.addTo(map); diveMks.push(mk);
      }, i * 75);
    });
  }, 820);

  showIslandPanel(island);
}

function showIslandPanel(island) {
  document.getElementById('btn-back').classList.add('on');
  document.getElementById('ih-ey').textContent = 'Pulau Terpilih';
  document.getElementById('ih-ttl').textContent = island.name;

  const cover = island.diveSites.find(s => s.photos?.length)?.photos[0].src || '';
  const ihImg = document.getElementById('ih-img');
  const ihEl  = document.getElementById('island-hero');
  ihEl.classList.remove('loaded');

  if (cover) {
    ihImg.classList.remove('no-wm');
    ihImg.src = '';
    ihImg.onload = function () {
      ihEl.classList.add('loaded');
      /* stamp hero with island name as location override */
      if (window.applyWatermark) {
        window.applyWatermark(ihImg, { locationLine: island.name + '  ·  Kepulauan Derawan' });
      }
    };
    ihImg.src = cover;
  }

  document.getElementById('ib-desc').textContent = island.desc;
  document.getElementById('ib-count').textContent = island.diveCount;
  document.getElementById('ib-stats').innerHTML = `
    <div class="ist"><div class="ist-val">${island.diveCount}</div><div class="ist-lbl">Dive Sites</div></div>
    <div class="ist"><div class="ist-val">${island.depth}</div><div class="ist-lbl">Kedalaman</div></div>
    <div class="ist"><div class="ist-val">${island.area}</div><div class="ist-lbl">Luas</div></div>`;

  document.getElementById('ib-list').innerHTML = island.diveSites.map(s => {
    const cover = s.photos?.length ? s.photos[0].src : '';
    const col = dc(s.difficulty);
    return `<div class="site-row" onclick="onSiteRowClick('${island.id}','${s.name.replace(/'/g, "\\'")}')">
      <div class="site-row-thumb">${cover ? `<img src="${cover}" class="no-wm" onerror="this.parentElement.innerHTML=''">` : '&nbsp;'}</div>
      <div class="site-row-info">
        <div class="site-row-name">${s.name}</div>
        <div class="site-row-meta" style="color:${col}">${s.difficulty}${s.depth !== '—' ? ' · ' + s.depth : ''}${s.photos?.length ? ' · ' + s.photos.length + ' foto' : ''}</div>
      </div>
      <svg class="site-row-arr" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    </div>`;
  }).join('');

  const panel = document.getElementById('island-panel');
  panel.classList.remove('collapsed');
  panel.classList.add('on');
}

function onSiteRowClick(islandId, siteName) {
  try {
    const island = ISLANDS.find(i => i.id === islandId);
    if (!island) return;
    const site = island.diveSites.find(s => s.name === siteName);
    if (!site) return;
    if (site.lat !== null) {
      diveMks.forEach(m => {
        if (m.siteName === site.name) {
          map.panTo([site.lat, site.lng], { animate: true, duration: .6 });
          m.fire('click');
        }
      });
    } else {
      openCinematic(site, island);
    }
  } catch (err) {
    console.error("Error in onSiteRowClick:", err);
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
  lvl = 1; activeIsland = null;
  clrM(diveMks); map.closePopup();
  closeCinematic();
  map.flyTo([2.18, 118.45], 10, { duration: 1.2, easeLinearity: .5 });
  setTimeout(() => renderIslands(), 600);
  document.getElementById('btn-back').classList.remove('on');
  document.getElementById('island-panel').classList.remove('on');
}

/* ══════════════════════════════════
   CINEMATIC TAKEOVER
   ══════════════════════════════════ */
let cinPhotos = [], cinIdx = 0, cinSite = null, cinIsland = null;

function openCinematic(site, island) {
  cinSite = site; cinIsland = island;
  cinPhotos = site.photos || [];
  cinIdx = 0;
  if (!cinPhotos.length) return;

  buildCinTrack();
  fillCinInfo();
  buildFilmstrip();
  buildCinDots();

  const cin = document.getElementById('cinematic');
  cin.classList.add('open');
  cin.style.pointerEvents = 'all';
  document.body.classList.add('cinematic-open');

  /* stamp cinematic images with per-site override */
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
  cin.classList.remove('open');
  cin.style.pointerEvents = 'none';
  document.body.classList.remove('cinematic-open');
  if (map) {
    map.closePopup();
  }
}

function buildCinTrack() {
  const track = document.getElementById('cin-track');
  track.innerHTML = cinPhotos.map((p, i) => `
    <div class="cin-slide${i === 0 ? ' cur' : ''}">
      <img src="${p.src}" alt="${p.caption}" loading="eager" onerror="this.closest('.cin-slide').style.display='none'">
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
  document.getElementById('cin-island-lbl').textContent = isl ? isl.name : '—';
  const siteIdx = (isl ? isl.diveSites.findIndex(x => x.name === s.name) : 0) + 1;
  const total   = isl ? isl.diveSites.length : 1;
  document.getElementById('cin-site-num').textContent  = `Site ${String(siteIdx).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;
  document.getElementById('cin-diff').style.color      = col;
  document.getElementById('cin-diff-dot').style.background = col;
  document.getElementById('cin-diff-txt').textContent  = s.difficulty;
  document.getElementById('cin-title').textContent     = s.name;
  document.getElementById('cin-rule-n').textContent    = String(siteIdx).padStart(2, '0');
  document.getElementById('cin-desc').textContent      = s.desc;
  document.getElementById('cin-top-label').textContent = s.name;

  const stats = [];
  if (s.depth !== '—') stats.push({ v: s.depth, l: 'Kedalaman' });
  stats.push({ v: s.difficulty, l: 'Level', col });
  if (cinPhotos.length > 1) stats.push({ v: cinPhotos.length, l: 'Foto' });
  document.getElementById('cin-stats').innerHTML = stats.map(st => `
    <div class="cin-stat">
      <div class="cin-stat-v" style="${st.col ? 'color:' + st.col : ''}">${st.v}</div>
      <div class="cin-stat-l">${st.l}</div>
    </div>`).join('');

  const hiEl = document.getElementById('cin-highlight');
  if (s.highlight && s.highlight !== '—') {
    document.getElementById('cin-hi-icon').textContent = hi(s.highlight);
    document.getElementById('cin-hi-label').textContent = s.highlight;
    hiEl.style.display = 'flex';
  } else { hiEl.style.display = 'none'; }

  updateCinCaption();
}

function buildFilmstrip() {
  const fs = document.getElementById('cin-filmstrip');
  fs.innerHTML = cinPhotos.map((p, i) => `
    <div class="cin-film-thumb${i === 0 ? ' cur' : ''}" onclick="goToCin(${i})">
      <img src="${p.src}" alt="" loading="lazy" onerror="this.closest('.cin-film-thumb').style.display='none'">
      <div class="cin-film-label">${p.caption}</div>
    </div>`).join('');
  const show = cinPhotos.length > 1;
  fs.style.display = show ? 'flex' : 'none';
  document.getElementById('cin-counter').style.display = show ? 'block' : 'none';
  document.querySelectorAll('.cin-arrow').forEach(a => a.style.display = show ? 'flex' : 'none');
  updateCinCount();
}

function buildCinDots() {
  const d = document.getElementById('cin-dots');
  if (cinPhotos.length <= 1 || cinPhotos.length > 8) { d.style.display = 'none'; return; }
  d.style.display = 'flex';
  d.innerHTML = cinPhotos.map((_, i) =>
    `<div class="cin-dot${i === 0 ? ' cur' : ''}" onclick="goToCin(${i})"></div>`).join('');
}

function goToCin(n) {
  if (n === cinIdx) return;
  const slides = document.querySelectorAll('.cin-slide');
  const thumbs = document.querySelectorAll('.cin-film-thumb');
  const dots   = document.querySelectorAll('.cin-dot');
  slides[cinIdx]?.classList.remove('cur');
  thumbs[cinIdx]?.classList.remove('cur');
  dots[cinIdx]?.classList.remove('cur');
  cinIdx = ((n % cinPhotos.length) + cinPhotos.length) % cinPhotos.length;
  slides[cinIdx]?.classList.add('cur');
  thumbs[cinIdx]?.classList.add('cur');
  dots[cinIdx]?.classList.add('cur');
  document.getElementById('cin-track').style.transform = `translateX(-${cinIdx * 100}vw)`;
  updateCinCaption(); updateCinCount();
  thumbs[cinIdx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function cinNav(dir) { goToCin(cinIdx + dir); }

function updateCinCaption() {
  const p = cinPhotos[cinIdx];
  document.getElementById('cin-caption').textContent = p?.caption || '';
  document.getElementById('cin-cur').textContent = `${cinIdx + 1}/${cinPhotos.length}`;
}
function updateCinCount() {
  document.getElementById('cin-cur').textContent = `${cinIdx + 1}/${cinPhotos.length}`;
}

/* ══════════════════════════════════
   GALLERY LIGHTBOX INTEGRATION
   ══════════════════════════════════ */
function openGalleryLightbox() {
  if (!cinSite || !cinPhotos.length) return;

  const formattedItems = cinPhotos.map(p => {
    return {
      src: p.src,
      fullSrc: p.src,
      label: p.caption,
      site: cinSite.name,
      region: cinIsland ? cinIsland.name : '',
      meta: {
        species: p.caption,
        photographer: 'Azman Rasyid',
        date: ''
      }
    };
  });

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
    window.closeLB = function() {
      if (window._galleryBackup) {
        window.galleryItems = window._galleryBackup;
        window._galleryBackup = null;
      }
      origCloseLB();
    };
    window.closeLB._isOverridden = true;
  }
}

/* ══════════════════════════════════
   GLOBAL COMPATIBILITY BINDINGS
   ══════════════════════════════════ */
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

const startMap = () => {
  if (!map) {
    initAtlasMap();
  }
  
  /* Swipe support for cinematic takeover */
  const cinEl = document.getElementById('cinematic');
  if (cinEl && !cinEl.dataset.swipeBound) {
    cinEl.dataset.swipeBound = "true";
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
