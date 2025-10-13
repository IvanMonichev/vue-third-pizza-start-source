<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

interface Props {
  to: RouteLocationRaw
  theme?: 'white' | 'black'
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'black'
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <router-link
    :to="props.to"
    :class="['close', `close--${props.theme}`]"
    @click="$emit('click', $event)"
  >
    <span class="visually-hidden">Закрыть форму авторизации</span>
  </router-link>
</template>
<style lang="scss" scoped>
@use '@/assets/sass/ds-system/ds-colors';
.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: '';

    border-radius: 2px;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: ds-colors.$orange-100;
    }
  }

  &--black {
    color: ds-colors.$black;

    &::before,
    &::after {
      background-color: ds-colors.$black;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: ds-colors.$white;
    }
  }
}
</style>
