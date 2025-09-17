<script setup lang="ts">
defineProps<{ title?: string; contentClass?: string }>()
</script>

<template>
  <div class="sheet">
    <h2 v-if="title" class="title title--small sheet__title">{{ title }}</h2>
    <div :class="['sheet__content', contentClass]">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/ds-system/ds-typography';

.sheet {
  padding-top: 15px;

  border-radius: 8px;
  background-color: ds-colors.$white;
  box-shadow: ds-shadows.$shadow-light;
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: ds-colors.$black;

  &--big {
    @include ds-typography.b-s36-h42;
  }

  &--small {
    @include ds-typography.b-s18-h21;
  }
}
</style>
