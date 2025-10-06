import { User } from '@/common/types/user.types'
import { handleRequest } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

export const authService = {
  login: (email: string, password: string) =>
    handleRequest(
      httpClient.post<{ token: string }>('/login', { email, password })
    ),

  logout: () => handleRequest(httpClient.delete<void>('/logout')),

  whoAmI: () => handleRequest<User>(httpClient.get<User>('/whoAmI'))
}
