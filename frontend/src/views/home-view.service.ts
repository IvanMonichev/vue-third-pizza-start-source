import { Ingredient, ViewIngredient } from '@/types/ingredients.types'

const toClassName = (path: string) => {
  const name = path.split('/').pop()?.replace('.svg', '') || ''
  return `filling--${name}`
}

export const mapIngredient = (ingredient: Ingredient): ViewIngredient => ({
  ...ingredient,
  class: toClassName(ingredient.image) // "filling/mushrooms.svg" – контракт
})
