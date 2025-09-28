export interface MiscDto {
  id: number
  name: string
  price: number
  image: string
}

export interface MiscOrderDto {
  id: number
  orderId: number
  miscId: number
  quantity: number
}

export interface MiscCart extends Pick<MiscDto, 'id'> {
  quantity: number
}
