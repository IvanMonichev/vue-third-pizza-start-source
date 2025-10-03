import { IngredientResponse } from '@/common/types/ingredient.types'
import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

const crud = createCrudService<IngredientResponse>(httpClient, 'ingredients')

export const ingredientsService = {
  getAll: crud.getAll
}
