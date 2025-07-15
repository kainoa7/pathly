import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['mixpanel-browser']
  },
  build: {
    commonjsOptions: {
      include: [/mixpanel-browser/, /node_modules/]
    }
  }
})
