export interface Dough {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export interface DoughUi extends Dough {
  className: string
}
