<script setup lang="ts">
import AppButton from '@/common/components/app-button.vue'
import AppTitle from '@/common/components/app-title.vue'
import AddressForm from '@/modules/profile/address-form.vue'
import UserData from '@/modules/profile/user-data.vue'
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
