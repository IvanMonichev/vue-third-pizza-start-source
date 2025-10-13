<script setup lang="ts">
interface Props {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}
const props = defineProps<Props>()
defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="props.type || 'button'"
    class="icon"
    :disabled="props.disabled"
    @click="$emit('click', $event)"
  >
    <span class="visually-hidden"> <slot /></span>
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-shadows';

.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: ds-colors.$white;
  background-image: url('@/assets/img/edit.svg');
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: ds-shadows.$shadow-light;
    cursor: pointer;
  }

  &:active {
    box-shadow: ds-shadows.$shadow-large;
  }

  &:focus {
    box-shadow: ds-shadows.$shadow-regular;
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
