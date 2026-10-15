// Data Awal Barang
const items = [
    { id: 1, n: "Buku Fisika Kelas XI", k: "Buku", h: 45000, h0: 45000, t: -8 },
    { id: 2, n: "Multimeter Digital Pro", k: "Elektronik", h: 85000, h0: 85000, t: 5 },
    { id: 3, n: "Arduino Uno R3 + Jumper", k: "Elektronik", h: 120000, h0: 120000, t: 12 },
    { id: 4, n: "Jas Lab Kimia Size M", k: "Alat Praktikum", h: 35000, h0: 35000, t: 0 }
];

const rp = v => "Rp" + v.toLocaleString("id-ID");
const cats = ["Semua", ...new Set(items.map(i => i.k))];
let aktif = "Semua";

const chips = document.getElementById("chips");
const isi = document.getElementById("isi");
const cari = document.getElementById("cari");
const kosong = document.getElementById("kosong");

// Render Filter Chips Kategori
function gambarChip() {
    chips.innerHTML = "";
    cats.forEach(c => {
        const btn = document.createElement("button");
        btn.className = `px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${c === aktif ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`;
        btn.type = "button";
        btn.textContent = c;
        btn.onclick = () => { aktif = c; gambarChip(); gambarBaris(); };
        chips.appendChild(btn);
    });
}

// Render Baris Tabel
function gambarBaris() {
    const q = cari.value.trim().toLowerCase();
    const data = items.filter(i => (aktif === "Semua" || i.k === aktif) && i.n.toLowerCase().includes(q));
    isi.innerHTML = "";
    kosong.classList.toggle("hidden", data.length > 0);

    data.forEach(i => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="py-3 px-4 font-bold">${i.n}</td>
            <td class="py-3 px-4 text-xs text-slate-500">${i.k}</td>
            <td class="py-3 px-4 text-right font-mono font-bold">${rp(i.h)}</td>
            <td class="py-3 px-4 text-right font-mono">${i.t}%</td>
            <td class="py-3 px-4 text-center">-</td>
            <td class="py-3 px-4 text-right"><button class="text-xs px-3 py-1 bg-brand-50 text-brand-600 rounded-lg font-bold">Detail</button></td>
        `;
        isi.appendChild(tr);
    });
}

cari.addEventListener("input", gambarBaris);
gambarChip();
gambarBaris();