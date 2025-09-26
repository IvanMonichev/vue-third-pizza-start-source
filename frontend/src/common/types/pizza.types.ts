import { Dough } from '@/common/types/dough.types'
import { Ingredient, IngredientDto } from '@/common/types/ingredient.types'
import { Sauce } from '@/common/types/sauce.types'
import { SizeDto } from '@/common/types/size.types'

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

export interface CartPizza extends Pick<OrderPizzaDto, 'name' | 'quantity'> {
  clientId: string
  sauce: Sauce
  dough: Dough
  size: SizeDto
  price: number
  ingredients: Ingredient[]
}
