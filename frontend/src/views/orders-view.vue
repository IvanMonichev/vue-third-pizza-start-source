<script setup lang="ts">
import AppTitle from '@/common/components/app-title.vue'
import OrderSheet from '@/modules/order/order-sheet.vue'
import { useOrdersStore } from '@/store'
import { storeToRefs } from 'pinia'

const { ordersList } = storeToRefs(useOrdersStore())
</script>

<template>
  <div class="layout__title">
    <AppTitle type="big">История заказов</AppTitle>
  </div>

  <OrderSheet v-for="order in ordersList" :key="order.id" :order="order" />
</template>

<style scoped lang="scss">
.layout__title {
  margin-bottom: 27px;
}
</style>
