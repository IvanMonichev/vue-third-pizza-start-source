import {
  doughClassMap,
  ingredientClassMap,
  saucesClassMap
} from '@/common/constants/mappers.constants'
import { Dough } from '@/common/types/dough.types'
import { Ingredient } from '@/common/types/ingredient.types'
import { MiscDto } from '@/common/types/misc.types'
import { Sauce } from '@/common/types/sauce.types'
import { SizeDto } from '@/common/types/size.types'
import dough from '@/mocks/dough.json'
import ingredients from '@/mocks/ingredients.json'
import misc from '@/mocks/misc.json'
import sauces from '@/mocks/sauces.json'
import sizes from '@/mocks/sizes.json'
import { defineStore } from 'pinia'

interface DataState {
  dough: Dough[]
  sauces: Sauce[]
  sizes: SizeDto[]
  ingredients: Ingredient[]
  miscList: MiscDto[]
}

export const useDataStore = defineStore('data', {
  state: (): DataState => ({
    dough: [],
    sauces: [],
    sizes: [],
    ingredients: [],
    miscList: []
  }),
  getters: {
    dataById:
      (state) =>
      <T extends keyof DataState>(
        type: T,
        id: number | null
      ): DataState[T][number] | null => {
        if (id === null) return null
        return state[type].find((item) => item.id === id) ?? null
      }
  },
  actions: {
    loadDough() {
      this.dough = dough.map((d) => ({ ...d, className: doughClassMap[d.id] }))
    },
    loadSauces() {
      this.sauces = sauces.map((s) => ({
        ...s,
        className: saucesClassMap[s.id]
      }))
    },
    loadSizes() {
      this.sizes = sizes
    },
    loadIngredients() {
      this.ingredients = ingredients.map((i) => ({
        ...i,
        className: ingredientClassMap[i.id]
      }))
    },
    loadMiscList() {
      this.miscList = misc
    }
  }
})
