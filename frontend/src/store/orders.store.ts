import { AddressMode } from '@/common/enums/address-mode.enum'
import type { Ingredient } from '@/common/types/ingredient.types'
import type { Misc } from '@/common/types/misc.types'
import type { Order, OrderResponse } from '@/common/types/order.types'
import type { PizzaOrder } from '@/common/types/pizza.types'
import {
  calculateOrderTotal,
  calculatePizzaPrice
} from '@/common/utils/price.utils'
import { useCartStore } from '@/store/cart.store'
import { useDataStore } from '@/store/data.store'
import { defineStore } from 'pinia'

interface OrdersState {
  orders: Order[]
}

export const useOrdersStore = defineStore('orders', {
  state: (): OrdersState => ({
    orders: []
  }),

  getters: {
    ordersList: (state) => state.orders
  },

  actions: {
    buildOrders(orderResponses: OrderResponse[], userId: string) {
      const userOrders = orderResponses
        .filter((o) => o.userId === userId)
        .sort((a, b) => b.id - a.id)
      const dataStore = useDataStore()

      this.orders = userOrders.map<Order>((order) => {
        const pizzas: PizzaOrder[] =
          order.orderPizzas
            ?.map((p): PizzaOrder | null => {
              const sauce = dataStore.dataById('sauces', p.sauceId)
              const dough = dataStore.dataById('doughList', p.doughId)
              const size = dataStore.dataById('sizes', p.sizeId)

              if (!dough || !sauce || !size) return null

              const ingredients =
                p.ingredients
                  ?.map((i) => {
                    const dataIngredient = dataStore.dataById(
                      'ingredients',
                      i.ingredientId
                    )

                    return dataIngredient
                      ? { ...dataIngredient, quantity: i.quantity }
                      : null
                  })
                  .filter((i): i is Ingredient => Boolean(i)) ?? []

              const price = calculatePizzaPrice(
                dough.price,
                sauce.price,
                size.multiplier,
                ingredients
              )

              return {
                id: p.id,
                quantity: p.quantity,
                price: price,
                name: p.name,
                sauce: sauce,
                dough: dough,
                size: size,
                ingredients: ingredients
              }
            })
            .filter((p): p is PizzaOrder => Boolean(p)) ?? []

        const misc: Misc[] =
          order.orderMisc
            ?.map((m) => {
              const miscItem = dataStore.dataById('miscList', m.miscId)
              if (!miscItem) return null
              return {
                id: miscItem.id,
                name: miscItem.name,
                price: miscItem.price,
                image: miscItem.image,
                quantity: m.quantity
              }
            })
            .filter((m): m is Misc => Boolean(m)) ?? []

        const price = calculateOrderTotal(pizzas, misc)

        return {
          id: order.id,
          name: `Заказ #${order.id}`,
          price: price,
          pizzas: pizzas,
          miscList: misc,
          address: order.orderAddress ?? null
        }
      })
    },

    buildOrderToCart(orderId: number) {
      const order = this.orders.find((o) => o.id === orderId)

      if (!order) throw new Error(`Order with id ${orderId} is not found`)

      const cartStore = useCartStore()

      cartStore.resetStore()

      for (const pizza of order.pizzas) {
        cartStore.savePizza({
          pizzaId: String(pizza.id),
          name: pizza.name,
          price: pizza.price,
          quantity: pizza.quantity,
          doughId: pizza.dough.id,
          sauceId: pizza.sauce.id,
          sizeId: pizza.size.id,
          ingredients: pizza.ingredients.map((i) => ({
            id: i.id,
            quantity: i.quantity
          }))
        })
      }

      for (const misc of order.miscList) {
        cartStore.setMisc({
          id: misc.id,
          quantity: misc.quantity
        })
      }

      if (order.address) {
        cartStore.setAddress({
          ...order.address,
          addressMode: AddressMode.VIEW
        })
      }
    },

    clearOrders() {
      this.orders = []
    }
  }
})
