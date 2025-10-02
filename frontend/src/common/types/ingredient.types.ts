export interface IngredientResponse {
  id: number
  name: string
  image: string
  price: number
}

export interface Ingredient extends IngredientResponse {
  className: string
}

export interface IngredientPizza extends Pick<IngredientResponse, 'id'> {
  quantity: number
}
