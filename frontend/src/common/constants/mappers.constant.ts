import { DoughSize } from '@/common/enums/dough-size.enum'

export const doughSizeMap: Record<DoughSize, string> = {
  [DoughSize.LIGHT]: 'light',
  [DoughSize.LARGE]: 'large'
} as const
