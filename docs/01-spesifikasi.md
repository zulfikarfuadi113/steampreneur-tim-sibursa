# Spesifikasi Produk

**Nama tim:** SIBURSA  
**Nama produk:** SIBURSA (Sistem Bursa dan Lelang Digital Barang Bekas Siswa SMK Berbasis Verifikasi Kecerdasan Buatan)  
**Alur inti yang dibangun:** Siswa menjelajahi Papan Bursa lalu Memilih barang & mengajukan penawaran harga lalu Melihat hasil pergerakan harga pada grafik Candlestick real-time & rekap data tersimpan.

---

## 1. Masalah
Banyaknya seragam, buku pelajaran, dan barang/alat praktik yang menumpuk di rumah. Di marketplace umum, barang-barang vokasional tenggelam di antara jutaan listing lain, sedangkan pengepul tradisional mematok harga secara sepihak. Pihak yang mengalami masalah ini adalah siswa SMK.

## 2. Pengguna
**Siapa yang memakai aplikasi ini?** Siswa SMK.  
**Apa yang mereka butuhkan?** Memperoleh harga jual yang lebih adil untuk barang bekasnya dan mendapatkan akses terhadap barang/alat praktik bekas berkualitas dari kompetensi keahlian yang sama dengan harga terjangkau di bawah pasar.

## 3. Hasil Wawancara Calon Pengguna
* **Narasumber:** Siswa Jurusan DKV, Kelas XI
* **Cara Wawancara:** Langsung (Tatap Muka) / Pesan Singkat
* **Tanggal Wawancara:** 03 Oktober 2026

| Pertanyaan kami | Jawaban narasumber |
|---|---|
| Dapatkah Saudara/i menceritakan secara singkat mengenai program keahlian yang sedang ditempuh serta barang atau alat praktik yang paling sering digunakan selama mengikuti kegiatan pembelajaran? | DKV, mempelajari tentang desain grafis, fotografi, videografi, dan animasi. Alat praktik yang sering digunakan saat pembelajaran ialah laptop, kamera, kertas, pensil, dll. |
| Apa yang biasanya Saudara/i lakukan terhadap barang-barang sekolah yang sudah tidak digunakan lagi, seperti seragam lama, perlengkapan praktik, buku, atau modul pembelajaran? | Diberikan kepada adik kelas yang membutuhkan, dan hanya disimpan di kamar atau kardus. |
| Apakah Saudara/i pernah mengalami kesulitan dalam menentukan bagaimana barang bekas tersebut akan dimanfaatkan atau disalurkan? Selain itu, apakah Saudara/i pernah mengalami kesulitan ketika mencari barang atau alat praktik bekas dengan harga yang terjangkau dari kakak kelas atau siswa lainnya? Jika pernah, mohon ceritakan pengalaman tersebut. | Pernah, karena sayang dibuang, repot untuk mempromosikan, dan sulit mencari info jualan dari kakak kelas dengan harga miring. |
| Apakah Saudara/i pernah melakukan transaksi jual-beli barang bekas dengan siswa lain di lingkungan sekolah? Jika pernah, dapatkah Saudara/i menceritakan pengalaman terakhir melakukan transaksi tersebut, termasuk bagaimana prosesnya berlangsung? | Pernah, tetapi prosesnya lama karena harus mengirim foto-foto, tawar-menawar, dan tidak efisien. |
| Menurut pengalaman Saudara/i, apa saja hal yang dapat menimbulkan keraguan, kesulitan, atau kekhawatirkan ketika melakukan jual-beli barang bekas dengan sesama siswa? | Kesesuaian barang dengan foto, faktor kepercayaan, dan sulit menentukan jadwal COD. |
| Bagaimana Saudara/i dan siswa lainnya biasanya menentukan harga yang dianggap sesuai untuk barang bekas sekolah yang akan dijual? | Memperkirakan dengan cara melihat kondisi barang, dikurangi sekitar 30%–50%, dan ikhlas serta untung. |
| Ketika membutuhkan barang atau alat praktik bekas dalam waktu relatif cepat, media atau sumber informasi apa yang biasanya Saudara/i gunakan untuk menemukan barang tersebut? | Bertanya ke teman sekelas atau studi tanya ke kakak kelas. |
| Dari berbagai kendala yang Saudara/i alami atau ketahui terkait jual-beli barang bekas di lingkungan sekolah, masalah apa yang menurut Saudara/i paling penting untuk diselesaikan? | Sistem verifikasi pengguna, transparansi riwayat penawaran harga, dan deskripsi barang yang jelas. |

---

## 4. Fitur Wajib (Alur Inti)
1. **Papan Pasar Real-time (Katalog & Rekap):** Menampilkan daftar barang/karya siswa lengkap dengan kategori, harga terkini, dan tren harga.
2. **Formulir Penawaran/Lelang Ter-validasi:** Memungkinkan siswa mengajukan penawaran harga baru dengan pesan kesalahan yang jelas jika input kosong atau salah.
3. **Grafik Pergerakan Candlestick:** Menampilkan riwayat dan dinamika penawaran harga secara real-time dalam bentuk chart lilin (Open, High, Low, Close).

## 5. Di Luar Cakupan (Out of Scope)
- Pembayaran online otomatis (Payment Gateway / Midtrans).
- Sistem obrolan instan (Live Chat) antar pengguna.
- Integrasi jasa pengiriman / ekspedisi luar sekolah.

## 6. Aturan Bisnis dan Perhitungan
1. **Validasi Penawaran:** Nominal penawaran minimal adalah **Rp1.000**. Input berupa angka di bawah Rp1.000, 0, atau kosong wajib ditolak sistem dengan pesan error.
2. **Kalkulasi Harga:** Setiap penawaran sah akan menambah harga barang (`Harga Baru = Harga Lama + Nominal Penawaran`).
3. **Pembentukan Candlestick:** Setiap penawaran berhasil mencatat titik data *Open* (harga sebelum tawar), *High* (harga tertinggi), *Low* (harga terendah), dan *Close* (harga setelah tawar).
4. **Perhitungan Tren:** Persentase perubahan harga dihitung dari selisih harga saat ini dibanding harga awal barang.

## 7. Data yang Disimpan
| Data | Contoh Isi | Disimpan di mana |
|---|---|---|
| Daftar Barang & Kategori | `{ id: 1, n: "Buku Fisika", k: "Buku", h: 45000 }` | `localStorage` Browser |
| Riwayat Candlestick | `{ o: 45000, h: 50000, l: 45000, c: 50000 }` | `localStorage` Browser |
| Log Penawaran | `"[Kamu] Menawar Rp5.000 -> Harga naik"` | `localStorage` Browser |

## 8. Kriteria "Selesai"
- [ya] Pengguna dapat melihat daftar barang bekas dan riwayat harganya di Papan Bursa.
- [ya] Form penawaran menolak input kosong atau nominal di bawah Rp1.000 dengan pesan kesalahan yang jelas.
- [ya] Perhitungan harga baru dan grafik Candlestick terbarui secara otomatis saat penawaran dikirim.
- [ya] Data barang, harga, dan grafik tetap tersimpan dan tidak kembali ke awal saat halaman browser di-refresh.
- [ya] Terdapat tabel rekap data yang siap digunakan untuk pencarian dan penyaringan data.