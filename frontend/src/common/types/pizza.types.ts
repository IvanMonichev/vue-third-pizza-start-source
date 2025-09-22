import { PizzaIngredientDto } from '@/common/types/ingredient.types'

export interface OrderPizzaDto {
  id: number
  name: string
  sauceId: number
  doughId: number
  sizeId: number
  quantity: number
  orderId: number
  ingredients: PizzaIngredientDto[]
}
