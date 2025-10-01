import colaImg from '@/assets/img/cola.svg'
import potatoImg from '@/assets/img/potato.svg'
import sauceImg from '@/assets/img/sauce.svg'
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

export const doughCartMap: Record<number, string> = {
  1: 'на тонком тесте',
  2: 'на толстом тесте'
} as const

export const doughClassMap: Record<number, string> = {
  1: 'light',
  2: 'large'
} as const

export const saucesClassMap: Record<number, string> = {
  1: 'tomato',
  2: 'creamy'
} as const

export const miscImagesMap: Record<string, string> = {
  cola: colaImg,
  potato: potatoImg,
  sauce: sauceImg
}
