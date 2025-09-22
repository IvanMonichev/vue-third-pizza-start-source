import { OrderAddressDto } from '@/common/types/address.types'
import { CartMisc } from '@/common/types/misc.types'
import { CartPizza } from '@/common/types/pizza.types'
import { defineStore } from 'pinia'

interface CartState {
  pizzas: CartPizza[]
  misc: CartMisc[]
  address: OrderAddressDto | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    pizzas: [],
    misc: [],
    address: null
  }),
  getters: {
    pizzasPrice: (state): number =>
      state.pizzas.reduce(
        (acc, pizza) => acc + pizza.price * pizza.quantity,
        0
      ),
    miscPrice: (state): number =>
      state.misc.reduce((acc, item) => acc + item.price * item.quantity, 0),
    isEmpty: (state): boolean =>
      state.pizzas.length === 0 && state.misc.length === 0
  },
  actions: {
    addPizza(pizza: CartPizza) {
      this.pizzas.push(pizza)
    },
    removePizza(index: number) {
      this.pizzas.splice(index, 1)
    },
    addMisc(item: CartMisc) {
      const existing = this.misc.find((m) => m.id === item.id)
      if (existing) {
        existing.quantity += item.quantity
      } else {
        this.misc.push(item)
      }
    },
    updatePizzaQuantity(index: number, quantity: number) {
      if (this.pizzas[index]) {
        this.pizzas[index].quantity = quantity
      }
    },
    updateMiscQuantity(miscId: number, quantity: number) {
      const existing = this.misc.find((m) => m.id === miscId)
      if (existing) {
        existing.quantity = quantity
      }
    },
    clearCart() {
      this.pizzas = []
      this.misc = []
      this.address = null
    }
  }
})
