import { defineConfig } from 'astro/config';
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

const iconConfig = {
  iconDir: "src/assets/icons"
}

// https://astro.build/config
export default defineConfig({
  site: 'https://bamdadsabet.com',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/assets/styles/main.scss";'
        },
      }
    },
    tsconfig: {
      include: ["@types/index.ts"],
      compilerOptions: {
        types: ["node", "vite", "astro"],
      },
    },
  },
  integrations: [icon(iconConfig), sitemap({
    xslURL: '/sitemap.xsl',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date(),
    filter: page => page !== 'https://bamdadsabet.com/404/',
  })]
});