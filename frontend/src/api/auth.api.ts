import { authService } from '@/services/resources/auth.service'
import { tokenManager } from '@/services/token-manager'
import { useAuthStore } from '@/store/auth.store'
import { useMutation, useQuery } from '@tanstack/vue-query'

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['auth'],
    enabled: !!tokenManager.exists(),
    queryFn: () => {
      return authService.whoAmI()
    }
  })
}

export const useLogin = () => {
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const response = await authService.login(payload.email, payload.password)
      tokenManager.set(response.token)
      return response
    },

    onSuccess: async (response) => {
      tokenManager.set(response.token)

      const user = await authService.whoAmI()

      authStore.setAuth({
        user,
        token: response.token
      })
    },

    onError: () => {
      authStore.clearAuth()
    }
  })
}
