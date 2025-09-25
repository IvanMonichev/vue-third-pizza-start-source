import { PizzaSizeValue } from '@/common/enums/pizza-size-value.enum'

export const pizzaSizeMap: Record<PizzaSizeValue, string> = {
  [PizzaSizeValue.SMALL]: 'small',
  [PizzaSizeValue.NORMAL]: 'normal',
  [PizzaSizeValue.BIG]: 'big'
} as const

export const ingredientClassMap: Record<number, string> = {
  1: 'mushrooms',
  2: 'cheddar',
  3: 'salami',
  4: 'ham',
  5: 'ananas',
  6: 'bacon',
  7: 'onion',
  8: 'chile',
  9: 'jalapeno',
  10: 'olives',
  11: 'tomatoes',
  12: 'salmon',
  13: 'mozzarella',
  14: 'parmesan',
  15: 'blue_cheese'
} as const

export const doughClassMap: Record<number, string> = {
  1: 'light',
  2: 'large'
}

export const saucesClassMap: Record<number, string> = {
  1: 'tomato',
  2: 'creamy'
}
