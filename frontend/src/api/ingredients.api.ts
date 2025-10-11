import { ingredientsService } from '@/services/resources/ingredients.service'
import { useQuery } from '@tanstack/vue-query'

export const useIngredientsQuery = () => {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: () => ingredientsService.getAll()
  })
}
