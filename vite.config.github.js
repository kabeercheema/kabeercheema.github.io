import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages specific configuration
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
