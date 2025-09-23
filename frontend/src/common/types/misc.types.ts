export interface MiscDto {
  id: number
  name: string
  price: number
  image: string
}

export interface OrderMiscDto {
  id: number
  orderId: number
  miscId: number
  quantity: number
}

export interface CartMisc extends MiscDto {
  quantity: number
}
