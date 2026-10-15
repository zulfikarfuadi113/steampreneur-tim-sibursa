const test = require("node:test");
const assert = require("node:assert");
const kasir = require("../kasir.js");

// Test Bug 1: Cegah jumlah pesanan negatif
test("testJumlahPesananNegatif", () => {
  const keranjang = [];
  assert.throws(() => {
    kasir.tambahItem(keranjang, "K04", -1);
  }, /Jumlah pesanan harus/);
});

// Test Bug 2: Penjumlahan item yang sama (mencegah gabung string "22")
test("testPenjumlahanJumlahProduk", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K04", 2);
  kasir.tambahItem(keranjang, "K04", 2);
  assert.strictEqual(keranjang[0].qty, 4);
});

// Test Bug 3: Diskon non-member pas Rp100.000
test("testDiskonNonMember100ribu", () => {
  const subtotal = 100000;
  const diskon = kasir.hitungDiskon(subtotal, false);
  assert.strictEqual(diskon, 5000); // 5% dari 100.000 = 5.000
});

// Test Bug 4: Pembayaran kurang
test("testPembayaranKurang", () => {
  assert.throws(() => {
    kasir.hitungKembalian(50000, 30000);
  }, /Uang pembayaran kurang/);
});