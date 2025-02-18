import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: '0.0.0.0',  // Required for Render
    port: process.env.PORT || 5173, // Use Render's assigned port or fallback to 5173
    strictPort: true,
    allowedHosts: ['mern-todo-project-bna7.onrender.com'],  // Allow your Render domain
  },
  preview: {
    port: process.env.PORT || 5173,
    host: '0.0.0.0',
    allowedHosts: ['mern-todo-project-bna7.onrender.com'],
  },

})