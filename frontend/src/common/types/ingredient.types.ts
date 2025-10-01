export interface IngredientDto {
  id: number
  name: string
  image: string
  price: number
}

export interface Ingredient extends IngredientDto {
  className: string
}

export interface IngredientPizza extends Pick<IngredientDto, 'id'> {
  quantity: number
}
