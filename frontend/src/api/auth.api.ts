import { User } from '@/common/types/user.types'
import { authService } from '@/services/resources/auth.service'
import { tokenManager } from '@/services/token-manager'
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

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const response = await authService.login(payload.email, payload.password)
      tokenManager.set(response.token)
      return response.token
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth'] })
    }
  })
}
