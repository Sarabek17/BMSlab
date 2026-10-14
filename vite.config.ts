import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2019',
    assetsInlineLimit: 2048,
    rollupOptions: {
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
