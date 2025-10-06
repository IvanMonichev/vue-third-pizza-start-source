import router from '@/router'
import { useAuthStore } from '@/store/auth.store'
import axios from 'axios'
import { tokenManager } from '../token-manager'

const BASE_URL = 'http://localhost:3000'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json'
  }
})
httpClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.get()
    if (!token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`API Error:`, error.response?.data || error.message)

    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.clearAuth()
      router.push('/login')
    }

    return Promise.reject(error)
  }
)
