import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json'
  }
})

httpClient.interceptors.response.use(
  (respose) => respose,
  (error) => {
    console.error(`API Error:`, error.response?.data || error.message)

    if (error.response?.status === 401) {
      // TODO: реализовать logout
    }

    return Promise.reject(error)
  }
)
