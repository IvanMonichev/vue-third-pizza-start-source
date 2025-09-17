import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

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
        target: 'http://backend:3000/',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
