<script setup lang="ts">
import AppButtonIcon from '@/common/components/app-button-icon.vue'
import { AddressMode } from '@/common/enums/address-mode.enum'
import { Address } from '@/common/types/address.types'
import { buildFullAddress } from '@/common/utils/address.utils'
import { useAddressStore } from '@/store'
import { computed } from 'vue'

interface Props {
  address: Address
}

const { address } = defineProps<Props>()

const addressStore = useAddressStore()

const fullAddress = computed(() => {
  return buildFullAddress(address)
})

const handleEdit = () => {
  if (typeof address.id !== 'number') return
  addressStore.setAddressMode(address.id, AddressMode.EDIT)
}
</script>

<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>{{ address.name }}</b>
      <div class="address-form__edit">
        <app-button-icon @click="handleEdit">Изменить адрес</app-button-icon>
      </div>
    </div>
    <p>{{ fullAddress }}</p>
    <small v-if="address.comment">{{ address?.comment }}</small>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/ds-system/ds-typography';

.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include ds-typography.l-s11-h13;

    display: block;

    padding: 0 16px;
  }

  .address-form__header {
    @include ds-typography.b-s14-h16;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 21px;
    padding: 10px 16px;

    border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);
  }
}
</style>
