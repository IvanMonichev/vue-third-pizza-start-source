import { Order } from '@/common/types/order.types'
import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

const crud = createCrudService<Order>(httpClient, 'orders')

export const ordersService = {
  getAll: crud.getAll,
  create: crud.create,
  remove: crud.remove
}
