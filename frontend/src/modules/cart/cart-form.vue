<script setup lang="ts">
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
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <AppSelect
        v-model="value"
        name="test"
        :options="options"
        label="Получение заказа:"
      />
    </label>

    <label class="input input--big-label">
      <span>Контактный телефон:</span>
      <input type="text" name="tel" placeholder="+7 999-999-99-99" />
    </label>

    <div class="cart-form__address">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <input type="text" name="street" />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <input type="text" name="house" />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <input type="text" name="apartment" />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
