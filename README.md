# Lohan Moraes

[www.lohanmoraes.com](https://www.lohanmoraes.com)

Portfolio de Lohan Moraes e LMart (LM Produções Artísticas): shows, aulas e produção.

## Stack

- React 19 + TypeScript
- Vite+ (`vp` dev/build/lint)
- TanStack Router
- Tailwind CSS v4 + Tailwind Variants
- Lenis + GSAP ScrollTrigger
- Bun

## Getting started

```bash
bun install
bun run dev
```

## Customize

- **Content:** [`src/data/portfolio.ts`](src/data/portfolio.ts)
- **Theme:** [`src/index.css`](src/index.css), palette from stage photo (`#E022B7` accent)
- **Photos:** [`public/photos/`](public/photos/)
- **Assets:** `bun run assets` (favicon, OG, photo compression)

## Structure

```
src/
  data/portfolio.ts
  lib/navigation.logic.ts, lenis.ts, motion.ts
  hooks/use-reveal.ts
  providers/scroll-provider.tsx
  components/
    hero-section/     index, view, hook, content
    about-section/
    shows-section/
    teaching-section/
    contact-section/
    site-header/
    site-footer/
    show-card/
    split-heading/
  routes/
```

## Scripts

```bash
bun run dev
bun run build
bun run validate
bun run assets
bun run fallow
```

## Deploy

GitHub Actions → GitHub Pages. Docker: `docker build -t lohan-moraes-portfolio .`
