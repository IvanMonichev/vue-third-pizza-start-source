import {
  calculateOrderTotal,
  calculatePizzaPrice
} from '@/common/utils/price.utils'

describe('calculatePizzaPrice', () => {
  it('calculates total pizza price correctly', () => {
    const result = calculatePizzaPrice(100, 50, 1.5, [
      { price: 30, quantity: 2 },
      { price: 20, quantity: 1 }
    ])
    expect(result).toBe(345)
  })

  it('returns correct base price when ingredients array is empty', () => {
    const result = calculatePizzaPrice(100, 50, 1.5, [])
    expect(result).toBe(225)
  })
})

describe('calculateOrderTotal', () => {
  it('calculates total price for pizzas and misc correctly', () => {
    const pizzas = [
      { price: 400, quantity: 2 },
      { price: 500, quantity: 1 }
    ]
    const misc = [
      { price: 100, quantity: 3 },
      { price: 150, quantity: 1 }
    ]

    const total = calculateOrderTotal(pizzas, misc)
    expect(total).toBe(1750)
  })

  it('returns 0 if both arrays are empty', () => {
    const total = calculateOrderTotal([], [])
    expect(total).toBe(0)
  })

  it('returns total for pizzas only', () => {
    const pizzas = [
      { id: 1, name: 'Veggie', price: 300, quantity: 2 },
      { id: 2, name: 'Hawaiian', price: 450, quantity: 1 }
    ]
    const total = calculateOrderTotal(pizzas, [])
    expect(total).toBe(1050)
  })

  it('returns total for misc only', () => {
    const misc = [
      { id: 1, name: 'Juice', price: 120, quantity: 2 },
      { id: 2, name: 'Ketchup', price: 30, quantity: 3 }
    ]
    const total = calculateOrderTotal([], misc)
    expect(total).toBe(330)
  })
})
