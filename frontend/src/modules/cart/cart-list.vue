<script setup lang="ts"></script>

<template>
  <ul class="cart-list sheet">
    <slot />
  </ul>
</template>

<style scoped lang="scss">
@use '@/assets/sass/mixins/m_clear-list';

.cart-list {
  @include m_clear-list.clear-list;

  padding: 15px 0;
}
</style>
