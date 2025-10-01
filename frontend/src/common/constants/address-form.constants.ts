import { DeliveryType } from '@/common/enums/delivery-type.enum'
import { Option } from '@/common/types/core.types'

export const develiryTypeOptions: Array<Option<DeliveryType>> = [
  {
    label: 'Заберу сам',
    value: DeliveryType.PICK_UP
  },
  { value: DeliveryType.NEW_ADDRESS, label: 'Новый адрес' },
  { value: DeliveryType.SAVED_ADDRESS, label: 'Дом' }
] as const
