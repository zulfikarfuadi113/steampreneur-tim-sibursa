# Kasus Uji

Bagian A diisi **sebelum** mulai membangun. Hasil yang diharapkan dihitung sendiri oleh tim (boleh dengan kalkulator), bukan oleh AI.
Bagian B diisi setelah aplikasi diuji.

| ID | Kriteria yang diuji | Langkah / input | Hasil yang diharapkan | Hasil sebenarnya | Lulus? | Bukti (nama file tangkapan layar) |
|---|---|---|---|---|---|---|
| U01 | Input yang salah (Kosong) | Tidak mengisi angka apa-apa di form, lalu klik tombol "Ajukan Tawar" | Sistem menolak proses dan memunculkan tulisan peringatan error | - | - | - |
| U02 | Input yang salah (Di bawah batas) | Memasukkan angka 500 di kolom nominal penawaran | Ditolak karena minimal Rp1.000, muncul pesan error | - | - | - |
| U03 | Di batas aturan (Tepat Rp1.000) | Pilih barang dengan harga awal Rp35.000, lalu ketik tawaran pas 1000 | Tawaran diterima, harga barang bertambah menjadi Rp36.000 (35000 + 1000) | - | - | - |
| U04 | Perhitungan harga wajar (Normal) | Pilih barang dengan harga awal Rp85.000, lalu masukkan tawaran 15000 | Harga barang bertambah menjadi Rp100.000 (85000 + 15000) | - | - | - |
| U05 | Penyimpanan data (LocalStorage) | Refresh halaman web (tekan F5) setelah pengujian U04 berhasil | Harga di tabel harusnya tetap Rp100.000, tidak kembali ke harga awal | - | - | - |

Wajib ada:
- minimal satu kasus dengan **input yang salah** (kosong, negatif, huruf di kolom angka),
- minimal satu kasus **di batas aturan** (contoh: tepat Rp50.000 jika aturannya "minimal Rp50.000").

## Unit test otomatis (jika ada)
Nama file test: -
Jumlah test: - lulus dari -