# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Minimal dashboard-style blog for Kenneth Imade — software engineer specialising in backend systems and data engineering. Two sections: Writing and Built. No CTAs, no about page.

## Stack

- **Framework:** Astro (static output, deployed to Vercel)
- **Content:** MDX — full creative control per post
- **Styling:** Tailwind CSS + custom CSS (dashboard layout in global.css)
- **Analytics:** Vercel Analytics
- **Smooth scroll:** Lenis
- **Page transitions:** Astro ClientRouter

## Commands

```bash
npm run dev       # local dev server
npm run build     # production build
npm run preview   # preview production build
```

## Architecture

### Layout

Dashboard grid: fixed 200px sidebar (left) + scrollable content panel (right). Both defined in `src/layouts/BaseLayout.astro`. The sidebar contains the name, nav, and year. Everything else is in `<slot />`.

### Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/index.astro` | Intro + recent posts |
| `/writing` | `src/pages/writing/index.astro` | All blog posts, grouped by year |
| `/writing/[slug]` | `src/pages/writing/[slug].astro` | Post detail with reading progress bar |
| `/built` | `src/pages/built/index.astro` | Products + projects merged into one list |

### Content Collections

Defined in `src/content.config.ts`. Content lives in `src/content/`:

- `products/` — shipped applications (MDX). Key fields: `title`, `description`, `date`, `status`, `url`, `tags`, `color`, `thumbnail`, `problem`, `outcome`
- `projects/` — learning projects (MDX). Key fields: `title`, `description`, `date`, `tags`, `githubUrl`, `goal`, `learned`
- `blog/` — writing (MDX). Key fields: `title`, `description`, `date`, `tags`

### Key design decisions

- **No color, no decoration** — near-black text, white background, sky blue (#38bdf8) only for active nav link and link hovers
- **14px base font** — small and dense, like a dashboard
- **Built page merges products and projects** — queried separately, sorted by date, rendered as one flat list. Both products and projects link out externally (products via `url`, projects via `githubUrl`).
- **No removed components** — Marquee, CtaBanner, Cursor, old Nav, Footer, ContentLayout, BlogLayout are all deleted. Do not re-add them.
