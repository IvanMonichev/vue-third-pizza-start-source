import { useAuthStore } from '@/store/auth.store'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const authGuard = async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  const isUnauthenticated = authStore.isUnauthenticated
  const isAuthenticated = authStore.isAuthenticated

  if (to.meta.requiresAuth && isUnauthenticated) {
    next({ name: 'login-view' })
    return
  }

  if (to.name === 'login-view' && isAuthenticated) {
    next('/')
    return
  }

  next()
}
