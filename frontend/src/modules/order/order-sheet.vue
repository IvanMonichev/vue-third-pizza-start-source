<script setup lang="ts">
import AppButton from '@/common/components/app-button.vue'
import { Order } from '@/common/types/order.types'
import { AppConfig } from '@/modules/cart/config/app.config'
import OrderAdditional from '@/modules/order/order-additional.vue'
import OrderListItem from '@/modules/order/order-list-item.vue'
import OrderList from '@/modules/order/order-list.vue'

interface Props {
  order: Order
}

const { order } = defineProps<Props>()

console.log('order', order)
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
        <AppButton type="button">Удалить</AppButton>
      </div>
      <div class="order__button">
        <AppButton type="button">Повторить</AppButton>
      </div>
    </div>

    <OrderList>
      <OrderListItem
        v-for="pizza in order.pizzas"
        :key="pizza.id"
        :pizza="pizza"
      />
    </OrderList>

    <OrderAdditional :misc-list="order.miscList" />

    <p class="order__address">
      Адрес доставки: Тест (или если адрес новый - писать целиком)
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
