<script setup lang="ts">
import { pizzaSizeMap } from '@/common/constants/mappers.constant'
import { PizzaSize } from '@/common/enums/pizza-size.enum'

const props = defineProps<{
  label: string
  name: string
  value: PizzaSize
}>()

const size = pizzaSizeMap[props.value]
const modelValue = defineModel<PizzaSize>()
</script>

<template>
  <label :class="['diameter__input', `diameter__input--${size}`]">
    <input
      v-model="modelValue"
      type="radio"
      :name="name"
      :value="value"
      class="visually-hidden"
    />
    <span>{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/mixins/m_center';

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include ds-typography.r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include m_center.p_center_v;

      width: 36px;
      height: 36px;

      content: '';
      transition: 0.3s;

      border-radius: 50%;
      background-color: ds-colors.$green-100;
      background-image: url('@/assets/img/diameter.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: ds-shadows.$shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: ds-shadows.$shadow-large;
    }
  }
}
</style>
