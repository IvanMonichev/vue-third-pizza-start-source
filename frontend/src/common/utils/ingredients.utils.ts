import { Ingredient, ViewIngredient } from '@/common/types/constructor.types'

const toClassName = (path: string) => {
  const name = path.split('/').pop()?.replace('.svg', '') || ''
  return `filling--${name}`
}

export const mapIngredient = (ingredient: Ingredient): ViewIngredient => ({
  ...ingredient,
  class: toClassName(ingredient.image) // "filling/mushrooms.svg" – контракт
})
