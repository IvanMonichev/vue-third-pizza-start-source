export interface Ingredient {
  id: number
  name: string
  image: string
  price: number
}

export interface IngredientPizza extends Pick<Ingredient, 'id'> {
  quantity: number
}
