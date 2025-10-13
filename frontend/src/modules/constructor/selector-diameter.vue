<script setup lang="ts">
import RadioDiameter from '@/modules/constructor/radio-diameter.vue'
import SheetLayout from '@/modules/constructor/sheet-layout.vue'
import { useDataStore, usePizzaStore } from '@/store'
import { storeToRefs } from 'pinia'

const dataStore = useDataStore()
const pizzaStore = usePizzaStore()
const { sizeId } = storeToRefs(pizzaStore)
</script>

<template>
  <div class="content__diameter">
    <sheet-layout title="Выберите размер" content-class="diameter">
      <radio-diameter
        v-for="s in dataStore.sizes"
        :key="s.id"
        v-model="sizeId"
        :size="s"
      />
    </sheet-layout>
  </div>
</template>

<style scoped lang="scss">
.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

:deep(.diameter) {
  padding-bottom: 15px;
}
</style>
