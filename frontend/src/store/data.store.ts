import { Misc } from '@/common/types/order.types'
import {
  DoughDto,
  Ingredient,
  SaucesDto,
  SizeDto
} from '@/common/types/pizza.types'
import { defineStore } from 'pinia'

interface State {
  dough: DoughDto[]
  sauces: SaucesDto[]
  sizes: SizeDto[]
  ingredients: Ingredient[]
  misc: Misc[]
}

export const useDataStore = defineStore('data', {
  state: (): State => ({
    dough: [],
    sauces: [],
    sizes: [],
    ingredients: [],
    misc: []
  }),
  actions: {},
  getters: {}
})
