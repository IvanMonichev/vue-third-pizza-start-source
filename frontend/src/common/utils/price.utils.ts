import { Ingredient } from '@/common/types/ingredient.types'
import { Misc } from '@/common/types/misc.types'
import { Pizza } from '@/common/types/pizza.types'

export const calculatePizzaPrice = (
  doughPrice: number,
  saucePrice: number,
  sizeMultiplier: number,
  ingredients: Ingredient[]
): number => {
  const base = doughPrice + saucePrice
  const ingredientsPrice = ingredients.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )
  return sizeMultiplier * (base + ingredientsPrice)
}

export const calculateOrderTotal = (pizzas: Pizza[], misc: Misc[]): number => {
  const pizzasTotal = pizzas.reduce((sum, p) => sum + p.price * p.quantity, 0)

  const miscTotal = misc.reduce((sum, m) => sum + m.price * m.quantity, 0)

  return pizzasTotal + miscTotal
}
