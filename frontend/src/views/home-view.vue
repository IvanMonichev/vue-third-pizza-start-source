<script setup lang="ts">
import {
  Dough,
  Ingredient,
  PizzaSauces,
  PizzaSizeInterface
} from '@/common/types/constructor.types'
import dough from '@/mocks/dough.json'
import sauces from '@/mocks/sauces.json'
import sizes from '@/mocks/sizes.json'
import ingredients from '@/mocks/ingredients.json'
import ContentPizza from '@/modules/constructor/pizza.vue'
import SelectorDiameter from '@/modules/constructor/selector-diameter.vue'
import SelectorDough from '@/modules/constructor/selector-dough.vue'
import SelectorIngredients from '@/modules/constructor/selector-ingredients.vue'

const doughTypes: Dough[] = dough
const pizzaSauces: PizzaSauces[] = sauces
const pizzaSizes: PizzaSizeInterface[] = sizes
const ingredientsValues: Ingredient[] = ingredients
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <SelectorDough :dough-types="doughTypes" />
        <SelectorDiameter :pizza-sizes="pizzaSizes" />
        <SelectorIngredients
          :pizza-sauces="pizzaSauces"
          :ingredients="ingredientsValues"
        />
        <ContentPizza />
      </div>
    </form>
  </main>
</template>
<style lang="scss" scoped>
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';

.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: ds-colors.$black;

  &--big {
    @include ds-typography.b-s36-h42;
  }
}
</style>
