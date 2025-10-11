<script setup lang="ts">
import productImg from '@/assets/img/product.svg'
import { doughCartMap } from '@/common/constants/mappers.constants'
import { PizzaOrder } from '@/common/types/pizza.types'
import { computed } from 'vue'

interface Props {
  pizza: PizzaOrder
}

const { pizza } = defineProps<Props>()

const ingredientsList = computed(() =>
  pizza.ingredients
    .map((i) => {
      return i.name.toLowerCase()
    })
    .join(', ')
)
</script>

<template>
  <li class="order__item">
    <div class="product">
      <img
        :src="productImg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ pizza.size.name }}, {{ doughCartMap[pizza.dough.id] }}</li>
          <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
          <li v-if="ingredientsList.length">Начинка: {{ ingredientsList }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">
      <span v-if="pizza.quantity > 1">{{ pizza.quantity }}x</span
      >{{ pizza.price }} ₽
    </p>
  </li>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/mixins/m_clear-list';

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include ds-typography.b-s16-h19;

  margin: 0;

  white-space: nowrap;
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
</style>
