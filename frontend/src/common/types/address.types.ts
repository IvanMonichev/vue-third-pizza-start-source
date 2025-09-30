import { DeliveryType } from '@/common/enums/delivery-type.enum'

export interface AddressDto {
  id: number
  name: string
  userId: string
  street: string
  building: string
  flat: string
  comment: string
}

export type OrderAddressDto = AddressDto

export interface Address extends Pick<AddressDto, 'id'> {
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
