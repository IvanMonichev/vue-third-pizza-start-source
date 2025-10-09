<script setup lang="ts">
import { useAddressesQuery } from '@/api/addresses.api'
import AppFormInput from '@/common/components/app-form-input.vue'
import AppSelect from '@/common/components/app-select.vue'
import { DeliveryType } from '@/common/enums/delivery-type.enum'
import { DeliverySelectValue } from '@/common/types/cart.types'
import { useField } from 'vee-validate'
import { computed } from 'vue'

const { data: addresses } = useAddressesQuery()

const { value: deliveryTypeValue, errorMessage: deliveryTypeError } =
  useField<DeliverySelectValue>('deliveryType')

const deliveryOptions = computed(() => {
  const base = [
    { label: 'Заберу сам', value: DeliveryType.PICK_UP },
    { label: 'Новый адрес', value: DeliveryType.NEW_ADDRESS }
  ]

  if (!addresses.value) return base

  const existing = addresses.value.map((a) => ({
    label: a.name,
    value: String(a.id)
  }))

  return [...base, ...existing]
})
</script>

<template>
  <div class="cart-form">
    <AppSelect
      v-model="deliveryTypeValue"
      :options="deliveryOptions"
      label="Получение заказа:"
      extra-class="cart-form__select"
      :error="deliveryTypeError"
      name="deliveryType"
    />
    <AppFormInput
      label="Контактный телефон*:"
      name="phone"
      placeholder="+7 999-999-99-99"
      size="big"
    />

    <div
      v-if="deliveryTypeValue !== DeliveryType.PICK_UP"
      class="cart-form__address"
    >
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <AppFormInput label="Улица*" name="street" />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppFormInput label="Дом*" name="house" />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppFormInput label="Квартира" name="apartment" />
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
