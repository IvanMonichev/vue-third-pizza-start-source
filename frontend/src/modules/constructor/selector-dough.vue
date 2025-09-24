<script setup lang="ts">
import RadioDough from '@/modules/constructor/radio-dough.vue'
import SheetLayout from '@/modules/constructor/sheet-layout.vue'
import { onMounted } from 'vue'
import { useDataStore, usePizzaStore } from '@/store'
import { storeToRefs } from 'pinia'

const dataStore = useDataStore()
const pizzaStore = usePizzaStore()
onMounted(async () => {
  dataStore.loadDough()
  pizzaStore.setDoughId(dataStore.dough[0].id)
})

const { dough } = storeToRefs(dataStore)
const { doughId } = storeToRefs(pizzaStore)
</script>

<template>
  <div class="content__dough">
    <SheetLayout title="Выберите тесто" content-class="dough">
      <RadioDough
        v-for="d in dough"
        :key="d.id"
        v-model="doughId"
        name="dough"
        :description="d.description"
        :label="d.name"
        :value="d.id"
      />
    </SheetLayout>
  </div>
</template>
<style scoped lang="scss">
.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
