import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuthStore } from '@/store/auth.store'
import { AuthStatus } from '@/common/enums/auth-status.enum'
import { tokenManager } from '@/services/token-manager'
import { useProfileStore } from '@/store/profile.store'

const setUserMock = vi.fn()

vi.mock('@/services/token-manager', () => ({
  tokenManager: {
    set: vi.fn(),
    remove: vi.fn()
  }
}))

vi.mock('@/store/profile.store', () => ({
  useProfileStore: vi.fn(() => ({
    setUser: setUserMock
  }))
}))

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initializes with UNKNOWN status', () => {
    const auth = useAuthStore()
    expect(auth.authStatus).toBe(AuthStatus.UNKNOWN)
    expect(auth.isUnknown).toBe(true)
    expect(auth.isAuthenticated).toBe(false)
    expect(auth.isUnauthenticated).toBe(false)
  })

  it('sets authentication state correctly', () => {
    const auth = useAuthStore()

    auth.setAuth({ token: 'abc123' })

    expect(tokenManager.set).toHaveBeenCalledWith('abc123')
    expect(auth.authStatus).toBe(AuthStatus.AUTHENTICATED)
    expect(auth.isAuthenticated).toBe(true)
    expect(auth.isUnauthenticated).toBe(false)
  })

  it('clears authentication and resets profile', async () => {
    const auth = useAuthStore()
    const profileStore = useProfileStore()

    auth.authStatus = AuthStatus.AUTHENTICATED
    await auth.clearAuth()

    expect(tokenManager.remove).toHaveBeenCalled()
    expect(auth.authStatus).toBe(AuthStatus.UNAUTHENTICATED)
    expect(auth.isUnauthenticated).toBe(true)
    expect(profileStore.setUser).toHaveBeenCalledWith(null)
  })
})
