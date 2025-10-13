<script setup lang="ts"></script>

<template>
  <ul class="order__list">
    <slot></slot>
  </ul>
</template>

<style scoped lang="scss">
@use '@/assets/sass/mixins/m_clear-list';

.order__list {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}
</style>
