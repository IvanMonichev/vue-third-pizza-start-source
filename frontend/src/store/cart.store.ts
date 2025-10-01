import { DeliveryType } from '@/common/enums/delivery-type.enum'
import { AddressForm, OrderAddressDto } from '@/common/types/address.types'
import { MiscCart } from '@/common/types/misc.types'
import { CartPizza } from '@/common/types/pizza.types'
import { useDataStore } from '@/store/data.store'
import { defineStore } from 'pinia'

interface CartState {
  pizzas: CartPizza[]
  miscCartList: MiscCart[]
  address: OrderAddressDto | null
  addressForm: AddressForm
  isOrderSuccess: boolean
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    pizzas: [],
    miscCartList: [],
    address: null,
    addressForm: {
      deliveryType: DeliveryType.PICK_UP,
      phone: ''
    },
    isOrderSuccess: true
  }),
  getters: {
    pizzasPrice: (state): number =>
      state.pizzas.reduce(
        (acc, pizza) => acc + pizza.price * pizza.quantity,
        0
      ),

    pizzaTotalPrice: (state) => {
      return (pizzaId: string) => {
        const pizza = state.pizzas.find((p) => p.pizzaId === pizzaId)
        return pizza ? pizza.price * pizza.quantity : 0
      }
    },

    miscTotalPrice: (state) => {
      return (miscId: number) => {
        const dataStore = useDataStore()
        const miscCart = state.miscCartList.find((m) => m.id === miscId)
        const miscData = dataStore.miscList.find((m) => m.id === miscId)

        return miscCart && miscData ? miscCart.quantity * miscData.price : 0
      }
    },

    orderTotalPrice: (state): number => {
      const dataStore = useDataStore()

      // Общая цена всех пицц
      const pizzasTotalPrice = state.pizzas.reduce(
        (acc, pizza) => acc + pizza.price * pizza.quantity,
        0
      )

      // Общая цена всех доп. продуктов
      const miscListTotalPrice = state.miscCartList.reduce((acc, miscCart) => {
        const miscData = dataStore.miscList.find((m) => m.id === miscCart.id)
        return acc + (miscData ? miscCart.quantity * miscData.price : 0)
      }, 0)

      return pizzasTotalPrice + miscListTotalPrice
    },

    pizzaById: (state) => {
      return (pizzaId: string) => {
        if (!pizzaId) return null
        return state.pizzas.find((p) => p.pizzaId === pizzaId) || null
      }
    }
  },
  actions: {
    savePizza(pizza: CartPizza) {
      const index = this.pizzas.findIndex((p) => p.pizzaId === pizza.pizzaId)

      if (index === -1) {
        this.pizzas.push(pizza)
      } else {
        this.pizzas[index] = pizza
      }
    },

    setMisc(misc: MiscCart) {
      const index = this.miscCartList.findIndex((m) => m.id === misc.id)

      if (index === -1) {
        this.miscCartList.push(misc)
        return
      }

      this.miscCartList[index] = misc
    },

    incrementCartPizza(pizzaId: string) {
      const index = this.pizzas.findIndex((p) => p.pizzaId === pizzaId)
      if (index === -1) return

      this.pizzas[index].quantity++
    },

    decrementCartPizza(pizzaId: string) {
      const index = this.pizzas.findIndex((p) => p.pizzaId === pizzaId)
      if (index === -1) return

      if (this.pizzas[index].quantity > 1) {
        this.pizzas[index].quantity--
      } else {
        this.pizzas.splice(index, 1)
      }
    },

    setCartPizzaQuantity(pizzaId: string, quantity: number) {
      const index = this.pizzas.findIndex((p) => p.pizzaId === pizzaId)
      if (index !== -1) {
        if (quantity <= 0) {
          this.pizzas.splice(index, 1)
        } else {
          this.pizzas[index].quantity = quantity
        }
      }
    },

    incrementMisc(miscId: number) {
      const index = this.miscCartList.findIndex((m) => m.id === miscId)

      if (index === -1) {
        this.miscCartList.push({ id: miscId, quantity: 1 })
        return
      }

      this.miscCartList[index].quantity++
    },

    decrementMisc(miscId: number) {
      const index = this.miscCartList.findIndex((m) => m.id === miscId)
      if (index === -1) return

      if (this.miscCartList[index].quantity > 1) {
        this.miscCartList[index].quantity--
      } else {
        this.miscCartList.splice(index, 1)
      }
    },

    setMiscQuantity(miscId: number, quantity: number) {
      const index = this.miscCartList.findIndex((m) => m.id === miscId)

      if (index === -1) {
        if (quantity > 0) {
          this.miscCartList.push({ id: miscId, quantity })
        }
        return
      }

      if (quantity <= 0) {
        this.miscCartList.splice(index, 1)
      } else {
        this.miscCartList[index].quantity = quantity
      }
    },

    setDeliveryType(type: DeliveryType) {
      this.addressForm.deliveryType = type

      // при переключении можно сбрасывать адрес
      if (type === DeliveryType.PICK_UP) {
        this.addressForm = {
          deliveryType: DeliveryType.PICK_UP,
          phone: this.addressForm.phone
        }
      }

      if (type === DeliveryType.NEW_ADDRESS) {
        this.addressForm = {
          deliveryType: DeliveryType.NEW_ADDRESS,
          phone: this.addressForm.phone,
          street: '',
          house: '',
          apartment: ''
        }
      }

      if (type === DeliveryType.SAVED_ADDRESS) {
        this.addressForm = {
          deliveryType: DeliveryType.SAVED_ADDRESS,
          phone: this.addressForm.phone
        }
      }
    },

    updateAddressForm(payload: Partial<AddressForm>) {
      this.addressForm = { ...this.addressForm, ...payload }
    },

    setIsOrderSuccess(isOrderSuccess: boolean) {
      this.isOrderSuccess = isOrderSuccess
    },

    resetStore() {
      this.$reset()
    }
  }
})
