import { CartProduct } from '@/common/types/cart.types'
import { defineStore } from 'pinia'

interface State {
  products: CartProduct[]
}

export const useCartStore = defineStore('cart', {
  state: (): State => ({
    products: []
  }),
  getters: {},
  actions: {}
})
