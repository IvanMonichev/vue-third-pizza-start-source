import { Pizza } from '@/common/types/pizza.types'
import { defineStore } from 'pinia'

interface PizzaState {
  currentPizza: Pizza
}

export const usePizzaStore = defineStore('pizza', {
  state: (): PizzaState => ({
    currentPizza: {
      name: '',
      sauceId: null,
      doughId: null,
      sizeId: null,
      ingredients: [],
      quantity: 1
    }
  }),
  getters: {},
  actions: {}
})
