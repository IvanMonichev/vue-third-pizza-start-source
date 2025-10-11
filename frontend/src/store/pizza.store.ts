import { Ingredient, IngredientPizza } from '@/common/types/ingredient.types'
import { Pizza } from '@/common/types/pizza.types'
import { calculatePizzaPrice } from '@/common/utils/price.utils'
import { useCartStore } from '@/store/cart.store'
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

      const ingredients = state.ingredients
        .map((i) => {
          const dataIngredient = dataStore.dataById('ingredients', i.id)

          return dataIngredient
            ? { ...dataIngredient, quantity: i.quantity }
            : null
        })
        .filter((i): i is Ingredient => Boolean(i))

      return calculatePizzaPrice(
        dough.price,
        sauce.price,
        size.multiplier,
        ingredients
      )
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

    loadFromCartPizza(cartPizza: Pizza) {
      this.pizzaId = cartPizza.pizzaId
      this.pizzaName = cartPizza.name
      this.doughId = cartPizza.doughId
      this.sauceId = cartPizza.sauceId
      this.sizeId = cartPizza.sizeId
      this.ingredients = [...cartPizza.ingredients]
    },

    buildPizzaToCart() {
      const cartStore = useCartStore()
      const pizza: Pizza = {
        pizzaId: this.pizzaId ?? crypto.randomUUID(),
        name: this.pizzaName,
        doughId: this.doughId,
        sauceId: this.sauceId,
        sizeId: this.sizeId,
        quantity: 1,
        ingredients: this.ingredients,
        price: this.pizzaPrice
      }

      cartStore.savePizza(pizza)
    },

    resetPizza() {
      this.$reset()
    }
  }
})
