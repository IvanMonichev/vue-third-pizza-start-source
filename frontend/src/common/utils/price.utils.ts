export const calculatePizzaPrice = (
  doughPrice: number,
  saucePrice: number,
  sizeMultiplier: number,
  ingredients: { price: number; quantity: number }[]
): number => {
  const base = doughPrice + saucePrice
  const ingredientsPrice = ingredients.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )
  return sizeMultiplier * (base + ingredientsPrice)
}

export const calculateOrderTotal = (
  pizzas: { price: number; quantity: number }[],
  misc: { price: number; quantity: number }[]
): number => {
  const pizzasTotal = pizzas.reduce((sum, p) => sum + p.price * p.quantity, 0)

  const miscTotal = misc.reduce((sum, m) => sum + m.price * m.quantity, 0)

  return pizzasTotal + miscTotal
}
