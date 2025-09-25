import { DoughDto } from '@/common/types/dough.types'
import { Ingredient } from '@/common/types/ingredient.types'
import { MiscDto } from '@/common/types/misc.types'
import { SaucesDto } from '@/common/types/sauces.types'
import { SizeDto } from '@/common/types/size.types'
import { defineStore } from 'pinia'
import dough from '@/mocks/dough.json'
import sauces from '@/mocks/sauces.json'
import sizes from '@/mocks/sizes.json'
import ingredients from '@/mocks/ingredients.json'
import misc from '@/mocks/misc.json'
import { ingredientIdMap } from '@/common/constants/mappers.constants'

interface DataState {
  dough: DoughDto[]
  sauces: SaucesDto[]
  sizes: SizeDto[]
  ingredients: Ingredient[]
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
      this.dough = dough
    },
    loadSauces() {
      this.sauces = sauces
    },
    loadSizes() {
      this.sizes = sizes
    },
    loadIngredients() {
      this.ingredients = ingredients.map((i) => ({
        ...i,
        type: ingredientIdMap[i.id]
      }))
    },
    loadMisc() {
      this.misc = misc
    }
  }
})
