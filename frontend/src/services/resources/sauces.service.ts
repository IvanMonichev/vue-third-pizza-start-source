import { SauceUi } from '@/common/types/sauce.types'
import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

const crud = createCrudService<SauceUi>(httpClient, 'sauces')

export const saucesService = {
  getAll: crud.getAll
}
