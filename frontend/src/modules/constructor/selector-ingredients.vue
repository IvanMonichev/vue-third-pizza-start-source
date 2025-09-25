<script setup lang="ts">
import AppRadioGroup from '@/common/components/app-radio-group.vue'
import { Option } from '@/common/types/core.types'
import Ingredients from '@/modules/constructor/ingredients-list.vue'
import SheetLayout from '@/modules/constructor/sheet-layout.vue'
import { useDataStore, usePizzaStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const dataStore = useDataStore()
const pizzaStore = usePizzaStore()
const { sauces } = storeToRefs(dataStore)
const { sauceId } = storeToRefs(pizzaStore)

const saucesOptions = computed<Option[]>(() =>
  sauces.value.map((s) => ({
    label: s.name,
    value: s.id
  }))
)

onMounted(async () => {
  dataStore.loadSauces()
})
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
        <Ingredients />
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
