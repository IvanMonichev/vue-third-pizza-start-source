<script setup lang="ts">
import AppButton from '@/common/components/app-button.vue'
import AppTitle from '@/common/components/app-title.vue'
import AddressForm from '@/modules/profile/address-form.vue'
import UserData from '@/modules/profile/user-data.vue'
import TheProfileSidebar from '@/modules/profile/the-profile-sidebar.vue'
</script>

<template>
  <main class="layout">
    <TheProfileSidebar />
    <div class="layout__content">
      <div class="layout__title">
        <AppTitle type="big">Мои данные</AppTitle>
      </div>

      <UserData />

      <AddressForm mode="view" />
      <AddressForm mode="edit" />

      <div class="layout__button">
        <AppButton type="button" variant="border"
          >Добавить новый адрес
        </AppButton>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';

.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}

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
