export interface IngredientResponse {
  id: number
  name: string
  image: string
  price: number
}

export interface IngredientOrderResponse {
  id: number
  pizzaId: number
  ingredientId: number
  quantity: number
}

export interface Ingredient extends IngredientResponse {
  className: string
}

export interface IngredientPizza extends Pick<IngredientResponse, 'id'> {
  quantity: number
}

export interface IngredientPizzaCreate {
  ingredientId: number
  quantity: number
}
