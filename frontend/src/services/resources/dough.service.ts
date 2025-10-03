import { Dough } from '@/common/types/dough.types'
import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

const crud = createCrudService<Dough>(httpClient, 'dough')

export const doughService = {
  getAll: crud.getAll
}
