import { useAuthStore } from '@/store/auth.store'
import axios from 'axios'
import { tokenManager } from '../token-manager'

const API_TAG = '/api'

export const httpClient = axios.create({
  baseURL: API_TAG,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json'
  }
})
httpClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.get()
    if (token) {
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
    }

    return Promise.reject(error)
  }
)
