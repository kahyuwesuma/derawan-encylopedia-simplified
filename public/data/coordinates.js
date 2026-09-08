'use strict';

/**
 * DIVE SITES COORDINATE & METADATA REGISTRY
 * File ini berisi daftar titik koordinat (lat, lng), tingkat kesulitan,
 * kedalaman, highlight, dan deskripsi untuk setiap dive site di Kepulauan Derawan.
 * 
 * Silakan edit atau lengkapi nilai `lat` dan `lng` pada titik-titik yang sudah
 * memiliki data GPS pasti. Jika `lat: null` atau belum diisi, sistem akan
 * otomatis menempatkan titik secara acak alami (organic scatter) di perairan pulau tersebut.
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
        name: 'Old Pier',
        lat: null, // Isi koordinat jika sudah ada (contoh: 2.2815)
        lng: null, // Isi koordinat jika sudah ada (contoh: 118.2480)
        difficulty: 'Pemula',
        depth: '5–15 m',
        highlight: 'Macro Life',
        desc: 'Dermaga kayu tua tempat berkumpulnya schooling fish dan biota makro di tiang berlumut.'
      },
      {
        name: 'Drift',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '15–25 m',
        highlight: 'Drift Dive',
        desc: 'Penyelaman hanyut menyusuri dinding karang dengan arus sedang hingga kencang.'
      },
      {
        name: 'Pelatak Run',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '10–20 m',
        highlight: 'Coral Slope',
        desc: 'Slope karang berpasir dengan keanekaragaman coral trout dan anemon laut.'
      },
      {
        name: 'Light House',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '8–18 m',
        highlight: 'Sea Turtle',
        desc: 'Perairan sekitar mercusuar, sering dikunjungi penyu hijau yang mencari makan di padang lamun.'
      },
      {
        name: 'Snapper Point',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '15–25 m',
        highlight: 'Schooling Snapper',
        desc: 'Titik berkumpulnya kawanan yellow snapper dalam jumlah masif di punggung terumbu.'
      },
      {
        name: 'Shark Point',
        lat: null,
        lng: null,
        difficulty: 'Mahir',
        depth: '20–30 m',
        highlight: 'Reef Shark',
        desc: 'Tebing karang dalam tempat patroli blacktip dan whitetip reef shark.'
      },
      {
        name: 'Rabbit Fish City',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '6–14 m',
        highlight: 'Rabbit Fish',
        desc: 'Koloni ikan baronang (rabbit fish) yang melimpah di antara terumbu karang keras.'
      },
      {
        name: 'Macro Mania',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '5–15 m',
        highlight: 'Nudibranch',
        desc: 'Surganya pecinta makro fotografi dengan berbagai spesies nudibranch, ghost pipefish, dan seahorse.'
      },
      {
        name: 'Ship Wreck',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '15–28 m',
        highlight: 'Wreck',
        desc: 'Bangkai kapal karam yang telah bertransformasi menjadi terumbu karang buatan yang kaya biota.'
      },
      {
        name: 'Trigger Wall',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '12–25 m',
        highlight: 'Triggerfish',
        desc: 'Dinding karang dengan lubang sarang titan triggerfish dan red-toothed triggerfish.'
      },
      {
        name: 'Darma Point',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '5–18 m',
        highlight: 'Leaf Scorpionfish',
        desc: 'Titik selam favorit untuk menemukan leaf scorpionfish, orangutan crab, dan nudibranch eksotis.'
      },
      {
        name: 'Pulau Panjang',
        lat: null,
        lng: null,
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
        lat: 2.256366,
        lng: 118.64242,
        difficulty: 'Menengah',
        depth: '40 m',
        highlight: 'Nudibranch',
        desc: 'Selat berarus dengan keanekaragaman nudibranch tinggi di dinding karang. Terbaik saat slack tide.'
      },
      {
        name: 'East Wall',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '15–35 m',
        highlight: 'Wall Dive',
        desc: 'Dinding karang vertikal sisi timur atol dengan visibilitas kristal dan gorgonian raksasa.'
      },
      {
        name: 'Turtle Parade',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '10–20 m',
        highlight: 'Turtle',
        desc: 'Lintasan penyu hijau dan penyu sisik yang berenang santai di sepanjang reef crest.'
      },
      {
        name: 'Divers Delight',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '8–18 m',
        highlight: 'Coral Garden',
        desc: 'Taman karang dangkal beraneka warna dengan ratusan spesies ikan karang tropis.'
      },
      {
        name: 'Gorgonzola',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '15–30 m',
        highlight: 'Gorgonian',
        desc: 'Hamparan sea fan gorgonian berukuran masif yang menghiasi slope tebing dalam.'
      },
      {
        name: 'Light House',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '10–25 m',
        highlight: 'Reef Fish',
        desc: 'Titik selam di dekat mercusuar Maratua dengan terumbu sehat dan schooling fusilier.'
      },
      {
        name: 'Paradise',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '5–18 m',
        highlight: 'Hard Coral',
        desc: 'Tutupan karang keras yang sangat terjaga dengan air tenang dan jernih.'
      },
      {
        name: 'Fantasy Wall',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '18–35 m',
        highlight: 'Drop-off',
        desc: 'Drop-off spektakuler yang dihiasi soft coral ungu, kuning, dan oranye.'
      },
      {
        name: 'Eel Garden',
        lat: 2.272796,
        lng: 118.556238,
        difficulty: 'Pemula',
        depth: '25 m',
        highlight: 'Garden Eel',
        desc: 'Hamparan garden eel di dasar berpasir kedalaman 25 meter yang meliuk-liuk serempak.'
      },
      {
        name: 'Hanging Garden',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '12–28 m',
        highlight: 'Soft Coral',
        desc: 'Formasi karang menggantung dengan koloni anemon dan kepiting karang.'
      },
      {
        name: 'Fusulier Paradise',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '10–22 m',
        highlight: 'Schooling Fish',
        desc: 'Ribuan ikan fusilier biru dan kuning berenang melintas membentuk gelombang berkilau.'
      },
      {
        name: 'Last Sand',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '8–18 m',
        highlight: 'Sandy Slope',
        desc: 'Slope pasir putih bersih dengan bommie karang tempat tinggal moray dan scorpionfish.'
      },
      {
        name: 'Mid Reef',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '15–28 m',
        highlight: 'Reef Biodiversity',
        desc: 'Punggung terumbu tengah laguna dengan keanekaragaman invertebrate laut.'
      },
      {
        name: 'Sponge Reef',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '10–20 m',
        highlight: 'Giant Sponge',
        desc: 'Populasi giant barrel sponge berdiameter lebih dari satu meter yang memukau.'
      },
      {
        name: 'Maratua Reef',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '12–25 m',
        highlight: 'Coral Plateau',
        desc: 'Dataran terumbu karang Maratua yang luas dengan perairan biru jernih.'
      },
      {
        name: 'Shark Point',
        lat: null,
        lng: null,
        difficulty: 'Mahir',
        depth: '20–40 m',
        highlight: 'Hiu',
        desc: 'Titik observasi grey reef shark dan whitetip shark di perairan terbuka.'
      },
      {
        name: 'Turtle Traffic',
        lat: 2.142634,
        lng: 118.6312693,
        difficulty: 'Mahir',
        depth: '>40 m',
        highlight: 'Orca',
        desc: 'Jalur lintasan penyu dan migrasi orca tercatat di titik kedalaman ekstrem ini.'
      },
      {
        name: 'Tanjung Keramat',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '15–30 m',
        highlight: 'Tiger Shark',
        desc: 'Tanjung berarus tempat berkumpulnya predator pelagis musiman.'
      },
      {
        name: 'Coral Garden',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '5–16 m',
        highlight: 'Table Coral',
        desc: 'Hamparan table coral acropora raksasa yang masih sangat alami.'
      },
      {
        name: 'Batu Selatan',
        lat: null,
        lng: null,
        difficulty: 'Mahir',
        depth: '18–35 m',
        highlight: 'Pelagic Fish',
        desc: 'Formasi batuan bawah laut di selatan Maratua dengan arus menantang.'
      },
      {
        name: 'GNR Reef house',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '5–15 m',
        highlight: 'House Reef',
        desc: 'House reef Green Nirvana Resort yang nyaman untuk night dive dan macro photography.'
      },
      {
        name: 'Green Nirvana Jetty',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '4–12 m',
        highlight: 'Jetty Life',
        desc: 'Dermaga resor tempat snorkeling santai melihat schooling fish dan penyu.'
      },
      {
        name: 'Turtle point',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '8–18 m',
        highlight: 'Turtle',
        desc: 'Habitat makan penyu hijau di padang sponge dan karang lunak.'
      },
      {
        name: 'Coral mountain bay',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '12–26 m',
        highlight: 'Coral Formation',
        desc: 'Teluk dengan struktur karang berbentuk bukit-bukit bawah laut yang megah.'
      },
      {
        name: 'Small Fish Country',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '10–22 m',
        highlight: 'Anthias',
        desc: 'Kawasan karang dangkal dipenuhi jutaan anthias merah muda dan damselfish.'
      },
      {
        name: 'Wika point',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '14–25 m',
        highlight: 'Slope Reef',
        desc: 'Slope terumbu karang dengan visibilitas stabil sepanjang tahun.'
      },
      {
        name: 'Big Fish Country',
        lat: null,
        lng: null,
        difficulty: 'Mahir',
        depth: '25–40 m',
        highlight: 'Barracuda',
        desc: 'Saluran masuk laguna tempat schooling barracuda berputar membentuk tornado raksasa.'
      },
      {
        name: 'Macronesia Point',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '15–30 m',
        highlight: 'Macro Life',
        desc: 'Titik temu biota makro langka dan schooling pelagis di tebing luar Maratua.'
      },
      {
        name: 'Second Channel',
        lat: null,
        lng: null,
        difficulty: 'Mahir',
        depth: '20–40 m',
        highlight: 'Strong Current',
        desc: 'Saluran kedua laguna dengan arus kuat khusus penyelam berpengalaman.'
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
        name: 'The Corner',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '15–30 m',
        highlight: 'Drift',
        desc: 'Sudut pulau dengan arus pertemuan dua massa air kaya nutrisi pelagis.'
      },
      {
        name: 'Drift',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '10–25 m',
        highlight: 'Drift Dive',
        desc: 'Penyelaman melayang sepanjang dinding karang Kakaban yang menawan.'
      },
      {
        name: 'The Wall',
        lat: null,
        lng: null,
        difficulty: 'Mahir',
        depth: '20–40 m',
        highlight: 'Drop-off',
        desc: 'Dinding vertikal dramatis jatuh hingga kedalaman lebih dari 80 meter.'
      },
      {
        name: 'Blue Light Cave',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '15–28 m',
        highlight: 'Cave',
        desc: 'Gua karang dengan celah cahaya biru alami yang memukau dari kedalaman.'
      },
      {
        name: 'Kakabanana',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '8–18 m',
        highlight: 'Soft Coral',
        desc: 'Taman karang landai dihiasi karang lunak berwarna keemasan.'
      },
      {
        name: 'Barracuda Point',
        lat: 2.1380554,
        lng: 118.5051203,
        difficulty: 'Mahir',
        depth: '18–35 m',
        highlight: 'Barracuda',
        desc: 'Spot legendaris untuk menyaksikan tornado ratusan barracuda dan schooling jack fish.'
      },
      {
        name: 'Sponge Bob',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '10–20 m',
        highlight: 'Barrel Sponge',
        desc: 'Gugusan barrel sponge bulat besar yang menjadi rumah anemon dan udang pembersih.'
      },
      {
        name: 'Jelly Fish Lake',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '2–8 m',
        highlight: 'Stingless Jellyfish',
        desc: 'Danau air asin purba dihuni empat spesies ubur-ubur tanpa sengat yang ramah perenang.'
      },
      {
        name: 'Tanjung Kelapa',
        lat: 2.1172189,
        lng: 118.560872,
        difficulty: 'Menengah',
        depth: '15–35 m',
        highlight: 'Devil Ray',
        desc: 'Tanjung karang pertemuan pari setan (devil ray) dan terumbu karang prima.'
      },
      {
        name: 'Kelapa Dua',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '10–22 m',
        highlight: 'Reef Shark',
        desc: 'Terumbu karang timur Kakaban yang sehat, sarang hiu karang dan penyu beristirahat.'
      },
      {
        name: 'Tuna Point',
        lat: null,
        lng: null,
        difficulty: 'Mahir',
        depth: '20–40 m',
        highlight: 'Dogtooth Tuna',
        desc: 'Titik tebing dalam tempat dogtooth tuna dan tenggiri berpatroli cepat.'
      },
      {
        name: 'Kahe Daeng Spot',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '12–25 m',
        highlight: 'Pristine Reef',
        desc: 'Terumbu alami yang jarang dijamah dengan ragam gorgonian warna-warni.'
      },
      {
        name: 'Kakaban Jetty',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '4–12 m',
        highlight: 'Jetty Snorkel',
        desc: 'Area sekitar dermaga kedatangan Kakaban, jernih dan penuh ikan karang muda.'
      },
      {
        name: 'sisip kakaban',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '8–18 m',
        highlight: 'Coral Slope',
        desc: 'Celah slope terumbu terlindung angin dengan tutupan hard coral sangat rapat.'
      },
      {
        name: 'Nirvana Paradise',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '10–24 m',
        highlight: 'Colourful Reef',
        desc: 'Surga karang dengan formasi karang meja dan karang tanduk rusa yang luas.'
      },
      {
        name: 'Kakaban Reef',
        lat: 2.1548811,
        lng: 118.5108653,
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
        name: 'Coral Garden',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '5–15 m',
        highlight: 'Table Coral',
        desc: 'Taman karang dangkal di sekitar Sangalaki dengan koloni acropora dan kima raksasa.'
      },
      {
        name: 'Cleaning Station',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '8–18 m',
        highlight: 'Manta Cleaning',
        desc: 'Stasiun pembersih aktif tempat manta ray berputar santai dibersihkan ikan wrasse.'
      },
      {
        name: 'Manta Avenue',
        lat: null,
        lng: null,
        difficulty: 'Pemula',
        depth: '8–20 m',
        highlight: 'Manta Ray',
        desc: 'Jalur perlintasan reguler manta ray yang menyaring plankton di permukaan air.'
      },
      {
        name: 'Manta Run',
        lat: null,
        lng: null,
        difficulty: 'Menengah',
        depth: '10–22 m',
        highlight: 'Manta Schooling',
        desc: 'Spot perairan berarus ringan tempat beberapa manta berenang beriringan.'
      },
      {
        name: 'Manta Point',
        lat: 2.093739,
        lng: 118.4013775,
        difficulty: 'Pemula',
        depth: '5–18 m',
        highlight: 'Manta Ray',
        desc: 'Titik selam paling populer di Sangalaki untuk berenang berdampingan dengan manta ray raksasa.'
      }
    ]
  },
  {
    id: 'muaras',
    name: 'Karang Muaras',
    lat: 1.9500,
    lng: 118.6500,
    desc: 'Kawasan terumbu karang atol terluar yang masih sangat alami dengan keanekaragaman biota laut spektakuler, terumbu karang virgin, dan habitat hiu langka.',
    area: '12.0 km²',
    depth: '5–50 m',
    diveSites: [
      {
        name: 'Pala-Pala',
        lat: 1.9520,
        lng: 118.6530,
        difficulty: 'Menengah',
        depth: '10–35 m',
        highlight: 'Nurse Shark & Penyu Hijau',
        desc: 'Spot selam spektakuler di atol Karang Muaras, rumah bagi penyu hijau, nurse shark, gorgonian masif, dan hiu belimbing langka.'
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
