// Toggle Theme
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        setTimeout(gambarCandlestick, 50);
    });
}

// ==========================================
// 1. DATA AWAL (DEFAULT)
// ==========================================
const defaultItems = [
    { id: 1, n: "Buku Fisika Kelas XI", k: "Buku", h: 45000, t: -8, candles: [{ o: 48000, h: 50000, l: 44000, c: 47000 }, { o: 47000, h: 49000, l: 45000, c: 48500 }, { o: 48500, h: 48500, l: 43000, c: 44000 }, { o: 44000, h: 46000, l: 42000, c: 45000 }] },
    { id: 2, n: "Multimeter Digital Pro", k: "Elektronik", h: 85000, t: 5, candles: [{ o: 78000, h: 82000, l: 75000, c: 80000 }, { o: 80000, h: 84000, l: 79000, c: 81000 }, { o: 81000, h: 86000, l: 80000, c: 83000 }, { o: 83000, h: 88000, l: 82000, c: 85000 }] },
    { id: 3, n: "Arduino Uno R3 + Jumper", k: "Elektronik", h: 120000, t: 12, candles: [{ o: 100000, h: 108000, l: 98000, c: 105000 }, { o: 105000, h: 112000, l: 104000, c: 110000 }, { o: 110000, h: 118000, l: 109000, c: 115000 }, { o: 115000, h: 125000, l: 114000, c: 120000 }] },
    { id: 4, n: "Jas Lab Kimia Size M", k: "Alat Praktikum", h: 35000, t: 0, candles: [{ o: 35000, h: 38000, l: 33000, c: 36000 }, { o: 36000, h: 37000, l: 34000, c: 34500 }, { o: 34500, h: 36000, l: 34000, c: 35000 }, { o: 35000, h: 37000, l: 34000, c: 35000 }] },
    { id: 5, n: "Kalkulator Ilmiah FX-991", k: "Alat Praktikum", h: 70000, t: -3, candles: [{ o: 75000, h: 78000, l: 72000, c: 74000 }, { o: 74000, h: 76000, l: 71000, c: 72000 }, { o: 72000, h: 74000, l: 69000, c: 71000 }, { o: 71000, h: 73000, l: 68000, c: 70000 }] },
    { id: 6, n: "Buku Matematika Peminatan", k: "Buku", h: 40000, t: -10, candles: [{ o: 46000, h: 47000, l: 43000, c: 44000 }, { o: 44000, h: 45000, l: 41000, c: 42000 }, { o: 42000, h: 43000, l: 39000, c: 41000 }, { o: 41000, h: 42000, l: 38000, c: 40000 }] },
    { id: 7, n: "Kit Solder 60W + Timah", k: "Elektronik", h: 60000, t: 7, candles: [{ o: 54000, h: 57000, l: 52000, c: 55000 }, { o: 55000, h: 58000, l: 54000, c: 57000 }, { o: 57000, h: 59000, l: 55000, c: 56000 }, { o: 56000, h: 62000, l: 56000, c: 60000 }] },
    { id: 8, n: "Seragam Pramuka Lengkap", k: "Seragam", h: 90000, t: 2, candles: [{ o: 86000, h: 89000, l: 85000, c: 88000 }, { o: 88000, h: 90000, l: 86000, c: 87000 }, { o: 87000, h: 91000, l: 87000, c: 89000 }, { o: 89000, h: 92000, l: 88000, c: 90000 }] }
];

// ==========================================
// 2. CEK LOCAL STORAGE 
// ==========================================
let items = JSON.parse(localStorage.getItem('dataBursa'));

if (!items) {
    items = defaultItems;
    items.forEach(i => i.h0 = i.h);
    localStorage.setItem('dataBursa', JSON.stringify(items));
}

// Reset Data
function resetDataBursa() {
    if (confirm("Yakin ingin menghapus semua data transaksi dan kembali ke awal?")) {
        localStorage.removeItem('dataBursa');
        location.reload();
    }
}

// Helper
const tren = i => i.t + Math.round((i.h - (i.h0 || i.h)) / (i.h0 || i.h) * 100);
const rp = v => "Rp" + v.toLocaleString("id-ID");
const cats = ["Semua", ...new Set(items.map(i => i.k))];
let aktif = "Semua";

const chips = document.getElementById("chips");
const isi = document.getElementById("isi");
const cari = document.getElementById("cari");
const kosong = document.getElementById("kosong");
const toast = document.getElementById("toast");
let tm;

function bukaToast(m) {
    if (!toast) return;
    toast.textContent = m;
    toast.classList.remove("opacity-0", "pointer-events-none");
    clearTimeout(tm);
    tm = setTimeout(() => toast.classList.add("opacity-0", "pointer-events-none"), 2600);
}

// Render Filter Category
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

// Mini Sparkline
function drawMiniCandle(canvas, candles) {
    if (!canvas || !candles) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || 80;
    const h = canvas.clientHeight || 28;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    let minP = Infinity, maxP = -Infinity;
    candles.forEach(c => { minP = Math.min(minP, c.l); maxP = Math.max(maxP, c.h); });
    const pad = (maxP - minP) * 0.1 || 1000;
    minP -= pad; maxP += pad;

    const gap = w / candles.length;
    const candleW = Math.max(4, gap * 0.5);

    candles.forEach((c, idx) => {
        const x = idx * gap + gap / 2;
        const yHigh = h - ((c.h - minP) / (maxP - minP)) * h;
        const yLow = h - ((c.l - minP) / (maxP - minP)) * h;
        const yOpen = h - ((c.o - minP) / (maxP - minP)) * h;
        const yClose = h - ((c.c - minP) / (maxP - minP)) * h;
        const isBull = c.c >= c.o;
        const color = isBull ? '#10b981' : '#f43f5e';

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, yHigh);
        ctx.lineTo(x, yLow);
        ctx.stroke();

        ctx.fillStyle = color;
        const topY = Math.min(yOpen, yClose);
        const bodyH = Math.max(2, Math.abs(yClose - yOpen));
        ctx.fillRect(x - candleW / 2, topY, candleW, bodyH);
    });
}

// Render Tabel
function gambarBaris() {
    if (!isi) return;
    const q = cari ? cari.value.trim().toLowerCase() : "";
    const data = items.filter(i => (aktif === "Semua" || i.k === aktif) && i.n.toLowerCase().includes(q));
    isi.innerHTML = "";
    if (kosong) kosong.classList.toggle("hidden", data.length > 0);

    data.forEach(i => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors";
        const t = tren(i);
        const isUp = t > 0;
        const isDown = t < 0;
        const cls = isUp ? "text-emerald-500 font-bold" : isDown ? "text-rose-500 font-bold" : "text-slate-400";
        const tanda = isUp ? `▲ +${t}%` : isDown ? `▼ ${t}%` : `– 0%`;

        tr.innerHTML = `
      <td class="py-3.5 px-4 sm:px-6"><div class="font-bold text-slate-900 dark:text-white">${i.n}</div></td>
      <td class="py-3.5 px-4 text-xs font-semibold text-slate-500">${i.k}</td>
      <td class="py-3.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">${rp(i.h)}</td>
      <td class="py-3.5 px-4 text-right font-mono text-xs ${cls}">${tanda}</td>
      <td class="py-3.5 px-4 text-center"><canvas class="mini-candle inline-block w-20 h-7" data-id="${i.id}"></canvas></td>
      <td class="py-3.5 px-4 sm:px-6 text-right">
        <button type="button" class="tawar text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">Tawar & Detail</button>
      </td>
    `;
        tr.querySelector(".tawar").onclick = () => bukaTawar(i);
        isi.appendChild(tr);

        setTimeout(() => {
            const cnv = tr.querySelector(`.mini-candle`);
            if (cnv) drawMiniCandle(cnv, i.candles);
        }, 0);
    });
}

// Modal Logic
const dlg = document.getElementById("dlg");
const dIn = document.getElementById("dlg-input");
const dHarga = document.getElementById("dlg-harga");
const dVol = document.getElementById("dlg-vol");
const dLog = document.getElementById("dlg-log");
const dErr = document.getElementById("dlg-err");
const dKirim = document.getElementById("dlg-kirim");
let cur = null;

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
    if (dVol) dVol.textContent = (cur.candles ? cur.candles.length : 1) + "x Transaksi";
    gambarCandlestick();
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
    setTimeout(gambarCandlestick, 100);
    if (dIn) dIn.focus();
}

// Candlestick Chart Utama
function gambarCandlestick() {
    const canvas = document.getElementById("candleCanvas");
    if (!canvas || !cur || !cur.candles) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const candles = cur.candles;
    if (candles.length === 0) return;

    let minP = Math.min(...candles.map(c => c.l));
    let maxP = Math.max(...candles.map(c => c.h));
    const padding = (maxP - minP) * 0.15 || 2000;
    minP -= padding; maxP += padding;

    ctx.strokeStyle = '#334155';
    ctx.fillStyle = '#64748b';
    ctx.font = '10px monospace';
    const gridSteps = 4;
    for (let g = 0; g <= gridSteps; g++) {
        const y = (h / gridSteps) * g;
        const priceVal = maxP - ((maxP - minP) / gridSteps) * g;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
        ctx.fillText(rp(Math.round(priceVal)), 8, y > h - 10 ? y - 5 : y + 12);
    }

    const gap = w / candles.length;
    const candleWidth = Math.min(28, gap * 0.55);

    candles.forEach((c, idx) => {
        const x = idx * gap + gap / 2;
        const yHigh = h - ((c.h - minP) / (maxP - minP)) * h;
        const yLow = h - ((c.l - minP) / (maxP - minP)) * h;
        const yOpen = h - ((c.o - minP) / (maxP - minP)) * h;
        const yClose = h - ((c.c - minP) / (maxP - minP)) * h;
        const isBull = c.c >= c.o;
        const color = isBull ? '#10b981' : '#f43f5e';

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, yHigh);
        ctx.lineTo(x, yLow);
        ctx.stroke();

        ctx.fillStyle = color;
        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(3, Math.abs(yClose - yOpen));
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText("T" + (idx + 1), x - 6, h - 6);
    });
}

// Simpan Perubahan & Validasi
function kirim() {
    if (!dIn) return;
    const v = Math.round(Number(dIn.value));
    if (!v || v < 1000) {
        if (dErr) dErr.textContent = "Masukkan penawaran minimal Rp1.000.";
        return;
    }
    if (dErr) dErr.textContent = "";
    if (dKirim) dKirim.disabled = true;
    dIn.value = "";

    const oldPrice = cur.h;
    cur.h += v;

    cur.candles.push({
        o: oldPrice,
        h: Math.max(oldPrice, cur.h) + Math.round(v * 0.2),
        l: oldPrice,
        c: cur.h
    });

    localStorage.setItem('dataBursa', JSON.stringify(items));

    catat(`[Kamu] Menawar ${rp(v)} -> Harga naik ke ${rp(cur.h)}`);
    segarkanModal();
    bukaToast("Penawaranmu berhasil diajukan!");

    setTimeout(() => {
        const lawan = (Math.floor(Math.random() * 5) + 1) * 5000;
        const prevP = cur.h;
        cur.h += lawan;

        cur.candles.push({
            o: prevP,
            h: cur.h + 2000,
            l: prevP - 1000,
            c: cur.h
        });

        localStorage.setItem('dataBursa', JSON.stringify(items));

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

window.addEventListener("resize", () => {
    gambarBaris();
    gambarCandlestick();
});

// Fungsi Ekspor Data Bursa ke File CSV
function eksporCSV() {
    if (!items || items.length === 0) {
        alert("Tidak ada data barang untuk diekspor.");
        return;
    }

    // Header kolom CSV
    let csvContent = "ID,Nama Barang,Kategori,Harga Saat Ini (Rp),Jumlah Penawaran\n";

    // Baris data barang
    items.forEach((item) => {
        const nama = `"${item.n}"`;
        const kategori = `"${item.k}"`;
        const jumlahPenawaran = item.c ? item.c.length : 0;
        csvContent += `${item.id},${nama},${kategori},${item.h},${jumlahPenawaran}\n`;
    });

    // Buat file Blob dan picu unduhan di browser
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", "data-bursa-sibursa.csv");
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initial Render
gambarChip();
gambarBaris();