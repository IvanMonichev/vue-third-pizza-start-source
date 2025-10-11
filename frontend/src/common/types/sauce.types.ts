export interface SauceResponse {
  id: number
  name: string
  price: number
}

export interface Sauce extends SauceResponse {
  className: string
}
