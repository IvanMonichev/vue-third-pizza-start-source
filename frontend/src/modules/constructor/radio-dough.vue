<script setup lang="ts">
import { Dough } from '@/common/types/dough.types'

const { dough } = defineProps<{
  dough: Dough
}>()

const { name, className, description, id } = dough
const modelValue = defineModel<number | null>()
</script>

<template>
  <label :class="['dough__input', `dough__input--${className}`]">
    <input
      v-model="modelValue"
      type="radio"
      name="dough"
      class="visually-hidden"
      :value="id"
    />
    <b>{{ name }}</b>
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
