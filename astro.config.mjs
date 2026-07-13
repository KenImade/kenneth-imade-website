import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://kennethimade.dev",
  trailingSlash: "ignore",
  integrations: [mdx()],
});
