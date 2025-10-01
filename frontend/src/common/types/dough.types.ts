export interface DoughDto {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export interface Dough extends DoughDto {
  className: string
}
