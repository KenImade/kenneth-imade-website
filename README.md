# Maintaining Kenneth Imade's Portfolio Site

This is a **plain static website** — no build step, no framework, no server required. It works by opening `.html` files directly or hosting the folder as-is (e.g. on Vercel).

## How it's organized

```
site/
  content.js       ← ALL editable content lives here. Edit this for day-to-day updates.
  render.js        ← Small shared functions that turn content.js data into HTML rows. Rarely needs touching.
  styles.css       ← Shared colors, fonts, spacing as CSS variables. Edit to restyle.
  index.html       ← Homepage (hero, work preview, writing preview, about, contact)
  work.html        ← Full project list
  writing.html     ← Full writing list
  project.html     ← Case study template — reads ?slug= from the URL and looks up the project in content.js
  post.html        ← Writing post template — reads ?slug= from the URL and looks up the post in content.js
```

**The golden rule: 90% of updates only require editing `content.js`.** You should not need to touch the `.html` files or `render.js` for routine changes.

## Common tasks

### Add a new project
Open `content.js`, add an object to the `projects` array:

```js
{
  slug: "my-new-project",       // becomes the URL: project.html?slug=my-new-project
  title: "My New Project",
  blurb: "One or two sentences describing it.",
  tags: ["Go", "Postgres"],
  year: "2026",
  // omit `caseStudy` entirely if there's no write-up yet — it'll link to work.html instead
}
```

It will automatically appear in `work.html`, and in the "Selected work" preview on `index.html` if it's one of the first 3 entries.

### Add a full case study for a project
Add a `caseStudy` object to the project:

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

Once `caseStudy` exists, the project automatically gets a "case study" badge and links to `project.html?slug=your-slug`.

### Add a new writing post
Same pattern in the `posts` array — add `paragraphs` (intro) and/or `sections` (headed sections) to give it a full page at `post.html?slug=your-slug`. Omit them and it just appears in the list linking back to `writing.html`.

### Update bio, socials, skills, or contact copy
All in `content.js` under `profile` — `heroHeadline`, `heroSub`, `aboutParagraphs`, `skills`, `socials` (github/linkedin/email), `contactHeadline`, `contactSub`.

### Change colors or fonts
Edit the CSS variables at the top of `styles.css` (`--color-*`, `--font-*`). Every page reads from the same file.

### Reorder or remove something
Reorder/remove/duplicate array entries in `content.js`. Nothing else needs to change.

## What NOT to do
- Don't hardcode project/post content directly into the `.html` files — it'll drift from `content.js` and break the "single source of truth" setup.
- Don't rename `slug` values for existing projects/posts if they've already been shared/linked externally — it changes the URL.

## Deploying
This is a static site — no build step. To deploy on Vercel:
1. Push this `site/` folder to a GitHub repo (or drag-and-drop it into a new Vercel project).
2. In Vercel, set the project root to the `site/` folder if it's part of a larger repo.
3. No framework preset / build command needed — it's plain HTML/CSS/JS.
4. Every push to the connected branch auto-deploys.
