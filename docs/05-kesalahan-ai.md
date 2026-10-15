# Kesalahan AI yang Kami Temukan

Catat setiap kali AI memberikan hasil yang salah, tidak sesuai spesifikasi, atau tidak perlu.
Ini bukan catatan kegagalan tim. Justru ini bukti bahwa tim memeriksa hasil AI.

| No | Apa yang diminta | Kesalahan AI | Bagaimana kami mengetahuinya | Perbaikan yang kami lakukan |
|---|---|---|---|---|
| 1 | Buat fungsi penawaran harga yang menambahkan nominal tawar ke harga barang saat ini. | AI menghasilkan kode yang menggabungkan angka sebagai teks (*string concatenation*), sehingga harga Rp35.000 + Rp1.000 menjadi `350001000`. | Saat menguji penawaran di browser (kasus uji U04), harga barang membengkak menjadi puluhan juta secara tidak wajar. | Membungkus nilai input menggunakan `Number(dIn.value)` dan `Math.round()` di file `src/script.js` agar kalkulasi dilakukan secara matematis. |
| 2 | Buat fungsi menggambar grafik batang Candlestick pada elemen Canvas API. | AI menggunakan fungsi `ctx.roundRect()` yang belum didukung secara universal di semua browser. | Saat pengujian *cross-browser* dan *code review*, grafik lilin tidak muncul pada beberapa browser lama dan memicu error di *console*. | Mengganti `ctx.roundRect()` menjadi `ctx.fillRect()` standar di `src/script.js` agar grafik dapat dirender dengan stabil di seluruh perangkat. |