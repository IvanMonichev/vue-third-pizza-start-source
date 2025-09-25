export interface IngredientDto {
  id: number
  name: string
  image: string
  price: number
}

export interface Ingredient extends IngredientDto {
  className: string
}

export interface PizzaIngredient extends Pick<Ingredient, 'id'> {
  quantity: number
}
