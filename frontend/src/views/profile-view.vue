<script setup lang="ts">
import TheProfileSidebar from '@/modules/profile/the-profile-sidebar.vue'
</script>

<template>
  <main class="layout">
    <the-profile-sidebar />
    <div class="layout__content">
      <router-view />
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
</style>
