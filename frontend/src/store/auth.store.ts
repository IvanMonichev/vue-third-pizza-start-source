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
