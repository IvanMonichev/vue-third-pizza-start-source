import { PizzaSizeValue } from '@/common/enums/pizza-size-value.enum'

export interface SizeDto {
  id: number
  name: string
  image: string
  multiplier: PizzaSizeValue
}

export type PizzaSize = Pick<SizeDto, 'id'>
