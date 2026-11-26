import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/',
  plugins: [react()],
  preview: {
    port: 3000,
    strictPort: true,
  },
  server: {
    proxy: {
      '/api': {
        target: `http://${process.env.BACKEND_UPSTREAM ?? 'backend:8000'}`,
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true,
    },
    port: 3004,
    strictPort: true,
    host: true,
    allowedHosts: ['buzin-solutions-dev', 'dev.buzin.henriquebuz.in'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/test/**', 'src/vite-env.d.ts'],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
