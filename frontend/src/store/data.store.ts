import { saucesClassMap } from '@/common/constants/mappers.constants'
import { Dough } from '@/common/types/dough.types'
import { Ingredient } from '@/common/types/ingredient.types'
import { Misc } from '@/common/types/misc.types'
import { Sauce, SauceUi } from '@/common/types/sauce.types'
import { Size } from '@/common/types/size.types'
import { defineStore } from 'pinia'

interface DataState {
  doughList: Dough[]
  sauces: SauceUi[]
  sizes: Size[]
  ingredients: Ingredient[]
  miscList: Misc[]
}

export const useDataStore = defineStore('data', {
  state: (): DataState => ({
    doughList: [],
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
    buildDough(doughList: Dough[]) {
      this.doughList = doughList
    },

    buildSauces(saucesDto: Sauce[]) {
      this.sauces = saucesDto.map((s) => ({
        ...s,
        className: saucesClassMap[s.id]
      }))
    },

    buildSizes(sizesDto: Size[]) {
      this.sizes = sizesDto
    },

    buildIngredients(ingredients: Ingredient[]) {
      this.ingredients = ingredients
    },

    buildMisc(miscDto: Misc[]) {
      this.miscList = miscDto
    }
  }
})
