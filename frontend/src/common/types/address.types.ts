import { AddressMode } from '@/common/enums/address-mode.enum'

export interface Address {
  id: number
  name: string
  userId: string
  street: string
  building: string
  flat?: string
  comment?: string
}

export type AddressCreate = Omit<Address, 'id'>
export type AddressUpdate = Address

export type AddressOrderCreate = Omit<Address, 'id' | 'name' | 'userId'>

export interface AddressProfile extends Omit<Address, 'id'> {
  id: string | number
  addressMode: AddressMode
}
