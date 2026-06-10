# Lohan Moraes

**Cantor & Professor — a portfolio that feels like a live show.**

🎤 [www.lohanmoraes.com](https://www.lohanmoraes.com)

This is the home of **Lohan Moraes** and **LMart** (LM Produções Artísticas): shows for events, instrument lessons, and music production. The site is built to match the energy on stage — dark venue lighting, magenta accents, smooth scroll, and a 3D backdrop that moves with you as you explore.

> *"Role para entrar no show."* — that's the vibe. Scroll in.

---

## What you'll find

| Section | What's there |
|---------|--------------|
| **Hero** | First impression + WhatsApp CTA |
| **Sobre** | Bio, photos, the full story |
| **Shows** | Packages from acústico to banda premium |
| **Ensino** | Violão, viola, bateria, guitarra, teclado, teoria |
| **Contato** | WhatsApp, Instagram, phone, `contato@lohanmoraes.com` |

---

## The fun part (for devs)

Most portfolios are a stack of cards on a white background. This one tries to feel like you're *in* the venue:

- **Stage canvas** — React Three Fiber scene with spotlights, particles, and a camera that keyframes to each section as you scroll. Lazy-loaded so content paints first; falls back to a static CSS backdrop when WebGL isn't available or `prefers-reduced-motion` is on.
- **Grain overlay** — subtle film grain on top. Pure CSS, zero runtime cost.
- **Marquee strips** — *Shows ao vivo · Aulas de instrumentos · Produção musical · LMart* scrolling between sections.
- **Motion** — Lenis smooth scroll + GSAP ScrollTrigger for reveals and section transitions.

---

## Stack

React 19 · TypeScript · Vite+ (`vp`) · TanStack Router · Tailwind CSS v4 · Tailwind Variants · Lenis · GSAP · React Three Fiber · Three.js · Bun

---

## Quick start

```bash
bun install
bun run dev
```

Open the dev server and scroll — the stage canvas is best experienced in motion.

---

## Customize

Everything content-related lives in one place:

| What | Where |
|------|-------|
| Copy, shows, contact info | [`src/data/portfolio.ts`](src/data/portfolio.ts) |
| Colors, fonts, stage tokens | [`src/index.css`](src/index.css) |
| Photos | [`public/photos/`](public/photos/) |
| Favicon & OG image | `bun run assets:brand` |

Accent color `#E022B7` is pulled from the stage photography — keep that in mind when tweaking the palette.

---

## Project layout

```
src/
  data/portfolio.ts          ← start here for content changes
  lib/                       navigation, lenis, motion helpers
  hooks/use-reveal.ts
  providers/scroll-provider.tsx
  components/
    stage-canvas/            3D backdrop (lazy, WebGL + fallback)
    grain-overlay/
    marquee-strip/
    hero-section/
    about-section/
    shows-section/
    teaching-section/
    contact-section/
    site-header/ · site-footer/
    show-card/ · split-heading/
  routes/
```

Each component follows the same pattern: `index.tsx` (entry) · `*.view.tsx` (UI) · `use-*.ts` (logic) · `*.content.ts` (strings).

---

## Scripts

```bash
bun run dev                 # local dev server
bun run build               # production build
bun run validate            # fmt + lint + test — runs in CI
bun run assets              # favicon, OG image + photo compression
bun run assets:brand        # favicon & OG only
bun run assets:photos       # compress public/photos
bun run fallow              # codebase health check
```

---

## Deploy

Push to `main` → GitHub Actions validates, builds, and ships to **GitHub Pages**.

```bash
docker build -t lohan-moraes-portfolio .   # includes asset generation + build
```

---

*Built with care for someone who lives on stage.*
