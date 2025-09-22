export interface AddressDto {
  id: number
  name: string
  userId: string
  street: string
  building: string
  flat: string
  comment: string
}

export type OrderAddressDto = AddressDto

export interface Address extends Pick<AddressDto, 'id'> {
  label: string
  fullAddress: string
}
