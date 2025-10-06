export interface Sauce {
  id: number
  name: string
  price: number
}

export interface SauceUi extends Sauce {
  className: string
}
