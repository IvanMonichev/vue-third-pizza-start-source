<script setup lang="ts">
import { DoughDto } from '@/common/types/pizza.types'
import RadioDough from '@/modules/constructor/radio-dough.vue'
import { DoughSize } from '@/common/enums/dough-size.enum'
import SheetLayout from '@/modules/constructor/sheet-layout.vue'
import { ref } from 'vue'

defineProps<{
  doughTypes: DoughDto[]
}>()

const doughValue = ref<DoughSize>(DoughSize.LIGHT)
</script>

<template>
  <div class="content__dough">
    <SheetLayout title="Выберите тесто" content-class="dough">
      <RadioDough
        v-for="d in doughTypes"
        :key="d.id"
        v-model="doughValue"
        :name="'dought'"
        :description="d.description"
        :label="d.name"
        :value="d.size"
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
