import { Ingredient, IngredientPizza } from '@/common/types/ingredient.types'

export interface OrderPizza {
  id: number
  name: string
  sauceId: number
  doughId: number
  sizeId: number
  quantity: number
  orderId: number
  ingredients: Ingredient[]
}

export interface CartPizza extends Pick<OrderPizza, 'name' | 'quantity'> {
  pizzaId: string
  sauceId: number
  doughId: number
  sizeId: number
  price: number
  ingredientsPizza: IngredientPizza[]
}
