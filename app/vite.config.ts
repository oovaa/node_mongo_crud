import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   // Proxy API requests to backend running on localhost:3000
    //   '/api': 'http://143.110.226.0:3232/',
    // },
  },
})
