export type SaucesType = 'tomato' | 'creamy'

export interface SaucesDto {
  id: number
  name: string
  price: number
}

export interface PizzaSauces extends SaucesDto {
  value: SaucesType
}
