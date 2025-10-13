<script setup lang="ts">
import TheProfileSidebar from '@/modules/profile/the-profile-sidebar.vue'
import AppLayoutMain from '@/layouts/app-layout-main.vue'
import SlideTransition from '@/common/components/slide-transition.vue'
</script>

<template>
  <app-layout-main>
    <main class="layout">
      <the-profile-sidebar />
      <slide-transition>
        <div class="layout__content">
          <router-view />
        </div>
      </slide-transition>
    </main>
  </app-layout-main>
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
