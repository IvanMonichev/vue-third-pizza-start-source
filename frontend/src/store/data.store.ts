import {
  doughClassMap,
  saucesClassMap
} from '@/common/constants/mappers.constants'
import { Dough, DoughUi } from '@/common/types/dough.types'
import { Ingredient, IngredientUi } from '@/common/types/ingredient.types'
import { Misc } from '@/common/types/misc.types'
import { Sauce, SauceUi } from '@/common/types/sauce.types'
import { Size } from '@/common/types/size.types'
import { defineStore } from 'pinia'

interface DataState {
  doughList: DoughUi[]
  sauces: SauceUi[]
  sizes: Size[]
  ingredients: IngredientUi[]
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
    buildDough(doughDto: Dough[]) {
      this.doughList = doughDto.map((d) => ({
        ...d,
        className: doughClassMap[d.id]
      }))
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

    buildIngredients(ingredientsDto: Ingredient[]) {
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
          className
        }
      })
    },

    buildMisc(miscDto: Misc[]) {
      this.miscList = miscDto
    }
  }
})
