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
  <transition name="slide" mode="out-in">
    <component :is="layout">
      <slot></slot>
    </component>
  </transition>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';

.app-layout {
  display: flex;
  flex-direction: column;

  min-width: 960px;
  min-height: 100vh;

  color: ds-colors.$black;
  background-color: ds-colors.$white;

  font-family: 'Roboto', Arial, sans-serif;
  font-size: 14px;
  line-height: 16px;

  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}

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
