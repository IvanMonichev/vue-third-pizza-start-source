import { User } from '@/common/types/user.types'
import { defineStore } from 'pinia'

interface ProfileState {
  user: User | null
}

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    user: null
  }),
  getters: {
    userId: (state) => state.user?.id,

    userImages: (state) => {
      if (!state.user) return null

      const basePath = state.user.avatar

      const [pathWithoutExt] = basePath.split(/\.(?=[^.]+$)/)

      return {
        jpg: `${pathWithoutExt}.jpg`,
        webp: `${pathWithoutExt}.webp`,
        jpg2x: `${pathWithoutExt}@2x.jpg`,
        webp2x: `${pathWithoutExt}@2x.webp`,
        jpg4x: `${pathWithoutExt}@4x.jpg`,
        webp4x: `${pathWithoutExt}@4x.webp`,
        all: [
          `${pathWithoutExt}.jpg`,
          `${pathWithoutExt}.webp`,
          `${pathWithoutExt}@2x.jpg`,
          `${pathWithoutExt}@2x.webp`,
          `${pathWithoutExt}@4x.jpg`,
          `${pathWithoutExt}@4x.webp`
        ]
      }
    }
  },
  actions: {
    setUser(user: User | null) {
      this.user = user
    }
  }
})
