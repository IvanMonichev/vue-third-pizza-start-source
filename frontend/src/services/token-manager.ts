import { ACCESS_TOKEN_KEY } from '@/common/constants/core.constants'

export const tokenManager = {
  set(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  },

  get(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  remove() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  },

  exists(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY)
  }
}
