import { DoughSize } from '@/common/enums/dough-size.enum'

export interface PizzaSizeInterface {
  id: number
  name: string
  image: string
  multiplier: number
}

export interface Dough {
  id: number
  name: string
  image: string
  description: string
  price: number
  size: DoughSize
}

export type SaucesValue = 'tomato' | 'creamy'

export interface PizzaSauces {
  id: number
  name: string
  price: number
  value: string
}

export interface Ingredient {
  id: number
  name: string
  image: string
  price: number
}

export type ViewIngredient = Ingredient & {
  class: string
}

type SelectedIngredient = {
  ingredientId: number
  quantity: number
}

export interface Pizza {
  name: string
  sauceId: string | null
  doughId: string | null
  sizeId: string | null
  ingredients: SelectedIngredient[]
  quantity: number
}
