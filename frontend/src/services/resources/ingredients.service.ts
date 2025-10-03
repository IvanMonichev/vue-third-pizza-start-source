import { Ingredient } from '@/common/types/ingredient.types'
import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

const crud = createCrudService<Ingredient>(httpClient, 'ingredients')

export const ingredientsService = {
  getAll: crud.getAll
}
