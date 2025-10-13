<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <transition name="slide" mode="out-in" appear>
    <div :key="route.fullPath" class="layout-content"><slot></slot></div>
  </transition>
</template>

<style scoped lang="scss">
.layout-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
  will-change: transform, opacity;
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
