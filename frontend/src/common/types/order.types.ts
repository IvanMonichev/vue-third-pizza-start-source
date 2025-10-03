import { Address, OrderAddress } from '@/common/types/address.types'
import { MiscDto, MiscOrderDto } from '@/common/types/misc.types'
import { OrderPizzaDto } from '@/common/types/pizza.types'

export interface OrderDto {
  id: number
  userId: string
  addressId: number
  orderPizzas: OrderPizzaDto[]
  orderMisc: MiscOrderDto[]
  orderAddress: OrderAddress
}

export interface ProfileOrder {
  id: number
  total: number
  pizzas: OrderPizzaDto[]
  misc: MiscDto[]
  address: Address
}
