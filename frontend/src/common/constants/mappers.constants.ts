import { DoughSize } from '@/common/enums/dough-size.enum'
import { PizzaSizeValue } from '@/common/enums/pizza-size-value.enum'
import { IngredientType } from '@/common/enums/ingredient-type.enum'

export const doughSizeMap: Record<DoughSize, string> = {
  [DoughSize.LIGHT]: 'light',
  [DoughSize.LARGE]: 'large'
} as const

export const pizzaSizeMap: Record<PizzaSizeValue, string> = {
  [PizzaSizeValue.SMALL]: 'small',
  [PizzaSizeValue.NORMAL]: 'normal',
  [PizzaSizeValue.BIG]: 'big'
} as const

export const ingredientIdMap: Record<number, IngredientType> = {
  1: IngredientType.MUSHROOMS,
  2: IngredientType.CHEDDAR,
  3: IngredientType.SALAMI,
  4: IngredientType.HAM,
  5: IngredientType.ANANAS,
  6: IngredientType.BACON,
  7: IngredientType.ONION,
  8: IngredientType.CHILE,
  9: IngredientType.JALAPENO,
  10: IngredientType.OLIVES,
  11: IngredientType.TOMATOES,
  12: IngredientType.SALMON,
  13: IngredientType.MOZZARELLA,
  14: IngredientType.PARMESAN,
  15: IngredientType.BLUE_CHEESE
} as const

export const ingredientClassMap: Record<IngredientType, string> = {
  [IngredientType.MUSHROOMS]: 'mushrooms',
  [IngredientType.CHEDDAR]: 'cheddar',
  [IngredientType.SALAMI]: 'salami',
  [IngredientType.HAM]: 'ham',
  [IngredientType.ANANAS]: 'ananas',
  [IngredientType.BACON]: 'bacon',
  [IngredientType.ONION]: 'onion',
  [IngredientType.CHILE]: 'chile',
  [IngredientType.JALAPENO]: 'jalapeno',
  [IngredientType.OLIVES]: 'olives',
  [IngredientType.TOMATOES]: 'tomatoes',
  [IngredientType.SALMON]: 'salmon',
  [IngredientType.MOZZARELLA]: 'mozzarella',
  [IngredientType.PARMESAN]: 'parmesan',
  [IngredientType.BLUE_CHEESE]: 'blue_cheese'
} as const
