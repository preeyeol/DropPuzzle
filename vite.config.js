import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
   server: {
    host: 'localhost',     // or '0.0.0.0' to expose on local network
    port: 3000,            // change this to whatever port you want
    open: true,            // opens browser automatically
  }
})