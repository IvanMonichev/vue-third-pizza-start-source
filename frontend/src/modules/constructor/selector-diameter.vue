<script setup lang="ts">
import RadioDiameter from '@/modules/constructor/radio-diameter.vue'
import SheetLayout from '@/modules/constructor/sheet-layout.vue'
import { onMounted } from 'vue'
import { useDataStore, usePizzaStore } from '@/store'
import { storeToRefs } from 'pinia'

const dataStore = useDataStore()
const pizzaStore = usePizzaStore()
onMounted(async () => {
  dataStore.loadSizes()
  pizzaStore.setSizeId(dataStore.sizes[0].id)
})

const { sizes } = storeToRefs(dataStore)
const { sizeId } = storeToRefs(pizzaStore)
</script>

<template>
  <div class="content__diameter">
    <SheetLayout title="Выберите размер" content-class="diameter">
      <RadioDiameter
        v-for="s in sizes"
        :key="s.id"
        v-model="sizeId"
        name="diameter"
        :label="s.name"
        :value="s.id"
      />
    </SheetLayout>
  </div>
</template>

<style scoped lang="scss">
.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
