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
import { computed, watch, watchEffect } from 'vue'
import { useAuthUser } from './api/auth.api'
import { tokenManager } from './services/token-manager'

const authStore = useAuthStore()
const profileStore = useProfileStore()
const dataStore = useDataStore()
const addressStore = useAddressStore()
const ordersStore = useOrdersStore()

// --- Пользователь
const { data: dataUser, isError, dataUpdatedAt } = useAuthUser()

// --- Основные данные (грузим всегда)
const { data: dough } = useDoughQuery()
const { data: sizes } = useSizesQuery()
const { data: ingredients } = useIngredientsQuery()
const { data: sauces } = useSaucesQuery()
const { data: misc } = useMiscQuery()

const isUserReady = computed(() => !!dataUser.value?.id)
// --- Адреса и заказы только если юзер есть
const { data: addresses } = useAddressesQuery({ enabled: isUserReady })
const { data: orders } = useOrdersQuery({ enabled: isUserReady })

watch(
  () => dataUpdatedAt.value,
  () => {
    const user = dataUser.value
    if (user) {
      authStore.setAuth({ token: tokenManager.get()! })
      profileStore.setUser(user)
    } else if (isError.value) {
      authStore.clearAuth()
    }
  },
  { immediate: true }
)
watchEffect(() => {
  if (dough.value) dataStore.buildDough(dough.value)
  if (sauces.value) dataStore.buildSauces(sauces.value)
  if (sizes.value) dataStore.buildSizes(sizes.value)
  if (ingredients.value) dataStore.buildIngredients(ingredients.value)
  if (misc.value) dataStore.buildMisc(misc.value)

  if (dataUser.value) {
    if (addresses.value) {
      addressStore.buildAddresses(addresses.value, dataUser.value.id)
    }

    if (orders.value) {
      ordersStore.buildOrders(orders.value, dataUser.value.id)
    }
  }
})
</script>

<template>
  <app-layout>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </app-layout>
</template>

<style scoped></style>
