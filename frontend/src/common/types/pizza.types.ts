import {
  Ingredient,
  IngredientPizza,
  IngredientPizzaCreate
} from '@/common/types/ingredient.types'
import { Sauce } from '@/common/types/sauce.types'
import { Dough } from '@/common/types/dough.types'
import { Size } from '@/common/types/size.types'

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

export interface PizzaOrderUi extends Pick<PizzaOrder, 'id' | 'name'> {
  sauce: Sauce
  dough: Dough
  size: Size
}

export interface PizzaCart extends Pick<PizzaOrder, 'name' | 'quantity'> {
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
