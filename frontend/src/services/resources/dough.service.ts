import { DoughResponse } from '@/common/types/dough.types'
import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

const crud = createCrudService<DoughResponse>(httpClient, 'dough')

export const doughService = {
  getAll: crud.getAll
}
