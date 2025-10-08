import { DeliveryType } from '@/common/enums/delivery-type.enum'
import { AddressMode } from '@/common/enums/address-mode.enum'

export interface Address {
  id: number
  name: string
  userId: string
  street: string
  building: string
  flat?: string
  comment?: string
}

export type AddressCreate = Omit<Address, 'id'>
export type AddressUpdate = Address

export type OrderAddress = Address

export interface AddressProfile extends Omit<Address, 'id'> {
  id: string | number
  addressMode: AddressMode
}

export interface AddressForm {
  deliveryType: DeliveryType
  phone: string
  street?: string
  house?: string
  apartment?: string
}
