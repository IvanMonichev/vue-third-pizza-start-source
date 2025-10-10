export interface MiscResponse {
  id: number
  name: string
  price: number
  image: string
}

export interface MiscOrderResponse {
  id: number
  orderId: number
  miscId: number
  quantity: number
}

export interface MiscOrder {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export interface MiscCart extends Pick<MiscResponse, 'id'> {
  quantity: number
}

export interface MiscOrderCreate {
  miscId: number
  quantity: number
}
