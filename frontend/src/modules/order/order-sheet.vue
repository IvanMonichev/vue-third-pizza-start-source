<script setup lang="ts">
import AppButton from '@/common/components/app-button.vue'
import { AdditionalItem } from '@/common/types/order.types'
import OrderAdditional from '@/modules/order/order-additional.vue'
import OrderListItem from '@/modules/order/order-list-item.vue'
import OrderList from '@/modules/order/order-list.vue'
import productImg from '@/assets/img/product.svg'
import colaImg from '@/assets/img/cola.svg'
import sauceImg from '@/assets/img/sauce.svg'
import potatoImg from '@/assets/img/potato.svg'

const additionalItems: AdditionalItem[] = [
  {
    name: 'Coca-Cola 0,5 литра',
    price: 56,
    image: colaImg,
    alt: 'Coca-Cola 0,5 литра'
  },
  {
    name: 'Острый соус',
    price: 30,
    image: sauceImg,
    alt: 'Острый соус'
  },
  {
    name: 'Картошка из печи',
    price: 170,
    image: potatoImg,
    alt: 'Картошка из печи'
  }
]
</script>

<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #11199929</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: 1&nbsp;564 ₽</span>
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
        title="Капричоза"
        :image="productImg"
        price="782"
        :options="[
          '30 см, на тонком тест',
          'Соус: томатный',
          'Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блю чиз'
        ]"
      />
      <OrderListItem
        title="Капричоза"
        :image="productImg"
        price="2x782"
        :options="[
          '30 см, на тонком тест',
          'Соус: томатный',
          'Начинка: грибы, лук, ветчина, пармезан, ананас'
        ]"
      />
    </OrderList>

    <OrderAdditional :items="additionalItems" />

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
