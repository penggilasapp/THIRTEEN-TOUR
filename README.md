# THIRTEEN Operator Tour — Bespoke Indonesian Expeditions

Sistem Tour Booking, Itinerary Management, dan Public Client Portal untuk THIRTEEN Operator Tour (Bali, Bromo, Ijen, Yogyakarta).

## 🚀 Cara Menjalankan Project di Komputer Lokal

### 1. Prasyarat
- **Node.js**: Versi 18 atau 20+ ([Download Node.js](https://nodejs.org/))
- **NPM** atau **Bun** / **Yarn**

### 2. Langkah Instalasi & Menjalankan

1. Ekstrak file zip ini ke folder pilihan Anda di komputer.
2. Buka terminal / command prompt pada folder tersebut.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Jalankan development server:
   ```bash
   npm run dev
   ```
5. Buka browser pada alamat yang muncul di terminal (biasanya `http://localhost:3000` atau `http://localhost:5173`).

### 3. Build untuk Production
Untuk membuat bundle siap rilis atau deploy ke web hosting:
```bash
npm run build
```
Hasil build akan berada di folder `dist/`.

---

## 📁 Struktur Folder Project

- `src/`
  - `components/`
    - `client/` : Halaman publik tamu (Home, Destinations, Experiences, Tours, FAQ, About Us, Contact, Itinerary Tracker, Inquire Modal).
    - `admin/` : Dashboard internal operator (CRM Leads, Itinerary Builder, Paket Wisata, Jaringan Mitra, Metrik Evaluasi).
    - `common/` : Navigasi atas, simulator perangkat mobile, dan pusat ekspor data.
  - `data/` : Berkas data sumber TypeScript (Paket tur, Destinasi, Pengalaman, Kebijakan, FAQ, Mitra).
  - `context/` : State management tur, pemesanan, mata uang, dan routing.
  - `types/` : Definisi tipe TypeScript untuk paket tur, pemesanan, dan operasional.
- `index.html` : Entry point aplikasi web.
- `vite.config.ts` : Konfigurasi Vite & Tailwind CSS.
