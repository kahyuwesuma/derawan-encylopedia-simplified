'use strict';

/**
 * DIVE SITES COORDINATE & METADATA REGISTRY
 * Versi sementara: hanya titik yang sudah memiliki koordinat GPS pasti
 * (dan foto di folder) yang ditampilkan. Titik lain dihapus sementara.
 */

const DIVE_SITES_DATA = [
  {
    id: 'derawan',
    name: 'Pulau Derawan',
    lat: 2.2833,
    lng: 118.2500,
    desc: 'Pulau terbesar dan paling berkembang di kepulauan ini. Dikenal sebagai surga penyu hijau dan terumbu karang dangkal yang memukau.',
    area: '5.2 km²',
    depth: '5–25 m',
    diveSites: [
      {
        name: 'Macro Mania',
        lat: 2.281867,
        lng: 118.248905,
        difficulty: 'Pemula',
        depth: '5–15 m',
        highlight: 'Nudibranch',
        desc: 'Surganya pecinta makro fotografi dengan berbagai spesies nudibranch, ghost pipefish, dan seahorse.'
      },
      {
        name: 'Darma Point',
        lat: 2.277928,
        lng: 118.242906,
        difficulty: 'Pemula',
        depth: '5–18 m',
        highlight: 'Leaf Scorpionfish',
        desc: 'Titik selam favorit untuk menemukan leaf scorpionfish, orangutan crab, dan nudibranch eksotis.'
      },
      {
        name: 'Pulau Panjang',
        lat: 2.359593,
        lng: 118.227310,
        difficulty: 'Pemula',
        depth: '5–20 m',
        highlight: 'Ghost Pipefish',
        desc: 'Terumbu memanjang di sisi utara Derawan dengan populasi ghost pipefish dan sponge raksasa.'
      }
    ]
  },
  {
    id: 'maratua',
    name: 'Pulau Maratua',
    lat: 2.2167,
    lng: 118.6167,
    desc: 'Atol raksasa berbentuk tapal kuda dengan laguna zamrud di tengahnya. Salah satu titik selam kelas dunia terbaik di Kalimantan Timur.',
    area: '38.6 km²',
    depth: '5–40 m',
    diveSites: [
      {
        name: 'Channel',
        lat: 2.246860,
        lng: 118.639510,
        difficulty: 'Menengah',
        depth: '40 m',
        highlight: 'Nudibranch',
        desc: 'Selat berarus dengan keanekaragaman nudibranch tinggi di dinding karang. Terbaik saat slack tide.'
      },
      {
        name: 'Gorgonzola',
        lat: 2.310500,
        lng: 118.576400,
        difficulty: 'Menengah',
        depth: '15–30 m',
        highlight: 'Gorgonian',
        desc: 'Hamparan sea fan gorgonian berukuran masif yang menghiasi slope tebing dalam.'
      },
      {
        name: 'Light House',
        lat: 2.314900,
        lng: 118.570900,
        difficulty: 'Pemula',
        depth: '10–25 m',
        highlight: 'Reef Fish',
        desc: 'Titik selam di dekat mercusuar Maratua dengan terumbu sehat dan schooling fusilier.'
      },
      {
        name: 'Maratua Reef',
        lat: 2.2255,
        lng: 118.5727,
        difficulty: 'Pemula',
        depth: '12–25 m',
        highlight: 'Coral Plateau',
        desc: 'Dataran terumbu karang Maratua yang luas dengan perairan biru jernih.'
      },
      {
        name: 'Turtle Traffic',
        lat: 2.199940,
        lng: 118.592860,
        difficulty: 'Mahir',
        depth: '>40 m',
        highlight: 'Orca',
        desc: 'Jalur lintasan penyu dan migrasi orca tercatat di titik kedalaman ekstrem ini.'
      },
      {
        name: 'Hanging Garden',
        lat: 2.235905,
        lng: 118.564336,
        difficulty: 'Menengah',
        depth: '12–28 m',
        highlight: 'Soft Coral',
        desc: 'Formasi karang menggantung dengan koloni anemon dan kepiting karang.'
      },
      {
        name: 'Fusulier Paradise',
        lat: 2.264576,
        lng: 118.559830,
        difficulty: 'Pemula',
        depth: '10–22 m',
        highlight: 'Schooling Fish',
        desc: 'Ribuan ikan fusilier biru dan kuning berenang melintas membentuk gelombang berkilau.'
      },
      {
        name: 'Green Nirvana Jetty',
        lat: 2.203619,
        lng: 118.589984,
        difficulty: 'Pemula',
        depth: '4–12 m',
        highlight: 'Jetty Life',
        desc: 'Dermaga resor tempat snorkeling santai melihat schooling fish dan penyu.'
      },
      {
        name: 'Wika point',
        lat: 2.281469,
        lng: 118.559149,
        difficulty: 'Menengah',
        depth: '14–25 m',
        highlight: 'Slope Reef',
        desc: 'Slope terumbu karang dengan visibilitas stabil sepanjang tahun.'
      },
      {
        name: 'Small Fish Country',
        lat: 2.265400,
        lng: 118.623000,
        difficulty: 'Pemula',
        depth: '10–22 m',
        highlight: 'Anthias',
        desc: 'Kawasan karang dangkal dipenuhi jutaan anthias merah muda dan damselfish.'
      },
      {
        name: 'Big Fish Country',
        lat: 2.256400,
        lng: 118.643000,
        difficulty: 'Mahir',
        depth: '25–40 m',
        highlight: 'Barracuda',
        desc: 'Saluran masuk laguna tempat schooling barracuda berputar membentuk tornado raksasa.'
      },
      {
        name: 'Macronesia Point',
        lat: 2.202613,
        lng: 118.590478,
        difficulty: 'Menengah',
        depth: '15–30 m',
        highlight: 'Macro Life',
        desc: 'Titik temu biota makro langka dan schooling pelagis di tebing luar Maratua.'
      }
    ]
  },
  {
    id: 'kakaban',
    name: 'Pulau Kakaban',
    lat: 2.1500,
    lng: 118.4833,
    desc: 'Fenomena alam langka — danau air laut purba yang terkurung daratan dan dihuni ubur-ubur tanpa sengat serta terumbu karang luar spektakuler.',
    area: '7.7 km²',
    depth: '2–35 m',
    diveSites: [
      {
        name: 'Barracuda Point',
        lat: 2.138750,
        lng: 118.504890,
        difficulty: 'Mahir',
        depth: '18–35 m',
        highlight: 'Barracuda',
        desc: 'Spot legendaris untuk menyaksikan tornado ratusan barracuda dan schooling jack fish.'
      },
      {
        name: 'Jelly Fish Lake',
        lat: 2.140830,
        lng: 118.511190,
        difficulty: 'Pemula',
        depth: '2–8 m',
        highlight: 'Stingless Jellyfish',
        desc: 'Danau air asin purba dihuni empat spesies ubur-ubur tanpa sengat yang ramah perenang.'
      },
      {
        name: 'Kelapa Dua',
        lat: 2.119960,
        lng: 118.556470,
        difficulty: 'Pemula',
        depth: '10–22 m',
        highlight: 'Reef Shark',
        desc: 'Terumbu karang timur Kakaban yang sehat, sarang hiu karang dan penyu beristirahat.'
      },
      {
        name: 'Kakaban Jetty',
        lat: 2.137719,
        lng: 118.510937,
        difficulty: 'Pemula',
        depth: '4–12 m',
        highlight: 'Jetty Snorkel',
        desc: 'Area sekitar dermaga kedatangan Kakaban, jernih dan penuh ikan karang muda.'
      },
      {
        name: 'Tanjung Kelapa',
        lat: 2.135983,
        lng: 118.506996,
        difficulty: 'Menengah',
        depth: '15–35 m',
        highlight: 'Devil Ray',
        desc: 'Tanjung karang pertemuan pari setan (devil ray) dan terumbu karang prima.'
      },
      {
        name: 'Kakaban Reef',
        lat: 2.130324,
        lng: 118.545306,
        difficulty: 'Pemula',
        depth: '5–20 m',
        highlight: 'Hard Coral',
        desc: 'Terumbu karang Kakaban dengan tutupan coral prima dan warna-warni memukau.'
      }
    ]
  },
  {
    id: 'sangalaki',
    name: 'Pulau Sangalaki',
    lat: 2.0833,
    lng: 118.3667,
    desc: 'Pulau kecil yang menjadi surga manta ray dan penyu. Dikenal memiliki cleaning station manta ray aktif dan laguna karang dangkal.',
    area: '1.7 km²',
    depth: '5–30 m',
    diveSites: [
      {
        name: 'Cleaning Station',
        lat: 2.087000,
        lng: 118.390000,
        difficulty: 'Pemula',
        depth: '8–18 m',
        highlight: 'Manta Cleaning',
        desc: 'Stasiun pembersih aktif tempat manta ray berputar santai dibersihkan ikan wrasse.'
      },
      {
        name: 'Manta Point',
        lat: 2.083300,
        lng: 118.383300,
        difficulty: 'Pemula',
        depth: '5–18 m',
        highlight: 'Manta Ray',
        desc: 'Titik selam paling populer di Sangalaki untuk berenang berdampingan dengan manta ray raksasa.'
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.DIVE_SITES_DATA = DIVE_SITES_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DIVE_SITES_DATA };
}