import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works on GitHub Pages project URLs
// (https://<user>.github.io/TrentonRose_Portfolio/) and on a custom domain.
export default defineConfig({
  base: './',
  plugins: [react()],
  // Listen on IPv4 loopback explicitly. By default Vite binds "localhost" to ::1 (IPv6) only,
  // which fails with ERR_CONNECTION_REFUSED on machines where IPv6 loopback is blocked.
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
