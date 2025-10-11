import { doughService } from '@/services/resources/dough.service'
import { useQuery } from '@tanstack/vue-query'

export const useDoughQuery = () => {
  return useQuery({
    queryKey: ['dough'],
    queryFn: () => doughService.getAll()
  })
}
