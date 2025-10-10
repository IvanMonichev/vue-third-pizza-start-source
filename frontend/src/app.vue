<script setup lang="ts">
import { useAddressesQuery } from '@/api/addresses.api'
import { useDoughQuery } from '@/api/dough.api'
import { useIngredientsQuery } from '@/api/ingredients.api'
import { useOrdersQuery } from '@/api/orders.api'
import { useSaucesQuery } from '@/api/sauces.api'
import { useSizesQuery } from '@/api/sizes.api'
import AppLayout from '@/layouts/app-layout.vue'
import { useAddressStore, useDataStore, useProfileStore } from '@/store'
import { useAuthStore } from '@/store/auth.store'
import { computed, watch, watchEffect } from 'vue'
import { useAuthUser } from './api/auth.api'
import { tokenManager } from './services/token-manager'

const authStore = useAuthStore()
const profileStore = useProfileStore()
const dataStore = useDataStore()
const addressStore = useAddressStore()

// --- Пользователь
const { data: user, isLoading, isError } = useAuthUser()

// --- Основные данные (грузим всегда)
const { data: dough } = useDoughQuery()
const { data: sizes } = useSizesQuery()
const { data: ingredients } = useIngredientsQuery()
const { data: sauces } = useSaucesQuery()

const isUserReady = computed(() => !!user.value?.id)
// --- Адреса и заказы только если юзер есть
const { data: addresses } = useAddressesQuery({ enabled: isUserReady })
const { data: orders } = useOrdersQuery({ enabled: isUserReady })

watch(user, (newUser) => {
  if (newUser) {
    authStore.setAuth({ token: tokenManager.get()! })
    profileStore.setUser(newUser)
  } else if (!isLoading.value && isError.value) {
    authStore.clearAuth()
  }
})

watchEffect(() => {
  if (dough.value) dataStore.buildDough(dough.value)
  if (sauces.value) dataStore.buildSauces(sauces.value)
  if (sizes.value) dataStore.buildSizes(sizes.value)
  if (ingredients.value) dataStore.buildIngredients(ingredients.value)

  if (user.value) {
    if (addresses.value) {
      addressStore.buildAddresses(addresses.value, user.value.id)
    }
  }
})
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
