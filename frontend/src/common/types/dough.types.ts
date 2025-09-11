import { DoughSize } from '@/common/enums/dough-size.enum'

export interface Dough {
  id: number
  name: string
  image: string
  description: string
  price: number
  size: DoughSize
}
