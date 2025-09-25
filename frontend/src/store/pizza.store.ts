import { Dough } from '@/common/types/dough.types'
import { PizzaIngredient } from '@/common/types/ingredient.types'
import { CartPizza } from '@/common/types/pizza.types'
import { Sauce } from '@/common/types/sauce.types'
import { useDataStore } from '@/store/data.store'
import { defineStore } from 'pinia'

interface PizzaState {
  pizzaName: string
  doughId: number | null
  sizeId: number | null
  sauceId: number | null
  pizzaIngredients: PizzaIngredient[]
}

export const usePizzaStore = defineStore('pizza', {
  state: (): PizzaState => ({
    pizzaName: '',
    doughId: 1,
    sizeId: 1,
    sauceId: 1,
    pizzaIngredients: []
  }),
  getters: {
    pizzaPrice: (state) => {
      const dataStore = useDataStore()
      const dough = dataStore.dataById('dough', state.doughId)
      const sauce = dataStore.dataById('sauces', state.sauceId)
      const size = dataStore.dataById('sizes', state.sizeId)

      if (!dough) return 0
      if (!sauce) return 0
      if (!state.pizzaIngredients) return 0
      if (!size?.multiplier) return 0

      const basePrice = dough.price + sauce.price
      const ingredientsPrice = state.pizzaIngredients.reduce((acc, ing) => {
        const ingredient = dataStore.dataById('ingredients', ing.id)
        return acc + (ingredient ? ingredient.price * ing.quantity : 0)
      }, 0)

      return size.multiplier * (basePrice + ingredientsPrice)
    },

    getIngredientQuantity:
      (state) =>
      (id: number): number => {
        return state.pizzaIngredients.find((i) => i.id === id)?.quantity || 0
      },

    ingredients: (state) => {
      const dataStore = useDataStore()
      return state.pizzaIngredients.map((i) => {
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
        this.pizzaIngredients = this.pizzaIngredients.filter((i) => i.id !== id)
        return
      }

      if (value > 3) return

      const ingredient = this.pizzaIngredients.find((i) => i.id === id)
      if (ingredient) {
        ingredient.quantity = value
      } else {
        this.pizzaIngredients.push({ id, quantity: value })
      }
    },

    incrementIngredient(id: number) {
      const ingredient = this.pizzaIngredients.find((i) => i.id === id)
      if (!ingredient) {
        this.pizzaIngredients.push({ id, quantity: 1 })
        return
      }

      if (ingredient.quantity >= 3) return
      ingredient.quantity++
    },

    decrementIngredient(id: number) {
      const index = this.pizzaIngredients.findIndex((i) => i.id === id)
      if (index === -1) return

      const ingredient = this.pizzaIngredients[index]
      if (ingredient.quantity <= 1) {
        this.pizzaIngredients.splice(index, 1)
        return
      }

      ingredient.quantity--
    },

    removeIngredient(id: number) {
      this.pizzaIngredients = this.pizzaIngredients.filter((i) => i.id !== id)
    },

    setDoughId(id: number) {
      this.doughId = id
    },

    setSizeId(id: number) {
      this.sizeId = id
    },

    setSauceId(id: number) {
      this.sauceId = id
    },

    setPizzaName(name: string) {
      this.pizzaName = name
    },

    resetPizzaName() {
      this.pizzaName = ''
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
        id: crypto.randomUUID(),
        name: this.pizzaName,
        doughId: this.doughId!,
        sauceId: this.sauceId!,
        sizeId: this.sizeId!,
        quantity: 1,
        ingredients: this.pizzaIngredients.map((i) => ({
          id: i.id,
          quantity: i.quantity
        })),
        price: this.pizzaPrice,
        total: this.pizzaPrice
      }
    },

    resetPizza() {
      this.$reset()
    }
  }
})
