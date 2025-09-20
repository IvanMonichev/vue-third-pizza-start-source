<script setup lang="ts">
import AppTitle from '@/common/components/app-title.vue'
import {
  Dough,
  Ingredient,
  PizzaSauces,
  PizzaSizeInterface
} from '@/common/types/pizza.types'
import dough from '@/mocks/dough.json'
import sauces from '@/mocks/sauces.json'
import sizes from '@/mocks/sizes.json'
import ingredients from '@/mocks/ingredients.json'
import ContentPizza from '@/modules/constructor/content-pizza.vue'
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
        <AppTitle>Конструктор пиццы</AppTitle>
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
</style>
