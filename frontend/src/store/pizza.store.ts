import { Dough } from '@/common/types/dough.types'
import { Ingredient } from '@/common/types/ingredient.types'
import { CartPizza } from '@/common/types/pizza.types'
import { Sauce } from '@/common/types/sauce.types'
import { useDataStore } from '@/store/data.store'
import { defineStore } from 'pinia'

interface PizzaState {
  pizzaName: string
  doughId: number | null
  sizeId: number | null
  sauceId: number | null
  ingredients: Ingredient[]
}

export const usePizzaStore = defineStore('pizza', {
  state: (): PizzaState => ({
    pizzaName: '',
    doughId: 1,
    sizeId: 1,
    sauceId: 1,
    ingredients: []
  }),
  getters: {
    pizzaPrice: (state) => {
      const dataStore = useDataStore()
      const dough = dataStore.dataById('dough', state.doughId)
      const sauce = dataStore.dataById('sauces', state.sauceId)
      const size = dataStore.dataById('sizes', state.sizeId)

      if (!dough) return 0
      if (!sauce) return 0
      if (!state.ingredients) return 0
      if (!size?.multiplier) return 0

      const basePrice = dough.price + sauce.price
      const ingredientsPrice = state.ingredients.reduce((acc, ing) => {
        const ingredient = dataStore.dataById('ingredients', ing.id)
        return acc + (ingredient ? ingredient.price * ing.quantity : 0)
      }, 0)

      return size.multiplier * (basePrice + ingredientsPrice)
    },

    ingredientQuantity:
      (state) =>
      (id: number): number => {
        return state.ingredients.find((i) => i.id === id)?.quantity || 0
      },

    ingredients: (state) => {
      const dataStore = useDataStore()
      return state.ingredients.map((i) => {
        const ingredient = dataStore.dataById('ingredients', i.id)

        if (!ingredient) throw new Error(`Ingredient with id ${i.id} not found`)

        return { ...ingredient, quantity: i.quantity }
      })
    },

    dough: (state): Dough | null => {
      const dataStore = useDataStore()

      const dough = dataStore.dataById('dough', state.doughId)
      if (!dough) return null
      return dough
    },

    sauce: (state): Sauce | null => {
      const dataStore = useDataStore()

      const sauce = dataStore.dataById('sauces', state.sauceId)
      if (!sauce) return null
      return sauce
    }
  },
  actions: {
    setIngredient(id: number, value: number) {
      if (value < 1) {
        this.ingredients = this.ingredients.filter((i) => i.id !== id)
        return
      }

      if (value > 3) return

      const ingredient = this.ingredients.find((i) => i.id === id)
      if (ingredient) {
        ingredient.quantity = value
      } else {
        this.ingredients.push({ id, quantity: value })
      }
    },

    incrementIngredient(id: number) {
      const ingredient = this.ingredients.find((i) => i.id === id)
      if (!ingredient) {
        this.ingredients.push({ id, quantity: 1 })
        return
      }

      if (ingredient.quantity >= 3) return
      ingredient.quantity++
    },

    decrementIngredient(id: number) {
      const index = this.ingredients.findIndex((i) => i.id === id)
      if (index === -1) return

      const ingredient = this.ingredients[index]
      if (ingredient.quantity <= 1) {
        this.ingredients.splice(index, 1)
        return
      }

      ingredient.quantity--
    },

    toCartPizza(): CartPizza {
      const dataStore = useDataStore()
      const dough = dataStore.dataById('dough', this.doughId)
      const sauce = dataStore.dataById('sauces', this.sauceId)
      const size = dataStore.dataById('sizes', this.sizeId)

      if (!dough || !sauce || !size) {
        throw new Error('Не выбраны все параметры пиццы')
      }

      return {
        clientId: crypto.randomUUID(),
        name: this.pizzaName,
        dough,
        sauce,
        size,
        ingredients: this.ingredients,
        quantity: 1,
        price: this.pizzaPrice
      }
    },

    resetPizza() {
      this.$reset()
    }
  }
})
