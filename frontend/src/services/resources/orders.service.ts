import { Order, OrderCreate } from '@/common/types/order.types'
import { createCrudService } from '@/services/http/base-http.service'
import { httpClient } from '@/services/http/http-client'

const crud = createCrudService<Order>(httpClient, 'orders')

export const ordersService = {
  getAll: crud.getAll,
  create: (data: OrderCreate) => crud.create<OrderCreate>(data),
  remove: crud.remove
}
