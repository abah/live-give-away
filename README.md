# Nyala

Aplikasi web video singkat mirip TikTok: kasih **love** dan kirim **koin** ke kreator.

## Fitur

- Feed vertikal full-screen (scroll / swipe)
- Double-tap atau tombol love dengan animasi
- Panel hadiah koin (Mawar, Bintang, Mahkota, Api)
- Dompet penonton (mulai 500 koin, bisa isi ulang)
- Progress love & koin tersimpan di `localStorage`

## Live

Setelah GitHub Pages aktif: [https://abah.github.io/live-give-away/](https://abah.github.io/live-give-away/)

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

Build khusus GitHub Pages:

```bash
npm run build:pages
```

## Deploy

Push ke `main` akan men-trigger workflow **Deploy to GitHub Pages** (`.github/workflows/deploy-pages.yml`).

Di repo Settings → Pages, set Source ke **GitHub Actions**.

## Stack

- React + TypeScript
- Vite
- CSS modern (tanpa framework UI)
- GitHub Pages + Actions
