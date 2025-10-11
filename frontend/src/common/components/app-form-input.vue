<script setup lang="ts">
import AppInput from '@/common/components/app-input.vue'
import { Field } from 'vee-validate'

defineProps<{
  name: string
  type?: string
  placeholder?: string
  label?: string
  size?: 'big'
  disabled?: boolean
}>()
</script>

<template>
  <Field
    v-slot="{ field, errorMessage }"
    :name="name"
    :type="type"
    :validate-on-blur="false"
    :validate-on-change="false"
    :validate-on-input="false"
    :validate-on-model-update="false"
  >
    <AppInput
      v-model="field.value"
      :name="name"
      :type="type"
      :error="errorMessage"
      :placeholder="placeholder"
      :label="label"
      :size="size"
      :disabled="disabled"
      @input="field.onInput"
      @blur="field.onBlur"
    />
  </Field>
</template>

<style scoped lang="scss"></style>
