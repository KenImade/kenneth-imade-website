# Maintaining Kenneth Imade's Portfolio Site

This site is built with **[Astro](https://astro.build)**. Everything is rendered to plain static HTML at build time — no JavaScript ships to the browser. Content still lives in three plain data files, so day-to-day updates work exactly like they did in the old plain-HTML version.

You'll need **Node.js 18.17+** installed. First-time setup:

```
npm install
```

## How it's organized

```
src/
  data/
    profile.js       ← Bio, hero, skills, socials, contact copy.   ← edit for content
    projects.js      ← All projects and their case studies.        ← edit for content
  content/
    posts/           ← One .mdx file per writing post.             ← edit for content
  content.config.ts  ← Schema for post frontmatter (title, date, etc.)
  pages/
    index.astro      ← Homepage (hero, work preview, writing preview, about, contact)
    work.astro       ← Full project list
    writing.astro    ← Full writing list
    projects/[slug].astro  ← Case study template — one page is built per project with a caseStudy
    posts/[slug].astro     ← Writing post template — one page is built per post with body content
  components/
    Nav.astro        ← Site navigation (full nav + "back to" variant)
    ProjectRow.astro ← One project entry in a list
    PostRow.astro    ← One writing entry in a list
    ImageFigure.astro← Post image (or labeled placeholder box)
  layouts/
    BaseLayout.astro ← Shared <head>: fonts, title, global styles
  styles/
    global.css       ← Shared colors, fonts, spacing as CSS variables. Edit to restyle.
public/
  images/            ← Image files referenced by posts
```

**The golden rule is unchanged: 90% of updates only require editing content files.** For routine changes you shouldn't need to touch pages, components, or layouts.

Which file for what:

- Bio / hero / skills / socials / contact → `src/data/profile.js`
- Projects and case studies → `src/data/projects.js`
- Writing posts → one `.mdx` file each in `src/content/posts/`

## What changed from the old plain-HTML version

- **URLs**: `project.html?slug=my-project` is now `/projects/my-project`, and `post.html?slug=my-post` is now `/posts/my-post`. List pages are `/work` and `/writing`. If old query-param URLs have been shared externally, add redirects on your host (see [Redirecting old URLs](#redirecting-old-urls-optional)).
- **Pages are pre-built**: content is baked into HTML at build time instead of rendered by JavaScript in the browser. Faster loads, works without JS, better for SEO/link previews.
- **Posts are MDX files**: instead of arrays of paragraph strings in `posts.js`, each post is a Markdown file with frontmatter in `src/content/posts/`. The body is normal prose — `## Heading` instead of `sections: [{ heading, paragraphs }]`. Posts are sorted newest-first by the `date` in frontmatter.
- **`render.js` became components**: `renderProjectRow` → `ProjectRow.astro`, `renderPostRow` → `PostRow.astro`, `renderImage` → `ImageFigure.astro`. `content.js` is gone — pages import the data files directly.
- **Image paths in `posts.js` are now absolute**: `"/images/foo.png"` instead of `"images/foo.png"`, and the files live in `public/images/`.
- A "not found" slug now just returns your host's normal 404 page instead of the custom in-page message — no page is built for slugs that don't exist.

## Common tasks

### Add a new project

Open `src/data/projects.js` and add an object to the `projects` array (inside the `[ ... ]`):

```js
{
  slug: "my-new-project",       // becomes the URL: /projects/my-new-project
  title: "My New Project",
  blurb: "One or two sentences describing it.",
  tags: ["Go", "Postgres"],
  year: "2026",
  liveUrl: "https://my-project.com",   // omit or leave "" to hide the "Live" link
  repoUrl: "https://github.com/you/my-project", // omit or leave "" to hide the "GitHub" link
  // omit `caseStudy` entirely if there's no write-up yet — it'll link to /work instead
}
```

It will automatically appear on `/work`, and in the "Selected work" preview on the homepage if it's one of the first 3 entries.

### Add a full case study for a project

Add a `caseStudy` object to the project (still in `src/data/projects.js`):

```js
caseStudy: {
  readTime: "5 min read",
  headline: "A punchier headline for the detail page",
  subhead: "One sentence sub-headline.",
  stats: [
    { value: "6h → 6min", label: "processing latency" },
  ],
  sections: [
    { heading: "The problem", paragraphs: ["...", "..."] },
    { heading: "What changed", paragraphs: ["..."] },
  ],
}
```

Once `caseStudy` exists, the project automatically gets a "case study" badge and a page at `/projects/your-slug`.

### Add a new writing post

Create a new `.mdx` file in `src/content/posts/`. The **filename becomes the URL**: `my-new-post.mdx` → `/posts/my-new-post`. It automatically appears on `/writing` and in the homepage preview (sorted newest-first by `date`).

```mdx
---
title: "My New Post"
blurb: "One line shown in the list."
date: 2026-08-01
readTime: "4 min read"            # optional
subhead: "Optional longer line shown under the title on the post page."
image:                            # optional hero image under the header
  src: "/images/my-diagram.png"
  alt: "What the image shows"
  caption: "Optional caption"
draft: true                       # optional — hides the post everywhere until you remove it
---

Intro paragraph, written as normal prose.

## First section heading

More prose. Markdown works: **bold**, `inline code`, [links](https://example.com),
lists, blockquotes, and fenced code blocks are all styled to match the site.
```

The frontmatter is validated at build time by `src/content.config.ts` — a typo'd or missing field fails the build with a pointed error instead of rendering a broken page.

### Add images to a post

For the hero image under the header, use the `image` frontmatter field shown above. Leave `src` off (or `""`) and it renders a labeled placeholder box instead — handy for laying out a post before you have the final image.

For images in the body, use normal Markdown wherever you want one:

```md
![Retry flow diagram](/images/retry-diagram.png)
```

Either way, put the actual file in `public/images/` and reference it with a **leading slash** (`/images/retry-diagram.png`).

### Update bio, socials, skills, or contact copy

All in `src/data/profile.js` under the `profile` object — `heroHeadline`, `heroSub`, `aboutParagraphs`, `skills`, `socials` (github/linkedin/email), `contactHeadline`, `contactSub`.

### Change colors or fonts

Edit the CSS variables at the top of `src/styles/global.css` (`--color-*`, `--font-*`). Every page reads from the same file.

### Reorder or remove something

Reorder/remove/duplicate array entries in the relevant data file. Nothing else needs to change.

## Previewing locally

```
npm run dev
```

Then open `http://localhost:4321`. The dev server hot-reloads — edit a data file and the page updates instantly. (No more `python3 -m http.server`; Astro's dev server handles everything, including the module loading that used to require serving over `http://`.)

To check the exact production output:

```
npm run build      # writes static HTML to dist/
npm run preview    # serves dist/ locally
```

## What NOT to do

- Don't hardcode project/post content directly into the `.astro` pages — it'll drift from the data files and break the "single source of truth" setup.
- Don't rename `slug` values for existing projects/posts if they've already been shared/linked externally — it changes the URL.
- Don't remove the `export` line at the top of `profile.js` / `projects.js` — the pages import them by name.
- Don't rename a post's `.mdx` file after it's been shared — the filename is the URL.
- Don't put images in `src/` expecting them to be served at `/images/...` — files served as-is belong in `public/`.

## Deploying

Vercel (and Netlify, Cloudflare Pages, etc.) auto-detect Astro:

1. Push this repo to GitHub and import it into Vercel.
2. Vercel picks the Astro preset automatically — build command `npm run build` (or `astro build`), output directory `dist`.
3. Every push to the connected branch auto-deploys.

### Redirecting old URLs (optional)

If the old `project.html?slug=...` / `post.html?slug=...` URLs are out in the wild, on Vercel you can map the important ones in a `vercel.json` at the repo root:

```json
{
  "redirects": [
    { "source": "/work.html", "destination": "/work", "permanent": true },
    { "source": "/writing.html", "destination": "/writing", "permanent": true },
    {
      "source": "/post.html",
      "has": [{ "type": "query", "key": "slug", "value": "shortening-the-web" }],
      "destination": "/posts/shortening-the-web",
      "permanent": true
    }
  ]
}
```

(Add one entry per shared slug — query-string matching has to be listed explicitly.)
