import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v1': `http://localhost:${process.env.PORT}`,
    },
  },
  plugins: [react()],
});
