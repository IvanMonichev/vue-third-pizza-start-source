import { ingredientClassMap } from '@/common/constants/mappers.constants'
import { Ingredient, IngredientDto } from '@/common/types/ingredient.types'
import { CartPizza } from '@/common/types/pizza.types'
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
    pizzaPrice: (state) => () => {
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
    }
  },
  actions: {
    buildIngredients(ingredientsDto: IngredientDto[]) {
      this.ingredients = ingredientsDto.map((i) => ({
        ...i,
        className: ingredientClassMap[i.id],
        quantity: 0
      }))
    },

    incrementIngredient(id: number) {
      const index = this.ingredients.findIndex((i) => i.id === id)
      if (index === -1) {
        throw new Error(`Ingredient with id ${id} not found`)
      }
      const foundIngredient = this.ingredients[index]
      if (foundIngredient.quantity > 3) {
        throw new Error('The quantity of ingredients must be more than 3')
      }

      this.ingredients[index].quantity++
    },

    setIngredient(ingredient: Ingredient) {
      const index = this.ingredients.findIndex((i) => i.id === ingredient.id)
      if (index === -1) {
        throw new Error(`Ingredient with id ${ingredient.id} not found`)
      }
      this.ingredients[index] = ingredient
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
