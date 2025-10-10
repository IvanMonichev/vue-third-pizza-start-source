import { Address, AddressOrderCreate } from '@/common/types/address.types'
import { MiscOrder, MiscOrderCreate } from '@/common/types/misc.types'
import { PizzaOrder, PizzaOrderCreate } from '@/common/types/pizza.types'

export interface Order {
  id: number
  userId: string
  addressId: number
  orderPizzas: PizzaOrder[]
  orderMisc: MiscOrder[]
  orderAddress: Address
}

export interface OrderUi extends Order {
  name: string
  price: number
}

export interface OrderCreate {
  userId: string | null
  phone: string
  address: AddressOrderCreate | null
  pizzas: PizzaOrderCreate[]
  misc: MiscOrderCreate[]
}
