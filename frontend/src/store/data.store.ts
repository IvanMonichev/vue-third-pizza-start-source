import { PizzaDough } from '@/common/types/dough.types'
import { PizzaIngredient } from '@/common/types/ingredient.types'
import { MiscDto } from '@/common/types/misc.types'
import { PizzaSauces } from '@/common/types/sauces.types'
import { PizzaSize } from '@/common/types/size.types'
import { defineStore } from 'pinia'

interface DataState {
  dough: PizzaDough[]
  sauces: PizzaSauces[]
  sizes: PizzaSize[]
  ingredients: PizzaIngredient[]
  misc: MiscDto[]
}

export const useDataStore = defineStore('data', {
  state: (): DataState => ({
    dough: [],
    sauces: [],
    sizes: [],
    ingredients: [],
    misc: []
  }),
  getters: {
    getDoughById: (state) => (id: number) =>
      state.dough.find((d) => d.id === id),
    getSauceById: (state) => (id: number) =>
      state.sauces.find((s) => s.id === id),
    getSizeById: (state) => (id: number) =>
      state.sizes.find((sz) => sz.id === id),
    getIngredientById: (state) => (id: number) =>
      state.ingredients.find((i) => i.id === id),
    getMiscById: (state) => (id: number) => state.misc.find((m) => m.id === id)
  },
  actions: {}
})
