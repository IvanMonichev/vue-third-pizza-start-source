import { AddressOrderCreate } from '@/common/types/address.types'
import { Misc, MiscOrder, MiscOrderCreate } from '@/common/types/misc.types'
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
  userId: string | null
  phone: string
  address: AddressOrderCreate | null
  pizzas: PizzaOrderCreate[]
  misc: MiscOrderCreate[]
}

export interface OrderProfile {
  id: number
  total: number
  pizzas: PizzaOrder[]
  misc: Misc[]
  address: AddressOrderCreate
}
