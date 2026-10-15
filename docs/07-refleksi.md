# Refleksi Tim

Jawab pertanyaan refleksi berikut bersama tim setelah seluruh pekerjaan selesai.

### 1. Apa yang berjalan baik dalam cara kami bekerja dengan AI?
Pembagian peran antara manusia sebagai *navigator* dan AI sebagai *driver* berjalan dengan efektif. Kami tidak meminta AI membuat seluruh aplikasi sekaligus dalam satu prompt, melainkan memberikan instruksi bertahap (*step-by-step*) per fitur. Kami selalu menyertakan konteks aturan bisnis yang spesifik (seperti batas minimal penawaran Rp1.000) dan struktur data yang diinginkan, sehingga AI dapat menghasilkan potongan kode yang fokus dan mudah dipahami.

### 2. Kapan AI paling membantu? Kapan AI justru menyulitkan?
- **Paling membantu:** Saat membuat kerangka antarmuka (*scaffolding*) menggunakan Tailwind CSS, menyusun logika manipulasi DOM dasar, serta membantu memetakan rumus sketsa grafik matematika ke dalam fungsi Canvas API.
- **Justru menyulitkan:** Saat AI berasumsi atau menyimpulkan tipe data tanpa pengecekan yang ketat. AI sempat memperlakukan nilai input dari form HTML sebagai string sehingga kalkulasi aritmatika menjadi salah, serta menyarankan metode Canvas modern (`ctx.roundRect()`) yang belum didukung secara universal di semua browser.

### 3. Kesalahan terbesar yang hampir lolos, dan bagaimana kami menemukannya?
Kesalahan terbesar adalah penggabungan nilai teks (*string concatenation*) pada fungsi penawaran harga. Saat memasukkan tawaran Rp1.000 pada barang berharga Rp35.000, harganya melonjak menjadi `350001000` (Rp350.001.000). Kami menemukannya saat melakukan uji coba alur penawaran pada Tahap 5 (*Bug Hunt* / kasus uji U04). Kami langsung memperbaikinya dengan membungkus nilai input menggunakan `Number(dIn.value)` dan `Math.round()`.

### 4. Apa yang akan kami lakukan berbeda jika mengulang challenge ini?
Jika mengulang dari awal, kami akan menentukan *design system* dan konvensi nama variabel/properti objek data secara lebih rinci di dokumen spesifikasi sejak awal. Selain itu, kami akan menuliskan aturan konversi tipe data angka (*type casting*) di dalam *prompt* awal agar AI tidak kembali melakukan kesalahan penggabungan teks saat memproses input form.

### 5. Bagaimana kami mengatur waktu? Langkah mana yang jauh lebih lama dari estimasi, dan kenapa?
Kami mengatur waktu berdasarkan target per tahap di dokumen `docs/02-rencana.md`. Langkah yang memakan waktu jauh lebih lama dari estimasi adalah **Tahap 4 (Pembuatan Grafik Candlestick dengan Canvas API)**. Hal ini terjadi karena kami harus menyesuaikan skala koordinat Y secara terbalik (karena titik `0,0` pada Canvas berada di pojok kiri atas) dan memperhitungkan nilai tertinggi/terendah harga secara presisi agar batang lilin tidak keluar dari area canvas.

### 6. Bagian mana dari kode yang masih belum kami pahami sepenuhnya? (Jawab dengan jujur.)
Bagian kalkulasi penyesuaian skala piksel otomatis berdasarkan `window.devicePixelRatio` pada fungsi `drawMiniCandle()` dan `gambarCandlestick()`. Meskipun kami memahami fungsi utamanya untuk mencegah grafik terlihat buram (*pixelated*) di layar HP/Retina Display, beberapa operasi matematis manipulasi *context scale* Canvas masih membutuhkan bantuan rujukan dokumentasi untuk benar-benar dipahami alur perhitungannya.