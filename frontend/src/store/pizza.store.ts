import { IngredientPizza } from '@/common/types/ingredient.types'
import { CartPizza } from '@/common/types/pizza.types'
import { useDataStore } from '@/store/data.store'
import { defineStore } from 'pinia'

interface PizzaState {
  pizzaName: string
  doughId: number
  sizeId: number
  sauceId: number
  ingredients: IngredientPizza[]
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

    // Добавить или обновить ингредиент (если quantity > 0)
    addIngredient(ingredient: IngredientPizza) {
      const index = this.ingredients.findIndex((i) => i.id === ingredient.id)
      if (ingredient.quantity <= 0) {
        if (index !== -1) {
          this.ingredients.splice(index, 1)
        }
        return
      }

      if (index === -1) {
        this.ingredients.push(ingredient)
      } else {
        this.ingredients[index] = ingredient
      }
    },

    toCartPizza(): CartPizza {
      return {
        clientId: crypto.randomUUID(),
        name: this.pizzaName,
        doughId: this.doughId,
        sauceId: this.sauceId,
        sizeId: this.sizeId,
        quantity: 1,
        ingredientsPizza: this.ingredients,
        price: this.pizzaPrice
      }
    },

    resetPizza() {
      this.$reset()
    }
  }
})
