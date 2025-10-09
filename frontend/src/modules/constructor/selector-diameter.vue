<script setup lang="ts">
import { useSizesQuery } from '@/api/sizes.api'
import RadioDiameter from '@/modules/constructor/radio-diameter.vue'
import SheetLayout from '@/modules/constructor/sheet-layout.vue'
import { useDataStore, usePizzaStore } from '@/store'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const dataStore = useDataStore()
const pizzaStore = usePizzaStore()
const { sizeId } = storeToRefs(pizzaStore)

const { data: sizes } = useSizesQuery()
watch(sizes, (data) => {
  if (!data) return
  dataStore.buildSizes(data)
})
</script>

<template>
  <div class="content__diameter">
    <SheetLayout title="Выберите размер" content-class="diameter">
      <RadioDiameter
        v-for="s in sizes"
        :key="s.id"
        v-model="sizeId"
        :size="s"
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

:deep(.diameter) {
  padding-bottom: 15px;
}
</style>
