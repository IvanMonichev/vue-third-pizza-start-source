import {
  IngredientPizza,
  IngredientResponse
} from '@/common/types/ingredient.types'

export interface OrderPizzaDto {
  id: number
  name: string
  sauceId: number
  doughId: number
  sizeId: number
  quantity: number
  orderId: number
  ingredients: IngredientResponse[]
}

export interface CartPizza extends Pick<OrderPizzaDto, 'name' | 'quantity'> {
  pizzaId: string
  sauceId: number
  doughId: number
  sizeId: number
  price: number
  ingredientsPizza: IngredientPizza[]
}
