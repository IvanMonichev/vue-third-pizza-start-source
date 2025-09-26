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
    pizzas: [
      {
        id: 'mock-pizza-1',
        name: 'Капричоза',
        dough: {
          id: 1,
          name: 'Тонкое тесто',
          price: 200,
          className: '',
          image: ''
        },
        sauce: {
          id: 1,
          name: 'Томатный',
          price: 50,
          className: ''
        },
        size: {
          id: 1,
          name: '30 см',
          multiplier: 1,
          image: ''
        },
        ingredients: [
          {
            id: 1,
            name: 'Грибы',
            price: 40,
            image: '/img/ingredients/mushrooms.svg',
            className: 'mushrooms'
          },
          {
            id: 2,
            name: 'Ветчина',
            price: 60,
            image: '/img/ingredients/ham.svg',
            className: 'ham'
          },
          {
            id: 3,
            name: 'Пармезан',
            price: 70,
            image: '/img/ingredients/parmesan.svg',
            className: 'parmesan'
          }
        ],
        quantity: 1,
        price: 200 + 50 + (40 + 60 + 70) // = 420
      }
    ],
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

    isEmpty: (state): boolean => state.pizzas.length === 0,

    pizzaTotalPrice: (state) => {
      return (pizzaId: string) => {
        const pizza = state.pizzas.find((p) => p.clientId === pizzaId)
        return pizza ? pizza.price * pizza.quantity : 0
      }
    }
  },
  actions: {
    addPizza(pizza: CartPizza) {
      this.pizzas.push(pizza)
    },

    incrementCartPizza(pizzaId: string) {
      const index = this.pizzas.findIndex((p) => p.clientId === pizzaId)
      if (index === -1) return

      this.pizzas[index].quantity++
    },

    decrementCartPizza(pizzaId: string) {
      const index = this.pizzas.findIndex((p) => p.clientId === pizzaId)
      if (index === -1) return

      if (this.pizzas[index].quantity > 1) {
        this.pizzas[index].quantity--
      } else {
        this.pizzas.splice(index, 1)
      }
    },

    setCartPizzaQuantity(pizzaId: string, quantity: number) {
      const index = this.pizzas.findIndex((p) => p.clientId === pizzaId)
      if (index !== -1) {
        if (quantity <= 0) {
          this.pizzas.splice(index, 1)
        } else {
          this.pizzas[index].quantity = quantity
        }
      }
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
