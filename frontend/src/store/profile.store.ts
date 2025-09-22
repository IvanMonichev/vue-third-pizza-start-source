import { Address, OrderDto } from '@/common/types/order.types'
import { User } from '@/common/types/profile.types'
import { defineStore } from 'pinia'

interface ProfileState {
  user: User | null
  addresses: Address[]
  orders: OrderDto[]
}

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    user: null,
    addresses: [],
    orders: []
  }),
  getters: {},
  actions: {}
})
