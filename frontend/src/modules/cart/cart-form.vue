<script setup lang="ts">
import AppInput from '@/common/components/app-input.vue'
import AppSelect from '@/common/components/app-select.vue'
import { deliveryTypeOptions } from '@/common/constants/address-form.constants'
import { DeliveryType } from '@/common/enums/delivery-type.enum'
import { useCartStore } from '@/store'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { addressForm } = storeToRefs(cartStore)
</script>

<template>
  <div class="cart-form">
    <AppSelect
      v-model="addressForm.deliveryType"
      name="delivery-type"
      :options="deliveryTypeOptions"
      label="Получение заказа:"
      extra-class="cart-form__select"
    />
    <AppInput
      v-model="addressForm.phone"
      label="Контактный телефон:"
      name="tel"
      placeholder="+7 999-999-99-99"
      size="big"
    />

    <div
      v-if="addressForm.deliveryType === DeliveryType.NEW_ADDRESS"
      class="cart-form__address"
    >
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <AppInput
          v-model="addressForm.street"
          label="Улица*"
          name="street"
          :required="true"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          v-model="addressForm.house"
          label="Дом*"
          name="house"
          :required="true"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          v-model="addressForm.apartment"
          label="Квартира"
          name="apartment"
        />
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
