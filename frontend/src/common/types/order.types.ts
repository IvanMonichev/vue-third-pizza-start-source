import { Pizza } from '@/common/types/pizza.types'

export interface Misc {
  id: number
  name: string
  price: number
  image: string
}

export interface MiscView extends Omit<Misc, 'id'> {
  alt: string
}

export interface Address {
  id: number
  name: string
  userId: string
  street: string
  building: string
  flat: string
  comment: string
}

export type OrderAddress = Omit<Address, 'id' | 'name'>

export interface OrderMisc {
  miscId: number
  quantity: number
}

export interface Order {
  userId: string
  phone: string
  address: OrderAddress
  pizzas: Pizza[]
  misc: OrderMisc[]
}
