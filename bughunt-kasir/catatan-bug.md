# Catatan Bug Hunt: Kasir Kantin STEAM

**Nama tim:** SIBURSA

Buat satu entri untuk setiap bug yang ditemukan. Simpan file ini di folder `bughunt-kasir/`.

## Bug 1
- **Gejala** (apa yang terlihat salah): Jumlah pesanan bernilai minus/negatif sehingga jumlah produk di keranjang menjadi minus.
- **Langkah untuk memunculkan bug:** Memasukkan jumlah pesanan bernilai negatif (misal: `-1`), lalu klik tombol "Tambah".
- **Aturan bisnis yang dilanggar** (nomor aturan di README): Nomor 1 (Jumlah pesanan harus berupa bilangan bulat positif).
- **Penyebab** (file, fungsi, dan penjelasan): Tidak ada validasi nilai input jumlah pesanan saat menambah produk ke keranjang, sehingga angka negatif tetap dimasukkan ke keranjang.
- **Perbaikan** (apa yang diubah): Menambahkan kondisi pengecekan `if (jumlah <= 0)` agar sistem menolak pesanan bernilai kurang dari atau sama dengan nol.
- **Test yang membuktikan** (nama test): `testJumlahPesananNegatif`
- **Commit perbaikan** (pesan commit): `bughunt: perbaiki bug 1 - cegah jumlah pesanan negatif masuk keranjang`
- **Ditemukan oleh:** bersama

## Bug 2
- **Gejala:** Apabila produk yang sudah ada di keranjang ditambahkan lagi (contoh: Es Teh jumlah 2 lalu ditambah 2), jumlah produk di keranjang tidak menjadi 4 melainkan `22` (terjadi penggabungan teks/string).
- **Langkah untuk memunculkan bug:** Memesan kembali produk yang sudah ada di dalam keranjang belanja.
- **Aturan bisnis yang dilanggar:** Nomor 2 (Pembaruan jumlah produk di keranjang harus dihitung secara kumulatif/penjumlahan).
- **Penyebab:** Nilai variabel input jumlah pesanan bertipe teks (*string*), sehingga operator `+` melakukan penggabungan string (*string concatenation*) bukannya penjumlahan aritmatika.
- **Perbaikan:** Mengonversi variabel input jumlah pesanan menjadi tipe data angka/integer menggunakan `parseInt()` atau `Number()`.
- **Test yang membuktikan:** `testPenjumlahanJumlahProduk`
- **Commit perbaikan:** `bughunt: perbaiki bug 2 - konversi tipe data jumlah pesanan ke integer`
- **Ditemukan oleh:** bersama

## Bug 3
- **Gejala:** Pembeli bukan member yang berbelanja dengan total antara Rp100.000 hingga Rp110.000 tidak mendapatkan diskon, padahal seharusnya berhak mendapat diskon.
- **Langkah untuk memunculkan bug:** Pembeli non-member memesan produk dengan subtotal belanja di atas Rp100.000 dan di bawah Rp110.000.
- **Aturan bisnis yang dilanggar:** Nomor 4 (Diskon untuk non-member berlaku untuk belanja minimal Rp100.000).
- **Penyebab:** Syarat kondisi perhitungan diskon non-member di dalam kode dibuat `subtotal > 110000` bukannya `subtotal >= 100000`.
- **Perbaikan:** Mengubah syarat batas minimal subtotal diskon non-member menjadi `subtotal >= 100000`.
- **Test yang membuktikan:** `testDiskonNonMember100ribu`
- **Commit perbaikan:** `bughunt: perbaiki bug 3 - koreksi batas minimal subtotal diskon non-member`
- **Ditemukan oleh:** bersama

## Bug 4
- **Gejala:** Apabila uang yang dibayarkan kurang dari total belanja, nilai kembalian yang muncul bernilai minus/negatif dan transaksi tetap diproses.
- **Langkah untuk memunculkan bug:** Memasukkan nominal uang pembayaran yang lebih kecil daripada total belanja.
- **Aturan bisnis yang dilanggar:** Nomor 7 (Uang pembayaran tidak boleh kurang dari total belanja).
- **Penyebab:** Tidak ada fungsi pengecekan/validasi kecukupan uang pembayaran sebelum menghitung uang kembalian dan menyelesaikan transaksi.
- **Perbaikan:** Menambahkan pengecekan kecukupan pembayaran. Jika `bayar < total`, munculkan pesan peringatan error dan batalkan proses transaksi.
- **Test yang membuktikan:** `testPembayaranKurang`
- **Commit perbaikan:** `bughunt: perbaiki bug 4 - tambah validasi kecukupan uang pembayaran`
- **Ditemukan oleh:** bersama