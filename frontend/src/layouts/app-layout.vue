<script setup lang="ts">
import AppLayoutDefault from '@/layouts/app-layout-default.vue'
import type { Component } from 'vue'
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = shallowRef<Component | null>(null)

const layouts = import.meta.glob<{ default: Component }>('./*.vue')
watch(
  () => route.meta,
  async (meta) => {
    try {
      if (meta.layout) {
        const path = `./${meta.layout}.vue`
        const loader = layouts[path]
        if (loader) {
          const module = await loader()
          layout.value = module.default
        } else {
          layout.value = AppLayoutDefault
        }
      } else {
        layout.value = AppLayoutDefault
      }
    } catch (e) {
      console.error('Ошибка при загрузке layout. Ставлю дефолт.', e)
      layout.value = AppLayoutDefault
    }
  },
  { immediate: true }
)
</script>

<template>
  <component :is="layout"><slot /></component>
</template>

<style scoped lang="scss"></style>
