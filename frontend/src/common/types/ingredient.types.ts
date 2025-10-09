export interface Ingredient {
  id: number
  name: string
  image: string
  price: number
}

export interface IngredientUi extends Ingredient {
  className: string
}

export interface IngredientPizza extends Pick<Ingredient, 'id'> {
  quantity: number
}

export interface IngredientPizzaCreate {
  ingredientId: number
  quantity: number
}
