import { AddressMode } from '@/common/enums/address-mode.enum'
import { Address, AddressResponse } from '@/common/types/address.types'
import { defineStore } from 'pinia'

interface AddressState {
  addresses: Address[]
}

export const useAddressStore = defineStore('address', {
  state: (): AddressState => ({
    addresses: []
  }),

  getters: {
    addressesWithoutAddMode: (state) => {
      return state.addresses.filter((a) => a.addressMode !== AddressMode.ADD)
    },

    addressesFull: (state) => state.addresses
  },

  actions: {
    buildAddresses(addresses: AddressResponse[], userId: string) {
      const userAddresses = addresses.filter((a) => a.userId === userId)
      this.addresses = userAddresses.map((a) => {
        return {
          ...a,
          addressMode: AddressMode.VIEW
        }
      })
    },

    setAddressMode(addressId: number, mode: AddressMode) {
      this.addresses = this.addresses.map((a) => ({
        ...a,
        addressMode: a.id === addressId ? mode : a.addressMode
      }))
    },

    addNewAddress(userId: string) {
      const hasNewAddress = this.addresses.some(
        (a) => a.addressMode === AddressMode.ADD
      )

      if (hasNewAddress) return

      const address: Address = {
        id: 'new-address',
        name: '',
        userId: userId,
        flat: '',
        addressMode: AddressMode.ADD,
        building: '',
        street: ''
      }
      this.addresses.push(address)
    },

    removeAddress(addressId: string) {
      this.addresses = this.addresses.filter((i) => i.id !== addressId)
    }
  }
})
