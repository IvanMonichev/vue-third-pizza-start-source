<script setup lang="ts">
interface Props {
  to: string
  theme?: 'white' | 'black'
}

const { theme, to } = withDefaults(defineProps<Props>(), {
  theme: 'black'
})
</script>

<template>
  <RouterLink :to="to" :class="['close', `close--${theme}`]">
    <span class="visually-hidden">Закрыть форму авторизации</span>
  </RouterLink>
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
