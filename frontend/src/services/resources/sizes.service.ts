import { SizeResponse } from '@/common/types/size.types'
import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

const crud = createCrudService<SizeResponse>(httpClient, 'sizes')

export const sizesService = {
  getAll: crud.getAll
}
