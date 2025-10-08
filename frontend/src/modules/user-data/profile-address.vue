<script setup lang="ts">
import { computed } from 'vue'
import { AddressProfile } from '@/common/types/address.types'
import ProfileAddressView from '@/modules/user-data/profile-address-view.vue'
import { AddressMode } from '@/common/enums/address-mode.enum'
import ProfileAddressForm from '@/modules/user-data/profile-address-form.vue'

interface Props {
  address: AddressProfile
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
