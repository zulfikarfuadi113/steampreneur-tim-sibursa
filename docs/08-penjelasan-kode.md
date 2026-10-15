# Penjelasan Kode

Tidak ada sesi presentasi, jadi dokumen ini adalah bukti utama bahwa tim memahami kode yang dihasilkan AI.

Aturan:
- Setiap anggota menjelaskan **minimal dua bagian kode yang berbeda**. Bagian yang dijelaskan tidak boleh sama dengan anggota lain.
- Tulis dengan bahasa sendiri. Boleh bertanya ke AI untuk memahami, tetapi jangan menyalin jawabannya.
- Sebut nama file dan fungsi yang nyata, serta contoh nilai yang nyata.
- Jika memungkinkan, setiap anggota meng-commit bagiannya sendiri dari akun GitHub masing-masing.

---

## Bagian A: Penjelasan per anggota

### Penjelasan 1
- **Ditulis oleh:** Muhammad Zulfikar Fuadi
- **File dan fungsi:** `src/script.js` - fungsi `kirim()`
- **Apa yang dilakukan:** Mengambil nilai penawaran dari input `#dlg-input`, memvalidasi agar nilai tidak kosong dan minimal Rp1.000, lalu menambahkan nilai tersebut ke harga barang (`cur.h += v`), menambahkan data candlestick baru ke array `cur.candles`, dan menyimpan seluruh data ke `localStorage`.
- **Kenapa dibuat seperti ini:** Agar aplikasi dapat menghitung penawaran secara langsung tanpa *reload* halaman, memastikan aturan bisnis minimal Rp1.000 terpenuhi, serta menjaga data transaksi tetap tersimpan saat browser ditutup atau dimuat ulang.
- **Contoh:** Jika harga barang saat ini Rp35.000 dan pengguna memasukkan angka `1000`, maka `cur.h` menjadi `36000` (35.000 + 1.000). Batang *candlestick* baru ditambahkan ke array dengan harga buka (*Open*) Rp35.000 dan harga tutup (*Close*) Rp36.000.
- **Jika input salah atau kosong:** Jika input diisi `500` atau dikosongkan (`""`), kondisi `!v || v < 1000` bernilai `true`. Elemen `#dlg-err` akan menampilkan pesan error `"Masukkan penawaran minimal Rp1.000."` dan fungsi langsung dihentikan (`return`) tanpa mengubah harga.

### Penjelasan 2
- **Ditulis oleh:** Nadia Dwi Apriliani
- **File dan fungsi:** `src/script.js` - fungsi `gambarCandlestick()`
- **Apa yang dilakukan:** Membaca array `cur.candles` dari barang yang sedang dipilih, menentukan rentang harga tertinggi (`maxP`) dan terendah (`minP`), lalu menggambar garis sumbu (wick) dan batang lilin (body) pada elemen `<canvas id="candleCanvas">`.
- **Kenapa dibuat seperti ini:** HTML5 Canvas API dipilih karena ringan dan tidak membutuhkan *library* eksternal. Grafik ini memberikan visualisasi pergerakan harga bursa secara real-time bagi siswa.
- **Contoh:** Jika transaksi memiliki data harga buka Rp85.000 dan harga tutup Rp100.000, fungsi menghitung posisi koordinat Y di canvas. Karena harga tutup lebih tinggi dari harga buka, batang lilin diberi warna hijau (`#10b981` / *Bullish*). Jika harga turun, diberi warna merah (`#f43f5e` / *Bearish*).
- **Jika input salah atau kosong:** Jika array `cur.candles` kosong atau elemen `canvas` tidak ditemukan di DOM, fungsi akan mengeksekusi `if (!canvas || !cur || !cur.candles) return;` sehingga proses penggambaran dibatalkan secara aman tanpa memicu error di console.

### Penjelasan 3
- **Ditulis oleh:** Aisyah Nida Amin Abidah
- **File dan fungsi:** `src/script.js` - fungsi `gambarBaris()`
- **Apa yang dilakukan:** Mengambil data dari array `items`, menyaring barang berdasarkan kata kunci pencarian pada elemen `#cari` dan kategori aktif (`aktif`), lalu merender baris-baris tabel `<tr>` di elemen `<tbody>` (`#isi`).
- **Kenapa dibuat seperti ini:** Agar tabel papan bursa bersifat interaktif dan responsif. Pengguna dapat mencari barang bekas sekolah atau menyaring berdasarkan kategori (Buku, Elektronik, Alat Praktikum, Seragam) secara instan.
- **Contoh:** Jika kata kunci di kolom pencarian adalah `"fisika"` dan kategori `"Semua"`, fungsi menyaring array `items` dan hanya menampilkan baris "Buku Fisika Kelas XI" lengkap dengan harga Rp45.000 dan persentase tren harga.
- **Jika input salah atau kosong:** Jika hasil pencarian tidak mencocokkan barang apa pun (misal mengetik `"pesawat"`), array `data` bernilai kosong (`[]`). Fungsi akan menampilkan elemen `#kosong` (pesan `"Barang tidak ditemukan."`) dan mengosongkan isi tabel.

---

## Bagian B: Pertanyaan yang dijawab bersama

1. **Jika aturan bisnis utama di spesifikasi berubah (tuliskan contoh perubahannya), file dan fungsi mana yang harus diubah? Jelaskan alasannya.**
   - **Contoh Perubahan Aturan:** Batas penawaran minimal dinaikkan dari Rp1.000 menjadi Rp5.000, atau penawaran harus kelipatan Rp1.000.
   - **File & Fungsi yang Diubah:** File `src/script.js` pada fungsi `kirim()` dan file `src/index.html` pada atribut placeholder/label form.
   - **Alasan:** Pengecekan aturan bisnis penawaran dilakukan di dalam fungsi `kirim()` pada kondisi `if (!v || v < 1000)`. Jika batas minimal berubah menjadi Rp5.000, kondisi tersebut cukup diubah menjadi `if (!v || v < 5000)`. Selain itu, label dan atribut `min="5000"` pada input `#dlg-input` di `src/index.html` perlu disesuaikan agar tampilan UI sejalan dengan aturan baru.

2. **Bagaimana data mengalir dari saat pengguna mengisi form sampai hasilnya tampil di layar? Sebutkan file dan fungsi yang dilewati secara berurutan.**
   1. Pengguna mengetik nominal penawaran di input `#dlg-input` dan menekan tombol `"Tawar"` di file `src/index.html`.
   2. Event listener `onclick` memanggil fungsi `kirim()` di file `src/script.js`.
   3. Fungsi `kirim()` membaca input, memvalidasi angka, lalu menambahkan nilai tawar ke properti `cur.h` dan menambah objek candlestick baru ke `cur.candles`.
   4. Array `items` yang diperbarui disimpan ke penyimpanan browser via `localStorage.setItem('dataBursa', JSON.stringify(items))`.
   5. Fungsi `kirim()` memanggil `segarkanModal()`, yang selanjutnya memanggil `gambarCandlestick()` untuk menggambar ulang grafik di canvas dan `gambarBaris()` untuk memperbarui harga serta persentase tren di tabel papan bursa.

3. **Pilih satu unit test. Apa yang diuji, dan dalam kondisi apa test itu akan gagal?**
   - **Unit Test yang Dipilih:** Kasus Uji U02 (Input di bawah batas minimal Rp1.000).
   - **Apa yang Diuji:** Validasi keamanan input form penawaran saat pengguna memasukkan angka di bawah batas minimal (misal: 500).
   - **Kondisi Fails / Gagal:** Test ini akan gagal jika pengembang lupa memberikan pengecekan `v < 1000` di fungsi `kirim()`, sehingga sistem tetap menerima tawaran Rp500, menaikkan harga barang sebesar Rp500, dan tidak memunculkan pesan peringatan di `#dlg-err`.

4. **Pilih satu saran AI yang kalian tolak. Apa sarannya dan kenapa kalian menolaknya?**
   - **Saran yang Ditolak:** Memecah file `src/script.js` menjadi beberapa file terpisah seperti `chart.js`, `storage.js`, dan `app.js`.
   - **Alasan Menolak:** Aplikasi SIBURSA dirancang sebagai *Single Page Application* (SPA) sederhana tanpa *bundler* seperti Webpack atau Vite. Menjaga seluruh logika JavaScript dalam satu file `src/script.js` membuat struktur proyek tetap sederhana, mempercepat waktu muat (*load time*), dan memudahkan tim dalam melacak bugs secara terpusat.

5. **Bagian kode mana yang paling sulit dipahami, dan bagaimana kalian akhirnya memahaminya?**
   - **Bagian yang Paling Sulit:** Fungsi `gambarCandlestick()` pada Canvas API, khususnya logika penentuan skala koordinat Y (`yOpen`, `yClose`, `yHigh`, `yLow`) berdasarkan rentang harga minimum (`minP`) dan maksimum (`maxP`).
   - **Cara Memahaminya:** Tim menggambar skema koordinat kartesius di kertas coretan. Kami menyadari bahwa titik koordinat Y `0,0` pada HTML5 Canvas berada di pojok kiri atas (terbalik dari grafik matematika biasa). Rumus `h - ((price - minP) / (maxP - minP)) * h` digunakan untuk mengonversi rentang nominal Rupiah menjadi titik piksel layar secara proporsional.