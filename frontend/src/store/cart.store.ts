import { OrderAddressDto } from '@/common/types/address.types'
import { CartMisc, MiscDto } from '@/common/types/misc.types'
import { CartPizza } from '@/common/types/pizza.types'
import { defineStore } from 'pinia'

interface CartState {
  pizzas: CartPizza[]
  miscList: CartMisc[]
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
    miscList: [],
    address: null
  }),
  getters: {
    pizzasPrice: (state): number =>
      state.pizzas.reduce(
        (acc, pizza) => acc + pizza.price * pizza.quantity,
        0
      ),

    miscPrice: (state): number =>
      state.miscList.reduce((acc, item) => acc + item.price * item.quantity, 0),

    isEmpty: (state): boolean => state.pizzas.length === 0,

    pizzaFinalPrice: (state) => {
      return (pizzaId: string) => {
        const pizza = state.pizzas.find((p) => p.clientId === pizzaId)
        return pizza ? pizza.price * pizza.quantity : 0
      }
    },

    orderTotalPrice: (state): number => {
      const pizzasTotal = state.pizzas.reduce(
        (acc, pizza) => acc + pizza.price * pizza.quantity,
        0
      )
      const miscTotal = state.miscList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
      return pizzasTotal + miscTotal
    }
  },
  actions: {
    buildMiscListCart(miscDto: MiscDto[]) {
      this.miscList = miscDto.map((m) => {
        return {
          ...m,
          quantity: 0
        }
      })
    },

    addPizza(pizza: CartPizza) {
      this.pizzas.push(pizza)
    },

    setMisc(misc: CartMisc) {
      const index = this.miscList.findIndex((m) => m.id === misc.id)

      if (index === -1) {
        this.miscList.push(misc)
        return
      }

      this.miscList[index] = misc
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
    }
  }
})
