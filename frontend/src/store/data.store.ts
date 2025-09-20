import { Misc } from '@/common/types/order.types'
import { Dough, Ingredient, Sauces, Size } from '@/common/types/pizza.types'
import { defineStore } from 'pinia'

interface State {
  dough: Dough[]
  sauces: Sauces[]
  sizes: Size[]
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
