import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
   vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/assets/styles/main.scss";',
        },
      },
    },
  },
  integrations: [tailwind(), react()]
});