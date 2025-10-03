import { PizzaSizeValue } from '@/common/enums/pizza-size-value.enum'

export interface SizeResponse {
  id: number
  name: string
  image: string
  multiplier: PizzaSizeValue
}
