<script setup lang="ts">
import AppCounter from '@/common/components/app-counter.vue'
import AppDrag from '@/common/components/app-drag.vue'
import { useDataStore, usePizzaStore } from '@/store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const dataStore = useDataStore()
const pizzaStore = usePizzaStore()
const { ingredients } = storeToRefs(dataStore)

onMounted(async () => {
  dataStore.loadIngredients()
})
</script>

<template>
  <ul class="ingredients__list">
    <li
      v-for="ingredient in ingredients"
      :key="ingredient.id"
      class="ingredients__item"
    >
      <AppDrag :transfer-data="ingredient">
        <span :class="['filling', `filling--${ingredient.className}`]">{{
          ingredient.name
        }}</span>
      </AppDrag>
      <AppCounter
        :value="pizzaStore.getIngredientQuantity(ingredient.id)"
        extra-class="ingredients__counter"
        :min="0"
        :max="3"
        @increment="pizzaStore.incrementIngredient(ingredient.id)"
        @decrement="pizzaStore.decrementIngredient(ingredient.id)"
        @set-value="pizzaStore.setIngredient(ingredient.id, $event)"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '@/assets/sass/mixins/m_clear-list';
@use '@/assets/sass/ds-system/ds-colors';
@use '@/assets/sass/ds-system/ds-typography';
@use '@/assets/sass/mixins/m_center';

.ingredients__list {
  @include m_clear-list.clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  @include ds-typography.r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include m_center.p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: '';

    border-radius: 50%;
    background-color: ds-colors.$white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url('@/assets/img/filling/tomatoes.svg');
  }

  &--ananas::before {
    background-image: url('@/assets/img/filling/ananas.svg');
  }

  &--bacon::before {
    background-image: url('@/assets/img/filling/bacon.svg');
  }

  &--blue_cheese::before {
    background-image: url('@/assets/img/filling/blue_cheese.svg');
  }

  &--cheddar::before {
    background-image: url('@/assets/img/filling/cheddar.svg');
  }

  &--chile::before {
    background-image: url('@/assets/img/filling/chile.svg');
  }

  &--ham::before {
    background-image: url('@/assets/img/filling/ham.svg');
  }

  &--jalapeno::before {
    background-image: url('@/assets/img/filling/jalapeno.svg');
  }

  &--mozzarella::before {
    background-image: url('@/assets/img/filling/mozzarella.svg');
  }

  &--mushrooms::before {
    background-image: url('@/assets/img/filling/mushrooms.svg');
  }

  &--olives::before {
    background-image: url('@/assets/img/filling/olives.svg');
  }

  &--onion::before {
    background-image: url('@/assets/img/filling/onion.svg');
  }

  &--parmesan::before {
    background-image: url('@/assets/img/filling/parmesan.svg');
  }

  &--salami::before {
    background-image: url('@/assets/img/filling/salami.svg');
  }

  &--salmon::before {
    background-image: url('@/assets/img/filling/salmon.svg');
  }
}
</style>
