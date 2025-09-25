import { IngredientDto, PizzaIngredient } from '@/common/types/ingredient.types'

export interface OrderPizzaDto {
  id: number
  name: string
  sauceId: number
  doughId: number
  sizeId: number
  quantity: number
  orderId: number
  ingredients: IngredientDto[]
}

export interface CartPizza
  extends Omit<OrderPizzaDto, 'orderId' | 'id' | 'ingredients'> {
  id: string
  price: number
  total: number
  ingredients: PizzaIngredient[]
}
