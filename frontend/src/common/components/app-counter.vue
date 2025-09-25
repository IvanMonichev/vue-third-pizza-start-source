<script setup lang="ts">
interface Props {
  count: number
  color?: 'orange' | 'green'
  extraClass?: string
}

const { extraClass, color } = defineProps<Props>()
const emit = defineEmits<{
  (e: 'increment'): void
  (e: 'decrement'): void
  (e: 'set-value', value: number): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = Number(target.value)

  if (Number.isNaN(value) || value < 0) {
    emit('set-value', 0)
  } else {
    emit('set-value', value)
  }
}
</script>

<template>
  <div :class="['counter', `counter--${color ?? 'green'}`, extraClass]">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="count <= 0"
      @click="emit('decrement')"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="count"
      @input="onInput"
    />
    <button
      type="button"
      :class="[
        'counter__button',
        'counter__button--plus',
        `counter__button--${color ?? 'green'}`
      ]"
      @click="emit('increment')"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/mixins/m_center';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/ds-system/ds-typography';

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: ds-colors.$purple-100;

    &::before {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: '';

      border-radius: 2px;
      background-color: ds-colors.$black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$purple-200;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: ds-shadows.$shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    &::before {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: '';

      border-radius: 2px;
      background-color: ds-colors.$white;
    }

    &::after {
      @include m_center.p_center-all;

      width: $size_icon;
      height: 2px;

      content: '';
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: ds-colors.$white;
    }

    &:focus:not(:disabled) {
      box-shadow: ds-shadows.$shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--green {
    background-color: ds-colors.$green-500;

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$green-400;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$green-600;
    }
  }

  &--orange {
    background-color: ds-colors.$orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$orange-100;
    }

    &:active:not(:disabled) {
      background-color: ds-colors.$orange-300;
    }
  }
}

.counter__input {
  @include ds-typography.r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: ds-colors.$black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset ds-shadows.$shadow-regular;
  }
}
</style>
