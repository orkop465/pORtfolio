import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'three',
      '@react-three/fiber',
      'framer-motion',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three', '@react-three/fiber'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    // WSL2 / Docker / network drives: native FS events often miss; fall back to polling.
    watch: { usePolling: true, interval: 200 },
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
});
