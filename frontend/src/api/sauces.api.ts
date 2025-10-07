import { saucesService } from '@/services/resources/sauces.service'
import { useQuery } from '@tanstack/vue-query'

export const useSaucesQuery = () => {
  return useQuery({
    queryKey: ['sauces'],
    queryFn: () => saucesService.getAll()
  })
}
