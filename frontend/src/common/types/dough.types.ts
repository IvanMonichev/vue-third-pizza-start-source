import { DoughSize } from '@/common/enums/dough-size.enum'

export interface DoughDto {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export interface PizzaDough extends DoughDto {
  value: DoughSize
}
