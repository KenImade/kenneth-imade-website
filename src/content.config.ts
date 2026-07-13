import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Writing posts live as .mdx files in src/content/posts/.
// The filename (minus .mdx) becomes the slug: /posts/<filename>
const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    blurb: z.string(), // shown in list rows
    date: z.coerce.date(), // used for sorting; displayed as "July 2026"
    readTime: z.string().optional(),
    subhead: z.string().optional(), // shown under the title on the post page (falls back to blurb)
    image: z
      .object({
        src: z.string().optional(), // omit or "" → labeled placeholder box
        alt: z.string().optional(),
        caption: z.string().optional(),
      })
      .optional(),
    draft: z.boolean().default(false), // true → hidden from lists, no page built
  }),
});

export const collections = { posts };
