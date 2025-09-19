<script setup lang="ts">
import AppTitle from '@/common/components/app-title.vue'
import OrderSheet from '@/modules/order/order-sheet.vue'
</script>

<template>
  <div class="layout__title">
    <AppTitle type="big">История заказов</AppTitle>
  </div>

  <OrderSheet />
  <OrderSheet />
</template>

<style scoped lang="scss">
.layout__title {
  margin-bottom: 27px;
}
</style>
