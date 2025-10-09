<script setup lang="ts">
interface Props {
  name: string
  type?: string
  placeholder?: string
  label?: string
  labelHidden?: boolean
  required?: boolean
  size?: 'big'
  error?: string
}

const { size, error, labelHidden } = defineProps<Props>()
const modelValue = defineModel<string>()
</script>

<template>
  <label
    :class="[
      'input',
      {
        'input--big-label': size === 'big',
        'input--error': error
      }
    ]"
  >
    <span v-if="label" :class="{ 'visually-hidden': labelHidden }">{{
      label
    }}</span>
    <input
      v-model="modelValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :name="name"
    />
    <span v-if="error" class="error">{{ error }}</span>
  </label>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';

.input {
  display: block;
  position: relative;

  span {
    @include ds-typography.r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include ds-typography.r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: ds-colors.$black;
    border: 1px solid ds-colors.$purple-400;
    border-radius: 8px;
    outline: none;
    background-color: ds-colors.$white;

    font-family: inherit;
  }

  &:not(.input--error):focus {
    border-color: ds-colors.$green-500;
  }

  &:not(.input--error):hover {
    input {
      border-color: ds-colors.$black;
    }
  }

  &--error {
    input {
      border-color: ds-colors.$red-800;
    }

    .error {
      position: absolute;
      color: ds-colors.$red-900;
      font-weight: 600;
      font-size: 12px;
      line-height: 1;
      right: 0;
      bottom: -18px;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span:not(.error) {
      @include ds-typography.b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}

.visually-hidden {
  position: absolute;

  overflow: hidden;
  clip: rect(0 0 0 0);

  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;

  white-space: nowrap;

  border: 0;

  clip-path: inset(100%);
}
</style>
