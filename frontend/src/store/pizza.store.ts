import { PizzaIngredient } from '@/common/types/ingredient.types'
import { defineStore } from 'pinia'
import { useDataStore } from '@/store/data.store'

interface PizzaState {
  doughId: number | null
  sizeId: number | null
  sauceId: number | null
  ingredients: PizzaIngredient[]
}

export const usePizzaStore = defineStore('pizza', {
  state: (): PizzaState => ({
    doughId: null,
    sizeId: null,
    sauceId: null,
    ingredients: []
  }),
  getters: {
    pizzaPrice: (state) => {
      const dataStore = useDataStore()
      const dough = dataStore.getById('dough', state.doughId)
      const sauce = dataStore.getById('sauces', state.sauceId)

      if (!dough) return 0
      if (!sauce) return 0
      if (!state.ingredients) return 0

      const basePrice = dough.price + sauce.price
      const ingredientsPrice = state.ingredients.reduce((acc, ing) => {
        const ingredient = dataStore.getById('ingredients', ing.id)
        return acc + (ingredient ? ingredient.price * ing.quantity : 0)
      }, 0)
      return basePrice + ingredientsPrice
    }
  },
  actions: {
    incrementIngredient(id: number) {
      const ingredient = this.ingredients.find((i) => i.id === id)
      if (ingredient) {
        ingredient.quantity++
      }
    },

    decrementIngredient(id: number) {
      const index = this.ingredients.findIndex((i) => i.id === id)
      if (index !== -1) {
        if (this.ingredients[index].quantity > 1) {
          this.ingredients[index].quantity--
        } else {
          this.ingredients.splice(index, 1)
        }
      }
    },

    removeIngredient(id: number) {
      this.ingredients = this.ingredients.filter((i) => i.id !== id)
    },

    setDoughId(id: number) {
      this.doughId = id
    },

    setSizeId(id: number) {
      this.sizeId = id
    }
  }
})
