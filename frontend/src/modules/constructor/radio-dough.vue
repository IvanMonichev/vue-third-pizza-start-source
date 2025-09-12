<script setup lang="ts">
import { doughSizeMap } from '@/common/constants/mappers.constants'
import { DoughSize } from '@/common/enums/dough-size.enum'

const { value } = defineProps<{
  value: DoughSize
  name: string
  label: string
  description: string
}>()

defineEmits<{ (e: 'update:modelValue', value: DoughSize): void }>()
const modelValue = defineModel<DoughSize>()

const size = doughSizeMap[value]
</script>

<template>
  <label :class="['dough__input', `dough__input--${size}`]">
    <input
      v-model="modelValue"
      type="radio"
      :name="name"
      :value="value"
      class="visually-hidden"
    />
    <b>{{ label }}</b>
    <span>{{ description }}</span>
  </label>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/mixins/m_center';

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include ds-typography.r-s16-h19;

    &::before {
      @include m_center.p_center-v;

      width: 36px;
      height: 36px;

      content: '';
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include ds-typography.l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url('@/assets/img/dough-light.svg');
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url('@/assets/img/dough-large.svg');
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: ds-shadows.$shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: ds-shadows.$shadow-large;
    }
  }
}
</style>
