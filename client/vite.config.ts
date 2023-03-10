import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import svgr from 'vite-plugin-svgr';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __PORT__: process.env.PORT,
  },
  server: {
    proxy: {
      '/api/v1': `http://localhost:${process.env.PORT}`,
    },
  },
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        icon: true,
      },
    }),
  ],
});
