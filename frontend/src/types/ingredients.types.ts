export interface Ingredient {
  id: number
  name: string
  image: string
  price: number
}

export type ViewIngredient = Ingredient & {
  class: string
}
