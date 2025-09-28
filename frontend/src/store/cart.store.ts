import { OrderAddressDto } from '@/common/types/address.types'
import { MiscCart } from '@/common/types/misc.types'
import { CartPizza } from '@/common/types/pizza.types'
import { defineStore } from 'pinia'

interface CartState {
  pizzas: CartPizza[]
  miscList: MiscCart[]
  address: OrderAddressDto | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    pizzas: [
      {
        clientId: 'mock-pizza-1',
        name: 'Капричоза',
        sauceId: 1,
        sizeId: 1,
        doughId: 1,
        ingredientsPizza: [
          {
            id: 1,
            quantity: 2
          },
          {
            id: 2,
            quantity: 1
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
    addPizza(pizza: CartPizza) {
      this.pizzas.push(pizza)
    },

    setMisc(misc: MiscCart) {
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
    },

    incrementMisc(miscId: number) {
      const index = this.miscList.findIndex((m) => m.id === miscId)

      if (index === -1) {
        this.miscList.push({ id: miscId, quantity: 1 })
        return
      }

      this.miscList[index].quantity++
    },

    decrementMisc(miscId: number) {
      const index = this.miscList.findIndex((m) => m.id === miscId)
      if (index === -1) return

      if (this.miscList[index].quantity > 1) {
        this.miscList[index].quantity--
      } else {
        this.miscList.splice(index, 1)
      }
    },

    setMiscQuantity(miscId: number, quantity: number) {
      const index = this.miscList.findIndex((m) => m.id === miscId)

      if (index === -1) {
        if (quantity > 0) {
          this.miscList.push({ id: miscId, quantity })
        }
        return
      }

      if (quantity <= 0) {
        this.miscList.splice(index, 1)
      } else {
        this.miscList[index].quantity = quantity
      }
    }
  }
})
