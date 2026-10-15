# SIBURSA 

> **SIBURSA** adalah platform web interaktif tempat siswa dapat melakukan transaksi jual-beli dan penawaran barang bekas kebutuhan sekolah secara transparan dengan dukungan fitur visualisasi grafik pergerakan harga (*Candlestick Chart*).

---

## Fitur Utama

- **Papan Bursa & Filter Kategori:** Menampilkan daftar barang sekolah bekas lengkap dengan filter kategori (Buku, Elektronik, Alat Praktikum, Seragam) serta pencarian *real-time*.
- **Modal Penawaran & Validasi Aturan Bisnis:** Fitur tawar-menawar harga dengan validasi otomatis nominal penawaran minimal Rp1.000.
- **Grafik Candlestick Real-Time (Canvas API):** Visualisasi pergerakan harga pasar dan tren penawaran menggunakan grafik lilin murni tanpa *library* eksternal.
- **Penyimpanan Data Persisten (`localStorage`):** Data transaksi dan riwayat penawaran tersimpan otomatis di browser sehingga tidak hilang saat halaman di-refresh.
- **Tampilan Dark/Light Mode & Responsif:** Desain modern berbasis Tailwind CSS yang nyaman diakses dari laptop maupun ponsel.

---

## Teknologi yang Digunakan

- **HTML5 & Vanilla JavaScript (ES6)**
- **Tailwind CSS** (Styling UI)
- **HTML5 Canvas API** (Rendering grafik Candlestick)
- **HTML5 LocalStorage** (Manajemen data lokal)

---

## Cara Menjalankan Aplikasi

1. **Clone repositori** ini ke komputer lokal:
   ```bash
   git clone [https://github.com/zulfikarfuadi113/steampreneur-tim-sibursa.git](https://github.com/zulfikarfuadi113/steampreneur-tim-sibursa.git)
   ```
2. **Masuk ke folder proyek:**
   ```bash
   cd steampreneur-tim-sibursa
   ```
3. **Jalankan aplikasi:**
   - Buka file `src/index.html` langsung dengan klik dua kali di file manager, atau
   - Klik kanan pada file `src/index.html` di VS Code lalu pilih **Open with Live Server**.

---

##  Struktur Repositori

```text
steampreneur-tim-sibursa/
├── README.md                 <-- Panduan utama produk & cara menjalankan
├── src/                      <-- Kode sumber aplikasi
│   ├── index.html            <-- Tampilan antarmuka utama
│   └── script.js             <-- Logika JavaScript & Canvas API
└── docs/                     <-- Berkas dokumentasi kompetisi
    ├── 01-spesifikasi.md     <-- Spesifikasi kebutuhan produk
    ├── 02-rencana.md         <-- Rencana kerja & jadwal
    ├── 03-log-prompt.md      <-- Log percakapan dengan AI
    ├── 04-kasus-uji.md       <-- Hasil pengujian kasus uji
    ├── 05-kesalahan-ai.md    <-- Catatan bug AI dan perbaikannya
    ├── 06-catatan-review.md  <-- Catatan code review
    ├── 08-penjelasan-kode.md <-- Penjelasan logika kode per anggota
    └── bukti/                <-- Tangkapan layar bukti pengujian
```

---

##  Tim Pengembang

- **Muhammad Zulfikar Fuadi**
- **Nadia Dwi Apriliani**
- **Aisyah Nida Amin Abidah**