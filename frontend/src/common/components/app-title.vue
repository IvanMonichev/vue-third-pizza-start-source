<script setup lang="ts">
interface Props {
  type?: 'small' | 'big'
}

withDefaults(defineProps<Props>(), {
  type: 'big'
})
</script>

<template>
  <h1 class="title" :class="`title--${type}`"><slot /></h1>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: ds-colors.$black;

  &--big {
    @include ds-typography.b-s36-h42;
  }
}
</style>
