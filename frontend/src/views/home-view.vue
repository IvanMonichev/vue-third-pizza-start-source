<script setup lang="ts">
import AppTitle from '@/common/components/app-title.vue'
import { PizzaIngredient } from '@/common/types/ingredient.types'
import { PizzaSauces } from '@/common/types/sauces.types'
import sauces from '@/mocks/sauces.json'
import ingredients from '@/mocks/ingredients.json'
import ContentPizza from '@/modules/constructor/content-pizza.vue'
import SelectorDiameter from '@/modules/constructor/selector-diameter.vue'
import SelectorDough from '@/modules/constructor/selector-dough.vue'
import SelectorIngredients from '@/modules/constructor/selector-ingredients.vue'

const pizzaSauces: PizzaSauces[] = sauces
const pizzaIngredients: PizzaIngredient[] = ingredients
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <AppTitle>Конструктор пиццы</AppTitle>
        <SelectorDough />
        <SelectorDiameter />
        <SelectorIngredients
          :pizza-sauces="pizzaSauces"
          :ingredients="pizzaIngredients"
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
