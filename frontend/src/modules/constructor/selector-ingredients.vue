<script setup lang="ts">
import { useIngredients } from '@/api/ingredients.api'
import AppRadioGroup from '@/common/components/app-radio-group.vue'
import { Option } from '@/common/types/core.types'
import saucesDto from '@/mocks/sauces.json'
import IngredientsList from '@/modules/constructor/ingredients-list.vue'
import SheetLayout from '@/modules/constructor/sheet-layout.vue'
import { useDataStore, usePizzaStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed, onMounted, watchEffect } from 'vue'

const pizzaStore = usePizzaStore()
const dataStore = useDataStore()
const { sauceId } = storeToRefs(pizzaStore)
const { sauces } = useDataStore()

const { data: ingredients } = useIngredients()

onMounted(() => {
  dataStore.buildSauces(saucesDto)
})

watchEffect(() => {
  if (ingredients.value) {
    dataStore.buildIngredients(ingredients.value)
  }
})

const saucesOptions = computed<Option[]>(() =>
  sauces.map((s) => ({
    label: s.name,
    value: s.id
  }))
)
</script>

<template>
  <div class="content__ingredients">
    <SheetLayout title="Выберите ингредиенты" content-class="ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>
        <AppRadioGroup
          v-model="sauceId"
          :options="saucesOptions"
          name="sauce"
          label-class="ingredients__input"
        />
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>
        <IngredientsList />
      </div>
    </SheetLayout>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/sass/ds-system/ds-typography';

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__sauce :deep(.ingredients__input) {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include ds-typography.r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}
</style>
