/# Product Requirements Document
## kennethimade.dev — Personal Website

**Version:** 1.0
**Date:** 2026-05-08
**Status:** Draft

---

## 1. Overview

A personal website serving as the central hub for Kenneth's digital presence and primary client acquisition channel. It showcases products built, projects explored, and blog writing — while actively guiding potential clients toward engaging Kenneth for work. The site must communicate craft, taste, and technical competence, and convert visitors into inquiries.

---

## 2. Goals

- **Convert** — move potential clients from "browsing" to "reaching out"
- Present products in terms of business outcomes, not just technical execution
- Document projects (learning-oriented work) without conflating them with shipped products
- Host a blog with maximum creative freedom per post — no rigid templates
- Establish credibility through social proof (testimonials, results, real products)
- Be fast, accessible, and indexed by search engines

---

## 3. Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | **Astro** | Purpose-built for content-heavy static sites; first-class MDX support; excellent performance out of the box |
| Blog authoring | **MDX** | Markdown + JSX — allows full component-level design per post (custom layouts, interactive elements, unique typography per article) |
| Hosting | **Vercel** | Zero-config static deploys, global CDN, preview deployments on PRs |
| Analytics | **Vercel Analytics** | Privacy-friendly, no cookie banner required, native Vercel integration |
| Styling | **Tailwind CSS** | Utility-first; fast iteration on Swiss design grid and typography system |

---

## 4. Design Language

**Style:** Swiss / International Typographic Style

- Strong typographic hierarchy — type does the heavy lifting, ornament is minimal
- Rigid grid system with deliberate whitespace
- Bold use of a limited color palette
- Asymmetric layouts balanced by grid discipline
- **Typeface: Inter** — geometric neo-grotesque, closest free equivalent to Helvetica; used at varying weights to build hierarchy without secondary typefaces

**Color Palette**

| Role | Color |
|---|---|
| Primary accent | Sky blue (`#38BDF8` or similar) |
| Background | Off-white or pure white |
| Text | Near-black (`#111`) |
| Secondary text | Mid-grey |
| Surface / cards | Light grey or white with border |

Dark mode: optional stretch goal, not in v1.

---

## 5. Site Structure

### 5.1 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero + social proof + services + curated previews + CTA |
| `/work-with-me` | Work with me | Services offered, process, and how to engage |
| `/products` | Products | Full list of shipped applications |
| `/products/[slug]` | Product detail | Outcome-led case study per product |
| `/projects` | Projects | Learning-oriented work |
| `/projects/[slug]` | Project detail | Individual project write-up |
| `/blog` | Blog index | All posts, filterable by tag/category |
| `/blog/[slug]` | Blog post | Individual post — each can have a unique layout |
| `/about` | About | Personal write-up + contact information |

### 5.2 Landing Page Sections (in order)

1. **Hero** — strong value proposition (who Kenneth is + what he does for clients), primary CTA ("Work with me")
2. **Social proof** — logos or names of products shipped, and/or 1–2 short testimonials
3. **Services** — brief overview of what Kenneth offers with a link to `/work-with-me`
4. **Featured Products** — 2–3 products framed around outcomes, not stack
5. **Featured Projects** — 2–3 learning projects
6. **Blog** — 3 latest or featured posts
7. **CTA banner** — full-width section: "Have a project in mind? Let's talk." + contact button
8. **About** — short bio excerpt + link to full about page

---

## 6. Section Specifications

### 6.1 Products

Products are real, functioning web applications or tools (e.g. gradconnect.ng).

**List page:**
- Grid or asymmetric layout of product cards
- Each card: product name, short description, tech tags, external link, status (Live / Archived)

**Detail page (outcome-led structure):**
- Problem — what was broken or missing for the user/business
- Outcome — what changed as a result (metrics, user impact, business value)
- Solution — how it was built and why those choices were made
- Tech stack — secondary, listed after the story
- Screenshots / demo link
- Link to live product
- CTA — "Want something like this?" → link to `/work-with-me`

### 6.2 Projects

Projects are explorations — built to learn a concept, not necessarily shipped.

**List page:**
- Similar card layout to products but visually differentiated
- Tags for concept/technology explored (e.g. "WebSockets", "Graph algorithms")

**Detail page:**
- What was the goal
- What was learned
- GitHub link

### 6.3 Blog

Blog posts can be case studies, lessons learned, essays, or tutorials.

**Index page:**
- Post list with title, date, tag(s), reading time, excerpt
- Filter by tag

**Post page:**
- Each `.mdx` file can import custom components, define its own layout, use unique typography, embed interactive elements — **full creative control per post**
- Shared baseline: readable body width, metadata header (date, tags, reading time)
- No enforced template beyond frontmatter schema

**Frontmatter schema (minimum):**
```yaml
title: string
date: YYYY-MM-DD
tags: string[]
description: string         # used for SEO meta and post excerpt
layout: string              # optional, defaults to base blog layout
```

### 6.4 About

- Personal bio (who Kenneth is, what he does, his interests)
- How to reach him (email, social links, GitHub, LinkedIn, etc.)
- No contact form in v1 — direct links only

### 6.5 Work with Me

The primary client conversion page. Answers the three questions every potential client has:

**Can you solve my problem?**
- Clear articulation of services offered (e.g. product design & development, web apps, MVPs, consulting)
- Types of clients or problems Kenneth is a good fit for

**Should I trust you?**
- 2–3 testimonials from past clients or collaborators
- Reference to products and results (links to product detail pages)

**How do I engage?**
- Simple, low-friction process description (e.g. "1. Send a message → 2. Discovery call → 3. Proposal")
- Prominent CTA: email link (mailto)
- Expected response time

### 6.6 Global CTA (sitewide)
- Navigation bar includes a persistent "Work with me" button (sky blue, right-aligned)
- Every content page (product detail, project detail, blog post) ends with a CTA section: "Enjoyed this? Let's build something together." → link to `/work-with-me`

---

## 7. Motion & Feel

The site should feel fast, smooth, and considered — "buttery" without being theatrical. Swiss design restraint applies to motion: every animation must be purposeful.

### 7.1 Page Transitions — Astro View Transitions
- Native browser View Transitions API, enabled via Astro's built-in integration
- Pages cross-fade or slide on navigation — no full page reloads
- Zero extra JavaScript cost

### 7.2 Smooth Scroll — Lenis
- Lenis replaces native scroll with momentum-based easing
- Gives the slow-decelerate feeling characteristic of high-end portfolio sites
- ~2kb, framework-agnostic

### 7.3 Entrance Animations
- Elements animate in on scroll (subtle upward fade — no theatrics)
- Implemented with CSS `@keyframes` + Intersection Observer — no animation library dependency
- Consistent easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`) used across all transitions

### 7.4 Hover Micro-interactions
- Every interactive element (cards, links, nav, buttons) responds on hover
- Implemented via Tailwind transition utilities — no extra library
- Consistent duration and easing across all elements

### 7.5 Font Loading
- Inter is self-hosted, not loaded from Google Fonts CDN
- Preloaded in `<head>` to eliminate flash of unstyled text (FOUT) and layout shift
- `font-display: optional` to prevent any render blocking

### 7.6 Prefetching
- Astro's `prefetch` integration enabled — pages load on link hover
- Navigation feels instant because the next page is fetched before the click

### 7.7 Stack Additions

| Addition | Purpose |
|---|---|
| Astro View Transitions | SPA-like page transitions, native browser API |
| Lenis | Smooth scroll with momentum/easing |
| Self-hosted Inter | Eliminates FOUT and external font requests |
| Astro prefetch | Instant-feeling navigation |

---

## 9. SEO & Performance

- Static HTML output — all pages pre-rendered at build time
- `<title>` and `<meta description>` per page, driven by frontmatter or page config
- Open Graph tags for social sharing (title, description, image)
- Canonical URLs
- Sitemap (`sitemap.xml`) auto-generated
- `robots.txt`
- Target: Lighthouse score ≥ 95 across Performance, Accessibility, SEO

---

## 10. Analytics

- **Vercel Analytics** enabled — page views, top pages, referrers
- No user-level tracking, no cookies required
- No third-party analytics scripts in v1

---

## 9. Content Management

Content lives in the repository as flat files:

```
src/
  content/
    products/       # .mdx files, one per product
    projects/       # .mdx files, one per project
    blog/           # .mdx files, one per post
```

No external CMS. Kenneth authors and publishes by pushing to the repo, triggering a Vercel deploy.

---

## 10. Out of Scope (v1)

- Dark mode
- Comments on blog posts
- Newsletter / email subscription
- Search
- Contact form
- CMS UI
- i18n / localization

---

## 11. Success Criteria

- All four sections live and populated with at least one piece of content each
- Blog system supports per-post custom layouts and components via MDX
- Lighthouse scores ≥ 95 on Performance, Accessibility, SEO
- Deployed to Vercel with a custom domain
- Page load < 1s on fast 3G for landing page
