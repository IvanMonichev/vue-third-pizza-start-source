<script setup lang="ts">
import { useAddressesQuery } from '@/api/addresses.api'
import { useDoughQuery } from '@/api/dough.api'
import { useIngredientsQuery } from '@/api/ingredients.api'
import { useMiscQuery } from '@/api/misc.api'
import { useOrdersQuery } from '@/api/orders.api'
import { useSaucesQuery } from '@/api/sauces.api'
import { useSizesQuery } from '@/api/sizes.api'
import AppLayout from '@/layouts/app-layout.vue'
import {
  useAddressStore,
  useDataStore,
  useOrdersStore,
  useProfileStore
} from '@/store'
import { useAuthStore } from '@/store/auth.store'
import { computed, watchEffect } from 'vue'
import { useAuthUser } from './api/auth.api'
import { tokenManager } from './services/token-manager'

const authStore = useAuthStore()
const profileStore = useProfileStore()
const dataStore = useDataStore()
const addressStore = useAddressStore()
const ordersStore = useOrdersStore()

// --- Пользователь
const { data: user, isError } = useAuthUser()

// --- Основные данные (грузим всегда)
const { data: dough } = useDoughQuery()
const { data: sizes } = useSizesQuery()
const { data: ingredients } = useIngredientsQuery()
const { data: sauces } = useSaucesQuery()
const { data: misc } = useMiscQuery()

const isUserReady = computed(() => !!user.value?.id)
// --- Адреса и заказы только если юзер есть
const { data: addresses } = useAddressesQuery({ enabled: isUserReady })
const { data: orders } = useOrdersQuery({ enabled: isUserReady })

watchEffect(() => {
  console.log('user', user.value)
  if (user.value) {
    authStore.setAuth({ token: tokenManager.get()! })
    profileStore.setUser(user.value)
  } else if (isError.value) {
    authStore.clearAuth()
  }
})

watchEffect(() => {
  if (dough.value) dataStore.buildDough(dough.value)
  if (sauces.value) dataStore.buildSauces(sauces.value)
  if (sizes.value) dataStore.buildSizes(sizes.value)
  if (ingredients.value) dataStore.buildIngredients(ingredients.value)
  if (misc.value) dataStore.buildMisc(misc.value)

  if (user.value) {
    if (addresses.value) {
      addressStore.buildAddresses(addresses.value, user.value.id)
    }

    if (orders.value) {
      ordersStore.buildOrders(orders.value, user.value.id)
    }
  }
})
</script>

<template>
  <AppLayout>
    <RouterView v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <Component :is="Component" />
      </transition>
    </RouterView>
  </AppLayout>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>
