import {
  Address,
  Misc,
  OrderAddress,
  OrderMisc
} from '@/common/types/order.types'
import { Pizza } from '@/common/types/pizza.types'
import { defineStore } from 'pinia'

interface CartState {
  pizzas: Pizza[]
  misc: OrderMisc[]
  address: OrderAddress | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    pizzas: [],
    misc: [],
    address: null
  }),
  getters: {},
  actions: {
    addPizza(pizza: Pizza) {
      this.pizzas.push(pizza)
    },
    removePizza(index: number) {
      this.pizzas.splice(index, 1)
    }
  }
})
