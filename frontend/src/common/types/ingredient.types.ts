import { IngredientType } from '@/common/enums/ingredient-type.enum'

export interface IngredientDto {
  id: number
  name: string
  image: string
  price: number
}

export interface Ingredient extends IngredientDto {
  type: IngredientType
}

export interface IngredientWithClass extends Ingredient {
  class: string
}

export interface PizzaIngredient extends Pick<Ingredient, 'id'> {
  quantity: number
}
