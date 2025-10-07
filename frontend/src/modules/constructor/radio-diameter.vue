<script setup lang="ts">
import { sizeDiameterMap } from '@/common/constants/mappers.constants'
import { Size } from '@/common/types/size.types'

const { size } = defineProps<{
  size: Size
}>()

const modelValue = defineModel<Size['id']>()
const sizeDiameterName = sizeDiameterMap[size.multiplier]
</script>

<template>
  <label class="diameter__input">
    <input
      v-model="modelValue"
      type="radio"
      name="diameter"
      class="visually-hidden"
      :value="size.id"
    />
    <div class="diameter__select">
      <img
        :src="size.image"
        :alt="size.name"
        :class="['diameter__image', `diameter__image--${sizeDiameterName}`]"
      />
    </div>
    <span class="diameter__name">{{ size.name }}</span>
  </label>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/mixins/m_center';

.diameter__input {
  display: flex;
  position: relative;
  align-items: center;
  margin-right: 8.7%;
  gap: 10px;
  cursor: pointer;

  .diameter__name {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    font-style: normal;
  }

  .diameter__select {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    background-color: ds-colors.$green-100;
    border-radius: 50%;
    transition: 0.3s;
    display: flex;
    align-content: center;
    justify-content: center;

    .diameter__image {
      width: 100%;
      border-radius: 50%;
      object-fit: contain;

      &--small {
        width: 50%;
      }

      &--normal {
        width: 80%;
      }

      &--big {
        width: 100%;
      }
    }
  }

  &:hover {
    .diameter__select {
      box-shadow: ds-shadows.$shadow-regular;
    }
  }

  input {
    &:checked + .diameter__select {
      box-shadow: ds-shadows.$shadow-large;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }
}
</style>
