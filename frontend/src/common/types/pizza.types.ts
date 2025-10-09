import { Ingredient, IngredientPizza } from '@/common/types/ingredient.types'

export interface PizzaOrder {
  id: number
  name: string
  sauceId: number
  doughId: number
  sizeId: number
  quantity: number
  orderId: number
  ingredients: Ingredient[]
}

export interface PizzaCart extends Pick<PizzaOrder, 'name' | 'quantity'> {
  pizzaId: string
  sauceId: number
  doughId: number
  sizeId: number
  price: number
  ingredients: IngredientPizza[]
}

export type PizzaOrderCreate = Omit<PizzaCart, 'pizzaId' | 'price'>
