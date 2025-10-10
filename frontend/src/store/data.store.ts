import {
  doughClassMap,
  saucesClassMap
} from '@/common/constants/mappers.constants'
import { Dough, DoughResponse } from '@/common/types/dough.types'
import { Ingredient, IngredientResponse } from '@/common/types/ingredient.types'
import { Misc, MiscResponse } from '@/common/types/misc.types'
import { Sauce, SauceResponse } from '@/common/types/sauce.types'
import { Size } from '@/common/types/size.types'
import { defineStore } from 'pinia'

interface DataState {
  doughList: Dough[]
  sauces: Sauce[]
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
    buildDough(doughDto: DoughResponse[]) {
      this.doughList = doughDto.map((d) => ({
        ...d,
        className: doughClassMap[d.id]
      }))
    },

    buildSauces(saucesDto: SauceResponse[]) {
      this.sauces = saucesDto.map((s) => ({
        ...s,
        className: saucesClassMap[s.id]
      }))
    },

    buildSizes(sizesDto: Size[]) {
      this.sizes = sizesDto
    },

    buildIngredients(ingredientsDto: IngredientResponse[]) {
      this.ingredients = ingredientsDto.map((i) => {
        // Получаем имя ингредиента без расширения
        const className =
          i.image
            ?.split('/')
            .pop()
            ?.replace(/\.[^/.]+$/, '')
            ?.trim() ?? ''

        return {
          ...i,
          className,
          quantity: 0
        }
      })
    },

    buildMisc(miscDto: MiscResponse[]) {
      this.miscList = miscDto.map((m) => ({ ...m, quantity: 0 }))
    }
  }
})
