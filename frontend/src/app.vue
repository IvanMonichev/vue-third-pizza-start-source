<script setup lang="ts">
import AppLayout from '@/layouts/app-layout.vue'
import { useAuthStore } from '@/store/auth.store'
import { watch } from 'vue'
import { useAuthUser } from './api/auth.api'
import { tokenManager } from './services/token-manager'

const { data: user, isLoading, isError } = useAuthUser()

const authStore = useAuthStore()

watch(user, (newUser) => {
  if (newUser) {
    authStore.setAuth({
      user: newUser,
      token: tokenManager.get()!
    })
  } else if (!isLoading.value && isError.value) {
    authStore.clearAuth()
  }
})
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
