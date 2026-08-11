# Nyala

Aplikasi web video singkat mirip TikTok: kasih **love** dan kirim **koin** ke kreator.

## Fitur

- Feed vertikal full-screen (scroll / swipe)
- Double-tap atau tombol love dengan animasi
- Panel hadiah koin (Mawar, Bintang, Mahkota, Api)
- Dompet penonton (mulai 500 koin, bisa isi ulang)
- Progress love & koin tersimpan di `localStorage`

## Live

- Cloudflare Pages: [https://nyala-7n7.pages.dev/](https://nyala-7n7.pages.dev/)
- GitHub Pages (opsional): [https://abah.github.io/live-give-away/](https://abah.github.io/live-give-away/)

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

## Deploy ke Cloudflare Pages

1. Buat API token di Cloudflare dengan permission **Cloudflare Pages — Edit**
2. Catat **Account ID** (dashboard Cloudflare → Overview sebelah kanan)
3. Simpan sebagai secret repo GitHub:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. Push ke `main` — workflow `.github/workflows/deploy-cloudflare.yml` akan build & publish

Deploy manual:

```bash
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...
npm run deploy:cloudflare
```

## Deploy GitHub Pages (opsional)

```bash
npm run build:pages
```

Push ke `main` juga men-trigger `.github/workflows/deploy-pages.yml`. Di Settings → Pages, set Source ke **GitHub Actions**.

## Stack

- React + TypeScript
- Vite
- Cloudflare Pages (Wrangler)
- GitHub Actions
