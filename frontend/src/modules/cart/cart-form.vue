<script setup lang="ts">
import AppFormInput from '@/common/components/app-form-input.vue'
import AppSelect from '@/common/components/app-select.vue'
import { DeliveryType } from '@/common/enums/delivery-type.enum'
import { Address } from '@/common/types/address.types'
import { DeliverySelectValue } from '@/common/types/cart.types'
import { useField } from 'vee-validate'
import { computed, watch } from 'vue'

interface Props {
  addresses?: Address[]
}

const { addresses } = defineProps<Props>()
const emit = defineEmits<{
  (e: 'select-address', address: Address | null): void
}>()

const { value: deliveryTypeValue, errorMessage: deliveryTypeError } =
  useField<DeliverySelectValue>('deliveryType')

const deliveryOptions = computed(() => {
  const base = [
    { label: 'Заберу сам', value: DeliveryType.PICK_UP },
    { label: 'Новый адрес', value: DeliveryType.NEW_ADDRESS }
  ]

  if (!addresses) return base

  const existing = addresses.map((a) => ({
    label: a.name,
    value: String(a.id)
  }))

  return [...base, ...existing]
})
const isAddressReadonly = computed(() => {
  if (!deliveryTypeValue.value) return false
  return (
    deliveryTypeValue.value !== DeliveryType.PICK_UP &&
    deliveryTypeValue.value !== DeliveryType.NEW_ADDRESS
  )
})

watch(deliveryTypeValue, (value) => {
  if (
    !value ||
    value === DeliveryType.PICK_UP ||
    value === DeliveryType.NEW_ADDRESS
  ) {
    emit('select-address', null)
    return
  }

  if (!addresses) return

  const selected = addresses.find((a) => a.id === Number(value))
  emit('select-address', selected ?? null)
})
</script>

<template>
  <div class="cart-form">
    <app-select
      v-model="deliveryTypeValue"
      :options="deliveryOptions"
      label="Получение заказа:"
      extra-class="cart-form__select"
      :error="deliveryTypeError"
      name="deliveryType"
    />
    <app-form-input
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
        <app-form-input
          label="Улица*"
          name="street"
          :disabled="isAddressReadonly"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <app-form-input
          label="Дом*"
          name="house"
          :disabled="isAddressReadonly"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <app-form-input
          label="Квартира"
          name="apartment"
          :disabled="isAddressReadonly"
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
