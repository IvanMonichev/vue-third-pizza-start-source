<script setup lang="ts">
import { useDeleteOrderMutation } from '@/api/orders.api'
import AppButton from '@/common/components/app-button.vue'
import { Order } from '@/common/types/order.types'
import { buildFullAddress } from '@/common/utils/address.utils'
import { AppConfig } from '@/modules/cart/config/app.config'
import OrderAdditional from '@/modules/order/order-additional.vue'
import OrderListItem from '@/modules/order/order-list-item.vue'
import OrderList from '@/modules/order/order-list.vue'
import { useOrdersStore } from '@/store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  order: Order
}

const { order } = defineProps<Props>()
const { buildOrderToCart } = useOrdersStore()
const router = useRouter()

const deleteOrder = useDeleteOrderMutation()

const addressContent = computed(() => {
  if (!order.address) return null

  return buildFullAddress(order.address)
})

const handleOrderRepeat = () => {
  buildOrderToCart(order.id)
  router.push({ name: 'cart-view' })
}

const handleDeleteOrder = async () => {
  try {
    await deleteOrder.mutateAsync(order.id)
  } catch (e) {
    console.error('Ошибка при удалении заказа:', e)
  }
}
</script>

<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>{{ order.name }}</b>
      </div>

      <div class="order__sum">
        <span
          >Сумма заказа:
          {{ order.price.toLocaleString(AppConfig.Locale) }} ₽</span
        >
      </div>

      <div class="order__button">
        <app-button type="button" @click="handleDeleteOrder"
          >Удалить</app-button
        >
      </div>
      <div class="order__button">
        <app-button type="button" @click="handleOrderRepeat"
          >Повторить</app-button
        >
      </div>
    </div>

    <order-list>
      <order-list-item
        v-for="pizza in order.pizzas"
        :key="pizza.id"
        :pizza="pizza"
      />
    </order-list>

    <order-additional :misc-list="order.miscList" />

    <p v-if="addressContent" class="order__address">
      Адрес доставки: {{ addressContent }}
    </p>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);

  b {
    @include ds-typography.b-s14-h16;
  }

  span {
    @include ds-typography.b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__address {
  @include ds-typography.l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}
</style>
