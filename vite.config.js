import * as url from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const hash = Math.floor(Math.random() * 90000) + 10000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name]` + hash + `.js`,
        chunkFileNames: `[name]` + hash + `.js`,
        assetFileNames: `[name]` + hash + `.[ext]`,
      },
    },
  },
  resolve: {
    alias: {
      "@": url.fileURLToPath(new url.URL("./src", import.meta.url)),
    },
  },
});
