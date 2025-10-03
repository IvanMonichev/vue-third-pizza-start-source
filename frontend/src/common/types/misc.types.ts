export interface Misc {
  id: number
  name: string
  price: number
  image: string
}

export interface MiscOrder {
  id: number
  orderId: number
  miscId: number
  quantity: number
}

export interface MiscCart extends Pick<Misc, 'id'> {
  quantity: number
}
