import { User } from '@/common/types/user.types'
import { authService } from '@/services/resources/auth.service'
import { tokenManager } from '@/services/token-manager'
import { useAuthStore } from '@/store/auth.store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export const useAuthUser = () => {
  return useQuery<User>({
    queryKey: ['auth'],
    queryFn: () => authService.whoAmI(),
    enabled: tokenManager.exists()
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()
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

      await queryClient.invalidateQueries({ queryKey: ['auth'] })
    },

    // (опционально)
    onError: (error) => {
      console.error('Ошибка авторизации:', error)
      authStore.clearAuth()
    }
  })
}
