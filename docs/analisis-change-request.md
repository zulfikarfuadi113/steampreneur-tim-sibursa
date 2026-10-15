# Analisis Change Request

Isi bagian ini **sebelum** mengubah kode, lalu commit dan push (contoh pesan: `dokumen: analisis change request`). Juri memeriksa bahwa commit ini muncul sebelum commit perubahan kode.

**Change request:** pencarian, filter, dan ekspor CSV (lihat Tugas 3 di lembar challenge).

**Kriteria penerimaan yang akan dipenuhi dan cara kami memenuhinya:**

## 1. Dampak

| Bagian yang terdampak | File / fungsi | Perubahan yang diperlukan |
|---|---|---|
| Spesifikasi | `docs/01-spesifikasi.md` | Menambahkan fitur pencarian, filter kategori, dan ekspor CSV pada daftar fitur wajib dan alur aplikasi. |
| Kode | `src/index.html`, `src/script.js` | Menambahkan elemen input pencarian, tombol filter kategori, tombol ekspor CSV, serta logika fungsi `eksporCSV()` di `src/script.js`. |
| Kasus uji / test | `docs/04-kasus-uji.md` | Menambahkan kasus uji U07, U08, dan U09 untuk menguji pengoperasian fitur pencarian, filter, dan unduh CSV. |
| README | `README.md` | Memperbarui deskripsi fitur utama di `README.md` dengan mencantumkan fitur pencarian, filter kategori, dan ekspor CSV. |

## 2. Kasus uji baru

| ID | Langkah / input | Hasil yang diharapkan |
|---|---|---|
| U07 | Ketik kata kunci pada kolom pencarian (misal: `"buku"`) | Tabel papan bursa hanya menampilkan daftar barang yang mengandung kata kunci `"buku"`. |
| U08 | Klik tombol filter kategori (misal: `"Elektronik"`) | Tabel papan bursa hanya menampilkan daftar barang yang termasuk dalam kategori `"Elektronik"`. |
| U09 | Klik tombol `"Ekspor CSV"` | Browser mengunduh file `data-bursa-sibursa.csv` berisi rekapitulasi data barang, kategori, dan harga terbaru. |

## 3. Setelah selesai
- [x] Kasus uji lama tetap lulus
- [x] Kasus uji baru lulus
- [x] Spesifikasi diperbarui
- [x] README diperbarui