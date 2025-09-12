<script setup lang="ts">
import AppInput from '@/common/components/app-input.vue'
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
import SelectorDiameter from '@/modules/constructor/selector-diameter.vue'
import SelectorDough from '@/modules/constructor/selector-dough.vue'
import SelectorIngredients from '@/modules/constructor/selector-ingredients.vue'
import { ref } from 'vue'

const doughTypes: Dough[] = dough

const pizzaSauces: PizzaSauces[] = sauces
const pizzaSizes: PizzaSizeInterface[] = sizes
const ingredientsValues: Ingredient[] = ingredients

const pizzaName = ref('')
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
        <div class="content__pizza">
          <AppInput
            v-model="pizzaName"
            placeholder="Введите название пиццы"
            name="pizza_name"
            label="Название пиццы"
          />

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas" />
                <div class="pizza__filling pizza__filling--bacon" />
                <div class="pizza__filling pizza__filling--cheddar" />
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>
<style lang="scss" scoped>
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/ds-system/ds-shadows';
@use '@/assets/sass/mixins/m_center';
@use '@/assets/sass/mixins/m_clear-list';
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

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include ds-typography.b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
