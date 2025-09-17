<script setup lang="ts">
import { Option } from '@/common/types/core.types'

defineProps<{
  options: Option[]
  name: string
  labelClass?: string
}>()

const modelValue = defineModel<string | number>()
</script>

<template>
  <label
    v-for="option in options"
    :key="option.id"
    :class="['radio', labelClass]"
  >
    <input
      v-model="modelValue"
      type="radio"
      :name="name"
      :value="option.value"
    />
    <span>{{ option.label }}</span>
  </label>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/mixins/m_center';

.radio {
  cursor: pointer;

  span {
    @include ds-typography.r-s16-h19;

    position: relative;

    padding-left: 28px;

    &:before {
      @include m_center.p_center-v;

      display: block;

      box-sizing: border-box;
      width: 20px;
      height: 20px;

      content: '';
      transition: 0.3s;

      border: 1px solid ds-colors.$purple-400;
      border-radius: 50%;
      background-color: ds-colors.$white;
    }
  }

  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: ds-colors.$purple-800;
      }
    }
  }

  input {
    display: none;

    &:checked + span {
      &:before {
        border: 6px solid ds-colors.$green-500;
      }
    }

    &:disabled {
      & + span {
        &:before {
          border-color: ds-colors.$purple-400;
          background-color: ds-colors.$silver-200;
        }
      }

      &:checked + span {
        &:before {
          border: 6px solid ds-colors.$purple-400;
        }
      }
    }
  }
}
</style>
