const test = require("node:test");
const assert = require("node:assert");

// Logika fungsi inti SIBURSA yang diuji
function validasiPenawaran(nominal) {
  const n = Number(nominal);
  if (isNaN(n) || n < 1000) {
    return { valid: false, pesan: "Penawaran minimal Rp1.000" };
  }
  return { valid: true, pesan: "" };
}

function hitungHargaBaru(hargaSaatIni, nominalPenawaran) {
  return hargaSaatIni + Number(nominalPenawaran);
}

function filterBarang(items, kataKunci, kategori) {
  return items.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(kataKunci.toLowerCase());
    const cocokKategori = kategori === "Semua" || item.kategori === kategori;
    return cocokNama && cocokKategori;
  });
}

function formatCSV(items) {
  let csv = "ID,Nama Barang,Kategori,Harga Saat Ini (Rp)\n";
  items.forEach((item) => {
    csv += `${item.id},"${item.nama}","${item.kategori}",${item.h}\n`;
  });
  return csv;
}

// -------------------------------------------------------------
// PENGUJIAN UNIT TEST (SKENARIO UJI OTOMATIS)
// -------------------------------------------------------------

// Uji 1: Penawaran kurang dari Rp1.000 harus ditolak
test("validasiPenawaranMenolakNominalKurangDari1000", () => {
  const hasil = validasiPenawaran(500);
  assert.strictEqual(hasil.valid, false);
  assert.strictEqual(hasil.pesan, "Penawaran minimal Rp1.000");
});

// Uji 2: Penawaran Rp1.000 atau lebih harus diterima
test("validasiPenawaranMenerimaNominal1000AtauLebih", () => {
  const hasil = validasiPenawaran(2000);
  assert.strictEqual(hasil.valid, true);
});

// Uji 3: Penjumlahan harga penawaran baru
test("hitungHargaBaruMenambahkanHargaDenganNominalPenawaran", () => {
  const hargaBaru = hitungHargaBaru(25000, 5000);
  assert.strictEqual(hargaBaru, 30000);
});

// Uji 4: Filter kata kunci dan kategori
test("filterBarangMenyaringBerdasarkanKategoriDanKataKunci", () => {
  const sample = [
    { id: 1, nama: "Buku IPA Bekas", kategori: "Buku", h: 10000 },
    { id: 2, nama: "Mikroskop", kategori: "Alat Praktikum", h: 50000 },
  ];
  const hasil = filterBarang(sample, "buku", "Buku");
  assert.strictEqual(hasil.length, 1);
  assert.strictEqual(hasil[0].nama, "Buku IPA Bekas");
});

// Uji 5: Format header dan baris data ekspor CSV
test("formatCSVMenghasilkanHeaderDanBarisDataYangBenar", () => {
  const sample = [{ id: 1, nama: "Buku IPA Bekas", kategori: "Buku", h: 10000 }];
  const csv = formatCSV(sample);
  assert.match(csv, /ID,Nama Barang,Kategori,Harga Saat Ini \(Rp\)/);
  assert.match(csv, /1,"Buku IPA Bekas","Buku",10000/);
});