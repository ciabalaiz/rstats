import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/rstats/',    // ← your GitHub Pages path
  plugins: [react()],
});