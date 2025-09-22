import { PizzaDough } from '@/common/types/dough.types'
import { PizzaIngredient } from '@/common/types/ingredient.types'
import { PizzaSauces } from '@/common/types/sauces.types'
import { PizzaSize } from '@/common/types/size.types'
import { defineStore } from 'pinia'

interface PizzaState {
  dough: PizzaDough | null
  size: PizzaSize | null
  sauce: PizzaSauces | null
  ingredients: PizzaIngredient[]
}

export const usePizzaStore = defineStore('pizza', {
  state: (): PizzaState => ({
    dough: null,
    size: null,
    sauce: null,
    ingredients: []
  }),
  getters: {
    pizzaPrice: (state) => {
      const { dough, sauce, ingredients } = state
      if (!dough) return 0
      if (!sauce) return 0
      if (!ingredients) return 0

      const basePrice = dough.price + sauce.price
      const ingredientsPrice = ingredients.reduce(
        (acc, ing) => acc + ing.price * ing.quantity,
        0
      )
      return basePrice + ingredientsPrice
    }
  },
  actions: {
    setDough(dough: PizzaDough) {
      this.dough = dough
    },
    setSize(size: PizzaSize) {
      this.size = size
    },
    setSauce(sauce: PizzaSauces) {
      this.sauce = sauce
    },
    toggleIngredient(ingredient: PizzaIngredient) {
      const index = this.ingredients.findIndex((i) => i.id === ingredient.id)
      if (index === -1) {
        this.ingredients.push({ ...ingredient, quantity: 1 })
      } else {
        this.ingredients.splice(index, 1)
      }
    },
    clear() {
      this.dough = null
      this.size = null
      this.sauce = null
      this.ingredients = []
    }
  }
})
