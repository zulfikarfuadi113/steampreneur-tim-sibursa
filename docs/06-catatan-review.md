# Catatan Code Review

Minta AI me-review kode kalian, lalu putuskan saran mana yang diterima.
Menolak saran AI dengan alasan yang jelas adalah hal yang baik.

**Prompt review yang dipakai:**
"Lakukan code review terhadap file src/script.js dan src/index.html. Berikan saran perbaikan dari segi keamanan, kompatibilitas browser, dan struktur kode."

| No | Saran dari AI | Diterima / ditolak | Alasan | Bagian kode yang berubah |
|---|---|---|---|---|
| 1 | Gunakan `textContent` saat memasukkan teks riwayat penawaran ke elemen `<li>`, hindari `innerHTML`. | Diterima | Mencegah potensi celah Cross-Site Scripting (XSS) jika ada input teks yang tidak disengaja. | Fungsi `catat()` di `src/script.js` |
| 2 | Ganti metode `ctx.roundRect()` dengan `ctx.fillRect()` standar pada grafik Candlestick. | Diterima | Beberapa browser HP atau browser laptop lama belum mendukung `roundRect()`, sehingga `fillRect()` lebih stabil di semua perangkat. | Fungsi `gambarCandlestick()` di `src/script.js` |
| 3 | Pecah `script.js` menjadi beberapa file terpisah (`chart.js`, `storage.js`, `app.js`). | Ditolak | Aplikasi SIBURSA masih berskala SPA sederhana. Menjaga logika tetap dalam 1 file `script.js` lebih memudahkan debugging dan pengelolaan file bagi tim. | Tidak ada (struktur file tetap disatukan) |
| 4 | Tambahkan fungsi `resetDataBursa()` untuk mengembalikan `localStorage` ke data awal. | Diterima | Memudahkan penguji atau juri saat ingin mengulang simulasi dari kondisi bersih. | Fungsi `resetDataBursa()` di `src/script.js` dan tombol reset di `src/index.html` |

Penjelasan kode ditulis terpisah di `08-penjelasan-kode.md`.