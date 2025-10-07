import colaImg from '@/assets/img/cola.svg'
import potatoImg from '@/assets/img/potato.svg'
import sauceImg from '@/assets/img/sauce.svg'

export const sizeDiameterMap: Record<number, string> = {
  1: 'small',
  2: 'normal',
  3: 'big'
} as const

export const doughCartMap: Record<number, string> = {
  1: 'на тонком тесте',
  2: 'на толстом тесте'
} as const

export const saucesClassMap: Record<number, string> = {
  1: 'tomato',
  2: 'creamy'
} as const

export const miscImagesMap: Record<string, string> = {
  cola: colaImg,
  potato: potatoImg,
  sauce: sauceImg
}
