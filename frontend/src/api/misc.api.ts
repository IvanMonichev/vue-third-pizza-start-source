import { useQuery } from '@tanstack/vue-query'
import { miscService } from '@/services/resources/misc.service'

export const useMiscQuery = () => {
  return useQuery({
    queryKey: ['misc'],
    queryFn: () => miscService.getAll()
  })
}
