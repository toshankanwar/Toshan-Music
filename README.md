# Toshan Music (Vibes)

A Spotify-style music library UI built with **Next.js (App Router)** + **Tailwind CSS**.  
Includes a dedicated track player page, search + genre filtering, sorting, grid/list views, and a PWA install prompt.

## Features

- **Modern Spotify-like UI**
- **Search** by song title, artist, album
- **Genre filter** (auto-generated from data)
- **Sorting** (title, artist, year)
- **Grid / List** view modes
- **Dedicated music player page**
  - Play/Pause
  - Seek bar
  - Previous/Next track navigation
  - Volume control
- **PWA support**
  - `manifest.webmanifest`
  - Install prompt support on compatible browsers
- **Global footer** component

## Tech Stack

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- PWA Manifest

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Run the dev server
```bash
npm run dev
```

Open:
- http://localhost:3000

## Project Structure (important parts)

```text
app/
  page.js                  # Main library page
  layout.js                # Global layout (footer etc.)
  music/[slug]/            # Track pages (player page)
  components/
    MusicPlayer.js         # Player UI + audio controls
    Footer.js              # Global footer
    PWAInstallPrompt.js    # Install prompt modal
public/
  manifest.webmanifest     # PWA manifest
  icon-192x192.png
  icon-512x512.png
data/
  data.js                  # musicData array
```

## PWA (Install App)

The app includes a manifest and an install prompt component.

Compatible browsers (Chrome/Edge etc.) will show the install prompt when the app is eligible.

Manifest file:
- `public/manifest.webmanifest`

Icons:
- `public/icon-192x192.png`
- `public/icon-512x512.png`

## Customization

### Update app branding
- `public/manifest.webmanifest`
  - `name`, `short_name`, `theme_color`, icons

### Update music content
- `data/data.js`
  - Add/edit tracks in `musicData`
  - Ensure each track has `id`, `title`, `artist`, `album`, `genre`, `year`, `duration`, `slug`, `coverUrl`, `audioUrl`

## Deployment

This app works well on:
- Vercel
- Netlify (with Next.js support)
- Any Node hosting that supports Next.js

For production build:
```bash
npm run build
npm start
```

## License

MIT (or choose your preferred license)

---

Designed & Developed with love by **Toshan Kanwar**  
Website: https://toshankanwar.in