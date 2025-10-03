import { Address, AddressUpdate } from '@/common/types/address.types'
import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

const crud = createCrudService<Address>(httpClient, 'addresses')

export const addressesService = {
  getAll: crud.getAll,
  create: crud.create,
  update: (id: number, data: AddressUpdate) => crud.update(id, data),
  remove: crud.remove
}
