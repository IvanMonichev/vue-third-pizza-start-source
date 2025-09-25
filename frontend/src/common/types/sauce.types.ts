export interface SauceDto {
  id: number
  name: string
  price: number
}

export interface Sauce extends SauceDto {
  className: string
}
