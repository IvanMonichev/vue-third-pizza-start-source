import { PizzaSizeValue } from '@/common/enums/pizza-size-value.enum'

export interface Size {
  id: number
  name: string
  image: string
  multiplier: PizzaSizeValue
}
