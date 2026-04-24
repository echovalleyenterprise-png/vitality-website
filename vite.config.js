import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      // Proxy /api/public to CRM server in development
      '/api': {
        target: 'https://vitality-crm-production.up.railway.app',
        changeOrigin: true,
      },
    },
  },
});
