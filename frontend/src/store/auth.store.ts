import { AuthStatus } from '@/common/enums/auth-status.enum'
import { User } from '@/common/types/user.types'
import { tokenManager } from '@/services/token-manager'
import { defineStore } from 'pinia'

interface AuthState {
  user: User | null
  authStatus: AuthStatus
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    authStatus: AuthStatus.UNKNOWN
  }),

  getters: {
    isAuthenticated: (state) => state.authStatus === AuthStatus.AUTHENTICATED,
    isUnauthenticated: (state: AuthState) =>
      state.authStatus === AuthStatus.UNAUTHENTICATED,

    isUnknown: (state: AuthState) => state.authStatus === AuthStatus.UNKNOWN,

    userImages: (state) => {
      if (!state.user?.avatar) return null

      const basePath = state.user.avatar

      const [pathWithoutExt] = basePath.split(/\.(?=[^.]+$)/)

      return {
        jpg: `${pathWithoutExt}.jpg`,
        webp: `${pathWithoutExt}.webp`,
        jpg2x: `${pathWithoutExt}@2x.jpg`,
        webp2x: `${pathWithoutExt}@2x.webp`,
        jpg4x: `${pathWithoutExt}@4x.jpg`,
        webp4x: `${pathWithoutExt}@4x.webp`,
        all: [
          `${pathWithoutExt}.jpg`,
          `${pathWithoutExt}.webp`,
          `${pathWithoutExt}@2x.jpg`,
          `${pathWithoutExt}@2x.webp`,
          `${pathWithoutExt}@4x.jpg`,
          `${pathWithoutExt}@4x.webp`
        ]
      }
    }
  },

  actions: {
    setAuth(payload: { user: User; token: string }) {
      this.user = payload.user
      tokenManager.set(payload.token)
      this.authStatus = AuthStatus.AUTHENTICATED
    },

    clearAuth() {
      this.user = null
      tokenManager.remove()
      this.authStatus = AuthStatus.UNAUTHENTICATED
    }
  }
})
