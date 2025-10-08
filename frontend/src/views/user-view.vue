<script setup lang="ts">
import AppButton from '@/common/components/app-button.vue'
import AppTitle from '@/common/components/app-title.vue'
import AddressForm from '@/modules/user-data/address-form.vue'
import UserData from '@/modules/user-data/user-data.vue'
import { useAddressesQuery } from '@/api/addresses.api'
import { useProfileStore } from '@/store'
import { watch } from 'vue'

const { data: addresses } = useAddressesQuery()
const profileStore = useProfileStore()

watch(addresses, (data) => {
  const userId = profileStore.userId
  if (!data) return
  if (!userId) return

  const addresses = data.filter(
    (address) => address.userId === profileStore.user?.id
  )

  profileStore.setAddresses({ addresses })
})
</script>

<template>
  <div class="layout__title">
    <AppTitle type="big">Мои данные</AppTitle>
  </div>

  <UserData />

  <AddressForm mode="view" />
  <AddressForm mode="edit" />

  <div class="layout__button">
    <AppButton type="button" variant="border">Добавить новый адрес</AppButton>
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
