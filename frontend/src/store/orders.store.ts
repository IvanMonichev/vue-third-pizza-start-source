import { Ingredient } from '@/common/types/ingredient.types'
import type { Misc } from '@/common/types/misc.types'
import type { Order, OrderResponse } from '@/common/types/order.types'
import type { PizzaOrder } from '@/common/types/pizza.types'
import {
  calculateOrderTotal,
  calculatePizzaPrice
} from '@/common/utils/price.utils'
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
      const userOrders = orderResponses.filter((o) => o.userId === userId)
      const dataStore = useDataStore()

      this.orders = userOrders.map((order) => {
        const pizzas: PizzaOrder[] =
          order.orderPizzas
            .map((p): PizzaOrder | null => {
              const sauce = dataStore.dataById('sauces', p.sauceId)
              const dough = dataStore.dataById('doughList', p.doughId)
              const size = dataStore.dataById('sizes', p.sizeId)

              if (!dough || !sauce || !size) return null

              const ingredients =
                p.ingredients
                  ?.map((i) =>
                    dataStore.dataById('ingredients', i.ingredientId)
                  )
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
          addressId: order.addressId,
          name: `Заказ #${order.id}`,
          price: price,
          pizzas: pizzas,
          miscList: misc,
          address: order.orderAddress
        }
      })
    },

    clearOrders() {
      this.orders = []
    }
  }
})
