import { DoughSize } from '@/common/enums/dough-size.enum'
import { PizzaSize } from '@/common/enums/pizza-size.enum'

export const doughSizeMap: Record<DoughSize, string> = {
  [DoughSize.LIGHT]: 'light',
  [DoughSize.LARGE]: 'large'
} as const

export const pizzaSizeMap: Record<PizzaSize, string> = {
  [PizzaSize.SMALL]: 'small',
  [PizzaSize.NORMAL]: 'normal',
  [PizzaSize.BIG]: 'big'
}
