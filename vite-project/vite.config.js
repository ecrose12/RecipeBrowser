import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import daisyui from 'daisyui'

export default defineConfig({
  base: '/RecipeBrowser/',
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {
      plugins: [daisyui]
    }
  }
})
