<script setup lang="ts">
import { useAddressesQuery } from '@/api/addresses.api'
import AppButton from '@/common/components/app-button.vue'
import AppTitle from '@/common/components/app-title.vue'
import ProfileAddress from '@/modules/user-data/profile-address.vue'
import UserData from '@/modules/user-data/user-data.vue'
import { useProfileStore } from '@/store'
import { watchEffect } from 'vue'

const { data: addresses } = useAddressesQuery()
const profileStore = useProfileStore()

watchEffect(() => {
  if (addresses.value) {
    profileStore.buildAddresses(addresses.value)
  }
})

const handleAddAddress = () => {
  profileStore.addNewAddress()
}
</script>

<template>
  <div class="layout__title">
    <AppTitle type="big">Мои данные</AppTitle>
  </div>

  <UserData />

  <ProfileAddress
    v-for="address in profileStore.addresses"
    :key="address.id"
    :address="address"
  />

  <div class="layout__button">
    <AppButton type="button" variant="border" @click="handleAddAddress"
      >Добавить новый адрес</AppButton
    >
  </div>
</template>

<style scoped lang="scss">
.layout__title {
  margin-bottom: 27px;
}

.layout__button {
  margin-top: 40px;

  button {
    padding: 12px 23px;
  }
}
</style>
