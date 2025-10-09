<script setup lang="ts">
import type { Option } from '@/common/types/core.types'

interface Props {
  label: string
  name: string
  options: Option[]
  extraClass?: string
  error?: string
}

defineProps<Props>()
const modelValue = defineModel<string | number>()
</script>

<template>
  <label :class="['app-select', extraClass, { 'app-select--error': error }]">
    <span class="app-select__label">Получение заказа:</span>

    <select v-model="modelValue" name="test" class="app-select__field">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <span v-if="error" class="error">{{ error }}</span>
  </label>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/ds-system/ds-colors';

.app-select {
  display: flex;
  align-items: center;

  &__label {
    margin-right: 16px;
    @include ds-typography.b-s16-h19;
    white-space: nowrap;
  }

  &__field {
    @include ds-typography.r-s16-h19;
    display: block;
    margin: 0;
    padding: 8px 16px;
    padding-right: 30px;
    cursor: pointer;
    transition: 0.3s;

    color: ds-colors.$black;
    border: 1px solid ds-colors.$purple-400;
    border-radius: 8px;
    outline: none;
    background-color: ds-colors.$silver-100;
    background-image: url('@/assets/img/select.svg');
    background-repeat: no-repeat;
    background-position: right 8px center;
    font-family: inherit;
    appearance: none;

    &:hover {
      border-color: ds-colors.$orange-100;
    }

    &:focus {
      border-color: ds-colors.$green-500;
    }
  }

  &--error {
    .app-select__field {
      border-color: ds-colors.$red-800;
    }

    .error {
      position: absolute;
      right: 0;
      bottom: -18px;
      color: ds-colors.$red-900;
      font-weight: 600;
      font-size: 12px;
      line-height: 1;
    }
  }
}
</style>
