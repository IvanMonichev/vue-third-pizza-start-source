<script setup lang="ts">
import AppButtonClose from '@/common/components/app-button-close.vue'
import AppButtonLink from '@/common/components/app-button-link.vue'
import { useCartStore, usePizzaStore } from '@/store'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const pizzaStore = usePizzaStore()
const router = useRouter()

onMounted(() => {
  if (!cartStore.isOrderSuccess) {
    router.push({ name: 'home-view' })
  }
})

const handlePopupClose = () => {
  cartStore.resetStore()
  pizzaStore.resetPizza()
}
</script>

<template>
  <div class="popup">
    <AppButtonClose :to="{ name: 'orders-view' }" @click="handlePopupClose" />
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <AppButtonLink :to="{ name: 'orders-view' }" @click="handlePopupClose">
        Отлично, я жду!</AppButtonLink
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/mixins/m_center';

.popup {
  @include m_center.pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: ds-colors.$white;
  box-shadow: ds-shadows.$shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: '';

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url('@/assets/img/filling/ananas.svg');
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url('@/assets/img/filling/tomatoes.svg');
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}

.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.popup__button {
  a {
    padding: 16px 32px;
  }
}
</style>
