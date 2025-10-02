import { IngredientResponse } from '@/common/types/ingredient.types'
import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

export const ingredientsService = createCrudService<void, IngredientResponse>(
  httpClient,
  'ingredients'
)
