// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      open: true,
    },
  },

  output: "server",
  adapter: vercel(),
  site: 'https://www.errerecubrimientos.com',
  integrations: [sitemap()],
});