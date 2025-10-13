<script setup lang="ts">
interface Props {
  variant?: 'default' | 'transparent' | 'border' | 'text'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'button',
  disabled: false
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="props.type || 'button'"
    class="button"
    :class="`button--${props.variant}`"
    :disabled="props.disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/ds-system/ds-typography';

.button {
  @include ds-typography.b-s18-h21;
  font-family: inherit;
  display: block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  border-radius: 8px;
  outline: none;

  // Общие стили для всех
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  // 🔹 Вариант по умолчанию
  &--default {
    color: ds-colors.$white;
    border: none;
    box-shadow: ds-shadows.$shadow-medium;
    background-color: ds-colors.$green-500;

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$green-400;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$green-600;
    }

    &:focus:not(:disabled) {
      opacity: 0.5;
    }

    &:disabled {
      background-color: ds-colors.$green-300;
      color: rgba(ds-colors.$white, 0.2);
    }
  }

  &--border {
    background-color: transparent;
    border: 1px solid ds-colors.$green-500;
    color: ds-colors.$black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: ds-colors.$green-500;
      border-color: ds-colors.$green-500;
    }

    &:active:not(:disabled) {
      color: ds-colors.$green-600;
      border-color: ds-colors.$green-600;
    }
  }

  &--transparent {
    @include ds-typography.b-s14-h16;
    background-color: transparent;
    box-shadow: none;
    color: ds-colors.$black;

    &:hover:not(:active):not(:disabled) {
      color: ds-colors.$red-800;
    }

    &:active:not(:disabled) {
      color: ds-colors.$red-900;
    }

    &:disabled {
      opacity: 0.25;
    }
  }

  &--text {
    @include ds-typography.l-s11-h13;
    background-color: transparent;
    color: ds-colors.$black;
    border: none;

    &:hover {
      color: ds-colors.$green-500;
    }

    &:active {
      color: ds-colors.$green-600;
    }

    &:focus {
      color: ds-colors.$green-400;
    }
  }

  &--arrow {
    &::before {
      content: '';
      background-image: url('@/assets/img/button-arrow.svg');
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }

  &--white {
    background-color: ds-colors.$white;
    color: ds-colors.$green-500;
  }
}
</style>
