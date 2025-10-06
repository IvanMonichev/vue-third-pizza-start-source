import { AddressUi, OrderAddress } from '@/common/types/address.types'
import { Misc, MiscOrder } from '@/common/types/misc.types'
import { OrderPizza } from '@/common/types/pizza.types'

export interface Order {
  id: number
  userId: string
  addressId: number
  orderPizzas: OrderPizza[]
  orderMisc: MiscOrder[]
  orderAddress: OrderAddress
}

export interface ProfileOrder {
  id: number
  total: number
  pizzas: OrderPizza[]
  misc: Misc[]
  address: AddressUi
}
