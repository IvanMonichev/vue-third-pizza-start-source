import { IngredientDto } from '@/common/types/ingredient.types'

const toClassName = (path: string) => {
  const name = path.split('/').pop()?.replace('.svg', '') || ''
  return `filling--${name}`
}

export const mapIngredient = (ingredient: IngredientDto) => ({
  ...ingredient,
  class: toClassName(ingredient.image) // "filling/mushrooms.svg" – контракт
})
