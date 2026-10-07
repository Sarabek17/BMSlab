import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const page = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  build: {
    target: 'es2019',
    assetsInlineLimit: 2048,
    rollupOptions: {
      // Ko'p sahifali build: `/` — Digital Twin landing, `/outsourcing/` — IT autsorsing sahifasi
      input: {
        main: page('./index.html'),
        outsourcing: page('./outsourcing/index.html'),
      },
      output: {
        // Kutubxonalar alohida chunk'da — ular kamdan-kam o'zgaradi,
        // shuning uchun brauzer keshida uzoq turadi
        manualChunks(id: string) {
          if (id.includes('node_modules')) return 'vendor';
          return undefined;
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});
