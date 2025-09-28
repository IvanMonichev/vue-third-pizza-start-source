<script setup lang="ts">
import CartItem from '@/modules/cart/cart-list-item.vue'
import CartList from '@/modules/cart/cart-list.vue'
import { useCartStore } from '@/store'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { pizzas, pizzaFinalPrice } = storeToRefs(cartStore)
</script>

<template>
  <CartList>
    <CartItem
      v-for="pizza in pizzas"
      :key="pizza.clientId"
      :pizza="pizza"
      :pizza-total-price="pizzaFinalPrice(pizza.clientId)"
    />
  </CartList>
</template>

<style scoped lang="scss"></style>
