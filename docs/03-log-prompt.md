# Log Prompt

**Alat AI yang dipakai:** Gemini AI

Catat prompt penting saja, tidak perlu semuanya. Yang wajib dicatat: prompt yang menghasilkan kode utama, prompt yang hasilnya ditolak atau diperbaiki, dan prompt untuk debugging.

| No | Waktu | Langkah ke- | Prompt (ringkas) | Hasil dari AI | Keputusan tim (diterima / diubah / ditolak) dan alasannya |
|---|---|---|---|---|---|
| 1 | 09:00 | 2 | "Buat struktur HTML5 dasar dengan Tailwind CSS, font Plus Jakarta Sans & JetBrains Mono untuk SIBURSA, lengkap dengan Header Navbar dan Hero Section." | Kerangka HTML, konfigurasi Tailwind dark mode/colors, Font Google, Header Navbar, dan Hero Section. | **Diterima** — Tampilan bersih, modern, dan variabel warna brand/bull/bear sesuai dengan tema bursa sekolah. |
| 2 | 09:35 | 2 | "Tambahkan tabel Papan Pasar Real-time dengan filter chip kategori, kolom pencarian, tren 24j, dan sparkline mini candlestick." | Tabel HTML, chips filter, input search, fungsi `gambarChip()`, `gambarBaris()`, dan fungsi canvas `drawMiniCandle()`. | **Diterima dengan penyesuaian** — Menyesuaikan perhitungan persentase tren (`naik` / `turun`) agar dinamis mengikuti selisih harga terhadap harga awal (`h0`). |
| 3 | 10:15 | 3 | "Buat modal dialog penawaran harga dengan validasi form minimal Rp1.000. Jika input < 1000 atau kosong, tampilkan pesan kesalahan yang jelas." | Modal `<dialog>`, form input angka, tombol tawar, pesan error `#dlg-err`, logika penambahan harga `cur.h += v`, dan simulasi penawar balik. | **Diterima** — Validasi form menolak angka di bawah 1000 dengan tepat dan simulasi tawaran balasan dari siswa lain berjalan responsif. |
| 4 | 11:00 | 4 | "Buat fungsi Canvas API untuk menggambar grafik Candlestick interaktif (Open, High, Low, Close) dan integrasikan penyimpanan data ke localStorage." | Fungsi `gambarCandlestick()` pada Canvas API, gridlines harga, serta baris `localStorage.setItem('dataBursa', ...)` untuk menyimpan array `items`. | **Diterima** — Grafik lilin dapat merender batang bull/bear secara akurat dan data transaksi tetap tersimpan saat halaman dimuat ulang (refresh/F5). |