import { AddressMode } from '@/common/enums/address-mode.enum'

export interface AddressResponse {
  id: number
  name: string
  userId: string
  street: string
  building: string
  flat?: string
  comment?: string
}

export type AddressCreate = Omit<AddressResponse, 'id'>
export type AddressUpdate = AddressResponse

export type AddressOrderCreate = Omit<AddressResponse, 'id' | 'name' | 'userId'>

export interface Address extends Omit<AddressResponse, 'id'> {
  id: string | number
  addressMode: AddressMode
}
