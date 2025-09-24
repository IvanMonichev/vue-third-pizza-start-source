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
      const size = dataStore.getById('sizes', state.sizeId)

      if (!dough) return 0
      if (!sauce) return 0
      if (!state.ingredients) return 0
      if (!size?.multiplier) return 0

      const basePrice = dough.price + sauce.price
      const ingredientsPrice = state.ingredients.reduce((acc, ing) => {
        const ingredient = dataStore.getById('ingredients', ing.id)
        return acc + (ingredient ? ingredient.price * ing.quantity : 0)
      }, 0)

      return size.multiplier * (basePrice + ingredientsPrice)
    },
    getIngredientQuantity:
      (state) =>
      (id: number): number => {
        return state.ingredients.find((i) => i.id === id)?.quantity || 0
      }
  },
  actions: {
    setIngredient(id: number, value: number) {
      const ingredient = this.ingredients.find((i) => i.id === id)

      if (value <= 0) {
        this.ingredients = this.ingredients.filter((i) => i.id !== id)
        return
      }

      if (ingredient) {
        ingredient.quantity = value
      } else {
        this.ingredients.push({ id, quantity: value })
      }
    },

    incrementIngredient(id: number) {
      const ingredient = this.ingredients.find((i) => i.id === id)
      if (ingredient) {
        ingredient.quantity++
      } else {
        this.ingredients.push({ id, quantity: 1 })
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
    },

    setSauceId(id: number) {
      this.sauceId = id
    }
  }
})
