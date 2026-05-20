import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    status: z.enum(['live', 'archived']),
    url: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    ogImage: z.string().optional(),
    color: z.string().default('#38bdf8'), // primary color for theming
    thumbnail: z.string().optional(),    // path to screenshot, e.g. /images/products/gradconnect.png
    problem: z.string().optional(),
    outcome: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    githubUrl: z.string().url().optional(),
    ogImage: z.string().optional(),
    goal: z.string().optional(),
    learned: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    layout: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { products, projects, blog };
