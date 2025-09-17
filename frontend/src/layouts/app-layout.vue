<script setup lang="ts">
import AppLayoutDefault from '@/layouts/app-layout-default.vue'
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Component } from 'vue'

const route = useRoute()
const layout = shallowRef<Component>(AppLayoutDefault)
const layouts = import.meta.glob<{ default: Component }>('./*.vue')

watch(
  () => route.meta,
  async (meta) => {
    try {
      const path = `./${meta.layout}.vue`
      const loader = layouts[path]
      if (meta.layout && loader) {
        const module = await loader()
        layout.value = module.default
      }
    } catch (e) {
      console.error(
        'Динамический шаблон не найден. Установлен шаблон по-умолчанию.',
        e
      )
      layout.value = AppLayoutDefault
    }
  }
)
</script>

<template>
  <component :is="layout"><slot /></component>
</template>

<style scoped lang="scss"></style>
