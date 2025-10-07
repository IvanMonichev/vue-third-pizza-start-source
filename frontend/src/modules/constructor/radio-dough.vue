<script setup lang="ts">
import { Dough } from '@/common/types/dough.types'

const { dough } = defineProps<{
  dough: Dough
}>()

const { name, description, id } = dough
const modelValue = defineModel<number | null>()
</script>

<template>
  <label :class="['dough__input']">
    <div class="dough__content">
      <input
        v-model="modelValue"
        type="radio"
        name="dough"
        class="visually-hidden"
        :value="id"
      />
      <img :src="dough.image" :alt="dough.name" class="dough__img" />
      <span class="dough__name">{{ name }}</span>
    </div>

    <span class="dough__description">{{ description }}</span>
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

  .dough__description {
    @include ds-typography.l-s11-h13;

    display: block;
  }

  .dough__content {
    display: flex;
    align-content: center;

    .dough__name {
      @include ds-typography.r-s16-h19;
    }

    .dough__img {
      @include m_center.p_center-v;

      width: 36px;
      height: 36px;

      transition: 0.3s;

      border-radius: 50%;
      object-fit: contain;
      flex-shrink: 0;
    }
  }

  &:hover {
    .dough__img {
      box-shadow: ds-shadows.$shadow-regular;
    }
  }

  input {
    &:checked + .dough__img {
      box-shadow: ds-shadows.$shadow-large;
    }
  }
}
</style>
