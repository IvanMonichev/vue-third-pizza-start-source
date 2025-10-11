import {
  AddressOrderCreate,
  AddressResponse
} from '@/common/types/address.types'
import {
  Misc,
  MiscOrderCreate,
  MiscOrderResponse
} from '@/common/types/misc.types'
import {
  PizzaOrder,
  PizzaOrderCreate,
  PizzaOrderResponse
} from '@/common/types/pizza.types'

export interface OrderResponse {
  id: number
  userId: string
  addressId: number | null
  orderPizzas?: PizzaOrderResponse[]
  orderMisc?: MiscOrderResponse[]
  orderAddress: AddressResponse
}

export interface Order {
  id: number
  name: string
  price: number
  pizzas: PizzaOrder[]
  miscList: Misc[]
  address: AddressResponse | null
}

export interface OrderCreate {
  userId: string | null
  phone: string
  address: AddressOrderCreate | null
  pizzas: PizzaOrderCreate[]
  misc: MiscOrderCreate[]
}
