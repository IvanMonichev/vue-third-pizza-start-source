import { AddressOrderCreate } from '@/common/types/address.types'
import { Misc, MiscOrder } from '@/common/types/misc.types'
import { PizzaOrder, PizzaOrderCreate } from '@/common/types/pizza.types'

export interface Order {
  id: number
  userId: string
  addressId: number
  orderPizzas: PizzaOrder[]
  orderMisc: MiscOrder[]
  orderAddress: AddressOrderCreate
}

export interface OrderCreate {
  userId: string
  phone: string
  address: AddressOrderCreate
  pizzas: PizzaOrderCreate[]
  misc: MiscOrder[]
}

export interface OrderProfile {
  id: number
  total: number
  pizzas: PizzaOrder[]
  misc: Misc[]
  address: AddressOrderCreate
}
