<script setup lang="ts"></script>

<template>
  <ul class="additional-list">
    <slot />
  </ul>
</template>

<style scoped lang="scss">
@use '@/assets/sass/mixins/m_clear-list';

.additional-list {
  @include m_clear-list.clear-list;

  display: flex;
  flex-wrap: wrap;
}
</style>
