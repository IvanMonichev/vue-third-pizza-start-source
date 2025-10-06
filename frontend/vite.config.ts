import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const projectRootDir = resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  },
  resolve: {
    alias: {
      '@': resolve(projectRootDir, 'src')
    }
  },
  server: {
    host: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        rewrite: (path) => path.replace(/^\/api/, '')
      },

      '/public': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
