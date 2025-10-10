<script setup lang="ts">
import AppTitle from '@/common/components/app-title.vue'
import OrderSheet from '@/modules/order/order-sheet.vue'
import { useOrdersQuery } from '@/api/orders.api'
import { watch } from 'vue'

const { data: orders } = useOrdersQuery()

watch(orders, (data) => {
  console.log(data)
})
</script>

<template>
  <div class="layout__title">
    <AppTitle type="big">История заказов</AppTitle>
  </div>

  <OrderSheet v-for="order in orders" :key="order.id" />
  <!--  <OrderSheet />-->
</template>

<style scoped lang="scss">
.layout__title {
  margin-bottom: 27px;
}
</style>
