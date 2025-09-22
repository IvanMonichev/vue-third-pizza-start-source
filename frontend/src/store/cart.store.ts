import { OrderAddress, OrderMisc } from '@/common/types/order.types'
import { PizzaDto } from '@/common/types/pizza.types'
import { defineStore } from 'pinia'

interface CartState {
  pizzas: PizzaDto[]
  misc: OrderMisc[]
  address: OrderAddress | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    pizzas: [],
    misc: [],
    address: null
  }),
  getters: {
    pizzasPrice: (state) => state.pizzas.reduce((acc, pizza) => acc + pi)
  },
  actions: {
    addPizza(pizza: PizzaDto) {
      this.pizzas.push(pizza)
    },
    removePizza(index: number) {
      this.pizzas.splice(index, 1)
    }
  }
})
