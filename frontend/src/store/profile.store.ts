import { Address } from '@/common/types/address.types'
import { ProfileOrder } from '@/common/types/order.types'
import { User } from '@/common/types/user.types'
import { defineStore } from 'pinia'

interface ProfileState {
  user: User | null
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
    userId: (state) => state.user?.id,

    userImages: (state) => {
      if (!state.user?.avatar) return null

      const basePath = state.user.avatar

      const [pathWithoutExt] = basePath.split(/\.(?=[^.]+$)/)

      return {
        jpg: `${pathWithoutExt}.jpg`,
        webp: `${pathWithoutExt}.webp`,
        jpg2x: `${pathWithoutExt}@2x.jpg`,
        webp2x: `${pathWithoutExt}@2x.webp`,
        jpg4x: `${pathWithoutExt}@4x.jpg`,
        webp4x: `${pathWithoutExt}@4x.webp`,
        all: [
          `${pathWithoutExt}.jpg`,
          `${pathWithoutExt}.webp`,
          `${pathWithoutExt}@2x.jpg`,
          `${pathWithoutExt}@2x.webp`,
          `${pathWithoutExt}@4x.jpg`,
          `${pathWithoutExt}@4x.webp`
        ]
      }
    },

    hasAddresses: (state) => state.addresses.length > 0,
    hasOrders: (state) => state.orders.length > 0,
    lastOrder: (state) => state.orders.at(-1) ?? null,
    totalSpent: (state) =>
      state.orders.reduce((acc, order) => acc + order.total, 0)
  },
  actions: {
    setUser(payload: { user: User | null }) {
      this.user = payload.user
    },

    setAddresses(payload: { addresses: Address[] }) {
      this.addresses = payload.addresses
    },

    clearProfile() {
      this.user = null
      this.addresses = []
      this.orders = []
    }
  }
})
