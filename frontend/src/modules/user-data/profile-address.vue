<script setup lang="ts">
import { AddressMode } from '@/common/enums/address-mode.enum'
import { Address } from '@/common/types/address.types'
import ProfileAddressForm from '@/modules/user-data/profile-address-form.vue'
import ProfileAddressView from '@/modules/user-data/profile-address-view.vue'
import { computed } from 'vue'

interface Props {
  address: Address
}

const { address } = defineProps<Props>()

const isViewMode = computed(() => address.addressMode === AddressMode.VIEW)
const isFormAdd = computed(() => address.addressMode === AddressMode.ADD)
const isAddMode = computed(() => address.addressMode === AddressMode.EDIT)
</script>

<template>
  <div class="layout__address">
    <ProfileAddressView v-if="isViewMode" :address="address" />
    <ProfileAddressForm v-if="isFormAdd || isAddMode" :address="address" />
  </div>
</template>

<style scoped lang="scss">
.layout__address {
  margin-top: 16px;
}
</style>
