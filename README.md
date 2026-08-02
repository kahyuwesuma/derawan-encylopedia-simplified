# Derawan Archipelago Encyclopedia & Dynamic Gallery System

Sistem Web Visual Ensilopedia & REST API Galeri Dinamis untuk Kepulauan Derawan (Kalimantan Timur, Indonesia). Aplikasi ini dilengkapi dengan pengenal metadata otomatis dari konvensi nama file, integrasi sinkronisasi Google Drive API v3, cron job background, dan Admin Dashboard Console.

---

## 🌟 Fitur Utama Sistem

1. **Visual Encyclopedia & Public Gallery**:
   - Tampilan visual mewah berbasis Vanilla HTML/CSS/JS (Slider Pulau, Parallax, Scroll Reveal, Lightbox Modal).
   - Penampilan gambar/video galeri secara otomatis (*auto-update*) dari pemindaian arsip lokal maupun sinkronisasi Google Drive.
2. **RESTful Gallery API Engine**:
   - Endpoint terpusat untuk memuat aset galeri (`/api/gallery`), metadata filter (`/api/gallery/meta`), dan pencarian (*search*).
   - Parser nama file otomatis untuk mengekstrak spesies, lokasi penyelaman (*dive site*), region, tanggal, dan fotografer.
3. **Google Drive Mirroring & Auto Sync**:
   - Integrasi Google Drive API v3 (Service Account / API Key).
   - Audit otomatis konvensi folder (Region → Site → File) & peringatan pelanggaran konvensi (*Convention Violation Warning*).
   - Fitur *smart download* dan pembersihan file usang lokal (*orphan cleanup*).
4. **Admin Dashboard Console (`/admin`)**:
   - Antarmuka khusus administrator untuk melihat status sinkronisasi, *live system logs*, progres *download*, dan memicu *manual sync*.
5. **Vercel & Serverless Ready**:
   - Mendukung deployment lingkungan *serverless* (Vercel Crons & Static JSON fallback via `generate-gallery.js`).

---

## 🏛️ Arsitektur Proyek (Modular MVC)

```
derawan/
├── config/
│   └── constants.js              <-- Konstanta & konfigurasi terpusat (ENV, Path, Ext)
├── src/
│   ├── controllers/
│   │   ├── adminController.js    <-- HTTP handler untuk Admin Console & Cron
│   │   └── galleryController.js  <-- HTTP handler untuk API Galeri & Meta
│   ├── middlewares/
│   │   └── authMiddleware.js     <-- Express Auth Middleware untuk Admin
│   ├── services/
│   │   ├── filenameParser.js     <-- Parser nama file & slugify (DRY Module)
│   │   ├── galleryService.js     <-- Pemindaian aset lokal, cache, & file watcher
│   │   └── gdrive/
│   │       ├── gdriveAuth.js     <-- Otentikasi Google Cloud API Client v3
│   │       ├── gdriveDownloader.js<-- Stream downloader & orphan cleanup
│   │       ├── gdriveScanner.js  <-- Drive hierarchy scanner & convention audit
│   │       ├── gdriveStatus.js   <-- Sync State, log console, & persistensi JSON
│   │       └── gdriveSync.js     <-- Main sync service orchestrator
│   └── routes/
│       ├── admin.js              <-- Express router untuk /admin & /api/admin/*
│       └── gallery.js            <-- Express router untuk /api/gallery/*
├── public/
│   ├── css/
│   │   ├── variables.css         <-- Design system token (Warna, Font, Reset, Cursor)
│   │   ├── admin.css             <-- Stylesheet khusus Admin Console
│   │   ├── main.css              <-- Entrypoint CSS landing page (CSS Component imports)
│   │   └── components/           <-- Modular CSS (hero, islands-slider, gallery-grid, dll)
│   ├── js/
│   │   ├── cursor.js             <-- Custom cursor logic
│   │   ├── admin.js              <-- Admin Console interactive logic
│   │   ├── gallery.js            <-- Entrypoint JS public page
│   │   └── modules/              <-- Modular JS (galleryApi, lightbox, slider, animations)
│   ├── admin/
│   │   └── index.html            <-- Antarmuka Admin Console (~150 baris)
│   ├── gallery.json              <-- Static fallback dataset untuk environment Vercel
│   └── index.html                <-- Antarmuka Public Encyclopedia (~327 baris)
├── scripts/
│   └── generate-gallery.js       <-- Script pra-generasi public/gallery.json untuk build Vercel
├── discuss/                      <-- Dokumen analisis & evaluasi arsitektur
├── .env.example                  <-- Template variabel lingkungan
├── .gitignore                    <-- Git ignore (termasuk kredensial sensitif)
├── gdrive-credentials.json       <-- [Git Ignored] File Kredensial Service Account lokal
├── server.js                     <-- Clean Express App Entrypoint (~45 baris)
└── package.json
```

---

## 🚀 Panduan Setup & Memulai Lokal

### 1. Install Dependencies
```bash
npm install
```

### 2. Konfigurasi Google Drive (Pengembangan Lokal)

Untuk menghubungkan aplikasi ke Google Drive target, Anda memerlukan **Service Account Google Cloud**:

#### Step A: Membuat Google Service Account
1. Buka [Google Cloud Console](https://console.cloud.google.com/).
2. Buat project baru atau pilih project yang sudah ada.
3. Aktifkan **Google Drive API** di menu *APIs & Services > Library*.
4. Buka menu *APIs & Services > Credentials*, klik **Create Credentials > Service Account**.
5. Setelah Service Account dibuat, masuk ke tab **Keys**, klik **Add Key > Create New Key (JSON)**. File JSON kredensial akan otomatis terunduh.

#### Step B: Memasang Kredensial di Proyek (Dua Pilihan)
- **Opsi 1 (Disarankan untuk Lokal):**  
  Rename file JSON yang diunduh menjadi `gdrive-credentials.json` dan letakkan langsung di **root directory project** (`/gdrive-credentials.json`). Sistem akan otomatis mendeteksinya tanpa perlu mengisi string JSON di file `.env`.
- **Opsi 2 (Menggunakan `.env`):**  
  Buka file JSON credentials, salin seluruh isi JSON, lalu tempel pada variabel `GDRIVE_SERVICE_ACCOUNT_JSON` di `.env`.

#### Step C: Berikan Akses Folder Google Drive
1. Buka file JSON credentials, cari email Service Account (biasanya berakhiran `@xxxx.iam.gserviceaccount.com`).
2. Buka folder Google Drive yang berisi arsip foto/video kepulauan Derawan.
3. Klik kanan pada Folder tersebut > **Share**, lalu masukkan email Service Account tadi dan berikan akses sebagai **Viewer** (atau Editor).
4. Salin ID Folder Google Drive tersebut dari URL browser (contoh: `https://drive.google.com/drive/folders/1_ABC123xyz...` -> ID-nya adalah `1_ABC123xyz...`).

### 3. Konfigurasi Variabel Lingkungan (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi variabel `.env` sesuai setup lokal Anda:
```env
PORT=3001
ADMIN_PASSWORD=derawan2026
GDRIVE_FOLDER_ID=1_MasukkanIDFolderGoogleDriveAndaDiSini
SYNC_CRON_SCHEDULE="0 */6 * * *"
```

> [!CAUTION]
> **Keamanan Kredensial:**  
> Jangan pernah meng-commit file `.env` atau `gdrive-credentials.json` ke repository publik. File tersebut sudah masuk dalam daftar `.gitignore`.

### 4. Jalankan Server Development
```bash
npm run dev
```

### 5. Akses Aplikasi di Browser
- **Public Encyclopedia & Galeri:** [http://localhost:3001](http://localhost:3001)
- **Admin Console Dashboard:** [http://localhost:3001/admin](http://localhost:3001/admin)
- **API Galeri:** [http://localhost:3001/api/gallery](http://localhost:3001/api/gallery)
- **API Metadata:** [http://localhost:3001/api/gallery/meta](http://localhost:3001/api/gallery/meta)

---

## ☁️ Panduan Deployment di Vercel (Serverless)

Vercel menggunakan lingkungan *Serverless Read-Only*, sehingga server tidak dapat menyimpan file unduhan Google Drive ke disk serverless secara runtime. Oleh karena itu, arsitektur project ini dirancang dengan mekanisme **Static Fallback Dataset**.

### 1. Persiapan Build Script
Sebelum melakukan push ke GitHub/Deployment, pastikan script build siap. Script `scripts/generate-gallery.js` akan memindai arsip galeri dan menghasilkan file `public/gallery.json`.

Perintah build yang digunakan:
```bash
npm run build
```

### 2. Langkah-langkah Deploy ke Vercel

1. **Push Repository ke GitHub/GitLab**.
2. Masuk ke [Dashboard Vercel](https://vercel.com/) dan buat **New Project** dari repository tersebut.
3. Pada halaman **Build and Output Settings**:
   - **Build Command:** `npm run build` (atau biarkan default jika otomatis terdeteksi)
   - **Output Directory:** `. ` (atau `public`)
4. Pada bagian **Environment Variables**, tambahkan variabel berikut:

| Key | Value | Keterangan |
| --- | --- | --- |
| `VERCEL` | `1` | **Wajib!** Memberitahu sistem untuk berjalan dalam mode static fallback |
| `ADMIN_PASSWORD` | `password_admin_anda` | Password login Admin Console |
| `GDRIVE_FOLDER_ID` | `1_IDFolderGDrive` | ID Folder Google Drive utama |
| `GDRIVE_SERVICE_ACCOUNT_JSON` | `{"type":"service_account",...}` | Entire JSON credential string 1-baris dari Google Cloud |

> [!TIP]
> **Tips memasukkan `GDRIVE_SERVICE_ACCOUNT_JSON` di Vercel:**  
> Buka file JSON credentials Anda di text editor, *copy* seluruh isinya (termasuk kurung kurawal `{}`), lalu paste langsung di input Value Vercel. Vercel akan menangani perataan newlines `\n` secara otomatis.

5. Klik **Deploy**. Vercel akan menjalankan `npm run build` untuk membuat `public/gallery.json` dan mempublikasikan website secara serverless.

---

## 🏷️ Konvensi Nama File & Struktur Google Drive

### Hirarki Folder Google Drive
```
Root Folder (GDRIVE_FOLDER_ID)/
├── 01_DIVE SITES MARATUA/        <-- Level 1: Folder Region
│   ├── 01_Channel/               <-- Level 2: Folder Dive Site
│   │   └── Chevron barracuda_channel_maratua_09_08_26_armindo.jpg
│   └── 02_East Wall/
└── 02_DIVE SITES KAKABAN/
```

### Format Nama File
```
[species]_[detail opsional]_[site]_[region]_[DD]_[MM]_[YY]_[photographer].[ext]
```

**Contoh:**
`Chevron barracuda_channel_maratua_09_08_26_armindo.jpg`
- **Species:** Chevron barracuda
- **Location:** Channel · Maratua
- **Date:** 09-08-2026
- **Photographer:** Armindo

### Ekstensi yang Didukung
- **Gambar:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- **Video:** `.mp4`, `.mov`, `.avi`

---

## 📡 API Reference

### 1. Public API

#### `GET /api/gallery`
Mengembalikan daftar galeri aset.  
**Query Parameters:**
- `?region=Maratua` : Filter berdasarkan nama region.
- `?site=Channel` : Filter berdasarkan nama dive site.
- `?type=image|video` : Filter tipe media.
- `?search=barracuda` : Full-text search (species, lokasi, fotografer, nama file).

#### `GET /api/gallery/meta`
Mengembalikan summary statistik (total file, jumlah gambar/video, daftar region, dan daftar site) untuk UI filter.

#### `POST /api/gallery/refresh`
Memaksa penghapusan *in-memory cache* galeri.

---

### 2. Admin API (Butuh Header `x-admin-password`)

#### `POST /api/admin/login`
Verifikasi password admin.  
**Request Body:** `{ "password": "..." }`

#### `GET /api/admin/status`
Mengembalikan status sinkronisasi Google Drive, progres, *log console*, dan daftar *convention warnings*.

#### `POST /api/admin/sync`
Memicu proses sinkronisasi Google Drive secara asynchronous background.

#### `GET /api/cron/sync`
Endpoint Cron Job untuk sinkronisasi terjadwal (Vercel Crons / External Cron).

---

## 📜 Lisensi & Kontribusi

Dikelola untuk **Derawan Archipelago Encyclopedia Project**. Hak Cipta © 2026. All Rights Reserved.

