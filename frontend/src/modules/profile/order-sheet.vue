<script setup lang="ts">
import AppButton from '@/common/components/app-button.vue'
import OrderListItem from '@/modules/profile/order-list-item.vue'
import OrderList from '@/modules/profile/order-list.vue'
import productImg from '@/assets/img/product.svg'
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

    <ul class="order__additional">
      <li>
        <img
          src="@/assets/img/cola.svg"
          width="20"
          height="30"
          alt="Coca-Cola 0,5 литра"
        />
        <p>
          <span>Coca-Cola 0,5 литра</span>
          <b>56 ₽</b>
        </p>
      </li>
      <li>
        <img
          src="@/assets/img/sauce.svg"
          width="20"
          height="30"
          alt="Острый соус"
        />
        <span>Острый соус <br />30 ₽</span>
      </li>
      <li>
        <img
          src="@/assets/img/potato.svg"
          width="20"
          height="30"
          alt="Картошка из печи"
        />
        <p>
          <span>Картошка из печи</span>
          <b>170 ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">
      Адрес доставки: Тест (или если адрес новый - писать целиком)
    </p>
  </section>
</template>

<style scoped lang="scss"></style>
