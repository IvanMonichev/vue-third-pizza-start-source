import { Address, AddressResponse } from '@/common/types/address.types'

export const buildFullAddress = (address: Address | AddressResponse) => {
  const parts = [address.street, address.building]
  if (address?.flat) parts.push(address.flat)
  return parts.join(', ')
}
