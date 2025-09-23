import { DoughSize } from '@/common/enums/dough-size.enum'
import { PizzaSizeValue } from '@/common/enums/pizza-size-value.enum'

export const doughSizeMap: Record<DoughSize, string> = {
  [DoughSize.LIGHT]: 'light',
  [DoughSize.LARGE]: 'large'
} as const

export const pizzaSizeMap: Record<PizzaSizeValue, string> = {
  [PizzaSizeValue.SMALL]: 'small',
  [PizzaSizeValue.NORMAL]: 'normal',
  [PizzaSizeValue.BIG]: 'big'
} as const
