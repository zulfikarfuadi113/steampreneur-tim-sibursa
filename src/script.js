// Data awal sederhana (Tahap 3)
const items = [
    { id: 1, n: "Buku Fisika Kelas XI", k: "Buku", h: 45000, t: -8 },
    { id: 2, n: "Multimeter Digital Pro", k: "Elektronik", h: 85000, t: 5 },
    { id: 3, n: "Arduino Uno R3 + Jumper", k: "Elektronik", h: 120000, t: 12 },
    { id: 4, n: "Jas Lab Kimia Size M", k: "Alat Praktikum", h: 35000, t: 0 },
    { id: 5, n: "Kalkulator Ilmiah FX-991", k: "Alat Praktikum", h: 70000, t: -3 },
    { id: 6, n: "Buku Matematika Peminatan", k: "Buku", h: 40000, t: -10 },
    { id: 7, n: "Kit Solder 60W + Timah", k: "Elektronik", h: 60000, t: 7 },
    { id: 8, n: "Seragam Pramuka Lengkap", k: "Seragam", h: 90000, t: 2 }
];

const rp = v => "Rp" + v.toLocaleString("id-ID");
const cats = ["Semua", ...new Set(items.map(i => i.k))];
let aktif = "Semua";

const chips = document.getElementById("chips");
const isi = document.getElementById("isi");
const cari = document.getElementById("cari");
const kosong = document.getElementById("kosong");

// Render Filter Chips
function gambarChip() {
    if (!chips) return;
    chips.innerHTML = "";
    cats.forEach(c => {
        const btn = document.createElement("button");
        const isAct = c === aktif;
        btn.className = `px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${isAct ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm" : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"}`;
        btn.type = "button";
        btn.textContent = c;
        btn.onclick = () => { aktif = c; gambarChip(); gambarBaris(); };
        chips.appendChild(btn);
    });
}

// Render Baris Tabel Papan Bursa
function gambarBaris() {
    if (!isi) return;
    const q = cari ? cari.value.trim().toLowerCase() : "";
    const data = items.filter(i => (aktif === "Semua" || i.k === aktif) && i.n.toLowerCase().includes(q));
    isi.innerHTML = "";
    if (kosong) kosong.classList.toggle("hidden", data.length > 0);

    data.forEach(i => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors";
        const isUp = i.t > 0;
        const isDown = i.t < 0;
        const cls = isUp ? "text-emerald-500 font-bold" : isDown ? "text-rose-500 font-bold" : "text-slate-400";
        const tanda = isUp ? `▲ +${i.t}%` : isDown ? `▼ ${i.t}%` : `– 0%`;

        tr.innerHTML = `
      <td class="py-3.5 px-4 sm:px-6"><div class="font-bold text-slate-900 dark:text-white">${i.n}</div></td>
      <td class="py-3.5 px-4 text-xs font-semibold text-slate-500">${i.k}</td>
      <td class="py-3.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">${rp(i.h)}</td>
      <td class="py-3.5 px-4 text-right font-mono text-xs ${cls}">${tanda}</td>
      <td class="py-3.5 px-4 text-center text-xs text-slate-400">-</td>
      <td class="py-3.5 px-4 sm:px-6 text-right">
        <button type="button" class="tawar text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">Tawar & Detail</button>
      </td>
    `;
        tr.querySelector(".tawar").onclick = () => bukaTawar(i);
        isi.appendChild(tr);
    });
}

// ==========================================
// LOGIKA MODAL PENAWARAN & VALIDASI
// ==========================================
const dlg = document.getElementById("dlg");
const dIn = document.getElementById("dlg-input");
const dHarga = document.getElementById("dlg-harga");
const dLog = document.getElementById("dlg-log");
const dErr = document.getElementById("dlg-err");
const dKirim = document.getElementById("dlg-kirim");
const toast = document.getElementById("toast");
let cur = null;
let tm;

function bukaToast(m) {
    if (!toast) return;
    toast.textContent = m;
    toast.classList.remove("opacity-0", "pointer-events-none");
    clearTimeout(tm);
    tm = setTimeout(() => toast.classList.add("opacity-0", "pointer-events-none"), 2600);
}

function catat(teks) {
    if (!dLog) return;
    const li = document.createElement("li");
    li.className = "bg-slate-100 dark:bg-slate-800/70 p-2 rounded-lg text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50";
    li.textContent = teks;
    dLog.prepend(li);
}

function segarkanModal() {
    if (!cur) return;
    if (dHarga) dHarga.textContent = rp(cur.h);
    gambarBaris();
}

function bukaTawar(i) {
    cur = i;
    if (dLog) dLog.innerHTML = "";
    if (dErr) dErr.textContent = "";
    if (dIn) dIn.value = "";
    if (dKirim) dKirim.disabled = false;
    
    const j = document.getElementById("dlg-judul");
    const k = document.getElementById("dlg-kategori");
    if (j) j.textContent = i.n;
    if (k) k.textContent = i.k;
    
    segarkanModal();
    if (dlg) dlg.showModal();
    if (dIn) dIn.focus();
}

// Validasi Form & Kalkulasi Harga Baru
function kirim() {
    if (!dIn) return;
    const v = Math.round(Number(dIn.value));
    
    // Validasi aturan bisnis minimal Rp1.000
    if (!v || v < 1000) {
        if (dErr) dErr.textContent = "Masukkan penawaran minimal Rp1.000.";
        return;
    }
    if (dErr) dErr.textContent = "";
    if (dKirim) dKirim.disabled = true;
    dIn.value = "";

    // Tambah harga
    cur.h += v;

    catat(`[Kamu] Menawar ${rp(v)} -> Harga naik ke ${rp(cur.h)}`);
    segarkanModal();
    bukaToast("Penawaranmu berhasil diajukan!");

    // Simulasi tawaran lawan
    setTimeout(() => {
        const lawan = (Math.floor(Math.random() * 5) + 1) * 5000;
        cur.h += lawan;
        catat(`[Siswa Lain] Menawar ${rp(lawan)} -> Harga menjadi ${rp(cur.h)}`);
        segarkanModal();
        if (dKirim) dKirim.disabled = false;
        dIn.focus();
    }, 1200);
}

if (dKirim) dKirim.onclick = kirim;
if (dIn) dIn.addEventListener("keydown", e => { if (e.key === "Enter") kirim(); });

const dTutup = document.getElementById("dlg-tutup");
if (dTutup) dTutup.onclick = () => dlg.close();
if (dlg) dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
if (cari) cari.addEventListener("input", gambarBaris);

gambarChip();
gambarBaris();