import { DoughResponse } from '@/common/types/dough.types'
import {
  Ingredient,
  IngredientOrderResponse,
  IngredientPizza,
  IngredientPizzaCreate
} from '@/common/types/ingredient.types'
import { SauceResponse } from '@/common/types/sauce.types'
import { Size } from '@/common/types/size.types'

export interface PizzaOrderResponse {
  id: number
  name: string
  sauceId: number
  doughId: number
  sizeId: number
  quantity: number
  orderId: number
  ingredients: IngredientOrderResponse[]
}

export interface PizzaOrder extends Pick<PizzaOrderResponse, 'id' | 'name'> {
  sauce: SauceResponse
  dough: DoughResponse
  size: Size
  ingredients: Ingredient
}

export interface PizzaCart
  extends Pick<PizzaOrderResponse, 'name' | 'quantity'> {
  pizzaId: string
  sauceId: number
  doughId: number
  sizeId: number
  price: number
  ingredients: IngredientPizza[]
}

export type PizzaOrderCreate = Omit<
  PizzaCart,
  'pizzaId' | 'price' | 'ingredients'
> & {
  ingredients: IngredientPizzaCreate[]
}
