<script setup lang="ts">
import AppButtonLink from '@/common/components/app-button-link.vue'
import AppCounter from '@/common/components/app-counter.vue'
import { doughCartMap } from '@/common/constants/mappers.constants'
import { Pizza } from '@/common/types/pizza.types'
import { AppConfig } from '@/modules/cart/config/app.config'
import { useCartStore, useDataStore } from '@/store'
import { computed } from 'vue'

interface Props {
  pizza: Pizza
}

const dataStore = useDataStore()
const cartStore = useCartStore()
const { pizza } = defineProps<Props>()

const ingredientsList = computed(() =>
  pizza.ingredients
    .map((i) => {
      const ingredient = dataStore.dataById('ingredients', i.id)
      return ingredient?.name.toLowerCase()
    })
    .join(', ')
)
const size = computed(() => dataStore.dataById('sizes', pizza.sizeId))
const sauce = computed(() => dataStore.dataById('sauces', pizza.sauceId))
</script>

<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Капричоза"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ size?.name }}, {{ doughCartMap[pizza.doughId] }}</li>
          <li>Соус: {{ sauce?.name.toLowerCase() }}</li>
          <li>Начинка: {{ ingredientsList }}</li>
        </ul>
      </div>
    </div>

    <AppCounter
      :min="0"
      color="orange"
      extra-class="cart-list__counter"
      :value="pizza.quantity"
      @increment="cartStore.incrementCartPizza(pizza.pizzaId)"
      @decrement="cartStore.decrementCartPizza(pizza.pizzaId)"
      @set-value="cartStore.setCartPizzaQuantity(pizza.pizzaId, $event)"
    />

    <div class="cart-list__price">
      <b
        >{{
          cartStore
            .pizzaTotalPrice(pizza.pizzaId)
            .toLocaleString(AppConfig.Locale)
        }}
        ₽</b
      >
    </div>

    <div class="cart-list__button">
      <AppButtonLink
        :to="`/${pizza.pizzaId}`"
        class-name="cart-list__edit"
        :variants="['border']"
        >Изменить</AppButtonLink
      >
    </div>
  </li>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/mixins/m_clear-list';

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include ds-typography.b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include m_clear-list.clear-list;
    @include ds-typography.l-s11-h13;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include ds-typography.b-s16-h19;
  }
}

.cart-list__edit {
  @include ds-typography.l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: ds-colors.$green-500;
  }

  &:active {
    color: ds-colors.$green-600;
  }

  &:focus {
    color: ds-colors.$green-400;
  }
}

.product__text {
  margin-left: 15px;

  h2 {
    @include ds-typography.b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include m_clear-list.clear-list;
    @include ds-typography.l-s11-h13;
  }
}
</style>
