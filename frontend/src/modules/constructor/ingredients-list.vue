<script setup lang="ts">
import AppCounter from '@/common/components/app-counter.vue'
import { Ingredient } from '@/common/types/constructor.types'
import { mapIngredient } from '@/common/utils/ingredients.utils'

const props = defineProps<{ ingredients: Ingredient[] }>()

const viewIngredients = props.ingredients.map(mapIngredient)
</script>

<template>
  <ul class="ingredients__list">
    <li
      v-for="ingredient in viewIngredients"
      :key="ingredient.id"
      class="ingredients__item"
    >
      <span :class="`filling ${ingredient.class}`">{{ ingredient.name }}</span>
      <AppCounter extra-class="ingredients__counter" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
@use '@/assets/sass/mixins/m_clear-list';

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
</style>
