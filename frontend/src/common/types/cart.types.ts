import { DeliveryType } from '@/common/enums/delivery-type.enum'

export type DeliverySelectValue = DeliveryType | string

export interface CartAddressForm {
  deliveryType: DeliverySelectValue
  phone: string
  street: string
  house: string
  apartment?: string
  comment?: string
}
