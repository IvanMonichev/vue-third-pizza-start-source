export interface IngredientDto {
  id: number
  name: string
  image: string
  price: number
}

export interface PizzaIngredientDto extends Pick<IngredientDto, 'id'> {
  pizzaId: number
  ingredientId: number
  quantity: number
}

export interface PizzaIngredient extends IngredientDto {
  quantity: number
}
