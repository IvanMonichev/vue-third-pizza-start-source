<script setup lang="ts">
import AppInput from '@/common/components/app-input.vue'
import AppSelect from '@/common/components/app-select.vue'
import { ref } from 'vue'

const options = [
  { value: '1', label: 'Заберу сам' },
  { value: '2', label: 'Новый адрес' },
  { value: '3', label: 'Дом' }
]

const value = ref<string>('1')
</script>

<template>
  <div class="cart-form">
    <AppSelect
      v-model="value"
      name="test"
      :options="options"
      label="Получение заказа:"
      extra-class="cart-form__select"
    />
    <AppInput
      label="Контактный телефон:"
      name="tel"
      placeholder="+7 999-999-99-99"
      size="big"
    />

    <div class="cart-form__address">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <AppInput label="Улица*" name="street" :required="true" />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput label="Дом*" name="house" :required="true" />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput label="Квартира" name="apartment" :required="true" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-typography';

.cart-form__select {
  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.cart-form__label {
  @include ds-typography.b-s16-h19;

  white-space: nowrap;
}
</style>
