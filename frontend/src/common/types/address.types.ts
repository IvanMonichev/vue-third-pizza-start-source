import { DeliveryType } from '@/common/enums/delivery-type.enum'

export interface AddressResponse {
  id: number
  name: string
  userId: string
  street: string
  building: string
  flat: string
  comment: string
}

export type AddressCreate = Omit<AddressResponse, 'id'>
export type AdressUpdate = AddressResponse

export type OrderAddress = AddressResponse

export interface Address extends Pick<AddressResponse, 'id'> {
  label: string
  fullAddress: string
}

export interface AddressForm {
  deliveryType: DeliveryType
  phone: string
  street?: string
  house?: string
  apartment?: string
}
