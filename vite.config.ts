import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // never inline assets as data URIs - real files only
    sourcemap: false,
  },
  server: {
    port: 5173,
    host: true, // expose on LAN so real mobile devices can be tested
  },
})
