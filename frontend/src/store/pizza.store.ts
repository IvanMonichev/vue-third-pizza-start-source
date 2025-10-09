import { IngredientPizza } from '@/common/types/ingredient.types'
import { PizzaCart } from '@/common/types/pizza.types'
import { useDataStore } from '@/store/data.store'
import { defineStore } from 'pinia'

interface PizzaState {
  pizzaId: string | null
  pizzaName: string
  doughId: number
  sizeId: number
  sauceId: number
  ingredients: IngredientPizza[]
}

export const usePizzaStore = defineStore('pizza', {
  state: (): PizzaState => ({
    pizzaId: null,
    pizzaName: '',
    doughId: 1,
    sizeId: 1,
    sauceId: 1,
    ingredients: []
  }),
  getters: {
    dough: (state) => {
      const dataStore = useDataStore()
      return dataStore.dataById('doughList', state.doughId) || null
    },

    sauce: (state) => {
      const dataStore = useDataStore()
      return dataStore.dataById('sauces', state.sauceId)
    },

    selectedIngredients: (state) => {
      const dataStore = useDataStore()
      return state.ingredients.map((i) => {
        const ingredient = dataStore.dataById('ingredients', i.id)
        if (!ingredient) {
          throw new Error(`Ingredient with id ${i.id} not found`)
        }
        return {
          ...ingredient,
          quantity: i.quantity
        }
      })
    },

    // Цена пиццы (динамически вычисляется)
    pizzaPrice: (state): number => {
      const dataStore = useDataStore()
      const dough = dataStore.dataById('doughList', state.doughId)
      const sauce = dataStore.dataById('sauces', state.sauceId)
      const size = dataStore.dataById('sizes', state.sizeId)

      if (!dough || !sauce || !size) return 0

      const basePrice = dough.price + sauce.price
      const ingredientsPrice = state.ingredients.reduce((acc, ing) => {
        const ingredient = dataStore.dataById('ingredients', ing.id)
        return acc + (ingredient ? ingredient.price * ing.quantity : 0)
      }, 0)

      return size.multiplier * (basePrice + ingredientsPrice)
    }
  },
  actions: {
    setIngredient(id: number, quantity: number) {
      const index = this.ingredients.findIndex((i) => i.id === id)

      if (index === -1) {
        this.ingredients.push({ id, quantity })
      } else {
        this.ingredients[index].quantity = quantity
      }
    },

    incrementIngredient(id: number) {
      const index = this.ingredients.findIndex((i) => i.id === id)
      if (index === -1) {
        this.ingredients.push({ id, quantity: 1 })
        return
      }

      const foundIngredient = this.ingredients[index]
      if (foundIngredient.quantity >= 3) {
        throw new Error('The quantity of ingredients must not exceed 3')
      }

      foundIngredient.quantity++
    },

    decrementIngredient(id: number) {
      const index = this.ingredients.findIndex((i) => i.id === id)
      if (index === -1) return

      const foundIngredient = this.ingredients[index]
      if (foundIngredient.quantity <= 0) {
        return
      }

      foundIngredient.quantity--

      if (foundIngredient.quantity === 0) {
        this.ingredients.splice(index, 1)
      }
    },

    toCartPizza(): PizzaCart {
      return {
        pizzaId: this.pizzaId ?? crypto.randomUUID(),
        name: this.pizzaName,
        doughId: this.doughId,
        sauceId: this.sauceId,
        sizeId: this.sizeId,
        quantity: 1,
        ingredients: this.ingredients,
        price: this.pizzaPrice
      }
    },

    loadFromCartPizza(cartPizza: PizzaCart) {
      this.pizzaId = cartPizza.pizzaId
      this.pizzaName = cartPizza.name
      this.doughId = cartPizza.doughId
      this.sauceId = cartPizza.sauceId
      this.sizeId = cartPizza.sizeId
      this.ingredients = [...cartPizza.ingredients]
    },

    resetPizza() {
      this.$reset()
    }
  }
})
