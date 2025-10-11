import { sizesService } from '@/services/resources/sizes.service'
import { useQuery } from '@tanstack/vue-query'

export const useSizesQuery = () => {
  return useQuery({
    queryKey: ['sizes'],
    queryFn: () => sizesService.getAll()
  })
}
