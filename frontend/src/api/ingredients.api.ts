import { useQuery } from '@tanstack/vue-query'
import { ingredientsService } from '@/services/resources/ingredients.service'

export const useIngredients = () => {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: () => ingredientsService.getAll()
  })
}
