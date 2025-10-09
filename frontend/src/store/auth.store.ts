import { AuthStatus } from '@/common/enums/auth-status.enum'
import { tokenManager } from '@/services/token-manager'
import { useProfileStore } from '@/store/profile.store'
import { defineStore } from 'pinia'

interface AuthState {
  authStatus: AuthStatus
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    authStatus: AuthStatus.UNKNOWN
  }),

  getters: {
    isAuthenticated: (state) => state.authStatus === AuthStatus.AUTHENTICATED,
    isUnauthenticated: (state: AuthState) =>
      state.authStatus === AuthStatus.UNAUTHENTICATED,

    isUnknown: (state: AuthState) => state.authStatus === AuthStatus.UNKNOWN
  },

  actions: {
    setAuth(payload: { token: string }) {
      tokenManager.set(payload.token)
      this.authStatus = AuthStatus.AUTHENTICATED
    },

    clearAuth() {
      const profileStore = useProfileStore()
      tokenManager.remove()
      this.authStatus = AuthStatus.UNAUTHENTICATED
      profileStore.setUser(null)
    }
  }
})
