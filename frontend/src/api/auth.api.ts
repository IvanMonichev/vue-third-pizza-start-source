import { authService } from '@/services/resources/auth.service'
import { tokenManager } from '@/services/token-manager'
import { useAuthStore } from '@/store/auth.store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['auth'],
    retry: false,
    queryFn: () => {
      return authService.whoAmI()
    }
  })
}

export const useLogin = () => {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const response = await authService.login(payload.email, payload.password)
      tokenManager.set(response.token)
      return response
    },

    onSuccess: async (response) => {
      tokenManager.set(response.token)

      await queryClient.invalidateQueries({ queryKey: ['auth'] })
      await queryClient.invalidateQueries({ queryKey: ['addresses'] })
      await queryClient.invalidateQueries({ queryKey: ['orders'] })
    },

    onError: () => {
      authStore.clearAuth()
    }
  })
}
