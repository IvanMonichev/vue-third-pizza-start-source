export interface DoughResponse {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export interface Dough extends DoughResponse {
  className: string
}
