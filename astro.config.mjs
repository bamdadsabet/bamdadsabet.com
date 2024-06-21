import { defineConfig } from 'astro/config';
import icon from "astro-icon";

const iconConfig = {
  iconDir: "src/assets/icons"
}

// https://astro.build/config
export default defineConfig({
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
  integrations: [icon(iconConfig)]
});