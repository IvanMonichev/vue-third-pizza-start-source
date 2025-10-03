import { Address } from '@/common/types/address.types'
import { ProfileOrder } from '@/common/types/order.types'
import { UserResponse } from '@/common/types/profile.types'
import { defineStore } from 'pinia'

interface ProfileState {
  user: UserResponse | null
  addresses: Address[]
  orders: ProfileOrder[]
}

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    user: null,
    addresses: [],
    orders: []
  }),
  getters: {
    hasAddresses: (state) => state.addresses.length > 0,
    hasOrders: (state) => state.orders.length > 0,
    lastOrder: (state) => state.orders.at(-1) ?? null,
    totalSpent: (state) =>
      state.orders.reduce((acc, order) => acc + order.total, 0)
  },
  actions: {
    clearProfile() {
      this.user = null
      this.addresses = []
      this.orders = []
    }
  }
})
