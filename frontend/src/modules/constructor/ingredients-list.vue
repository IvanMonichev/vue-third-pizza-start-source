<script setup lang="ts">
import AppCounter from '@/common/components/app-counter.vue'
import AppDrag from '@/common/components/app-drag.vue'
import { useDataStore, usePizzaStore } from '@/store'
import { computed } from 'vue'

const dataStore = useDataStore()
const pizzaStore = usePizzaStore()

const quantityById = (id: number) =>
  computed(() => pizzaStore.ingredients.find((i) => i.id === id)?.quantity ?? 0)
</script>

<template>
  <ul class="ingredients__list">
    <li
      v-for="ingredient in dataStore.ingredients"
      :key="ingredient.id"
      class="ingredients__item"
    >
      <app-drag :payload="ingredient">
        <div class="filling">
          <img
            :src="ingredient.image"
            :alt="ingredient.name"
            class="filling__img"
          />
          <span class="filling__name">{{ ingredient.name }}</span>
        </div>
      </app-drag>
      <app-counter
        :value="quantityById(ingredient.id).value"
        extra-class="ingredients__counter"
        :min="0"
        :max="3"
        @increment="pizzaStore.incrementIngredient(ingredient.id)"
        @decrement="pizzaStore.decrementIngredient(ingredient.id)"
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

  display: flex;
  align-items: center;
  gap: 8px;

  &__img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ds-colors.$white;
    object-fit: contain;
    flex-shrink: 0;
  }

  &__name {
    display: block;
  }
}
</style>
