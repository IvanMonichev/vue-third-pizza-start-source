import { OrderAddressDto } from '@/common/types/address.types'
import { OrderMiscDto } from '@/common/types/misc.types'
import { OrderPizzaDto } from '@/common/types/pizza.types'

export interface OrderDto {
  id: number
  userId: string
  addressId: number
  orderPizzas: OrderPizzaDto[]
  orderMisc: OrderMiscDto[]
  orderAddress: OrderAddressDto
}
