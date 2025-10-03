import { MiscDto } from '@/common/types/misc.types'
import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

const crud = createCrudService<MiscDto>(httpClient, 'misc')

export const miscService = {
  getAll: crud.getAll
}
