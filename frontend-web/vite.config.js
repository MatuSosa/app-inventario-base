import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Esto asegura que el cliente HMR se conecte correctamente
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
})
