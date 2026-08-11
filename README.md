# Nyala

Aplikasi web video singkat mirip TikTok: kasih **love** dan kirim **koin** ke kreator.

## Fitur

- Feed vertikal full-screen (scroll / swipe)
- Double-tap atau tombol love dengan animasi
- Panel hadiah koin (Mawar, Bintang, Mahkota, Api)
- Dompet penonton (mulai 500 koin, bisa isi ulang)
- Progress love & koin tersimpan di `localStorage`

## Menjalankan

```bash
npm install
npm run dev
```

Buka URL yang muncul di terminal (biasanya `http://localhost:5173`).

```bash
npm run build
npm run preview
```

## Stack

- React + TypeScript
- Vite
- CSS modern (tanpa framework UI)
