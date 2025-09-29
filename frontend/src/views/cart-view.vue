<script setup lang="ts">
import AppTitle from '@/common/components/app-title.vue'
import CartFooter from '@/modules/cart/cart-footer.vue'
import CartForm from '@/modules/cart/cart-form.vue'
import CartMiscList from '@/modules/cart/cart-misc-list.vue'
import CartPizzas from '@/modules/cart/cart-pizzas.vue'
import { useCartStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const cartStore = useCartStore()
const { orderTotalPrice } = storeToRefs(cartStore)
const isEmptyPizzas = computed(() => cartStore.pizzas.length === 0)
</script>

<template>
  <form action="#" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <AppTitle>Корзина</AppTitle>
        </div>

        <div v-if="isEmptyPizzas" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
        <CartPizzas v-else />

        <CartMiscList />

        <div class="cart__form">
          <CartForm />
        </div>
      </div>
    </main>
    <CartFooter :total-price="orderTotalPrice" :is-empty="isEmptyPizzas" />
  </form>
</template>

<style scoped lang="scss">
.content {
  padding-top: 20px;
}

.container {
  width: 770px;
  margin: 0 auto;
}

.cart__title {
  margin-bottom: 15px;
}

.layout-form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.visually-hidden {
  position: absolute;

  overflow: hidden;
  clip: rect(0 0 0 0);

  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;

  white-space: nowrap;

  border: 0;

  clip-path: inset(100%);
}

.cart__empty {
  padding: 20px 30px;
}
</style>
